"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
  Brain,
  Heart,
  Users,
  BookOpen,
  MessageCircle,
  Phone,
  AlertTriangle,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";
import AIInsights from "@/components/dashboard/AIInsights";
import { UserProfile } from "@/lib/ai/recommendations";

// Mock user profile for demonstration
const mockUserProfile: UserProfile = {
  id: "1",
  age: 28,
  gender: "Female",
  location: "Lagos, Nigeria",
  culturalContext: "Nigerian",
  language: "English",
  religion: "Christian",
  occupation: "Software Developer",
  education: "Bachelor's Degree",
  familyStatus: "Single",
  interests: ["mental health", "digital wellness", "cultural identity"],
  mentalHealthHistory: {
    conditions: [],
    treatments: [],
    medications: [],
  },
  preferences: {
    consultationType: "BOTH",
    budget: 20000,
    availability: ["weekdays", "evenings"],
    communicationStyle: "GENTLE",
  },
  behavioralData: {
    moodHistory: [
      {
        date: "2024-01-20",
        mood: 6,
        activities: ["work", "exercise"],
        triggers: ["work stress"],
      },
      {
        date: "2024-01-19",
        mood: 5,
        activities: ["work"],
        triggers: ["work stress", "lack of sleep"],
      },
      {
        date: "2024-01-18",
        mood: 7,
        activities: ["family time", "prayer"],
        triggers: [],
      },
      {
        date: "2024-01-17",
        mood: 4,
        activities: ["work"],
        triggers: ["work stress", "social media"],
      },
      {
        date: "2024-01-16",
        mood: 6,
        activities: ["exercise", "reading"],
        triggers: ["work stress"],
      },
      {
        date: "2024-01-15",
        mood: 8,
        activities: ["family time", "prayer", "exercise"],
        triggers: [],
      },
      {
        date: "2024-01-14",
        mood: 5,
        activities: ["work"],
        triggers: ["work stress"],
      },
    ],
    assessmentScores: [
      { assessmentId: "2", score: 12, date: "2024-01-15" },
      { assessmentId: "4", score: 8, date: "2024-01-10" },
    ],
    courseProgress: [
      { courseId: "5", progress: 100, engagement: 9 },
      { courseId: "1", progress: 25, engagement: 7 },
    ],
    forumActivity: {
      postsCreated: 2,
      repliesGiven: 5,
      topicsFollowed: ["general", "youth-mental-health"],
    },
  },
};

export default function Dashboard() {
  const [userProfile] = useState<UserProfile>(mockUserProfile);
  const [activeTab, setActiveTab] = useState<"overview" | "ai-insights">(
    "overview"
  );

  const stats = [
    {
      title: "Mood Score",
      value: "6.0",
      change: "+0.5",
      changeType: "positive" as const,
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Courses Completed",
      value: "1",
      change: "+1",
      changeType: "positive" as const,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Community Posts",
      value: "7",
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Assessments Taken",
      value: "2",
      change: "+1",
      changeType: "positive" as const,
      icon: Target,
      color: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Track Mood",
      description: "Record your current emotional state",
      icon: Heart,
      href: "/dashboard/mood",
      color: "bg-red-50 text-red-700 border-red-200",
    },
    {
      title: "Take Assessment",
      description: "Complete a mental health screening",
      icon: Target,
      href: "/dashboard/assessment",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Find Provider",
      description: "Connect with mental health professionals",
      icon: Users,
      href: "/dashboard/consultation",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Join Community",
      description: "Connect with others in the forum",
      icon: MessageCircle,
      href: "/dashboard/forum",
      color: "bg-green-50 text-green-700 border-green-200",
    },
  ];

  const recentActivity = [
    {
      type: "course_completed",
      title: "Completed Mental Health First Aid",
      description: "You earned a certificate in mental health first aid",
      time: "2 days ago",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      type: "assessment_taken",
      title: "Completed Anxiety Assessment",
      description: "Your score: 12/21 (Moderate anxiety symptoms)",
      time: "1 week ago",
      icon: Target,
      color: "text-purple-600",
    },
    {
      type: "mood_tracked",
      title: "Mood recorded: 6/10",
      description: "Activities: work, exercise. Triggers: work stress",
      time: "Today",
      icon: Heart,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, Aisha!
          </h1>
          <p className="text-gray-600 mt-2">
            Here&apos;s your mental health journey overview
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "ai-insights" ? "default" : "ghost"}
            onClick={() => setActiveTab("ai-insights")}
            className="flex-1"
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <div className="flex items-center mt-1">
                          <span
                            className={`text-sm font-medium ${
                              stat.changeType === "positive"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            from last week
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-full bg-gray-100 ${stat.color}`}
                      >
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.href}>
                        <div
                          className={`p-4 rounded-lg border-2 border-dashed ${action.color} hover:border-solid transition-all cursor-pointer`}
                        >
                          <div className="flex items-center space-x-3">
                            <action.icon className="h-5 w-5" />
                            <div>
                              <h3 className="font-medium">{action.title}</h3>
                              <p className="text-sm opacity-80">
                                {action.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                        >
                          <div
                            className={`p-2 rounded-full bg-white ${activity.color}`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Emergency Support */}
            <Card className="mt-8 border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-900">
                        Need immediate support?
                      </h3>
                      <p className="text-red-700">
                        If you&apos;re experiencing a mental health crisis, help
                        is available 24/7
                      </p>
                    </div>
                  </div>
                  <Link href="/dashboard/emergency">
                    <Button variant="destructive">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "ai-insights" && (
          <AIInsights userProfile={userProfile} />
        )}
      </div>
    </div>
  );
}
