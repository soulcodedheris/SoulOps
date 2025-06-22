import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Features } from "@/components/home/Features";
import { CulturalAdaptation } from "@/components/home/CulturalAdaptation";
import { CommunitySupport } from "@/components/home/CommunitySupport";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Statistics */}
      <Stats />

      {/* Features */}
      <Features />

      {/* Cultural Adaptation */}
      <CulturalAdaptation />

      {/* Community Support */}
      <CommunitySupport />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}
