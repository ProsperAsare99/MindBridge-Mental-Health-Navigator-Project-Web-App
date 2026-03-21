import prisma from '../../lib/prisma';
import { MessageRole, ConversationStatus } from '../generated/client';


export class ConversationManagerService {
    
    /**
     * Fetch recent chat history for a user from their active conversation
     */
    async getRecentHistory(userId: string, limit: number = 20) {
        // Find the most recent active conversation
        const conversation = await prisma.conversation.findFirst({
            where: { userId, status: ConversationStatus.ACTIVE },
            orderBy: { lastMessageAt: 'desc' },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' },
                    take: limit
                }
            }
        });

        return conversation?.messages || [];
    }

    /**
     * Save a new chat pair (user message and AI response)
     */
    async saveInteraction(userId: string, userMessage: string, aiResponse: string, metadata: any = {}) {
        // 1. Find or create an active conversation
        let conversation = await prisma.conversation.findFirst({
            where: { userId, status: ConversationStatus.ACTIVE },
            orderBy: { lastMessageAt: 'desc' }
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userId,
                    status: ConversationStatus.ACTIVE,
                    metadata: { initialContext: 'System generated' }
                }
            });
        }

        // 2. Create the messages
        await prisma.message.createMany({
            data: [
                { conversationId: conversation.id, content: userMessage, role: MessageRole.USER },
                { conversationId: conversation.id, content: aiResponse, role: MessageRole.ASSISTANT, metadata }
            ]
        });

        // 3. Update conversation lastMessageAt and counts
        await prisma.conversation.update({
            where: { id: conversation.id },
            data: { lastMessageAt: new Date() }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { 
                conversationsCount: { increment: 1 },
                lastActive: new Date()
            }
        });
        
        // 4. Log AI Interaction separately for diagnostics
        await prisma.aIInteraction.create({
            data: {
                userId,
                userMessage,
                aiResponse,
                model: metadata.model,
                tokensUsed: metadata.tokensUsed,
                crisisDetected: metadata.isCrisis || false,
                responseTime: metadata.responseTime
            }
        });
    }

    /**
     * End a conversation session
     */
    async endConversation(conversationId: string, summary?: string) {
        return await prisma.conversation.update({
            where: { id: conversationId },
            data: { 
                status: ConversationStatus.ENDED,
                endedAt: new Date(),
                summary
            }
        });
    }
}

export const conversationManager = new ConversationManagerService();

