"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    SearchX,
    MessageSquare,
    Zap,
    Repeat,
    Stethoscope,
    Target
} from "lucide-react";

// ─── Categories ───
const CATEGORIES = ["All", "Self-Help", "Academic Stress", "Mindfulness", "Understanding Mental Health"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Articles ───
const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description: "Learn to recognise the signs and discover evidence-based strategies to manage them effectively.",
        icon: Brain,
        category: "Understanding Mental Health" as Category,
        readTime: "7 min read",
        content: [
            "Anxiety and depression are common challenges. In Ghana, studies suggest up to 40% of tertiary students experience significant symptoms.",
            "Common signs include persistent worry, difficulty concentrating, and loss of interest in activities.",
            "Strategies include CBT techniques, physical activity, and seeking professional help early."
        ],
    },
    {
        title: "The Burnout Cycle",
        description: "How to recognize academic exhaustion before it leads to a total collapse.",
        icon: Zap,
        category: "Academic Stress" as Category,
        readTime: "6 min read",
        content: [
            "Burnout isn't just being tired; it's emotional, mental, and physical exhaustion caused by prolonged stress.",
            "Watch for detachment, cynical feelings toward your studies, and a sense of reduced accomplishment.",
            "Counteract burnout by setting strict boundaries between 'study time' and 'living time'."
        ],
    },
    {
        title: "Managing Exam Stress",
        description: "Practical strategies to handle pressure without burning out.",
        icon: GraduationCap,
        category: "Academic Stress" as Category,
        readTime: "5 min read",
        content: [
            "Exam stress is universal, but manageable with chunking and the Pomodoro technique.",
            "Avoid 'all-nighters' which significantly impair cognitive function and memory recall.",
            "Remember that your worth is not tied to a single grade or assessment."
        ],
    },
    {
        title: "Navigating Imposter Syndrome",
        description: "Feeling like a 'fraud' is common among high achievers. Here is how to handle it.",
        icon: Lightbulb,
        category: "Understanding Mental Health" as Category,
        readTime: "5 min read",
        content: [
            "Imposter syndrome involves doubting your abilities and feeling like you don't belong in your university program.",
            "Talk about it. You'll find that many of your most 'successful' peers feel exactly the same way.",
            "Focus on the evidence of your achievements, not the subjective feeling of inadequacy."
        ],
    },
    {
        title: "Building Healthy Sleep Habits",
        description: "Sleep is the foundation of mental health. Learn to improve it even with a busy schedule.",
        icon: Moon,
        category: "Self-Help" as Category,
        readTime: "4 min read",
        content: [
            "Quality sleep is essential for memory consolidation and emotional regulation.",
            "Establish a consistent 'wind-down' routine 30 minutes before sleep without screens.",
            "Limit caffeine intake in the afternoon to avoid disrupting your natural sleep cycle."
        ],
    },
    {
        title: "The Power of Social Connection",
        description: "Human connection is a buffer against stress. Build your support network.",
        icon: Users,
        category: "Understanding Mental Health" as Category,
        readTime: "5 min read",
        content: [
            "Loneliness is a significant risk factor for depression among students away from home.",
            "Even one or two trusted connections can make a major difference in your resilience.",
            "Join campus groups or study circles to build organic social bridges."
        ],
    },
    {
        title: "Mindfulness for Beginners",
        description: "A simple introduction to meditation—no experience needed.",
        icon: Leaf,
        category: "Mindfulness" as Category,
        readTime: "6 min read",
        content: [
            "Mindfulness is paying attention to the present moment without judgement.",
            "Just 5-10 minutes a day can lower cortisol levels and improve focus.",
            "Try 'meditative walking' to class by focusing on the sensation of your feet hitting the ground."
        ],
    },
    {
        title: "Movement as Medicine",
        description: "How physical activity stabilizes mood and reduces biological stress.",
        icon: Dumbbell,
        category: "Self-Help" as Category,
        readTime: "5 min read",
        content: [
            "Exercise releases endorphins and BDNF, which act as natural antidepressants.",
            "You don't need a gym—a 20-minute brisk walk across campus is highly effective.",
            "Consistency is more important than intensity when it comes to mental health."
        ],
    },
    {
        title: "Understanding Your Emotions",
        description: "Learn to name, understand, and work with your feelings.",
        icon: Heart,
        category: "Self-Help" as Category,
        readTime: "5 min read",
        content: [
            "Emotional literacy involves identifying specific feelings (e.g., 'disappointed' vs just 'bad').",
            "'Name it to tame it': labeling an emotion reduces the activity in your brain's fear center.",
            "All emotions carry information. Listen to what they are trying to tell you about your needs."
        ],
    },
];

