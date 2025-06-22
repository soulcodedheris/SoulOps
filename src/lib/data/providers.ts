export interface Provider {
  id: string;
  name: string;
  specialization: string;
  languages: string[];
  culturalContext: string;
  rating: number;
  reviews: number;
  availability: string;
  consultationType: "PROFESSIONAL" | "TRADITIONAL";
  focusAreas: string[];
  experience: string;
  location: string;
  education?: string;
  certifications?: string[];
  bio: string;
  consultationFee: number;
  consultationTypes: ("IN_PERSON" | "VIDEO" | "AUDIO")[];
  specialties: string[];
  culturalApproach: string;
  photo?: string;
}

export interface UserProfile {
  culturalContext?: string;
  language?: string;
  issues?: string[];
  budget?: number;
}

export const providers: Provider[] = [
  {
    id: "1",
    name: "Dr. Aisha Bello",
    specialization: "Clinical Psychologist",
    languages: ["English", "Hausa", "Yoruba"],
    culturalContext: "Northern Nigeria",
    rating: 4.8,
    reviews: 127,
    availability: "Mon-Fri, 9AM-5PM",
    consultationType: "PROFESSIONAL",
    focusAreas: [
      "Anxiety",
      "Depression",
      "Trauma",
      "Cultural Identity",
      "Family Therapy",
    ],
    experience: "15+ years",
    location: "Lagos, Nigeria",
    education: "PhD Clinical Psychology, University of Lagos",
    certifications: [
      "Licensed Clinical Psychologist",
      "Trauma-Informed Care",
      "Cultural Competency",
    ],
    bio: "Dr. Aisha Bello is a licensed clinical psychologist with over 15 years of experience working with Nigerian communities. She specializes in trauma-informed care and cultural identity issues, helping clients navigate the intersection of traditional values and modern mental health approaches.",
    consultationFee: 15000,
    consultationTypes: ["IN_PERSON", "VIDEO", "AUDIO"],
    specialties: [
      "Trauma Therapy",
      "Cultural Identity",
      "Family Counseling",
      "Anxiety Disorders",
    ],
    culturalApproach:
      "Integrates Islamic values with evidence-based therapy approaches",
  },
  {
    id: "2",
    name: "Baba Adewale",
    specialization: "Traditional Healer & Spiritual Counselor",
    languages: ["Yoruba", "English"],
    culturalContext: "Yoruba Tradition",
    rating: 4.9,
    reviews: 89,
    availability: "Daily, 8AM-8PM",
    consultationType: "TRADITIONAL",
    focusAreas: [
      "Spiritual Healing",
      "Ancestral Guidance",
      "Cultural Practices",
      "Life Purpose",
    ],
    experience: "30+ years",
    location: "Ibadan, Nigeria",
    bio: "Baba Adewale is a respected traditional healer with deep knowledge of Yoruba spiritual practices and ancestral wisdom. He helps clients connect with their cultural roots and find spiritual balance in modern life.",
    consultationFee: 8000,
    consultationTypes: ["IN_PERSON", "AUDIO"],
    specialties: [
      "Spiritual Counseling",
      "Ancestral Connection",
      "Cultural Healing",
      "Life Purpose",
    ],
    culturalApproach:
      "Traditional Yoruba spiritual practices and ancestral wisdom",
  },
  {
    id: "3",
    name: "Dr. Fatima Hassan",
    specialization: "Psychiatrist",
    languages: ["English", "Arabic", "Hausa"],
    culturalContext: "Islamic Tradition",
    rating: 4.7,
    reviews: 156,
    availability: "Mon-Sat, 10AM-6PM",
    consultationType: "PROFESSIONAL",
    focusAreas: [
      "Mood Disorders",
      "Addiction",
      "Family Therapy",
      "Religious Counseling",
    ],
    experience: "12+ years",
    location: "Kano, Nigeria",
    education: "MBBS, Psychiatry Residency, Ahmadu Bello University",
    certifications: [
      "Board Certified Psychiatrist",
      "Addiction Medicine",
      "Islamic Counseling",
    ],
    bio: "Dr. Fatima Hassan is a board-certified psychiatrist who combines modern psychiatric treatment with Islamic counseling principles. She specializes in treating mood disorders and addiction while respecting religious and cultural values.",
    consultationFee: 20000,
    consultationTypes: ["IN_PERSON", "VIDEO"],
    specialties: [
      "Mood Disorders",
      "Addiction Treatment",
      "Islamic Counseling",
      "Family Psychiatry",
    ],
    culturalApproach:
      "Integrates Islamic principles with evidence-based psychiatric treatment",
  },
  {
    id: "4",
    name: "Chioma Okonkwo",
    specialization: "Licensed Professional Counselor",
    languages: ["English", "Igbo", "Pidgin"],
    culturalContext: "Igbo Culture",
    rating: 4.6,
    reviews: 94,
    availability: "Mon-Fri, 8AM-6PM",
    consultationType: "PROFESSIONAL",
    focusAreas: [
      "Youth Counseling",
      "Digital Wellness",
      "Career Guidance",
      "Relationship Issues",
    ],
    experience: "8+ years",
    location: "Enugu, Nigeria",
    education: "MSc Counseling Psychology, University of Nigeria",
    certifications: [
      "Licensed Professional Counselor",
      "Youth Mental Health",
      "Digital Wellness",
    ],
    bio: "Chioma specializes in youth mental health and digital wellness, helping young Nigerians navigate the challenges of modern life while maintaining cultural values. She's passionate about making mental health accessible to young people.",
    consultationFee: 12000,
    consultationTypes: ["IN_PERSON", "VIDEO", "AUDIO"],
    specialties: [
      "Youth Counseling",
      "Digital Wellness",
      "Career Guidance",
      "Relationship Therapy",
    ],
    culturalApproach:
      "Modern counseling approaches with Igbo cultural values and youth-friendly methods",
  },
  {
    id: "5",
    name: "Mama Zainab",
    specialization: "Traditional Birth Attendant & Women's Counselor",
    languages: ["Hausa", "English", "Arabic"],
    culturalContext: "Hausa Tradition",
    rating: 4.8,
    reviews: 67,
    availability: "Daily, 7AM-7PM",
    consultationType: "TRADITIONAL",
    focusAreas: [
      "Women's Health",
      "Pregnancy Support",
      "Postpartum Care",
      "Family Planning",
    ],
    experience: "25+ years",
    location: "Kaduna, Nigeria",
    bio: "Mama Zainab is a respected traditional birth attendant and women's counselor who combines traditional wisdom with modern health practices. She provides culturally sensitive support for women's mental and physical health.",
    consultationFee: 6000,
    consultationTypes: ["IN_PERSON", "AUDIO"],
    specialties: [
      "Women's Health",
      "Pregnancy Support",
      "Postpartum Care",
      "Family Counseling",
    ],
    culturalApproach:
      "Traditional Hausa women's wisdom with modern health awareness",
  },
  {
    id: "6",
    name: "Dr. Kemi Adebayo",
    specialization: "Child & Adolescent Psychologist",
    languages: ["English", "Yoruba", "Pidgin"],
    culturalContext: "Nigerian Family",
    rating: 4.9,
    reviews: 112,
    availability: "Mon-Fri, 9AM-5PM",
    consultationType: "PROFESSIONAL",
    focusAreas: [
      "Child Development",
      "Learning Disabilities",
      "Behavioral Issues",
      "Family Therapy",
    ],
    experience: "10+ years",
    location: "Abuja, Nigeria",
    education: "PhD Child Psychology, University of Ibadan",
    certifications: [
      "Child & Adolescent Psychology",
      "Learning Disabilities",
      "Family Therapy",
    ],
    bio: "Dr. Kemi specializes in child and adolescent psychology, helping families navigate the challenges of raising children in modern Nigeria while preserving cultural values and traditions.",
    consultationFee: 18000,
    consultationTypes: ["IN_PERSON", "VIDEO"],
    specialties: [
      "Child Psychology",
      "Adolescent Counseling",
      "Family Therapy",
      "Learning Disabilities",
    ],
    culturalApproach:
      "Evidence-based child psychology with Nigerian family values and cultural sensitivity",
  },
];

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find((provider) => provider.id === id);
};

