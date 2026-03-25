"use client";

import { useState, useEffect, useCallback } from "react";

interface ActivityStats {
    isInactive: boolean;
    usageFrequency: 'low' | 'medium' | 'high';
    suggestion: string | null;
    actionType: string | null;
    actionLabel: string | null;
    magnitude: number;
}

const IDLE_THRESHOLD = 1000 * 60 * 30; // 30 minutes of app inactivity
const MOVEMENT_THRESHOLD = 0.5; // Lower sensitive threshold for "any movement"

const SUGGESTIONS = [
    { 
        text: "You’ve been inactive for a while. A short walk might help improve your mood.", 
        type: 'exercise', 
        label: 'Find a Path',
        href: '/dashboard/resources?search=walking'
    },
    { 
        text: "It's been a quiet day. Why not check in with your peers in the community?", 
        type: 'social', 
        label: 'Join Community',
        href: '/dashboard/community'
    },
    { 
        text: "Focus seems high. Remember to take a mindful break to prevent burnout.", 
        type: 'mindfulness', 
        label: 'Start Breathing',
        href: '/dashboard/resources?search=breathing'
    },
    { 
        text: "Stay hydrated! A small break for water can boost your cognitive function.", 
        type: 'health', 
        label: 'Well-being Tips',
        href: '/dashboard/resources'
    }
];

export function useActivityDetection(): ActivityStats {
    const [isInactive, setIsInactive] = useState(false);
    const [usageFrequency, setUsageFrequency] = useState<'low' | 'medium' | 'high'>('medium');
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [actionType, setActionType] = useState<string | null>(null);
    const [actionLabel, setActionLabel] = useState<string | null>(null);
    const [magnitude, setMagnitude] = useState(0);

    const updateLastInteraction = useCallback(() => {
        const now = Date.now();
        localStorage.setItem("mb_last_interaction", now.toString());
        
        const today = new Date().toDateString();
        const stats = JSON.parse(localStorage.getItem("mb_usage_stats") || "{}");
        const todayStats = stats[today] || { count: 0, lastUpdate: now };
        
        if (now - todayStats.lastUpdate > 1000 * 60 * 2) { // 2 mins threshold
            todayStats.count += 1;
            todayStats.lastUpdate = now;
            stats[today] = todayStats;
            localStorage.setItem("mb_usage_stats", JSON.stringify(stats));
        }

        if (todayStats.count < 3) setUsageFrequency('low');
        else if (todayStats.count < 10) setUsageFrequency('medium');
        else setUsageFrequency('high');

        setIsInactive(false);
    }, []);

    useEffect(() => {
        const last = parseInt(localStorage.getItem("mb_last_interaction") || "0");
        if (Date.now() - last > IDLE_THRESHOLD) setIsInactive(true);

        const events = ["mousedown", "keydown", "scroll", "touchstart"];
        events.forEach(e => window.addEventListener(e, updateLastInteraction));

        let lastMovement = Date.now();
        const handleMotion = (event: DeviceMotionEvent) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;
            const mag = Math.sqrt((acc.x || 0)**2 + (acc.y || 0)**2 + (acc.z || 0)**2) - 9.8; // Normalize gravity
            setMagnitude(Math.max(0, mag));
            
            if (mag > 1.5) {
                lastMovement = Date.now();
                setIsInactive(false);
            }
        };

        if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
            window.addEventListener("devicemotion", handleMotion);
        }

        const interval = setInterval(() => {
            const lastInteraction = parseInt(localStorage.getItem("mb_last_interaction") || "0");
            const timeSinceLastInteraction = Date.now() - lastInteraction;
            const timeSinceLastMovement = Date.now() - lastMovement;

            if (timeSinceLastInteraction > IDLE_THRESHOLD || timeSinceLastMovement > IDLE_THRESHOLD) {
                setIsInactive(true);
                const s = SUGGESTIONS[0];
                setSuggestion(s.text);
                setActionType(s.type);
                setActionLabel(s.label);
            } else if (usageFrequency === 'low') {
                const s = SUGGESTIONS[1];
                setSuggestion(s.text);
                setActionType(s.type);
                setActionLabel(s.label);
            } else if (usageFrequency === 'high') {
                const s = SUGGESTIONS[2];
                setSuggestion(s.text);
                setActionType(s.type);
                setActionLabel(s.label);
            } else {
                setSuggestion(null);
                setActionType(null);
                setActionLabel(null);
            }
        }, 1000 * 60);

        return () => {
            events.forEach(e => window.removeEventListener(e, updateLastInteraction));
            window.removeEventListener("devicemotion", handleMotion);
            clearInterval(interval);
        };
    }, [updateLastInteraction, usageFrequency]);

    return { isInactive, usageFrequency, suggestion, actionType, actionLabel, magnitude };
}
