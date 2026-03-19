"use client";

import React from "react";
import { useSensors } from "@/components/providers/SensorProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Activity, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const LiveContextPanel = () => {
    const { locationData, motionData } = useSensors();

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Area Tracking Card */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden glass border-primary/10 bg-primary/5 p-6 rounded-[2rem] flex items-center justify-between group"
            >
                <div className="flex items-center gap-5 relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors shadow-inner">
                        <Compass className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-1">Current Area</div>
                        <h4 className="text-xl font-black text-foreground tracking-tight">{locationData.area}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Live Optimization Active</span>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[-10%] top-[-20%] opacity-5 group-hover:opacity-10 transition-opacity">
                    <Compass size={120} className="text-primary" />
                </div>
            </motion.div>

            {/* Motion & Activity Card */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden glass border-secondary/10 bg-secondary/5 p-6 rounded-[2rem] flex items-center justify-between group"
            >
                <div className="flex items-center gap-5 relative z-10">
                    <div className={cn(
                        "h-14 w-14 rounded-2xl border transition-all duration-700 flex items-center justify-center shadow-inner",
                        motionData.isMoving 
                            ? "bg-amber-400/10 border-amber-400/30 ring-4 ring-amber-400/5" 
                            : "bg-white/5 border-white/10"
                    )}>
                        <Activity className={cn(
                            "h-7 w-7 transition-colors duration-700",
                            motionData.isMoving ? "text-amber-400 animate-pulse" : "text-primary"
                        )} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/60 mb-1">Physical Pulse</div>
                        <h4 className="text-xl font-black text-foreground tracking-tight">
                            {motionData.isMoving ? `Motion: ${motionData.speed}` : "State: Stationary"}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5">
                            <Zap className={cn("h-3 w-3", motionData.isMoving ? "text-amber-400" : "text-muted-foreground/40")} />
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                {motionData.isMoving ? "Kinetic Energy Detected" : "Low Impact Mode"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[-10%] top-[-20%] opacity-5 group-hover:opacity-10 transition-opacity">
                    <Activity size={120} className="text-secondary" />
                </div>
            </motion.div>
        </div>
    );
};
