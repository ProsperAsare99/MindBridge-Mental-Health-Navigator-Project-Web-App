import { contextEngine } from './contextEngineService';
import { conversationManager } from './conversationManagerService';
import { modelRouter } from './modelRouterService';
import { promptBuilder } from './promptBuilderService';
import { geminiAdvanced } from './geminiAdvancedService';
import { safetyModerator } from './safetyModeratorService';

export class MindBridgeMasterService {
    
    /**
     * Orchestrate the entire AI interaction flow
     */
    async processUserMessage(userId: string, message: string, liveData?: any) {
        // 1. Safety Check (Immediacy)
        const isCrisis = safetyModerator.detectCrisis(message);
        
        // 2. Build Context
        const context = await contextEngine.buildContext(userId, liveData);
        
        // 3. Select Model
        const history = await conversationManager.getRecentHistory(userId);
        const complexity = modelRouter.calculateComplexity(message, {
            hasPreviousAssessments: true, 
            hasJournalHistory: true
        });
        const intensity = modelRouter.detectEmotionalIntensity(message);

        const modelSelection = modelRouter.selectModel({
            conversationLength: history.length,
            userRiskLevel: context.user.supportLevel === 'I feel mostly alone' ? 'High' : 'Low',
            messageComplexity: complexity,
            requiresAnalysis: history.length % 5 === 0 || isCrisis,
            crisisDetected: isCrisis,
            emotionalIntensity: intensity
        });

        // 4. Build Prompt
        const systemPrompt = promptBuilder.buildSystemPrompt(context);
        
        // Build history context for inclusion in prompt
        const historyContext = history.length > 0
            ? history.map((chat: any) =>
                `${chat.role === 'USER' ? (context.user.displayName || 'User') : 'The Oracle'}: ${chat.content}`
              ).join('\n')
            : 'This is the start of the conversation.';

        const fullPrompt = `${systemPrompt}\n\n## HISTORY\n${historyContext}\n\n## NEW MESSAGE\n"${message}"\n\nTHE ORACLE'S RESPONSE:`;

        // 5. Generate AI Response
        const startTime = Date.now();
        const responseText = await geminiAdvanced.generateResponse(fullPrompt, modelSelection.model);
        const responseTime = Date.now() - startTime;

        // 6. Persist Interaction
        await conversationManager.saveInteraction(userId, message, responseText, {
            model: modelSelection.model.name,
            isCrisis: isCrisis,
            responseTime
        });

        return {
            response: responseText,
            model: modelSelection.model.name,
            reason: modelSelection.reason,
            isCrisis: isCrisis
        };

    }
}

export const mindBridgeMaster = new MindBridgeMasterService();
