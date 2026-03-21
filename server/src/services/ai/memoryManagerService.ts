import prisma from '../../lib/prisma';
import { embeddingsService } from './embeddingsService';
import { geminiAdvanced } from './geminiAdvancedService';

export interface MemoryMetadata {
    category?: 'ACADEMIC' | 'PERSONAL' | 'MEDICAL' | 'GOAL' | 'RELATIONSHIP' | 'CULTURAL';
    importance?: number; // 1-10
}

export class MemoryManagerService {
    
    /**
     * Save a new persistent memory
     */
    async saveMemory(userId: string, content: string, metadata: MemoryMetadata = {}) {
        try {
            const embedding = await embeddingsService.generateEmbedding(content);
            
            return await (prisma as any).memoryEntry.create({
                data: {
                    userId,
                    content,
                    category: metadata.category || 'PERSONAL',
                    importance: metadata.importance || 5,
                    embedding // Prisma handles JSON
                }
            });
        } catch (error) {
            console.error("[MemoryManager] Error saving memory:", error);
            throw error;
        }
    }

    /**
     * Search for relevant memories based on a query
     */
    async searchMemories(userId: string, query: string, limit: number = 3) {
        try {
            const queryVector = await embeddingsService.generateEmbedding(query);
            
            // Fetch all user memories (for small enough sets, in-memory filtering is OK)
            // For production with thousands of entries per user, use pgvector extension
            const memories = await (prisma as any).memoryEntry.findMany({
                where: { userId },
                select: {
                    id: true,
                    content: true,
                    category: true,
                    importance: true,
                    embedding: true,
                    timestamp: true
                }
            });

            // Rank by similarity
            const ranked = memories
                .map((m: any) => ({
                    ...m,
                    similarity: embeddingsService.cosineSimilarity(queryVector, m.embedding as number[])
                }))
                .filter((m: any) => m.similarity > 0.7) // Threshold
                .sort((a: any, b: any) => b.similarity - a.similarity)
                .slice(0, limit);

            return ranked;
        } catch (error) {
            console.error("[MemoryManager] Error searching memories:", error);
            return [];
        }
    }

    /**
     * Extract significant facts from a conversation and save them
     */
    async extractAndSaveFromConversation(userId: string, messages: any[]) {
        try {
            if (messages.length < 2) return;

            const conversationText = messages
                .map(m => `${m.role}: ${m.content}`)
                .join('\n');

            const extractionPrompt = `
You are a Memory Extraction Engine for MindBridge. Your goal is to identify SIGNIFICANT, PERSISTENT facts about a user from their conversation.

## CONVERSATION:
${conversationText}

## EXTRACTION RULES:
1. Identify facts that are likely to be relevant in the future (e.g., goals, major life events, specific triggers, persistent preferences).
2. Ignore transient emotions or greetings.
3. Focus on:
   - ACADEMIC: specific exams, project topics, graduation plans.
   - PERSONAL: family members, specific hobbies, major past events.
   - GOAL: health goals, career aspirations, habits.
   - TRIGGER: specific things that cause stress or joy.
4. Output ONLY a JSON array of objects: [{"content": "string", "category": "string", "importance": number}]
5. Importance should be 1-10.

JSON:`;

            const rawResponse = await geminiAdvanced.generateResponse(extractionPrompt, { name: 'gemini-1.5-flash' }, userId);
            
            // Clean JSON response (handle markdown blocks if any)
            const jsonStr = rawResponse.replace(/```json|```/g, '').trim();
            const extracted = JSON.parse(jsonStr);

            if (Array.isArray(extracted)) {
                for (const item of extracted) {
                    await this.saveMemory(userId, item.content, {
                        category: item.category,
                        importance: item.importance
                    });
                }
            }
            
            return extracted;
        } catch (error) {
            console.error("[MemoryManager] Error extracting memories:", error);
            return [];
        }
    }
}

export const memoryManager = new MemoryManagerService();
