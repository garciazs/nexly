export type Integration = {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  icon: string;
  lastSync?: string;
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Cobrança recorrente, faturas e webhooks em euros.",
    category: "Pagamentos",
    connected: true,
    icon: "💳",
    lastSync: "Há 2 min",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Notificações de receivable e alertas de receita.",
    category: "Comunicação",
    connected: true,
    icon: "💬",
    lastSync: "Há 15 min",
  },
  {
    id: "google",
    name: "Google Analytics",
    description: "Sincronize tráfego e conversões com o painel.",
    category: "Analytics",
    connected: true,
    icon: "📊",
    lastSync: "Há 1 h",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM e pipeline de vendas integrados.",
    category: "CRM",
    connected: false,
    icon: "🧲",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automatize fluxos com 5.000+ apps.",
    category: "Automação",
    connected: false,
    icon: "⚡",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Deploy hooks e status de CI no dashboard.",
    category: "DevOps",
    connected: true,
    icon: "🐙",
    lastSync: "Há 5 min",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Sincronize docs e wikis da equipe.",
    category: "Produtividade",
    connected: false,
    icon: "📝",
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Suporte ao cliente e chat in-app.",
    category: "Suporte",
    connected: false,
    icon: "🎧",
  },
];

export type ApiKeyItem = {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string | null;
  scopes: string[];
};

export const API_KEYS: ApiKeyItem[] = [
  {
    id: "1",
    name: "Produção — Web App",
    prefix: "nx_live_8f3k...2m9p",
    created: "12 Mar 2026",
    lastUsed: "Há 3 min",
    scopes: ["read:metrics", "write:tasks", "read:billing"],
  },
  {
    id: "2",
    name: "Staging — CI/CD",
    prefix: "nx_test_4j2h...7x1q",
    created: "28 Fev 2026",
    lastUsed: "Há 2 h",
    scopes: ["read:metrics", "read:tasks"],
  },
  {
    id: "3",
    name: "Webhook Stripe",
    prefix: "nx_wh_9p4m...3k8r",
    created: "15 Jan 2026",
    lastUsed: "Há 1 min",
    scopes: ["webhooks:stripe"],
  },
];

export const CHAT_MESSAGES = [
  { id: "1", user: "Ana Costa", avatar: "AC", time: "10:24", content: "Pessoal, MRR bateu €48k este mês 🎉", self: false },
  { id: "2", user: "Rafael Mendes", avatar: "RM", time: "10:26", content: "Webhooks do Stripe estão 100% estáveis.", self: false },
  { id: "3", user: "Você", avatar: "UD", time: "10:28", content: "Ótimo! Vamos preparar o report para investidores.", self: true },
  { id: "4", user: "Sofia Almeida", avatar: "SA", time: "10:31", content: "Cliente ACME pediu demo amanhã às 15h30.", self: false },
  { id: "5", user: "Mariana Silva", avatar: "MS", time: "10:35", content: "Campanha de afiliados com +23% de conversão na semana.", self: false },
];
