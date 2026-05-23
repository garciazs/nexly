# Colocar o Nexly no ar

Guia passo a passo para publicar o site em produção (grátis para começar).

---

## Por que dá erro?

| Erro | Causa | Solução |
|------|--------|---------|
| `EPERM` no `prisma generate` | `npm run dev` está rodando | Feche o terminal do dev (Ctrl+C) antes do build |
| Login/demo não funciona online | SQLite local não funciona na Vercel | Use PostgreSQL (Neon) — ver abaixo |
| `Configuration` no login | `AUTH_SECRET` ou `DATABASE_URL` faltando | Configure variáveis no painel da Vercel |
| Build falha na Vercel | Banco SQLite em produção | Troque para PostgreSQL |

**Importante:** o projeto usa **SQLite só no seu PC**. Na internet você **precisa de PostgreSQL**.

---

## Opção recomendada: Vercel + Neon (grátis)

### 1. Testar build local (antes de publicar)

```powershell
# Pare o servidor de desenvolvimento (Ctrl+C no terminal do npm run dev)

cd d:\nexly
npm run build
npm run start
```

Abra http://localhost:3000 — se carregar, o build está OK.

---

### 2. Criar banco PostgreSQL (Neon)

1. Acesse [https://neon.tech](https://neon.tech) e crie conta grátis
2. **New Project** → nome `nexly`
3. Copie a **Connection string** (formato `postgresql://...`)

---

### 3. Ajustar Prisma para PostgreSQL

Abra `prisma/schema.prisma` e altere:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

No `.env` local (para testar com Neon):

```env
DATABASE_URL="postgresql://usuario:senha@ep-xxx.region.aws.neon.tech/nexly?sslmode=require"
```

Rode uma vez:

```powershell
npm run db:push
npm run db:seed
```

Isso cria tabelas e a conta demo (`demo@nexly.app` / `senha123`).

---

### 4. Subir código no GitHub

Instale Git se não tiver: [https://git-scm.com/download/win](https://git-scm.com/download/win)

```powershell
cd d:\nexly
git init
git add .
git commit -m "Deploy inicial Nexly"
```

Crie repositório em [https://github.com/new](https://github.com/new) e:

```powershell
git remote add origin https://github.com/SEU_USUARIO/nexly.git
git branch -M main
git push -u origin main
```

---

### 5. Deploy na Vercel

1. Acesse [https://vercel.com](https://vercel.com) → login com GitHub
2. **Add New → Project** → importe o repositório `nexly`
3. Em **Environment Variables**, adicione:

| Variável | Valor |
|----------|--------|
| `DATABASE_URL` | Connection string do Neon |
| `AUTH_SECRET` | Gere com: `npx auth secret` ou string aleatória longa |
| `AUTH_URL` | `https://SEU-DOMINIO.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | `https://SEU-DOMINIO.vercel.app` |
| `NEXT_PUBLIC_APP_NAME` | `Nexly` |

4. Clique **Deploy**

Na primeira vez, após o deploy, rode o seed **no seu PC** apontando para o Neon (mesmo `DATABASE_URL` do passo 3):

```powershell
npm run db:seed
```

---

### 6. Testar produção

- Site: `https://seu-projeto.vercel.app`
- Demo: `https://seu-projeto.vercel.app/demo`
- Login: `demo@nexly.app` / `senha123`

---

## Variáveis opcionais (depois)

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
UPLOADTHING_TOKEN=
```

---

## Opção alternativa: Railway (tudo em um lugar)

1. [https://railway.app](https://railway.app) → New Project
2. **Deploy from GitHub** + **Add PostgreSQL**
3. Conecte `DATABASE_URL` automaticamente
4. Mesmas variáveis `AUTH_SECRET`, `AUTH_URL`, etc.

---

## Checklist rápido

- [ ] `npm run dev` **parado** ao rodar build
- [ ] `npm run build` passa sem erro
- [ ] Prisma em **postgresql** (não sqlite)
- [ ] `DATABASE_URL` do Neon configurada
- [ ] `AUTH_SECRET` definido
- [ ] `AUTH_URL` = URL real do site
- [ ] `npm run db:seed` executado no banco de produção

---

## Comandos úteis

```powershell
# Build de produção
npm run build

# Rodar como produção local
npm run start

# Recriar banco + demo
npm run db:setup

# Só popular conta demo
npm run db:seed
```

---

## Precisa de ajuda?

Se o deploy falhar na Vercel, abra **Deployments → Logs** e copie a mensagem de erro. Os erros mais comuns são `DATABASE_URL` ausente ou Prisma ainda em SQLite.
