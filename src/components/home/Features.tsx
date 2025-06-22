"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Users,
  Brain,
  Smartphone,
  Globe,
  Lock,
  Wifi,
  Languages,
  BookOpen,
  Video,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Cultural Adaptation",
    description:
      "Content and interventions adapted to local cultural contexts, languages, and traditional practices.",
    color: "text-mental-calm",
    bgColor: "bg-mental-calm/10",
  },
  {
    icon: Shield,
    title: "Privacy-Focused",
    description:
      "End-to-end encryption, local data storage, and anonymous usage options for stigma reduction.",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Peer support networks, moderated forums, and integration with traditional healers and community leaders.",
    color: "text-mental-balanced",
    bgColor: "bg-mental-balanced/10",
  },
  {
    icon: Brain,
    title: "Evidence-Based",
    description:
      "Clinically validated interventions adapted for cultural relevance and local effectiveness.",
    color: "text-mental-peaceful",
    bgColor: "bg-mental-peaceful/10",
  },
  {
    icon: Smartphone,
    title: "Offline-First",
    description:
      "Works without internet, downloadable content, and low-bandwidth optimization for rural areas.",
    color: "text-cultural-sun",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description:
      "Support for indigenous languages including Yoruba, Igbo, Hausa, and other local languages.",
    color: "text-cultural-water",
    bgColor: "bg-blue-50",
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description:
      "Robust data protection, user anonymity options, and transparent privacy controls.",
    color: "text-mental-stressed",
    bgColor: "bg-red-50",
  },
  {
    icon: Wifi,
    title: "Low-Bandwidth Optimized",
    description:
      "Efficient data usage, compressed content, and progressive loading for limited connectivity.",
    color: "text-cultural-earth",
    bgColor: "bg-orange-50",
  },
  {
    icon: Languages,
    title: "Indigenous Language Support",
    description:
      "Digital literacy training and mental health content in local languages for better comprehension.",
    color: "text-cultural-fire",
    bgColor: "bg-orange-50",
  },
  {
    icon: BookOpen,
    title: "Digital Literacy",
    description:
      "Critical thinking modules, misinformation detection, and online safety education.",
    color: "text-mental-anxious",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Video,
    title: "Tele-Consultation",
    description:
      "Video and voice consultations for remote areas, connecting users with mental health professionals.",
    color: "text-mental-calm",
    bgColor: "bg-mental-calm/10",
  },
  {
    icon: MessageCircle,
    title: "Peer Support Forums",
    description:
      "Safe, moderated community spaces for sharing experiences and offering mutual support.",
    color: "text-mental-balanced",
    bgColor: "bg-mental-balanced/10",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Digital Mental Health Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SoulOps combines cutting-edge technology with cultural sensitivity
            to deliver accessible, effective mental health support for
            underserved communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Designed for Real-World Challenges
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Every feature is built with the understanding that mental health
              support must work within the constraints of limited
              infrastructure, cultural considerations, and the realities of
              underserved communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center px-4 py-2 bg-mental-calm/10 rounded-full">
                <Heart className="w-4 h-4 text-mental-calm mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Cultural Sensitivity
                </span>
              </div>
              <div className="flex items-center px-4 py-2 bg-primary-50 rounded-full">
                <Shield className="w-4 h-4 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Privacy First
                </span>
              </div>
              <div className="flex items-center px-4 py-2 bg-mental-balanced/10 rounded-full">
                <Users className="w-4 h-4 text-mental-balanced mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Community Driven
                </span>
              </div>
              <div className="flex items-center px-4 py-2 bg-cultural-sun/10 rounded-full">
                <Smartphone className="w-4 h-4 text-cultural-sun mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Offline Capable
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
