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
    ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodPage() {
    const { user, loading } = useAuth();
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [activeTimeRange, setActiveTimeRange] = useState<"week" | "month">("week");
    const [moodHistory, setMoodHistory] = useState<any[]>([]);
    const [moodStats, setMoodStats] = useState({ average: 0, count: 0, streak: 0 });

    const fetchMoodData = useCallback(async () => {
        if (loading || !user) return;
        try {
            const history = await api.get('/moods');
            const statsData = await api.get('/moods/stats');
            setMoodHistory(history);
            setMoodStats(statsData);
        } catch (error) {
            console.error("Error fetching mood data:", error);
        }
    }, [user, loading]);

    useEffect(() => {
        fetchMoodData();
    }, [fetchMoodData]);

    const weekData = useMemo(() => {
        if (moodHistory.length === 0) return [
            { name: "Mon", mood: 0 }, { name: "Tue", mood: 0 }, { name: "Wed", mood: 0 },
            { name: "Thu", mood: 0 }, { name: "Fri", mood: 0 }, { name: "Sat", mood: 0 }, { name: "Sun", mood: 0 }
        ];

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
                day.val += m.value;
                day.count++;
            }
        });

        return last7Days.map(d => ({
            name: d.name,
            mood: d.count > 0 ? parseFloat((d.val / d.count).toFixed(1)) : 0
        }));
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

    const handleLogEntry = useCallback(async () => {
        if (selectedMood === null) return;
        try {
            await api.post('/moods', {
                value: selectedMood,
                note
            });
            setSelectedMood(null);
            setNote("");
            alert("Mood logged successfully!");
            fetchMoodData(); // Refresh
        } catch (error) {
            console.error('Error logging mood:', error);
            alert("Failed to log mood. Please try again.");
        }
    }, [selectedMood, note, fetchMoodData]);

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
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
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
                                        <p className="text-2xl font-bold text-foreground/90">{stat.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Logger Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass rounded-[2.5rem] p-8 md:p-10 shadow-premium space-y-10"
                        >
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-foreground/90">How is your spirit today?</h3>
                                <p className="text-sm text-muted-foreground font-medium">Select the icon that best mirrors your current state.</p>
                            </div>

                            <div className="grid grid-cols-5 gap-4">
                                {moods.map((m) => {
                                    const Icon = m.icon;
                                    const isSelected = selectedMood === m.value;
                                    return (
                                        <button
                                            key={m.value}
                                            onClick={() => setSelectedMood(m.value)}
                                            className={`flex flex-col items-center gap-4 p-4 rounded-[2rem] transition-all group relative active:scale-95 border-2 ${isSelected
                                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                                                : "bg-muted/50 border-transparent hover:border-primary/30 hover:bg-muted/80"
                                                }`}
                                        >
                                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected ? m.color : "text-muted-foreground"}`}>
                                                <Icon size={32} strokeWidth={isSelected ? 2.5 : 2} />
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? m.color : "text-muted-foreground"}`}>{m.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <PenLine size={16} className="text-primary" /> Journal Reflection <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                                </div>
                                <textarea
                                    placeholder="What's on your mind?..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full bg-muted/50 border border-border rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all min-h-[120px] resize-none shadow-inner text-foreground placeholder:text-muted-foreground"
                                />
                            </div>

                            <Button
                                onClick={handleLogEntry}
                                size="lg"
                                className="w-full rounded-2xl font-bold shadow-xl shadow-primary/20 transition-transform"
                            >
                                Log Entry <ArrowUpRight className="ml-2" size={18} />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Chart Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-[2.5rem] p-8 shadow-premium h-full space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-foreground/90 tracking-tight">Activity Flow</h3>
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
                                            contentStyle={{
                                                borderRadius: '20px',
                                                border: '1px solid var(--color-primary)',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                                backdropFilter: 'blur(10px)',
                                                background: 'var(--card)',
                                                color: 'var(--foreground)',
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            } as any}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="mood"
                                            stroke="var(--color-primary)"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#moodGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Recent Fluctuations</p>
                                {moodHistory.slice(0, 3).map((entry, idx) => {
                                    const moodMeta = moods.find(m => m.value === entry.value);
                                    const Icon = moodMeta?.icon || Smile;
                                    const date = new Date(entry.createdAt);
                                    return (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-primary/5 group hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className="text-primary" />
                                                <div>
                                                    <p className="text-xs font-bold text-foreground/90">
                                                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </p>
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
            </div>
        </div>
    );
}
