# 🏗️ MEGA PROMPT — AI AGENCY OS

> Copia y pega este prompt completo en Cursor Editor (Composer/Agent mode) para construir el SaaS completo paso a paso.

---

## CONTEXTO DEL PROYECTO

Estoy construyendo **AI Agency OS**: el sistema operativo completo para agencias de marketing y diseño. Es un SaaS todo-en-uno que incluye gestión de clientes, proyectos, facturación e inteligencia artificial integrada.

**Propuesta de valor:** Notion es genérico, HoneyBook/Dubsado no tienen IA real. Nadie lo hace bien. Este producto llena ese gap para +50M de freelancers y agencias pequeñas que pagan $50-$199/mes.

---

## STACK TECNOLÓGICO (NO NEGOCIABLE)

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| Lenguaje | TypeScript estricto (`strict: true`) |
| Base de datos | PostgreSQL (Neon o Supabase Postgres) |
| ORM | Drizzle ORM |
| Autenticación | Clerk |
| IA | Anthropic Claude API (SDK oficial `@anthropic-ai/sdk`) |
| Pagos | Stripe (Subscriptions + Invoicing) |
| Email | Resend |
| Uploads | UploadThing |
| UI | shadcn/ui + Tailwind CSS v4 |
| Validación | Zod |
| Estado servidor | TanStack Query (React Query) |
| Deploy | Vercel |
| Monorepo | Turborepo (opcional, solo si escala) |

---

## ARQUITECTURA DE LA BASE DE DATOS (DRIZZLE SCHEMA)

Crea el archivo `src/db/schema.ts` con TODAS estas tablas. Usa Drizzle ORM con `drizzle-orm` y `drizzle-kit`. La base de datos es PostgreSQL.

### Tablas principales:

