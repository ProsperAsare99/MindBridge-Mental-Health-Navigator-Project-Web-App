"use client";

import React, { useState, useCallback } from "react";
import SplashScreen from "@/components/splash-screen";

interface SplashWrapperProps {
    children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = useCallback(() => {
        setShowSplash(false);
    }, []);

    return (
        <>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <div
                className={`transition-opacity duration-700 ${showSplash ? "opacity-0" : "opacity-100"
                    }`}
            >
                {children}
            </div>
        </>
    );
}
