"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, AlertCircle, Info, Activity, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

// PHQ-9 Questions
const QUESTIONS = [
    { id: 1, text: "Having little interest or pleasure in doing things" },
    { id: 2, text: "Feeling down, depressed, or hopeless" },
    { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: 4, text: "Feeling tired or having little energy" },
    { id: 5, text: "Poor appetite or overeating" },
    { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
    { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
    { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
    { id: 9, text: "Thoughts that you would be better off dead or of hurting yourself in some way" },
];

const OPTIONS = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
];

export default function AssessmentPage() {
    const { user } = useAuth();
    const router = useRouter();

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
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 600); // 600ms delay for auto-advance
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateResults = () => {
        const totalScore = answers.reduce((a, b) => a + (b === -1 ? 0 : b), 0);
        let severityLevel = "";

        if (totalScore <= 4) severityLevel = "Minimal";
        else if (totalScore <= 9) severityLevel = "Mild";
        else if (totalScore <= 14) severityLevel = "Moderate";
        else if (totalScore <= 19) severityLevel = "Moderately Severe";
        else severityLevel = "Severe";

        return { totalScore, severityLevel };
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const { totalScore, severityLevel } = calculateResults();
        setScore(totalScore);
        setSeverity(severityLevel);

        try {
            if (user) {
                await addDoc(collection(db, `users/${user.uid}/assessments`), {
                    type: 'PHQ-9',
                    score: totalScore,
                    answers: answers,
                    severity: severityLevel,
                    timestamp: serverTimestamp(),
                });
            }
            setShowResults(true);
        } catch (error) {
            console.error("Error saving assessment:", error);
            setShowResults(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getProgress = () => {
        return ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    };

    if (showResults) {
        return (
            <div className="min-h-screen pb-20 pt-10 px-6 md:px-10 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000">
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center justify-center h-28 w-28 bg-white/5 rounded-[3rem] mb-6 border border-white/5 shadow-2xl shadow-black/40 overflow-hidden soft-glow-bg backdrop-blur-xl">
                        <CheckCircle2 className="w-12 h-12 text-sage" />
                    </div>
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-linen">Assessment <span className="text-sage italic font-serif lowercase font-normal opacity-90">complete.</span></h1>
                    <p className="text-linen/40 text-xl font-bold italic tracking-tight max-w-lg mx-auto leading-relaxed">Results archived. Your health resonance is being analyzed in real-time.</p>
                </div>

                <div className="glass-card rounded-[4rem] p-12 md:p-20 relative overflow-hidden group border-white/5 bg-black/20">
                    <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 mb-16 border-b border-white/5 pb-16">
                        <span className="text-[10px] font-black text-linen/20 uppercase tracking-[0.6em]">Integrated Resonance Score</span>
                        <div className="relative">
                            <span className="text-[10rem] font-extrabold text-linen tracking-tighter leading-none opacity-90">{score}</span>
                            <div className="absolute -inset-12 bg-sage/5 blur-[100px] rounded-full -z-10 animate-soft-glow" />
                        </div>
                        <div className={`mt-12 inline-flex items-center gap-5 px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] border transition-all shadow-2xl shadow-black/40 ${severity === 'Severe' || severity === 'Moderately Severe' ? 'bg-red-500/10 text-red-100 border-red-500/20' :
                            severity === 'Moderate' ? 'bg-amber-500/10 text-amber-100 border-amber-500/20' :
                                'bg-sage/10 text-linen border-sage/20'
                            }`}>
                            {severity === 'Severe' || severity === 'Moderately Severe' ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
                                severity === 'Moderate' ? <Info className="w-5 h-5 text-amber-400" /> :
                                    <Activity className="w-5 h-5 text-sage" />}
                            {severity} Spectrum Detected
                        </div>
                    </div>

                    <div className="space-y-10 text-center max-w-2xl mx-auto relative z-10">
                        <p className="text-2xl md:text-3xl text-linen/80 leading-relaxed font-bold italic font-serif opacity-90">
                            &ldquo;{severity === 'Minimal' && "Your responses suggest you're operating at peak resonance. Maintain this balance through consistent self-reflection."}
                            {severity === 'Mild' && "Minor frequency irregularities detected. Monitoring your cognitive patterns and intentional rest could be beneficial."}
                            {severity === 'Moderate' && "Moderate resonance disruption. We recommend consulting with a Navigator or exploring our focused library resources."}
                            {(severity === 'Moderately Severe' || severity === 'Severe') && "Significant frequency deviation detected. For your safety, we strongly recommend establishing an immediate connection with a professional."}&rdquo;
                        </p>
                    </div>

                    <div className="mt-20 flex flex-col sm:flex-row gap-8 relative z-10">
                        <Link href="/dashboard" className="flex-1">
                            <Button size="xl" className="w-full shadow-2xl shadow-black/40">
                                Return Overview
                            </Button>
                        </Link>
                        {(severity === 'Moderately Severe' || severity === 'Severe' || severity === 'Moderate') && (
                            <Link href="/dashboard/crisis" className="flex-1">
                                <Button variant="outline" size="xl" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-red-400 shadow-xl shadow-black/40">
                                    Direct Support
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-white/5 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 flex gap-8 text-md text-linen/40 max-w-3xl mx-auto items-center">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                        <AlertCircle className="w-6 h-6 text-sage" />
                    </div>
                    <p className="font-medium italic leading-relaxed">This diagnostic tool is for screening and is not a clinical medical diagnosis. Please consult a healthcare professional for primary evaluation.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-10 px-6 flex flex-col items-center max-w-5xl mx-auto animate-in fade-in duration-1000">
            <div className="w-full mb-16 flex items-center justify-between">
                <Button variant="ghost" onClick={() => router.back()} className="text-linen/20 hover:text-linen h-14 px-8 rounded-full font-black text-[10px] uppercase tracking-[0.5em] hover:bg-white/5 transition-all">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Abort Scan
                </Button>
                <div className="px-8 py-3 rounded-full bg-white/5 border border-white/5 shadow-2xl shadow-black/20 flex items-center gap-4 backdrop-blur-md">
                    <Sparkles size={14} className="text-sage" />
                    <span className="text-[10px] font-black text-sage uppercase tracking-[0.5em]">Node {currentQuestionIndex + 1} <span className="text-linen/10">/ {QUESTIONS.length}</span></span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full mb-20 overflow-hidden border border-white/5 shadow-inner">
                <div
                    className="h-full bg-sage transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(85,115,115,0.4)]"
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            <div className="w-full glass-card rounded-[4.5rem] p-12 md:p-20 relative overflow-hidden soft-glow-bg bg-black/20 border-white/5 animate-in slide-in-from-bottom-8 duration-1000">
                <div className="relative z-10 space-y-16">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/5 text-sage text-[10px] font-black uppercase tracking-widest border border-white/5">
                            <Heart size={14} className="fill-sage/20" /> Empathy Node Sync
                        </div>
                        <h3 className="text-4xl md:text-6xl font-extrabold text-linen leading-tight tracking-tight max-w-3xl opacity-90">
                            {QUESTIONS[currentQuestionIndex].id}. {QUESTIONS[currentQuestionIndex].text}?
                        </h3>
                    </div>

                    <div className="grid gap-8">
                        {OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleOptionSelect(option.value)}
                                className={`w-full p-12 rounded-[3rem] text-left transition-all duration-700 border flex items-center justify-between group relative overflow-hidden
                            ${answers[currentQuestionIndex] === option.value
                                        ? 'bg-sage/10 text-linen border-sage/40 shadow-2xl shadow-black/40 scale-[1.02]'
                                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10 hover:translate-x-3'
                                    }
                        `}
                            >
                                <span className={`font-bold text-2xl ${answers[currentQuestionIndex] === option.value ? 'text-linen' : 'text-linen/40'} transition-all duration-500`}>
                                    {option.label}
                                </span>
                                <div className={`h-10 w-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${answers[currentQuestionIndex] === option.value ? 'bg-sage border-sage shadow-[0_0_15px_rgba(85,115,115,0.4)]' : 'border-white/10 bg-white/5'
                                    }`}>
                                    {answers[currentQuestionIndex] === option.value && <div className="h-5 w-5 rounded-full bg-white animate-in zoom-in-50 duration-500" />}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-20 pt-16 border-t border-white/5 flex justify-between items-center px-6">
                        <Button
                            variant="ghost"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="text-linen/20 hover:text-linen h-16 px-10 rounded-full font-black text-[10px] uppercase tracking-[0.5em] disabled:opacity-5 transition-all hover:bg-white/5"
                        >
                            <ChevronLeft className="w-5 h-5 mr-3" /> Back
                        </Button>
                        {currentQuestionIndex === QUESTIONS.length - 1 ? (
                            <Button
                                size="xl"
                                onClick={handleSubmit}
                                disabled={answers.includes(-1) || isSubmitting}
                                className="shadow-2xl shadow-black/40 transition-all active:scale-95"
                            >
                                {isSubmitting ? "Synthesizing Node..." : "Analyze Results"}
                            </Button>
                        ) : (
                            <Button
                                size="xl"
                                onClick={handleNext}
                                disabled={answers[currentQuestionIndex] === -1}
                                className={`transition-all ${answers[currentQuestionIndex] === -1
                                    ? "bg-white/5 text-linen/10 border-transparent opacity-20"
                                    : "bg-sage text-linen hover:bg-sage/90 hover:scale-105 shadow-2xl shadow-black/40"}`}
                            >
                                Next <ChevronRight className="w-6 h-6 ml-3" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <p className="mt-16 text-[10px] font-black uppercase tracking-[1em] text-linen/10">Clinical Protocol PHQ-9 Node 2.2</p>
        </div>
    );
}
