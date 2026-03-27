import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { RecommendationService } from '../services/recommendationService';
import { GamificationService } from '../services/gamificationService';
import { CarePlanService } from '../services/carePlanService';
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

export const getCurrentCarePlan = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const plan = await CarePlanService.getOrCreateWeeklyPlan(req.userId);
        res.json(plan);
    } catch (error) {
        console.error('Care Plan Error:', error);
        res.status(500).json({ error: 'Failed to sync your interactive care plan.' });
    }
};

export const toggleCarePlanTask = async (req: AuthRequest, res: Response) => {
    try {
        const { planId, taskId } = req.body;
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        
        const updatedPlan = await CarePlanService.toggleTaskCompletion(req.userId, planId, taskId);
        
        // Reward XP for completing a task
        const tasks = updatedPlan.growthTasks as any[];
        const task = tasks.find(t => t.id === taskId);
        if (task && task.completed) {
            await GamificationService.rewardXP(req.userId, 'CHALLENGE_COMPLETE');
            
            // If all tasks are completed, award a special garden artifact
            const allCompleted = tasks.every(t => t.completed);
            if (allCompleted) {
                await GamificationService.awardCarePlanArtifact(req.userId);
            }
        }

        res.json(updatedPlan);
    } catch (error) {
        console.error('Toggle Task Error:', error);
        res.status(500).json({ error: 'Failed to update task progress.' });
    }
};
export const getDeepDiveAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;

        // 1. Fetch extensive data spans
        const [moods, circlePosts, carePlans, usageLogs] = await Promise.all([
            prisma.moodEntry.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 50 }),
            prisma.circlePost.findMany({ where: { authorId: userId }, orderBy: { createdAt: 'desc' } }),
            prisma.carePlan.findMany({ where: { userId }, orderBy: { generatedAt: 'desc' } }),
            prisma.usageLog.findMany({ where: { userId }, take: 100, orderBy: { timestamp: 'desc' } })
        ]);

        // 2. Correlation: Community vs Mood
        // Compare mood on days with circle posts vs days without
        const daysWithPosts = new Set(circlePosts.map(p => p.createdAt.toISOString().split('T')[0]));
        const moodsWithPosts = moods.filter(m => daysWithPosts.has(m.createdAt.toISOString().split('T')[0]));
        const moodsWithoutPosts = moods.filter(m => !daysWithPosts.has(m.createdAt.toISOString().split('T')[0]));

        const avgWithPost = moodsWithPosts.length > 0 ? moodsWithPosts.reduce((a, b) => a + b.mood, 0) / moodsWithPosts.length : null;
        const avgWithoutPost = moodsWithoutPosts.length > 0 ? moodsWithoutPosts.reduce((a, b) => a + b.mood, 0) / moodsWithoutPosts.length : null;

        // 3. Correlation: Care Plan vs Anxiety
        // Analyze if anxiety decreases as care plan tasks are completed
        const recentPlan = carePlans[0];
        const completedTasks = recentPlan ? (recentPlan.growthTasks as any[]).filter(t => t.completed).length : 0;
        const totalTasks = recentPlan ? (recentPlan.growthTasks as any[]).length : 0;
        const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

        // 4. Synthesize Dashboard Insights
        const correlations = [];
        if (avgWithPost !== null && avgWithoutPost !== null) {
            const diff = avgWithPost - avgWithoutPost;
            correlations.push({
                factor: 'Community Support',
                impact: diff > 0 ? 'POSITIVE' : 'NEUTRAL',
                description: `Days you share in circles show a ${Math.abs(diff).toFixed(1)}pt ${diff > 0 ? 'increase' : 'fluctuation'} in mood.`,
                score: Math.min(100, Math.abs(diff) * 50)
            });
        }

        if (completionRate > 0.5) {
            correlations.push({
                factor: 'Care Adherence',
                impact: 'POSITIVE',
                description: 'Completing over 50% of your Care Plan tasks is stabilizing your resilience trajectory.',
                score: completionRate * 100
            });
        }

        res.json({
            correlations,
            participationStats: {
                totalCircleShares: circlePosts.length,
                carePlanAdherence: Math.round(completionRate * 100),
                meditationConsistency: usageLogs.filter(l => l.model === 'MEDITATION_COMPLETE').length
            },
            forecast: avgWithPost && avgWithPost > 4 ? 'STABLE' : 'TRANSITIONING'
        });

    } catch (error) {
        console.error('Deep Dive Error:', error);
        res.status(500).json({ error: 'Failed to synthesize deep-dive correlations.' });
    }
};
