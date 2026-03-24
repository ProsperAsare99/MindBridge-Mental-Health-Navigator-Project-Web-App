import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { calculateStreak, ACHIEVEMENTS } from '../utils/gamification';

export const getGamificationStats = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // 1. Get all mood entries for streak calculation
        const moods = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        const currentStreak = calculateStreak(moods);

        // 2. Get achievements
        const achievements = await prisma.achievement.findMany({
            where: { userId }
        });

        // 3. Get or Create Mood Garden
        let garden = await prisma.moodGarden.findUnique({
            where: { userId }
        });

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

        // 4. Achievement Logic (Auto-unlock)
        const unlockedTypes = achievements.map(a => a.type);
        const newAchievements = [];

        for (const ach of ACHIEVEMENTS) {
            if (!unlockedTypes.includes(ach.type)) {
                let unlocked = false;
                if (ach.type.startsWith('milestone_') && currentStreak >= ach.threshold) {
                    unlocked = true;
                } else if (ach.type === 'self_awareness_champion' && moods.length >= ach.threshold) {
                    unlocked = true;
                }

                if (unlocked) {
                    const newAch = await prisma.achievement.create({
                        data: {
                            userId,
                            type: ach.type,
                            title: ach.title,
                            description: ach.description,
                            icon: ach.icon || 'Star'
                        }
                    });
                    newAchievements.push(newAch);
                }
            }
        }

        // 5. Garden Evolution (Rule-based)
        const avgMood = moods.length > 0 
            ? moods.slice(0, 5).reduce((acc, curr) => acc + curr.mood, 0) / Math.min(moods.length, 5) 
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
            achievements: [...achievements, ...newAchievements],
            garden,
            totalCheckIns: moods.length
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
                challengeId,
                startDate: new Date(),
                progress: 0
            }
        });
        res.status(201).json(participation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to join challenge.' });
    }
};
