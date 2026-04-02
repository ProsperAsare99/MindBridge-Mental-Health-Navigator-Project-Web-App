"use client";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, Mail, Lock, UserCircle, PlusCircle, User, School, Hash, BookOpen, Eye, EyeOff, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { DotMap } from "@/components/auth/DotMap";
import { INSTITUTION_OPTIONS } from "@/lib/constants";
import { AnimatedSelect } from "@/components/ui/animated-select";

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
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const { register, loginWithGoogle, loginAnonymously } = useAuth() as any;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasConsented) {
            setError("Please review and accept the informed consent to continue.");
            setShowConsent(true);
            return;
        }
        setError("");
        setLoading(true);

        try {
            const finalInstitution = institution === "Other" ? otherInstitution : institution;
            await register(email, password, name, finalInstitution, studentId, course, phoneNumber);
            alert("MindBridge Account Initialized! Welcome to the network. Please sign in to continue.");
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message || "An error occurred during registration.");
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
            {/* Informed Consent Modal omitted for brevity if unchanged, but I'll include form logic */}
            {/* ... */}
            <AnimatePresence>
                {showConsent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="max-w-xl w-full bg-card p-8 md:p-12 border border-border shadow-2xl space-y-8 relative overflow-hidden rounded-3xl"
                        >
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-extrabold tracking-tight">System Commitment</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    By proceeding with the MindBridge initialization, you acknowledge that this is a 
                                    <span className="text-primary font-bold mx-1">supportive cognitive framework</span> 
                                    and not a replacement for clinical emergency services.
                                </p>
                            </div>

                            <div className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60">Data Policy</h4>
                                <ul className="space-y-3">
                                    {[
                                        "End-to-end encryption for all personal metrics",
                                        "Anonymized data contribution for resilience research",
                                        "Full ownership and right to immediate data erasure"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs font-semibold text-foreground/80">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button 
                                    onClick={() => {
                                        setHasConsented(true);
                                        setShowConsent(false);
                                    }}
                                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-extrabold text-[11px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary/10"
                                >
                                    ACCEPT & PROCEED
                                </button>
                                <button 
                                    onClick={() => router.push("/")}
                                    className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/50 hover:text-red-500 transition-colors py-2"
                                >
                                    TERMINATE SESSION
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-6xl h-screen md:h-[min(900px,95vh)] overflow-hidden flex flex-col md:flex-row bg-card shadow-2xl md:rounded-3xl border border-border/50"
            >
                {/* Left Panel: Brand & Visuals (unchanged) */}
                <div className="hidden md:flex w-1/2 relative bg-[#141415] overflow-hidden flex-col justify-between p-12 border-r border-white/5">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40" />
                        <DotMap />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,160,89,0.05),transparent_70%)]" />
                    </div>

                    <div className="relative z-10 flex items-center gap-4 group cursor-default">
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                            <Logo iconOnly size="md" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tighter text-white">MindBridge</span>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white uppercase"
                        >
                            Your cognitive <span className="text-primary">resilience</span> starts here.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-zinc-400 font-medium leading-relaxed max-sm"
                        >
                            Join a community of students empowering themselves with intelligent wellness support.
                        </motion.p>
                    </div>

                    <div className="relative z-10 flex items-center gap-8 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                            <ShieldCheck className="h-4 w-4 text-primary/50" />
                            Privacy Centric
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                            <PlusCircle className="h-4 w-4 text-primary/50" />
                            Encrypted Data
                        </div>
                    </div>
                </div>

                {/* Right Panel: Register Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-card relative z-10 overflow-y-auto custom-scrollbar">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="space-y-2">
                            <div className="md:hidden flex items-center gap-3 mb-8">
                                <Logo iconOnly size="sm" />
                                <span className="text-xl font-extrabold tracking-tighter">MindBridge</span>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Initialize Profile</h2>
                            <p className="text-sm font-semibold text-muted-foreground/60 uppercase tracking-widest">
                                Welcome to the MindBridge Network
                            </p>
                        </div>

                        {/* Social Auth (unchanged) */}
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={handleGoogleLogin} disabled={loading} className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-2xl hover:bg-muted/50 transition-all font-bold text-xs disabled:opacity-50 group">
                                <svg className="h-4 w-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await loginAnonymously();
                                    } catch (err: any) {
                                        setError(err.message || "Guest access failed.");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-2xl hover:bg-muted/50 transition-all font-bold text-xs disabled:opacity-50 group"
                            >
                                <UserCircle className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                Guest
                            </button>
                        </div>

                        <div className="relative py-4 flex items-center justify-center">
                            <div className="text-[12px] font-extrabold uppercase tracking-[.4em] text-muted-foreground/40">
                                Standard Authentication
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/5 text-red-600 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl border border-red-500/10 flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                {error}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Prosper Asare"
                                            className="w-full py-4 px-12 border border-border/40 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 bg-muted/20 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="tel"
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="+233 123 456 789"
                                            className="w-full py-4 px-12 border border-border/40 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 bg-muted/20 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                        />
                                    </div>
                                </div>

                                {/* Institution Row - Moved to its own row for layout fix */}
                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Institution</label>
                                    <AnimatedSelect
                                        value={institution}
                                        onChange={setInstitution}
                                        placeholder="Select Your Institution"
                                        options={INSTITUTION_OPTIONS}
                                        icon={<School className="h-4 w-4" />}
                                    />
                                    <AnimatePresence>
                                        {institution === "Other" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-2"
                                            >
                                                <input
                                                    type="text"
                                                    required
                                                    value={otherInstitution}
                                                    onChange={(e) => setOtherInstitution(e.target.value)}
                                                    placeholder="Enter your institution name"
                                                    className="w-full py-3 px-4 border border-border/50 bg-background/50 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500/50"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Student ID</label>
                                        <div className="relative group">
                                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={studentId}
                                                onChange={(e) => setStudentId(e.target.value)}
                                                placeholder="10XXXXXX"
                                                className="w-full py-4 px-12 border border-border/40 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 bg-muted/20 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/70 ml-1">Course of Study</label>
                                        <div className="relative group">
                                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-orange-500 transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={course}
                                                onChange={(e) => setCourse(e.target.value)}
                                                placeholder="Computer Science"
                                                className="w-full py-4 px-12 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-muted/30 text-sm font-bold transition-all placeholder:text-muted-foreground/20"
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-primary">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/5 disabled:opacity-50 relative overflow-hidden"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>INITIALIZE PROFILE <ArrowRight className="h-4 w-4" /></>}
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

                        <div className="text-center pt-6 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/40">
                            Already part of the network?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
