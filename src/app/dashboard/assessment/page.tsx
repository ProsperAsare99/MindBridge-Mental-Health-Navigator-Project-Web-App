"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

// PHQ-9 Questions
const QUESTIONS = [
    {
        id: 1,
        text: "Little interest or pleasure in doing things",
    },
    {
        id: 2,
        text: "Feeling down, depressed, or hopeless",
    },
    {
        id: 3,
        text: "Trouble falling or staying asleep, or sleeping too much",
    },
    {
        id: 4,
        text: "Feeling tired or having little energy",
    },
    {
        id: 5,
        text: "Poor appetite or overeating",
    },
    {
        id: 6,
        text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    },
    {
        id: 7,
        text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    },
    {
        id: 8,
        text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    },
    {
        id: 9,
        text: "Thoughts that you would be better off dead or of hurting yourself in some way",
    },
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

        // Auto-advance after short delay if not last question
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300);
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

        if (totalScore <= 4) severityLevel = "None-minimal";
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
                // Save to Firestore
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
            // Show results anyway even if save fails
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
            <div className="min-h-screen relative font-sans text-white pb-20 pt-10 px-4">
                {/* We assume ShaderBackground is in Layout or we can add it here if needed, keeping it clean for now */}

                <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in zoom-in duration-700">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl mb-4 ring-2 ring-white/20 shadow-[0_0_30px_rgba(99,102,241,0.2)] backdrop-blur-xl">
                            <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Assessment Complete</h1>
                        <p className="text-indigo-100/90 text-lg font-medium">Here is your wellness snapshot based on your responses.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px] p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
                        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />

                        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3 mb-12">
                            <span className="text-sm font-black text-indigo-300 uppercase tracking-[0.3em] mb-2">Clinical Score</span>
                            <div className="relative">
                                <span className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">{score}</span>
                                <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full -z-10" />
                            </div>
                            <span className={`mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-base font-black border-2 transition-all ${severity === 'Severe' || severity === 'Moderately Severe' ? 'bg-red-500/20 text-red-100 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
                                severity === 'Moderate' ? 'bg-amber-500/20 text-amber-100 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]' :
                                    'bg-green-500/20 text-green-100 border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                }`}>
                                {severity === 'Severe' || severity === 'Moderately Severe' ? <AlertTriangle className="w-5 h-5" /> :
                                    severity === 'Moderate' ? <Info className="w-5 h-5" /> :
                                        <CheckCircle2 className="w-5 h-5" />}
                                {severity} Depression Severity
                            </span>
                        </div>

                        <div className="space-y-6 text-center max-w-lg mx-auto relative z-10">
                            <p className="text-lg md:text-xl text-indigo-100/90 leading-relaxed font-medium">
                                {severity === 'None-minimal' && "Your responses suggest you're doing well, with few or no symptoms of depression. Keep practicing good self-care!"}
                                {severity === 'Mild' && "You may be experiencing some mild symptoms. It might be helpful to monitor your mood and practice stress-reduction techniques."}
                                {severity === 'Moderate' && "Your responses suggest moderate symptoms. Consider reaching out to a counselor or using our self-help resources to manage these feelings."}
                                {(severity === 'Moderately Severe' || severity === 'Severe') && "Your responses indicate significant symptoms. We strongly recommend speaking with a mental health professional for support."}
                            </p>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-4 relative z-10">
                            <Link href="/dashboard" className="flex-1">
                                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black h-16 rounded-2xl text-lg shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all">
                                    Continue Dashboard
                                </Button>
                            </Link>
                            {(severity === 'Moderately Severe' || severity === 'Severe' || severity === 'Moderate') && (
                                <Link href="/dashboard/crisis" className="flex-1">
                                    <Button variant="outline" className="w-full border-red-500/50 bg-red-500/10 text-red-100 hover:bg-red-500/20 h-16 rounded-2xl text-lg font-black transition-all">
                                        Immediate Support
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex gap-4 text-base text-indigo-200/80 max-w-2xl mx-auto shadow-xl">
                        <AlertCircle className="w-6 h-6 flex-shrink-0 text-indigo-400" />
                        <p className="font-medium italic">This assessment is for screening purposes only and is not a medical diagnosis. Please consult a professional for a clinical evaluation.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative font-sans text-white pb-20 pt-10 px-4 flex flex-col items-center">

            <div className="w-full max-w-3xl mb-8 flex items-center justify-between px-2">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white bg-white/5 hover:bg-white/10 h-10 px-4 rounded-xl font-bold">
                    <ChevronLeft className="w-5 h-5 mr-1" /> Exit Quiz
                </Button>
                <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                    <span className="text-sm font-black text-indigo-100 uppercase tracking-widest">Step {currentQuestionIndex + 1} <span className="text-white/40">/ {QUESTIONS.length}</span></span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-3xl h-3 bg-white/5 rounded-full mb-12 overflow-hidden border border-white/10">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-700 ease-out"
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[40px] p-10 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-500 key={currentQuestionIndex}">
                <h2 className="text-xl md:text-2xl font-black italic mb-6 text-indigo-300 opacity-80 uppercase tracking-widest">
                    Frequency Check
                </h2>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-14 block min-h-[6rem] leading-tight">
                    {QUESTIONS[currentQuestionIndex].id}. {QUESTIONS[currentQuestionIndex].text}?
                </h3>

                <div className="grid gap-4">
                    {OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                            className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border-2 flex items-center justify-between group relative overflow-hidden
                        ${answers[currentQuestionIndex] === option.value
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-700 border-white/40 shadow-[0_10px_30px_rgba(99,102,241,0.4)] scale-[1.03] z-10'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:pl-8'
                                }
                    `}
                        >
                            <span className={`font-black text-xl italic tracking-tight ${answers[currentQuestionIndex] === option.value ? 'text-white' : 'text-indigo-100 group-hover:text-white'}`}>
                                {option.label}
                            </span>
                            {answers[currentQuestionIndex] === option.value && (
                                <CheckCircle2 className="w-8 h-8 text-white animate-in zoom-in spin-in-90 duration-500" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
                        </button>
                    ))}
                </div>

                <div className="mt-14 flex justify-between items-center px-2">
                    <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="text-white bg-white/5 hover:bg-white/10 h-14 px-8 rounded-2xl font-black disabled:opacity-20 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6 mr-2" /> Back
                    </Button>
                    {currentQuestionIndex === QUESTIONS.length - 1 ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={answers.includes(-1) || isSubmitting}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black h-14 px-10 rounded-2xl text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing...
                                </span>
                            ) : "Confirm & Results"}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={answers[currentQuestionIndex] === -1}
                            className={`h-14 px-10 rounded-2xl font-black text-lg transition-all ${answers[currentQuestionIndex] === -1
                                ? "bg-white/5 text-white/40 border border-white/10"
                                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105"}`}
                        >
                            Next <ChevronRight className="w-6 h-6 ml-2" />
                        </Button>
                    )}
                </div>
            </div>

        </div>
    );
}
