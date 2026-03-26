"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
// Genkit configuration is currently disabled to resolve Node 22 tracing conflicts
/*
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
    model: 'googleai/gemini-1.5-flash',
});
*/
exports.ai = {}; // Mock for type safety if needed elsewhere
//# sourceMappingURL=genkit-config.js.map