"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { GradientBg } from "@/components/shared/gradient-bg";
export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          ? "Banco de dados indisponível. Execute: npm run db:setup"
          : "E-mail ou senha incorretos"
      );
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <GradientBg />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8"><Logo /></div>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>Nexly — infraestrutura inteligente em euros</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>
              <div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" required /></div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" variant="glow" disabled={loading}>{loading ? "Aguarde..." : "Continuar"}</Button>
              <p className="text-sm text-muted-foreground text-center">
                <Link href="/register" className="text-primary hover:underline">Criar conta</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
