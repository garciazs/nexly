"use client";

import { motion } from "framer-motion";
import { Shield, Star, Zap, Award } from "lucide-react";
import { InfiniteMarquee } from "@/components/marketing/premium/infinite-marquee";

const badges = [
  { icon: Shield, label: "SOC 2 Ready" },
  { icon: Star, label: "4.9/5 avaliação" },
  { icon: Zap, label: "99.9% uptime" },
  { icon: Award, label: "GDPR compliant" },
];

const logos = ["Vercel", "Linear", "Stripe", "Notion", "Raycast", "Framer", "Figma", "Supabase"];

export function TrustBadges() {
  return (
    <section className="relative border-y border-white/5 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-wrap justify-center gap-8">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <b.icon className="h-4 w-4 text-violet-400" />
              {b.label}
            </motion.div>
          ))}
        </div>
        <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Confiado por equipes que constroem o futuro
        </p>
        <InfiniteMarquee
          items={logos}
          speed={50}
          className="opacity-70 [&_span]:border-none [&_span]:bg-transparent [&_span]:text-lg [&_span]:font-semibold [&_span]:tracking-tight [&_span]:text-foreground/50"
        />
      </div>
    </section>
  );
}
