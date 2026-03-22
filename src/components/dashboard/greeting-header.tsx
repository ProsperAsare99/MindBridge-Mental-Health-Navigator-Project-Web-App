"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface GreetingHeaderProps {
  displayName?: string;
}

export function GreetingHeader({ displayName }: GreetingHeaderProps) {
  const [greeting, setGreeting] = useState("Good day");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    setDateStr(new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    }));
  }, []);

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase"
      >
        <Calendar className="h-3 w-3" />
        {dateStr}
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        {greeting}, <span className="text-primary">{displayName || "Student"}</span>
      </h1>
      <p className="text-muted-foreground font-medium max-w-md">
        Welcome back. Here's how your mental well-being is trending today.
      </p>
    </div>
  );
}
