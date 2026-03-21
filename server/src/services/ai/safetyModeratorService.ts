import prisma from '../../lib/prisma';
import { PromptContext } from './promptBuilderService';

export interface SafetyCheckResult {
    detected: boolean;
    flagged?: boolean;
    severity?: number;
    categories?: any[];
    flags?: any[];
    action?: string;
    reason?: string;
    protocol?: string;
    requiresImmediate?: boolean;
}

export interface EmotionalState {
    emotions: string[];
    intensity: number;
    valence: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED';
    requiresSupport: boolean;
}

export interface ModerationResult {
    safe: boolean;
    flags: any[];
    crisis: boolean;
    emotionalState: EmotionalState;
    requiresIntervention: boolean;
    recommendations: any[];
}

export class SafetyModeratorService {

    /**
     * Comprehensive input moderation
     */
    async moderateInput(userId: string, message: string, userContext?: any): Promise<ModerationResult> {
        const [crisis, inappropriate, spam, manipulation, emotional] = await Promise.all([
            this.checkCrisisLanguage(message),
            this.checkInappropriateContent(message),
            this.checkSpam(userId, message),
            this.checkManipulation(message),
            this.assessEmotionalState(message, userContext)
        ]);

        const flags = this.consolidateFlags([crisis, inappropriate, spam, manipulation]);

        if (crisis.detected || emotional.intensity > 7) {
            await this.logSafetyEvent(userId, {
                message,
                crisis: crisis.detected,
                emotionalIntensity: emotional.intensity,
                flags
            });
        }

        return {
            safe: !inappropriate.flagged && !spam.flagged && !manipulation.flagged,
            flags,
            crisis: crisis.detected,
            emotionalState: emotional,
            requiresIntervention: crisis.detected || emotional.intensity > 8,
            recommendations: this.generateRecommendations([crisis, inappropriate, spam, manipulation, emotional])
        };
    }

    private async checkCrisisLanguage(message: string): Promise<SafetyCheckResult> {
        const patterns: Record<string, { keywords: string[], severity: number }> = {
            suicide: { keywords: ['kill myself', 'suicide', 'end my life', 'want to die', 'better off dead'], severity: 10 },
            selfHarm: { keywords: ['hurt myself', 'cut myself', 'self harm', 'harm myself'], severity: 9 },
            hopelessness: { keywords: ['no point', 'can\'t go on', 'give up', 'giving up', 'nothing matters', 'no hope'], severity: 7 },
            plan: { keywords: ['have a plan', 'going to do it', 'tonight', 'tomorrow', 'pills'], severity: 10 }
        };

        const detected: any[] = [];
        const msg = message.toLowerCase();
        let maxSeverity = 0;

        Object.entries(patterns).forEach(([category, data]) => {
            const matches = data.keywords.filter(k => msg.includes(k));
            if (matches.length > 0) {
                detected.push({ category, matches, severity: data.severity });
                maxSeverity = Math.max(maxSeverity, data.severity);
            }
        });

        return {
            detected: detected.length > 0,
            categories: detected,
            severity: maxSeverity,
            requiresImmediate: maxSeverity >= 9,
            protocol: maxSeverity >= 9 ? 'CRITICAL' : maxSeverity >= 7 ? 'HIGH' : 'MONITOR'
        };
    }

    private async checkInappropriateContent(message: string) {
        const patterns = [
            /\b(sex|porn|explicit|nsfw)\b/i,
            /\b(hate|racist|discrimination|nazi)\b/i,
            /\b(kill (him|her|them)|murder|assault|violence)\b/i,
        ];

        const flags = patterns.filter(p => p.test(message)).map(p => ({ type: 'INAPPROPRIATE_CONTENT', pattern: p.source }));
        return { flagged: flags.length > 0, flags, action: flags.length > 0 ? 'BLOCK' : 'ALLOW' };
    }

    private async checkSpam(userId: string, message: string) {
        const oneMinAgo = new Date(); oneMinAgo.setMinutes(oneMinAgo.getMinutes() - 1);
        const [recentCount, duplicates] = await Promise.all([
            prisma.aIInteraction.count({ where: { userId, timestamp: { gte: oneMinAgo } } }),
            prisma.aIInteraction.count({ where: { userId, userMessage: message, timestamp: { gte: oneMinAgo } } })
        ]);

        if (recentCount > 12) return { flagged: true, reason: 'TOO_MANY_MESSAGES', action: 'RATE_LIMIT' };
        if (duplicates >= 3) return { flagged: true, reason: 'DUPLICATE_CONTENT', action: 'WARN' };
        return { flagged: false, action: 'ALLOW' };
    }

    private async checkManipulation(message: string) {
        const patterns = [/ignore previous instructions/i, /you are now/i, /act as if/i, /system prompt/i, /dev mode/i, /DAN mode/i];
        const flags = patterns.filter(p => p.test(message)).map(p => ({ type: 'MANIPULATION_ATTEMPT', pattern: p.source }));
        return { flagged: flags.length > 0, flags, action: flags.length > 0 ? 'BLOCK_AND_LOG' : 'ALLOW' };
    }

