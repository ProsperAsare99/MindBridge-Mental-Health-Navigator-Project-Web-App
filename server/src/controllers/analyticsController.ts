import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { RecommendationService } from '../services/recommendationService';
import { GamificationService } from '../services/gamificationService';
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
        const now = new Date();

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

        // Engagement Pattern Analysis
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const prev7To14Days = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

        const [recentUsage, prevUsage] = await Promise.all([
            prisma.usageLog.count({ where: { userId, timestamp: { gte: last7Days } } }),
            prisma.usageLog.count({ where: { userId, timestamp: { gte: prev7To14Days, lt: last7Days } } })
        ]);

        let engagementInsight = "";
        if (prevUsage > 0) {
            const ratio = recentUsage / prevUsage;
            if (ratio < 0.5) engagementInsight = "We've noticed a significant drop in your app engagement this week. ";
            else if (ratio > 1.5) engagementInsight = "You've been much more active in your wellness journey lately! ";
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
            insight: engagementInsight + narrative,
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

export const getActivityFeed = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // 1. Fetch all relevant activities
        const [moods, assessments, achievements, participants, logs] = await Promise.all([
            prisma.moodEntry.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 50
            }),
            prisma.assessment.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 20
            }),
            prisma.achievement.findMany({
                where: { userId },
                orderBy: { unlockedAt: 'desc' },
                take: 20
            }),
            prisma.challengeParticipation.findMany({
                where: { userId },
                include: { challenge: true },
                orderBy: { startDate: 'desc' },
                take: 10
            }),
            prisma.usageLog.findMany({
                where: { 
                    userId,
                    model: { startsWith: 'RESOURCE:' }
                },
                orderBy: { timestamp: 'desc' },
                take: 30
            })
        ]);

        // 2. Transform into a unified feed format
        const feed = [
            ...moods.map(m => ({
                id: m.id,
                type: 'mood',
                title: 'Mood Log',
                value: m.mood,
                sentiment: m.sentimentLabel,
                notes: m.notes,
                hasAudio: !!m.audioUrl,
                hasPhoto: !!m.photoUrl,
                timestamp: m.createdAt
            })),
            ...assessments.map(a => ({
                id: a.id,
                type: 'assessment',
                title: `${a.type.toUpperCase()} Assessment`,
                score: a.score,
                severity: a.severity,
                timestamp: a.createdAt
            })),
            ...achievements.map(ac => ({
                id: ac.id,
                type: 'achievement',
                title: ac.title,
                description: ac.description,
                icon: ac.icon,
                timestamp: ac.unlockedAt
            })),
            ...participants.map(p => ({
                id: p.id,
                type: 'challenge',
                title: `Joined ${p.challenge.title}`,
                description: p.challenge.description,
                timestamp: p.startDate
            })),
            ...logs.map(l => ({
                id: l.id,
                type: 'resource',
                title: 'Accessed Resource',
                description: l.model?.split('RESOURCE:')[1] || 'Wellness Guide',
                timestamp: l.timestamp
            }))
        ];

        // 3. Sort chronologically
        feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        res.json(feed);
    } catch (error) {
        console.error('Activity Feed Error:', error);
        res.status(500).json({ error: 'Failed to fetch your unified activity feed.' });
    }
};

export const logActivity = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const { service, model } = req.body;

        // Ensure service is a valid enum member or default to CHAT
        const validServices = ['GEMINI', 'CHAT', 'MOOD', 'ASSESSMENT'];
        const serviceType = validServices.includes(service) ? service : 'CHAT';

        const log = await prisma.usageLog.create({
            data: {
                userId: req.userId,
                service: serviceType as any,
                model: model || 'GENERAL_ACTIVITY'
            }
        });
        
        // Reward small XP for engagement
        await GamificationService.rewardXP(req.userId!, 'SOCIAL_ACTIVITY');

        res.status(201).json(log);
    } catch (error) {
        console.error('Log Activity Error:', error);
        res.status(500).json({ error: 'Failed to record activity.' });
    }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        
        const recommendations = await RecommendationService.getPersonalizedRecommendations(req.userId);
        res.json(recommendations);
    } catch (error) {
        console.error('Recommendations Error:', error);
        res.status(500).json({ error: 'Failed to fetch personalized recommendations.' });
    }
};
