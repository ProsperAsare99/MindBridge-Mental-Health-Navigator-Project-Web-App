'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  Calendar,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StabilityForecast() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      const response = await axios.get('/api/ai/forecast', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setForecast(response.data);
    } catch (error) {
      console.error('Failed to fetch forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-40 glass animate-pulse rounded-[2rem] flex items-center justify-center">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-8 w-8 rounded-lg bg-primary/10" />
        ))}
      </div>
    </div>
  );

  if (!forecast.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-primary" />
          <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground/70">7-Day Stability Forecast</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={14} className="text-muted-foreground/40 hover:text-primary transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="glass border-primary/20 p-3 max-w-xs">
              <p className="text-xs font-medium leading-relaxed">
                This AI-generated forecast analyzes your recent mood trends, academic deadlines, and behavioral patterns to predict upcoming stability levels.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {forecast.map((day, i) => {
          const isHigh = day.level === 'HIGH_RISK';
          const isModerate = day.level === 'MODERATE';
          
          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-help ${
                      isHigh ? 'bg-red-500/10 border-red-500/20' : 
                      isModerate ? 'bg-amber-500/10 border-amber-500/20' : 
                      'bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    <span className="text-[9px] font-black opacity-40">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </span>
                    {isHigh ? <AlertTriangle size={14} className="text-red-500" /> :
                     isModerate ? <TrendingDown size={14} className="text-amber-500" /> :
                     <CheckCircle size={14} className="text-emerald-500" />}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="glass border-primary/20 p-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-primary">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs font-bold capitalize">{day.level.toLowerCase().replace('_', ' ')}</p>
                    {day.factor && <p className="text-[10px] text-muted-foreground leading-tight italic max-w-[150px]">{day.factor}</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
