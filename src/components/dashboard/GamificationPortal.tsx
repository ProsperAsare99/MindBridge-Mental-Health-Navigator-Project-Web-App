"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';
import { MoodGarden } from './MoodGarden';
import { StreakCard } from './StreakCard';
import { AchievementList } from './AchievementList';
import { CelebrationModal } from './CelebrationModal';
import { RefreshCw, Trophy, Target, Activity, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const GamificationPortal = ({ className }: { className?: string }) => {
    const { data: session } = useSession();
    const [stats, setStats] = useState<any>(null);
    const [previousAchievements, setPreviousAchievements] = useState<any[]>([]);
    const [newAchievement, setNewAchievement] = useState<any>(null);
    const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        try {
            // No need to pass token explicitly; axios interceptor handles it now
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
        if (session) {
            fetchStats();
        }
    }, [session]);

    if (error && !stats) {
        return (
            <div className={cn("glass p-12 rounded-[3rem] flex flex-col items-center justify-center space-y-6 text-center border-red-500/10", className)}>
                <div className="h-16 w-16 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <Activity size={32} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Sync Delayed</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-[200px]">{error}</p>
                </div>
                <button 
                    onClick={fetchStats}
                    className="px-6 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <RefreshCw className="h-3.5 w-3.5" /> Retry Sync
                </button>
            </div>
        );
    }

    return (
        <div className={cn("space-y-8 relative", className)}>
            {loading && !stats && (
                <div className="absolute inset-0 z-50 glass rounded-[3rem] flex flex-col items-center justify-center space-y-4">
                    <div className="h-20 w-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Growing your garden...</p>
                </div>
            )}
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
                        loading={loading}
                        artifacts={stats?.achievements?.filter((a: any) => a.type.startsWith('GARDEN_ARTIFACT_')).map((a: any) => a.type)}
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
                        longestStreak={stats?.longestStreak || 0}
                        totalCheckIns={stats?.totalCheckIns || 0} 
                    />

                    {/* XP & Level Progress */}
                    <div className="glass p-6 rounded-[2.5rem] space-y-4 border-primary/10 relative overflow-hidden">
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20">
                                    {stats?.wellnessLevel || 1}
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Wellness Level</h4>
                                    <p className="text-sm font-black text-foreground uppercase tracking-tight">Stage {stats?.wellnessLevel || 1} Growth</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-primary uppercase">
                                    {stats?.wellnessXP || 0} / {Math.pow(stats?.wellnessLevel || 1, 2) * 100} XP
                                </span>
                            </div>
                        </div>

                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, ((stats?.wellnessXP || 0) / (Math.pow(stats?.wellnessLevel || 1, 2) * 100)) * 100)}%` }}
                                className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight text-center">
                            Only {Math.pow(stats?.wellnessLevel || 1, 2) * 100 - (stats?.wellnessXP || 0)} XP until next level!
                        </p>
                    </div>
                    
                    <AchievementList 
                        achievements={stats?.achievements || []} 
                    />
                </div>
            </div>
        </div>
    );
};
