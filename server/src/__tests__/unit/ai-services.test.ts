import { ContextEngineService } from '../../services/ai/contextEngineService';
import { SafetyModeratorService } from '../../services/ai/safetyModeratorService';
import { ModelRouter } from '../../services/ai/modelRouterService';
import prisma from '../../lib/prisma';

// Mock Prisma
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        },
        mood: {
            findMany: jest.fn(),
        },
        assessment: {
            findMany: jest.fn(),
        },
        chatMessage: {
            findMany: jest.fn(),
        },
        academicEvent: {
            findMany: jest.fn(),
        },
        $disconnect: jest.fn(),
    },
}));

describe('AI Services Unit Tests', () => {
    const contextEngine = new ContextEngineService();
    const safetyModerator = new SafetyModeratorService();
    const modelRouter = new ModelRouter();

    const mockUserId = 'test-user-id';
    const mockUser = {
        id: mockUserId,
        email: 'test@mindbridge.test',
        displayName: 'Test Student',
        university: 'KNUST',
        academicLevel: 300,
        program: 'Computer Science',
        createdAt: new Date(),
        emergencyContacts: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('ContextEngineService', () => {
        it('should build comprehensive context for a user', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (prisma.mood.findMany as jest.Mock).mockResolvedValue([
                { value: 4, createdAt: new Date() },
                { value: 3, createdAt: new Date() },
                { value: 5, createdAt: new Date() }
            ]);
            (prisma.assessment.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.chatMessage.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.academicEvent.findMany as jest.Mock).mockResolvedValue([]);

            const context = await contextEngine.buildContext(mockUserId);

            expect(context).toHaveProperty('user');
            expect(context).toHaveProperty('temporal');
            expect(context).toHaveProperty('behavioral');
            expect(context.user.displayName).toBe('Test Student');
            expect(context.temporal.recentMoods.entryCount).toBe(3);
        });

        it('should assess risk level correctly based on moods', async () => {
            (prisma.mood.findMany as jest.Mock).mockResolvedValue([
                { value: 1, createdAt: new Date() },
                { value: 1, createdAt: new Date() },
                { value: 2, createdAt: new Date() }
            ]);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            const context = await contextEngine.buildContext(mockUserId);
            // Average mood is (1+1+2)/3 = 1.33. Risk should be MODERATE or HIGH.
            expect(context.clinical.riskAssessment.level).not.toBe('LOW');
        });
    });

    describe('SafetyModeratorService', () => {
        it('should detect crisis language in input', async () => {
            const message = "I feel like giving up on life, I can't do this anymore";
            const result = await safetyModerator.moderateInput(mockUserId, message, {} as any);
            
            expect(result.crisis.detected).toBe(true);
            expect(result.safe).toBe(false);
        });

        it('should assess emotional intensity correctly', async () => {
            const message = "I am EXTREMELY overwhelmed and completely devastated by my results";
            const result = await safetyModerator.moderateInput(mockUserId, message, {} as any);
            
            expect(result.crisis.emotionalIntensity).toBeGreaterThan(7);
        });

        it('should flag inappropriate content', async () => {
            const message = "Include some profanity here"; // Depending on your keywords
            // Assuming your moderator has a list of filtered words
            // This is a placeholder for the actual test logic
        });
    });

    describe('ModelRouter', () => {
        it('should select PRO model for crisis situations', () => {
            const context = {
                crisisDetected: true,
                emotionalIntensity: 10,
                userRiskLevel: 'HIGH'
            };
            const result = modelRouter.selectModel(context as any);
            expect(result.model.name).toContain('pro');
        });

        it('should select FLASH model for standard interactions', () => {
            const context = {
                crisisDetected: false,
                emotionalIntensity: 3,
                messageComplexity: 0,
                conversationLength: 2
            };
            const result = modelRouter.selectModel(context as any);
            expect(result.model.name).toContain('flash');
        });

        it('should calculate complexity based on message length and punctuation', () => {
            const complexMsg = "I'm worried about my thesis, my internship, and my family's financial situation all at once; I don't know how to cope.";
            const simpleMsg = "Hi, how are you?";
            
            const complexScore = (modelRouter as any).calculateComplexity(complexMsg);
            const simpleScore = (modelRouter as any).calculateComplexity(simpleMsg);
            
            expect(complexScore).toBeGreaterThan(simpleScore);
        });
    });
});
