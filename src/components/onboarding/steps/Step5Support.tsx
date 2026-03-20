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
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Social Framework</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Mapping your external support nodes.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Users className="h-5 w-5 text-orange-500" />
            Do you have an active support network?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {supportOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ hasSupportSystem: opt })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.hasSupportSystem === opt 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Determines the frequency of empathetic interventions
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <ShieldCheck className="h-5 w-5 text-orange-500" />
            Prior Interaction with Professional Frameworks?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {professionalOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ previousProfessionalSupport: opt })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.previousProfessionalSupport === opt 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Used to adjust terminology and conceptual depth
          </p>
        </div>
      </div>
    </div>
  );
}
