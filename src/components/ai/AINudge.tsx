'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Heart, 
  AlertTriangle, 
  Trophy, 
  BookOpen, 
  Lightbulb,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function AINudge() {
  const [nudge, setNudge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchNudge();
  }, []);

  const fetchNudge = async () => {
    try {
      const response = await axios.get('/api/ai/nudge', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNudge(response.data);
    } catch (error) {
      console.error('Failed to fetch nudge:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ENCOURAGEMENT': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'CELEBRATION': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'ACADEMIC': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'INSIGHT': return <Lightbulb className="w-5 h-5 text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'ENCOURAGEMENT': return 'from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20';
      case 'WARNING': return 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20';
      case 'CELEBRATION': return 'from-yellow-500/10 via-yellow-500/5 to-transparent border-yellow-500/20';
      case 'ACADEMIC': return 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20';
      case 'INSIGHT': return 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20';
      default: return 'from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20';
    }
  };

  if (loading || dismissed) return null;
  if (!nudge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-4 sm:p-6 mb-8 ${getGradient(nudge.type)} backdrop-blur-sm group`}
      >
        {/* Animated Background Glow */}
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
        
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
            {getIcon(nudge.type)}
          </div>
          
          <div className="flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              MindBridge AI Insight
            </h4>
            <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed mb-4">
              {nudge.message}
            </p>
            
            {nudge.actionLabel && (
              <Link
                href={nudge.actionUrl || '#'}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-medium text-white transition-all hover:translate-x-1"
              >
                {nudge.actionLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
