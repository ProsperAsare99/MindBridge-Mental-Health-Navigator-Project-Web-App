import { ProactiveCheckInService } from '../../services/ai/proactiveCheckInService';
import { contextEngine } from '../../services/ai/contextEngineService';
import { geminiAdvanced } from '../../services/ai/geminiAdvancedService';
import prisma from '../../lib/prisma';

// Mock Dependencies
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        userGoal: {
            findMany: jest.fn()
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

describe('ProactiveCheckInService', () => {
    let proactiveService: ProactiveCheckInService;
    const mockUserId = 'user-123';

    beforeAll(() => {
        proactiveService = new ProactiveCheckInService();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('generateDailyNudge', () => {
        it('should generate a nudge based on user context', async () => {
            const mockContext = {
                user: { displayName: 'John' },
                temporal: {
                    recentMoods: { trend: 'STABLE', average: 4 },
                    academicCalendar: { isExamPeriod: false }
                },
                behavioral: {
                    patterns: { dayOfWeek: { worstDay: 'Monday' } }
                }
            };

            const mockGoals = [{ title: 'Sleep More' }];
            const mockLLMResponse = JSON.stringify({
                message: 'Keep it up, John! You are doing great.',
                type: 'ENCOURAGEMENT'
            });

            (contextEngine.buildContext as jest.Mock).mockResolvedValue(mockContext);
            ((prisma as any).userGoal.findMany as jest.Mock).mockResolvedValue(mockGoals);
            (geminiAdvanced.generateResponse as jest.Mock).mockResolvedValue(mockLLMResponse);

            const result = await proactiveService.generateDailyNudge(mockUserId);

            expect(contextEngine.buildContext).toHaveBeenCalledWith(mockUserId);
            expect(result.message).toBe('Keep it up, John! You are doing great.');
            expect(result.type).toBe('ENCOURAGEMENT');
            expect(result.actionLabel).toBe('Talk to Oracle');
        });

        it('should handle academic pressure context', async () => {
            const mockContext = {
                user: { displayName: 'John' },
                temporal: {
                    recentMoods: { trend: 'STABLE', average: 3 },
                    academicCalendar: { isExamPeriod: true }
                },
                behavioral: {
                    patterns: { dayOfWeek: { worstDay: 'Monday' } }
                }
            };

            const mockLLMResponse = JSON.stringify({
                message: 'Exams are near. Remember to take breadks.',
                type: 'ACADEMIC'
            });

            (contextEngine.buildContext as jest.Mock).mockResolvedValue(mockContext);
            ((prisma as any).userGoal.findMany as jest.Mock).mockResolvedValue([]);
            (geminiAdvanced.generateResponse as jest.Mock).mockResolvedValue(mockLLMResponse);

            const result = await proactiveService.generateDailyNudge(mockUserId);

            expect(result.type).toBe('ACADEMIC');
            expect(result.actionLabel).toBe('Study Tips');
        });
    });
});
