import prisma from '../../lib/prisma';
import { geminiAdvanced } from './geminiAdvancedService';
import { contextEngine } from './contextEngineService';

export interface StabilityForecast {
    date: string;
    level: 'STABLE' | 'MODERATE' | 'HIGH_RISK';
    factor?: string;
}

export class PredictiveRiskService {
    
    /**
     * Forecast risk/stability for the next 7 days
     */
    async forecastNext7Days(userId: string): Promise<StabilityForecast[]> {
        try {
            const context = await contextEngine.buildContext(userId);
            
            const prompt = `
You are the "Predictive Intelligence" for MindBridge. Analyze the user's data and forecast their mental health stability for the NEXT 7 DAYS.

## USER DATA (LAST 7-30 DAYS):
- Name: ${context.user.displayName}
- Avg Mood: ${context.temporal.recentMoods.average}/5 (Count: ${context.temporal.recentMoods.entryCount})
- Trend: ${context.temporal.recentMoods.trend}
- Risk Level: ${context.clinical.riskAssessment.level}
- Concerns: ${Object.keys(context.clinical.concernTrends).join(', ')}
- Academic: ${context.temporal.academicCalendar.isExamPeriod ? 'EXAMS SOON' : 'Normal'}
- Engagement: ${context.behavioral.engagementLevel}

## OBJECTIVE:
Forecast each of the next 7 days. Identify potential "Dip Days" based on their hardest days (Worst day is usually ${context.behavioral.patterns.dayOfWeek?.worstDay || 'N/A'}).

Output JSON: {
  "forecast": [
    {"date": "YYYY-MM-DD", "level": "STABLE/MODERATE/HIGH_RISK", "factor": "Reason for this level"}
  ]
}
`;

            const rawResponse = await geminiAdvanced.generateResponse(prompt, { name: 'gemini-1.5-flash' }, userId);
            const jsonStr = rawResponse.replace(/```json|```/g, '').trim();
            const data = JSON.parse(jsonStr);

            return data.forecast;
        } catch (error) {
            console.error("[PredictiveRisk] Error forecasting:", error);
            // Default stable forecast if AI fails
            return Array.from({ length: 7 }).map((_, i) => ({
                date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                level: 'STABLE'
            }));
        }
    }
}

export const predictiveRisk = new PredictiveRiskService();
