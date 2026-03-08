import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                accessToken: { label: "Access Token", type: "text" },
            },
            async authorize(credentials) {
                try {
                    // Check if we have an explicit access token (e.g. from anonymous login)
                    if (credentials?.accessToken) {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/auth/verify-token`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${credentials.accessToken}`,
                                'Content-Type': 'application/json'
                            },
                        });

                        if (!response.ok) {
                            throw new Error("Token verification failed");
                        }

                        const data = await response.json();
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            isVerified: data.user.isVerified ?? true,
                            accessToken: data.token || credentials.accessToken,
                        };
                    }

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Invalid credentials");
                    }

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.error || "Login failed");
                    }

                    const data = await response.json();

                    if (data.user && data.token) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            isVerified: data.user.isVerified ?? true,
                            accessToken: data.token,
                        };
                    }
                    return null;
                } catch (error: any) {
                    console.error("NextAuth Authorize Error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    debug: false,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.isVerified = user.isVerified;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).isVerified = token.isVerified;
                (session.user as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
