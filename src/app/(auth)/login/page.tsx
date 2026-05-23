"use client";
import Link from "next/link";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { GradientBg } from "@/components/shared/gradient-bg";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registered = searchParams.get("registered") === "1";
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(
        res.error === "Configuration"
          ? "Banco de dados indisponível."
          : "E-mail ou senha incorretos"
      );
      setLoading(false);
      return;
    }
    router.push(callbackUrl);
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <GradientBg />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>Nexly — infraestrutura inteligente em euros</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              {registered && (
                <p className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
                  Conta criada! Entre para escolher seu plano.
                </p>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>
              <div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" required /></div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" variant="glow" disabled={loading}>{loading ? "Aguarde..." : "Continuar"}</Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link href="/register" className="text-primary hover:underline">Criar conta</Link>
                {" · "}
                <Link href="/#precos" className="text-primary hover:underline">Ver planos</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
