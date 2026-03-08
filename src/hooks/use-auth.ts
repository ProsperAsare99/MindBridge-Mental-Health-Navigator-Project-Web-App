import { useMemo } from 'react';
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
        console.log('useAuth: deriving user', { status, sessionUser: session?.user });
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

    const logout = async () => {
        await signOut({ redirect: false });
        api.setToken(null);
    };

    const loginWithGoogle = async (idToken?: string) => {
        try {
            // If idToken is provided, it might be from the old GoogleLogin component
            // But NextAuth's signIn('google') is preferred.
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
        loginWithCredentials,
        isAuthenticated: !!session
    };
}
