#!/usr/bin/env node
/**
 * Nexly SaaS — Bootstrap Generator
 * Executa: node scripts/bootstrap.mjs
 */
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function write(path, content) {
  const full = join(ROOT, path.replace(/^\//, ""));
  await ensureDir(dirname(full));
  await writeFile(full, typeof content === "function" ? content() : content, "utf8");
  console.log("✓", path);
}
function getPackageJson() {
  return JSON.stringify({
    name: "nexly",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev --turbopack",
      build: "prisma generate && next build",
      start: "next start",
      lint: "next lint",
      "db:generate": "prisma generate",
      "db:push": "prisma db push",
      "db:migrate": "prisma migrate dev",
      "db:seed": "tsx prisma/seed.ts",
      "db:studio": "prisma studio",
      postinstall: "prisma generate",
      "docker:up": "docker compose up -d",
      "docker:down": "docker compose down"
    },
    dependencies: {
      "@auth/prisma-adapter": "^2.7.4",
      "@hookform/resolvers": "^3.9.1",
      "@prisma/client": "^6.1.0",
      "@radix-ui/react-accordion": "^1.2.2",
      "@radix-ui/react-avatar": "^1.1.2",
      "@radix-ui/react-dialog": "^1.1.4",
      "@radix-ui/react-dropdown-menu": "^2.1.4",
      "@radix-ui/react-label": "^2.1.1",
      "@radix-ui/react-progress": "^1.1.1",
      "@radix-ui/react-separator": "^1.1.1",
      "@radix-ui/react-slot": "^1.1.1",
      "@radix-ui/react-switch": "^1.1.2",
      "@radix-ui/react-tabs": "^1.1.2",
      "@radix-ui/react-toast": "^1.2.4",
      "@tanstack/react-query": "^5.62.8",
      "@uploadthing/react": "^7.1.1",
      "bcryptjs": "^2.4.3",
      "class-variance-authority": "^0.7.1",
      "clsx": "^2.1.1",
      "date-fns": "^4.1.0",
      "framer-motion": "^11.15.0",
      "lucide-react": "^0.469.0",
      "next": "^15.1.3",
      "next-auth": "^5.0.0-beta.25",
      "next-themes": "^0.4.4",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "react-hook-form": "^7.54.2",
      "recharts": "^2.15.0",
      "stripe": "^17.5.0",
      "tailwind-merge": "^2.6.0",
      "tailwindcss-animate": "^1.0.7",
      "uploadthing": "^7.4.0",
      "zod": "^3.24.1",
      "zustand": "^5.0.2"
    },
    devDependencies: {
      "@types/bcryptjs": "^2.4.6",
      "@types/node": "^22.10.2",
      "@types/react": "^19.0.2",
      "@types/react-dom": "^19.0.2",
      "eslint": "^9.17.0",
      "@eslint/eslintrc": "^3.2.0",
      "autoprefixer": "^10.4.20",
      "eslint-config-next": "^15.1.3",
      "postcss": "^8.4.49",
      "prisma": "^6.1.0",
      "tailwindcss": "^3.4.17",
      "tsx": "^4.19.2",
      "typescript": "^5.7.2"
    }
  }, null, 2);
}
function getTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
}

function getNextConfig() {
  return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
};

export default nextConfig;
`;
}

function getTailwindConfig() {
  return `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        glow: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
`;
}

function getPostCssConfig() {
  return `module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
`;
}

function getEslintConfig() {
  return `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];
