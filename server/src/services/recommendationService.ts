import prisma from '../lib/prisma';
import { AssessmentType, Severity } from '../generated/client';

export interface Recommendation {
    id: string;
    type: 'circle' | 'challenge' | 'resource' | 'action';
    title: string;
    description: string;
    icon: string;
    link?: string;
    metadata?: any;
}

export class RecommendationService {
    static async getPersonalizedRecommendations(userId: string): Promise<Recommendation[]> {
        const recommendations: Recommendation[] = [];

        // 1. Fetch latest data
        const assessments = await prisma.assessment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        const latestMoods = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // 2. Assessment-Based Recommendations
        for (const assessment of assessments) {
            if (assessment.type === 'GAD7') {
                if (assessment.severity === 'MODERATE' || assessment.severity === 'MODERATELY_SEVERE' || assessment.severity === 'SEVERE') {
                    recommendations.push({
                        id: `gad7-circle-${assessment.id}`,
                        type: 'circle',
                        title: 'Anxiety Support Circle',
                        description: 'Connect with peers who understand what you are going through.',
                        icon: 'Users',
                        metadata: { category: 'ANXIETY' }
                    });
                    recommendations.push({
                        id: `gad7-resource-${assessment.id}`,
                        type: 'resource',
                        title: 'Grounding Techniques',
                        description: 'A quick guide to the 5-4-3-2-1 technique for acute anxiety.',
                        icon: 'Wind',
                        link: 'https://www.urmc.rochester.edu/behavioral-health-partners/bh-blog/april-2018/5-4-3-2-1-coping-technique-for-anxiety.aspx'
                    });
                }
            } else if (assessment.type === 'PHQ9') {
                if (assessment.severity === 'MODERATELY_SEVERE' || assessment.severity === 'SEVERE') {
                    recommendations.push({
                        id: `phq9-action-${assessment.id}`,
                        type: 'action',
                        title: 'Professional Support',
                        description: 'Your scores suggest you might benefit from professional guidance. View campus counseling options.',
                        icon: 'PhoneCall',
                        link: '/support/counseling'
                    });
                }
            }
        }

        // 3. Mood-Based Recommendations
        if (latestMoods.length > 0) {
            const avgMood = latestMoods.reduce((acc, curr) => acc + curr.mood, 0) / latestMoods.length;
            
            if (avgMood < 3) {
                recommendations.push({
                    id: 'mood-challenge',
                    type: 'challenge',
                    title: 'Gratitude Journey',
                    description: 'Try noting 3 small wins today to shift your focus.',
                    icon: 'Star',
                    metadata: { challengeType: 'GRATITUDE' }
                });
            }
        }

        // 4. Academic Context (Mocked for now)
        const isExamSeason = true; // Use shared utility in real implementation
        if (isExamSeason) {
            recommendations.push({
                id: 'exam-circle',
                type: 'circle',
                title: 'Academic Stress Circle',
                description: 'Exam season is here. Share study tips and de-stress with others.',
                icon: 'BookOpen',
                metadata: { category: 'ACADEMIC_STRESS' }
            });
        }

        // De-duplicate items by type/title to avoid clutter
        const uniqueRecs = Array.from(new Map(recommendations.map(item => [item.title, item])).values());

        return uniqueRecs.slice(0, 4); // Show top 4 most relevant
    }
}
