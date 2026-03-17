"use client";

import { SunIcon as Sunburst, ArrowLeft, Loader2, ShieldCheck, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

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

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 md:p-10 bg-background selection:bg-orange-500/30">
            {/* Informed Consent Modal Overlay */}
            <AnimatePresence>
                {showConsent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="max-w-xl w-full bg-zinc-900 p-8 md:p-12 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden rounded-3xl text-white"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-orange-500" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter">System Commitment</h2>
                            <div className="space-y-4 text-sm font-bold text-zinc-400 leading-relaxed max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                <p>By initializing your profile, you agree to our core operational standards:</p>
                                <ul className="space-y-4 pt-4 border-t border-white/5">
                                    <li className="flex gap-4">
                                        <div className="h-5 w-5 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5"><div className="h-1.5 w-1.5 rounded-full bg-orange-500" /></div>
                                        <p><span className="text-white font-black uppercase text-[10px] tracking-widest block mb-1">Privacy First</span> All identity markers are anonymized within our analytics core.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="h-5 w-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5"><div className="h-1.5 w-1.5 rounded-full bg-orange-500" /></div>
                                        <p><span className="text-white font-black uppercase text-[10px] tracking-widest block mb-1">Support Tool</span> MindBridge is a navigation assistant, not a clinical replacement.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3 pt-4">
                                <button 
                                    onClick={() => {
                                        setHasConsented(true);
                                        setShowConsent(false);
                                    }}
                                    className="h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black shadow-xl shadow-orange-500/20 active:scale-95 transition-all text-sm"
                                >
                                    ACCEPT & PROCEED
                                </button>
                                <button 
                                    onClick={() => router.push("/")}
                                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors py-2"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full relative max-w-6xl overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-3xl">
                {/* Background Decoration Layer (From User Code) */}
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
                    {/* Floating Orbs (From User Code) */}
                    <div className="w-[20rem] h-[20rem] bg-orange-500 absolute z-1 rounded-full -bottom-10 -left-10 blur-[80px] opacity-20"></div>
                    <div className="w-[12rem] h-[8rem] bg-white absolute z-1 rounded-full bottom-0 left-20 blur-[60px] opacity-10"></div>
                </div>

                {/* Left Panel: Narrative (Aligning with User Structure) */}
                <div className="bg-black text-white p-10 md:p-16 md:w-1/2 relative flex flex-col justify-between min-h-[400px]">
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                            <Logo iconOnly size="lg" />
                            <span className="text-3xl md:text-5xl font-black tracking-tighter">MindBridge</span>
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                                Your intelligent companion for <span className="text-orange-500">academic resilience.</span>
                            </h1>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed max-w-md">
                                Empowering students with context-aware guidance, habit tracking, and confidential support structures.
                            </p>
                        </div>

                        <div className="grid gap-8 pt-12">
                            {[
                                { title: "Clinical Ethics", desc: "Built on evidence-based mental health frameworks." },
                                { title: "Privacy First", desc: "Your data is anonymized and stays under your control." },
                                { title: "Student Specific", desc: "Tailored to the unique stresses of academic life." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 group cursor-default">
                                    <div className="h-1.5 w-10 bg-orange-500/20 group-hover:bg-orange-500 transition-all mt-2.5 rounded-full shrink-0" />
                                    <div className="space-y-1.5">
                                        <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative z-10 pt-20 border-t border-white/5 flex flex-col gap-8">
                        <div className="flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="h-4 w-4 text-orange-500/50" />
                                Privacy Validated
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-800" />
                            <div className="flex items-center gap-2.5">
                                <GraduationCap className="h-4 w-4 text-orange-500/50" />
                                Academic Secured
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form (Aligning with User Style) */}
                <div className="p-8 md:p-12 lg:p-16 md:w-1/2 flex flex-col bg-background z-10 relative overflow-y-auto max-h-[90vh] custom-scrollbar">
                    <div className="flex flex-col items-left mb-10">
                        <div className="text-orange-500 mb-8">
                            <Sunburst className="h-16 w-16 animate-pulse-slow font-black" />
                        </div>
                        <h2 className="text-3xl font-black mb-2 tracking-tight">Initialize Profile</h2>
                        <p className="text-left text-sm font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
                            Welcome to MindBridge — Let's get started
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Prosper Asare"
                                    className="w-full py-4 px-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Institution</label>
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
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Student ID</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="10XXXXXX"
                                        className="w-full py-4 px-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Course of Study</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Comp Science"
                                        className="w-full py-4 px-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Your email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="hi@example.gh"
                                    className="w-full py-4 px-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2 ml-1">Create password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full py-4 px-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-muted/30 text-foreground font-bold text-sm transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 text-center bg-red-500/10 p-3 rounded-xl">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Profile"}
                        </button>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.4em] text-muted-foreground/40">
                                <span className="bg-background px-4">Cloud Auth</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="flex-1 border border-border hover:bg-muted/50 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={loginAnonymously}
                                disabled={loading}
                                className="flex-1 border border-border hover:bg-muted/50 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                            >
                                <Logo iconOnly size="sm" />
                                Anonymous
                            </button>
                        </div>

                        <div className="text-center text-muted-foreground/60 text-xs font-bold mt-4 pt-6 border-t border-border">
                            Already have account?{" "}
                            <Link href="/login" className="text-orange-500 font-black hover:underline px-1">
                                Login
                            </Link>
                        </div>
                    </form>
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
