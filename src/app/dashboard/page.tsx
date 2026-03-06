"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
    Activity
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [greeting, setGreeting] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.uid) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            }
        };
        fetchUserProfile();
    }, [user, router]);

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
                        <Card className="h-full border-primary/5 bg-primary/5 overflow-hidden group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BrainCircuit className="h-5 w-5 text-primary" />
                                    Daily Reflection
                                </CardTitle>
                                <CardDescription>A space for your thoughts</CardDescription>
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
                                        <p className="text-xl font-medium font-serif italic text-foreground/80 leading-relaxed">
                                            "{currentQuote.text}"
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary/60">— {currentQuote.author}</span>
                                            <Quote className="h-4 w-4 text-primary/20" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-none bg-accent/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Mood Streak</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-between pt-2 h-[calc(100%-80px)]">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-primary">0</span>
                                    <span className="text-sm font-bold text-muted-foreground uppercase">Days</span>
                                </div>
                                <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                                    <Activity className="h-3 w-3" />
                                    Start checking in!
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link href="/dashboard/assessment">
                            <Card className="h-full border-none bg-secondary/10 group hover:bg-secondary/20 transition-all duration-500 cursor-pointer overflow-hidden relative">
                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-secondary-foreground/60">Wellness</CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10 pb-8">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-secondary-foreground">Take Assessment</h3>
                                        <p className="text-xs font-medium text-secondary-foreground/60 leading-relaxed">Evaluate your current anxiety & stress levels.</p>
                                    </div>
                                    <div className="mt-8">
                                        <Button size="sm" variant="secondary" className="rounded-xl w-full">Start Now</Button>
                                    </div>
                                </CardContent>
                                <div className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Compass size={140} />
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
                                { title: "Exam Stress Survival", time: "5 min", color: "bg-blue-50/50" },
                                { title: "The Power of Sleep", time: "8 min", color: "bg-orange-50/50" }
                            ].map((res) => (
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    key={res.title}
                                    className={`p-5 rounded-2xl border border-primary/5 ${res.color} group cursor-pointer hover:shadow-xl transition-all duration-500`}
                                >
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{res.time} Read</span>
                                    <h4 className="text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{res.title}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="h-full border-none bg-[#fff5f5] text-[#c53030] shadow-xl shadow-red-500/5 relative overflow-hidden group">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    Crisis Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm font-medium leading-relaxed">
                                    If you're feeling overwhelmed or in immediate distress, our crisis support team is here for you 24/7.
                                </p>
                                <Link href="/dashboard/crisis">
                                    <Button className="w-full h-12 bg-[#c53030] hover:bg-[#9b1c1c] text-white border-none rounded-2xl shadow-lg shadow-red-900/20">
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
