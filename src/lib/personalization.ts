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

    const name = user.displayName || user.name?.split(' ')[0] || "Friend";

    if (user.language === "Twi") {
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
    const riskLevel = user.riskLevel?.toLowerCase() || 'low';
    const examStress = (user.stressors as any)?.exams || 1;
    const financialStress = (user.stressors as any)?.financial || 1;
    
    const featureMap: Record<string, boolean> = {
      'peer-support': user.supportLevel === "alone",
      'crisis-button': riskLevel === 'high' || riskLevel === 'moderate' || riskLevel === 'critical',
      'faith-resources': user.faithLevel === "very_important",
      'financial-wellness': financialStress >= 4,
      'exam-prep': examStress >= 4,
      'sleep-tracker': !!user.trackingPreferences?.sleep,
      'social-analytics': !!user.trackingPreferences?.social,
    };

    return featureMap[feature] || false;
  }

  /**
   * Recommends coping strategies based on user preferences and current mood.
   */
  static recommendCopingStrategy(user: any, currentMood: number) {
    const strategies: Record<string, string[]> = {
      'exercise': [
        "Take a 10-minute walk around campus",
        "Try some quick stretches",
        "Dance to your favorite song"
      ],
      'talk': [
        "Message a trusted friend",
        "Join an anonymous support circle",
        "Explore your growth tools"
      ],
      'pray': [
        "Take 5 minutes for prayer",
        "Read an inspirational scripture",
        "Listen to worship music"
      ],
      'journal': [
        "Write about what you're feeling",
        "List 3 things you're grateful for",
        "Voice record your thoughts"
      ],
      'music': [
        "Listen to your calming playlist",
        "Discover some upbeat tunes"
      ]
    };

    const userPreferredStyles = user.copingStyles || [];
    const recommendations = userPreferredStyles
      .flatMap((style: string) => strategies[style] || [])
      .slice(0, 3);

    return {
      title: `${user.displayName || "Friend"}, these usually help you:`,
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
      },
      mixed: {
        sadness: "struggle",
        worry: "tension",
        healing: "growth",
        support: "guidance",
        wellbeing: "balance"
      }
    };

    const approach = (user.approachPreference?.toLowerCase() || 'holistic') as keyof typeof terminology;
    return terminology[approach] || terminology.holistic;
  }

  /**
   * Generates profile context for specific user.
   */
  static getAIContext(user: any) {
    return {
      displayName: user.displayName || user.name?.split(' ')[0] || "Friend",
      university: user.university || "your university",
      academicLevel: user.academicLevel || "your level",
      program: user.program || "your program",
      language: user.language || "English",
      concerns: user.concerns || [],
      riskLevel: user.riskLevel || "LOW",
      faithLevel: user.faithLevel || "somewhat_important",
      approach: user.approachPreference || "holistic"
    };
  }

}
