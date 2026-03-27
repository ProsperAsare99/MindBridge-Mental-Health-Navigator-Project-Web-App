'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Star, 
  Wind, 
  BookOpen, 
  PhoneCall, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
    id: string;
    type: 'circle' | 'challenge' | 'resource' | 'action';
    title: string;
    description: string;
    icon: string;
    link?: string;
    metadata?: any;
}

const iconMap: Record<string, any> = {
  Users: Users,
  Star: Star,
  Wind: Wind,
  BookOpen: BookOpen,
  PhoneCall: PhoneCall
};

interface RecommendationResult {
    recommendations: Recommendation[];
    feedback?: {
        tier: string;
        message: string;
        description: string;
    };
}

export const PersonalizedRecommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [feedback, setFeedback] = useState<RecommendationResult['feedback'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const data = await api.get<RecommendationResult>('/analytics/recommendations');
                if (data.recommendations) {
                    setRecommendations(data.recommendations);
                } else if (Array.isArray(data)) {
                    // Fallback for old API format if still active
                    setRecommendations(data);
                }
                if (data.feedback) {
                    setFeedback(data.feedback);
                }
            } catch (error) {
                console.error('Failed to fetch recommendations', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecs();
    }, []);

    if (loading) return null;
    if (recommendations.length === 0 && !feedback) return null;

    const isReminding = feedback && (feedback.tier === 'COPING' || feedback.message.includes('haven’t checked in'));

    return (
        <section className="py-6 space-y-6">
            {/* Proactive Behavioral Nudge */}
            <AnimatePresence>
                {feedback && isReminding && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border-2 border-primary/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-premium mb-10 relative overflow-hidden group"
                    >
                        {/* Soft ambient background tint inside the card */}
                        <div className="absolute inset-0 bg-primary/5 -z-10 group-hover:bg-primary/10 transition-colors" />
                        
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Sparkles size={32} />
                        </div>
                        <div className="space-y-1 text-center md:text-left flex-1">
                            <h3 className="text-xl font-black text-foreground tracking-tight">{feedback.message}</h3>
                            <p className="text-base text-foreground/90 font-semibold leading-relaxed">{feedback.description}</p>
                        </div>
                        <Button 
                            className="rounded-2xl px-10 h-14 text-base font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            onClick={() => window.location.href = '/dashboard/mood'}
                        >
                            Daily Check-in
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Suggested for You</h2>
                </div>
                <Badge variant="outline" className="text-[10px] font-bold border-border bg-muted/50 text-foreground/60 uppercase tracking-widest">
                    Based on your journey
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendations.map((rec, index) => {
                    const Icon = iconMap[rec.icon] || iconMap['Star'];
                    
                    return (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-card p-5 h-full flex flex-col justify-between hover:shadow-premium transition-all border border-border/50 group rounded-3xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors -z-10" />
                                <div>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                                        rec.type === 'circle' ? 'bg-primary/10 text-primary' :
                                        rec.type === 'challenge' ? 'bg-amber-500/10 text-amber-500' :
                                        rec.type === 'resource' ? 'bg-emerald-500/10 text-emerald-500' :
                                        'bg-purple-500/10 text-purple-500'
                                    }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                                        {rec.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-foreground/70 leading-relaxed mb-6 line-clamp-2">
                                        {rec.description}
                                    </p>
                                </div>
                                
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full justify-between px-3 h-11 rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all font-bold"
                                    onClick={() => {
                                        if (rec.link) {
                                            if (rec.link.startsWith('/')) {
                                                window.location.href = rec.link;
                                            } else {
                                                window.open(rec.link, '_blank');
                                            }
                                        }
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">
                                        {rec.type === 'circle' ? 'Join Circle' :
                                         rec.type === 'challenge' ? 'Start Challenge' :
                                         rec.type === 'action' ? 'Get Help' : 'View Guide'}
                                    </span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
