"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Send, 
    Users, 
    Heart, 
    MessageCircle,
    Shield,
    Loader2,
    AlertTriangle,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Post {
    id: string;
    content: string;
    isAnonymous: boolean;
    createdAt: string;
    author: {
        displayName: string;
        image?: string;
    };
    _count: {
        encouragements: number;
    };
}

interface CircleDialogProps {
    circleId: string;
    circleName: string;
    isOpen: boolean;
    onClose: () => void;
}

export function CircleDialog({ circleId, circleName, isOpen, onClose }: CircleDialogProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSafetyWarning, setShowSafetyWarning] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchPosts();
        }
    }, [isOpen, circleId]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await api.get(`/social/circles/${circleId}/posts`);
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch circle posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async () => {
        if (!newPost.trim() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await api.post(`/social/circles/${circleId}/posts`, {
                content: newPost,
                isAnonymous: true
            });
            
            if (res.crisisFlag) {
                setShowSafetyWarning(true);
                setNewPost('');
            } else {
                setNewPost('');
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to create post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] glass rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Users size={24} />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-black text-foreground tracking-tighter">{circleName}</h2>
                                    <div className="flex items-center gap-2">
                                        <Shield size={12} className="text-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Moderated Peer Feed</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" onClick={onClose} className="h-12 w-12 rounded-2xl hover:bg-white/10 transition-colors">
                                <X size={24} />
                            </Button>
                        </div>

                        {/* Feed */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-muted/5 relative">
                            {/* Safety Warning Overlay */}
                            <AnimatePresence>
                                {showSafetyWarning && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 z-[110] p-8 flex items-center justify-center bg-background/80 backdrop-blur-xl"
                                    >
                                        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] border-2 border-amber-500/30 text-center space-y-6 shadow-2xl">
                                            <div className="h-20 w-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500">
                                                <ShieldAlert size={40} />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-foreground tracking-tight">Sharing with Care</h3>
                                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                                    We noticed your message contains some concerning themes. To keep our community safe, this post has been flagged for peer-moderation. 
                                                </p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-xs font-bold text-primary italic">
                                                Remember, you're not alone. Our 24/7 Crisis Support team is just a tap away in the menu.
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <Button className="w-full rounded-2xl bg-primary text-[10px] font-black uppercase tracking-widest h-12">Talk to Someone Now</Button>
                                                <Button variant="ghost" onClick={() => setShowSafetyWarning(false)} className="w-full text-[10px] font-black uppercase tracking-widest h-12 text-muted-foreground">Continue to Circle</Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Opening the circle...</p>
                                </div>
                            ) : posts.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-40">
                                    <MessageCircle size={48} className="text-muted-foreground" />
                                    <p className="text-sm font-black uppercase tracking-widest">No messages yet. Be the first to share.</p>
                                </div>
                            ) : (
                                posts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="glass p-6 rounded-[2rem] border border-white/10 space-y-4 hover:bg-white/40 transition-all hover:translate-x-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-xl bg-muted border border-white/20 flex items-center justify-center text-foreground text-xs font-black">
                                                    {post.author.displayName[0]}
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-tight text-foreground">{post.author.displayName}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase">{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-sm font-medium text-foreground/80 leading-relaxed uppercase tracking-tight">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors">
                                                <Heart size={12} /> {post._count.encouragements} Hugs
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )
                            }
                        </div>

                        {/* Input */}
                        <div className="p-8 border-t border-white/10 bg-white/40 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <input 
                                    type="text" 
                                    placeholder={`Type a supportive message in ${circleName}...`}
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                                    className="flex-1 bg-white border border-white/20 rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                                />
                                <Button 
                                    onClick={handlePost}
                                    disabled={!newPost.trim() || isSubmitting}
                                    className="h-14 w-14 rounded-[1.5rem] bg-primary text-white shadow-xl shadow-primary/20 flex items-center justify-center group disabled:opacity-50"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </Button>
                            </div>
                            <p className="text-[8px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mt-4 text-center">
                                Your message will be posted anonymously by default for community safety.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
