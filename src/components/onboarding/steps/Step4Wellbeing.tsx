"use client";

import { motion } from "framer-motion";
import { Smile, Frown, Meh, SmilePlus, HeartPulse, Search } from "lucide-react";

const moods = [
  { label: "😊 Great", value: "Great", icon: SmilePlus, color: "text-emerald-500" },
  { label: "🙂 Good", value: "Good", icon: Smile, color: "text-emerald-400" },
  { label: "😐 Okay", value: "Okay", icon: Meh, color: "text-zinc-400" },
  { label: "😟 Not good", value: "Not good", icon: Frown, color: "text-amber-500" },
  { label: "😢 Struggling", value: "Struggling", icon: HeartPulse, color: "text-rose-500" }
];

const reasons = [
  "Academic stress",
  "Anxiety",
  "Feeling down or depressed",
  "Loneliness",
  "Relationship issues",
  "Financial stress",
  "Family pressure",
  "General wellness monitoring",
  "Just exploring",
  "Prefer not to say"
];

export default function Step4Wellbeing({ data, update, onNext }: any) {
  const toggleReason = (reason: string) => {
    const current = data.reasonsForJoining || [];
    if (current.includes(reason)) {
      update({ reasonsForJoining: current.filter((r: string) => r !== reason) });
    } else {
      update({ reasonsForJoining: [...current, reason] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Wellbeing Baseline</h2>
        <p className="text-muted-foreground italic">Help us understand where you're starting from.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">
            How are you feeling right now?
          </label>
          <div className="flex justify-between gap-2">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isActive = data.wellbeingBaseline === mood.value;
              return (
                <button
                  key={mood.value}
                  onClick={() => update({ wellbeingBaseline: mood.value })}
                  className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                    isActive 
                      ? "border-primary bg-primary/10 shadow-sm" 
                      : "border-border/50 bg-background/50 hover:bg-zinc-50"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? mood.color : "text-muted-foreground"}`} />
                  <span className={`text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {mood.value}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: This helps us track your progress over time</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Search className="h-4 w-4 text-emerald-500" />
            What brings you to MindBridge?
          </label>
          <div className="flex flex-wrap gap-2">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => toggleReason(reason)}
                className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                  data.reasonsForJoining?.includes(reason) 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll prioritize relevant resources for you</p>
        </div>
      </div>
    </div>
  );
}
