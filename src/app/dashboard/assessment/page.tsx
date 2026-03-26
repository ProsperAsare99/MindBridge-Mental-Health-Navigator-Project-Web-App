"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import {
    ClipboardList,
    ArrowRight,
    ShieldCheck,
    Timer,
    ChevronRight,
    Search,
    Filter,
    ArrowLeft,
    CheckCircle2,
    Info,
    AlertCircle,
    RotateCcw,
    Users,
    Wind,
    PhoneCall,
    Clock,
    Moon,
    Star,
    Zap,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Clinical Data & Questions
const ASSESSMENT_DATA = {
    phq9: {
        title: "PHQ-9 (Depression Screen)",
        category: "Clinical",
        questions: [
            "Little interest or pleasure in doing things",
            "Feeling down, depressed, or hopeless",
            "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy",
            "Poor appetite or overeating",
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
            "Trouble concentrating on things, such as reading the newspaper or watching television",
            "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
            "Thoughts that you would be better off dead or of hurting yourself in some way"
        ],
        options: [
            { label: "Not at all", value: 0 },
            { label: "Several days", value: 1 },
            { label: "More than half the days", value: 2 },
            { label: "Nearly every day", value: 3 }
        ],
        getAnalysis: (score: number) => {
            if (score <= 4) return { level: "Minimal", color: "text-emerald-500", desc: "Your score suggests minimal symptoms of depression." };
            if (score <= 9) return { level: "Mild", color: "text-primary", desc: "Your score suggests mild symptoms. It might be helpful to monitor how you feel." };
            if (score <= 14) return { level: "Moderate", color: "text-amber-500", desc: "Your score suggests moderate symptoms. Consider speaking with a professional." };
            if (score <= 19) return { level: "Moderately Severe", color: "text-orange-500", desc: "Your score suggests moderately severe symptoms. We recommend reaching out to a therapist." };
            return { level: "Severe", color: "text-red-500", desc: "Your score suggests severe symptoms. Please prioritize seeking professional support soon." };
        }
    },
    gad7: {
        title: "GAD-7 (Anxiety Check)",
        category: "Clinical",
        questions: [
            "Feeling nervous, anxious or on edge",
            "Not being able to stop or control worrying",
            "Worrying too much about different things",
            "Trouble relaxing",
            "Being so restless that it is hard to sit still",
            "Becoming easily annoyed or irritable",
            "Feeling afraid as if something awful might happen"
        ],
        options: [
            { label: "Not at all", value: 0 },
            { label: "Several days", value: 1 },
            { label: "More than half the days", value: 2 },
            { label: "Nearly every day", value: 3 }
        ],
        getAnalysis: (score: number) => {
            if (score <= 4) return { level: "Minimal", color: "text-emerald-500", desc: "Your score suggests minimal anxiety levels." };
            if (score <= 9) return { level: "Mild", color: "text-primary", desc: "Your score suggests mild anxiety. Practice grounding exercises." };
            if (score <= 14) return { level: "Moderate", color: "text-amber-500", desc: "Your score suggests moderate anxiety. Professional guidance may be beneficial." };
            return { level: "Severe", color: "text-red-500", desc: "Your score suggests severe anxiety. Please consider connecting with a counselor." };
        }
    },
    stress: {
        title: "PSS-10 (Stress Scale)",
        category: "Clinical",
        questions: [
            "In the last month, how often have you been upset because of something that happened unexpectedly?",
            "In the last month, how often have you felt that you were unable to control the important things in your life?",
            "In the last month, how often have you felt nervous and 'stressed'?",
            "In the last month, how often have you felt confident about your ability to handle your personal problems?",
            "In the last month, how often have you felt that things were going your way?",
            "In the last month, how often have you found that you could not cope with all the things that you had to do?",
            "In the last month, how often have you been able to control irritations in your life?",
            "In the last month, how often have you felt that you were on top of things?",
            "In the last month, how often have you been angered because of things that were outside of your control?",
            "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
        ],
        options: [
            { label: "Never", value: 0 },
            { label: "Almost Never", value: 1 },
            { label: "Sometimes", value: 2 },
            { label: "Fairly Often", value: 3 },
            { label: "Very Often", value: 4 }
        ],
        getAnalysis: (score: number) => {
            if (score <= 13) return { level: "Low", color: "text-emerald-500", desc: "You are handling stress well." };
            if (score <= 26) return { level: "Moderate", color: "text-amber-500", desc: "You are experiencing a moderate level of stress." };
            return { level: "High", color: "text-red-500", desc: "You are under significant stress. Consider relaxation techniques or support." };
        }
    },
    sleep: {
        title: "AIS (Sleep Quality)",
        category: "Clinical",
        questions: [
            "Sleep induction (time taken to fall asleep)",
            "Awakenings during the night",
            "Final awakening earlier than desired",
            "Total sleep duration",
            "Overall quality of sleep",
            "Sense of well-being during the day",
            "Functioning (physical and mental) during the day",
            "Sleepiness during the day"
        ],
        options: [
            { label: "No problem", value: 0 },
            { label: "Minor problem", value: 1 },
            { label: "Marked problem", value: 2 },
            { label: "Serious problem", value: 3 }
        ],
        getAnalysis: (score: number) => {
            if (score <= 5) return { level: "Good", color: "text-emerald-500", desc: "Your sleep quality appears healthy." };
            if (score <= 9) return { level: "Fair", color: "text-amber-500", desc: "Some sleep disturbances noted." };
            return { level: "Poor", color: "text-red-500", desc: "Significant sleep issues. Consider improving sleep hygiene." };
        }
    }
};

