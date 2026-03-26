// Genkit configuration is currently disabled to resolve Node 22 tracing conflicts
/*
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
    model: 'googleai/gemini-1.5-flash',
});
*/
export const ai = {} as any; // Mock for type safety if needed elsewhere