// ─── Self-Help Toolkit ───
const SELF_HELP_TOOLS = [
    {
        title: "Progressive Muscle Relaxation",
        icon: Dumbbell,
        description: "Release physical tension caused by stress.",
        steps: ["Find a quiet place.", "Tense your feet for 5s, then release.", "Move up to calves, thighs, and torso.", "End with shoulders and face."]
    },
    {
        title: "Box Breathing for Calm",
        icon: Wind,
        description: "Regain calm under pressure in 4 minutes.",
        steps: ["Inhale for 4s.", "Hold for 4s.", "Exhale for 4s.", "Hold for 4s.", "Repeat 4 times."]
    },
    {
        title: "The Worry Tree",
        icon: Repeat,
        description: "Decide what to act on and what to let go.",
        steps: ["Write down the worry.", "Is it a problem I can solve now?", "If YES, make an action plan.", "If NO, practice 'letting go' and refocus."]
    },
    {
        title: "Pomodoro Study Technique",
        icon: Timer,
        description: "Fight procrastination and prevent burnout.",
        steps: ["Focus for 25 mins.", "5-minute break.", "Repeat 4 times.", "Take a 30-minute break."]
    },
    {
        title: "Journaling for Clarity",
        icon: PenLine,
        description: "Untangle thoughts and manage complex feelings.",
        steps: ["Write for 10 minutes.", "Don't judge your grammar.", "Focus on what you're feeling.", "End with 1 thing you're proud of."]
    },
    {
        title: "Digital Detox (5-Min)",
        icon: Smartphone,
        description: "Reset your attention span instantly.",
        steps: ["Turn phone off.", "Place it in another room.", "Sit in silence for 5 mins.", "Notice the 'itch' to check it and let it pass."]
    },
    {
        title: "Daily Gratitude Practice",
        icon: Smile,
        description: "Rewire your brain for positivity.",
        steps: ["List 3 specific good things.", "Describe WHY they happened.", "Do this every evening.", "Watch your perspective shift."]
    },
];

// ─── Recommended Apps ───
const RECOMMENDED_APPS = [
    { name: "Headspace", tag: "Meditation", icon: Sparkles, desc: "Guided mindfulness for students." },
    { name: "7 Cups", tag: "Support", icon: MessageSquare, desc: "24/7 chat with trained listeners." },
    { name: "Calm", tag: "Sleep", icon: Moon, desc: "Sleep stories and relaxation music." },
    { name: "Woebot", tag: "AI CBT", icon: Brain, desc: "Daily check-ins with an AI therapist." },
    { name: "Daylio", tag: "Mood", icon: Smile, desc: "Track your mood without writing a word." },
    { name: "MindShift CBT", tag: "Anxiety", icon: Lightbulb, desc: "Tools for panic and worry." },
    { name: "Happify", tag: "Happiness", icon: Target, desc: "Science-based games for stress." },
    { name: "Sanvello", tag: "Wellness", icon: Leaf, desc: "CBT and mood tracking suite." },
    { name: "Bearable", tag: "Tracking", icon: Stethoscope, desc: "Find correlations in your symptoms." }
];

