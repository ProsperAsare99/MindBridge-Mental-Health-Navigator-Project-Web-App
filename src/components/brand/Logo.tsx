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
                    "relative flex items-center justify-center overflow-hidden transition-all duration-500 shadow-premium border border-primary/5",
                    containerSizes[size],
                    videoSrc ? "bg-black" : "bg-[#0A1A1A] group-hover:bg-[#0D2424]"
                )}
            >
                {/* MP4 Video Logo Support */}
                {videoSrc && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}

                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-1 pointer-events-none" />

                {/* Brain SVG Icon (Recreated from Canva) */}
                <svg
                    viewBox="0 0 100 100"
                    className={cn("relative z-10 drop-shadow-2xl", iconSizes[size])}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Left Hemisphere (Mind) */}
                    <path
                        d="M48 25C38 25 30 33 30 42C30 45 31 48 33 51C30 54 28 58 28 63C28 72 36 80 45 80C46 80 47 80 48 79.5V25Z"
                        fill="#F5F5F5"
                        fillOpacity="0.95"
                    />
                    <path
                        d="M48 15C32 15 20 27 20 42C20 45 20.5 48 21.5 51C18.5 55 17 60 17 65C17 76 25 85 36 85C37.5 85 39 84.5 40.5 84C42.5 87.5 46 90 50 90V15H48Z"
                        fill="#F5F5F5"
                        fillOpacity="0.15"
                    />

                    {/* Right Hemisphere (Bridge) */}
                    <path
                        d="M52 25C62 25 70 33 70 42C70 45 69 48 67 51C70 54 72 58 72 63C72 72 64 80 55 80C54 80 53 80 52 79.5V25Z"
                        fill="#00D2D2"
                    />
                    <path
                        d="M52 15C68 15 80 27 80 42C80 45 79.5 48 78.5 51C81.5 55 83 60 83 65C83 76 75 85 64 85C62.5 85 61 84.5 59.5 84C57.5 87.5 54 90 50 90V15H52Z"
                        fill="#00D2D2"
                        fillOpacity="0.2"
                    />

                    {/* Detailed Brain Patterns (Accent squiggles) */}
                    <path d="M40 38C40 36 42 35 44 35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                    <path d="M60 38C60 36 58 35 56 35" stroke="#E0FFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                    <path d="M38 65C38 67 40 68 42 68" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                    <path d="M62 65C62 67 60 68 58 68" stroke="#E0FFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
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
                        <span className="text-[#00D2D2]">Bridge</span>
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
