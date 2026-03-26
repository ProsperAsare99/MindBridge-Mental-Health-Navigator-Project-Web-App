import { XP_REWARDS } from '../utils/gamification';
export declare class GamificationService {
    static rewardXP(userId: string, activityType: keyof typeof XP_REWARDS): Promise<{
        xpAdded: number;
        currentXP: number;
        currentLevel: number;
    }>;
    static checkAchievements(userId: string): Promise<{
        id: string;
        userId: string;
        type: string;
        title: string;
        description: string | null;
        icon: string | null;
        unlockedAt: Date;
    }[]>;
    static updateMoodGarden(userId: string): Promise<void>;
}
