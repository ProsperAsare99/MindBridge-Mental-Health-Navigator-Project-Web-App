"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinChallenge = exports.getChallenges = exports.getGamificationStats = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gamification_1 = require("../utils/gamification");
const getGamificationStats = async (req, res) => {
    try {
        if (!req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;
        // 1. Get all mood entries for streak calculation
        const moods = await prisma_1.default.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        const currentStreak = (0, gamification_1.calculateStreak)(moods);
        // 2. Get achievements
        const achievements = await prisma_1.default.achievement.findMany({
            where: { userId }
        });
        // 3. Get or Create Mood Garden
        let garden = await prisma_1.default.moodGarden.findUnique({
            where: { userId }
        });
        if (!garden) {
            garden = await prisma_1.default.moodGarden.create({
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
        for (const ach of gamification_1.ACHIEVEMENTS) {
            if (!unlockedTypes.includes(ach.type)) {
                let unlocked = false;
                if (ach.type.startsWith('milestone_') && currentStreak >= ach.threshold) {
                    unlocked = true;
                }
                else if (ach.type === 'self_awareness_champion' && moods.length >= ach.threshold) {
                    unlocked = true;
                }
                if (unlocked) {
                    const newAch = await prisma_1.default.achievement.create({
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
            garden = await prisma_1.default.moodGarden.update({
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
    }
    catch (error) {
        console.error('Gamification Stats Error:', error);
        res.status(500).json({ error: 'Failed to retrieve wellness milestones.' });
    }
};
exports.getGamificationStats = getGamificationStats;
const getChallenges = async (req, res) => {
    try {
        const challenges = await prisma_1.default.challenge.findMany({
            include: {
                participants: {
                    where: { userId: req.userId }
                }
            }
        });
        res.json(challenges);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenges.' });
    }
};
exports.getChallenges = getChallenges;
const joinChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const participation = await prisma_1.default.challengeParticipation.create({
            data: {
                userId: req.userId,
                challengeId,
                startDate: new Date(),
                progress: 0
            }
        });
        res.status(201).json(participation);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to join challenge.' });
    }
};
exports.joinChallenge = joinChallenge;
//# sourceMappingURL=gamificationController.js.map