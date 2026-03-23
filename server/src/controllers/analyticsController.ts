import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
// AI imports removed to maintain "Advanced Analytics" identity

export const getUserAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.user.userId;

        // 1. Mood Statistics
        const moodStats = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        const totalMoods = moodStats.length;
        const averageMood = totalMoods > 0 
            ? moodStats.reduce((acc, entry) => acc + entry.mood, 0) / totalMoods 
            : 0;


        // 3. Crisis Incidents
        const crisisCount = await prisma.moodEntry.count({
            where: { userId, crisisFlag: true }
        });

        // 4. Activity Over Time (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentActivity = await prisma.moodEntry.groupBy({
            by: ['createdAt'],
            where: {
                userId,
                createdAt: { gte: sevenDaysAgo }
            },
            _avg: { mood: true },
            _count: { id: true }
        });

        res.json({
            summary: {
                totalMoods,
                averageMood: Number(averageMood.toFixed(1)),
                crisisCount
            },
            moodHistory: moodStats.map(m => ({
                value: m.mood,
                date: m.createdAt
            })),
            isHighlyActive: totalMoods > 20
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ error: 'Failed to generate your insight map.' });
    }
};

export const getMoodInsight = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // Fetch last 30 entries for comprehensive analysis
        const recentEntries = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        if (recentEntries.length < 3) {
            return res.json({ 
                insight: "Check in 3 more times to generate clinical insights.",
                isPartial: true 
            });
        }

        const moods = recentEntries.map(e => e.mood);
        const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;
        
        // Calculate Volatility (Standard Deviation)
        const variance = moods.reduce((a, b) => a + Math.pow(b - avgMood, 2), 0) / moods.length;
        const volatility = Math.sqrt(variance);

        // Analyze Vitals
        const avgSleep = recentEntries.filter(e => e.sleep !== null).reduce((a, b) => a + (b.sleep || 0), 0) / (recentEntries.filter(e => e.sleep !== null).length || 1);
        const avgEnergy = recentEntries.filter(e => e.energy !== null).reduce((a, b) => a + (b.energy || 0), 0) / (recentEntries.filter(e => e.energy !== null).length || 1);
        const avgSocial = recentEntries.filter(e => e.social !== null).reduce((a, b) => a + (b.social || 0), 0) / (recentEntries.filter(e => e.social !== null).length || 1);

        // Find Correlations (Example: Sleep effect on Mood)
        const sleepMoodCorr = recentEntries.filter(e => e.sleep !== null && e.sleep >= 4).reduce((a, b) => a + b.mood, 0) / (recentEntries.filter(e => e.sleep !== null && e.sleep >= 4).length || 1);
        const baseMood = recentEntries.filter(e => e.sleep !== null && e.sleep < 4).reduce((a, b) => a + b.mood, 0) / (recentEntries.filter(e => e.sleep !== null && e.sleep < 4).length || 1);
        
        let correlationLabel = "";
        if (Math.abs(sleepMoodCorr - baseMood) > 0.5) {
            correlationLabel = `Higher sleep depth (+4) correlates with a ${Math.abs(sleepMoodCorr - baseMood).toFixed(1)}pt ${sleepMoodCorr > baseMood ? 'lift' : 'drop'} in your mood.`;
        }

        // Symptom Patterns
        const allSymptoms = recentEntries.flatMap(e => e.physicalSymptoms || []);
        const symptomCounts: Record<string, number> = {};
        allSymptoms.forEach(s => symptomCounts[s] = (symptomCounts[s] || 0) + 1);
        const topSymptom = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

        // Narrative Analysis
        let narrative = "";
        if (volatility > 1.2) {
            narrative = "Your internal emotional climate has been fluctuating significantly. This 'high variability' state suggests your resilience is being tested by shifting external factors.";
        } else if (avgMood >= 4) {
            narrative = "You are maintaining exceptional emotional stability. Your current routines are effectively shielding you from stress-induced volatility.";
        } else if (avgMood < 2.5) {
            narrative = "Data indicates a sustained period of low energy and mood. This 'persistent low' suggests a need for targeted recovery or professional outreach.";
        } else {
            narrative = "Your mood data reflects a balanced, adaptive state. You are successfully navigating the standard emotional range with good recovery patterns.";
        }

        res.json({
            insight: narrative,
            metrics: {
                avgMood: Number(avgMood.toFixed(1)),
                volatility: Number(volatility.toFixed(1)),
                vitals: {
                    sleep: Number(avgSleep.toFixed(1)),
                    energy: Number(avgEnergy.toFixed(1)),
                    social: Number(avgSocial.toFixed(1))
                },
                correlation: correlationLabel,
                topSymptom,
                totalChecks: recentEntries.length
            }
        });

    } catch (error) {
        console.error('Mood Insight Calculation Error:', error);
        res.status(500).json({ error: 'Failed to process clinical insights.' });
    }
};
