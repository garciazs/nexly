"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { GradientBg } from "@/components/shared/gradient-bg";
import { DEMO_EMAIL } from "@/lib/demo-account";

function DemoPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!key) {
      router.replace("/");
      return;
    }

    let cancelled = false;

    async function enterDemo() {
      const res = await signIn("credentials", {
        email: DEMO_EMAIL,
        password: "demo-only",
        demoAccessKey: key,
        redirect: false,
      });

      if (cancelled) return;

      if (res?.error) {
        setError("Acesso não autorizado.");
        return;
      }

      router.replace("/dashboard");
    }

    enterDemo();

    return () => {
      cancelled = true;
    };
  }, [key, router]);

  if (!key) {
    return null;
  }

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <GradientBg />
      <motion.div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Logo />

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6 rounded-2xl border border-border/60 bg-background/80 p-8 backdrop-blur-xl"
          >
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao site</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <motion.div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <MonitorPlay className="h-7 w-7 text-primary" />
            </motion.div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm">Abrindo ambiente…</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoPageContent />
    </Suspense>
  );
}
