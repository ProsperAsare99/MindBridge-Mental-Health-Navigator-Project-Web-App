import prisma from '../../lib/prisma';
import { geminiAdvanced } from './geminiAdvancedService';
import { contextEngine } from './contextEngineService';

export interface GrowthTask {
    task: string;
    reason: string;
    completed: boolean;
}

export class CarePlanService {
    
    /**
     * Generate a structured weekly care plan
     */
    async generateWeeklyCarePlan(userId: string) {
        try {
            // 1. Get current week/year
            const now = new Date();
            const year = now.getFullYear();
            const weekNumber = this.getWeekNumber(now);

            // 2. Build deep context for the week
            const context = await contextEngine.buildContext(userId);

            const prompt = `
You are the "MindBridge Navigator". Your role is to synthesize the user's last 7 days into a formal, structured "Weekly Care Plan".

## USER CONTEXT (LAST 7 DAYS):
- Name: ${context.user.displayName}
- Mood Average: ${context.temporal.recentMoods.average}/5
- Trend: ${context.temporal.recentMoods.trend}
- Risk Level: ${context.clinical.riskAssessment.level}
- Concerns: ${context.clinical.concernTrends.join(', ')}
- Patterns: Worst Day is typically ${context.behavioral.patterns.dayOfWeek?.worstDay || 'N/A'}

## OBJECTIVE:
1. Provide a 2-3 sentence empathetic "Weekly Reflection".
2. Identify 3 specific "Growth Tasks" for the next week.
3. For each task, provide a "Reason" based on their data.

## RULES:
- Tone: Clinical yet warm, structured, and authoritative (The Navigator).
- Use Ghanaian context where appropriate.
- Growth Tasks must be realistic (e.g., "Walk for 10 mins", "Journal about X").

Output JSON: {
  "summary": "string",
  "moodAnalysis": {"avgMood": number, "trend": "string"},
  "growthTasks": [{"task": "string", "reason": "string"}]
}
`;

            const rawResponse = await geminiAdvanced.generateResponse(prompt, { name: 'gemini-1.5-pro' }, userId);
            const jsonStr = rawResponse.replace(/```json|```/g, '').trim();
            const planData = JSON.parse(jsonStr);

            // 3. Save to database (Upsert for the current week)
            const carePlan = await (prisma as any).carePlan.upsert({
                where: {
                    userId_weekNumber_year: { userId, weekNumber, year }
                },
                update: {
                    summary: planData.summary,
                    moodAnalysis: planData.moodAnalysis,
                    growthTasks: planData.growthTasks.map((t: any) => ({ ...t, completed: false })),
                    updatedAt: new Date()
                },
                create: {
                    userId,
                    weekNumber,
                    year,
                    summary: planData.summary,
                    moodAnalysis: planData.moodAnalysis,
                    growthTasks: planData.growthTasks.map((t: any) => ({ ...t, completed: false }))
                }
            });

            return carePlan;
        } catch (error) {
            console.error("[CarePlanService] Error generating plan:", error);
            throw error;
        }
    }

    /**
     * Get the latest care plan for a user
     */
    async getLatestCarePlan(userId: string) {
        return await (prisma as any).carePlan.findFirst({
            where: { userId },
            orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }]
        });
    }

    private getWeekNumber(d: Date): number {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return weekNo;
    }
}

export const carePlanService = new CarePlanService();
