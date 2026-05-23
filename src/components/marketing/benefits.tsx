"use client";

import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { TiltCard } from "@/components/marketing/premium/tilt-card";
import { Rocket, Lock, Globe2, HeartHandshake } from "lucide-react";

const items = [
  { icon: Rocket, title: "Implantação em minutos", desc: "Onboarding guiado e templates prontos para começar hoje." },
  { icon: Lock, title: "Segurança enterprise", desc: "RBAC, auditoria, MFA e criptografia de ponta a ponta." },
  { icon: Globe2, title: "Feito para a Europa", desc: "Cobrança em EUR, VAT europeu e conformidade GDPR." },
  { icon: HeartHandshake, title: "Suporte humano", desc: "Time dedicado em português com SLA nos planos Business+." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="relative py-32">
      <div className="container mx-auto px-4">
        <BlurReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Por que líderes escolhem a <span className="gradient-text">Nexly</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Infraestrutura premium para crescer com velocidade, controle e confiança.
          </p>
        </BlurReveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <BlurReveal key={item.title} delay={i * 0.08}>
              <TiltCard floatDelay={i * 0.3}>
                <item.icon className="mb-4 h-10 w-10 text-violet-400 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </TiltCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
