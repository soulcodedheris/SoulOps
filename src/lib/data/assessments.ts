export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: "MENTAL_HEALTH" | "CULTURAL" | "WELLNESS" | "SCREENING";
  duration: number; // in minutes
  questions: Question[];
  isCompleted: boolean;
  lastTaken?: string;
  score?: number;
  maxScore: number;
  culturalContext: string;
  languages: string[];
  recommended: boolean;
  category: string;
  instructions: string;
  interpretation: InterpretationGuide;
}

export interface Question {
  id: string;
  text: string;
  type: "MULTIPLE_CHOICE" | "SCALE" | "TEXT" | "YES_NO";
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
  weight: number;
  category: string;
}

export interface InterpretationGuide {
  low: {
    range: [number, number];
    description: string;
    recommendations: string[];
    severity: "LOW" | "MODERATE" | "HIGH" | "SEVERE";
  };
  moderate: {
    range: [number, number];
    description: string;
    recommendations: string[];
    severity: "LOW" | "MODERATE" | "HIGH" | "SEVERE";
  };
  high: {
    range: [number, number];
    description: string;
    recommendations: string[];
    severity: "LOW" | "MODERATE" | "HIGH" | "SEVERE";
  };
  severe: {
    range: [number, number];
    description: string;
    recommendations: string[];
    severity: "LOW" | "MODERATE" | "HIGH" | "SEVERE";
  };
}

export interface UserProfile {
  culturalContext?: string;
  language?: string;
  issues?: string[];
}

