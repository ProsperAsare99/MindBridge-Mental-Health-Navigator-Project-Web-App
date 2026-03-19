import { getAuthSession } from "@/lib/server-api";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAuthSession();

    // Middleware handles redirects, but we still need session for the shell
    // If somehow session is missing, redirect to login
    if (!session) {
        redirect("/login");
    }

    if (!(session.user as any).onboardingCompleted) {
        redirect("/onboarding");
    }

    return (
        <DashboardShell user={session.user}>
            {children}
        </DashboardShell>
    );
}
