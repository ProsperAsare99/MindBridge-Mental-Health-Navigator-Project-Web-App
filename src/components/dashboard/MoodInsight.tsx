"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    RefreshCw, 
    Activity, 
    Calendar, 
    AlertCircle,
    TrendingDown,
    Minus,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Mood {
    mood: number;
    createdAt: string;
}

interface MoodInsightProps {
    moods: Mood[];
    className?: string;
    onRefresh?: () => void;
}

export function MoodInsight({ moods, className, onRefresh }: MoodInsightProps) {
    const [insight, setInsight] = useState<string>('');
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (moods && moods.length >= 3) {
            fetchInsight();
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
            setMetrics(response.metrics);
        } catch (error) {
            console.error('Insight error:', error);
            setError('Unable to generate factual analysis.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={cn("glass rounded-3xl p-8 flex flex-col items-center justify-center gap-4 min-h-[350px]", className)}>
                <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Synthesizing Clinical Dataset...</p>
            </div>
        );
    }

    if (!metrics && !loading && !error) {
        return (
            <div className={cn("glass rounded-3xl p-8 text-center space-y-4 min-h-[350px] flex flex-col justify-center", className)}>
                <div className="h-20 w-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto text-primary/40">
                    <Activity size={40} />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-black text-foreground uppercase tracking-[0.2em]">Data Insufficient</p>
                    <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">Submit 3+ entries to generate multi-dimensional factual insights.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("glass rounded-[2rem] overflow-hidden border border-border", className)}>
            <div className="p-8 space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Biometric Narrative Analysis</h3>
                        </div>
                        <p className="text-3xl font-black text-foreground tracking-tighter">Mood Intelligence</p>
                    </div>
                    <button onClick={fetchInsight} className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 transition-all group border border-border/40 shadow-sm">
                        <RefreshCw size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                </div>

                {/* Narrative Insight */}
                <div className="relative p-6 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 group">
                    <div className="absolute -left-1 top-6 bottom-6 w-1 bg-primary rounded-full group-hover:scale-y-110 transition-transform" />
                    <p className="text-base md:text-lg font-bold leading-relaxed text-foreground/90 pl-4">
                        "{insight}"
                    </p>
                </div>

                {/* Multi-Dimensional Metrics */}
                {metrics && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-5 rounded-[2rem] bg-muted/20 border border-border/60 space-y-2 group hover:bg-card/80 transition-all hover:shadow-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Activity size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Energy</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-foreground">{metrics.vitals.energy}</span>
                                    <span className="text-[10px] text-muted-foreground font-bold">/5</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-[2rem] bg-muted/20 border border-border/60 space-y-2 group hover:bg-card/80 transition-all hover:shadow-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Sleep</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-foreground">{metrics.vitals.sleep}</span>
                                    <span className="text-[10px] text-muted-foreground font-bold">/5</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-[2rem] bg-muted/20 border border-border/60 space-y-2 group hover:bg-card/80 transition-all hover:shadow-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <TrendingUp size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Social</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-foreground">{metrics.vitals.social}</span>
                                    <span className="text-[10px] text-muted-foreground font-bold">/5</span>
                                </div>
                            </div>
                        </div>

                        {/* Stability & Correlation */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-[2rem] bg-muted/20 border border-border/60 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Internal Stability</span>
                                    <span className={cn(
                                        "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm flex items-center gap-1.5",
                                        metrics.volatility <= 0.8 ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : metrics.volatility <= 1.2 ? "bg-primary/10 text-primary border border-primary/20" : "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                                    )}>
                                        {metrics.volatility <= 0.8 ? <ShieldCheck size={12} /> : metrics.volatility <= 1.2 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                        {metrics.volatility <= 0.8 ? 'Resilient' : metrics.volatility <= 1.2 ? 'Balanced' : 'Fluctuating'}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/20">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (2 - metrics.volatility) * 50)}%` }}
                                        className={cn(
                                            "h-full transition-all duration-1000",
                                            metrics.volatility <= 0.8 ? "bg-emerald-500" : metrics.volatility <= 1.2 ? "bg-primary" : "bg-orange-500"
                                        )}
                                    />
                                </div>
                            </div>

                            {metrics.correlation && (
                                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 flex flex-col justify-center gap-2 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                                        <AlertCircle size={40} className="text-primary" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={14} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Insight Correlation</span>
                                    </div>
                                    <p className="text-[11px] font-bold leading-[1.6] text-foreground/80 pr-6">
                                        {metrics.correlation}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Footer Metrics */}
            <div className="px-8 py-4 bg-muted/30 border-t border-border/40 flex items-center justify-between">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Activity size={12} className="text-primary/70" />
                    Dataset Size: {metrics?.totalChecks} Check-ins
                </p>
                {metrics?.topSymptom && (
                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <p className="text-[10px] font-black text-foreground uppercase tracking-widest">
                            Primary Symptom: <span className="text-primary">{metrics.topSymptom}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
