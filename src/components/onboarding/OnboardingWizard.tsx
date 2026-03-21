"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  User, 
  Settings, 
  ShieldCheck, 
  AlertTriangle 
} from "lucide-react";

// --- Components ---
import Step1Identity from "@/components/onboarding/steps/Step1Identity";
import Step2Context from "@/components/onboarding/steps/Step2Context";
import Step3Communication from "@/components/onboarding/steps/Step3Communication";
import Step4Wellbeing from "@/components/onboarding/steps/Step4Wellbeing";
import Step5Support from "@/components/onboarding/steps/Step5Support";
import Step6Safety from "@/components/onboarding/steps/Step6Safety";
import Step7Coping from "@/components/onboarding/steps/Step7Coping";
import Step8Stress from "@/components/onboarding/steps/Step8Stress";
import Step9Values from "@/components/onboarding/steps/Step9Values";
import Step10Goals from "@/components/onboarding/steps/Step10Goals";
import Step11Tracking from "@/components/onboarding/steps/Step11Tracking";
import Step12Privacy from "@/components/onboarding/steps/Step12Privacy";
import Step13Interface from "@/components/onboarding/steps/Step13Interface";
import OnboardingProgress from "./OnboardingProgress";

const phases = [
  { id: 1, title: "Foundation", icon: User, color: "text-orange-500" },
  { id: 2, title: "Wellbeing", icon: Heart, color: "text-rose-500" },
  { id: 3, title: "Personalize", icon: Settings, color: "text-amber-500" },
  { id: 4, title: "Setup", icon: ShieldCheck, color: "text-emerald-500" },
];

export function OnboardingWizard() {
  const { user, updateSession } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(user?.onboardingStep || 1);
  const [formData, setFormData] = useState<any>({
    displayName: user?.displayName || "",

    university: user?.university || "",
    academicLevel: user?.academicLevel || 100,
    program: user?.program || "",
    language: user?.language || "english",
    notificationPreference: user?.notificationPreference || "daily",
    preferredCheckInTime: user?.preferredCheckInTime || "morning",
    baseline: user?.baseline || { mood: 3, joinDate: new Date() },
    concerns: user?.concerns || [],
    supportLevel: user?.supportLevel || "somewhat",
    riskLevel: user?.riskLevel || "LOW",
    copingStyles: user?.copingStyles || [],
    stressors: user?.stressors || { exams: 3, assignments: 3, groupWork: 3, presentations: 3, understanding: 3, financial: 3, family: 3 },
    faithLevel: user?.faithLevel || "somewhat_important",
    approachPreference: user?.approachPreference || "holistic",
    goals: user?.goals || [],
    trackingPreferences: user?.trackingPreferences || {
      mood: true,
      anxiety: false,
      sleep: false,
      academic: false,
      social: false,
      energy: false,
      physical: false,
      exercise: false
    },

    dataSharingConsent: true,
    dataVisibility: "Only me",
    preferredTheme: "🌿 Serene Green (default)",
    dashboardLayout: "Today's mood check-in"
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine current phase
  const currentPhase = step <= 3 ? 1 : step <= 6 ? 2 : step <= 10 ? 3 : 4;

  const nextStep = async () => {
    if (step < 13) {
      const next = step + 1;
      setStep(next);
      // Update backend periodically
      await saveProgress(next, false);
    } else {
      setIsSubmitting(true);
      const success = await saveProgress(13, true);
      if (success) {
        // Use window.location.href for the final redirect to ensure the session 
        // is re-fetched on the server-side before the dashboard layout checks it.
        window.location.href = "/dashboard";
      } else {
        setIsSubmitting(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const saveProgress = async (currentStep: number, completed: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/onboarding/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(user as any)?.accessToken}`
        },
        body: JSON.stringify({ 
          ...formData, 
          onboardingStep: currentStep, 
          onboardingCompleted: completed 
        })
      });

      if (response.ok) {
        // Update local session to reflect new onboarding state
        await updateSession({
          user: {
            ...user,
            onboardingStep: currentStep,
            onboardingCompleted: completed
          }
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to save onboarding progress:", error);
      return false;
    }
  };

  const updateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-12 selection:bg-orange-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
      
      {/* Progress Bar */}
      <div className="mb-12 w-full max-w-3xl px-4">
        <OnboardingProgress currentStep={step} totalSteps={13} phases={phases} currentPhase={currentPhase} />
      </div>

      {/* Wizard Card */}
      <motion.div 
        layout
        className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 p-10 md:p-16 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:shadow-orange-500/5 dark:bg-zinc-900/40"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-[450px]"
          >
            {step === 1 && <Step1Identity data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 2 && <Step2Context data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 3 && <Step3Communication data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 4 && <Step4Wellbeing data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 5 && <Step5Support data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 6 && <Step6Safety data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 7 && <Step7Coping data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 8 && <Step8Stress data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 9 && <Step9Values data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 10 && <Step10Goals data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 11 && <Step11Tracking data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 12 && <Step12Privacy data={formData} update={updateFormData} onNext={nextStep} />}
            {step === 13 && <Step13Interface data={formData} update={updateFormData} onNext={nextStep} />}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-border/30 pt-10">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="group flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-bold transition-all hover:bg-muted/50 disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          
          <button
            onClick={nextStep}
            disabled={isSubmitting}
            className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-orange-500 px-10 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] hover:bg-orange-600 active:scale-95 group"
          >
            {step === 13 ? "Enter Dashboard" : "Continue"}
            {step !== 13 && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <p className="mt-10 flex items-center gap-2 text-xs font-bold text-muted-foreground/40 transition-opacity hover:opacity-100">
        <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
        Encrypted Core Connection • Privacy Protocol Active
      </p>
    </div>
  );
}
