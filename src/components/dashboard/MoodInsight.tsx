"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { 
    TrendingUp, 
    TrendingDown, 
    Minus, 
    RefreshCw, 
    Sparkles,
    Calendar,
    BarChart3,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Mood {
    mood: number;
    createdAt: string;
    notes?: string;
}

interface MoodInsightProps {
    moods: Mood[];
    className?: string;
    onRefresh?: () => void;
}

export function MoodInsight({ moods, className, onRefresh }: MoodInsightProps) {
    const [insight, setInsight] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        if (moods && moods.length >= 3) {
            fetchInsight();
            calculateStats();
        }
    }, [moods]);

    const fetchInsight = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/analytics/mood-insight', {
                moodData: moods
            });
            setInsight(response.insight);
        } catch (error) {
            console.error('Insight error:', error);
            setError('Unable to generate insight. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        if (!moods || moods.length === 0) return;

        const values = moods.map(m => m.mood);
        const average = values.reduce((sum, m) => sum + m, 0) / values.length;
        
        // Calculate trend (recent vs older)
        const halfPoint = Math.floor(values.length / 2);
        const recentAvg = values.slice(0, halfPoint).reduce((sum, m) => sum + m, 0) / (halfPoint || 1);
        const olderAvg = values.slice(halfPoint).reduce((sum, m) => sum + m, 0) / (values.length - halfPoint || 1);
        
        const trend = recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';
        
        // Calculate volatility (standard deviation)
        const variance = values.reduce((sum, m) => sum + Math.pow(m - average, 2), 0) / values.length;
        const volatility = Math.sqrt(variance);

        setStats({
            average: average.toFixed(1),
            trend,
            volatility: volatility.toFixed(1),
            highest: Math.max(...values),
            lowest: Math.min(...values),
            total: moods.length
        });
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-emerald-500" />;
        if (trend === 'declining') return <TrendingDown className="h-4 w-4 text-red-500" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    const getTrendColor = (trend: string) => {
        if (trend === 'improving') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        if (trend === 'declining') return 'text-red-500 bg-red-500/10 border-red-500/20';
        return 'text-muted-foreground bg-muted/30 border-border/50';
    };

    const getMoodEmoji = (mood: number) => {
        if (mood >= 4.5) return '😊';
        if (mood >= 3.5) return '🙂';
        if (mood >= 2.5) return '😐';
        if (mood >= 1.5) return '😟';
        return '😢';
    };

    if (!moods || moods.length < 3) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("glass p-6 rounded-[2.5rem] shadow-premium space-y-4", className)}
            >
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Mood Insights</h3>
                </div>
                
                <div className="text-center py-6 space-y-4">
                    <Calendar className="h-12 w-12 text-muted-foreground/20 mx-auto" />
                    <p className="text-[11px] font-medium text-muted-foreground max-w-[180px] mx-auto leading-relaxed">
                        Track your mood for a few more days to unlock AI-powered insights.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 w-6 rounded-full transition-colors",
                                        i <= (moods?.length || 0) ? "bg-primary" : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{moods?.length || 0}/5</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "glass rounded-[2.5rem] shadow-premium overflow-hidden",
                className
            )}
        >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-border/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center border border-primary/10 shadow-sm">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Smart Insights</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stats?.total} recent entries</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => { fetchInsight(); onRefresh?.(); }}
                        disabled={loading}
                        className="h-8 w-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-primary/5 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={cn("h-4 w-4 text-muted-foreground", loading && "animate-spin")} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 p-6 border-b border-border/40 bg-muted/10">
                <div className="text-center space-y-1">
                    <div className="text-2xl">{getMoodEmoji(parseFloat(stats?.average || "3"))}</div>
                    <div className="text-lg font-black text-foreground">{stats?.average}</div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Average</p>
                </div>

                <div className="text-center space-y-1">
                    <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-[10px] font-black uppercase tracking-tight",
                        getTrendColor(stats?.trend)
                    )}>
                        {getTrendIcon(stats?.trend)}
                        {stats?.trend}
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Trend</p>
                </div>

                <div className="text-center space-y-1">
                    <div className="text-sm font-black text-foreground pt-1">
                        {stats?.lowest} <span className="text-muted-foreground/40 mx-0.5">→</span> {stats?.highest}
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest pt-1">Range</p>
                </div>
            </div>

            {/* AI Insight Paragraph */}
            <div className="p-6 space-y-4">
                <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1">
                        {loading ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-3 bg-primary/10 rounded-full w-full" />
                                <div className="h-3 bg-primary/10 rounded-full w-5/6" />
                                <div className="h-3 bg-primary/10 rounded-full w-4/6" />
                            </div>
                        ) : error ? (
                            <p className="text-sm text-red-500 font-bold">{error}</p>
                        ) : (
                            <div className="relative">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                                <p className="text-sm md:text-base text-foreground leading-relaxed font-black tracking-tight pl-2">
                                    {insight || "Analyzing your mood patterns to provide personalized guidance..."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Warnings Section */}
                <AnimatePresence>
                    {stats && parseFloat(stats.volatility) > 1.5 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-1"
                        >
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3 text-amber-500" />
                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tight">High Variability</p>
                            </div>
                            <p className="text-[9px] text-amber-600/80 font-medium leading-normal">
                                Your mood has been fluctuating. This is normal, but consider a breathing exercise.
                            </p>
                        </motion.div>
                    )}

                    {stats && parseFloat(stats.average) < 2.5 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-1"
                        >
                            <div className="flex items-center gap-2">
                                <TrendingDown className="h-3 w-3 text-red-500" />
                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-tight">Low Mood Alert</p>
                            </div>
                            <p className="text-[9px] text-red-600/80 font-medium leading-normal">
                                You&apos;ve been feeling down. Consider speaking with a counselor or reachable friend.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
