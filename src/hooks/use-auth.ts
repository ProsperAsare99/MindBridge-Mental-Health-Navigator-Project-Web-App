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
}

export function useAuth() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const user = useMemo<User | null>(() => {
        if (!session?.user) return null;

        return {
            id: (session.user as any).id || "",
            email: session.user.email || "",
            name: session.user.name || "",
            displayName: session.user.name || "",
            isVerified: (session.user as any).isVerified ?? true,
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
        loginWithGoogle,
        loginAnonymously,
        loginWithCredentials,
        isAuthenticated: !!session
    };
}
