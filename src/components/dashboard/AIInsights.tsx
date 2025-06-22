"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Users,
  ClipboardList,
  ArrowRight,
  Target,
} from "lucide-react";
import {
  AIInsight,
  Recommendation,
  UserProfile,
  generatePersonalizedRecommendations,
} from "@/lib/ai/recommendations";

interface AIInsightsProps {
  userProfile: UserProfile;
}

export default function AIInsights({ userProfile }: AIInsightsProps) {
  const [recommendations, setRecommendations] = useState<{
    courses: Recommendation[];
    providers: Recommendation[];
    assessments: Recommendation[];
    insights: AIInsight[];
  }>({
    courses: [],
    providers: [],
    assessments: [],
    insights: [],
  });

  const [activeTab, setActiveTab] = useState<
    "insights" | "courses" | "providers" | "assessments"
  >("insights");

  useEffect(() => {
    // Generate personalized recommendations
    const personalizedData = generatePersonalizedRecommendations(userProfile);
    setRecommendations(personalizedData);
  }, [userProfile]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "ALERT":
        return "bg-red-100 text-red-800 border-red-200";
      case "WARNING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "INFO":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "MOOD_PATTERN":
        return <TrendingUp className="h-5 w-5" />;
      case "CULTURAL_INSIGHT":
        return <Brain className="h-5 w-5" />;
      case "PROGRESS_UPDATE":
        return <Target className="h-5 w-5" />;
      case "RISK_ALERT":
        return <AlertTriangle className="h-5 w-5" />;
      case "OPPORTUNITY":
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "COURSE":
        return <BookOpen className="h-5 w-5" />;
      case "PROVIDER":
        return <Users className="h-5 w-5" />;
      case "ASSESSMENT":
        return <ClipboardList className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            AI-Powered Insights
          </h2>
          <p className="text-gray-600">
            Personalized recommendations based on your profile and behavior
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">
            AI Assistant
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === "insights" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("insights")}
          className="flex-1"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Insights ({recommendations.insights.length})
        </Button>
        <Button
          variant={activeTab === "courses" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("courses")}
          className="flex-1"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Courses ({recommendations.courses.length})
        </Button>
        <Button
          variant={activeTab === "providers" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("providers")}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          Providers ({recommendations.providers.length})
        </Button>
        <Button
          variant={activeTab === "assessments" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("assessments")}
          className="flex-1"
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Assessments ({recommendations.assessments.length})
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "insights" && (
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.insights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                    <Badge className={getSeverityColor(insight.severity)}>
                      {insight.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{insight.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Recommendations:
                    </h4>
                    <ul className="space-y-1">
                      {insight.recommendations.map((rec, recIndex) => (
                        <li
                          key={recIndex}
                          className="flex items-start space-x-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "courses" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(course.type)}
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </div>
                    <Badge className={getUrgencyColor(course.urgency)}>
                      {course.urgency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Confidence:</span>
                      <span className="font-medium">
                        {Math.round(course.confidence * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Cultural Relevance:</span>
                      <span className="font-medium">
                        {Math.round(course.culturalRelevance * 100)}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        Why this recommendation:
                      </h4>
                      <ul className="space-y-1">
                        {course.reasoning.map((reason, reasonIndex) => (
                          <li
                            key={reasonIndex}
                            className="flex items-start space-x-2 text-xs text-gray-600"
                          >
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      View Course
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "providers" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.providers.map((provider, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(provider.type)}
                      <CardTitle className="text-lg">
                        {provider.title}
                      </CardTitle>
                    </div>
                    <Badge className={getUrgencyColor(provider.urgency)}>
                      {provider.urgency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{provider.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Confidence:</span>
                      <span className="font-medium">
                        {Math.round(provider.confidence * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Cultural Relevance:</span>
                      <span className="font-medium">
                        {Math.round(provider.culturalRelevance * 100)}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        Why this recommendation:
                      </h4>
                      <ul className="space-y-1">
                        {provider.reasoning.map((reason, reasonIndex) => (
                          <li
                            key={reasonIndex}
                            className="flex items-start space-x-2 text-xs text-gray-600"
                          >
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Book Consultation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "assessments" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.assessments.map((assessment, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(assessment.type)}
                      <CardTitle className="text-lg">
                        {assessment.title}
                      </CardTitle>
                    </div>
                    <Badge className={getUrgencyColor(assessment.urgency)}>
                      {assessment.urgency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Confidence:</span>
                      <span className="font-medium">
                        {Math.round(assessment.confidence * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Cultural Relevance:</span>
                      <span className="font-medium">
                        {Math.round(assessment.culturalRelevance * 100)}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        Why this recommendation:
                      </h4>
                      <ul className="space-y-1">
                        {assessment.reasoning.map((reason, reasonIndex) => (
                          <li
                            key={reasonIndex}
                            className="flex items-start space-x-2 text-xs text-gray-600"
                          >
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Start Assessment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {activeTab === "insights" && recommendations.insights.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No insights yet
            </h3>
            <p className="text-gray-600">
              Complete more activities and assessments to receive personalized
              insights.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "courses" && recommendations.courses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No course recommendations
            </h3>
            <p className="text-gray-600">
              Update your profile and preferences to receive personalized course
              recommendations.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "providers" && recommendations.providers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No provider recommendations
            </h3>
            <p className="text-gray-600">
              Set your consultation preferences to receive personalized provider
              recommendations.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "assessments" &&
        recommendations.assessments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No assessment recommendations
              </h3>
              <p className="text-gray-600">
                Complete your profile and mood tracking to receive personalized
                assessment recommendations.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
