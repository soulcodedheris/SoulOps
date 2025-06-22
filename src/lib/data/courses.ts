export interface Course {
  id: string;
  title: string;
  description: string;
  category: "BASIC" | "INTERMEDIATE" | "ADVANCED";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number; // in minutes
  lessons: number;
  rating: number;
  enrolled: number;
  thumbnail: string;
  isCompleted: boolean;
  progress: number; // 0-100
  culturalContext: string;
  languages: string[];
  tags: string[];
  instructor: string;
  price: number; // 0 for free
  certificate: boolean;
  content: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  type: "VIDEO" | "TEXT" | "QUIZ" | "INTERACTIVE";
  content: string;
  resources?: string[];
}

export interface UserProfile {
  culturalContext?: string;
  language?: string;
  interests?: string[];
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Understanding Mental Health in Nigerian Context",
    description:
      "Learn about mental health challenges specific to Nigerian communities, including cultural stigma, traditional beliefs, and modern approaches to wellness.",
    category: "BASIC",
    difficulty: "BEGINNER",
    duration: 45,
    lessons: 6,
    rating: 4.8,
    enrolled: 1247,
    thumbnail: "/api/placeholder/300/200",
    isCompleted: false,
    progress: 0,
    culturalContext: "Nigerian",
    languages: ["English", "Yoruba", "Hausa", "Igbo"],
    tags: ["mental health", "culture", "stigma", "awareness"],
    instructor: "Dr. Aisha Bello",
    price: 0,
    certificate: true,
    content: [
      {
        id: "1-1",
        title: "Introduction to Mental Health in Nigeria",
        duration: 8,
        type: "VIDEO",
        content:
          "Understanding the unique challenges of mental health in Nigerian society, including cultural perspectives and modern approaches.",
      },
      {
        id: "1-2",
        title: "Cultural Stigma and Breaking Barriers",
        duration: 10,
        type: "TEXT",
        content:
          "Explore how cultural beliefs affect mental health perception and learn strategies to overcome stigma in your community.",
      },
      {
        id: "1-3",
        title: "Traditional vs Modern Approaches",
        duration: 12,
        type: "INTERACTIVE",
        content:
          "Compare traditional healing practices with modern mental health approaches and learn how to integrate both effectively.",
      },
    ],
  },
  {
    id: "2",
    title: "Digital Wellness for Nigerian Youth",
    description:
      "Navigate social media, technology, and digital spaces while maintaining mental health and cultural values.",
    category: "INTERMEDIATE",
    difficulty: "INTERMEDIATE",
    duration: 60,
    lessons: 8,
    rating: 4.6,
    enrolled: 892,
    thumbnail: "/api/placeholder/300/200",
    isCompleted: false,
    progress: 25,
    culturalContext: "Nigerian Youth",
    languages: ["English", "Pidgin", "Yoruba"],
    tags: ["digital wellness", "social media", "youth", "technology"],
    instructor: "Chioma Okonkwo",
    price: 0,
    certificate: true,
    content: [
      {
        id: "2-1",
        title: "Social Media and Mental Health",
        duration: 15,
        type: "VIDEO",
        content:
          "How social media affects Nigerian youth and strategies for healthy usage.",
      },
      {
        id: "2-2",
        title: "Balancing Online and Offline Life",
        duration: 12,
        type: "INTERACTIVE",
        content:
          "Practical exercises to maintain balance between digital and real-world connections.",
      },
    ],
  },
  {
    id: "3",
    title: "Traditional Healing and Modern Therapy",
    description:
      "Integrate traditional African healing practices with contemporary mental health approaches for holistic wellness.",
    category: "ADVANCED",
    difficulty: "ADVANCED",
    duration: 90,
    lessons: 12,
    rating: 4.7,
    enrolled: 456,
    thumbnail: "/api/placeholder/300/200",
    isCompleted: false,
    progress: 0,
    culturalContext: "African Traditional",
    languages: ["English", "Yoruba", "Hausa", "Igbo"],
    tags: ["traditional healing", "holistic", "integration", "spirituality"],
    instructor: "Baba Adewale",
    price: 5000,
    certificate: true,
    content: [
      {
        id: "3-1",
        title: "Understanding Traditional Healing",
        duration: 20,
        type: "VIDEO",
        content:
          "Deep dive into traditional African healing practices and their mental health benefits.",
      },
      {
        id: "3-2",
        title: "Integration Strategies",
        duration: 25,
        type: "INTERACTIVE",
        content:
          "How to combine traditional practices with modern therapy approaches.",
      },
    ],
  },
  {
    id: "4",
    title: "Stress Management for Nigerian Professionals",
    description:
      "Practical stress management techniques tailored for Nigerian workplace culture and family responsibilities.",
    category: "INTERMEDIATE",
    difficulty: "INTERMEDIATE",
    duration: 75,
    lessons: 10,
    rating: 4.5,
    enrolled: 1103,
    thumbnail: "/api/placeholder/300/200",
    isCompleted: false,
    progress: 60,
    culturalContext: "Nigerian Professional",
    languages: ["English", "Hausa", "Yoruba"],
    tags: ["stress management", "workplace", "family", "professional"],
    instructor: "Dr. Fatima Hassan",
    price: 0,
    certificate: true,
    content: [
      {
        id: "4-1",
        title: "Workplace Stress in Nigerian Context",
        duration: 15,
        type: "VIDEO",
        content:
          "Understanding unique workplace stressors in Nigerian professional environments.",
      },
      {
        id: "4-2",
        title: "Family and Work Balance",
        duration: 18,
        type: "TEXT",
        content:
          "Managing family expectations and professional responsibilities in Nigerian culture.",
      },
    ],
  },
  {
    id: "5",
    title: "Mental Health First Aid",
    description:
      "Learn to recognize and respond to mental health crises in your community with culturally appropriate approaches.",
    category: "BASIC",
    difficulty: "BEGINNER",
    duration: 120,
    lessons: 15,
    rating: 4.9,
    enrolled: 2156,
    thumbnail: "/api/placeholder/300/200",
    isCompleted: true,
    progress: 100,
    culturalContext: "Community",
    languages: ["English", "Pidgin", "Hausa", "Yoruba", "Igbo"],
    tags: ["first aid", "crisis", "community", "support"],
    instructor: "Dr. Sarah Johnson",
    price: 0,
    certificate: true,
    content: [
      {
        id: "5-1",
        title: "Recognizing Mental Health Crises",
        duration: 20,
        type: "VIDEO",
        content:
          "How to identify mental health emergencies in Nigerian communities.",
      },
      {
        id: "5-2",
        title: "Culturally Appropriate Responses",
        duration: 25,
        type: "INTERACTIVE",
        content:
          "Responding to mental health crises while respecting cultural beliefs and practices.",
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === "all") return courses;
  return courses.filter((course) => course.category === category);
};

export const getRecommendedCourses = (userProfile: UserProfile): Course[] => {
  // AI-based recommendation logic
  const recommendations = courses.filter((course) => {
    // Filter by user's cultural context
    if (
      userProfile.culturalContext &&
      course.culturalContext.includes(userProfile.culturalContext)
    ) {
      return true;
    }

    // Filter by user's language preference
    if (
      userProfile.language &&
      course.languages.includes(userProfile.language)
    ) {
      return true;
    }

    // Filter by user's interests/tags
    if (
      userProfile.interests &&
      Array.isArray(userProfile.interests) &&
      userProfile.interests.length > 0 &&
      course.tags.some((tag) => userProfile.interests!.includes(tag))
    ) {
      return true;
    }

    return false;
  });

  return recommendations.slice(0, 3); // Return top 3 recommendations
};
