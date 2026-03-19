"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Clock, 
  Calendar, 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Heart, 
  Brain, 
  Moon, 
  Zap,
  GraduationCap,
  Users,
  Battery,
  HeartPulse
} from "lucide-react";

const frequencyOptions = [
  "Multiple times a day",
  "Once a day",
  "A few times a week",
  "Once a week",
  "Only when I feel like it"
];

const metricOptions = [
  { label: "Mood/Emotions", icon: Heart },
  { label: "Stress Level", icon: Zap },
  { label: "Sleep Quality", icon: Moon },
  { label: "Academic Pressure", icon: GraduationCap },
  { label: "Social Interactions", icon: Users },
  { label: "Self-care Habits", icon: Activity },
  { label: "Energy Levels", icon: Battery },
  { label: "Physical Wellbeing", icon: HeartPulse }
];

export default function Step11Tracking({ data, update, onNext }: any) {
  const toggleMetric = (metric: string) => {
    const current = data.trackingMetrics || [];
    if (current.includes(metric)) {
      update({ trackingMetrics: current.filter((m: string) => m !== metric) });
    } else {
      update({ trackingMetrics: [...current, metric] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Tracking Preferences</h2>
        <p className="text-muted-foreground italic">How would you like to track your journey?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Calendar className="h-4 w-4 text-emerald-500" />
            How often would you like to check in?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {frequencyOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ trackingFrequency: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.trackingFrequency === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
            What metrics are most important to you?
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metricOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.trackingMetrics?.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  onClick={() => toggleMetric(opt.label)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    isActive 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                      : "border-border/50 bg-background/50 hover:bg-zinc-50 text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-500" : "text-zinc-500"}`} />
                  <span className="text-[10px] font-medium leading-tight">{opt.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll customize your dashboard with these insights</p>
        </div>
      </div>
    </div>
  );
}