export const assessments: Assessment[] = [
  {
    id: "1",
    title: "Depression Screening (PHQ-9) - Nigerian Context",
    description:
      "Standard depression screening adapted for Nigerian cultural context, considering local expressions of distress and help-seeking behaviors.",
    type: "MENTAL_HEALTH",
    duration: 5,
    questions: [
      {
        id: "1-1",
        text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
        type: "SCALE",
        scale: {
          min: 0,
          max: 3,
          labels: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
        weight: 1,
        category: "anhedonia",
      },
      {
        id: "1-2",
        text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
        type: "SCALE",
        scale: {
          min: 0,
          max: 3,
          labels: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
        weight: 1,
        category: "mood",
      },
      {
        id: "1-3",
        text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
        type: "SCALE",
        scale: {
          min: 0,
          max: 3,
          labels: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
        weight: 1,
        category: "sleep",
      },
    ],
    isCompleted: false,
    maxScore: 27,
    culturalContext: "Nigerian",
    languages: ["English", "Yoruba", "Hausa", "Igbo"],
    recommended: true,
    category: "depression",
    instructions:
      "This assessment helps identify symptoms of depression. Answer each question based on how you've been feeling over the past 2 weeks. Be honest with yourself - this information helps provide better support.",
    interpretation: {
      low: {
        range: [0, 4],
        description: "Minimal depression symptoms. You're doing well!",
        recommendations: [
          "Continue your current healthy habits",
          "Stay connected with family and friends",
          "Maintain regular sleep and exercise routines",
        ],
        severity: "LOW",
      },
      moderate: {
        range: [5, 9],
        description: "Mild depression symptoms. Consider talking to someone.",
        recommendations: [
          "Consider speaking with a trusted friend or family member",
          "Practice stress-reduction techniques like prayer or meditation",
          "Maintain regular daily routines",
        ],
        severity: "MODERATE",
      },
      high: {
        range: [10, 14],
        description:
          "Moderate depression symptoms. Professional help may be beneficial.",
        recommendations: [
          "Consider speaking with a mental health professional",
          "Talk to your religious leader or traditional healer",
          "Increase social support and community connections",
        ],
        severity: "HIGH",
      },
      severe: {
        range: [15, 27],
        description:
          "Severe depression symptoms. Professional help is recommended.",
        recommendations: [
          "Seek professional mental health support immediately",
          "Contact emergency mental health services if needed",
          "Stay connected with trusted family members",
        ],
        severity: "SEVERE",
      },
    },
  },
  {
    id: "2",
    title: "Anxiety Assessment (GAD-7) - Cultural Adaptation",
    description:
      "Generalized Anxiety Disorder screening adapted for Nigerian cultural expressions of anxiety and worry.",
    type: "MENTAL_HEALTH",
    duration: 5,
    questions: [
      {
        id: "2-1",
        text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
        type: "SCALE",
        scale: {
          min: 0,
          max: 3,
          labels: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
        weight: 1,
        category: "anxiety",
      },
      {
        id: "2-2",
        text: "Over the last 2 weeks, how often have you had trouble relaxing?",
        type: "SCALE",
        scale: {
          min: 0,
          max: 3,
          labels: [
            "Not at all",
            "Several days",
            "More than half the days",
            "Nearly every day",
          ],
        },
        weight: 1,
        category: "relaxation",
      },
    ],
    isCompleted: true,
    lastTaken: "2024-01-15",
    score: 12,
    maxScore: 21,
    culturalContext: "Nigerian",
    languages: ["English", "French"],
    recommended: true,
    category: "anxiety",
    instructions:
      "This assessment helps identify symptoms of anxiety. Consider how you've been feeling over the past 2 weeks.",
    interpretation: {
      low: {
        range: [0, 4],
        description: "Minimal anxiety symptoms.",
        recommendations: ["Continue healthy coping strategies"],
        severity: "LOW",
      },
      moderate: {
        range: [5, 9],
        description: "Mild anxiety symptoms.",
        recommendations: ["Consider stress management techniques"],
        severity: "MODERATE",
      },
      high: {
        range: [10, 14],
        description: "Moderate anxiety symptoms.",
        recommendations: ["Consider professional support"],
        severity: "HIGH",
      },
      severe: {
        range: [15, 21],
        description: "Severe anxiety symptoms.",
        recommendations: ["Seek professional help"],
        severity: "SEVERE",
      },
    },
  },
  {
    id: "3",
    title: "Cultural Identity Assessment",
    description:
      "Explore your cultural background, values, and how they influence your mental health and well-being.",
    type: "CULTURAL",
    duration: 10,
    questions: [
      {
        id: "3-1",
        text: "How connected do you feel to your cultural heritage?",
        type: "SCALE",
        scale: {
          min: 1,
          max: 5,
          labels: [
            "Not connected",
            "Somewhat connected",
            "Moderately connected",
            "Very connected",
            "Extremely connected",
          ],
        },
        weight: 1,
        category: "cultural_connection",
      },
      {
        id: "3-2",
        text: "How often do you practice traditional cultural activities?",
        type: "SCALE",
        scale: {
          min: 1,
          max: 5,
          labels: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
        },
        weight: 1,
        category: "cultural_practice",
      },
    ],
    isCompleted: false,
    maxScore: 60,
    culturalContext: "Nigerian",
    languages: ["English", "Yoruba", "Igbo", "Hausa"],
    recommended: false,
    category: "cultural",
    instructions:
      "This assessment helps understand your cultural identity and its impact on your mental health.",
    interpretation: {
      low: {
        range: [0, 20],
        description: "Limited cultural connection.",
        recommendations: [
          "Explore your cultural heritage",
          "Connect with cultural community",
        ],
        severity: "LOW",
      },
      moderate: {
        range: [21, 40],
        description: "Moderate cultural connection.",
        recommendations: [
          "Strengthen cultural practices",
          "Share cultural knowledge",
        ],
        severity: "MODERATE",
      },
      high: {
        range: [41, 60],
        description: "Strong cultural connection.",
        recommendations: [
          "Maintain cultural practices",
          "Share wisdom with others",
        ],
        severity: "HIGH",
      },
      severe: {
        range: [0, 0],
        description: "Not applicable",
        recommendations: [],
        severity: "LOW",
      },
    },
  },
  {
    id: "4",
    title: "Digital Wellness Check",
    description:
      "Assess your relationship with technology and digital habits in the context of Nigerian family and social values.",
    type: "WELLNESS",
    duration: 8,
    questions: [
      {
        id: "4-1",
        text: "How much time do you spend on social media daily?",
        type: "SCALE",
        scale: {
          min: 1,
          max: 5,
          labels: [
            "Less than 1 hour",
            "1-2 hours",
            "2-4 hours",
            "4-6 hours",
            "More than 6 hours",
          ],
        },
        weight: 1,
        category: "social_media",
      },
      {
        id: "4-2",
        text: "How often do you feel anxious when you can't check your phone?",
        type: "SCALE",
        scale: {
          min: 1,
          max: 5,
          labels: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
        },
        weight: 1,
        category: "phone_anxiety",
      },
    ],
    isCompleted: true,
    lastTaken: "2024-01-10",
    score: 8,
    maxScore: 48,
    culturalContext: "Global",
    languages: ["English"],
    recommended: false,
    category: "digital_wellness",
    instructions:
      "This assessment helps understand your digital habits and their impact on your well-being.",
    interpretation: {
      low: {
        range: [0, 16],
        description: "Healthy digital habits.",
        recommendations: ["Continue balanced digital usage"],
        severity: "LOW",
      },
      moderate: {
        range: [17, 32],
        description: "Moderate digital usage.",
        recommendations: ["Consider digital boundaries"],
        severity: "MODERATE",
      },
      high: {
        range: [33, 48],
        description: "High digital dependency.",
        recommendations: [
          "Set digital boundaries",
          "Increase offline activities",
        ],
        severity: "HIGH",
      },
      severe: {
        range: [0, 0],
        description: "Not applicable",
        recommendations: [],
        severity: "LOW",
      },
    },
  },
];

export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessments.find((assessment) => assessment.id === id);
};

export const getAssessmentsByType = (type: string): Assessment[] => {
  if (type === "all") return assessments;
  return assessments.filter((assessment) => assessment.type === type);
};

export const getRecommendedAssessments = (
  userProfile: UserProfile
): Assessment[] => {
  // AI-based recommendation logic
  const recommendations = assessments.filter((assessment) => {
    // Filter by user's cultural context
    if (
      userProfile.culturalContext &&
      assessment.culturalContext.includes(userProfile.culturalContext)
    ) {
      return true;
    }

    // Filter by user's language preference
    if (
      userProfile.language &&
      assessment.languages.includes(userProfile.language)
    ) {
      return true;
    }

    // Filter by user's specific needs
    if (
      userProfile.issues &&
      userProfile.issues.some((issue) => assessment.category.includes(issue))
    ) {
      return true;
    }

    return false;
  });

  return recommendations.slice(0, 3); // Return top 3 recommendations
};
