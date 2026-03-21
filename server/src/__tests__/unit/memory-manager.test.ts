import { MemoryManagerService } from '../../services/ai/memoryManagerService';
import { embeddingsService } from '../../services/ai/embeddingsService';
import { geminiAdvanced } from '../../services/ai/geminiAdvancedService';
import prisma from '../../lib/prisma';

// Mock Dependencies
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        memoryEntry: {
            create: jest.fn(),
            findMany: jest.fn()
        }
    }
}));

jest.mock('../../services/ai/embeddingsService', () => ({
    embeddingsService: {
        generateEmbedding: jest.fn(),
        cosineSimilarity: jest.fn()
    }
}));

jest.mock('../../services/ai/geminiAdvancedService', () => ({
    geminiAdvanced: {
        generateResponse: jest.fn()
    }
}));

describe('MemoryManagerService', () => {
    let memoryManager: MemoryManagerService;
    const mockUserId = 'user-123';

    beforeAll(() => {
        memoryManager = new MemoryManagerService();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('saveMemory', () => {
        it('should generate an embedding and save the memory to the database', async () => {
            const content = 'I love playing the piano';
            const mockEmbedding = [0.1, 0.2, 0.3];
            (embeddingsService.generateEmbedding as jest.Mock).mockResolvedValue(mockEmbedding);
            (prisma as any).memoryEntry.create.mockResolvedValue({ id: 'mem-1', content });

            const result = await memoryManager.saveMemory(mockUserId, content, { category: 'PERSONAL', importance: 8 });

            expect(embeddingsService.generateEmbedding).toHaveBeenCalledWith(content);
            expect((prisma as any).memoryEntry.create).toHaveBeenCalledWith({
                data: {
                    userId: mockUserId,
                    content,
                    category: 'PERSONAL',
                    importance: 8,
                    embedding: mockEmbedding
                }
            });
            expect(result.content).toBe(content);
        });
    });

    describe('searchMemories', () => {
        it('should return semantically similar memories', async () => {
            const query = 'What are my hobbies?';
            const mockQueryVector = [0.1, 0.1, 0.1];
            const mockMemories = [
                { id: '1', content: 'I like football', embedding: [0.1, 0.1, 0.1], category: 'PERSONAL', importance: 5 },
                { id: '2', content: 'I hate exams', embedding: [0.9, 0.9, 0.9], category: 'ACADEMIC', importance: 7 }
            ];

            (embeddingsService.generateEmbedding as jest.Mock).mockResolvedValue(mockQueryVector);
            ((prisma as any).memoryEntry.findMany as jest.Mock).mockResolvedValue(mockMemories);
            (embeddingsService.cosineSimilarity as jest.Mock)
                .mockReturnValueOnce(1.0) // Match for first
                .mockReturnValueOnce(0.1); // No match for second

            const results = await memoryManager.searchMemories(mockUserId, query);

            expect(results.length).toBe(1);
            expect(results[0].content).toBe('I like football');
            expect(results[0].similarity).toBe(1.0);
        });
    });

    describe('extractAndSaveFromConversation', () => {
        it('should use LLM to extract facts and save them', async () => {
            const messages = [
                { role: 'USER', content: 'I am planning to graduate in 2026 and I want to work at Google.' },
                { role: 'ASSISTANT', content: 'That is a great goal!' }
            ];
            const mockLLMResponse = JSON.stringify([
                { content: 'Graduation plan: 2026', category: 'ACADEMIC', importance: 9 },
                { content: 'Career goal: Google', category: 'GOAL', importance: 10 }
            ]);

            (geminiAdvanced.generateResponse as jest.Mock).mockResolvedValue(mockLLMResponse);
            (embeddingsService.generateEmbedding as jest.Mock).mockResolvedValue([0,0,0]);

            await memoryManager.extractAndSaveFromConversation(mockUserId, messages);

            expect(geminiAdvanced.generateResponse).toHaveBeenCalled();
            expect((prisma as any).memoryEntry.create).toHaveBeenCalledTimes(2);
        });
    });
});
