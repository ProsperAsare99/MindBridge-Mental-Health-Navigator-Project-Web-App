import { getAuthSession, serverApi } from "@/lib/server-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PlusCircle,
    AlertCircle,
    Quote,
    ArrowUpRight,
    BrainCircuit,
    Compass,
    Activity,
    Flame,
    CheckCircle2,
    Users,
    ShieldCheck,
    Info
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MotivationalCarousel } from "@/components/dashboard/motivational-carousel";
import { GreetingHeader } from "@/components/dashboard/greeting-header";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";
import { LiveContextPanel } from "@/components/dashboard/live-context-panel";

export default async function DashboardPage() {
    const session = await getAuthSession();
    
    if (!session) {
        redirect("/login");
    }

    const user = session.user as any;
    let moodStats = { average: 0, count: 0, streak: 0 };

    try {
        moodStats = await serverApi('/moods/stats');
    } catch (error) {
        console.error("Error fetching dashboard stats on server:", error);
    }

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
            <DashboardContainer>
                {/* Clean Header Section */}
                <DashboardItem className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <GreetingHeader displayName={user?.name?.split(" ")[0]} />
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end mr-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-1.5">
                                <ShieldCheck className="h-3 w-3" />
                                Privacy-Validated
                            </div>
                            <div className="text-[9px] font-bold text-muted-foreground/40 uppercase">Ghanaian Data Standards</div>
                        </div>
                        <Link href="/dashboard/mood">
                            <Button className="rounded-2xl shadow-xl shadow-primary/20">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log New Mood
                            </Button>
                        </Link>
                    </div>
                </DashboardItem>

                {/* Real-time Sensor Context */}
                <DashboardItem>
                    <LiveContextPanel />
                </DashboardItem>

                {/* Persuasive Task Support: Next Best Action & Praise */}
                <DashboardItem className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-1 rounded-[2rem] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse-slow">
                        <div className="h-full w-full glass rounded-[1.9rem] p-8 flex flex-col md:flex-row items-center gap-8 border-none">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Flame className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <h3 className="text-xl font-extrabold tracking-tight">
                                    {moodStats.streak > 0 
                                        ? `Incredible! A ${moodStats.streak}-day streak.` 
                                        : "Ready to start your journey?"}
                                </h3>
                                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                    {moodStats.streak > 0 
                                        ? "Consistency is the foundation of mental resilience. Keep showing up for yourself." 
                                        : "Your first step is just a check-in away. Small actions lead to big shifts."}
                                </p>
                            </div>
                            <Link href="/dashboard/assessment" className="w-full md:w-auto">
                                <Button variant="secondary" className="w-full rounded-xl font-bold h-12 px-8">
                                    Complete Assessment
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Card className="glass border-primary/10 bg-primary/5 flex flex-col justify-center p-8 overflow-hidden relative">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                <Users className="h-3 w-3" />
                                Community Pulse
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-black">Supporting Minds</h4>
                                <p className="text-xs font-bold text-muted-foreground/70 uppercase tracking-tight">At {user?.institution || "Your University"}</p>
                            </div>
                            <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                                "You're not alone. Our community is built on collective well-being and shared support."
                            </p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 opacity-5">
                            <Users size={120} className="text-primary" />
                        </div>
                    </Card>
                </DashboardItem>

                {/* Main Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <DashboardItem className="md:col-span-2">
                        <Card className="h-full glass border-primary/20 bg-primary/5 overflow-hidden group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BrainCircuit className="h-5 w-5 text-primary" />
                                    Daily Reflection
                                </CardTitle>
                                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">A space for your thoughts</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <MotivationalCarousel />
                            </CardContent>
                        </Card>
                    </DashboardItem>

                    <DashboardItem>
                        <Link href="/dashboard/mood">
                            <Card className="h-full group hover:shadow-2xl transition-all duration-500 glass border-secondary/20 bg-secondary/5 cursor-pointer overflow-hidden relative">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Mood Streak</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between pt-2 h-[calc(100%-80px)]">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-primary">{moodStats.streak}</span>
                                        <span className="text-sm font-bold text-muted-foreground uppercase">Days</span>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                            <Activity className="h-3 w-3" />
                                            {moodStats.count > 0 ? `${moodStats.count} total check-ins` : "Start checking in!"}
                                        </div>
                                        <Button size="sm" variant="outline" className="rounded-xl w-full h-10 font-bold">
                                            Check Trends
                                        </Button>
                                    </div>
                                </CardContent>
                                <div className="absolute top-[-10%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <Activity size={100} className="text-primary" />
                                </div>
                            </Card>
                        </Link>
                    </DashboardItem>

                    <DashboardItem>
                        <Link href="/dashboard/assessment">
                            <Card className="h-full glass border-primary/10 bg-primary/5 group hover:bg-primary/10 transition-all duration-500 cursor-pointer overflow-hidden relative">
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Wellness</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10 pb-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter text-secondary/60 mb-1">
                                            <CheckCircle2 className="h-2.5 w-2.5" />
                                            Evidence-Based Framework
                                        </div>
                                        <h3 className="text-2xl font-black text-foreground">Take Assessment</h3>
                                        <p className="text-xs font-medium text-muted-foreground leading-relaxed">Evaluate your current anxiety & stress levels.</p>
                                    </div>
                                    <div className="mt-8">
                                        <Button size="sm" className="rounded-xl w-full h-10 font-bold shadow-lg shadow-primary/10 transition-transform active:scale-95">Start Now</Button>
                                    </div>
                                </CardContent>
                                <div className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover:opacity-15 transition-opacity duration-500">
                                    <Compass size={140} className="text-primary" />
                                </div>
                            </Card>
                        </Link>
                    </DashboardItem>
                </div>

                {/* Featured Sections */}
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
                                    className={`p-5 rounded-2xl border border-border glass ${res.color} group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
                                >
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{res.time} Read</span>
                                    <h4 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{res.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="h-full glass border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 shadow-xl shadow-red-500/5 relative overflow-hidden group">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    Crisis Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm font-medium leading-relaxed opacity-80">
                                    If you're feeling overwhelmed or in immediate distress, our crisis support team is here for you 24/7.
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

                {/* Credibility & Ethics Footer Support */}
                <DashboardItem className="pt-10 border-t border-primary/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                                <Info className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black uppercase tracking-widest leading-none">AI Transparency</p>
                                <p className="text-[9px] font-bold text-muted-foreground">Context-aware suggestions provided by MindBridge Navigator.</p>
                            </div>
                        </div>
                        <p className="text-[9px] font-medium text-muted-foreground max-w-sm text-center md:text-right italic leading-relaxed">
                            MindBridge is a supportive resource and does not provide clinical diagnoses. For professional psychiatric or psychological emergencies, please use the Crisis Support button.
                        </p>
                    </div>
                </DashboardItem>
            </DashboardContainer>
        </div>
    );
}
