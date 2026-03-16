# 🚀 SUPER MEGA PROMPT — AI Agency OS

> Copia y pega esto en Cursor Editor (Agent Mode) para construir el SaaS completo.

---

```
Eres un ingeniero de software senior full-stack experto en Next.js 15, TypeScript, PostgreSQL y sistemas SaaS. Tu misión es construir "AI Agency OS" — el sistema operativo completo para agencias de marketing y diseño. Gestión de clientes, proyectos, facturación e IA integrada, todo en uno.

═══════════════════════════════════════════════════════════════
CONTEXTO DEL PRODUCTO
═══════════════════════════════════════════════════════════════

AI Agency OS es un SaaS B2B dirigido a freelancers y agencias pequeñas (+50M en el mundo). Precio: $50–$199/mes. El diferenciador clave es IA real integrada en cada módulo (no solo un chatbot genérico). Cuando una agencia mete sus clientes, facturas y proyectos, nunca se va — alto churn defense.

Módulos principales:
1. CLIENT HUB     — CRM con historial, archivos, notas y AI que resume cada relación
2. PROJECT BOARD  — Kanban/timeline con time tracking. AI que detecta retrasos y avisa
3. FINANCE HUB    — Propuestas con AI, facturas, firma digital, Stripe integrado, cobro automático
4. AI COPILOT     — Redacta emails, propuestas, briefs. Analiza proyectos. Sugiere precios. Habla con clientes

═══════════════════════════════════════════════════════════════
STACK TECNOLÓGICO (NO NEGOCIABLE)
═══════════════════════════════════════════════════════════════

- Framework:      Next.js 15 (App Router, Server Components, Server Actions)
- Lenguaje:       TypeScript (strict mode, sin any)
- Base de datos:  PostgreSQL con Drizzle ORM
- Auth:           Clerk (multi-tenant, organizations)
- IA:             Anthropic Claude API (claude-3-5-sonnet-20241022)
- Pagos:          Stripe (subscriptions + invoicing)
- Email:          Resend + React Email
- Archivos:       UploadThing
- UI:             Shadcn/ui + Tailwind CSS + Framer Motion
- Deploy:         Vercel (edge functions donde aplique)
- Validación:     Zod (schemas compartidos front/back)
- Estado:         Zustand (cliente) + React Query (server state)
- Formularios:    React Hook Form + Zod resolver

═══════════════════════════════════════════════════════════════
PASO 1 — INICIALIZACIÓN DEL PROYECTO
═══════════════════════════════════════════════════════════════

Ejecuta en orden:

```bash
npx create-next-app@latest ai-agency-os \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd ai-agency-os

# Instalar dependencias core
npm install drizzle-orm @vercel/postgres drizzle-kit \
  @clerk/nextjs \
  @anthropic-ai/sdk \
  stripe @stripe/stripe-js \
  resend @react-email/components \
  uploadthing @uploadthing/react \
  zod react-hook-form @hookform/resolvers \
  zustand @tanstack/react-query \
  framer-motion \
  date-fns \
  lucide-react \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-select \
  @radix-ui/react-tabs \
  @radix-ui/react-tooltip \
  @radix-ui/react-avatar \
  @radix-ui/react-badge \
  @radix-ui/react-progress \
  @radix-ui/react-separator \
  @radix-ui/react-sheet \
  class-variance-authority clsx tailwind-merge \
  next-themes

