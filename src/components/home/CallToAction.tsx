"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Heart, Globe, Shield, Users } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Bridge the Digital Chasm?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of others who are accessing culturally-relevant
            mental health support through SoulOps. Start your journey toward
            better mental well-being today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                <Globe className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                <Shield className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Cultural Sensitivity
              </h3>
              <p className="opacity-90">
                Respects your cultural background and traditional practices
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="opacity-90">
                Your data and conversations are protected and confidential
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="opacity-90">
                Connect with others who understand your journey
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4">
              Available in Multiple Languages
            </h3>
            <p className="text-lg mb-6 opacity-90">
              SoulOps supports indigenous languages including Yoruba, Igbo,
              Hausa, and more, ensuring everyone can access mental health
              support in their preferred language.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["English", "Yoruba", "Igbo", "Hausa", "French", "Arabic"].map(
                (language) => (
                  <span
                    key={language}
                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                  >
                    {language}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
