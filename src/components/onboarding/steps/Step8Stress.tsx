"use client";

import { motion } from "framer-motion";
import { AlertCircle, FileText, Users, Presentation, BookOpen, Wallet, Users2 } from "lucide-react";

const stressors = [
  { id: "exams", label: "Exams", icon: FileText },
  { id: "deadlines", label: "Assignments/Deadlines", icon: AlertCircle },
  { id: "groups", label: "Group work", icon: Users },
  { id: "presentation", label: "Presentations", icon: Presentation },
  { id: "comprehension", label: "Understanding coursework", icon: BookOpen },
  { id: "financial", label: "Financial pressure", icon: Wallet },
  { id: "family", label: "Family expectations", icon: Users2 }
];

export default function Step8Stress({ data, update, onNext }: any) {
  const setRating = (id: string, rating: number) => {
    update({
      academicStressors: {
        ...data.academicStressors,
        [id]: rating
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Academic Stress</h2>
        <p className="text-muted-foreground italic">Understanding your academic challenges.</p>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-foreground/80">Rate 1-5: (1=No stress, 5=Very stressful)</p>
        
        <div className="space-y-4">
          {stressors.map((s) => {
            const Icon = s.icon;
            const currentRating = data.academicStressors?.[s.id] || 1;
            
            return (
              <div key={s.id} className="space-y-2 rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
                    <Icon className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{s.label}</span>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(s.id, num)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                        currentRating === num 
                          ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                          :  num < currentRating 
                            ? "bg-primary/20 text-primary-foreground" 
                            : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground">Why we ask: We'll provide targeted support for your specific stressors</p>
      </div>
    </div>
  );
}
