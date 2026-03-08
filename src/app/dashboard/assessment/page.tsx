"use client";

import { motion } from "framer-motion";
import {
    ClipboardList,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Timer,
    ChevronRight,
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const assessments = [
    {
        id: "phq9",
        title: "PHQ-9 (Depression Screen)",
        description: "A standard clinical tool to help monitor the severity of depression and response to treatment.",
        duration: "3-5 mins",
        questions: 9,
        category: "Clinical",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        id: "gad7",
        title: "GAD-7 (Anxiety Check)",
        description: "A sensitive self-report tool for monitoring and measuring the severity of generalized anxiety disorder.",
        duration: "2-4 mins",
        questions: 7,
        category: "Clinical",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        id: "stress",
        title: "Stress Level Evaluation",
        description: "Understand your current stress landscape and identify key triggers in your daily life.",
        duration: "5 mins",
        questions: 12,
        category: "Wellness",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        id: "sleep",
        title: "Sleep Quality Index",
        description: "Analyze your restorative cycles and identify patterns that might be affecting your rest.",
        duration: "4 mins",
        questions: 10,
        category: "Wellness",
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10"
    }
];

export default function AssessmentPage() {
    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/2 left-0 w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full opacity-50" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <ClipboardList size={12} /> Diagnostic Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                        Personal <span className="text-primary">Assessments</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Self-reflection is the first step toward growth. Use our clinically-validated tools to understand your internal landscape better.
                    </p>
                </motion.div>

                {/* Filters/Search Row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50 glass p-4 rounded-3xl border border-primary/5">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search assessments..."
                            className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none h-11 rounded-2xl gap-2 border-primary/5 hover:bg-primary/5">
                            <Filter size={16} /> Categories
                        </Button>
                        <Button variant="outline" className="flex-1 sm:flex-none h-11 rounded-2xl gap-2 border-primary/5 hover:bg-primary/5">
                            Recent First
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {assessments.map((a, i) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-card glass rounded-[2.5rem] p-8 border border-primary/10 shadow-premium hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative element */}
                            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-20 ${a.bgColor}`} />

                            <div className="relative space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className={`h-14 w-14 rounded-2xl ${a.bgColor} flex items-center justify-center ${a.color} transition-transform group-hover:scale-110 duration-500`}>
                                        <ClipboardList size={28} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{a.category}</span>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black text-foreground/90 tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {a.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">
                                        {a.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Timer size={16} className="text-secondary" />
                                        <span className="text-[11px] font-bold uppercase tracking-wider">{a.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-primary" />
                                        <span className="text-[11px] font-bold uppercase tracking-wider">{a.questions} Qs</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted text-[8px] flex items-center justify-center font-bold">
                                                {i}+
                                            </div>
                                        ))}
                                        <span className="ml-4 text-[10px] text-muted-foreground font-bold flex items-center uppercase tracking-widest">
                                            8.4k+ Taken
                                        </span>
                                    </div>

                                    <Button className="h-12 px-6 rounded-2xl font-bold shadow-lg shadow-primary/10 flex items-center gap-2 group/btn">
                                        Begin <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-primary/10 rounded-[3rem] p-10 md:p-14 overflow-hidden border border-primary/20"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Sparkles size={120} className="text-primary" />
                    </div>

                    <div className="relative z-10 space-y-6 max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight">Your data is <span className="text-primary">private & safe.</span></h2>
                        <p className="text-muted-foreground font-medium">
                            MindBridge uses industry-standard encryption. Your assessment results are never shared and are used only to personalize your wellness path.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button variant="link" className="text-primary font-bold gap-2 p-0 h-auto">
                                View Privacy Policy <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
