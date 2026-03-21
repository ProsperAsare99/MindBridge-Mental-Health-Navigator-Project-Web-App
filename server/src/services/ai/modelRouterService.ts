import { geminiConfig } from '../../config/geminiConfig';

export interface ModelRouterContext {
  conversationLength: number;
  userRiskLevel: string;
  messageComplexity: number;
  requiresAnalysis: boolean;
  crisisDetected: boolean;
  emotionalIntensity: number;
  hasPreviousAssessments?: boolean;
  hasJournalHistory?: boolean;
}

export interface ModelSelectionResult {
  model: any;
  reason: string;
}

class ModelRouter {
  
  /**
   * Intelligently select the best model for the request
   */
  selectModel(context: ModelRouterContext): ModelSelectionResult {
    const {
      conversationLength,
      userRiskLevel,
      messageComplexity,
      requiresAnalysis,
      crisisDetected,
      emotionalIntensity
    } = context;

    // Crisis situations always use pro model with crisis config
    if (crisisDetected || userRiskLevel === 'High' || userRiskLevel === 'Extreme' || emotionalIntensity > 8) {
      return {
        model: geminiConfig.models.crisis,
        reason: 'crisis_protocol'
      };
    }

    // Complex analysis (mood insights, journal analysis)
    if (requiresAnalysis || messageComplexity > 7) {
      return {
        model: geminiConfig.models.pro,
        reason: 'complex_analysis'
      };
    }

    // Long conversations benefit from pro model's context understanding
    if (conversationLength > 10) {
      return {
        model: geminiConfig.models.pro,
        reason: 'extended_conversation'
      };
    }

    // Default to flash for speed and cost efficiency
    return {
      model: geminiConfig.models.flash,
      reason: 'standard_interaction'
    };
  }

  /**
   * Calculate message complexity
   */
  calculateComplexity(message: string, context: Partial<ModelRouterContext> = {}): number {
    let complexity = 0;

    // Length factor
    if (message.length > 500) complexity += 3;
    else if (message.length > 200) complexity += 2;
    else if (message.length > 100) complexity += 1;

    // Emotional indicators
    const emotionalWords = [
      'overwhelmed', 'devastated', 'hopeless', 'anxious', 
      'depressed', 'scared', 'terrified', 'alone', 'worthless'
    ];
    
    const emotionCount = emotionalWords.filter(word => 
      message.toLowerCase().includes(word)
    ).length;
    
    complexity += emotionCount * 2;

    // Multiple questions
    const questionMarks = (message.match(/\?/g) || []).length;
    complexity += questionMarks;

    // Past context
    if (context.hasPreviousAssessments) complexity += 2;
    if (context.hasJournalHistory) complexity += 1;

    return Math.min(complexity, 10); // Cap at 10
  }

  /**
   * Detect emotional intensity
   */
  detectEmotionalIntensity(message: string): number {
    const intensifiers = ['very', 'extremely', 'incredibly', 'completely', 'totally'];
    const negativeEmotions = ['sad', 'angry', 'hopeless', 'worthless', 'scared', 'anxious'];
    
    let intensity = 0;

    const msgLower = message.toLowerCase();
    
    // Count intensifiers
    intensifiers.forEach(word => {
      if (msgLower.includes(word)) intensity += 2;
    });

    // Count negative emotions
    negativeEmotions.forEach(emotion => {
      if (msgLower.includes(emotion)) intensity += 3;
    });

    // All caps (shouting)
    if (message === message.toUpperCase() && message.length > 10) {
      intensity += 4;
    }

    // Multiple exclamation marks
    const exclamations = (message.match(/!/g) || []).length;
    intensity += exclamations;

    return Math.min(intensity, 10);
  }
}

export const modelRouter = new ModelRouter();
