"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, MapPin, CheckCircle2 } from "lucide-react";
import { INSTITUTIONS } from "@/lib/constants";

export default function Step1Identity({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Welcome to MindBridge!</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Let's personalize your cognitive experience.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <User className="h-5 w-5 text-orange-500" />
            What should we call you?
          </label>
          <input
            type="text"
            value={data.nickname}
            onChange={(e) => update({ nickname: e.target.value })}
            placeholder="First name or nickname"
            className="w-full rounded-[1.5rem] border border-border/40 bg-muted/20 p-5 text-base font-bold outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 placeholder:text-muted-foreground/30"
          />
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Used to personalize your interface
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <GraduationCap className="h-5 w-5 text-orange-500" />
            Your Academic Institution
          </label>
          <div className="max-h-[350px] overflow-y-auto pr-3 custom-scrollbar lg:max-h-[450px] p-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INSTITUTIONS.map((uni) => (
                <button
                  key={uni}
                  onClick={() => update({ institution: uni })}
                  className={`group relative overflow-hidden rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                    data.institution === uni 
                      ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                      : "border-border/20 bg-muted/10 hover:border-orange-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex-1 leading-tight">{uni}</span>
                    {data.institution === uni && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-600" />
                    )}
                  </div>
                  {data.institution === uni && (
                    <motion.div layoutId="uni-active" className="absolute inset-0 bg-orange-500/5" />
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
              className="mt-4 w-full rounded-[1.25rem] border border-orange-500/30 bg-orange-500/5 p-5 text-sm font-bold outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          )}
          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            Used to provide campus-specific resources
          </p>
        </div>
      </div>
    </div>
  );
}
