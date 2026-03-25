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

        // Update longest streak if needed
        if (currentStreak > user.longestStreak) {
            await prisma.user.update({
                where: { id: userId },
                data: { longestStreak: currentStreak }
            });
        }

        return newAchievements;
    }
}