export default eslintConfig;
`;
}

function getComponentsJson() {
  return JSON.stringify({
    "$schema": "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: true,
    tsx: true,
    tailwind: { config: "tailwind.config.ts", css: "src/app/globals.css", baseColor: "zinc", cssVariables: true },
    aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui", lib: "@/lib", hooks: "@/hooks" },
  }, null, 2);
}

function getNextEnv() {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`;
}
function getPrismaSchema() {
  return `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

enum Plan {
  STARTER
  PRO
  BUSINESS
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
  INCOMPLETE
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
  CANCELED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum AffiliateStatus {
  PENDING
  ACTIVE
  SUSPENDED
}

enum PayoutStatus {
  PENDING
  PAID
  FAILED
}

enum InvitationStatus {
  PENDING
  ACCEPTED
  EXPIRED
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role      @default(USER)
  locale        String    @default("pt-BR")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  memberships   OrganizationMember[]
  tasks         Task[]    @relation("TaskAssignee")
  notifications Notification[]
  apiKeys       ApiKey[]
  auditLogs     AuditLog[]
  affiliate     Affiliate?
  chats         ChatMessage[]
  uploads       Upload[]
  deviceSessions DeviceSession[]
  ownedOrgs     Organization[] @relation("OrgOwner")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Organization {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  logo         String?
  ownerId      String
  owner        User     @relation("OrgOwner", fields: [ownerId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  members      OrganizationMember[]
  subscription Subscription?
  teams        Team[]
  tasks        Task[]
  invitations  Invitation[]
  apiKeys      ApiKey[]
  auditLogs    AuditLog[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  organizationId String
  userId         String
  role           String       @default("member")
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([organizationId, userId])
}

model Subscription {
  id                   String             @id @default(cuid())
  organizationId       String             @unique
  organization         Organization       @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  plan                 Plan               @default(STARTER)
  status               SubscriptionStatus @default(TRIALING)
  stripeCustomerId     String?            @unique
  stripeSubscriptionId String?            @unique
  stripePriceId        String?
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  cancelAtPeriodEnd    Boolean            @default(false)
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt
  payments             Payment[]
}

model Payment {
  id              String       @id @default(cuid())
  subscriptionId  String
  subscription    Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
  amount          Int
  currency        String       @default("eur")
  stripePaymentId String?      @unique
  status          String
  createdAt       DateTime     @default(now())
}

model Affiliate {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  code          String   @unique
  commission    Float    @default(0.2)
  status        AffiliateStatus @default(PENDING)
  totalEarnings Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  conversions   AffiliateConversion[]
  payouts       AffiliatePayout[]
}

model AffiliateConversion {
  id          String    @id @default(cuid())
  affiliateId String
  affiliate   Affiliate @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  amount      Int
  commission  Int
  referredEmail String?
  createdAt   DateTime  @default(now())
}

model AffiliatePayout {
  id          String       @id @default(cuid())
  affiliateId String
  affiliate   Affiliate    @relation(fields: [affiliateId], references: [id], onDelete: Cascade)
  amount      Int
  status      PayoutStatus @default(PENDING)
  paidAt      DateTime?
  createdAt   DateTime     @default(now())
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  message   String
  read      Boolean  @default(false)
  type      String   @default("info")
  createdAt DateTime @default(now())
}

model Task {
  id             String       @id @default(cuid())
  title          String
  description    String?
  status         TaskStatus   @default(TODO)
  priority       TaskPriority @default(MEDIUM)
  dueDate        DateTime?
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  assigneeId     String?
  assignee       User?        @relation("TaskAssignee", fields: [assigneeId], references: [id])
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

model ApiKey {
  id             String        @id @default(cuid())
  name           String
  keyHash        String
  prefix         String
  userId         String
  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  lastUsedAt     DateTime?
  expiresAt      DateTime?
  createdAt      DateTime      @default(now())
}

model AuditLog {
  id             String        @id @default(cuid())
  action         String
  entity         String
  entityId       String?
  metadata       Json?
  userId         String?
  user           User?         @relation(fields: [userId], references: [id])
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  ipAddress      String?
  createdAt      DateTime      @default(now())
}

model FeatureFlag {
  id          String   @id @default(cuid())
  key         String   @unique
  name        String
  description String?
  enabled     Boolean  @default(false)
  planMin     Plan?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Team {
  id             String       @id @default(cuid())
  name           String
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  members        TeamMember[]
  createdAt      DateTime     @default(now())
}

model TeamMember {
  id     String @id @default(cuid())
  teamId String
  team   Team   @relation(fields: [teamId], references: [id], onDelete: Cascade)
  userId String
  role   String @default("member")
  @@unique([teamId, userId])
}

model Invitation {
  id             String           @id @default(cuid())
  email          String
  organizationId String
  organization   Organization     @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  role           String           @default("member")
  token          String           @unique
  status         InvitationStatus @default(PENDING)
  expiresAt      DateTime
  createdAt      DateTime         @default(now())
}

model ChatMessage {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  roomId    String   @default("general")
  createdAt DateTime @default(now())
}

model Upload {
  id        String   @id @default(cuid())
  name      String
  url       String
  size      Int
  mimeType  String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model DeviceSession {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  device     String
  browser    String?
  ip         String?
  lastActive DateTime @default(now())
  createdAt  DateTime @default(now())
}
`;
}
function getPrismaSeed() {
  return `import { PrismaClient, Plan, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("senha123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nexly.app" },
    update: {},
    create: {
      email: "admin@nexly.app",
      name: "Admin Nexly",
      password,
      role: Role.SUPER_ADMIN,
      emailVerified: new Date(),
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@nexly.app" },
    update: {},
    create: {
      email: "demo@nexly.app",
      name: "Usuário Demo",
      password,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  const org = await prisma.organization.upsert({
    where: { slug: "nexly-demo" },
    update: {},
    create: {
      name: "Nexly Demo",
      slug: "nexly-demo",
      ownerId: demo.id,
      members: { create: { userId: demo.id, role: "owner" } },
      subscription: {
        create: {
          plan: Plan.PRO,
          status: "ACTIVE",
          stripeCustomerId: "cus_demo",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  await prisma.featureFlag.createMany({
    data: [
      { key: "affiliates", name: "Programa de Afiliados", enabled: true, planMin: Plan.PRO },
      { key: "api_access", name: "Acesso à API", enabled: true, planMin: Plan.BUSINESS },
      { key: "ai_assistant", name: "Assistente IA", enabled: true, planMin: Plan.PRO },
    ],
    skipDuplicates: true,
  });

  await prisma.task.createMany({
    data: [
      { title: "Configurar integração Stripe", organizationId: org.id, assigneeId: demo.id, status: "IN_PROGRESS", priority: "HIGH" },
      { title: "Convidar equipe", organizationId: org.id, assigneeId: demo.id, status: "TODO", priority: "MEDIUM" },
      { title: "Revisar analytics", organizationId: org.id, status: "TODO", priority: "LOW" },
    ],
  });

  await prisma.affiliate.upsert({
    where: { userId: demo.id },
    update: {},
    create: { userId: demo.id, code: "NEXLY20", status: "ACTIVE", commission: 0.2 },
  });

  console.log("Seed concluído:", { admin: admin.email, demo: demo.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
`;
}

