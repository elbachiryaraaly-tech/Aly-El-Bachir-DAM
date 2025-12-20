# 🏗️ ESTRUCTURA TÉCNICA DETALLADA
## Consulado de España en Orán - Arquitectura del Sistema

---

## 📁 ESTRUCTURA DE DIRECTORIOS COMPLETA

```
consulado-oran/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # CI pipeline
│   │   ├── cd-staging.yml              # Deploy a staging
│   │   ├── cd-production.yml           # Deploy a producción
│   │   ├── security-scan.yml           # Escaneo de seguridad
│   │   └── dependency-update.yml       # Actualización de dependencias
│   ├── CODEOWNERS                      # Code review assignments
│   └── PULL_REQUEST_TEMPLATE.md        # Template para PRs
│
├── apps/
│   ├── web/                            # Frontend principal (Next.js)
│   │   ├── src/
│   │   │   ├── app/                    # Next.js App Router
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── registro/
│   │   │   │   │   ├── recuperar-password/
│   │   │   │   │   └── verificar-2fa/
│   │   │   │   ├── (public)/
│   │   │   │   │   ├── page.tsx        # Homepage
│   │   │   │   │   ├── servicios/
│   │   │   │   │   ├── tramites/
│   │   │   │   │   ├── contacto/
│   │   │   │   │   └── faq/
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── mis-citas/
│   │   │   │   │   ├── reservar/
│   │   │   │   │   ├── documentos/
│   │   │   │   │   ├── notificaciones/
│   │   │   │   │   └── perfil/
│   │   │   │   ├── api/                # API routes
│   │   │   │   ├── layout.tsx
│   │   │   │   └── error.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/                 # shadcn/ui components
│   │   │   │   ├── auth/
│   │   │   │   ├── booking/
│   │   │   │   ├── documents/
│   │   │   │   ├── layout/
│   │   │   │   └── common/
│   │   │   ├── lib/
│   │   │   │   ├── api-client.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── utils.ts
│   │   │   │   └── validators.ts
│   │   │   ├── hooks/
│   │   │   ├── store/                  # Zustand stores
│   │   │   ├── styles/
│   │   │   │   └── globals.css
│   │   │   ├── types/
│   │   │   └── middleware.ts
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── locales/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── e2e/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── playwright.config.ts
│   │   └── package.json
│   │
│   ├── admin/                          # Panel administrativo
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── citas/
│   │   │   │   ├── usuarios/
│   │   │   │   ├── tramites/
│   │   │   │   ├── reportes/
│   │   │   │   ├── configuracion/
│   │   │   │   └── auditoria/
│   │   │   ├── components/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   └── api/                            # Backend API (NestJS)
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── strategies/
│       │   │   │   │   ├── jwt.strategy.ts
│       │   │   │   │   ├── local.strategy.ts
│       │   │   │   │   └── oauth.strategy.ts
│       │   │   │   ├── guards/
│       │   │   │   └── decorators/
│       │   │   ├── users/
│       │   │   │   ├── users.controller.ts
│       │   │   │   ├── users.service.ts
│       │   │   │   ├── users.module.ts
│       │   │   │   ├── dto/
│       │   │   │   └── entities/
│       │   │   ├── appointments/       # Sistema de citas
│       │   │   │   ├── appointments.controller.ts
│       │   │   │   ├── appointments.service.ts
│       │   │   │   ├── appointments.module.ts
│       │   │   │   └── dto/
│       │   │   ├── documents/
│       │   │   ├── notifications/
│       │   │   ├── payments/
│       │   │   ├── audit/
│       │   │   └── videocall/
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── filters/
│       │   │   ├── pipes/
│       │   │   └── middleware/
│       │   ├── config/
│       │   │   ├── database.config.ts
│       │   │   ├── redis.config.ts
│       │   │   ├── jwt.config.ts
│       │   │   └── encryption.config.ts
│       │   └── utils/
│       ├── test/
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
│
├── packages/                           # Monorepo packages compartidos
│   ├── ui/                            # Componentes UI compartidos
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── database/                      # Prisma schema y migraciones
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   └── client.ts
│   │   └── package.json
│   │
│   ├── auth/                          # Lógica de autenticación compartida
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   ├── utils/
│   │   │   └── types.ts
│   │   └── package.json
│   │
│   ├── emails/                        # Templates de emails
│   │   ├── templates/
│   │   │   ├── bienvenida.tsx
│   │   │   ├── confirmacion-cita.tsx
│   │   │   ├── recordatorio.tsx
│   │   │   └── cambio-password.tsx
│   │   ├── src/
│   │   │   └── email-service.ts
│   │   └── package.json
│   │
│   ├── config/                        # Configuraciones compartidas
│   │   ├── src/
│   │   │   ├── eslint/
│   │   │   ├── typescript/
│   │   │   └── tailwind/
│   │   └── package.json
│   │
│   └── types/                         # TypeScript types compartidos
│       ├── src/
│       │   ├── api.ts
│       │   ├── models.ts
│       │   └── enums.ts
│       └── package.json
│
├── docs/                              # Documentación completa
│   ├── architecture/
│   │   ├── README.md
│   │   ├── c4-diagrams/
│   │   ├── adrs/                      # Architecture Decision Records
│   │   │   ├── 001-choice-of-nextjs.md
│   │   │   ├── 002-database-choice.md
│   │   │   └── 003-authentication-strategy.md
│   │   └── security-model.md
│   ├── api/
│   │   ├── openapi.yaml
│   │   ├── postman-collection.json
│   │   └── README.md
│   ├── guides/
│   │   ├── user-manual-es.md
│   │   ├── user-manual-fr.md
│   │   ├── user-manual-ar.md
│   │   ├── admin-manual.md
│   │   └── developer-guide.md
│   ├── security/
│   │   ├── POLICY.md
│   │   ├── INCIDENT_RESPONSE.md
│   │   ├── DISASTER_RECOVERY.md
│   │   └── PENETRATION_TEST_REPORT.md
│   └── deployment/
│       ├── aws-setup.md
│       ├── kubernetes-guide.md
│       └── ssl-certificates.md
│
├── infrastructure/                    # Infrastructure as Code
│   ├── terraform/
│   │   ├── modules/
│   │   │   ├── vpc/
│   │   │   ├── rds/
│   │   │   ├── eks/
│   │   │   ├── s3/
│   │   │   └── cloudfront/
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── main.tf
│   │
│   ├── kubernetes/
│   │   ├── base/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   ├── ingress.yaml
│   │   │   └── configmap.yaml
│   │   ├── overlays/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── kustomization.yaml
│   │
│   └── docker/
│       ├── web.Dockerfile
│       ├── admin.Dockerfile
│       ├── api.Dockerfile
│       └── nginx.Dockerfile
│
├── scripts/                           # Scripts de utilidad
│   ├── backup.sh
│   ├── restore.sh
│   ├── deploy.sh
│   ├── rollback.sh
│   ├── db-migrate.sh
│   ├── seed-data.ts
│   └── health-check.sh
│
├── tests/                             # Tests globales
│   ├── unit/
│   ├── integration/
│   └── e2e/
│       ├── auth.spec.ts
│       ├── booking.spec.ts
│       └── admin.spec.ts
│
├── .env.example                       # Variables de entorno template
├── .env.development
├── .env.staging
├── .env.production                    # NUNCA commitear!
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml                 # Para desarrollo local
├── docker-compose.production.yml
├── turbo.json                         # Turborepo config
├── pnpm-workspace.yaml
├── package.json
├── README.md
├── SECURITY.md
├── CONTRIBUTING.md
├── LICENSE
└── CHANGELOG.md
```

