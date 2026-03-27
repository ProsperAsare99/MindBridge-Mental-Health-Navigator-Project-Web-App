"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, 
    Shield, 
    Share2, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Lock,
    Eye,
    ChevronRight,
    ClipboardCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface ClinicalBrief {
    patientId: string;
    timestamp: string;
    summary: {
        moodTrend: string;
        crisisActivity: string;
        primaryConcerns: string[];
        clinicalNotes: string[];
    };
    recommendationForCounselor: string;
}

export function CrisisBriefHandoff() {
    const [brief, setBrief] = useState<ClinicalBrief | null>(null);
    const [loading, setLoading] = useState(false);
    const [viewing, setViewing] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateBrief = async () => {
        setLoading(true);
        try {
            const data = await api.get('/crisis/brief');
            setBrief(data);
            setViewing(true);
        } catch (error) {
            console.error('Failed to generate brief:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!brief) return;
        const text = `
Clinical Brief (MindBridge)
ID: ${brief.patientId}
Date: ${new Date(brief.timestamp).toLocaleDateString()}

SUMMARY:
- ${brief.summary.moodTrend}
- ${brief.summary.crisisActivity}

PRIMARY CONCERNS:
${brief.summary.primaryConcerns.map(c => `- ${c}`).join('\n')}

CLINICAL NOTES:
${brief.summary.clinicalNotes.map(n => `- ${n}`).join('\n')}

PROVISIONAL GUIDANCE:
${brief.recommendationForCounselor}
        `.trim();
        
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass rounded-[2.5rem] p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Shield size={120} className="text-primary" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <FileText size={24} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">Clinical Handoff <span className="text-primary">Brief.</span></h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                           <Lock size={10} /> AI-Assisted • Privacy-First • Student-Led
                        </p>
                    </div>
                </div>

                <p className="text-sm font-medium text-foreground/70 leading-relaxed max-w-xl">
                    Prepare for your counseling session by generating a 7-day wellness summary. This helps your counselor understand your journey faster.
                </p>

                {!viewing ? (
                    <Button 
                        onClick={generateBrief}
                        disabled={loading}
                        className="h-14 px-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
                    >
                        {loading ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" size={16} />}
                        Record My 7-Day Brief
                    </Button>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 pt-4"
                    >
                        <div className="glass bg-white/40 rounded-3xl p-6 border border-white/40 space-y-4">
                            <div className="flex items-center justify-between border-b border-black/5 pb-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Patient Ref: {brief?.patientId}</span>
                                <span className="text-[10px] font-bold text-muted-foreground">{new Date(brief?.timestamp || '').toLocaleDateString()}</span>
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-3">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Activity size={12} /> Recent Patterns
                                    </h4>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-foreground bg-muted/30 p-3 rounded-xl">{brief?.summary.moodTrend}</p>
                                        <p className="text-xs font-bold text-foreground bg-muted/30 p-3 rounded-xl">{brief?.summary.crisisActivity}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <CheckCircle2 size={12} /> Primary Concerns
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {brief?.summary.primaryConcerns.map(c => (
                                            <span key={c} className="px-3 py-1.5 bg-muted/50 rounded-lg text-[10px] font-bold border border-border/40 capitalize">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Shield size={12} /> Counselor Guidance
                                </h4>
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs font-semibold leading-relaxed text-primary italic">
                                    "{brief?.recommendationForCounselor}"
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button 
                                onClick={copyToClipboard}
                                variant="outline"
                                className="h-12 px-6 rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                            >
                                {copied ? <ClipboardCheck size={16} /> : <Share2 size={16} />}
                                {copied ? "Copied Brief" : "Copy for Counselor"}
                            </Button>
                            <Button 
                                variant="ghost"
                                onClick={() => setViewing(false)}
                                className="h-12 px-6 rounded-xl text-muted-foreground font-black uppercase text-[10px] tracking-widest"
                            >
                                Secure Brief
                            </Button>
                        </div>
                        
                        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                            <AlertCircle className="text-amber-500 flex-shrink-0" size={16} />
                            <p className="text-[10px] font-medium text-amber-700/80 leading-relaxed">
                                This brief is for clinical reference only. Your individual story is more complex than any data summary. Share this if you feel it helps communication with your clinician.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// Sparkles icon was missing from lucide-react imports in my previous thought but I'll add it now.
function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
