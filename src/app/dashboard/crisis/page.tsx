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
} from "lucide-react";

const EMERGENCY_LINES = [
    {
        name: "Ghana National Ambulance Service",
        number: "193",
        description: "For medical emergencies across Ghana. Free to call.",
        available: "24/7",
    },
    {
        name: "Ghana Police Emergency",
        number: "191",
        description: "For immediate safety concerns or life-threatening situations.",
        available: "24/7",
    },
    {
        name: "Domestic Violence & Victim Support (DOVVSU)",
        number: "0302-773906",
        description: "Support for victims of domestic violence, abuse, and assault.",
        available: "24/7",
    },
];

const MENTAL_HEALTH_LINES = [
    {
        name: "Mental Health Authority Ghana Helpline",
        number: "0800-123-456",
        description: "Free mental health support and referral service operated by the Mental Health Authority of Ghana.",
        available: "Mon-Fri 8am-5pm",
    },
    {
        name: "Ghana Psychological Association",
        number: "030-250-0065",
        description: "Referrals to licensed psychologists and mental health professionals across Ghana.",
        available: "Mon-Fri 9am-5pm",
    },
    {
        name: "BasicNeeds Ghana",
        number: "030-250-1994",
        description: "Mental health and development organization providing community-based support.",
        available: "Mon-Fri 8am-5pm",
    },
    {
        name: "Befrienders Worldwide – Ghana",
        number: "233-244-846-328",
        description: "Confidential emotional support for those in distress or at risk of suicide.",
        available: "24/7",
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
        email: "pad@ug.edu.gh",
        website: "https://www.ug.edu.gh/careers/counselling-services",
    },
    {
        name: "Kwame Nkrumah University of Science and Technology (KNUST)",
        location: "Kumasi, Ashanti Region",
        centre: "KNUST Counselling Center (KCC)",
        description: "Mental health facility with professional counselors and clinical psychologists. Offers individual and group counselling, crisis intervention, academic counselling, career guidance, and psychological assessments. Mon-Fri 8am-5pm.",
        contacts: [
            { label: "Counselling Centre", phone: "050 644 9747" },
            { label: "Counselling Centre (Alt)", phone: "059 439 97772" },
        ],
        email: "counsellingcentre@knust.edu.gh",
        website: "https://www.knust.edu.gh/students/counselling",
    },
    {
        name: "University of Cape Coast (UCC)",
        location: "Cape Coast, Central Region",
        centre: "Counselling Unit",
        description: "Counselling for UCC students covering academic, vocational, and social/personal issues. Provides trauma counselling, stress management, peer-led support groups, and referral services. Located at the old site, Faculty of Educational Foundations building.",
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
        description: "Psychological and academic counselling for UEW students. Located adjacent to the old Library (opposite Taxi Rank), North Campus. Offers orientation counselling, crisis support, and referrals. Mon-Fri 8am-5:30pm.",
        contacts: [
            { label: "Counselling Centre", phone: "020 204 1040" },
            { label: "Counselling Centre (Alt)", phone: "020 166 5951" },
            { label: "Director (Mrs. Theresa Antwi)", phone: "024 351 6659" },
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
        name: "Ghana Institute of Management & Public Administration (GIMPA)",
        location: "Greenhill, Achimota, Accra",
        centre: "Student Affairs & Counselling",
        description: "Counselling support for GIMPA students. Individual sessions for personal and academic challenges. Career counselling and referral services also available.",
        contacts: [
            { label: "Main Line", phone: "030 240 1681" },
            { label: "Main Line (Alt)", phone: "030 240 1682" },
            { label: "General Enquiries", phone: "030 240 4664" },
        ],
        email: "info@gimpa.edu.gh",
        website: "https://www.gimpa.edu.gh/",
    },
    {
        name: "Ashesi University",
        location: "Berekuso, Eastern Region",
        centre: "Office of Students & Community Affairs – Counselling & Coaching Center",
        description: "Trained on-campus counsellors available for confidential sessions in English and French. Mental health awareness campaigns, peer support networks, and wellness weeks.",
        contacts: [
            { label: "Counselling & Coaching", phone: "030 261 0330" },
            { label: "Counselling (French & English)", phone: "024 880 7992" },
            { label: "Front Office", phone: "030 297 4980" },
        ],
        email: "studentlife@ashesi.edu.gh",
        website: "https://www.ashesi.edu.gh/student-life",
    },
    {
        name: "University of Professional Studies, Accra (UPSA)",
        location: "Legon, Accra",
        centre: "Student Services Unit",
        description: "Counselling services for UPSA students covering academic, emotional, and personal challenges. Workshops on stress management and exam preparation routinely held.",
        contacts: [
            { label: "Main Line", phone: "030 393 7542" },
            { label: "Main Line (Alt)", phone: "030 393 7544" },
            { label: "Student Helpdesk", phone: "020 838 1583" },
        ],
        email: "info@upsa.edu.gh",
        website: "https://www.upsa.edu.gh/",
    },
    {
        name: "Ghana Communication Technology University (GCTU)",
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
];


const ONLINE_RESOURCES = [
    {
        name: "Mental Health Authority Ghana",
        url: "https://www.mha.gov.gh/",
        description: "Official government body overseeing mental health services in Ghana.",
    },
    {
        name: "Ghana Health Service – Mental Health",
        url: "https://www.ghs.gov.gh/",
        description: "Information on public mental health services and facilities.",
    },
    {
        name: "Lifeline Ghana",
        url: "https://www.facebook.com/LifelineGhana/",
        description: "Community mental health awareness and support initiative.",
    },
    {
        name: "7 Cups (Free Online Chat)",
        url: "https://www.7cups.com/",
        description: "Free online chat with trained listeners for emotional support. Available worldwide.",
    },
];

const SELF_HELP_TIPS = [
    {
        title: "Grounding Technique: 5-4-3-2-1",
        content: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment when you feel overwhelmed.",
    },
    {
        title: "Box Breathing",
        content: "Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds. Repeat 4 times. This activates your body's calm response and reduces anxiety.",
    },
    {
        title: "Talk to Someone You Trust",
        content: "Reach out to a friend, family member, course mate, or hall tutor. You don't have to go through this alone. Even a brief conversation can help you feel less isolated.",
    },
    {
        title: "Visit Your University Counselling Centre",
        content: "Most Ghanaian universities offer free, confidential counselling. You don't need a referral — just walk in during office hours. Many centres also accept calls and WhatsApp messages.",
    },
];

export default function CrisisPage() {
    const [expandedTip, setExpandedTip] = useState<number | null>(null);
    const [expandedUni, setExpandedUni] = useState<number | null>(null);

    const handleCall = (number: string) => {
        window.open(`tel:${number.replace(/\s/g, "")}`, "_self");
    };

    return (
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-4xl mx-auto">

                {/* Urgent Banner */}
                <div className="rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(239,68,68,0.15)] relative overflow-hidden animate-in fade-in zoom-in duration-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.25)] transition-all">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-500/20 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                            <AlertTriangle className="h-7 w-7 text-red-400 animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                                In immediate danger? <span className="text-red-400">Call 191 or 193</span>
                            </h1>
                            <p className="text-red-100/90 text-lg font-medium mt-2">
                                Your safety comes first. If you or someone you know is in a life-threatening situation, contact emergency services immediately.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                            <Button
                                onClick={() => handleCall("191")}
                                className="bg-red-600 hover:bg-red-500 text-white border-0 shadow-[0_0_20px_rgba(220,38,38,0.4)] h-14 px-8 text-lg font-black rounded-2xl transition-all hover:scale-105 active:scale-95"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Police (191)
                            </Button>
                            <Button
                                onClick={() => handleCall("193")}
                                className="bg-red-600 hover:bg-red-500 text-white border-0 shadow-[0_0_20px_rgba(220,38,38,0.4)] h-14 px-8 text-lg font-black rounded-2xl transition-all hover:scale-105 active:scale-95"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Ambulance (193)
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="animate-in fade-in slide-in-from-top-5 duration-700">
                    <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                        <Heart className="h-8 w-8 text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                        You are not alone.
                    </h2>
                    <p className="text-indigo-100/90 mt-2 text-lg font-medium leading-relaxed max-w-2xl">
                        Reaching out takes courage. Below are confidential resources available to students across Ghana.
                    </p>
                </div>

                {/* Emergency Numbers */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                        Emergency Numbers
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        {EMERGENCY_LINES.map((line, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-md p-6 shadow-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                                <h4 className="font-black text-white text-lg mb-2">{line.name}</h4>
                                <p className="text-sm text-red-100/70 mb-4 leading-relaxed">{line.description}</p>
                                <div className="flex items-center gap-2 mb-6 text-sm font-bold text-red-300/80">
                                    <Clock className="h-4 w-4" /> {line.available}
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleCall(line.number)}
                                    className="mt-auto bg-red-600 hover:bg-red-500 text-white border-0 shadow-[0_0_15px_rgba(220,38,38,0.3)] text-sm h-11 w-full font-black rounded-xl"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call {line.number}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mental Health Helplines */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Phone className="h-6 w-6 text-indigo-400" />
                        Mental Health Helplines
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {MENTAL_HEALTH_LINES.map((line, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                                <h4 className="font-black text-white group-hover:text-indigo-200 transition-colors text-lg mb-2">
                                    {line.name}
                                </h4>
                                <p className="text-sm text-indigo-100/80 mb-4 leading-relaxed">{line.description}</p>
                                <div className="flex items-center gap-2 mb-6 text-sm font-bold text-indigo-300/60">
                                    <Clock className="h-4 w-4" /> {line.available}
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleCall(line.number)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/50 text-sm h-11 w-full font-black rounded-xl transition-all"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call {line.number}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* University Counselling Centres — Expanded */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Users className="h-6 w-6 text-indigo-400" />
                        University Centres
                    </h3>
                    <p className="text-xs text-indigo-100 -mt-2">
                        Free and confidential support at Ghanaian universities. Tap a card to see all contacts and resources.
                    </p>

                    <div className="space-y-4">
                        {UNIVERSITY_RESOURCES.map((uni, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                            >
                                {/* Collapsed header — always visible */}
                                <button
                                    onClick={() => setExpandedUni(expandedUni === index ? null : index)}
                                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${expandedUni === index ? "bg-white/10" : "hover:bg-white/5"}`}
                                >
                                    <div>
                                        <h4 className="font-black text-white text-lg">{uni.name}</h4>
                                        <div className="flex items-center gap-2 mt-1 text-sm font-bold text-indigo-300/80">
                                            <MapPin className="h-4 w-4 flex-shrink-0" /> {uni.location}
                                        </div>
                                    </div>
                                    {expandedUni === index ? (
                                        <ChevronUp className="h-5 w-5 text-indigo-400 flex-shrink-0 ml-4" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-indigo-400 flex-shrink-0 ml-4" />
                                    )}
                                </button>

                                {/* Expanded content */}
                                {expandedUni === index && (
                                    <div className="px-5 pb-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-white/5 pt-4">
                                        <div>
                                            <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-1">{uni.centre}</p>
                                            <p className="text-sm text-indigo-100/80 leading-relaxed">{uni.description}</p>
                                        </div>

                                        {/* Emergency Contacts */}
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Emergency Contacts</p>
                                            <div className="grid gap-2 sm:grid-cols-2">
                                                {uni.contacts.map((contact, cIdx) => (
                                                    <button
                                                        key={cIdx}
                                                        onClick={() => handleCall(contact.phone)}
                                                        className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-200 text-left group"
                                                    >
                                                        <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                                                            <Phone className="h-5 w-5 text-indigo-300" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-white group-hover:text-indigo-200 transition-colors uppercase tracking-wider">{contact.label}</p>
                                                            <p className="text-sm font-bold text-indigo-300/60">{contact.phone}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Online resources for this university */}
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">Online Resources</p>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                {uni.email && (
                                                    <a
                                                        href={`mailto:${uni.email}`}
                                                        className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-200 group"
                                                    >
                                                        <Mail className="h-4 w-4 text-indigo-300 flex-shrink-0" />
                                                        <span className="text-xs text-white group-hover:text-indigo-200 transition-colors truncate">{uni.email}</span>
                                                    </a>
                                                )}
                                                {uni.website && (
                                                    <a
                                                        href={uni.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all duration-200 group"
                                                    >
                                                        <Globe className="h-4 w-4 text-indigo-300 flex-shrink-0" />
                                                        <span className="text-xs text-white group-hover:text-indigo-200 transition-colors">Visit Website</span>
                                                        <ExternalLink className="h-3 w-3 text-indigo-300/40 flex-shrink-0" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Immediate Self-Help */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Shield className="h-6 w-6 text-indigo-400" />
                        Coping Techniques
                    </h3>
                    <div className="space-y-4">
                        {SELF_HELP_TIPS.map((tip, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                            >
                                <button
                                    onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                                    className={`w-full flex items-center justify-between p-6 text-left transition-all ${expandedTip === index ? "bg-white/10" : "hover:bg-white/5"}`}
                                >
                                    <span className="font-black text-white text-lg italic pr-4">&ldquo;{tip.title}&rdquo;</span>
                                    {expandedTip === index ? (
                                        <ChevronUp className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                                    )}
                                </button>
                                {expandedTip === index && (
                                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-white/5 pt-4">
                                        <p className="text-lg text-indigo-100/90 leading-relaxed font-medium">{tip.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Online Resources */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Globe className="h-6 w-6 text-indigo-400" />
                        National Resources
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        {ONLINE_RESOURCES.map((resource, index) => (
                            <a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer block relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h4 className="font-black text-white group-hover:text-indigo-200 transition-colors text-lg italic">
                                        {resource.name}
                                    </h4>
                                    <ExternalLink className="h-5 w-5 text-indigo-400 group-hover:text-white transition-all flex-shrink-0" />
                                </div>
                                <p className="text-sm text-indigo-100/80 leading-relaxed font-medium">{resource.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer Reassurance */}
                <div className="text-center py-6 animate-in fade-in duration-700">
                    <p className="text-sm text-indigo-200/60 italic">
                        "Wo nkoa wo nti me nsa yare3, 3y3 s3 wob3 bisa mmoa y3." — You alone cannot cure your illness. It is okay to ask for help.
                    </p>
                </div>
            </div>
        </div>
    );
}
