"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";
import { MoodGarden } from "@/components/dashboard/MoodGarden";
import { api } from "@/lib/api";
import { 
    ChevronLeft, 
    Droplets, 
    Wind, 
    Sparkles, 
    Loader2,
    Calendar,
    Trophy,
    Target
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GardenPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const fetchStats = async () => {
        try {
            const response = await api.get('/gamification/stats');
            setStats(response);
        } catch (err) {
            console.error('Failed to fetch garden stats:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchStats();
        }
    }, [session]);

    if (status === "loading" || loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Cultivating your space...</p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    const currentLevel = stats?.wellnessLevel || 1;
    const progressXP = stats?.wellnessXP || 0;
    const targetXP = Math.pow(currentLevel, 2) * 100;
    const xpPercentage = Math.min(100, (progressXP / targetXP) * 100);

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <DashboardContainer>
                {/* Header Section */}
                <DashboardItem className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary/10 text-primary border border-primary/10">
                                <ChevronLeft size={24} />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-[10px] uppercase font-black px-3 py-1 scale-90 -ml-1">
                                    Resilience Level {currentLevel}
                                </Badge>
                                <Sparkles size={14} className="text-primary animate-pulse" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
                                Garden of <span className="text-primary">Resilience</span>
                            </h1>
                            <p className="text-sm font-semibold text-foreground/70 max-w-md">
                                A living reflection of your mental growth. Every log, every breath, and every challenge grows this space.
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats Overlay */}
                    <div className="flex gap-4">
                        <div className="glass p-4 px-6 rounded-[2rem] border-primary/10 flex flex-col items-center justify-center min-w-[120px]">
                            <span className="text-[10px] font-black text-muted-foreground uppercase mb-1">Current Streak</span>
                            <span className="text-2xl font-black text-foreground">{stats?.streak || 0} Days</span>
                        </div>
                        <div className="glass p-4 px-6 rounded-[2rem] border-primary/10 flex flex-col items-center justify-center min-w-[120px]">
                            <span className="text-[10px] font-black text-muted-foreground uppercase mb-1">Health Score</span>
                            <span className="text-2xl font-black text-primary">{stats?.garden?.healthScore || 50}%</span>
                        </div>
                    </div>
                </DashboardItem>

                {/* Main Garden Interaction Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* The Visualizer (Left) */}
                    <DashboardItem className="lg:col-span-8">
                        <div className="relative h-[600px] flex items-center justify-center">
                            <MoodGarden 
                                level={stats?.garden?.growthLevel || 1} 
                                health={stats?.garden?.healthScore || 50}
                                className="w-full h-full scale-110 md:scale-125"
                            />
                            
                            {/* Floating Interaction Menu */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                                <Button className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-2 border-none active:scale-95 transition-all">
                                    <Droplets size={18} /> Tend Garden
                                </Button>
                                <Link href="/dashboard/garden/zen">
                                    <Button variant="outline" className="rounded-full h-14 px-8 glass border-primary/20 text-foreground font-black uppercase text-[11px] tracking-widest hover:bg-primary/5 active:scale-95 transition-all">
                                        <Wind size={18} className="mr-2" /> Zen Mode
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </DashboardItem>

                    {/* Mastery Panel (Right) */}
                    <DashboardItem className="lg:col-span-4 space-y-6">
                        {/* XP Progress Card */}
                        <Card className="glass p-8 rounded-[2.5rem] border-primary/10 overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Trophy size={140} className="text-primary" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Stage Evolution</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mastery Progress</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[11px] font-black text-primary uppercase">Level {currentLevel}</span>
                                        <span className="text-[11px] font-bold text-muted-foreground">{progressXP} / {targetXP} XP</span>
                                    </div>
                                    <div className="h-4 bg-muted/30 rounded-full overflow-hidden p-1 border border-white/5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${xpPercentage}%` }}
                                            className="h-full bg-gradient-to-r from-sky-400 via-primary to-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase center text-center pt-1">
                                        {targetXP - progressXP} XP remaining to reach next growth stage
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Current Challenge Track */}
                        <Card className="glass p-8 rounded-[2.5rem] border-primary/10 border-l-4 border-l-amber-500/50 bg-gradient-to-br from-amber-500/5 to-transparent">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <Target size={16} />
                                    </div>
                                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Active Track</h3>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-foreground">Gratitude Journey</h4>
                                    <p className="text-xs font-semibold text-foreground/60 leading-relaxed mt-1">
                                        You're on a 3-day streak of daily gratitude reflections. Stick with it to unlock the 'Baobab' seed.
                                    </p>
                                </div>
                                <Link href="/dashboard/challenges" className="block">
                                    <Button variant="ghost" className="w-full justify-between h-12 rounded-2xl hover:bg-amber-500/10 text-amber-500 font-black text-[10px] uppercase tracking-widest px-4 border border-amber-500/10">
                                        Open Challenges Library <ChevronLeft size={14} className="rotate-180" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Recent Milestones */}
                        <Card className="glass p-8 rounded-[2.5rem] border-primary/10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <Trophy size={16} />
                                    </div>
                                    <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Latest Milestone</h3>
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                                    <div className="h-10 w-10 text-2xl">🌱</div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-foreground uppercase">Seed of Intent</h4>
                                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Unlocked Yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </DashboardItem>
                </div>
            </DashboardContainer>
        </div>
    );
}