# Shadcn/ui init
npx shadcn@latest init
npx shadcn@latest add button card input label textarea select dialog sheet tabs badge avatar progress separator dropdown-menu tooltip skeleton toast
```

═══════════════════════════════════════════════════════════════
PASO 2 — VARIABLES DE ENTORNO (.env.local)
═══════════════════════════════════════════════════════════════

Crea el archivo `.env.local` con esta estructura:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# PostgreSQL (Vercel Postgres o Neon)
POSTGRES_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_AGENCY_PRICE_ID=price_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@aiagencyos.com

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

═══════════════════════════════════════════════════════════════
PASO 3 — ARQUITECTURA DE CARPETAS
═══════════════════════════════════════════════════════════════

Crea exactamente esta estructura:

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                    ← Sidebar + Header
│   │   ├── dashboard/page.tsx            ← Home con métricas
│   │   ├── clients/
│   │   │   ├── page.tsx                  ← Lista de clientes
│   │   │   ├── new/page.tsx
│   │   │   └── [clientId]/
│   │   │       ├── page.tsx              ← Detalle cliente
│   │   │       ├── projects/page.tsx
│   │   │       ├── invoices/page.tsx
│   │   │       └── notes/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx                  ← Board / Lista
│   │   │   ├── new/page.tsx
│   │   │   └── [projectId]/
│   │   │       ├── page.tsx              ← Kanban board
│   │   │       ├── timeline/page.tsx
│   │   │       └── time-tracking/page.tsx
│   │   ├── finance/
│   │   │   ├── page.tsx                  ← Dashboard finanzas
│   │   │   ├── invoices/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [invoiceId]/page.tsx
│   │   │   ├── proposals/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [proposalId]/page.tsx
│   │   │   └── subscriptions/page.tsx
│   │   ├── ai-copilot/page.tsx           ← Chat con AI
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── billing/page.tsx
│   │       └── team/page.tsx
│   ├── (public)/
│   │   ├── p/[proposalId]/page.tsx       ← Propuesta pública (firma digital)
│   │   └── inv/[invoiceId]/page.tsx      ← Factura pública (pago)
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts
│   │   │   └── clerk/route.ts
│   │   ├── uploadthing/route.ts
│   │   └── ai/
│   │       ├── copilot/route.ts          ← Streaming chat
│   │       ├── summarize-client/route.ts
│   │       ├── generate-proposal/route.ts
│   │       └── detect-delays/route.ts
│   ├── globals.css
│   └── layout.tsx                        ← Root: ClerkProvider + QueryProvider + ThemeProvider
├── components/
│   ├── ui/                               ← Shadcn components
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   ├── clients/
│   │   ├── client-card.tsx
│   │   ├── client-form.tsx
│   │   ├── client-list.tsx
│   │   ├── client-ai-summary.tsx
│   │   └── client-activity-feed.tsx
│   ├── projects/
│   │   ├── kanban-board.tsx
│   │   ├── kanban-column.tsx
│   │   ├── kanban-card.tsx
│   │   ├── project-form.tsx
│   │   ├── time-tracker.tsx
│   │   └── ai-delay-alert.tsx
│   ├── finance/
│   │   ├── invoice-builder.tsx
│   │   ├── invoice-preview.tsx
│   │   ├── proposal-builder.tsx
│   │   ├── proposal-preview.tsx
│   │   ├── signature-pad.tsx
│   │   └── payment-status.tsx
│   ├── ai/
│   │   ├── copilot-chat.tsx
│   │   ├── message-bubble.tsx
│   │   ├── ai-suggestions.tsx
│   │   └── streaming-text.tsx
│   └── shared/
│       ├── empty-state.tsx
│       ├── loading-skeleton.tsx
│       ├── confirm-dialog.tsx
│       ├── data-table.tsx
│       └── stats-card.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts                      ← Drizzle instance
│   │   ├── schema.ts                     ← Todo el schema SQL
│   │   └── migrations/
│   ├── actions/                          ← Server Actions
│   │   ├── clients.ts
│   │   ├── projects.ts
│   │   ├── tasks.ts
│   │   ├── invoices.ts
│   │   ├── proposals.ts
│   │   └── time-entries.ts
│   ├── ai/
│   │   ├── client.ts                     ← Anthropic client
│   │   ├── prompts.ts                    ← Todos los system prompts
│   │   └── tools.ts                      ← AI tools/functions
│   ├── stripe/
│   │   ├── client.ts
│   │   └── plans.ts
│   ├── email/
│   │   ├── templates/
│   │   │   ├── invoice.tsx
│   │   │   ├── proposal.tsx
│   │   │   └── reminder.tsx
│   │   └── send.ts
│   ├── uploadthing.ts
│   ├── utils.ts
│   └── validations/
│       ├── client.ts
│       ├── project.ts
│       ├── invoice.ts
│       └── proposal.ts
├── hooks/
│   ├── use-clients.ts
│   ├── use-projects.ts
│   ├── use-invoices.ts
│   ├── use-ai-stream.ts
│   └── use-time-tracker.ts
└── types/
    └── index.ts
```

═══════════════════════════════════════════════════════════════
PASO 4 — SCHEMA DE BASE DE DATOS (src/lib/db/schema.ts)
═══════════════════════════════════════════════════════════════

Implementa este schema completo con Drizzle ORM:

