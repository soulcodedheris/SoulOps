"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  Brain,
  Heart,
  Clock,
  CheckCircle,
  BarChart3,
  Target,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: "MENTAL_HEALTH" | "CULTURAL" | "WELLNESS" | "SCREENING";
  duration: number; // in minutes
  questions: number;
  isCompleted: boolean;
  lastTaken?: string;
  score?: number;
  maxScore: number;
  culturalContext?: string;
  languages: string[];
  recommended: boolean;
}

interface AssessmentResult {
  id: string;
  assessmentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  result: "LOW" | "MODERATE" | "HIGH" | "SEVERE";
  recommendations: string[];
  takenAt: string;
}

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
    fetchResults();
  }, []);

  const fetchAssessments = async () => {
    try {
      const mockAssessments: Assessment[] = [
        {
          id: "1",
          title: "Depression Screening (PHQ-9)",
          description: "Standard screening tool for depression symptoms",
          type: "MENTAL_HEALTH",
          duration: 5,
          questions: 9,
          isCompleted: false,
          maxScore: 27,
          culturalContext: "Universal",
          languages: ["English", "Yoruba", "Hausa"],
          recommended: true,
        },
        {
          id: "2",
          title: "Anxiety Assessment (GAD-7)",
          description: "Generalized Anxiety Disorder screening questionnaire",
          type: "MENTAL_HEALTH",
          duration: 5,
          questions: 7,
          isCompleted: true,
          lastTaken: "2024-01-15",
          score: 12,
          maxScore: 21,
          culturalContext: "Universal",
          languages: ["English", "French"],
          recommended: true,
        },
        {
          id: "3",
          title: "Cultural Identity Assessment",
          description:
            "Explore your cultural background and its impact on mental health",
          type: "CULTURAL",
          duration: 10,
          questions: 15,
          isCompleted: false,
          maxScore: 60,
          culturalContext: "Nigerian",
          languages: ["English", "Yoruba", "Igbo", "Hausa"],
          recommended: false,
        },
        {
          id: "4",
          title: "Digital Wellness Check",
          description:
            "Assess your relationship with technology and digital habits",
          type: "WELLNESS",
          duration: 8,
          questions: 12,
          isCompleted: true,
          lastTaken: "2024-01-10",
          score: 8,
          maxScore: 48,
          culturalContext: "Global",
          languages: ["English"],
          recommended: false,
        },
        {
          id: "5",
          title: "Stress Level Screening",
          description:
            "Quick assessment of current stress levels and coping strategies",
          type: "SCREENING",
          duration: 3,
          questions: 5,
          isCompleted: false,
          maxScore: 20,
          culturalContext: "Universal",
          languages: ["English", "Arabic", "Swahili"],
          recommended: true,
        },
        {
          id: "6",
          title: "Traditional Healing Beliefs",
          description:
            "Understanding your views on traditional healing practices",
          type: "CULTURAL",
          duration: 12,
          questions: 18,
          isCompleted: false,
          maxScore: 72,
          culturalContext: "African",
          languages: ["English", "Yoruba", "Hausa", "Igbo"],
          recommended: false,
        },
      ];

      setAssessments(mockAssessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const mockResults: AssessmentResult[] = [
        {
          id: "1",
          assessmentId: "2",
          score: 12,
          maxScore: 21,
          percentage: 57,
          result: "MODERATE",
          recommendations: [
            "Consider speaking with a mental health professional",
            "Practice stress-reduction techniques",
            "Maintain regular sleep schedule",
          ],
          takenAt: "2024-01-15",
        },
        {
          id: "2",
          assessmentId: "4",
          score: 8,
          maxScore: 48,
          percentage: 17,
          result: "LOW",
          recommendations: [
            "Continue healthy digital habits",
            "Take regular breaks from screens",
            "Engage in offline activities",
          ],
          takenAt: "2024-01-10",
        },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case "MENTAL_HEALTH":
        return Brain;
      case "CULTURAL":
        return Globe;
      case "WELLNESS":
        return Heart;
      case "SCREENING":
        return Shield;
      default:
        return ClipboardList;
    }
  };

  const getAssessmentColor = (type: string) => {
    switch (type) {
      case "MENTAL_HEALTH":
        return "bg-blue-500";
      case "CULTURAL":
        return "bg-orange-500";
      case "WELLNESS":
        return "bg-green-500";
      case "SCREENING":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "LOW":
        return "text-green-600 bg-green-100";
      case "MODERATE":
        return "text-yellow-600 bg-yellow-100";
      case "HIGH":
        return "text-orange-600 bg-orange-100";
      case "SEVERE":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredAssessments =
    selectedType === "all"
      ? assessments
      : assessments.filter((assessment) => assessment.type === selectedType);

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
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mental Health Assessments
                  </h1>
                  <p className="text-sm text-gray-600">
                    Screen your mental health and track progress
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
                <p className="text-sm text-gray-600">Assessments Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.filter((a) => a.isCompleted).length}
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
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments
                    .filter((a) => a.isCompleted)
                    .reduce((acc, a) => acc + a.duration, 0)}
                  m
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
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.length > 0
                    ? Math.round(
                        results.reduce((acc, r) => acc + r.percentage, 0) /
                          results.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
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
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.filter((a) => !a.isCompleted).length}
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </motion.div>
        </div>

        {/* Recent Results */}
        {results.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.slice(0, 2).map((result) => {
                const assessment = assessments.find(
                  (a) => a.id === result.assessmentId
                );
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        {assessment?.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(
                          result.result
                        )}`}
                      >
                        {result.result}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Score</span>
                        <span>
                          {result.score}/{result.maxScore} ({result.percentage}
                          %)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Recommendations:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {result.recommendations
                          .slice(0, 2)
                          .map((rec, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Taken: {formatDate(result.takenAt)}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Assessment Types */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Assessment Types
          </h2>
          <div className="flex space-x-2">
            {[
              { value: "all", label: "All Assessments" },
              { value: "MENTAL_HEALTH", label: "Mental Health" },
              { value: "CULTURAL", label: "Cultural" },
              { value: "WELLNESS", label: "Wellness" },
              { value: "SCREENING", label: "Screening" },
            ].map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading assessments...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.map((assessment) => {
                const IconComponent = getAssessmentIcon(assessment.type);
                const colorClass = getAssessmentColor(assessment.type);

                return (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={`h-32 ${colorClass} flex items-center justify-center`}
                    >
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        {assessment.recommended && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Recommended
                          </span>
                        )}
                        {assessment.isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {assessment.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {assessment.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{assessment.duration}m</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClipboardList className="w-4 h-4" />
                          <span>{assessment.questions} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{assessment.languages.length}</span>
                        </div>
                      </div>

                      {assessment.isCompleted &&
                        assessment.score !== undefined && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Your Score</span>
                              <span>
                                {assessment.score}/{assessment.maxScore}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (assessment.score / assessment.maxScore) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {assessment.culturalContext}
                        </span>
                        <Button size="sm">
                          {assessment.isCompleted ? "Retake" : "Start"}
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
