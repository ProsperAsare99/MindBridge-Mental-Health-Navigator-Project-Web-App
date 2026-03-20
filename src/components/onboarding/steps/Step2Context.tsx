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
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Academic Context</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Your current academic position influences your stress landscape.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <Layers className="h-5 w-5 text-orange-500" />
            Current Year of Study
          </label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => update({ yearOfStudy: level })}
                className={`flex items-center justify-center rounded-[1.25rem] border-2 p-5 text-center text-sm font-black transition-all ${
                  data.yearOfStudy === level 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Cognitive loads fluctuate significantly by academic year
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <BookOpen className="h-5 w-5 text-orange-500" />
            Program / Field of Study
          </label>
          <div className="flex flex-wrap gap-3">
            {programs.map((program) => (
              <button
                key={program}
                onClick={() => update({ fieldOfStudy: program })}
                className={`rounded-2xl border-2 px-6 py-3 text-sm font-black transition-all ${
                  data.fieldOfStudy === program 
                    ? "border-orange-500 bg-orange-500/10 text-orange-700" 
                    : "border-border/20 bg-muted/10 hover:border-orange-500/40 text-muted-foreground/60"
                }`}
              >
                {program}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Specialized fields encounter unique psychological pressures
          </p>
        </div>
      </div>
    </div>
  );
}
