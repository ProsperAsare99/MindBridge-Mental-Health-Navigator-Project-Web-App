"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Activity, 
    Target, 
    ChevronRight,
    Brain,
    HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DailyPerspectiveProps {
    moodStats: { average: number; count: number; streak: number };
    className?: string;
}

const TIPS = [
    "Take 3 deep breaths before your next task.",
    "Hydrate: A glass of water can reset your focus.",
    "Ghanaian wisdom: 'The one who asks the way does not get lost.' Talk to a peer today.",
    "Your MindBridge streak is a testament to your resilience."
];

export function DailyPerspective({ moodStats, className }: DailyPerspectiveProps) {
    const [randomTip, setRandomTip] = useState(TIPS[0]);

    useEffect(() => {
        const selectedTip = TIPS[Math.floor(Math.random() * TIPS.length)];
        setRandomTip(selectedTip);
    }, []);

    // Determine a "status" message based on stats
    const getStatusInfo = () => {
        if (moodStats.streak > 5) return { label: "Exceptional Momentum", color: "text-amber-500", bg: "bg-amber-500/10" };
        if (moodStats.count > 0) return { label: "Steady Progress", color: "text-primary", bg: "bg-primary/10" };
        return { label: "Fresh Start", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    };

    const status = getStatusInfo();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "glass rounded-[2rem] p-6 md:p-8 relative overflow-hidden group shadow-premium",
                className
            )}
        >
            {/* Background Graphic Watermark */}
            <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none transform rotate-12 transition-transform duration-1000 group-hover:rotate-6">
                <Brain size={180} className="text-muted-foreground" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-3">
                        <div className={cn("px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-current/20", status.color, status.bg)}>
                            {status.label}
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Performance</span>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-foreground leading-tight">
                            Today&apos;s Perspective
                        </h2>
                        <p className="text-sm md:text-base font-bold text-muted-foreground leading-relaxed">
                            {randomTip}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-xl border border-border/50 text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">{moodStats.streak} Day Streak</span>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-xl border border-secondary/10 text-secondary">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">Next Goal: Log Mood</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 shrink-0">
                    <Button className="h-12 px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Deep Dive <ChevronRight size={18} />
                    </Button>
                    
                    <div className="group/wellness relative flex items-center gap-4 px-5 py-4 rounded-[2rem] bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-md border border-white/20 shadow-xl overflow-hidden active:scale-95 transition-all duration-300 cursor-pointer">
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover/wellness:opacity-100 transition-opacity duration-700 -translate-x-full group-hover/wellness:translate-x-full" />
                        
                        {/* Icon Container with Pulse */}
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150 animate-pulse" />
                            <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                                <HeartPulse size={22} className="group-hover/wellness:scale-110 transition-transform duration-300" />
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="relative z-10 space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/70 dark:text-emerald-400/70 leading-none">
                                Overall Wellness
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-black text-foreground tracking-tight">
                                    Stably Improving
                                </p>
                                <div className="flex gap-0.5">
                                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
                                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
                                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
