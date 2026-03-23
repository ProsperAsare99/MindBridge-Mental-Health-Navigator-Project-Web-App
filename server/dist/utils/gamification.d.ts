import { MoodEntry } from '../generated/client_new';
export declare const calculateStreak: (moods: MoodEntry[]) => number;
export declare const ACHIEVEMENTS: {
    type: string;
    title: string;
    threshold: number;
    description: string;
}[];
