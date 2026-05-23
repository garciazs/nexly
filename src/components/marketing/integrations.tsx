"use client";

import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { InfiniteMarquee } from "@/components/marketing/premium/infinite-marquee";

const logos = ["Stripe", "Slack", "Notion", "Zapier", "GitHub", "Google", "HubSpot", "Intercom"];

export function Integrations() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <BlurReveal className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Integrações nativas
          </p>
        </BlurReveal>
        <InfiniteMarquee
          items={logos}
          speed={45}
          className="[&_span]:text-base [&_span]:font-semibold"
        />
      </div>
    </section>
  );
}
