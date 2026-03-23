import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
export declare const geminiConfig: {
    models: {
        flash: {
            name: string;
            useCase: string;
            config: {
                temperature: number;
                topP: number;
                topK: number;
                maxOutputTokens: number;
            };
        };
        pro: {
            name: string;
            useCase: string;
            config: {
                temperature: number;
                topP: number;
                topK: number;
                maxOutputTokens: number;
            };
        };
        crisis: {
            name: string;
            useCase: string;
            config: {
                temperature: number;
                topP: number;
                topK: number;
                maxOutputTokens: number;
            };
        };
    };
    safetySettings: {
        category: HarmCategory;
        threshold: HarmBlockThreshold;
    }[];
    rateLimits: {
        requestsPerMinute: number;
        requestsPerDay: number;
        tokensPerMinute: number;
    };
    cache: {
        enabled: boolean;
        systemPromptTTL: number;
        conversationTTL: number;
    };
    retry: {
        maxRetries: number;
        backoffMultiplier: number;
        initialDelayMs: number;
    };
};
