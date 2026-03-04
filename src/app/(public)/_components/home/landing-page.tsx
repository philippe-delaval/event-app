
import NewsletterSubscription from "@/app/(public)/_components/newsletter/newsletter-subscription";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />

      {/* Newsletter Section */}
      <div id="newsletter">
        <NewsletterSubscription />
      </div>
    </div>
  );
}
