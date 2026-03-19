"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Layers } from "lucide-react";

const levels = [
  "Level 100 (Freshman)",
  "Level 200 (Sophomore)",
  "Level 300 (Junior)",
  "Level 400 (Senior)",
  "Postgraduate"
];

const programs = [
  "Engineering",
  "Sciences",
  "Business/Economics",
  "Arts & Humanities",
  "Medicine/Health Sciences",
  "Social Sciences",
  "Technology/IT",
  "Other"
];

export default function Step2Context({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Academic Journey</h2>
        <p className="text-muted-foreground italic">Tell us about your context.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Layers className="h-4 w-4 text-emerald-500" />
            Year of Study
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => update({ yearOfStudy: level })}
                className={`flex items-center justify-center rounded-2xl border p-4 text-center text-xs font-medium transition-all ${
                  data.yearOfStudy === level 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm shadow-emerald-500/10" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: Academic stressors differ by year</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <BookOpen className="h-4 w-4 text-emerald-500" />
            Program/Field of Study
          </label>
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <button
                key={program}
                onClick={() => update({ fieldOfStudy: program })}
                className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                  data.fieldOfStudy === program 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {program}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: Different fields face different pressures</p>
        </div>
      </div>
    </div>
  );
}
