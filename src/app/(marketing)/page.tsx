import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { Benefits } from "@/components/marketing/benefits";
import { Integrations } from "@/components/marketing/integrations";
import { Features } from "@/components/marketing/features";
import { AISection } from "@/components/marketing/ai-section";
import { Individuals } from "@/components/marketing/individuals";
import { Enterprise } from "@/components/marketing/enterprise";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustBadges />
        <Benefits />
        <Integrations />
        <Features />
        <AISection />
        <Individuals />
        <Enterprise />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
