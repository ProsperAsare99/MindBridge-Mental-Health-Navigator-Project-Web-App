"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
    ChevronLeft, 
    Wind, 
    Sparkles, 
    Play, 
    Pause, 
    RefreshCcw,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function ZenModePage() {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [timer, setTimer] = useState(0);
    const [cycles, setCycles] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [rewarding, setRewarding] = useState(false);

    // 4-7-8 Breathing Technique
    const PHASES = {
        inhale: 4,
        hold: 7,
        exhale: 8
    };

    useEffect(() => {
        let interval: any;
        if (isActive && !isComplete) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    const currentLimit = PHASES[phase];
                    if (prev >= currentLimit) {
                        // Switch phase
                        if (phase === 'inhale') setPhase('hold');
                        else if (phase === 'hold') setPhase('exhale');
                        else {
                            setPhase('inhale');
                            setCycles((c) => c + 1);
                        }
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }

        // Complete after 4 cycles (approx. 1.5 minutes)
        if (cycles >= 4 && !isComplete) {
            handleCompletion();
        }

        return () => clearInterval(interval);
    }, [isActive, phase, cycles, isComplete]);

    const handleCompletion = async () => {
        setIsActive(false);
        setIsComplete(true);
        setRewarding(true);
        try {
            // Reward 50 XP for completing a session
            await api.post('/gamification/reward', { 
                type: 'MEDITATION_COMPLETE',
                xp: 50 
            });
        } catch (err) {
            console.error('Failed to claim Zen reward:', err);
        } finally {
            setRewarding(false);
        }
    };

    const toggleZen = () => {
        setIsActive(!isActive);
        if (isComplete) {
            setIsComplete(false);
            setCycles(0);
            setTimer(0);
            setPhase('inhale');
        }
    };

    const getPhaseMessage = () => {
        if (!isActive && !isComplete) return "Ready to center yourself?";
        if (isComplete) return "Peace attained.";
        if (phase === 'inhale') return "Breathe in deeply...";
        if (phase === 'hold') return "Hold the still point...";
        return "Release slowly...";
    };

    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
            {/* Immersive Breathing Circle Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                                scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 0.8,
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ 
                                duration: PHASES[phase],
                                ease: phase === 'inhale' ? "easeOut" : phase === 'exhale' ? "easeIn" : "linear"
                            }}
                            className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
                        />
                    )}
                </AnimatePresence>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent_70%)]" />
            </div>

            {/* Navigation */}
            <div className="absolute top-10 left-10 z-20">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="rounded-2xl hover:bg-primary/10 text-primary gap-2 font-black uppercase text-[10px] tracking-widest"
                >
                    <ChevronLeft size={18} /> Exit Presence
                </Button>
            </div>

            {/* Main Interactive Core */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-20">
                <div className="text-center space-y-4">
                    <motion.h2 
                        key={getPhaseMessage()}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase"
                    >
                        {getPhaseMessage()}
                    </motion.h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-60">
                        {isActive ? `Cycle ${cycles + 1} of 4` : "4-7-8 Breathing Technique"}
                    </p>
                </div>

                {/* The Breathing Orb */}
                <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
                    <motion.div
                        animate={{ 
                            scale: phase === 'inhale' && isActive ? 1.2 : phase === 'hold' && isActive ? 1.2 : 0.9,
                        }}
                        transition={{ 
                            duration: isActive ? PHASES[phase] : 2,
                            repeat: !isActive ? Infinity : 0,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="relative h-full w-full rounded-full border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.1)] overflow-hidden glass transition-colors"
                        style={{ 
                            borderColor: phase === 'hold' ? 'rgba(var(--primary), 0.4)' : 'rgba(var(--primary), 0.2)' 
                        }}
                    >
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle 
                                cx="50%" cy="50%" r="48%" 
                                className="fill-none stroke-primary/5 stroke-[4]"
                            />
                            {isActive && (
                                <motion.circle 
                                    cx="50%" cy="50%" r="48%" 
                                    className="fill-none stroke-primary stroke-[4]"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: timer / PHASES[phase] }}
                                    transition={{ duration: 0.5, ease: "linear" }}
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>

                        <div className="text-center">
                            {isComplete ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-primary flex flex-col items-center gap-4"
                                >
                                    <CheckCircle2 size={64} strokeWidth={1} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">+50 Wellness XP</span>
                                </motion.div>
                            ) : (
                                <span className="text-4xl md:text-6xl font-thin text-primary/80 font-mono tracking-tighter">
                                    {isActive ? PHASES[phase] - timer : "00"}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Outer Pulse Rings */}
                    <AnimatePresence>
                        {isActive && phase === 'inhale' && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 4 }}
                                className="absolute inset-0 border border-primary/10 rounded-full"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <Button
                        onClick={toggleZen}
                        className={`h-20 w-20 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
                            isActive ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                        }`}
                    >
                        {isActive ? <Pause size={32} fill="currentColor" /> : isComplete ? <RefreshCcw size={32} /> : <Play size={32} className="ml-1" fill="currentColor" />}
                    </Button>
                </div>
            </div>

            {/* Achievement Toast (Mockup for now) */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-20 bg-card border border-primary/20 p-6 rounded-[2rem] flex items-center gap-6 shadow-premium scale-90 md:scale-100"
                    >
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-foreground uppercase tracking-tight">Presense Mastered</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Your garden health has improved</p>
                        </div>
                        <Button 
                            variant="primary" 
                            size="sm" 
                            className="rounded-xl font-black uppercase text-[10px] tracking-widest px-6"
                            onClick={() => router.push('/dashboard/garden')}
                        >
                            Visit Garden
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint */}
            <div className="absolute bottom-10 text-center opacity-30">
                <p className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Inhale (4s) • Hold (7s) • Exhale (8s)</p>
            </div>
        </div>
    );
}
