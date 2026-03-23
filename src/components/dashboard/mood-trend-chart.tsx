"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { 
    TrendingUp, 
    Calendar,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";

const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false, loading: () => <div className="h-full w-full bg-muted/20 rounded-xl animate-pulse" /> });
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });

interface MoodTrendChartProps {
    moodHistory: any[];
}

export function MoodTrendChart({ moodHistory }: MoodTrendChartProps) {
    const chartData = useMemo(() => {
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
            mood: d.count > 0 ? parseFloat((d.val / d.count).toFixed(1)) : 0
        }));
    }, [moodHistory]);

    if (moodHistory.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-6 glass border-primary/5 rounded-[2rem]">
                <Activity className="h-12 w-12 text-primary/20 animate-pulse" />
                <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">No data yet</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Check in to see your trends</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="moodTrendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--primary)" className="opacity-[0.2]" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 900, fill: "var(--foreground)" }}
                        dy={10}
                    />
                    <Tooltip
                        cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="glass p-4 rounded-3xl border border-primary/40 shadow-2xl backdrop-blur-md">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{label}</p>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <p className="text-2xl font-black text-foreground">{payload[0].value}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">/ 5.0</p>
                                        </div>
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
                        strokeWidth={6}
                        fillOpacity={1}
                        fill="url(#moodTrendGradient)"
                        animationDuration={2000}
                        dot={{ 
                            r: 6, 
                            fill: 'var(--primary)', 
                            stroke: 'var(--background)', 
                            strokeWidth: 2,
                            fillOpacity: 1
                        }}
                        activeDot={{ 
                            r: 9, 
                            fill: 'var(--primary)', 
                            stroke: 'var(--background)', 
                            strokeWidth: 3
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
