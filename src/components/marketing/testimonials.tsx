"use client";

import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { TiltCard } from "@/components/marketing/premium/tilt-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const items = [
  { name: "Ana Silva", role: "CEO, TechBR", text: "A Nexly transformou nossa operação. ROI em 3 meses.", avatar: "AS" },
  { name: "Carlos Mendes", role: "CTO, ScaleUp", text: "Integração impecável e suporte em português.", avatar: "CM" },
  { name: "Mariana Costa", role: "Founder", text: "O programa de afiliados pagou nosso marketing.", avatar: "MC" },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4">
        <BlurReveal className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">O que dizem nossos clientes</h2>
        </BlurReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <BlurReveal key={t.name} delay={i * 0.1}>
              <TiltCard floatDelay={i * 0.25}>
                <p className="italic text-muted-foreground">&quot;{t.text}&quot;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-violet-500/20 text-violet-300">{t.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
