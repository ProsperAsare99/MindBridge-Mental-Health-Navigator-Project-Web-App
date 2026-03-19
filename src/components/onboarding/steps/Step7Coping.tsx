"use client";

import { motion } from "framer-motion";
import { Coffee, Music, Bike, PenTool, Book, Users, Heart, Brain, Moon, Tv, Smile } from "lucide-react";

const copingOptions = [
  { label: "Talk to someone", icon: Users },
  { label: "Write/journal", icon: PenTool },
  { label: "Exercise or move", icon: Bike },
  { label: "Listen to music", icon: Music },
  { label: "Pray or meditate", icon: Heart },
  { label: "Spend time alone", icon: Moon },
  { label: "Be around people", icon: Users },
  { label: "Do something creative", icon: PenTool },
  { label: "Sleep or rest", icon: Moon },
  { label: "Watch videos/entertainment", icon: Tv },
  { label: "Read", icon: Book },
  { label: "Help others", icon: Smile },
  { label: "I'm not sure yet", icon: Brain }
];

export default function Step7Coping({ data, update, onNext }: any) {
  const toggleCoping = (option: string) => {
    const current = data.copingStyles || [];
    if (current.includes(option)) {
      update({ copingStyles: current.filter((o: string) => o !== option) });
    } else {
      update({ copingStyles: [...current, option] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Coping Style</h2>
        <p className="text-muted-foreground italic">What helps YOU feel better?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">
            When stressed, I find it helpful to: (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {copingOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = data.copingStyles?.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  onClick={() => toggleCoping(opt.label)}
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
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll suggest coping strategies that match your style</p>
        </div>
      </div>
    </div>
  );
}
