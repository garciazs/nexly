"use client";

import { motion } from "framer-motion";
import { Mail, UserPlus, Users } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverSurface } from "@/components/motion/hover-surface";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { TeamMemberRow } from "@/lib/dashboard/queries";
import { cn } from "@/lib/utils";

const PERMISSION_STYLES: Record<string, string> = {
  owner: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  admin: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  member: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  viewer: "bg-slate-500/15 text-slate-400 border-slate-500/25",
};

const ROLE_LABELS: Record<string, string> = {
  owner: "Proprietário",
  admin: "Administrador",
  member: "Membro",
  viewer: "Visualizador",
};

export function TeamView({ members }: { members: TeamMemberRow[] }) {
  return (
    <PageShell className="space-y-6">
      <PageHeader
        title="Equipe"
        description="Membros do seu workspace"
        action={
          <Button variant="glow" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Convidar
          </Button>
        }
      />

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Só você no workspace"
          description="Convide colegas para colaborar. Cada organização tem dados isolados."
        />
      ) : (
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <HoverSurface className="p-0">
                <Card className="border-0 bg-transparent shadow-none">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <Avatar className="h-12 w-12 border border-border/60">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {member.email}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 border text-xs capitalize",
                        PERMISSION_STYLES[member.role] ?? PERMISSION_STYLES.member
                      )}
                    >
                      {ROLE_LABELS[member.role] ?? member.role}
                    </Badge>
                  </CardContent>
                </Card>
              </HoverSurface>
            </motion.div>
          ))}
        </motion.div>
      )}

      {members.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Permissões</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Apenas membros desta organização podem ver estes dados.
          </CardContent>
        </Card>
      )}
    </PageShell>
  );
}
