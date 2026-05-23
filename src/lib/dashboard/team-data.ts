export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  permission: "owner" | "admin" | "member" | "viewer";
  online: boolean;
  avatar?: string;
  lastActive: string;
  activity: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Usuário Demo",
    email: "demo@nexly.app",
    role: "Fundador",
    permission: "owner",
    online: true,
    lastActive: "Agora",
    activity: "Editou configurações de cobrança",
  },
  {
    id: "2",
    name: "Ana Costa",
    email: "ana@nexly.app",
    role: "Head of Growth",
    permission: "admin",
    online: true,
    lastActive: "Há 2 min",
    activity: "Aprovou campanha de afiliados",
  },
  {
    id: "3",
    name: "Rafael Mendes",
    email: "rafael@nexly.app",
    role: "Eng. Software",
    permission: "member",
    online: true,
    lastActive: "Há 8 min",
    activity: "Mergeou PR #142 — API webhooks",
  },
  {
    id: "4",
    name: "Sofia Almeida",
    email: "sofia@nexly.app",
    role: "Customer Success",
    permission: "member",
    online: false,
    lastActive: "Há 1 h",
    activity: "Respondeu ticket #891",
  },
  {
    id: "5",
    name: "Lucas Ferreira",
    email: "lucas@nexly.app",
    role: "Financeiro",
    permission: "viewer",
    online: false,
    lastActive: "Ontem",
    activity: "Exportou relatório mensal",
  },
  {
    id: "6",
    name: "Mariana Silva",
    email: "mariana@nexly.app",
    role: "Marketing",
    permission: "member",
    online: true,
    lastActive: "Há 15 min",
    activity: "Publicou landing A/B test",
  },
];

export const TEAM_ACTIVITY = [
  { user: "Ana Costa", action: "convidou mariana@nexly.app", time: "Há 12 min", type: "invite" },
  { user: "Rafael Mendes", action: "criou chave API de produção", time: "Há 34 min", type: "api" },
  { user: "Sofia Almeida", action: "atualizou plano para Business", time: "Há 1 h", type: "billing" },
  { user: "Usuário Demo", action: "concluiu 3 tarefas", time: "Há 2 h", type: "task" },
  { user: "Lucas Ferreira", action: "baixou fatura de maio", time: "Ontem", type: "billing" },
];

export const PERMISSION_LABELS: Record<TeamMember["permission"], string> = {
  owner: "Proprietário",
  admin: "Administrador",
  member: "Membro",
  viewer: "Visualizador",
};
