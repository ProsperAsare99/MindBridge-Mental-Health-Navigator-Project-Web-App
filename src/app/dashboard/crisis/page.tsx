"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    Phone,
    Globe,
    Heart,
    Shield,
    AlertTriangle,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Users,
    Clock,
    MapPin,
    Mail,
    Activity,
    Sparkles
} from "lucide-react";

const EMERGENCY_LINES = [
    {
        name: "National Ambulance",
        number: "193",
        description: "Medical emergencies across Ghana. Free priority access.",
        available: "24/7",
    },
    {
        name: "Police Emergency",
        number: "191",
        description: "Immediate safety concerns or life-threatening situations.",
        available: "24/7",
    },
    {
        name: "DOVVSU Support",
        number: "0302-773906",
        description: "Specialized unit for domestic violence, abuse, and assault.",
        available: "24/7",
    },
];

const MENTAL_HEALTH_LINES = [
    {
        name: "MHA Ghana Helpline",
        number: "0800-123-456",
        description: "Confidential mental health support and clinical referrals.",
        available: "Mon-Fri 8am-5pm",
    },
    {
        name: "Befrienders Worldwide",
        number: "233-244-846-328",
        description: "Emotional support for those in distress or at risk of suicide.",
        available: "24/7",
    },
];

const UNIVERSITY_RESOURCES = [
    {
        name: "University of Ghana (UG)",
        location: "Legon Campus, Accra",
        centre: "Careers and Counselling Centre",
        description: "Professional counselling for UG students. Walk-in and appointment-based sessions for academic stress, relationship issues, and mental health.",
        contacts: [
            { label: "Counselling Centre", phone: "0245 945 752" },
            { label: "Counselling Alt", phone: "0204 999 221" },
        ],
        email: "pad@ug.edu.gh",
        website: "https://www.ug.edu.gh/careers/counselling-services",
    },
    {
        name: "KNUST",
        location: "Kumasi, Ashanti Region",
        centre: "KNUST Counselling Center (KCC)",
        description: "Mental health facility with professional counselors. Offers crisis intervention, academic counselling, and psychological assessments.",
        contacts: [
            { label: "Counselling Centre", phone: "050 644 9747" },
            { label: "Counselling Alt", phone: "059 439 97772" },
        ],
        email: "counsellingcentre@knust.edu.gh",
        website: "https://www.knust.edu.gh/students/counselling",
    },
    {
        name: "Ashesi University",
        location: "Berekuso, Eastern Region",
        centre: "Counseling & Coaching Center",
        description: "Trained on-campus counsellors available for confidential sessions. Mental health awareness and peer support networks.",
        contacts: [
            { label: "Primary Center", phone: "030 261 0330" },
            { label: "Wellness Office", phone: "024 880 7992" },
        ],
        email: "studentlife@ashesi.edu.gh",
        website: "https://www.ashesi.edu.gh/student-life",
    },
];

const SELF_HELP_TIPS = [
    {
        title: "Grounding: 5-4-3-2-1",
        content: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. Re-anchors your frequency to the present.",
    },
    {
        title: "Box Breathing",
        content: "Inhale for 4s, Hold for 4s, Exhale for 4s, Hold for 4s. Activates the parasympathetic nervous system for immediate stabilization.",
    },
];

