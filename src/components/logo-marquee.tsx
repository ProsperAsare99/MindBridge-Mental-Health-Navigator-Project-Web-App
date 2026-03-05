"use client";

import React from "react";

const marqueeItems = [
    "MindBridge",
    "✦",
    "Mental Health Navigator",
    "✦",
    "Your Mind Understood",
    "✦",
    "Context-Aware Support",
    "✦",
    "Mood Tracking",
    "✦",
    "AI-Powered Guidance",
    "✦",
    "Crisis Resources",
    "✦",
    "Confidential",
    "✦",
];

export default function LogoMarquee() {
    return (
        <div className="relative z-10 overflow-hidden border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="flex animate-marquee whitespace-nowrap py-4">
                {/* Render items twice for seamless loop */}
                {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                    <span
                        key={i}
                        className={`mx-6 text-sm font-medium tracking-wider uppercase ${item === "✦"
                                ? "text-indigo-400/60 text-xs"
                                : item === "MindBridge"
                                    ? "text-indigo-300 font-bold"
                                    : "text-white/30"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
