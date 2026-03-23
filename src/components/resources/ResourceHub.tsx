"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Search,
    BookOpen,
    ChevronDown,
    ChevronUp,
    Play,
    Smartphone,
    Download,
    FileText,
    Check,
    ArrowUpRight,
    SearchX,
    Brain,
    Activity,
    GraduationCap,
    Lightbulb,
    Moon,
    Users,
    Leaf,
    Dumbbell,
    Heart,
    Wind,
    Repeat,
    Timer,
    PenLine,
    Smile,
    MessageSquare,
    Target,
    Stethoscope,
    ShieldCheck
} from "lucide-react";

const IconMap: Record<string, any> = {
    Brain, Activity, GraduationCap, Lightbulb, Moon, Users, Leaf, Dumbbell, Heart,
    Wind, Repeat, Timer, PenLine, Smile, MessageSquare, Target, Stethoscope, ShieldCheck
};

interface ResourceHubProps {
    articles: any[];
    categories: string[] | any;
    selfHelpTools: any[];
    recommendedApps: any[];
    videoResources: any[];
    freeBooks: any[];
}

export function ResourceHub({
    articles,
    categories,
    selfHelpTools,
    recommendedApps,
    videoResources,
    freeBooks
}: ResourceHubProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [expandedTool, setExpandedTool] = useState<number | null>(null);
    const [expandedBook, setExpandedBook] = useState<number | null>(null);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [resourceStatus, setResourceStatus] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchIconClick = () => {
        searchInputRef.current?.focus();
    };

    const handleAccessResource = (title: string, author: string, url?: string) => {
        setResourceStatus(`Accessing "${title}"...`);
        const searchUrl = url || `https://www.google.com/search?q=${encodeURIComponent(`${title} ${author} book pdf free`)}`;

        setTimeout(() => {
            setResourceStatus(`"${title}" is ready! Opening in a new tab...`);
            window.open(searchUrl, '_blank');
            setTimeout(() => setResourceStatus(null), 3000);
        }, 1500);
    };

    const filteredArticles = articles.filter((a) => {
        const matchesCat = activeCategory === "All" || a.category === activeCategory;
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className="space-y-12">
            {/* Search & Filter */}
            <div className="space-y-6">
                <div className="relative group max-w-2xl">
                    <button 
                        type="button"
                        onClick={handleSearchIconClick}
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10"
                    >
                        <Search className="h-full w-full" />
                    </button>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Find articles, tools, or support guides..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card/40 glass border border-border rounded-2xl py-5 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all shadow-premium text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat: string) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${activeCategory === cat
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                : "bg-muted/50 text-muted-foreground border-border hover:border-primary/30 hover:bg-muted/80"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article, index) => {
                            const Icon = IconMap[article.icon] || BookOpen;
                            const isExpanded = expandedArticle === index;
                            return (
                                <motion.div
                                    key={article.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`glass rounded-[2rem] shadow-premium group overflow-hidden ${isExpanded ? "md:col-span-2 lg:col-span-3" : "hover:scale-[1.02] transition-transform"}`}
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
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                                            <p className="text-sm text-muted-foreground font-medium line-clamp-2">{article.description}</p>
                                        </div>
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-8 pt-8 border-t border-primary/10 space-y-4">
                                                    {article.content.map((p: string, i: number) => <p key={i} className="text-sm text-foreground/70 leading-relaxed font-medium">{p}</p>)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 glass rounded-[2rem] border border-dashed border-primary/20"
                        >
                            <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                                <SearchX size={40} />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-foreground/80">No matches found</h3>
                                <p className="text-sm text-muted-foreground max-w-xs mx-auto">We couldn't find any articles matching "{searchQuery}". Try a different keyword.</p>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSearchQuery("")}
                                className="rounded-xl font-bold"
                            >
                                Clear Search
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Tools Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <ShieldCheck className="text-primary" /> Self-Help Toolkit
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {selfHelpTools.map((tool, i) => {
                        const ToolIcon = IconMap[tool.icon] || BookOpen;
                        return (
                            <motion.div key={i} className="bg-card glass rounded-[2rem] border border-primary/10 shadow-premium overflow-hidden group">
                                <button onClick={() => setExpandedTool(expandedTool === i ? null : i)} className="w-full p-6 text-left flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform">
                                            <ToolIcon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground">{tool.title}</h4>
                                            <p className="text-[10px] font-semibold text-muted-foreground">{tool.description}</p>
                                        </div>
                                    </div>
                                    {expandedTool === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {expandedTool === i && (
                                    <div className="p-6 pt-0 border-t border-primary/5 space-y-3">
                                        {tool.steps.map((s: string, j: number) => (
                                            <div key={j} className="flex gap-3 text-xs font-medium text-foreground/70">
                                                <span className="text-primary font-bold">{j + 1}.</span>
                                                <p>{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Apps Grid */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <Smartphone className="text-primary" /> Recommended Tools
                </h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendedApps.map((app, i) => {
                        const AppIcon = IconMap[app.icon] || Smartphone;
                        return (
                            <a
                                key={i}
                                href={app.url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-card glass rounded-[2rem] p-6 border border-primary/10 flex flex-col gap-4 group hover:scale-[1.02] hover:border-primary/30 transition-all shadow-premium active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <AppIcon size={22} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">{app.tag}</span>
                                </div>
                                <div className="space-y-1 flex-1">
                                    <h4 className="font-bold text-foreground flex items-center justify-between">
                                        {app.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{app.desc}</p>
                                </div>
                                <div className="pt-2 flex items-center gap-1 text-[9px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                    Open Tool <ArrowUpRight size={10} />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Videos Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <Play className="text-primary" /> Watch & Learn
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {videoResources.map((v, i) => (
                        <div key={i} className="bg-card glass rounded-[2rem] overflow-hidden border border-primary/10 shadow-premium group">
                            <div className="relative aspect-video bg-muted/40 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(activeVideo === v.id ? null : v.id)}>
                                {activeVideo === v.id ? (
                                    <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} className="absolute inset-0 w-full h-full" allowFullScreen />
                                ) : (
                                    <>
                                        <Image 
                                          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} 
                                          alt={v.title} 
                                          fill 
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" 
                                          loading="lazy"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                            <div className="h-12 w-12 rounded-full bg-primary/90 shadow-xl flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                                                <Play size={24} fill="currentColor" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="p-6 space-y-1">
                                <h4 className="font-bold text-sm text-foreground">{v.title}</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{v.speaker}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Books Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <FileText className="text-primary" /> Free Books & Guides
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {freeBooks.map((book, i) => (
                        <div key={i} className="bg-card glass rounded-[2rem] border border-primary/10 p-6 flex flex-col gap-4 shadow-premium group">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                        <Download size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{book.title}</h4>
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
                                        {book.takeaways.map((t: string, j: number) => (
                                            <div key={j} className="flex gap-2 text-xs font-semibold text-foreground/70">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                                                <p>{t}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleAccessResource(book.title, book.author)}
                                        className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground"
                                    >
                                        Access Full Guide
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Notification */}
            <AnimatePresence>
                {resourceStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 border border-white/20"
                    >
                        <Activity className="h-4 w-4 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">{resourceStatus}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
