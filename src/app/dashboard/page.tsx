"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    PlusCircle,
    BookHeart,
    AlertCircle,
    School,
    Quote,
    Calendar,
    ArrowUpRight,
    Search,
    BrainCircuit,
    Compass,
    Activity,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MOTIVATION_QUOTES = [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "You are capable of more than you know.", author: "Glinda, The Wizard of Oz" }
];

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [greeting, setGreeting] = useState("");
    const [moodStats, setMoodStats] = useState({ average: 0, count: 0, streak: 0 });
    const router = useRouter();

    useEffect(() => {
        const fetchStats = async () => {
            if (loading || !user) return;
            try {
                const stats = await api.get('/moods/stats');
                setMoodStats(stats);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };
        fetchStats();
    }, [user, loading]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % MOTIVATION_QUOTES.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const currentQuote = MOTIVATION_QUOTES[quoteIndex];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10"
            >
                {/* Clean Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase"
                        >
                            <Calendar className="h-3 w-3" />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                            {greeting}, <span className="text-primary">{user?.displayName?.split(" ")[0] || "Student"}</span>
                        </h1>
                        <p className="text-muted-foreground font-medium max-w-md">
                            Welcome back. Here's how your mental well-being is trending today.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/mood">
                            <Button className="rounded-2xl shadow-xl shadow-primary/20">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log New Mood
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Main Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <motion.div variants={itemVariants} className="md:col-span-2">
                        <Card className="h-full glass border-primary/20 bg-primary/5 overflow-hidden group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BrainCircuit className="h-5 w-5 text-primary" />
                                    Daily Reflection
                                </CardTitle>
                                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">A space for your thoughts</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={quoteIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-4"
                                    >
                                        <p className="text-2xl md:text-3xl font-extrabold font-serif italic text-foreground tracking-tight leading-tight">
                                            "{currentQuote.text}"
                                        </p>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                                                — {currentQuote.author}
                                            </span>
                                            <Quote className="h-8 w-8 text-primary opacity-20" strokeWidth={3} />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
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
                                    <Sparkles size={100} className="text-primary" />
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link href="/dashboard/assessment">
                            <Card className="h-full glass border-primary/10 bg-primary/5 group hover:bg-primary/10 transition-all duration-500 cursor-pointer overflow-hidden relative">
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Wellness</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10 pb-8">
                                    <div className="space-y-2">
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
                    </motion.div>
                </div>

                {/* Featured Sections */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-5 gap-8">
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
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    key={res.title}
                                    className={`p-5 rounded-2xl border border-border glass ${res.color} group cursor-pointer hover:shadow-xl transition-all duration-500`}
                                >
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{res.time} Read</span>
                                    <h4 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{res.title}</h4>
                                </motion.div>
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
                </motion.div>
            </motion.div>
        </div>
    );
}
