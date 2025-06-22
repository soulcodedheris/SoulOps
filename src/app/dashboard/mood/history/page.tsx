"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MoodEntry {
  id: string;
  mood: number;
  energy?: number;
  anxiety?: number;
  stress?: number;
  sleep?: number;
  notes?: string;
  activities?: string[];
  triggers?: string[];
  createdAt: string;
}

export default function MoodHistoryPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d"); // 7d, 30d, 90d

  const fetchMoodHistory = async () => {
    try {
      const response = await fetch(
        `/api/mood?limit=100&timeRange=${timeRange}`
      );
      if (response.ok) {
        const data = await response.json();
        setMoodEntries(data.moodEntries || []);
      }
    } catch (error) {
      console.error("Error fetching mood history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodHistory();
  }, [timeRange, fetchMoodHistory]);

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round((sum / moodEntries.length) * 10) / 10;
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return "stable";
    const recent = moodEntries.slice(0, 7);
    const older = moodEntries.slice(7, 14);

    if (recent.length === 0 || older.length === 0) return "stable";

    const recentAvg =
      recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length;
    const olderAvg =
      older.reduce((acc, entry) => acc + entry.mood, 0) / older.length;

    if (recentAvg > olderAvg + 0.5) return "improving";
    if (recentAvg < olderAvg - 0.5) return "declining";
    return "stable";
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 2) return "text-red-500";
    if (mood <= 4) return "text-orange-500";
    if (mood <= 6) return "text-yellow-500";
    if (mood <= 8) return "text-green-500";
    return "text-blue-500";
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return "😢";
    if (mood <= 4) return "😕";
    if (mood <= 6) return "😐";
    if (mood <= 8) return "🙂";
    return "😊";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/mood"
              className="text-primary-600 hover:text-primary-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-mental-calm to-mental-balanced rounded-full">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Mood History
                </h1>
                <p className="text-sm text-gray-600">
                  Track your mental well-being over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { value: "7d", label: "7 Days" },
              { value: "30d", label: "30 Days" },
              { value: "90d", label: "90 Days" },
            ].map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getAverageMood()}/10
                </p>
              </div>
              <div className="text-3xl">{getMoodEmoji(getAverageMood())}</div>
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
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {moodEntries.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary-600" />
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
                <p className="text-sm text-gray-600">Trend</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {getMoodTrend()}
                </p>
              </div>
              {getMoodTrend() === "improving" ? (
                <TrendingUp className="w-8 h-8 text-green-600" />
              ) : getMoodTrend() === "declining" ? (
                <TrendingDown className="w-8 h-8 text-red-600" />
              ) : (
                <Activity className="w-8 h-8 text-yellow-600" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Mood Entries List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Entries
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading mood history...</p>
            </div>
          ) : moodEntries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">
                No mood entries found for this time period.
              </p>
              <Link href="/dashboard/mood">
                <Button className="mt-4">Add Your First Entry</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {moodEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Mood: {entry.mood}/10
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(entry.createdAt)}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-1">
                            &ldquo;{entry.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${getMoodColor(entry.mood)}`}
                      >
                        {entry.mood}/10
                      </p>
                      {entry.energy && (
                        <p className="text-xs text-gray-500">
                          Energy: {entry.energy}/10
                        </p>
                      )}
                    </div>
                  </div>

                  {(entry.activities?.length || entry.triggers?.length) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.activities?.map((activity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                      {entry.triggers?.map((trigger, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
