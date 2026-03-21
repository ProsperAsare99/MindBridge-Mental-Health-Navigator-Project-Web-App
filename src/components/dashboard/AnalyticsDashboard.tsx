"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { 
    BarChart3, 
    TrendingUp, 
    Activity, 
    MessageSquare, 
    ShieldAlert,
    BrainCircuit,
    Calendar,
    Sparkles
} from "lucide-react";
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AnalyticsData {
    summary: {
        totalMoods: number;
        averageMood: number;
        aiInteractions: number;
        crisisCount: number;
    };
    moodHistory: { value: number; date: string }[];
    isHighlyActive: boolean;
}

export function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await api.get('/analytics');
            setData(res);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-64 flex items-center justify-center bg-card rounded-[2.5rem] border border-border/40">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!data) return null;

    const chartData = data.moodHistory.map(m => ({
        mood: m.value,
        date: format(new Date(m.date), 'MMM d'),
        fullDate: format(new Date(m.date), 'PPP')
    })).reverse();

    const stats = [
        { label: "Check-ins", value: data.summary.totalMoods, icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Avg Mood", value: data.summary.averageMood, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "AI Chats", value: data.summary.aiInteractions, icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
        { label: "Safeguards", value: data.summary.crisisCount, icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-lg shadow-secondary/5 text-secondary">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tight">Personal Evolution</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles size={10} className="text-primary" /> AI-Augmented Pattern Analysis
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-[2rem] bg-card border border-border/40 shadow-premium relative overflow-hidden group"
                    >
                        <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110", stat.bg)}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-foreground mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-card border border-border/40 shadow-premium min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-foreground">Mood Continuity</h3>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Last 30 entries</p>
                        </div>
                        <div className="h-8 w-8 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                            <Calendar size={14} />
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-[200px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 9, fontWeight: 700, fill: 'var(--muted-foreground)'}} 
                                />
                                <YAxis 
                                    hide 
                                    domain={[1, 5]}
                                />
                                <Tooltip 
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="glass p-3 rounded-2xl border border-border shadow-xl">
                                                    <p className="text-[10px] font-black uppercase text-primary mb-1">{payload[0].payload.fullDate}</p>
                                                    <p className="text-lg font-black text-foreground">Mood: {payload[0].value}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="mood" 
                                    stroke="var(--primary)" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorMood)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 shadow-premium flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                         <BrainCircuit size={160} />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-black text-foreground leading-tight">AI Intelligence Insight</h3>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                            {data.summary.averageMood >= 4 
                                ? "You're consistently finding balance. This stability is the perfect time for deep focus and personal growth."
                                : data.summary.averageMood < 3
                                ? "We've noticed a period of increased stress. The Oracle recommends shorter academic sessions and focused breathing."
                                : "Your patterns show a mix of energy. Try to align your most demanding tasks with your higher mood windows."}
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-primary/10 relative z-10">
                         <div className="flex items-center justify-between">
                             <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active Engagement</span>
                             <span className="text-xs font-bold text-foreground">{data.isHighlyActive ? "High Level" : "Standard"}</span>
                         </div>
                         <div className="h-1.5 w-full bg-primary/10 rounded-full mt-2 overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: data.isHighlyActive ? "100%" : "40%" }}
                                className="h-full bg-primary"
                             />
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
