"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/constants";
import { ptBR } from "@/i18n/pt-BR";
import { BlurReveal } from "@/components/marketing/premium/blur-reveal";

const planList = [PLANS.STARTER, PLANS.PRO, PLANS.BUSINESS, PLANS.ENTERPRISE];

export function Pricing() {
  return (
    <section id="precos" className="relative py-32">
      <div className="container mx-auto px-4">
        <BlurReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{ptBR.pricing.title}</h2>
          <p className="mt-4 text-muted-foreground">{ptBR.pricing.subtitle}</p>
          <p className="mt-2 text-sm text-primary">{ptBR.pricing.affiliateNote}</p>
        </BlurReveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {planList.map((plan, i) => (
            <BlurReveal key={plan.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
                <Card className={`h-full relative surface-card-interactive ${plan.id === "pro" ? "border-primary/40 shadow-glow-lg" : ""}`}>
                  {plan.id === "pro" && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Mais popular</Badge>}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.priceLabel}</span>
                      {!("custom" in plan) && <span className="text-muted-foreground">{ptBR.pricing.perMonth}</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.id === "pro" ? "glow" : "outline"} asChild>
                      <Link href={"custom" in plan ? "/contact" : "/register"}>
                        {"custom" in plan ? ptBR.pricing.custom : "Assinar"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
