"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, ChevronRight, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginWithGoogle, loginWithCredentials, loginAnonymously } = useAuth() as any;
    const [successMessage, setSuccessMessage] = useState("");

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring" as const, stiffness: 260, damping: 20 }
        }
    };

    return (
        <div className="soothing min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/20 overflow-hidden relative">
            {/* Cinematic Aurora Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[150px] rounded-full" 
                />
                <motion.div 
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-secondary/20 blur-[150px] rounded-full" 
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <motion.div variants={itemVariants}>
                    <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-all mb-8 group">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="glass rounded-[3rem] p-10 border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden group/card"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover/card:scale-110 transition-transform duration-700">
                        <Logo iconOnly size="xl" />
                    </div>

                    <div className="space-y-3 mb-12 text-center">
                        <motion.div 
                            initial={{ scale: 0.8, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex mb-4"
                        >
                            <Logo iconOnly size="lg" />
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Welcome Back</h1>
                        <p className="text-sm font-bold text-muted-foreground/60">Continue your journey with MindBridge</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-8 p-4 bg-red-500/10 text-red-600 text-xs font-black rounded-2xl border border-red-500/20 flex items-center gap-4"
                            >
                                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-8 p-4 bg-green-500/10 text-green-600 text-xs font-black rounded-2xl border border-green-500/20 flex items-center gap-4"
                            >
                                <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse shrink-0" />
                                {successMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Email address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground/30"
                                        placeholder="name@example.gh"
                                    />
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Security Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground/30"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full h-16 rounded-[1.5rem] text-sm font-black shadow-2xl shadow-primary/30 group relative overflow-hidden active:scale-[0.98] transition-transform"
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? "AUTHENTICATING..." : "SYSTEM LOG IN"}
                                    {!loading && <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
                            <span className="bg-background/20 backdrop-blur-xl px-4 text-muted-foreground/40">Secure Access Nodes</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 border-white/10 hover:bg-white/5 transition-all font-bold text-xs"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
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
                            className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 border-white/10 hover:bg-white/5 transition-all font-bold text-xs"
                        >
                            <UserCircle className="h-5 w-5 text-muted-foreground/60" />
                            Anonymous
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center mt-12 py-6 border-t border-white/5 space-y-4">
                        <p className="text-xs font-bold text-muted-foreground/60">
                            New Navigator? <Link href="/register" className="text-primary font-black hover:underline underline-offset-8 transition-all px-2">Initialize Profile</Link>
                        </p>
                        <Link href="/privacy" className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary transition-all">
                            Review Privacy Security
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
