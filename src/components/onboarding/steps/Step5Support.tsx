"use client";

import { motion } from "framer-motion";
import { MessageCircle, GraduationCap, ShieldCheck, Users } from "lucide-react";

const supportOptions = [
  "Yes, I have strong support",
  "Sometimes, but not always",
  "No, I feel alone",
  "Prefer not to say"
];

const professionalOptions = [
  "Yes, currently seeing someone",
  "Yes, in the past",
  "No, never",
  "Prefer not to say"
];

export default function Step5Support({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Support System</h2>
        <p className="text-muted-foreground italic">Understanding your support network.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Users className="h-4 w-4 text-emerald-500" />
            Do you currently have someone to talk to about personal issues?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {supportOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ hasSupportSystem: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.hasSupportSystem === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: Helps us know when to suggest peer/professional support</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Have you spoken with a mental health professional before?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {professionalOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ previousProfessionalSupport: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.previousProfessionalSupport === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: Tailors whether we introduce concepts or build on them</p>
        </div>
      </div>
    </div>
  );
}
