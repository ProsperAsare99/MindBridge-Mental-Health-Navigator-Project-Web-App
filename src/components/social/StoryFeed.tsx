"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    MessageSquare, 
    Share2, 
    Plus,
    Loader2,
    CheckCircle2,
    Shield,
    Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Story {
    id: string;
    title: string;
    content: string;
    category: string;
    author: {
        displayName: string;
        image?: string;
    };
    createdAt: string;
}

export function StoryFeed() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);
    const [newStory, setNewStory] = useState({ title: '', content: '', category: 'ANXIETY' });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const data = await api.get('/social/stories');
            setStories(data);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!newStory.title || !newStory.content) return;
        setLoading(true);
        try {
            await api.post('/social/stories', newStory);
            setSuccess(true);
            setNewStory({ title: '', content: '', category: 'ANXIETY' });
            setTimeout(() => {
                setSuccess(false);
                setIsSharing(false);
                fetchStories();
            }, 2000);
        } catch (error) {
            console.error('Failed to share story:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && stories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Reading the heart of the community...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            {/* Share CTA */}
            <div className="glass rounded-[2.5rem] p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute -left-4 -top-4 opacity-5 pointer-events-none">
                    <Quote size={120} className="text-primary" />
                </div>
                <div className="space-y-1 relative z-10 text-center md:text-left">
                    <h3 className="text-2xl font-black text-foreground tracking-tighter">Have a breakthrough to share?</h3>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Your story could be someone else's survival guide.</p>
                </div>
                <Button 
                    onClick={() => setIsSharing(true)}
                    className="h-14 px-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest relative z-10 hover:scale-105 transition-transform"
                >
                    <Plus size={20} className="mr-2" /> Share Anonymously
                </Button>
            </div>

            {/* Sharing Form Modal (Inline Overlay for now) */}
            <AnimatePresence>
                {isSharing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass rounded-[2.5rem] p-8 border border-primary/40 space-y-6 relative overflow-hidden"
                    >
                        {success ? (
                            <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                                <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl font-black text-foreground tracking-tight">Story Sent to Moderation</p>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">It will appear in the feed shortly.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black text-foreground tracking-tighter uppercase">Write Your Story</h4>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                                        <Shield size={12} className="text-muted-foreground" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Moderated Post</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="Headline (e.g. How I overcame exam anxiety)"
                                        value={newStory.title}
                                        onChange={(e) => setNewStory(s => ({ ...s, title: e.target.value }))}
                                        className="w-full bg-muted/30 border border-border/40 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                    <textarea 
                                        placeholder="Tell your story anonymously..."
                                        value={newStory.content}
                                        onChange={(e) => setNewStory(s => ({ ...s, content: e.target.value }))}
                                        className="w-full bg-muted/30 border border-border/40 rounded-2xl p-6 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all min-h-[200px] resize-none"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" onClick={() => setIsSharing(false)} className="flex-1 h-12 rounded-2xl text-xs font-black uppercase tracking-widest">Cancel</Button>
                                    <Button onClick={handleShare} className="flex-1 h-12 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest">Publish Anonymously</Button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Story List */}
            <div className="space-y-8">
                {stories.length === 0 && !isSharing && (
                    <div className="text-center py-20 space-y-4">
                        <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground opacity-20">
                            <Quote size={32} />
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">The community is waiting for its first story.</p>
                    </div>
                )}
                {stories.map((story, i) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group glass rounded-[2.5rem] overflow-hidden border border-border/40 hover:border-primary/30 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                    >
                        <div className="p-8 space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{story.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground tracking-tighter leading-tight group-hover:text-primary transition-colors cursor-pointer">{story.title}</h3>
                                </div>
                                <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                                    <Share2 size={18} />
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-1 opacity-20">
                                    <Quote size={40} className="text-primary" />
                                </div>
                                <p className="text-base font-medium text-foreground/80 leading-relaxed pl-8">
                                    {story.content}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-border/40 font-black uppercase text-[10px] tracking-widest">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all">
                                        <Heart size={14} /> <span>Encourage</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                                        <MessageSquare size={14} /> <span>Discuss</span>
                                    </button>
                                </div>
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">By Anonymous Peer • {new Date(story.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
