"use client";

export const dynamic = "force-static";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, Mail, Lock, UserCircle, PlusCircle, Eye, EyeOff, ArrowRight, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const { loginWithGoogle, loginWithCredentials, loginAnonymously } = useAuth() as any;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('registered') === 'true') {
            setSuccessMessage("Identity initialized. Please sign in.");
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
            setError(err.message || "Connection failed. Please re-verify.");
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
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] selection:bg-primary/30 noise-bg overflow-hidden relative">
            {/* Immersive Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-5xl h-screen md:h-[750px] flex flex-col md:flex-row glass-morphism md:rounded-[3rem] overflow-hidden border-white/5 shadow-2xl relative z-10"
            >
                {/* Left Visual Panel - Desktop */}
                <div className="hidden md:flex w-2/5 relative bg-secondary/10 overflow-hidden flex-col justify-between p-12 touch-none">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                           <motion.div 
                             key={i}
                             className="absolute h-px w-px bg-white rounded-full"
                             initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
                             animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
                             transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                           />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <Link href="/">
                            <Logo iconOnly size="md" />
                        </Link>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-4xl lg:text-5xl font-black leading-[0.95] tracking-tighter text-white"
                        >
                            Reconnect <br /> 
                            <span className="text-gradient">MindBridge.</span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="text-muted-foreground font-medium text-lg leading-relaxed max-w-[250px]"
                        >
                            Access your predictive wellness analytics portal.
                        </motion.p>
                    </div>

                    <div className="relative z-10 pt-8 border-t border-white/5">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                            Institutional Intelligence Node
                        </div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center relative overflow-y-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-sm mx-auto w-full space-y-12"
                    >
                        {/* Mobile Header */}
                        <div className="md:hidden flex justify-center mb-12">
                            <Logo size="md" />
                        </div>

                        <div className="space-y-4">
                            <motion.h1 variants={itemVariants} className="text-4xl font-black text-white tracking-tight">Sign In</motion.h1>
                            <motion.div variants={itemVariants} className="h-1 w-12 bg-primary rounded-full" />
                        </div>

                        {/* Notifications */}
                        <AnimatePresence mode="wait">
                            {(error || successMessage) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={cn(
                                        "p-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest flex items-center gap-3",
                                        error ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-primary/5 border-primary/10 text-primary"
                                    )}
                                >
                                    <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", error ? "bg-red-500" : "bg-primary")} />
                                    {error || successMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form className="space-y-8" onSubmit={handleLogin}>
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 ml-1 group-focus-within:text-primary transition-colors">Digital Identity</label>
                                    <div className="relative">
                                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@university.edu"
                                            className="w-full py-4 pl-8 border-b border-white/5 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 ml-1 group-focus-within:text-primary transition-colors">Access Key</label>
                                    <div className="relative">
                                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full py-4 pl-8 border-b border-white/5 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/20 hover:text-primary"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-center justify-between">
                                <Link href="/register" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors">
                                    Establish Profile
                                </Link>
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/20 hover:text-primary transition-colors">
                                    Lost access?
                                </button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center gap-6">
                                <MagneticButton
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Connect {'>'}</>}
                                </MagneticButton>

                                <div className="flex items-center gap-6 w-full">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/20">or</span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>

                                <div className="flex gap-4 w-full">
                                    <button 
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="flex-1 h-12 rounded-xl border border-white/5 hover:bg-white/5 flex items-center justify-center gap-2 transition-all transition-colors group"
                                    >
                                        <svg className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.5"/>
                                        </svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Google</span>
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={loginAnonymously}
                                        className="flex-1 h-12 rounded-xl border border-white/5 hover:bg-white/5 flex items-center justify-center gap-2 transition-all transition-colors group"
                                    >
                                        <UserCircle className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Guest</span>
                                    </button>
                                </div>
                            </motion.div>
                        </form>

                        <motion.div variants={itemVariants} className="pt-12 text-center">
                            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/20 hover:text-primary transition-all">
                                <ArrowLeft className="h-3 w-3" /> Back
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
</div>
    );
}
