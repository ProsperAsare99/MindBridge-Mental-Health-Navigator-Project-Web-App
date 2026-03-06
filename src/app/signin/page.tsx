"use client";

import React, { useRef, useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SparklesCore } from "@/components/sparkles-core";

// Helper function to merge class names
const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
};

type RoutePoint = {
    x: number;
    y: number;
    delay: number;
};

const DotMap = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const routes: { start: RoutePoint; end: RoutePoint; color: string }[] = [
        { start: { x: 100, y: 150, delay: 0 }, end: { x: 200, y: 80, delay: 2 }, color: "#818cf8" },
        { start: { x: 200, y: 80, delay: 2 }, end: { x: 260, y: 120, delay: 4 }, color: "#818cf8" },
        { start: { x: 50, y: 50, delay: 1 }, end: { x: 150, y: 180, delay: 3 }, color: "#818cf8" },
        { start: { x: 280, y: 60, delay: 0.5 }, end: { x: 180, y: 180, delay: 2.5 }, color: "#818cf8" },
    ];

    const generateDots = (width: number, height: number) => {
        const dots = [];
        const gap = 12;
        const dotRadius = 1;
        for (let x = 0; x < width; x += gap) {
            for (let y = 0; y < height; y += gap) {
                const isInMapShape =
                    ((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
                    ((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
                    ((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
                    ((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
                    ((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
                    ((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));
                if (isInMapShape && Math.random() > 0.3) {
                    dots.push({ x, y, radius: dotRadius, opacity: Math.random() * 0.5 + 0.2 });
                }
            }
        }
        return dots;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
            canvas.width = width;
            canvas.height = height;
        });
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement as Element);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dots = generateDots(dimensions.width, dimensions.height);
        let animationFrameId: number;
        let startTime = Date.now();

        function drawDots() {
            if (!ctx) return;
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);
            dots.forEach(dot => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(129, 140, 248, ${dot.opacity})`;
                ctx.fill();
            });
        }

        function drawRoutes() {
            if (!ctx) return;
            const currentTime = (Date.now() - startTime) / 1000;
            routes.forEach(route => {
                const elapsed = currentTime - route.start.delay;
                if (elapsed <= 0) return;
                const duration = 3;
                const progress = Math.min(elapsed / duration, 1);
                const x = route.start.x + (route.end.x - route.start.x) * progress;
                const y = route.start.y + (route.end.y - route.start.y) * progress;

                ctx.beginPath();
                ctx.moveTo(route.start.x, route.start.y);
                ctx.lineTo(x, y);
                ctx.strokeStyle = route.color;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(route.start.x, route.start.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = route.color;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#a78bfa";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(167, 139, 250, 0.4)";
                ctx.fill();

                if (progress === 1) {
                    ctx.beginPath();
                    ctx.arc(route.end.x, route.end.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = route.color;
                    ctx.fill();
                }
            });
        }

        function animate() {
            drawDots();
            drawRoutes();
            const currentTime = (Date.now() - startTime) / 1000;
            if (currentTime > 15) startTime = Date.now();
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default function SignInPage() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            if (err.code === "auth/invalid-credential") {
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
            await signInWithPopup(auth, googleProvider);
            router.push("/dashboard");
        } catch (error: any) {
            console.error(error);
            if (error.code === "auth/popup-closed-by-user") return;
            setError("Failed to sign in with Google.");
        }
    };

    const inputClasses = "flex h-12 w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-indigo-300/40 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all backdrop-blur-sm";

    return (
        <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Sparkles */}
            <div className="fixed inset-0 z-0">
                <SparklesCore
                    id="signin-sparkles"
                    background="#0a0118"
                    minSize={0.6}
                    maxSize={2.4}
                    particleDensity={80}
                    className="w-full h-full"
                    particleColor="#a78bfa"
                    speed={1.5}
                />
            </div>

            {/* Back to Home */}
            <div className="fixed top-6 left-6 z-20">
                <Link href="/" className="inline-flex items-center text-xs font-bold text-indigo-300/70 hover:text-white transition-all uppercase tracking-widest">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Home
                </Link>
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] flex flex-col md:flex-row bg-white/5 backdrop-blur-[40px] shadow-[0_0_80px_rgba(0,0,0,0.4)] border-2 border-white/10"
            >
                {/* Left side - DotMap (hidden on mobile) */}
                <div className="hidden md:block md:w-1/2 min-h-[500px] lg:min-h-[600px] relative overflow-hidden border-r-2 border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 to-purple-950/80">
                        <DotMap />

                        {/* Logo overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mb-6"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] border-2 border-indigo-400/30">
                                    <ArrowRight className="text-white h-7 w-7" />
                                </div>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="text-4xl lg:text-5xl font-black mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 uppercase tracking-widest"
                            >
                                MindBridge
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="text-sm text-center text-indigo-200/60 max-w-xs font-medium leading-relaxed"
                            >
                                Sign in to access your mental health navigator and connect with support resources
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Right side - Sign In Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Mobile-only branding */}
                        <div className="md:hidden text-center mb-4">
                            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4 border border-indigo-400/30">
                                <ArrowRight className="text-white h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 uppercase tracking-widest">
                                MindBridge
                            </h2>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">Welcome back</h1>
                            <p className="text-indigo-300/60 text-sm mt-1 font-medium">Sign in to your account</p>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/20 text-red-100 text-sm rounded-xl text-center border border-red-500/30 backdrop-blur-sm">
                                {error}
                            </div>
                        )}

                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 bg-white/5 border-2 border-white/10 rounded-xl p-3.5 hover:bg-white/10 transition-all duration-300 text-white shadow-sm backdrop-blur-sm"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="font-bold text-sm">Continue with Google</span>
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-transparent text-indigo-300/50 font-bold uppercase tracking-widest backdrop-blur-sm">or</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-indigo-200/70 mb-2 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-bold text-indigo-200/70 mb-2 uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className={cn(inputClasses, "pr-12")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-300/50 hover:text-white transition-colors"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                className="pt-2"
                            >
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={cn(
                                        "w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 font-black text-sm uppercase tracking-widest relative overflow-hidden border-2 border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center",
                                        isHovered ? "shadow-[0_0_40px_rgba(99,102,241,0.5)]" : ""
                                    )}
                                >
                                    <span className="flex items-center justify-center">
                                        {loading ? "Signing in..." : "Sign in"}
                                        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                                    </span>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ left: "-100%" }}
                                            animate={{ left: "100%" }}
                                            transition={{ duration: 1, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            style={{ filter: "blur(8px)" }}
                                        />
                                    )}
                                </button>
                            </motion.div>

                            <div className="flex items-center justify-between text-xs pt-2">
                                <a href="#" className="text-indigo-300/60 hover:text-white transition-colors font-bold uppercase tracking-wider">
                                    Forgot password?
                                </a>
                                <Link href="/register" className="text-indigo-300/60 hover:text-white transition-colors font-bold uppercase tracking-wider">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
