import fs from "fs";
import path from "path";
const root = "D:/nexly";

fs.writeFileSync(path.join(root, "src/app/(admin)/layout.tsx"), `import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/users", label: "Usuários" },
  { href: "/admin/subscriptions", label: "Assinaturas" },
  { href: "/admin/affiliates", label: "Afiliados" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/feature-flags", label: "Feature Flags" },
  { href: "/admin/logs", label: "Logs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 glass">
        <Logo />
        <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">Admin</p>
        <nav className="mt-6 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
`, "utf8");

fs.writeFileSync(path.join(root, "src/app/api/stripe/checkout/route.ts"), `import { NextResponse } from "next/server";
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
    const planConfig = Object.values(PLANS).find((p) => p.id === plan);
    if (!planConfig || !("stripePriceId" in planConfig) || !planConfig.stripePriceId) {
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
`, "utf8");

// Enhanced affiliates page
fs.writeFileSync(path.join(root, "src/app/(dashboard)/dashboard/affiliates/page.tsx"), `"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Copy, TrendingUp, Users, Wallet } from "lucide-react";
import { AFFILIATE_COMMISSION } from "@/lib/constants";

const stats = [
  { label: "Cliques", value: 1247, icon: Users },
  { label: "Conversões", value: 38, icon: TrendingUp },
  { label: "Comissão pendente", value: 892, icon: Wallet, prefix: "€" },
];

export default function AffiliatesPage() {
  const link = "https://nexly.app/?ref=DEMO2026";
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Programa de Afiliados</h1>
        <p className="text-muted-foreground mt-1">
          Comissão fixa de {(AFFILIATE_COMMISSION * 100).toFixed(0)}% — disponível no plano Pro ou superior
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="pt-6 flex items-center gap-4">
              <s.icon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">
                  {s.prefix}<AnimatedCounter value={s.value} />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="glass-card max-w-2xl">
        <CardHeader>
          <CardTitle>Seu link de afiliado</CardTitle>
          <CardDescription>Compartilhe e ganhe em euros a cada assinatura qualificada</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <code className="flex-1 rounded-lg bg-muted px-4 py-3 text-sm font-mono">{link}</code>
          <Button variant="outline" size="icon" aria-label="Copiar link"><Copy className="h-4 w-4" /></Button>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader><CardTitle>Histórico de conversões</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { user: "maria@email.com", plan: "Pro", value: "€9,80", status: "Pago" },
            { user: "joao@startup.io", plan: "Business", value: "€19,80", status: "Pendente" },
          ].map((c) => (
            <div key={c.user} className="flex justify-between items-center p-3 rounded-lg border border-border/50">
              <div><p className="font-medium">{c.user}</p><p className="text-sm text-muted-foreground">Plano {c.plan}</p></div>
              <div className="text-right"><p className="font-medium">{c.value}</p><Badge variant={c.status === "Pago" ? "default" : "secondary"}>{c.status}</Badge></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
`, "utf8");

// SEO metadata enhancement
fs.writeFileSync(path.join(root, "src/app/layout.tsx"), `import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "Nexly — Plataforma SaaS Premium", template: "%s | Nexly" },
  description: "Gerencie equipes, assinaturas e afiliados em um só lugar. SaaS em português brasileiro com cobrança em euros.",
  keywords: ["SaaS", "Nexly", "gestão", "afiliados", "euros", "produtividade", "empresas"],
  authors: [{ name: "Nexly" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nexly",
    title: "Nexly — Plataforma SaaS Premium",
    description: "O SaaS que escala com você. Planos em EUR, afiliados 20% no Pro.",
  },
  twitter: { card: "summary_large_image", title: "Nexly", description: "Plataforma SaaS premium em pt-BR" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nexly",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", priceCurrency: "EUR", price: "19" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={\`\${inter.variable} font-sans min-h-screen antialiased\`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
`, "utf8");

console.log("Fixes applied");
