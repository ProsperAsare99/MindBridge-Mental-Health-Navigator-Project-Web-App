"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import dynamic from "next/dynamic";
import {
  Heart,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Search,
  GraduationCap
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSearch } from "@/components/providers/SearchProvider";
import { cn } from "@/lib/utils";


const Card3D = dynamic(() => import("@/components/card-3d").then((mod) => mod.Card3D), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full rounded-[2.5rem] bg-muted/20 animate-pulse border border-border" />
});

export default function Home() {
  // removed useSensors hook usage
  const { toggle } = useSearch();

  // Performance: Memoize static data
  const innovationFeatures = useMemo(() => [
    {
      title: "Smart Mood Tracking",
      description: "Real-time emotional analytics mapped to your academic pulse. We correlate your moods with campus deadlines and events.",
      icon: Activity,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "AI Guidance",
      description: "Personalized support paths derived from context-aware AI. Our engine understands the unique stressors of your institution.",
      icon: Brain,
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      title: "Institutional Bridge",
      description: "Secure, encrypted connections to your campus ecosystem. Seamless communication with university counseling and support staff.",
      icon: ShieldCheck,
      color: "bg-emerald-500/10 text-emerald-400"
    },
    {
      title: "Predictive Insights",
      description: "Uncovering hidden patterns within your wellness journey. Stay ahead of academic burnout with visual trend analytics.",
      icon: Sparkles,
      color: "bg-amber-500/10 text-amber-400"
    }
  ], []);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ParallaxSection speed={0.05} direction="down" className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-primary/10 blur-[120px]" />
        </ParallaxSection>
        <ParallaxSection speed={0.1} direction="up" className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-secondary/10 blur-[120px]" />
        </ParallaxSection>
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-8 py-4 rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 outline-none"
          >
            <Link href="/">
              <Logo size="md" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-10 text-md font-bold text-foreground"
          >
            {[
              { label: "About", href: "/about" },
              { label: "Resources", href: "/resources" },
              { label: "Privacy", href: "/privacy" },
              { label: "Support", href: "/support" }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 relative group px-2 py-1">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-primary/10 group transition-all"
              onClick={toggle}
            >
              <Search className="h-6 w-6 text-foreground/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-bold text-foreground/90 hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-8 h-12 text-sm font-bold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section: Refined Modernism */}
      <main className="relative z-10 pt-32 md:pt-48 pb-20">
        {/* Floating Pill Visual Banner */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-primary/10 group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: 'url("/images/hero-mental-health-matters.png")' }}
            />
            {/* Subtle sophisticated overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </div>

        {/* Hero Content: Balanced spacing, no tight overlaps */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 mt-16 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-4 rounded-full border border-primary/30 bg-[#0f0f10] backdrop-blur-md px-10 py-5 text-xs md:text-sm font-black uppercase tracking-[0.4em] text-primary shadow-2xl shadow-primary/5"
          >
            <Activity className="h-4 w-4 animate-pulse text-primary" />
            Designed for Academic Well-being
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <ParallaxSection speed={0.03}>
              <h1 className="text-6xl font-black tracking-tighter sm:text-8xl md:text-[10rem] text-foreground leading-[0.85] py-4">
                Your Mind,<br />
                <span className="text-primary tracking-tighter">Understood.</span>
              </h1>
            </ParallaxSection>
          </motion.div>
        </div>

        {/* Value Proposition: Refined & Narrative */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-32 md:mt-48 relative">
          {/* Decorative Background Element */}
          <div className="absolute -top-24 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
            {/* Main Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="md:col-span-7 space-y-8"
            >
              <div className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                The Mission
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                Empowering Minds across <span className="relative inline-block text-primary">
                  Ghanaian
                  <motion.svg 
                    viewBox="0 0 200 20" 
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path d="M5 15 Q 100 5 195 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </motion.svg>
                </span> Institutions.
              </h2>
              <p className="text-xl md:text-2xl font-medium text-foreground/70 leading-relaxed max-w-xl">
                MindBridge isn't just a platform; it's a context-aware navigator for the modern student journey.
              </p>
            </motion.div>

            {/* Supporting Content & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="md:col-span-5 space-y-10"
            >
              <p className="text-base font-bold text-foreground/50 uppercase tracking-[0.2em] leading-relaxed">
                We combine deep institutional knowledge with advanced AI to provide support that actually understands your environment.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="group h-18 px-12 rounded-full text-lg font-black shadow-2xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all duration-500 active:scale-95 border border-primary/20">
                    Join Today
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/resources" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="h-18 px-10 rounded-full text-lg font-black text-foreground hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Transition: Smooth Cinematic Flow */}
        <div className="mt-40 pt-48 pb-60 bg-gradient-to-b from-background via-[#0f0f10] to-[#010101] relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
          <div className="absolute -top-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[140px]" />
          
          {/* Subtle noise/texture overlay for the dark section */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
          
          <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
            {/* Section Header: Structured & Organized */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center text-center mb-32 space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-8 text-white font-black tracking-[1em] text-base uppercase"
              >
                <div className="w-16 h-0.5 bg-white/40" />
                02 / Innovation
                <div className="w-16 h-0.5 bg-white/40" />
              </motion.div>
              
              <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter text-white leading-[0.9] max-w-4xl">
                Advanced <span className="text-primary tracking-tighter">Support.</span><br />
                <span className="text-white/40">Simplified Interface.</span>
              </h2>
              
              <p className="text-[#a1a1aa] font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                Experience the intersection of psychological expertise and cutting-edge technology, tailored for your academic success.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Feature Track: Vertical Narrative */}
              <div className="lg:col-span-7 relative">
                {/* Vertical Decorative Track Line */}
                <div className="absolute left-[27px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent hidden md:block" />
                
                <div className="space-y-12">
                  {innovationFeatures.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.2, duration: 0.8 }}
                      className="group relative flex gap-8 items-start"
                    >
                      {/* Feature Icon with Glow */}
                      <div className={cn(
                        "relative h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(174,145,100,0.15)] z-10",
                        feature.color
                      )}>
                        <feature.icon className="h-7 w-7" />
                        <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-5 transition-opacity" />
                      </div>

                      {/* Feature Text */}
                      <div className="space-y-3 pt-1">
                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors duration-300 tracking-tight">
                          {feature.title}
                        </h3>
                        <p className="text-[#a1a1aa] font-medium text-lg leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Visualization Card (Static position but dynamic feeling) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end sticky top-32 z-20">
                <Card3D
                  hoverScale={1.03}
                  hoverLift={0.4}
                  color="#0f0f10"
                  opacity={0.3}
                  hoverColor="#1a1a1c"
                  content={
                    <div className="w-full h-full p-8 text-left bg-[#0f0f10]/80 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group/card flex flex-col">
                      {/* Animated background glow */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover/card:bg-primary/10 transition-colors duration-1000" />
                      
                      {/* Header: Identity & Status */}
                      <div className="flex items-center justify-between mb-10 relative z-10">
                          <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:border-primary/30 transition-colors">
                            <Brain className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-white/90 uppercase tracking-widest">MindBridge Core</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-tighter text-emerald-400/80">
                                System: Optimal
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Live Node</div>
                      </div>
                      
                      {/* Central Radial Metric */}
                      <div className="flex-1 flex flex-col items-center justify-center relative py-4">
                        <div className="relative h-48 w-48 flex items-center justify-center">
                          {/* Outer orbital rings (decorative) */}
                          <div className="absolute inset-0 rounded-full border border-white/5 scale-110" />
                          <div className="absolute inset-0 rounded-full border border-primary/10 scale-125 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 animate-pulse" />
                          
                          {/* Main Ring */}
                          <svg className="h-full w-full -rotate-90">
                            <circle
                              cx="96" cy="96" r="88"
                              className="stroke-white/5 fill-none"
                              strokeWidth="8"
                            />
                            <motion.circle
                              cx="96" cy="96" r="88"
                              className="stroke-primary fill-none"
                              strokeWidth="8"
                              strokeDasharray="553"
                              initial={{ strokeDashoffset: 553 }}
                              whileInView={{ strokeDashoffset: 553 * (1 - 0.84) }}
                              transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Percentage Text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="text-5xl font-black text-white tracking-tighter"
                            >
                              84%
                            </motion.span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] -mt-1">Resilience</span>
                          </div>
                        </div>
                      </div>

                      {/* Micro Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-8 relative z-10">
                        {[
                          { label: 'Energy', value: 'High', icon: Sparkles, color: 'text-amber-400' },
                          { label: 'Focus', value: 'Prime', icon: Brain, color: 'text-primary' },
                          { label: 'Mood', value: 'Stable', icon: Heart, color: 'text-rose-400' }
                        ].map((stat, i) => (
                          <div key={stat.label} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center gap-2 group/stat hover:bg-white/5 transition-colors">
                            <stat.icon className={cn("h-4 w-4 opacity-40 group-hover/stat:opacity-100 transition-opacity", stat.color)} />
                            <div className="flex flex-col items-center">
                              <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter">{stat.label}</span>
                              <span className="text-[11px] font-black text-white">{stat.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer: Contextual Insights */}
                      <div className="pt-6 border-t border-white/5 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="h-3 w-3 text-primary" />
                          </div>
                          <p className="text-[11px] font-medium text-white/50 leading-relaxed italic">
                            Institutional data bridge <span className="text-primary/60 font-black tracking-widest uppercase text-[9px] ml-1">Secure</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 right-10 z-50 md:flex hidden"
      >
        <div className="group relative">
          <button className="h-16 w-16 rounded-full glass bg-card shadow-premium border border-foreground/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
            <MessageCircle className="h-7 w-7 text-primary" />
          </button>
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
              Talk to someone now
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 pt-24 pb-12 px-6 md:px-24 bg-background/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Logo size="md" />
              <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
                Ghana's first context-aware support system designed to navigate the complexities of university life with precision and empathy.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Mission</Link></li>
                <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
              © 2026 MindBridge. Ghanaian Excellence.
            </div>
            <div className="flex gap-6">
              {/* Social Placeholders */}
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
