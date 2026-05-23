import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "Nexly — Infraestrutura Premium para Negócios Digitais", template: "%s | Nexly" },
  description: "Automatize receita, equipes e afiliados em um só painel. Plataforma inteligente em português com cobrança em euros.",
  keywords: ["Nexly", "gestão", "afiliados", "euros", "automação", "produtividade", "empresas"],
  authors: [{ name: "Nexly" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nexly",
    title: "Nexly — Infraestrutura Premium",
    description: "Seu negócio no piloto automático. Planos em EUR, afiliados 20% no Pro.",
  },
  twitter: { card: "summary_large_image", title: "Nexly", description: "Infraestrutura premium para negócios digitais" },
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
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
