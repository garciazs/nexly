"use client";

import { useState } from "react";
import { Check, Copy, Key, Plus } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_KEYS, type ApiKeyItem } from "@/lib/dashboard/integrations-data";

export function ApiKeysView() {
  const [keys, setKeys] = useState<ApiKeyItem[]>(API_KEYS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");

  async function copyPrefix(id: string, prefix: string) {
    try {
      await navigator.clipboard.writeText(prefix);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  function createKey() {
    const name = newKeyName.trim() || "Nova chave";
    const id = String(Date.now());
    const suffix = Math.random().toString(36).slice(2, 6);
    setKeys((prev) => [
      {
        id,
        name,
        prefix: `nx_live_${suffix}...${Math.random().toString(36).slice(2, 6)}`,
        created: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        lastUsed: null,
        scopes: ["read:metrics"],
      },
      ...prev,
    ]);
    setNewKeyName("");
    setDialogOpen(false);
  }

  return (
    <PageShell>
      <PageHeader
        title="Chaves API"
        description="Gerencie acesso programático à plataforma"
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="glow" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Nova chave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar chave API</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Nome</Label>
                  <Input
                    id="key-name"
                    placeholder="Ex: Produção — Mobile App"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="border-border/60 bg-muted/40"
                  />
                </div>
                <Button variant="glow" className="w-full gap-2" onClick={createKey}>
                  <Key className="h-4 w-4" />
                  Gerar chave
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="surface-card overflow-hidden border-border/60">
        <CardHeader>
          <CardTitle className="text-base">{keys.length} chaves ativas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Nome</th>
                  <th className="px-6 py-3 font-medium">Prefixo</th>
                  <th className="px-6 py-3 font-medium">Criada</th>
                  <th className="px-6 py-3 font-medium">Último uso</th>
                  <th className="px-6 py-3 font-medium">Escopos</th>
                  <th className="px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr
                    key={key.id}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium">{key.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                      {key.prefix}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{key.created}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {key.lastUsed ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {key.scopes.map((scope) => (
                          <Badge
                            key={scope}
                            variant="outline"
                            className="text-[10px] font-normal"
                          >
                            {scope}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyPrefix(key.id, key.prefix)}
                        aria-label="Copiar prefixo"
                      >
                        {copiedId === key.id ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
