"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { Button } from "@/components/ui/Button";
import {
    User,
    Mail,
    School,
    BookHeart,
    IdCard,
    Lock,
    Save,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff,
} from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();

    // Profile fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");

    // Password fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    // State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Check if user signed in with email/password (has password provider)
    const isPasswordUser = user?.providerData?.some(
        (p) => p.providerId === "password"
    );

    // Fetch existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || user.displayName || "");
                    setEmail(user.email || "");
                    setInstitution(data.institution || "");
                    setStudentId(data.studentId || "");
                    setCourse(data.course || "");
                } else {
                    setName(user.displayName || "");
                    setEmail(user.email || "");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    // Save profile details
    const handleSaveProfile = async () => {
        if (!user?.uid) return;
        setSaving(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            // Update Firestore
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                name,
                institution,
                studentId,
                course,
            });

            // Update Firebase Auth display name
            await updateProfile(user, { displayName: name });

            setProfileSuccess("Profile updated successfully!");
            setTimeout(() => setProfileSuccess(""), 4000);
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setProfileError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Change password
    const handleChangePassword = async () => {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        setChangingPassword(true);
        try {
            // Re-authenticate first
            const credential = EmailAuthProvider.credential(
                user!.email!,
                currentPassword
            );
            await reauthenticateWithCredential(user!, credential);

            // Update password
            await updatePassword(user!, newPassword);

            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 4000);
        } catch (err: any) {
            console.error("Error changing password:", err);
            if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                setPasswordError("Current password is incorrect.");
            } else if (err.code === "auth/weak-password") {
                setPasswordError("New password is too weak. Use at least 6 characters.");
            } else {
                setPasswordError("Failed to change password. Please try again.");
            }
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            </div>
        );
    }

    const inputClasses =
        "w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-white font-medium placeholder-white/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all shadow-xl backdrop-blur-2xl";

    return (
        <div className="min-h-screen relative font-sans text-linen pb-20">
            <div className="relative z-10 space-y-12 p-6 md:p-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-500/10 border-2 border-indigo-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.15)] backdrop-blur-xl">
                            <Save className="h-10 w-10 text-indigo-300" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-linen uppercase tracking-widest drop-shadow-2xl opacity-90">
                                Settings
                            </h1>
                            <p className="text-indigo-300 font-bold text-sm md:text-base uppercase tracking-[0.3em] opacity-60 mt-1 italic">
                                Personalized Dashboard
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Section */}
                <div className="rounded-[4rem] border-2 border-white/5 bg-black/20 backdrop-blur-3xl p-10 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.5)] space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10">
                        <User size={300} className="text-indigo-300" />
                    </div>

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border-2 border-indigo-400/20 flex items-center justify-center shadow-2xl backdrop-blur-xl">
                            <User className="h-8 w-8 text-indigo-200" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-linen uppercase tracking-tighter italic opacity-90">
                                Account Profile
                            </h2>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] opacity-50 mt-1">
                                Your digital identity
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-4 relative z-10">
                        <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                            <User className="h-4 w-4" /> Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClasses}
                            placeholder="Type your name..."
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div className="space-y-4 relative z-10">
                        <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                            <Mail className="h-4 w-4" /> Official Email
                        </label>
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className={`${inputClasses} opacity-30 cursor-not-allowed border-white/5 shadow-inner`}
                            />
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[9px] font-black text-indigo-400/40 uppercase tracking-[0.3em]">
                                Protected
                            </div>
                        </div>
                    </div>

                    {/* Institution */}
                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                <School className="h-4 w-4" /> University
                            </label>
                            <input
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className={inputClasses}
                                placeholder="Your institution"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                <IdCard className="h-4 w-4" /> Student Number
                            </label>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className={inputClasses}
                                placeholder="ID e.g. 1234567"
                            />
                        </div>
                    </div>

                    {/* Course */}
                    <div className="space-y-4 relative z-10">
                        <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                            <BookHeart className="h-4 w-4" /> Department / Major
                        </label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className={inputClasses}
                            placeholder="Your program of study"
                        />
                    </div>

                    <div className="flex flex-col gap-8 pt-10 relative z-10">
                        {profileSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-4 text-green-300 font-bold text-sm bg-green-500/10 border-2 border-green-500/20 rounded-[2rem] px-8 py-5 shadow-2xl backdrop-blur-xl"
                            >
                                <CheckCircle2 className="h-6 w-6" />
                                {profileSuccess}
                            </motion.div>
                        )}
                        {profileError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-4 text-red-300 font-bold text-sm bg-red-500/10 border-2 border-red-500/20 rounded-[2rem] px-8 py-5 shadow-2xl backdrop-blur-xl"
                            >
                                <AlertCircle className="h-6 w-6" />
                                {profileError}
                            </motion.div>
                        )}

                        <Button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="bg-indigo-600/80 hover:bg-indigo-500 text-linen font-black uppercase tracking-[0.3em] px-12 py-6 h-auto rounded-[1.8rem] shadow-[0_0_40px_rgba(99,102,241,0.2)] border border-indigo-400/30 transition-all hover:scale-[1.03] active:scale-95 self-start text-xs"
                        >
                            <Save className="mr-4 h-5 w-5" />
                            {saving ? "Saving Changes..." : "Secure Save"}
                        </Button>
                    </div>
                </div>

                {/* Password Section — only for email/password users */}
                {isPasswordUser && (
                    <div className="rounded-[4rem] border-2 border-white/5 bg-black/20 backdrop-blur-3xl p-10 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.5)] space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10">
                            <Lock size={300} className="text-purple-300" />
                        </div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border-2 border-purple-400/20 flex items-center justify-center shadow-2xl backdrop-blur-xl">
                                <Lock className="h-8 w-8 text-purple-200" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-linen uppercase tracking-tighter italic opacity-90">
                                    Security Suite
                                </h2>
                                <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] opacity-50 mt-1">
                                    Manage your vault access
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                <Lock className="h-4 w-4" /> Current Password
                            </label>
                            <div className="relative group">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Verify identity..."
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-8 top-1/2 -translate-y-1/2 text-linen/20 hover:text-linen transition-colors"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-6 w-6" />
                                    ) : (
                                        <Eye className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                    <Lock className="h-4 w-4" /> New Vault Key
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={inputClasses}
                                        placeholder="Min 6 chars..."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-linen/20 hover:text-linen transition-colors"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-6 w-6" />
                                        ) : (
                                            <Eye className="h-6 w-6" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-[10px] font-black text-linen/20 uppercase tracking-[0.5em] ml-4">
                                    <Lock className="h-4 w-4" /> Repeat New Key
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Exactly the same..."
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 pt-10 relative z-10">
                            {passwordSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-4 text-green-300 font-bold text-sm bg-green-500/10 border-2 border-green-500/20 rounded-[2rem] px-8 py-5 shadow-2xl backdrop-blur-xl"
                                >
                                    <CheckCircle2 className="h-6 w-6" />
                                    {passwordSuccess}
                                </motion.div>
                            )}
                            {passwordError && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-4 text-red-300 font-bold text-sm bg-red-500/10 border-2 border-red-500/20 rounded-[2rem] px-8 py-5 shadow-2xl backdrop-blur-xl"
                                >
                                    <AlertCircle className="h-6 w-6" />
                                    {passwordError}
                                </motion.div>
                            )}

                            <Button
                                onClick={handleChangePassword}
                                disabled={
                                    changingPassword ||
                                    !currentPassword ||
                                    !newPassword ||
                                    !confirmPassword
                                }
                                className="bg-gradient-to-r from-purple-600/80 to-indigo-700/80 hover:from-purple-500 hover:to-indigo-600 text-linen font-black uppercase tracking-[0.3em] px-12 py-6 h-auto rounded-[1.8rem] shadow-[0_0_40px_rgba(168,85,247,0.2)] border border-purple-400/30 transition-all hover:scale-[1.03] active:scale-95 self-start text-xs"
                            >
                                <Lock className="mr-4 h-5 w-5" />
                                {changingPassword ? "Updating Vault..." : "Reset Password"}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Info for social sign-in users */}
                {!isPasswordUser && (
                    <div className="rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl p-8 shadow-2xl flex items-start gap-5 animate-in fade-in duration-700 delay-300">
                        <AlertCircle className="h-6 w-6 text-indigo-400/60 flex-shrink-0 mt-1" />
                        <p className="text-sm text-linen/30 font-bold italic tracking-tight">
                            You signed in with a third-party provider (Google or Phone).
                            Password management is handled by your provider.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
