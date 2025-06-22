"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Brain,
  Globe,
  Target,
  ArrowLeft,
  Save,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface ProfileData {
  // Basic Info
  age: number;
  gender: string;
  location: string;
  occupation: string;
  education: string;
  familyStatus: string;
  religion: string;

  // Cultural Context
  culturalContext: string;
  language: string;
  interests: string[];

  // Mental Health History
  mentalHealthHistory: {
    conditions: string[];
    treatments: string[];
    medications: string[];
  };

  // Preferences
  preferences: {
    consultationType: "PROFESSIONAL" | "TRADITIONAL" | "BOTH";
    budget: number;
    availability: string[];
    communicationStyle: "DIRECT" | "GENTLE" | "CULTURAL";
  };
}

const interests = [
  "mental health",
  "digital wellness",
  "cultural identity",
  "family relationships",
  "work stress",
  "spirituality",
  "community support",
  "traditional healing",
  "modern therapy",
  "youth issues",
  "women&apos;s health",
  "men&apos;s health",
  "elderly care",
  "addiction recovery",
  "trauma healing",
];

const mentalHealthConditions = [
  "Anxiety",
  "Depression",
  "Stress",
  "PTSD",
  "Bipolar Disorder",
  "OCD",
  "Eating Disorders",
  "Substance Abuse",
  "Sleep Issues",
  "None",
];

