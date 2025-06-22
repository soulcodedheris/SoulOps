import { Provider } from "../data/providers";

export interface UserProfile {
  id: string;
  age: number;
  gender: string;
  location: string;
  culturalContext: string;
  language: string;
  religion?: string;
  occupation?: string;
  education?: string;
  familyStatus?: string;
  interests: string[];
  mentalHealthHistory: {
    conditions: string[];
    treatments: string[];
    medications: string[];
  };
  preferences: {
    consultationType: "PROFESSIONAL" | "TRADITIONAL" | "BOTH";
    budget: number;
    availability: string[];
    communicationStyle: "DIRECT" | "GENTLE" | "CULTURAL";
  };
  behavioralData: {
    moodHistory: Array<{
      date: string;
      mood: number; // 1-10 scale
      activities: string[];
      triggers: string[];
    }>;
    assessmentScores: Array<{
      assessmentId: string;
      score: number;
      date: string;
    }>;
    courseProgress: Array<{
      courseId: string;
      progress: number;
      engagement: number; // 1-10 scale
    }>;
    forumActivity: {
      postsCreated: number;
      repliesGiven: number;
      topicsFollowed: string[];
    };
  };
}

export interface Recommendation {
  type:
    | "COURSE"
    | "PROVIDER"
    | "ASSESSMENT"
    | "FORUM_POST"
    | "ACTIVITY"
    | "RESOURCE";
  itemId: string;
  title: string;
  description: string;
  confidence: number; // 0-1 scale
  reasoning: string[];
  culturalRelevance: number; // 0-1 scale
  urgency: "LOW" | "MEDIUM" | "HIGH";
  category: string;
}

export interface AIInsight {
  type:
    | "MOOD_PATTERN"
    | "CULTURAL_INSIGHT"
    | "PROGRESS_UPDATE"
    | "RISK_ALERT"
    | "OPPORTUNITY";
  title: string;
  description: string;
  severity: "INFO" | "WARNING" | "ALERT";
  recommendations: string[];
  culturalContext: string;
}

