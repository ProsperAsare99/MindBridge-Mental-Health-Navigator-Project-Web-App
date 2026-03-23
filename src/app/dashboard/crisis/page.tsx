"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    ArrowUpRight,
    HeartPulse,
    Quote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMERGENCY_LINES = [
    {
        name: "Ghana National Ambulance Service",
        number: "193",
        description: "For medical emergencies across Ghana. Free to call.",
        available: "24/7",
        website: "https://nas.gov.gh"
    },
    {
        name: "Ghana Police Emergency",
        number: "191",
        description: "For immediate safety concerns or life-threatening situations.",
        available: "24/7",
        website: "https://police.gov.gh"
    },
    {
        name: "Domestic Violence & Victim Support (DOVVSU)",
        number: "0302-773906",
        description: "Support for victims of domestic violence, abuse, and assault.",
        available: "24/7",
        website: "https://police.gov.gh/dovvsu"
    },
];

const MENTAL_HEALTH_LINES = [
    {
        name: "Mental Health Authority Ghana Helpline",
        number: "0800-123-456",
        description: "Free mental health support and referral service operated by the Mental Health Authority of Ghana.",
        available: "Mon-Fri 8am-5pm",
        website: "https://mha.gov.gh"
    },
    {
        name: "Ghana Psychological Association",
        number: "030-250-0065",
        description: "Referrals to licensed psychologists and mental health professionals across Ghana.",
        available: "Mon-Fri 9am-5pm",
        website: "https://ghanapsychology.org"
    },
    {
        name: "BasicNeeds Ghana",
        number: "030-250-1994",
        description: "Mental health and development organization providing community-based support.",
        available: "Mon-Fri 8am-5pm",
        website: "https://basicneedsghana.org"
    },
    {
        name: "Befrienders Worldwide – Ghana",
        number: "233-244-846-328",
        description: "Confidential emotional support for those in distress or at risk of suicide.",
        available: "24/7",
        website: "https://befrienders.org"
    },
];