```typescript
import { pgTable, text, timestamp, integer, decimal, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// ─── ENUMS ───────────────────────────────────────────────────
export const clientStatusEnum = pgEnum('client_status', ['lead', 'active', 'inactive', 'churned'])
export const projectStatusEnum = pgEnum('project_status', ['planning', 'active', 'paused', 'completed', 'cancelled'])
export const taskStatusEnum = pgEnum('task_status', ['backlog', 'todo', 'in_progress', 'in_review', 'done'])
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent'])
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled'])
export const proposalStatusEnum = pgEnum('proposal_status', ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'])
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'cancelled', 'trialing'])

// ─── ORGANIZATIONS (Clerk sync) ───────────────────────────────
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clerkOrgId: text('clerk_org_id').unique().notNull(),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  logoUrl: text('logo_url'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('trialing'),
  planId: text('plan_id').default('starter'),
  trialEndsAt: timestamp('trial_ends_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── USERS ────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clerkUserId: text('clerk_user_id').unique().notNull(),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  role: text('role').default('member'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── CLIENTS ──────────────────────────────────────────────────
export const clients = pgTable('clients', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  website: text('website'),
  avatarUrl: text('avatar_url'),
  status: clientStatusEnum('status').default('active'),
  industry: text('industry'),
  address: jsonb('address'),
  tags: text('tags').array().default([]),
  notes: text('notes'),
  aiSummary: text('ai_summary'),
  aiSummaryUpdatedAt: timestamp('ai_summary_updated_at'),
  totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── CLIENT NOTES ─────────────────────────────────────────────
export const clientNotes = pgTable('client_notes', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clientId: text('client_id').references(() => clients.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  type: text('type').default('note'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── CLIENT FILES ─────────────────────────────────────────────
export const clientFiles = pgTable('client_files', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clientId: text('client_id').references(() => clients.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  size: integer('size'),
  mimeType: text('mime_type'),
  uploadedBy: text('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── PROJECTS ─────────────────────────────────────────────────
export const projects = pgTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  description: text('description'),
  status: projectStatusEnum('status').default('planning'),
  color: text('color').default('#6366f1'),
  startDate: timestamp('start_date'),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  hourlyRate: decimal('hourly_rate', { precision: 8, scale: 2 }),
  estimatedHours: decimal('estimated_hours', { precision: 8, scale: 2 }),
  loggedHours: decimal('logged_hours', { precision: 8, scale: 2 }).default('0'),
  aiRiskScore: integer('ai_risk_score'),
  aiRiskReason: text('ai_risk_reason'),
  aiLastAnalyzedAt: timestamp('ai_last_analyzed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── TASKS ────────────────────────────────────────────────────
export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  assigneeId: text('assignee_id').references(() => users.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').default('todo'),
  priority: taskPriorityEnum('priority').default('medium'),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  estimatedMinutes: integer('estimated_minutes'),
  loggedMinutes: integer('logged_minutes').default(0),
  order: integer('order').default(0),
  tags: text('tags').array().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── TIME ENTRIES ─────────────────────────────────────────────
export const timeEntries = pgTable('time_entries', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  taskId: text('task_id').references(() => tasks.id, { onDelete: 'set null' }),
  userId: text('user_id').references(() => users.id).notNull(),
  description: text('description'),
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
  minutes: integer('minutes'),
  billable: boolean('billable').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── INVOICES ─────────────────────────────────────────────────
export const invoices = pgTable('invoices', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'set null' }),
  number: text('number').notNull(),
  status: invoiceStatusEnum('status').default('draft'),
  title: text('title'),
  issueDate: timestamp('issue_date').notNull(),
  dueDate: timestamp('due_date').notNull(),
  items: jsonb('items').notNull().default([]),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull().default('0'),
  tax: decimal('tax', { precision: 5, scale: 2 }).default('0'),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0'),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0'),
  currency: text('currency').default('USD'),
  notes: text('notes'),
  terms: text('terms'),
  stripePaymentLinkId: text('stripe_payment_link_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  paidAt: timestamp('paid_at'),
  sentAt: timestamp('sent_at'),
  viewedAt: timestamp('viewed_at'),
  reminderSentAt: timestamp('reminder_sent_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── PROPOSALS ────────────────────────────────────────────────
export const proposals = pgTable('proposals', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  status: proposalStatusEnum('status').default('draft'),
  content: jsonb('content').notNull().default({}),
  total: decimal('total', { precision: 10, scale: 2 }),
  validUntil: timestamp('valid_until'),
  signedAt: timestamp('signed_at'),
  signatureData: text('signature_data'),
  signerName: text('signer_name'),
  signerEmail: text('signer_email'),
  sentAt: timestamp('sent_at'),
  viewedAt: timestamp('viewed_at'),
  convertedToInvoiceId: text('converted_to_invoice_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── AI CONVERSATIONS ─────────────────────────────────────────
export const aiConversations = pgTable('ai_conversations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  title: text('title'),
  context: text('context'),
  messages: jsonb('messages').notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── RELATIONS ────────────────────────────────────────────────
export const clientsRelations = relations(clients, ({ many }) => ({
  notes: many(clientNotes),
  files: many(clientFiles),
  projects: many(projects),
  invoices: many(invoices),
  proposals: many(proposals),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(clients, { fields: [projects.clientId], references: [clients.id] }),
  tasks: many(tasks),
  timeEntries: many(timeEntries),
  invoices: many(invoices),
}))

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
  assignee: one(users, { fields: [tasks.assigneeId], references: [users.id] }),
  timeEntries: many(timeEntries),
}))
```

═══════════════════════════════════════════════════════════════
PASO 5 — SISTEMA DE AUTENTICACIÓN Y MULTI-TENANCY
═══════════════════════════════════════════════════════════════

