"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { CalendarEventRow } from "@/lib/dashboard/queries";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

type CalendarViewProps = {
  events: CalendarEventRow[];
};

export function CalendarView({ events }: CalendarViewProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEventRow[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  const selectedEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : [];

  if (events.length === 0) {
    return (
      <PageShell>
        <PageHeader title="Calendário" description="Prazos das tarefas do seu workspace" />
        <EmptyState
          icon={CalendarDays}
          title="Nenhum evento no calendário"
          description="Tarefas com data de vencimento aparecem aqui automaticamente."
          actionLabel="Ver tarefas"
          actionHref="/dashboard/tasks"
        />
      </PageShell>
    );
  }

  return (
    <PageShell className="space-y-6">
      <PageHeader title="Calendário" description="Prazos das tarefas do seu workspace" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {MONTHS[month]} {year}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-2 font-medium">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayEvents = eventsByDate.get(key) ?? [];
                const isToday =
                  today.getFullYear() === year &&
                  today.getMonth() === month &&
                  today.getDate() === day;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(key)}
                    className={cn(
                      "aspect-square rounded-lg border border-transparent p-1 text-sm transition-colors hover:bg-muted/50",
                      isToday && "border-primary/40 bg-primary/5",
                      selectedDate === key && "bg-primary/10 ring-1 ring-primary/30"
                    )}
                  >
                    <span className="font-medium">{day}</span>
                    {dayEvents.length > 0 && (
                      <span className="mx-auto mt-0.5 block h-1 w-1 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">
              {selectedDate
                ? new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Selecione um dia"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma tarefa neste dia.</p>
            ) : (
              selectedEvents.map((ev) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border border-border/50 p-3"
                >
                  <p className="font-medium text-sm">{ev.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {ev.time}
                  </p>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
