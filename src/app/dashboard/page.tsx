"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    LayoutDashboard,
    Calendar,
    MessageCircle,
    Heart,
    Bell,
    Search,
    ChevronRight,
    TrendingUp,
    Activity,
    Brain,
    ShieldAlert,
    Sparkles,
    Quote
} from "lucide-react";
import Link from "next/link";

const QUICK_ACTIONS = [
    {
        title: "Session Log",
        description: "Document your current frequency",
        icon: MessageCircle,
        href: "/dashboard/mood",
        color: "text-sage",
        bgColor: "bg-sage/10"
    },
    {
        title: "Wellness Scan",
        description: "Analyze clinical resonance",
        icon: Brain,
        href: "/dashboard/assessment",
        color: "text-olive",
        bgColor: "bg-olive/10"
    },
    {
        title: "Priority One",
        description: "Immediate safety protocol",
        icon: ShieldAlert,
        href: "/dashboard/crisis",
        color: "text-red-700",
        bgColor: "bg-red-50"
    },
];

const QUOTES = [
    { text: "Your health is a living pattern, not a static destination.", author: "Clinical Note" },
    { text: "Resonance is found in the space between your thoughts.", author: "Navigator Guide" },
    { text: "Every session logged is a vector toward stability.", author: "System Insight" },
];

export default function DashboardPage() {
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto">
            {/* Header / Search Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-linen tracking-tight leading-none">
                        Good afternoon, <span className="text-sage italic font-serif lowercase font-normal opacity-90">Prosper.</span>
                    </h1>
                    <p className="text-linen/40 font-medium italic text-lg decoration-sage/20 underline underline-offset-8">Your wellness resonance is stable today.</p>
                </div>

                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-linen/20 group-focus-within:text-sage transition-colors" />
                    <input
                        type="text"
                        placeholder="Search protocols..."
                        className="w-full h-16 pl-16 pr-8 rounded-[2rem] bg-white/5 border border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/20 transition-all font-medium text-linen placeholder:text-linen/10 backdrop-blur-md"
                    />
                </div>
            </div>

            {/* Top Interactive Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Dynamic Quote Card */}
                <div className="lg:col-span-2 glass-card rounded-[4rem] p-12 md:p-16 relative overflow-hidden group min-h-[360px] flex flex-col justify-center bg-black/20">
                    <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                        <Quote size={140} className="text-sage rotate-12" />
                    </div>

                    <div className="relative z-10 space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sage/10 text-sage text-[10px] font-black uppercase tracking-widest border border-sage/20">
                            <Sparkles size={12} /> Daily Resonance
                        </div>
                        <p className="text-4xl md:text-5xl font-bold text-linen leading-tight tracking-tight italic font-serif pr-12 opacity-90">
                            &ldquo;{QUOTES[quoteIndex].text}&rdquo;
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="h-0.5 w-16 bg-sage/30 rounded-full" />
                            <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.5em]">
                                {QUOTES[quoteIndex].author}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status/Activity Card */}
                <div className="glass-card rounded-[4rem] p-12 flex flex-col justify-between border-white/5 soft-glow-bg bg-[#1a2536]/50 shadow-2xl shadow-black/40">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-sage/20 flex items-center justify-center border border-white/5 shadow-inner">
                                <Activity className="h-7 w-7 text-sage" />
                            </div>
                            <span className="text-[10px] font-black text-sage uppercase tracking-[0.5em] opacity-60">Neural Sync</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-extrabold text-linen uppercase tracking-tight">Active Pulse</h3>
                            <p className="text-sm text-linen/30 font-medium italic tracking-widest uppercase">72 bpm — optimal resonance</p>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/5 mt-10">
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.3em]">Next Log Cycle</p>
                                <p className="text-2xl font-black text-linen">18:00 <span className="text-xs font-medium text-linen/40 tracking-normal capitalize">PM</span></p>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-full h-14 w-14 p-0 border-white/10 hover:bg-white/5 text-linen">
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Sections */}
            <div className="space-y-10">
                <div className="flex items-center gap-6">
                    <h2 className="text-xs font-black text-linen/20 uppercase tracking-[0.8em]">Primary Protocols</h2>
                    <div className="h-px bg-white/5 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {QUICK_ACTIONS.map(({ icon: Icon, title, href, color, description }) => (
                        <Link key={title} href={href}>
                            <Card className="glass-card p-10 rounded-[3.5rem] hover:ring-2 hover:ring-sage/20 transition-all group cursor-pointer border-transparent hover:-translate-y-2 duration-700 min-h-[240px] flex flex-col justify-between bg-white/5">
                                <div className="flex items-start justify-between">
                                    <div className={`p-5 rounded-2xl bg-white/5 ${color} transition-all group-hover:bg-sage/20 group-hover:scale-110 duration-700 shadow-inner`}>
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-white/5 group-hover:text-sage group-hover:translate-x-2 transition-all duration-500" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-extrabold text-linen uppercase tracking-tight">{title}</h3>
                                    <p className="text-sm text-linen/30 font-medium italic pr-4 leading-relaxed">&ldquo;{description}&rdquo;</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Secondary Hub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Insights Preview */}
                <div className="glass-card rounded-[4rem] p-12 space-y-10 bg-black/20">
                    <div className="flex items-center gap-6">
                        <TrendingUp className="text-sage" size={24} />
                        <h3 className="text-xs font-black text-linen uppercase tracking-[0.4em]">Resonance Analysis</h3>
                    </div>

                    <div className="space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/5 hover:bg-white/10 transition-all border border-white/5 group cursor-pointer">
                                <div className="h-14 w-14 rounded-full border-4 border-sage/10 border-t-sage animate-spin-slow flex-shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <p className="text-md font-bold text-linen uppercase tracking-tight">Syncing patterns...</p>
                                    <p className="text-xs text-linen/20 italic tracking-wide">Aggregating weekly Biometric nodes</p>
                                </div>
                                <ChevronRight className="text-white/5 group-hover:text-sage transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Integrated Calendar Tip */}
                <div className="glass-card rounded-[4rem] p-12 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden bg-gradient-to-br from-[#192231] to-black border-white/5 group">
                    <div className="absolute inset-0 bg-radial-gradient from-sage/10 to-transparent opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                    <Calendar size={64} className="text-sage opacity-30 relative group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative space-y-3">
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-linen">Protocol Sync</h3>
                        <p className="text-[10px] text-linen/20 font-black tracking-[0.4em] italic uppercase">No upcoming appointments</p>
                    </div>
                    <Button variant="outline" size="lg" className="relative border-white/10 hover:bg-white/10 text-linen">
                        Schedule Node
                    </Button>
                </div>
            </div>
        </div>
    );
}