export const getProvidersByType = (
  type: "PROFESSIONAL" | "TRADITIONAL"
): Provider[] => {
  return providers.filter((provider) => provider.consultationType === type);
};

export const getProvidersByLocation = (location: string): Provider[] => {
  return providers.filter((provider) =>
    provider.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getRecommendedProviders = (
  userProfile: UserProfile
): Provider[] => {
  // AI-based recommendation logic
  const recommendations = providers.filter((provider) => {
    // Filter by user's cultural context
    if (
      userProfile.culturalContext &&
      provider.culturalContext.includes(userProfile.culturalContext)
    ) {
      return true;
    }

    // Filter by user's language preference
    if (
      userProfile.language &&
      provider.languages.includes(userProfile.language)
    ) {
      return true;
    }

    // Filter by user's specific needs
    if (
      userProfile.issues &&
      Array.isArray(userProfile.issues) &&
      userProfile.issues.length > 0 &&
      provider.focusAreas.some((area) => userProfile.issues!.includes(area))
    ) {
      return true;
    }

    // Filter by budget
    if (userProfile.budget && provider.consultationFee <= userProfile.budget) {
      return true;
    }

    return false;
  });

  // Sort by rating and return top recommendations
  return recommendations.sort((a, b) => b.rating - a.rating).slice(0, 3);
};
