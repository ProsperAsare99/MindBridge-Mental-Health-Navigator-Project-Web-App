import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const createAssessment = async (req: AuthRequest, res: Response) => {
    const { type, score, severity } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const assessment = await prisma.assessment.create({
            data: {
                userId: req.user.userId,
                type,
                score,
                severity
            }
        });

        res.status(201).json(assessment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error creating assessment' });
    }
};

export const getUserAssessments = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const assessments = await prisma.assessment.findMany({
            where: { userId: req.user.userId },
            orderBy: { timestamp: 'desc' }
        });

        res.json(assessments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching assessments' });
    }
};
