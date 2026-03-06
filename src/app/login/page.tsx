"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SparklesCore } from "@/components/sparkles-core";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else {
                setError("Failed to sign in. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Google accounts are usually verified, but good to check or ensure flow consistency
            // if (!result.user.emailVerified) router.push("/verify-email"); // Optional for Google
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
                    id="login-sparkles"
                    background="#0a0118"
                    minSize={0.6}
                    maxSize={2.4}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#a78bfa"
                    speed={1.5}
                />
            </div>

            <div className="relative z-10 w-full max-w-md space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-500">
                <Link href="/" className="inline-flex items-center text-sm text-indigo-200 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                </Link>

                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">Welcome back</h2>
                    <p className="mt-2 text-sm text-indigo-100/80">Sign in to access your dashboard</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 text-red-100 text-sm rounded-md text-center border border-red-500/30 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-white placeholder-white/30 focus:z-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] text-base font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white/5 px-2 text-indigo-200 rounded-full backdrop-blur-sm">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold transition-transform hover:scale-[1.02]"
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Google
                    </Button>
                </div>

                <div className="text-center text-sm pt-4 border-t border-white/10 mt-6">
                    <span className="text-indigo-200/70">Don't have an account? </span>
                    <Link href="/register" className="font-medium text-white hover:text-indigo-200 transition-colors">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
