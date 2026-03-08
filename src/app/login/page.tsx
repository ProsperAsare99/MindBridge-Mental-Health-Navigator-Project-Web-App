"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            api.setToken(res.token);
            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("Google Sign-In is temporarily disabled during backend migration.");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/20 overflow-hidden relative">
            {/* Soft background accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[15%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full max-w-md"
            >
                <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="bg-card glass rounded-[2.5rem] p-10 border border-primary/10 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Logo iconOnly size="xl" />
                    </div>

                    <div className="space-y-2 mb-10 text-center">
                        <div className="inline-flex mb-4">
                            <Logo iconOnly size="md" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">Welcome Back</h1>
                        <p className="text-sm font-medium text-muted-foreground">Continue your wellness journey with MindBridge.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all placeholder:text-muted-foreground/40"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all placeholder:text-muted-foreground/40"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 group"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : (
                                <span className="flex items-center gap-2">
                                    Sign In <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-primary/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                            <span className="bg-card px-4 text-muted-foreground/40">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="secondary"
                        className="w-full h-14 rounded-2xl font-bold"
                    >
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Google Account
                    </Button>

                    <div className="text-center mt-10 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline underline-offset-4">Create one</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
