"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function Select({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className,
    icon,
}: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full bg-muted/30 dark:bg-card border border-primary/20 rounded-2xl py-4 pl-12 pr-10 text-sm font-medium text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-between text-foreground",
                    isOpen && "ring-2 ring-primary/20 border-primary/20 shadow-lg shadow-primary/5"
                )}
            >
                <div className="flex items-center gap-3 truncate">
                    {icon && <span className="text-muted-foreground">{icon}</span>}
                    <span className={cn("truncate font-semibold", !selectedOption && "text-muted-foreground")}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180 text-primary"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-[100] w-full mt-2 bg-white dark:bg-[#1c1c1e] border-2 border-primary rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto py-2 bg-white dark:bg-[#1c1c1e]">
                            <div className="px-5 py-1 text-[10px] font-black text-primary/50 uppercase tracking-widest border-b border-primary/10 mb-2">
                                MindBridge Custom Select
                            </div>
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-5 py-4 text-sm font-black text-left transition-all flex items-center justify-between",
                                        value === option.value
                                            ? "bg-primary text-white"
                                            : "text-black dark:text-white hover:bg-primary/20 hover:text-primary"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {value === option.value && (
                                        <Check className="h-5 w-5 text-white" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
