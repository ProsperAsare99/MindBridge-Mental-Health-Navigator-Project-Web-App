import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getUserAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.user.userId;

        // 1. Mood Statistics
        const moodStats = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        const totalMoods = moodStats.length;
        const averageMood = totalMoods > 0 
            ? moodStats.reduce((acc, entry) => acc + entry.mood, 0) / totalMoods 
            : 0;

        // 2. AI Interaction Statistics
        const aiInteractions = await prisma.aIInteraction.count({
            where: { userId }
        });

        // 3. Crisis Incidents
        const crisisCount = await prisma.moodEntry.count({
            where: { userId, crisisFlag: true }
        });

        // 4. Activity Over Time (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentActivity = await prisma.moodEntry.groupBy({
            by: ['createdAt'],
            where: {
                userId,
                createdAt: { gte: sevenDaysAgo }
            },
            _avg: { mood: true },
            _count: { id: true }
        });

        res.json({
            summary: {
                totalMoods,
                averageMood: Number(averageMood.toFixed(1)),
                aiInteractions,
                crisisCount
            },
            moodHistory: moodStats.map(m => ({
                value: m.mood,
                date: m.createdAt
            })),
            isHighlyActive: aiInteractions > 20
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ error: 'Failed to generate your insight map.' });
    }
};
