"use client";

import { useMemo, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from '@/lib/api';

export interface User {
    id: string;
    email: string;
    name: string;
    institution?: string;
    studentId?: string;
    course?: string;
    phoneNumber?: string;
    displayName?: string;
    isVerified?: boolean;
    isAnonymous?: boolean;
    googleId?: string;
    image?: string;
    onboardingStep?: number;
    onboardingCompleted?: boolean;
    nickname?: string;
    yearOfStudy?: string;
    fieldOfStudy?: string;
    preferredLanguage?: string;
    notificationPreference?: string;
    checkInTime?: string;
    wellbeingBaseline?: string;
    reasonsForJoining?: string[];
    hasSupportSystem?: string;
    previousProfessionalSupport?: string;
    selfHarmRisk?: string;
    emergencyContacts?: any;
    copingStyles?: string[];
    academicStressors?: any;
    spiritualityImportance?: string;
    preferredApproach?: string;
    goals?: string[];
    trackingFrequency?: string;
    trackingMetrics?: string[];
    dataSharingConsent?: boolean;
    dataVisibility?: string;
    preferredTheme?: string;
    dashboardLayout?: string;
}

export function useAuth() {
    const { data: session, status, update } = useSession();
    const loading = status === "loading";

    const user = useMemo<User | null>(() => {
        if (!session?.user) return null;

        return {
            id: (session.user as any).id || "",
            email: session.user.email || "",
            name: session.user.name || "",
            displayName: session.user.name || "",
            isVerified: (session.user as any).isVerified ?? true,
            isAnonymous: (session.user as any).isAnonymous ?? false,
            image: (session.user as any).image || "",
            ...(session.user as any)
        };
    }, [session, status]);

    // Synchronize NextAuth token with API client
    useEffect(() => {
        const token = (session?.user as any)?.accessToken;
        if (token) {
            api.setToken(token);
        } else if (status === "unauthenticated") {
            api.setToken(null);
        }
    }, [session, status]);

    const logout = async () => {
        await signOut({ redirect: false });
        api.setToken(null);
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            const res = await api.post('/auth/profile', data);
            
            // Sync with NextAuth session
            await update({
                user: {
                    ...session?.user,
                    name: res.name,
                    institution: res.institution,
                    studentId: res.studentId,
                    course: res.course,
                    phoneNumber: res.phoneNumber
                }
            });
            
            return res;
        } catch (error: any) {
            console.error('Profile update failed:', error.message);
            throw error;
        }
    };

    const updateAvatar = async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await api.post('/auth/avatar', formData);
            await update({
                user: {
                    image: res.imageUrl
                }
            });
            return res;
        } catch (error) {
            console.error('Avatar update failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password?: string, name?: string, institution?: string, studentId?: string, course?: string, phoneNumber?: string) => {
        try {
            const res = await api.post('/auth/register', { email, password, name, institution, studentId, course, phoneNumber });
            
            // Automatically log in after registration if token is returned
            if (res.token) {
                api.setToken(res.token);
                await update({
                    user: res.user,
                    accessToken: res.token
                });
            }
            return res;
        } catch (error: any) {
            console.error('Registration failed:', error.message);
            throw error;
        }
    };

    const loginWithGoogle = async (idToken?: string) => {
        try {
            if (idToken) {
                const res = await api.post('/auth/google', { idToken });
                api.setToken(res.token);
                return res;
            } else {
                return await signIn("google", { callbackUrl: "/dashboard" });
            }
        } catch (error) {
            console.error('Google login failed:', error);
            throw error;
        }
    };

    const loginAnonymously = async () => {
        try {
            const res = await api.post('/auth/anonymous', {});
            if (res.token) {
                api.setToken(res.token);
                // We use NextAuth credentials provider internally for our custom session
                await signIn("credentials", {
                    email: res.user.email,
                    accessToken: res.token,
                    redirect: true,
                    callbackUrl: "/dashboard"
                });
            }
            return res;
        } catch (error) {
            console.error('Anonymous login failed:', error);
            throw error;
        }
    };

    const loginWithCredentials = async (email: string, password: string) => {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(result.error);
        }

        return result;
    };

    return {
        user,
        loading,
        logout,
        updateProfile,
        updateAvatar,
        register,
        loginWithGoogle,
        loginAnonymously,
        loginWithCredentials,
        updateSession: update,
        status,
        isAuthenticated: !!session
    };
}