---

## 🗄️ SCHEMA DE BASE DE DATOS (Prisma)

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== USUARIOS Y AUTENTICACIÓN ====================

enum UserRole {
  SUPER_ADMIN
  ADMIN_CONSULAR
  OFICIAL_CONSULAR
  RECEPCIONISTA
  CIUDADANO_REGISTRADO
  CIUDADANO_INVITADO
  AUDITOR
  TECNICO_SOPORTE
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

model User {
  id                String      @id @default(cuid())
  email             String      @unique
  passwordHash      String      // Argon2id
  role              UserRole    @default(CIUDADANO_REGISTRADO)
  status            UserStatus  @default(PENDING_VERIFICATION)
  
  // Datos personales (encriptados)
  firstName         String
  lastName          String
  dni               String?     @unique
  passport          String?     @unique
  phone             String
  dateOfBirth       DateTime?
  nationality       String      @default("ES")
  address           String?
  
  // Seguridad
  twoFactorEnabled  Boolean     @default(true)
  twoFactorSecret   String?     // TOTP secret
  backupCodes       String[]    // Códigos de respaldo
  lastLogin         DateTime?
  lastLoginIp       String?
  lastLoginUserAgent String?
  failedLoginAttempts Int       @default(0)
  lockedUntil       DateTime?
  
  // Preferencias
  language          String      @default("es")
  timezone          String      @default("Africa/Algiers")
  notificationEmail Boolean     @default(true)
  notificationSms   Boolean     @default(true)
  notificationPush  Boolean     @default(false)
  
  // RGPD
  consentGiven      Boolean     @default(false)
  consentDate       DateTime?
  dataProcessingConsent Boolean @default(false)
  marketingConsent  Boolean     @default(false)
  
  // Relaciones
  appointments      Appointment[]
  documents         Document[]
  sessions          Session[]
  auditLogs         AuditLog[]
  notifications     Notification[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  deletedAt         DateTime?   // Soft delete

  @@index([email])
  @@index([dni])
  @@index([passport])
  @@index([status])
  @@map("users")
}

model Session {
  id           String    @id @default(cuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  token        String    @unique
  refreshToken String    @unique
  expiresAt    DateTime
  refreshExpiresAt DateTime
  
  ipAddress    String
  userAgent    String
  device       String?
  location     String?
  
  isActive     Boolean   @default(true)
  revokedAt    DateTime?
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([userId])
  @@index([token])
  @@index([refreshToken])
  @@map("sessions")
}

// ==================== CITAS Y RESERVAS ====================

enum AppointmentType {
  // Pasaportes
  PASSPORT_NEW
  PASSPORT_RENEWAL
  PASSPORT_EMERGENCY
  PASSPORT_MINOR
  PASSPORT_DUPLICATE
  
  // DNI
  DNI_NEW
  DNI_RENEWAL
  DNI_MINOR
  DNI_DUPLICATE
  
  // Certificaciones
  CERTIFICATE_BIRTH
  CERTIFICATE_DEATH
  CERTIFICATE_MARRIAGE
  CERTIFICATE_CRIMINAL_RECORD
  CERTIFICATE_RESIDENCE
  CERTIFICATE_NATIONALITY
  
  // Registro Civil
  CIVIL_REGISTRY_BIRTH
  CIVIL_REGISTRY_MARRIAGE
  CIVIL_REGISTRY_DEATH
  CIVIL_REGISTRY_FAMILY_BOOK
  
  // Notariales
  NOTARIAL_ATTESTATION
  NOTARIAL_POWER_OF_ATTORNEY
  NOTARIAL_AFFIDAVIT
  NOTARIAL_LIFE_CERTIFICATE
  
  // Nacionalidad
  NATIONALITY_RESIDENCE
  NATIONALITY_OPTION
  NATIONALITY_NATURALIZATION
  NATIONALITY_SEPHARDIC
  
  // Visados
  VISA_SCHENGEN_C
  VISA_LONG_TERM_D
  VISA_STUDENT
  VISA_WORK
  VISA_FAMILY_REUNION
  
  // Otros
  CONSULAR_REGISTRATION
  LEGALIZATION
  APOSTILLE
  ELECTORAL_CERA
  ASSISTANCE
}

enum AppointmentStatus {
  PENDING           // Pendiente de confirmación
  CONFIRMED         // Confirmada
  IN_PROGRESS       // En progreso
  COMPLETED         // Completada
  CANCELLED_USER    // Cancelada por usuario
  CANCELLED_CONSULATE // Cancelada por consulado
  NO_SHOW           // No se presentó
  RESCHEDULED       // Reprogramada
}

model Appointment {
  id                String            @id @default(cuid())
  userId            String
  user              User              @relation(fields: [userId], references: [id])
  
  type              AppointmentType
  status            AppointmentStatus @default(PENDING)
  
  scheduledDate     DateTime
  scheduledTime     String            // "09:00"
  duration          Int               @default(30) // minutos
  
  // Información del trámite
  description       String?
  notes             String?           // Notas del usuario
  internalNotes     String?           // Notas del personal (privadas)
  
  // Asignación
  assignedTo        String?           // ID del oficial consular
  roomNumber        String?
  queueNumber       Int?
  
  // Check-in
  checkedIn         Boolean           @default(false)
  checkedInAt       DateTime?
  qrCode            String?           @unique
  
  // Videoconferencia
  isVirtual         Boolean           @default(false)
  meetingUrl        String?
  meetingId         String?
  
  // Recordatorios enviados
  reminderSent7Days Boolean           @default(false)
  reminderSent3Days Boolean           @default(false)
  reminderSent1Day  Boolean           @default(false)
  reminderSent2Hours Boolean          @default(false)
  
  // Cancelación
  cancellationReason String?
  cancelledAt       DateTime?
  cancelledBy       String?
  
  // Relaciones
  documents         Document[]
  payments          Payment[]
  
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  deletedAt         DateTime?

  @@index([userId])
  @@index([status])
  @@index([scheduledDate])
  @@index([type])
  @@map("appointments")
}

// ==================== DOCUMENTOS ====================

enum DocumentType {
  PASSPORT_COPY
  DNI_COPY
  BIRTH_CERTIFICATE
  MARRIAGE_CERTIFICATE
  PHOTO
  PROOF_OF_ADDRESS
  CRIMINAL_RECORD
  POWER_OF_ATTORNEY
  CONSULAR_REGISTRATION
  OTHER
}

enum DocumentStatus {
  UPLOADED
  PENDING_REVIEW
  APPROVED
  REJECTED
  EXPIRED
}

model Document {
  id                String          @id @default(cuid())
  userId            String
  user              User            @relation(fields: [userId], references: [id])
  appointmentId     String?
  appointment       Appointment?    @relation(fields: [appointmentId], references: [id])
  
  type              DocumentType
  status            DocumentStatus  @default(PENDING_REVIEW)
  
  // Información del archivo
  originalFilename  String
  storedFilename    String          @unique // UUID + extensión
  mimeType          String
  sizeBytes         Int
  encryptionKey     String          // Clave de encriptación (encriptada)
  checksum          String          // SHA-256 hash
  
  // Storage
  storageProvider   String          @default("s3") // s3, minio, etc
  storageBucket     String
  storagePath       String
  
  // Metadata
  expiresAt         DateTime?
  issuedBy          String?
  issuedDate        DateTime?
  
  // Seguridad
  virusScanStatus   String?         // clean, infected, pending
  virusScanDate     DateTime?
  accessedBy        String[]        // Array de user IDs que accedieron
  lastAccessedAt    DateTime?
  downloadCount     Int             @default(0)
  
  // Revisión
  reviewedBy        String?
  reviewedAt        DateTime?
  reviewNotes       String?
  rejectionReason   String?
  
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  deletedAt         DateTime?

  @@index([userId])
  @@index([appointmentId])
  @@index([status])
  @@map("documents")
}

// ==================== PAGOS ====================

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  BANK_TRANSFER
  CASH
  PAYPAL
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  CANCELLED
}

model Payment {
  id                String          @id @default(cuid())
  appointmentId     String
  appointment       Appointment     @relation(fields: [appointmentId], references: [id])
  
  amount            Decimal         @db.Decimal(10, 2)
  currency          String          @default("EUR")
  
  method            PaymentMethod
  status            PaymentStatus   @default(PENDING)
  
  // Gateway de pago
  gatewayProvider   String?         // stripe, paypal, etc
  gatewayTransactionId String?      @unique
  gatewayResponse   Json?
  
  // Información adicional
  description       String?
  receiptNumber     String?         @unique
  receiptUrl        String?
  invoiceUrl        String?
  
  // Reembolso
  refundedAmount    Decimal?        @db.Decimal(10, 2)
  refundedAt        DateTime?
  refundReason      String?
  
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@index([appointmentId])
  @@index([status])
  @@map("payments")
}

// ==================== NOTIFICACIONES ====================

enum NotificationType {
  EMAIL
  SMS
  PUSH
  IN_APP
}

enum NotificationCategory {
  APPOINTMENT_CONFIRMATION
  APPOINTMENT_REMINDER
  APPOINTMENT_CANCELLED
  APPOINTMENT_RESCHEDULED
  DOCUMENT_APPROVED
  DOCUMENT_REJECTED
  PAYMENT_RECEIVED
  SECURITY_ALERT
  GENERAL_INFO
}

model Notification {
  id          String              @id @default(cuid())
  userId      String
  user        User                @relation(fields: [userId], references: [id])
  
  type        NotificationType
  category    NotificationCategory
  
  title       String
  message     String              @db.Text
  
  // Estado
  isRead      Boolean             @default(false)
  readAt      DateTime?
  
  // Envío
  isSent      Boolean             @default(false)
  sentAt      DateTime?
  failedAt    DateTime?
  errorMessage String?
  
  // Metadata
  metadata    Json?               // Datos adicionales
  
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  @@index([userId])
  @@index([isRead])
  @@index([isSent])
  @@map("notifications")
}

// ==================== AUDITORÍA ====================

enum AuditAction {
  CREATE
  READ
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  LOGIN_FAILED
  PASSWORD_CHANGE
  PERMISSION_CHANGE
  EXPORT_DATA
  DOWNLOAD_DOCUMENT
  ACCESS_SENSITIVE_DATA
}

model AuditLog {
  id            String      @id @default(cuid())
  userId        String?
  user          User?       @relation(fields: [userId], references: [id])
  
  action        AuditAction
  resource      String      // Nombre del recurso (User, Appointment, etc)
  resourceId    String?     // ID del recurso
  
  // Detalles
  description   String      @db.Text
  changes       Json?       // Cambios realizados (before/after)
  
  // Contexto
  ipAddress     String
  userAgent     String
  method        String?     // HTTP method
  url           String?
  statusCode    Int?
  
  // Seguridad
  signature     String      // Firma digital del log (inmutabilidad)
  
  createdAt     DateTime    @default(now())

  @@index([userId])
  @@index([action])
  @@index([resource])
  @@index([createdAt])
  @@map("audit_logs")
}

// ==================== CONFIGURACIÓN DEL SISTEMA ====================

model SystemConfig {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  
  description String?
  isPublic  Boolean  @default(false) // Accesible por frontend
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("system_config")
}

// ==================== DISPONIBILIDAD DE CITAS ====================

model AvailabilitySlot {
  id              String    @id @default(cuid())
  date            DateTime
  startTime       String    // "09:00"
  endTime         String    // "09:30"
  capacity        Int       @default(1)
  bookedCount     Int       @default(0)
  isAvailable     Boolean   @default(true)
  appointmentTypes AppointmentType[]
  
  // Bloqueos
  isBlocked       Boolean   @default(false)
  blockReason     String?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([date, startTime])
  @@index([date])
  @@map("availability_slots")
}

// ==================== DÍAS FESTIVOS ====================

model Holiday {
  id          String   @id @default(cuid())
  date        DateTime @unique
  name        String
  description String?
  country     String   @default("ES") // ES, DZ (Argelia), etc
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([date])
  @@map("holidays")
}
```

---

## 🔐 EJEMPLOS DE CÓDIGO - SEGURIDAD

### 1. Middleware de Autenticación (NestJS)

```typescript
// apps/api/src/common/guards/jwt-auth.guard.ts

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    // Log del intento de acceso
    this.logAccess(request, user, err);
    
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido o expirado');
    }
    
