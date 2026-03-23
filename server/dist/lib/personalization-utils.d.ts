/**
 * Personalization Utilities for Smart Insights
 * Translates user data into contextually rich strings for personalized guidance.
 */
export declare const getPersonalizationContext: (user: any) => {
    name: any;
    language: any;
    academicLevel: string;
    program: any;
    concerns: any;
    faithLevel: any;
    approach: any;
    academicNote: string;
    programNote: string;
    displayName: any;
    institution: any;
};
export declare const getMoodInsight: (recentMoods: any[]) => string;
