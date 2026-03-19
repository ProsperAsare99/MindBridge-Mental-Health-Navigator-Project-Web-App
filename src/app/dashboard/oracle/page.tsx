"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
    Send,
    Bot,
    User as UserIcon,
    Sparkles,
    Mic,
    MicOff,
    BrainCircuit,
    ChevronDown,
    AlertTriangle,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function OraclePage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            const history = await api.get('/oracle/history');
            setMessages(history);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await api.post('/oracle/chat', { message: userMessage });
            setMessages(prev => [...prev, { role: "assistant", content: res.response }]);
        } catch (error) {
            console.error("Oracle Error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "The Oracle is currently in deep meditation. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition is not supported.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.start();
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col relative overflow-hidden selection:bg-primary/20">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            {/* Header */}
            <header className="p-6 border-b border-border/40 bg-background/40 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                        <BrainCircuit className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-foreground/90 tracking-tight">The Oracle 2.0</h1>
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Adaptive Consciousness Active</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Crisis Protection On</span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronDown className="h-5 w-5 opacity-40" />
                    </Button>
                </div>
            </header>

            {/* Messages */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
            >
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto">
                        <div className="h-20 w-20 rounded-[2rem] bg-primary/5 flex items-center justify-center border border-primary/10">
                            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground/90 tracking-tighter">Your Mind, Reimagined.</h2>
                        <p className="text-sm text-muted-foreground font-medium">I am your context-aware navigator. Share your thoughts, feelings, or recent stressors.</p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {["Feeling overwhelmed", "Academic stress", "Need a breathing exercise", "Just to talk"].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setInput(s)}
                                    className="px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-[10px] font-bold text-muted-foreground hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {messages.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-2",
                            m.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm",
                            m.role === "assistant" ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted border-border text-muted-foreground"
                        )}>
                            {m.role === "assistant" ? <Bot size={20} /> : <UserIcon size={20} />}
                        </div>
                        <div className={cn(
                            "space-y-2 p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed tracking-tight group relative",
                            m.role === "assistant" ? "bg-card border border-border shadow-premium text-foreground/90" : "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                        )}>
                            {m.content}
                            {m.role === "assistant" && m.content.toLowerCase().includes("crisis") && (
                                <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Priority Support Recommended</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 animate-pulse">
                            <Bot size={20} />
                        </div>
                        <div className="p-5 rounded-[1.5rem] bg-card border border-border shadow-premium flex gap-1.5 items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce delay-75" />
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce delay-150" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-6 bg-background/40 backdrop-blur-xl border-t border-border/40">
                <div className="max-w-4xl mx-auto flex items-end gap-3 p-2 rounded-[2rem] bg-muted/30 border border-border/50 shadow-inner group transition-all focus-within:border-primary/20 focus-within:ring-4 focus-within:ring-primary/5">
                    <button 
                        onClick={startListening}
                        className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center transition-all shrink-0",
                            isListening ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20" : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        )}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={isListening ? "Listening to your wisdom..." : "Whisper to the Oracle..."}
                        className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/50 text-sm font-medium py-3.5 max-h-32 resize-none overflow-y-auto"
                    />
                    <Button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="icon" 
                        className="h-12 w-12 rounded-full shadow-lg shadow-primary/20 shrink-0 transition-transform active:scale-95"
                    >
                        <Send size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
