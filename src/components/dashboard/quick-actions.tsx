"use client";

import { 
    PlusCircle, 
    ClipboardList, 
    ShieldAlert, 
    BookOpen, 
    Brain,
    Calendar,
    Phone,
    Heart
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ACTIONS = [
    { label: "Log Mood", icon: PlusCircle, href: "/dashboard/mood", color: "text-primary", bgColor: "bg-primary/10" },
    { label: "Assessment", icon: ClipboardList, href: "/dashboard/assessment", color: "text-secondary", bgColor: "bg-secondary/10" },
    { label: "Resources", icon: BookOpen, href: "/dashboard/resources", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { label: "Crisis Info", icon: ShieldAlert, href: "/dashboard/crisis", color: "text-[#D5BDAF]", bgColor: "bg-[#D5BDAF]/10" },
];

export function QuickActions() {
    return (
        <div className="space-y-6">
            <h3 className="text-sm font-black text-foreground uppercase tracking-tight">Quick Navigator</h3>
            <div className="grid grid-cols-2 gap-4">
                {ACTIONS.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Link key={action.label} href={action.href}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group p-5 rounded-3xl glass border border-border/40 hover:border-border/80 transition-all cursor-pointer flex flex-col items-center justify-center gap-3"
                            >
                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", action.bgColor)}>
                                    <Icon className={cn("h-6 w-6", action.color)} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                                    {action.label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
            <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Brain size={20} />
                </div>
                <div className="flex-1">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Pro Tip</span>
                    <p className="text-[9px] font-bold text-muted-foreground leading-tight italic">
                        regular check-ins increase self-awareness by 40%. keep tracking!
                    </p>
                </div>
            </div>
        </div>
    );
}