### src/app/layout.tsx (Root Layout)
```typescript
import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### src/middleware.ts
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/p/(.*)',       // Propuestas públicas
  '/inv/(.*)',     // Facturas públicas
  '/api/webhooks/(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
}
```

═══════════════════════════════════════════════════════════════
PASO 6 — DASHBOARD LAYOUT CON SIDEBAR
═══════════════════════════════════════════════════════════════

### src/components/layout/sidebar.tsx
Implementa un sidebar colapsable con:
- Logo "AI Agency OS" con badge del plan actual
- Navegación principal con iconos (Lucide):
  - Dashboard → LayoutDashboard
  - Clientes → Users
  - Proyectos → FolderKanban
  - Finanzas → DollarSign
  - AI Copilot → Sparkles (con badge "AI")
  - Configuración → Settings
- Footer con UserButton de Clerk y toggle de tema
- En mobile: Sheet que se abre desde el Header
- Indicador de uso del plan (clientes/proyectos usados vs límite)

### src/app/(dashboard)/layout.tsx
```typescript
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserOrganization } from '@/lib/actions/organizations'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  
  const org = await getUserOrganization(userId)
  if (!org) redirect('/onboarding')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar organization={org} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

═══════════════════════════════════════════════════════════════
PASO 7 — MÓDULO CLIENT HUB (COMPLETO)
═══════════════════════════════════════════════════════════════

### src/lib/actions/clients.ts (Server Actions)
```typescript
'use server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { clients, clientNotes, clientFiles } from '@/lib/db/schema'
import { eq, and, desc, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { clientSchema } from '@/lib/validations/client'
import Anthropic from '@anthropic-ai/sdk'

export async function getClients(search?: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error('Unauthorized')
  
  const query = db.select().from(clients)
    .where(search 
      ? and(eq(clients.organizationId, orgId), ilike(clients.name, `%${search}%`))
      : eq(clients.organizationId, orgId)
    )
    .orderBy(desc(clients.updatedAt))
  
  return query
}

export async function createClient(data: unknown) {
  const { orgId, userId } = await auth()
  if (!orgId || !userId) throw new Error('Unauthorized')
  
  const validated = clientSchema.parse(data)
  const [client] = await db.insert(clients).values({
    ...validated,
    organizationId: orgId,
  }).returning()
  
  revalidatePath('/clients')
  return client
}

export async function generateClientAISummary(clientId: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error('Unauthorized')
  
  const client = await db.query.clients.findFirst({
    where: and(eq(clients.id, clientId), eq(clients.organizationId, orgId)),
    with: {
      notes: { orderBy: desc(clientNotes.createdAt), limit: 20 },
      projects: true,
      invoices: { limit: 10 },
    }
  })
  if (!client) throw new Error('Client not found')
  
  const anthropic = new Anthropic()
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    system: `Eres un asistente de CRM para agencias. Analiza la información del cliente y genera un resumen ejecutivo conciso en 3-4 párrafos que incluya: estado de la relación, proyectos activos, historial de pagos, próximas acciones recomendadas. Usa un tono profesional pero directo.`,
    messages: [{
      role: 'user',
      content: `Analiza este cliente: ${JSON.stringify(client)}`
    }]
  })
  
  const summary = message.content[0].type === 'text' ? message.content[0].text : ''
  await db.update(clients)
    .set({ aiSummary: summary, aiSummaryUpdatedAt: new Date() })
    .where(eq(clients.id, clientId))
  
  revalidatePath(`/clients/${clientId}`)
  return summary
}
```

### src/app/(dashboard)/clients/page.tsx
Implementa una página con:
- Header con título "Clientes" + botón "Nuevo cliente"
- SearchBar para filtrar en tiempo real
- Grid de ClientCards (responsive: 1col mobile, 2col tablet, 3col desktop)
- Cada ClientCard muestra: avatar, nombre, empresa, status badge de color, revenue total, proyectos activos, última actividad
- Empty state con ilustración si no hay clientes
- Loading skeleton mientras carga

### src/app/(dashboard)/clients/[clientId]/page.tsx
Implementa el detalle del cliente con:
- Header con avatar grande, info básica, botones de acción (Editar, Nueva factura, Nuevo proyecto)
- AI Summary card con botón "Regenerar resumen" y texto generado por Claude
- Tabs: Overview | Proyectos | Facturas | Notas | Archivos
- Activity feed cronológico (notas, facturas, proyectos)
- Quick stats: Revenue total, Proyectos activos, Facturas pendientes, Último contacto

═══════════════════════════════════════════════════════════════
PASO 8 — MÓDULO PROJECT BOARD (KANBAN + AI)
═══════════════════════════════════════════════════════════════

### src/components/projects/kanban-board.tsx
Implementa un Kanban board con:
- Columnas: Backlog | Todo | En progreso | En revisión | Hecho
- Drag & drop con @hello-pangea/dnd (instalar)
- Cada card muestra: título, prioridad (color), assignee avatar, fecha límite, tiempo logueado vs estimado
- Cards con color de prioridad: urgent=rojo, high=naranja, medium=amarillo, low=verde
- Botón "+ Tarea" en cada columna
- Contador de tareas por columna
- Indicador de retraso con ícono de warning si la fecha límite pasó

### AI Delay Detection - src/lib/actions/projects.ts
```typescript
export async function analyzeProjectRisk(projectId: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error('Unauthorized')
  
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.organizationId, orgId)),
    with: {
      tasks: true,
      timeEntries: { orderBy: desc(timeEntries.startedAt), limit: 50 },
      client: true,
    }
  })
  
  const overdueTasks = project.tasks.filter(t => 
    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
  )
  const completionRate = project.tasks.length > 0
    ? project.tasks.filter(t => t.status === 'done').length / project.tasks.length
    : 0
  
  const anthropic = new Anthropic()
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    system: `Eres un PM experto. Analiza el estado de un proyecto y devuelve JSON con: { riskScore: number (0-100), riskLevel: 'low'|'medium'|'high'|'critical', reason: string (max 100 chars), recommendations: string[] (max 3 items) }`,
    messages: [{
      role: 'user',
      content: `Proyecto: ${project.name}. Fecha límite: ${project.dueDate}. Tareas vencidas: ${overdueTasks.length}. Completado: ${Math.round(completionRate * 100)}%. Horas logueadas: ${project.loggedHours} de ${project.estimatedHours} estimadas.`
    }]
  })
  
  const analysis = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}')
  await db.update(projects)
    .set({ 
      aiRiskScore: analysis.riskScore, 
      aiRiskReason: analysis.reason,
      aiLastAnalyzedAt: new Date()
    })
    .where(eq(projects.id, projectId))
  
  revalidatePath(`/projects/${projectId}`)
  return analysis
}
```

### Time Tracker Component
Implementa un timer con:
- Botón play/pause/stop
- Display de tiempo en formato HH:MM:SS que corre en tiempo real
- Selector de proyecto y tarea
- Campo de descripción
- Historial de entradas del día actual
- Total de horas del día

═══════════════════════════════════════════════════════════════
PASO 9 — MÓDULO FINANCE HUB (FACTURAS + PROPUESTAS)
═══════════════════════════════════════════════════════════════

### Invoice Builder - src/components/finance/invoice-builder.tsx
Implementa un builder de facturas con:
- Formulario: cliente (select), número auto-generado, fecha emisión, fecha vencimiento
- Line items dinámicos: descripción, cantidad, precio unitario, total = cantidad × precio
- Cálculo automático: subtotal, impuesto (%), descuento, total
- Preview en tiempo real al lado derecho (desktop) o modal (mobile)
- Botones: Guardar borrador | Enviar por email | Crear link de pago Stripe

### Stripe Integration - src/lib/actions/invoices.ts
```typescript
export async function createStripePaymentLink(invoiceId: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error('Unauthorized')
  
  const invoice = await db.query.invoices.findFirst({
    where: and(eq(invoices.id, invoiceId), eq(invoices.organizationId, orgId)),
    with: { client: true }
  })
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{
      price_data: {
        currency: invoice.currency?.toLowerCase() ?? 'usd',
        product_data: { name: `Factura ${invoice.number}` },
        unit_amount: Math.round(Number(invoice.total) * 100),
      },
      quantity: 1,
    }],
    metadata: { invoiceId: invoice.id, orgId },
    after_completion: {
      type: 'redirect',
      redirect: { url: `${process.env.NEXT_PUBLIC_APP_URL}/inv/${invoice.id}?paid=true` }
    }
  })
  
  await db.update(invoices)
    .set({ stripePaymentLinkId: paymentLink.url, status: 'sent', sentAt: new Date() })
    .where(eq(invoices.id, invoiceId))
  
  // Enviar email con Resend
  await sendInvoiceEmail(invoice, paymentLink.url)
  
  revalidatePath('/finance/invoices')
  return paymentLink.url
}
```

### AI Proposal Generator
```typescript
export async function generateProposalWithAI(params: {
  clientId: string
  projectDescription: string
  budget: number
  timeline: string
}) {
  const { orgId } = await auth()
  if (!orgId) throw new Error('Unauthorized')
  
  const client = await db.query.clients.findFirst({
    where: and(eq(clients.id, params.clientId), eq(clients.organizationId, orgId)),
    with: { projects: { limit: 3 } }
  })
  
  const anthropic = new Anthropic()
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: `Eres un experto en propuestas de agencias creativas. Genera propuestas profesionales, persuasivas y detalladas en formato JSON. Estructura: { executive_summary, problem_statement, proposed_solution, scope_of_work: [{phase, deliverables, timeline}], pricing_breakdown: [{item, description, price}], terms_and_conditions, next_steps }`,
    messages: [{
      role: 'user',
      content: `Cliente: ${client?.name} (${client?.company}). Proyecto: ${params.projectDescription}. Presupuesto: $${params.budget}. Timeline: ${params.timeline}. Proyectos anteriores: ${client?.projects?.map(p => p.name).join(', ')}`
    }]
  })
  
  return JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}')
}
```

### Digital Signature - src/components/finance/signature-pad.tsx
Implementa un pad de firma digital con:
- Canvas HTML5 para dibujar firma
- Botón limpiar
- Exportar como base64 PNG
- Integrar en página pública `/p/[proposalId]`
- Al firmar: guardar en DB, cambiar status a 'accepted', enviar email de confirmación

═══════════════════════════════════════════════════════════════
PASO 10 — AI COPILOT (CHAT STREAMING)
═══════════════════════════════════════════════════════════════

### API Route - src/app/api/ai/copilot/route.ts
```typescript
import { auth } from '@clerk/nextjs/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { clients, projects, invoices } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { orgId, userId } = await auth()
  if (!orgId || !userId) return new Response('Unauthorized', { status: 401 })
  
  const { messages, context } = await req.json()
  
  // Obtener contexto del negocio para el sistema
  const [clientCount, activeProjects, pendingInvoicesTotal] = await Promise.all([
    db.select({ count: count() }).from(clients).where(eq(clients.organizationId, orgId)),
    db.select().from(projects).where(and(eq(projects.organizationId, orgId), eq(projects.status, 'active'))),
    db.select({ total: sum(invoices.total) }).from(invoices).where(and(eq(invoices.organizationId, orgId), eq(invoices.status, 'sent'))),
  ])
  
  const anthropic = new Anthropic()
  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    stream: true,
    system: `Eres el AI Copilot de AI Agency OS, un asistente especializado en gestión de agencias creativas. 
    
Contexto actual del negocio:
- Total clientes: ${clientCount[0]?.count ?? 0}
- Proyectos activos: ${activeProjects.length}
- Facturas pendientes de cobro: $${pendingInvoicesTotal[0]?.total ?? 0}

Puedes ayudar con:
1. Redactar emails profesionales a clientes
2. Crear briefs de proyectos
3. Sugerir precios basados en el tipo de trabajo
4. Analizar el estado del negocio
5. Generar textos para propuestas
6. Dar consejos de gestión de proyectos y clientes
7. Ayudar con estrategias de pricing y negociación

Siempre responde en el idioma en que te hablen. Sé conciso, práctico y orientado a resultados.`,
    messages: messages,
  })
  
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`))
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    }
  })
  
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
```

