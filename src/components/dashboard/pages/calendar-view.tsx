"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverSurface } from "@/components/motion/hover-surface";
import {
  CALENDAR_EVENTS,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_STYLES,
  type CalendarEvent,
} from "@/lib/dashboard/calendar-data";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function CalendarView() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of CALENDAR_EVENTS) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, []);

  const selectedEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : [];

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
    setSelectedEvent(null);
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
    setSelectedEvent(null);
  }

  const calendarCells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <PageShell>
      <PageHeader
        title="Calendário"
        description="Reuniões, prazos e calls da equipe"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="surface-card overflow-hidden border-border/60">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">
              {MONTHS[month]} {year}
            </CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="py-2 text-center text-xs font-medium text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }
                const key = dateKey(year, month, day);
                const dayEvents = eventsByDate.get(key) ?? [];
                const isToday = key === todayKey;
                const isSelected = key === selectedDate;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedDate(key);
                      setSelectedEvent(null);
                    }}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-start rounded-lg border border-transparent p-1 text-sm transition-all hover:border-primary/30 hover:bg-muted/40",
                      isToday && "ring-1 ring-primary/50",
                      isSelected && "border-primary/50 bg-primary/10"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                        isToday && "bg-primary text-primary-foreground"
                      )}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <span
                            key={ev.id}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              ev.type === "meeting" && "bg-violet-400",
                              ev.type === "deadline" && "bg-red-400",
                              ev.type === "call" && "bg-cyan-400",
                              ev.type === "review" && "bg-emerald-400"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="surface-card border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {selectedDate
                  ? new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  : "Selecione uma data"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedDate ? (
                selectedEvents.length > 0 ? (
                  selectedEvents.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setSelectedEvent(ev)}
                      className={cn(
                        "w-full rounded-lg border border-border/60 p-3 text-left transition-colors hover:bg-muted/40",
                        selectedEvent?.id === ev.id && "border-primary/40 bg-primary/5"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{ev.title}</p>
                        <Badge
                          variant="outline"
                          className={cn("shrink-0 text-[10px]", EVENT_TYPE_STYLES[ev.type])}
                        >
                          {EVENT_TYPE_LABELS[ev.type]}
                        </Badge>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {ev.time} · {ev.duration}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum evento neste dia.</p>
                )
              ) : (
                <p className="text-sm text-muted-foreground">
                  Clique em um dia no calendário para ver os eventos.
                </p>
              )}
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {selectedEvent && (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <HoverSurface className="p-0">
                  <Card className="border-0 bg-transparent shadow-none">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{selectedEvent.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px]", EVENT_TYPE_STYLES[selectedEvent.type])}
                        >
                          {EVENT_TYPE_LABELS[selectedEvent.type]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0" />
                        {selectedEvent.time} · {selectedEvent.duration}
                      </p>
                      {selectedEvent.description && (
                        <p className="text-muted-foreground">{selectedEvent.description}</p>
                      )}
                      {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                        <div>
                          <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            Participantes
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedEvent.attendees.map((a) => (
                              <span
                                key={a}
                                className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-xs"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        Google Meet · Sala Nexly
                      </p>
                    </CardContent>
                  </Card>
                </HoverSurface>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
