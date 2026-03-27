import prisma from '../lib/prisma';

export class CrisisService {
    static async generateClinicalBrief(userId: string) {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // 1. Fetch relevant clinical data
        const [moods, assessments, crisisFlags] = await Promise.all([
            prisma.moodEntry.findMany({
                where: { userId, createdAt: { gte: sevenDaysAgo } },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.assessment.findMany({
                where: { userId, createdAt: { gte: sevenDaysAgo } },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.moodEntry.count({
                where: { userId, createdAt: { gte: sevenDaysAgo }, crisisFlag: true }
            })
        ]);

        // 2. Synthesize Brief
        const avgMood = moods.length > 0 
            ? moods.reduce((a, b) => a + b.mood, 0) / moods.length 
            : null;

        const primaryStressors = this.extractStressors(moods);
        const latestAssessments = assessments.map(a => `${a.type}: ${a.severity} (Score: ${a.score})`);

        return {
            patientId: userId.substring(0, 8).toUpperCase(), // Anonymized ID for brief
            timestamp: now,
            summary: {
                moodTrend: avgMood ? `Average mood is ${avgMood.toFixed(1)}/5` : "No recent mood data",
                crisisActivity: `${crisisFlags} flags detected in the last 7 days`,
                primaryConcerns: primaryStressors.slice(0, 3),
                clinicalNotes: latestAssessments
            },
            recommendationForCounselor: this.generateProvisionalGuidance(avgMood, crisisFlags, assessments)
        };
    }

    private static extractStressors(moods: any[]) {
        const descriptors = moods.flatMap(m => m.descriptors || []);
        const counts: Record<string, number> = {};
        descriptors.forEach(d => counts[d] = (counts[d] || 0) + 1);
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    }

    private static generateProvisionalGuidance(avgMood: number | null, crisisFlags: number, assessments: any[]) {
        if (crisisFlags > 0 || (avgMood !== null && avgMood < 2)) {
            return "Immediate stabilization recommended. High volatility or persistent low mood detected.";
        }
        if (assessments.some(a => a.severity === 'SEVERE')) {
            return "Prioritize clinical assessment for reported severe symptoms.";
        }
        return "Patient is seeking proactive support. Focus on coping literacy.";
    }
}