### src/components/ai/copilot-chat.tsx
Implementa el chat con:
- UI estilo ChatGPT con burbujas de mensajes
- Streaming en tiempo real con useAIStream hook
- Sidebar izquierdo con historial de conversaciones
- Quick actions: "Redactar email", "Crear brief", "Analizar proyecto", "Sugerir precio"
- Adjuntar contexto: selector de cliente/proyecto para dar contexto a la IA
- Markdown rendering en respuestas (instalar react-markdown)
- Copy button en cada respuesta de la IA
- Input con Cmd+Enter para enviar

═══════════════════════════════════════════════════════════════
PASO 11 — SISTEMA DE PAGOS Y SUSCRIPCIONES
═══════════════════════════════════════════════════════════════

### Planes de Stripe - src/lib/stripe/plans.ts
```typescript
export const PLANS = {
  starter: {
    name: 'Starter',
    price: 49,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    features: ['5 clientes', '10 proyectos', '5 facturas/mes', 'AI básico (50 consultas/mes)'],
    limits: { clients: 5, projects: 10, invoices: 5, aiMessages: 50 }
  },
  pro: {
    name: 'Pro',
    price: 99,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: ['50 clientes', 'Proyectos ilimitados', 'Facturas ilimitadas', 'AI avanzado (500 consultas/mes)', 'Firma digital', 'Time tracking'],
    limits: { clients: 50, projects: -1, invoices: -1, aiMessages: 500 }
  },
  agency: {
    name: 'Agency',
    price: 199,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    features: ['Clientes ilimitados', 'Todo ilimitado', 'AI ilimitado', 'Multi-usuario (hasta 10)', 'API access', 'Soporte prioritario'],
    limits: { clients: -1, projects: -1, invoices: -1, aiMessages: -1 }
  }
} as const
```

