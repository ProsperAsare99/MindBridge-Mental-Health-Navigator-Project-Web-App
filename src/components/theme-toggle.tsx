"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useAdaptiveTheme } from "@/components/providers/AdaptiveThemeProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    const { isAdaptive, toggleAdaptive } = useAdaptiveTheme();
    const [mounted, setMounted] = useState(false);

    // Effect to handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="flex bg-muted/50 rounded-full p-1 border border-border/40 w-[160px] h-10 animate-pulse" />
    );

    const OPTIONS = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'system', icon: Monitor, label: 'System' },
        { id: 'adaptive', icon: Sparkles, label: 'Adaptive' }
    ];

    const handleSelect = (id: string) => {
        if (id === 'adaptive') {
            if (!isAdaptive) toggleAdaptive();
        } else {
            if (isAdaptive) toggleAdaptive();
            setTheme(id);
        }
    };

    return (
        <div className="bg-muted/80 backdrop-blur-md rounded-full p-0.5 border border-border/50 flex items-center gap-0.5 shadow-inner relative overflow-hidden h-9 w-[160px]">
            {OPTIONS.map((opt) => {
                const isActive = opt.id === 'adaptive' ? isAdaptive : (!isAdaptive && theme === opt.id);
                const Icon = opt.icon;
                return (
                    <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        title={opt.label}
                        className={cn(
                            "flex-1 flex items-center justify-center h-full rounded-full transition-all duration-300 relative z-10 p-1.5",
                            isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon size={14} className={cn("transition-transform", isActive ? "scale-110" : "scale-100")} />
                        
                        {isActive && (
                            <motion.div
                                layoutId="theme-active-pill"
                                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