function getDockerCompose() {
  return `services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: nexly
      POSTGRES_PASSWORD: nexly_secret
      POSTGRES_DB: nexly
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"

volumes:
  postgres_data:
`;
}

function getDockerfile() {
  return `FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
`;
}

function getEnvExample() {
  return `# Banco de dados
DATABASE_URL="postgresql://nexly:nexly_secret@localhost:5432/nexly?schema=public"

# NextAuth
AUTH_SECRET="gere-um-secret-aleatorio-aqui"
AUTH_URL="http://localhost:3000"

# OAuth (opcional)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# UploadThing
UPLOADTHING_TOKEN=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Nexly"
`;
}

function getReadme() {
  return `# Nexly

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

\`\`\`bash
cp .env.example .env
npm install
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000).

**Credenciais demo:** demo@nexly.app / senha123

## Scripts

- \`npm run dev\` — desenvolvimento
- \`npm run build\` — build de produção
- \`npm run db:studio\` — Prisma Studio
- \`npm run docker:up\` — sobe PostgreSQL e Redis

## Licença

Proprietário — Nexly © ${new Date().getFullYear()}
`;
}
function getGlobalsCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 239 84% 67%;
    --radius: 0.75rem;
    --glow: 239 84% 67%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 6%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 6%;
    --popover-foreground: 0 0% 98%;
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 50.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 239 84% 67%;
    --glow: 239 84% 67%;
  }
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .glass {
    @apply bg-background/60 backdrop-blur-xl border border-white/10 shadow-xl;
  }
  .glass-card {
    @apply glass rounded-2xl;
  }
  .gradient-text {
    @apply bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent;
  }
  .glow {
    box-shadow: 0 0 40px -10px hsl(var(--glow) / 0.5);
  }
  .grid-pattern {
    background-image: linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px);
    background-size: 48px 48px;
  }
}
`;
}

function getUtils() {
  return `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number, currency = "EUR") {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(cents / 100);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(date));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
`;
}

function getConstants() {
  return `import type { Plan } from "@prisma/client";

export const APP_NAME = "Nexly";
export const CURRENCY = "EUR";
export const LOCALE = "pt-BR";

export const PLANS = {
  STARTER: {
    id: "starter" as const,
    name: "Starter",
    price: 1900,
    priceLabel: "€19",
    interval: "mês",
    description: "Ideal para freelancers e pequenos projetos.",
    features: ["Até 3 usuários", "5 GB de armazenamento", "Suporte por e-mail", "Dashboard básico"],
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },
  PRO: {
    id: "pro" as const,
    name: "Pro",
    price: 4900,
    priceLabel: "€49",
    interval: "mês",
    description: "Para equipes em crescimento com programa de afiliados.",
    features: ["Até 15 usuários", "50 GB", "Afiliados 20%", "Analytics avançado", "Integrações"],
    stripePriceId: process.env.STRIPE_PRICE_PRO,
    affiliate: true,
  },
  BUSINESS: {
    id: "business" as const,
    name: "Business",
    price: 9900,
    priceLabel: "€99",
    interval: "mês",
    description: "Escala com API, SSO e prioridade no suporte.",
    features: ["Usuários ilimitados", "500 GB", "API completa", "SSO", "SLA 99.9%"],
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS,
  },
  ENTERPRISE: {
    id: "enterprise" as const,
    name: "Enterprise",
    price: 0,
    priceLabel: "Sob consulta",
    interval: "",
    description: "Solução customizada para grandes organizações.",
    features: ["Infra dedicada", "Contrato personalizado", "CSM dedicado", "Auditoria"],
    custom: true,
  },
} as const;

export const PLAN_ORDER: Plan[] = ["STARTER", "PRO", "BUSINESS", "ENTERPRISE"];

export const AFFILIATE_COMMISSION = 0.2;
`;
}

function getPrismaLib() {
  return `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
`;
}

function getStripeLib() {
  return `import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata,
}: {
  customerId?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}
`;
}
function getValidations() {
  return `import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
`;
}

function getAuthConfig() {
  return `import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user?.password) return null;
        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role?: string }).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
`;
}

function getMiddleware() {
  return `import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/verify-email", "/pricing"];
const authRoutes = ["/login", "/register", "/forgot-password"];
const adminRoutes = ["/admin"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublic = publicRoutes.some((r) => nextUrl.pathname === r || nextUrl.pathname.startsWith("/api/auth"));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdmin = adminRoutes.some((r) => nextUrl.pathname.startsWith(r));
  const role = (req.auth?.user as { role?: string })?.role;

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isPublic && !isLoggedIn && (nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAdmin && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
`;
}

function getI18n() {
  return `export const ptBR = {
  common: {
    appName: "Nexly",
    loading: "Carregando...",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    search: "Buscar",
    currency: "€",
  },
  nav: {
    features: "Recursos",
    pricing: "Preços",
    enterprise: "Enterprise",
    login: "Entrar",
    register: "Começar grátis",
    dashboard: "Painel",
  },
  hero: {
    title: "A plataforma SaaS que escala com você",
    subtitle: "Gerencie equipes, assinaturas e afiliados em um só lugar. Feito para o mercado europeu em euros.",
    cta: "Começar agora",
    ctaSecondary: "Ver demonstração",
  },
  pricing: {
    title: "Planos transparentes em euros",
    subtitle: "Sem surpresas. Cancele quando quiser.",
    perMonth: "/mês",
    custom: "Sob consulta",
    affiliateNote: "Programa de afiliados com 20% a partir do Pro",
  },
  auth: {
    login: "Entrar na sua conta",
    register: "Criar conta",
    forgotPassword: "Esqueceu a senha?",
    verifyEmail: "Verifique seu e-mail",
  },
  dashboard: {
    overview: "Visão geral",
    analytics: "Analytics",
    tasks: "Tarefas",
    team: "Equipe",
    billing: "Cobrança",
    settings: "Configurações",
    affiliates: "Afiliados",
  },
} as const;

export type Dictionary = typeof ptBR;
`;
}

function getStores() {
  return {
    ui: `"use client";
import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
`,
    toast: `"use client";
import { create } from "zustand";

export type ToastType = "default" | "success" | "error";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id: Math.random().toString(36).slice(2) }],
    })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
