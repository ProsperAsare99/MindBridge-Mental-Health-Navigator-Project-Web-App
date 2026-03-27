import { MoodEntry } from '../../prisma/generated/client';

export const XP_REWARDS = {
    MOOD_LOG: 15,
    SOCIAL_ACTIVITY: 20,
    ASSESSMENT_COMPLETE: 50,
    STREAK_MILESTONE: 100,
    CHALLENGE_JOIN: 25,
    CHALLENGE_COMPLETE: 200,
    ONBOARDING_COMPLETE: 100,
    MEDITATION_COMPLETE: 50
};

export const calculateLevel = (xp: number): number => {
    // Basic level curve: Level = floor(sqrt(xp / 100)) + 1
    // L1: 0-99, L2: 100-399, L3: 400-899, etc.
    return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getNextLevelXP = (level: number): number => {
    return Math.pow(level, 2) * 100;
};

export const calculateStreak = (moods: MoodEntry[]): number => {
    if (moods.length === 0) return 0;

    const sortedMoods = [...moods].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const uniqueDays = new Set(sortedMoods.map(m => {
        const d = new Date(m.createdAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }));

    const days = Array.from(uniqueDays).sort((a, b) => b - a);
    
    let streak = 0;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const today = now.getTime();
    const yesterday = today - 86400000;

    // If the latest check-in is not today or yesterday, streak is broken
    if (days[0] < yesterday) return 0;

    let currentExpected = days[0];
    for (const day of days) {
        if (day === currentExpected) {
            streak++;
            currentExpected -= 86400000;
        } else {
            break;
        }
    }

    return streak;
};

export const ACHIEVEMENTS = [
    { type: 'milestone_7', title: '7-Day Warrior', threshold: 7, description: 'Log your mood for 7 consecutive days.', icon: 'Shield' },
    { type: 'milestone_30', title: 'Monthly Master', threshold: 30, description: 'Maintain a 30-day wellness streak.', icon: 'Trophy' },
    { type: 'milestone_90', title: 'Wellness Titan', threshold: 90, description: '90 days of consistent self-awareness.', icon: 'Crown' },
    { type: 'resilience_builder', title: 'Resilience Builder', threshold: 10, description: 'Log 10 moods during challenging periods.', icon: 'Anchor' },
    { type: 'self_awareness_champion', title: 'Awareness Hero', threshold: 50, description: 'Complete 50 total mood check-ins.', icon: 'Zap' },
    { type: 'social_butterfly', title: 'Social Butterfly', threshold: 5, description: 'Join 5 community support circles.', icon: 'Users' },
    { type: 'mindfulness_expert', title: 'Inner Peace', threshold: 20, description: 'Complete 20 breathing or meditation sessions.', icon: 'Moon' }
];
