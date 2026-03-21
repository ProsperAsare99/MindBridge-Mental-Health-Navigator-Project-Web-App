import prisma from '../../lib/prisma';
import { PromptContext } from './promptBuilderService';
import { getAICoreContext } from '../../lib/personalization-utils';
import { University, Language, SupportLevel, RiskLevel, FaithLevel, ApproachPreference, MessageRole, AssessmentType } from '../../generated/client';

export class ContextEngineService {
    
    /**
     * Build comprehensive context for AI orchestration
     */
    async buildContext(userId: string, liveData?: any): Promise<PromptContext> {
        const [
            userProfile,
            moodInsights,
            recentAssessments,
            conversationHistory,
            patterns,
            riskAssessment
        ] = await Promise.all([
            this.getUserProfile(userId),
            this.getRecentMoods(userId, 14),
            this.getRecentAssessments(userId, 30),
            this.getConversationHistory(userId, 20),
            this.detectPatterns(userId),
            this.assessRisk(userId)
        ]);

        const academicContext = await this.getAcademicContext(userProfile);

        return {
            user: {
                displayName: userProfile.displayName || 'Friend',
                academicLevel: userProfile.academicLevel || 100,
                program: userProfile.program || 'N/A',
                university: this.mapUniversity(userProfile.university),
                daysActive: userProfile.daysActive,
                isNewUser: userProfile.isNewUser,
                examHeavyProgram: userProfile.examHeavyProgram,
                isGraduating: userProfile.isGraduating,
                language: this.mapLanguage(userProfile.language),
                supportLevel: this.mapSupportLevel(userProfile.supportLevel),
                needsSupport: userProfile.needsSupport,
                copingStyles: userProfile.copingStyles.map((s: string) => s.toLowerCase()),
                prefersFaith: userProfile.prefersFaith,
                faithLevel: this.mapFaithLevel(userProfile.faithLevel),
                approachPreference: userProfile.approachPreference.toLowerCase(),
                culturalContext: userProfile.culturalContext,
                emergencyContacts: userProfile.emergencyContacts
            },
            temporal: {
                currentTime: new Date(),
                recentMoods: {
                    average: moodInsights.average,
                    trend: moodInsights.trend as any,
                    volatility: moodInsights.volatility,
                    lowestPoint: moodInsights.lowestPoint,
                    highestPoint: moodInsights.highestPoint
                },
                academicCalendar: {
                    isExamPeriod: academicContext.isExamPeriod,
                    isBeginningOfSemester: academicContext.isBeginningOfSemester,
                    isEndOfSemester: academicContext.isEndOfSemester,
                    isThesisPeriod: academicContext.isThesisPeriod || false
                }
            },
            behavioral: {
                patterns: {
                    timeOfDay: patterns.timeOfDay,
                    dayOfWeek: patterns.dayOfWeek,
                    academicCycle: patterns.academicCycle,
                    triggers: patterns.triggers
                },
                engagementLevel: this.calculateEngagement(userProfile)
            },
            clinical: {
                riskAssessment: {
                    level: riskAssessment.level as RiskLevel,
                    score: riskAssessment.score,
                    interventionNeeded: riskAssessment.interventionNeeded,
                    factors: riskAssessment.factors,
                    recommendations: riskAssessment.recommendations
                },
                concernTrends: this.analyzeConcernTrends(moodInsights.entries, recentAssessments)
            }
        };
    }

    private async getUserProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        
        if (!user) throw new Error('User not found');

