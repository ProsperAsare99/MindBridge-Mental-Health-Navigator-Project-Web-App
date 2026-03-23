"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACHIEVEMENTS = exports.calculateStreak = void 0;
const calculateStreak = (moods) => {
    if (moods.length === 0)
        return 0;
    const sortedMoods = [...moods].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    if (days[0] < yesterday)
        return 0;
    let currentExpected = days[0];
    for (const day of days) {
        if (day === currentExpected) {
            streak++;
            currentExpected -= 86400000;
        }
        else {
            break;
        }
    }
    return streak;
};
exports.calculateStreak = calculateStreak;
exports.ACHIEVEMENTS = [
    { type: 'milestone_7', title: '7-Day Warrior', threshold: 7, description: 'Log your mood for 7 consecutive days.' },
    { type: 'milestone_30', title: 'Monthly Master', threshold: 30, description: 'Maintain a 30-day wellness streak.' },
    { type: 'milestone_90', title: 'Wellness Titan', threshold: 90, description: '90 days of consistent self-awareness.' },
    { type: 'resilience_builder', title: 'Resilience Builder', threshold: 10, description: 'Log 10 moods during challenging periods.' },
    { type: 'self_awareness_champion', title: 'Self-Awareness Champion', threshold: 50, description: 'Complete 50 total mood check-ins.' }
];
//# sourceMappingURL=gamification.js.map