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
  { label: "Mood/Emotions", key: "mood", icon: Heart },
  { label: "Stress/Anxiety", key: "anxiety", icon: Activity },
  { label: "Sleep Quality", key: "sleep", icon: Moon },
  { label: "Academic Pressure", key: "academic", icon: GraduationCap },
  { label: "Social Interactions", key: "social", icon: Users },
  { label: "Energy Levels", key: "energy", icon: Battery },
  { label: "Physical Wellbeing", key: "physical", icon: HeartPulse }
];

export default function Step11Tracking({ data, update, onNext }: any) {
  const toggleMetric = (key: string) => {
    const current = data.trackingPreferences || {};
    update({ 
      trackingPreferences: {
        ...current,
        [key]: !current[key]
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Tracking Protocols</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Configuring your cognitive monitoring frequency and metrics.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-4 text-base font-bold text-foreground/90">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Primary Telemetry Metrics
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {metricOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = !!data.trackingPreferences?.[opt.key];
              return (
                <button
                  key={opt.key}
                  onClick={() => toggleMetric(opt.key)}
                  className={`flex flex-col items-center gap-3 rounded-[1.25rem] border-2 p-5 transition-all ${
                    isActive 
                      ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10 scale-[1.02]" 
                      : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-orange-500" : "text-muted-foreground/40"}`} />
                  <span className="text-xs font-black leading-tight text-center">{opt.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            Dashboards will be calibrated to prioritize these telemetry streams
          </p>
        </div>
      </div>
    </div>
  );
}
