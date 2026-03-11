"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
        content: [
          "Anxiety and depression are common challenges. In Ghana, studies suggest up to 40% of tertiary students experience significant symptoms.",
          "Strategies include CBT techniques, physical activity, and seeking professional help early.",
          "Recognizing the signs early, such as persistent sadness, loss of interest, changes in sleep or appetite, and feelings of worthlessness, is crucial for timely intervention.",
          "Mindfulness practices and regular exercise can significantly reduce symptoms. Connecting with peers and utilizing university counseling services also provides valuable support."
        ]
    },
    {
        title: "The Burnout Cycle",
        description: "How to recognize academic exhaustion before it leads to a total collapse.",
        icon: Zap,
        category: "Academic Stress",
        readTime: "6 min read",
        content: [
          "Burnout isn't just being tired; it's emotional, mental, and physical exhaustion caused by prolonged stress.",
          "Counteract burnout by setting strict boundaries between 'study time' and 'living time'.",
          "Symptoms include chronic fatigue, cynicism towards studies, reduced performance, and increased irritability. Ignoring these signs can lead to severe health issues.",
          "Implementing regular breaks, engaging in hobbies, and ensuring adequate sleep are vital. Prioritize tasks and learn to say no to avoid overcommitment."
        ]
    },
    {
        title: "Managing Exam Stress",
        description: "Practical strategies to handle pressure without burning out.",
        icon: GraduationCap,
        category: "Academic Stress",
        readTime: "5 min read",
        content: [
          "Exam stress is universal, but manageable with chunking and the Pomodoro technique.",
          "Remember that your worth is not tied to a single grade or assessment.",
          "Effective strategies include creating a realistic study schedule, practicing past papers, and maintaining a healthy diet. Avoid cramming and ensure you get enough rest before exams.",
          "Techniques like deep breathing and progressive muscle relaxation can help calm nerves. Focus on understanding the material rather than just memorizing, and trust in your preparation."
        ]
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
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    searchInputRef.current?.focus();
  };

  const filteredArticles = useMemo(() => {
    if (!searchQuery) {
      return ARTICLES;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerCaseQuery) ||
        article.description.toLowerCase().includes(lowerCaseQuery) ||
        article.category.toLowerCase().includes(lowerCaseQuery) ||
        article.content.some((p) => p.toLowerCase().includes(lowerCaseQuery))
    );
  }, [searchQuery]);

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
              <div className="relative group max-w-2xl mx-auto">
                <button 
                  type="button"
                  onClick={handleSearchIconClick}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10"
                >
                  <Search className="h-full w-full" />
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Find articles, tools, or support guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card/40 glass border border-border rounded-2xl py-5 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all shadow-premium text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Articles */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => {
                const Icon = article.icon;
                const isExpanded = expandedArticle === index;
                return (
                  <motion.div
                    key={article.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`glass rounded-[2rem] shadow-premium group overflow-hidden ${isExpanded ? "md:col-span-2 lg:col-span-3" : "hover:scale-[1.02] transition-transform"}`}
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>
                        <button onClick={() => setExpandedArticle(isExpanded ? null : index)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      <div className="mt-6 space-y-2">
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{article.category} • {article.readTime}</p>
                        <h3 className="text-xl font-bold text-foreground/90 group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium line-clamp-2">{article.description}</p>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-8 pt-8 border-t border-primary/10 space-y-4">
                            {article.content.map((p, i) => <p key={i} className="text-sm text-foreground/70 leading-relaxed font-medium">{p}</p>)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 glass rounded-[2rem] border border-dashed border-primary/20"
              >
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/40">
                  <Search size={40} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground/80">No matches found</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">We couldn't find any articles matching "{searchQuery}". Try a different keyword.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchQuery("")}
                  className="rounded-xl font-bold"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
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