const assessments = [
    {
        id: "phq9",
        title: "PHQ-9 (Depression Screen)",
        description: "A standard clinical tool to help monitor the severity of depression and response to treatment.",
        duration: "3-5 mins",
        questions: 9,
        category: "Clinical",
        color: "text-primary",
        bgColor: "bg-primary/10"
    },
    {
        id: "gad7",
        title: "GAD-7 (Anxiety Check)",
        description: "A sensitive self-report tool for monitoring and measuring the severity of generalized anxiety disorder.",
        duration: "2-4 mins",
        questions: 7,
        category: "Clinical",
        color: "text-[#D5BDAF]",
        bgColor: "bg-[#D5BDAF]/10"
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
        color: "text-secondary",
        bgColor: "bg-secondary/10"
    }
];

export default function AssessmentPage() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [view, setView] = useState<"list" | "history">("list");
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    const activeAssessment = activeId ? (ASSESSMENT_DATA as any)[activeId] : null;

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await api.get('/assessments');
            setHistory(data);
        } catch (error) {
            console.error("Error fetching assessment history:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = (id: string) => {
        if (!(ASSESSMENT_DATA as any)[id]) {
            alert("This assessment is coming soon!");
            return;
        }
        setActiveId(id);
        setCurrentStep(0);
        setAnswers([]);
        setIsFinished(false);
    };

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = value;
        setAnswers(newAnswers);

        if (currentStep < activeAssessment.questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            setActiveId(null);
        }
    };

    const reset = () => {
        setActiveId(null);
        setCurrentStep(0);
        setAnswers([]);
        setIsFinished(false);
        setRecommendations([]);
        fetchHistory(); // Refresh history
    };

    const score = useMemo(() => answers.reduce((a, b) => a + b, 0), [answers]);
    const analysis = useMemo(() => activeAssessment?.getAnalysis(score), [score, activeAssessment]);

    const saveAssessment = async () => {
        if (!activeId || !analysis) return;
        try {
            const response = await api.post('/assessments', {
                type: activeId,
                score,
                severity: analysis.level
            });
            if (response.recommendations) {
                setRecommendations(response.recommendations);
            }
            console.log("Assessment saved successfully");
            fetchHistory(); // Update history immediately
        } catch (error) {
            console.error("Error saving assessment:", error);
        }
    };

    useEffect(() => {
        if (isFinished) {
            saveAssessment();
        }
    }, [isFinished]);

    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/2 left-0 w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full opacity-50" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {!activeId ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest border border-border">
                                    <ClipboardList size={12} /> Diagnostic Center
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                    Personal Assessments
                                </h1>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                                    Self-reflection is the first step toward growth. Use our clinically-validated tools to understand your internal landscape better.
                                </p>
                            </div>

                            {/* Filters/Search Row */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center glass p-4 rounded-3xl border border-border">
                                <div className="flex bg-muted/50 p-1 rounded-2xl w-full sm:w-auto">
                                    <button
                                        onClick={() => setView("list")}
                                        className={`flex-1 sm:px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                        All Assessments
                                    </button>
                                    <button
                                        onClick={() => setView("history")}
                                        className={`flex-1 sm:px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === "history" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                        My History
                                    </button>
                                </div>
                                <div className="relative w-full sm:w-80 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-border transition-all text-foreground placeholder:text-muted-foreground/60"
                                    />
                                </div>
                            </div>

                            {view === "list" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {assessments.map((a, i) => (
                                        <motion.div
                                            key={a.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -8 }}
                                            transition={{
                                                delay: i * 0.1,
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20
                                            }}
                                            className="group relative glass rounded-[2.5rem] p-8 shadow-premium hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden cursor-pointer"
                                            onClick={() => handleStart(a.id)}
                                        >
                                            <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-20 ${a.bgColor}`} />

                                            <div className="relative space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <div className={`h-14 w-14 rounded-2xl ${a.bgColor} flex items-center justify-center ${a.color} transition-transform group-hover:scale-110 duration-500 bg-opacity-20`}>
                                                        <ClipboardList size={28} strokeWidth={2.5} />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{a.category}</span>
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-foreground transition-colors duration-300">
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

                                                    <Button
                                                        onClick={() => handleStart(a.id)}
                                                        className="h-12 px-6 rounded-2xl font-bold shadow-lg shadow-primary/10 flex items-center gap-2 group/btn active:scale-95 transition-all"
                                                    >
                                                        Begin <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {loading ? (
                                        <div className="flex justify-center py-20">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                        </div>
                                    ) : history.length === 0 ? (
                                        <div className="glass rounded-[2.5rem] p-20 text-center space-y-4">
                                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                                                <ClipboardList size={40} />
                                            </div>
                                            <h3 className="text-xl font-bold">No history yet</h3>
                                            <p className="text-muted-foreground max-w-sm mx-auto">Complete your first assessment to see your progress and insights here.</p>
                                            <Button onClick={() => setView("list")} variant="outline" className="rounded-xl">Browse Assessments</Button>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {history.map((record, i) => (
                                                <motion.div
                                                    key={record.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="glass p-6 rounded-3xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/20 transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                            <ClipboardList size={24} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-lg">{ (ASSESSMENT_DATA as any)[record.type]?.title || record.type}</h4>
                                                            <p className="text-xs text-muted-foreground font-medium">{new Date(record.createdAt).toLocaleDateString()} at {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-8">
                                                        <div className="text-center px-4 md:border-l border-border">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Score</p>
                                                            <p className="text-2xl font-black text-foreground">{record.score}</p>
                                                        </div>
                                                        <div className="text-center px-4 border-l border-border">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Result</p>
                                                            <p className={`text-sm font-bold uppercase tracking-tight`}>{record.severity}</p>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                            <ArrowRight size={18} />
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Footer Banner */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative bg-primary/10 rounded-[3rem] p-10 md:p-14 overflow-hidden border border-primary/20"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-10">
                                    <ShieldCheck size={120} className="text-primary" />
                                </div>
                                <div className="relative z-10 space-y-6 max-w-2xl text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold tracking-tight">Your data is private & safe.</h2>
                                    <p className="text-muted-foreground font-medium">
                                        MindBridge uses industry-standard encryption. Your assessment results are never shared and are used only to personalize your wellness path.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Link href="/privacy">
                                            <Button variant="ghost" className="text-primary font-bold gap-2 p-0 h-auto hover:bg-transparent hover:underline">
                                                View Privacy Policy <ChevronRight size={16} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : isFinished ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto space-y-8 py-10"
                        >
                            <div className="bg-card glass rounded-[3rem] p-10 md:p-14 border border-primary/10 shadow-premium space-y-10 text-center">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <CheckCircle2 size={64} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black tracking-tight">{activeAssessment.title} Results</h2>
                                        <p className="text-muted-foreground font-medium">Thank you for your honesty. Here is your evaluation.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 rounded-[2.5rem] p-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Score</p>
                                        <p className="text-6xl font-black text-foreground">{score}</p>
                                    </div>
                                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-primary/10 pt-6 md:pt-0 md:pl-6 text-center md:text-left">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Indication</p>
                                        <p className={`text-2xl font-black uppercase ${analysis.color}`}>{analysis.level}</p>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-muted/40 border border-border space-y-4">
                                    <div className="flex items-center gap-2 justify-center md:justify-start text-foreground">
                                        <Info size={20} strokeWidth={2.5} />
                                        <span className="text-xs font-black uppercase tracking-[0.2em]">Expert Analysis</span>
                                    </div>
                                    <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed italic">
                                        "{analysis.desc}"
                                    </p>
                                </div>

                                {recommendations.length > 0 && (
                                    <div className="space-y-6 pt-6">
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="h-1 bg-primary w-8 rounded-full" />
                                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Recommended for You</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {recommendations.map((rec, idx) => (
                                                <motion.div
                                                    key={rec.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="group relative glass p-6 rounded-3xl border border-border hover:border-primary/20 transition-all text-left"
                                                >
                                                    <div className="flex gap-4 items-start">
                                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                            {rec.icon === 'Users' && <Users size={20} />}
                                                            {rec.icon === 'Wind' && <Wind size={20} />}
                                                            {rec.icon === 'PhoneCall' && <PhoneCall size={20} />}
                                                            {rec.icon === 'Clock' && <Clock size={20} />}
                                                            {rec.icon === 'Moon' && <Moon size={20} />}
                                                            {rec.icon === 'Star' && <Star size={20} />}
                                                            {rec.icon === 'Zap' && <Zap size={20} />}
                                                        </div>
                                                        <div className="space-y-1 pr-6">
                                                            <h4 className="font-bold text-sm text-foreground">{rec.title}</h4>
                                                            <p className="text-xs text-muted-foreground leading-tight">{rec.description}</p>
                                                        </div>
                                                        {rec.link && (
                                                            <a 
                                                                href={rec.link} 
                                                                target={rec.link.startsWith('http') ? "_blank" : "_self"}
                                                                rel="noopener noreferrer"
                                                                className="absolute right-4 top-6 text-muted-foreground hover:text-primary transition-colors"
                                                            >
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Button
                                        onClick={reset}
                                        className="h-14 flex-1 rounded-2xl font-bold shadow-xl shadow-primary/20"
                                    >
                                        Back to Overview
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStart(activeId!)}
                                        className="h-14 flex-1 rounded-2xl font-bold border-primary/10"
                                    >
                                        Retake Assessment <RotateCcw className="ml-2" size={18} />
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-amber-500/10 rounded-[2.5rem] p-8 border border-amber-500/20 flex gap-6 items-start">
                                <AlertCircle className="text-amber-500 mt-1 shrink-0" size={24} />
                                <div className="space-y-2 text-sm">
                                    <p className="font-bold text-amber-500 uppercase tracking-widest">Medical Disclaimer</p>
                                    <p className="text-foreground/70 font-medium leading-relaxed italic">
                                        This assessment is a screening tool, not a diagnosis. Your results are confidential. If you are experiencing a crisis, please use the <b>Crisis Support</b> link in the sidebar immediately.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="wizard"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-3xl mx-auto space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="rounded-xl gap-2 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all active:scale-90"
                                >
                                    <ArrowLeft size={16} /> Back
                                </Button>
                                <div className="flex flex-col items-end">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Progress</p>
                                    <div className="flex gap-1">
                                        {activeAssessment.questions.map((_: any, i: number) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? "w-6 bg-primary" : "w-1.5 bg-muted"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card glass rounded-[3rem] p-8 md:p-14 border border-primary/10 shadow-premium space-y-12 min-h-[500px] flex flex-col justify-center">
                                <div className="space-y-6 text-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border">
                                        Question {currentStep + 1} of {activeAssessment.questions.length}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                                        {activeAssessment.questions[currentStep]}
                                    </h2>
                                    <p className="text-muted-foreground font-medium">Over the last 2 weeks, how often have you been bothered by this?</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {activeAssessment.options.map((opt: any) => (
                                        <motion.button
                                            key={opt.value}
                                            onClick={() => handleAnswer(opt.value)}
                                            whileHover={{ y: -2, backgroundColor: "rgba(var(--primary-rgb), 0.1)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative h-16 flex items-center justify-between px-8 rounded-2xl bg-muted/40 border border-border hover:border-primary/40 transition-all text-left overflow-hidden"
                                        >
                                            <span className="font-bold text-foreground/80 group-hover:text-primary transition-colors">{opt.label}</span>
                                            <div className="h-5 w-5 rounded-full border-2 border-border group-hover:border-primary group-hover:bg-primary/20 transition-all flex items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
