"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { SparklesCore } from "@/components/sparkles-core";
import { useEffect } from "react";

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

    // Phone Auth State
    const [isPhoneSignup, setIsPhoneSignup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [otpSent, setOtpSent] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Cleanup recaptcha on unmount
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user's display name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // Save additional user details to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                institution,
                studentId,
                course,
                createdAt: new Date(),
            });

            // Verification email disabled for now
            // await sendEmailVerification(userCredential.user);

            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    // reCAPTCHA solved
                }
            });
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!phoneNumber) {
            setError("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        // Format phone number: remove spaces, replace leading 0 with +233
        let formattedNumber = phoneNumber.replace(/\s+/g, '');
        if (formattedNumber.startsWith('0')) {
            formattedNumber = '+233' + formattedNumber.substring(1);
        } else if (!formattedNumber.startsWith('+')) {
            formattedNumber = '+233' + formattedNumber;
        }

        try {
            const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/invalid-phone-number') {
                setError("Invalid phone number format.");
            } else if (error.code === 'auth/operation-not-allowed') {
                setError("SMS/Phone authentication is not enabled or this region is blocked in Firebase Console.");
            } else if (error.code === 'auth/billing-not-enabled') {
                setError("Phone Auth requires a billing account (Blaze plan). Please upgrade or use 'Test Phone Numbers' in Firebase Console for development.");
            } else if (error.code === 'auth/too-many-requests') {
                setError("Too many requests. Please try again later.");
            } else {
                setError("Failed to send verification code. Try again.");
            }
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!otp || !confirmationResult) {
            setError("Please enter the verification code.");
            setLoading(false);
            return;
        }

        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;

            // Save user details to Firestore
            // Note: Phone auth users don't have email/displayName by default, so we use the form state
            await updateProfile(user, {
                displayName: name
            });

            await setDoc(doc(db, "users", user.uid), {
                name,
                email: "", // No email for phone users
                phoneNumber: user.phoneNumber,
                institution,
                studentId,
                course,
                createdAt: new Date(),
            });

            router.push("/dashboard");

        } catch (error: any) {
            console.error(error);
            setError("Invalid verification code.");
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user document exists, if not create it
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    createdAt: new Date(),
                    institution: "",
                    course: "",
                    studentId: ""
                });
            }

            router.push("/dashboard");
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/popup-closed-by-user') {
                return; // User closed the popup, no need to show error
            }
            setError("Failed to sign in with Google.");
        }
    };

    return (
        <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Sparkles */}
            <div className="fixed inset-0 z-0">
                <SparklesCore
                    id="register-sparkles"
                    background="#0a0118"
                    minSize={0.6}
                    maxSize={2.4}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#a78bfa"
                    speed={1.5}
                />
            </div>

            <div className="relative z-10 w-full max-w-xl space-y-10 bg-white/5 backdrop-blur-[40px] p-10 md:p-14 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.4)] border-2 border-white/10 animate-in fade-in zoom-in duration-1000 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10 pointer-events-none">
                    <UserPlus size={300} className="text-indigo-300" />
                </div>

                <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] text-indigo-300 hover:text-white transition-all mb-4 group/back">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover/back:-translate-x-1" /> Back to Home
                </Link>

                <div className="text-center space-y-3">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase tracking-widest drop-shadow-2xl italic">
                        Create Account
                    </h2>
                    <p className="text-sm font-bold text-indigo-300 uppercase tracking-[0.4em] opacity-80">
                        Join the wellness circle
                    </p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 text-red-100 text-sm rounded-md text-center border border-red-500/30 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-8 relative z-10" onSubmit={isPhoneSignup ? (otpSent ? handleVerifyOtp : handleSendOtp) : handleRegister}>
                    <div className="space-y-6">
                        <div className="space-y-2.5">
                            <label htmlFor="name" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white placeholder-white/20 focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg focus:outline-none transition-all shadow-xl backdrop-blur-3xl"
                                placeholder="e.g. Ama Serwaa"
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label htmlFor="institution" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                Institution
                            </label>
                            <div className="relative group">
                                <select
                                    id="institution"
                                    name="institution"
                                    required
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg appearance-none focus:outline-none transition-all [&>option]:bg-[#0f172a] shadow-xl backdrop-blur-3xl cursor-pointer"
                                >
                                    <option value="" disabled className="text-white/30">Select your university</option>
                                    <option value="UG LEGON">University of Ghana</option>
                                    <option value="KNUST">Kwame Nkrumah University of Science & Technology</option>
                                    <option value="UCC">University of Cape Coast</option>
                                    <option value="UEW">University of Education Winneba</option>
                                    <option value="UDS">University of Developmental Studies</option>
                                    <option value="UP">University of Professional Studies</option>
                                    <option value="UWU">Ashesie University</option>
                                    <option value="ACU">Accra Christian University</option>
                                    <option value="UMAT">University of Mines and Technology</option>
                                    <option value="VVU">Valley View University</option>
                                    <option value="ATU">Accra Technical University</option>
                                    <option value="GTUC">Ghana Telecommunication University College</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-indigo-400 group-hover:text-white transition-colors">
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2.5">
                                <label htmlFor="studentId" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                    Student ID
                                </label>
                                <input
                                    id="studentId"
                                    name="studentId"
                                    type="text"
                                    required
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white placeholder-white/20 focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg focus:outline-none transition-all shadow-xl backdrop-blur-3xl"
                                    placeholder="10928374"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <label htmlFor="course" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                    Program
                                </label>
                                <input
                                    id="course"
                                    name="course"
                                    type="text"
                                    required
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white placeholder-white/20 focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg focus:outline-none transition-all shadow-xl backdrop-blur-3xl"
                                    placeholder="BSc. CS"
                                />
                            </div>
                        </div>

                        {!isPhoneSignup ? (
                            <>
                                <div className="space-y-2.5">
                                    <label htmlFor="email" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                        Email Secret
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white placeholder-white/20 focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg focus:outline-none transition-all shadow-xl backdrop-blur-3xl"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label htmlFor="password" className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                        Password Key
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative block w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 px-5 text-white placeholder-white/20 focus:z-10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 sm:text-lg focus:outline-none transition-all shadow-xl backdrop-blur-3xl"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white border-2 border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-xl font-black uppercase tracking-widest rounded-2xl"
                                        disabled={loading}
                                    >
                                        {loading ? "Forging Access..." : "Finalize Signup"}
                                    </Button>
                                    <div className="mt-6 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setIsPhoneSignup(true)}
                                            className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all flex items-center justify-center w-full"
                                        >
                                            <Phone className="w-4 h-4 mr-2" /> Use Phone Number instead
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {!otpSent ? (
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-indigo-100 mb-1">Phone Number</label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                            placeholder="e.g. 054 123 4567"
                                        />
                                        <div id="recaptcha-container"></div>
                                        <div className="mt-4">
                                            <Button
                                                type="submit"
                                                className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] text-base font-semibold"
                                                disabled={loading}
                                            >
                                                {loading ? "Sending Code..." : "Send Verification Code"}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="otp" className="block text-sm font-medium text-indigo-100 mb-1">Verification Code</label>
                                        <input
                                            id="otp"
                                            name="otp"
                                            type="text"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                            placeholder=" Enter 6-digit code"
                                        />
                                        <div className="mt-4">
                                            <Button
                                                type="submit"
                                                className="w-full h-11 bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] text-base font-semibold"
                                                disabled={loading}
                                            >
                                                {loading ? "Verifying..." : "Verify & Sign Up"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-2 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsPhoneSignup(false)}
                                        className="text-sm text-indigo-200 hover:text-white transition-colors flex items-center justify-center w-full"
                                    >
                                        <Mail className="w-3 h-3 mr-1" /> Use Email instead
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </form>

                <div className="relative my-10 relative z-10">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t-2 border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]">
                        <span className="bg-white/5 px-6 py-2 text-indigo-300 rounded-full backdrop-blur-3xl border border-white/10">Or connect via</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 relative z-10">
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full h-16 bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-widest transition-all hover:scale-[1.02] rounded-2xl shadow-xl flex items-center justify-center"
                    >
                        <svg className="mr-3 h-6 w-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Google Core
                    </Button>
                </div>

                <div className="text-center text-xs pt-8 border-t-2 border-white/10 mt-10 relative z-10">
                    <span className="text-indigo-200/50 font-bold uppercase tracking-widest">In the circle already? </span>
                    <Link href="/signin" className="font-black text-white hover:text-indigo-300 transition-colors uppercase tracking-[0.2em] underline underline-offset-8">Authorize Here</Link>
                </div>
            </div>
        </div>
    );
}
