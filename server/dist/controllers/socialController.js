"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCircles = exports.requestMentor = exports.getMentors = exports.getMyEncouragements = exports.sendEncouragement = exports.createStory = exports.getStories = exports.createPost = exports.getPosts = exports.joinCircle = exports.getCircles = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const genkit_config_1 = require("../lib/genkit-config");
const time_1 = require("../utils/time");
const detectCrisis = async (content) => {
    const crisisKeywords = ['suicide', 'self-harm', 'end it all', 'kill myself', 'no point living', 'hurt myself', 'better off dead', 'dying', 'goodbye world'];
    const hasKeyword = crisisKeywords.some(kw => content.toLowerCase().includes(kw));
    if (hasKeyword)
        return true;
    const timeContext = (0, time_1.getTimeContext)();
    try {
        const result = await genkit_config_1.ai.generate({
            prompt: `
            Current System Time: ${timeContext}
            High Stress (Exam) Period: ${(0, time_1.isHighStressPeriod)()}
            
            Analyze the following student community post for immediate mental health crisis, suicidal ideation, or severe self-harm intent.
            The platform is MindBridge, a mental health navigator for university students.
            
            Look for:
            1. Direct threats of self-harm or suicide.
            2. Expressions of hopelessness and lack of reason to live.
            3. Finality statements (e.g., "I'm done", "Goodbye everyone").
            4. Severe clinical distress that requires immediate human intervention.
            
            Contextual nuance: Students mapping exam stress or typical academic frustration should NOT be flagged unless they transition into hopeless/self-destructive territory.
            
            Respond with ONLY 'true' if a crisis/intervention is needed, or 'false' otherwise.
            
            Text: "${content}"`
        });
        const responseText = result.text.trim().toLowerCase();
        return responseText.includes('true') && !responseText.includes('false');
    }
    catch (e) {
        console.error("AI Crisis Detection Error:", e);
        return false;
    }
};
// ============================================
// SUPPORT CIRCLES
// ============================================
const getCircles = async (req, res) => {
    try {
        const circles = await prisma_1.default.supportCircle.findMany({
            include: {
                _count: {
                    select: { members: true, posts: true }
                }
            }
        });
        res.json(circles);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch circles', details: error.message });
    }
};
exports.getCircles = getCircles;
const joinCircle = async (req, res) => {
    const circleId = req.params.id;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const membership = await prisma_1.default.circleMembership.upsert({
            where: {
                userId_circleId: { userId, circleId }
            },
            create: { userId, circleId },
            update: {} // No change if already joined
        });
        res.json(membership);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to join circle', details: error.message });
    }
};
exports.joinCircle = joinCircle;
const getPosts = async (req, res) => {
    const circleId = req.params.id;
    try {
        const posts = await prisma_1.default.circlePost.findMany({
            where: {
                circleId: circleId,
                isApproved: true // Only show moderated content
            },
            include: {
                author: {
                    select: { displayName: true, image: true }
                },
                _count: {
                    select: { encouragements: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        // Hide author info if anonymous
        const sanitizedPosts = posts.map((post) => ({
            ...post,
            author: post.isAnonymous ? { displayName: 'Anonymous Peer', image: null } : post.author
        }));
        res.json(sanitizedPosts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
};
exports.getPosts = getPosts;
const createPost = async (req, res) => {
    const circleId = req.params.id;
    const { content, isAnonymous } = req.body;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const crisisFlag = await detectCrisis(content);
        const post = await prisma_1.default.circlePost.create({
            data: {
                circleId,
                authorId: userId,
                content,
                isAnonymous: isAnonymous ?? true,
                isApproved: !crisisFlag, // Require moderation for crisis content
                crisisFlag
            }
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
};
exports.createPost = createPost;
// ============================================
// ANONYMOUS STORIES
// ============================================
const getStories = async (req, res) => {
    try {
        const stories = await prisma_1.default.supportStory.findMany({
            where: { isApproved: true },
            include: {
                author: {
                    select: { displayName: true, image: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(stories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
    }
};
exports.getStories = getStories;
const createStory = async (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const crisisFlag = await detectCrisis(content);
        const story = await prisma_1.default.supportStory.create({
            data: {
                authorId: userId,
                title,
                content,
                category: category,
                isApproved: !crisisFlag, // Hide and flag if crisis
                crisisFlag
            }
        });
        res.status(201).json(story);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to share story', details: error.message });
    }
};
exports.createStory = createStory;
// ============================================
// ENCOURAGEMENT & MENTORSHIP
// ============================================
const sendEncouragement = async (req, res) => {
    const { postId, content, receiverId } = req.body;
    const senderId = req.userId;
    if (!senderId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const encouragement = await prisma_1.default.supportEncouragement.create({
            data: {
                senderId,
                postId,
                receiverId,
                content
            }
        });
        res.status(201).json(encouragement);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to send encouragement', details: error.message });
    }
};
exports.sendEncouragement = sendEncouragement;
const getMyEncouragements = async (req, res) => {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const encouragements = await prisma_1.default.supportEncouragement.findMany({
            where: { receiverId: userId },
            include: {
                sender: { select: { displayName: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        // Map to a simpler format for the UI
        const sanitized = encouragements.map(e => ({
            id: e.id,
            content: e.content,
            createdAt: e.createdAt,
            from: 'Anonymous Peer' // Always anonymous for now for safety
        }));
        res.json(sanitized);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch encouragements', details: error.message });
    }
};
exports.getMyEncouragements = getMyEncouragements;
const getMentors = async (req, res) => {
    try {
        // Simple logic: users with high wellnessLevel or those who have signed up as mentors
        // For now, let's just return users who have been active recently and have a high level
        const mentors = await prisma_1.default.user.findMany({
            where: {
                wellnessLevel: { gte: 3 },
                onboardingCompleted: true,
                // In a real app, we'd have a 'isMentor' flag
            },
            select: {
                id: true,
                displayName: true,
                program: true,
                university: true,
                wellnessLevel: true
            },
            take: 10
        });
        res.json(mentors);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch mentors', details: error.message });
    }
};
exports.getMentors = getMentors;
const requestMentor = async (req, res) => {
    const { mentorId, topic } = req.body;
    const menteeId = req.userId;
    if (!menteeId)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const match = await prisma_1.default.mentorMatch.create({
            data: {
                menteeId,
                mentorId,
                topic: topic,
                status: 'PENDING'
            }
        });
        res.status(201).json(match);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to request mentor', details: error.message });
    }
};
exports.requestMentor = requestMentor;
// Seed initial circles if none exist
const initializeCircles = async () => {
    try {
        const count = await prisma_1.default.supportCircle.count();
        if (count === 0) {
            const initialCircles = [
                { name: 'Academic Stress Circle', description: 'Share strategies for managing exams, deadlines, and study pressure.', category: 'ACADEMIC_STRESS' },
                { name: 'Anxiety Support', description: 'A safe space to talk about coping with anxiety and finding calm.', category: 'ANXIETY' },
                { name: 'Growth & Resilience', description: 'Focus on building strength and overcoming personal challenges.', category: 'OTHER' },
                { name: 'Loneliness & Connection', description: 'Find community and share experiences of navigated university life.', category: 'LONELINESS' },
            ];
            for (const circle of initialCircles) {
                await prisma_1.default.supportCircle.create({ data: circle });
            }
            console.log('[SOCIAL] Initial circles seeded successfully.');
        }
    }
    catch (error) {
        if (error.code === 'ENOTFOUND' || error.message?.includes('ENOTFOUND')) {
            console.warn('[SOCIAL] Database seeding skipped: Hostname not found. Is the internet connected?');
        }
        else {
            console.error('[SOCIAL] Database seeding failed:', error.message);
        }
        // Do not rethrow, as this is a background task
    }
};
exports.initializeCircles = initializeCircles;
//# sourceMappingURL=socialController.js.map