`,
  };
}
function getUiComponent(name) {
  const components = {
    button: `"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background/50 backdrop-blur hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(99,102,241,0.45)] hover:shadow-[0_0_32px_rgba(99,102,241,0.65)]",
      },
      size: { default: "h-10 px-4 py-2", sm: "h-9 px-3", lg: "h-11 px-8", icon: "h-10 w-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
`,
    card: `import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("glass-card text-card-foreground", className)} {...props} />
));
Card.displayName = "Card";
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
`,
    input: `import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-10 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm backdrop-blur ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
));
Input.displayName = "Input";
export { Input };
`,
    label: `"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
`,
    badge: `import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      outline: "text-foreground",
      success: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { Badge, badgeVariants };
`,
    avatar: `"use client";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
));
export { Avatar, AvatarImage, AvatarFallback };
`,
    skeleton: `import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}
export { Skeleton };
`,
  };
  return components[name] || "";
}

function getRemainingUi(name) {
  const map = {
    tabs: `"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn("inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)} {...props} />
));
const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className)} {...props} />
));
const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />
));
export { Tabs, TabsList, TabsTrigger, TabsContent };
`,
    accordion: `"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className)} {...props}>
      {children}<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
const AccordionContent = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
`,
    dialog: `"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out", className)} {...props} />
));
const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 glass-card p-6 shadow-lg duration-200", className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"><X className="h-4 w-4" /></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
`,
    dropdown: `"use client";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-lg glass-card p-1 shadow-md", className)} {...props} />
  </DropdownMenuPrimitive.Portal>
));
const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent", className)} {...props} />
));
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
`,
    switch: `"use client";
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root className={cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className)} {...props} ref={ref}>
    <SwitchPrimitive.Thumb className={cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")} />
  </SwitchPrimitive.Root>
));
export { Switch };
`,
    separator: `"use client";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root ref={ref} decorative={decorative} orientation={orientation} className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)} {...props} />
));
export { Separator };
`,
    progress: `"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
    <ProgressPrimitive.Indicator className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }} />
  </ProgressPrimitive.Root>
));
export { Progress };
`,
    toast: `"use client";
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToastStore } from "@/stores/toast-store";

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport ref={ref} className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)} {...props} />
));

