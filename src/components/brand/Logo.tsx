"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    videoSrc?: string;
    showText?: boolean;
}

/**
 * Premium Brand Logo for MindBridge
 * Recreated from user's Canva design with support for MP4 video backgrounds.
 */
export function Logo({
    className,
    iconOnly = false,
    size = "md",
    videoSrc,
    showText = true
}: LogoProps) {
    const containerSizes = {
        sm: "h-8 w-8 rounded-lg",
        md: "h-11 w-11 rounded-xl",
        lg: "h-16 w-16 rounded-2xl",
        xl: "h-32 w-32 rounded-[2.5rem]"
    };

    const iconSizes = {
        sm: "h-5 w-5",
        md: "h-7 w-7",
        lg: "h-10 w-10",
        xl: "h-20 w-20"
    };

    const textSizes = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-7xl"
    };

    return (
        <div className={cn("flex items-center gap-4 group", className)}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative flex items-center justify-center overflow-hidden transition-[transform,background-color,border-color,box-shadow] duration-500 shadow-premium border border-primary/5",
                    containerSizes[size],
                    videoSrc ? "bg-black" : "bg-foreground/[0.08] group-hover:bg-foreground/[0.12] dark:bg-primary/10 dark:group-hover:bg-primary/20"
                )}
            >
                {/* MP4 Video Logo Support */}
                {videoSrc && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}

                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-1 pointer-events-none" />

                {/* Brain SVG Icon (Refined Line Art from Image) */}
                <svg
                    viewBox="0 0 100 100"
                    className={cn("relative z-10 drop-shadow-xl", iconSizes[size])}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Left Side - Mind (Adaptive Grey Line Art) */}
                    <g stroke="currentColor" className="text-muted-foreground/60 dark:text-[#D1D5DB]" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M48 30C40 30 34 36 34 44C34 46.5 35 49 37 51" />
                        <path d="M37 51C34 53 32 57 32 62C32 71 39 78 48 78" />
                        <path d="M48 30V78" opacity="0.5" />
                        {/* Squiggle detail */}
                        <path d="M40 44C40 42 42 41 44 41" strokeWidth="2.5" opacity="0.6" />
                        <path d="M38 62C38 64 40 65 42 65" strokeWidth="2.5" opacity="0.6" />
                    </g>

                    {/* Right Side - Bridge (Adaptive Brand Art) */}
                    <g stroke="currentColor" className="text-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M52 30C60 30 66 36 66 44C66 46.5 65 49 63 51" />
                        <path d="M63 51C66 53 68 57 68 62C68 71 61 78 52 78" />
                        <path d="M52 30V78" opacity="0.5" />
                        {/* Squiggle detail */}
                        <path d="M60 44C60 42 58 41 56 41" strokeWidth="2.5" opacity="0.7" />
                        <path d="M62 62C62 64 60 65 58 65" strokeWidth="2.5" opacity="0.7" />
                    </g>
                </svg>
            </motion.div>

            {!iconOnly && showText && (
                <div className="flex flex-col leading-none">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("font-serif font-black tracking-tight flex items-baseline", textSizes[size])}
                    >
                        <span className="text-foreground/90">Mind</span>
                        <span className="text-primary">Bridge</span>
                    </motion.div>
                    {size === "xl" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs font-bold uppercase tracking-[0.5em] text-muted-foreground mt-2 ml-1"
                        >
                            Wellness Navigator
                        </motion.p>
                    )}
                </div>
            )}
        </div>
    );
}