// ─── Video Resources ───
const VIDEO_RESOURCES = [
    { title: "Make Stress Your Friend", speaker: "Kelly McGonigal", id: "RcGyVTAoXEU" },
    { title: "The Happy Secret to Work", speaker: "Shawn Achor", id: "fLJsdqxnZb0" },
    { title: "Vulnerability Power", speaker: "Brené Brown", id: "iCvmsMzlF7o" },
    { title: "10 Mindful Minutes", speaker: "Andy Puddicombe", id: "qzR62JJCMBQ" },
    { title: "Emotional First Aid", speaker: "Guy Winch", id: "F2hc2FLOdhI" },
    { title: "The JOURNEY of RESILIENCE", speaker: "Simon Sinek", id: "5p31Y8r83Is" }
];

// ─── Free Books ───
const FREE_BOOKS = [
    { title: "Mind Over Mood", author: "Greenberger & Padesky", takeaways: ["Thoughts determine feelings.", "Use Thought Records."] },
    { title: "Feeling Good", author: "David Burns", takeaways: ["Defeat negative thinking.", "10 Cognitive Distortions."] },
    { title: "WHO Stress Guide", author: "World Health Org", takeaways: ["Grounding techniques.", "Unhooking from thoughts."] },
    { title: "Anxiety & Phobia", author: "Edmund Bourne", takeaways: ["Muscle relaxation.", "Gradual exposure."] },
    { title: "Atomic Habits", author: "James Clear", takeaways: ["1% better daily.", "Identity-based habits."] },
    { title: "Living Life to the Full", author: "Chris Williams", takeaways: ["Vicious cycle model.", "Break bad habits."] },
    { title: "Student Wellness", author: "Mental Health Fnd", takeaways: ["Social media impact.", "Daily routines."] },
    { title: "How to Do the Work", author: "Nicole LePera", takeaways: ["Identify your patterns.", "Reparent your inner self."] },
    { title: "Problem Management", author: "WHO Guide", takeaways: ["Action planning.", "Social support."] },
    { title: "SAM Resource", author: "UWE Bristol", takeaways: ["Anxiety self-monitoring.", "Self-help exercises."] }
];

