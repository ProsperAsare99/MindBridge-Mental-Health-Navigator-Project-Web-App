"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    UserPlus, 
    CheckCircle2, 
    MessageSquare, 
    Loader2,
    ShieldCheck,
    Star,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

export function MyNetwork() {
    const [encouragements, setEncouragements] = useState<any[]>([]);
    const [mentors, setMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNetwork = async () => {
            try {
                const [encouragementData, mentorData] = await Promise.all([
                    api.get('/social/encourage/my'),
                    api.get('/social/mentors')
                ]);
                setEncouragements(encouragementData);
                setMentors(mentorData);
            } catch (error) {
                console.error('Failed to fetch network:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNetwork();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Connecting your support web...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Encouragement Wall */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Peer Recognition</h4>
                        <p className="text-2xl font-black text-foreground tracking-tighter">Your Encouragement Wall</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {encouragements.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-[2rem] p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group hover:bg-white hover:shadow-xl transition-all"
                        >
                            <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-125 transition-transform">
                                <Heart size={80} className="text-primary" />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Heart size={20} />
                                </div>
                                <p className="text-sm font-bold italic text-foreground leading-relaxed pt-2">
                                    "{item.content}"
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{item.from}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mentor Section */}
            <section className="space-y-8 pt-12 border-t border-border/40">
                <div className="glass rounded-[3rem] p-10 md:p-16 border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent flex flex-col items-center text-center gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,119,182,0.03),transparent)] pointer-events-none" />
                    
                    <div className="h-20 w-20 rounded-[2rem] bg-white border border-border/40 flex items-center justify-center shadow-xl shadow-primary/5 text-primary">
                        <Star size={32} />
                    </div>

                    <div className="max-w-xl space-y-4 relative z-10">
                        <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">Peer Mentorship</h3>
                        <p className="text-base text-muted-foreground font-medium leading-relaxed uppercase tracking-tight">
                            Connect with students who have walked your path. Whether it's navigating first year or overcoming academic hurdles, you don't have to do it alone.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <Button className="h-14 px-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                            <UserPlus size={18} className="mr-2" /> Find a Peer Mentor
                        </Button>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-border/40 text-xs font-black uppercase tracking-widest hover:bg-primary/5 transition-all">
                            Learn How it Works
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 pt-8 opacity-40">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Safe & Moderated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Verified Students Only</span>
                        </div>
                    </div>
                </div>

                {/* Real Mentor Feed */}
                {mentors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {mentors.map((mentor, i) => (
                            <motion.div 
                                key={mentor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-[2rem] p-8 border border-border/40 group hover:border-primary/40 hover:bg-white hover:shadow-2xl transition-all cursor-pointer"
                                onClick={async () => {
                                    try {
                                        await api.post('/social/mentor/request', {
                                            mentorId: mentor.id,
                                            topic: 'ACADEMIC_STRESS' // Default topic or we could show a dialog
                                        });
                                        alert(`Request sent to ${mentor.displayName}!`);
                                    } catch (err) {
                                        console.error('Failed to request mentor:', err);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black uppercase shadow-inner">
                                        {mentor.displayName[0]}
                                    </div>
                                    <div className="space-y-0.5 text-left">
                                        <div className="text-sm font-black text-foreground uppercase tracking-tight">{mentor.displayName}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{mentor.program}</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Level {mentor.wellnessLevel} Guide</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed uppercase tracking-tight">
                                        Expert at navigating {mentor.university} and managing student well-being.
                                    </p>
                                </div>
                                <div className="pt-6 flex justify-end">
                                    <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="glass rounded-[2rem] p-8 border border-border/40 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-muted animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-24 bg-muted animate-pulse rounded-full" />
                                        <div className="h-2 w-16 bg-muted animate-pulse rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-muted animate-pulse rounded-full" />
                                    <div className="h-2 w-full bg-muted animate-pulse rounded-full" />
                                    <div className="h-2 w-2/3 bg-muted animate-pulse rounded-full" />
                                </div>
                                <div className="pt-6 flex justify-end">
                                    <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
