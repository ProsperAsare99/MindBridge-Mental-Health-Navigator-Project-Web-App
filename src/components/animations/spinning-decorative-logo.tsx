"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export function SpinningDecorativeLogo() {
  return (
    <div className="aspect-square rounded-[3rem] bg-primary/5 border border-primary/20 overflow-hidden glass p-8 flex items-center justify-center relative">
       <Logo size="lg" className="scale-150 opacity-20 grayscale" />
       <motion.div 
         animate={{ 
           rotate: 360,
           scale: [1, 1.1, 1]
         }}
         transition={{ 
           rotate: { duration: 20, repeat: Infinity, ease: "linear" },
           scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
         }}
         className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full m-12"
       />
    </div>
  );
}
