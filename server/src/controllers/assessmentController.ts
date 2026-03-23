import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { AssessmentType, Severity } from '../generated/client_new';

export const createAssessment = async (req: AuthRequest, res: Response) => {
    const { type, score, severity } = req.body;

    try {
        if (!req.user || !req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        const assessment = await prisma.assessment.create({
            data: {
                userId,
                type: type.toUpperCase().replace(/[- ]/g, '') as AssessmentType,
                score,
                severity: severity ? (severity.toUpperCase().replace(/[- ]/g, '_') as Severity) : undefined,
                responses: req.body.responses || []
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
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(assessments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching assessments' });
    }
};
