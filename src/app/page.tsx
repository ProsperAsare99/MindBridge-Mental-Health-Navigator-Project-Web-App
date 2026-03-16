"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import dynamic from "next/dynamic";

const Card3D = dynamic(() => import("@/components/card-3d").then((mod) => mod.Card3D), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full rounded-[2.5rem] bg-muted/20 animate-pulse border border-border" />
});
import {
  Heart,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Star,
  Search
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSearch } from "@/components/providers/SearchProvider";

export default function Home() {
  const { toggle } = useSearch();

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

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24">
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
          className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground"
        >
          {[
            { label: "About", href: "/about" },
            { label: "Resources", href: "/resources" },
            { label: "Privacy", href: "/privacy" },
            { label: "Support", href: "/support" }
          ].map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-primary transition-colors duration-300">
              {item.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-primary/5 group"
            onClick={toggle}
          >
            <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Button>
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
          className="max-w-5xl space-y-12 flex flex-col items-center"
        >
          {/* Heading */}
          <ParallaxSection speed={0.15}>
            <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-9xl text-foreground leading-[1.05]">
              Your Mind,<br />
              <span className="text-primary/80">Understood.</span>
            </h1>
          </ParallaxSection>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary/80 backdrop-blur-sm shadow-sm"
          >
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Designed for Academic Well-being
          </motion.div>

          <ParallaxSection speed={0.1}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-3xl mx-auto text-xl md:text-2xl font-semibold text-foreground/80 leading-relaxed"
            >
              Navigate the complexities of university life with <span className="text-primary font-bold">Ghana's first Context-Aware Support System.</span> <span className="text-foreground font-extrabold pb-0.5 border-b-2 border-primary/20">Simple tools, deeper understanding.</span>
            </motion.p>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-full pt-20 overflow-hidden pause-marquee"
          >
            <div className="flex animate-marquee gap-12 md:gap-24 items-center">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
                  {[
                    { icon: ShieldCheck, label: "Confidential" },
                    { icon: Brain, label: "AI-Powered" },
                    { icon: Sparkles, label: "Student-Led" },
                    { icon: Star, label: "Highly Rated" }
                  ].map(({ icon: Icon, label }) => (
                    <div key={`${i}-${label}`} className="flex items-center gap-4 group cursor-default">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-sm font-bold tracking-tight uppercase text-foreground/40 group-hover:text-foreground transition-colors whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Interactive Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto mt-32 px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Interactive <span className="text-primary">Experience</span></h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto">Explore our innovative tools designed to help you navigate your academic journey with clarity and confidence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left order-2 md:order-1">
              {[
                {
                  title: "Smart Mood Tracking",
                  description: "Monitor your emotional well-being over time with our context-aware analytics.",
                  icon: Activity
                },
                {
                  title: "AI-Powered Guidance",
                  description: "Get personalized support tailored to your unique academic and personal challenges.",
                  icon: Brain
                },
                {
                  title: "University Integration",
                  description: "Seamlessly connect with your institution's specific support resources and counselors.",
                  icon: ShieldCheck
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="flex gap-4 p-6 rounded-[2rem] glass border border-border shadow-premium hover:border-primary/20 transition-all group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <Card3D
                hoverScale={1.1}
                hoverLift={1}
                color="transparent"
                hoverColor="transparent"
                className="h-[500px]"
                content={
                  <div className="w-[320px] p-8 text-left glass backdrop-blur-xl rounded-[2.5rem] border border-border/50 shadow-premium">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center relative shadow-inner">
                        <Activity className="h-6 w-6 text-primary" />
                        <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary/60">Live Analytics</div>
                          <div className="h-1 w-1 rounded-full bg-red-500 animate-ping" />
                        </div>
                        <div className="text-sm font-bold text-foreground">Academic Pulse</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="h-3 w-full bg-foreground/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                          className="h-full bg-primary relative"
                        >
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >Well-being Score</motion.span>
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8 }}
                          className="text-primary text-xs"
                        >75%</motion.span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2 }}
                      className="p-5 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group/box shadow-inner"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 translate-x-[-100%]"
                        whileInView={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-xs font-medium text-foreground/60 italic leading-relaxed relative z-10">
                        "Your engagement levels are steady this week. Consider a 15-minute mindfulness session before your lecture."
                      </p>
                    </motion.div>

                    <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center opacity-60">
                      <div className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Session ID: #MB-0492</div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.5 + (i * 0.1) }}
                            className="h-6 w-6 rounded-full border-2 border-white bg-primary/20"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </motion.div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 right-10 z-50 md:flex hidden"
      >
        <div className="group relative">
          <button className="h-16 w-16 rounded-full glass bg-card shadow-premium border border-primary/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
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
