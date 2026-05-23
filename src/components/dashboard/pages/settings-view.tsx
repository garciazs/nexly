"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Bell, CreditCard, Lock, Save, User } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import type { OrganizationSettings } from "@/lib/dashboard/queries";
import { PLANS } from "@/lib/constants";

const PLAN_LABELS: Record<string, string> = {
  STARTER: PLANS.STARTER.name,
  PRO: PLANS.PRO.name,
  BUSINESS: PLANS.BUSINESS.name,
  ENTERPRISE: PLANS.ENTERPRISE.name,
};

export function SettingsView({ organization }: { organization: OrganizationSettings | null }) {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
    if (session?.user?.email) setEmail(session.user.email);
  }, [session?.user?.name, session?.user?.email]);

  function handleSave(section: string) {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <PageShell>
      <PageHeader
        title="Configurações"
        description="Gerencie perfil, cobrança, notificações e segurança"
      />

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="glass-card h-auto flex-wrap gap-1 border border-border/60 bg-muted/30 p-1">
          <TabsTrigger value="perfil" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="cobranca" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Cobrança
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Lock className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="surface-card border-border/60">
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Informações visíveis na sua conta Nexly</CardDescription>
              </CardHeader>
              <CardContent className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name || session?.user?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border/60 bg-muted/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email || session?.user?.email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border/60 bg-muted/40"
                  />
                </div>
                <Button
                  variant="glow"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleSave("perfil")}
                >
                  <Save className="h-4 w-4" />
                  {saved === "perfil" ? "Salvo!" : "Salvar alterações"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="cobranca">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="surface-card border-border/60">
              <CardHeader>
                <CardTitle>Cobrança</CardTitle>
                <CardDescription>Plano atual e dados de faturamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                  <p className="font-medium">
                    {organization
                      ? `Plano ${PLAN_LABELS[organization.plan] ?? organization.plan}`
                      : "Sem plano"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {organization
                      ? `Workspace: ${organization.name} · ${organization.status}`
                      : "Configure a assinatura em Cobrança"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Organização</Label>
                  <Input
                    id="company"
                    defaultValue={organization?.name ?? ""}
                    readOnly
                    className="max-w-md border-border/60 bg-muted/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    defaultValue={organization?.slug ?? ""}
                    readOnly
                    className="max-w-md border-border/60 bg-muted/40"
                  />
                </div>
                <Button
                  variant="glow"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleSave("cobranca")}
                >
                  <Save className="h-4 w-4" />
                  {saved === "cobranca" ? "Salvo!" : "Atualizar cobrança"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notificacoes">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="surface-card border-border/60">
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Escolha como deseja ser avisado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "email",
                    label: "E-mail de atividade",
                    desc: "Resumos diários e alertas importantes",
                    checked: emailNotif,
                    onChange: setEmailNotif,
                  },
                  {
                    id: "push",
                    label: "Push no navegador",
                    desc: "Mensagens em tempo real",
                    checked: pushNotif,
                    onChange: setPushNotif,
                  },
                  {
                    id: "marketing",
                    label: "Novidades e marketing",
                    desc: "Lançamentos e dicas de produto",
                    checked: marketing,
                    onChange: setMarketing,
                  },
                ].map((item, i, arr) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch checked={item.checked} onCheckedChange={item.onChange} />
                    </div>
                    {i < arr.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
                <Button
                  variant="glow"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleSave("notificacoes")}
                >
                  <Save className="h-4 w-4" />
                  {saved === "notificacoes" ? "Salvo!" : "Salvar preferências"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="seguranca">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="surface-card border-border/60">
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Proteja sua conta com camadas extras</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Autenticação em dois fatores</p>
                    <p className="text-xs text-muted-foreground">Código via app autenticador</p>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Alertas de novo login</p>
                    <p className="text-xs text-muted-foreground">E-mail quando um dispositivo novo acessar</p>
                  </div>
                  <Switch checked={sessionAlerts} onCheckedChange={setSessionAlerts} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="max-w-md border-border/60 bg-muted/40"
                  />
                </div>
                <Button
                  variant="glow"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleSave("seguranca")}
                >
                  <Save className="h-4 w-4" />
                  {saved === "seguranca" ? "Salvo!" : "Atualizar segurança"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
