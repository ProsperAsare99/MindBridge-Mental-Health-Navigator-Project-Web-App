'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Target, 
  Sparkles,
  Calendar,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CarePlanView() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarePlan();
  }, []);

  const fetchCarePlan = async () => {
    try {
      const response = await axios.get('/api/ai/care-plan', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Failed to fetch care plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (index: number) => {
    try {
      const response = await axios.post('/api/ai/care-plan/task/complete', {
        planId: plan.id,
        taskIndex: index
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  if (loading) return (
    <div className="h-64 glass animate-pulse rounded-[2.5rem] flex items-center justify-center">
      <Sparkles className="text-primary/20 animate-spin-slow" />
    </div>
  );

  if (!plan) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
            <Calendar className="h-3 w-3" />
            Week {plan.weekNumber}, {plan.year}
          </div>
          <h2 className="text-2xl font-black text-foreground">Weekly Care Plan</h2>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Target className="text-primary" />
        </div>
      </div>

      <div className="space-y-8 flex-1">
        {/* Reflection Section */}
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">Navigator's Reflection</h3>
            <p className="text-base font-medium text-foreground/90 leading-relaxed italic">
              "{plan.summary}"
            </p>
          </div>
        </div>

        {/* Growth Tasks */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 mb-2">Growth Tasks</h3>
          <div className="space-y-3">
            {plan.growthTasks.map((task: any, i: number) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  task.completed 
                    ? 'bg-primary/5 border-primary/10 opacity-60' 
                    : 'bg-white/5 border-white/10 hover:border-primary/30'
                }`}
                onClick={() => !task.completed && completeTask(i)}
              >
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-white/20" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className={`text-sm font-bold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.task}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {task.reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/40">
        <div className="bg-primary/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Mood Trend</p>
              <p className="text-xs font-bold capitalize">{plan.moodAnalysis?.trend || 'Stable'}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>
    </motion.div>
  );
}
