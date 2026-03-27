import prisma from '../lib/prisma';
import { RecommendationService } from './recommendationService';

export class CarePlanService {
    static async getOrCreateWeeklyPlan(userId: string) {
        const now = new Date();
        const weekNumber = this.getWeekNumber(now);
        const year = now.getFullYear();

        // 1. Try to find existing plan
        let plan = await prisma.carePlan.findUnique({
            where: {
                userId_weekNumber_year: {
                    userId,
                    weekNumber,
                    year
                }
            }
        });

        if (plan) return plan;

        // 2. Generate new plan if it doesn't exist
        const recommendations = await RecommendationService.getPersonalizedRecommendations(userId);
        
        // Transform recommendations into growth tasks
        const growthTasks = recommendations.recommendations.map(rec => ({
            id: rec.id,
            task: rec.title,
            description: rec.description,
            type: rec.type,
            completed: false,
            points: 50 // Standard XP for care plan tasks
        }));

        // Fallback tasks if recommendations are sparse
        if (growthTasks.length < 3) {
            growthTasks.push({
                id: 'daily-checkin',
                task: 'Daily Resilience Check',
                description: 'Record your mood and vitals for 3 consecutive days.',
                type: 'action',
                completed: false,
                points: 50
            });
        }

        plan = await prisma.carePlan.create({
            data: {
                userId,
                weekNumber,
                year,
                summary: recommendations.feedback.message + ". " + recommendations.feedback.description,
                growthTasks: growthTasks as any,
                moodAnalysis: {
                    tier: recommendations.feedback.tier,
                }
            }
        });

        return plan;
    }

    static async toggleTaskCompletion(userId: string, planId: string, taskId: string) {
        const plan = await prisma.carePlan.findFirst({
            where: { id: planId, userId }
        });

        if (!plan) throw new Error('Care plan not found');

        const tasks = plan.growthTasks as any[];
        const updatedTasks = tasks.map(t => {
            if (t.id === taskId) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });

        return await prisma.carePlan.update({
            where: { id: planId },
            data: { growthTasks: updatedTasks }
        });
    }

    private static getWeekNumber(d: Date): number {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return weekNo;
    }
}
