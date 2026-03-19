"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Sparkles, BookOpen, Compass } from "lucide-react";

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
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Values & Beliefs</h2>
        <p className="text-muted-foreground italic">Honoring what matters to you.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Heart className="h-4 w-4 text-emerald-500" />
            What role does faith/spirituality play in your life?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {spiritualityOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ spiritualityImportance: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.spiritualityImportance === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll recommend resources that align with your beliefs</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Compass className="h-4 w-4 text-emerald-500" />
            How do you prefer to address mental health?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {approachOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ preferredApproach: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.preferredApproach === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: Personalizes the language and framework we use</p>
        </div>
      </div>
    </div>
  );
}
