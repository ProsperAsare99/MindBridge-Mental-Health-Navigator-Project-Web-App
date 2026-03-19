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
    <div className="flex flex-col gap-6">
      {/* Phases Overview */}
      <div className="flex items-center justify-between px-2">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.id === currentPhase;
          const isCompleted = phase.id < currentPhase;

          return (
            <div key={phase.id} className="flex flex-col items-center gap-2">
              <div 
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                  isActive 
                    ? `border-primary bg-primary/10 shadow-lg shadow-primary/20` 
                    : isCompleted 
                      ? "border-emerald-500 bg-emerald-500/10" 
                      : "border-border/50 bg-zinc-50 dark:bg-zinc-800"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : isCompleted ? "text-emerald-500" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {phase.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Progress Bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          className="h-full bg-gradient-to-r from-emerald-400 to-primary transition-all duration-700 ease-out"
        />
        
        {/* Step markers */}
        <div className="absolute inset-0 flex justify-between px-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full w-0.5 transition-colors ${i < currentStep ? "bg-white/20" : "bg-transparent"}`} 
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between px-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
    </div>
  );
}
