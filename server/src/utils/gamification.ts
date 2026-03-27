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

    // 1. Extract unique UTC dates (YYYY-MM-DD)
    const uniqueDates = new Set(moods.map(m => {
        const d = new Date(m.createdAt);
        return d.toISOString().split('T')[0];
    }));

    // 2. Sort dates descending
    const sortedDates = Array.from(uniqueDates).sort((a, b) => b.localeCompare(a));
    
    // 3. Current context
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // 4. Check if streak is broken (must have logged today or yesterday)
    const latestDate = sortedDates[0];
    if (latestDate !== todayStr && latestDate !== yesterdayStr) {
        return 0;
    }

    // 5. Count consecutive days
    let streak = 0;
    let expectedDate = new Date(latestDate);

    for (const dateStr of sortedDates) {
        const currentExpectedStr = expectedDate.toISOString().split('T')[0];
        if (dateStr === currentExpectedStr) {
            streak++;
            expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
        } else {
            // Gap found
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