export function Toaster() {
  const { toasts, removeToast } = useToastStore();
  return (
    <ToastProvider>
      {toasts.map((t) => (
        <ToastPrimitive.Root key={t.id} open onOpenChange={() => removeToast(t.id)} className="glass-card group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg">
          <div>
            <ToastPrimitive.Title className="text-sm font-semibold">{t.title}</ToastPrimitive.Title>
            {t.description && <ToastPrimitive.Description className="text-sm opacity-90">{t.description}</ToastPrimitive.Description>}
          </div>
          <ToastPrimitive.Close><X className="h-4 w-4" /></ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
export { ToastProvider, ToastViewport };
`,
  };
  return map[name] || "";
}
function getProviders() {
  return `"use client";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Toaster } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }));
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
`;
}

function getRootLayout() {
  return `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Nexly — Plataforma SaaS Premium", template: "%s | Nexly" },
  description: "Gerencie equipes, assinaturas e afiliados. SaaS em português com cobrança em euros.",
  keywords: ["SaaS", "Nexly", "gestão", "afiliados", "euros"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={\`\${inter.variable} font-sans min-h-screen\`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
`;
}

function getMarketingNavbar() {
  return `"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { ptBR } from "@/i18n/pt-BR";

const links = [
  { href: "#recursos", label: ptBR.nav.features },
  { href: "#precos", label: ptBR.nav.pricing },
  { href: "#enterprise", label: ptBR.nav.enterprise },
];

export function Navbar() {
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" asChild><Link href="/login">{ptBR.nav.login}</Link></Button>
          <Button variant="glow" asChild><Link href="/register">{ptBR.nav.register}</Link></Button>
        </div>
      </div>
    </motion.header>
  );
}
`;
}

function getMarketingHero() {
  return `"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientBg } from "@/components/shared/gradient-bg";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { ptBR } from "@/i18n/pt-BR";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <GradientBg />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">SaaS em € · pt-BR</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            <span className="gradient-text">{ptBR.hero.title}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{ptBR.hero.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton><Button variant="glow" size="lg" asChild><Link href="/register">{ptBR.hero.cta}</Link></Button></MagneticButton>
            <Button variant="outline" size="lg" asChild><Link href="#precos">{ptBR.hero.ctaSecondary}</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function getMarketingPricing() {
  return `"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/constants";
import { ptBR } from "@/i18n/pt-BR";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const planList = [PLANS.STARTER, PLANS.PRO, PLANS.BUSINESS, PLANS.ENTERPRISE];

export function Pricing() {
  return (
    <section id="precos" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center">{ptBR.pricing.title}</h2>
          <p className="text-muted-foreground text-center mt-2">{ptBR.pricing.subtitle}</p>
          <p className="text-sm text-primary text-center mt-2">{ptBR.pricing.affiliateNote}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {planList.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="h-full">
                <Card className={\`h-full relative \${plan.id === "pro" ? "border-primary glow" : ""}\`}>
                  {plan.id === "pro" && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Mais popular</Badge>}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.priceLabel}</span>
                      {!plan.custom && <span className="text-muted-foreground">{ptBR.pricing.perMonth}</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.id === "pro" ? "glow" : "outline"} asChild>
                      <Link href={plan.custom ? "/contact" : "/register"}>{plan.custom ? ptBR.pricing.custom : "Assinar"}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}
function getMarketingGeneric(name) {
  const sections = {
    features: `"use client";
import { Zap, Shield, Users, BarChart3, Globe, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: Zap, title: "Performance", desc: "Infraestrutura otimizada com edge e cache inteligente." },
  { icon: Shield, title: "Segurança", desc: "Criptografia, auditoria e conformidade GDPR." },
  { icon: Users, title: "Equipes", desc: "Convites, papéis e permissões granulares." },
  { icon: BarChart3, title: "Analytics", desc: "Métricas em tempo real e relatórios exportáveis." },
  { icon: Globe, title: "Multi-moeda", desc: "Cobrança em euros com Stripe integrado." },
  { icon: Sparkles, title: "IA integrada", desc: "Assistente inteligente para produtividade." },
];

export function Features() {
  return (
    <section id="recursos" className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal><h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Tudo que você precisa</h2></ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.05}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader><f.icon className="h-10 w-10 text-primary mb-2" /><CardTitle>{f.title}</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{f.desc}</p></CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    testimonials: `"use client";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  { name: "Ana Silva", role: "CEO, TechBR", text: "A Nexly transformou nossa operação. ROI em 3 meses.", avatar: "AS" },
  { name: "Carlos Mendes", role: "CTO, ScaleUp", text: "Integração Stripe impecável e suporte em português.", avatar: "CM" },
  { name: "Mariana Costa", role: "Founder", text: "O programa de afiliados pagou nosso marketing.", avatar: "MC" },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal><h2 className="text-3xl font-bold text-center mb-12">O que dizem nossos clientes</h2></ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <Card className="glass-card"><CardContent className="pt-6">
                <p className="text-muted-foreground italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 mt-4">
                  <Avatar><AvatarFallback>{t.avatar}</AvatarFallback></Avatar>
                  <div><p className="font-medium">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}</p></div>
                </div>
              </CardContent></Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    faq: `"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const faqs = [
  { q: "Posso cancelar a qualquer momento?", a: "Sim. Sem multas ou taxas de cancelamento." },
  { q: "Quais formas de pagamento?", a: "Cartão de crédito e débito via Stripe em euros." },
  { q: "Quando começa o programa de afiliados?", a: "A partir do plano Pro, com 20% de comissão recorrente." },
  { q: "Há período de teste?", a: "14 dias grátis em todos os planos pagos." },
];

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal><h2 className="text-3xl font-bold text-center mb-8">Perguntas frequentes</h2></ScrollReveal>
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
`,
    cta: `"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="container mx-auto px-4">
        <div className="glass-card glow rounded-3xl p-12 text-center bg-gradient-to-br from-primary/20 via-transparent to-fuchsia-500/10">
          <h2 className="text-3xl md:text-4xl font-bold">Pronto para escalar?</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Junte-se a centenas de empresas que confiam na Nexly.</p>
          <Button variant="glow" size="lg" className="mt-8" asChild><Link href="/register">Começar grátis</Link></Button>
        </div>
      </motion.div>
    </section>
  );
}
`,
    footer: `import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/pricing">Preços</Link>
          <Link href="/login">Entrar</Link>
          <Link href="#">Privacidade</Link>
          <Link href="#">Termos</Link>
        </nav>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Nexly. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
`,
    integrations: `"use client";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const logos = ["Stripe", "Slack", "Notion", "Zapier", "GitHub", "Google"];

export function Integrations() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal><p className="text-sm text-muted-foreground mb-8">Integrações nativas</p></ScrollReveal>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {logos.map((l) => (
            <span key={l} className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    "ai-section": `"use client";
import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AISection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4"><Sparkles className="h-4 w-4" /> IA Nexly</div>
          <h2 className="text-3xl md:text-4xl font-bold">Assistente inteligente embutido</h2>
          <p className="text-muted-foreground mt-4">Automatize tarefas, gere relatórios e obtenha insights com IA — disponível a partir do plano Pro.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Card className="glass-card glow">
            <CardHeader><CardTitle>Exemplo de prompt</CardTitle></CardHeader>
            <CardContent className="font-mono text-sm text-muted-foreground">
              &quot;Resuma as métricas de vendas deste mês e sugira 3 ações.&quot;
              <div className="mt-4 p-4 rounded-lg bg-muted/50 text-foreground">✓ Relatório gerado · 3 recomendações · Exportável em PDF</div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
`,
    enterprise: `"use client";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";

export function Enterprise() {
  return (
    <section id="enterprise" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl font-bold">Enterprise</h2>
          <p className="text-muted-foreground mt-4">Infra dedicada, SSO, SLA personalizado e suporte 24/7 para grandes organizações.</p>
          <Button variant="outline" size="lg" className="mt-8" asChild><Link href="/contact">Falar com vendas</Link></Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
`,
    individuals: `"use client";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function Individuals() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold">Para indivíduos e freelancers</h2>
          <p className="text-muted-foreground mt-4">Comece com o Starter por apenas €19/mês. Sem compromisso, upgrade quando precisar.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
`,
  };
  return sections[name] || "";
}

function getSharedComponent(name) {
  const map = {
    "theme-toggle": `"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Alternar tema">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
`,
    logo: `import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">N</span>
      <span className="gradient-text">Nexly</span>
    </Link>
  );
}
`,
    "animated-counter": `"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 75, damping: 15 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString("pt-BR"));
  const [text, setText] = useState("0");
  useEffect(() => { spring.set(value); const u = display.on("change", setText); return u; }, [value, spring, display]);
  return <motion.span>{text}{suffix}</motion.span>;
}
`,
    "magnetic-button": `"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div ref={ref} onMouseMove={(e) => {
      const el = ref.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px)\`;
    }} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className="inline-block">
      {children}
    </motion.div>
  );
}
`,
    "scroll-reveal": `"use client";
import { motion } from "framer-motion";

export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}
`,
    "gradient-bg": `"use client";
export function GradientBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px] animate-glow" />
    </div>
  );
}
`,
  };
  return map[name] || "";
}
function getDashboardSidebar() {
  return `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { useUIStore } from "@/stores/ui-store";
import {
  LayoutDashboard, BarChart3, CheckSquare, Calendar, Users, MessageSquare,
  Settings, CreditCard, Plug, Key, Share2,
} from "lucide-react";

const links = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Visão geral" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tarefas" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendário" },
  { href: "/dashboard/team", icon: Users, label: "Equipe" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Cobrança" },
  { href: "/dashboard/integrations", icon: Plug, label: "Integrações" },
  { href: "/dashboard/api-keys", icon: Key, label: "API Keys" },
  { href: "/dashboard/affiliates", icon: Share2, label: "Afiliados" },
  { href: "/dashboard/settings", icon: Settings, label: "Configurações" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();
  if (!sidebarOpen) return null;
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r glass h-screen sticky top-0">
      <div className="p-4 border-b"><Logo /></div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", pathname === l.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent")}>
            <l.icon className="h-4 w-4" />{l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
`;
}

function getDashboardHeader() {
  return `"use client";
import { signOut, useSession } from "next-auth/react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useUIStore } from "@/stores/ui-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { data: session } = useSession();
  const { toggleSidebar } = useUIStore();
  return (
    <header className="h-16 border-b glass flex items-center justify-between px-4 sticky top-0 z-40">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}><Menu className="h-5 w-5" /></Button>
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>{session?.user?.email}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
`;
}

function getDashboardStats() {
  return `"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { TrendingUp, Users, CreditCard, Activity } from "lucide-react";

const stats = [
  { title: "Receita (€)", value: 12450, icon: CreditCard, change: "+12%" },
  { title: "Usuários ativos", value: 842, icon: Users, change: "+8%" },
  { title: "Conversões", value: 156, icon: TrendingUp, change: "+23%" },
  { title: "Uptime", value: 99, icon: Activity, change: "99.9%", suffix: "%" },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
            <s.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
            <p className="text-xs text-emerald-500 mt-1">{s.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`;
}

function getDashboardCharts() {
  return `"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 4800 },
  { name: "Mai", value: 6000 },
  { name: "Jun", value: 5500 },
];

export function DashboardCharts() {
  return (
    <Card className="glass-card col-span-full lg:col-span-2">
      <CardHeader><CardTitle>Receita mensal (€)</CardTitle></CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
`;
}

function getDashboardLayout() {
  return `import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
`;
}

function getAdminLayout() {
  return `import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const links = [
  { href: "/admin", label: "Usuários" },
  { href: "/admin/subscriptions", label: "Assinaturas" },
  { href: "/admin/affiliates", label: "Afiliados" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/feature-flags", label: "Feature Flags" },
  { href: "/admin/logs", label: "Logs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 glass">
        <Logo />
        <nav className="mt-8 space-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">{l.label}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
`;
}
function getAuthPage(type) {
  const forms = {
    login: { title: "Entrar na sua conta", fields: "email,password", link: "/register", linkText: "Criar conta", action: "credentials" },
    register: { title: "Criar sua conta", fields: "name,email,password", link: "/login", linkText: "Já tem conta?", action: "register" },
    "forgot-password": { title: "Recuperar senha", fields: "email", link: "/login", linkText: "Voltar ao login", action: "forgot" },
    "verify-email": { title: "Verifique seu e-mail", fields: "", link: "/login", linkText: "Ir para login", action: "verify" },
  };
  const f = forms[type];
  return `"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { GradientBg } from "@/components/shared/gradient-bg";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    ${type === "login" ? `
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    if (res?.error) { setError("Credenciais inválidas"); setLoading(false); return; }
    router.push("/dashboard");
    ` : type === "register" ? `
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), password: fd.get("password") }),
    });
    if (!res.ok) { setError("Erro ao criar conta"); setLoading(false); return; }
    router.push("/login?registered=1");
    ` : `
  setLoading(false);
  return;
    `}
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <GradientBg />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8"><Logo /></div>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>${f.title}</CardTitle>
            <CardDescription>Nexly — plataforma SaaS em euros</CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              {error && <p className="text-sm text-destructive">{error}</p>}
              ${type === "register" ? '<div className="space-y-2"><Label htmlFor="name">Nome</Label><Input id="name" name="name" required /></div>' : ""}
              ${type !== "verify-email" ? '<div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>' : '<p className="text-muted-foreground text-sm">Enviamos um link de verificação para seu e-mail.</p>'}
              ${type === "login" || type === "register" ? '<div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" required /></div>' : ""}
              ${type === "login" ? '<Link href="/forgot-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>' : ""}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              ${type !== "verify-email" ? '<Button type="submit" className="w-full" variant="glow" disabled={loading}>{loading ? "Aguarde..." : "Continuar"}</Button>' : ""}
              <p className="text-sm text-muted-foreground text-center">
                <Link href="${f.link}" className="text-primary hover:underline">${f.linkText}</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
`;
}

