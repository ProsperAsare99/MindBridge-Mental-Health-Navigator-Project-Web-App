"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
    ArrowLeft,
    Mail,
    User,
    Lock,
    School,
    GraduationCap,
    IdCard,
    ChevronRight,
    UserCircle,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import Image from "next/image";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginWithGoogle, loginAnonymously } = useAuth() as any;

    const [showConsent, setShowConsent] = useState(true);
    const [hasConsented, setHasConsented] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasConsented) {
            setShowConsent(true);
            return;
        }
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
        <div className="min-h-screen grid lg:grid-cols-2 selection:bg-primary/20 bg-background overflow-hidden relative">
            {/* Informed Consent Modal Overlay */}
            <AnimatePresence>
                {showConsent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/60 backdrop-blur-2xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="max-w-xl w-full glass p-8 md:p-12 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden rounded-[3rem]"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter">System Commitment</h2>
                            <div className="space-y-4 text-sm font-bold text-muted-foreground/60 leading-relaxed max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                <p>By initializing your profile, you agree to our core operational standards:</p>
                                <ul className="space-y-4 pt-4 border-t border-white/5">
                                    <li className="flex gap-4">
                                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><div className="h-1.5 w-1.5 rounded-full bg-primary" /></div>
                                        <p><span className="text-foreground font-black uppercase text-[10px] tracking-widest block mb-1">Privacy First</span> All identity markers are anonymized within our analytics core.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /></div>
                                        <p><span className="text-foreground font-black uppercase text-[10px] tracking-widest block mb-1">Support Tool</span> MindBridge is a navigation assistant, not a clinical replacement.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3 pt-4">
                                <Button 
                                    onClick={() => {
                                        setHasConsented(true);
                                        setShowConsent(false);
                                    }}
                                    className="h-14 rounded-2xl font-black shadow-xl shadow-primary/20 active:scale-95 transition-all"
                                >
                                    ACCEPT & PROCEED
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => router.push("/")}
                                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-red-500 transition-colors"
                                >
                                    CANCEL
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Template Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div className="flex absolute z-0 overflow-hidden backdrop-blur-2xl">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[100vh] w-[15vw] bg-gradient-to-b from-transparent via-black/20 to-primary/10 opacity-30" />
                    ))}
                </div>
                <div className="w-[30rem] h-[30rem] bg-primary/20 absolute -bottom-20 -left-20 rounded-full blur-[100px]" />
                <div className="w-[20rem] h-[15rem] bg-secondary/10 absolute -bottom-10 -left-10 rounded-full blur-[80px]" />
            </div>

            {/* Left Section: Cinematic & Brand */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Academic Collaboration"
                        fill
                        className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <Logo iconOnly size="lg" />
                    <span className="text-xl font-black tracking-tighter">MindBridge</span>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">
                        Design your <span className="text-primary italic">resilience</span> journey.
                    </h1>
                    <p className="text-lg font-medium text-white/60 leading-relaxed">
                        Join a community of students navigating academic life with AI-powered support and clinical ethics.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Privacy Validated
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Student Centric
                    </div>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="relative flex flex-col p-8 md:p-16 lg:p-24 justify-center overflow-y-auto custom-scrollbar">
                <div className="max-w-md w-full mx-auto space-y-10">
                    <div className="space-y-3">
                        <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors group">
                            <ArrowLeft className="h-3 w-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back
                        </Link>
                        <h2 className="text-3xl font-black tracking-tighter">Initialize Profile</h2>
                        <p className="text-sm font-bold text-muted-foreground/60 leading-relaxed">Start your journey towards better mental well-being.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Prosper Asare"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-muted/30 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Institution</label>
                                <Select
                                    value={institution}
                                    onChange={setInstitution}
                                    options={[
                                        { value: "UG", label: "University of Ghana (UG)" },
                                        { value: "KNUST", label: "KNUST" },
                                        { value: "UCC", label: "University of Cape Coast (UCC)" },
                                        { value: "Other", label: "Other Institution" },
                                    ]}
                                    placeholder="Select Institution"
                                    icon={<School className="h-4 w-4" />}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Student ID</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="10XXXXXX"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full bg-muted/30 border border-white/5 rounded-2xl py-4 px-5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Course of Study</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Comp Science"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="w-full bg-muted/30 border border-white/5 rounded-2xl py-4 px-5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@example.gh"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-muted/30 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Security Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-muted/30 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 text-red-600 text-[10px] font-black uppercase rounded-xl border border-red-500/20 flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                {error}
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-14 rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "CREATE SYSTEM PROFILE"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                        <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
                            <span className="bg-background px-4 text-muted-foreground/30">Universal Access</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="flex-1 h-12 rounded-xl flex items-center justify-center gap-3 border-white/10 font-bold text-xs"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={loginAnonymously}
                            disabled={loading}
                            className="flex-1 h-12 rounded-xl flex items-center justify-center gap-3 border-white/10 font-bold text-xs"
                        >
                            <UserCircle className="h-4 w-4 text-muted-foreground/60" />
                            Anonymous
                        </Button>
                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-xs font-bold text-muted-foreground/60">
                            Already Authenticated? <Link href="/login" className="text-primary font-black hover:underline px-2">Log In Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
