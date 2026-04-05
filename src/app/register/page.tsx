"use client";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, Mail, Lock, UserCircle, PlusCircle, User, School, Hash, BookOpen, Eye, EyeOff, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { INSTITUTION_OPTIONS } from "@/lib/constants";
import { AnimatedSelect } from "@/components/ui/animated-select";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [institution, setInstitution] = useState("");
    const [otherInstitution, setOtherInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConsent, setShowConsent] = useState(true);
    const [hasConsented, setHasConsented] = useState(false);
    const router = useRouter();
    const { register, loginWithGoogle, loginAnonymously } = useAuth() as any;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasConsented) {
            setError("Please read and accept the terms to continue.");
            setShowConsent(true);
            return;
        }
        setError("");
        setLoading(true);

        try {
            const finalInstitution = institution === "Other" ? otherInstitution : institution;
            await register(email, password, name, finalInstitution, studentId, course, phoneNumber);
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 15, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1] as any 
            } 
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] selection:bg-primary/30 noise-bg overflow-hidden relative">
            {/* Immersive Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <AnimatePresence>
                {showConsent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-3xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.98, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="max-w-xl w-full glass-morphism p-10 md:p-14 border-white/5 shadow-2xl space-y-10 relative overflow-hidden rounded-[2.5rem]"
                        >
                            <div className="space-y-6">
                                <div className="h-14 w-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <ShieldCheck className="h-7 w-7 text-primary" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-white">Your Privacy & Safety</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    MindBridge is a <span className="text-white font-bold">supportive space for your mental health</span>. 
                                    By continuing, you acknowledge that this system provides supportive insights and is not a 
                                    replacement for emergency clinical care.
                                </p>
                            </div>

                            <div className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">How we protect you</h4>
                                <ul className="space-y-4">
                                    {[
                                        "End-to-end proprietary encryption.",
                                        "Anonymized contribution to resilience metrics.",
                                        "Right to complete data erasure."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs font-bold text-muted-foreground/90 group">
                                            <CheckCircle2 className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                <MagneticButton 
                                    onClick={() => {
                                        setHasConsented(true);
                                        setShowConsent(false);
                                    }}
                                    className="w-full h-14 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all"
                                >
                                    I understand and agree
                                </MagneticButton>
                                <button 
                                    onClick={() => router.push("/")}
                                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 hover:text-red-500 transition-colors py-2"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as any }}
                className="w-full max-w-6xl h-screen md:h-[min(900px,92vh)] overflow-hidden flex flex-col md:flex-row glass-morphism md:rounded-[3rem] shadow-2xl border-white/5 relative z-10"
            >
                {/* Left Panel: Desktop Visual */}
                <div className="hidden md:flex w-2/5 relative bg-secondary/10 overflow-hidden flex-col justify-between p-12 border-r border-white/5">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                           <motion.div 
                             key={i}
                             className="absolute h-px w-px bg-white rounded-full"
                             initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
                             animate={{ y: ["0%", "100%"], opacity: [0, 0.5, 0] }}
                             transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                           />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <Link href="/">
                            <Logo iconOnly size="md" />
                        </Link>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-black leading-[0.95] tracking-tighter text-white"
                        >
                            Take control of your <br />
                            <span className="text-gradient">Wellbeing.</span>
                        </motion.h1>
                        <p className="text-lg text-muted-foreground/90 font-medium leading-relaxed max-w-[280px]">
                            A supportive community built for students.
                        </p>
                    </div>

                    <div className="relative z-10 pt-8 border-t border-white/5">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                            Secure Student Portal
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="w-full md:w-3/5 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-[420px] mx-auto w-full space-y-12"
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <motion.h2 variants={itemVariants} className="text-4xl font-black text-white tracking-tight">Create Account</motion.h2>
                            <motion.div variants={itemVariants} className="h-1 w-12 bg-primary rounded-full" />
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-red-500"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                                {error}
                            </motion.div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <motion.div variants={itemVariants} className="space-y-6">
                                {/* Name Input */}
                                <div className="group">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Prosper Asare"
                                            className="w-full py-4 pl-8 border-b border-white/20 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/40"
                                        />
                                    </div>
                                </div>

                                {/* Institution Select */}
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1">Your University</label>
                                    <AnimatedSelect
                                        value={institution}
                                        onChange={setInstitution}
                                        placeholder="Select your university"
                                        options={INSTITUTION_OPTIONS}
                                        icon={<School className="h-4 w-4" />}
                                    />
                                </div>

                                {/* Multi-row info */}
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Student ID</label>
                                        <div className="relative">
                                            <Hash className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={studentId}
                                                onChange={(e) => setStudentId(e.target.value)}
                                                placeholder="10XXXXXX"
                                                className="w-full py-4 pl-8 border-b border-white/20 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/40"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Course / Major</label>
                                        <div className="relative">
                                            <BookOpen className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={course}
                                                onChange={(e) => setCourse(e.target.value)}
                                                placeholder="CS / AI"
                                                className="w-full py-4 pl-8 border-b border-white/20 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/40"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email & Pass */}
                                <div className="group">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@university.edu"
                                            className="w-full py-4 pl-8 border-b border-white/20 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/40"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full py-4 pl-8 border-b border-white/20 bg-transparent focus:outline-none focus:border-primary transition-all text-sm font-bold text-white placeholder:text-muted-foreground/40"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-6">
                                <MagneticButton
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign Up {'>'}</>}
                                </MagneticButton>

                                <div className="mt-8 text-center">
                                    <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-white transition-colors">
                                        Already have an account? <span className="text-primary ml-1">Sign In</span>
                                    </Link>
                                </div>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
