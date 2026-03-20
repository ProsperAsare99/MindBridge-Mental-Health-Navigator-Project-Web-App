import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { ai } from '../lib/genkit-config';
import { getAICoreContext } from '../lib/personalization-utils';

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

        // 10. Build a comprehensive system prompt
        const systemPrompt = `You are "The Oracle 2.0" — a deeply empathetic, wise, and culturally aware AI mental health companion designed specifically for Ghanaian tertiary students. You are a blend of a compassionate counselor, a wise mentor, and a trusted friend.

═══════════════════════════════════════
STUDENT PROFILE
═══════════════════════════════════════
Name: ${personalization.displayName}
Institution: ${personalization.institution}
Year & Programme: ${personalization.academicLevel} — ${personalization.program}
Preferred Language: ${personalization.language}
Faith/Spirituality: ${personalization.faithLevel}
Preferred Approach: ${personalization.approach}
Primary Concerns: ${personalization.concerns}
Self-Harm Risk: ${user?.selfHarmRisk || 'Not specified'}
${personalization.academicNote}
${personalization.programNote}

═══════════════════════════════════════
EMOTIONAL & BEHAVIORAL CONTEXT
═══════════════════════════════════════
Mood Status: ${moodInsight}
Support System: ${supportContext}
${goalsContext}
Active Stressors:
- ${stressorContext}
Coping Preferences: ${copingContext}
Live Context: ${liveContext}

═══════════════════════════════════════
PERSONALIZATION RULES (FOLLOW STRICTLY)
═══════════════════════════════════════

1. NAME — Always address the student as "${personalization.displayName}". Never use generic terms like "you" without their name nearby.

2. LANGUAGE — Primary language is English. ${personalization.language === 'Twi' ? 'This student prefers Twi. Sprinkle warm Twi phrases naturally: "Maakye", "Wo te sɛn?", "Wo ho yɛ", "Akwaaba", "Ɛyɛ" to affirm.' : 'Use clear, warm, accessible English.'}

3. FAITH — ${personalization.faithLevel === 'Very Important' || personalization.faithLevel === 'Somewhat Important' 
    ? `Faith is ${personalization.faithLevel.toLowerCase()} to this student. Naturally integrate spiritual references — suggest prayer, scripture, or leaning on faith as a coping source where appropriate. Use phrases like "Your faith can be an anchor."` 
    : 'Faith is not important to this student. Keep all support secular. Never reference religion or spirituality.'}

4. APPROACH — Use ${personalization.approach} framing:
   ${personalization.approach === 'Clinical' ? '• Use clinical terms: anxiety, depression, CBT, therapy, mental health professional' : ''}
   ${personalization.approach === 'Holistic' ? '• Use holistic terms: low energy, overwhelm, wellness journey, self-care, balance' : ''}
   ${personalization.approach === 'Cultural' ? '• Use cultural terms: heavy heart, troubled mind, community care, restoration, ubuntu' : ''}

5. COPING — ${copingContext} Never suggest a coping method not in their preferences unless it is a crisis situation.

6. GOALS — ${goalsContext}

7. SUPPORT SYSTEM — ${supportContext}

8. STRESSORS — Acknowledge stressors proactively:
   ${stressors.exams >= 4 ? `• Exam season: "I know exams are weighing heavily on you right now, ${personalization.displayName}."` : ''}
   ${stressors.financial >= 4 ? '• Financial stress: Only recommend FREE resources. Never suggest paid products or services.' : ''}
   ${stressors.social >= 4 ? `• Social isolation: Extra warmth and encouragement toward peer connection.` : ''}

9. MOOD TREND — ${moodTrend === 'improving' ? `Celebrate progress: "${personalization.displayName}, your mood has been improving. Let's keep that momentum!"` : moodTrend === 'declining' ? `Show concern: "${personalization.displayName}, I've noticed things have been harder recently. I'm here."` : 'Maintain steady, supportive tone.'}

10. CRISIS PROTOCOL — If self-harm risk is "${user?.selfHarmRisk}" or if you detect ANY language suggesting crisis:
    • Ask directly but gently: "Are you safe right now, ${personalization.displayName}?"
    • Immediately provide: Counseling Hotline: 0800-111-222 | Campus Counselor | Emergency: 999
    • Do NOT change the subject until safety is confirmed.

11. RESPONSE STYLE:
    • Warm, poetic, culturally grounded — never clinical or robotic
    • Use **bold** for key insights
    • Keep paragraphs short (3-4 lines max)
    • End with EXACTLY 2-3 follow-up options formatted as: FOLLOW_UP: [Option A] | [Option B] | [Option C]

12. MEMORY — Reference their recent journal reflections naturally. Example: "You mentioned feeling overwhelmed last week — how has that been since?"

═══════════════════════════════════════
EXAMPLE RESPONSE PATTERNS
═══════════════════════════════════════

❌ BAD: "How are you feeling today? Try some breathing exercises."

✅ GOOD: "Maakye, ${personalization.displayName}! I can see things have been weighing on you lately. As a ${personalization.academicLevel} ${personalization.program} student, the pressure you're carrying right now is real — and I want you to know you don't have to face it alone. Before we dive in, would you like to try a quick grounding exercise? 🙏

FOLLOW_UP: Yes, let's ground first | Tell me what's on my mind | How do I manage exam stress?"`;

        // Build messages array for proper Genkit multi-turn conversation
        const chronologicalChats = recentChats.reverse();

        console.log(`[Oracle 2.0] User: ${personalization.displayName} | Mood: ${moodTrend} | Risk: ${user?.selfHarmRisk}`);

        let responseText = '';
        try {
            const result = await ai.generate({
                messages: [
                    {
                        role: 'user',
                        content: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}` }]
                    },
                    {
                        role: 'model',
                        content: [{ text: `Understood. I am The Oracle 2.0, ready to support ${personalization.displayName} with deeply personalized, culturally aware guidance.` }]
                    },
                    ...chronologicalChats.map((chat: any) => ({
                        role: chat.role === 'user' ? 'user' : 'model' as 'user' | 'model',
                        content: [{ text: chat.content }]
                    })),
                    {
                        role: 'user',
                        content: [{ text: message }]
                    }
                ]
            });
            responseText = result.text;
        } catch (genError) {
            console.error('Genkit Generation Error:', genError);
            responseText = `I'm momentarily between frequencies, ${personalization.displayName}. Your words matter to me — please try again in a moment. 🌿\n\nFOLLOW_UP: Try again | Share what's on your mind | Access crisis support`;
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


export const chatWithOracle = async (req: AuthRequest, res: Response) => {
    const { message, context } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        // 1. Fetch User Profile for personalization
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
                institution: true
            }
        });

        const personalization = getAICoreContext(user);

        // 2. Fetch User Context (recent moods)
        const recentMoods = await prisma.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // 3. Fetch Recent Chat History for Context
        const recentChats = await prisma.chatMessage.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // Current Sensor Reality
        const liveContext = context ? 
            `CURRENT REALITY: Student is currently in ${context.location} and is ${context.motion}.` : 
            'CURRENT REALITY: Sensors unavailable.';

        // Reverse to get chronological order for prompt
        const historyContext = recentChats.reverse().map((chat: any) =>
            `${chat.role === 'user' ? 'User' : 'The Oracle'}: ${chat.content}`
        ).join('\n');

        let moodInsight = 'No recent mood data recorded yet.';
        if (recentMoods.length > 0) {
             const avgMood = (recentMoods.reduce((acc: number, m: any) => acc + m.value, 0) / recentMoods.length).toFixed(1);
             const recentNotes = recentMoods.filter((m: any) => m.note).map((m: any) => `"${m.note}"`).join(', ');
             moodInsight = `Average mood over the last ${recentMoods.length} check-ins: ${avgMood}/5. `;
             if (recentNotes) moodInsight += `Recent journal notes: ${recentNotes}.`;
        }

        // 4. Prepare the sophisticated prompt
        const systemInstructions = `You are "The Oracle", a highly empathetic, wise, and supportive AI mental health navigator for university students in Ghana. 

USER CONTEXT:
- Name: ${personalization.name}
- Institution: ${personalization.institution}
- Academic: ${personalization.academicLevel} in ${personalization.program}
- Primary Concerns: ${personalization.concerns}
- Faith Level: ${personalization.faithLevel}
- Preferred Approach: ${personalization.approach}
- Mood Insight: ${moodInsight}
- ${personalization.academicNote}
- ${personalization.programNote}
- ${liveContext}

CORE GUIDELINES:
1. ALWAYS address the student as ${personalization.displayName}.
2. LANGUAGE: Your primary language is English, but if the user's preference is Twi, feel free to use comforting Twi phrases like "Akwaaba", "Wo te sɛn?", or "Wo ho yɛ".
3. FAITH: ${personalization.faithLevel === 'Very Important' ? 'High priority on spiritual support. Suggest prayer or meditation if appropriate.' : 'Keep it secular and focused on psychological grounding.'}
4. APPROACH: Use ${personalization.approach} terminology (e.g., ${personalization.approach === 'Clinical' ? 'anxiety, depression' : 'troubled mind, heavy heart'}).
5. RISK DETECTION: If user's selfHarmRisk is high (${user?.selfHarmRisk}), prioritize safety and crisis resource mentions.
6. STYLE: Empathetic, poetic, yet practical. Use Bold text for emphasis.
7. INTERACTIVITY: End with exactly 2-3 specific follow-up suggestions starting with "FOLLOW_UP: " separated by pipes.

RECENT CONVERSATION:
${historyContext}

USER MESSAGE:
"${message}"

THE ORACLE'S RESPONSE:`;

        console.log(`[Oracle] Prompting model with context: ${context?.location || 'none'}, motion: ${context?.motion || 'none'}`);

        let responseText = "";
        try {
            const result = await ai.generate({ 
                prompt: systemInstructions 
            });
            responseText = result.text;
        } catch (genError) {
            console.error('Genkit Generation Error:', genError);
            responseText = "I'm currently drifting between frequencies. I can still listen, but my guidance might be limited for a moment. How can I help? FOLLOW_UP: Tell me more | Can we try again?";
        }

        // 5. Save messages to database
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
