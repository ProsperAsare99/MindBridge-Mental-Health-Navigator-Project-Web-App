"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { 
    History, 
    Filter, 
    Search, 
    Calendar,
    Smile,
    MessageSquare,
    ClipboardList,
    Award,
    Zap,
    Mic,
    Image as ImageIcon,
    ChevronRight,
    ArrowUpRight,
    Loader2,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActivityItem {
    id: string;
    type: 'mood' | 'assessment' | 'achievement' | 'challenge' | 'resource';
    title: string;
    description?: string;
    value?: number;
    sentiment?: string;
    notes?: string;
    score?: number;
    severity?: string;
    icon?: string;
    hasAudio?: boolean;
    hasPhoto?: boolean;
    timestamp: string;
}

export default function ActivityPage() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchActivityFeed();
    }, []);

    const fetchActivityFeed = async () => {
        setLoading(true);
        try {
            const data = await api.get('/analytics/activity-feed');
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activity feed:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredActivities = activities.filter(a => {
        const matchesFilter = filter === "all" || a.type === filter;
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (a.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (a.notes?.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const getActivityIcon = (type: string, iconName?: string) => {
        switch(type) {
            case 'mood': return <Smile className="text-primary" size={20} />;
            case 'assessment': return <ClipboardList className="text-amber-500" size={20} />;
            case 'achievement': return <Award className="text-secondary" size={20} />;
            case 'challenge': return <Zap className="text-emerald-500" size={20} />;
            case 'resource': return <BookOpen className="text-primary" size={20} />;
            default: return <History className="text-muted-foreground" size={20} />;
        }
    };

    const getActivityColor = (type: string) => {
        switch(type) {
            case 'mood': return 'bg-primary/10 border-primary/20';
            case 'assessment': return 'bg-amber-500/10 border-amber-500/20';
            case 'achievement': return 'bg-secondary/10 border-secondary/20';
            case 'challenge': return 'bg-emerald-500/10 border-emerald-500/20';
            case 'resource': return 'bg-primary/5 border-primary/10';
            default: return 'bg-muted border-border';
        }
    };

    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <History size={12} /> Journey Logs
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        Unified <span className="text-primary">Journal</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Every check-in, assessment, and milestone in one place. Your progressive timeline of resilience and growth.
                    </p>
                </motion.div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-[2rem] border border-border shadow-premium">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide gap-2">
                        {["all", "mood", "assessment", "achievement", "challenge", "resource"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                                    filter === f 
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                                        : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search history..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/30 border border-border rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                {/* Timeline Feed */}
                <div className="relative space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="h-10 w-10 text-primary animate-spin" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Synthesizing Timeline...</p>
                        </div>
                    ) : filteredActivities.length === 0 ? (
                        <div className="glass rounded-[3rem] p-20 text-center space-y-4 border border-dashed border-border">
                            <div className="h-16 w-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto text-muted-foreground/30">
                                <History size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold">No Records Found</h3>
                                <p className="text-xs text-muted-foreground font-medium">Try adjusting your filters or search keywords.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredActivities.map((activity, idx) => {
                                const date = new Date(activity.timestamp);
                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className={cn(
                                            "glass p-6 rounded-[2rem] border transition-all hover:scale-[1.01] hover:shadow-xl group cursor-pointer",
                                            getActivityColor(activity.type)
                                        )}
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className="h-12 w-12 rounded-2xl bg-white/50 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm group-hover:scale-110 transition-transform">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <div>
                                                        <h3 className="text-lg font-black text-foreground tracking-tight">
                                                            {activity.title}
                                                        </h3>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5 mt-0.5">
                                                            <Calendar size={10} />
                                                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    {activity.type === 'mood' && activity.sentiment && (
                                                        <span className="self-start px-3 py-1 rounded-full bg-white/40 text-[9px] font-black uppercase tracking-widest text-primary border border-white/20">
                                                            {activity.sentiment}
                                                        </span>
                                                    )}
                                                    {activity.type === 'assessment' && (
                                                        <div className="text-right">
                                                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-0.5">Severity</p>
                                                            <p className="text-xs font-black text-amber-600">{activity.severity}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    {activity.notes && (
                                                        <p className="text-sm font-medium text-foreground/70 leading-relaxed italic line-clamp-2 pl-4 border-l-2 border-primary/20">
                                                            "{activity.notes}"
                                                        </p>
                                                    )}
                                                    {activity.description && (
                                                        <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                                            {activity.description}
                                                        </p>
                                                    )}
                                                    
                                                    <div className="flex flex-wrap gap-4 pt-1">
                                                        {activity.hasAudio && (
                                                            <div className="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-widest bg-white/30 px-2 py-1 rounded-lg">
                                                                <Mic size={12} /> Audio Memo
                                                            </div>
                                                        )}
                                                        {activity.hasPhoto && (
                                                            <div className="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-widest bg-white/30 px-2 py-1 rounded-lg">
                                                                <ImageIcon size={12} /> Photo Record
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all transform hover:translate-x-1">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Integration Banner */}
                <div className="glass p-8 rounded-[3rem] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-border mt-10 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                        <History size={240} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="h-20 w-20 rounded-[2rem] bg-background border border-border flex items-center justify-center text-primary shadow-2xl">
                            <Zap size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h2 className="text-2xl font-black text-foreground tracking-tight">Need deeper analysis?</h2>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                Our clinical insight engine processes your history to find hidden patterns in your wellness trajectory.
                            </p>
                        </div>
                        <Link href="/dashboard/mood">
                            <Button className="rounded-2xl h-14 px-8 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-primary/20">
                                View Full Insights <ArrowUpRight className="ml-2" size={16} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
