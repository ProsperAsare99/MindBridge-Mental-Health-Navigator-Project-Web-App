"use client";

import { Button } from "@/components/ui/Button";
import {
  Heart,
  Shield,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ArrowUpRight,
  Search,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import LogoMarquee from "@/components/logo-marquee";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden selection:bg-sage/30 selection:text-linen">
      {/* Deep Background Mesh */}
      <div className="fixed inset-0 -z-10 bg-[#192231]" />
      <div className="fixed inset-0 -z-10 bg-luxury-gradient opacity-60" />

      {/* Animated Glow Nodes */}
      <div className="fixed inset-0 -z-10 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sage/20 blur-[140px] rounded-full animate-soft-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-mist/10 blur-[120px] rounded-full animate-soft-glow animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-4 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="h-10 w-10 rounded-2xl bg-sage flex items-center justify-center shadow-lg shadow-sage/20 group-hover:scale-110 transition-transform duration-500">
              <div className="h-4 w-4 bg-linen rounded-full shadow-inner" />
            </div>
            <span className="text-xl font-extrabold text-linen tracking-tighter">MindBridge</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Protocols", "Clinical", "Resources"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-linen/40 hover:text-sage transition-all">
                {item}
              </Link>
            ))}
          </div>

          <Link href="/signin">
            <Button variant="outline" className="h-12 px-8 border-linen/10 bg-white/5 text-linen hover:bg-white/10 font-black uppercase tracking-[0.3em] text-[10px]">
              Establish Link
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-60 pb-40 px-6 md:px-12 flex flex-col items-center text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-sage/10 backdrop-blur-md border border-sage/20 text-sage text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Heart size={12} className="fill-sage/20" /> Empathy System v2.0
        </div>

        <h1 className="text-6xl md:text-9xl font-extrabold text-linen tracking-tight leading-[0.85] mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Mental health, <br />
          <span className="text-sage italic font-serif lowercase font-normal opacity-80">re-imagined.</span>
        </h1>

        <p className="text-xl md:text-3xl text-linen/60 font-medium max-w-3xl leading-relaxed italic mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          MindBridge orchestrates a secure, high-prestige environment for emotional resonance and clinical stability.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link href="/register">
            <Button size="xl" className="shadow-2xl shadow-sage/10">
              Initialize Journey
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="xl" className="border-linen/10">
              View Protocol
            </Button>
          </Link>
        </div>

        <div className="mt-40 w-full animate-in fade-in duration-1000 delay-700">
          <LogoMarquee />
        </div>
      </section>

      {/* Feature Grid */}
      <section id="protocols" className="py-40 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-sm font-black text-sage uppercase tracking-[0.8em] opacity-40">Clinical Ecosystem</h2>
          <p className="text-4xl md:text-6xl font-extrabold text-linen tracking-tight leading-none">Precision meet <span className="text-sage italic font-serif lowercase font-normal">soul.</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Session Logs",
              desc: "Map daily resonance with clinical accuracy and elegant simplicity.",
              icon: MessageCircle,
              color: "text-sage"
            },
            {
              title: "Wellness Scans",
              desc: "Integrated PHQ-9 diagnostic nodes for real-time analysis.",
              icon: Brain,
              color: "text-linen"
            },
            {
              title: "Priority One",
              desc: "Instant connection to Ghana's high-priority clinical nodes.",
              icon: Shield,
              color: "text-[#ff5555]"
            }
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="glass-card p-14 rounded-[4rem] space-y-10 group hover:-translate-y-4 transition-all duration-700 hover:ring-2 hover:ring-sage/20 group cursor-default">
              <div className={`h-20 w-20 rounded-[2.5rem] bg-white/5 ${color} flex items-center justify-center transition-transform group-hover:scale-110 duration-700 shadow-inner`}>
                <Icon size={36} />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-extrabold text-linen tracking-tight uppercase">{title}</h3>
                <p className="text-linen/40 font-medium leading-relaxed italic text-lg">&ldquo;{desc}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-40 px-6 md:px-12 bg-white/5 backdrop-blur-xl relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-black text-sage uppercase tracking-[0.8em] opacity-40">The Architecture</h2>
              <p className="text-5xl md:text-7xl font-extrabold text-linen tracking-tight leading-none uppercase">Seamless <br /> <span className="text-sage italic font-serif lowercase font-normal">stability.</span></p>
            </div>

            <p className="text-xl text-linen/60 font-medium leading-relaxed italic max-w-xl">
              Our system is engineered to reduce friction between thought and reflection, providing a clear vector toward balance.
            </p>

            <div className="space-y-12">
              {[
                { step: "01", label: "Establish Resonance", text: "Create your secure clinical identity." },
                { step: "02", label: "Sync Frequencies", text: "Log sessions and complete scans." },
                { step: "03", label: "Analyze Vector", text: "Review insights and achieve calm." }
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-10 group">
                  <span className="text-3xl font-black text-sage/10 group-hover:text-sage transition-colors duration-500 mt-1">{s.step}</span>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-linen uppercase tracking-tight">{s.label}</h4>
                    <p className="text-md text-linen/30 font-medium italic">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[5rem] p-16 md:p-24 h-[600px] flex flex-col justify-center items-center shadow-2xl shadow-black/40 relative overflow-hidden soft-glow-bg bg-[#1a2536]/50">
            <Search size={80} className="text-sage mb-10 animate-soft-glow" />
            <h3 className="text-3xl font-extrabold uppercase tracking-widest text-linen text-center">Protocol Node</h3>
            <p className="text-[12px] font-black text-linen/20 uppercase tracking-[0.6em] mt-6">Clinical Tracking Active</p>

            {/* Visualizer elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="h-[500px] w-[500px] border-2 border-sage/50 rounded-full animate-spin-slow" />
              <div className="h-[400px] w-[400px] border-2 border-linen/30 rounded-full animate-reverse-spin-slow" />
              <div className="h-[1px] w-[600px] bg-gradient-to-r from-transparent via-sage/50 to-transparent rotate-45" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-60 px-6 md:px-12 flex flex-col items-center text-center max-w-7xl mx-auto overflow-hidden">
        <div className="glass-card rounded-[6rem] p-20 md:p-40 bg-gradient-to-br from-olive to-[#192231] relative overflow-hidden group w-full shadow-2xl shadow-black/40 border-white/5">
          <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <Sparkles size={400} className="text-sage" />
          </div>

          <div className="relative z-10 space-y-16">
            <h2 className="text-5xl md:text-8xl font-extrabold text-linen tracking-tight leading-none uppercase">
              Ready to stabilize <br /> <span className="text-sage italic font-serif lowercase font-normal">your frequency?</span>
            </h2>
            <Link href="/register">
              <Button size="xl" className="bg-linen hover:bg-white text-olive group shadow-2xl">
                Establish Link <ArrowRight className="ml-6 group-hover:translate-x-4 transition-transform h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 md:px-12 border-t border-white/5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="h-10 w-10 rounded-[1.2rem] bg-sage flex items-center justify-center shadow-lg shadow-sage/10 transition-transform group-hover:scale-110">
            <div className="h-4 w-4 bg-linen rounded-full" />
          </div>
          <span className="text-xl font-extrabold text-linen tracking-tighter">MindBridge</span>
        </div>

        <div className="flex flex-wrap justify-center gap-16">
          {["Privacy Protocol", "Legal Nodes", "Clinical Help"].map((item) => (
            <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-linen/20 hover:text-sage transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <p className="text-[10px] font-black text-linen/10 uppercase tracking-[0.6em]">MindBridge Ghana &copy; 2026</p>
      </footer>
    </div>
  );
}
