"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number;
    direction?: "up" | "down";
    className?: string;
    id?: string;
}

export default function ParallaxSection({
    children,
    speed = 0.3,
    direction = "up",
    className = "",
    id,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const factor = direction === "up" ? -1 : 1;
    const y = useTransform(scrollYProgress, [0, 1], [factor * 100 * speed, factor * -100 * speed]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} id={id} className={`relative ${className}`}>
            <motion.div style={{ y, opacity }}>
                {children}
            </motion.div>
        </div>
    );
}
