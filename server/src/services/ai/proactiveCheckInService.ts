import prisma from '../../lib/prisma';
import { geminiAdvanced } from './geminiAdvancedService';
import { contextEngine } from './contextEngineService';

export interface Nudge {
    message: string;
    type: 'ENCOURAGEMENT' | 'WARNING' | 'CELEBRATION' | 'ACADEMIC' | 'INSIGHT';
    actionLabel?: string;
    actionUrl?: string;
}

export class ProactiveCheckInService {
    
    /**
     * Generate a highly personalized "Daily Nudge"
     */
    async generateDailyNudge(userId: string): Promise<Nudge> {
        try {
            const context = await contextEngine.buildContext(userId);
            const activeGoals = await (prisma as any).userGoal.findMany({
                where: { userId, status: 'ACTIVE' },
                take: 2
            });

            const prompt = `
You are the Proactive Intelligence for MindBridge. Generate a ONE-SENTENCE, deeply personal "Nudge" for the user.

## CONTEXT:
- Name: ${context.user.displayName}
- Mood Trend: ${context.temporal.recentMoods.trend} (avg: ${context.temporal.recentMoods.average}/5)
- Academic: ${context.temporal.academicCalendar.isExamPeriod ? 'Exam Period' : 'Normal'}
- Hardest Day: ${context.behavioral.patterns.dayOfWeek?.worstDay || 'N/A'}
- Active Goals: ${activeGoals.map((g: any) => g.title).join(', ')}

## RULES:
1. Max 20 words.
2. Be warm, empathetic, and proactive.
3. If mood is declining, focus on validation and gentle support.
4. If exams are coming, focus on balance.
5. If progress is made on a goal, celebrate it!
6. Use Ghanaian cultural warmth (proverbs if appropriate).

Output JSON: {"message": "string", "type": "ENCOURAGEMENT/WARNING/CELEBRATION/ACADEMIC/INSIGHT"}
`;

            const rawResponse = await geminiAdvanced.generateResponse(prompt, { name: 'gemini-1.5-flash' }, userId);
            const jsonStr = rawResponse.replace(/```json|```/g, '').trim();
            const nudge = JSON.parse(jsonStr);

            return {
                ...nudge,
                actionLabel: this.getSuggestedAction(nudge.type),
                actionUrl: this.getSuggestedUrl(nudge.type)
            };
        } catch (error) {
            console.error("[ProactiveService] Error generating nudge:", error);
            return {
                message: "Thinking of you today! Remember to take a deep breath.",
                type: 'ENCOURAGEMENT'
            };
        }
    }

    private getSuggestedAction(type: string): string {
        switch (type) {
            case 'CELEBRATION': return 'View Goals';
            case 'WARNING': return 'Breathe Now';
            case 'ACADEMIC': return 'Study Tips';
            case 'INSIGHT': return 'Mood Journal';
            default: return 'Talk to Oracle';
        }
    }

    private getSuggestedUrl(type: string): string {
        switch (type) {
            case 'CELEBRATION': return '/dashboard/goals';
            case 'WARNING': return '/tools/breathing';
            case 'ACADEMIC': return '/resources/academic';
            case 'INSIGHT': return '/dashboard/mood';
            default: return '/oracle';
        }
    }
}

export const proactiveCheckIn = new ProactiveCheckInService();
