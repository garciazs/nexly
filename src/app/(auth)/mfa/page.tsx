"use client";
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
