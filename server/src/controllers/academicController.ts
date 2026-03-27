import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { GamificationService } from '../services/gamificationService';

export const getAcademicEvents = async (req: AuthRequest, res: Response) => {
    try {
        const events = await prisma.academicEvent.findMany({
            orderBy: { date: 'asc' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch academic events' });
    }
};

export const createAcademicEvent = async (req: AuthRequest, res: Response) => {
    const { title, type, date, importance } = req.body;
    try {
        const userId = req.userId!;
        const event = await prisma.academicEvent.create({
            data: {
                title,
                type,
                date: new Date(date),
                importance: importance || 1
            }
        });

        // Gamification: Reward XP for staying organized
        await GamificationService.rewardXP(userId, 'MOOD_LOG'); // Reuse a generic small XP reward

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId,
                service: 'MOOD',
                model: `ACADEMIC_EVENT: ${type}`
            }
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create academic event' });
    }
};
