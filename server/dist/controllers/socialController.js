"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCircles = exports.requestMentor = exports.sendEncouragement = exports.createStory = exports.getStories = exports.createPost = exports.getPosts = exports.joinCircle = exports.getCircles = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_new_1 = require("../generated/client_new");
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
        const post = await prisma_1.default.circlePost.create({
            data: {
                circleId,
                authorId: userId,
                content,
                isAnonymous: isAnonymous ?? true,
                isApproved: true // Auto-approve for now (can be changed to false for full moderation)
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
        const story = await prisma_1.default.supportStory.create({
            data: {
                authorId: userId,
                title,
                content,
                category: category,
                isApproved: true // Auto-approve for now
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
    const count = await prisma_1.default.supportCircle.count();
    if (count === 0) {
        const initialCircles = [
            { name: 'Academic Stress Circle', description: 'Share strategies for managing exams, deadlines, and study pressure.', category: client_new_1.Concern.ACADEMIC_STRESS },
            { name: 'Anxiety Support', description: 'A safe space to talk about coping with anxiety and finding calm.', category: client_new_1.Concern.ANXIETY },
            { name: 'Growth & Resilience', description: 'Focus on building strength and overcoming personal challenges.', category: client_new_1.Concern.OTHER },
            { name: 'Loneliness & Connection', description: 'Find community and share experiences of navigated university life.', category: client_new_1.Concern.LONELINESS },
        ];
        for (const circle of initialCircles) {
            await prisma_1.default.supportCircle.create({ data: circle });
        }
        console.log('[SOCIAL] Initial circles seeded successfully.');
    }
};
exports.initializeCircles = initializeCircles;
//# sourceMappingURL=socialController.js.map