"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  AlertTriangle,
  Heart,
  Shield,
  Users,
  Clock,
  Star,
  Plus,
  ExternalLink,
  User,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  isAvailable: boolean;
}

interface CrisisResource {
  id: string;
  name: string;
  description: string;
  phone: string;
  website?: string;
  availability: string;
  languages: string[];
  rating: number;
  type: "CRISIS_LINE" | "MENTAL_HEALTH" | "EMERGENCY" | "COMMUNITY";
}

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [resources, setResources] = useState<CrisisResource[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    isPrimary: false,
  });

  useEffect(() => {
    fetchContacts();
    fetchResources();
  }, []);

  const fetchContacts = async () => {
    try {
      // Mock data for demo
      const mockContacts: EmergencyContact[] = [
        {
          id: "1",
          name: "Dr. Sarah Johnson",
          relationship: "Therapist",
          phone: "+234-801-234-5678",
          isPrimary: true,
          isAvailable: true,
        },
        {
          id: "2",
          name: "Aisha Bello",
          relationship: "Sister",
          phone: "+234-802-345-6789",
          isPrimary: false,
          isAvailable: true,
        },
        {
          id: "3",
          name: "Baba Adewale",
          relationship: "Traditional Healer",
          phone: "+234-803-456-7890",
          isPrimary: false,
          isAvailable: false,
        },
      ];

      setContacts(mockContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchResources = async () => {
    try {
      const mockResources: CrisisResource[] = [
        {
          id: "1",
          name: "National Suicide Prevention Lifeline",
          description:
            "24/7 crisis intervention and suicide prevention services",
          phone: "1-800-273-8255",
          website: "https://suicidepreventionlifeline.org",
          availability: "24/7",
          languages: ["English", "Spanish"],
          rating: 4.9,
          type: "CRISIS_LINE",
        },
        {
          id: "2",
          name: "Crisis Text Line",
          description: "Text-based crisis intervention and emotional support",
          phone: "Text HOME to 741741",
          website: "https://www.crisistextline.org",
          availability: "24/7",
          languages: ["English"],
          rating: 4.8,
          type: "CRISIS_LINE",
        },
        {
          id: "3",
          name: "Lagos Mental Health Emergency",
          description: "Emergency mental health services in Lagos",
          phone: "+234-1-234-5678",
          availability: "24/7",
          languages: ["English", "Yoruba", "Hausa"],
          rating: 4.6,
          type: "EMERGENCY",
        },
        {
          id: "4",
          name: "Nigerian Psychological Association",
          description: "Professional psychological support and referrals",
          phone: "+234-1-345-6789",
          website: "https://npa.org.ng",
          availability: "Mon-Fri, 9AM-5PM",
          languages: ["English"],
          rating: 4.7,
          type: "MENTAL_HEALTH",
        },
        {
          id: "5",
          name: "Community Support Network",
          description: "Local community-based mental health support",
          phone: "+234-1-456-7890",
          availability: "Daily, 8AM-8PM",
          languages: ["English", "Igbo", "Hausa", "Yoruba"],
          rating: 4.5,
          type: "COMMUNITY",
        },
      ];

      setResources(mockResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact,
        isAvailable: true,
      };

      setContacts([...contacts, contact]);
      setNewContact({
        name: "",
        relationship: "",
        phone: "",
        isPrimary: false,
      });
      setShowAddContact(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "CRISIS_LINE":
        return AlertTriangle;
      case "MENTAL_HEALTH":
        return Heart;
      case "EMERGENCY":
        return Shield;
      case "COMMUNITY":
        return Users;
      default:
        return Phone;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case "CRISIS_LINE":
        return "bg-red-500";
      case "MENTAL_HEALTH":
        return "bg-blue-500";
      case "EMERGENCY":
        return "bg-orange-500";
      case "COMMUNITY":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Emergency Support
                  </h1>
                  <p className="text-sm text-gray-600">
                    Immediate help and crisis resources
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Need Immediate Help?
              </h2>
              <p className="text-red-100">
                If you&apos;re in crisis or having thoughts of self-harm, help
                is available 24/7
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              onClick={() => window.open("tel:1-800-273-8255")}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Crisis Line
            </Button>
            <Button
              onClick={() => window.open("sms:741741&body=HOME")}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Text Crisis Line
            </Button>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Emergency Contacts
            </h2>
            <Button
              onClick={() => setShowAddContact(true)}
              size="sm"
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contact.isPrimary ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <User
                        className={`w-5 h-5 ${
                          contact.isPrimary ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {contact.relationship}
                      </p>
                    </div>
                  </div>
                  {contact.isPrimary && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Primary
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {contact.phone}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => window.open(`tel:${contact.phone}`)}
                      size="sm"
                      variant="outline"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => window.open(`sms:${contact.phone}`)}
                      size="sm"
                      variant="outline"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Crisis Resources
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const IconComponent = getResourceIcon(resource.type);
              const colorClass = getResourceColor(resource.type);

              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {resource.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {resource.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        {resource.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">{resource.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{resource.availability}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4" />
                          <span>{resource.languages.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => window.open(`tel:${resource.phone}`)}
                          className="btn-primary flex-1"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        {resource.website && (
                          <Button
                            onClick={() =>
                              window.open(resource.website, "_blank")
                            }
                            variant="outline"
                            size="sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Emergency Contact
              </h2>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  className="input w-full"
                  placeholder="Enter contact name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                  className="input w-full"
                  placeholder="e.g., Therapist, Family, Friend"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  className="input w-full"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="primary"
                  checked={newContact.isPrimary}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      isPrimary: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <label htmlFor="primary" className="text-sm text-gray-700">
                  Set as primary contact
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddContact(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Add Contact
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
