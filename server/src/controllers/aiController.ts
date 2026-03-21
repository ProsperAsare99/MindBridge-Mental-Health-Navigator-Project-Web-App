import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAICoreContext } from '../lib/personalization-utils';
import { geminiConfig } from '../config/geminiConfig';
import { modelRouter } from '../services/ai/modelRouterService';
import { promptBuilder, PromptContext } from '../services/ai/promptBuilderService';

export const chatWithOracle = async (req: AuthRequest, res: Response) => {
    const { message, context } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        // 1. Fetch comprehensive user profile for deep personalization
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { 
                name: true,
                nickname: true,
                yearOfStudy: true,
                fieldOfStudy: true,
                preferredLanguage: true,
                reasonsForJoining: true,
                spiritualityImportance: true,
                preferredApproach: true,
                selfHarmRisk: true,
                academicStressors: true,
                institution: true,
                copingStyles: true,
                goals: true,
                hasSupportSystem: true,
                wellbeingBaseline: true,
                trackingMetrics: true,
                checkInTime: true,
                notificationPreference: true,
            }
        });

        const personalization = getAICoreContext(user);

        // 2. Fetch recent mood entries for trend analysis
        const recentMoods = await prisma.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 14 // 2 weeks
        });

        // 3. Fetch recent chat history
        const recentChats = await prisma.chatMessage.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 12
        });

        // 4. Build rich mood insight
        let moodInsight = 'No mood history recorded yet.';
        let moodTrend = 'unknown';
        if (recentMoods.length > 0) {
            const avgMood = (recentMoods.reduce((acc: number, m: any) => acc + m.value, 0) / recentMoods.length).toFixed(1);
            const recentNotes = recentMoods.filter((m: any) => m.note).slice(0, 3).map((m: any) => `"${m.note}"`).join(', ');
            const mostRecentMood = recentMoods[0].value;
            const oldestMood = recentMoods[recentMoods.length - 1].value;
            moodTrend = mostRecentMood > oldestMood ? 'improving' : mostRecentMood < oldestMood ? 'declining' : 'stable';
            moodInsight = `Current mood: ${mostRecentMood}/5. 2-week average: ${avgMood}/5. Trend: ${moodTrend}.`;
            if (recentNotes) moodInsight += ` Recent journal reflections: ${recentNotes}.`;
        }

        // 5. Build stressor context
        const stressors = user?.academicStressors as any || {};
        const stressorLines: string[] = [];
        if (stressors.exams >= 4) stressorLines.push(`HIGH exam stress (${stressors.exams}/5) — exam season support is priority`);
        if (stressors.assignments >= 4) stressorLines.push(`HIGH assignment pressure — time management support recommended`);
        if (stressors.financial >= 4) stressorLines.push(`HIGH financial stress — avoid suggesting paid resources; focus on free options`);
        if (stressors.social >= 4) stressorLines.push(`HIGH social stress — validate loneliness; gently suggest peer circles`);
        const stressorContext = stressorLines.length > 0 ? stressorLines.join('\n- ') : 'No significant stressors flagged.';

        // 6. Build coping strategy list
        const copingStyles = user?.copingStyles || [];
        const copingContext = copingStyles.length > 0
            ? `Only recommend these coping strategies: ${copingStyles.join(', ')}.`
            : 'General coping strategies may be suggested.';

        // 7. Build goals context
        const goals = user?.goals || [];
        const goalsContext = goals.length > 0
            ? `User's wellness goals: ${goals.join(', ')}. Reference progress toward these goals where relevant.`
            : 'User has not set specific goals yet.';

        // 8. Build support system context  
        const supportContext = user?.hasSupportSystem === 'I feel mostly alone'
            ? 'SOLO SUPPORT: User has no support system. Be extra warm, validating, frequently suggest peer support circles and professional counseling.'
            : `Support system: ${user?.hasSupportSystem || 'Unknown'}.`;

        // 9. Live sensor context
        const liveContext = context
            ? `Live sensor data: Student is in ${context.location}, currently ${context.motion}.`
            : 'No live sensor data.';

        // 10. Build a comprehensive system prompt using PromptBuilder
        const promptContext: PromptContext = {
            user: {
                displayName: personalization.displayName,
                academicLevel: parseInt(personalization.academicLevel.replace('Level ', '')) || 100,
                program: personalization.program,
                university: personalization.institution || 'KNUST',
                daysActive: 30, // Mocked for now
                isNewUser: false,
                examHeavyProgram: personalization.program.includes('Engineering') || personalization.program.includes('Medicine'),
                isGraduating: personalization.academicLevel.includes('400'),
                language: personalization.language,
                supportLevel: user?.hasSupportSystem || 'Standard',
                needsSupport: user?.hasSupportSystem === 'I feel mostly alone',
                copingStyles: user?.copingStyles || [],
                prefersFaith: personalization.faithLevel !== 'Not important',
                faithLevel: personalization.faithLevel.toLowerCase().replace(' ', '_'),
                approachPreference: personalization.approach.toLowerCase(),
                culturalContext: {
                    region: 'Ashanti', // Mocked, could be tracked
                    commonLanguages: ['English', 'Twi']
                },
                emergencyContacts: [] // Could be fetched from user profile
            },
            temporal: {
                currentTime: new Date(),
                recentMoods: {
                    average: parseFloat((recentMoods.reduce((acc: number, m: any) => acc + m.value, 0) / (recentMoods.length || 1)).toFixed(1)),
                    trend: (moodTrend as any) || 'unknown',
                    volatility: 1.5, // Mocked
                    lowestPoint: Math.min(...recentMoods.map((m: any) => m.value)) || 1,
                    highestPoint: Math.max(...recentMoods.map((m: any) => m.value)) || 5
                },
                academicCalendar: {
                    isExamPeriod: stressors.exams >= 4,
                    isBeginningOfSemester: false,
                    isEndOfSemester: stressors.exams >= 3,
                    isThesisPeriod: personalization.academicLevel.includes('400')
                }
            },
            behavioral: {
                patterns: {
                    triggers: [] // Could be extracted from mood notes
                },
                engagementLevel: 'MEDIUM'
            },
            clinical: {
                riskAssessment: {
                    level: user?.selfHarmRisk === 'High' ? 'HIGH' : user?.selfHarmRisk === 'Extreme' ? 'CRITICAL' : 'LOW',
                    score: user?.selfHarmRisk === 'High' ? 15 : 5,
                    interventionNeeded: user?.selfHarmRisk === 'High' || user?.selfHarmRisk === 'Extreme',
                    recommendations: ['Speak to a counselor', 'Call emergency hotline'],
                    factors: [stressorContext]
                },
                concernTrends: {
                    'Academic Stress': { isPrimary: true, mentionFrequency: 5, assessmentTrend: 'Decreasing' }
                }
            }
        };

        const systemPrompt = promptBuilder.buildSystemPrompt(promptContext);

        // Build conversation history as text
        const chronologicalChats = recentChats.reverse();
        const historyContext = chronologicalChats.length > 0
            ? chronologicalChats.map((chat: any) =>
                `${chat.role === 'user' ? personalization.displayName : 'The Oracle'}: ${chat.content}`
              ).join('\n')
            : 'This is the start of the conversation.';

        const fullPrompt = `${systemPrompt}

═══════════════════════════════════════
RECENT CONVERSATION HISTORY
═══════════════════════════════════════
${historyContext}

═══════════════════════════════════════
NEW MESSAGE FROM ${personalization.displayName.toUpperCase()}
═══════════════════════════════════════
"${message}"

THE ORACLE'S RESPONSE:`;

        console.log(`[Oracle 2.0] User: ${personalization.displayName} | Mood: ${moodTrend} | Risk: ${user?.selfHarmRisk}`);

        let responseText = '';
        try {
            const geminiApiKey = process.env.GEMINI_API_KEY;
            if (!geminiApiKey) throw new Error('GEMINI_API_KEY is not set');

            // 11. Determine Model Strategy using ModelRouter
            const complexity = modelRouter.calculateComplexity(message, {
                hasPreviousAssessments: true, // Assuming true for now, could be dynamic
                hasJournalHistory: recentMoods.length > 0
            });
            const emotionalIntensity = modelRouter.detectEmotionalIntensity(message);
            const crisisKeywords = ['suicide', 'self-harm', 'kill myself', 'end it all', 'die', 'hurt myself'];
            const isCrisisMessage = crisisKeywords.some(kw => message.toLowerCase().includes(kw));

            const routerContext = {
                conversationLength: recentChats.length,
                userRiskLevel: user?.selfHarmRisk || 'Not specified',
                messageComplexity: complexity,
                requiresAnalysis: recentChats.length % 5 === 0 || isCrisisMessage, // Periodic deep analysis
                crisisDetected: isCrisisMessage,
                emotionalIntensity: emotionalIntensity
            };

            const modelSelection = modelRouter.selectModel(routerContext);
            const modelProfile = modelSelection.model;
            
            console.log(`[Oracle] Model Selection: ${modelProfile.name} | Reason: ${modelSelection.reason} | Complexity: ${complexity} | Intensity: ${emotionalIntensity}`);

            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
                model: modelProfile.name,
                generationConfig: modelProfile.config,
                safetySettings: geminiConfig.safetySettings
            });

            console.log(`[Oracle] Sending prompt (${fullPrompt.length} chars) to Gemini...`);
            const result = await model.generateContent(fullPrompt);
            responseText = result.response.text();

            if (!responseText) throw new Error('Empty response from Gemini');
            console.log(`[Oracle] Response received (${responseText.length} chars)`);
        } catch (genError) {
            console.error('Oracle Generation Error:', genError);
            responseText = `I'm gathering my thoughts for you, ${personalization.displayName}. Could you share that again? I'm here and listening. 🌿\n\nFOLLOW_UP: Try again | Share what's on your mind | Access crisis support`;
        }

        // 11. Save messages to database
        await prisma.chatMessage.createMany({
            data: [
                { userId: req.user.userId, content: message, role: 'user' },
                { userId: req.user.userId, content: responseText, role: 'assistant' }
            ]
        });

        res.json({ response: responseText });
    } catch (error) {
        console.error('Oracle Chat Error:', error);
        res.status(500).json({ error: 'The Oracle is currently in deep meditation. Please reach out again in a moment.' });
    }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const history = await prisma.chatMessage.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'asc' },
            take: 50
        });

        res.json(history);
    } catch (error) {
        console.error('Fetch Chat History Error:', error);
        res.status(500).json({ error: 'Failed to fetch your wisdom path.', details: error instanceof Error ? error.message : String(error) });
    }
};

