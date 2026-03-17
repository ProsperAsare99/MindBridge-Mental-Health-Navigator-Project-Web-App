"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, User, Lock, School, GraduationCap, IdCard, ChevronRight, UserCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPhoneSignup, setIsPhoneSignup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginWithGoogle, loginAnonymously } = useAuth() as any;

    const [showConsent, setShowConsent] = useState(true);
    const [hasConsented, setHasConsented] = useState(false);


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post('/auth/register', {
                email,
                password,
                name,
                institution,
                studentId,
                course
            });

            router.push("/login?registered=true");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = () => {
        setError("Phone registration is temporarily disabled during backend migration.");
    };

    const handleVerifyOtp = () => {
        setError("Phone registration is temporarily disabled during backend migration.");
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
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring" as const, stiffness: 260, damping: 25 }
        }
    };

    return (
        <div className="soothing min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/20 overflow-hidden relative">
            {/* Cinematic Aurora Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-primary/20 blur-[180px] rounded-full" 
                />
                <motion.div 
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, -60, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-secondary/20 blur-[180px] rounded-full" 
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl py-10"
            >
                <motion.div variants={itemVariants}>
                    <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-all mb-8 group">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="glass rounded-[3.5rem] p-10 md:p-14 border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden group/card"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover/card:scale-110 transition-transform duration-700">
                        <Logo iconOnly size="xl" />
                    </div>

                    <div className="mb-14 text-center space-y-3">
                        <motion.div 
                            initial={{ scale: 0.8, rotate: 10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex mb-4"
                        >
                            <Logo iconOnly size="lg" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-none">Initialize Profile</h1>
                        <p className="text-sm font-bold text-muted-foreground/60 max-w-sm mx-auto">Start your journey towards better mental well-being with MindBridge.</p>
                    </div>

                    {/* Informed Consent Modal Overlay */}
                    <AnimatePresence>
                        {showConsent && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/60 backdrop-blur-2xl"
                            >
                                <motion.div 
                                    initial={{ scale: 0.9, y: 40, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    className="max-w-xl w-full glass p-10 md:p-14 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer" />
                                    
                                    <div className="space-y-6">
                                        <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-6">
                                            <ShieldCheck className="h-8 w-8 text-primary" />
                                        </div>
                                        <h2 className="text-4xl font-black tracking-tighter">System Commitment</h2>
                                        <div className="space-y-5 overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar text-[15px] font-bold text-muted-foreground/80 leading-relaxed">
                                            <p>Before activation, please verify our core operational standards to ensure your safety and privacy:</p>
                                            
                                            <div className="space-y-5 pt-4 border-t border-white/5">
                                                <div className="flex gap-5">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                                    </div>
                                                    <p><span className="text-foreground font-black uppercase text-xs tracking-widest block mb-1">Anonymized Analytics</span> Our systems use context-aware logic to support you, but all identity markers are stripped. You remain a private entity within our community pulse.</p>
                                                </div>
                                                <div className="flex gap-5">
                                                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="h-2 w-2 rounded-full bg-secondary" />
                                                    </div>
                                                    <p><span className="text-foreground font-black uppercase text-xs tracking-widest block mb-1">Supportive Navigation</span> MindBridge is designed for guidance and resilience tracking. It does not replace professional clinical psychiatric intervention.</p>
                                                </div>
                                                <div className="flex gap-5">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                                    </div>
                                                    <p><span className="text-foreground font-black uppercase text-xs tracking-widest block mb-1">Full Sovereignty</span> Your data belongs to you. Close your account or request data purging at any moment via the Control Center.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 pt-6">
                                        <Button 
                                            onClick={() => {
                                                setHasConsented(true);
                                                setShowConsent(false);
                                            }}
                                            className="h-16 rounded-[1.5rem] text-sm font-black shadow-2xl shadow-primary/30 active:scale-[0.98] transition-transform"
                                        >
                                            ACCEPT & INITIALIZE
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            onClick={() => router.push("/")}
                                            className="font-black text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-red-500 transition-colors"
                                        >
                                            TERMINATE SESSION
                                        </Button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-10 p-4 bg-red-500/10 text-red-600 text-xs font-black rounded-2xl border border-red-500/20 flex items-center gap-4 overflow-hidden"
                            >
                                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-10" onSubmit={isPhoneSignup ? (otpSent ? handleVerifyOtp : handleSendOtp) : handleRegister}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Full Legal Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                        placeholder="Prosper Asare"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Academic Node</label>
                                <Select
                                    value={institution}
                                    onChange={setInstitution}
                                    options={[
                                        { value: "UG", label: "University of Ghana (UG)" },
                                        { value: "KNUST", label: "KNUST" },
                                        { value: "UCC", label: "University of Cape Coast (UCC)" },
                                        { value: "UEW", label: "University of Education, Winneba (UEW)" },
                                        { value: "UDS", label: "University for Development Studies (UDS)" },
                                        { value: "UPSA", label: "University of Professional Studies, Accra (UPSA)" },
                                        { value: "UMAT", label: "University of Mines and Technology (UMaT)" },
                                        { value: "UENR", label: "University of Energy and Natural Resources (UENR)" },
                                        { value: "GCTU", label: "Ghana Communication Technology University (GCTU)" },
                                        { value: "UHAS", label: "University of Health and Allied Sciences (UHAS)" },
                                        { value: "UNER", label: "University of Environment and Sustainable Development (UESD)" },
                                        { value: "SDDOMBO", label: "S.D. Dombo Univ. of Business & Integrated Dev't Studies" },
                                        { value: "ATU", label: "Accra Technical University" },
                                        { value: "KsTU", label: "Kumasi Technical University" },
                                        { value: "TTU", label: "Takoradi Technical University" },
                                        { value: "KTU", label: "Koforidua Technical University" },
                                        { value: "HTU", label: "Ho Technical University" },
                                        { value: "STU", label: "Sunyani Technical University" },
                                        { value: "CCTU", label: "Cape Coast Technical University" },
                                        { value: "TaTU", label: "Tamale Technical University" },
                                        { value: "ASHESI", label: "Ashesi University" },
                                        { value: "CENTRAL", label: "Central University" },
                                        { value: "VALLEY_VIEW", label: "Valley View University" },
                                        { value: "LANCASTER", label: "Lancaster University Ghana" },
                                        { value: "ACADEMIC_CITY", label: "Academic City University College" },
                                        { value: "WISCONSIN", label: "Wisconsin International University College" },
                                        { value: "METHODIST", label: "Methodist University Ghana" },
                                        { value: "PRESBY", label: "Presbyterian University, Ghana" },
                                        { value: "CATHOLIC", label: "Catholic University of Ghana" },
                                        { value: "PENTECOST", label: "Pentecost University" },
                                        { value: "ALL_NATIONS", label: "All Nations University" },
                                        { value: "RMU", label: "Regional Maritime University (RMU)" },
                                        { value: "COE", label: "College of Education (COE)" },
                                        { value: "NMTC", label: "Nursing & Midwifery Training College (NMTC)" },
                                        { value: "POLICE_TRAINING", label: "Police Training School" },
                                        { value: "MILITARY_ACADEMY", label: "Ghana Military Academy" },
                                        { value: "Other", label: "Other Institution" },
                                    ]}
                                    placeholder="Select Institution"
                                    icon={<School className="h-4 w-4" />}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Identity Code (ID)</label>
                                <div className="relative group">
                                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                        placeholder="10XXXXXX"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Academic Stream</label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                        placeholder="Computer Science"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="pt-4">
                            <AnimatePresence mode="wait">
                                {!isPhoneSignup ? (
                                    <motion.div
                                        key="email-fields"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Auth Email</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                                        placeholder="name@example.gh"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">Security Key</label>
                                                <div className="relative group">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                                    <input
                                                        type="password"
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full h-16 rounded-[1.5rem] text-sm font-black shadow-2xl shadow-primary/30 group relative overflow-hidden active:scale-[0.98] transition-all" disabled={loading}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? "INITIALIZING DATA..." : "CREATE SYSTEM PROFILE"} 
                                                {!loading && <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                            </span>
                                        </Button>
                                        <button type="button" onClick={() => setIsPhoneSignup(true)} className="w-full text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary active:scale-95 transition-all outline-none">
                                            Switch to Phone Authentication
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="phone-fields"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-8"
                                    >
                                        {!otpSent ? (
                                            <div className="space-y-8">
                                                <div className="space-y-4 text-center">
                                                    <div id="recaptcha-container"></div>
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Phone Access Node</label>
                                                    <div className="relative group max-w-sm mx-auto">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                                        <input
                                                            type="tel"
                                                            required
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            className="w-full bg-muted/30 hover:bg-muted/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground/30"
                                                            placeholder="024 000 0000"
                                                        />
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full h-16 rounded-[1.5rem] text-sm font-black shadow-2xl shadow-primary/30" disabled={loading}>
                                                    {loading ? "SENDING SIGNALS..." : "SEND VERIFICATION CODE"}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-8 text-center">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Verification Code</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        className="w-64 mx-auto block bg-muted/30 border border-white/10 rounded-2xl py-5 px-4 text-center text-2xl font-black tracking-[0.6em] focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:tracking-normal placeholder:font-bold placeholder:text-muted-foreground/20"
                                                        placeholder="000000"
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full h-16 rounded-[1.5rem] text-sm font-black shadow-2xl shadow-primary/30" disabled={loading}>
                                                    {loading ? "VERIFYING..." : "ACTIVATE & DEPLOY"}
                                                </Button>
                                            </div>
                                        )}
                                        <button type="button" onClick={() => setIsPhoneSignup(false)} className="w-full text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary active:scale-95 transition-all outline-none">
                                            Return to Email Authentication
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>

                    <motion.div variants={itemVariants} className="relative my-12">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
                            <span className="bg-background/20 backdrop-blur-xl px-6 text-muted-foreground/30">Universal Access Nodes</span>
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
                                    await (loginAnonymously as any)();
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

                    <motion.div variants={itemVariants} className="text-center mt-14 pt-8 border-t border-white/5 space-y-4">
                        <p className="text-xs font-bold text-muted-foreground/60">
                            Already Authenticated? <Link href="/login" className="text-primary font-black hover:underline underline-offset-8 transition-all px-2">Log In Here</Link>
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