export default function CrisisPage() {
    const [expandedTip, setExpandedTip] = useState<number | null>(null);
    const [expandedUni, setExpandedUni] = useState<number | null>(null);

    const handleCall = (number: string) => {
        window.open(`tel:${number.replace(/\s/g, "")}`, "_self");
    };

    return (
        <div className="p-8 md:p-12 space-y-16 max-w-5xl mx-auto animate-in fade-in duration-1000">
            {/* Urgent Banner */}
            <div className="rounded-[4rem] border border-white/5 bg-black/40 p-12 md:p-16 shadow-2xl shadow-black/60 relative overflow-hidden group backdrop-blur-3xl">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-shrink-0 h-24 w-24 rounded-[2.5rem] bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/40 border border-white/10">
                        <AlertTriangle className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-linen leading-none uppercase italic">
                            Priority <span className="text-red-500 underline decoration-red-500/20 underline-offset-8 not-italic">One.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-linen/40 font-bold italic leading-relaxed max-w-xl">
                            Immediate safety protocol. If you are in a life-threatening situation, establish clinical contact immediately.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 flex-shrink-0 w-full md:w-auto">
                        <Button
                            size="xl"
                            onClick={() => handleCall("191")}
                            className="bg-red-600 hover:bg-black text-white h-20 px-12 text-sm font-black uppercase tracking-[0.4em] rounded-full transition-all active:scale-95 shadow-2xl shadow-red-900/20"
                        >
                            Establish 191
                        </Button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="space-y-6 border-l-[6px] border-sage ml-4 pl-10 py-4">
                <h2 className="text-4xl md:text-5xl font-black text-linen uppercase tracking-tighter leading-none">
                    Internal <span className="text-sage opacity-90 italic font-serif lowercase font-normal">Bridge.</span>
                </h2>
                <p className="text-lg md:text-xl text-linen/40 font-medium leading-relaxed max-w-2xl italic">
                    Reaching out is an act of courage. Below are confidential nodes across Ghana for high-priority support.
                </p>
            </div>

            {/* Emergency Numbers Grid */}
            <div className="grid gap-10 md:grid-cols-3">
                {EMERGENCY_LINES.map((line, index) => (
                    <div
                        key={index}
                        className="rounded-[3.5rem] border border-white/5 bg-white/5 p-10 shadow-2xl shadow-black/20 group hover:-translate-y-2 transition-all duration-700 backdrop-blur-md"
                    >
                        <h4 className="text-[10px] font-black text-red-400 uppercase tracking-[0.6em] mb-6 opacity-60">Vector 0{index + 1}</h4>
                        <h3 className="font-extrabold text-linen text-2xl mb-6 uppercase tracking-tight leading-none opacity-90">{line.name}</h3>
                        <p className="text-sm font-medium text-linen/30 mb-10 leading-relaxed italic">&ldquo;{line.description}&rdquo;</p>
                        <Button
                            size="lg"
                            onClick={() => handleCall(line.number)}
                            className="w-full bg-white/5 hover:bg-red-600 hover:text-white text-linen border border-white/10 shadow-none text-[10px] h-16 font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all"
                        >
                            Call {line.number}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Mental Health Section */}
            <div className="space-y-12">
                <div className="flex items-center gap-10">
                    <div className="h-px bg-white/5 flex-1" />
                    <h3 className="text-[10px] font-black text-linen/20 uppercase tracking-[0.8em]">Clinical Helplines</h3>
                    <div className="h-px bg-white/5 flex-1" />
                </div>
                <div className="grid gap-10 md:grid-cols-2">
                    {MENTAL_HEALTH_LINES.map((line, index) => (
                        <div
                            key={index}
                            className="rounded-[4rem] border border-white/5 bg-black/20 p-12 md:p-14 shadow-2xl shadow-black/40 relative overflow-hidden group backdrop-blur-3xl"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 bg-sage/20 rounded-full blur-3xl pointer-events-none" />
                            <h4 className="font-black text-linen text-3xl mb-6 group-hover:text-sage transition-all uppercase tracking-tighter opacity-90">
                                {line.name}
                            </h4>
                            <p className="text-md text-linen/40 mb-12 leading-relaxed font-medium italic">&ldquo;{line.description}&rdquo;</p>
                            <div className="flex items-center gap-5 mb-10">
                                <Clock className="h-5 w-5 text-sage opacity-60" />
                                <span className="text-[10px] font-black text-linen/20 uppercase tracking-[0.3em]">{line.available}</span>
                            </div>
                            <Button
                                size="xl"
                                onClick={() => handleCall(line.number)}
                                className="w-full shadow-2xl shadow-black/20"
                            >
                                Establish Connection
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* University Resource Hub */}
            <div className="space-y-12 pt-16">
                <div className="text-center space-y-4">
                    <h3 className="text-3xl font-black text-linen uppercase tracking-tighter opacity-90">Academic Nodes</h3>
                    <p className="text-[10px] font-black text-linen/20 uppercase tracking-[0.6em]">Integrated University Support</p>
                </div>

                <div className="space-y-8">
                    {UNIVERSITY_RESOURCES.map((uni, index) => (
                        <div
                            key={index}
                            className="rounded-[3.5rem] border border-white/5 bg-black/20 shadow-2xl shadow-black/20 overflow-hidden transition-all duration-700 hover:border-white/10"
                        >
                            <button
                                onClick={() => setExpandedUni(expandedUni === index ? null : index)}
                                className={`w-full flex items-center justify-between p-12 text-left transition-all ${expandedUni === index ? "bg-white/5" : ""}`}
                            >
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-black text-linen uppercase tracking-tighter opacity-90">{uni.name}</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-black text-linen/20 uppercase tracking-[0.4em]">
                                        <MapPin className="h-5 w-5 text-sage" /> {uni.location}
                                    </div>
                                </div>
                                {expandedUni === index ? <ChevronUp className="text-sage h-8 w-8" /> : <ChevronDown className="text-linen/10 h-8 w-8" />}
                            </button>

                            {expandedUni === index && (
                                <div className="p-12 border-t border-white/5 space-y-12 animate-in fade-in slide-in-from-top-8 duration-700">
                                    <div className="space-y-6">
                                        <p className="text-[10px] font-black text-sage uppercase tracking-[0.6em]">Protocol Overview</p>
                                        <p className="text-xl md:text-2xl text-linen/50 leading-relaxed font-bold italic font-serif">&ldquo;{uni.description}&rdquo;</p>
                                    </div>

                                    <div className="grid gap-8 sm:grid-cols-2">
                                        {uni.contacts.map((contact, cIdx) => (
                                            <button
                                                key={cIdx}
                                                onClick={() => handleCall(contact.phone)}
                                                className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/5 border border-transparent hover:border-white/10 group transition-all"
                                            >
                                                <div className="h-14 w-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                                    <Phone className="h-6 w-6 text-sage" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[10px] font-black text-linen/20 uppercase tracking-widest mb-2">{contact.label}</p>
                                                    <p className="text-xl font-black text-linen opacity-90">{contact.phone}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-6 border-t border-white/5 pt-12">
                                        <a href={`mailto:${uni.email}`} className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 text-linen/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                                            <Mail size={16} className="text-sage" /> {uni.email}
                                        </a>
                                        <a href={uni.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 text-linen/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                                            <Globe size={16} className="text-sage" /> Protocol Website <ExternalLink size={12} className="opacity-30" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Techniques Section */}
            <div className="grid gap-10 md:grid-cols-2 pt-16">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-linen uppercase tracking-tighter opacity-90">Coping Protocols</h3>
                    <p className="text-sm font-medium text-linen/30 leading-relaxed italic mb-10">Stabilization techniques for immediate frequency regulation.</p>
                    <div className="space-y-6">
                        {SELF_HELP_TIPS.map((tip, index) => (
                            <div key={index} className="rounded-[2.5rem] border border-white/5 bg-black/20 shadow-2xl shadow-black/20 overflow-hidden">
                                <button
                                    onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                                    className={`w-full p-10 text-left transition-all flex items-center justify-between ${expandedTip === index ? "bg-white/5" : ""}`}
                                >
                                    <span className="font-black text-linen uppercase tracking-tight italic opacity-90">&ldquo;{tip.title}&rdquo;</span>
                                    {expandedTip === index ? <ChevronUp size={20} className="text-sage" /> : <ChevronDown size={20} className="text-linen/10" />}
                                </button>
                                {expandedTip === index && (
                                    <div className="p-10 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <p className="text-xl text-linen/40 leading-relaxed font-bold italic font-serif">&ldquo;{tip.content}&rdquo;</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-14 rounded-[4.5rem] bg-gradient-to-br from-[#192231] to-black text-linen flex flex-col justify-center relative overflow-hidden group border border-white/5 shadow-2xl shadow-black/40">
                    <div className="absolute top-0 right-0 p-16 opacity-10 scale-150 rotate-12 bg-sage/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="space-y-10 relative">
                        <Sparkles size={60} className="text-sage opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-linen/20 italic">Cultural Resonance</p>
                        <p className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase italic opacity-90 whitespace-pre-line">
                            &ldquo;Wo nkoa wo nti me nsa yare3, 3y3 s3 wob3 bisa mmoa y3.&rdquo;
                        </p>
                        <div className="h-1.5 w-24 bg-sage/40 rounded-full" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 leading-relaxed">
                            Translate: Independence does not cure. Strength is found in communal support.
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-center text-[10px] font-black uppercase tracking-[1.5em] text-linen/10 pt-16 pb-16">
                Crisis Node Ghana Node 2.2
            </p>
        </div>
    );
}