```
organizations
├── id (uuid, PK, default uuid_generate_v4())
├── name (varchar 255, not null)
├── slug (varchar 100, unique, not null)
├── logo_url (text, nullable)
├── clerk_org_id (varchar 255, unique, not null)
├── stripe_customer_id (varchar 255, nullable)
├── stripe_subscription_id (varchar 255, nullable)
├── subscription_status (enum: 'trialing','active','past_due','canceled','free')
├── subscription_plan (enum: 'free','starter','pro','enterprise')
├── created_at (timestamp, default now())
└── updated_at (timestamp, default now())

users
├── id (uuid, PK)
├── clerk_user_id (varchar 255, unique, not null)
├── organization_id (uuid, FK → organizations.id)
├── email (varchar 255, not null)
├── first_name (varchar 100)
├── last_name (varchar 100)
├── avatar_url (text, nullable)
├── role (enum: 'owner','admin','member','viewer')
├── created_at (timestamp)
└── updated_at (timestamp)

clients
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id, not null)
├── name (varchar 255, not null)
├── email (varchar 255)
├── phone (varchar 50)
├── company (varchar 255)
├── website (text)
├── avatar_url (text)
├── status (enum: 'lead','active','inactive','archived')
├── source (enum: 'referral','website','social','cold_outreach','other')
├── notes (text)
├── tags (jsonb, default '[]')
├── custom_fields (jsonb, default '{}')
├── total_revenue (decimal 12,2, default 0)
├── ai_summary (text) -- Resumen generado por IA de la relación
├── last_contact_at (timestamp)
├── created_at (timestamp)
└── updated_at (timestamp)

client_contacts
├── id (uuid, PK)
├── client_id (uuid, FK → clients.id)
├── name (varchar 255, not null)
├── email (varchar 255)
├── phone (varchar 50)
├── role (varchar 100) -- "CEO", "Marketing Director", etc.
├── is_primary (boolean, default false)
└── created_at (timestamp)

client_notes
├── id (uuid, PK)
├── client_id (uuid, FK → clients.id)
├── user_id (uuid, FK → users.id)
├── content (text, not null)
├── is_ai_generated (boolean, default false)
├── created_at (timestamp)
└── updated_at (timestamp)

client_files
├── id (uuid, PK)
├── client_id (uuid, FK → clients.id)
├── user_id (uuid, FK → users.id)
├── name (varchar 255, not null)
├── url (text, not null)
├── file_type (varchar 50)
├── size_bytes (integer)
├── created_at (timestamp)
└── updated_at (timestamp)

client_activities
├── id (uuid, PK)
├── client_id (uuid, FK → clients.id)
├── user_id (uuid, FK → users.id, nullable)
├── type (enum: 'note','email','call','meeting','file_upload','status_change','invoice','project')
├── title (varchar 255, not null)
├── description (text)
├── metadata (jsonb, default '{}')
├── created_at (timestamp)
└── updated_at (timestamp)

projects
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── client_id (uuid, FK → clients.id, nullable)
├── name (varchar 255, not null)
├── description (text)
├── status (enum: 'draft','planning','in_progress','review','completed','on_hold','cancelled')
├── priority (enum: 'low','medium','high','urgent')
├── budget (decimal 12,2, nullable)
├── spent (decimal 12,2, default 0)
├── start_date (date, nullable)
├── due_date (date, nullable)
├── completed_at (timestamp, nullable)
├── ai_health_score (integer, 0-100) -- Score de salud del proyecto calculado por IA
├── ai_risk_notes (text) -- Notas de riesgo generadas por IA
├── created_at (timestamp)
└── updated_at (timestamp)

project_columns
├── id (uuid, PK)
├── project_id (uuid, FK → projects.id)
├── name (varchar 100, not null)
├── position (integer, not null)
├── color (varchar 7) -- hex color
└── created_at (timestamp)

tasks
├── id (uuid, PK)
├── project_id (uuid, FK → projects.id)
├── column_id (uuid, FK → project_columns.id)
├── parent_task_id (uuid, FK → tasks.id, nullable) -- subtareas
├── assigned_to (uuid, FK → users.id, nullable)
├── title (varchar 255, not null)
├── description (text)
├── status (enum: 'todo','in_progress','review','done','blocked')
├── priority (enum: 'low','medium','high','urgent')
├── position (integer, not null)
├── estimated_hours (decimal 6,2, nullable)
├── actual_hours (decimal 6,2, default 0)
├── due_date (date, nullable)
├── completed_at (timestamp, nullable)
├── tags (jsonb, default '[]')
├── created_at (timestamp)
└── updated_at (timestamp)

time_entries
├── id (uuid, PK)
├── task_id (uuid, FK → tasks.id)
├── user_id (uuid, FK → users.id)
├── project_id (uuid, FK → projects.id)
├── description (text)
├── start_time (timestamp, not null)
├── end_time (timestamp, nullable)
├── duration_minutes (integer) -- calculado
├── is_billable (boolean, default true)
├── hourly_rate (decimal 8,2, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)

invoices
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── client_id (uuid, FK → clients.id)
├── project_id (uuid, FK → projects.id, nullable)
├── invoice_number (varchar 50, unique, not null) -- Auto-generado: INV-001
├── status (enum: 'draft','sent','viewed','paid','overdue','cancelled','refunded')
├── issue_date (date, not null)
├── due_date (date, not null)
├── subtotal (decimal 12,2, not null)
├── tax_rate (decimal 5,2, default 0)
├── tax_amount (decimal 12,2, default 0)
├── discount_amount (decimal 12,2, default 0)
├── total (decimal 12,2, not null)
├── currency (varchar 3, default 'USD')
├── notes (text)
├── terms (text)
├── stripe_invoice_id (varchar 255, nullable)
├── stripe_payment_intent_id (varchar 255, nullable)
├── paid_at (timestamp, nullable)
├── sent_at (timestamp, nullable)
├── viewed_at (timestamp, nullable)
├── pdf_url (text, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)

invoice_items
├── id (uuid, PK)
├── invoice_id (uuid, FK → invoices.id, on delete cascade)
├── description (varchar 500, not null)
├── quantity (decimal 10,2, not null)
├── unit_price (decimal 12,2, not null)
├── amount (decimal 12,2, not null) -- quantity * unit_price
├── position (integer, not null)
└── created_at (timestamp)

proposals
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── client_id (uuid, FK → clients.id)
├── project_id (uuid, FK → projects.id, nullable)
├── title (varchar 255, not null)
├── content (text, not null) -- Rich text / Markdown
├── status (enum: 'draft','sent','viewed','accepted','rejected','expired')
├── total_amount (decimal 12,2)
├── valid_until (date)
├── signature_url (text, nullable) -- firma digital
├── signed_at (timestamp, nullable)
├── signed_by_name (varchar 255, nullable)
├── sent_at (timestamp, nullable)
├── viewed_at (timestamp, nullable)
├── is_ai_generated (boolean, default false)
├── pdf_url (text, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)

email_templates
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── name (varchar 255, not null)
├── subject (varchar 500, not null)
├── body (text, not null)
├── category (enum: 'follow_up','proposal','invoice','onboarding','general')
├── is_ai_generated (boolean, default false)
├── variables (jsonb, default '[]') -- [{name: "client_name", description: "..."}]
├── created_at (timestamp)
└── updated_at (timestamp)

ai_conversations
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── user_id (uuid, FK → users.id)
├── context_type (enum: 'general','client','project','invoice','proposal')
├── context_id (uuid, nullable) -- ID del client/project/etc.
├── title (varchar 255)
├── messages (jsonb, not null, default '[]') -- [{role, content, timestamp}]
├── tokens_used (integer, default 0)
├── created_at (timestamp)
└── updated_at (timestamp)

notifications
├── id (uuid, PK)
├── organization_id (uuid, FK → organizations.id)
├── user_id (uuid, FK → users.id)
├── type (enum: 'task_assigned','task_due','invoice_paid','invoice_overdue','project_deadline','ai_alert','mention')
├── title (varchar 255, not null)
├── message (text)
├── link (text)
├── is_read (boolean, default false)
├── created_at (timestamp)
└── updated_at (timestamp)

webhook_events
├── id (uuid, PK)
├── source (enum: 'stripe','clerk','resend')
├── event_type (varchar 100, not null)
├── payload (jsonb, not null)
├── processed (boolean, default false)
├── processed_at (timestamp, nullable)
├── error (text, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

**IMPORTANTE:** Crea índices en: `organization_id` en TODAS las tablas multi-tenant, `clerk_user_id`, `clerk_org_id`, `client_id` + `organization_id`, `status` en projects/tasks/invoices, `due_date` en tasks/invoices/projects.

---

## ESTRUCTURA DE CARPETAS

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── page.tsx                    -- Landing page
│   │   ├── pricing/page.tsx
│   │   ├── features/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  -- Dashboard layout con sidebar
│   │   ├── page.tsx                    -- Dashboard overview
│   │   ├── clients/
│   │   │   ├── page.tsx               -- Lista de clientes
│   │   │   ├── new/page.tsx           -- Crear cliente
│   │   │   └── [clientId]/
│   │   │       ├── page.tsx           -- Detalle de cliente
│   │   │       ├── notes/page.tsx
│   │   │       ├── files/page.tsx
│   │   │       ├── projects/page.tsx
│   │   │       ├── invoices/page.tsx
│   │   │       └── activity/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx               -- Lista de proyectos
│   │   │   ├── new/page.tsx
│   │   │   └── [projectId]/
│   │   │       ├── page.tsx           -- Vista Kanban
│   │   │       ├── timeline/page.tsx  -- Vista Timeline/Gantt
│   │   │       ├── settings/page.tsx
│   │   │       └── time/page.tsx      -- Time tracking
│   │   ├── finance/
│   │   │   ├── page.tsx               -- Dashboard financiero
│   │   │   ├── invoices/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [invoiceId]/page.tsx
│   │   │   └── proposals/
│   │   │       ├── page.tsx
│   │   │       ├── new/page.tsx
│   │   │       └── [proposalId]/page.tsx
│   │   ├── ai/
│   │   │   ├── page.tsx               -- AI Copilot chat
│   │   │   └── templates/page.tsx     -- Email templates
│   │   ├── settings/
│   │   │   ├── page.tsx               -- General settings
│   │   │   ├── team/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   └── integrations/page.tsx
│   │   └── notifications/page.tsx
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts
│   │   │   └── clerk/route.ts
│   │   ├── ai/
│   │   │   ├── chat/route.ts          -- Streaming AI chat
│   │   │   ├── summarize/route.ts     -- Resumir cliente/proyecto
│   │   │   ├── generate-proposal/route.ts
│   │   │   ├── generate-email/route.ts
│   │   │   ├── analyze-project/route.ts
│   │   │   └── suggest-price/route.ts
│   │   ├── invoices/
│   │   │   └── [invoiceId]/
│   │   │       ├── pdf/route.ts
│   │   │       └── send/route.ts
│   │   └── uploadthing/route.ts
│   ├── invite/[token]/page.tsx         -- Página pública para invitaciones
│   ├── invoice/[token]/page.tsx        -- Página pública para ver/pagar factura
│   ├── proposal/[token]/page.tsx       -- Página pública para ver/firmar propuesta
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             -- shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   └── breadcrumbs.tsx
│   ├── clients/
│   │   ├── client-card.tsx
│   │   ├── client-form.tsx
│   │   ├── client-list.tsx
│   │   ├── client-detail-header.tsx
│   │   ├── client-activity-feed.tsx
│   │   ├── client-ai-summary.tsx
│   │   └── client-files-grid.tsx
│   ├── projects/
│   │   ├── kanban-board.tsx
│   │   ├── kanban-column.tsx
│   │   ├── kanban-card.tsx
│   │   ├── project-card.tsx
│   │   ├── project-form.tsx
│   │   ├── task-detail-sheet.tsx
│   │   ├── time-tracker.tsx
│   │   ├── timeline-view.tsx
│   │   └── project-health-badge.tsx
│   ├── finance/
│   │   ├── invoice-form.tsx
│   │   ├── invoice-preview.tsx
│   │   ├── invoice-list.tsx
│   │   ├── proposal-editor.tsx
│   │   ├── proposal-preview.tsx
│   │   ├── signature-pad.tsx
│   │   ├── revenue-chart.tsx
│   │   └── finance-overview-cards.tsx
│   ├── ai/
│   │   ├── ai-chat.tsx
│   │   ├── ai-chat-message.tsx
│   │   ├── ai-suggestions-panel.tsx
│   │   ├── ai-copilot-button.tsx
│   │   └── ai-loading-skeleton.tsx
│   ├── dashboard/
│   │   ├── stats-cards.tsx
│   │   ├── recent-activity.tsx
│   │   ├── upcoming-deadlines.tsx
│   │   ├── revenue-overview.tsx
│   │   └── ai-insights-card.tsx
│   └── shared/
│       ├── data-table.tsx
│       ├── empty-state.tsx
│       ├── loading-skeleton.tsx
│       ├── confirm-dialog.tsx
│       ├── search-command.tsx          -- Cmd+K search
│       ├── file-upload.tsx
│       └── date-range-picker.tsx
├── db/
│   ├── index.ts                        -- Drizzle client
│   ├── schema.ts                       -- Todas las tablas
│   └── migrations/                     -- Drizzle migrations
├── lib/
│   ├── ai/
│   │   ├── anthropic.ts               -- Cliente Anthropic configurado
│   │   ├── prompts.ts                 -- System prompts para cada feature
│   │   └── tools.ts                   -- Tool definitions para function calling
│   ├── stripe/
│   │   ├── client.ts                  -- Stripe client
│   │   ├── plans.ts                   -- Definición de planes
│   │   └── webhooks.ts               -- Webhook handlers
│   ├── email/
│   │   ├── resend.ts                  -- Resend client
│   │   └── templates/                 -- React Email templates
│   │       ├── invoice-email.tsx
│   │       ├── proposal-email.tsx
│   │       ├── welcome-email.tsx
│   │       └── reminder-email.tsx
│   ├── uploadthing.ts
│   ├── utils.ts                        -- cn(), formatCurrency(), etc.
│   ├── validations/                    -- Zod schemas
│   │   ├── client.ts
│   │   ├── project.ts
│   │   ├── invoice.ts
│   │   ├── proposal.ts
│   │   └── task.ts
│   └── constants.ts                    -- Enums, default values
├── hooks/
│   ├── use-organization.ts
│   ├── use-clients.ts
│   ├── use-projects.ts
│   ├── use-invoices.ts
│   ├── use-ai-chat.ts
│   ├── use-time-tracker.ts
│   └── use-debounce.ts
├── actions/
│   ├── clients.ts                      -- Server Actions para clientes
│   ├── projects.ts
│   ├── tasks.ts
│   ├── invoices.ts
│   ├── proposals.ts
│   ├── ai.ts
│   ├── time-entries.ts
│   └── notifications.ts
├── types/
│   └── index.ts                        -- TypeScript types e interfaces
└── middleware.ts                        -- Clerk middleware + org routing
```

