"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    achievement: {
        title: string;
        description: string;
        type: string;
    } | null;
}

const ConfettiParticle = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 400 - 200;
    const randomY = - (Math.random() * 400 + 100);
    const randomRotate = Math.random() * 360;
    const colors = ['bg-primary', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{ 
                x: randomX, 
                y: randomY, 
                scale: [0, 1, 0.5], 
                rotate: randomRotate,
                opacity: [1, 1, 0]
            }}
            transition={{ duration: 2, delay, ease: "easeOut" }}
            className={cn("absolute w-2 h-2 rounded-sm", color)}
        />
    );
};

export const CelebrationModal = ({ isOpen, onClose, achievement }: CelebrationModalProps) => {
    const [particles, setParticles] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen) {
            setParticles(Array.from({ length: 40 }, (_, i) => i));
        } else {
            setParticles([]);
        }
    }, [isOpen]);

    if (!achievement) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/40 backdrop-blur-2xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 40 }}
                        className="relative w-full max-w-[400px] glass rounded-[3rem] border-primary/20 shadow-[0_0_100px_-20px_rgba(0,119,182,0.3)] overflow-hidden text-center p-8 space-y-6"
                    >
                        {/* Confetti Spawner */}
                        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
                            {particles.map((p) => (
                                <ConfettiParticle key={p} delay={p * 0.02} />
                            ))}
                        </div>

                        <div className="relative">
                            {/* Animated Icon */}
                            <motion.div
                                animate={{ 
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-primary to-sky-400 mx-auto flex items-center justify-center shadow-xl shadow-primary/20"
                            >
                                <Trophy className="h-12 w-12 text-white" />
                            </motion.div>

                            {/* Floating Awards */}
                            <motion.div
                                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-2 left-1/4 text-amber-400"
                            >
                                <Award size={20} fill="currentColor" />
                            </motion.div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Achievement Unlocked!</span>
                            <h2 className="text-3xl font-black text-foreground tracking-tight">{achievement.title}</h2>
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed px-4">
                                {achievement.description}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button 
                                onClick={onClose}
                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 active:scale-95 transition-all"
                            >
                                Phenomenal!
                            </Button>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-4">You're making incredible progress</p>
                        </div>

                        {/* Close button top right */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors opacity-50 hover:opacity-100"
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
