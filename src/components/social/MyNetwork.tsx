"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Heart, 
    Users, 
    ArrowRight, 
    Loader2, 
    Award,
    MessageCircle,
    UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Encouragement {
    id: string;
    content: string;
    from: string;
    createdAt: string;
}

interface Mentor {
    id: string;
    displayName: string;
    program: string;
    university: string;
    wellnessLevel: number;
}

export function MyNetwork() {
    const [encouragements, setEncouragements] = useState<Encouragement[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [encData, mentorData] = await Promise.all([
                api.get('/social/encourage/my'),
                api.get('/social/mentors')
            ]);
            setEncouragements(encData);
            setMentors(mentorData);
        } catch (error) {
            console.error('Failed to fetch network data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Connecting your support lines...</p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Encouragements Hub */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Support Log</h3>
                    <h2 className="text-3xl font-black text-foreground tracking-tighter">Community Gratitude</h2>
                </div>

                <div className="space-y-6">
                    {encouragements.length === 0 ? (
                        <div className="glass rounded-[2.5rem] p-12 text-center space-y-4 border-dashed border-2 border-muted">
                            <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto text-muted-foreground/40">
                                <Heart size={32} />
                            </div>
                            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Your support signals are quiet. Try sharing a story!</p>
                        </div>
                    ) : (
                        encouragements.map((enc, i) => (
                            <motion.div
                                key={enc.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[2.5rem] border border-primary/10 hover:border-primary/30 transition-all group overflow-hidden relative"
                            >
                                <div className="absolute -left-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Heart size={120} className="text-primary fill-primary" />
                                </div>
                                <div className="relative z-10 flex gap-6 items-start">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <Heart size={24} className="fill-primary/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Received Support</span>
                                            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{new Date(enc.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-lg font-black text-foreground tracking-tight leading-snug">
                                            "{enc.content}"
                                        </p>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">— {enc.from}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Right: Mentor Matcher */}
            <div className="space-y-8">
                <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Mentorship</h3>
                    <h2 className="text-xl font-black text-foreground tracking-tight">Peer Guides</h2>
                </div>

                <div className="space-y-4">
                    {mentors.map((mentor, i) => (
                        <motion.div
                            key={mentor.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-6 rounded-[2rem] border border-white/10 hover:bg-white/40 transition-all space-y-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-foreground font-black">
                                    {mentor.displayName[0]}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{mentor.displayName}</h4>
                                    <p className="text-[10px] font-bold text-muted-foreground truncate max-w-[150px] uppercase tracking-wide">{mentor.program}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-1.5">
                                    <Award size={14} className="text-amber-500" />
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">Lvl {mentor.wellnessLevel} Pioneer</span>
                                </div>
                                <Button 
                                    size="sm" 
                                    className="h-9 px-4 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest"
                                    onClick={async () => {
                                        try {
                                            await api.post('/social/mentor/request', { mentorId: mentor.id, topic: 'OTHER' });
                                            alert('Request sent! Your peer guide will reach out soon.');
                                        } catch (err) {
                                            console.error('Failed to request mentor:', err);
                                        }
                                    }}
                                >
                                    Connect
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 space-y-4">
                        <div className="flex items-center gap-2">
                            <UserPlus size={16} className="text-primary" />
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Become a Guide</h4>
                        </div>
                        <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">Reach Level 5 and 20 mood log streak to guide others in your department.</p>
                        <Button variant="outline" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5">View Requirements</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
