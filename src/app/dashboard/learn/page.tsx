"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Users,
  Shield,
  Brain,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Course {
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
  culturalContext?: string;
  languages: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  totalDuration: number;
  progress: number;
}

export default function LearnPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchLearningPaths();
  }, []);

  const fetchCourses = async () => {
    try {
      // Mock data for demo
      const mockCourses: Course[] = [
        {
          id: "1",
          title: "Digital Wellness Basics",
          description:
            "Learn how to use technology mindfully and maintain mental health in the digital age",
          category: "BASIC",
          difficulty: "BEGINNER",
          duration: 45,
          lessons: 6,
          rating: 4.8,
          enrolled: 1247,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: false,
          progress: 0,
          culturalContext: "Universal",
          languages: ["English", "Yoruba", "Hausa"],
        },
        {
          id: "2",
          title: "Mental Health Apps Guide",
          description:
            "Discover and learn to use mental health apps effectively",
          category: "INTERMEDIATE",
          difficulty: "INTERMEDIATE",
          duration: 60,
          lessons: 8,
          rating: 4.6,
          enrolled: 892,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: false,
          progress: 25,
          culturalContext: "Nigerian",
          languages: ["English", "Igbo"],
        },
        {
          id: "3",
          title: "Online Safety & Privacy",
          description:
            "Protect your mental health and privacy in digital spaces",
          category: "BASIC",
          difficulty: "BEGINNER",
          duration: 30,
          lessons: 4,
          rating: 4.9,
          enrolled: 2156,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: true,
          progress: 100,
          culturalContext: "Universal",
          languages: ["English", "French", "Arabic"],
        },
        {
          id: "4",
          title: "Cultural Digital Practices",
          description:
            "Integrate traditional healing with modern digital tools",
          category: "ADVANCED",
          difficulty: "ADVANCED",
          duration: 90,
          lessons: 12,
          rating: 4.7,
          enrolled: 456,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: false,
          progress: 0,
          culturalContext: "Yoruba",
          languages: ["Yoruba", "English"],
        },
        {
          id: "5",
          title: "Social Media & Mental Health",
          description:
            "Navigate social media while maintaining emotional well-being",
          category: "INTERMEDIATE",
          difficulty: "INTERMEDIATE",
          duration: 75,
          lessons: 10,
          rating: 4.5,
          enrolled: 1103,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: false,
          progress: 60,
          culturalContext: "Global",
          languages: ["English", "Hausa", "Swahili"],
        },
        {
          id: "6",
          title: "Digital Therapy Tools",
          description:
            "Advanced techniques for using technology in mental health care",
          category: "ADVANCED",
          difficulty: "ADVANCED",
          duration: 120,
          lessons: 15,
          rating: 4.4,
          enrolled: 234,
          thumbnail: "/api/placeholder/300/200",
          isCompleted: false,
          progress: 0,
          culturalContext: "Professional",
          languages: ["English"],
        },
      ];

      setCourses(mockCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLearningPaths = async () => {
    try {
      const mockPaths: LearningPath[] = [
        {
          id: "1",
          title: "Digital Wellness Journey",
          description: "Complete path to digital wellness and mental health",
          courses: ["1", "3", "5"],
          totalDuration: 150,
          progress: 45,
        },
        {
          id: "2",
          title: "Cultural Digital Integration",
          description: "Bridge traditional practices with modern technology",
          courses: ["4", "6"],
          totalDuration: 210,
          progress: 20,
        },
      ];

      setLearningPaths(mockPaths);
    } catch (error) {
      console.error("Error fetching learning paths:", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-800";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-800";
      case "ADVANCED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "BASIC":
        return Shield;
      case "INTERMEDIATE":
        return Brain;
      case "ADVANCED":
        return TrendingUp;
      default:
        return BookOpen;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

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
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-mental-peaceful to-mental-calm rounded-full">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Digital Literacy
                  </h1>
                  <p className="text-sm text-gray-600">
                    Learn digital wellness and mental health skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Courses Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.isCompleted).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Learning Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDuration(
                    courses.reduce(
                      (acc, c) => acc + (c.progress / 100) * c.duration,
                      0
                    )
                  )}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    courses.reduce((acc, c) => acc + c.rating, 0) /
                    courses.length
                  ).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Paths</p>
                <p className="text-2xl font-bold text-gray-900">
                  {learningPaths.length}
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>
        </div>

        {/* Learning Paths */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {path.title}
                    </h3>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {formatDuration(path.totalDuration)}
                  </span>
                  <Button size="sm">Continue</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Course Categories
          </h2>
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Courses" },
              { value: "BASIC", label: "Basic" },
              { value: "INTERMEDIATE", label: "Intermediate" },
              { value: "ADVANCED", label: "Advanced" },
            ].map((category) => (
              <Button
                key={category.value}
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const IconComponent = getCategoryIcon(course.category);

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-blue-600" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            course.difficulty
                          )}`}
                        >
                          {course.difficulty}
                        </span>
                        {course.isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.duration)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.enrolled}</span>
                        </div>
                      </div>

                      {course.progress > 0 && !course.isCompleted && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                        <Button size="sm">
                          {course.isCompleted
                            ? "Review"
                            : course.progress > 0
                            ? "Continue"
                            : "Start"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
