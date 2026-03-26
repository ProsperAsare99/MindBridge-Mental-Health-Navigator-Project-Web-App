"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Calendar, 
    Clock, 
    MessageSquare, 
    Mic, 
    Image as ImageIcon,
    Smile,
    CloudRain,
    Frown,
    Meh,
    Sun,
    Trash2,
    Maximize2,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface MoodEntry {
    id: string;
    mood: number;
    notes?: string;
    audioUrl?: string;
    photoUrl?: string;
    emotion?: string;
    sentimentLabel?: string;
    createdAt: string;
}

interface MoodTimelineProps {
    entries: MoodEntry[];
    onRefresh?: () => void;
}

const MOOD_META = [
    { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
    { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
    { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
    { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
];

export function MoodTimeline({ entries, onRefresh }: MoodTimelineProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDeleteEntry = async (id: string) => {
        if (!confirm("Are you sure you want to delete this journal entry forever?")) return;
        setDeletingId(id);
        try {
            await api.delete(`/moods/${id}`);
            onRefresh?.();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete entry. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteMedia = async (entryId: string, type: 'photo' | 'audio') => {
        if (!confirm(`Remove this ${type} from your entry?`)) return;
        try {
            await api.delete(`/moods/${entryId}/media/${type}`);
            onRefresh?.();
        } catch (error) {
            console.error("Media delete error:", error);
            alert("Failed to remove media.");
        }
    };

    if (!entries || entries.length === 0) {
        return (
            <div className="text-center py-20 glass rounded-[2.5rem] border border-dashed border-border/50">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No journal entries found</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Journal Timeline
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Showing {entries.length} Reflections
                </span>
            </div>

            <div className="relative space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/20 via-border to-transparent hidden md:block" />

                {entries.map((entry, idx) => {
                    const moodMeta = MOOD_META.find(m => m.value === entry.mood) || MOOD_META[3];
                    const MoodIcon = moodMeta.icon;
                    const date = new Date(entry.createdAt);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.split('/api')[0] || 'http://localhost:5000';
                    const audioSrc = entry.audioUrl ? (entry.audioUrl.startsWith('http') ? entry.audioUrl : `${baseUrl}${entry.audioUrl}`) : null;
                    const photoSrc = entry.photoUrl ? (entry.photoUrl.startsWith('http') ? entry.photoUrl : `${baseUrl}${entry.photoUrl}`) : null;

                    return (
                        <motion.div 
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={cn(
                                "relative md:pl-16 group transition-opacity",
                                deletingId === entry.id && "opacity-50"
                            )}
                        >
                            {/* Timeline Point */}
                            <div className="absolute left-[22px] top-6 h-3 w-3 rounded-full bg-background border-2 border-primary ring-4 ring-primary/10 z-10 hidden md:block group-hover:scale-125 transition-transform" />

                            <div className="glass rounded-[2.5rem] p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all shadow-premium group/card relative">
                                {/* Delete Action */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteEntry(entry.id)}
                                    className="absolute top-4 right-4 opacity-0 group/card-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl h-8 w-8"
                                >
                                    <Trash2 size={16} />
                                </Button>

                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left: Metadata */}
                                    <div className="md:w-32 shrink-0 space-y-4">
                                        <div className={cn("inline-flex flex-col items-center gap-2 p-3 rounded-2xl w-full", moodMeta.bgColor)}>
                                            <MoodIcon size={24} className={moodMeta.color} />
                                            <span className={cn("text-[9px] font-black uppercase tracking-widest text-center", moodMeta.color)}>
                                                {moodMeta.label}
                                            </span>
                                        </div>
                                        <div className="space-y-1 px-1">
                                            <p className="text-[10px] font-black text-foreground">{formattedDate}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                                <Clock size={10} /> {formattedTime}
                                            </p>
                                        </div>
                                        {entry.emotion && (
                                            <div className="px-1 flex flex-wrap gap-1">
                                                <span className="px-2 py-0.5 rounded-full bg-primary/5 text-[8px] font-black uppercase tracking-widest text-primary/70 border border-primary/10">
                                                    {entry.emotion}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1 space-y-6">
                                        {/* Notes */}
                                        {entry.notes && (
                                            <div className="relative">
                                                <MessageSquare className="absolute -left-1 -top-1 h-3 w-3 text-primary/20" />
                                                <p className="text-sm md:text-base font-medium leading-relaxed text-foreground/90 italic pl-4 border-l-2 border-primary/10">
                                                    "{entry.notes}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Media Row */}
                                        <div className="flex flex-wrap gap-4">
                                            {/* Audio Player */}
                                            {audioSrc && (
                                                <div className="flex-1 min-w-[240px] p-4 rounded-3xl bg-muted/30 border border-border/40 flex items-center gap-4 group/audio relative">
                                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover/audio:scale-105 transition-transform">
                                                        <Mic size={18} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Voice Reflection</p>
                                                        <audio 
                                                            controls 
                                                            className="h-8 w-full accent-primary focus:outline-none"
                                                            style={{ height: '32px' }}
                                                        >
                                                            <source src={audioSrc} />
                                                            Your browser does not support audio.
                                                        </audio>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteMedia(entry.id, 'audio')}
                                                        className="h-6 w-6 rounded-lg opacity-0 group/audio-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 p-0"
                                                    >
                                                        <X size={14} />
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Photo */}
                                            {photoSrc && (
                                                <div className="relative rounded-[2rem] overflow-hidden border border-border/40 group/photo max-w-[280px] shadow-lg">
                                                    <img 
                                                        src={photoSrc} 
                                                        alt="Mood moment" 
                                                        className="h-48 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                                                        onClick={() => setSelectedImage(photoSrc)}
                                                    />
                                                    <div className="absolute top-3 right-3 flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="secondary"
                                                            className="h-8 w-8 rounded-xl bg-black/40 backdrop-blur-md text-white border-0 hover:bg-black/60 opacity-0 group/photo-hover:opacity-100 transition-opacity"
                                                            onClick={(e) => { e.stopPropagation(); setSelectedImage(photoSrc); }}
                                                        >
                                                            <Maximize2 size={14} />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-8 w-8 rounded-xl bg-red-500/80 backdrop-blur-md text-white border-0 hover:bg-red-600 opacity-0 group/photo-hover:opacity-100 transition-opacity"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteMedia(entry.id, 'photo'); }}
                                                        >
                                                            <X size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Image Detail Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-6 right-6 text-foreground/50 hover:text-foreground hover:bg-muted rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </Button>
                        <motion.img 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            src={selectedImage}
                            alt="Mood Detail"
                            className="max-h-full max-w-full object-contain rounded-3xl shadow-2xl border border-border animate-premium-glow"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
