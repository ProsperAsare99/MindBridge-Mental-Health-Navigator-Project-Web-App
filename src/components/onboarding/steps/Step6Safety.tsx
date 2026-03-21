"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, LifeBuoy, ShieldAlert, UserPlus } from "lucide-react";

const riskOptions = [
  "No",
  "Rarely",
  "Sometimes",
  "Often",
  "Prefer not to say"
];

export default function Step6Safety({ data, update, onNext }: any) {
  const isHighRisk = data.riskLevel === "MODERATE" || data.riskLevel === "HIGH" || data.riskLevel === "CRITICAL";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-foreground">Integrity & Safety</h2>
        <p className="text-lg text-muted-foreground/80 font-medium italic">Safety is a core system requirement. All data is isolated and secure.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-base font-bold text-foreground/90">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            Relative safety assessment (Recent impulses?)
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "No, I feel safe / Rarely", value: "LOW" },
              { label: "Sometimes / Moderate", value: "MODERATE" },
              { label: "Often / High", value: "HIGH" },
              { label: "I am in crisis right now", value: "CRITICAL" }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => update({ riskLevel: opt.value })}
                className={`rounded-[1.25rem] border-2 p-5 text-left text-sm font-black transition-all ${
                  data.riskLevel === opt.value 
                    ? opt.value === "LOW" 
                      ? "border-orange-500 bg-orange-500/10 text-orange-700 shadow-md shadow-orange-500/10" 
                      : "border-rose-500 bg-rose-500/10 text-rose-700 shadow-md shadow-rose-500/10" 
                    : "border-border/20 bg-muted/10 hover:bg-muted/20 text-muted-foreground/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isHighRisk && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-[2rem] border-4 border-rose-500/20 bg-rose-500/5 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="h-8 w-8 animate-bounce" />
                  <h3 className="text-xl font-black uppercase tracking-tight">Active Support Required</h3>
                </div>
                <p className="mt-3 text-sm font-bold text-rose-600/70 dark:text-rose-400/70">
                  Please establish connection with one of these emergency nodes immediately:
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-[1.25rem] bg-card p-4 shadow-lg border border-rose-500/20">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                        <LifeBuoy className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="text-sm">
                        <p className="font-black text-rose-600">Suicide Prevention Line</p>
                        <p className="text-muted-foreground font-bold">050 944 7711</p>
                      </div>
                    </div>
                    <a href="tel:0509447711" className="rounded-xl bg-rose-500 p-3 text-white shadow-xl shadow-rose-500/30 hover:bg-rose-600 transition-all active:scale-95">
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

