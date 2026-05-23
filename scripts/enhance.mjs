import fs from "fs";
import path from "path";
const root = "D:\\\\nexly";

function w(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  console.log("+", rel);
}

// Dashboard mockup
w("src/components/marketing/dashboard-mockup.tsx", `"use client";
import { motion } from "framer-motion";
import { BarChart3, Bell, CheckCircle2, Sparkles, TrendingUp, Users } from "lucide-react";

const float = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, delay, ease: "easeInOut" },
});

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className="relative mx-auto mt-16 max-w-5xl perspective-1000"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-cyan-500/20 blur-3xl" />
      <div className="relative glass rounded-2xl border border-white/10 p-1 shadow-glow-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="mx-auto text-xs text-muted-foreground">app.nexly.app/dashboard</span>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-3 md:grid-rows-2 bg-card/80 backdrop-blur-xl min-h-[320px]">
          <motion.div {...float(0)} className="md:col-span-2 rounded-xl border border-border/50 bg-background/60 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Receita (EUR)</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="h-24 flex items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h + "%" }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-primary to-violet-400/60"
                />
              ))}
            </div>
          </motion.div>
          <motion.div {...float(0.5)} className="rounded-xl border border-border/50 bg-background/60 p-4">
            <Users className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">2.847</p>
            <p className="text-xs text-muted-foreground">Usuários ativos</p>
          </motion.div>
          <motion.div {...float(1)} className="rounded-xl border border-border/50 bg-background/60 p-4">
            <BarChart3 className="h-5 w-5 text-cyan-400 mb-2" />
            <p className="text-2xl font-bold">€48.2k</p>
            <p className="text-xs text-muted-foreground">MRR este mês</p>
          </motion.div>
          <motion.div {...float(1.5)} className="md:col-span-2 rounded-xl border border-border/50 bg-background/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium">Insights IA</span>
            </div>
            <div className="space-y-2">
              {["Conversão +23% na última semana", "3 tarefas críticas para hoje", "Afiliado top: +€1.240"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...float(2)} className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col justify-center items-center">
            <Bell className="h-6 w-6 text-primary mb-2" />
            <p className="text-xs text-center text-muted-foreground">12 notificações</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
`);

// Trust badges
w("src/components/marketing/trust-badges.tsx", `"use client";
import { motion } from "framer-motion";
import { Shield, Star, Zap, Award } from "lucide-react";

const badges = [
  { icon: Shield, label: "SOC 2 Ready" },
  { icon: Star, label: "4.9/5 avaliação" },
  { icon: Zap, label: "99.9% uptime" },
  { icon: Award, label: "GDPR compliant" },
];

const logos = ["Vercel", "Linear", "Stripe", "Notion", "Raycast", "Framer"];

export function TrustBadges() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <b.icon className="h-4 w-4 text-primary" />
              {b.label}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Confiado por equipes inovadoras</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-60">
          {logos.map((name) => (
            <span key={name} className="text-lg font-semibold tracking-tight">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// Benefits
w("src/components/marketing/benefits.tsx", `"use client";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Lock, Globe2, HeartHandshake } from "lucide-react";

const items = [
  { icon: Rocket, title: "Implantação em minutos", desc: "Onboarding guiado e templates prontos para começar hoje." },
  { icon: Lock, title: "Segurança enterprise", desc: "RBAC, auditoria, MFA e criptografia de ponta a ponta." },
  { icon: Globe2, title: "Feito para a Europa", desc: "Cobrança em EUR, VAT europeu e conformidade GDPR." },
  { icon: HeartHandshake, title: "Suporte humano", desc: "Time dedicado em português com SLA nos planos Business+." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Por que escolher a Nexly?</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">Tudo que você precisa para crescer — sem complexidade desnecessária.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <Card className="glass h-full hover:shadow-glow transition-shadow duration-300 group">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{item.desc}</p></CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

console.log("Enhancements done");

