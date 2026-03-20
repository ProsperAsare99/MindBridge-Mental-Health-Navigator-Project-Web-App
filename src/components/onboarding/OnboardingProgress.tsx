"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  phases: any[];
  currentPhase: number;
}

export default function OnboardingProgress({ currentStep, totalSteps, phases, currentPhase }: OnboardingProgressProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Phases Overview */}
      <div className="flex items-center justify-between px-2">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.id === currentPhase;
          const isCompleted = phase.id < currentPhase;

          return (
            <div key={phase.id} className="flex flex-col items-center gap-3">
              <div 
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                  isActive 
                    ? `border-orange-500 bg-orange-500/10 shadow-xl shadow-orange-500/20 scale-110` 
                    : isCompleted 
                      ? "border-emerald-500/50 bg-emerald-500/5" 
                      : "border-border/30 bg-muted/30"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "text-orange-500" : isCompleted ? "text-emerald-500" : "text-muted-foreground/40"}`} />
              </div>
              <span className={`text-xs font-black uppercase tracking-[0.2em] ${isActive ? "text-foreground" : "text-muted-foreground/60"}`}>
                {phase.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Progress Bar */}
      <div className="space-y-4">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/30 backdrop-blur-sm">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          />
          
          {/* Step markers */}
          <div className="absolute inset-0 flex justify-between px-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={`h-full w-0.5 transition-colors ${i < currentStep ? "bg-white/10" : "bg-transparent"}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between px-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Step {currentStep} <span className="text-muted-foreground/30 mx-1">/</span> {totalSteps}
          </span>
          <span className="text-orange-500">{Math.round((currentStep / totalSteps) * 100)}% <span className="text-muted-foreground/30 ml-1">Initialized</span></span>
        </div>
      </div>
    </div>
  );
}
