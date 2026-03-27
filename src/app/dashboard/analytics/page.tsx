"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DeepDivePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") return null;
    if (!session) return null;

    return (
        <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
            <DashboardContainer>
                {/* Header */}
                <DashboardItem className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="h-12 w-12 rounded-2xl border border-border/40 hover:bg-muted active:scale-95 transition-all">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-4xl font-black text-foreground tracking-tighter">Longevity <span className="text-primary italic">Insights.</span></h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Phase 5: The Resilience Engine</p>
                        </div>
                    </div>
                    <Button className="h-12 px-6 rounded-2xl bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 font-black uppercase text-[10px] tracking-widest gap-2">
                        <Share2 size={14} /> Export Map
                    </Button>
                </DashboardItem>

                {/* Main Content */}
                <DashboardItem>
                    <AnalyticsDashboard />
                </DashboardItem>
            </DashboardContainer>
        </div>
    );
}