### Webhook Handler - src/app/api/webhooks/stripe/route.ts
Maneja estos eventos:
- `checkout.session.completed` → activar suscripción
- `customer.subscription.updated` → actualizar plan
- `customer.subscription.deleted` → cancelar suscripción
- `invoice.payment_failed` → marcar como past_due, enviar email

═══════════════════════════════════════════════════════════════
PASO 12 — LANDING PAGE (MARKETING)
═══════════════════════════════════════════════════════════════

### src/app/(marketing)/page.tsx
Implementa una landing page de conversión alta con:

HERO:
- Headline: "El sistema operativo para tu agencia. Con IA que trabaja contigo."
- Subheadline: "CRM + Proyectos + Facturas + AI Copilot. Todo en uno. Para freelancers y agencias que facturan en serio."
- CTA principal: "Empieza gratis 14 días" (→ /sign-up)
- CTA secundario: "Ver demo en vivo"
- Social proof: "Usado por +500 agencias en LATAM y España"
- Screenshot/mockup del dashboard (usa una imagen placeholder o genera SVG)

PROBLEMA/SOLUCIÓN:
- 3 columnas: Notion (genérico, sin IA), HoneyBook (sin IA real), AI Agency OS (✓)

FEATURES (4 cards con animación):
- Client Hub, Project Board, Finance Hub, AI Copilot
- Cada una con ícono, título, descripción y 3 bullet points

