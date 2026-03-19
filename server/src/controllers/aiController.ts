import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { ai } from '../lib/genkit-config';

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
            select: { name: true }
        });

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

        let moodContext = 'No recent mood data recorded yet.';
        if (recentMoods.length > 0) {
             const avgMood = (recentMoods.reduce((acc, m) => acc + m.value, 0) / recentMoods.length).toFixed(1);
             const recentNotes = recentMoods.filter(m => m.note).map(m => `"${m.note}"`).join(', ');
             moodContext = `Average mood over the last ${recentMoods.length} check-ins: ${avgMood}/5. `;
             if (recentNotes) moodContext += `Recent journal notes: ${recentNotes}.`;
        }

        // 4. Prepare the sophisticated prompt
        const systemInstructions = `You are "The Oracle", a highly empathetic, wise, and supportive AI mental health navigator for university students. 
Your essence is a blend of a compassionate therapist, a wise mentor, and a calm sanctuary.

USER PROFILE:
- Name: ${user?.name || 'Student'}
- Mood Context: ${moodContext}
- ${liveContext}

CORE GUIDELINES FOR HELPFULNESS:
1. PERSONALIZATION: Address the student by name occasionally. Reference their mood trends if relevant.
2. CONTEXTUAL WISDOM: If you see the student is "At Library" or "Off-Campus", tailor your advice (e.g., quiet focus vs outdoor reset).
3. ACTIONABLE WISDOM: Don't just validate; provide gentle, specific, and actionable feedback. 
   - If they are stressed: Suggest a 4-7-8 breathing exercise or a 5-minute brain dump.
   - If they are lonely: Suggest small social experiments or self-compassion mantras.
   - If they are overwhelmed: Help them break down one big task into three tiny steps.
4. THERAPEUTIC TONE: Use Cognitive Behavioral Therapy (CBT) principles to help them gently refit negative thought patterns.
5. SAFETY: If severe distress is detected, immediately but gently prioritize recommending "Crisis Support" and professional help.
6. STYLE: Keep responses poetic yet practical. Use Markdown for clarity (bolding for emphasis, bullet points for steps).
7. INTERACTIVITY: At the very end of your response, provide exactly 2-3 concise follow-up questions or suggestions. Format them starting with "FOLLOW_UP: " and separate with pipes.

RECENT CONVERSATION HISTORY:
${historyContext}

USER'S NEW MESSAGE:
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
