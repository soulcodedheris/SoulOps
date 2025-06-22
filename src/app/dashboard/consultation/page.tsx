"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Star,
  MapPin,
  MessageCircle,
  Heart,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Provider {
  id: string;
  name: string;
  specialization: string;
  languages: string[];
  culturalContext?: string;
  rating?: number;
  availability?: string;
  consultationType: "PROFESSIONAL" | "TRADITIONAL";
  focusAreas?: string[];
  experience?: string;
  location?: string;
}

interface ConsultationSlot {
  id: string;
  providerId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  type: "IN_PERSON" | "VIDEO" | "AUDIO";
}

export default function ConsultationPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<
    "PROFESSIONAL" | "TRADITIONAL"
  >("PROFESSIONAL");
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      // Mock data for demo - replace with actual API call
      const mockProviders: Provider[] = [
        {
          id: "1",
          name: "Dr. Aisha Bello",
          specialization: "Clinical Psychologist",
          languages: ["English", "Hausa", "Yoruba"],
          culturalContext: "Northern Nigeria",
          rating: 4.8,
          availability: "Mon-Fri, 9AM-5PM",
          consultationType: "PROFESSIONAL",
          focusAreas: ["Anxiety", "Depression", "Trauma", "Cultural Identity"],
          experience: "15+ years",
          location: "Lagos, Nigeria",
        },
        {
          id: "2",
          name: "Baba Adewale",
          specialization: "Traditional Healer",
          languages: ["Yoruba", "English"],
          culturalContext: "Yoruba Tradition",
          rating: 4.9,
          availability: "Daily, 8AM-8PM",
          consultationType: "TRADITIONAL",
          focusAreas: [
            "Spiritual Healing",
            "Ancestral Guidance",
            "Cultural Practices",
          ],
          experience: "30+ years",
          location: "Ibadan, Nigeria",
        },
        {
          id: "3",
          name: "Dr. Fatima Hassan",
          specialization: "Psychiatrist",
          languages: ["English", "Arabic", "Hausa"],
          culturalContext: "Islamic Tradition",
          rating: 4.7,
          availability: "Mon-Sat, 10AM-6PM",
          consultationType: "PROFESSIONAL",
          focusAreas: ["Mood Disorders", "Addiction", "Family Therapy"],
          experience: "12+ years",
          location: "Kano, Nigeria",
        },
      ];

      setProviders(mockProviders);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProviderIcon = (type: string) => {
    return type === "PROFESSIONAL" ? Brain : Heart;
  };

  const getProviderColor = (type: string) => {
    return type === "PROFESSIONAL"
      ? "bg-gradient-to-br from-blue-500 to-blue-600"
      : "bg-gradient-to-br from-orange-500 to-orange-600";
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAvailableSlots = (providerId: string) => {
    // Mock available slots
    const today = new Date();
    const slots: ConsultationSlot[] = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      for (let hour = 9; hour < 17; hour++) {
        const startTime = new Date(date);
        startTime.setHours(hour, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(hour + 1, 0, 0, 0);

        slots.push({
          id: `${providerId}-${i}-${hour}`,
          providerId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          isAvailable: Math.random() > 0.3, // 70% availability
          type: Math.random() > 0.5 ? "VIDEO" : "AUDIO",
        });
      }
    }

    return slots.filter((slot) => slot.isAvailable);
  };

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
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-consultation-primary to-consultation-secondary rounded-full">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Tele-Consultation
                  </h1>
                  <p className="text-sm text-gray-600">
                    Connect with mental health professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Consultation Types */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Choose Consultation Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              onClick={() => setSelectedType("PROFESSIONAL")}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedType === "PROFESSIONAL"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Professional Therapy
                  </h3>
                  <p className="text-sm text-gray-600">
                    Licensed psychologists, psychiatrists, and counselors
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelectedType("TRADITIONAL")}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedType === "TRADITIONAL"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Traditional Healing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cultural healers and spiritual practitioners
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Providers List */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Available{" "}
            {selectedType === "PROFESSIONAL" ? "Professionals" : "Healers"}
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading providers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {providers
                .filter(
                  (provider) => provider.consultationType === selectedType
                )
                .map((provider) => {
                  const IconComponent = getProviderIcon(
                    provider.consultationType
                  );
                  const colorClass = getProviderColor(
                    provider.consultationType
                  );

                  return (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {provider.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-900">
                                {provider.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {provider.specialization}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{provider.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{provider.experience}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Languages:</strong>{" "}
                              {provider.languages.join(", ")}
                            </p>
                            {provider.culturalContext && (
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Cultural Context:</strong>{" "}
                                {provider.culturalContext}
                              </p>
                            )}
                            {provider.focusAreas && (
                              <p className="text-sm text-gray-600">
                                <strong>Focus Areas:</strong>{" "}
                                {provider.focusAreas.join(", ")}
                              </p>
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <Button
                              onClick={() => {
                                setSelectedProvider(provider);
                                setShowBooking(true);
                              }}
                              className="btn-primary flex-1"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Session
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Book Session with {selectedProvider.name}
              </h2>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getAvailableSlots(selectedProvider.id)
                    .slice(0, 12)
                    .map((slot) => (
                      <button
                        key={slot.id}
                        className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(slot.startTime).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </div>
                        <div className="text-xs text-primary-600 mt-1">
                          {slot.type}
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowBooking(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1">Confirm Booking</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
