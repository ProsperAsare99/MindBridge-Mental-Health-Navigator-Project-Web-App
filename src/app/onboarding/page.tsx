"use client";

import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
    const { user, status } = useAuth();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/login");
        }
        if (user?.onboardingCompleted) {
            redirect("/dashboard");
        }
    }, [user, status]);

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <OnboardingWizard />
        </main>
    );
}