function getDashboardPage(slug) {
  const titles = {
    "": "Visão geral",
    analytics: "Analytics",
    tasks: "Tarefas",
    calendar: "Calendário",
    team: "Equipe",
    chat: "Chat",
    settings: "Configurações",
    billing: "Cobrança",
    integrations: "Integrações",
    "api-keys": "Chaves de API",
    affiliates: "Programa de Afiliados",
  };
  const title = titles[slug] || slug;
  const extra = slug === "" ? `
import { DashboardStats } from "@/components/dashboard/stats";
import { DashboardCharts } from "@/components/dashboard/charts";
` : "";
  const body = slug === "" ? `
      <DashboardStats />
      <div className="grid gap-6 mt-6 lg:grid-cols-2">
        <DashboardCharts />
      </div>
  ` : slug === "affiliates" ? `
      <Card className="glass-card max-w-lg"><CardHeader><CardTitle>Comissão de 20%</CardTitle><CardDescription>Disponível a partir do plano Pro. Compartilhe seu link e ganhe em euros.</CardDescription></CardHeader><CardContent><p className="font-mono text-lg">https://nexly.app/?ref=SEU_CODIGO</p></CardContent></Card>
  ` : slug === "billing" ? `
      <Card className="glass-card"><CardHeader><CardTitle>Plano Pro — €49/mês</CardTitle></CardHeader><CardContent><Button variant="glow">Gerenciar no Stripe</Button></CardContent></Card>
  ` : `
      <Card className="glass-card"><CardContent className="pt-6"><p className="text-muted-foreground">Conteúdo de ${title} em desenvolvimento.</p></CardContent></Card>
  `;
  return `${slug === "" ? extra : 'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";\nimport { Button } from "@/components/ui/button";\n'}
export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">${title}</h1>
      ${body}
    </div>
  );
}
`;
}

