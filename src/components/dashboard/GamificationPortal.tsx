"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { MoodGarden } from './MoodGarden';
import { StreakCard } from './StreakCard';
import { AchievementList } from './AchievementList';
import { CelebrationModal } from './CelebrationModal';
import { RefreshCw, Trophy, Target, Activity, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const GamificationPortal = ({ className }: { className?: string }) => {
    const [stats, setStats] = useState<any>(null);
    const [previousAchievements, setPreviousAchievements] = useState<any[]>([]);
    const [newAchievement, setNewAchievement] = useState<any>(null);
    const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await api.get('/gamification/stats');
            
            // Check for new achievements
            if (stats && response.achievements.length > previousAchievements.length) {
                const legacyIds = previousAchievements.map(a => a.id);
                const newlyUnlocked = response.achievements.find((a: any) => !legacyIds.includes(a.id));
                if (newlyUnlocked) {
                    setNewAchievement(newlyUnlocked);
                    setIsCelebrationOpen(true);
                }
            }
            
            setStats(response);
            setPreviousAchievements(response.achievements);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch gamification stats:', err);
            setError('Milestones momentarily unavailable.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading && !stats) {
        return (
            <div className={cn("glass p-8 rounded-[3rem] animate-pulse flex flex-col items-center justify-center space-y-4", className)}>
                <div className="h-40 w-40 bg-muted rounded-full" />
                <div className="h-4 w-32 bg-muted rounded-full" />
            </div>
        );
    }

    return (
        <div className={cn("space-y-8", className)}>
            <CelebrationModal 
                isOpen={isCelebrationOpen} 
                onClose={() => setIsCelebrationOpen(false)} 
                achievement={newAchievement} 
            />
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Wellness Journey</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth & Achievements</p>
                    </div>
                </div>
                
                <button 
                    onClick={fetchStats}
                    className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                    <RefreshCw className={cn("h-4 w-4 text-muted-foreground", loading && "animate-spin")} />
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Visual Garden Section */}
                <div className="space-y-6">
                    <MoodGarden 
                        level={stats?.garden?.growthLevel || 1} 
                        health={stats?.garden?.healthScore || 50} 
                    />
                    
                    <div className="glass p-6 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                <span className="text-[10px] font-black text-foreground uppercase">Current Challenge</span>
                            </div>
                            <span className="text-[9px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase">30 Days</span>
                        </div>
                        <h4 className="text-sm font-black text-foreground uppercase tracking-tight">Gratitude Journey</h4>
                        <p className="text-[11px] text-muted-foreground font-medium mt-1">Reflect on 3 things you're thankful for each day.</p>
                        <Link href="/dashboard/challenges">
                            <button className="w-full mt-4 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                View Progress <ChevronRight className="h-3 w-3" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Tracking & Badges Section */}
                <div className="space-y-6">
                    <StreakCard 
                        streak={stats?.streak || 0} 
                        totalCheckIns={stats?.totalCheckIns || 0} 
                    />
                    
                    <AchievementList 
                        achievements={stats?.achievements || []} 
                    />
                </div>
            </div>
        </div>
    );
};
