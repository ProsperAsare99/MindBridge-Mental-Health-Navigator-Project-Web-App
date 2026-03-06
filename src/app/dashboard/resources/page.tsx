"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Search,
    BookOpen,
    Brain,
    Heart,
    Sparkles,
    Moon,
    Users,
    Lightbulb,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Play,
    Smartphone,
    GraduationCap,
    Leaf,
    Timer,
    PenLine,
    Smile,
    Wind,
    Dumbbell,
    Download,
    FileText,
    Check,
    ArrowUpRight,
} from "lucide-react";

// ─── Categories ───
const CATEGORIES = ["All", "Self-Help", "Academic Stress", "Mindfulness", "Understanding Mental Health"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Featured Articles ───
const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description:
            "Learn to recognise the signs of anxiety and depression, understand how they affect students, and discover evidence-based strategies to manage them effectively.",
        icon: Brain,
        category: "Understanding Mental Health" as Category,
        readTime: "7 min read",
        color: "from-primary/5 to-secondary/5",
        content: [
            "Anxiety and depression are among the most common mental health challenges faced by university students worldwide. In Ghana, studies suggest up to 40% of tertiary students experience significant anxiety symptoms during their academic journey.",
            "Common signs include persistent worry, difficulty concentrating, changes in sleep patterns, loss of interest in activities you once enjoyed, and feelings of hopelessness. These symptoms can significantly impact academic performance and social relationships.",
            "Evidence-based strategies include Cognitive Behavioural Therapy (CBT) techniques, regular physical activity, maintaining social connections, practicing mindfulness, and seeking professional help when symptoms persist for more than two weeks.",
        ],
    },
    {
        title: "Managing Exam Stress",
        description:
            "Practical strategies to handle the pressure of exams, assignments, and academic expectations without burning out.",
        icon: GraduationCap,
        category: "Academic Stress" as Category,
        readTime: "5 min read",
        color: "from-secondary/5 to-primary/5",
        content: [
            "Exam stress is a universal experience for students, but when left unmanaged it can lead to anxiety, sleep disruption, and poor performance — the opposite of what you're working toward.",
            "Start by breaking your revision into smaller, manageable chunks. Use the Pomodoro Technique (25 minutes focused study, 5-minute breaks). Create a realistic study timetable that includes rest days.",
            "On exam day, arrive early, practice deep breathing, and read all questions before starting. Remember: one exam does not define your worth or your future.",
        ],
    },
    {
        title: "Building Healthy Sleep Habits",
        description:
            "Sleep is the foundation of mental health. Learn how to improve your sleep quality even with a busy student schedule.",
        icon: Moon,
        category: "Self-Help" as Category,
        readTime: "4 min read",
        color: "from-primary/5 to-secondary/5",
        content: [
            "Research shows that university students who sleep fewer than 6 hours a night are significantly more likely to experience depression and anxiety. Quality sleep is not a luxury — it's essential.",
            "Create a consistent sleep schedule, even on weekends. Avoid screens 30 minutes before bed. Keep your room cool and dark. Limit caffeine after 2 PM.",
            "If racing thoughts keep you awake, try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Write down worries before bed to 'park' them for tomorrow.",
        ],
    },
];

const QUICK_TIPS = [
    "Drink a full glass of water right now. Dehydration worsens anxiety and fatigue.",
    "Step outside for 5 minutes. Sunlight boosts serotonin and improves mood.",
    "Send a kind message to someone you care about. Connection heals.",
    "Put your phone face-down for the next 30 minutes. Give your mind a break.",
    "Take 3 slow, deep breaths right now. In through your nose, out through your mouth.",
];

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % QUICK_TIPS.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const filteredArticles = ARTICLES.filter((article) => {
        const matchesCategory = activeCategory === "All" || article.category === activeCategory;
        const matchesSearch = searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                        <BookOpen size={12} /> Resource Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                        Wellness <span className="text-primary">Library</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Explore our curated selection of articles, mindfulness techniques, and student-focused mental health tools designed to support your journey.
                    </p>
                </motion.div>

                {/* Quick Tip Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card glass rounded-[2.5rem] p-8 border border-primary/10 shadow-premium relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Sparkles size={100} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Daily Micro-Habit</p>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={tipIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-foreground/80 text-lg font-semibold leading-relaxed"
                                >
                                    {QUICK_TIPS[tipIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Filter */}
                <div className="space-y-6">
                    <div className="relative group max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Find articles, tools, or support guides..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card glass border border-primary/5 rounded-2xl py-5 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${activeCategory === cat
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                                        : "bg-card/50 text-muted-foreground border-primary/10 hover:border-primary/30 hover:bg-card"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredArticles.map((article, index) => {
                            const Icon = article.icon;
                            const isExpanded = expandedArticle === index;
                            return (
                                <motion.div
                                    key={article.title}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`bg-card glass rounded-[2rem] border border-primary/10 shadow-premium overflow-hidden transition-all group ${isExpanded ? "md:col-span-2 lg:col-span-3" : "hover:scale-[1.02]"
                                        }`}
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <button
                                                onClick={() => setExpandedArticle(isExpanded ? null : index)}
                                                className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                                            >
                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                                                <span>{article.category}</span>
                                                <span className="h-1 w-1 rounded-full bg-primary/30" />
                                                <span>{article.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground/90 group-hover:text-primary transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                                                {article.description}
                                            </p>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-8 pt-8 border-t border-primary/10 space-y-4"
                                                >
                                                    {article.content.map((p, i) => (
                                                        <p key={i} className="text-sm text-foreground/70 leading-relaxed font-medium">
                                                            {p}
                                                        </p>
                                                    ))}
                                                    <div className="pt-4 flex items-center gap-4">
                                                        <button className="text-xs font-bold text-primary flex items-center gap-2 hover:underline">
                                                            Read Full Guide <ArrowUpRight size={14} />
                                                        </button>
                                                        <button className="text-xs font-bold text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors">
                                                            Save for later <Heart size={14} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Recommended Apps Section */}
                <div className="pt-10 space-y-6">
                    <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
                        <Smartphone className="text-primary" /> Popular Toolkit
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            { name: "Headspace", desc: "Mindfulness and meditation for students.", category: "Meditation" },
                            { name: "Woebot", desc: "Your clinical AI therapist for daily checks.", category: "AI Support" }
                        ].map((app) => (
                            <div key={app.name} className="bg-card glass rounded-[2rem] p-6 border border-primary/10 flex items-center justify-between group hover:scale-[1.01] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                        <Sparkles className="text-secondary" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">{app.category}</div>
                                        <h4 className="font-bold text-foreground/90">{app.name}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">{app.desc}</p>
                                    </div>
                                </div>
                                <button className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
