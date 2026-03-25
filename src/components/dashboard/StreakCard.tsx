"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Flame, CheckCircle2, Circle } from 'lucide-react';

interface StreakCardProps {
    streak: number;
    longestStreak?: number;
    totalCheckIns: number;
    className?: string;
}

export const StreakCard = ({ streak, longestStreak, totalCheckIns, className }: StreakCardProps) => {
    // Generate last 7 days visual
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date().getDay(); // 0-6 (Sun-Sat)
    // Adjust to start from Monday (0) to Sunday (6)
    const normalizedToday = today === 0 ? 6 : today - 1;

    return (
        <div className={cn("glass p-6 rounded-[2.5rem] relative overflow-hidden group", className)}>
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Flame className="h-6 w-6 text-primary" />
                        </motion.div>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Wellness Streak</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-primary">{streak}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Consecutive Days</span>
                        </div>
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{totalCheckIns} Total Logs</p>
                    {longestStreak !== undefined && (
                        <p className="text-[8px] font-black text-primary/60 uppercase tracking-tighter">Best: {longestStreak} Days</p>
                    )}
                    <div className="h-1.5 w-24 bg-muted rounded-full mt-2 overflow-hidden ml-auto">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (streak / 30) * 100)}%` }}
                            className="h-full bg-primary" 
                        />
                    </div>
                </div>
            </div>

            {/* Weekly Progress Dots */}
            <div className="flex items-center justify-between mt-8 p-4 bg-muted/30 rounded-3xl border border-white/5 relative z-10">
                {days.map((day, i) => {
                    const isToday = i === normalizedToday;
                    const isPastChecked = i < normalizedToday;
                    
                    return (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className={cn(
                                "text-[9px] font-black",
                                isToday ? "text-primary" : "text-muted-foreground/50"
                            )}>
                                {day}
                            </span>
                            <div className={cn(
                                "h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-500",
                                isToday ? "bg-primary text-white shadow-lg shadow-primary/20" : 
                                isPastChecked ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground/30"
                            )}>
                                {isPastChecked ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flame className="h-24 w-24 text-primary" />
            </div>
        </div>
    );
};
