"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BarChart3, 
    TrendingUp, 
    TrendingDown, 
    Zap, 
    Users, 
    Brain, 
    ShieldCheck, 
    Activity,
    Info,
    Loader2,
    Calendar,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Correlation {
    factor: string;
    impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    description: string;
    score: number;
}

interface DeepDiveData {
    correlations: Correlation[];
    participationStats: {
        totalCircleShares: number;
        carePlanAdherence: number;
        meditationConsistency: number;
    };
    forecast: 'STABLE' | 'TRANSITIONING' | 'RECOVERING';
}

export function AnalyticsDashboard() {
    const [data, setData] = useState<DeepDiveData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeepDive();
    }, []);

    const fetchDeepDive = async () => {
        try {
            const result = await api.get('/analytics/deep-dive');
            setData(result);
        } catch (error) {
            console.error('Failed to fetch deep dive stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesizing clinical correlations...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-10">
            {/* 1. Impact Matrix Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass md:col-span-2 p-8 rounded-[3rem] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                        <Brain size={160} className="text-primary" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <h2 className="text-xl font-black text-foreground tracking-tight uppercase">Resilience <span className="text-primary">Forecast.</span></h2>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="text-5xl font-black text-foreground tracking-tighter capitalize">{data.forecast.toLowerCase()}</div>
                            <p className="text-sm font-medium text-muted-foreground max-w-md">
                                Based on your last 14 days of engagement, your emotional baseline is currently <span className="text-primary font-bold">{data.forecast}</span>. 
                                Your system is adapting well to current stressors.
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col gap-6">
                    <div className="flex-1 glass p-8 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/[0.02] flex flex-col justify-between">
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Care Adherence</div>
                        <div className="text-4xl font-black text-foreground">{data.participationStats.carePlanAdherence}%</div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${data.participationStats.carePlanAdherence}%` }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                    </div>
                    <div className="flex-1 glass p-8 rounded-[2.5rem] border border-primary/20 bg-primary/[0.02] flex flex-col justify-between">
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Circle Involvement</div>
                        <div className="text-4xl font-black text-foreground">{data.participationStats.totalCircleShares}</div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2">Successful shares & posts</p>
                    </div>
                </div>
            </div>

            {/* 2. Correlation Mapping */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight flex items-center gap-2">
                        <Zap size={16} className="text-primary" /> Multi-Factor Correlations
                    </h3>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {data.correlations.map((corr, i) => (
                            <motion.div
                                key={corr.factor}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[3rem] border border-white/10 group hover:border-primary/20 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                    {corr.factor === 'Community Support' ? <Users size={120} /> : <Target size={120} />}
                                </div>
                                
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/10 text-[9px] font-black text-primary uppercase tracking-widest">
                                            {corr.factor}
                                        </div>
                                        <div className={cn(
                                            "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                            corr.impact === 'POSITIVE' ? "text-emerald-500" : "text-muted-foreground"
                                        )}>
                                            {corr.impact} IMPACT
                                        </div>
                                    </div>
                                    
                                    <h4 className="text-lg font-black text-foreground leading-snug">
                                        {corr.description}
                                    </h4>

                                    <div className="pt-4 space-y-2">
                                        <div className="flex items-center justify-between text-[9px] font-black text-muted-foreground uppercase">
                                            <span>Correlation Weighting</span>
                                            <span>{Math.round(corr.score)}%</span>
                                        </div>
                                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${corr.score}%` }}
                                                className="h-full bg-primary/40"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* 3. Academic Stressor Context (Simulated / Placeholder until further stressor data integration) */}
            <div className="glass p-10 rounded-[3rem] border border-primary/10 bg-gradient-to-t from-primary/[0.02] to-transparent">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0">
                            <Calendar size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-foreground tracking-tight">Academic Calibration</h3>
                        <p className="text-sm font-medium text-muted-foreground max-w-md">
                            Your resilience scores typically anticipate academic peaks by 3 days. Focus on <span className="text-primary font-bold">Deep Sleep</span> this week to prep for upcoming deadlines.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-black text-foreground tracking-tighter">8.4</div>
                            <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Stress Index</div>
                        </div>
                        <div className="h-10 w-px bg-border/40" />
                        <div className="text-center">
                            <div className="text-3xl font-black text-primary tracking-tighter">92%</div>
                            <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Recovery rate</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 4. Privacy Footer */}
            <div className="flex items-center justify-center gap-3 py-6 opacity-40">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Privacy-Validated Analytics Engine</span>
            </div>
        </div>
    );
}
