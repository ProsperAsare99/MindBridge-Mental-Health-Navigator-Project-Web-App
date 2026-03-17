"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
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
    X,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
    const { user, loading, updateProfile } = useAuth();
    const router = useRouter();

    // Profile fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Password fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Feedback state
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Dynamic security state
    const isPasswordUser = !!user && !user.googleId && !user.isAnonymous;
    const isGoogleUser = !!user && !!user.googleId;
    const isGuestUser = !!user && !!user.isAnonymous;

    useEffect(() => {
        if (user) {
            setName(user.name || user.displayName || "");
            setEmail(user.email || "");
            setInstitution(user.institution || "");
            setStudentId(user.studentId || "");
            setCourse(user.course || "");
            setPhoneNumber(user.phoneNumber || "");
        }
    }, [user]);

    const handleSaveProfile = async () => {
        // Simple validation
        if (phoneNumber && !/^\+?[\d\s-]{8,20}$/.test(phoneNumber)) {
            setProfileError("Please enter a valid phone number.");
            return;
        }

        setSaving(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            await updateProfile({ name, institution, studentId, course, phoneNumber });
            setProfileSuccess("Profile updated successfully!");
            setTimeout(() => setProfileSuccess(""), 4000);
        } catch (err: any) {
            setProfileError(err.message || "Failed to update profile.");
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
            await api.post('/auth/change-password', { currentPassword, newPassword });
            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 4000);
        } catch (err: any) {
            console.error(err);
            setPasswordError(err.message || "Incorrect current password or update failed.");
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
                    <div className="flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                                <ShieldCheck size={12} /> Account Center
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground/90">
                                Profile <span className="text-primary">& Security</span>
                            </h1>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/dashboard")}
                            className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                        >
                            <X size={20} className="text-muted-foreground" />
                        </Button>
                    </div>
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
                        className="glass rounded-[2.5rem] p-8 md:p-12 border border-border shadow-premium space-y-8 relative overflow-hidden"
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
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                                        placeholder="Add name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email (Primary)</label>
                                <div className="relative opacity-90">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="w-full bg-muted/20 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold cursor-not-allowed text-muted-foreground"
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
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
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
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                                        placeholder="Add student ID"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Course / Major</label>
                                <div className="relative group">
                                    <BookHeart className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                                        placeholder="Add course / major"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                                        placeholder="Add phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        {isGuestUser && (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-amber-500">Guest Account</p>
                                    <p className="text-xs text-amber-500/70 leading-relaxed">
                                        You are currently using a guest account. Create a full account to persist your progress across devices.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 flex flex-col md:flex-row items-center gap-6 border-t border-border mt-6 pt-10">
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="h-14 px-10 rounded-2xl font-bold"
                            >
                                <Save className="mr-2 h-4 w-4" /> {saving ? "Updating..." : "Update Profile"}
                            </Button>
                            {profileSuccess && (
                                <p className="text-xs font-bold text-secondary flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                                    <CheckCircle2 size={16} /> {profileSuccess}
                                </p>
                            )}
                            {profileError && (
                                <p className="text-xs font-bold text-red-500 flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
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
                            className="glass rounded-[2.5rem] p-8 md:p-12 border border-border shadow-premium space-y-8"
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
                                    <div className="relative group">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-muted/50 border border-border rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground"
                                            placeholder="••••••••"
                                        />
                                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">New Secret</label>
                                    <div className="relative group">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-muted/50 border border-border rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground"
                                            placeholder="••••••••"
                                        />
                                        <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
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
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 border-t border-border mt-6 pt-10">
                                <Button
                                    onClick={handleChangePassword}
                                    disabled={changingPassword || !currentPassword}
                                    variant="secondary"
                                    className="h-14 px-10 rounded-2xl font-bold"
                                >
                                    <Lock className="mr-2 h-4 w-4" /> {changingPassword ? "Updating..." : "Change Password"}
                                </Button>
                                {passwordSuccess && <p className="text-xs font-bold text-secondary flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20"><CheckCircle2 size={16} /> {passwordSuccess}</p>}
                                {passwordError && <p className="text-xs font-bold text-red-500 flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20"><AlertCircle size={16} /> {passwordError}</p>}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
