"use client";

import { motion } from "framer-motion";
import { Users, Heart, Globe, Shield } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50M+",
    label: "Nigerians with mental health needs",
    description: "20-30% of population affected",
  },
  {
    icon: Heart,
    value: "<300",
    label: "Psychiatrists in Nigeria",
    description: "For 200+ million people",
  },
  {
    icon: Globe,
    value: "90%",
    label: "Treatment gap in LMICs",
    description: "Lack access to mental health care",
  },
  {
    icon: Shield,
    value: "99.8%",
    label: "Youth with mobile phones",
    description: "Digital readiness for solutions",
  },
];

export function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Scale of the Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding the magnitude of mental health needs in underserved
            communities helps us design more effective digital solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-mental-calm to-mental-balanced rounded-full text-white font-semibold">
            <Heart className="w-5 h-5 mr-2" />
            SoulOps is bridging this gap with culturally-relevant digital
            solutions
          </div>
        </motion.div>
      </div>
    </section>
  );
}
