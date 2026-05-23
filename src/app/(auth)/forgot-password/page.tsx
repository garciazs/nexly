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
    
  setLoading(false);
  return;
    
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <GradientBg />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8"><Logo /></div>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>Nexly — infraestrutura inteligente em euros</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              {error && <p className="text-sm text-destructive">{error}</p>}
              
              <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>
              
              
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" variant="glow" disabled={loading}>{loading ? "Aguarde..." : "Continuar"}</Button>
              <p className="text-sm text-muted-foreground text-center">
                <Link href="/login" className="text-primary hover:underline">Voltar ao login</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
