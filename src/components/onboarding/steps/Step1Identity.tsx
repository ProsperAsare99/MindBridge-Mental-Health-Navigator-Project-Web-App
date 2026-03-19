"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, MapPin } from "lucide-react";

const universities = [
  "University of Ghana",
  "KNUST",
  "University of Cape Coast",
  "Ashesi University",
  "GIMPA",
  "Other"
];

export default function Step1Identity({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome to MindBridge!</h2>
        <p className="text-muted-foreground italic">Let's personalize your experience.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <User className="h-4 w-4 text-emerald-500" />
            What should we call you?
          </label>
          <input
            type="text"
            value={data.nickname}
            onChange={(e) => update({ nickname: e.target.value })}
            placeholder="First name or nickname"
            className="w-full rounded-2xl border border-border/50 bg-background/50 p-4 outline-none transition-all focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-muted-foreground/50"
          />
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll use this to make the app feel personal</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <GraduationCap className="h-4 w-4 text-emerald-500" />
            Your university
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {universities.map((uni) => (
              <button
                key={uni}
                onClick={() => update({ institution: uni })}
                className={`relative overflow-hidden rounded-2xl border p-4 text-center text-xs font-medium transition-all ${
                  data.institution === uni 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm shadow-emerald-500/10" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30"
                }`}
              >
                {uni}
                {data.institution === uni && (
                  <motion.div layoutId="uni-active" className="absolute inset-0 bg-emerald-500/5" />
                )}
              </button>
            ))}
          </div>
          {data.institution === "Other" && (
            <input
              type="text"
              placeholder="Enter your university name"
              className="mt-3 w-full rounded-2xl border border-border/50 bg-background/50 p-4 text-xs outline-none transition-all focus:border-emerald-500/50"
            />
          )}
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll show you campus-specific resources</p>
        </div>
      </div>
    </div>
  );
}
