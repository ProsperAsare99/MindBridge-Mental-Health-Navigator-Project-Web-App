"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import { INSTITUTIONS } from "@/lib/constants";

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
          <div className="max-h-[320px] overflow-y-auto pr-2 custom-scrollbar lg:max-h-[400px]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INSTITUTIONS.map((uni) => (
                <button
                  key={uni}
                  onClick={() => update({ institution: uni })}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left text-xs font-bold transition-all ${
                    data.institution === uni 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm shadow-emerald-500/10" 
                      : "border-border/50 bg-background/50 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex-1 leading-relaxed">{uni}</span>
                    {data.institution === uni && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    )}
                  </div>
                  {data.institution === uni && (
                    <motion.div layoutId="uni-active" className="absolute inset-0 bg-emerald-500/5" />
                  )}
                </button>
              ))}
            </div>
          </div>
          {(!INSTITUTIONS.includes(data.institution) || data.institution === "Other") && data.institution !== "" && (
            <input
              type="text"
              value={INSTITUTIONS.includes(data.institution) ? "" : data.institution}
              onChange={(e) => update({ institution: e.target.value })}
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
