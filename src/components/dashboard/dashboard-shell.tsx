"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BarChart3,
    BookOpen,
    Phone,
    LogOut,
    Menu,
    X,
    UserCircle,
    Settings,
    Heart,
    ClipboardList,
    Sparkles,
    Search,
    ShieldCheck,
    Info
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/components/providers/SearchProvider";
import { DistressButton } from "@/components/ui/distress-button";

interface DashboardShellProps {
    children: React.ReactNode;
    user: any;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { toggle } = useSearch();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/assessment", label: "Assessment", icon: ClipboardList },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
        { href: "/dashboard/profile", label: "My Profile", icon: UserCircle },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen relative font-sans text-foreground bg-background selection:bg-primary/20 overflow-x-hidden">
            {/* Background Accents (Aurora Style) */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-5%] right-[-5%] h-[40%] w-[40%] rounded-full bg-foreground/5 blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        x: [0, -30, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-5%] left-[-5%] h-[40%] w-[40%] rounded-full bg-foreground/5 blur-[120px]" 
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-primary/10 bg-background/80 backdrop-blur-2xl transition-all duration-500 ease-[0.23,1,0.32,1] lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-20 items-center justify-between px-6">
                    <Link href="/dashboard" className="flex items-center gap-3 outline-none">
                        <Logo size="sm" />
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100vh-5rem)]">
                    {/* Search Trigger */}
                    <div className="px-4 mb-4">
                        <Button 
                            variant="outline" 
                            className="w-full justify-start gap-4 h-12 rounded-2xl bg-primary/5 border-primary/10 hover:bg-primary/10 hover:border-primary/20 text-muted-foreground hover:text-primary transition-all group"
                            onClick={() => {
                                setIsSidebarOpen(false);
                                toggle();
                            }}
                        >
                            <Search className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold tracking-tight">Search...</span>
                            <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-background border border-border text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                ⌘K
                            </div>
                        </Button>
                    </div>

                    {/* Scrollable Nav Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-0 space-y-1 custom-scrollbar">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 relative group",
                                        isActive
                                            ? "text-primary bg-primary/5 shadow-premium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                    )}
                                >
                                    <Icon className={cn("h-4.5 w-4.5", isActive ? "text-primary border-primary" : "opacity-60")} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute left-0 w-1 h-5 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Bottom Fixed Area */}
                    <div className="p-4 space-y-4 border-t border-primary/5">
                        {/* Profile Card Mini - Hide for anonymous or no user */}
                        {user && !user.isAnonymous && (
                            <div className="p-3 rounded-2xl bg-muted/20 border border-primary/5 backdrop-blur-md hover:bg-muted/40 hover:border-primary/10 transition-all duration-300 group">
                                <div
                                    onClick={() => router.push("/dashboard/profile")}
                                    className="flex items-center gap-3 mb-3 cursor-pointer"
                                >
                                    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold group-hover:scale-105 transition-transform overflow-hidden">
                                        {user.image ? (
                                            <img
                                                src={user.image.startsWith('http') ? user.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${user.image}`}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            user.name ? user.name[0].toUpperCase() : <UserCircle className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="truncate text-[13px] font-bold text-foreground group-hover:text-primary transition-colors">{user.name || "Student"}</p>
                                        <div className="flex items-center gap-1">
                                            <div className="h-1 w-1 rounded-full bg-green-500" />
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                                    <ModeToggle />
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">
                                            <Settings className="h-3.5 w-3.5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest border-t border-primary/5 pt-4">
                            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-500/70 hover:text-red-600 hover:bg-red-500/5 rounded-xl h-10 font-bold px-4 text-xs tracking-tight"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-3 h-3.5 w-3.5" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 relative z-10 min-h-screen transition-all duration-500">
                {/* Topbar (Mobile) */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background/80 px-8 backdrop-blur-2xl border-b border-primary/5 lg:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-foreground">
                        <Menu className="h-6 w-6" />
                    </button>
                    
                    {/* Mobile Search Button */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggle}
                        className="rounded-full hover:bg-primary/5"
                    >
                        <Search className="h-5 w-5 text-muted-foreground" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                            {user?.image ? (
                                <img
                                    src={user.image.startsWith('http') ? user.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${user.image}`}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Heart className="h-4 w-4 text-white" />
                            )}
                        </div>
                    </div>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="animate-in fade-in duration-1000">
                    {children}
                </main>
                <DistressButton />
            </div>
        </div>
    );
}
