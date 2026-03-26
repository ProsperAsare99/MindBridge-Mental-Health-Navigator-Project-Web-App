"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EMOTIONS = [
  { label: "Radiant", color: "fill-amber-400", stroke: "stroke-amber-600", bg: "bg-amber-400", description: "Joy & Energy" },
  { label: "Serene", color: "fill-emerald-500", stroke: "stroke-emerald-700", bg: "bg-emerald-500", description: "Peace & Calm" },
  { label: "Melancholy", color: "fill-indigo-500", stroke: "stroke-indigo-700", bg: "bg-indigo-500", description: "Reflection" },
  { label: "Anxious", color: "fill-orange-500", stroke: "stroke-orange-700", bg: "bg-orange-500", description: "Tension" },
  { label: "Frustrated", color: "fill-rose-500", stroke: "stroke-rose-700", bg: "bg-rose-500", description: "Impatience" },
  { label: "Grateful", color: "fill-pink-500", stroke: "stroke-pink-700", bg: "bg-pink-500", description: "Warmth" },
  { label: "Empty", color: "fill-slate-500", stroke: "stroke-slate-700", bg: "bg-slate-500", description: "Low Drive" },
  { label: "Empowered", color: "fill-violet-600", stroke: "stroke-violet-800", bg: "bg-violet-600", description: "Strength" },
];

interface EmotionWheelProps {
  onSelect: (emotion: string) => void;
  selectedEmotion?: string | null;
}

export function EmotionWheel({ onSelect, selectedEmotion }: EmotionWheelProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 110;
  const outerRadius = 160;
  const segmentAngle = 360 / EMOTIONS.length;

  const currentSelection = hovered || selectedEmotion;
  const selectedData = EMOTIONS.find(e => e.label === currentSelection);

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full">
      <div className="relative" style={{ width, height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full rotate-[-22.5deg]">
          {EMOTIONS.map((emotion, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            
            // Middle angle for label placement
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = outerRadius + 20;
            const lx = centerX + labelRadius * Math.cos((midAngle * Math.PI) / 180);
            const ly = centerY + labelRadius * Math.sin((midAngle * Math.PI) / 180);

            // Cartesian for path
            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

            const ox1 = centerX + outerRadius * Math.cos((startAngle * Math.PI) / 180);
            const oy1 = centerY + outerRadius * Math.sin((startAngle * Math.PI) / 180);
            const ox2 = centerX + outerRadius * Math.cos((endAngle * Math.PI) / 180);
            const oy2 = centerY + outerRadius * Math.sin((endAngle * Math.PI) / 180);

            const isSelected = selectedEmotion === emotion.label;
            const isHovered = hovered === emotion.label;

            return (
              <g key={emotion.label}>
                <motion.path
                  d={`M ${x1} ${y1} L ${ox1} ${oy1} A ${outerRadius} ${outerRadius} 0 0 1 ${ox2} ${oy2} L ${x2} ${y2} A ${radius} ${radius} 0 0 0 ${x1} ${y1} Z`}
                  className={cn(
                    "cursor-pointer transition-all duration-300 stroke-[4px]",
                    emotion.color,
                    emotion.stroke,
                    isSelected || isHovered ? "opacity-100 scale-[1.05] shadow-xl" : "opacity-60 hover:opacity-100"
                  )}
                  style={{ 
                    transformOrigin: `${centerX}px ${centerY}px`,
                    filter: isSelected || isHovered ? "drop-shadow(0 0 8px rgba(0,0,0,0.2))" : "none"
                  }}
                  onMouseEnter={() => setHovered(emotion.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(emotion.label)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isSelected || isHovered ? 1 : 0.6 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
                />
                
                {/* Segment Labels */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    "font-extrabold text-[10px] uppercase tracking-tighter transition-all duration-300 pointer-events-none drop-shadow-sm",
                    isSelected || isHovered ? "fill-foreground scale-110" : "fill-muted-foreground/60"
                  )}
                  style={{ 
                    transform: `rotate(${22.5}deg)`,
                    transformOrigin: `${lx}px ${ly}px`
                  }}
                >
                  {emotion.label}
                </text>
              </g>
            );
          })}
          
          {/* Centered Integrated Circle */}
          <motion.circle 
            cx={centerX} 
            cy={centerY} 
            r={radius - 5} 
            className={cn(
              "transition-colors duration-500 stroke-[5px] stroke-background shadow-premium",
              selectedData ? selectedData.color : "fill-muted/10"
            )}
            animate={{ 
              scale: currentSelection ? [1, 1.03, 1] : 1,
              opacity: currentSelection ? 1 : 0.8 
            }}
            transition={{ repeat: currentSelection ? Infinity : 0, duration: 3 }}
          />

          <text 
            x={centerX} 
            y={centerY} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={cn(
               "font-black text-[12px] uppercase tracking-[0.3em] transform rotate-[22.5deg] shadow-sm pointer-events-none transition-colors duration-300",
               selectedData ? "fill-white" : "fill-muted-foreground/40"
            )}
          >
            {currentSelection ? "" : "Select"}
          </text>
        </svg>

        {/* Floating Detail Overlay */}
        <AnimatePresence mode="wait">
          {currentSelection && (
            <motion.div
              key={currentSelection} // unique key for AnimatePresence
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="text-center space-y-0.5 transform rotate-[22.5deg]">
                <p className="text-sm font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                   {currentSelection}
                </p>
                <p className="text-[8px] font-black text-white/90 uppercase tracking-tighter drop-shadow-md">
                   {selectedData?.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
