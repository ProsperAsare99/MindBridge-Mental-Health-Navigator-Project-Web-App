"use client";

import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, RefreshCcw } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

function VerifyEmailContent() {
    const { user, loading } = useAuth();
    const searchParams = useSearchParams();
    const urlEmail = searchParams.get("email");
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const displayEmail = user?.email || urlEmail;

    useEffect(() => {
        if (!loading && !user && !urlEmail) {
            router.push("/login"); // Only redirect if neither session nor query email exists
        } else if (!loading && user && (user as any).isVerified) {
            router.push("/dashboard"); // Redirect if already verified
        }
    }, [user, loading, router, urlEmail]);

    const handleResend = async () => {
        if (displayEmail) {
            setSending(true);
            try {
                await api.post('/auth/resend-verification', { email: displayEmail });
                setMessage("Verification email sent! Please check your inbox.");
            } catch (error: any) {
                console.error(error);
                setMessage(error.message || "Failed to send email. Try again later.");
            } finally {
                setSending(false);
            }
        }
    };

    const handleCheckVerification = async () => {
        // Redirect to login to force a session refresh
        router.push("/login");
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/login" });
    }

    if (loading) return null;

    return (
        <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Shader */}
            <div className="fixed inset-0 -z-10 bg-[#12141d]" />

            <div className="relative z-10 w-full max-w-md space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-500 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100/10 border border-white/10 mb-6">
                    <Mail className="h-8 w-8 text-indigo-300" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Check your inbox</h2>
                    <p className="mt-4 text-sm text-indigo-100/80 leading-relaxed">
                        We sent a verification link to <span className="font-semibold text-white">{displayEmail}</span>.
                        Please click the link to verify your account.
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

                <div className="space-y-4 mt-8">
                    <Button
                        onClick={handleCheckVerification}
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] text-base font-semibold"
                    >
                        I've Verified My Email <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        onClick={handleResend}
                        disabled={sending}
                        className="w-full h-11 border-white/10 bg-white/5 text-indigo-100 hover:bg-white/10 hover:text-white transition-all"
                    >
                        {sending ? "Sending..." : "Resend Verification Email"} <RefreshCcw className={`ml-2 h-4 w-4 ${sending ? "animate-spin" : ""}`} />
                    </Button>
                </div>

                <div className="text-center text-sm pt-6 border-t border-white/10 mt-6">
                    <button onClick={handleSignOut} className="text-indigo-200/70 hover:text-white transition-colors">
                        {user ? "Sign out and complete later" : "Go back to Login"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#12141d] flex items-center justify-center text-white">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
