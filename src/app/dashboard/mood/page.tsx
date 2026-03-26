"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false, loading: () => <div className="h-full w-full bg-muted/20 rounded-xl animate-pulse" /> });
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
import {
    Smile,
    Meh,
    Frown,
    CloudRain,
    TrendingUp,
    Calendar,
    Flame,
    Clock,
    ChevronRight,
    Sun,
    PenLine,
    ArrowUpRight,
    Mic,
    MicOff,
    AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodInsight } from "@/components/dashboard/MoodInsight";
import { MoodLogger } from "@/components/mood/MoodLogger";
import { MoodTimeline } from "@/components/mood/MoodTimeline";

export default function MoodPage() {
    const { user, loading } = useAuth();
    const [activeTimeRange, setActiveTimeRange] = useState<"week" | "month">("week");
    const [moodHistory, setMoodHistory] = useState<any[]>([]);
    const [moodStats, setMoodStats] = useState({ average: 0, count: 0, streak: 0 });
    const [academicEvents, setAcademicEvents] = useState<any[]>([]);

    const fetchMoodData = useCallback(async () => {
        if (loading || !user) return;
        try {
            const history = await api.get('/moods');
            const statsData = await api.get('/moods/stats');
            const events = await api.get('/academic');
            setMoodHistory(history);
            setMoodStats(statsData);
            setAcademicEvents(events);
        } catch (error) {
            console.error("Error fetching mood data:", error);
        }
    }, [user, loading]);

    useEffect(() => {
        fetchMoodData();
    }, [fetchMoodData]);

    const weekData = useMemo(() => {
        if (moodHistory.length === 0) return [
            { name: "Mon", date: "", mood: 0 }, { name: "Tue", date: "", mood: 0 }, { name: "Wed", date: "", mood: 0 },
            { name: "Thu", date: "", mood: 0 }, { name: "Fri", date: "", mood: 0 }, { name: "Sat", date: "", mood: 0 }, { name: "Sun", date: "", mood: 0 }
        ] as { name: string; date: string; mood: number }[];


        // Group by day for the last 7 days
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return {
                name: days[d.getDay()],
                date: d.toDateString(),
                val: 0,
                count: 0
            };
        }).reverse();

        moodHistory.forEach(m => {
            const mDate = new Date(m.createdAt).toDateString();
            const day = last7Days.find(d => d.date === mDate);
            if (day) {
                day.val += m.mood;
                day.count++;
            }
        });

        return last7Days.map(d => ({
            name: d.name,
            date: d.date,
            mood: d.count > 0 ? parseFloat((d.val / d.count).toFixed(1)) : 0
        } as { name: string; date: string; mood: number }));
    }, [moodHistory]);


    const moods = [
        { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
        { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
        { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
        { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
        { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
    ];

    const stats = [
        { label: "Weekly Average", value: moodStats.average.toString(), icon: TrendingUp, color: "text-primary" },
        { label: "Check-ins", value: moodStats.count.toString(), icon: Calendar, color: "text-secondary" },
        { label: "Active Streak", value: `${moodStats.streak}-Day`, icon: Flame, color: "text-primary" },
    ];


    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <TrendingUp size={12} /> Insight Engine
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        Emotional <span className="text-primary">Trends</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Visualize your mental landscape. Track daily fluctuations and discover the patterns that influence your well-being.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-[2rem] p-6 shadow-premium group hover:scale-[1.02] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Logger Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <MoodLogger onComplete={fetchMoodData} />
                    </div>

                    {/* Chart Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-[2.5rem] p-8 shadow-premium h-full space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-foreground tracking-tight">Activity Flow</h3>
                                <div className="flex bg-muted/80 rounded-full p-1 border border-border">
                                    {["Week", "Month"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setActiveTimeRange(t.toLowerCase() as any)}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${activeTimeRange === t.toLowerCase() ? "bg-card shadow-sm text-primary ring-1 ring-primary/20" : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Predictive Wellness Indicator */}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Predictive Trajectory</p>
                                    <p className="text-xs font-bold text-foreground/80">
                                        {moodStats.average > 3.5 ? "Positive Growth Expected" : "Stability Maintenance Needed"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-primary">{Math.round((moodStats.average / 5) * 100)}%</div>
                                    <div className="text-[8px] font-bold text-muted-foreground uppercase">Wellness Score</div>
                                </div>
                            </div>


                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weekData}>
                                        <defs>
                                            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-muted-foreground)" className="opacity-[0.1]" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700, fill: "var(--color-muted-foreground)" }}
                                            className="text-muted-foreground"
                                            dy={10}
                                        />
                                        <Tooltip
                                            content={({ active, payload, label }) => {
                                                if (active && payload && payload.length) {
                                                    const dateStr = weekData.find(d => d.name === label)?.date;
                                                    const event = academicEvents.find(e => new Date(e.date).toDateString() === dateStr);
                                                    return (
                                                        <div className="glass p-4 rounded-2xl border border-border/40 shadow-xl space-y-2">
                                                            <p className="text-xs font-black text-muted-foreground">{label}</p>
                                                            <p className="text-lg font-black text-foreground">{payload[0].value}/5</p>
                                                            {event && (
                                                                <div className="pt-2 border-t border-primary/10">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                                                                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{event.type}: {event.title}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="mood"
                                            stroke="var(--ash-stroke)"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#moodGradient)"
                                        />
                                        {/* Stress Points Overlay */}
                                        {weekData.map((d, i) => {
                                            const event = academicEvents.find(e => new Date(e.date).toDateString() === d.date);
                                            if (event) {
                                                return (
                                                    <rect
                                                        key={i}
                                                        x={`${(i / 6) * 90 + 5}%`}
                                                        y="0"
                                                        width="2"
                                                        height="100%"
                                                        fill="rgba(239, 68, 68, 0.1)"
                                                        className="pointer-events-none"
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Recent Fluctuations</p>
                                {moodHistory.slice(0, 3).map((entry, idx) => {
                                    const moodMeta = moods.find(m => m.value === entry.mood);
                                    const Icon = moodMeta?.icon || Smile;
                                    const date = new Date(entry.createdAt);
                                    return (
                                        <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${entry.crisisFlag ? "bg-red-500/10 border-red-500/50" : "bg-muted/30 border-primary/5 group hover:bg-muted/50"}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Icon size={18} className={entry.crisisFlag ? "text-red-500" : "text-primary"} />
                                                    {entry.crisisFlag && <AlertTriangle className="absolute -top-1 -right-1 h-2 w-2 text-red-500" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-xs font-bold text-foreground">
                                                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                        </p>
                                                        {entry.sentimentLabel && (
                                                            <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest ${entry.sentimentLabel === 'Positive' ? 'bg-emerald-500/10 text-emerald-500' :
                                                                    entry.sentimentLabel === 'Concerned' ? 'bg-amber-500/10 text-amber-500' :
                                                                        entry.sentimentLabel === 'Distressed' ? 'bg-[#D5BDAF]/10 text-[#D5BDAF]' :
                                                                            'bg-slate-500/10 text-slate-500'
                                                                }`}>
                                                                {entry.sentimentLabel}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground">{moodMeta?.label || 'Unknown'}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground">
                                                {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    );
                                })}
                                {moodHistory.length === 0 && (
                                    <p className="text-center text-xs text-muted-foreground py-4 italic">No logs yet. Start tracking your mood!</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Smart Insights Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <MoodInsight moods={moodHistory} />
                </motion.div>

                {/* Detailed Journal Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <MoodTimeline entries={moodHistory} onRefresh={fetchMoodData} />
                </motion.div>
            </div>
        </div>
    );
}
