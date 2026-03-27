"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = 'CALM' | 'ENERGY' | 'STABILITY' | 'DEFAULT';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    isAdaptive: boolean;
    toggleAdaptive: () => void;
    suggestedMode: ThemeMode | null;
    applySuggestedMode: () => void;
    dismissSuggestion: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function AdaptiveThemeProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [mode, setMode] = useState<ThemeMode>('DEFAULT');
    const [isAdaptive, setIsAdaptive] = useState<boolean>(true);
    const [suggestedMode, setSuggestedMode] = useState<ThemeMode | null>(null);

    // Load preference from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('adaptive-theme-enabled');
        if (saved !== null) {
            setIsAdaptive(saved === 'true');
        }
    }, []);

    const toggleAdaptive = () => {
        const newValue = !isAdaptive;
        setIsAdaptive(newValue);
        localStorage.setItem('adaptive-theme-enabled', newValue.toString());
        if (!newValue) {
            setMode('DEFAULT');
            setSuggestedMode(null);
        }
    };

    const applySuggestedMode = () => {
        if (suggestedMode) {
            setMode(suggestedMode);
            setSuggestedMode(null);
        }
    };

    const dismissSuggestion = () => {
        setSuggestedMode(null);
    };

    useEffect(() => {
        if (!user || !isAdaptive) {
            if (!isAdaptive) setMode('DEFAULT');
            return;
        }

        const updateTheme = async () => {
            try {
                const moods = await api.get('/moods');
                if (moods.length > 0) {
                    const latest = moods[0];
                    const now = new Date();
                    const hour = now.getHours();

                    let detectedMode: ThemeMode = 'DEFAULT';
                    // Logic for Adaptive UI
                    if (latest.mood <= 2) {
                        detectedMode = 'CALM'; // Softer colors for low mood
                    } else if (latest.mood >= 4 && (hour > 6 && hour < 18)) {
                        detectedMode = 'ENERGY'; // Vibrant Cyan/Sky for good mood
                    } else if (hour >= 22 || hour < 5) {
                        detectedMode = 'STABILITY'; // Deep, protective colors for late night
                    }

                    // If detected mode is different from current, suggest it
                    if (detectedMode !== mode && detectedMode !== 'DEFAULT') {
                        setSuggestedMode(detectedMode);
                    } else if (detectedMode === 'DEFAULT' || detectedMode === mode) {
                        setSuggestedMode(null);
                    }
                }
            } catch (error) {
                console.error("Theme sync error:", error);
            }
        };

        updateTheme();
        const interval = setInterval(updateTheme, 1000 * 60 * 15); // Every 15 mins
        return () => clearInterval(interval);
    }, [user, isAdaptive, mode]);

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Map modes to CSS variables - Premium, brand-consistent palettes
        const themes = {
            CALM: {
                '--primary': '#0077b6', // Original Ocean Blue
                '--accent': '#00b4d8',
                '--dashboard-bg-gradient': 'linear-gradient(to bottom right, hsl(210, 40%, 96%), hsl(180, 20%, 94%))',
                '--glass-bg': 'rgba(255, 255, 255, 0.65)',
                '--card-shadow': '0 8px 30px rgba(0, 119, 182, 0.05)'
            },
            ENERGY: {
                '--primary': '#0284c7', // Sky Blue 600
                '--accent': '#38bdf8', // Sky Blue 400
                '--dashboard-bg-gradient': 'linear-gradient(to bottom right, hsl(190, 60%, 96%), hsl(200, 50%, 94%))',
                '--glass-bg': 'rgba(255, 255, 255, 0.7)',
                '--card-shadow': '0 8px 30px rgba(2, 132, 199, 0.08)'
            },
            STABILITY: {
                '--primary': '#6366f1', // Indigo 500
                '--accent': '#818cf8', // Indigo 400
                '--dashboard-bg-gradient': 'linear-gradient(to bottom right, hsl(260, 20%, 95%), hsl(240, 20%, 92%))',
                '--glass-bg': 'rgba(255, 255, 255, 0.6)',
                '--card-shadow': '0 8px 30px rgba(99, 102, 241, 0.05)'
            },
            DEFAULT: {}
        };

        // Dark mode adjustments for atmospheric gradients
        if (typeof window !== 'undefined' && window.document.documentElement.classList.contains('dark')) {
            (themes.CALM as any)['--dashboard-bg-gradient'] = 'linear-gradient(to bottom right, #0a1118, #070e14)';
            (themes.ENERGY as any)['--dashboard-bg-gradient'] = 'linear-gradient(to bottom right, #071219, #050d12)';
            (themes.STABILITY as any)['--dashboard-bg-gradient'] = 'linear-gradient(to bottom right, #0f0a1d, #090614)';
            (themes.CALM as any)['--glass-bg'] = 'rgba(20, 20, 21, 0.8)';
            (themes.ENERGY as any)['--glass-bg'] = 'rgba(20, 20, 21, 0.8)';
            (themes.STABILITY as any)['--glass-bg'] = 'rgba(20, 20, 21, 0.8)';
        }

        const currentTheme = themes[mode] as any;
        if (mode !== 'DEFAULT' && isAdaptive) {
            Object.entries(currentTheme).forEach(([key, value]) => {
                root.style.setProperty(key, value as string);
            });
        } else {
            // Comprehensive Reset to defaults
            const propsToRemove = [
                '--primary', '--accent', '--ring', '--dashboard-bg-gradient',
                '--glass-bg', '--card-shadow'
            ];
            propsToRemove.forEach(prop => root.style.removeProperty(prop));
        }
    }, [mode, isAdaptive]);

    return (
        <ThemeContext.Provider value={{ 
            mode, 
            setMode, 
            isAdaptive, 
            toggleAdaptive, 
            suggestedMode, 
            applySuggestedMode, 
            dismissSuggestion 
        }}>
            {children}
            <AnimatePresence>
                <ThemeSuggestionToast />
            </AnimatePresence>
        </ThemeContext.Provider>
    );
}

