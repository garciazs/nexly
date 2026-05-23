"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, Unplug } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverSurface } from "@/components/motion/hover-surface";
import { INTEGRATIONS, type Integration } from "@/lib/dashboard/integrations-data";

export function IntegrationsView() {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              lastSync: !item.connected ? "Agora" : undefined,
            }
          : item
      )
    );
  }

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <PageShell>
      <PageHeader
        title="Integrações"
        description={`${connectedCount} de ${integrations.length} conectadas`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
          >
            <HoverSurface className="h-full p-0">
              <Card className="flex h-full flex-col border-0 bg-transparent shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl" aria-hidden>
                      {item.icon}
                    </span>
                    {item.connected ? (
                      <Badge variant="success" className="text-[10px]">
                        Conectado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        Desconectado
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                    {item.connected && item.lastSync && (
                      <> · sync {item.lastSync}</>
                    )}
                  </p>
                  <Button
                    variant={item.connected ? "outline" : "glow"}
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => toggleConnection(item.id)}
                  >
                    {item.connected ? (
                      <>
                        <Unplug className="h-4 w-4" />
                        Desconectar
                      </>
                    ) : (
                      <>
                        <Plug className="h-4 w-4" />
                        Conectar
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </HoverSurface>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
