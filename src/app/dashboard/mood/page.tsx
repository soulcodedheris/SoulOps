"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Activity,
  Coffee,
  BookOpen,
  Users,
  Music,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const moodOptions = [
  {
    value: 1,
    emoji: "😢",
    label: "Very Low",
    description: "Feeling overwhelmed or deeply sad",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    value: 2,
    emoji: "😕",
    label: "Low",
    description: "Feeling down or anxious",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    value: 3,
    emoji: "😐",
    label: "Neutral",
    description: "Feeling okay, neither good nor bad",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    value: 4,
    emoji: "🙂",
    label: "Good",
    description: "Feeling positive and content",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    value: 5,
    emoji: "😊",
    label: "Excellent",
    description: "Feeling great and energized",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
];

const activities = [
  { icon: Coffee, label: "Prayer/Meditation", cultural: "Spiritual practice" },
  { icon: Utensils, label: "Cooking", cultural: "Cultural expression" },
  { icon: Music, label: "Music/Art", cultural: "Cultural expression" },
  { icon: BookOpen, label: "Reading/Learning", cultural: "Knowledge seeking" },
  { icon: Users, label: "Social Time", cultural: "Community connection" },
  { icon: Activity, label: "Work/Study", cultural: "Purposeful activity" },
];

const triggers = [
  "Job stress",
  "Family issues",
  "Financial concerns",
  "Health worries",
  "Social media",
  "News/current events",
  "Sleep problems",
  "Relationship issues",
  "Cultural expectations",
  "Traditional pressures",
  "Community dynamics",
];

const culturalPractices = [
  {
    title: "Yoruba Morning Prayer",
    description: "Traditional morning spiritual practice",
    duration: "10 minutes",
    benefit: "Centers the mind and spirit",
  },
  {
    title: "Igbo Community Reflection",
    description: "Connecting with ancestral wisdom",
    duration: "15 minutes",
    benefit: "Strengthens cultural identity",
  },
  {
    title: "Hausa Evening Gratitude",
    description: "Thankful reflection on daily blessings",
    duration: "5 minutes",
    benefit: "Promotes positive mindset",
  },
];

export default function MoodTrackingPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = async () => {
    const moodEntry = {
      mood: selectedMood,
      activities: selectedActivities,
      triggers: selectedTriggers,
      notes,
      timestamp: new Date().toISOString(),
    };
    try {
      const response = await fetch("/api/mood-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moodEntry),
      });

      if (response.ok) {
        // Success - reset form and go back to step 1
        setSelectedMood(null);
        setSelectedActivities([]);
        setSelectedTriggers([]);
        setNotes("");
        setCurrentStep(1);
      } else {
        console.error("Error saving mood entry:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving mood entry:", error);
    }
  };

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
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-mental-calm to-mental-balanced rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Mood Tracking
                </h1>
                <p className="text-sm text-gray-600">
                  Track your mental well-being journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      currentStep > step ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Mood Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How are you feeling today?
              </h2>
              <p className="text-gray-600">
                Select the mood that best describes your current state
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => {
                    setSelectedMood(mood.value);
                    setCurrentStep(2);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="text-4xl mb-3">{mood.emoji}</div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {mood.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {mood.description}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Activities */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What have you been doing today?
              </h2>
              <p className="text-gray-600">
                Select activities that reflect your day (optional)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {activities.map((activity) => (
                <button
                  key={activity.label}
                  onClick={() => handleActivityToggle(activity.label)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedActivities.includes(activity.label)
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <activity.icon className="w-5 h-5 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {activity.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {activity.cultural}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Triggers */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Any challenges today?
              </h2>
              <p className="text-gray-600">
                Select any factors that may have affected your mood (optional)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {triggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => handleTriggerToggle(trigger)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedTriggers.includes(trigger)
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {trigger}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(4)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Notes & Cultural Practices */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notes Section */}
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Additional Notes
                  </h2>
                  <p className="text-gray-600">
                    Share any thoughts or feelings (optional)
                  </p>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? Any specific thoughts or experiences you'd like to share?"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-mental-calm hover:bg-mental-calm/90"
                  >
                    Save Entry
                  </Button>
                </div>
              </div>

              {/* Cultural Practices */}
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Cultural Wellness Practices
                  </h2>
                  <p className="text-gray-600">
                    Traditional practices for mental well-being
                  </p>
                </div>

                <div className="space-y-4">
                  {culturalPractices.map((practice, index) => (
                    <motion.div
                      key={practice.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {practice.title}
                        </h3>
                        <span className="text-xs bg-cultural-sun/20 text-cultural-sun px-2 py-1 rounded-full">
                          {practice.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {practice.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Benefit: {practice.benefit}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Try This Practice
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
