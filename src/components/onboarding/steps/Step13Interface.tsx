"use client";

import { motion } from "framer-motion";
import { Palette, Layout, Sparkles, Check } from "lucide-react";

const themes = [
  { name: "🌿 Serene Green (default)", color: "bg-emerald-500" },
  { name: "🌑 Midnight Calm", color: "bg-zinc-900" },
  { name: "🌊 Ocean Peace", color: "bg-blue-500" },
  { name: "🌅 Sunset Glow", color: "bg-amber-500" },
  { name: "💜 Lavender Bliss", color: "bg-purple-500" }
];

const layouts = [
  { name: "Today's mood check-in", desc: "Focus on your daily wellbeing first" },
  { name: "Support resources", desc: "Quick access to help and tools" },
  { name: "Journal & Reflections", desc: "Prioritize your personal growth writing" },
  { name: "Smart AI Insights", desc: "Deep dive into your patterns and AI guidance" }
];

export default function Step13Interface({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Final Touches</h2>
        <p className="text-muted-foreground italic">Make MindBridge yours.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Palette className="h-4 w-4 text-emerald-500" />
            Pick your serenity theme
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => update({ preferredTheme: theme.name })}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  data.preferredTheme === theme.name 
                    ? "border-emerald-500 bg-emerald-500/10" 
                    : "border-border/50 bg-background/50 hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full ${theme.color} border border-white/20`} />
                  <span className={`text-xs font-medium ${data.preferredTheme === theme.name ? "text-emerald-700" : "text-foreground"}`}>{theme.name}</span>
                </div>
                {data.preferredTheme === theme.name && <Check className="h-3 w-3 text-emerald-600" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Layout className="h-4 w-4 text-emerald-500" />
            Default Dashboard View
          </label>
          <div className="grid grid-cols-1 gap-2">
            {layouts.map((l) => (
              <button
                key={l.name}
                onClick={() => update({ dashboardLayout: l.name })}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                  data.dashboardLayout === l.name 
                    ? "border-emerald-500 bg-emerald-500/10 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:bg-zinc-50"
                }`}
              >
                <div className="space-y-1">
                  <p className={`text-xs font-bold ${data.dashboardLayout === l.name ? "text-emerald-700" : "text-foreground"}`}>{l.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{l.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border/50 p-6 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-emerald-500/30" />
          <h3 className="mt-4 text-base font-bold">You're all set!</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Welcome to a more personalized MindBridge experience.
          </p>
        </div>
      </div>
    </div>
  );
}
