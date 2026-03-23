"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    MessageSquare, 
    Heart, 
    Search, 
    Plus,
    Filter,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SupportCircles } from '@/components/social/SupportCircles';
import { StoryFeed } from '@/components/social/StoryFeed';
import { MyNetwork } from '@/components/social/MyNetwork';

const TABS = [
    { id: 'circles', label: 'Support Circles', icon: Users, description: 'Moderated groups by concern' },
    { id: 'stories', label: 'Peer Stories', icon: MessageSquare, description: 'Anonymous student experiences' },
    { id: 'network', label: 'Peer Networking', icon: Heart, description: 'Encouragement & Mentorship' },
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('circles');

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Cinematic Header */}
            <div className="relative h-[350px] overflow-hidden flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-16 bg-gradient-to-t from-background via-background/40 to-transparent">
                <div className="absolute inset-0 bg-[#0077b6]/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto w-full space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Users size={24} />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Safe Space Verified</span>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                        Community <span className="text-primary italic">Pulse.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                        An anonymous sanctuary for shared resilience. Connect with peers who understand your journey.
                    </p>
                </motion.div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-4 gap-8">
                    <div className="flex items-center gap-2 md:gap-4 min-w-max">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all relative overflow-hidden",
                                        isActive ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <Icon size={18} className={cn("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                    {isActive && (
                                        <motion.div 
                                            layoutId="tab-pill"
                                            className="absolute inset-x-0 bottom-0 h-1 bg-white/20"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center h-12 bg-muted/30 border border-border/40 rounded-2xl px-4 w-64 group focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                            <Search size={16} className="text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search community..." 
                                className="bg-transparent border-none focus:ring-0 text-xs font-medium w-full ml-2"
                            />
                        </div>
                        <Button className="h-12 w-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 p-0 lg:px-6 lg:w-auto">
                            <Plus size={20} className="lg:mr-2" />
                            <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">Share My Voice</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'circles' && <SupportCircles />}
                        {activeTab === 'stories' && <StoryFeed />}
                        {activeTab === 'network' && <MyNetwork />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
