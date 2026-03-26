'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

export const PersonalizedRecommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const data = await api.get<Recommendation[]>('/analytics/recommendations');
                setRecommendations(data);
            } catch (error) {
                console.error('Failed to fetch recommendations', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecs();
    }, []);

    if (loading) return null;
    if (recommendations.length === 0) return null;

    return (
        <section className="py-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-xl font-bold tracking-tight">Suggested for You</h2>
                </div>
                <Badge variant="outline" className="text-xs font-normal border-indigo-200 text-indigo-600 bg-indigo-50">
                    Based on your journey
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendations.map((rec, index) => {
                    const Icon = iconMap[rec.icon] || Sparkles;
                    
                    return (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-4 h-full flex flex-col justify-between hover:shadow-md transition-shadow border-slate-100 group">
                                <div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                                        rec.type === 'circle' ? 'bg-blue-50 text-blue-600' :
                                        rec.type === 'challenge' ? 'bg-amber-50 text-amber-600' :
                                        rec.type === 'resource' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-purple-50 text-purple-600'
                                    }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {rec.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        {rec.description}
                                    </p>
                                </div>
                                
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full justify-between px-2 hover:bg-slate-50 hover:text-indigo-600"
                                    onClick={() => {
                                        if (rec.link) window.location.href = rec.link;
                                        // Handle internal navigation for circles/challenges if needed
                                    }}
                                >
                                    <span className="text-xs font-medium">
                                        {rec.type === 'circle' ? 'Join Circle' :
                                         rec.type === 'challenge' ? 'Start Challenge' :
                                         rec.type === 'action' ? 'Get Help' : 'View Guide'}
                                    </span>
                                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
