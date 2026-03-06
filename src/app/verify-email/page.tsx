"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, RefreshCcw } from "lucide-react";
import { SparklesCore } from "@/components/sparkles-core";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
    const { user, loading } = useAuth();
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        } else if (!loading && user && user.emailVerified) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    const handleResend = async () => {
        if (user) {
            setSending(true);
            try {
                await sendEmailVerification(user);
                setMessage("Verification email sent! Please check your inbox.");
            } catch (error: any) {
                console.error(error);
                if (error.code === 'auth/too-many-requests') {
                    setMessage("Too many requests. Please wait a bit.");
                } else {
                    setMessage("Failed to send email. Try again later.");
                }
            } finally {
                setSending(false);
            }
        }
    };

    const handleCheckVerification = async () => {
        if (user) {
            await user.reload(); // Refresh user state
            if (user.emailVerified) {
                router.push("/dashboard");
            } else {
                setMessage("Email not verified yet. Please check your inbox.");
            }
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        router.push("/signin");
    }

    if (loading) return null; // Or a loading spinner

    return (
        <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Sparkles */}
            <div className="fixed inset-0 z-0">
                <SparklesCore
                    id="verify-sparkles"
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
                    <Mail size={300} className="text-indigo-300" />
                </div>

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-500/20 border-2 border-indigo-400/30 shadow-[0_0_40px_rgba(99,102,241,0.3)] mb-8 relative z-10">
                    <Mail className="h-10 w-10 text-indigo-200" />
                </div>

                <div className="text-center space-y-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase tracking-widest drop-shadow-2xl italic">
                        Check Inbox
                    </h2>
                    <p className="text-sm font-bold text-indigo-300 uppercase tracking-[0.4em] opacity-80 leading-relaxed px-4">
                        We sent a secure link to <span className="text-white block mt-2 text-lg font-black tracking-normal lowercase">{user?.email}</span>
                    </p>
                </div>

                {message && (
                    <div className={`mt-4 p-3 text-sm rounded-md border backdrop-blur-sm ${message.includes("sent")
                        ? "bg-green-500/20 text-green-100 border-green-500/30"
                        : "bg-amber-500/20 text-amber-100 border-amber-500/30"
                        }`}>
                        {message}
                    </div>
                )}

                <div className="space-y-6 mt-10 relative z-10">
                    <Button
                        onClick={handleCheckVerification}
                        className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white border-2 border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-95 text-xl font-black uppercase tracking-widest rounded-2xl flex items-center justify-center"
                    >
                        Access Dashboard <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleResend}
                        disabled={sending}
                        className="w-full h-16 border-2 border-white/10 bg-white/5 text-indigo-200 hover:bg-white/10 hover:text-white transition-all text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center backdrop-blur-xl"
                    >
                        {sending ? "Transmitting..." : "Resend Link"} <RefreshCcw className={`ml-3 h-5 w-5 ${sending ? "animate-spin" : ""}`} />
                    </Button>
                </div>

                <div className="text-center pt-8 border-t-2 border-white/10 mt-10 relative z-10">
                    <button onClick={handleSignOut} className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all">
                        Abandon Session & Exit
                    </button>
                </div>
            </div>
        </div>
    );
}
