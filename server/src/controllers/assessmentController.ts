import { Response } from 'express';
import type { AssessmentType, Severity } from '../../prisma/generated/client';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { RecommendationService } from '../services/recommendationService';
// import { AssessmentType, Severity } from '@prisma/client';

export const createAssessment = async (req: AuthRequest, res: Response) => {
    const { type, score, severity } = req.body;

    try {
        if (!req.user || !req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // Robust mapping for AssessmentType
        let assessmentType: AssessmentType;
        const rawType = type.toUpperCase().replace(/[- ]/g, '');
        
        if (rawType === 'STRESS') {
            assessmentType = 'STRESS' as AssessmentType;
        } else if (rawType === 'SLEEP') {
            assessmentType = 'SLEEP' as AssessmentType;
        } else {
            assessmentType = rawType as AssessmentType;
        }

        // Robust mapping for Severity
        let assessmentSeverity: Severity | undefined;
        if (severity) {
            const rawSeverity = severity.toUpperCase().replace(/[- ]/g, '_');
            assessmentSeverity = rawSeverity as Severity;
        }

        const assessment = await prisma.assessment.create({
            data: {
                userId,
                type: assessmentType,
                score: Number(score), // Ensure it's a number
                severity: assessmentSeverity,
                responses: req.body.responses || []
            }
        });

        // Generate personalized recommendations
        const recommendations = await RecommendationService.getPersonalizedRecommendations(userId);

        res.status(201).json({ assessment, recommendations });
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