const UNIVERSITY_RESOURCES = [
    {
        name: "University of Ghana (UG)",
        location: "Legon Campus, Accra",
        centre: "Careers and Counselling Centre",
        description: "Professional counselling services for all UG students. Walk-in and appointment-based sessions for academic stress, relationship issues, grief, and mental health. Also runs peer counselling.",
        contacts: [
            { label: "Counselling Centre", phone: "0245 945 752" },
            { label: "Counselling Centre (Alt)", phone: "0204 999 221" },
        ],
        email: "deanofstudents@ug.edu.gh",
        website: "https://www.ug.edu.gh/deanofstudents/",
    },
    {
        name: "KNUST",
        location: "Kumasi, Ashanti Region",
        centre: "KNUST Counselling Center (KCC)",
        description: "Mental health facility with professional counselors and clinical psychologists. Offers individual and group counselling, crisis intervention, academic counselling, career guidance, and psychological assessments.",
        contacts: [
            { label: "Counselling Centre", phone: "050 644 9747" },
            { label: "Counselling Centre (Alt)", phone: "059 439 97772" },
        ],
        email: "counsellingcentre@knust.edu.gh",
        website: "https://www.knust.edu.gh/students/counselling",
    },
    {
        name: "UCC",
        location: "Cape Coast, Central Region",
        centre: "Counselling Unit",
        description: "Counselling for UCC students covering academic, vocational, and social/personal issues. Provides trauma counselling, stress management, peer-led support groups, and referral services.",
        contacts: [
            { label: "Counselling Unit", phone: "033 209 6884" },
            { label: "University Main Line", phone: "033 213 2440" },
        ],
        email: "counselling@ucc.edu.gh",
        website: "https://www.ucc.edu.gh/",
    },
    {
        name: "University of Education, Winneba (UEW)",
        location: "Winneba, Central Region",
        centre: "University Counselling Centre",
        description: "Psychological and academic counselling for UEW students. Located adjacent to the old Library (opposite Taxi Rank), North Campus. Offers orientation counselling, crisis support, and referrals.",
        contacts: [
            { label: "Counselling Centre", phone: "020 204 1040" },
            { label: "Counselling Centre (Alt)", phone: "020 166 5951" },
            { label: "Director", phone: "024 351 6659" },
        ],
        email: "counselling@uew.edu.gh",
        website: "https://www.uew.edu.gh/",
    },
    {
        name: "University for Development Studies (UDS)",
        location: "Tamale, Northern Region",
        centre: "Office of the Dean of Students' Affairs",
        description: "Counselling services across all UDS campuses. Offers crisis intervention, personal development programmes, group therapy, and referral to the Tamale Teaching Hospital.",
        contacts: [
            { label: "University Main Line", phone: "037 209 3697" },
            { label: "University (Alt)", phone: "054 544 7445" },
            { label: "Dean of Students", phone: "024 453 3268" },
        ],
        email: "mayamga@uds.edu.gh",
        website: "https://www.uds.edu.gh/",
    },
    {
        name: "GIMPA",
        location: "Greenhill, Achimota, Accra",
        centre: "Student Affairs & Counselling",
        description: "Counselling support for GIMPA students. Individual sessions for personal and academic challenges. Career counselling and referral services also available.",
        contacts: [
            { label: "Main Line", phone: "030 240 1681" },
            { label: "Main Line (Alt)", phone: "030 240 1682" },
        ],
        email: "info@gimpa.edu.gh",
        website: "https://www.gimpa.edu.gh/",
    },
    {
        name: "Ashesi University",
        location: "Berekuso, Eastern Region",
        centre: "Counselling & Coaching Center",
        description: "Trained on-campus counsellors available for confidential sessions in English and French. Mental health awareness campaigns, peer support networks, and wellness weeks.",
        contacts: [
            { label: "Counselling & Coaching", phone: "030 261 0330" },
            { label: "Counselling (French & English)", phone: "024 880 7992" },
        ],
        email: "studentlife@ashesi.edu.gh",
        website: "https://www.ashesi.edu.gh/student-life",
    },
    {
        name: "UPSA",
        location: "Legon, Accra",
        centre: "Student Services Unit",
        description: "Counselling services for UPSA students covering academic, emotional, and personal challenges. Workshops on stress management and exam preparation routinely held.",
        contacts: [
            { label: "Main Line", phone: "030 393 7542" },
            { label: "Student Helpdesk", phone: "020 838 1583" },
        ],
        email: "info@upsa.edu.gh",
        website: "https://www.upsa.edu.gh/",
    },
    {
        name: "GCTU",
        location: "Tesano, Accra",
        centre: "Student Affairs Office",
        description: "Counselling support for GCTU students. Offers individual sessions for personal development, career guidance, and mental health support.",
        contacts: [
            { label: "Student Affairs", phone: "030 220 0623" },
        ],
        email: "studentaffairs@gctu.edu.gh",
        website: "https://www.gctu.edu.gh/",
    },
    {
        name: "University of Health and Allied Sciences (UHAS)",
        location: "Ho, Volta Region",
        centre: "Student Affairs – Counselling Services",
        description: "Counselling and wellness services for UHAS students. Located at Ground Floor, Central Administration building. Close ties with Ho Teaching Hospital for psychiatric referrals.",
        contacts: [
            { label: "Student Affairs", phone: "020 836 5644" },
            { label: "Student Affairs (Alt)", phone: "036 229 0046" },
        ],
        email: "studentaffairs@uhas.edu.gh",
        website: "https://www.uhas.edu.gh/",
    },
    {
        name: "Accra College of Education (AcCE)",
        location: "East Legon, Accra",
        centre: "Student Affairs & Counselling",
        description: "Comprehensive support for teacher trainees. Offers academic, personal, and professional development counselling.",
        contacts: [
            { label: "General Enquiries", phone: "020 608 8310" },
            { label: "Student Affairs", phone: "024 484 7359" },
        ],
        email: "info@acce.edu.gh",
        website: "https://acce.edu.gh",
    },
    {
        name: "Korle-Bu Nursing & Midwifery Training College",
        location: "Korle-Bu, Accra",
        centre: "Student Support Services",
        description: "Specialized support for healthcare trainees. Focuses on stress management, clinical anxiety, and academic excellence.",
        contacts: [
            { label: "Main Office", phone: "030 266 6361" },
        ],
        email: "info@kbnmtc.edu.gh",
        website: "https://kbnmtc.edu.gh",
    },
    {
        name: "Ghana Police Training School",
        location: "Tesano, Accra",
        centre: "NPATS Guidance & Counselling",
        description: "Mental health and resilience training for recruits and officers. Confidential support for work-related stress and personal challenges.",
        contacts: [
            { label: "Main Line", phone: "030 222 8744" },
        ],
        email: "info@police.gov.gh",
        website: "https://police.gov.gh",
    },
    {
        name: "Ghana Armed Forces (GAF) Academy",
        location: "Teshie, Accra",
        centre: "GAF Counselling Centre",
        description: "Dedicated mental health support for military personnel and cadets. Extensive resources for PTSD, resilience, and family support.",
        contacts: [
            { label: "GAF Counselling", phone: "030 277 5701" },
        ],
        email: "info@af.mil.gh",
        website: "https://af.mil.gh",
    },
];

