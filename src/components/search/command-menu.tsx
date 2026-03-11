"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, X, ArrowRight, MessageSquare, BookOpen, ShieldAlert, Sparkles } from "lucide-react";
import { useSearch } from "@/components/providers/SearchProvider";
import { useRouter } from "next/navigation";

const QUICK_LINKS = [
  { title: "Crisis Support", href: "/dashboard/crisis", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  { title: "Mental Health Resources", href: "/dashboard/resources", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Live Chat Support", href: "/support", icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
  { title: "University Services", href: "/dashboard", icon: Sparkles, color: "text-secondary", bg: "bg-secondary/10" },
];

export function CommandMenu() {
  const { isOpen, setIsOpen } = useSearch();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
    }
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 md:px-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-[2.5rem] shadow-2xl overflow-hidden glass"
          >
            <div className="p-6 border-b border-primary/10 flex items-center gap-4">
              <Search className="h-6 w-6 text-primary animate-pulse" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, topics, or help..."
                className="w-full bg-transparent border-none outline-none text-xl font-medium placeholder:text-muted-foreground/50"
              />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary/60">
                <Command className="h-3 w-3" /> K
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8 p-4">
                {/* Suggestions Section */}
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6 px-2">Quick Navigation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUICK_LINKS.map((link) => (
                      <button
                        key={link.title}
                        onClick={() => handleNavigate(link.href)}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all group text-left"
                      >
                        <div className={`h-12 w-12 rounded-xl ${link.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <link.icon className={`h-6 w-6 ${link.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-foreground">{link.title}</div>
                          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Navigate to Page</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </section>

                {/* Helpful Tip Section */}
                <section className="p-6 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm group-hover:opacity-20 transition-opacity">
                    <Sparkles size={100} className="text-primary" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Pro Tip
                  </h4>
                  <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                    Try searching for things like "Exam anxiety", "Better sleep", or "Talk to a counselor" for instant recommendations.
                  </p>
                </section>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border-t border-primary/10 flex justify-between items-center px-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                MindBridge Global Search
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-[10px] font-bold text-primary/60">Ghana's First Context-Aware AI Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
