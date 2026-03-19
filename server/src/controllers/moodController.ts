import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { ai } from '../lib/genkit-config';

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

        const mood = await prisma.mood.create({
            data: {
                userId: req.user.userId,
                value: parseInt(value),
                note,
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

        const moods = await prisma.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 30 // Last 30 entries
        });

        res.json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching moods' });
    }
};

export const getMoodStats = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const moods = await prisma.mood.findMany({
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
