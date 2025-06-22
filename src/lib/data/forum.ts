export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: "MEMBER" | "MODERATOR" | "PROFESSIONAL" | "TRADITIONAL_HEALER";
  };
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isLocked: boolean;
  culturalContext: string;
  language: string;
  repliesList: ForumReply[];
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: "MEMBER" | "MODERATOR" | "PROFESSIONAL" | "TRADITIONAL_HEALER";
  };
  likes: number;
  createdAt: string;
  isAccepted: boolean;
  isProfessional: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  lastPost?: {
    title: string;
    author: string;
    date: string;
  };
}

export const forumCategories: ForumCategory[] = [
  {
    id: "general",
    name: "General Discussion",
    description: "General mental health discussions and community support",
    icon: "💬",
    postCount: 156,
    lastPost: {
      title: "How to support family members with mental health challenges",
      author: "Aisha",
      date: "2024-01-20",
    },
  },
  {
    id: "traditional-healing",
    name: "Traditional Healing",
    description:
      "Discussions about traditional African healing practices and spirituality",
    icon: "🌿",
    postCount: 89,
    lastPost: {
      title: "Integrating traditional practices with modern therapy",
      author: "Baba Adewale",
      date: "2024-01-19",
    },
  },
  {
    id: "youth-mental-health",
    name: "Youth Mental Health",
    description:
      "Mental health challenges specific to Nigerian youth and young adults",
    icon: "👥",
    postCount: 234,
    lastPost: {
      title: "Social media pressure and self-esteem",
      author: "Chioma",
      date: "2024-01-18",
    },
  },
  {
    id: "family-relationships",
    name: "Family & Relationships",
    description: "Family dynamics, relationships, and cultural expectations",
    icon: "👨‍👩‍👧‍👦",
    postCount: 178,
    lastPost: {
      title: "Balancing family expectations with personal goals",
      author: "Fatima",
      date: "2024-01-17",
    },
  },
  {
    id: "professional-stress",
    name: "Work & Professional Stress",
    description:
      "Workplace stress, career challenges, and professional development",
    icon: "💼",
    postCount: 112,
    lastPost: {
      title: "Managing stress in Nigerian corporate environment",
      author: "Dr. Hassan",
      date: "2024-01-16",
    },
  },
  {
    id: "crisis-support",
    name: "Crisis Support",
    description: "Emergency support and crisis intervention discussions",
    icon: "🆘",
    postCount: 45,
    lastPost: {
      title: "How to help someone in crisis",
      author: "Dr. Johnson",
      date: "2024-01-15",
    },
  },
];

