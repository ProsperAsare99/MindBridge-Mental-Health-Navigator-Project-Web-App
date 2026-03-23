"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trophy, Medal, ShieldCheck, Award, Activity } from 'lucide-react';

interface Achievement {
    id: string;
    type: string;
    title: string;
    description: string;
    icon?: string;
}

interface AchievementListProps {
    achievements: Achievement[];
    className?: string;
}

const ICON_MAP: Record<string, any> = {
    'Trophy': Trophy,
    'Medal': Medal,
    'ShieldCheck': ShieldCheck,
    'Award': Award,
    'Activity': Activity
};

export const AchievementList = ({ achievements, className }: AchievementListProps) => {
    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Growth Badges</h3>
                <span className="text-[10px] font-black text-primary uppercase">{achievements.length} Unlocked</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {achievements.length === 0 ? (
                    <div className="col-span-full py-8 text-center glass rounded-3xl border-white/5 opacity-50">
                        <Trophy className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">No badges earned yet</p>
                    </div>
                ) : (
                    achievements.map((ach) => {
                        const Icon = ICON_MAP[ach.icon || 'Trophy'] || Trophy;
                        return (
                            <motion.div
                                key={ach.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ y: -5 }}
                                className="glass p-4 rounded-3xl border-primary/20 flex flex-col items-center text-center space-y-3 group"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-sky-400/5 flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-foreground uppercase tracking-tight">{ach.title}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase leading-tight mt-1">{ach.description}</p>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
