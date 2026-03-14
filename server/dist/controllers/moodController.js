"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoodStats = exports.getUserMoods = exports.createMood = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createMood = async (req, res) => {
    const { value, note } = req.body;
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const mood = await prisma_1.default.mood.create({
            data: {
                userId: req.user.userId,
                value: parseInt(value),
                note
            }
        });
        res.status(201).json(mood);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error logging mood' });
    }
};
exports.createMood = createMood;
const getUserMoods = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const moods = await prisma_1.default.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 30 // Last 30 entries
        });
        res.json(moods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching moods' });
    }
};
exports.getUserMoods = getUserMoods;
const getMoodStats = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const moods = await prisma_1.default.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' }
        });
        if (moods.length === 0) {
            return res.json({ average: 0, count: 0, streak: 0 });
        }
        const average = moods.reduce((acc, curr) => acc + curr.value, 0) / moods.length;
        // Simple streak calculation (daily)
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const uniqueDays = new Set(moods.map(m => {
            const d = new Date(m.createdAt);
            d.setHours(0, 0, 0, 0);
            return d.getTime();
        }));
        const sortedDays = Array.from(uniqueDays).sort((a, b) => b - a);
        let current = today.getTime();
        if (sortedDays[0] < current - 86400000) {
            streak = 0; // Missed today and yesterday
        }
        else {
            for (const day of sortedDays) {
                if (day === current || day === current - 86400000) {
                    streak++;
                    current = day;
                }
                else {
                    break;
                }
            }
        }
        res.json({
            average: parseFloat(average.toFixed(1)),
            count: moods.length,
            streak
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error calculating mood stats' });
    }
};
exports.getMoodStats = getMoodStats;
//# sourceMappingURL=moodController.js.map