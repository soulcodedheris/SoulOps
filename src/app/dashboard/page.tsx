"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Brain,
  Users,
  BookOpen,
  Video,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Activity,
  ArrowRight,
  User,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import AIInsights from "@/components/dashboard/AIInsights";
import { UserProfile } from "@/lib/ai/recommendations";

interface DashboardStats {
  totalMoodEntries: number;
  averageMood: number;
  completedAssessments: number;
  activeGoals: number;
  forumPosts: number;
  consultations: number;
}

interface RecentActivity {
  id: string;
  type: "mood" | "assessment" | "goal" | "forum" | "consultation";
  title: string;
  description: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
}

function mapUserToUserProfile(user: unknown): UserProfile | null {
  if (!user || typeof user !== "object" || !("id" in user)) return null;
  const u = user as Record<string, unknown>;
  return {
    id: u.id as string,
    age: (u.age as number) || 25,
    gender: (u.gender as string) || "other",
    location: (u.location as string) || "",
    culturalContext: (u.culturalContext as string) || "nigerian",
    language: (u.language as string) || "en",
    religion: (u.religion as string) || "",
    occupation: (u.occupation as string) || "",
    education: (u.education as string) || "",
    familyStatus: (u.familyStatus as string) || "",
    interests: u.interests ? JSON.parse(u.interests as string) : [],
    mentalHealthHistory: u.mentalHealthHistory
      ? JSON.parse(u.mentalHealthHistory as string)
      : { conditions: [], treatments: [], medications: [] },
    preferences: u.preferences
      ? JSON.parse(u.preferences as string)
      : {
          consultationType: "BOTH",
          budget: 20000,
          availability: ["weekdays"],
          communicationStyle: "GENTLE",
        },
    behavioralData: {
      moodHistory: [],
      assessmentScores: [],
      courseProgress: [],
      forumActivity: { postsCreated: 0, repliesGiven: 0, topicsFollowed: [] },
    },
  };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalMoodEntries: 0,
    averageMood: 0,
    completedAssessments: 0,
    activeGoals: 0,
    forumPosts: 0,
    consultations: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's dashboard data
      const response = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use mock data as fallback
      setStats({
        totalMoodEntries: 12,
        averageMood: 7.2,
        completedAssessments: 3,
        activeGoals: 2,
        forumPosts: 5,
        consultations: 1,
      });
      setRecentActivity([
        {
          id: "1",
          type: "mood",
          title: "Mood Entry",
          description: "Recorded your mood as 8/10",
          date: "2 hours ago",
          icon: Heart,
        },
        {
          id: "2",
          type: "assessment",
          title: "Anxiety Assessment",
          description: "Completed anxiety screening",
          date: "1 day ago",
          icon: Brain,
        },
        {
          id: "3",
          type: "goal",
          title: "Goal Progress",
          description: "Made progress on stress management",
          date: "2 days ago",
          icon: Target,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Track Mood",
      description: "Record how you're feeling today",
      icon: Heart,
      href: "/dashboard/mood",
      color: "bg-red-500",
    },
    {
      title: "Take Assessment",
      description: "Complete a mental health screening",
      icon: Brain,
      href: "/dashboard/assessment",
      color: "bg-blue-500",
    },
    {
      title: "Join Community",
      description: "Connect with others",
      icon: Users,
      href: "/dashboard/community",
      color: "bg-green-500",
    },
    {
      title: "Book Consultation",
      description: "Schedule a session with a provider",
      icon: Video,
      href: "/dashboard/consultation",
      color: "bg-purple-500",
    },
  ];

  const features = [
    {
      title: "Mood Tracking",
      description: "Monitor your emotional well-being",
      icon: Heart,
      href: "/dashboard/mood",
      progress: 75,
    },
    {
      title: "Mental Health Assessments",
      description: "Professional screening tools",
      icon: Brain,
      href: "/dashboard/assessment",
      progress: 60,
    },
    {
      title: "Community Forum",
      description: "Connect with others",
      icon: Users,
      href: "/dashboard/forum",
      progress: 40,
    },
    {
      title: "Tele-consultation",
      description: "Professional mental health support",
      icon: Video,
      href: "/dashboard/consultation",
      progress: 25,
    },
    {
      title: "Digital Literacy",
      description: "Learn about digital wellness",
      icon: BookOpen,
      href: "/dashboard/learn",
      progress: 30,
    },
    {
      title: "Emergency Support",
      description: "24/7 crisis intervention",
      icon: Shield,
      href: "/dashboard/emergency",
      progress: 0,
    },
  ];

  const mappedProfile = mapUserToUserProfile(user);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.displayName || user?.firstName || "User"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Let&apos;s continue your mental health journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Mood Entries
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalMoodEntries}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Mood
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageMood}/10
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Assessments
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completedAssessments}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Goals
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activeGoals}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={action.href}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`p-3 rounded-full ${action.color} text-white`}
                              >
                                <action.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {action.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {action.description}
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Progress */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={feature.href}>
                        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                              <feature.icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${feature.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {feature.progress}%
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            {mappedProfile && <AIInsights userProfile={mappedProfile} />}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <activity.icon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mood Entries</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Forum Posts</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Goals Progress
                    </span>
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