---

## MÓDULO 1: CLIENT HUB (Construir primero)

### Funcionalidades requeridas:

1. **Lista de clientes** con búsqueda, filtros (status, source, tags), ordenamiento y paginación server-side
2. **Ficha de cliente** con tabs: Overview, Notas, Archivos, Proyectos, Facturas, Actividad
3. **Timeline de actividad** que registra automáticamente cada interacción
4. **Tags personalizados** y campos custom (jsonb)
5. **AI Summary**: Botón que llama a Claude para generar un resumen ejecutivo de la relación con el cliente basado en notas, actividad, proyectos y facturación
6. **Upload de archivos** vinculados al cliente via UploadThing
7. **Contactos múltiples** por cliente (CEO, Director de Marketing, etc.)

### Server Actions (`src/actions/clients.ts`):

```typescript
"use server"

export async function getClients(params: {
  organizationId: string
  search?: string
  status?: ClientStatus
  source?: ClientSource
  tags?: string[]
  sortBy?: 'name' | 'created_at' | 'total_revenue' | 'last_contact_at'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}) // → { clients: Client[], totalCount: number, totalPages: number }

export async function getClient(clientId: string, organizationId: string) // → Client con contacts, recentActivity, projectCount, invoiceTotal

export async function createClient(data: CreateClientInput) // → Client
export async function updateClient(clientId: string, data: UpdateClientInput) // → Client
export async function archiveClient(clientId: string) // → void
export async function addClientNote(data: { clientId: string, content: string }) // → ClientNote
export async function addClientActivity(data: CreateActivityInput) // → ClientActivity
export async function generateClientAISummary(clientId: string) // → { summary: string } — llama a Claude
```

