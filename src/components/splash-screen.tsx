"use client";

import React, { useState, useEffect } from "react";

interface SplashScreenProps {
    onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [phase, setPhase] = useState<"enter" | "glow" | "exit">("enter");

    useEffect(() => {
        // Phase 1: Logo enters (0 → 1500ms)
        const glowTimer = setTimeout(() => setPhase("glow"), 1500);
        // Phase 2: Logo glows and pulses (1500ms → 5000ms)
        const exitTimer = setTimeout(() => setPhase("exit"), 5000);
        // Phase 3: Exit animation (5000ms → 6000ms), then unmount
        const completeTimer = setTimeout(() => onComplete(), 6000);

        return () => {
            clearTimeout(glowTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a1a] transition-all duration-1000 ${phase === "exit" ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
        >
            {/* Ambient glow rings */}
            <div
                className={`absolute w-[500px] h-[500px] rounded-full transition-all duration-[2000ms] ${phase === "enter"
                    ? "scale-0 opacity-0"
                    : "scale-100 opacity-100"
                    }`}
                style={{
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
                }}
            />
            <div
                className={`absolute w-[800px] h-[800px] rounded-full transition-all duration-[2500ms] delay-300 ${phase === "enter"
                    ? "scale-0 opacity-0"
                    : "scale-100 opacity-100"
                    }`}
                style={{
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
                }}
            />

            {/* Floating particles */}
            {phase !== "enter" && (
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-indigo-400/40 animate-float-particle"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Logo icon */}
            <div
                className={`relative mb-8 transition-all duration-1000 ease-out ${phase === "enter"
                    ? "scale-0 rotate-180 opacity-0"
                    : phase === "glow"
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-150 rotate-0 opacity-0"
                    }`}
            >
                <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                    <div className="h-8 w-8 rounded-full bg-white/90 shadow-inner" />
                    {/* Glow effect */}
                    <div
                        className={`absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 blur-xl transition-opacity duration-1000 -z-10 ${phase === "glow" ? "opacity-60 animate-pulse" : "opacity-0"
                            }`}
                    />
                </div>
            </div>

            {/* Logo text */}
            <div
                className={`transition-all duration-1000 delay-300 ease-out ${phase === "enter"
                    ? "translate-y-8 opacity-0"
                    : phase === "glow"
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                    }`}
            >
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
                    MindBridge
                </h1>
            </div>

            {/* Tagline */}
            <div
                className={`transition-all duration-700 delay-700 ease-out ${phase === "enter"
                    ? "translate-y-6 opacity-0"
                    : phase === "glow"
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                    }`}
            >
                <p className="mt-4 text-lg text-indigo-300/60 font-medium tracking-widest uppercase">
                    Mental Health Navigator
                </p>
            </div>

            {/* Loading bar */}
            <div className="absolute bottom-16 w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all ease-linear ${phase === "enter"
                        ? "w-0 duration-[1500ms]"
                        : phase === "glow"
                            ? "w-3/4 duration-[3500ms]"
                            : "w-full duration-[1000ms]"
                        }`}
                />
            </div>
        </div>
    );
}
