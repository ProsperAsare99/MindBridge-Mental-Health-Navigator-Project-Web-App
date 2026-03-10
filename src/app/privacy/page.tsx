"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We only collect information that is strictly necessary to provide our core services. This includes your name, email, and institution to personalize your experience.",
      icon: Eye
    },
    {
      title: "How We Use Data",
      content: "Your data is used exclusively to train our context-aware AI on general student trends—never to identify you individually. We never sell your personal information.",
      icon: FileText
    },
    {
      title: "Encryption & Security",
      content: "Every message and profile update is encrypted using industry-standard protocols. Your data is stored in secured, isolated environments.",
      icon: Lock
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Background Accents (Aurora Style) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-primary/10 blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-secondary/15 blur-[130px]" 
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

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pt-40 pb-24 px-6 md:px-24 max-w-5xl mx-auto"
      >
        {/* Header */}
        <section className="mb-20 text-center md:text-left">
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy First
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              Your Privacy, <br />
              <span className="text-primary/80">Protected.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl leading-relaxed">
              At MindBridge, we believe that mental health support must be built on a foundation of absolute trust and transparency.
            </p>
          </motion.div>
        </section>

        {/* Policy Sections */}
        <section className="grid gap-6 mb-24">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="p-8 md:p-12 rounded-[2.5rem] glass border border-white/10 shadow-premium group hover:border-primary/30 transition-all flex flex-col md:flex-row gap-8 items-start backdrop-blur-2xl"
            >
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                <section.icon className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black flex items-center gap-3">
                  {section.title}
                  <ChevronRight className="h-6 w-6 text-primary/30 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Trust Badge */}
        <motion.section variants={itemVariants} className="text-center">
          <div className="p-10 md:p-16 rounded-[4rem] bg-primary/5 border border-primary/20 border-dashed inline-block relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Certified Student Support</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">Ghanaian Data Protection Compliant</p>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>

      <footer className="border-t border-border/50 py-12 px-6 md:px-24 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
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