### UI del Client Hub:

- **Lista**: Usa `DataTable` de shadcn con columnas: Avatar+Nombre, Empresa, Status (badge de color), Revenue total, Último contacto, Acciones
- **Detalle**: Layout con header grande (avatar, nombre, empresa, badges de status), tabs debajo
- **AI Summary Card**: Card con icono de sparkles, muestra el resumen, botón "Regenerar" con loading state
- **Activity Feed**: Timeline vertical con iconos por tipo (nota=📝, email=✉️, llamada=📞, factura=💰)

---

## MÓDULO 2: PROJECT BOARD

### Funcionalidades requeridas:

1. **Vista Kanban** con drag & drop (usar `@dnd-kit/core` + `@dnd-kit/sortable`)
2. **Vista Timeline** (Gantt simplificado) con barras horizontales por tarea
3. **Columnas personalizables** por proyecto (To Do, In Progress, Review, Done por defecto)
4. **Tareas** con: título, descripción (rich text con `@tiptap/react`), assignee, prioridad, fecha límite, subtareas, tags, horas estimadas vs reales
5. **Time Tracking**: Timer en vivo vinculado a tareas, registro manual de horas, reporte de horas por proyecto/usuario
6. **Task Detail Sheet**: Sheet lateral (shadcn Sheet) al hacer click en una tarea con TODA la info editable
7. **AI Health Score**: Indicador 0-100 calculado por IA que analiza: % completado, tareas atrasadas, tiempo gastado vs estimado, y genera notas de riesgo
8. **Filtros**: Por assignee, prioridad, fecha, status, tags

