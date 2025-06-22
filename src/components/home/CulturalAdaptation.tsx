"use client";

import { motion } from "framer-motion";
import { Globe, Languages, Heart, Users, BookOpen, Shield } from "lucide-react";

const adaptations = [
  {
    icon: Languages,
    title: "Indigenous Language Support",
    description:
      "Content available in Yoruba, Igbo, Hausa, and other local languages for better comprehension and cultural connection.",
    examples: [
      "Yoruba mental health terms",
      "Igbo traditional concepts",
      "Hausa cultural metaphors",
    ],
  },
  {
    icon: Heart,
    title: "Traditional Healing Integration",
    description:
      "Respectful integration with traditional healers and spiritual practices while maintaining evidence-based approaches.",
    examples: [
      "Traditional healer directory",
      "Cultural consultation pathways",
      "Spiritual wellness practices",
    ],
  },
  {
    icon: Users,
    title: "Community-Based Approach",
    description:
      "Involving community leaders, elders, and local organizations in the design and delivery of mental health support.",
    examples: [
      "Community leader partnerships",
      "Local organization integration",
      "Cultural advisory boards",
    ],
  },
  {
    icon: BookOpen,
    title: "Cultural Education",
    description:
      "Educational content that respects local beliefs while promoting mental health awareness and reducing stigma.",
    examples: [
      "Cultural mental health literacy",
      "Stigma reduction campaigns",
      "Traditional wisdom integration",
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Trust Building",
    description:
      "Understanding local privacy concerns and building trust through culturally appropriate data handling.",
    examples: [
      "Local privacy practices",
      "Community trust building",
      "Cultural confidentiality norms",
    ],
  },
  {
    icon: Globe,
    title: "Local Context Adaptation",
    description:
      "Content and features adapted to local living conditions, economic realities, and social structures.",
    examples: [
      "Rural area considerations",
      "Economic accessibility",
      "Social structure awareness",
    ],
  },
];

export function CulturalAdaptation() {
  return (
    <section className="py-16 bg-gradient-to-br from-cultural-earth/5 to-cultural-sun/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cultural Adaptation at the Core
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SoulOps goes beyond translation to truly understand and integrate
            with local cultures, traditions, and community structures for
            meaningful mental health support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Cultural Adaptation Matters
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cultural-sun rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  <strong>Trust Building:</strong> Communities are more likely
                  to engage with solutions that respect their cultural values
                  and traditions.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cultural-water rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  <strong>Stigma Reduction:</strong> Cultural context helps
                  frame mental health in ways that reduce shame and encourage
                  help-seeking.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cultural-fire rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  <strong>Effectiveness:</strong> Interventions that align with
                  cultural beliefs and practices are more likely to be effective
                  and sustainable.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cultural-earth rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  <strong>Community Integration:</strong> Solutions that work
                  within existing community structures rather than against them.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cultural-sun to-cultural-fire rounded-full mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Cultural Intelligence Framework
              </h4>
              <p className="text-gray-600">
                Our approach to cultural adaptation is systematic and respectful
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-cultural-sun/10 rounded-lg">
                <div className="w-3 h-3 bg-cultural-sun rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Research & Understanding
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-cultural-water/10 rounded-lg">
                <div className="w-3 h-3 bg-cultural-water rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Community Consultation
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-cultural-fire/10 rounded-lg">
                <div className="w-3 h-3 bg-cultural-fire rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Cultural Integration
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-cultural-earth/10 rounded-lg">
                <div className="w-3 h-3 bg-cultural-earth rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Continuous Adaptation
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adaptations.map((adaptation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cultural-sun/20 to-cultural-fire/20 rounded-lg mb-4">
                <adaptation.icon className="w-6 h-6 text-cultural-earth" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {adaptation.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {adaptation.description}
              </p>
              <div className="space-y-2">
                {adaptation.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cultural-sun rounded-full"></div>
                    <span className="text-xs text-gray-500">{example}</span>
                  </div>
                ))}
              </div>
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
          <div className="bg-gradient-to-r from-cultural-sun/10 to-cultural-fire/10 rounded-2xl p-8 border border-cultural-sun/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              &ldquo;Tech in Yoruba&rdquo; Success Story
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our approach is inspired by successful initiatives like
              &ldquo;Tech in Yoruba&rdquo; which demonstrated that digital
              literacy training in indigenous languages significantly improves
              comprehension, confidence, and engagement with technology.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-cultural-sun text-white rounded-full font-semibold">
              <Languages className="w-5 h-5 mr-2" />
              Local Language = Better Understanding
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
