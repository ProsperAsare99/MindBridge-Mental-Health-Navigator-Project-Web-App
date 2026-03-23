"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_WINS = [
    { id: "hydrate", label: "Hydrate (8+ glasses)", icon: "💧" },
    { id: "meditate", label: "5-min Meditation", icon: "🧘" },
    { id: "walk", label: "15-min Outdoor Walk", icon: "🚶" },
    { id: "journal", label: "Write 3 Grateful Things", icon: "✍️" },
    { id: "sleep", label: "8 Hours Sleep", icon: "😴" },
];

export function DailyWins() {
    const [completed, setCompleted] = useState<string[]>([]);

    const toggleWin = (id: string) => {
        setCompleted(prev =>
            prev.includes(id) ? prev.filter(winId => winId !== id) : [...prev, id]
        );
    };

    const progress = (completed.length / DEFAULT_WINS.length) * 100;

    return (
        <div className="space-y-6 group/wins">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Daily Micro-Wins</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{completed.length}/{DEFAULT_WINS.length} completed</p>
                    </div>
                    <div className="flex flex-col items-center justify-center h-16 w-16 rounded-full border border-primary/20 bg-primary/5 shadow-inner transition-transform group-hover/wins:scale-105">
                        <span className="text-xl font-black text-primary leading-none">{Math.round(progress)}%</span>
                        <p className="text-[7px] font-black text-primary/40 uppercase tracking-tighter mt-0.5">Progress</p>
                    </div>
                </div>
                
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden border border-primary/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {DEFAULT_WINS.map((win) => {
                    const isCompleted = completed.includes(win.id);
                    return (
                        <button
                            key={win.id}
                            onClick={() => toggleWin(win.id)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group",
                                isCompleted
                                    ? "bg-muted/80 border-border/80 shadow-premium"
                                    : "bg-muted/30 border-border/30 hover:bg-muted/50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{win.icon}</span>
                                <span className={cn(
                                    "text-xs font-bold transition-all",
                                    isCompleted ? "text-primary/80 line-through" : "text-foreground"
                                )}>
                                    {win.label}
                                </span>
                            </div>
                            <div className={cn(
                                "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                                isCompleted ? "bg-primary border-primary text-white" : "border-primary/20 text-transparent"
                            )}>
                                <CheckCircle2 size={12} strokeWidth={3} />
                            </div>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence>
                {progress === 100 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="p-4 rounded-[1.5rem] bg-muted/20 border border-border/40 text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Trophy className="h-4 w-4 text-primary animate-bounce-slow" />
                            <p className="text-xs font-black text-foreground uppercase tracking-widest">Mastery Achieved!</p>
                            <Trophy className="h-4 w-4 text-primary animate-bounce-slow" />
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground/80 lowercase italic"> consistency is the ultimate superpower. keep going! </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
