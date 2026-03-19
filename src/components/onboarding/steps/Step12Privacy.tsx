"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Lock, Info, ExternalLink } from "lucide-react";

const visibilityOptions = [
  { label: "Only me", desc: "Your data is private and encrypted for your eyes only." },
  { label: "Anonymous research", desc: "Contribute to de-identified mental health research in Ghana." },
  { label: "Counselor access", desc: "Allow university counselors to see your trends if you request support." }
];

export default function Step12Privacy({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Privacy & Data Sharing</h2>
        <p className="text-muted-foreground italic">You are in control of your data.</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50 p-6 dark:bg-emerald-950/20">
          <div className="flex gap-4">
            <div className="rounded-xl bg-emerald-100 p-2 dark:bg-emerald-900">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Our Privacy Promise</h3>
              <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80">
                Your wellbeing data is encrypted end-to-end. We never sell your personal information.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">
            Who can see your tracking data?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => update({ dataVisibility: opt.label })}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                  data.dataVisibility === opt.label 
                    ? "border-emerald-500 bg-emerald-500/10 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:bg-zinc-50"
                }`}
              >
                <div className={`mt-0.5 rounded-lg p-1.5 ${data.dataVisibility === opt.label ? "bg-emerald-500/20" : "bg-zinc-100 dark:bg-zinc-800"}`}>
                  {opt.label === "Only me" ? <Lock className="h-3 w-3" /> : opt.label === "Anonymous research" ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </div>
                <div className="space-y-1">
                  <p className={`text-xs font-bold ${data.dataVisibility === opt.label ? "text-emerald-700" : "text-foreground"}`}>{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 space-x-2 rounded-xl border border-border/50 p-4">
          <input
            type="checkbox"
            id="consent"
            checked={data.dataSharingConsent}
            onChange={(e) => update({ dataSharingConsent: e.target.checked })}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="consent" className="text-[10px] text-muted-foreground leading-tight">
            I agree to the <span className="text-primary underline cursor-pointer">Privacy Policy</span> and <span className="text-primary underline cursor-pointer">Terms of Service</span>.
          </label>
        </div>
      </div>
    </div>
  );
}
