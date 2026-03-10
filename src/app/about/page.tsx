"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import ParallaxSection from "@/components/parallax-section";
import { 
  Heart, 
  Target, 
  Users, 
  ShieldCheck, 
  Compass, 
  ArrowLeft 
} from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 overflow-x-hidden transition-colors duration-500">
      {/* Background Accents (Aurora Style) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] left-[-10%] h-[70%] w-[70%] rounded-full bg-primary/10 blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-secondary/10 blur-[130px]" 
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24 backdrop-blur-md bg-background/50 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 outline-none"
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="font-bold flex items-center gap-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6 md:px-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-32 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md shadow-sm">
              <Compass className="h-3.5 w-3.5" />
              Our Mission
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black tracking-tighter leading-none pt-4">
              Bridging the Gap in <br />
              <span className="text-dashed-underline">Student Well-being.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-3xl font-medium text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              MindBridge is Ghana's first context-aware navigator designed to support every student's mental health journey.
            </motion.p>
          </motion.div>
        </section>

        {/* Core Values / Mission Cards */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-40 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Our Vision",
              description: "To create a world where every student has the tools and support to navigate their academic and personal life with clarity and resilience.",
              icon: Target,
              gradient: "from-primary/20 to-transparent"
            },
            {
              title: "Our Commitment",
              description: "We are committed to providing confidential, AI-powered guidance that respects the unique cultural and social context of Ghanaian students.",
              icon: ShieldCheck,
              gradient: "from-secondary/20 to-transparent"
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              className={`p-10 rounded-[3rem] glass border border-white/10 shadow-premium group hover:border-primary/40 transition-all duration-500 bg-gradient-to-br ${card.gradient} backdrop-blur-2xl`}
            >
              <div className="h-20 w-20 rounded-2xl bg-background/50 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                <card.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{card.title}</h3>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">{card.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Story Section */}
        <section className="max-w-5xl mx-auto mb-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ParallaxSection speed={0.1}>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Story</h2>
                <div className="w-20 h-1.5 bg-primary rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Born from the realization that existing support systems often miss the subtle nuances of university life, MindBridge was built by students, for students.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  We integrated advanced AI with years of student feedback to create a navigator that doesn't just provide answers, but fosters understanding.
                </p>
              </div>
            </ParallaxSection>
            
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-primary/5 border border-primary/20 overflow-hidden glass p-8 flex items-center justify-center">
                 <Logo size="lg" className="scale-150 opacity-20 grayscale" />
                 <motion.div 
                   animate={{ 
                     rotate: 360,
                     scale: [1, 1.1, 1]
                   }}
                   transition={{ 
                     rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                     scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                   }}
                   className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full m-12"
                 />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[3rem] bg-foreground text-background text-center space-y-8 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Ready to find <br /> your balance?</h2>
            <p className="text-xl opacity-70 max-w-xl mx-auto font-medium">
              Join thousands of students who are already using MindBridge to navigate their academic journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 rounded-full text-lg font-extrabold bg-background text-foreground hover:bg-background/90 transition-colors">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer-lite */}
      <footer className="border-t border-border/50 py-12 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
            © 2026 MindBridge. Ghanaian Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