### Kanban Board Implementation:

```
El board debe ser responsive. En mobile, las columnas se muestran como tabs horizontales scrolleables.
Cada card del kanban muestra: título, avatar del assignee, badge de prioridad (color), fecha límite (rojo si overdue), progress de subtareas (2/5).
Al arrastrar una card entre columnas, actualizar el status y la posición con Server Action optimista (usar useOptimistic o mutate de TanStack Query).
```

### Server Actions (`src/actions/projects.ts` y `src/actions/tasks.ts`):

```typescript
export async function getProjects(organizationId: string, filters?: ProjectFilters)
export async function getProject(projectId: string) // Con columnas y tareas
export async function createProject(data: CreateProjectInput)
export async function updateProject(projectId: string, data: UpdateProjectInput)
export async function createColumn(data: { projectId: string, name: string, color: string })
export async function reorderColumns(projectId: string, columnIds: string[])

export async function getTasks(projectId: string, filters?: TaskFilters)
export async function createTask(data: CreateTaskInput)
export async function updateTask(taskId: string, data: UpdateTaskInput)
export async function moveTask(taskId: string, newColumnId: string, newPosition: number)
export async function deleteTask(taskId: string)

export async function startTimer(taskId: string, userId: string)
export async function stopTimer(timeEntryId: string)
export async function getTimeEntries(projectId: string, filters?: TimeFilters)
export async function analyzeProjectHealth(projectId: string) // → { score: number, risks: string[], suggestions: string[] }
```