class AIRecommendationEngine {
  private userProfile: UserProfile;

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
  }

  // Analyze mood patterns and identify trends
  analyzeMoodPatterns(): AIInsight[] {
    const insights: AIInsight[] = [];
    const moodHistory = this.userProfile.behavioralData.moodHistory;

    if (moodHistory.length < 7) return insights;

    // Calculate average mood
    const averageMood =
      moodHistory.reduce((sum, entry) => sum + entry.mood, 0) /
      moodHistory.length;

    // Check for declining mood trend
    const recentMoods = moodHistory.slice(-7).map((entry) => entry.mood);
    const moodTrend = this.calculateTrend(recentMoods);

    if (moodTrend < -0.5 && averageMood < 5) {
      insights.push({
        type: "MOOD_PATTERN",
        title: "Declining Mood Pattern Detected",
        description: `Your mood has been declining over the past week. Your average mood is ${averageMood.toFixed(
          1
        )}/10, which suggests you might be experiencing increased stress or emotional challenges.`,
        severity: "WARNING",
        recommendations: [
          "Consider taking a mood assessment to better understand your current state",
          "Connect with a mental health professional for support",
          "Practice stress-reduction techniques like prayer or meditation",
          "Reach out to trusted family members or friends",
        ],
        culturalContext: this.userProfile.culturalContext,
      });
    }

    // Identify common triggers
    const triggers = moodHistory.flatMap((entry) => entry.triggers);
    const triggerFrequency = this.getFrequencyMap(triggers);
    const topTriggers = Object.entries(triggerFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    if (topTriggers.length > 0) {
      insights.push({
        type: "MOOD_PATTERN",
        title: "Common Stress Triggers Identified",
        description: `Based on your mood tracking, common triggers include: ${topTriggers
          .map(([trigger, count]) => `${trigger} (${count} times)`)
          .join(", ")}.`,
        severity: "INFO",
        recommendations: [
          "Develop coping strategies for these specific triggers",
          "Consider discussing these triggers with a counselor",
          "Practice mindfulness techniques when these situations arise",
        ],
        culturalContext: this.userProfile.culturalContext,
      });
    }

    return insights;
  }

  // Generate personalized course recommendations
  generateCourseRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const { behavioralData } = this.userProfile;

    // Recommend based on cultural context
    if (this.userProfile.culturalContext.includes("Nigerian")) {
      recommendations.push({
        type: "COURSE",
        itemId: "1", // Understanding Mental Health in Nigerian Context
        title: "Understanding Mental Health in Nigerian Context",
        description:
          "Learn about mental health challenges specific to Nigerian communities, including cultural stigma and modern approaches.",
        confidence: 0.9,
        reasoning: [
          "Matches your cultural background",
          "Addresses common Nigerian mental health challenges",
          "Free and accessible",
        ],
        culturalRelevance: 0.95,
        urgency: "MEDIUM",
        category: "cultural_awareness",
      });
    }

    // Recommend based on mood patterns
    const recentMood =
      behavioralData.moodHistory[behavioralData.moodHistory.length - 1]?.mood ||
      5;
    if (recentMood < 6) {
      recommendations.push({
        type: "COURSE",
        itemId: "4", // Stress Management for Nigerian Professionals
        title: "Stress Management for Nigerian Professionals",
        description:
          "Practical stress management techniques tailored for Nigerian workplace culture and family responsibilities.",
        confidence: 0.8,
        reasoning: [
          "Your recent mood suggests increased stress",
          "Addresses workplace and family stress common in Nigerian culture",
          "Practical, actionable techniques",
        ],
        culturalRelevance: 0.85,
        urgency: "HIGH",
        category: "stress_management",
      });
    }

    // Recommend based on digital wellness if user is young
    if (this.userProfile.age < 30) {
      recommendations.push({
        type: "COURSE",
        itemId: "2", // Digital Wellness for Nigerian Youth
        title: "Digital Wellness for Nigerian Youth",
        description:
          "Navigate social media, technology, and digital spaces while maintaining mental health and cultural values.",
        confidence: 0.75,
        reasoning: [
          "Age-appropriate content for young adults",
          "Addresses modern challenges with cultural sensitivity",
          "Relevant to current digital lifestyle",
        ],
        culturalRelevance: 0.8,
        urgency: "MEDIUM",
        category: "digital_wellness",
      });
    }

    return recommendations;
  }

  // Generate provider recommendations
  generateProviderRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const { preferences, language } = this.userProfile;

    // Filter providers by user preferences
    const providers = this.getAvailableProviders();

    const filteredProviders = providers.filter((provider) => {
      // Match consultation type preference
      if (
        preferences.consultationType !== "BOTH" &&
        provider.consultationType !== preferences.consultationType
      ) {
        return false;
      }

      // Match budget
      if (provider.consultationFee > preferences.budget) {
        return false;
      }

      // Match language
      if (!provider.languages.includes(language)) {
        return false;
      }

      return true;
    });

    // Sort by cultural relevance and rating
    const scoredProviders = filteredProviders.map((provider) => ({
      ...provider,
      culturalScore: this.calculateCulturalRelevance(provider),
      totalScore: this.calculateCulturalRelevance(provider) * provider.rating,
    }));

    scoredProviders
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3)
      .forEach((provider) => {
        recommendations.push({
          type: "PROVIDER",
          itemId: provider.id,
          title: provider.name,
          description: `${provider.specialization} - ${provider.experience} experience`,
          confidence: provider.totalScore / 5, // Normalize to 0-1
          reasoning: [
            `Matches your ${preferences.consultationType.toLowerCase()} preference`,
            `Speaks your preferred language (${language})`,
            `Within your budget (₦${provider.consultationFee.toLocaleString()})`,
            `High cultural relevance score (${(
              provider.culturalScore * 100
            ).toFixed(0)}%)`,
          ],
          culturalRelevance: provider.culturalScore,
          urgency: "MEDIUM",
          category: "consultation",
        });
      });

    return recommendations;
  }

  // Generate assessment recommendations
  generateAssessmentRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const { behavioralData } = this.userProfile;

    // Check if user needs depression screening
    const recentMood =
      behavioralData.moodHistory[behavioralData.moodHistory.length - 1]?.mood ||
      5;
    const lastDepressionAssessment = behavioralData.assessmentScores
      .filter((score) => score.assessmentId === "1")
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

    if (
      recentMood < 6 &&
      (!lastDepressionAssessment ||
        this.daysSince(lastDepressionAssessment.date) > 30)
    ) {
      recommendations.push({
        type: "ASSESSMENT",
        itemId: "1",
        title: "Depression Screening (PHQ-9) - Nigerian Context",
        description:
          "Standard depression screening adapted for Nigerian cultural context.",
        confidence: 0.85,
        reasoning: [
          "Your recent mood suggests potential depression symptoms",
          "Cultural adaptation ensures accurate assessment",
          "Regular screening helps track progress",
        ],
        culturalRelevance: 0.9,
        urgency: "HIGH",
        category: "mental_health_screening",
      });
    }

    // Recommend cultural identity assessment if not completed
    const culturalAssessment = behavioralData.assessmentScores.find(
      (score) => score.assessmentId === "3"
    );
    if (!culturalAssessment) {
      recommendations.push({
        type: "ASSESSMENT",
        itemId: "3",
        title: "Cultural Identity Assessment",
        description:
          "Explore your cultural background and its influence on mental health.",
        confidence: 0.7,
        reasoning: [
          "Helps understand cultural factors in your mental health",
          "Not yet completed",
          "Provides personalized cultural insights",
        ],
        culturalRelevance: 0.95,
        urgency: "LOW",
        category: "cultural_awareness",
      });
    }

    return recommendations;
  }

  // Generate personalized insights
  generateInsights(): AIInsight[] {
    const insights: AIInsight[] = [];

    // Add mood pattern insights
    insights.push(...this.analyzeMoodPatterns());

    // Progress insights
    const completedCourses =
      this.userProfile.behavioralData.courseProgress.filter(
        (course) => course.progress === 100
      );
    if (completedCourses.length > 0) {
      insights.push({
        type: "PROGRESS_UPDATE",
        title: "Learning Progress Update",
        description: `You've completed ${completedCourses.length} course${
          completedCourses.length > 1 ? "s" : ""
        }! Your commitment to mental health education is impressive.`,
        severity: "INFO",
        recommendations: [
          "Consider sharing your knowledge with family and friends",
          "Take an assessment to measure your progress",
          "Explore advanced courses in your areas of interest",
        ],
        culturalContext: this.userProfile.culturalContext,
      });
    }

    // Cultural insights
    if (this.userProfile.culturalContext.includes("Nigerian")) {
      insights.push({
        type: "CULTURAL_INSIGHT",
        title: "Cultural Strength Recognition",
        description:
          "Your Nigerian cultural background provides unique strengths for mental health resilience, including strong family bonds and spiritual practices.",
        severity: "INFO",
        recommendations: [
          "Leverage family support networks",
          "Incorporate traditional spiritual practices",
          "Connect with cultural community resources",
        ],
        culturalContext: this.userProfile.culturalContext,
      });
    }

    return insights;
  }

  // Helper methods
  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val, index) => sum + val * index, 0);
    const sumXY = values.reduce((sum, val, index) => sum + val * index, 0);
    const sumX2 = values.reduce((sum, _, index) => sum + index * index, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  private getFrequencyMap(items: string[]): Record<string, number> {
    return items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private calculateCulturalRelevance(provider: Provider): number {
    let score = 0;

    // Cultural context match
    if (provider.culturalContext.includes(this.userProfile.culturalContext)) {
      score += 0.4;
    }

    // Language match
    if (provider.languages.includes(this.userProfile.language)) {
      score += 0.3;
    }

    // Religious/cultural approach match
    if (
      this.userProfile.religion &&
      provider.culturalApproach
        .toLowerCase()
        .includes(this.userProfile.religion.toLowerCase())
    ) {
      score += 0.3;
    }

    return Math.min(score, 1);
  }

  private getAvailableProviders(): Provider[] {
    // This would typically fetch from a database
    // For now, return mock data
    return [
      {
        id: "1",
        name: "Dr. Aisha Bello",
        consultationType: "PROFESSIONAL",
        consultationFee: 15000,
        languages: ["English", "Hausa", "Yoruba"],
        culturalContext: "Northern Nigeria",
        rating: 4.8,
        culturalApproach:
          "Integrates Islamic values with evidence-based therapy",
        specialization: "Clinical Psychologist",
        experience: "15+ years",
        reviews: 127,
        availability: "Mon-Fri, 9AM-5PM",
        focusAreas: [
          "Anxiety",
          "Depression",
          "Trauma",
          "Cultural Identity",
          "Family Therapy",
        ],
        location: "Lagos, Nigeria",
        education: "PhD Clinical Psychology, University of Lagos",
        certifications: [
          "Licensed Clinical Psychologist",
          "Trauma-Informed Care",
          "Cultural Competency",
        ],
        bio: "Dr. Aisha Bello is a licensed clinical psychologist with over 15 years of experience working with Nigerian communities. She specializes in trauma-informed care and cultural identity issues, helping clients navigate the intersection of traditional values and modern mental health approaches.",
        consultationTypes: ["IN_PERSON", "VIDEO", "AUDIO"],
        specialties: [
          "Trauma Therapy",
          "Cultural Identity",
          "Family Counseling",
          "Anxiety Disorders",
        ],
        photo: undefined,
      },
      {
        id: "2",
        name: "Baba Adewale",
        consultationType: "TRADITIONAL",
        consultationFee: 8000,
        languages: ["Yoruba", "English"],
        culturalContext: "Yoruba Tradition",
        rating: 4.9,
        culturalApproach: "Traditional Yoruba spiritual practices",
        specialization: "Traditional Healer",
        experience: "30+ years",
        reviews: 89,
        availability: "Daily, 8AM-8PM",
        focusAreas: [
          "Spiritual Healing",
          "Ancestral Guidance",
          "Cultural Practices",
          "Life Purpose",
        ],
        location: "Ibadan, Nigeria",
        bio: "Baba Adewale is a respected traditional healer with deep knowledge of Yoruba spiritual practices and ancestral wisdom. He helps clients connect with their cultural roots and find spiritual balance in modern life.",
        consultationTypes: ["IN_PERSON", "AUDIO"],
        specialties: [
          "Spiritual Counseling",
          "Ancestral Connection",
          "Cultural Healing",
          "Life Purpose",
        ],
        photo: undefined,
      },
    ];
  }

  private daysSince(dateString: string): number {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

export const createRecommendationEngine = (
  userProfile: UserProfile
): AIRecommendationEngine => {
  return new AIRecommendationEngine(userProfile);
};

export const generatePersonalizedRecommendations = (
  userProfile: UserProfile
) => {
  const engine = createRecommendationEngine(userProfile);

  return {
    courses: engine.generateCourseRecommendations(),
    providers: engine.generateProviderRecommendations(),
    assessments: engine.generateAssessmentRecommendations(),
    insights: engine.generateInsights(),
  };
};
