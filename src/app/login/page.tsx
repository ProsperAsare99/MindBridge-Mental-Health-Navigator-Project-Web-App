"use client";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, Mail, Lock, UserCircle, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const { loginWithGoogle, loginWithCredentials, loginAnonymously } = useAuth() as any;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('registered') === 'true') {
            setSuccessMessage("Account created successfully! You can now sign in.");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await loginWithCredentials(email, password);
            if (result?.ok) {
                window.location.href = "/dashboard";
            }
        } catch (err: any) {
            console.error('Login error detail:', err);
            setError(err.message || "Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await loginWithGoogle();
        } catch (err: any) {
            setError(err.message || "Google Sign-In failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 md:p-10 bg-background selection:bg-orange-500/30">
            <div className="w-full relative max-w-6xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl">
                {/* Background Decoration Layer */}
                <div className="absolute inset-0 z-0 bg-black pointer-events-none">
                    <div className="w-full h-full z-2 absolute bg-gradient-to-t from-transparent to-black/80"></div>
                    <div className="flex absolute z-1 h-full w-full overflow-hidden backdrop-blur-2xl opacity-30">
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i} 
                                className="h-full z-1 w-[6rem] bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-20" 
                            />
                        ))}
                    </div>
                    {/* Floating Orbs */}
                    <div className="w-[20rem] h-[20rem] bg-orange-500 absolute z-1 rounded-full -bottom-10 -left-10 blur-[80px] opacity-20"></div>
                    <div className="w-[12rem] h-[8rem] bg-white absolute z-1 rounded-full bottom-0 left-20 blur-[60px] opacity-10"></div>
                </div>

                {/* Left Panel: Narrative */}
                <div className="bg-black text-white p-10 md:p-16 md:w-1/2 relative flex flex-col justify-between min-h-[400px]">
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                            <Logo iconOnly size="lg" />
                            <span className="text-3xl md:text-5xl font-extrabold tracking-tighter">MindBridge</span>
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
                                Resume your journey with <span className="text-orange-500">intelligent support.</span>
                            </h1>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed max-w-sm">
                                Enter your credentials to access your personalized wellness workspace.
                            </p>
                        </div>

                        <div className="grid gap-8 pt-12">
                            {[
                                { title: "Secure Infrastructure", desc: "Your session is protected by enterprise-grade encryption.", icon: <Lock className="h-4 w-4" /> },
                                { title: "Clinical Standards", desc: "Guided by evidence-based psychiatric best practices.", icon: <ShieldCheck className="h-4 w-4" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 group cursor-default">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all">
                                        <div className="text-zinc-500 group-hover:text-orange-500 transition-colors">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative z-10 pt-20 border-t border-white/5 flex flex-col gap-8">
                        <div className="flex items-center gap-12 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="h-4 w-4 text-orange-500/50" />
                                Privacy Validated
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-800" />
                            <div className="flex items-center gap-2.5">
                                <PlusCircle className="h-4 w-4 text-orange-500/50" />
                                Secure Session
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="p-8 md:p-12 lg:p-16 md:w-1/2 flex flex-col bg-background z-10 relative">
                    <div className="flex flex-col items-left mb-10">
                        <div className="text-orange-500 mb-8">
                            <Sunburst className="h-16 w-16 animate-pulse-slow font-black" />
                        </div>
                        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Sign In</h2>
                        <p className="text-left text-sm font-semibold text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
                            Initialize your MindBridge session
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-red-500/10 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-xl border border-red-500/20 flex items-center gap-3"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}
                                {successMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-green-500/10 text-green-600 text-[10px] font-extrabold uppercase tracking-widest rounded-xl border border-green-500/20 flex items-center gap-3"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                                        {successMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Network Identity</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-orange-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@university.gh"
                                        className="w-full py-4 px-5 pl-12 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Secure Access Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-orange-500 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full py-4 px-5 pl-12 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <a href="#" className='font-bold text-xs text-muted-foreground/40 hover:text-orange-500 transition-colors'>Forgot key?</a>
                            <Link href="/register" className='font-bold text-xs text-orange-500 hover:underline underline-offset-4 font-black uppercase tracking-widest'>Create Profile</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 px-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "ESTABLISH CONNECTION"}
                        </button>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.4em] text-muted-foreground/40">
                                <span className="bg-background px-4">Social Access Nodes</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="flex-1 border border-border hover:bg-muted/50 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all group"
                            >
                                <svg className="h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await loginAnonymously();
                                    } catch (err: any) {
                                        setError(err.message || "Anonymous login failed.");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="flex-1 border border-border hover:bg-muted/50 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all group"
                            >
                                <UserCircle className="h-4 w-4 text-muted-foreground/60 group-hover:text-orange-500 transition-colors" />
                                Anonymous
                            </button>
                        </div>
                    </form>

                    <div className="mt-auto pt-10 text-center">
                        <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-orange-500 transition-all gap-2 group">
                            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                            Return to Control Node
                        </Link>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: .7; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
}
