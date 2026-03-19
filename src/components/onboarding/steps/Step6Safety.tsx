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
  const isHighRisk = data.selfHarmRisk === "Sometimes" || data.selfHarmRisk === "Often";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Risk & Safety</h2>
        <p className="text-muted-foreground italic">Your safety is our priority. This information is confidential.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            In the past month, have you had thoughts of harming yourself?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {riskOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ selfHarmRisk: opt })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.selfHarmRisk === opt 
                    ? opt === "No" 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                      : "border-rose-500 bg-rose-500/10 text-rose-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:bg-zinc-50 text-muted-foreground"
                }`}
              >
                {opt}
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
              <div className="rounded-2xl border-2 border-rose-500/20 bg-rose-50 p-6 dark:bg-rose-950/20">
                <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-base font-bold">You're not alone. Help is available.</h3>
                </div>
                <p className="mt-2 text-xs text-rose-600/80 dark:text-rose-400/80">
                  Please consider reaching out to these resources immediately:
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                      <LifeBuoy className="h-4 w-4 text-rose-500" />
                      <div className="text-xs">
                        <p className="font-bold">Ghana National Suicide Prevention Line</p>
                        <p className="text-muted-foreground">050 944 7711 / 024 445 0310</p>
                      </div>
                    </div>
                    <a href="tel:0509447711" className="rounded-lg bg-rose-500 p-2 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600">
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                      <LifeBuoy className="h-4 w-4 text-emerald-500" />
                      <div className="text-xs">
                        <p className="font-bold">MindBridge Crisis Support</p>
                        <p className="text-muted-foreground">Available 24/7 in-app</p>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary p-2 text-white shadow-lg shadow-primary/20 hover:bg-primary/90">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 pt-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <UserPlus className="h-4 w-4 text-emerald-500" />
            Would you like to set up emergency contacts?
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {["Yes, add now", "Maybe later", "No thanks"].map((opt) => (
              <button
                key={opt}
                onClick={() => update({ emergencyContacts: { ...data.emergencyContacts, preference: opt } })}
                className={`rounded-xl border p-4 text-center text-xs font-medium transition-all ${
                  data.emergencyContacts?.preference === opt 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:bg-zinc-50 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: In a crisis, we can help you reach out quickly</p>
        </div>
      </div>
    </div>
  );
}
