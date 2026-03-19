import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

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
        const event = await prisma.academicEvent.create({
            data: {
                title,
                type,
                date: new Date(date),
                importance: importance || 1
            }
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create academic event' });
    }
};
