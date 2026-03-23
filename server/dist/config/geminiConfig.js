"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiConfig = void 0;
const generative_ai_1 = require("@google/generative-ai");
exports.geminiConfig = {
    models: {
        // Fast responses for simple interactions
        flash: {
            name: 'gemini-1.5-flash',
            useCase: 'quick_responses',
            config: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 800,
            }
        },
        // Deep analysis and complex conversations
        pro: {
            name: 'gemini-1.5-pro',
            useCase: 'complex_analysis',
            config: {
                temperature: 0.8,
                topP: 0.9,
                topK: 60,
                maxOutputTokens: 2048,
            }
        },
        // Crisis situations - most careful and empathetic
        crisis: {
            name: 'gemini-1.5-pro',
            useCase: 'crisis_intervention',
            config: {
                temperature: 0.6, // More conservative
                topP: 0.7,
                topK: 30,
                maxOutputTokens: 1500,
            }
        }
    },
    // Safety settings
    safetySettings: [
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE, // We handle mental health content
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE, // Mental health content may be flagged
        },
    ],
    // Rate limiting
    rateLimits: {
        requestsPerMinute: 60,
        requestsPerDay: 1500,
        tokensPerMinute: 32000,
    },
    // Caching strategy
    cache: {
        enabled: true,
        systemPromptTTL: 3600, // 1 hour
        conversationTTL: 1800, // 30 minutes
    },
    // Retry configuration
    retry: {
        maxRetries: 3,
        backoffMultiplier: 2,
        initialDelayMs: 1000,
    }
};
//# sourceMappingURL=geminiConfig.js.map