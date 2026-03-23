"use client";

import { motion } from "framer-motion";
import { 
    Sparkles, 
    Zap, 
    Target, 
    ChevronRight,
    BrainCircuit,
    HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DailyPerspectiveProps {
    moodStats: { average: number; count: number; streak: number };
    className?: string;
}

export function DailyPerspective({ moodStats, className }: DailyPerspectiveProps) {
    // Determine a "status" message based on stats
    const getStatusInfo = () => {
        if (moodStats.streak > 5) return { label: "Exceptional Momentum", color: "text-amber-500", bg: "bg-amber-500/10" };
        if (moodStats.count > 0) return { label: "Steady Progress", color: "text-primary", bg: "bg-primary/10" };
        return { label: "Fresh Start", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    };

    const status = getStatusInfo();

    const tips = [
        "Take 3 deep breaths before your next task.",
        "Hydrate: A glass of water can reset your focus.",
        "Ghanaian wisdom: 'The one who asks the way does not get lost.' Talk to a peer today.",
        "Your MindBridge streak is a testament to your resilience."
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

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
                <BrainCircuit size={180} className="text-muted-foreground" />
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
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">{moodStats.streak} Day Streak</span>
                        </div>
                        <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-xl border border-secondary/10 text-secondary">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-tight">Next Goal: Log Mood</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                    <Button className="h-12 px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Deep Dive <ChevronRight size={18} />
                    </Button>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-border/50">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <HeartPulse size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">Overall Wellness</p>
                            <p className="text-xs font-black text-foreground mt-1">Stably Improving</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
