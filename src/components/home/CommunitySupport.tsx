"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Heart,
  Shield,
  Video,
  Globe,
} from "lucide-react";

const communityFeatures = [
  {
    icon: Users,
    title: "Peer Support Networks",
    description:
      "Connect with others who understand your journey in safe, moderated community spaces.",
    color: "text-mental-calm",
    bgColor: "bg-mental-calm/10",
  },
  {
    icon: MessageCircle,
    title: "Moderated Forums",
    description:
      "Share experiences and offer support in carefully moderated discussion spaces.",
    color: "text-mental-balanced",
    bgColor: "bg-mental-balanced/10",
  },
  {
    icon: Heart,
    title: "Traditional Healer Integration",
    description:
      "Respectful connection with traditional healers and spiritual practitioners.",
    color: "text-cultural-fire",
    bgColor: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Community Health Workers",
    description:
      "Digital tools to support and extend the reach of local health workers.",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
  {
    icon: Video,
    title: "Group Sessions",
    description:
      "Virtual support groups and educational sessions in local languages.",
    color: "text-mental-peaceful",
    bgColor: "bg-mental-peaceful/10",
  },
  {
    icon: Globe,
    title: "Local Resource Directory",
    description:
      "Find local mental health resources, support groups, and community services.",
    color: "text-cultural-water",
    bgColor: "bg-blue-50",
  },
];

const testimonials = [
  {
    name: "Aisha B.",
    location: "Lagos, Nigeria",
    text: "SoulOps helped me find a community that understands our cultural approach to mental health. The Yoruba language support made all the difference.",
    avatar: "AB",
  },
  {
    name: "Chukwudi O.",
    location: "Enugu, Nigeria",
    text: "As a community health worker, SoulOps gives me tools to reach more people. The traditional healer integration is brilliant.",
    avatar: "CO",
  },
  {
    name: "Fatima K.",
    location: "Kano, Nigeria",
    text: "The privacy features and cultural sensitivity helped me feel safe seeking support. It's like having a trusted friend who understands.",
    avatar: "FK",
  },
];

export function CommunitySupport() {
  return (
    <section className="py-16 bg-gradient-to-br from-mental-calm/5 to-mental-balanced/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Community-Driven Support
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mental health is a community journey. SoulOps brings together
            traditional wisdom, modern technology, and peer support to create a
            comprehensive support ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Community Voices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-mental-calm to-mental-balanced rounded-full mb-4 text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <p className="text-gray-600 mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-mental-calm to-mental-balanced rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Connect with others who understand your cultural context and
              mental health journey. Together, we&apos;re building a supportive
              ecosystem that respects tradition while embracing innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center px-4 py-2 bg-white/20 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Peer Support</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/20 rounded-full">
                <Heart className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Cultural Wisdom</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/20 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Safe Spaces</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
