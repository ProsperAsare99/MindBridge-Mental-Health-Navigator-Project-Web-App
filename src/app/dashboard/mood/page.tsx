"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import {
    Smile,
    Meh,
    Frown,
    CloudRain,
    TrendingUp,
    Calendar,
    Sparkles,
    Clock,
    ChevronRight,
    Sun,
    PenLine,
    ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [activeTimeRange, setActiveTimeRange] = useState<"week" | "month">("week");

    const weekData = [
        { name: "Mon", mood: 3 },
        { name: "Tue", mood: 4 },
        { name: "Wed", mood: 2 },
        { name: "Thu", mood: 4 },
        { name: "Fri", mood: 5 },
        { name: "Sat", mood: 4 },
        { name: "Sun", mood: 3 },
    ];

    const moods = [
        { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
        { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
        { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
        { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
        { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
    ];

    const stats = [
        { label: "Weekly Average", value: "3.6", icon: TrendingUp, color: "text-primary" },
        { label: "Check-ins", value: "12", icon: Calendar, color: "text-secondary" },
        { label: "Active Streak", value: "5-Day", icon: Sparkles, color: "text-primary" },
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
                                className="bg-card glass rounded-[2rem] p-6 border border-primary/5 shadow-premium group hover:scale-[1.02] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
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
                            className="bg-card glass rounded-[2.5rem] p-8 md:p-10 border border-primary/10 shadow-premium space-y-10"
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
                                            className={`flex flex-col items-center gap-4 p-4 rounded-[2rem] transition-all group relative ${isSelected
                                                ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/10"
                                                : "bg-muted/30 border-2 border-transparent hover:border-primary/20 hover:bg-muted/50"
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
                                    className="w-full bg-muted/30 border border-primary/5 rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all min-h-[120px] resize-none shadow-inner"
                                />
                            </div>

                            <Button className="h-14 w-full rounded-2xl font-bold shadow-xl shadow-primary/20 scale-100 active:scale-[0.98] transition-transform">
                                Log Entry <ArrowUpRight className="ml-2" size={18} />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Chart Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card glass rounded-[2.5rem] p-8 border border-primary/10 shadow-premium h-full space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-foreground/90">Activity Flow</h3>
                                <div className="flex bg-muted/50 rounded-full p-1 border border-primary/5">
                                    {["Week", "Month"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setActiveTimeRange(t.toLowerCase() as any)}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${activeTimeRange === t.toLowerCase() ? "bg-background shadow-md text-primary" : "text-muted-foreground hover:text-foreground"
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
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-[0.05]" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700, fill: "currentColor" }}
                                            className="text-muted-foreground"
                                            dy={10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '20px',
                                                border: '1px solid currentColor',
                                                borderOpacity: 0.1,
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
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
                                            stroke="var(--primary)"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#moodGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Recent Fluctuations</p>
                                {[
                                    { label: "Today", val: "Good", time: "2:30 PM", icon: Smile },
                                    { label: "Yesterday", val: "Okay", time: "9:15 PM", icon: Meh }
                                ].map((entry) => (
                                    <div key={entry.label} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-primary/5 group hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <entry.icon size={18} className="text-primary" />
                                            <div>
                                                <p className="text-xs font-bold text-foreground/90">{entry.label}</p>
                                                <p className="text-[10px] text-muted-foreground">{entry.val}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground">{entry.time}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
