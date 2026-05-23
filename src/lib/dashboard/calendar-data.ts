export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  duration: string;
  type: "meeting" | "deadline" | "call" | "review";
  attendees?: string[];
  description?: string;
};

const today = new Date();
const y = today.getFullYear();
const m = String(today.getMonth() + 1).padStart(2, "0");

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Review sprint — Q2",
    date: `${y}-${m}-03`,
    time: "10:00",
    duration: "1h",
    type: "meeting",
    attendees: ["Ana Costa", "Rafael Mendes"],
    description: "Alinhar entregas do trimestre e prioridades do roadmap.",
  },
  {
    id: "2",
    title: "Demo com cliente Enterprise",
    date: `${y}-${m}-05`,
    time: "15:30",
    duration: "45min",
    type: "call",
    attendees: ["Sofia Almeida", "Usuário Demo"],
    description: "Apresentação da plataforma para prospect ACME Corp.",
  },
  {
    id: "3",
    title: "Deadline — integração Stripe",
    date: `${y}-${m}-08`,
    time: "18:00",
    duration: "—",
    type: "deadline",
    description: "Finalizar webhooks de cobrança recorrente.",
  },
  {
    id: "4",
    title: "1:1 com equipe de CS",
    date: `${y}-${m}-10`,
    time: "11:00",
    duration: "30min",
    type: "meeting",
    attendees: ["Sofia Almeida"],
  },
  {
    id: "5",
    title: "Lançamento campanha afiliados",
    date: `${y}-${m}-12`,
    time: "09:00",
    duration: "2h",
    type: "review",
    attendees: ["Ana Costa", "Mariana Silva"],
  },
  {
    id: "6",
    title: "Call investidores",
    date: `${y}-${m}-15`,
    time: "16:00",
    duration: "1h",
    type: "call",
    attendees: ["Usuário Demo"],
  },
  {
    id: "7",
    title: "Retrospectiva mensal",
    date: `${y}-${m}-22`,
    time: "14:00",
    duration: "1h 30min",
    type: "meeting",
    attendees: ["Ana Costa", "Rafael Mendes", "Sofia Almeida"],
  },
  {
    id: "8",
    title: "Fechamento financeiro",
    date: `${y}-${m}-28`,
    time: "17:00",
    duration: "—",
    type: "deadline",
    description: "Consolidar MRR e métricas de churn do mês.",
  },
];

export const EVENT_TYPE_STYLES: Record<CalendarEvent["type"], string> = {
  meeting: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  deadline: "bg-red-500/15 text-red-400 border-red-500/25",
  call: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  review: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export const EVENT_TYPE_LABELS: Record<CalendarEvent["type"], string> = {
  meeting: "Reunião",
  deadline: "Prazo",
  call: "Call",
  review: "Review",
};