function getAdminPage(slug) {
  const titles = { "": "Usuários", subscriptions: "Assinaturas", affiliates: "Afiliados", analytics: "Analytics", "feature-flags": "Feature Flags", logs: "Logs de auditoria" };
  const title = titles[slug] || slug;
  return `export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      <div className="glass-card rounded-xl border p-6">
        <p className="text-muted-foreground">Painel administrativo Nexly — ${title}</p>
      </div>
    </div>
  );
}
`;
}

function getLandingPage() {
  return `import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Integrations } from "@/components/marketing/integrations";
import { Features } from "@/components/marketing/features";
import { AISection } from "@/components/marketing/ai-section";
import { Individuals } from "@/components/marketing/individuals";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { Enterprise } from "@/components/marketing/enterprise";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Integrations />
        <Features />
        <AISection />
        <Individuals />
        <Pricing />
        <Testimonials />
        <Enterprise />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
`;
}

function getMarketingLayout() {
  return `export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
}

function getApiRoutes() {
  return {
    auth: `import { handlers } from "@/auth";
export const { GET, POST } = handlers;
`,
    register: `import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
    const password = await bcrypt.hash(parsed.data.password, 12);
    await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email, password } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
`,
    stripe: `import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.organizationId) {
      await prisma.subscription.update({
        where: { organizationId: session.metadata.organizationId },
        data: { status: "ACTIVE", stripeSubscriptionId: session.subscription as string },
      });
    }
  }
  return NextResponse.json({ received: true });
}
`,
    uploadthing: `import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Não autorizado");
      return { userId: session.user.id! };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completo", metadata.userId, file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
`,
    uploadthingRoute: `import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
