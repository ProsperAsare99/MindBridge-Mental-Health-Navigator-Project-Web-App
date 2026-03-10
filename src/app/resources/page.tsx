"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/components/providers/SearchProvider";
import { 
  BookOpen, 
  Search, 
  ArrowLeft,
  Brain,
  Zap,
  GraduationCap,
  Lightbulb,
  Moon,
  Users,
  Leaf,
  Dumbbell,
  Heart,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  ArrowUpRight,
  Download,
  FileText
} from "lucide-react";

// --- Data (Shared or copied for simplicity in this dedicated page) ---
const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description: "Learn to recognise the signs and discover evidence-based strategies to manage them effectively.",
        icon: Brain,
        category: "Mental Health",
        readTime: "7 min read",
        content: "Anxiety and depression are common challenges. In Ghana, studies suggest up to 40% of tertiary students experience significant symptoms. Strategies include CBT techniques, physical activity, and seeking professional help early."
    },
    {
        title: "The Burnout Cycle",
        description: "How to recognize academic exhaustion before it leads to a total collapse.",
        icon: Zap,
        category: "Academic Stress",
        readTime: "6 min read",
        content: "Burnout isn't just being tired; it's emotional, mental, and physical exhaustion caused by prolonged stress. Counteract burnout by setting strict boundaries between 'study time' and 'living time'."
    },
    {
        title: "Managing Exam Stress",
        description: "Practical strategies to handle pressure without burning out.",
        icon: GraduationCap,
        category: "Academic Stress",
        readTime: "5 min read",
        content: "Exam stress is universal, but manageable with chunking and the Pomodoro technique. Remember that your worth is not tied to a single grade or assessment."
    }
];

const FREE_BOOKS = [
    { title: "Mind Over Mood", author: "Greenberger & Padesky" },
    { title: "Feeling Good", author: "David Burns" },
    { title: "WHO Stress Guide", author: "World Health Org" }
];

export default function ResourcesPage() {
  const { toggle } = useSearch();
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

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
        className="relative z-10 pt-40 pb-24 px-6 md:px-24 max-w-7xl mx-auto"
      >
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
              <BookOpen className="h-3.5 w-3.5" />
              Resource Hub
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none pt-4">
              Knowledge for <br />
              <span className="text-primary/70">Resilience.</span>
            </h1>
            <p className="text-xl md:text-3xl font-medium text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Explore our curated library of guides, tools, and insights designed for the student experience.
            </p>

            {/* Global Search Trigger */}
            <motion.div variants={itemVariants} className="max-w-xl mx-auto pt-8">
              <button 
                onClick={toggle}
                className="w-full h-20 px-8 rounded-[2.5rem] glass border border-white/10 flex items-center gap-6 group hover:border-primary/40 transition-all text-left backdrop-blur-3xl shadow-premium"
              >
                <Search className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-110" />
                <span className="text-xl font-medium text-muted-foreground/50">Search resources...</span>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/5 border border-primary/10 text-xs font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">
                  ⌘K
                </div>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Articles */}
        <section className="grid gap-6 md:grid-cols-3 mb-32">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.title}
              variants={itemVariants}
              className="p-8 rounded-[3rem] glass border border-white/10 shadow-premium group hover:border-primary/40 transition-all backdrop-blur-2xl"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner text-primary">
                <article.icon className="h-8 w-8" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 opacity-60">{article.category} • {article.readTime}</p>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{article.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed mb-6 line-clamp-2">{article.description}</p>
              <Button variant="ghost" className="p-0 h-auto font-black text-xs uppercase tracking-widest gap-2 hover:bg-transparent hover:text-primary group/link">
                Read Article <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </section>

        {/* Books Strip */}
        <motion.section variants={itemVariants} className="text-center">
          <div className="p-10 md:p-16 rounded-[4rem] bg-primary/5 border border-primary/20 border-dashed inline-block relative overflow-hidden group max-w-4xl w-full">
            <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-2">Free Guides & Books</h3>
                <p className="text-muted-foreground font-medium">Download evidence-based resources for free.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 w-full md:w-auto">
                {FREE_BOOKS.map(book => (
                  <div key={book.title} className="p-4 rounded-2xl bg-background/50 border border-primary/10 flex items-center gap-4 text-left">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm">{book.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>

      <footer className="border-t border-border/50 py-12 px-6 md:px-24 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">MindBridge Resources</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
