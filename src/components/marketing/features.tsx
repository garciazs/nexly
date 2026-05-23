"use client";

import { Zap, Shield, Users, BarChart3, Globe, Sparkles } from "lucide-react";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";
import { TiltCard } from "@/components/marketing/premium/tilt-card";

const features = [
  { icon: Zap, title: "Performance extrema", desc: "Infraestrutura edge com cache inteligente e latência mínima." },
  { icon: Shield, title: "Segurança avançada", desc: "Criptografia, auditoria contínua e conformidade GDPR." },
  { icon: Users, title: "Equipes em escala", desc: "Convites, papéis e permissões granulares." },
  { icon: BarChart3, title: "Analytics ao vivo", desc: "Métricas em tempo real e relatórios exportáveis." },
  { icon: Globe, title: "Receita em euros", desc: "Cobrança europeia integrada com Stripe." },
  { icon: Sparkles, title: "IA nativa", desc: "Assistente inteligente que aprende com seu negócio." },
];

export function Features() {
  return (
    <section id="recursos" className="relative py-32">
      <div className="container mx-auto px-4">
        <BlurReveal className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Tudo que sua operação precisa
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Uma stack unificada para receita, equipe e crescimento.
          </p>
        </BlurReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <BlurReveal key={f.title} delay={i * 0.05}>
              <TiltCard floatDelay={i * 0.2}>
                <f.icon className="mb-3 h-10 w-10 text-violet-400" />
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </TiltCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