PRICING (3 planes):
- Mostrar PLANS con toggle anual (-20%)
- Card "Pro" destacada con "Más popular"
- Lista de features con checkmarks

TESTIMONIALS:
- 3 testimonials de agencias ficticias pero realistas

FAQ:
- 6 preguntas comunes con Accordion

FOOTER con links y legal

TODA la landing debe estar animada con Framer Motion (fade-in, slide-up al hacer scroll).

═══════════════════════════════════════════════════════════════
PASO 13 — ONBOARDING FLOW
═══════════════════════════════════════════════════════════════

### src/app/onboarding/page.tsx
Wizard de 4 pasos:
1. "¿Cómo se llama tu agencia?" → crear organización en Clerk + DB
2. "¿Qué tipo de trabajo haces?" → selección múltiple (diseño, marketing, dev, video, etc.)
3. "Importa tus primeros clientes" → formulario para añadir 1-3 clientes rápido
4. "Elige tu plan" → pricing con trial de 14 días

Animación de progreso con barra y pasos numerados.
Al completar → redirect a /dashboard con confetti (instalar canvas-confetti).

═══════════════════════════════════════════════════════════════
PASO 14 — DASHBOARD HOME (MÉTRICAS)
═══════════════════════════════════════════════════════════════

### src/app/(dashboard)/dashboard/page.tsx
Dashboard con:

STATS CARDS (fila superior):
- MRR / Revenue este mes vs mes anterior (con % de cambio)
- Proyectos activos / Total proyectos
- Facturas pendientes de cobro ($)
- Clientes activos / Total clientes

GRÁFICO DE REVENUE:
- Line chart de los últimos 6 meses (usar recharts - instalar)
- Toggle: por mes / por semana

PROYECTOS EN RIESGO:
- Lista de proyectos con aiRiskScore > 60
- Badge de nivel de riesgo con color
- Botón "Ver detalles"

TAREAS DE HOY:
- Tareas asignadas al usuario con due date = hoy
- Quick checkbox para marcar como done

ACTIVIDAD RECIENTE:
- Feed de últimas acciones (facturas enviadas, proyectos actualizados, clientes añadidos)
- Relativo time (hace 5 min, hace 2 horas...)

═══════════════════════════════════════════════════════════════
PASO 15 — EMAILS CON RESEND + REACT EMAIL
═══════════════════════════════════════════════════════════════

### src/lib/email/templates/invoice.tsx
Email profesional de factura con:
- Header con logo y número de factura
- Info de emisor y receptor
- Tabla de line items
- Totales
- Botón grande "Pagar ahora" → Stripe link
- Footer con términos

### src/lib/email/templates/proposal.tsx
Email de propuesta con:
- Preview del resumen ejecutivo
- Botón "Ver y firmar propuesta"

### src/lib/email/templates/reminder.tsx
Recordatorio de pago con:
- Días de retraso
- Monto pendiente
- Botón de pago
- Tono profesional pero urgente

Configurar cron job (Vercel Cron) que se ejecuta cada día a las 9am:
- Detectar facturas vencidas hace 7, 14 y 30 días
- Enviar recordatorio automático
- Analizar proyectos activos con AI para detectar riesgos

═══════════════════════════════════════════════════════════════
PASO 16 — CONFIGURACIÓN Y DEPLOYMENT
═══════════════════════════════════════════════════════════════

### src/app/(dashboard)/settings/billing/page.tsx
- Mostrar plan actual con fecha de renovación
- Uso del plan (clientes usados/total, proyectos, etc.) con barras de progreso
- Botón "Cambiar plan" → Stripe Customer Portal
- Historial de pagos

### drizzle.config.ts
```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.POSTGRES_URL! },
})
```

