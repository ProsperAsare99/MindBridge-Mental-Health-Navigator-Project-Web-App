import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { calculateStreak } from '../utils/gamification';
import { GamificationService } from '../services/gamificationService';

export const getGamificationStats = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // 1. Get user data with XP and level
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { 
                moodEntries: { orderBy: { createdAt: 'desc' }, take: 100 },
                achievements: true,
                moodGarden: true
            }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const currentStreak = calculateStreak(user.moodEntries);

        // 2. Garden Evolution (Rule-based)
        let garden = user.moodGarden;
        if (!garden) {
            garden = await prisma.moodGarden.create({
                data: {
                    userId,
                    growthLevel: 1,
                    plantType: 'OAK',
                    healthScore: 50.0
                }
            });
        }

        const avgMood = user.moodEntries.length > 0 
            ? user.moodEntries.slice(0, 5).reduce((acc, curr) => acc + curr.mood, 0) / Math.min(user.moodEntries.length, 5) 
            : 3;
        
        const newGrowthLevel = Math.min(5, Math.ceil(currentStreak / 7) + (avgMood >= 4 ? 1 : 0));
        
        if (newGrowthLevel !== garden.growthLevel) {
            garden = await prisma.moodGarden.update({
                where: { userId },
                data: { growthLevel: newGrowthLevel }
            });
        }

        res.json({
            streak: currentStreak,
            longestStreak: user.longestStreak,
            wellnessLevel: user.wellnessLevel,
            wellnessXP: user.wellnessXP,
            achievements: user.achievements,
            garden,
            totalCheckIns: user.moodEntries.length
        });

    } catch (error) {
        console.error('Gamification Stats Error:', error);
        res.status(500).json({ error: 'Failed to retrieve wellness milestones.' });
    }
};

export const getChallenges = async (req: AuthRequest, res: Response) => {
    try {
        const challenges = await prisma.challenge.findMany({
            include: {
                participants: {
                    where: { userId: req.userId }
                }
            }
        });

        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenges.' });
    }
};

export const joinChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const { challengeId } = req.params;
        const userId = req.userId!;
        const participation = await prisma.challengeParticipation.create({
            data: {
                userId: userId,
                challengeId: challengeId as string,
                startDate: new Date(),
                progress: 0
            }
        });

        // Gamification: Reward XP for taking on a challenge
        await GamificationService.rewardXP(userId, 'CHALLENGE_JOIN');

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId,
                service: 'MOOD',
                model: `JOIN_CHALLENGE: ${challengeId}`
            }
        });

        res.status(201).json(participation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to join challenge.' });
    }
};

export const initializeChallenges = async () => {
    try {
        const count = await prisma.challenge.count();
        if (count === 0) {
            const initialChallenges = [
                {
                    title: 'Gratitude Journey',
                    description: 'Note 3 things you are thankful for every day to boost your mood and perspective.',
                    durationDays: 30,
                    type: 'GRATITUDE',
                    isCommunity: true
                },
                {
                    title: 'Mindfulness Month',
                    description: 'Complete a 5-minute breathing or meditation exercise daily to build focus and calm.',
                    durationDays: 30,
                    type: 'MINDFULNESS',
                    isCommunity: false
                },
                {
                    title: 'Active Resiliency',
                    description: 'Take a 15-minute walk outside every day to connect with nature and clear your mind.',
                    durationDays: 14,
                    type: 'EXERCISE',
                    isCommunity: true
                }
            ];

            for (const challenge of initialChallenges) {
                await prisma.challenge.create({ data: challenge });
            }
            console.log('[GAMIFICATION] Initial challenges seeded successfully.');
        }
    } catch (error: any) {
        console.error('[GAMIFICATION] Challenge seeding failed:', error.message);
    }
};
