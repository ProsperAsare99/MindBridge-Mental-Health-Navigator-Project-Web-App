import { getAuthSession, serverApi } from "@/lib/server-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PlusCircle,
    AlertCircle,
    ArrowUpRight,
    BrainCircuit,
    Compass,
    Activity,
    Flame,
    CheckCircle2,
    Users,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MotivationalCarousel } from "@/components/dashboard/motivational-carousel";
import { GreetingHeader } from "@/components/dashboard/greeting-header";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";
import { MoodTrendChart } from "@/components/dashboard/mood-trend-chart";
import { DailyWins } from "@/components/dashboard/daily-wins";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { MoodInsight } from "@/components/dashboard/MoodInsight";
import { TrendingUp } from "lucide-react";


import { DailyPerspective } from "@/components/dashboard/daily-perspective";

export default async function DashboardPage() {
    const session = await getAuthSession();
    
    if (!session) {
        redirect("/login");
    }

    const user = session.user as any;
    let moodStats = { average: 0, count: 0, streak: 0 };
    let moodHistory = [];

    try {
        const statsData = await serverApi('/moods/stats');
        moodStats = statsData;
        
        const historyData = await serverApi('/moods');
        moodHistory = historyData;
    } catch (error) {
        console.error("Error fetching dashboard data on server:", error);
    }

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
            <DashboardContainer>
                {/* 1. Header & Quick Status */}
                <DashboardItem className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <GreetingHeader displayName={user?.name?.split(" ")[0]} />
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end mr-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-1.5">
                                <ShieldCheck className="h-3 w-3" />
                                Privacy-Validated
                            </div>
                            <div className="text-[9px] font-bold text-muted-foreground uppercase">Ghanaian Data Standards</div>
                        </div>
                        <Link href="/dashboard/mood">
                            <Button className="rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log New Mood
                            </Button>
                        </Link>
                    </div>
                </DashboardItem>

                {/* 2. Top Impact Board - Elevated necessary info */}
                <DashboardItem>
                    <DailyPerspective moodStats={moodStats} />
                </DashboardItem>

                {/* 3. Daily Reflections - Moved from bottom to top */}
                <DashboardItem>
                    <Card className="glass overflow-hidden group shadow-premium rounded-[2.5rem]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BrainCircuit className="h-5 w-5 text-primary" />
                                Growth Reflections
                            </CardTitle>
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">A curated space for your resilience</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <MotivationalCarousel />
                        </CardContent>
                    </Card>
                </DashboardItem>

                {/* 4. Analytics & Flow Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Flow - Enhanced visuals */}
                    <DashboardItem className="lg:col-span-2 space-y-6">
                        <Card className="h-full glass p-8 overflow-hidden relative group rounded-[2.5rem]">
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Activity Flow</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Your Weekly Trajectory</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-primary/10 border border-primary/10 text-primary text-[10px] font-black uppercase">
                                        <Activity size={12} strokeWidth={3} /> {moodStats.count} Total Logs
                                    </div>
                                </div>
                                <div className="h-[280px]">
                                    <MoodTrendChart moodHistory={moodHistory} />
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                <TrendingUp size={240} className="text-primary" />
                            </div>
                        </Card>
                    </DashboardItem>

                    {/* Daily Wins */}
                    <DashboardItem>
                        <Card className="h-full glass p-8 relative overflow-hidden group rounded-[2.5rem]">
                            <div className="relative z-10">
                                <DailyWins />
                            </div>
                            <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
                                <CheckCircle2 size={120} className="text-secondary" />
                            </div>
                        </Card>
                    </DashboardItem>
                </div>

                {/* 5. Utility & Insight Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Quick Actions */}
                    <DashboardItem className="lg:col-span-1">
                        <Card className="h-full glass p-8 rounded-[2.5rem]">
                            <QuickActions />
                        </Card>
                    </DashboardItem>

                    {/* Mood Insight - Now even more prominent */}
                    <DashboardItem className="lg:col-span-2">
                        <MoodInsight moods={moodHistory} className="h-full shadow-premium" />
                    </DashboardItem>

                    {/* Continuity Card */}
                    <DashboardItem>
                        <Link href="/dashboard/mood">
                            <Card className="h-full group hover:shadow-2xl transition-all duration-500 glass cursor-pointer overflow-hidden relative rounded-[2.5rem]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Continuity</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between pt-2 h-[calc(100%-80px)]">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-primary">{moodStats.streak}</span>
                                        <span className="text-sm font-bold text-muted-foreground uppercase">Days</span>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                            <Flame className="h-3 w-3" />
                                            {moodStats.streak > 0 ? "You're on fire! Keep it up." : "Start your streak today."}
                                        </div>
                                        <Button size="sm" variant="outline" className="rounded-xl w-full h-10 font-bold border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all">
                                            View Logs
                                        </Button>
                                    </div>
                                </CardContent>
                                <div className="absolute top-[-10%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <Flame size={120} className="text-primary" />
                                </div>
                            </Card>
                        </Link>
                    </DashboardItem>
                </div>

                {/* 6. Support & Resources */}
                <DashboardItem className="grid md:grid-cols-5 gap-8">
                    <div className="md:col-span-3 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-foreground/80 tracking-tight">Recommended Resources</h2>
                            <Link href="/dashboard/resources" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                Explore All <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Exam Stress Survival", time: "5 min", color: "bg-primary/5" },
                                { title: "The Power of Sleep", time: "8 min", color: "bg-secondary/5" }
                            ].map((res) => (
                                <div
                                    key={res.title}
                                    className={`p-6 rounded-[2rem] border border-primary/10 glass ${res.color} group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
                                >
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{res.time} Read</span>
                                    <h4 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{res.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="h-full glass text-red-600 dark:text-red-400 shadow-xl shadow-red-500/5 relative overflow-hidden group rounded-[2.5rem]">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    Crisis Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm font-bold leading-relaxed">
                                    Our Ghanaian support network is available 24/7 if things feel heavy.
                                </p>
                                <Link href="/dashboard/crisis">
                                    <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/50 border-none rounded-2xl shadow-lg shadow-red-900/20 active:scale-95 transition-all">
                                        Get Support Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </DashboardItem>

            </DashboardContainer>
        </div>
    );
}
