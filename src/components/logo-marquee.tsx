"use client";

import React, { useState, useEffect } from "react";

const words = ["MindBridge", "Navigate", "Thrive", "Heal"];

export default function LogoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
                setIsTransitioning(false);
            }, 400);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 group cursor-pointer">
            {/* Animated logo icon */}
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-110 transition-all duration-300">
                <div className="h-3.5 w-3.5 rounded-full bg-white/90 shadow-sm" />
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-xl bg-indigo-400/20 animate-ping opacity-30" />
            </div>

            {/* Carousel text */}
            <div className="h-8 overflow-hidden relative">
                <div
                    className={`transition-all duration-400 ease-in-out ${isTransitioning
                            ? "opacity-0 -translate-y-2 blur-sm"
                            : "opacity-100 translate-y-0 blur-0"
                        }`}
                >
                    <span className="block text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300 leading-8 h-8">
                        {words[currentIndex]}
                    </span>
                </div>
            </div>
        </div>
    );
}
