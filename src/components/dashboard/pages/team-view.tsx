"use client";

import { motion } from "framer-motion";
import { Mail, Plus, UserPlus } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverSurface } from "@/components/motion/hover-surface";
import {
  PERMISSION_LABELS,
  TEAM_ACTIVITY,
  TEAM_MEMBERS,
} from "@/lib/dashboard/team-data";
import { cn } from "@/lib/utils";

const PERMISSION_STYLES = {
  owner: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  admin: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  member: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  viewer: "bg-slate-500/15 text-slate-400 border-slate-500/25",
} as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamView() {
  return (
    <PageShell>
      <PageHeader
        title="Equipe"
        description={`${TEAM_MEMBERS.length} membros · ${TEAM_MEMBERS.filter((m) => m.online).length} online`}
        action={
          <Button variant="glow" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Convidar membro
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <HoverSurface className="h-full p-0">
                <Card className="h-full border-0 bg-transparent shadow-none">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-11 w-11 border border-border/60">
                          <AvatarFallback className="bg-primary/10 text-sm text-primary">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                            member.online ? "bg-emerald-500" : "bg-muted-foreground/40"
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("text-[10px]", PERMISSION_STYLES[member.permission])}
                      >
                        {PERMISSION_LABELS[member.permission]}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {member.lastActive}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
                      {member.activity}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </CardContent>
                </Card>
              </HoverSurface>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: TEAM_MEMBERS.length * 0.05 }}
          >
            <button
              type="button"
              className="flex h-full min-h-[180px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/20 hover:text-foreground"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Adicionar membro</span>
            </button>
          </motion.div>
        </div>

        <Card className="surface-card h-fit border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Atividade recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {TEAM_ACTIVITY.map((item, i) => (
              <motion.div
                key={`${item.user}-${i}`}
                className="border-b border-border/40 pb-4 last:border-0 last:pb-0"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