const QUICK_TIPS = [
    "Drink water now. Dehydration worsens anxiety.",
    "Step outside for 5 mins. Sunlight boosts mood.",
    "Breathe: In for 4, out for 4. Right now.",
    "Put your phone face-down. Focus on the room.",
    "Forgive yourself for one thing today.",
];

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [expandedTool, setExpandedTool] = useState<number | null>(null);
    const [expandedBook, setExpandedBook] = useState<number | null>(null);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const filteredArticles = ARTICLES.filter((a) => {
        const matchesCat = activeCategory === "All" || a.category === activeCategory;
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-secondary/5 blur-[150px] rounded-full" />
            </div>

            <div className="space-y-12 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <BookOpen size={12} /> Resource Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90 leading-tight">
                        Wellness <span className="text-primary">Library</span> & Expansion
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Our expanded collection of mental health resources is designed for student life. Restore your peace, explore new insights, and build your resilience.
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <div className="space-y-6">
                    <div className="relative group max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        <input
                            type="text"
                            placeholder="Find articles, tools, or support guides..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card glass border border-primary/5 rounded-2xl py-5 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all shadow-premium"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${activeCategory === cat ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" : "bg-foreground/5 text-muted-foreground border-primary/10 hover:border-primary/30 hover:bg-card"}`}
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`bg-card glass rounded-[2rem] border border-primary/10 shadow-premium group overflow-hidden ${isExpanded ? "md:col-span-2 lg:col-span-3" : "hover:scale-[1.02] transition-transform"}`}
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <Icon size={24} />
                                            </div>
                                            <button onClick={() => setExpandedArticle(isExpanded ? null : index)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
                                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </div>
                                        <div className="mt-6 space-y-2">
                                            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{article.category} • {article.readTime}</p>
                                            <h3 className="text-xl font-bold text-foreground/90 group-hover:text-primary transition-colors">{article.title}</h3>
                                            <p className="text-sm text-muted-foreground font-medium line-clamp-2">{article.description}</p>
                                        </div>
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-8 pt-8 border-t border-primary/10 space-y-4">
                                                    {article.content.map((p, i) => <p key={i} className="text-sm text-foreground/70 leading-relaxed font-medium">{p}</p>)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Tools Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
                        <Sparkles className="text-primary" /> Self-Help Toolkit
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {SELF_HELP_TOOLS.map((tool, i) => (
                            <motion.div key={i} className="bg-card glass rounded-[2rem] border border-primary/10 shadow-premium overflow-hidden group">
                                <button onClick={() => setExpandedTool(expandedTool === i ? null : i)} className="w-full p-6 text-left flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform">
                                            <tool.icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground/90">{tool.title}</h4>
                                            <p className="text-[10px] font-semibold text-muted-foreground">{tool.description}</p>
                                        </div>
                                    </div>
                                    {expandedTool === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {expandedTool === i && (
                                    <div className="p-6 pt-0 border-t border-primary/5 space-y-3">
                                        {tool.steps.map((s, j) => (
                                            <div key={j} className="flex gap-3 text-xs font-medium text-foreground/70">
                                                <span className="text-primary font-bold">{j + 1}.</span>
                                                <p>{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Apps Grid */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
                        <Smartphone className="text-primary" /> Recommended Tools
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {RECOMMENDED_APPS.map((app, i) => (
                            <div key={i} className="bg-card glass rounded-[2rem] p-6 border border-primary/10 flex flex-col gap-4 group hover:scale-[1.02] transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <app.icon size={22} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">{app.tag}</span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-foreground/90">{app.name}</h4>
                                    <p className="text-xs text-muted-foreground font-medium">{app.desc}</p>
                                </div>
                                <button className="mt-2 h-10 w-full rounded-xl border border-primary/10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                    Explore <ArrowUpRight size={12} className="ml-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Videos Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
                        <Play className="text-primary" /> Watch & Learn
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {VIDEO_RESOURCES.map((v, i) => (
                            <div key={i} className="bg-card glass rounded-[2rem] overflow-hidden border border-primary/10 shadow-premium group">
                                <div className="relative aspect-video bg-muted/40 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(activeVideo === v.id ? null : v.id)}>
                                    {activeVideo === v.id ? (
                                        <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} className="absolute inset-0 w-full h-full" allowFullScreen />
                                    ) : (
                                        <>
                                            <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                <div className="h-12 w-12 rounded-full bg-primary/90 shadow-xl flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                                                    <Play size={24} fill="currentColor" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="p-6 space-y-1">
                                    <h4 className="font-bold text-sm text-foreground/90">{v.title}</h4>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{v.speaker}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Books Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-foreground/90 flex items-center gap-3">
                        <FileText className="text-primary" /> Free Books & Guides
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {FREE_BOOKS.map((book, i) => (
                            <div key={i} className="bg-card glass rounded-[2rem] border border-primary/10 p-6 flex flex-col gap-4 shadow-premium group">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                            <Download size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground/90">{book.title}</h4>
                                            <p className="text-xs text-muted-foreground font-medium">by {book.author}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setExpandedBook(expandedBook === i ? null : i)} className="text-primary hover:rotate-180 transition-transform">
                                        {expandedBook === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                </div>
                                {expandedBook === i && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t border-primary/5 space-y-4">
                                        <div className="grid gap-2">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Key Takeaways</p>
                                            {book.takeaways.map((t, j) => (
                                                <div key={j} className="flex gap-2 text-xs font-semibold text-foreground/70">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                                    <p>{t}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <Button className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/10">Access Full Guide</Button>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="text-center pt-8 space-y-4">
                    <p className="text-xs text-muted-foreground italic font-medium">"Wo nkoa wo nti me nsa yare3, 3y3 s3 wob3 bisa mmoa y3."</p>
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">MindBridge Wellness Librarian</div>
                </div>
            </div>
        </div>
    );
}
