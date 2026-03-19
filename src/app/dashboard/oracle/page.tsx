"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BrainCircuit,
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
    Wind,
    ArrowDown,
    Activity,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSensors } from "@/components/providers/SensorProvider";

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
    suggestions?: string[];
}

const SUGGESTED_PROMPTS = [
    { title: "Manage Stress", icon: Zap, prompt: "How can I better manage my academic stress this week?", color: "from-amber-500/20 to-orange-500/20" },
    { title: "Sleep Better", icon: Moon, prompt: "I'm having trouble sleeping. What can I do to improve my rest?", color: "from-zinc-500/20 to-primary/20" },
    { title: "Connect More", icon: MessageSquare, prompt: "I'm feeling a bit lonely on campus. How can I connect more?", color: "from-pink-500/20 to-rose-500/20" },
    { title: "Mindfulness", icon: Wind, prompt: "Give me a 5-minute mindfulness exercise for between classes.", color: "from-emerald-500/20 to-teal-500/20" }
];

export default function OraclePage() {
    const { locationData, motionData } = useSensors();
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

    const parseAIResponse = (text: string) => {
        const followUpMatch = text.match(/FOLLOW_UP:\s*(.*)/);
        let suggestions: string[] = [];
        let content = text;

        if (followUpMatch) {
            suggestions = followUpMatch[1].split('|').map(s => s.trim());
            content = text.split('FOLLOW_UP:')[0].trim();
        }

        return { content, suggestions };
    };

    const fetchHistory = async () => {
        try {
            const h = await api.get('/ai/history');
            const parsedHistory = h.map((msg: any) => {
                const { content, suggestions } = parseAIResponse(msg.content);
                return { ...msg, content, suggestions };
            });
            setMessages(parsedHistory);
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
        setMessages(prev => [...prev.map(m => ({ ...m, suggestions: [] })), {
            id: tempId,
            content: messageToSend.trim(),
            role: 'user',
            createdAt: new Date().toISOString()
        }]);

        try {
            const res = await api.post('/ai/chat', { 
                message: messageToSend.trim(),
                context: {
                    location: locationData.area,
                    motion: motionData.speed,
                    isMoving: motionData.isMoving
                }
            });
            const { content, suggestions } = parseAIResponse(res.response);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                content,
                role: 'assistant',
                suggestions,
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
            </div>

            {/* Header */}
            <header className="flex items-center justify-between p-5 mb-6 glass rounded-[2.5rem] shadow-premium">
                <div className="flex items-center space-x-5">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner ring-1 ring-white/5">
                            <BrainCircuit className="text-primary w-6 h-6 animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-foreground tracking-tighter flex items-center gap-2">
                            The Oracle
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-widest border border-primary/10">Interactive</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-1.5">
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">Wisdom · Guidance</p>
                            <div className="h-1 w-1 rounded-full bg-border" />
                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                                <Compass className="w-3 h-3 text-primary/60" />
                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">{locationData.area}</span>
                            </div>
                            {motionData.isMoving && (
                                <div className="flex items-center gap-1.5 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10 animate-pulse">
                                    <Activity className="w-3 h-3 text-primary" />
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{motionData.speed}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/mood">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-2xl h-11 px-6 font-bold text-xs uppercase"
                        >
                            <Activity className="w-4 h-4 mr-2" />
                            Vibe Check
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearView}
                        className="rounded-2xl h-11 px-6 font-bold text-muted-foreground hover:text-foreground text-xs uppercase cursor-pointer"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Session
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
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground animate-pulse">Consulting the Oracle...</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-full py-12 text-center"
                            >
                                <div className="relative mb-12">
                                    <BrainCircuit className="relative text-primary/40 w-24 h-24 stroke-[1.5]" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">What's on your mind?</h2>
                                <p className="text-lg text-muted-foreground font-serif italic max-w-xl mx-auto mb-12 opacity-80 decoration-primary/20 decoration-2 underline-offset-8">
                                    I am here to listen and guide.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
                                    {SUGGESTED_PROMPTS.map((item, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSend(item.prompt)}
                                            className="flex items-start p-6 text-left border border-border rounded-[2rem] bg-card/40 backdrop-blur-md hover:bg-card/60 hover:border-primary/20 hover:shadow-premium group transition-all"
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
                                    <div key={msg.id} className="space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
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
                                                    "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border relative transition-all",
                                                    msg.role === 'user'
                                                        ? "bg-primary text-primary-foreground border-primary/20"
                                                        : "bg-surface-above border-border text-primary"
                                                )}>
                                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                                                </div>

                                                <div className={cn(
                                                    "relative p-6 px-7 rounded-[2.5rem] text-base shadow-premium transition-all",
                                                    msg.role === 'user'
                                                        ? "bg-primary/10 border border-primary/20 text-foreground rounded-tr-none"
                                                        : "bg-background border border-border text-foreground/90 rounded-tl-none dark:bg-surface-above/50"
                                                )}>
                                                    <div className="prose dark:prose-invert prose-sm max-w-none">
                                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Suggestions for Assistant Messages */}
                                        {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex flex-wrap gap-2 ml-16"
                                            >
                                                {msg.suggestions.map((s, idx) => (
                                                    <Button
                                                        key={idx}
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSend(s)}
                                                        className="rounded-full bg-primary/5 border-primary/10 hover:bg-primary/10 text-xs font-semibold py-4"
                                                    >
                                                        {s}
                                                    </Button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <motion.div className="flex justify-start items-center gap-4 pl-1 animate-pulse">
                                        <div className="w-11 h-11 rounded-2xl bg-surface-above border border-primary/10 flex items-center justify-center text-primary/40">
                                            <Bot className="w-6 h-6" />
                                        </div>
                                        <div className="px-6 py-4 bg-background/40 backdrop-blur-md rounded-full border border-primary/5">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-75" />
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Input Area */}
            <footer className="mt-auto px-2">
                <form
                    onSubmit={handleSend}
                    className="relative group max-w-4xl mx-auto"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[2.5rem] blur opacity-40 group-focus-within:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-center glass rounded-[2.5rem] p-2 ring-1 ring-white/5 shadow-2xl">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Share your thoughts..."
                            disabled={isLoading}
                            className="flex-1 bg-transparent border-none py-4 px-6 text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 font-medium tracking-tight"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="relative mr-1 h-14 px-8 rounded-[1.8rem] bg-primary font-black text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-30 flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </div>
                </form>
            </footer>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary), 0.1); border-radius: 10px; }
            `}</style>
        </div>
    );
}
