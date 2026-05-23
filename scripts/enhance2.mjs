import fs from "fs";
import path from "path";
const root = "D:/nexly";
function w(rel, c) {
  fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
  fs.writeFileSync(path.join(root, rel), c, "utf8");
  console.log("+", rel);
}

w("src/components/marketing/hero.tsx", `"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientBg } from "@/components/shared/gradient-bg";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
import { ptBR } from "@/i18n/pt-BR";

const floating = [
  { className: "top-20 left-[10%] text-violet-400", text: "€49k MRR" },
  { className: "top-32 right-[12%] text-cyan-400", text: "+847 usuários" },
  { className: "bottom-40 left-[15%] text-fuchsia-400", text: "IA ativa" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-20 pb-8">
      <GradientBg />
      {floating.map((f, i) => (
        <motion.span
          key={f.text}
          className={\`absolute hidden lg:block glass px-3 py-1.5 rounded-full text-xs font-medium \${f.className}\`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
        >
          {f.text}
        </motion.span>
      ))}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">
            Nexly · SaaS premium em euros
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            <span className="gradient-text">{ptBR.hero.title}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{ptBR.hero.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Button variant="glow" size="lg" asChild>
                <Link href="/register">{ptBR.hero.cta}</Link>
              </Button>
            </MagneticButton>
            <Button variant="outline" size="lg" asChild>
              <Link href="#precos">{ptBR.hero.ctaSecondary}</Link>
            </Button>
          </div>
        </motion.div>
        <DashboardMockup />
      </div>
    </section>
  );
}
`);

w("src/app/(marketing)/page.tsx", `import { Navbar } from "@/components/marketing/navbar";
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
      <main>
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
`);

w("src/app/api/stripe/checkout/route.ts", `import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const { plan } = await req.json();
    const planConfig = PLANS.find((p) => p.id === plan);
    if (!planConfig?.stripePriceId) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }
    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email,
      line_items: [{ price: planConfig.stripePriceId, quantity: 1 }],
      success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1\`,
      metadata: { plan, userId: session.user.id ?? "" },
      currency: "eur",
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
`);

w("src/app/(auth)/mfa/page.tsx", `"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function MFAPage() {
  const [code, setCode] = useState("");
  return (
    <Card className="glass-card w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
        <CardTitle>Verificação em duas etapas</CardTitle>
        <CardDescription>Digite o código do seu aplicativo autenticador</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="code">Código de 6 dígitos</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" maxLength={6} className="text-center text-2xl tracking-widest mt-2" />
        </div>
        <Button className="w-full" disabled={code.length < 6}>Verificar</Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">Voltar ao login</Link>
        </p>
      </CardContent>
    </Card>
  );
}
`);

w("src/app/(marketing)/legal/privacidade/page.tsx", `export const metadata = { title: "Política de Privacidade | Nexly" };
export default function PrivacidadePage() {
  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl prose dark:prose-invert">
      <h1>Política de Privacidade</h1>
      <p>Última atualização: maio de 2026</p>
      <p>A Nexly respeita sua privacidade e está em conformidade com o GDPR. Coletamos apenas dados necessários para operar o serviço.</p>
      <h2>Dados coletados</h2>
      <p>Nome, e-mail, dados de uso e informações de cobrança processadas via Stripe.</p>
      <h2>Seus direitos</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos seus dados entrando em contato: privacidade@nexly.app</p>
    </article>
  );
}
`);

w("src/app/(marketing)/legal/termos/page.tsx", `export const metadata = { title: "Termos de Uso | Nexly" };
export default function TermosPage() {
  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl prose dark:prose-invert">
      <h1>Termos de Uso</h1>
      <p>Última atualização: maio de 2026</p>
      <p>Ao usar a Nexly, você concorda com estes termos. O serviço é fornecido como SaaS com assinatura mensal em euros.</p>
      <h2>Uso aceitável</h2>
      <p>É proibido uso fraudulento, abuso de API ou violação de direitos de terceiros.</p>
      <h2>Pagamentos</h2>
      <p>Assinaturas são processadas via Stripe. Reembolsos seguem nossa política comercial.</p>
    </article>
  );
}
`);

w("src/app/(admin)/admin/users/page.tsx", `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { name: "Ana Silva", email: "ana@empresa.com", plan: "PRO", role: "USER" },
  { name: "Carlos Mendes", email: "carlos@startup.io", plan: "BUSINESS", role: "ADMIN" },
  { name: "Demo User", email: "demo@nexly.app", plan: "PRO", role: "USER" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
      <Card className="glass-card">
        <CardHeader><CardTitle>Usuários ({mockUsers.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map((u) => (
              <div key={u.email} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{u.plan}</Badge>
                  <Badge>{u.role}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`);

// Update admin sidebar link - read layout
const adminLayout = fs.readFileSync(path.join(root, "src/app/(admin)/layout.tsx"), "utf8");
if (!adminLayout.includes("users")) {
  w("src/app/(admin)/layout.tsx", adminLayout.replace(
    'href: "/admin/subscriptions"',
    'href: "/admin/users"\n    },\n    { label: "Assinaturas", icon: CreditCard, href: "/admin/subscriptions"'
  ).replace('label: "Assinaturas", icon: CreditCard', 'label: "Usuários", icon: Users, href: "/admin/users"\n    },\n    { label: "Assinaturas", icon: CreditCard'));
}

console.log("Phase 2 complete");