---

## MÓDULO 3: FINANCE HUB

### Funcionalidades requeridas:

1. **Dashboard financiero**: Revenue total, pendiente de cobro, facturas overdue, gráfico de revenue mensual (usar `recharts`)
2. **Facturas**:
   - Crear factura con line items dinámicos
   - Auto-numerar (INV-001, INV-002...)
   - Calcular subtotal, tax, discount, total automáticamente
   - Enviar por email via Resend con link de pago
   - Página pública `/invoice/[token]` para que el cliente vea y pague
   - Integración Stripe para cobro con tarjeta
   - Generar PDF (usar `@react-pdf/renderer`)
   - Status tracking: draft → sent → viewed → paid
   - Recordatorios automáticos para facturas overdue
3. **Propuestas**:
   - Editor rich text (Tiptap) para crear propuestas
   - Generación con IA: Botón "Generar con IA" que crea una propuesta completa basada en el brief del proyecto y datos del cliente
   - Firma digital: Canvas para firma (usar `react-signature-canvas`)
   - Página pública `/proposal/[token]` para ver y firmar
   - Conversión propuesta → proyecto + factura con un click
4. **Stripe Integration**:
   - Checkout session para pago de facturas individuales
   - Subscriptions para el plan del SaaS
   - Webhook handler para sincronizar status de pagos
   - Customer portal para gestión de suscripción

### Server Actions (`src/actions/invoices.ts`):

```typescript
export async function getInvoices(organizationId: string, filters?: InvoiceFilters)
export async function getInvoice(invoiceId: string)
export async function createInvoice(data: CreateInvoiceInput) // Auto-genera invoice_number
export async function updateInvoice(invoiceId: string, data: UpdateInvoiceInput)
export async function sendInvoice(invoiceId: string) // Envía email + actualiza status
export async function markInvoiceAsPaid(invoiceId: string)
export async function generateInvoicePDF(invoiceId: string) // → pdf url
export async function createStripeCheckoutForInvoice(invoiceId: string) // → checkout url
export async function getFinanceDashboard(organizationId: string) // → { totalRevenue, pendingAmount, overdueAmount, monthlyRevenue[], recentInvoices[] }
```

### Propuestas con IA:

```typescript
export async function generateProposal(data: {
  clientId: string
  projectBrief: string
  services: string[]
  budget_range?: { min: number, max: number }
}) // → { title, content (markdown), suggestedAmount }
// Usa Claude con system prompt que incluye info del cliente, historial de proyectos previos, y genera una propuesta profesional completa
```

---

## MÓDULO 4: AI COPILOT

### Funcionalidades requeridas:

1. **Chat contextual**: Interfaz de chat con streaming (usar AI SDK de Vercel: `ai` package con `useChat` hook). El chat tiene acceso al contexto de la organización.
2. **Acciones del Copilot**:
   - **Redactar emails**: "Escribe un follow-up para [cliente] sobre [proyecto]"
   - **Generar propuestas**: "Crea una propuesta para [cliente] para un proyecto de rediseño web"
   - **Crear briefs**: "Genera un brief creativo para [proyecto]"
   - **Analizar proyectos**: "¿Cómo va el proyecto [X]? ¿Hay riesgos?"
   - **Sugerir precios**: "¿Cuánto debería cobrar por [tipo de proyecto]?"
   - **Resumir clientes**: "Dame un resumen de mi relación con [cliente]"
3. **Tool calling**: Claude debe poder ejecutar acciones reales como crear tareas, enviar emails, actualizar status
4. **Panel de sugerencias**: En cada vista (cliente, proyecto, factura), mostrar un panel lateral con sugerencias contextuales de la IA

### Implementación del Chat (`src/app/api/ai/chat/route.ts`):

