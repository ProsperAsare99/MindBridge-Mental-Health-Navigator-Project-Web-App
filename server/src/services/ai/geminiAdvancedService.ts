import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { geminiConfig } from '../../config/geminiConfig';
import prisma from '../../lib/prisma';
import crypto from 'crypto';

/**
 * GeminiAdvancedService - Refactored to be Redis-free and Rate-Limit-free 
 * as requested for the MindBridge development environment.
 */
export class GeminiAdvancedService {
    private genAI: GoogleGenerativeAI;
    private models: Record<string, GenerativeModel> = {};

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.initializeModels();
    }

    private initializeModels() {
        Object.entries(geminiConfig.models).forEach(([key, config]) => {
            this.models[key] = this.genAI.getGenerativeModel({
                model: config.name,
                generationConfig: config.config,
                safetySettings: geminiConfig.safetySettings,
            });
        });
    }

    /**
     * Generate response without rate limiting or Redis caching
     */
    async generateResponse(prompt: string, modelSelection: any, userId?: string): Promise<string> {
        try {
            // Rate limiting disabled as requested
            
            const modelKey = Object.keys(geminiConfig.models).find(
                k => (geminiConfig.models as any)[k].name === modelSelection.name
            ) || 'flash';

            const result = await this.generateWithRetry(this.models[modelKey], prompt);
            const response = await result.response;
            const text = response.text();

            if (userId) {
                await this.logUsage(userId, {
                    model: modelSelection.name,
                    tokensUsed: this.estimateTokens(text),
                    finishReason: response.candidates?.[0]?.finishReason
                });
            }

            return text;
        } catch (error: any) {
            console.error('[Gemini Service Error]', error);
            throw error;
        }
    }

    private async generateWithRetry(model: GenerativeModel, prompt: string, attempt: number = 1): Promise<any> {
        try {
            return await model.generateContent(prompt);
        } catch (error: any) {
            if (attempt >= geminiConfig.retry.maxRetries) throw error;
            
            const delay = geminiConfig.retry.initialDelayMs * Math.pow(geminiConfig.retry.backoffMultiplier, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.generateWithRetry(model, prompt, attempt + 1);
        }
    }

    private async logUsage(userId: string, metadata: any) {
        try {
            await prisma.usageLog.create({
                data: {
                    userId,
                    service: 'GEMINI',
                    model: metadata.model,
                    tokensUsed: metadata.tokensUsed,
                    finishReason: metadata.finishReason
                }
            });
        } catch (e) {
            // Silently fail usage logging if DB is busy
        }
    }

    private estimateTokens(text: string): number {
        return Math.ceil(text.length / 4);
    }
}

export const geminiAdvanced = new GeminiAdvancedService();
