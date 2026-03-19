"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Shield, BookOpen, Moon, Activity, Users, FileText, Sparkles } from "lucide-react";

const goalOptions = [
  { label: "Better understand my emotions", icon: Brain },
  { label: "Reduce stress and anxiety", icon: Shield },
  { label: "Improve my mood", icon: TrendingUp },
  { label: "Build resilience", icon: Activity },
  { label: "Improve academic performance", icon: BookOpen },
  { label: "Better sleep", icon: Moon },
  { label: "Develop healthy habits", icon: Sparkles },
  { label: "Connect with support", icon: Users },
  { label: "Track my mental health journey", icon: FileText },
  { label: "Prepare for counseling", icon: Target },
  { label: "Just be more mindful", icon: TrendingUp }
];

export default function Step10Goals({ data, update, onNext }: any) {
  const toggleGoal = (goal: string) => {
    const current = data.goals || [];
    if (current.includes(goal)) {
      update({ goals: current.filter((g: string) => g !== goal) });
    } else if (current.length < 3) {
      update({ goals: [...current, goal] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Goals & Motivation</h2>
        <p className="text-muted-foreground italic">What are you hoping to achieve with MindBridge?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">
            Select up to 3 goals:
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {goalOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.goals?.includes(opt.label);
              const isMax = data.goals?.length >= 3 && !isActive;

              return (
                <button
                  key={opt.label}
                  disabled={isMax}
                  onClick={() => toggleGoal(opt.label)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    isActive 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                      : isMax 
                        ? "opacity-50 cursor-not-allowed border-border/20" 
                        : "border-border/50 bg-background/50 hover:bg-zinc-50 text-muted-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-500" : "text-zinc-500"}`} />
                  <span className="text-[10px] font-medium leading-tight">{opt.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll help you track progress toward YOUR goals</p>
        </div>
      </div>
    </div>
  );
}