    private async assessEmotionalState(message: string, context?: any): Promise<EmotionalState> {
        const indicators: Record<string, { keywords: string[], intensity: number }> = {
            distress: { keywords: ['overwhelmed', 'can\'t cope', 'too much', 'breaking down'], intensity: 8 },
            sadness: { keywords: ['sad', 'depressed', 'down', 'miserable', 'crying'], intensity: 6 },
            anxiety: { keywords: ['anxious', 'worried', 'scared', 'panicking', 'terrified'], intensity: 7 },
            anger: { keywords: ['angry', 'furious', 'mad', 'hate', 'rage'], intensity: 6 },
            numbness: { keywords: ['numb', 'empty', 'nothing', 'feel nothing', 'hollow'], intensity: 7 }
        };

        const detected: string[] = [];
        const msg = message.toLowerCase();
        let intensity = 0;

        Object.entries(indicators).forEach(([emotion, data]) => {
            const matches = data.keywords.filter(k => msg.includes(k));
            if (matches.length > 0) { detected.push(emotion); intensity += data.intensity * matches.length; }
        });

        const intensifiers = ['very', 'extremely', 'incredibly', 'so', 'really'];
        intensity += intensifiers.filter(w => msg.includes(w)).length * 2;
        if (message === message.toUpperCase() && message.length > 10) intensity += 3;
        if (context?.riskLevel === 'HIGH' || context?.riskLevel === 'CRITICAL') intensity += 2;

        return {
            emotions: detected,
            intensity: Math.min(intensity, 10),
            valence: intensity >= 7 ? 'NEGATIVE' : intensity >= 4 ? 'MIXED' : 'NEUTRAL',
            requiresSupport: intensity >= 6
        };
    }

    /**
     * AI Output moderation and correction
     */
    async moderateOutput(response: string, userContext?: any) {
        const checks = {
            medical: this.checkMedicalAdvice(response),
            medication: this.checkMedicationMention(response),
            guarantees: this.checkGuarantees(response),
            minimization: this.checkMinimization(response),
            tone: this.checkTone(response, userContext)
        };

        const issues = Object.entries(checks).filter(([_, v]) => v.flagged).map(([k, v]) => ({ issue: k, details: v }));
        const safe = issues.length === 0;
        return { safe, issues, modified: safe ? response : this.correctResponse(response, issues) };
    }

    private checkMedicalAdvice(res: string) {
        const patterns = [/you (have|might have|probably have) (depression|anxiety|adhd|bipolar)/i, /I (diagnose|think you have)/i];
        return { flagged: patterns.some(p => p.test(res)), recommendation: 'Defer to professional' };
    }

    private checkMedicationMention(res: string) {
        const patterns = [/you should (take|try|stop) (medication|pills|antidepressants)/i, /(dosage|medication)/i];
        return { flagged: patterns.some(p => p.test(res)), recommendation: 'Defer to doctor' };
    }

    private checkGuarantees(res: string) {
        const patterns = [/you will (definitely|certainly) (feel better|get better)/i, /I (promise|guarantee)/i];
        return { flagged: patterns.some(p => p.test(res)), recommendation: 'Soften language' };
    }

    private checkMinimization(res: string) {
        const patterns = [/just (think positive|get over it|snap out of it)/i, /it's not that bad/i, /you're (overreacting|being dramatic)/i];
        return { flagged: patterns.some(p => p.test(res)), recommendation: 'Replace with validation' };
    }

    private checkTone(res: string, context?: any) {
        if (context?.riskLevel === 'HIGH' || context?.crisis) {
            const patterns = [/😂|lol|haha/i, /awesome|great|wonderful/i];
            return { flagged: patterns.some(p => p.test(res)), recommendation: 'Use empathetic tone' };
        }
        return { flagged: false };
    }

    private correctResponse(res: string, issues: any[]) {
        let corrected = res;
        issues.forEach(({ issue }) => {
            if (issue === 'medical') corrected = corrected.replace(/(you (have|might have) (depression|anxiety))/gi, 'these symptoms align with what professionals call $3, and I encourage you to speak with a counselor');
            if (issue === 'medication') corrected = corrected.replace(/(take|try|stop) (medication|pills)/gi, 'discuss medication with your doctor');
            if (issue === 'guarantees') corrected = corrected.replace(/(will definitely|I promise|I guarantee)/gi, 'can often');
            if (issue === 'minimization') corrected = corrected.replace(/just (think positive|get over it)/gi, 'I understand this is difficult. Here are some strategies that may help');
        });
        return corrected;
    }

    private consolidateFlags(checks: any[]) {
        const flags: any[] = [];
        checks.forEach(c => { if (c.flagged || c.detected) flags.push(...(c.flags || c.categories || [c])); });
        return flags;
    }

    private generateRecommendations(checks: any[]) {
        const recs: any[] = [];
        if (checks[0].detected) recs.push({ type: 'IMMEDIATE_ACTION', priority: 'CRITICAL', action: 'CRISIS_PROTOCOL' });
        if (checks[4].intensity >= 7) recs.push({ type: 'HIGH_SUPPORT', priority: 'HIGH', action: 'ENHANCED_EMPATHY' });
        return recs;
    }

    private async logSafetyEvent(userId: string, data: any) {
        try {
            if (data.crisis) {
                await prisma.crisisLog.create({
                    data: {
                        userId,
                        message: data.message,
                        severity: data.emotionalIntensity || 7,
                        categories: data.flags.map((f: any) => f.category || f.type) || ['UNKNOWN'],
                        responseProvided: false
                    }
                });
            }
        } catch (e) {
            console.error('[Safety Log Error]', e);
        }
    }
    
    // Legacy support
    detectCrisis(message: string): boolean {
        const patterns = ['suicide', 'kill myself', 'self harm', 'end it all', 'want to die'];
        return patterns.some(p => message.toLowerCase().includes(p));
    }
}

export const safetyModerator = new SafetyModeratorService();
