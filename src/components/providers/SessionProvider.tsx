"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

function SessionSync() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user) {
            const token = (session.user as any).accessToken;
            if (token) {
                api.setToken(token);
                console.log('[AUTH SYNC] Updated localStorage token from session');
            }
        } else if (status === "unauthenticated") {
            // Keep the token if it's already there, but if NextAuth says we are logged out,
            // we should probably respect that unless we are in a static "offline" mode.
            // For now, let's just log it.
            console.log('[AUTH SYNC] NextAuth status: unauthenticated');
        }
    }, [session, status]);

    return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [initialSession, setInitialSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function hydrateSession() {
            try {
                const token = api.getToken();
                if (token) {
                    console.log('[AUTH HYDRATE] Token found, fetching user profile...');
                    // Try to fetch the user profile from the backend
                    const res = await api.get('/auth/me');
                    
                    if (res && res.user) {
                        setInitialSession({
                            user: {
                                ...res.user,
                                accessToken: token
                            },
                            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                        });
                        console.log('[AUTH HYDRATE] Session restored successfully');
                    } else {
                        // Token found but user fetch failed or returned no user
                        setInitialSession({ expires: "1970-01-01T00:00:00.000Z" });
                    }
                } else {
                    // No token found - provide an expired session to prevent automatic client-side fetch in static mode
                    setInitialSession({ expires: "1970-01-01T00:00:00.000Z" });
                    console.log('[AUTH HYDRATE] No token found, providing unauthenticated state');
                }
            } catch (error) {
                console.error('[AUTH HYDRATE] Failed to restore session:', error);
                // On error, also provide an expired session to prevent repeated fetch attempts
                setInitialSession({ expires: "1970-01-01T00:00:00.000Z" });
            } finally {
                setLoading(false);
            }
        }

        hydrateSession();
    }, []);

    // Don't render SessionProvider until we've tried to hydrate
    if (loading) {
        return null;
    }

    return (
        <SessionProvider session={initialSession} refetchOnWindowFocus={false} refetchInterval={0}>
            <SessionSync />
            {children}
        </SessionProvider>
    );
}
