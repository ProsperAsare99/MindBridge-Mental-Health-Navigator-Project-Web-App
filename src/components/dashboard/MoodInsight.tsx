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

    const getGlowStyle = (trend: string) => {
        if (!trend) return 'shadow-premium';
        if (trend === 'improving') return 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)] border-emerald-500/20';
        if (trend === 'declining') return 'shadow-[0_0_40px_-10px_rgba(239,68,68,0.1)] border-red-500/20';
        return 'shadow-premium border-border/40';
    };

    if (!moods || moods.length < 3) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("glass p-6 rounded-[2.5rem] shadow-premium space-y-4 relative overflow-hidden", className)}
            >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(226,232,240,0.03),transparent)] pointer-events-none" />

                <div className="flex items-center gap-3 relative z-10">
                    <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center border border-border/50">
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Mood Insights</h3>
                </div>

                <div className="text-center py-6 space-y-4 relative z-10">
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
                "glass rounded-[2.5rem] overflow-hidden relative transition-all duration-700",
                getGlowStyle(stats?.trend),
                className
            )}
        >
            {/* Background Ambient Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,119,182,0.03),transparent)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[grid-white-5%/10%] [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none opacity-20" />

            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-muted/20 to-transparent border-b border-border/40 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="h-10 w-10 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center border border-border/50 shadow-sm"
                        >
                            <Sparkles className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-tight">AI Spirit Analysis</h3>
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stats?.total} observations synthesized</p>
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
            <div className="grid grid-cols-3 gap-3 p-6 border-b border-border/40 bg-muted/10 relative z-10">
                <div className="text-center space-y-1">
                    <div className="text-2xl transform hover:scale-125 transition-transform cursor-default">{getMoodEmoji(parseFloat(stats?.average || "3"))}</div>
                    <div className="text-xl font-black text-foreground">{stats?.average}</div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Global Spirit</p>
                </div>

                <div className="text-center space-y-1">
                    <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-[10px] font-black uppercase tracking-tight transition-all",
                        getTrendColor(stats?.trend)
                    )}>
                        {getTrendIcon(stats?.trend)}
                        {stats?.trend}
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Movement</p>
                </div>

                <div className="text-center space-y-1">
                    <div className="text-sm font-black text-foreground pt-1">
                        {stats?.lowest} <span className="text-muted-foreground/40 mx-0.5">→</span> {stats?.highest}
                    </div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest pt-1">Thresholds</p>
                </div>
            </div>

            {/* AI Insight Paragraph */}
            <div className="p-6 space-y-6 relative z-10">
                <div className="relative">
                    {loading ? (
                        <div className="space-y-4 py-2">
                            <div className="h-4 bg-primary/10 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-primary/10 rounded-full w-5/6 animate-pulse" />
                            <div className="h-4 bg-primary/10 rounded-full w-4/6 animate-pulse" />
                            {/* Scanning Line Effect */}
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-px bg-primary/40 shadow-[0_0_10px_var(--primary)] pointer-events-none"
                            />
                        </div>
                    ) : error ? (
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500 font-bold">{error}</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative group lg:p-2"
                        >
                            <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-primary/30 rounded-full group-hover:bg-primary transition-colors" />
                            <p className="text-base md:text-xl text-foreground leading-relaxed font-black tracking-tight pl-2 decoration-primary/20 underline-offset-8">
                                {insight || "Analyzing your mood patterns to provide personalized guidance..."}
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Warnings Section */}
                <AnimatePresence>
                    {(parseFloat(stats?.volatility) > 1.5 || parseFloat(stats?.average) < 2.5) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                        >
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Critical Awareness</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {parseFloat(stats.volatility) > 1.5 && (
                                    <motion.div
                                        className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                            </div>
                                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-tight">High Variability</p>
                                        </div>
                                        <p className="text-[9px] text-amber-700 font-bold leading-normal italic">
                                            Emotional fluctuations detected. Grounding exercises recommended.
                                        </p>
                                    </motion.div>
                                )}

                                {parseFloat(stats.average) < 2.5 && (
                                    <motion.div
                                        className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                                            </div>
                                            <p className="text-[10px] font-black text-red-600 uppercase tracking-tight">Depletion Alert</p>
                                        </div>
                                        <p className="text-[9px] text-red-700 font-bold leading-normal italic">
                                            Sustained low mood. Prioritize self-connection or outreach.
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
