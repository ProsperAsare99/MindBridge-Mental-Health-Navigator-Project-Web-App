import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiAdvanced } from "./geminiAdvancedService";

export interface MediaAnalysis {
    insight: string;
    emotions: string[];
    suggestedTopics: string[];
}

export class MediaAIService {
    
    /**
     * Analyze an image (e.g., photo of a user's environment or a drawing)
     * Note: Expects base64 data for simplicity in this implementation
     */
    async analyzeJournalImage(base64Image: string, userId: string): Promise<MediaAnalysis> {
        try {
            const prompt = `
You are the "MindBridge Vision Expert". Analyze this image provided by the student as part of their mental health journal. 
Provide a warm, empathetic reflection on what the image might represent about their current state or mood.
Detect the underlying "vibe" or emotional tone.

Output JSON: {
  "insight": "string (warm reflection)",
  "emotions": ["list of strings"],
  "suggestedTopics": ["list of strings for chat follow-up"]
}
`;

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const text = result.response.text();
            const jsonStr = text.replace(/```json|```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("[MediaAI] Image Error:", error);
            throw new Error("Failed to analyze image");
        }
    }

    /**
     * Analyze audio logs (Speech-to-Insights)
     */
    async analyzeAudioJournal(base64Audio: string, userId: string): Promise<MediaAnalysis> {
        try {
            const prompt = `
Analyze this audio recording transcript (or use audio data if supported). 
The student is recording a verbal journal. Listen for emotional tone, pauses (if possible), and core concerns.
Provide a supportive synthesis.

Output JSON: {
  "insight": "string (warm synthesis)",
  "emotions": ["list of strings"],
  "suggestedTopics": ["list of strings"]
}
`;

            // Note: For now, we simulate the transcription via Gemini multimodality
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Audio,
                        mimeType: "audio/mp3" 
                    }
                }
            ]);

            const text = result.response.text();
            const jsonStr = text.replace(/```json|```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("[MediaAI] Audio Error:", error);
            throw new Error("Failed to analyze audio");
        }
    }
}

export const mediaAI = new MediaAIService();
