"use client";

import React, { useState, useEffect } from "react";

const words = ["MindBridge", "Navigate", "Thrive", "Heal"];

export default function LogoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-indigo-400" />
            </div>
            <div className="h-7 overflow-hidden relative">
                <div
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${currentIndex * 28}px)` }}
                >
                    {words.map((word, i) => (
                        <span
                            key={i}
                            className="block text-xl font-semibold tracking-tight text-white/90 leading-7 h-7"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
