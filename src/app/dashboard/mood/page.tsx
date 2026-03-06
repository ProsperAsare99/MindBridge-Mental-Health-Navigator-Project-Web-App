"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
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
    Activity,
    Heart
} from "lucide-react";

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [activeTimeRange, setActiveTimeRange] = useState<"week" | "month">("week");

    // Placeholder data for the chart
    const weekData = [
        { name: "Mon", mood: 3 },
        { name: "Tue", mood: 4 },
        { name: "Wed", mood: 2 },
        { name: "Thu", mood: 4 },
        { name: "Fri", mood: 5 },
        { name: "Sat", mood: 4 },
        { name: "Sun", mood: 3 },
    ];

    const data = weekData;

    const moods = [
        { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-50", ringColor: "ring-slate-200" },
        { value: 2, icon: Frown, label: "Bad", color: "text-red-600", bgColor: "bg-red-50/50", ringColor: "ring-red-100" },
        { value: 3, icon: Meh, label: "Okay", color: "text-amber-600", bgColor: "bg-amber-50/50", ringColor: "ring-amber-100" },
        { value: 4, icon: Smile, label: "Good", color: "text-sage", bgColor: "bg-sage/10", ringColor: "ring-sage/20" },
        { value: 5, icon: Sun, label: "Great", color: "text-olive", bgColor: "bg-olive/10", ringColor: "ring-olive/20" },
    ];

    const recentEntries = [
        { day: "Today", mood: 4, label: "Good", note: "Feeling more centered after the morning scan.", time: "2:30 PM" },
        { day: "Yesterday", mood: 3, label: "Okay", note: "A bit overwhelmed with the project deadline.", time: "9:15 PM" },
        { day: "Feb 23", mood: 5, label: "Great", note: "Productive day and had a good rest.", time: "6:00 PM" },
    ];

    const selectedMoodData = moods.find(m => m.value === selectedMood);

    return (
        <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-1000">
            {/* Page Header */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sage/10 text-sage text-[10px] font-black uppercase tracking-widest border border-sage/20">
                    <Heart size={12} className="fill-sage/20" /> Emotional Resonance
                </div>
                <h1 className="text-4xl md:text-7xl font-extrabold text-linen tracking-tight leading-none">
                    How are you <span className="text-sage italic font-serif lowercase font-normal opacity-90">feeling?</span>
                </h1>
                <p className="text-lg md:text-xl text-linen/40 font-medium max-w-2xl leading-relaxed italic">
                    Mapping your internal frequency helps identify patterns and triggers in your daily cycle.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-10 lg:grid-cols-5">
                {/* Mood Logger — Left Column (3/5) */}
                <div className="lg:col-span-3 space-y-10">
                    {/* Mood Check-in Card */}
                    <div className="glass-card rounded-[4rem] p-12 md:p-16 relative overflow-hidden soft-glow-bg bg-black/20 border-white/5">
                        <div className="relative z-10">
                            <div className="flex items-center gap-8 mb-16">
                                <div className="h-20 w-20 rounded-[2.5rem] bg-sage/20 flex items-center justify-center border border-white/5 shadow-inner">
                                    <Sparkles className="h-9 w-9 text-sage" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-linen uppercase tracking-tight">
                                        Current State
                                    </h2>
                                    <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.5em]">
                                        Identify Your Focus
                                    </p>
                                </div>
                            </div>

                            {/* Mood Buttons */}
                            <div className="grid grid-cols-5 gap-6">
                                {moods.map((m) => {
                                    const Icon = m.icon;
                                    const isSelected = selectedMood === m.value;
                                    return (
                                        <button
                                            key={m.value}
                                            onClick={() => setSelectedMood(m.value)}
                                            className={`relative flex flex-col items-center gap-6 p-8 rounded-[3rem] transition-all duration-700 border
                                                ${isSelected
                                                    ? `bg-white/10 border-sage/40 shadow-2xl shadow-black/40 scale-105`
                                                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                                                }`}
                                        >
                                            <Icon className={`h-10 w-10 transition-all duration-700 ${isSelected ? "text-sage" : "text-linen/20"}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isSelected ? "text-linen" : "text-linen/10"}`}>
                                                {m.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Note Section */}
                            <div className="mt-16 space-y-6">
                                <label htmlFor="note" className="block text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                    Personal Reflection <span className="opacity-40 italic font-medium tracking-normal">(optional)</span>
                                </label>
                                <textarea
                                    id="note"
                                    rows={5}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="block w-full rounded-[3rem] border border-white/5 bg-white/5 px-10 py-8 text-xl text-linen placeholder:text-linen/10 focus:ring-4 focus:ring-sage/5 focus:border-sage/20 transition-all resize-none shadow-inner backdrop-blur-md"
                                    placeholder="What resonance is guiding your thoughts today?"
                                />
                            </div>

                            <Button
                                size="xl"
                                className="w-full mt-16 shadow-2xl shadow-black/40 disabled:opacity-10"
                                disabled={!selectedMood}
                            >
                                Secure Transmission
                            </Button>
                        </div>
                    </div>

                    {/* Trends Chart Card */}
                    <div className="glass-card rounded-[4rem] p-12 md:p-16 border-white/5 relative overflow-hidden bg-white/5">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                            <div className="flex items-center gap-8">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/5">
                                    <TrendingUp className="h-7 w-7 text-sage" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-extrabold text-linen uppercase tracking-tight">
                                        Resonance Trends
                                    </h2>
                                    <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.4em]">
                                        Weekly Core Analysis
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-[360px] w-full pr-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                                    <defs>
                                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#557373" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#557373" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(242, 239, 234, 0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "rgba(242, 239, 234, 0.2)", fontSize: 10, fontWeight: 900 }}
                                        dy={15}
                                    />
                                    <YAxis
                                        domain={[1, 5]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "rgba(242, 239, 234, 0.2)", fontSize: 10, fontWeight: 900 }}
                                        ticks={[1, 2, 3, 4, 5]}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "rgba(25, 34, 49, 0.9)",
                                            backdropFilter: "blur(20px)",
                                            borderRadius: "32px",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                                            padding: "24px"
                                        }}
                                        labelStyle={{ color: "#f2efea", fontWeight: 900, textTransform: "uppercase", fontSize: "10px", letterSpacing: "3px", marginBottom: "12px" }}
                                        itemStyle={{ color: "#557373", fontWeight: 900, fontSize: "14px", textTransform: "uppercase" }}
                                        cursor={{ stroke: 'rgba(85, 115, 115, 0.3)', strokeWidth: 2, strokeDasharray: "8 8" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="mood"
                                        stroke="#557373"
                                        strokeWidth={6}
                                        fillOpacity={1}
                                        fill="url(#moodGradient)"
                                        dot={{ fill: '#557373', strokeWidth: 4, r: 6, stroke: '#192231' }}
                                        activeDot={{ r: 10, strokeWidth: 0, fill: "#f2efea" }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column — Recent Entries (2/5) */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="glass-card rounded-[4rem] p-12 md:p-14 relative overflow-hidden group border-white/5 bg-black/20">
                        <div className="relative z-10 flex items-center gap-8 mb-16">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                                <Clock className="h-7 w-7 text-sage" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-extrabold text-linen uppercase tracking-tight">
                                    History
                                </h2>
                                <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.5em]">
                                    Reflection Nodes
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            {recentEntries.map((entry, i) => {
                                const moodData = moods.find(m => m.value === entry.mood);
                                const Icon = moodData?.icon || Meh;
                                return (
                                    <div
                                        key={i}
                                        className="p-10 rounded-[3rem] bg-white/5 border border-transparent hover:border-white/10 transition-all duration-700 group/item hover:bg-white/10 cursor-default"
                                    >
                                        <div className="flex items-start gap-8">
                                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 shrink-0 transition-all group-hover/item:scale-110 group-hover/item:bg-sage/10">
                                                <Icon className={`h-7 w-7 text-sage`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-md font-black text-linen uppercase tracking-tight opacity-80">
                                                        {entry.day}
                                                    </span>
                                                    <span className="text-[10px] font-black text-linen/20 uppercase tracking-[0.3em]">
                                                        {entry.time}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-black text-sage uppercase tracking-widest mb-4 italic opacity-60">
                                                    {entry.label}
                                                </p>
                                                <p className="text-md text-linen/50 leading-relaxed italic font-medium">
                                                    &ldquo;{entry.note}&rdquo;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Expand Link */}
                        <button className="relative z-10 mt-12 w-full flex items-center justify-center gap-4 py-8 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 hover:text-sage hover:bg-white/5 transition-all border border-white/5">
                            Show Full Archive
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Insight Card */}
                        <div className="relative z-10 mt-16 p-12 rounded-[4rem] bg-gradient-to-br from-olive to-[#0d0d0d] text-linen shadow-2xl shadow-black/40 overflow-hidden soft-glow-bg border border-white/5">
                            <div className="relative space-y-8">
                                <div className="flex items-center gap-5">
                                    <Sparkles className="h-6 w-6 text-sage" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/40">Neural Insight</h3>
                                </div>
                                <p className="text-2xl font-bold tracking-tight leading-snug opacity-90">
                                    Your frequency is <span className="text-sage underline decoration-2 underline-offset-8">rising</span> this cycle.
                                </p>
                                <p className="text-sm font-medium text-linen/40 leading-relaxed italic pr-4">
                                    Friday signals the highest peak in resonance. We recommend documenting core positive triggers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
