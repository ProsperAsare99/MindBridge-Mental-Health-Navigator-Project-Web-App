"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedia = exports.deleteMood = exports.getProactiveNudges = exports.getMoodStats = exports.getUserMoods = exports.createMood = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const genkit_config_1 = require("../lib/genkit-config");
// import { MessageRole, University } from '@prisma/client';
const gamificationService_1 = require("../services/gamificationService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const time_1 = require("../utils/time");
const createMood = async (req, res) => {
    const { value, note, energy, sleep, social, anxiety, emotion, emotionIntensity, physicalSymptoms, weather, location } = req.body;
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;
        let sentimentScore = null;
        let sentimentLabel = null;
        let crisisFlag = false;
        const now = new Date();
        const timeContext = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        if (note && note.trim().length > 0) {
            try {
                const result = await genkit_config_1.ai.generate({
                    prompt: `
                    Current System Time: ${timeContext}
                    High Stress (Exam) Period: ${(0, time_1.isHighStressPeriod)()}
                    
                    Analyze the following journal entry for sentiment and potential crisis. 
                    Provide the result as a JSON object with:
                    - score: a float between -1.0 (very negative) and 1.0 (very positive)
                    - label: a short string (e.g., "Positive", "Neutral", "Concerned", "Distressed")
                    - crisis: boolean, true if the text indicates immediate self-harm or severe clinical distress.
                    
                    Entry: "${note}"`
                });
                const text = result.text.replace(/```json|```/g, '').trim();
                const analysis = JSON.parse(text);
                sentimentScore = analysis.score;
                sentimentLabel = analysis.label;
                crisisFlag = analysis.crisis || false;
            }
            catch (aiError) {
                console.error('Sentiment Analysis Error:', aiError);
            }
        }
        // Handle File Uploads
        const files = req.files;
        const photoUrl = files?.moodPhoto ? `/uploads/mood/photos/${files.moodPhoto[0].filename}` : undefined;
        const audioUrl = files?.moodAudio ? `/uploads/mood/audio/${files.moodAudio[0].filename}` : undefined;
        // Parse JSON fields if they are strings
        const parsedWeather = typeof weather === 'string' ? JSON.parse(weather) : weather;
        const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
        const parsedSymptoms = Array.isArray(physicalSymptoms) ? physicalSymptoms : (physicalSymptoms ? [physicalSymptoms] : []);
        const mood = await prisma_1.default.moodEntry.create({
            data: {
                userId,
                mood: parseInt(value),
                energy: energy ? parseInt(energy) : null,
                sleep: sleep ? parseInt(sleep) : null,
                social: social ? parseInt(social) : null,
                anxiety: anxiety ? parseInt(anxiety) : null,
                emotion: emotion,
                emotionIntensity: emotionIntensity ? parseFloat(emotionIntensity) : null,
                physicalSymptoms: parsedSymptoms,
                photoUrl,
                audioUrl,
                weather: parsedWeather,
                location: parsedLocation,
                notes: note,
                sentimentScore,
                sentimentLabel,
                crisisFlag
            }
        });
        // Gamification: Reward XP and Check for Achievements
        await gamificationService_1.GamificationService.rewardXP(userId, 'MOOD_LOG');
        await gamificationService_1.GamificationService.updateMoodGarden(userId);
        const newAchievements = await gamificationService_1.GamificationService.checkAchievements(userId);
        res.status(201).json({ ...mood, newAchievements });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error logging mood' });
    }
};
exports.createMood = createMood;
const getUserMoods = async (req, res) => {
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const moods = await prisma_1.default.moodEntry.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 30 // Last 30 entries
        });
        res.json(moods);
    }
    catch (error) {
        console.error("DETAILED MOOD FETCH ERROR:", error);
        res.status(500).json({ error: 'Server error fetching moods' });
    }
};
exports.getUserMoods = getUserMoods;
const getMoodStats = async (req, res) => {
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const moods = await prisma_1.default.moodEntry.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        if (moods.length === 0) {
            return res.json({ average: 0, count: 0, streak: 0 });
        }
        const average = moods.reduce((acc, curr) => acc + curr.mood, 0) / moods.length;
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
const getProactiveNudges = async (req, res) => {
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const moods = await prisma_1.default.moodEntry.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 100
        });
        const nudges = [];
        const isExamSeason = (0, time_1.isHighStressPeriod)();
        const now = new Date();
        const currentHour = now.getHours();
        if (moods.length >= 5) {
            // Pattern 1: Day of week dips
            const dayScores = {};
            moods.forEach(m => {
                const day = new Date(m.createdAt).getDay();
                if (!dayScores[day])
                    dayScores[day] = { sum: 0, count: 0 };
                dayScores[day].sum += m.mood;
                dayScores[day].count++;
            });
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            for (let i = 0; i < 7; i++) {
                if (dayScores[i] && dayScores[i].count >= 2) {
                    const avg = dayScores[i].sum / dayScores[i].count;
                    if (avg < 2.5) {
                        nudges.push({
                            type: 'pattern',
                            message: `You usually feel a bit lower on ${dayNames[i]}s.`,
                            suggestion: 'How about planning a small "soul-refuel" activity for then?',
                            icon: 'CloudRain'
                        });
                    }
                }
            }
            // Pattern 2: Time of day dips & Contextual Nudges
            const hourScores = {};
            moods.forEach(m => {
                const hour = new Date(m.createdAt).getHours();
                const bucket = Math.floor(hour / 6); // 0: night, 1: morning, 2: afternoon, 3: evening
                if (!hourScores[bucket])
                    hourScores[bucket] = { sum: 0, count: 0 };
                hourScores[bucket].sum += m.mood;
                hourScores[bucket].count++;
            });
            // Priority Nudge: Late Night Awareness (23:00 - 04:00)
            if (currentHour >= 23 || currentHour < 4) {
                nudges.push({
                    type: 'time_context',
                    message: "It’s late — consider getting some rest.",
                    suggestion: "Would you like a quick relaxation exercise?",
                    icon: 'Moon',
                    actionType: 'EXERCISE'
                });
            }
            // Priority Nudge: Exam Period Stress
            if (isExamSeason) {
                nudges.push({
                    type: 'stress_period',
                    message: "It's currently exam season.",
                    suggestion: "Feeling stressed? Try this quick breathing exercise.",
                    icon: 'Zap',
                    actionType: 'EXERCISE'
                });
            }
            for (let i = 0; i < 4; i++) {
                if (hourScores[i] && hourScores[i].count >= 3) {
                    const avg = hourScores[i].sum / hourScores[i].count;
                    if (avg < 2.5 && !nudges.some(n => n.type === 'time_context')) {
                        nudges.push({
                            type: 'time_pattern',
                            message: `Mornings seem to be a bit challenging for you lately.`,
                            suggestion: 'Maybe a 5-minute sunlight ritual or a favorite song could help?',
                            icon: 'Sun'
                        });
                        break;
                    }
                }
            }
        }
        // Generic nudge if none found
        if (nudges.length === 0) {
            nudges.push({
                type: 'generic',
                message: "You're doing great with your check-ins!",
                suggestion: "Consistency is the first step to deep self-understanding.",
                icon: 'Sparkles'
            });
        }
        res.json(nudges);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching nudges' });
    }
};
exports.getProactiveNudges = getProactiveNudges;
const deleteMood = async (req, res) => {
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const { id } = req.params;
        const mood = await prisma_1.default.moodEntry.findUnique({
            where: { id: id, userId: req.userId }
        });
        if (!mood)
            return res.status(404).json({ error: 'Mood entry not found' });
        // Cleanup files
        if (mood.photoUrl) {
            const fullPath = path_1.default.join(process.cwd(), 'public', mood.photoUrl);
            if (fs_1.default.existsSync(fullPath))
                fs_1.default.unlinkSync(fullPath);
        }
        if (mood.audioUrl) {
            const fullPath = path_1.default.join(process.cwd(), 'public', mood.audioUrl);
            if (fs_1.default.existsSync(fullPath))
                fs_1.default.unlinkSync(fullPath);
        }
        await prisma_1.default.moodEntry.delete({
            where: { id: id }
        });
        res.json({ message: 'Mood entry and associated media deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting mood entry' });
    }
};
exports.deleteMood = deleteMood;
const deleteMedia = async (req, res) => {
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const { id, type } = req.params; // type: 'photo' | 'audio'
        const mood = await prisma_1.default.moodEntry.findUnique({
            where: { id: id, userId: req.userId }
        });
        if (!mood)
            return res.status(404).json({ error: 'Mood entry not found' });
        let fileToPulse = null;
        let updateData = {};
        if (type === 'photo' && mood.photoUrl) {
            fileToPulse = mood.photoUrl;
            updateData.photoUrl = null;
        }
        else if (type === 'audio' && mood.audioUrl) {
            fileToPulse = mood.audioUrl;
            updateData.audioUrl = null;
        }
        else {
            return res.status(400).json({ error: 'Invalid media type or media already deleted' });
        }
        // Physical cleanup
        if (fileToPulse) {
            const fullPath = path_1.default.join(process.cwd(), 'public', fileToPulse);
            if (fs_1.default.existsSync(fullPath))
                fs_1.default.unlinkSync(fullPath);
        }
        const updatedMood = await prisma_1.default.moodEntry.update({
            where: { id: id },
            data: updateData
        });
        res.json({ message: `${type} deleted successfully`, updatedEntry: updatedMood });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting media' });
    }
};
exports.deleteMedia = deleteMedia;
//# sourceMappingURL=moodController.js.map