`,
  };
}

function getSitemap() {
  return `import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const routes = ["", "/login", "/register", "/pricing", "/dashboard"];
  return routes.map((route) => ({
    url: \`\${base}\${route}\`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
`;
}

function getRobots() {
  return `import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/admin/", "/api/"] },
    sitemap: \`\${base}/sitemap.xml\`,
  };
}
`;
}

function getPublicRobots() {
  return `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /admin/
Disallow: /api/

Sitemap: http://localhost:3000/sitemap.xml
`;
}

function getGitignore() {
  return `node_modules
.next
.env
.env.local
dist
*.log
.DS_Store
coverage
.vercel
`;
}

function getAuthTypes() {
  return `import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id: string; role?: string };
  }
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
`;
}

function getAuthLayout() {
  return `export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
}

function buildAllFiles() {
  const files = {};
  const set = (path, content) => { files[path] = content; };

  set("package.json", getPackageJson());
  set("tsconfig.json", getTsConfig());
  set("next.config.ts", getNextConfig());
  set("tailwind.config.ts", getTailwindConfig());
  set("postcss.config.mjs", `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`);
  set("eslint.config.mjs", getEslintConfig());
  set("components.json", getComponentsJson());
  set("next-env.d.ts", getNextEnv());
  set(".gitignore", getGitignore());
  set("prisma/schema.prisma", getPrismaSchema());
  set("prisma/seed.ts", getPrismaSeed());
  set("docker-compose.yml", getDockerCompose());
  set("Dockerfile", getDockerfile());
  set(".env.example", getEnvExample());
  set("README.md", getReadme());

  set("src/app/globals.css", getGlobalsCss());
  set("src/app/layout.tsx", getRootLayout());
  set("src/components/providers.tsx", getProviders());
  set("src/lib/utils.ts", getUtils());
  set("src/lib/constants.ts", getConstants());
  set("src/lib/prisma.ts", getPrismaLib());
  set("src/lib/stripe.ts", getStripeLib());
  set("src/lib/validations.ts", getValidations());
  set("src/auth.ts", getAuthConfig());
  set("src/middleware.ts", getMiddleware());
  set("src/i18n/pt-BR.ts", getI18n());
  set("src/types/next-auth.d.ts", getAuthTypes());

  const stores = getStores();
  set("src/stores/ui-store.ts", stores.ui);
  set("src/stores/toast-store.ts", stores.toast);

  const uiNames = ["button", "card", "input", "label", "badge", "avatar", "skeleton"];
  const uiNames2 = ["tabs", "accordion", "dialog", "dropdown", "switch", "separator", "progress", "toast"];
  for (const n of uiNames) set(`src/components/ui/${n}.tsx`, getUiComponent(n));
  for (const n of uiNames2) set(`src/components/ui/${n}.tsx`, getRemainingUi(n));

  const marketing = ["navbar", "hero", "features", "pricing", "testimonials", "faq", "cta", "footer", "integrations", "ai-section", "enterprise", "individuals"];
  set("src/components/marketing/navbar.tsx", getMarketingNavbar());
  set("src/components/marketing/hero.tsx", getMarketingHero());
  set("src/components/marketing/pricing.tsx", getMarketingPricing());
  for (const n of marketing.filter((x) => !["navbar", "hero", "pricing"].includes(x))) {
    set(`src/components/marketing/${n}.tsx`, getMarketingGeneric(n));
  }

  const shared = ["theme-toggle", "logo", "animated-counter", "magnetic-button", "scroll-reveal", "gradient-bg"];
  for (const n of shared) set(`src/components/shared/${n}.tsx`, getSharedComponent(n));

  set("src/components/dashboard/sidebar.tsx", getDashboardSidebar());
  set("src/components/dashboard/header.tsx", getDashboardHeader());
  set("src/components/dashboard/stats.tsx", getDashboardStats());
  set("src/components/dashboard/charts.tsx", getDashboardCharts());

  set("src/app/(marketing)/layout.tsx", getMarketingLayout());
  set("src/app/(auth)/layout.tsx", getAuthLayout());
  set("src/app/(marketing)/page.tsx", getLandingPage());

  for (const t of ["login", "register", "forgot-password", "verify-email"]) {
    set(`src/app/(auth)/${t}/page.tsx`, getAuthPage(t));
  }

  set("src/app/(dashboard)/layout.tsx", getDashboardLayout());
  const dashPages = ["", "analytics", "tasks", "calendar", "team", "chat", "settings", "billing", "integrations", "api-keys", "affiliates"];
  for (const slug of dashPages) {
    const path = slug ? `src/app/(dashboard)/dashboard/${slug}/page.tsx` : "src/app/(dashboard)/dashboard/page.tsx";
    set(path, getDashboardPage(slug));
  }

  set("src/app/(admin)/layout.tsx", getAdminLayout());
  const adminPages = ["", "subscriptions", "affiliates", "analytics", "feature-flags", "logs"];
  for (const slug of adminPages) {
    const path = slug ? `src/app/(admin)/admin/${slug}/page.tsx` : "src/app/(admin)/admin/page.tsx";
    set(path, getAdminPage(slug));
  }

  const api = getApiRoutes();
  set("src/app/api/auth/[...nextauth]/route.ts", api.auth);
  set("src/app/api/auth/register/route.ts", api.register);
  set("src/app/api/stripe/webhook/route.ts", api.stripe);
  set("src/app/api/uploadthing/core.ts", api.uploadthing);
  set("src/app/api/uploadthing/route.ts", api.uploadthingRoute);

  set("src/app/sitemap.ts", getSitemap());
  set("src/app/robots.ts", getRobots());
  set("public/robots.txt", getPublicRobots());

  return files;
}

async function main() {
  console.log("\n🚀 Gerando projeto Nexly em:", ROOT, "\n");
  const files = buildAllFiles();
  let count = 0;
  for (const [path, content] of Object.entries(files)) {
    await write(path, content);
    count++;
  }
  console.log(`\n✅ ${count} arquivos gerados com sucesso!`);
  console.log("\nPróximos passos:");
  console.log("  cp .env.example .env");
  console.log("  npm install");
  console.log("  docker compose up -d");
  console.log("  npm run db:push && npm run db:seed");
  console.log("  npm run dev\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
