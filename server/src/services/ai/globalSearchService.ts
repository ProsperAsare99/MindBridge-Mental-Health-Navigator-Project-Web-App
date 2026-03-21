import prisma from '../../lib/prisma';
import { embeddingsService } from './embeddingsService';

export interface SearchResult {
    id: string;
    type: 'MOOD' | 'GOAL' | 'CONVERSATION' | 'MEMORY';
    content: string;
    title?: string;
    similarity: number;
    metadata?: any;
}

export class GlobalSearchService {
    
    /**
     * Perform a unified semantic search across all user data
     */
    async searchEverything(userId: string, query: string, limit = 10): Promise<SearchResult[]> {
        try {
            // 1. Generate query embedding
            const queryVector = await embeddingsService.generateEmbedding(query);

            // 2. Search MemoryEntries
            const memories = await (prisma as any).memoryEntry.findMany({
                where: { userId },
                take: 10
            });

            // 3. Search UserGoals
            const goals = await (prisma as any).userGoal.findMany({
                where: { userId },
                take: 10
            });

            // 4. Search MoodEntries
            const moods = await (prisma as any).moodEntry.findMany({
                where: { userId },
                take: 10
            });

            const results: SearchResult[] = [];

            memories.forEach((m: any) => {
                const sim = embeddingsService.cosineSimilarity(queryVector, m.embedding);
                if (sim > 0.6) {
                    results.push({
                        id: m.id,
                        type: 'MEMORY',
                        content: m.content,
                        similarity: sim,
                        metadata: { category: m.category }
                    });
                }
            });

            // Processing Goals (Keyword-based or fallback similarity)
            goals.forEach((g: any) => {
                // If goal title contains query words, prioritize it
                const match = g.title.toLowerCase().includes(query.toLowerCase());
                results.push({
                    id: g.id,
                    type: 'GOAL',
                    content: `Goal: ${g.title}`,
                    title: g.title,
                    similarity: match ? 0.9 : 0.5
                });
            });

            // Processing Moods
            moods.forEach((mood: any) => {
                if (mood.comment?.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        id: mood.id,
                        type: 'MOOD',
                        content: mood.comment,
                        similarity: 0.85,
                        metadata: { score: mood.score }
                    });
                }
            });

            return results
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, limit);

        } catch (error) {
            console.error("[GlobalSearch] Search failed:", error);
            return [];
        }
    }

    private calculateSimilarity(v1: number[], v2: number[]): number {
        if (!v1 || !v2) return 0;
        let dotProduct = 0;
        let mag1 = 0;
        let mag2 = 0;
        for (let i = 0; i < v1.length; i++) {
            dotProduct += v1[i] * v2[i];
            mag1 += v1[i] * v1[i];
            mag2 += v2[i] * v2[i];
        }
        return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
    }
}

export const globalSearch = new GlobalSearchService();
