"use client";

import { useEffect, useState } from "react";
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
    ChevronRight,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

    // State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isPasswordUser = user?.providerData?.some((p) => p.providerId === "password");

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
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleSaveProfile = async () => {
        if (!user?.uid) return;
        setSaving(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, { name, institution, studentId, course });
            await updateProfile(user, { displayName: name });

            setProfileSuccess("Profile updated successfully!");
            setTimeout(() => setProfileSuccess(""), 4000);
        } catch (err: any) {
            setProfileError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setChangingPassword(true);
        try {
            const credential = EmailAuthProvider.credential(user!.email!, currentPassword);
            await reauthenticateWithCredential(user!, credential);
            await updatePassword(user!, newPassword);

            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 4000);
        } catch (err: any) {
            setPasswordError("Incorrect current password or update failed.");
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full" />
            </div>

            <div className="space-y-10 p-6 md:p-10 max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <ShieldCheck size={12} /> Account Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                        Profile <span className="text-primary">& Security</span>
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-2xl">
                        Manage your personal identity, academic details, and secure your account settings.
                    </p>
                </motion.div>

                <div className="grid gap-8">
                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card glass rounded-[2.5rem] p-8 md:p-12 border border-primary/10 shadow-premium space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                            <User size={200} />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground/90">Personal Identity</h3>
                                <p className="text-sm text-muted-foreground font-medium">Update your core profile information</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all"
                                        placeholder="Add name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email (Primary)</label>
                                <div className="relative opacity-60">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Institution</label>
                                <div className="relative group">
                                    <School className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={institution}
                                        onChange={(e) => setInstitution(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all"
                                        placeholder="Add institution"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student ID</label>
                                <div className="relative group">
                                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all"
                                        placeholder="Add student ID"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col md:flex-row items-center gap-6 border-t border-primary/10 mt-6 pt-10">
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="h-14 px-10 rounded-2xl font-bold shadow-xl shadow-primary/20"
                            >
                                <Save className="mr-2 h-4 w-4" /> {saving ? "Updating..." : "Update Profile"}
                            </Button>
                            {profileSuccess && (
                                <p className="text-xs font-bold text-secondary flex items-center gap-2">
                                    <CheckCircle2 size={16} /> {profileSuccess}
                                </p>
                            )}
                            {profileError && (
                                <p className="text-xs font-bold text-red-500 flex items-center gap-2">
                                    <AlertCircle size={16} /> {profileError}
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Password Section */}
                    {isPasswordUser && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-card glass rounded-[2.5rem] p-8 md:p-12 border border-primary/10 shadow-premium space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                    <Lock className="h-6 w-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground/90">Security Gate</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Update your secret credentials</p>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Current Secret</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10"
                                            placeholder="••••••••"
                                        />
                                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">New Secret</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10"
                                            placeholder="••••••••"
                                        />
                                        <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Secret</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-muted/30 border border-primary/5 rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 border-t border-primary/10 mt-6 pt-10">
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={changingPassword || !currentPassword}
                                    variant="secondary"
                                    className="h-14 px-10 rounded-2xl font-bold bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20"
                                >
                                    <Lock className="mr-2 h-4 w-4" /> {changingPassword ? "Updating..." : "Change Password"}
                                </Button>
                                {passwordSuccess && <p className="text-xs font-bold text-secondary flex items-center gap-2"><CheckCircle2 size={16} /> {passwordSuccess}</p>}
                                {passwordError && <p className="text-xs font-bold text-red-500 flex items-center gap-2"><AlertCircle size={16} /> {passwordError}</p>}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
