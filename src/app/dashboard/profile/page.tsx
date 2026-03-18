"use client";

import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import {
    User,
    Mail,
    School,
    BookOpen,
    Phone,
    ShieldCheck,
    Camera,
    MapPin,
    Calendar,
    Sparkles,
    Edit3,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { user, updateAvatar } = useAuth();
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            await updateAvatar(file);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const profileFields = [
        { icon: Mail, label: "Email Address", value: user.email },
        { icon: School, label: "Institution", value: user.institution || "Not specified" },
        { icon: BookOpen, label: "Course / Major", value: user.course || "Not specified" },
        { icon: ShieldCheck, label: "Student ID", value: user.studentId || "Not specified" },
        { icon: Phone, label: "Phone Number", value: user.phoneNumber || "Not specified" },
    ];

    const avatarUrl = user.image
        ? (user.image.startsWith('http') ? user.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${user.image}`)
        : null;

    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10 theme-luxury">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 text-center md:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <User size={12} /> My Profile
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                        Manage <span className="text-primary">Identity</span>
                    </h1>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-[2.5rem] overflow-hidden border border-border shadow-premium"
                >
                    <div className="h-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 relative">
                        <div className="absolute -bottom-12 left-8 p-1 rounded-[2rem] bg-background border border-border shadow-xl">
                            <div className="h-24 w-24 rounded-[1.8rem] bg-primary/10 border border-border flex items-center justify-center text-primary text-3xl font-black overflow-hidden relative group">
                                {avatarUrl ? (
                                    <Image src={avatarUrl} alt={user.name || "Avatar"} width={96} height={96} priority unoptimized className="h-full w-full object-cover" sizes="96px" />
                                ) : (
                                    user.displayName ? user.displayName[0].toUpperCase() : "U"
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border-2 border-background hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                <Camera size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="pt-16 pb-12 px-8 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-foreground/90">{user.displayName || user.name || "Student"}</h2>
                                <div className="flex items-center gap-4 text-muted-foreground font-medium text-xs">
                                    <div className="flex items-center gap-1.5 uppercase tracking-widest font-bold">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                        {user.isAnonymous ? "Anonymous Mode" : "Verified User"}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={12} /> Ghana
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => router.push("/dashboard/settings")}
                                className="rounded-2xl font-bold h-12 px-6"
                            >
                                <Edit3 size={16} className="mr-2 group-hover:rotate-12 transition-transform" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {profileFields.map((field, i) => (
                                <div key={i} className="p-6 rounded-[2rem] bg-muted/40 glass border border-border hover:border-primary/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <field.icon size={18} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{field.label}</p>
                                            <p className="text-sm font-bold text-foreground/90">{field.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass border border-border rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                            <Sparkles size={80} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" /> Activity Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-muted-foreground">Account Created</span>
                                <span className="text-foreground/80">Mar 2026</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-muted-foreground">Session History</span>
                                <span className="text-foreground/80">Protected</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-muted-foreground">Data Privacy</span>
                                <span className="text-green-500 font-bold">Enabled</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card glass border border-primary/10 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-4 shadow-premium"
                    >
                        <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <ShieldCheck size={32} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-foreground">Secure Identity</h3>
                            <p className="text-xs text-muted-foreground font-medium px-4">Your personal details are encrypted and never shared with third parties.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