    // Verificar que la sesión sigue activa
    if (!user.sessionActive) {
      throw new UnauthorizedException('Sesión inválida');
    }
    
    // Verificar IP si es necesario
    if (user.ipBinding && user.ipAddress !== request.ip) {
      throw new UnauthorizedException('Dirección IP no coincide con la sesión');
    }
    
    return user;
  }
  
  private logAccess(request: any, user: any, error: any) {
    // Implementar logging de auditoría
  }
}
```

### 2. Guard de Roles y Permisos

```typescript
// apps/api/src/common/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      // Log de intento de acceso no autorizado
      this.logUnauthorizedAccess(user, requiredRoles);
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso'
      );
    }

    return true;
  }
  
  private logUnauthorizedAccess(user: any, requiredRoles: UserRole[]) {
    // Implementar logging de auditoría
  }
}
```

### 3. Encriptación de Datos Sensibles

```typescript
// packages/auth/src/utils/encryption.ts

import * as crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly saltLength = 64;
  private readonly tagLength = 16;
  private readonly pepper = process.env.ENCRYPTION_PEPPER!;

  /**
   * Encripta datos con AES-256-GCM
   */
  async encrypt(plaintext: string): Promise<string> {
    // Generar salt único
    const salt = crypto.randomBytes(this.saltLength);
    
    // Derivar clave de encriptación
    const key = await this.deriveKey(this.pepper, salt);
    
    // Generar IV único
    const iv = crypto.randomBytes(this.ivLength);
    
    // Crear cipher
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    
    // Encriptar
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Obtener authentication tag
    const authTag = cipher.getAuthTag();
    
    // Combinar: salt + iv + authTag + encrypted
    const combined = Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(encrypted, 'hex')
    ]);
    
    return combined.toString('base64');
  }

  /**
   * Desencripta datos con AES-256-GCM
   */
  async decrypt(ciphertext: string): Promise<string> {
    const combined = Buffer.from(ciphertext, 'base64');
    
    // Extraer componentes
    const salt = combined.subarray(0, this.saltLength);
    const iv = combined.subarray(this.saltLength, this.saltLength + this.ivLength);
    const authTag = combined.subarray(
      this.saltLength + this.ivLength,
      this.saltLength + this.ivLength + this.tagLength
    );
    const encrypted = combined.subarray(this.saltLength + this.ivLength + this.tagLength);
    
    // Derivar clave de encriptación
    const key = await this.deriveKey(this.pepper, salt);
    
    // Crear decipher
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    // Desencriptar
    let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Deriva clave usando scrypt (KDF)
   */
  private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return (await scrypt(password, salt, this.keyLength)) as Buffer;
  }

  /**
   * Genera hash seguro con SHA-256
   */
  hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Genera hash HMAC para verificación de integridad
   */
  hmac(data: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }
}
```

### 4. Hashing de Contraseñas con Argon2id

```typescript
// packages/auth/src/utils/password.ts

