"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
    User,
    Mail,
    Lock,
    Phone,
    Shield,
    ChevronLeft,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Heart
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Secure keys do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: formData.fullName });
            await setDoc(doc(db, "users", user.uid), {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                createdAt: serverTimestamp(),
                settings: { theme: 'light', notifications: true }
            });

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Identity registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#192231]">
            {/* Background Mesh */}
            <div className="fixed inset-0 -z-10 bg-luxury-gradient opacity-40" />
            <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
                <div className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] bg-sage/10 blur-[150px] rounded-full animate-soft-glow" />
                <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full animate-spin-slow opacity-20" />
            </div>

            <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 hover:text-sage transition-all group">
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Safety
                </Link>

                {/* Main Card */}
                <div className="glass-card rounded-[4.5rem] p-12 md:p-20 relative overflow-hidden border-white/5 shadow-2xl shadow-black/80 bg-black/20 backdrop-blur-3xl">
                    <div className="relative z-10 space-y-16">
                        {/* Header */}
                        <div className="space-y-6">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner mb-10 overflow-hidden soft-glow-bg">
                                <User className="h-8 w-8 text-sage" />
                            </div>
                            <h1 className="text-4xl md:text-7xl font-extrabold text-linen tracking-tighter leading-none opacity-90">
                                Begin your <span className="text-sage italic font-serif lowercase font-normal opacity-80">journey.</span>
                            </h1>
                            <p className="text-sm text-linen/30 font-bold italic tracking-tight leading-relaxed max-w-sm">Establish your secure clinical identity to access the MindBridge protocol hub.</p>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div className="p-8 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center gap-6 text-red-200 animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
                                <Shield className="h-6 w-6 shrink-0 text-red-400" />
                                <p className="text-sm font-bold italic">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleRegister} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Name Input */}
                                <div className="space-y-4">
                                    <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 ml-4">Full Identity</Label>
                                    <div className="relative group">
                                        <User className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-linen/10 group-focus-within:text-sage transition-colors" />
                                        <Input
                                            id="fullName"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="h-24 pl-20 pr-10 rounded-[2.5rem] bg-white/5 border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-bold text-linen text-xl placeholder:text-linen/5 shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-4">
                                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 ml-4">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-linen/10 group-focus-within:text-sage transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                            className="h-24 pl-20 pr-10 rounded-[2.5rem] bg-white/5 border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-bold text-linen text-xl placeholder:text-linen/5 shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-4">
                                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 ml-4">Mobile Vector</Label>
                                    <div className="relative group">
                                        <Phone className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-linen/10 group-focus-within:text-sage transition-colors" />
                                        <Input
                                            id="phone"
                                            placeholder="+233..."
                                            value={formData.phone}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                                            className="h-24 pl-20 pr-10 rounded-[2.5rem] bg-white/5 border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-bold text-linen text-xl placeholder:text-linen/5 shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-4">
                                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 ml-4">Secure Key</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-linen/10 group-focus-within:text-sage transition-colors" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                            className="h-24 pl-20 pr-10 rounded-[2.5rem] bg-white/5 border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-bold text-linen text-xl placeholder:text-linen/5 shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-[0.5em] text-linen/20 ml-4">Confirm Key</Label>
                                <div className="relative group">
                                    <CheckCircle2 className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-linen/10 group-focus-within:text-sage transition-colors" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="h-24 pl-20 pr-10 rounded-[2.5rem] bg-white/5 border-white/5 focus:ring-4 focus:ring-sage/5 focus:border-sage/40 transition-all font-bold text-linen text-xl placeholder:text-linen/5 shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-24 shadow-2xl shadow-black/40 text-lg active:scale-95 group"
                            >
                                {isLoading ? "Archiving Identity..." : (
                                    <span className="flex items-center gap-6">
                                        Register Identity <ArrowRight className="h-6 w-6 group-hover:translate-x-4 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        {/* Footer */}
                        <div className="text-center pt-12 border-t border-white/5">
                            <p className="text-xs text-linen/20 font-medium italic tracking-tight">
                                Already established? <Link href="/signin" className="text-linen font-black underline decoration-sage/40 underline-offset-8 hover:text-sage transition-all ml-3 italic">Sign-In session</Link>
                            </p>
                        </div>
                    </div>

                    {/* Branding */}
                    <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                        <Sparkles size={350} className="text-sage" />
                    </div>
                </div>

                {/* Bottom Tag */}
                <div className="mt-16 text-center opacity-10 flex flex-col items-center gap-8">
                    <Heart size={24} className="text-sage" />
                    <p className="text-[10px] font-black uppercase tracking-[1.5em] text-linen/40">MindBridge Protocol Hub 2.2</p>
                </div>
            </div>
        </div>
    );
}