        const now = new Date();
        const start = new Date(user.createdAt);
        const diffTime = Math.abs(now.getTime() - start.getTime());
        const daysActive = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
            ...user,
            daysActive,
            isNewUser: daysActive < 7,
            isGraduating: user.academicLevel === 400,
            examHeavyProgram: ['Engineering', 'Medicine', 'Science', 'Law'].some(p => (user.program || '').includes(p)),
            culturalContext: this.getCulturalContext(user),
            prefersFaith: user.faithLevel === FaithLevel.VERY_IMPORTANT,
            needsSupport: user.supportLevel === SupportLevel.ALONE,
            emergencyContacts: (user.emergencyContacts as any[]) || []
        };
    }

    private async getRecentMoods(userId: string, days: number = 7) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const moods = await prisma.moodEntry.findMany({
            where: {
                userId,
                createdAt: { gte: cutoffDate }
            },
            orderBy: { createdAt: 'desc' }
        });

        const entries = moods;
        const average = moods.length > 0 
            ? parseFloat((moods.reduce((acc, m) => acc + m.mood, 0) / moods.length).toFixed(1))
            : 3;
            
        return {
            entries,
            average,
            trend: this.calculateTrend(moods),
            volatility: this.calculateVolatility(moods, average),
            lowestPoint: moods.length > 0 ? Math.min(...moods.map(m => m.mood)) : 3,
            highestPoint: moods.length > 0 ? Math.max(...moods.map(m => m.mood)) : 3,
        };
    }

    private calculateTrend(moods: any[]) {
        if (moods.length < 3) return 'stable';
        const recent = moods.slice(0, Math.floor(moods.length / 2));
        const older = moods.slice(Math.floor(moods.length / 2));
        const recentAvg = recent.reduce((acc, m) => acc + m.mood, 0) / recent.length;
        const olderAvg = older.reduce((acc, m) => acc + m.mood, 0) / older.length;
        const diff = recentAvg - olderAvg;
        if (diff > 0.5) return 'improving';
        if (diff < -0.5) return 'declining';
        return 'stable';
    }

    private calculateVolatility(moods: any[], avg: number) {
        if (moods.length < 2) return 0;
        const variance = moods.reduce((acc, m) => acc + Math.pow(m.mood - avg, 2), 0) / moods.length;
        return parseFloat(Math.sqrt(variance).toFixed(2));
    }

    private async detectPatterns(userId: string) {
        const moods = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        return {
            timeOfDay: this.findTimeOfDayPattern(moods),
            dayOfWeek: this.findDayOfWeekPattern(moods),
            academicCycle: this.findAcademicPattern(moods),
            triggers: await this.identifyTriggers(userId, moods),
        };
    }

    private findTimeOfDayPattern(moods: any[]) {
        const hourlyMoods: Record<string, number[]> = { morning: [], afternoon: [], evening: [], night: [] };
        moods.forEach(mood => {
            const hour = new Date(mood.createdAt).getHours();
            if (hour >= 6 && hour < 12) hourlyMoods.morning.push(mood.mood);
            else if (hour >= 12 && hour < 17) hourlyMoods.afternoon.push(mood.mood);
            else if (hour >= 17 && hour < 21) hourlyMoods.evening.push(mood.mood);
            else hourlyMoods.night.push(mood.mood);
        });

        const averages: Record<string, number> = {};
        let lowestPeriod = 'morning';
        let lowestAvg = 5;

        Object.keys(hourlyMoods).forEach(period => {
            const pMoods = hourlyMoods[period];
            const avg = pMoods.length > 0 ? pMoods.reduce((a, b) => a + b, 0) / pMoods.length : 3;
            averages[period] = parseFloat(avg.toFixed(1));
            if (avg < lowestAvg) { lowestAvg = avg; lowestPeriod = period; }
        });

        return { lowestPeriod, averages };
    }

    private findDayOfWeekPattern(moods: any[]) {
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayMoods: Record<string, number[]> = dayNames.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
        
        moods.forEach(mood => {
            const dayIndex = new Date(mood.createdAt).getDay();
            dayMoods[dayNames[dayIndex]].push(mood.mood);
        });

        const averages: Record<string, number> = {};
        dayNames.forEach(day => {
            const pMoods = dayMoods[day];
            averages[day] = pMoods.length > 0 ? parseFloat((pMoods.reduce((a, b) => a + b, 0) / pMoods.length).toFixed(1)) : 3;
        });

        const worstDay = dayNames.reduce((a, b) => averages[a] < averages[b] ? a : b);
        const bestDay = dayNames.reduce((a, b) => averages[a] > averages[b] ? a : b);

        return { averages, worstDay, bestDay };
    }

    private findAcademicPattern(moods: any[]) {
        const year = new Date().getFullYear();
        const examPeriods = [
            { start: new Date(year, 4, 1), end: new Date(year, 5, 15) },
            { start: new Date(year, 10, 1), end: new Date(year, 11, 15) },
        ];

        const duringExams = moods.filter(m => examPeriods.some(p => m.createdAt >= p.start && m.createdAt <= p.end));
        const outsideExams = moods.filter(m => !examPeriods.some(p => m.createdAt >= p.start && m.createdAt <= p.end));

        if (duringExams.length > 0 && outsideExams.length > 0) {
            const examAvg = duringExams.reduce((a, b) => a + b.mood, 0) / duringExams.length;
            const normalAvg = outsideExams.reduce((a, b) => a + b.mood, 0) / outsideExams.length;
            return { examImpact: normalAvg - examAvg, isSignificant: Math.abs(normalAvg - examAvg) > 0.8 };
        }
        return { examImpact: 0, isSignificant: false };
    }

    private async identifyTriggers(userId: string, moods: any[]) {
        const triggers: { type: string; trigger: string; confidence: number }[] = [];
        // Implementation simplified for brevity, following user logic
        if (moods.some(m => m.notes && (m.notes.toLowerCase().includes('money') || m.notes.toLowerCase().includes('financial')))) {
            triggers.push({ type: 'financial', trigger: 'money_stress', confidence: 0.8 });
        }
        return triggers;
    }

    private async assessRisk(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const recentMoods = await this.getRecentMoods(userId, 7);
        const recentConversations = await prisma.conversation.findMany({
            where: { userId },
            include: { messages: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        let riskScore = 0;
        if (user?.riskLevel === RiskLevel.HIGH) riskScore += 5;
        if (recentMoods.average < 2.5) riskScore += 4;
        if (recentMoods.trend === 'declining') riskScore += 3;
        
        const crisisKeywords = ['suicide', 'kill myself', 'self harm', 'end it all'];
        const hasCrisisLanguage = recentConversations.some(c => c.messages.some(m => crisisKeywords.some(k => m.content.toLowerCase().includes(k))));
        if (hasCrisisLanguage) riskScore += 8;

        let level: RiskLevel = RiskLevel.LOW;
        if (riskScore >= 12) level = RiskLevel.CRITICAL;
        else if (riskScore >= 7) level = RiskLevel.HIGH;
        else if (riskScore >= 4) level = RiskLevel.MODERATE;

        return {
            score: riskScore,
            level,
            interventionNeeded: level === RiskLevel.HIGH || level === RiskLevel.CRITICAL,
            factors: this.getRiskFactors(user, recentMoods),
            recommendations: this.getRiskRecommendations(level)
        };
    }

    private getRiskFactors(user: any, recentMoods: any) {
        const factors = [];
        if (recentMoods.average < 2.5) factors.push('Consistently low mood');
        if (user?.supportLevel === SupportLevel.ALONE) factors.push('Limited support system');
        return factors;
    }

    private getRiskRecommendations(level: RiskLevel) {
        const recs = {
            [RiskLevel.CRITICAL]: ['Immediate counselor referral', 'Emergency contact activation'],
            [RiskLevel.HIGH]: ['Counselor referral', 'Peer support circles'],
            [RiskLevel.MODERATE]: ['Regular check-ins', 'Coping strategy reinforcement'],
            [RiskLevel.LOW]: ['Preventive wellness activities']
        };
        return recs[level];
    }

    private analyzeConcernTrends(moods: any[], assessments: any[]) {
        const trends: Record<string, { isPrimary: boolean; mentionFrequency: number; assessmentTrend: string }> = {};
        const concerns = ['anxiety', 'depression', 'stress', 'loneliness'];
        concerns.forEach(c => {
            const frequency = moods.filter(m => m.notes && m.notes.toLowerCase().includes(c)).length;
            trends[c] = { isPrimary: frequency > 2, mentionFrequency: frequency, assessmentTrend: 'stable' };
        });
        return trends;
    }

    private calculateEngagement(user: any) {
        const checkIns = user.conversationsCount || 0;
        if (checkIns > 10) return 'HIGH';
        if (checkIns > 3) return 'MEDIUM';
        return 'LOW';
    }

    private async getAcademicContext(user: any) {
        const month = new Date().getMonth();
        return {
            isExamPeriod: [4, 5, 10, 11].includes(month),
            isBeginningOfSemester: [0, 1, 7, 8].includes(month),
            isEndOfSemester: [5, 11].includes(month),
            semester: month >= 7 ? 2 : 1,
            isThesisPeriod: user.academicLevel === 400
        };
    }

    private getCulturalContext(user: any) {
        return {
            region: this.getRegion(user.university),
            commonLanguages: ['English', 'Twi']
        };
    }

    private getRegion(uni: University | null): string {
        const mapping: Record<string, string> = {
            [University.KNUST]: 'Ashanti',
            [University.UNIVERSITY_OF_GHANA]: 'Greater Accra',
            [University.ASHESI_UNIVERSITY]: 'Greater Accra',
            [University.GIMPA]: 'Greater Accra',
            [University.UNIVERSITY_OF_CAPE_COAST]: 'Central',
            [University.OTHER]: 'Various'
        };
        return (uni && mapping[uni]) || 'Greater Accra';
    }

    private async getRecentAssessments(userId: string, days: number = 30) {
        const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
        return await prisma.assessment.findMany({ where: { userId, createdAt: { gte: cutoff } }, orderBy: { createdAt: 'desc' } });
    }

    private async getConversationHistory(userId: string, limit: number = 20) {
        return await prisma.conversation.findMany({ where: { userId }, include: { messages: true }, orderBy: { createdAt: 'desc' }, take: limit });
    }

    private mapUniversity(uni: University | null): string {
        const mapping: Record<string, string> = {
            [University.KNUST]: 'KNUST',
            [University.UNIVERSITY_OF_GHANA]: 'University of Ghana',
            [University.UNIVERSITY_OF_CAPE_COAST]: 'University of Cape Coast',
            [University.ASHESI_UNIVERSITY]: 'Ashesi University',
            [University.GIMPA]: 'GIMPA',
            [University.OTHER]: 'Other University'
        };
        return (uni && mapping[uni]) || 'KNUST';
    }

    private mapLanguage(lang: Language): string { return lang.charAt(0) + lang.slice(1).toLowerCase(); }
    private mapSupportLevel(level: SupportLevel): string { return level.toLowerCase(); }
    private mapFaithLevel(level: FaithLevel): string { return level.toLowerCase(); }
}

export const contextEngine = new ContextEngineService();
