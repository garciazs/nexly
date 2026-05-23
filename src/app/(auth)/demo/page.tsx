"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { GradientBg } from "@/components/shared/gradient-bg";
import { DEMO_ACCOUNT } from "@/lib/demo-account";

export default function DemoPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function enterDemo() {
      const res = await signIn("credentials", {
        email: DEMO_ACCOUNT.email,
        password: DEMO_ACCOUNT.password,
        redirect: false,
      });

      if (cancelled) return;

      if (res?.error) {
        setError(
          res.error === "Configuration"
            ? "Banco de dados indisponível. Execute: npm run db:setup"
            : "Não foi possível entrar na conta demo. Verifique se o seed foi executado."
        );
        return;
      }

      router.replace("/dashboard");
    }

    enterDemo();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <GradientBg />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Logo />

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6 rounded-2xl border border-border/60 bg-background/80 p-8 backdrop-blur-xl"
          >
            <p className="text-sm text-destructive">{error}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild>
                <Link href="/login">Ir para login</Link>
              </Button>
              <Button variant="glow" asChild>
                <Link href="/">Voltar ao site</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <MonitorPlay className="h-7 w-7 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm">Abrindo conta demo…</span>
            </div>
            <p className="text-xs text-muted-foreground/80">
              Plano Pro · dados de exemplo · somente leitura
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
