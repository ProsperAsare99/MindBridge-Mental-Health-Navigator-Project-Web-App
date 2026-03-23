"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Compass, BookOpen } from "lucide-react";

const spiritualityOptions = [
  "Very important - I'd like faith-based resources",
  "Somewhat important - occasional references are fine",
  "Not important - prefer secular resources",
  "Prefer not to say"
];

const approachOptions = [
  "Clinical/Medical approach",
  "Holistic/Wellness approach",
  "Cultural/Traditional wisdom",
  "Mix of all approaches",
  "I'm open to exploring"
];

export default function Step9Values({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Values & Beliefs</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Integrating your personal ethical framework into the system.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Heart className="h-5 w-5 text-orange-500" />
            Significance of Faith / Spirituality?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Very important - I'd like faith-based resources", value: "very_important" },
              { label: "Somewhat important - occasional references are fine", value: "somewhat_important" },
              { label: "Not important - prefer secular resources", value: "not_important" }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => update({ faithLevel: opt.value })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.faithLevel === opt.value 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            We'll recommend resources that resonate with your core values
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Compass className="h-5 w-5 text-orange-500" />
            Preferred Methodological Approach?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Clinical/Medical approach", value: "clinical" },
              { label: "Holistic/Wellness approach", value: "holistic" },
              { label: "Cultural/Traditional wisdom", value: "cultural" },
              { label: "Mix of all approaches", value: "mixed" }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => update({ approachPreference: opt.value })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.approachPreference === opt.value 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-orange-500 inline-block" />
            Optimizes the framework for maximum psychological alignment
          </p>
        </div>
      </div>
    </div>
  );
}
