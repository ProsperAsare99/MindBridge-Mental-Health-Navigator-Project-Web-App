"use client";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, Mail, Lock, UserCircle, PlusCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { DotMap } from "@/components/auth/DotMap";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
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
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-0 md:p-4 selection:bg-primary/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-6xl h-screen md:h-[min(800px,90vh)] overflow-hidden flex flex-col md:flex-row bg-card shadow-2xl md:rounded-3xl border border-border/50"
            >
                {/* Left Panel: Brand & Visuals */}
                <div className="hidden md:flex w-1/2 relative bg-[#141415] overflow-hidden flex-col justify-between p-12 border-r border-white/5">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
                        <DotMap />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,160,89,0.05),transparent_70%)]" />
                    </div>

                    {/* Logo Area */}
                    <div className="relative z-10 flex items-center gap-4 group cursor-default">
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                            <Logo iconOnly size="md" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tighter text-white">MindBridge</span>
                    </div>

                    {/* Narrative Text */}
                    <div className="relative z-10 space-y-6">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white"
                        >
                            Resume your journey with <span className="text-primary">intelligent support.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-zinc-400 font-medium leading-relaxed max-w-sm"
                        >
                            Enter your credentials to access your personalized wellness workspace and neuro-navigator.
                        </motion.p>
                    </div>

                    {/* Trust Badges */}
                    <div className="relative z-10 flex items-center gap-8 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                            <ShieldCheck className="h-4 w-4 text-primary/50" />
                            Privacy Validated
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                            <PlusCircle className="h-4 w-4 text-primary/50" />
                            Secure Session
                        </div>
                    </div>
                </div>

                {/* Right Panel: Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card relative z-10">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        {/* Header */}
                        <div className="space-y-2">
                            <div className="md:hidden flex items-center gap-3 mb-8">
                                <Logo iconOnly size="sm" />
                                <span className="text-xl font-extrabold tracking-tighter">MindBridge</span>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Sign In</h2>
                            <p className="text-sm font-semibold text-muted-foreground/60 uppercase tracking-widest">
                                Initialize your session
                            </p>
                        </div>

                        {/* Social Auth */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-2xl hover:bg-muted/50 transition-all font-bold text-xs disabled:opacity-50 group"
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
                                onClick={() => {
                                    setLoading(true);
                                    loginAnonymously().catch((err: any) => setError(err.message || "Guest access failed"));
                                }}
                                disabled={loading}
                                className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-2xl hover:bg-muted/50 transition-all font-bold text-xs disabled:opacity-50 group"
                            >
                                <UserCircle className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                Guest
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                            <div className="relative flex justify-center text-[8px] font-extrabold uppercase tracking-[.4em] text-muted-foreground/40">
                                <span className="bg-card px-4">Standard Authentication</span>
                            </div>
                        </div>

                        {/* Error/Success Notifications */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/5 text-red-600 text-[11px] font-extrabold uppercase tracking-widest rounded-2xl border border-red-500/10 flex items-center gap-3"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                    {error}
                                </motion.div>
                            )}
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/5 text-green-600 text-[11px] font-extrabold uppercase tracking-widest rounded-2xl border border-green-500/10 flex items-center gap-3"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                                    {successMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Login Form */}
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@university.edu"
                                            className="w-full py-4 px-12 border border-border/40 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 bg-muted/20 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full py-4 px-12 border border-border/40 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 bg-muted/20 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-primary"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <button type="button" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors">
                                    Recovery Key?
                                </button>
                                <Link href="/register" className="text-[10px] font-extrabold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                                    Create Profile
                                </Link>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 relative overflow-hidden"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        ESTABLISH CONNECTION
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                                {isHovered && !loading && (
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                    />
                                )}
                            </motion.button>
                        </form>

                        <div className="pt-10 text-center">
                            <Link href="/" className="inline-flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary transition-all group">
                                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                                Return to Navigation Node
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
