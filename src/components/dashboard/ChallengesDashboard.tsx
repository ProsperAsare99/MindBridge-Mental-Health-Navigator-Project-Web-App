"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Target, Users, Calendar, ChevronRight, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ChallengesDashboard = () => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchChallenges = async () => {
        setLoading(true);
        try {
            const data = await api.get('/gamification/challenges');
            setChallenges(data);
        } catch (err) {
            console.error('Failed to fetch challenges:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

    const joinChallenge = async (id: string) => {
        try {
            await api.post(`/gamification/challenges/${id}/join`, {});
            fetchChallenges();
        } catch (err) {
            console.error('Join error:', err);
        }
    };

    // Pre-defined static challenges if DB is empty
    const demoChallenges = [
        {
            id: 'gratitude-1',
            title: 'Gratitude Journey',
            description: 'Note 3 things you are thankful for every day.',
            durationDays: 30,
            type: 'GRATITUDE',
            participantsCount: 124,
            isCommunity: true
        },
        {
            id: 'mindfulness-1',
            title: 'Mindfulness Month',
            description: 'Complete a 5-minute breathing exercise daily.',
            durationDays: 30,
            type: 'MINDFULNESS',
            participantsCount: 89,
            isCommunity: false
        }
    ];

    const displayChallenges = challenges.length > 0 ? challenges : demoChallenges;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-sky-400/10 flex items-center justify-center border border-sky-400/20">
                        <Target className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Wellness Challenges</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth through consistency</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {displayChallenges.map((challenge, i) => {
                    const isJoined = challenge.participants?.length > 0;
                    const progress = isJoined ? challenge.participants[0].progress : 0;
                    const percent = Math.min(100, (progress / challenge.durationDays) * 100);

                    return (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "glass p-6 rounded-[2.5rem] relative overflow-hidden group",
                                isJoined ? "border-primary/20" : "border-white/5"
                            )}
                        >
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                                                challenge.isCommunity ? "bg-amber-400/10 text-amber-500" : "bg-primary/10 text-primary"
                                            )}>
                                                {challenge.isCommunity ? "Community" : "Personal"}
                                            </span>
                                            <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                                <Calendar className="h-2 w-2" /> {challenge.durationDays} Days
                                            </span>
                                        </div>
                                        <h3 className="text-base font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{challenge.title}</h3>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(p => (
                                            <div key={p} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                                                <span className="text-[8px] font-black">?</span>
                                            </div>
                                        ))}
                                        <div className="h-6 w-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center">
                                            <span className="text-[8px] font-black text-primary text-[8px]">+{challenge.participantsCount || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground font-medium line-clamp-2">{challenge.description}</p>

                                {isJoined ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-primary">Progress</span>
                                            <span className="text-muted-foreground">{progress}/{challenge.durationDays} Days</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-500 uppercase">
                                            <CheckCircle2 className="h-3 w-3" /> Day {progress} completed
                                        </div>
                                    </div>
                                ) : (
                                    <Button 
                                        onClick={() => joinChallenge(challenge.id)}
                                        className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/10"
                                    >
                                        Join Journey
                                    </Button>
                                )}
                            </div>

                            {/* Background decoration */}
                            <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <Trophy size={120} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Global Community Goal Card */}
            <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-sky-400/5 relative overflow-hidden group">
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Global Milestone</h3>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
                            Help us reach <span className="text-primary">10,000</span> collective mindfulness minutes.
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-foreground">8,432</span>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Minutes Logged</span>
                            </div>
                            <div className="h-10 w-[2px] bg-muted/50" />
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-primary">84%</span>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Goal Reached</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                className="h-full bg-gradient-to-r from-primary to-sky-400"
                            />
                        </div>
                        <p className="text-[11px] font-medium text-muted-foreground">Every check-in contributes to our collective mental wellbeing. Stay anonymous, stay resilient.</p>
                        <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                            Contribute Now <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
