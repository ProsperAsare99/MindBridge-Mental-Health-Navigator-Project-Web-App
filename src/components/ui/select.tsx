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
                    "w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-10 text-sm font-medium text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 flex items-center justify-between text-foreground placeholder:text-muted-foreground/50",
                    isOpen && "ring-2 ring-primary/20 border-primary/20 shadow-premium"
                )}
            >
                <div className="flex items-center gap-3 truncate">
                    {icon && <span className="text-muted-foreground group-focus-within:text-primary transition-colors">{icon}</span>}
                    <span className={cn("truncate font-semibold", !selectedOption && "text-muted-foreground/50")}>
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
                        className="absolute z-[100] w-full mt-2 glass border border-border rounded-2xl shadow-premium overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto py-2">
                            <div className="px-5 py-2 text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] border-b border-border/50 mb-2">
                                MindBridge Selection
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
                                        "w-full px-5 py-3.5 text-sm font-bold text-left transition-all flex items-center justify-between group",
                                        value === option.value
                                            ? "bg-primary text-primary-foreground"
                                            : "text-foreground hover:bg-primary/10 hover:text-primary"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {value === option.value && (
                                        <Check className="h-4 w-4 text-primary-foreground" />
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
