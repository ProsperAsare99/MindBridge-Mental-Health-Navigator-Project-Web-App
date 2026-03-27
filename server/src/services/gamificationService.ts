import prisma from '../lib/prisma';
import { calculateLevel, XP_REWARDS, ACHIEVEMENTS, calculateStreak } from '../utils/gamification';

export class GamificationService {
    static async rewardXP(userId: string, activityType: keyof typeof XP_REWARDS) {
        const xpAmount = XP_REWARDS[activityType];
        
        const user = await prisma.user.update({
            where: { id: userId },
            data: { 
                wellnessXP: { increment: xpAmount }
            }
        });

        // Check for level up
        const newLevel = calculateLevel(user.wellnessXP);
        if (newLevel > user.wellnessLevel) {
            await prisma.user.update({
                where: { id: userId },
                data: { wellnessLevel: newLevel }
            });
            // TODO: Trigger level-up notification/event
        }

        return { xpAdded: xpAmount, currentXP: user.wellnessXP, currentLevel: newLevel };
    }

    static async checkAchievements(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { 
                moodEntries: { orderBy: { createdAt: 'desc' } },
                achievements: true
            }
        });

        if (!user) return [];

        const currentStreak = calculateStreak(user.moodEntries);
        const unlockedTypes = user.achievements.map(a => a.type);
        const newAchievements = [];

        for (const ach of ACHIEVEMENTS) {
            if (!unlockedTypes.includes(ach.type)) {
                let unlocked = false;
                
                if (ach.type.startsWith('milestone_') && currentStreak >= (ach as any).threshold) {
                    unlocked = true;
                } else if (ach.type === 'self_awareness_champion' && user.moodEntries.length >= (ach as any).threshold) {
                    unlocked = true;
                }
                // Add more logic for social/mindfulness achievements here

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
                    
                    // Reward bonus XP for achievement
                    await this.rewardXP(userId, 'STREAK_MILESTONE' as any); // Use a generic bonus key or similar
                }
            }
        }

        // 3. Garden Specific Artifacts (Visual Ornaments)
        if (currentStreak >= 10 && !unlockedTypes.includes('GARDEN_ARTIFACT_LANTERN')) {
            const lantern = await prisma.achievement.create({
                data: {
                    userId,
                    type: 'GARDEN_ARTIFACT_LANTERN',
                    title: 'Resilience Luminary',
                    description: 'A glowing lantern for maintaining a 10-day streak.',
                    icon: 'Lamp'
                }
            });
            newAchievements.push(lantern);
        }

        if (user.moodEntries.length >= 50 && !unlockedTypes.includes('GARDEN_ARTIFACT_STONE')) {
            const stone = await prisma.achievement.create({
                data: {
                    userId,
                    type: 'GARDEN_ARTIFACT_STONE',
                    title: 'Zen Foundation',
                    description: 'A commemorative stone for 50 total check-ins.',
                    icon: 'Diamond'
                }
            });
            newAchievements.push(stone);
        }

        return newAchievements;
    }

    static async updateMoodGarden(userId: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { 
                    moodEntries: { orderBy: { createdAt: 'desc' }, take: 10 },
                    moodGarden: true
                }
            });

            if (!user) return;

            let garden = user.moodGarden;
            if (!garden) {
                garden = await prisma.moodGarden.create({
                    data: {
                        userId,
                        growthLevel: 1,
                        plantType: 'oak',
                        healthScore: 50.0
                    }
                });
            }

            const currentStreak = calculateStreak(user.moodEntries as any);
            const avgMood = user.moodEntries.length > 0 
                ? user.moodEntries.reduce((acc, curr) => acc + curr.mood, 0) / user.moodEntries.length 
                : 3;
            
            // Growth Level: Based on streak
            // L1: 0-7 days, L2: 8-14 days, L3: 15-21 days, L4: 22-28 days, L5: 29+ days
            const newGrowthLevel = Math.min(5, Math.floor(currentStreak / 7) + 1);
            
            // Health Score: Based on recent mood average (1-5 scale to 0-100)
            const newHealthScore = Math.min(100, Math.max(10, (avgMood / 5) * 100));

            await prisma.moodGarden.update({
                where: { userId },
                data: { 
                    growthLevel: newGrowthLevel,
                    healthScore: newHealthScore
                }
            });

            // Trigger achievement check
            await this.checkAchievements(userId);
        } catch (error) {
            console.error('[GAMIFICATION] Garden update failed:', error);
        }
    }

    static async awardCarePlanArtifact(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { achievements: true }
        });

        if (user && !user.achievements.some(a => a.type === 'GARDEN_ARTIFACT_SPARK')) {
            await prisma.achievement.create({
                data: {
                    userId,
                    type: 'GARDEN_ARTIFACT_SPARK',
                    title: 'Growth Spark',
                    description: 'Unlocked for completing your first weekly Care Plan.',
                    icon: 'Zap'
                }
            });
        }
    }
}