export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to support family members with mental health challenges",
    content:
      "I'm struggling to support my younger sister who has been showing signs of depression. In our Nigerian family, mental health is often not discussed openly. How can I help her while respecting our cultural values and family dynamics? I want to be supportive without making her feel like there's something wrong with her.",
    author: {
      id: "user1",
      name: "Aisha",
      role: "MEMBER",
    },
    category: "general",
    tags: ["family", "depression", "cultural", "support"],
    likes: 23,
    replies: 8,
    views: 156,
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    isPinned: false,
    isLocked: false,
    culturalContext: "Nigerian Family",
    language: "English",
    repliesList: [
      {
        id: "reply1",
        content:
          "This is a very important question. In Nigerian families, we often avoid discussing mental health due to stigma. Start by creating a safe space for open conversation. Maybe during a quiet moment, ask her how she's really feeling. Let her know you're there to listen without judgment.",
        author: {
          id: "user2",
          name: "Dr. Aisha Bello",
          role: "PROFESSIONAL",
        },
        likes: 15,
        createdAt: "2024-01-20T11:00:00Z",
        isAccepted: true,
        isProfessional: true,
      },
      {
        id: "reply2",
        content:
          "I went through something similar with my brother. What helped was involving our parents gradually. I first talked to them about mental health in general terms, then mentioned that many young people struggle. This made it easier when I finally told them about my brother's situation.",
        author: {
          id: "user3",
          name: "Chioma",
          role: "MEMBER",
        },
        likes: 8,
        createdAt: "2024-01-20T12:15:00Z",
        isAccepted: false,
        isProfessional: false,
      },
    ],
  },
  {
    id: "2",
    title: "Integrating traditional practices with modern therapy",
    content:
      "I'm a traditional healer who has been working with mental health for over 20 years. I've noticed that many people benefit from combining traditional spiritual practices with modern therapy approaches. How can we create more collaboration between traditional healers and mental health professionals?",
    author: {
      id: "user4",
      name: "Baba Adewale",
      role: "TRADITIONAL_HEALER",
    },
    category: "traditional-healing",
    tags: [
      "traditional healing",
      "integration",
      "spirituality",
      "collaboration",
    ],
    likes: 34,
    replies: 12,
    views: 289,
    createdAt: "2024-01-19T14:20:00Z",
    updatedAt: "2024-01-19T14:20:00Z",
    isPinned: true,
    isLocked: false,
    culturalContext: "Yoruba Tradition",
    language: "English",
    repliesList: [
      {
        id: "reply3",
        content:
          "This is exactly the kind of collaboration we need! Traditional healers often have deep cultural understanding that modern therapists lack. I'd love to discuss how we can work together. Maybe we could organize workshops where both traditional healers and mental health professionals can share knowledge.",
        author: {
          id: "user5",
          name: "Dr. Fatima Hassan",
          role: "PROFESSIONAL",
        },
        likes: 22,
        createdAt: "2024-01-19T15:30:00Z",
        isAccepted: true,
        isProfessional: true,
      },
    ],
  },
  {
    id: "3",
    title: "Social media pressure and self-esteem",
    content:
      "As a young Nigerian woman, I feel constant pressure from social media to look and act a certain way. Everyone seems to have perfect lives online, and it's affecting my self-esteem. How do you deal with this while staying true to your cultural values?",
    author: {
      id: "user6",
      name: "Chioma",
      role: "MEMBER",
    },
    category: "youth-mental-health",
    tags: ["social media", "self-esteem", "youth", "cultural values"],
    likes: 45,
    replies: 15,
    views: 423,
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
    isPinned: false,
    isLocked: false,
    culturalContext: "Nigerian Youth",
    language: "English",
    repliesList: [
      {
        id: "reply4",
        content:
          "This is such a real struggle! Remember that social media is a highlight reel, not real life. I found it helpful to follow accounts that celebrate Nigerian culture and beauty standards. Also, try limiting your social media time and focus on real connections with family and friends.",
        author: {
          id: "user7",
          name: "Kemi",
          role: "MEMBER",
        },
        likes: 18,
        createdAt: "2024-01-18T10:00:00Z",
        isAccepted: false,
        isProfessional: false,
      },
    ],
  },
  {
    id: "4",
    title: "Managing stress in Nigerian corporate environment",
    content:
      "Working in a Nigerian corporate environment can be incredibly stressful - long hours, high expectations, and often toxic work cultures. How do you maintain mental health while advancing your career? I'm particularly interested in strategies that work within our cultural context.",
    author: {
      id: "user8",
      name: "Dr. Hassan",
      role: "PROFESSIONAL",
    },
    category: "professional-stress",
    tags: ["workplace stress", "corporate", "career", "cultural context"],
    likes: 67,
    replies: 23,
    views: 567,
    createdAt: "2024-01-16T16:45:00Z",
    updatedAt: "2024-01-16T16:45:00Z",
    isPinned: false,
    isLocked: false,
    culturalContext: "Nigerian Professional",
    language: "English",
    repliesList: [
      {
        id: "reply5",
        content:
          "Great question! I've found that setting clear boundaries is crucial. In Nigerian workplaces, there's often pressure to always be available, but your mental health comes first. Try to establish work-life balance and don't feel guilty about taking breaks. Also, build a support network of colleagues who understand the challenges.",
        author: {
          id: "user9",
          name: "Adebayo",
          role: "MEMBER",
        },
        likes: 25,
        createdAt: "2024-01-16T17:30:00Z",
        isAccepted: false,
        isProfessional: false,
      },
    ],
  },
];

export const getPostsByCategory = (category: string): ForumPost[] => {
  if (category === "all") return forumPosts;
  return forumPosts.filter((post) => post.category === category);
};

export const getPostById = (id: string): ForumPost | undefined => {
  return forumPosts.find((post) => post.id === id);
};

export interface UserProfile {
  culturalContext?: string;
  language?: string;
  interests?: string[];
}

export const getRecommendedPosts = (userProfile: UserProfile): ForumPost[] => {
  // AI-based recommendation logic
  const recommendations = forumPosts.filter((post) => {
    // Filter by user's cultural context
    if (
      userProfile.culturalContext &&
      post.culturalContext.includes(userProfile.culturalContext)
    ) {
      return true;
    }
    // Filter by user's language preference
    if (userProfile.language && post.language === userProfile.language) {
      return true;
    }
    // Filter by user's interests/tags
    if (
      userProfile.interests &&
      Array.isArray(userProfile.interests) &&
      userProfile.interests.length > 0 &&
      post.tags.some((tag) => userProfile.interests!.includes(tag))
    ) {
      return true;
    }
    return false;
  });
  return recommendations.slice(0, 5); // Return top 5 recommendations
};
