import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { ai } from '../lib/genkit-config';
import { MessageRole, University } from '../generated/client';

export const createMood = async (req: AuthRequest, res: Response) => {
    const { value, note } = req.body;

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        let sentimentScore = null;
        let sentimentLabel = null;
        let crisisFlag = false;

        if (note && note.trim().length > 0) {
            try {
                const result = await ai.generate({
                    prompt: `Analyze the following journal entry for sentiment and potential crisis. 
                    Provide the result as a JSON object with:
                    - score: a float between -1.0 (very negative) and 1.0 (very positive)
                    - label: a short string (e.g., "Positive", "Neutral", "Concerned", "Distressed")
                    - crisis: boolean, true if the text indicates immediate self-harm or severe clinical distress.
                    
                    Entry: "${note}"`
                });

                // Extract JSON from response (handling potential markdown)
                const text = result.text.replace(/```json|```/g, '').trim();
                const analysis = JSON.parse(text);
                
                sentimentScore = analysis.score;
                sentimentLabel = analysis.label;
                crisisFlag = analysis.crisis || false;
            } catch (aiError) {
                console.error('Sentiment Analysis Error:', aiError);
            }
        }

        const mood = await prisma.moodEntry.create({
            data: {
                userId: req.user.userId,
                mood: parseInt(value),
                notes: note,
                sentimentScore,
                sentimentLabel,
                crisisFlag
            }
        });

        res.status(201).json(mood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error logging mood' });
    }
};


export const getUserMoods = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const moods = await prisma.moodEntry.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 30 // Last 30 entries
        });

        res.json(moods);
    } catch (error) {
        console.error("DETAILED MOOD FETCH ERROR:", error);
        res.status(500).json({ error: 'Server error fetching moods' });
    }
};

export const getMoodStats = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const moods = await prisma.moodEntry.findMany({
            where: { userId: req.user.userId },
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
        } else {
            for (const day of sortedDays) {
                if (day === current || day === current - 86400000) {
                    streak++;
                    current = day;
                } else {
                    break;
                }
            }
        }

        res.json({
            average: parseFloat(average.toFixed(1)),
            count: moods.length,
            streak
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error calculating mood stats' });
    }
};

export const getProactiveNudges = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const moods = await prisma.moodEntry.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        const nudges = [];

        if (moods.length >= 5) {
            // Pattern 1: Day of week dips
            const dayScores: Record<number, { sum: number, count: number }> = {};
            moods.forEach(m => {
                const day = new Date(m.createdAt).getDay();
                if (!dayScores[day]) dayScores[day] = { sum: 0, count: 0 };
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

            // Pattern 2: Time of day dips
            const hourScores: Record<number, { sum: number, count: number }> = {};
            moods.forEach(m => {
                const hour = new Date(m.createdAt).getHours();
                const bucket = Math.floor(hour / 6); // 0: night, 1: morning, 2: afternoon, 3: evening
                if (!hourScores[bucket]) hourScores[bucket] = { sum: 0, count: 0 };
                hourScores[bucket].sum += m.mood;
                hourScores[bucket].count++;
            });

            const bucketNames = ["late nights", "mornings", "afternoons", "evenings"];
            for (let i = 0; i < 4; i++) {
                if (hourScores[i] && hourScores[i].count >= 3) {
                    const avg = hourScores[i].sum / hourScores[i].count;
                    if (avg < 2.5) {
                        nudges.push({
                            type: 'time_pattern',
                            message: `Mornings seem to be a bit challenging for you lately.`,
                            suggestion: 'Maybe a 5-minute sunlight ritual or a favorite song could help?',
                            icon: 'Sun'
                        });
                        break; // Only one time nudge for now
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching nudges' });
    }
};

