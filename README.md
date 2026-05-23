# Nexly

Plataforma SaaS premium em português brasileiro (pt-BR) com cobrança em euros (€).

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + Framer Motion
- Prisma + PostgreSQL
- NextAuth v5
- Stripe, UploadThing
- TanStack Query, Zustand, Zod
- Docker

## Planos

| Plano | Preço | Destaques |
|-------|-------|-----------|
| Starter | €19/mês | Essencial para começar |
| Pro | €49/mês | Afiliados 20% de comissão |
| Business | €99/mês | Equipes e API |
| Enterprise | Sob consulta | SLA e suporte dedicado |

## Início rápido

```bash
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

O projeto usa **SQLite** em desenvolvimento (`prisma/dev.db`) — não precisa de Docker.

Para PostgreSQL em produção, altere `provider` em `prisma/schema.prisma` e `DATABASE_URL` no `.env`.

Acesse [http://localhost:3000](http://localhost:3000).

**Credenciais demo:** demo@nexly.app / senha123

## Colocar no ar (produção)

Veja o guia completo: **[DEPLOY.md](./DEPLOY.md)**

Resumo deploy (Supabase + Vercel):

1. [supabase.com](https://supabase.com) → criar projeto → copiar URLs
2. Colocar `DATABASE_URL` + `DIRECT_URL` no `.env`
3. `npm run db:push` + `npm run db:seed`
4. GitHub → `git push`
5. [vercel.com](https://vercel.com) → importar repo → variáveis → Deploy

Guia completo: **[DEPLOY.md](./DEPLOY.md)**

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run db:studio` — Prisma Studio
- `npm run docker:up` — sobe PostgreSQL e Redis

## Licença

Proprietário — Nexly © 2026
