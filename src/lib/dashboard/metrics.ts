/** Métricas compartilhadas — coerentes em todo o dashboard */
export const DASHBOARD_METRICS = {
  revenue: { value: 12450, change: 12.4, label: "Receita (€)" },
  activeUsers: { value: 842, change: 8.2, label: "Usuários ativos" },
  conversions: { value: 156, change: 23.1, label: "Conversões" },
  uptime: { value: 99.9, change: 0.1, label: "Uptime" },
  mrr: { value: 48200, change: 12, label: "MRR" },
  churn: { value: 1.2, change: -0.3, label: "Churn" },
  ltv: { value: 890, change: 8, label: "LTV (€)" },
  nps: { value: 72, change: 5, label: "NPS" },
} as const;

export const REVENUE_CHART = [
  { name: "Jan", value: 4000, users: 620 },
  { name: "Fev", value: 3000, users: 580 },
  { name: "Mar", value: 5000, users: 710 },
  { name: "Abr", value: 4800, users: 690 },
  { name: "Mai", value: 6000, users: 780 },
  { name: "Jun", value: 5500, users: 842 },
];

export const ANALYTICS_SOURCES = [
  { name: "Orgânico", value: 42, color: "hsl(var(--primary))" },
  { name: "Afiliados", value: 28, color: "hsl(200 80% 55%)" },
  { name: "Paid", value: 18, color: "hsl(280 70% 60%)" },
  { name: "Direct", value: 12, color: "hsl(160 60% 45%)" },
];

export const ANALYTICS_FUNNEL = [
  { stage: "Visitantes", value: 12400 },
  { stage: "Signups", value: 2100 },
  { stage: "Ativados", value: 980 },
  { stage: "Pagantes", value: 156 },
];

export function formatEuro(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function formatEuroWhole(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
