/** Utilitários de formatação — sem métricas globais fixas. */
export function formatEuro(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function formatEuroWhole(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("pt-BR", { month: "short" });
}
