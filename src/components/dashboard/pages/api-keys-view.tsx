"use client";

import { useState } from "react";
import { Check, Copy, Key } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { ApiKeyRow } from "@/lib/dashboard/queries";

export function ApiKeysView({ keys: initialKeys }: { keys: ApiKeyRow[] }) {
  const [keys] = useState(initialKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyPrefix(id: string, prefix: string) {
    try {
      await navigator.clipboard.writeText(prefix);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <PageShell>
      <PageHeader title="Chaves API" description="Chaves do seu workspace" />

      {keys.length === 0 ? (
        <EmptyState
          icon={Key}
          title="Nenhuma chave API"
          description="Crie chaves para integrar sistemas externos. Cada chave pertence apenas ao seu workspace."
        />
      ) : (
        <div className="space-y-3">
          {keys.map((k) => (
            <Card key={k.id} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{k.name}</CardTitle>
                <Badge variant="secondary">{k.prefix}…</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Criada em {new Date(k.createdAt).toLocaleDateString("pt-BR")}
                  {k.lastUsedAt &&
                    ` · Último uso ${new Date(k.lastUsedAt).toLocaleDateString("pt-BR")}`}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => copyPrefix(k.id, k.prefix)}
                >
                  {copiedId === k.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  Copiar prefixo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}
