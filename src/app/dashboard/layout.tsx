"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user && !(session.user as any).onboardingCompleted) {
            router.push("/onboarding");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <DashboardShell user={session.user}>
            {children}
        </DashboardShell>
    );
}
