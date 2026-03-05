import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/shader-background";
import ParallaxSection from "@/components/parallax-section";
import { ArrowRight, LogIn, UserPlus, Brain, BarChart3, ShieldCheck, CircleDot } from "lucide-react";

export default function Home() {
  return (
    <div className="relative font-sans text-white selection:bg-indigo-300 selection:text-indigo-900">
      {/* Background Shader */}
      <ShaderBackground />

      {/* Navigation - Minimal and Floating */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-indigo-400" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white/90">MindBridge</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white border-white/20">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 border-none shadow-lg shadow-indigo-900/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">

          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-indigo-200 backdrop-blur-md mx-auto mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            Context-Aware Mental Health Support
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
            Your Mind<br />
            <span className="text-indigo-200">Understood.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed tracking-wide">
            A Navigator for Tertiary Students in Ghana. Get Personalized Help, Track your mood,
            and Access Awareness Resources Tailored to your Academic life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 text-white border-none ring-1 ring-white/20 shadow-xl shadow-indigo-900/30 transition-all hover:scale-105">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all hover:scale-105">
                <UserPlus className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </Link>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Confidential</div>
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Context-Aware</div>
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Always Available</div>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/30 text-xs tracking-widest uppercase">Scroll to explore</span>
            <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <ParallaxSection speed={0.3} direction="up" className="min-h-screen py-32" id="features">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              Built for Your Wellbeing
            </h2>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
              Comprehensive mental health tools designed specifically for the unique challenges faced by Ghanaian tertiary students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:bg-white/10 hover:border-indigo-400/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mood Tracking</h3>
              <p className="text-white/50 leading-relaxed">
                Log your daily emotions and visualize patterns over time. Understand what triggers your highs and lows throughout the semester.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:bg-white/10 hover:border-teal-400/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Support</h3>
              <p className="text-white/50 leading-relaxed">
                Get context-aware guidance from our AI assistant that understands the Ghanaian academic environment and cultural context.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:bg-white/10 hover:border-rose-400/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-500/10">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/25 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Crisis Resources</h3>
              <p className="text-white/50 leading-relaxed">
                Instant access to emergency contacts, counseling services, and self-help resources when you need them most.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* ─── How It Works Section ─── */}
      <ParallaxSection speed={0.5} direction="down" className="min-h-screen py-32" id="how-it-works">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-sm font-medium mb-6 backdrop-blur-sm">
              Simple & Effective
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              How It Works
            </h2>
          </div>

          <div className="space-y-20">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 backdrop-blur-md flex items-center justify-center">
                <span className="text-4xl font-black text-indigo-300">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Create Your Account</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                  Sign up in seconds with just your email. Your data stays private and secure — we take confidentiality seriously.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-400/20 backdrop-blur-md flex items-center justify-center">
                <span className="text-4xl font-black text-teal-300">02</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Take an Assessment</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                  Complete a quick self-assessment to help us understand where you are. Our tools adapt to your unique needs and situation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0 h-24 w-24 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-400/20 backdrop-blur-md flex items-center justify-center">
                <span className="text-4xl font-black text-rose-300">03</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Get Personalized Support</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                  Access tailored resources, track your mood daily, and chat with our AI navigator whenever you need guidance or support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* ─── CTA Section ─── */}
      <ParallaxSection speed={0.2} direction="up" className="min-h-[70vh] py-32 flex items-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 backdrop-blur-xl p-12 md:p-20 shadow-2xl shadow-indigo-500/5">
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                <CircleDot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of students already taking charge of their mental wellbeing. It&apos;s free, confidential, and always available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 text-white border-none ring-1 ring-white/20 shadow-xl shadow-indigo-900/30 transition-all hover:scale-105">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all hover:scale-105">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/5 text-white/30 text-sm">
            <p>&copy; 2026 MindBridge. Built with care for the Ghanaian student community.</p>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
