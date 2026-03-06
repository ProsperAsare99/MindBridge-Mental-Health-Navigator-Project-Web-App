"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertTriangle,
    AlertCircle,
    Info,
    Sparkles,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
    { id: 1, text: "Little interest or pleasure in doing things" },
    { id: 2, text: "Feeling down, depressed, or hopeless" },
    { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: 4, text: "Feeling tired or having little energy" },
    { id: 5, text: "Poor appetite or overeating" },
    { id: 6, text: "Feeling bad about yourself — or that you are a failure" },
    { id: 7, text: "Trouble concentrating on things" },
    { id: 8, text: "Moving or speaking slowly, or restless movement" },
    { id: 9, text: "Thoughts that you would be better off dead" },
];

const OPTIONS = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half" },
    { value: 3, label: "Nearly every day" },
];

export default function AssessmentPage() {
    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [severity, setSeverity] = useState("");

    const handleOptionSelect = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = value;
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const totalScore = answers.reduce((a, b) => a + (b === -1 ? 0 : b), 0);
        let severityLevel = totalScore <= 4 ? "None-minimal" :
            totalScore <= 9 ? "Mild" :
                totalScore <= 14 ? "Moderate" :
                    totalScore <= 19 ? "Moderately Severe" : "Severe";

        setScore(totalScore);
        setSeverity(severityLevel);

        try {
            if (user) {
                await addDoc(collection(db, `users/${user.uid}/assessments`), {
                    type: 'PHQ-9',
                    score: totalScore,
                    severity: severityLevel,
                    timestamp: serverTimestamp(),
                });
            }
            setShowResults(true);
        } catch (error) {
            setShowResults(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showResults) {
        return (
            <div className="min-h-screen relative pb-20 pt-10 px-6 selection:bg-primary/10">
                {/* Ambient background accents */}
                <div className="fixed inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto space-y-8"
                >
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center h-20 w-20 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-xl mb-4">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground/90">Insight <span className="text-primary">Summary</span></h1>
                        <p className="text-muted-foreground font-medium">Your private wellness snapshot is ready for review.</p>
                    </div>

                    <div className="bg-card glass rounded-[2.5rem] p-10 border border-primary/10 shadow-premium text-center">
                        <div className="space-y-2 mb-10">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Wellness Index</p>
                            <span className="text-8xl font-black text-primary block leading-none">{score}</span>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold mt-4 shadow-sm">
                                <Sparkles size={16} /> {severity} Symptoms
                            </div>
                        </div>

                        <p className="text-foreground/70 leading-relaxed font-medium mb-10 text-lg">
                            {severity === 'None-minimal' && "Your responses suggest you're maintaining a healthy emotional balance."}
                            {severity === 'Mild' && "You're experiencing gentle fluctuations. Consider the mindfulness tools in your dashboard."}
                            {severity === 'Moderate' && "There's notable weight on your spirit right now. Our self-help guides can offer support."}
                            {(severity === 'Moderately Severe' || severity === 'Severe') && "You're navigating deep waters. Professional conversation is highly recommended."}
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link href="/dashboard">
                                <Button className="w-full h-14 rounded-2xl font-bold shadow-xl shadow-primary/20">
                                    Return to Dashboard
                                </Button>
                            </Link>
                            {score > 9 && (
                                <Link href="/dashboard/crisis">
                                    <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold transition-all">
                                        Immediate Support <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-muted/30 border border-primary/10 flex gap-4 text-xs font-medium text-muted-foreground leading-relaxed">
                        <Info className="w-5 h-5 flex-shrink-0 text-primary" />
                        <p>This is a screening reflection tool, not a medical diagnosis. Your data is encrypted and private to your account.</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative pb-20 pt-10 px-6 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        Wellness Check
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                        Private <span className="text-primary">Reflection</span>
                    </h1>
                    <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden mt-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </motion.div>

                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card glass rounded-[2.5rem] p-10 md:p-14 border border-primary/10 shadow-premium space-y-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                        <Sparkles size={250} />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                            {QUESTIONS[currentQuestionIndex].text}
                        </h2>
                    </div>

                    <div className="grid gap-4">
                        {OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleOptionSelect(opt.value)}
                                className={`w-full group text-left p-6 md:p-8 rounded-[2rem] border transition-all relative ${answers[currentQuestionIndex] === opt.value
                                    ? "bg-primary border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                                    : "bg-muted/30 border-primary/5 hover:border-primary/30 hover:bg-muted/50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-base md:text-lg font-bold ${answers[currentQuestionIndex] === opt.value ? "text-white" : "text-foreground"}`}>
                                        {opt.label}
                                    </span>
                                    {answers[currentQuestionIndex] === opt.value && (
                                        <CheckCircle2 size={24} className="text-white" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-primary/10">
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            disabled={currentQuestionIndex === 0}
                            className="h-12 px-6 rounded-xl font-bold text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="mr-2" size={18} /> Previous
                        </Button>

                        {currentQuestionIndex === QUESTIONS.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={answers[currentQuestionIndex] === -1 || isSubmitting}
                                className="h-14 px-10 rounded-2xl font-bold shadow-xl shadow-primary/20"
                            >
                                {isSubmitting ? "Processing..." : "Finish reflection"} <ArrowRight className="ml-2" size={18} />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                disabled={answers[currentQuestionIndex] === -1}
                                className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/10 transition-all active:scale-95"
                            >
                                Next <ChevronRight className="ml-1" size={18} />
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
