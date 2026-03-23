"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    MessageCircle, 
    ChevronRight, 
    Loader2,
    PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Circle {
    id: string;
    name: string;
    description: string;
    category: string;
    _count: {
        members: number;
        posts: number;
    };
}

export function SupportCircles() {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCircles = async () => {
            try {
                const data = await api.get('/social/circles');
                setCircles(data);
            } catch (error) {
                console.error('Failed to fetch circles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCircles();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Gathering Communities...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Featured Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {circles.map((circle, i) => (
                    <motion.div
                        key={circle.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group glass rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 border border-border/40 transition-all flex flex-col justify-between min-h-[250px] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users size={120} />
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Users size={24} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-[10px] font-black uppercase tracking-tight">
                                        <Users size={12} className="text-primary" />
                                        {circle._count.members} Members
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-[10px] font-black uppercase tracking-tight">
                                        <MessageCircle size={12} className="text-primary" />
                                        {circle._count.posts} Posts
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{circle.name}</h3>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-2 uppercase tracking-tight">
                                    {circle.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6 relative z-10">
                            <Button className="flex-1 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-xs font-black uppercase tracking-[0.2em]">
                                Enter Circle
                            </Button>
                            <Button variant="outline" className="h-12 w-12 rounded-2xl border-border/40 hover:bg-primary/5 hover:border-primary/30 p-0">
                                <PlusCircle size={20} className="text-muted-foreground" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Discovery Section */}
            <div className="pt-8 border-t border-border/40">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Discovery</h4>
                        <p className="text-2xl font-black text-foreground tracking-tighter">Explore Niche Groups</p>
                    </div>
                    <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                        View All <ChevronRight size={14} className="ml-1" />
                    </Button>
                </div>

                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-1">
                    {['Exam Anxiety', 'Study Group 101', 'Thesis Support', 'Meditation Club', 'Late Night Reflection'].map((name, i) => (
                        <div 
                            key={i}
                            className="flex-shrink-0 w-64 glass rounded-[2rem] p-6 space-y-4 hover:border-primary/30 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "h-8 w-8 rounded-xl flex items-center justify-center text-white",
                                    i % 2 === 0 ? "bg-amber-400" : "bg-blue-400"
                                )}>
                                    <Users size={16} />
                                </span>
                                <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40 group-hover:opacity-100 transition-opacity">NEW</span>
                            </div>
                            <p className="text-lg font-black text-foreground tracking-tight leading-tight">{name}</p>
                            <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
