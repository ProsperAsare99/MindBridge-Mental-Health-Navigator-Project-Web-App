"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    AlertCircle, 
    Phone, 
    X, 
    Heart, 
    ShieldAlert,
    Clock,
    User,
    MapPin,
    LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Resource {
    name: string;
    number: string;
    description: string;
}

interface CampusResource {
    name: string;
    location: string;
    hours: string;
    emergency: string;
}

interface CrisisModalProps {
    isOpen: boolean;
    onClose: () => void;
    userUniversity?: string;
    emergencyContacts?: { name: string; phone: string; relationship: string }[];
}

export function CrisisModal({ 
    isOpen, 
    onClose, 
    userUniversity = "KNUST",
    emergencyContacts = []
}: CrisisModalProps) {
    const [activeTab, setActiveTab] = useState<'hotlines' | 'campus' | 'contacts'>('hotlines');

    const nationalHotlines: Resource[] = [
        {
            name: "Ghana National Emergency",
            number: "112",
            description: "Immediate emergency response services 24/7"
        },
        {
            name: "Mental Health Helpline",
            number: "0800 900 900",
            description: "Dedicated national psychological support"
        },
        {
            name: "Suicide Prevention",
            number: "020 000 0000",
            description: "Voluntary crisis intervention service"
        }
    ];

    const campusResources: Record<string, CampusResource> = {
        "KNUST": {
            name: "KNUST Counseling Center",
            location: "New Administration Block, 1st Floor",
            hours: "8:00 AM - 5:00 PM (Emergency 24/7)",
            emergency: "024 400 0000"
        },
        "University of Ghana": {
            name: "UG Counseling Centre",
            location: "Legon Campus, Student Affairs",
            hours: "8:00 AM - 4:30 PM",
            emergency: "055 500 0000"
        }
    };

    const currentCampus = campusResources[userUniversity] || campusResources["KNUST"];

    const handleCall = (number: string) => {
        window.location.href = `tel:${number.replace(/\s/g, '')}`;
    };

    const tabs = [
        { id: 'hotlines', label: 'Hotlines', icon: Phone },
        { id: 'campus', label: 'Campus', icon: MapPin },
        { id: 'contacts', label: 'Contacts', icon: User }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-[500px] bg-card border border-red-500/20 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col"
                    >
                        {/* Emergency Header */}
                        <div className="bg-red-500 p-6 text-white relative overflow-hidden">
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -right-4 -top-4 opacity-10"
                            >
                                <ShieldAlert size={120} />
                            </motion.div>
                            
                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        <h2 className="text-lg font-black uppercase tracking-tight">Crisis Support</h2>
                                    </div>
                                    <p className="text-xs font-bold text-red-100 uppercase tracking-widest">You are safe here. We are with you.</p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={onClose}
                                    className="rounded-full hover:bg-white/10 text-white"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <button
                                onClick={() => handleCall('112')}
                                className="mt-6 w-full h-14 bg-white text-red-600 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-black/10 active:scale-95 transition-transform"
                            >
                                <Phone className="h-6 w-6" />
                                CALL EMERGENCY (112)
                            </button>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex p-2 gap-1 bg-muted/30 border-b border-border/40">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={cn(
                                        "flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all",
                                        activeTab === tab.id 
                                            ? "bg-white border border-border/40 shadow-sm text-primary" 
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <tab.icon size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 h-[320px] overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {activeTab === 'hotlines' && (
                                    <motion.div
                                        key="hotlines"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-3"
                                    >
                                        {nationalHotlines.map((res, i) => (
                                            <div key={i} className="p-4 rounded-3xl bg-muted/30 border border-border/40 group hover:border-primary/20 transition-all">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-foreground">{res.name}</h4>
                                                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">{res.description}</p>
                                                    </div>
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost"
                                                        onClick={() => handleCall(res.number)}
                                                        className="rounded-full h-8 w-8 text-primary shadow-sm"
                                                    >
                                                        <Phone size={14} />
                                                    </Button>
                                                </div>
                                                <div className="text-xs font-black text-primary/60 tracking-tighter">{res.number}</div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === 'campus' && (
                                    <motion.div
                                        key="campus"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center border border-primary/10">
                                                    <MapPin className="text-primary h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{currentCampus.name}</h4>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{userUniversity}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2 text-[11px] font-medium text-muted-foreground">
                                                    <Clock className="h-3 w-3 mt-0.5" />
                                                    <span>{currentCampus.hours}</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-[11px] font-medium text-muted-foreground">
                                                    <ShieldAlert className="h-3 w-3 mt-0.5" />
                                                    <span>{currentCampus.location}</span>
                                                </div>
                                            </div>
                                            <Button 
                                                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold gap-2"
                                                onClick={() => handleCall(currentCampus.emergency)}
                                            >
                                                <Phone size={16} />
                                                Contact Counseling Center
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'contacts' && (
                                    <motion.div
                                        key="contacts"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-4"
                                    >
                                        {emergencyContacts.length > 0 ? (
                                            emergencyContacts.map((contact, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/40">
                                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                        <User className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-bold text-foreground">{contact.name}</h4>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{contact.relationship}</p>
                                                    </div>
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost"
                                                        onClick={() => handleCall(contact.phone)}
                                                        className="rounded-full text-primary"
                                                    >
                                                        <Phone size={16} />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10 opacity-40">
                                                <User size={48} className="text-muted-foreground" />
                                                <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed max-w-[200px]">No emergency contacts configured in settings.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Message */}
                        <div className="p-4 bg-muted/10 border-t border-border/40 text-center">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                                <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                                You are deeply valued. Stay with us.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
