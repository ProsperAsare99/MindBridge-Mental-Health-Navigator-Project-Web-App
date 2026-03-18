"use client";

import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export function AuroraBackground({ 
  primaryColor = "bg-primary/5", 
  secondaryColor = "bg-foreground/5" 
}: AuroraBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full ${primaryColor} blur-[130px] will-change-transform`}
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute bottom-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full ${secondaryColor} blur-[130px]`}
      />
    </div>
  );
}
