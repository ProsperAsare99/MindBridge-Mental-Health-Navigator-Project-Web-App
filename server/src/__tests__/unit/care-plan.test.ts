import { CarePlanService } from '../../services/ai/carePlanService';
import { contextEngine } from '../../services/ai/contextEngineService';
import { geminiAdvanced } from '../../services/ai/geminiAdvancedService';
import prisma from '../../lib/prisma';

// Mock Dependencies
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        carePlan: {
            upsert: jest.fn(),
            findFirst: jest.fn()
        }
    }
}));

jest.mock('../../services/ai/contextEngineService', () => ({
    contextEngine: {
        buildContext: jest.fn()
    }
}));

jest.mock('../../services/ai/geminiAdvancedService', () => ({
    geminiAdvanced: {
        generateResponse: jest.fn()
    }
}));

describe('CarePlanService', () => {
    let carePlanService: CarePlanService;
    const mockUserId = 'user-123';

    beforeAll(() => {
        carePlanService = new CarePlanService();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('generateWeeklyCarePlan', () => {
        it('should generate a care plan and save it to the database', async () => {
            const mockContext = {
                user: { displayName: 'John' },
                temporal: {
                    recentMoods: { average: 3.5, trend: 'STABLE' }
                },
                clinical: {
                    riskAssessment: { level: 'LOW' },
                    concernTrends: ['Academic Stress']
                },
                behavioral: {
                    patterns: { dayOfWeek: { worstDay: 'Monday' } }
                }
            };

            const mockLLMResponse = JSON.stringify({
                summary: 'You had a stable week, John. Keep it up!',
                moodAnalysis: { avgMood: 3.5, trend: 'STABLE' },
                growthTasks: [
                    { task: 'Walk 10 mins', reason: 'To boost endorphins' }
                ]
            });

            (contextEngine.buildContext as jest.Mock).mockResolvedValue(mockContext);
            (geminiAdvanced.generateResponse as jest.Mock).mockResolvedValue(mockLLMResponse);
            ((prisma as any).carePlan.upsert as jest.Mock).mockResolvedValue({ id: 'plan-1' });

            const result = await carePlanService.generateWeeklyCarePlan(mockUserId);

            expect(contextEngine.buildContext).toHaveBeenCalledWith(mockUserId);
            expect(geminiAdvanced.generateResponse).toHaveBeenCalled();
            expect((prisma as any).carePlan.upsert).toHaveBeenCalled();
            expect(result.id).toBe('plan-1');
        });
    });

    describe('getLatestCarePlan', () => {
        it('should return the most recent care plan', async () => {
            ((prisma as any).carePlan.findFirst as jest.Mock).mockResolvedValue({ id: 'latest-plan' });

            const result = await carePlanService.getLatestCarePlan(mockUserId);

            expect((prisma as any).carePlan.findFirst).toHaveBeenCalledWith({
                where: { userId: mockUserId },
                orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }]
            });
            expect(result.id).toBe('latest-plan');
        });
    });
});
