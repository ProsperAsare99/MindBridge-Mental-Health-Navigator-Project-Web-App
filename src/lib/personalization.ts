import { Brain, Heart, Zap, GraduationCap, Users, Activity, Battery, HeartPulse, Compass, Shield, Target, BookOpen, Moon, FileText, Sparkles } from "lucide-react";

/**
 * UserPersonalizationService
 * Core logic for translating onboarding data into tailored app experiences.
 */
export class UserPersonalizationService {
  /**
   * Generates a personalized greeting based on user data and time of day.
   */
  static generateGreeting(user: any) {
    const hours = new Date().getHours();
    let timeOfDay = "morning";
    let greetingPrefix = "Good morning";
    
    if (hours >= 12 && hours < 17) {
      timeOfDay = "afternoon";
      greetingPrefix = "Good afternoon";
    } else if (hours >= 17 && hours < 21) {
      timeOfDay = "evening";
      greetingPrefix = "Good evening";
    } else if (hours >= 21 || hours < 5) {
      timeOfDay = "night";
      greetingPrefix = "Good night";
    }

    const name = user.nickname || user.name?.split(' ')[0] || "Friend";

    if (user.preferredLanguage === "Twi") {
      const twiGreetings: Record<string, string> = {
        morning: "Maakye",
        afternoon: "Maaha",
        evening: "Maadwo",
        night: "Maadwo"
      };
      return `${twiGreetings[timeOfDay]}, ${name}! Wo te sɛn nnɛ?`;
    }

    return `${greetingPrefix}, ${name}! How are you feeling today?`;
  }

  /**
   * Determines which features should be visible/active for a specific user.
   */
  static shouldShowFeature(feature: string, user: any): boolean {
    const riskLevel = user.selfHarmRisk?.toLowerCase() || 'low';
    const examStress = (user.academicStressors as any)?.exams || 1;
    const financialStress = (user.academicStressors as any)?.financial || 1;
    
    const featureMap: Record<string, boolean> = {
      'peer-support': user.hasSupportSystem === "I feel mostly alone",
      'crisis-button': riskLevel === 'high' || riskLevel === 'moderate',
      'faith-resources': user.spiritualityImportance === "Very Important",
      'financial-wellness': financialStress >= 4,
      'exam-prep': examStress >= 4,
      'sleep-tracker': user.trackingMetrics?.includes('Sleep Quality'),
      'social-analytics': user.trackingMetrics?.includes('Social Interactions'),
    };

    return featureMap[feature] || false;
  }

  /**
   * Recommends coping strategies based on user preferences and current mood.
   */
  static recommendCopingStrategy(user: any, currentMood: number) {
    const strategies: Record<string, string[]> = {
      'Exercise / Physical Activity': [
        "Take a 10-minute walk around campus",
        "Try some quick stretches",
        "Dance to your favorite song"
      ],
      'Talking to friends/family': [
        "Message a trusted friend",
        "Join an anonymous support circle",
        "Talk to our AI companion"
      ],
      'Prayer / Meditation': [
        "Take 5 minutes for prayer",
        "Read an inspirational scripture",
        "Listen to worship music"
      ],
      'Journaling / Writing': [
        "Write about what you're feeling",
        "List 3 things you're grateful for",
        "Voice record your thoughts"
      ]
    };

    const userPreferredStyles = user.copingStyles || [];
    const recommendations = userPreferredStyles
      .flatMap((style: string) => strategies[style] || [])
      .slice(0, 3);

    return {
      title: `${user.nickname || "Kwame"}, these usually help you:`,
      strategies: recommendations.length > 0 ? recommendations : [
        "Take 3 deep breaths",
        "Step outside for fresh air",
        "Listen to some calming music"
      ]
    };
  }

  /**
   * Frames language based on the user's preferred approach.
   */
  static frameLanguage(user: any) {
    const terminology = {
      clinical: {
        sadness: "depression",
        worry: "anxiety",
        healing: "treatment",
        support: "therapy",
        wellbeing: "mental health"
      },
      holistic: {
        sadness: "low energy",
        worry: "stress",
        healing: "wellness journey",
        support: "self-care",
        wellbeing: "holistic health"
      },
      cultural: {
        sadness: "heavy heart",
        worry: "troubled mind",
        healing: "restoration",
        support: "community care",
        wellbeing: "inner peace"
      }
    };

    const approach = (user.preferredApproach?.toLowerCase() || 'holistic') as keyof typeof terminology;
    return terminology[approach] || terminology.holistic;
  }

  /**
   * Generates AI system prompt context for specific user.
   */
  static getAIContext(user: any) {
    return {
      displayName: user.nickname || user.name?.split(' ')[0] || "Friend",
      university: user.university || "your university",
      academicLevel: user.yearOfStudy || "your level",
      program: user.fieldOfStudy || "your program",
      language: user.preferredLanguage || "English",
      concerns: user.reasonsForJoining || [],
      riskLevel: user.selfHarmRisk || "LOW",
      faithLevel: user.spiritualityImportance || "Not important",
      approach: user.preferredApproach || "Holistic"
    };
  }
}