const treatments = [
  "Therapy",
  "Medication",
  "Traditional Healing",
  "Support Groups",
  "Exercise",
  "Meditation",
  "Prayer",
  "None",
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    age: 25,
    gender: "",
    location: "",
    occupation: "",
    education: "",
    familyStatus: "",
    religion: "",
    culturalContext: user?.culturalContext || "nigerian",
    language: user?.language || "en",
    interests: [],
    mentalHealthHistory: {
      conditions: [],
      treatments: [],
      medications: [],
    },
    preferences: {
      consultationType: "BOTH",
      budget: 20000,
      availability: ["weekdays"],
      communicationStyle: "GENTLE",
    },
  });

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | number
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (
    parent: keyof ProfileData,
    field: string,
    value: unknown
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [parent]: {
        ...((prev[parent] as object) || {}),
        [field]: value,
      },
    }));
  };

  const toggleInterest = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleCondition = (condition: string) => {
    setProfileData((prev) => ({
      ...prev,
      mentalHealthHistory: {
        ...prev.mentalHealthHistory,
        conditions: prev.mentalHealthHistory.conditions.includes(condition)
          ? prev.mentalHealthHistory.conditions.filter((c) => c !== condition)
          : [...prev.mentalHealthHistory.conditions, condition],
      },
    }));
  };

  const toggleTreatment = (treatment: string) => {
    setProfileData((prev) => ({
      ...prev,
      mentalHealthHistory: {
        ...prev.mentalHealthHistory,
        treatments: prev.mentalHealthHistory.treatments.includes(treatment)
          ? prev.mentalHealthHistory.treatments.filter((t) => t !== treatment)
          : [...prev.mentalHealthHistory.treatments, treatment],
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save profile data to database
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Basic Information", icon: User },
    { id: 2, title: "Cultural Context", icon: Globe },
    { id: 3, title: "Mental Health History", icon: Brain },
    { id: 4, title: "Preferences", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-primary-600 hover:text-primary-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Profile Setup
                  </h1>
                  <p className="text-sm text-gray-600 mt-2">
                    Let&apos;s continue your mental health journey
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : saved ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saved ? "Saved!" : "Save Profile"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= stepItem.id
                      ? "bg-primary-500 border-primary-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  <stepItem.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      step > stepItem.id ? "bg-primary-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((stepItem) => (
              <span
                key={stepItem.id}
                className={`text-sm ${
                  step >= stepItem.id ? "text-primary-600" : "text-gray-500"
                }`}
              >
                {stepItem.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={profileData.age}
                        onChange={(e) =>
                          handleInputChange("age", parseInt(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        min="13"
                        max="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={profileData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="e.g., Lagos, Nigeria"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occupation
                      </label>
                      <input
                        type="text"
                        value={profileData.occupation}
                        onChange={(e) =>
                          handleInputChange("occupation", e.target.value)
                        }
                        placeholder="e.g., Software Developer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education Level
                      </label>
                      <select
                        value={profileData.education}
                        onChange={(e) =>
                          handleInputChange("education", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select education level</option>
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="bachelor">Bachelor&apos;s Degree</option>
                        <option value="master">Master&apos;s Degree</option>
                        <option value="phd">PhD</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Family Status
                      </label>
                      <select
                        value={profileData.familyStatus}
                        onChange={(e) =>
                          handleInputChange("familyStatus", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select family status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="in-relationship">
                          In a relationship
                        </option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Cultural Context & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cultural Context
                      </label>
                      <select
                        value={profileData.culturalContext}
                        onChange={(e) =>
                          handleInputChange("culturalContext", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="nigerian">Nigerian</option>
                        <option value="west-african">West African</option>
                        <option value="global">Global</option>
                        <option value="mixed">Mixed Heritage</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Religion
                      </label>
                      <select
                        value={profileData.religion}
                        onChange={(e) =>
                          handleInputChange("religion", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select religion</option>
                        <option value="christian">Christian</option>
                        <option value="muslim">Muslim</option>
                        <option value="traditional">Traditional African</option>
                        <option value="other">Other</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Areas of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            profileData.interests.includes(interest)
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-gray-200 hover:border-primary-300"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Mental Health History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Mental Health Conditions (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mentalHealthConditions.map((condition) => (
                        <button
                          key={condition}
                          onClick={() => toggleCondition(condition)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            profileData.mentalHealthHistory.conditions.includes(
                              condition
                            )
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-gray-200 hover:border-primary-300"
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Previous Treatments (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {treatments.map((treatment) => (
                        <button
                          key={treatment}
                          onClick={() => toggleTreatment(treatment)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            profileData.mentalHealthHistory.treatments.includes(
                              treatment
                            )
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-gray-200 hover:border-primary-300"
                          }`}
                        >
                          {treatment}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications (Optional)
                    </label>
                    <textarea
                      value={profileData.mentalHealthHistory.medications.join(
                        ", "
                      )}
                      onChange={(e) =>
                        handleNestedChange(
                          "mentalHealthHistory",
                          "medications",
                          e.target.value.split(", ").filter((m) => m.trim())
                        )
                      }
                      placeholder="List any current medications, separated by commas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Consultation Type Preference
                      </label>
                      <select
                        value={profileData.preferences.consultationType}
                        onChange={(e) =>
                          handleNestedChange(
                            "preferences",
                            "consultationType",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="PROFESSIONAL">
                          Professional Therapy
                        </option>
                        <option value="TRADITIONAL">Traditional Healing</option>
                        <option value="BOTH">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget (₦)
                      </label>
                      <input
                        type="number"
                        value={profileData.preferences.budget}
                        onChange={(e) =>
                          handleNestedChange(
                            "preferences",
                            "budget",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Communication Style
                      </label>
                      <select
                        value={profileData.preferences.communicationStyle}
                        onChange={(e) =>
                          handleNestedChange(
                            "preferences",
                            "communicationStyle",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="DIRECT">Direct</option>
                        <option value="GENTLE">Gentle</option>
                        <option value="CULTURAL">Cultural</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Availability
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["weekdays", "weekends", "evenings", "mornings"].map(
                        (time) => (
                          <button
                            key={time}
                            onClick={() => {
                              const current =
                                profileData.preferences.availability;
                              const updated = current.includes(time)
                                ? current.filter((t) => t !== time)
                                : [...current, time];
                              handleNestedChange(
                                "preferences",
                                "availability",
                                updated
                              );
                            }}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              profileData.preferences.availability.includes(
                                time
                              )
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-gray-200 hover:border-primary-300"
                            }`}
                          >
                            {time.charAt(0).toUpperCase() + time.slice(1)}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              variant="outline"
            >
              Previous
            </Button>
            <div className="flex space-x-4">
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="btn-primary"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Saving..." : "Complete Setup"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
