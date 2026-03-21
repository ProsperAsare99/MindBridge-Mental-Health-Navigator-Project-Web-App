"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { 
    MessageSquare, 
    Calendar, 
    ChevronRight, 
    Clock,
    Search,
    History
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessage {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: string;
}

export function ConversationHistory() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const history = await api.get('/ai/history');
            setMessages(history);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMessages = messages.filter(m => 
        m.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Grouping messages by date for a better UI
    const groupedMessages = filteredMessages.reduce((groups: { [key: string]: ChatMessage[] }, message) => {
        const date = format(new Date(message.createdAt), 'PPP');
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <History className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Wisdom Path</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Past Conversations</p>
                    </div>
                </div>
                
                <div className="relative group max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-muted/30 border border-border/50 rounded-xl py-2 pl-9 pr-4 text-[10px] font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.keys(groupedMessages).length === 0 ? (
                    <div className="text-center py-12 space-y-4 bg-muted/20 rounded-[2rem] border border-dashed border-border">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No history found</p>
                    </div>
                ) : (
                    Object.entries(groupedMessages).map(([date, msgs]) => (
                        <div key={date} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest whitespace-nowrap">{date}</span>
                                <div className="h-px w-full bg-border/40" />
                            </div>
                            
                            <div className="grid gap-3">
                                {msgs.map((m) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all hover:shadow-md",
                                            m.role === 'user' 
                                                ? "bg-muted/30 border-border/40 ml-8" 
                                                : "bg-card border-primary/10 mr-8"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-xs font-medium text-foreground/80 leading-relaxed">
                                                {m.content}
                                            </p>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                                                    {format(new Date(m.createdAt), 'p')}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
