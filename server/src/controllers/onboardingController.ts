import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

export const updateOnboarding = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const userId = req.user.userId;
        const data = req.body;

        // Clean up the data to ensure we only update allowed fields
        const allowedFields = [
            'nickname',
            'onboardingStep',
            'onboardingCompleted',
            'yearOfStudy',
            'fieldOfStudy',
            'preferredLanguage',
            'notificationPreference',
            'checkInTime',
            'wellbeingBaseline',
            'reasonsForJoining',
            'hasSupportSystem',
            'previousProfessionalSupport',
            'selfHarmRisk',
            'emergencyContacts',
            'copingStyles',
            'academicStressors',
            'spiritualityImportance',
            'preferredApproach',
            'goals',
            'trackingFrequency',
            'trackingMetrics',
            'dataSharingConsent',
            'dataVisibility',
            'preferredTheme',
            'dashboardLayout'
        ];

        const updateData: any = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                updateData[field] = data[field];
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        res.json({
            message: 'Onboarding data updated successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                onboardingStep: (user as any).onboardingStep,
                onboardingCompleted: (user as any).onboardingCompleted
            }
        });
    } catch (error) {
        console.error('Onboarding Update Error:', error);
        res.status(500).json({ error: 'Failed to update onboarding data' });
    }
};

export const getOnboardingStatus = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                onboardingStep: true,
                onboardingCompleted: true,
                nickname: true
            } as any
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get Onboarding Status Error:', error);
        res.status(500).json({ error: 'Failed to fetch onboarding status' });
    }
};
