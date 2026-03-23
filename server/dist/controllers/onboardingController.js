"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnboardingStatus = exports.updateOnboarding = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_new_1 = require("../generated/client_new");
const updateOnboarding = async (req, res) => {
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
        const updateData = {};
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
                    updateData[field] = data[field].map((val) => val.toUpperCase().replace(/\s+/g, '_'));
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
        const user = await prisma_1.default.user.update({
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
    }
    catch (error) {
        console.error('Onboarding Update FULL ERROR:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        res.status(500).json({ error: 'Failed to update onboarding data', details: error.message });
    }
};
exports.updateOnboarding = updateOnboarding;
const getOnboardingStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error('Get Onboarding Status Error:', error);
        res.status(500).json({ error: 'Failed to fetch onboarding status' });
    }
};
exports.getOnboardingStatus = getOnboardingStatus;
const mapInstitutionToUniversity = (institution) => {
    if (!institution)
        return client_new_1.University.OTHER;
    const inst = institution.toLowerCase();
    if (inst.includes('knust'))
        return client_new_1.University.KNUST;
    if (inst.includes('university of ghana') || inst.includes('legon'))
        return client_new_1.University.UNIVERSITY_OF_GHANA;
    if (inst.includes('cape coast') || inst.includes('ucc'))
        return client_new_1.University.UNIVERSITY_OF_CAPE_COAST;
    if (inst.includes('ashesi'))
        return client_new_1.University.ASHESI_UNIVERSITY;
    if (inst.includes('gimpa'))
        return client_new_1.University.GIMPA;
    return client_new_1.University.OTHER;
};
//# sourceMappingURL=onboardingController.js.map