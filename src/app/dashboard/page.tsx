"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookHeart, AlertCircle, School, GraduationCap, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


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

    const router = useRouter(); // Import useRouter

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.uid) {
                // Check verification (skip for phone auth which has no email)
                /* Verification disabled by user request
                if (user.email && !user.emailVerified) {
                    router.push("/verify-email");
                    return;
                }
                */

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            }
        };
        fetchUserProfile();
    }, [user, router]);

    // Set time-based greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    // Rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % MOTIVATION_QUOTES.length);
        }, 8000); // Change every 8 seconds
        return () => clearInterval(interval);
    }, []);

    const currentQuote = MOTIVATION_QUOTES[quoteIndex];

    return (
        <div className="min-h-screen relative font-sans text-white selection:bg-indigo-500/30 selection:text-indigo-200 pb-20">
            {/* Background Shader managed by Layout */}

            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-in fade-in slide-in-from-top-5 duration-700">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
                            {greeting}, {user?.displayName?.split(" ")[0] || "Student"}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-indigo-100 mt-2">
                            {userProfile?.course && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] text-indigo-200">
                                    <BookHeart className="h-3.5 w-3.5" />
                                    {userProfile.course}
                                </span>
                            )}
                            {userProfile?.institution && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold bg-purple-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-purple-200">
                                    <School className="h-3.5 w-3.5" />
                                    {userProfile.institution}
                                </span>
                            )}
                            {!userProfile && <p className="text-sm opacity-80">Here's what's happening with your wellness today.</p>}
                        </div>
                    </div>
                    <div>
                        <Link href="/dashboard/mood">
                            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border-0 transition-all hover:scale-105 px-6 font-bold">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Log Mood
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats / Overview Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Mood Card */}
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all" />
                        <h3 className="text-sm font-bold text-indigo-300/80 uppercase tracking-wider">Current Mood Streak</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-300 group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm font-bold text-indigo-200">days</span>
                        </div>
                        <p className="mt-2 text-xs font-medium text-indigo-300/60">Start checking in today!</p>
                    </div>

                    {/* Assessment Card (New) */}
                    <Link href="/dashboard/assessment">
                        <div className="group h-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md p-6 shadow-xl hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all text-cyan-300">
                                <BookHeart size={48} />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all" />
                            <h3 className="text-sm font-bold text-cyan-300/80 uppercase tracking-wider">Wellness Check</h3>
                            <div className="mt-4">
                                <span className="text-lg font-bold text-white group-hover:underline decoration-cyan-400 underline-offset-4">Take Assessment</span>
                            </div>
                            <p className="mt-2 text-xs font-medium text-cyan-200/70">Check your anxiety & depression levels.</p>
                        </div>
                    </Link>

                    {/* Resources Card */}
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all" />
                        <h3 className="text-sm font-bold text-emerald-300/80 uppercase tracking-wider">Saved Resources</h3>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-emerald-300 group-hover:scale-110 transition-transform duration-300">0</span>
                            <span className="text-sm font-bold text-emerald-200">items</span>
                        </div>
                    </div>

                    {/* Motivation Quote Card */}
                    <div className="col-span-full md:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-[0_10px_40px_rgba(99,102,241,0.3)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-500">
                            <Quote size={100} fill="currentColor" className="text-white" />
                        </div>

                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <div key={quoteIndex} className="animate-in fade-in zoom-in duration-1000">
                                <p className="text-xl md:text-3xl font-bold font-serif italic text-white leading-tight drop-shadow-lg">
                                    "{currentQuote.text}"
                                </p>
                                <p className="mt-6 text-sm font-black text-indigo-100 uppercase tracking-[0.2em] border-l-4 border-indigo-400 pl-4 bg-indigo-500/20 py-1 inline-block">
                                    {currentQuote.author}
                                </p>
                            </div>

                            {/* Progress bar for next quote */}
                            <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full overflow-hidden rounded-full">
                                <div key={quoteIndex} className="h-full bg-white/60 animate-[progress_8s_linear_forward]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-indigo-300" />
                            Recommended for You
                        </h2>
                        <div className="space-y-4">
                            {/* Placeholders */}
                            <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-indigo-100 group-hover:text-white transition-colors">Exam Stress Relief</h4>
                                <p className="text-xs text-indigo-300/70 mt-1">5 min read • Techniques for academic anxiety</p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group">
                                <h4 className="font-medium text-slate-700 dark:text-indigo-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Mindful Breathing</h4>
                                <p className="text-xs text-slate-500 dark:text-indigo-300/70 mt-1">10 min video • Grounding exercise</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-indigo-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10">
                            Explore Library
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-red-600/20 to-rose-600/20 backdrop-blur-md p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-rose-500/30 blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

                        <div className="flex items-center gap-3 text-rose-400 mb-4 relative z-10">
                            <AlertCircle className="h-6 w-6 animate-pulse" />
                            <h2 className="text-lg font-black text-white uppercase tracking-wider">Need Help Now?</h2>
                        </div>
                        <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                            If you are in distress or need someone to talk to immediately, support is available 24/7.
                            <span className="block mt-1 font-bold text-white">You are not alone.</span>
                        </p>
                        <Link href="/dashboard/crisis" className="relative z-10">
                            <Button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border-0 shadow-[0_0_25px_rgba(225,29,72,0.4)] font-bold py-6">
                                Get Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
}
