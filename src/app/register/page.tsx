"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, User, Lock, School, GraduationCap, IdCard, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}

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
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [otpSent, setOtpSent] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
            }
        }
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post('/auth/register', {
                email,
                password,
                name,
                institution,
                studentId,
                course
            });
            api.setToken(res.token);
            router.push("/dashboard");
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

    const handleGoogleSignIn = () => {
        setError("Google Sign-In is temporarily disabled during backend migration.");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary/20 overflow-hidden relative">
            {/* Ambient Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[5%] left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[5%] right-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl py-10"
            >
                <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                <div className="bg-card glass rounded-[3rem] p-10 md:p-14 border border-primary/10 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Logo iconOnly size="xl" />
                    </div>

                    <div className="mb-12">
                        <div className="inline-flex mb-2">
                            <Logo iconOnly size="md" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground/90">Join MindBridge</h1>
                        <p className="text-sm font-medium text-muted-foreground mt-2">Start your journey towards better mental well-being.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-8" onSubmit={isPhoneSignup ? (otpSent ? handleVerifyOtp : handleSendOtp) : handleRegister}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Institution</label>
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
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Student ID</label>
                                <div className="relative group">
                                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                        placeholder="10XXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Course of Study</label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                        placeholder="Computer Science"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-6">
                            <AnimatePresence mode="wait">
                                {!isPhoneSignup ? (
                                    <motion.div
                                        key="email-fields"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                                        placeholder="name@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Password</label>
                                                <div className="relative group">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <input
                                                        type="password"
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full h-14 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 group" disabled={loading}>
                                            {loading ? "Creating Account..." : (
                                                <span className="flex items-center gap-2">Create Account <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                                            )}
                                        </Button>
                                        <button type="button" onClick={() => setIsPhoneSignup(true)} className="w-full text-xs font-bold text-primary active:scale-95 transition-all">
                                            Use Phone Number instead
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="phone-fields"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        {!otpSent ? (
                                            <div className="space-y-6">
                                                <div className="space-y-2 text-center">
                                                    <div id="recaptcha-container"></div>
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Phone Number</label>
                                                    <div className="relative group max-w-sm mx-auto">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                        <input
                                                            type="tel"
                                                            required
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
                                                            placeholder="024 000 0000"
                                                        />
                                                    </div>
                                                </div>
                                                <Button type="submit" className="w-full h-14 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20" disabled={loading}>
                                                    {loading ? "Sending Code..." : "Send Verification Code"}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="space-y-2 text-center">
                                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Verification Code</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        className="w-64 mx-auto block bg-muted/30 border border-primary/5 rounded-2xl py-4 px-4 text-center text-xl font-bold tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:tracking-normal placeholder:font-medium placeholder:text-muted-foreground/30"
                                                        placeholder="000000"
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full h-14 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20" disabled={loading}>
                                                    {loading ? "Verifying..." : "Verify & Sign Up"}
                                                </Button>
                                            </div>
                                        )}
                                        <button type="button" onClick={() => setIsPhoneSignup(false)} className="w-full text-xs font-bold text-primary active:scale-95 transition-all">
                                            Return to Email Registration
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-primary/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                            <span className="bg-card px-6 text-muted-foreground/30">Or join with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
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
                    </div>

                    <div className="text-center mt-12 pt-8 border-t border-primary/5">
                        <p className="text-xs font-medium text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
