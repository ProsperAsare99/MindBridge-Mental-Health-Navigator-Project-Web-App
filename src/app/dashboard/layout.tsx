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
    Settings
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin"); // Protect route
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
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm font-medium text-muted-foreground">Loading your space...</p>
                </div>
            </div>
        );
    }

    if (!user) return null; // Will redirect

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
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-background/95 dark:bg-slate-900/50 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all">
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">MindBridge</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-foreground hover:text-primary transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                        isActive
                                            ? "text-primary bg-primary/10 border border-primary/20 shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-transparent"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5 relative z-10 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-current")} />
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-border pt-4 space-y-4">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/5 border border-border backdrop-blur-sm">
                            <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                                {user.displayName ? (
                                    <span className="font-semibold">{user.displayName[0].toUpperCase()}</span>
                                ) : (
                                    <UserCircle className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-foreground">{user.displayName || "User"}</p>
                                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all rounded-xl h-10"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 relative z-10 min-h-screen transition-all duration-300">
                {/* Topbar (Mobile) */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-background/80 px-6 backdrop-blur-xl border-b border-border lg:hidden">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-foreground hover:text-primary transition-colors">
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="font-semibold text-foreground">Dashboard</span>
                    </div>
                </header>

                <main className="p-0 animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