// Internal Suggestion Component
// Internal Suggestion Component
function ThemeSuggestionToast() {
    const { suggestedMode, applySuggestedMode, dismissSuggestion, isAdaptive } = useAdaptiveTheme();
    if (!suggestedMode || suggestedMode === 'DEFAULT' || !isAdaptive) return null;

    const themeDetails = {
        CALM: { name: 'Calm Mode', icon: '🌊', desc: 'Softer colors to support your wellness.' },
        ENERGY: { name: 'Energy Mode', icon: '✨', desc: 'Vibrant tones to match your positive energy.' },
        STABILITY: { name: 'Stability Mode', icon: '🌌', desc: 'Protective deep tones for late-night focus.' }
    }[suggestedMode as 'CALM' | 'ENERGY' | 'STABILITY'];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={dismissSuggestion}
                className="absolute inset-0 bg-background/40 backdrop-blur-sm"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative glass p-8 rounded-[2.5rem] shadow-2xl border border-primary/20 max-w-md w-full flex flex-col gap-6 text-center"
            >
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner">
                    {themeDetails.icon}
                </div>
                
                <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tight text-foreground">
                        Switch to {themeDetails.name}?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {themeDetails.desc} We&apos;ve noticed your state and prepared a tailored experience to support you.
                    </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button 
                        onClick={applySuggestedMode}
                        className="flex-1 bg-primary text-primary-foreground py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Apply Theme
                    </button>
                    <button 
                        onClick={dismissSuggestion}
                        className="flex-1 bg-muted/50 text-foreground py-3.5 px-6 rounded-2xl font-bold text-sm hover:bg-muted transition-all active:scale-95"
                    >
                        Maintain Default
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export const useAdaptiveTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useAdaptiveTheme must be used within AdaptiveThemeProvider");
    return context;
};