```typescript
// Usar streaming con Anthropic SDK
// System prompt incluye:
// - Info de la organización
// - Lista de clientes con stats
// - Proyectos activos
// - Facturas pendientes
// - El usuario puede hacer preguntas y pedir acciones

// Tools disponibles para Claude:
// - search_clients: Buscar clientes
// - get_client_details: Ver detalle de un cliente
// - create_task: Crear una tarea
// - draft_email: Generar borrador de email
// - generate_invoice: Crear factura
// - analyze_project: Analizar salud del proyecto
// - suggest_price: Sugerir precio basado en mercado
```

### System Prompt para el Copilot:

```
Eres el AI Copilot de una agencia de marketing/diseño. Tu nombre es "Agency AI".
Tienes acceso completo a los datos de la agencia. Tu objetivo es ayudar al equipo a ser más productivo.

Reglas:
1. Responde siempre de forma concisa y profesional
2. Cuando generes propuestas o emails, usa un tono profesional pero cercano
3. Si te piden analizar un proyecto, sé honesto sobre los riesgos
4. Para sugerencias de precio, considera el mercado, la complejidad y el historial del cliente
5. Siempre ofrece acciones concretas después de tu análisis
6. Responde en el idioma que use el usuario
```

---

## MÓDULO 5: DASHBOARD PRINCIPAL

### Componentes del Dashboard:

1. **Stats Cards** (4 cards en grid):
   - Clientes activos (con % cambio vs mes anterior)
   - Proyectos en curso
   - Revenue este mes (con gráfico sparkline)
   - Facturas pendientes (con monto total)

2. **Revenue Chart**: Gráfico de barras mensual (últimos 12 meses) con `recharts`

3. **Upcoming Deadlines**: Lista de las próximas 5 fechas límite (proyectos y tareas) con countdown

4. **Recent Activity**: Feed de las últimas 10 actividades de la organización

5. **AI Insights Card**: Card con 3 insights generados por IA:
   - "Tienes 3 facturas overdue por un total de $4,500"
   - "El proyecto X está al 80% pero la deadline es en 2 días"
   - "No has contactado a [cliente] en 30 días"

---

## MULTI-TENANCY Y SEGURIDAD

### Implementación crítica:

1. **TODAS las queries** deben filtrar por `organization_id`. NUNCA exponer datos entre organizaciones.
2. **Middleware** (`src/middleware.ts`):
   ```
   - Clerk auth middleware
   - Después de auth, resolver organization_id del usuario
   - Redirigir a /select-org si no tiene organización
   - Redirigir a /sign-in si no está autenticado
   - Rutas públicas: /, /pricing, /features, /sign-in, /sign-up, /invoice/[token], /proposal/[token]
   ```
3. **Row Level Security**: Cada Server Action recibe el organizationId de la sesión (nunca del cliente)
4. **Roles**: owner puede todo, admin puede todo menos billing, member puede CRUD en clients/projects/tasks, viewer solo lectura

### Helper de autorización:

```typescript
// src/lib/auth.ts
export async function getAuthenticatedUser() {
  const { userId, orgId } = auth() // Clerk
  if (!userId || !orgId) redirect('/sign-in')

  const user = await db.query.users.findFirst({
    where: and(eq(users.clerkUserId, userId), eq(users.organizationId, orgId))
  })

  if (!user) redirect('/sign-in')
  return user
}
```

---

## DISEÑO UI/UX

### Principios de diseño:

1. **Color scheme**: Modo oscuro por defecto. Colores primarios inspirados en Linear/Notion. Background: `hsl(0 0% 3.9%)`. Accent: azul-violeta.
2. **Sidebar**: Fija a la izquierda (240px), colapsable a iconos (60px). Contiene: Logo, Navegación principal, Selector de organización (Clerk OrgSwitcher), Avatar del usuario abajo.
3. **Tipografía**: Inter para todo. Headings en semibold. Body en regular.
4. **Spacing**: Sistema de 4px. Padding de pages: 24px. Gap entre sections: 16px.
5. **Animaciones**: Transiciones suaves con `framer-motion`. Page transitions. Skeleton loaders para TODA carga.
6. **Responsive**: Mobile-first. Sidebar se convierte en bottom nav en mobile. Kanban se hace scrolleable horizontal.
7. **Command Menu**: `Cmd+K` para búsqueda global (clientes, proyectos, tareas, acciones rápidas). Usar el componente `Command` de shadcn.

### Componentes shadcn necesarios:

