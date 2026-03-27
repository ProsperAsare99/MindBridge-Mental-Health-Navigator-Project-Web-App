import { Response } from 'express';
import type { Concern } from '../../prisma/generated/client';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { ai } from '../lib/genkit-config';
import { isHighStressPeriod, getTimeContext } from '../utils/time';
import { GamificationService } from '../services/gamificationService';

const detectCrisis = async (content: string) => {
    const crisisKeywords = ['suicide', 'self-harm', 'end it all', 'kill myself', 'no point living', 'hurt myself', 'better off dead', 'dying', 'goodbye world'];
    const hasKeyword = crisisKeywords.some(kw => content.toLowerCase().includes(kw));
    
    if (hasKeyword) return true;

    const timeContext = getTimeContext();

    try {
        const result = await ai.generate({
            prompt: `
            Current System Time: ${timeContext}
            High Stress (Exam) Period: ${isHighStressPeriod()}
            
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
    } catch (e) {
        console.error("AI Crisis Detection Error:", e);
        return false;
    }
};

// ============================================
// SUPPORT CIRCLES
// ============================================

export const getCircles = async (req: AuthRequest, res: Response) => {
    try {
        const circles = await prisma.supportCircle.findMany({
            include: {
                _count: {
                    select: { members: true, posts: true }
                }
            }
        });
        res.json(circles);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch circles', details: error.message });
    }
};

export const joinCircle = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const membership = await prisma.circleMembership.upsert({
            where: {
                userId_circleId: { userId, circleId }
            },
            create: { userId, circleId },
            update: {} // No change if already joined
        });

        // Gamification: Reward XP for joining a community
        await GamificationService.rewardXP(userId, 'SOCIAL_ACTIVITY');

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId,
                service: 'CHAT',
                model: `JOIN_CIRCLE: ${circleId}`
            }
        });

        res.json(membership);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to join circle', details: error.message });
    }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    try {
        const posts = await prisma.circlePost.findMany({
            where: { 
                circleId: circleId as string,
                isApproved: true // Only show moderated content
            },
            include: {
                author: {
                    select: { displayName: true, image: true }
                },
                _count: {
                    select: { encouragements: true }
                },
                encouragements: {
                    where: { senderId: req.userId },
                    select: { id: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Hide author info if anonymous
        const sanitizedPosts = posts.map((post: any) => ({
            ...post,
            author: post.isAnonymous ? { displayName: 'Anonymous Peer', image: null } : post.author
        }));

        res.json(sanitizedPosts);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    const { content, isAnonymous } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const crisisFlag = await detectCrisis(content);
        
        const post = await prisma.circlePost.create({
            data: {
                circleId,
                authorId: userId,
                content,
                isAnonymous: isAnonymous ?? true,
                isApproved: !crisisFlag, // Require moderation for crisis content
                crisisFlag
            }
        });

        // Gamification: Reward XP for contributing to the community
        await GamificationService.rewardXP(userId, 'SOCIAL_ACTIVITY');

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId,
                service: 'CHAT',
                model: `CIRCLE_POST: ${circleId}`
            }
        });

        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
};

// ============================================
// ANONYMOUS STORIES
// ============================================

export const getStories = async (req: AuthRequest, res: Response) => {
    try {
        const stories = await prisma.supportStory.findMany({
            where: { isApproved: true },
            include: {
                author: {
                    select: { displayName: true, image: true }
                },
                _count: {
                    select: { encouragements: true }
                },
                encouragements: {
                    where: { senderId: req.userId },
                    select: { id: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(stories);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
    }
};

export const createStory = async (req: AuthRequest, res: Response) => {
    const { title, content, category } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const crisisFlag = await detectCrisis(content);

        const story = await prisma.supportStory.create({
            data: {
                authorId: userId,
                title,
                content,
                category: category as Concern,
                isApproved: !crisisFlag, // Hide and flag if crisis
                crisisFlag
            }
        });

        // Gamification: Reward XP for sharing experience
        await GamificationService.rewardXP(userId, 'SOCIAL_ACTIVITY');

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId,
                service: 'CHAT',
                model: `SUPPORT_STORY: ${category}`
            }
        });

        res.status(201).json(story);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to share story', details: error.message });
    }
};

// ============================================
// ENCOURAGEMENT & MENTORSHIP
// ============================================

export const sendEncouragement = async (req: AuthRequest, res: Response) => {
    const { postId, content, receiverId } = req.body;
    const senderId = req.userId;

    if (!senderId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const encouragement = await prisma.supportEncouragement.create({
            data: {
                senderId,
                postId,
                receiverId,
                content
            }
        });

        // Gamification: Reward XP for supporting others
        await GamificationService.rewardXP(senderId, 'SOCIAL_ACTIVITY');

        // Record Activity
        await prisma.usageLog.create({
            data: {
                userId: senderId,
                service: 'CHAT',
                model: `ENCOURAGEMENT: ${receiverId}`
            }
        });

        res.status(201).json(encouragement);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to send encouragement', details: error.message });
    }
};

export const getMyEncouragements = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const encouragements = await prisma.supportEncouragement.findMany({
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
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch encouragements', details: error.message });
    }
};

export const getMentors = async (req: AuthRequest, res: Response) => {
    try {
        // Simple logic: users with high wellnessLevel or those who have signed up as mentors
        // For now, let's just return users who have been active recently and have a high level
        const mentors = await prisma.user.findMany({
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
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch mentors', details: error.message });
    }
};

export const requestMentor = async (req: AuthRequest, res: Response) => {
    const { mentorId, topic } = req.body;
    const menteeId = req.userId;

    if (!menteeId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const match = await prisma.mentorMatch.create({
            data: {
                menteeId,
                mentorId,
                topic: topic as Concern,
                status: 'PENDING'
            }
        });
        res.status(201).json(match);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to request mentor', details: error.message });
    }
};

// Seed initial circles if none exist
export const initializeCircles = async () => {
    try {
        const count = await prisma.supportCircle.count();
        if (count === 0) {
            const initialCircles = [
                { name: 'Academic Stress Circle', description: 'Share strategies for managing exams, deadlines, and study pressure.', category: 'ACADEMIC_STRESS' as any },
                { name: 'Anxiety Support', description: 'A safe space to talk about coping with anxiety and finding calm.', category: 'ANXIETY' as any },
                { name: 'Growth & Resilience', description: 'Focus on building strength and overcoming personal challenges.', category: 'OTHER' as any },
                { name: 'Loneliness & Connection', description: 'Find community and share experiences of navigated university life.', category: 'LONELINESS' as any },
            ];

            for (const circle of initialCircles) {
                await prisma.supportCircle.create({ data: circle });
            }
            console.log('[SOCIAL] Initial circles seeded successfully.');
        }
    } catch (error: any) {
        if (error.code === 'ENOTFOUND' || error.message?.includes('ENOTFOUND')) {
            console.warn('[SOCIAL] Database seeding skipped: Hostname not found. Is the internet connected?');
        } else {
            console.error('[SOCIAL] Database seeding failed:', error.message);
        }
        // Do not rethrow, as this is a background task
    }
};

export const toggleEncouragement = async (req: AuthRequest, res: Response) => {
    const { postId, storyId } = req.body;
    const senderId = req.userId;

    if (!senderId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Check if encouragement already exists
        const existing = await prisma.supportEncouragement.findFirst({
            where: {
                senderId,
                OR: [
                    { postId: postId || undefined },
                    { storyId: storyId || undefined }
                ]
            }
        });

        if (existing) {
            await prisma.supportEncouragement.delete({ where: { id: existing.id } });
            return res.json({ action: 'REMOVED' });
        }

        // Create new encouragement
        const encouragement = await prisma.supportEncouragement.create({
            data: {
                senderId,
                postId: postId || null,
                storyId: storyId || null,
                content: 'ENCOURAGEMENT' // Standard token
            }
        });

        // Gamification: Reward XP for supporting others
        await GamificationService.rewardXP(senderId, 'SOCIAL_ACTIVITY');

        res.status(201).json({ action: 'ADDED', encouragement });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to toggle encouragement', details: error.message });
    }
};
