"use client";

export const dynamic = "force-static";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";
import { ChallengesDashboard } from "@/components/dashboard/ChallengesDashboard";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChallengesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
            <DashboardContainer>
                <DashboardItem className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
                                <ChevronLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Growth Challenges</h1>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Collective & Personal Wellness Journeys</p>
                        </div>
                    </div>
                </DashboardItem>

                <DashboardItem>
                    <ChallengesDashboard />
                </DashboardItem>
            </DashboardContainer>
        </div>
    );
}