```bash
npx shadcn@latest add button card input label select textarea badge avatar
npx shadcn@latest add dialog sheet tabs tooltip popover dropdown-menu
npx shadcn@latest add table command calendar date-picker separator
npx shadcn@latest add skeleton switch checkbox radio-group scroll-area
npx shadcn@latest add alert alert-dialog progress chart sonner
```

---

## VARIABLES DE ENTORNO

```env
# Base de datos
DATABASE_URL=postgresql://...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# UploadThing
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## INSTRUCCIONES DE EJECUCIÓN

Ejecuta estos pasos EN ORDEN:

### Paso 1: Inicializar el proyecto
```bash
npx create-next-app@latest ai-agency-os --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ai-agency-os
```

### Paso 2: Instalar dependencias core
```bash
npm install drizzle-orm postgres @neondatabase/serverless
npm install -D drizzle-kit
npm install @clerk/nextjs
npm install @anthropic-ai/sdk
npm install stripe @stripe/stripe-js
npm install resend
npm install uploadthing @uploadthing/react
npm install zod
npm install @tanstack/react-query
```

### Paso 3: Instalar dependencias UI/UX
```bash
npx shadcn@latest init
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
npm install recharts
npm install framer-motion
npm install react-signature-canvas
npm install @react-pdf/renderer
npm install date-fns
npm install lucide-react
npm install sonner
npm install ai @ai-sdk/anthropic
```

### Paso 4: Configurar Drizzle
Crear `drizzle.config.ts`:
```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### Paso 5: Crear schema, generar migración, push
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### Paso 6: Construir módulo por módulo
1. Primero: Layout (sidebar, header, auth middleware)
2. Segundo: Client Hub completo
3. Tercero: Project Board con Kanban
4. Cuarto: Finance Hub
5. Quinto: AI Copilot
6. Sexto: Dashboard
7. Séptimo: Landing page y pricing
8. Octavo: Polish, testing, deploy

---

## PATRONES DE CÓDIGO A SEGUIR

### Server Action pattern:
```typescript
"use server"

import { getAuthenticatedUser } from "@/lib/auth"
import { db } from "@/db"
import { clients } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { createClientSchema } from "@/lib/validations/client"

export async function createClient(formData: FormData) {
  const user = await getAuthenticatedUser()

  const validated = createClientSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    // ...
  })

  const [client] = await db.insert(clients).values({
    ...validated,
    organizationId: user.organizationId,
  }).returning()

  revalidatePath("/clients")
  return { success: true, client }
}
```

### Error handling pattern:
```typescript
import { z } from "zod"

type ActionResult<T> = { success: true; data: T } | { success: false; error: string }

export async function safeAction<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    console.error(error)
    return { success: false, error: "Something went wrong" }
  }
}
```

### AI streaming pattern:
```typescript
// src/app/api/ai/chat/route.ts
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: buildSystemPrompt(context),
    messages,
  })

  return new Response(stream.toReadableStream(), {
    headers: { "Content-Type": "text/event-stream" },
  })
}
```

---

## REGLAS FINALES PARA CURSOR

1. **TypeScript estricto**: NO uses `any`. Define tipos para todo.
2. **Server Components por defecto**: Solo usa `"use client"` cuando necesites interactividad.
3. **Loading states**: CADA página debe tener `loading.tsx` con Skeleton de shadcn.
4. **Error states**: CADA página debe tener `error.tsx` con mensaje amigable y botón de retry.
5. **Empty states**: Cuando una lista está vacía, muestra ilustración + CTA. NUNCA una tabla vacía.
6. **Toasts**: Usa `sonner` para feedback de acciones (crear, editar, eliminar).
7. **Optimistic updates**: Para drag & drop del kanban y toggles rápidos.
8. **Responsive**: TODO debe funcionar en mobile. Testea siempre.
9. **Accesibilidad**: Labels en forms, aria attributes, keyboard navigation.
10. **Performance**: Usa `React.lazy` para componentes pesados (PDF viewer, Signature pad, Charts).

---

## EMPIEZA AHORA

Comienza por:
1. Crear la estructura del proyecto con `create-next-app`
2. Instalar TODAS las dependencias
3. Configurar Clerk auth
4. Crear el schema completo de Drizzle
5. Implementar el layout del dashboard (sidebar + header)
6. Construir el Client Hub completo

Después de cada módulo, confirma que compila sin errores antes de continuar con el siguiente.

**No preguntes. Construye.**
