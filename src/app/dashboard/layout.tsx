"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
    ClipboardCheck,
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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/");
    };

    const mainNav = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/mood", label: "Mood Tracker", icon: BarChart3 },
        { href: "/dashboard/assessment", label: "Assessment", icon: ClipboardCheck },
        { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
        { href: "/dashboard/crisis", label: "Crisis Support", icon: Phone },
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

    const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                onClick={() => setIsMobileOpen(false)}
                title={!isExpanded ? label : undefined}
                className={cn(
                    "flex items-center gap-3 rounded-xl px-3 h-11 transition-all duration-200 group",
                    isActive
                        ? "bg-indigo-500/15 text-indigo-300"
                        : "text-white/40 hover:bg-white/5 hover:text-white/80"
                )}
            >
                <Icon className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-indigo-400"
                )} />
                {isExpanded && (
                    <span className="text-[13px] font-medium truncate">{label}</span>
                )}
            </Link>
        );
    };

    return (
        <div className="min-h-screen relative font-sans text-foreground bg-background selection:bg-indigo-500/30 dark:selection:text-indigo-200">
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

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* ───────── Sidebar ───────── */}
            <nav
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.06] bg-[#080012]/90 backdrop-blur-2xl transition-all duration-300 ease-in-out",
                    isExpanded ? "lg:w-60" : "lg:w-[68px]",
                    isMobileOpen ? "translate-x-0 w-60" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* ── Brand ── */}
                <div className="flex h-16 items-center gap-3 px-4 shrink-0">
                    <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3">
                        <div className="size-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 grid place-content-center shadow-lg shadow-indigo-500/20">
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                        {isExpanded && (
                            <span className="text-[15px] font-bold text-white tracking-wide">MindBridge</span>
                        )}
                    </Link>

                    {/* Mobile close */}
                    <button onClick={() => setIsMobileOpen(false)} className="ml-auto lg:hidden text-white/40 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* ── Separator ── */}
                <div className="mx-4 border-t border-white/[0.06]" />

                {/* ── Navigation ── */}
                <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5">
                    {isExpanded && (
                        <p className="px-3 pb-2 text-[10px] font-semibold text-white/20 uppercase tracking-[0.15em]">
                            Menu
                        </p>
                    )}
                    {mainNav.map((item) => (
                        <NavItem key={item.href} {...item} />
                    ))}
                </div>

                {/* ── Bottom section ── */}
                <div className="mt-auto shrink-0">
                    {/* Settings */}
                    <div className="px-3 pb-3">
                        {isExpanded && (
                            <p className="px-3 pb-2 text-[10px] font-semibold text-white/20 uppercase tracking-[0.15em]">
                                Account
                            </p>
                        )}
                        <NavItem href="/dashboard/settings" label="Settings" icon={Settings} />
                    </div>

                    {/* ── Separator ── */}
                    <div className="mx-4 border-t border-white/[0.06]" />

                    {/* ── User card ── */}
                    <div className="px-3 py-3">
                        <div className={cn(
                            "flex items-center rounded-xl transition-all duration-200",
                            isExpanded ? "gap-3 px-3 py-2.5 bg-white/[0.03]" : "justify-center py-2"
                        )}>
                            <div className="size-8 shrink-0 rounded-full bg-indigo-500/20 border border-indigo-400/20 grid place-content-center text-indigo-300">
                                {user.displayName ? (
                                    <span className="text-xs font-bold">{user.displayName[0].toUpperCase()}</span>
                                ) : (
                                    <UserCircle className="h-4 w-4" />
                                )}
                            </div>
                            {isExpanded && (
                                <>
                                    <div className="flex-1 min-w-0">
                                        <p className="truncate text-[13px] font-medium text-white/80">{user.displayName || "User"}</p>
                                        <p className="truncate text-[10px] text-white/25">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        title="Sign Out"
                                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ── Collapse toggle (desktop) ── */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hidden lg:flex w-full items-center gap-3 px-3 h-11 border-t border-white/[0.06] text-white/20 hover:text-white/50 hover:bg-white/[0.03] transition-all"
                    >
                        <div className="grid size-11 shrink-0 place-content-center">
                            <ChevronsRight className={cn(
                                "h-4 w-4 transition-transform duration-300",
                                isExpanded && "rotate-180"
                            )} />
                        </div>
                        {isExpanded && (
                            <span className="text-[13px] font-medium">Collapse</span>
                        )}
                    </button>
                </div>
            </nav>

            {/* ───────── Main content ───────── */}
            <div className={cn(
                "relative z-10 min-h-screen transition-all duration-300",
                isExpanded ? "lg:pl-60" : "lg:pl-[68px]"
            )}>
                {/* Mobile topbar */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-[#080012]/80 px-5 backdrop-blur-2xl border-b border-white/[0.06] lg:hidden">
                    <button onClick={() => setIsMobileOpen(true)} className="text-white/50 hover:text-white">
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="text-sm font-bold text-white tracking-wide">MindBridge</span>
                </header>

                <main className="p-0 animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
