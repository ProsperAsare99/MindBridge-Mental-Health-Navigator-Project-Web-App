"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    Circle, 
    Zap, 
    Wind, 
    Users, 
    BookOpen, 
    Heart,
    ChevronRight,
    Sparkles,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface Task {
    id: string;
    task: string;
    description: string;
    type: 'circle' | 'challenge' | 'resource' | 'action';
    completed: boolean;
    points: number;
}

interface CarePlan {
    id: string;
    summary: string;
    growthTasks: Task[];
    moodAnalysis: any;
}

const TYPE_ICONS = {
    circle: Users,
    challenge: Zap,
    resource: BookOpen,
    action: Heart
};

const TYPE_COLORS = {
    circle: 'text-indigo-500 bg-indigo-500/10',
    challenge: 'text-amber-500 bg-amber-500/10',
    resource: 'text-emerald-500 bg-emerald-500/10',
    action: 'text-primary bg-primary/10'
};

export function CarePlanTimeline() {
    const [plan, setPlan] = useState<CarePlan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const data = await api.get('/analytics/care-plan');
            setPlan(data);
        } catch (error) {
            console.error('Failed to fetch care plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleTask = async (taskId: string) => {
        if (!plan) return;
        try {
            const updated = await api.post('/analytics/care-plan/toggle', { 
                planId: plan.id, 
                taskId 
            });
            setPlan(updated);
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };

    if (loading) {
        return (
            <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesizing your resilience path...</p>
            </div>
        );
    }

    if (!plan) return null;

    const completedCount = plan.growthTasks.filter(t => t.completed).length;
    const progress = (completedCount / plan.growthTasks.length) * 100;

    return (
        <div className="space-y-12">
            {/* Header / Summary */}
            <div className="relative overflow-hidden glass rounded-[3rem] p-10 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles size={120} className="text-primary" />
                </div>
                
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-foreground tracking-tighter">Weekly <span className="text-primary italic">Resilience Path.</span></h2>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phase 5: Automated Care Navigation</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-primary tracking-tighter">{Math.round(progress)}%</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Path Progress</div>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-foreground/80 leading-relaxed max-w-2xl">
                        {plan.summary}
                    </p>

                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative px-4">
                {/* Connector Line */}
                <div className="absolute left-[33px] top-0 bottom-0 w-0.5 bg-border/40" />

                <div className="space-y-12">
                    {plan.growthTasks.map((task, i) => {
                        const Icon = TYPE_ICONS[task.type] || Heart;
                        const colors = TYPE_COLORS[task.type] || 'text-primary bg-primary/10';

                        return (
                            <motion.div 
                                key={task.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative flex gap-8 group"
                            >
                                {/* Milestone Node */}
                                <div className="relative z-10">
                                    <button 
                                        onClick={() => handleToggleTask(task.id)}
                                        className={cn(
                                            "h-10 w-10 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90",
                                            task.completed ? "bg-primary text-white scale-110" : "bg-card border border-border/40 text-muted-foreground hover:border-primary/40"
                                        )}
                                    >
                                        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={20} />}
                                    </button>
                                </div>

                                {/* Content Card */}
                                <div className={cn(
                                    "flex-1 glass p-8 rounded-[2.5rem] border transition-all relative overflow-hidden",
                                    task.completed ? "border-primary/20 bg-primary/[0.02]" : "border-border/40 hover:border-primary/20",
                                    task.completed && "opacity-60"
                                )}>
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("p-2 rounded-xl", colors)}>
                                                    <Icon size={18} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{task.type} milestone</span>
                                            </div>
                                            <h4 className={cn(
                                                "text-xl font-black tracking-tight transition-all",
                                                task.completed ? "text-muted-foreground line-through" : "text-foreground"
                                            )}>{task.task}</h4>
                                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                                {task.description}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="text-center px-4 py-2 rounded-2xl bg-muted/50 border border-border/40">
                                                <div className="text-xs font-black text-foreground">+{task.points}</div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Resilience XP</div>
                                            </div>
                                            {!task.completed && (
                                                <Button 
                                                    onClick={() => handleToggleTask(task.id)}
                                                    variant="ghost" 
                                                    className="h-12 w-12 rounded-2xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all"
                                                >
                                                    <ChevronRight size={20} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Completion Particle Overlay */}
                                    <AnimatePresence>
                                        {task.completed && (
                                            <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-x-0 bottom-0 h-1 bg-primary/20"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Completion Badge */}
            <AnimatePresence>
                {progress === 100 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass border-2 border-primary/40 rounded-[3rem] p-12 text-center space-y-4 bg-gradient-to-t from-primary/5 to-transparent"
                    >
                        <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary/40">
                            <Sparkles size={40} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-foreground tracking-tighter">Resilience Mastered.</h3>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">You've completed this week's plan.</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">
                            Each task you've checked off has strengthened your resilience foundation. Your Mood Garden has been updated with a new commemorative artifact.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
