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
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    throw new Error("User not found");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                // Auto-verify user if they are not already
                if (!user.isVerified) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { isVerified: true }
                    });
                }

                const updatedUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isVerified: true,
                };
                console.log('NextAuth: authorize success', updatedUser);
                return updatedUser;
            },
        }),
    ],
    debug: true,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            console.log('NextAuth: jwt callback', { token, user });
            if (user) {
                token.id = user.id;
                token.isVerified = user.isVerified;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            console.log('NextAuth: session callback', { session, token });
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).isVerified = token.isVerified;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
