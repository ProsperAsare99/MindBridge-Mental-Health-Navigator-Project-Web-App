"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import {
  Heart,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ParallaxSection speed={0.05} direction="down" className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-primary/5 blur-[120px]" />
        </ParallaxSection>
        <ParallaxSection speed={0.1} direction="up" className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-secondary/10 blur-[120px]" />
        </ParallaxSection>
      </div>

      {/* Navigation - Apple Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground/90">MindBridge</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground"
        >
          {["About", "Resources", "Privacy", "Support"].map((item) => (
            <Link key={item} href="#" className="hover:text-primary transition-colors duration-300">
              {item}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-bold">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 shadow-xl shadow-primary/25">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-5xl space-y-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary/80 backdrop-blur-sm mx-auto"
          >
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Designed for Academic Well-being
          </motion.div>

          {/* Heading */}
          <ParallaxSection speed={0.15}>
            <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-9xl text-foreground leading-[1.05]">
              Your Mind,<br />
              <span className="text-primary/80">Understood.</span>
            </h1>
          </ParallaxSection>

          <ParallaxSection speed={0.1}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
              Navigate the complexities of university life with Ghana's first
              context-aware support system. Simple tools, deeper understanding.
            </p>
          </ParallaxSection>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 px-10 rounded-full text-lg font-bold shadow-2xl shadow-primary/30">
                Join MindBridge
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resources" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg font-bold border-2 border-primary/10">
                View Resources
              </Button>
            </Link>
          </div>

          {/* Trust Assets */}
          <ParallaxSection speed={0.05} direction="down">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            >
              {[
                { icon: ShieldCheck, label: "Confidential" },
                { icon: Brain, label: "AI-Powered" },
                { icon: Sparkles, label: "Student-Led" },
                { icon: Star, label: "Highly Rated" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center justify-center gap-2 group">
                  <Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-bold tracking-tight uppercase">{label}</span>
                </div>
              ))}
            </motion.div>
          </ParallaxSection>
        </motion.div>
      </main>

      {/* Floating Action Button / Quick Mood (Apple Style) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 right-10 z-50 md:flex hidden"
      >
        <div className="group relative">
          <button className="h-16 w-16 rounded-full bg-card shadow-2xl border border-primary/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
            <MessageCircle className="h-6 w-6 text-primary" />
          </button>
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
              Talk to someone now
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
