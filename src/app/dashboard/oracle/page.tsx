"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { AIChatbot } from "@/components/dashboard/AIChatbot";
import { CrisisModal } from "@/components/dashboard/CrisisModal";
import { MoodInsight } from "@/components/dashboard/MoodInsight";
import { BrainCircuit, Info } from "lucide-react";

export default function OraclePage() {
    const [moods, setMoods] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

    useEffect(() => {
        fetchMoods();
        fetchProfile();
    }, []);

    const fetchMoods = async () => {
        try {
            const data = await api.get('/mood');
            setMoods(data);
        } catch (error) {
            console.error("Error fetching moods:", error);
        }
    };

    const fetchProfile = async () => {
        try {
            const data = await api.get('/auth/me');
            setUserProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 p-6 overflow-hidden">
            {/* Main Chat Area */}
            <div className="flex-1 min-w-0">
                <AIChatbot 
                    onCrisisDetected={() => setIsCrisisModalOpen(true)}
                />
            </div>

            {/* Sidebar / Insights */}
            <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
                <MoodInsight moods={moods} />
                
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2.5rem] space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Info className="h-4 w-4 text-primary" />
                        </div>
                        <h4 className="text-xs font-black text-foreground uppercase tracking-tight">Oracle Info</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                        The Oracle uses your recent mood history and academic context to provide personalized guidance.
                    </p>
                </div>
            </div>

            <CrisisModal 
                isOpen={isCrisisModalOpen} 
                onClose={() => setIsCrisisModalOpen(false)} 
                userUniversity={userProfile?.university}
                emergencyContacts={userProfile?.emergencyContacts}
            />
        </div>
    );
}

