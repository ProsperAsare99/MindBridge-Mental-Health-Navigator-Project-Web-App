import prisma from '../../lib/prisma';
import { PromptContext } from './promptBuilderService';
import { getAICoreContext } from '../../lib/personalization-utils';

export class ContextEngineService {
    
    /**
     * Build comprehensive context for a specific user
     */
    async buildContext(userId: string, liveData?: any): Promise<PromptContext> {
        // 1. Fetch user profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                displayName: true,
                university: true,
                academicLevel: true,
                program: true,
                language: true,
                notificationPreference: true,
                preferredCheckInTime: true,
                concerns: true,
                supportLevel: true,
                riskLevel: true,
                copingStyles: true,
                faithLevel: true,
                approachPreference: true,
                goals: true,
                stressors: true,
                trackingPreferences: true,
                baseline: true,
                createdAt: true,
            }
        });

        if (!user) throw new Error('User not found');

        const personalization = getAICoreContext(user);

        // 2. Fetch recent mood entries
        const recentMoods = await prisma.mood.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 14
        });

        // 3. Analyze mood trends
        let moodTrend: 'improving' | 'declining' | 'stable' | 'unknown' = 'unknown';
        if (recentMoods.length >= 2) {
            const mostRecent = recentMoods[0].value;
            const oldest = recentMoods[recentMoods.length - 1].value;
            moodTrend = mostRecent > oldest ? 'improving' : mostRecent < oldest ? 'declining' : 'stable';
        }

        const avgMood = recentMoods.length > 0 
            ? parseFloat((recentMoods.reduce((acc, m) => acc + m.value, 0) / recentMoods.length).toFixed(1))
            : 3;

        // 4. Extract stressors
        const stressors = user.stressors as any || {};

        // 5. Build final context
        return {
            user: {
                displayName: personalization.displayName,
                academicLevel: user.academicLevel || 100,
                program: user.program || 'N/A',
                university: user.university || 'KNUST',
                daysActive: Math.ceil((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
                isNewUser: (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24) < 7,
                examHeavyProgram: (user.program || '').includes('Engineering') || (user.program || '').includes('Medicine'),
                isGraduating: user.academicLevel === 400,
                language: user.language || 'English',
                supportLevel: user.supportLevel || 'somewhat',
                needsSupport: user.supportLevel === 'alone',
                copingStyles: user.copingStyles || [],
                prefersFaith: user.faithLevel !== 'not_important',
                faithLevel: (user.faithLevel || 'somewhat_important'),
                approachPreference: (user.approachPreference || 'holistic'),
                culturalContext: {
                    region: 'Ashanti',
                    commonLanguages: ['English', 'Twi']
                },
                emergencyContacts: (user.emergencyContacts as any[]) || []
            },
            temporal: {
                currentTime: new Date(),
                recentMoods: {
                    average: avgMood,
                    trend: moodTrend,
                    volatility: 1.5,
                    lowestPoint: recentMoods.length > 0 ? Math.min(...recentMoods.map(m => m.value)) : 1,
                    highestPoint: recentMoods.length > 0 ? Math.max(...recentMoods.map(m => m.value)) : 5
                },
                academicCalendar: {
                    isExamPeriod: stressors.exams >= 4,
                    isBeginningOfSemester: false,
                    isEndOfSemester: stressors.exams >= 3,
                    isThesisPeriod: user.academicLevel === 400
                }
            },
            behavioral: {
                patterns: {
                    triggers: [] 
                },
                engagementLevel: 'MEDIUM'
            },
            clinical: {
                riskAssessment: {
                    level: (user.riskLevel || 'LOW') as any,
                    score: user.riskLevel === 'HIGH' ? 15 : user.riskLevel === 'CRITICAL' ? 25 : 5,
                    interventionNeeded: user.riskLevel === 'HIGH' || user.riskLevel === 'CRITICAL',
                    recommendations: ['Speak to a counselor', 'Call emergency hotline'],
                    factors: []
                },
                concernTrends: {
                    'Academic Stress': { isPrimary: true, mentionFrequency: 5, assessmentTrend: 'Decreased' }
                }
            }
        };

    }
}

export const contextEngine = new ContextEngineService();
