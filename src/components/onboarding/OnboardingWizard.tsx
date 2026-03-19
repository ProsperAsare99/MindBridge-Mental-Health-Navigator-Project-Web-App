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
import Step1Identity from "./steps/Step1Identity";
import Step2Context from "./steps/Step2Context";
import Step3Communication from "./steps/Step3Communication";
import Step4Wellbeing from "./steps/Step4Wellbeing";
import Step5Support from "./steps/Step5Support";
import Step6Safety from "./steps/Step6Safety";
import Step7Coping from "./steps/Step7Coping";
import Step8Stress from "./steps/Step8Stress";
import Step9Values from "./steps/Step9Values";
import Step10Goals from "./steps/Step10Goals";
import Step11Tracking from "./steps/Step11Tracking";
import Step12Privacy from "./steps/Step12Privacy";
import Step13Interface from "./steps/Step13Interface";
import OnboardingProgress from "./OnboardingProgress";

const phases = [
  { id: 1, title: "Foundation", icon: User, color: "text-blue-500" },
  { id: 2, title: "Wellbeing", icon: Heart, color: "text-rose-500" },
  { id: 3, title: "Personalize", icon: Settings, color: "text-amber-500" },
  { id: 4, title: "Setup", icon: ShieldCheck, color: "text-emerald-500" },
];

export function OnboardingWizard() {
  const { user, updateSession } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(user?.onboardingStep || 1);
  const [formData, setFormData] = useState<any>({
    nickname: user?.name || "",
    institution: user?.institution || "",
    yearOfStudy: "",
    fieldOfStudy: user?.course || "",
    preferredLanguage: "English",
    notificationPreference: "Daily gentle reminders",
    checkInTime: "Morning (6am - 10am)",
    wellbeingBaseline: "",
    reasonsForJoining: [],
    hasSupportSystem: "",
    previousProfessionalSupport: "",
    selfHarmRisk: "No",
    emergencyContacts: {},
    copingStyles: [],
    academicStressors: { exams: 1, deadlines: 1, groups: 1, presentation: 1, comprehension: 1, financial: 1, family: 1 },
    spiritualityImportance: "Not important",
    preferredApproach: "Holistic/Wellness approach",
    goals: [],
    trackingFrequency: "Daily",
    trackingMetrics: ["Mood/Emotions"],
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
      await saveProgress(13, true);
      router.push("/dashboard");
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
      }
    } catch (error) {
      console.error("Failed to save onboarding progress:", error);
    }
  };

  const updateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 selection:bg-primary/20">
      {/* Background patterns */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
      
      {/* Progress Bar */}
      <div className="mb-8 w-full max-w-2xl px-4">
        <OnboardingProgress currentStep={step} totalSteps={13} phases={phases} currentPhase={currentPhase} />
      </div>

      {/* Wizard Card */}
      <motion.div 
        layout
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-primary/5 dark:bg-zinc-900/50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="min-h-[400px]"
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
        <div className="mt-12 flex items-center justify-between border-t border-border/50 pt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-0 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          
          <button
            onClick={nextStep}
            disabled={isSubmitting}
            className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-2 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95"
          >
            {step === 13 ? "Finish & Enter Dashboard" : "Continue"}
            {step !== 13 && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground transition-opacity hover:opacity-100 dark:text-zinc-500">
        <ShieldCheck className="h-3 w-3 text-emerald-500" />
        Your data is encrypted and confidential.
      </p>
    </div>
  );
}
