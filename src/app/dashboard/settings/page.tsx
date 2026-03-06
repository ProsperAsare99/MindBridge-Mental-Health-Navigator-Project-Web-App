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
import { Button } from "@/components/ui/button";
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
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-[2rem] bg-indigo-500/20 border-2 border-indigo-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            <Save className="h-8 w-8 text-indigo-300" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase tracking-widest drop-shadow-2xl">
                                Settings
                            </h1>
                            <p className="text-indigo-300 font-bold text-sm md:text-base uppercase tracking-widest opacity-80 mt-1">
                                Personalized Dashboard
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Section */}
                <div className="rounded-[2.5rem] border-2 border-white/10 bg-white/5 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10">
                        <User size={200} className="text-indigo-300" />
                    </div>

                    <div className="flex items-center gap-5 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-500/30 border-2 border-indigo-400/40 flex items-center justify-center shadow-2xl">
                            <User className="h-7 w-7 text-indigo-200" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic">
                                Account Profile
                            </h2>
                            <p className="text-sm font-bold text-indigo-400 uppercase tracking-[0.2em] opacity-80 mt-1">
                                Your digital identity
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-3 relative z-10">
                        <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                            <User className="h-3.5 w-3.5" /> Full Name
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
                    <div className="space-y-3 relative z-10">
                        <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                            <Mail className="h-3.5 w-3.5" /> Official Email
                        </label>
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className={`${inputClasses} opacity-40 cursor-not-allowed grayscale border-white/5`}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-50">
                                Protected
                            </div>
                        </div>
                    </div>

                    {/* Institution */}
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                <School className="h-3.5 w-3.5" /> University
                            </label>
                            <input
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className={inputClasses}
                                placeholder="Your institution"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                <IdCard className="h-3.5 w-3.5" /> Student Number
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
                    <div className="space-y-3 relative z-10">
                        <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                            <BookHeart className="h-3.5 w-3.5" /> Department / Major
                        </label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className={inputClasses}
                            placeholder="Your program of study"
                        />
                    </div>

                    <div className="flex flex-col gap-6 pt-6 relative z-10">
                        {profileSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 text-green-400 font-bold text-sm bg-green-500/10 border-2 border-green-500/30 rounded-2xl px-6 py-4 shadow-2xl"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                {profileSuccess}
                            </motion.div>
                        )}
                        {profileError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 text-red-400 font-bold text-sm bg-red-500/10 border-2 border-red-500/30 rounded-2xl px-6 py-4 shadow-2xl"
                            >
                                <AlertCircle className="h-5 w-5" />
                                {profileError}
                            </motion.div>
                        )}

                        <Button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-black uppercase tracking-[0.2em] px-10 py-5 h-auto rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.4)] border-2 border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-95 self-start"
                        >
                            <Save className="mr-3 h-5 w-5" />
                            {saving ? "Saving Changes..." : "Secure Save"}
                        </Button>
                    </div>
                </div>

                {/* Password Section — only for email/password users */}
                {isPasswordUser && (
                    <div className="rounded-[2.5rem] border-2 border-white/10 bg-white/5 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10">
                            <Lock size={200} className="text-indigo-300" />
                        </div>

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="h-14 w-14 rounded-2xl bg-purple-500/30 border-2 border-purple-400/40 flex items-center justify-center shadow-2xl">
                                <Lock className="h-7 w-7 text-purple-200" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest italic">
                                    Security Suite
                                </h2>
                                <p className="text-sm font-bold text-purple-400 uppercase tracking-[0.2em] opacity-80 mt-1">
                                    Manage your vault access
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                <Lock className="h-3.5 w-3.5" /> Current Password
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
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                    <Lock className="h-3.5 w-3.5" /> New Vault Key
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
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest ml-1">
                                    <Lock className="h-3.5 w-3.5" /> Repeat New Key
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

                        <div className="flex flex-col gap-6 pt-6 relative z-10">
                            {passwordSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 text-green-400 font-bold text-sm bg-green-500/10 border-2 border-green-500/30 rounded-2xl px-6 py-4 shadow-2xl"
                                >
                                    <CheckCircle2 className="h-5 w-5" />
                                    {passwordSuccess}
                                </motion.div>
                            )}
                            {passwordError && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 text-red-400 font-bold text-sm bg-red-500/10 border-2 border-red-500/30 rounded-2xl px-6 py-4 shadow-2xl"
                                >
                                    <AlertCircle className="h-5 w-5" />
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
                                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-black uppercase tracking-[0.2em] px-10 py-5 h-auto rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] border-2 border-purple-400/30 transition-all hover:scale-[1.02] active:scale-95 self-start"
                            >
                                <Lock className="mr-3 h-5 w-5" />
                                {changingPassword ? "Updating Vault..." : "Reset Password"}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Info for social sign-in users */}
                {!isPasswordUser && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl flex items-start gap-3 animate-in fade-in duration-500">
                        <AlertCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-indigo-200/80">
                            You signed in with a third-party provider (Google or Phone).
                            Password management is handled by your provider.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
