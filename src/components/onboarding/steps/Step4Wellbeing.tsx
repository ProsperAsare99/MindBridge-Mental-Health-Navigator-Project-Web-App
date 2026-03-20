"use client";

import { motion } from "framer-motion";
import { Smile, Frown, Meh, SmilePlus, HeartPulse, Search } from "lucide-react";

const moods = [
  { label: "😊 Great", value: "Great", icon: SmilePlus, color: "text-orange-500" },
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
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Wellbeing Baseline</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Establishing your initial cognitive and emotional state.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-bold text-foreground/90">
            How are you feeling right now?
          </label>
          <div className="flex justify-between gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isActive = data.wellbeingBaseline === mood.value;
              return (
                <button
                  key={mood.value}
                  onClick={() => update({ wellbeingBaseline: mood.value })}
                  className={`flex flex-1 flex-col items-center gap-3 rounded-[1.25rem] border-2 p-5 transition-all ${
                    isActive 
                      ? "border-orange-500 bg-orange-500/10 shadow-md shadow-orange-500/10 scale-105" 
                      : "border-border/20 bg-muted/10 hover:bg-muted/20"
                  }`}
                >
                  <Icon className={`h-7 w-7 ${isActive ? mood.color : "text-muted-foreground/40"}`} />
                  <span className={`text-xs font-black uppercase tracking-tighter ${isActive ? "text-foreground" : "text-muted-foreground/60"}`}>
                    {mood.value}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Calibration complete. We'll monitor your progress from here.
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Search className="h-5 w-5 text-orange-500" />
            What is your primary objective?
          </label>
          <div className="flex flex-wrap gap-3">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => toggleReason(reason)}
                className={`rounded-2xl border-2 px-6 py-3 text-sm font-black transition-all ${
                  data.reasonsForJoining?.includes(reason) 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            We'll prioritize computational nodes relevant to your mission
          </p>
        </div>
      </div>
    </div>
  );
}
