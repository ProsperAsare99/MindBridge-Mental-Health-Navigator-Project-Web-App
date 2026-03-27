"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
    Activity, 
    Target, 
    ChevronRight,
    Brain,
    HeartPulse,
    Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useActivityDetection } from "@/hooks/use-activity-detection";

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
    const { isInactive, suggestion, actionLabel, actionType, magnitude, usageFrequency } = useActivityDetection();

    useEffect(() => {
        const selectedTip = TIPS[Math.floor(Math.random() * TIPS.length)];
        setRandomTip(selectedTip);
    }, []);

    const displayTip = suggestion || randomTip;

    // Determine a "status" message based on stats
    const getStatusInfo = () => {
        if (isInactive) return { label: "Low Activity Detected", color: "text-amber-500", bg: "bg-amber-500/10" };
        if (usageFrequency === 'high') return { label: "High Engagement", color: "text-primary", bg: "bg-primary/10" };
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
                        
                        {/* Real-time Activity Pulse */}
                        <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-lg border border-border/50">
                            <motion.div 
                                animate={{ 
                                    scale: 1 + (magnitude * 0.5),
                                    opacity: 0.3 + (magnitude * 0.7)
                                }}
                                className="h-1.5 w-1.5 rounded-full bg-primary" 
                            />
                            <span className="text-[8px] font-black uppercase text-muted-foreground tracking-tighter">Live Pulse</span>
                        </div>

                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Performance</span>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-foreground leading-tight">
                                Today&apos;s Perspective
                            </h2>
                            <p className={cn(
                                "text-sm md:text-base font-bold leading-relaxed transition-all duration-300",
                                suggestion ? "text-primary animate-in fade-in slide-in-from-left-4" : "text-muted-foreground"
                            )}>
                                {displayTip}
                            </p>
                        </div>

                        {suggestion && actionLabel && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Link 
                                    href={actionType === 'social' ? '/dashboard/community' : '/dashboard/resources'}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 active:scale-95"
                                >
                                    {actionLabel} <ChevronRight size={14} />
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-500 hover:scale-105",
                            moodStats.streak > 0 
                                ? "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400 shadow-lg shadow-orange-500/5" 
                                : "bg-muted/40 border-border/50 text-muted-foreground"
                        )}>
                            <Flame className={cn("h-6 w-6 transition-all duration-500", moodStats.streak > 0 ? "fill-orange-500 text-orange-500 animate-pulse" : "text-muted-foreground/40")} />
                            <div className="flex flex-col leading-none">
                                <span className={cn(
                                    "text-2xl font-black tracking-tighter",
                                    moodStats.streak > 0 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"
                                )}>
                                    {moodStats.streak}
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">
                                    Day Streak
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-xl border border-secondary/10 text-secondary">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">Usage: {usageFrequency}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 shrink-0">
                    <Link href="/dashboard/analytics">
                        <Button className="h-12 w-full px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Deep Dive <ChevronRight size={18} />
                        </Button>
                    </Link>
                    
                    <Link href="/dashboard/analytics">
                        <div className="group/wellness relative flex items-center gap-4 px-5 py-4 rounded-[2rem] bg-gradient-to-br from-white/30 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-sm border border-white/10 shadow-lg overflow-hidden active:scale-95 transition-all duration-300 cursor-pointer">
                            {/* Animated Background Glow - Toned down */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/2 to-emerald-500/0 opacity-0 group-hover/wellness:opacity-100 transition-opacity duration-700 -translate-x-full group-hover/wellness:translate-x-full" />
                            
                            {/* Icon Container with subtle Pulse */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-emerald-500/10 blur-lg rounded-full scale-125 animate-pulse" />
                                <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500/80 to-emerald-600/80 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
                                    <HeartPulse size={22} className="group-hover/wellness:scale-105 transition-transform duration-300" />
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="relative z-10 space-y-0.5">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/60 dark:text-emerald-400/60 leading-none">
                                    Overall Wellness
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-black text-foreground/90 tracking-tight">
                                        {isInactive ? "Time for a Break" : "Stably Improving"}
                                    </p>
                                    <div className="flex gap-0.5 opacity-60">
                                        <div className={cn("h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]", isInactive && "bg-amber-500")} />
                                        <div className={cn("h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]", isInactive && "bg-amber-500")} />
                                        <div className={cn("h-1 w-1 rounded-full bg-emerald-500 animate-bounce", isInactive && "bg-amber-500")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