const ONLINE_RESOURCES = [
    {
        name: "Mental Health Authority Ghana",
        url: "https://www.mha.gov.gh/",
        description: "Official government body overseeing mental health services in Ghana.",
    },
    {
        name: "7 Cups (Free Online Chat)",
        url: "https://www.7cups.com/",
        description: "Free online chat with trained listeners for emotional support. Available worldwide.",
    },
];

const SELF_HELP_TIPS = [
    {
        title: "Grounding: 5-4-3-2-1",
        content: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present.",
    },
    {
        title: "Box Breathing",
        content: "Breathe in for 4s, hold for 4s, out for 4s, hold for 4s. Repeat 4 times. This activates your body's calm response.",
    },
];

export default function CrisisPage() {
    const [expandedUni, setExpandedUni] = useState<number | null>(null);

    const handleCall = (number: string) => {
        window.open(`tel:${number.replace(/\s/g, "")}`, "_self");
    };

    return (
        <div className="min-h-screen relative pb-20 selection:bg-red-500/10">
            {/* Ambient background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-red-500/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
            </div>

            <div className="space-y-12 p-6 md:p-10 max-w-4xl mx-auto">
                {/* Urgent Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-500/20 shadow-sm shadow-red-500/5">
                        <AlertTriangle size={12} className="animate-pulse" /> Immediate Assistance
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                        You are safe. <br /><span className="text-red-600">Help is here.</span>
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                        If you are in a life-threatening situation or need immediate emergency care, please reach out to the services below. You are not alone.
                    </p>
                </motion.div>

                {/* Primary Emergency Lines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { name: "Police Emergency", num: "191", desc: "For security & danger", icon: Shield, color: "bg-red-600 hover:bg-red-700 shadow-red-600/20" },
                        { name: "Ambulance National", num: "193", desc: "For medical emergencies", icon: Phone, color: "bg-red-500 hover:bg-red-600 shadow-red-500/20" }
                    ].map((btn, i) => (
                        <motion.button
                            key={btn.num}
                            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCall(btn.num)}
                            className={`flex items-center justify-between p-6 rounded-[2rem] text-white shadow-premium transition-all ${btn.color}`}
                        >
                            <div className="flex items-center gap-4 text-left">
                                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <btn.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">{btn.name}</p>
                                    <p className="text-2xl font-black">Call {btn.num}</p>
                                </div>
                            </div>
                            <ArrowUpRight size={20} className="opacity-70" />
                        </motion.button>
                    ))}
                </div>

                {/* Regional Helplines */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between ml-1">
                        <h3 className="font-bold text-foreground">Mental Health Helplines</h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ghana National</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {MENTAL_HEALTH_LINES.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-[2.5rem] p-6 border border-border shadow-premium group hover:border-red-500/40 transition-all cursor-pointer"
                                onClick={() => handleCall(line.number)}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-foreground text-sm group-hover:text-red-500 transition-colors">{line.name}</h4>
                                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-red-500 group-hover:text-white transition-all">
                                            <Phone size={14} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{line.description}</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={12} className="text-primary group-hover:text-red-500 transition-colors" />
                                            <span className="text-[10px] font-bold text-muted-foreground">{line.available}</span>
                                        </div>
                                        {(line as any).website && (
                                            <a
                                                href={(line as any).website}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1 text-[9px] font-bold text-primary uppercase tracking-widest hover:text-red-500 transition-colors"
                                            >
                                                <Globe size={12} /> Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* University Specific Support */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between ml-1">
                        <h3 className="font-bold text-foreground/90">University Counselling Centers</h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">On-Campus Support</span>
                    </div>
                    <div className="space-y-4">
                        {UNIVERSITY_RESOURCES.map((uni, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-[2rem] border border-border shadow-premium overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setExpandedUni(expandedUni === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-all text-left active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground text-sm">{uni.name}</h4>
                                            <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-widest mt-0.5">
                                                <MapPin size={10} /> {uni.location}
                                            </p>
                                        </div>
                                    </div>
                                    {expandedUni === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                <AnimatePresence>
                                    {expandedUni === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 overflow-hidden"
                                        >
                                            <div className="pt-4 border-t border-border space-y-4">
                                                <p className="text-sm text-foreground/70 font-medium leading-relaxed italic">{uni.description}</p>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {uni.contacts.map((c, j) => (
                                                        <Button
                                                            key={j}
                                                            onClick={() => handleCall(c.phone)}
                                                            variant="outline"
                                                            className="h-12 justify-between rounded-xl border-border hover:bg-muted/80 font-bold group"
                                                        >
                                                            <span className="text-[10px] uppercase tracking-widest opacity-70">{c.label}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs">{c.phone}</span>
                                                                <Phone size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                            </div>
                                                        </Button>
                                                    ))}
                                                    <a href={uni.website} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 h-12 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-all font-bold group">
                                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portal</span>
                                                        <Globe size={14} className="text-primary group-hover:scale-110 transition-transform" />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* National Online Resources */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between ml-1">
                        <h3 className="font-bold text-foreground">National Online Resources</h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Web & Chat Support</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {ONLINE_RESOURCES.map((resource, i) => (
                            <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noreferrer"
                                className="glass rounded-[2rem] p-6 border border-border shadow-premium group hover:border-primary/40 transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{resource.name}</h4>
                                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-all" />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{resource.description}</p>
                                </div>
                                <div className="flex items-center gap-2 pt-4 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                    Visit Website <ArrowUpRight size={12} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Coping Grounding */}
                <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-10 border border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <HeartPulse size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground">Self-Help Grounding</h3>
                            <p className="text-sm text-muted-foreground font-medium">Techniques to center yourself right now.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {SELF_HELP_TIPS.map((tip, i) => (
                                <div key={i} className="space-y-2">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{tip.title}</p>
                                    <p className="text-xs text-foreground/70 font-medium leading-relaxed">{tip.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 space-y-4">
                    <p className="text-lg md:text-xl text-primary/80 italic font-bold leading-relaxed max-w-lg mx-auto">
                        <Quote className="h-4 w-4 inline-block mr-2 mb-2 rotate-180 opacity-50" />
                        "Wo nkoa wo nti me nsa yare3, 3y3 s3 wob3 bisa mmoa y3."
                        <Quote className="h-4 w-4 inline-block ml-2 mb-2 opacity-50" />
                    </p>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] opacity-80">
                        — It is okay to ask for help.
                    </p>
                </div>
            </div>
        </div>
    );
}
