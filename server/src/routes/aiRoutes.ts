import { Router, Response } from 'express';
import { mindBridgeMaster } from '../services/ai/mindbridgeMasterService';
import { contextEngine } from '../services/ai/contextEngineService';
import { conversationManager } from '../services/ai/conversationManagerService';
import { geminiAdvanced } from '../services/ai/geminiAdvancedService';
import { proactiveCheckIn } from '../services/ai/proactiveCheckInService';
import { carePlanService } from '../services/ai/carePlanService';
import { predictiveRisk } from '../services/ai/predictiveRiskService';
import { mediaAI } from '../services/ai/mediaAIService';
import { globalSearch } from '../services/ai/globalSearchService';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { aiChatLimiter } from '../middleware/rate-limit';
import prisma from '../lib/prisma';

const router = Router();

/**
 * POST /api/ai/chat
 * Main chat endpoint
 */
router.post('/chat', authenticateToken, aiChatLimiter, async (req: AuthRequest, res: Response) => {
    try {
        const { message } = req.body;
        const userId = req.userId!;

        if (!message?.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await mindBridgeMaster.processUserMessage(userId, message);
        res.json(response);
    } catch (error: any) {
        console.error('[API Chat Error]', error);
        if (error.message === 'RATE_LIMIT_EXCEEDED') {
            return res.status(429).json({ error: 'Too many requests. Please slow down.' });
        }
        res.status(500).json({ error: 'Failed to process message' });
    }
});

/**
 * POST /api/ai/mood-insight
 */
router.post('/mood-insight', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const context = await contextEngine.buildContext(userId);

        if (context.temporal.recentMoods.entryCount < 3) {
            return res.json({ insight: 'Keep tracking your mood to get personalized insights!' });
        }

        const prompt = `Provide a brief, supportive insight based on this mood trend: ${context.temporal.recentMoods.entryCount} entries, Trend: ${context.clinical.riskAssessment.level}. User: ${context.user.displayName}`;
        const response = await geminiAdvanced.generateResponse(prompt, { name: 'gemini-1.5-flash' }, userId);
        
        res.json({ insight: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate insight' });
    }
});

/**
 * GET /api/ai/nudge
 * Get the daily proactive nudge
 */
router.get('/nudge', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const nudge = await proactiveCheckIn.generateDailyNudge(userId);
        res.json(nudge);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate nudge' });
    }
});

/**
 * POST /api/ai/journal-analysis
 */
router.post('/journal-analysis', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { entryContent } = req.body;
        const userId = req.userId!;

        const prompt = `Analyze this journal entry with empathy: "${entryContent}". Provide emotional analysis and one supportive reflection.`;
        const response = await geminiAdvanced.generateResponse(prompt, { name: 'gemini-1.5-flash' }, userId);

        res.json({ analysis: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze journal' });
    }
});

/**
 * GET /api/ai/care-plan
 */
router.get('/care-plan', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        let plan = await carePlanService.getLatestCarePlan(userId);
        
        // If no plan exists, or it's from a previous week, generate a new one
        const now = new Date();
        const currentWeek = Math.ceil(now.getDate() / 7); // Simplified week check for logic
        if (!plan || (plan.weekNumber !== currentWeek && plan.year === now.getFullYear())) {
            // NOTE: In production, use the more robust getWeekNumber helper from the service
            plan = await carePlanService.generateWeeklyCarePlan(userId);
        }
        
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch care plan' });
    }
});

/**
 * POST /api/ai/care-plan/task/complete
 */
router.post('/care-plan/task/complete', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { planId, taskIndex } = req.body;
        const userId = req.userId!;

        const plan = await (prisma as any).carePlan.findFirst({
            where: { id: planId, userId }
        });

        if (!plan) return res.status(404).json({ error: 'Plan not found' });

        const tasks = [...(plan.growthTasks as any[])];
        if (tasks[taskIndex]) {
            tasks[taskIndex].completed = true;
        }

        const updated = await (prisma as any).carePlan.update({
            where: { id: planId },
            data: { growthTasks: tasks }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete task' });
    }
});

/**
 * GET /api/ai/forecast
 */
router.get('/forecast', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const forecast = await predictiveRisk.forecastNext7Days(userId);
        res.json(forecast);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate forecast' });
    }
});

/**
 * POST /api/ai/analyze-media
 */
router.post('/analyze-media', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { mediaData, type } = req.body; // base64 + 'image' or 'audio'
        const userId = req.userId!;

        if (!mediaData) return res.status(400).json({ error: 'Media data is required' });

        let result;
        if (type === 'image') {
            result = await mediaAI.analyzeJournalImage(mediaData, userId);
        } else {
            result = await mediaAI.analyzeAudioJournal(mediaData, userId);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze media' });
    }
});

/**
 * GET /api/ai/search
 * Global semantic search
 */
router.get('/search', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { q } = req.query;
        const userId = req.userId!;

        if (!q) return res.status(400).json({ error: 'Search query is required' });

        const results = await globalSearch.searchEverything(userId, q as string);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform search' });
    }
});

/**
 * GET /api/ai/conversations
 */
router.get('/conversations', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = parseInt(req.query.offset as string) || 0;

        const conversations = await prisma.conversation.findMany({
            where: { userId },
            orderBy: { lastMessageAt: 'desc' },
            take: limit,
            skip: offset
        });
        res.json({ conversations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

/**
 * GET /api/ai/conversation/:id
 */
router.get('/conversation/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const insights = await conversationManager.getConversationInsights(id as string);
        res.json(insights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch insights' });
    }
});

/**
 * DELETE /api/ai/conversation/:id
 */
router.delete('/conversation/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await conversationManager.endConversation(id as string, 'Deleted by user');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
});

/**
 * GET /api/ai/stats
 */
router.get('/stats', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const stats = await conversationManager.getConversationStats(userId, (req.query.period as any) || 'weekly');
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

export default router;
