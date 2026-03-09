"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Send,
    Loader2,
    User,
    Bot,
    History,
    PlusCircle,
    MessageSquare,
    Moon,
    Sun,
    Zap,
    Compass,
    Stars,
    Wind,
    ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
}

const SUGGESTED_PROMPTS = [
    { title: "Manage Stress", icon: Zap, prompt: "How can I better manage my academic stress this week?", color: "from-amber-500/20 to-orange-500/20" },
    { title: "Sleep Better", icon: Moon, prompt: "I'm having trouble sleeping. What can I do to improve my rest?", color: "from-indigo-500/20 to-blue-500/20" },
    { title: "Connect More", icon: MessageSquare, prompt: "I'm feeling a bit lonely on campus. How can I connect more?", color: "from-pink-500/20 to-rose-500/20" },
    { title: "Mindfulness", icon: Wind, prompt: "Give me a 5-minute mindfulness exercise for between classes.", color: "from-emerald-500/20 to-teal-500/20" }
];

export default function OraclePage() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(true);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                setShowScrollDown(scrollHeight - scrollTop - clientHeight > 100);
            }
        };
        const currentRef = scrollRef.current;
        currentRef?.addEventListener('scroll', handleScroll);
        return () => currentRef?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollRef.current && !showScrollDown) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, showScrollDown]);

    const fetchHistory = async () => {
        try {
            const h = await api.get('/ai/history');
            setMessages(h);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setIsFetchingHistory(false);
        }
    };

    const handleClearView = () => {
        setMessages([]);
    };

    const scrollToBottom = () => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    };

    const handleSend = async (e?: React.FormEvent | string) => {
        if (typeof e !== 'string') e?.preventDefault();

        const messageToSend = typeof e === 'string' ? e : input;
        if (!messageToSend.trim() || isLoading) return;

        setInput("");
        setIsLoading(true);

        const tempId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: tempId,
            content: messageToSend.trim(),
            role: 'user',
            createdAt: new Date().toISOString()
        }]);

        try {
            const res = await api.post('/ai/chat', { message: messageToSend.trim() });
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: res.response,
                role: 'assistant',
                createdAt: new Date().toISOString()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content: "I'm sorry, I seem to have lost my connection to the stars. Please try again soon.",
                role: 'assistant',
                createdAt: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-100px)] flex flex-col max-w-6xl mx-auto px-4 py-6 selection:bg-primary/30">
            {/* Animated Background Accents */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-secondary blur-[120px]"
                />
            </div>

            {/* Header */}
            <header className="flex items-center justify-between p-5 mb-6 bg-background/60 backdrop-blur-3xl rounded-[2.5rem] border border-primary/10 shadow-premium">
                <div className="flex items-center space-x-5">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-inner ring-1 ring-white/5">
                            <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-foreground tracking-tighter flex items-center gap-2">
                            The Oracle
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-widest border border-primary/10">AI Guide</span>
                        </h1>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-60">Insight · Empathy · Clarity</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearView}
                        className="rounded-2xl h-11 px-6 font-bold text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all text-xs uppercase cursor-pointer"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Path
                    </Button>
                    <div className="h-6 w-px bg-primary/10 mx-1 hidden sm:block"></div>
                    <Button variant="ghost" size="icon" className="rounded-2xl h-11 w-11 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all hidden sm:flex">
                        <History className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 relative mb-4">
                <main
                    ref={scrollRef}
                    className="absolute inset-0 overflow-y-auto px-4 py-8 space-y-10 scroll-smooth custom-scrollbar"
                >
                    <AnimatePresence mode="popLayout">
                        {isFetchingHistory ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-full"></div>
                                    <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
                                </div>
                                <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground animate-pulse">Consulting the Infinite</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-full py-12 text-center"
                            >
                                <div className="relative mb-12">
                                    <div className="absolute -inset-16 bg-primary/5 rounded-full blur-[100px]" />
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Stars className="relative text-primary/40 w-24 h-24 stroke-[1.5]" />
                                    </motion.div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">Your journey starts with a breath.</h2>
                                <p className="text-lg text-muted-foreground font-serif italic max-w-xl mx-auto mb-12 opacity-80 underline decoration-primary/20 decoration-2 underline-offset-8">
                                    How can I guide your thoughts today?
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
                                    {SUGGESTED_PROMPTS.map((item, idx) => (
                                        <motion.button
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSend(item.prompt)}
                                            className={cn(
                                                "flex items-start p-6 text-left border border-primary/5 rounded-[2rem] transition-all group relative overflow-hidden",
                                                "bg-background/40 backdrop-blur-md hover:bg-background/60 hover:border-primary/20 hover:shadow-premium"
                                            )}
                                        >
                                            <div className={cn("p-3 rounded-2xl bg-gradient-to-br mr-4 mt-0.5", item.color)}>
                                                <item.icon className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{item.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">"{item.prompt}"</p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="space-y-12 max-w-4xl mx-auto">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                                        className={cn(
                                            "flex group",
                                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                                        )}
                                    >
                                        <div className={cn(
                                            "flex gap-5 max-w-[90%] sm:max-w-[85%]",
                                            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                        )}>
                                            <div className={cn(
                                                "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border relative transition-transform group-hover:scale-105",
                                                msg.role === 'user'
                                                    ? "bg-primary text-white border-primary/20 rotate-3"
                                                    : "bg-surface-above border-primary/10 text-primary -rotate-3"
                                            )}>
                                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                                            </div>

                                            <div className={cn(
                                                "relative p-6 px-7 rounded-[2.5rem] text-base leading-relaxed transition-all shadow-premium",
                                                msg.role === 'user'
                                                    ? "bg-primary/10 border border-primary/20 text-foreground rounded-tr-none"
                                                    : "bg-background/80 backdrop-blur-2xl text-foreground/90 border border-primary/10 rounded-tl-none font-sans"
                                            )}>
                                                <div className={cn(
                                                    "prose prose-invert prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tighter prose-p:my-2 overflow-hidden",
                                                    msg.role === 'assistant' ? "font-medium" : "font-semibold"
                                                )}>
                                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                </div>
                                                <div className={cn(
                                                    "mt-3 text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-40 transition-opacity flex items-center gap-2",
                                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                                )}>
                                                    <div className="w-4 h-[1px] bg-foreground/20" />
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex justify-start items-center gap-4 pl-1"
                                    >
                                        <div className="w-11 h-11 rounded-2xl bg-surface-above border border-primary/10 flex items-center justify-center text-primary/40 -rotate-3">
                                            <Bot className="w-6 h-6 animate-pulse" />
                                        </div>
                                        <div className="px-6 py-4 bg-background/40 backdrop-blur-md rounded-full border border-primary/5 shadow-inner">
                                            <div className="flex space-x-2">
                                                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-2 h-2 bg-primary rounded-full" />
                                                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                                                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </main>

                <AnimatePresence>
                    {showScrollDown && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={scrollToBottom}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-primary text-white rounded-full shadow-lg z-20 hover:scale-110 transition-transform active:scale-95"
                        >
                            <ArrowDown size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <footer className="mt-auto px-2">
                <form
                    onSubmit={handleSend}
                    className="relative group max-w-4xl mx-auto"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[2.5rem] blur opacity-40 group-focus-within:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-center bg-background/80 backdrop-blur-3xl border border-primary/20 rounded-[2.5rem] p-2 ring-1 ring-white/5 shadow-2xl">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Share your depths... (e.g., I'm feeling overwhelmed today)"
                            disabled={isLoading}
                            className="flex-1 bg-transparent border-none py-4 px-6 text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50 font-medium tracking-tight"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "group/btn relative mr-1 h-14 px-8 rounded-[1.8rem] bg-primary font-black text-white overflow-hidden transition-all active:scale-95",
                                "disabled:bg-muted disabled:text-muted-foreground disabled:grayscale disabled:opacity-30 disabled:hover:scale-100",
                                "hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-3 tracking-[0.15em] uppercase text-xs">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Consulting</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Summon</span>
                                        <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        </button>
                    </div>
                </form>
                <div className="mt-5 flex items-center justify-center gap-3">
                    <div className="h-px w-8 bg-primary/20" />
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] opacity-40">
                        Sanctuary of Reflection · Secure Wisdom Path
                    </span>
                    <div className="h-px w-8 bg-primary/20" />
                </div>
            </footer>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary), 0.2);
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
