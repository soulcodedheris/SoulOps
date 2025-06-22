"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  BookOpen,
  Video,
  Globe,
  Shield,
  Brain,
  TrendingUp,
  MessageCircle,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const moodOptions = [
  {
    value: 1,
    emoji: "😢",
    label: "Very Low",
    color: "bg-red-100 text-red-800",
  },
  {
    value: 2,
    emoji: "😕",
    label: "Low",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: 3,
    emoji: "😐",
    label: "Neutral",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: 4,
    emoji: "🙂",
    label: "Good",
    color: "bg-green-100 text-green-800",
  },
  {
    value: 5,
    emoji: "😊",
    label: "Excellent",
    color: "bg-blue-100 text-blue-800",
  },
];

const quickActions = [
  {
    icon: Heart,
    title: "Mood Check-in",
    description: "Track how you're feeling today",
    color: "bg-mental-calm text-white",
    href: "/dashboard/mood",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with others",
    color: "bg-mental-balanced text-white",
    href: "/dashboard/community",
  },
  {
    icon: MessageCircle,
    title: "Forum",
    description: "Join discussions & share experiences",
    color: "bg-cultural-fire text-white",
    href: "/dashboard/forum",
  },
  {
    icon: Video,
    title: "Consultation",
    description: "Talk to a professional",
    color: "bg-consultation-primary text-white",
    href: "/dashboard/consultation",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Digital literacy & wellness",
    color: "bg-mental-peaceful text-white",
    href: "/dashboard/learn",
  },
  {
    icon: AlertTriangle,
    title: "Emergency",
    description: "Crisis support & resources",
    color: "bg-red-500 text-white",
    href: "/dashboard/emergency",
  },
  {
    icon: ClipboardList,
    title: "Assessment",
    description: "Mental health screenings",
    color: "bg-purple-500 text-white",
    href: "/dashboard/assessment",
  },
];

const culturalPractices = [
  {
    title: "Morning Meditation",
    description: "Traditional mindfulness practices",
    duration: "10 min",
    cultural: "Yoruba",
  },
  {
    title: "Community Prayer",
    description: "Spiritual wellness through prayer",
    duration: "15 min",
    cultural: "Hausa",
  },
  {
    title: "Ancestral Reflection",
    description: "Connecting with cultural heritage",
    duration: "20 min",
    cultural: "Igbo",
  },
];

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [userName] = useState("Aisha");
  const [userLanguage] = useState("Yoruba");

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
    // Remove console.log and add proper feedback if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SoulOps</h1>
                <p className="text-sm text-gray-600">Mental Health Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{userLanguage}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 🌅
          </h2>
          <p className="text-gray-600">
            Let&apos;s check in on your mental well-being today
          </p>
        </motion.div>

        {/* Mood Check-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-mental-calm mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Mood Check-in
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300"
                }`}
              >
                <div className="text-2xl mb-2">{mood.emoji}</div>
                <div className="text-xs font-medium text-gray-700">
                  {mood.label}
                </div>
              </button>
            ))}
          </div>

          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <p className="text-green-800 text-sm">
                Thank you for checking in! Your mood has been recorded.
                {selectedMood >= 4 && " Great to see you're feeling well!"}
                {selectedMood <= 2 &&
                  " Remember, it's okay to not be okay. We're here to support you."}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cultural Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-cultural-earth mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cultural Wellness Practices
              </h3>
            </div>

            <div className="space-y-3">
              {culturalPractices.map((practice) => (
                <div
                  key={practice.title}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {practice.title}
                    </h4>
                    <span className="text-xs bg-cultural-sun/20 text-cultural-sun px-2 py-1 rounded-full">
                      {practice.cultural}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {practice.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {practice.duration}
                    </span>
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress & Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-mental-calm mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Your Progress
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Mood Streak</p>
                  <p className="text-sm text-gray-600">7 days of check-ins</p>
                </div>
                <div className="text-2xl">🔥</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    Community Engagement
                  </p>
                  <p className="text-sm text-gray-600">
                    3 support group sessions
                  </p>
                </div>
                <div className="text-2xl">👥</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Learning Progress</p>
                  <p className="text-sm text-gray-600">
                    5 digital literacy modules
                  </p>
                </div>
                <div className="text-2xl">📚</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
