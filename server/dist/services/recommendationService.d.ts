export interface Recommendation {
    id: string;
    type: 'circle' | 'challenge' | 'resource' | 'action';
    title: string;
    description: string;
    icon: string;
    link?: string;
    metadata?: any;
}
export declare class RecommendationService {
    static getPersonalizedRecommendations(userId: string): Promise<Recommendation[]>;
}
