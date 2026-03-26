"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Droplets } from 'lucide-react';

interface MoodGardenProps {
    level: number; // 1-5
    health: number; // 0-100
    plantType?: string; // 'oak', 'baobab', etc.
    className?: string;
}

export const MoodGarden = ({ level, health, plantType = 'oak', className }: MoodGardenProps) => {
    // Stage configurations
    const stages = [
        { label: 'Seedling', color: 'text-emerald-400' },
        { label: 'Sapling', color: 'text-emerald-500' },
        { label: 'Growth', color: 'text-sky-400' },
        { label: 'Mature', color: 'text-sky-500' },
        { label: 'Ancient', color: 'text-primary' }
    ];

    const currentStage = stages[Math.min(level - 1, 4)];
    const imagePath = `/images/garden/${plantType}/stage${Math.min(level, 5)}.png`;

    return (
        <div className={cn("relative group cursor-pointer", className)}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,119,182,0.1),transparent)] rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col items-center justify-center p-8 glass rounded-[3rem] border-white/10 shadow-premium overflow-hidden">
                {/* Soil/Base */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />

                {/* The Plant */}
                <motion.div
                    key={`${plantType}-${level}`}
                    initial={{ scale: 0.5, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="relative"
                >
                    <img 
                        src={imagePath} 
                        alt={currentStage.label}
                        className={cn(
                            "h-56 w-56 md:h-72 md:w-72 object-contain transition-all duration-1000",
                            health < 40 && "grayscale-[40%] opacity-80",
                            level === 5 && "drop-shadow-[0_0_30px_rgba(0,119,182,0.4)]"
                        )}
                    />
                    
                    {/* Floating Vitality Orbs */}
                    {health > 60 && (
                        <>
                            <motion.div
                                animate={{ y: [-10, -40, -10], opacity: [0, 0.6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 -right-4 h-6 w-6 bg-sky-400/20 rounded-full blur-xl"
                            />
                            <motion.div
                                animate={{ y: [0, -60, 0], opacity: [0, 0.4, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-1/2 -left-8 h-8 w-8 bg-primary/20 rounded-full blur-xl"
                            />
                        </>
                    )}
                </motion.div>

                {/* Stage Info */}
                <div className="mt-6 text-center space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Mood Garden Stage {level}</span>
                    <h3 className="text-xl font-black text-foreground">{currentStage.label}</h3>
                    
                    {/* Health Bar */}
                    <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden mt-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${health}%` }}
                            className="h-full bg-gradient-to-r from-sky-400 to-primary"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                        <Droplets className="h-3 w-3 text-sky-400" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{health}% Vitality</span>
                    </div>
                </div>

                {/* Growth Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[1, 2, 3].map((p) => (
                        <motion.div
                            key={p}
                            animate={{
                                y: [0, -40, -80],
                                x: [0, (p-2)*20, (p-2)*40],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 3 + p,
                                repeat: Infinity,
                                delay: p * 1.5,
                                ease: "easeOut"
                            }}
                            className="absolute bottom-20 left-1/2 h-1 w-1 bg-sky-400/50 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
