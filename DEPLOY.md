# Colocar o Nexly no ar (Supabase + Vercel)

Guia passo a passo para publicar o site em produção.

---

## Stack de deploy

| Serviço | Função |
|---------|--------|
| **Supabase** | Banco PostgreSQL (grátis) |
| **GitHub** | Código do projeto |
| **Vercel** | Site online |

---

## PASSO 1 — Criar projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com) → **Start your project**
2. **New project** → nome: `nexly` → crie uma senha forte (guarde!)
3. Aguarde o projeto ficar pronto (~2 min)

### Copiar as URLs de conexão

1. No Supabase: **Project Settings** (engrenagem) → **Database**
2. Em **Connection string**, escolha **URI**
3. Copie duas URLs:

**Transaction pooler** (porta **6543**) — use como `DATABASE_URL`:
```
postgresql://postgres.xxxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Session pooler / Direct** (porta **5432**) — use como `DIRECT_URL`:
```
postgresql://postgres.xxxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

Substitua `[SENHA]` pela senha do banco e `xxxxx` pelo ref do projeto.

---

## PASSO 2 — Configurar o `.env` local

Abra `D:\nexly\.env` e cole:

```env
DATABASE_URL="postgresql://postgres.xxxxx:SUA_SENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:SUA_SENHA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
AUTH_SECRET="nexly-prod-secret-troque-por-algo-longo"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Nexly"
```

O `prisma/schema.prisma` já está configurado para **PostgreSQL + Supabase**.

### Criar tabelas e conta demo

```cmd
cd D:\nexly
npm run db:push
npm run db:seed
```

Conta demo criada: `demo@nexly.app` / `senha123`

---

## PASSO 3 — Testar build

Pare o `npm run dev` (Ctrl+C) e rode:

```cmd
build.cmd
```

Ou:

```cmd
npm run build
```

---

## PASSO 4 — GitHub

1. Crie repo em [github.com/new](https://github.com/new) → nome `nexly` (vazio)
2. No terminal:

```cmd
cd D:\nexly
git add .
git commit -m "supabase deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nexly.git
git push -u origin main
```

---

## PASSO 5 — Vercel

1. [vercel.com](https://vercel.com) → login com GitHub
2. **Add New → Project** → importe `nexly`
3. **Environment Variables**:

| Variável | Valor |
|----------|--------|
| `DATABASE_URL` | URL pooler Supabase (porta **6543**, com `?pgbouncer=true`) |
| `DIRECT_URL` | URL direta Supabase (porta **5432**) |
| `AUTH_SECRET` | String longa aleatória |
| `AUTH_URL` | `https://SEU-PROJETO.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Mesma URL |
| `NEXT_PUBLIC_APP_NAME` | `Nexly` |

4. **Deploy**

Após o deploy, confira se `AUTH_URL` usa a URL **real** da Vercel e faça **Redeploy** se necessário.

---

## PASSO 6 — Testar online

- Site: `https://seu-projeto.vercel.app`
- Demo: `https://seu-projeto.vercel.app/demo`
- Login: `demo@nexly.app` / `senha123`

---

## Erros comuns

| Erro | Solução |
|------|---------|
| `EPERM` no build | Pare `npm run dev` ou use `build.cmd` |
| Login não funciona | Rode `npm run db:seed` com Supabase no `.env` |
| `Can't reach database` na Vercel | Use URL pooler (6543) em `DATABASE_URL` |
| `db:push` falha | Use `DIRECT_URL` (5432) no `.env` |
| Prepared statement error | Adicione `?pgbouncer=true` na `DATABASE_URL` |

---

## Alternativa: Neon

Se preferir Neon em vez de Supabase, use só `DATABASE_URL` (sem `DIRECT_URL`) e remova `directUrl` do `schema.prisma`.

---

## Comandos úteis

```cmd
npm run db:push    rem cria/atualiza tabelas
npm run db:seed    rem conta demo
npm run build      rem build produção
iniciar.cmd        rem site local
```

Veja também o painel Supabase → **Table Editor** para visualizar os dados.
