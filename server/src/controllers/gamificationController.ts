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
        const participation = await prisma.challengeParticipation.create({
            data: {
                userId: req.userId!,
                challengeId: challengeId as string,
                startDate: new Date(),
                progress: 0
            }
        });
        res.status(201).json(participation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to join challenge.' });
    }
};
