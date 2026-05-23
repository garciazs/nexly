"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ptBR } from "@/i18n/pt-BR";
import { EASE_OUT } from "@/lib/motion";

const links = [
  { href: "#recursos", label: ptBR.nav.features },
  { href: "#precos", label: ptBR.nav.pricing },
  { href: "#enterprise", label: ptBR.nav.enterprise },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["hsla(var(--background) / 0.65)", "hsla(var(--background) / 0.92)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["hsla(var(--border) / 0.3)", "hsla(var(--border) / 0.8)"]
  );

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="fixed top-0 z-50 w-full backdrop-blur-xl"
      style={{ backgroundColor, borderBottomColor: borderColor, borderBottomWidth: 1 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="hidden text-muted-foreground sm:inline-flex" asChild>
            <Link href="/login">{ptBR.nav.login}</Link>
          </Button>
          <Button variant="glow" asChild>
            <Link href="/register">{ptBR.nav.register}</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
