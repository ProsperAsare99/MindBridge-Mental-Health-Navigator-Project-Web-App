"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Battery, Moon, Users, Zap } from "lucide-react";

interface MetricSliderProps {
  label: string;
  icon: any;
  value: number;
  onChange: (val: number) => void;
  color: string;
}

const MetricSlider: React.FC<MetricSliderProps> = ({ label, icon: Icon, value, onChange, color }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-lg bg-muted/50", color)}>
            <Icon size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-foreground">{label}</span>
        </div>
        <span className="text-xs font-bold font-mono">{value}/5</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={cn("w-full h-1.5 rounded-full appearance-none bg-muted accent-current cursor-pointer", color)}
      />
      <div className="flex justify-between px-1">
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Low</span>
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">High</span>
      </div>
    </div>
  );
}

interface AdvancedMoodTrackerProps {
  metrics: {
    energy: number;
    sleep: number;
    social: number;
  };
  onMetricChange: (field: string, value: number) => void;
}

export function AdvancedMoodTracker({ metrics, onMetricChange }: AdvancedMoodTrackerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <MetricSlider 
        label="Energy" 
        icon={Zap} 
        value={metrics.energy} 
        onChange={(v) => onMetricChange("energy", v)} 
        color="text-yellow-500"
      />
      <MetricSlider 
        label="Rest" 
        icon={Moon} 
        value={metrics.sleep} 
        onChange={(v) => onMetricChange("sleep", v)} 
        color="text-indigo-400"
      />
      <MetricSlider 
        label="Social" 
        icon={Users} 
        value={metrics.social} 
        onChange={(v) => onMetricChange("social", v)} 
        color="text-emerald-400"
      />
    </div>
  );
}
