"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Target, Users, Calendar, ChevronRight, CheckCircle2, Clock, Trophy, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
            id: 'presence-1',
            title: 'Presence Mastery',
            description: 'Complete 3 Zen Mode breathing sessions this week to build core resilience.',
            durationDays: 7,
            type: 'MINDFULNESS',
            participantsCount: 42,
            isCommunity: true
        },
        {
            id: 'gratitude-1',
            title: 'Gratitude Journey',
            description: 'Note 3 things you are thankful for every day to boost your perspective.',
            durationDays: 30,
            type: 'GRATITUDE',
            participantsCount: 124,
            isCommunity: true
        },
        {
            id: 'mindfulness-1',
            title: 'Mindfulness Month',
            description: 'Maintain a consistent daily breathing rhythm for 30 days.',
            durationDays: 30,
            type: 'MINDFULNESS',
            participantsCount: 89,
            isCommunity: false
        }
    ];

    const displayChallenges = challenges.length > 0 ? [...challenges, demoChallenges[0]] : demoChallenges;

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-[1.25rem] bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Active Journeys</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Collective & Personal Wellness Paths</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayChallenges.map((challenge, i) => {
                    const isJoined = challenge.participants?.length > 0;
                    const progress = isJoined ? challenge.participants[0].progress : 0;
                    const percent = Math.min(100, (progress / challenge.durationDays) * 100);
                    const isZen = challenge.id === 'presence-1';

                    return (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "glass p-8 rounded-[2.5rem] relative overflow-hidden group border-white/5",
                                isJoined && "border-primary/20 bg-primary/5",
                                isZen && "border-amber-500/20 bg-amber-500/5 shadow-xl shadow-amber-500/5"
                            )}
                        >
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1",
                                            isZen ? "border-amber-500/30 text-amber-600 bg-amber-500/10" : "border-primary/30 text-primary bg-primary/10"
                                        )}>
                                            {isZen ? "Trending" : challenge.isCommunity ? "Community" : "Personal"}
                                        </Badge>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" /> {challenge.durationDays}D
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase leading-none">
                                            {challenge.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <div className="flex -space-x-1.5">
                                                {[1, 2, 3].map(p => (
                                                    <div key={p} className="h-5 w-5 rounded-full border-2 border-background bg-muted text-[8px] flex items-center justify-center font-black">
                                                        {p}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">+{challenge.participantsCount || 0} joining</span>
                                        </div>
                                    </div>

                                    <p className="text-sm font-semibold text-foreground/70 leading-relaxed pt-2">
                                        {challenge.description}
                                    </p>
                                </div>

                                <div className="mt-8">
                                    {isJoined ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                                <span className="text-primary">Progress</span>
                                                <span className="text-foreground">{progress}/{challenge.durationDays} Days</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-muted/30 rounded-full overflow-hidden p-0.5 border border-white/5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percent}%` }}
                                                    className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Day {progress} Active
                                            </div>
                                        </div>
                                    ) : (
                                        <Button 
                                            onClick={() => joinChallenge(challenge.id)}
                                            className={cn(
                                                "w-full h-14 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all shadow-xl active:scale-95",
                                                isZen ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"
                                            )}
                                        >
                                            {isZen ? "Start Presence Mastery" : "Join Journey"}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Icon */}
                            <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none scale-150">
                                {isZen ? <Wind size={120} /> : <Target size={120} />}
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
