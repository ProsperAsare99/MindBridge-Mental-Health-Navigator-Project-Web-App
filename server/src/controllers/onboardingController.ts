import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { University } from '../generated/client';

export const updateOnboarding = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const userId = req.userId;
        const data = req.body;

        // Clean up the data to ensure we only update allowed fields
        const allowedFields = [
            'displayName',
            'university',
            'academicLevel',
            'program',
            'language',
            'notificationPreference',
            'preferredCheckInTime',
            'concerns',
            'supportLevel',
            'riskLevel',
            'copingStyles',
            'faithLevel',
            'approachPreference',
            'goals',
            'stressors',
            'trackingPreferences',
            'baseline',
            'onboardingStep',
            'onboardingCompleted'
        ];

        const updateData: any = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                // Special handling for academicLevel to ensure it's an integer
                if (field === 'academicLevel') {
                    updateData[field] = parseInt(data[field]) || 100;
                } 
                // Handle University mapping specifically
                else if (field === 'university' && typeof data[field] === 'string') {
                    updateData[field] = mapInstitutionToUniversity(data[field]);
                }
                // Handle Enum arrays by uppercasing strings
                else if (['concerns', 'copingStyles', 'goals'].includes(field) && Array.isArray(data[field])) {
                    updateData[field] = data[field].map((val: string) => val.toUpperCase().replace(/\s+/g, '_'));
                }
                // Handle single Enum fields by uppercasing strings
                else if ([
                    'language', 'notificationPreference', 'preferredCheckInTime', 
                    'supportLevel', 'riskLevel', 'faithLevel', 'approachPreference'
                ].includes(field) && typeof data[field] === 'string') {
                    updateData[field] = data[field].toUpperCase().replace(/\s+/g, '_');
                }
                else {
                    updateData[field] = data[field];
                }
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
                displayName: user.displayName,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            }
        });

    } catch (error: any) {
        console.error('Onboarding Update FULL ERROR:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        res.status(500).json({ error: 'Failed to update onboarding data', details: error.message });
    }
};

export const getOnboardingStatus = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                onboardingStep: true,
                onboardingCompleted: true,
                displayName: true
            }

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

const mapInstitutionToUniversity = (institution: string): University => {
    if (!institution) return University.OTHER;
    const inst = institution.toLowerCase();
    if (inst.includes('knust')) return University.KNUST;
    if (inst.includes('university of ghana') || inst.includes('legon')) return University.UNIVERSITY_OF_GHANA;
    if (inst.includes('cape coast') || inst.includes('ucc')) return University.UNIVERSITY_OF_CAPE_COAST;
    if (inst.includes('ashesi')) return University.ASHESI_UNIVERSITY;
    if (inst.includes('gimpa')) return University.GIMPA;
    return University.OTHER;
};

