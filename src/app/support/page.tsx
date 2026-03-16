import Link from "next/link";
import { MotionDiv, MotionMain, MotionSection } from "@/components/motion-wrappers";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { SearchTrigger } from "@/components/search/search-trigger";
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  LifeBuoy, 
  ArrowLeft,
  Search,
  BookOpen,
  Settings,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { AuroraBackground } from "@/components/animations/aurora-background";

export default function SupportPage() {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn how to set up your profile and start your well-being journey.",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Technical Support",
      description: "Troubleshoot app issues, account access, and synchronization.",
      icon: Settings,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Crisis Resources",
      description: "Immediate help and contacts for emergency mental health situations.",
      icon: ShieldAlert,
      color: "bg-red-500/10 text-red-500"
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
      <AuroraBackground primaryColor="bg-primary/10" secondaryColor="bg-secondary/15" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24 backdrop-blur-md bg-background/50 border-b border-border/50">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 outline-none"
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="font-bold flex items-center gap-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </MotionDiv>
      </nav>

      <MotionMain 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pt-40 pb-24 px-6 md:px-24"
      >
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <MotionDiv variants={itemVariants} className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
              <HelpCircle className="h-3.5 w-3.5" />
              Support Center
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none pt-4">
              We're Here <br />
              <span className="text-secondary">For You.</span>
            </h1>
            <p className="text-xl md:text-3xl font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find answers, explore resources, or reach out to our team for personalized assistance.
            </p>

            {/* Global Search Trigger */}
            <MotionDiv variants={itemVariants} className="max-w-xl mx-auto pt-8">
              <SearchTrigger />
            </MotionDiv>
          </MotionDiv>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-32 pt-20">
          {categories.map((cat, i) => (
            <MotionDiv
              key={cat.title}
              variants={itemVariants}
              className="p-10 rounded-[3rem] glass border border-white/10 shadow-premium group hover:border-primary/40 transition-all cursor-pointer backdrop-blur-2xl"
            >
              <div className={`h-20 w-20 rounded-2xl ${cat.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner`}>
                <cat.icon className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{cat.title}</h3>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">{cat.description}</p>
            </MotionDiv>
          ))}
        </section>

        {/* Contact Strip */}
        <MotionSection variants={itemVariants} className="max-w-5xl mx-auto">
          <div className="rounded-[4rem] glass border border-white/5 p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left overflow-hidden relative shadow-premium backdrop-blur-3xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 blur-[130px] pointer-events-none" />
            <div className="space-y-8 relative z-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Still Need Help?</h2>
              <p className="text-xl text-muted-foreground font-medium max-w-md">
                Our support team is available 24/7. Reach out and we'll bridge the gap.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
              <Button size="lg" className="h-20 px-12 rounded-full text-xl font-black gap-4 w-full shadow-2xl shadow-primary/30 group">
                <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Live Chat
              </Button>
              <Button variant="outline" size="lg" className="h-20 px-12 rounded-full text-xl font-black gap-4 w-full border-2 border-primary/10 hover:border-primary/20 bg-background/50">
                <Mail className="h-6 w-6" />
                Email Support
              </Button>
            </div>
          </div>
        </MotionSection>
      </MotionMain>

      <footer className="border-t border-border/50 py-12 px-6 md:px-24 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
            © 2026 MindBridge. Ghanaian Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