import * as argon2 from 'argon2';

export class PasswordService {
  private readonly options: argon2.Options & { raw?: false } = {
    type: argon2.argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 2,
  };

  /**
   * Hashea una contraseña con Argon2id
   */
  async hash(password: string): Promise<string> {
    // Añadir pepper global
    const pepper = process.env.PASSWORD_PEPPER!;
    const pepperedPassword = password + pepper;
    
    return argon2.hash(pepperedPassword, this.options);
  }

  /**
   * Verifica una contraseña
   */
  async verify(hash: string, password: string): Promise<boolean> {
    try {
      const pepper = process.env.PASSWORD_PEPPER!;
      const pepperedPassword = password + pepper;
      
      return await argon2.verify(hash, pepperedPassword);
    } catch (error) {
      // Hash inválido
      return false;
    }
  }

  /**
   * Valida la fortaleza de una contraseña
   */
  validateStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 12) {
      errors.push('La contraseña debe tener al menos 12 caracteres');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un carácter especial');
    }

    // Check against common passwords
    if (this.isCommonPassword(password)) {
      errors.push('Esta contraseña es muy común. Por favor, elige otra');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isCommonPassword(password: string): boolean {
    // Lista de contraseñas comunes (cargar desde archivo)
    const commonPasswords = [
      'password',
      '123456',
      '123456789',
      'qwerty',
      'password123',
      // ... más
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  }
}
```

---

## 🎨 COMPONENTES UI PRINCIPALES

### 1. Formulario de Login con 2FA

```typescript
// apps/web/src/components/auth/LoginForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(12, 'La contraseña debe tener al menos 12 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al iniciar sesión');
      }

      if (result.requires2FA) {
        setRequires2FA(true);
        setTempToken(result.tempToken);
      } else {
        // Login exitoso sin 2FA (no debería ocurrir si 2FA es obligatorio)
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (requires2FA) {
    return (
      <TwoFactorVerification
        tempToken={tempToken}
        onSuccess={() => router.push('/dashboard')}
        onError={(msg) => setError(msg)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          disabled={isLoading}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          disabled={isLoading}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>

      <div className="text-center text-sm">
        <a href="/recuperar-password" className="text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
}
```

### 2. Calendario de Reservas

```typescript
// apps/web/src/components/booking/AppointmentCalendar.tsx

'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

interface TimeSlot {
  time: string;
  available: boolean;
  capacity: number;
  booked: number;
}

export function AppointmentCalendar({ appointmentType }: { appointmentType: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // Cargar slots disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      loadTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadTimeSlots = async (date: Date) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/appointments/availability?date=${format(date, 'yyyy-MM-dd')}&type=${appointmentType}`
      );
      const data = await response.json();
      setTimeSlots(data.slots || []);
    } catch (error) {
      console.error('Error al cargar disponibilidad:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    // Deshabilitar fechas pasadas
    if (isBefore(date, startOfDay(new Date()))) {
      return true;
    }

    // Deshabilitar más de 90 días adelante
    const maxDate = addDays(new Date(), 90);
    if (isBefore(maxDate, date)) {
      return true;
    }

    // Deshabilitar fines de semana (sábado y domingo)
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return true;
    }

    return false;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    // Redirigir al formulario de confirmación
    const params = new URLSearchParams({
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      type: appointmentType,
    });

    window.location.href = `/reservar/confirmar?${params.toString()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendario */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Selecciona una fecha</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={isDateDisabled}
          locale={es}
          className="rounded-md border"
        />
        <div className="text-sm text-muted-foreground">
          <p>• Las citas deben reservarse con al menos 48 horas de anticipación</p>
          <p>• Puedes reservar hasta 90 días adelante</p>
          <p>• El consulado está cerrado los fines de semana y festivos</p>
        </div>
      </div>

      {/* Slots de tiempo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {selectedDate
            ? `Horarios disponibles para ${format(selectedDate, "d 'de' MMMM", { locale: es })}`
            : 'Selecciona una fecha para ver horarios disponibles'}
        </h3>

        {isLoading && (
          <div className="text-center py-8">
            <p>Cargando disponibilidad...</p>
          </div>
        )}

        {!isLoading && selectedDate && timeSlots.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay horarios disponibles para esta fecha.</p>
            <p>Por favor, selecciona otra fecha.</p>
          </div>
        )}

        {!isLoading && timeSlots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={selectedTime === slot.time ? 'default' : 'outline'}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className="relative"
              >
                {slot.time}
                {!slot.available && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                    Lleno
                  </Badge>
                )}
                {slot.available && slot.booked > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs text-muted-foreground">
                    {slot.capacity - slot.booked} disponibles
                  </span>
                )}
              </Button>
            ))}
          </div>
        )}

        {selectedTime && (
          <div className="pt-4">
            <Button onClick={handleBooking} className="w-full" size="lg">
              Continuar con la reserva
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 📝 VARIABLES DE ENTORNO

```bash
# .env.example

# ==================== GENERAL ====================
NODE_ENV=production
APP_NAME="Consulado de España - Orán"
APP_URL=https://consulado-oran.es
API_URL=https://api.consulado-oran.es

# ==================== DATABASE ====================
DATABASE_URL="postgresql://user:password@localhost:5432/consulado_oran?schema=public"
DATABASE_URL_READONLY="postgresql://readonly:password@localhost:5432/consulado_oran?schema=public"

# ==================== REDIS ====================
REDIS_URL="redis://:password@localhost:6379"
REDIS_TTL=3600

# ==================== JWT & SECRETS ====================
JWT_SECRET="[CAMBIAR_POR_SECRETO_SEGURO_64_CARACTERES]"
JWT_EXPIRATION="15m"
REFRESH_TOKEN_SECRET="[CAMBIAR_POR_SECRETO_DIFERENTE]"
REFRESH_TOKEN_EXPIRATION="7d"

# ==================== ENCRYPTION ====================
ENCRYPTION_PEPPER="[CAMBIAR_POR_PEPPER_SEGURO]"
PASSWORD_PEPPER="[CAMBIAR_POR_PEPPER_DIFERENTE]"
ENCRYPTION_KEY="[AES_256_KEY_32_BYTES]"

# ==================== 2FA ====================
TOTP_ISSUER="Consulado España Orán"
TOTP_WINDOW=1

# ==================== EMAIL ====================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@consulado-oran.es
SMTP_PASSWORD="[SMTP_PASSWORD]"
EMAIL_FROM="Consulado de España <noreply@consulado-oran.es>"

# ==================== SMS ====================
TWILIO_ACCOUNT_SID="[TWILIO_SID]"
TWILIO_AUTH_TOKEN="[TWILIO_TOKEN]"
TWILIO_PHONE_NUMBER="+34600000000"

# ==================== STORAGE (S3) ====================
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID="[AWS_KEY]"
AWS_SECRET_ACCESS_KEY="[AWS_SECRET]"
S3_BUCKET_NAME=consulado-oran-documents
S3_BUCKET_REGION=eu-west-1
S3_PUBLIC_URL=https://cdn.consulado-oran.es

# ==================== PAYMENTS ====================
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ==================== CLOUDFLARE ====================
CLOUDFLARE_ZONE_ID="[ZONE_ID]"
CLOUDFLARE_API_TOKEN="[API_TOKEN]"

# ==================== MONITORING ====================
SENTRY_DSN="https://[key]@sentry.io/[project]"
SENTRY_ENVIRONMENT=production
NEW_RELIC_LICENSE_KEY="[NEW_RELIC_KEY]"
NEW_RELIC_APP_NAME="Consulado Orán"

# ==================== SECURITY ====================
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000
SESSION_TIMEOUT=1800000
CORS_ORIGIN=https://consulado-oran.es
HELMET_CSP_DIRECTIVES='{"default-src":["'self'"]}'

# ==================== VAULT (HashiCorp) ====================
VAULT_ADDR=https://vault.consulado-oran.internal
VAULT_TOKEN="[VAULT_TOKEN]"
VAULT_NAMESPACE=consulado

# ==================== VIDEOCALL (Jitsi) ====================
JITSI_DOMAIN=meet.consulado-oran.es
JITSI_APP_ID="[JITSI_APP_ID]"
JITSI_API_KEY="[JITSI_API_KEY]"

# ==================== ANTIVIRUS ====================
CLAMAV_HOST=localhost
CLAMAV_PORT=3310

# ==================== BACKUP ====================
BACKUP_ENCRYPTION_KEY="[BACKUP_KEY]"
BACKUP_S3_BUCKET=consulado-oran-backups
BACKUP_RETENTION_DAYS=30

# ==================== FEATURE FLAGS ====================
ENABLE_VIDEOCALLS=true
ENABLE_PAYMENTS=true
ENABLE_CHATBOT=true
ENABLE_BIOMETRIC_AUTH=true

# ==================== COMPLIANCE ====================
DPO_EMAIL=dpo@consulado-oran.es
SECURITY_EMAIL=security@consulado-oran.es
INCIDENT_RESPONSE_EMAIL=incident@consulado-oran.es
```

---

**Siguiente paso:** Implementar esta estructura y comenzar con el desarrollo del sistema de autenticación como primera prioridad de seguridad.

**Última actualización:** Diciembre 2025