### package.json scripts adicionales:
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:push": "drizzle-kit push"
  }
}
```

### vercel.json
```json
{
  "crons": [{
    "path": "/api/cron/daily",
    "schedule": "0 9 * * *"
  }]
}
```

═══════════════════════════════════════════════════════════════
PASO 17 — DETALLES DE UI/UX (CRITICAL)
═══════════════════════════════════════════════════════════════

DESIGN SYSTEM:
- Colores primarios: Indigo (#6366f1) y Violet (#7c3aed)
- Font: Inter (ya incluido)
- Border radius: rounded-xl para cards, rounded-lg para botones
- Shadows: shadow-sm para cards normales, shadow-lg para modals
- Dark mode: completamente funcional en todos los componentes

ANIMACIONES:
- Usar Framer Motion para: page transitions, card hover, modal open/close
- Skeleton loaders en TODO (nunca mostrar pantalla en blanco)
- Optimistic updates en todas las mutations (actualizar UI antes de confirmar servidor)

RESPONSIVE:
- Mobile-first en todo
- Sidebar colapsa a bottom nav en mobile
- Tables se convierten en cards en mobile
- Kanban board hace scroll horizontal en mobile

EMPTY STATES:
- Ilustración SVG + título + descripción + CTA en cada sección vacía
- "No tienes clientes aún. Añade tu primer cliente para empezar."

ERROR HANDLING:
- Toast notifications para éxito/error en todas las acciones
- Error boundaries en cada módulo
- Formularios con mensajes de error inline (react-hook-form)

PERFORMANCE:
- Usar React.Suspense + loading.tsx en cada ruta del dashboard
- Infinite scroll en listas largas
- Optimistic updates con TanStack Query
- Imágenes con next/image

═══════════════════════════════════════════════════════════════
PASO 18 — CHECKLIST DE LANZAMIENTO (MVP)
═══════════════════════════════════════════════════════════════

[ ] Autenticación funcionando (sign up, sign in, sign out)
[ ] Multi-tenancy: cada usuario ve solo su data
[ ] CRUD completo: Clientes, Proyectos, Tareas, Facturas, Propuestas
[ ] AI Summary de clientes funciona
[ ] AI Risk Detection en proyectos funciona
[ ] AI Copilot con streaming funciona
[ ] Generación de propuestas con AI funciona
[ ] Facturas con Stripe Payment Links funcionan
[ ] Firma digital en propuestas funciona
[ ] Emails se envían (Resend)
[ ] Suscripciones Stripe funcionan (trial → paid)
[ ] Webhook de Stripe procesa pagos
[ ] Landing page convierte (headline, pricing, CTA)
[ ] Onboarding de 4 pasos funciona
[ ] Dashboard con métricas reales
[ ] Dark mode funciona
[ ] Mobile responsive funciona
[ ] Deploy en Vercel exitoso
[ ] Variables de entorno configuradas en Vercel

═══════════════════════════════════════════════════════════════
NOTAS IMPORTANTES DE IMPLEMENTACIÓN
═══════════════════════════════════════════════════════════════

1. SIEMPRE usar Server Actions para mutaciones (no API routes excepto para AI streaming y webhooks)
2. SIEMPRE validar con Zod en el servidor, no confiar en datos del cliente
3. SIEMPRE verificar que el recurso pertenece a la organización antes de cualquier operación (Row Level Security a nivel de aplicación)
4. Usar `revalidatePath` después de cada mutación
5. El orgId de Clerk ES el organizationId en todas las queries
6. Para el Kanban drag & drop: actualizar el campo `order` y `status` de las tareas
7. Los `createId()` de @paralleldrive/cuid2 generan IDs únicos y ordenables
8. Para el streaming de AI: usar ReadableStream con SSE (Server-Sent Events)
9. Las propuestas y facturas públicas NO requieren autenticación (verificar por ID único)
10. Rate limiting: implementar en las rutas de AI con Upstash Redis (opcional para MVP)

PRIORIDAD DE IMPLEMENTACIÓN (hazlo en este orden):
1. Setup + DB schema + Auth
2. Client Hub (CRUD básico)
3. Project Board (Kanban)
4. Finance Hub (Facturas básicas)
5. AI integration (summary + copilot)
6. Stripe (subscriptions + payment links)
7. Landing page
8. Email notifications
9. Polish UI + animations
10. Deploy

¡EMPIEZA AHORA! Construye módulo por módulo. Después de cada módulo, verifica que funciona antes de continuar.
```

---

> **Instrucciones de uso:**
> 1. Abre Cursor Editor
> 2. Activa **Agent Mode** (Cmd+Shift+P → "Enable Agent Mode")
> 3. Crea una carpeta vacía para el proyecto
> 4. Copia el bloque del prompt de arriba (entre las triple comillas)
> 5. Pégalo en el chat de Cursor y presiona Enter
> 6. El agente construirá el SaaS completo paso a paso
> 7. Sigue las instrucciones de configuración de variables de entorno cuando te las pida

> **Tiempo estimado:** 4-8 horas para el MVP completo con Cursor Agent.
