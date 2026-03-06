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
    ChevronsRight,
    ChevronDown,
    ClipboardCheck,
    Bell,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/sparkles-core";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile
    const [isExpanded, setIsExpanded] = useState(true); // desktop collapse

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
    };

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/assessment", label: "Assessment", icon: ClipboardCheck },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
    ];

    const bottomNavItems = [
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm font-medium text-muted-foreground">Loading your space...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen relative font-sans text-foreground bg-background selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200">
            {/* Background Sparkles */}
            <div className="fixed inset-0 z-0">
                <SparklesCore
                    id="dashboard-sparkles"
                    background="#0a0118"
                    minSize={0.6}
                    maxSize={2.4}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#a78bfa"
                    speed={1.5}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <nav
                className={cn(
                    "fixed inset-y-0 left-0 z-50 shrink-0 border-r transition-all duration-300 ease-in-out",
                    "border-white/10 bg-slate-950/80 backdrop-blur-2xl p-2 shadow-[0_0_40px_rgba(0,0,0,0.3)]",
                    // Desktop: collapsible
                    isExpanded ? "lg:w-64" : "lg:w-[68px]",
                    // Mobile: slide in/out
                    isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Title / Brand Section */}
                <div className="mb-4 border-b border-white/10 pb-4">
                    <div className="flex cursor-pointer items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-white/5">
                        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
                            <div className="grid size-10 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
                                <div className="h-2.5 w-2.5 rounded-full bg-white" />
                            </div>
                            {isExpanded && (
                                <div className="transition-opacity duration-200">
                                    <span className="block text-sm font-bold text-white tracking-wide">
                                        MindBridge
                                    </span>
                                    <span className="block text-[10px] text-indigo-300/60 font-medium uppercase tracking-widest">
                                        Navigator
                                    </span>
                                </div>
                            )}
                        </Link>
                        {/* Mobile close */}
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                        {/* Desktop chevron only when expanded */}
                        {isExpanded && (
                            <ChevronDown className="hidden lg:block h-4 w-4 text-white/30" />
                        )}
                    </div>
                </div>

                {/* Main Nav Items */}
                <div className="space-y-1 mb-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "relative flex h-11 w-full items-center rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-indigo-500/15 text-indigo-300 shadow-sm border-l-2 border-indigo-400"
                                        : "text-white/50 hover:bg-white/5 hover:text-white/90 border-l-2 border-transparent"
                                )}
                            >
                                <div className="grid h-full w-12 shrink-0 place-content-center">
                                    <Icon className={cn(
                                        "h-[18px] w-[18px] transition-transform group-hover:scale-110",
                                        isActive ? "text-indigo-400" : ""
                                    )} />
                                </div>
                                {isExpanded && (
                                    <span className="text-sm font-medium truncate transition-opacity duration-200">
                                        {item.label}
                                    </span>
                                )}
                                {/* Notification badge example for Crisis Support */}
                                {item.label === "Crisis Support" && isExpanded && (
                                    <span className="absolute right-3 flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Account Section (visible when expanded) */}
                {isExpanded && (
                    <div className="border-t border-white/10 pt-4 space-y-1">
                        <div className="px-3 py-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                            Account
                        </div>
                        {bottomNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "relative flex h-11 w-full items-center rounded-xl transition-all duration-200 group",
                                        isActive
                                            ? "bg-indigo-500/15 text-indigo-300 shadow-sm border-l-2 border-indigo-400"
                                            : "text-white/50 hover:bg-white/5 hover:text-white/90 border-l-2 border-transparent"
                                    )}
                                >
                                    <div className="grid h-full w-12 shrink-0 place-content-center">
                                        <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                                    </div>
                                    <span className="text-sm font-medium truncate">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Collapsed: just Settings icon */}
                {!isExpanded && (
                    <div className="border-t border-white/10 pt-4 space-y-1">
                        {bottomNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative flex h-11 w-full items-center rounded-xl transition-all duration-200 group",
                                        isActive
                                            ? "bg-indigo-500/15 text-indigo-300"
                                            : "text-white/50 hover:bg-white/5 hover:text-white/90"
                                    )}
                                >
                                    <div className="grid h-full w-12 shrink-0 place-content-center">
                                        <Icon className="h-[18px] w-[18px]" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* User Profile (above toggle) */}
                {isExpanded && (
                    <div className="absolute bottom-14 left-2 right-2">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                                {user.displayName ? (
                                    <span className="text-sm font-bold">{user.displayName[0].toUpperCase()}</span>
                                ) : (
                                    <UserCircle className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-white">{user.displayName || "User"}</p>
                                <p className="truncate text-[10px] text-white/40">{user.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                title="Sign Out"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Toggle Collapse Button (Desktop only) */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="hidden lg:flex absolute bottom-0 left-0 right-0 border-t border-white/10 transition-colors hover:bg-white/5 items-center p-3"
                >
                    <div className="grid size-10 place-content-center">
                        <ChevronsRight
                            className={cn(
                                "h-4 w-4 transition-transform duration-300 text-white/40",
                                isExpanded ? "rotate-180" : ""
                            )}
                        />
                    </div>
                    {isExpanded && (
                        <span className="text-sm font-medium text-white/40 transition-opacity duration-200">
                            Collapse
                        </span>
                    )}
                </button>
            </nav>

            {/* Main Content */}
            <div className={cn(
                "relative z-10 min-h-screen transition-all duration-300",
                isExpanded ? "lg:pl-64" : "lg:pl-[68px]"
            )}>
                {/* Topbar (Mobile) */}
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-slate-950/80 px-6 backdrop-blur-2xl border-b border-white/10 lg:hidden">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-white/60 hover:text-white transition-colors">
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="font-bold text-white text-sm tracking-wide">MindBridge</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </header>

                <main className="p-0 animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
