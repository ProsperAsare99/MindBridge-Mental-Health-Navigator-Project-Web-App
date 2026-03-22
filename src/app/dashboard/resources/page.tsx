import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ResourceHub } from "@/components/resources/ResourceHub";
import {
    ARTICLES,
    CATEGORIES,
    SELF_HELP_TOOLS,
    RECOMMENDED_APPS,
    VIDEO_RESOURCES,
    FREE_BOOKS
} from "@/lib/resources-data";
import * as FramerMotion from "framer-motion";

// This is a Server Component with ISR (1 hour revalidation)
export const revalidate = 3600;

export default function ResourcesPage() {
    return (
        <div className="min-h-screen relative pb-20 selection:bg-primary/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-secondary/5 blur-[150px] rounded-full" />
            </div>

            <div className="space-y-12 p-6 md:p-10 max-w-7xl mx-auto">
                {/* Header Section (Static Part) */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                        <BookOpen size={12} /> Resource Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                        Wellness <span className="text-primary">Library</span> & Expansion
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        Our expanded collection of mental health resources is designed for student life. Restore your peace, explore new insights, and build your resilience.
                    </p>
                </div>

                {/* Interactive Hub Component */}
                <ResourceHub 
                    articles={ARTICLES}
                    categories={CATEGORIES as any}
                    selfHelpTools={SELF_HELP_TOOLS}
                    recommendedApps={RECOMMENDED_APPS}
                    videoResources={VIDEO_RESOURCES}
                    freeBooks={FREE_BOOKS}
                />

                {/* Footer Quote (Static) */}
                <div className="text-center pt-8 space-y-4 opacity-60">
                    <p className="text-xs text-muted-foreground italic font-medium">"Wo nkoa wo nti me nsa yare3, 3y3 s3 wob3 bisa mmoa y3."</p>
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">MindBridge Wellness Librarian</div>
                </div>
            </div>
        </div>
    );
}
