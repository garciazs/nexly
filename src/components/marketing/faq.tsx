"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";

const faqs = [
  { q: "Posso cancelar a qualquer momento?", a: "Sim. Sem multas ou taxas de cancelamento." },
  { q: "Quais formas de pagamento?", a: "Cartão de crédito e débito via Stripe em euros." },
  { q: "Quando começa o programa de afiliados?", a: "A partir do plano Pro, com 20% de comissão recorrente." },
  { q: "Há período de teste?", a: "14 dias grátis em todos os planos pagos." },
];

export function FAQ() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto max-w-2xl px-4">
        <BlurReveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Perguntas frequentes</h2>
        </BlurReveal>
        <BlurReveal delay={0.1}>
          <Accordion type="single" collapsible className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 backdrop-blur-xl">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-white/5">
                <AccordionTrigger className="hover:text-violet-300">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurReveal>
      </div>
    </section>
  );
}
