"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Users,
  MessageCircle,
  Heart,
  Shield,
  Globe,
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowLeft,
  Video,
  Phone,
  BookOpen,
  Prayer,
} from "lucide-react";
import Link from "next/link";

const supportGroups = [
  {
    id: 1,
    name: "Yoruba Women's Wellness Circle",
    description:
      "Traditional healing practices and modern mental health support for Yoruba women",
    language: "Yoruba",
    schedule: "Every Tuesday, 6:00 PM",
    participants: 24,
    type: "Cultural",
    facilitator: "Iya Abike (Traditional Healer)",
    topics: ["Traditional healing", "Family dynamics", "Cultural identity"],
  },
  {
    id: 2,
    name: "Igbo Men's Support Group",
    description:
      "Supporting Igbo men through cultural challenges and mental health awareness",
    language: "Igbo",
    schedule: "Every Thursday, 7:00 PM",
    participants: 18,
    type: "Peer Support",
    facilitator: "Dr. Chukwudi Okonkwo",
    topics: ["Masculinity", "Career stress", "Cultural expectations"],
  },
  {
    id: 3,
    name: "Hausa Youth Empowerment",
    description:
      "Empowering Hausa youth with digital literacy and mental health skills",
    language: "Hausa",
    schedule: "Every Saturday, 4:00 PM",
    participants: 32,
    type: "Educational",
    facilitator: "Hajiya Fatima",
    topics: ["Digital skills", "Mental health awareness", "Career guidance"],
  },
  {
    id: 4,
    name: "Mixed Heritage Support",
    description: "Supporting individuals with multiple cultural backgrounds",
    language: "English",
    schedule: "Every Sunday, 5:00 PM",
    participants: 15,
    type: "Cultural",
    facilitator: "Dr. Sarah Johnson",
    topics: ["Identity", "Cultural integration", "Family relationships"],
  },
];

const traditionalHealers = [
  {
    id: 1,
    name: "Baba Adewale",
    specialization: "Yoruba Traditional Medicine",
    experience: "25+ years",
    languages: ["Yoruba", "English"],
    rating: 4.8,
    availability: "Mon-Fri, 9AM-6PM",
    consultation: "In-person & Video",
    focus: ["Spiritual healing", "Anxiety", "Family issues"],
  },
  {
    id: 2,
    name: "Mama Chioma",
    specialization: "Igbo Herbal Medicine",
    experience: "30+ years",
    languages: ["Igbo", "English"],
    rating: 4.9,
    availability: "Tue-Sat, 10AM-7PM",
    consultation: "In-person & Phone",
    focus: ["Depression", "Stress", "Traditional wisdom"],
  },
  {
    id: 3,
    name: "Alhaji Ibrahim",
    specialization: "Islamic Healing & Counseling",
    experience: "20+ years",
    languages: ["Hausa", "Arabic", "English"],
    rating: 4.7,
    availability: "Sun-Thu, 8AM-5PM",
    consultation: "In-person & Video",
    focus: ["Spiritual guidance", "Mental peace", "Community support"],
  },
];

const communityResources = [
  {
    title: "Cultural Wellness Practices",
    description: "Traditional practices adapted for modern mental health",
    icon: Prayer,
    color: "bg-cultural-sun text-white",
  },
  {
    title: "Digital Literacy Training",
    description: "Learn essential digital skills for mental health support",
    icon: BookOpen,
    color: "bg-mental-calm text-white",
  },
  {
    title: "Peer Support Network",
    description: "Connect with others who understand your cultural context",
    icon: Users,
    color: "bg-mental-balanced text-white",
  },
  {
    title: "Crisis Support",
    description: "24/7 culturally-relevant crisis intervention",
    icon: Heart,
    color: "bg-mental-peaceful text-white",
  },
];

export default function CommunityPage() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedHealer, setSelectedHealer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("groups");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-mental-balanced to-mental-peaceful rounded-full">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Community Support
                </h1>
                <p className="text-sm text-gray-600">
                  Connect, share, and grow together
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
            {[
              { id: "groups", label: "Support Groups", icon: Users },
              { id: "healers", label: "Traditional Healers", icon: Heart },
              { id: "resources", label: "Resources", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Support Groups Tab */}
        {activeTab === "groups" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cultural Support Groups
              </h2>
              <p className="text-gray-600">
                Join groups that understand your cultural context and
                experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: group.id * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {group.description}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        group.type === "Cultural"
                          ? "bg-cultural-sun/20 text-cultural-sun"
                          : group.type === "Peer Support"
                          ? "bg-mental-calm/20 text-mental-calm"
                          : "bg-mental-balanced/20 text-mental-balanced"
                      }`}
                    >
                      {group.type}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      {group.language}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {group.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {group.participants} participants
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      {group.facilitator}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Topics:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {group.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full btn-primary">Join Group</Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Traditional Healers Tab */}
        {activeTab === "healers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Traditional Healers
              </h2>
              <p className="text-gray-600">
                Connect with culturally-rooted healing practitioners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {traditionalHealers.map((healer) => (
                <motion.div
                  key={healer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: healer.id * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cultural-earth to-cultural-fire rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {healer.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {healer.specialization}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{healer.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">
                          {healer.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Languages:</span>
                      <span className="font-medium">
                        {healer.languages.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Focus Areas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {healer.focus.map((area) => (
                        <span
                          key={area}
                          className="px-2 py-1 bg-cultural-sun/20 text-xs rounded-full text-cultural-sun"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full btn-primary">
                      <Video className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Community Resources
              </h2>
              <p className="text-gray-600">
                Access tools and support for your mental health journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 ${resource.color} rounded-lg`}
                    >
                      <resource.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {resource.description}
                      </p>
                      <Button variant="outline" size="sm">
                        Access Resource
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Community Features */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Community Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Safe Space
                  </h4>
                  <p className="text-sm text-gray-600">
                    Respectful, confidential, and supportive environment
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Cultural Respect
                  </h4>
                  <p className="text-sm text-gray-600">
                    Honoring diverse cultural backgrounds and traditions
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Peer Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Supporting each other through shared experiences
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
