"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
    Heart
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
    };

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border-2 border-primary"
                    >
                        <Heart className="h-5 w-5 text-primary" />
                    </motion.div>
                    <p className="text-sm font-bold tracking-tight text-muted-foreground uppercase opacity-60">Preparing your space</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen relative font-sans text-foreground bg-background selection:bg-primary/20 overflow-x-hidden">
            {/* Soft Ambient Accents */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] h-[30%] w-[30%] rounded-full bg-primary/3 blur-[100px]" />
                <div className="absolute bottom-[-5%] left-[-5%] h-[30%] w-[30%] rounded-full bg-secondary/3 blur-[100px]" />
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
                "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-primary/10 bg-background/80 backdrop-blur-2xl transition-all duration-500 ease-[0.23,1,0.32,1] lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-20 items-center justify-between px-8">
                    <Link href="/dashboard" className="flex items-center gap-3 outline-none">
                        <Logo size="md" />
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-5.5rem)] px-6 pb-8">
                    <nav className="space-y-2 pt-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 relative group",
                                        isActive
                                            ? "text-primary bg-primary/5 shadow-premium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "opacity-60")} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="space-y-6">
                        {/* Profile Card Mini */}
                        <div className="p-4 rounded-3xl bg-muted/40 border border-primary/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                    {user.displayName ? user.displayName[0].toUpperCase() : <UserCircle className="h-6 w-6" />}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-bold text-foreground">{user.displayName || "Student"}</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                                <ModeToggle />
                                <Link href="/dashboard/settings">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500/80 hover:text-red-600 hover:bg-red-500/5 rounded-2xl h-12 font-bold px-6"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-3 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72 relative z-10 min-h-screen transition-all duration-500">
                {/* Topbar (Mobile) */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background/80 px-8 backdrop-blur-2xl border-b border-primary/5 lg:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-foreground">
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <Heart className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="animate-in fade-in duration-1000">
                    {children}
                </main>
            </div>
        </div>
    );
}
