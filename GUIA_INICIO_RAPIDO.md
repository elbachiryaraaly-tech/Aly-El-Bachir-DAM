# ⚡ GUÍA DE INICIO RÁPIDO
## Consulado de España en Orán - Setup y Desarrollo

---

## 🚀 PASO 1: SETUP INICIAL DEL PROYECTO

### 1.1 Crear la Estructura del Proyecto

```bash
# Crear directorio principal
mkdir consulado-oran
cd consulado-oran

# Inicializar git
git init
git branch -M main

# Crear estructura de monorepo
mkdir -p apps/{web,admin,api}
mkdir -p packages/{ui,database,auth,emails,config,types}
mkdir -p docs/{architecture,api,guides,security,deployment}
mkdir -p infrastructure/{terraform,kubernetes,docker}
mkdir -p scripts
mkdir -p tests/{unit,integration,e2e}

# Crear archivos de configuración raíz
touch package.json
touch pnpm-workspace.yaml
touch turbo.json
touch .gitignore
touch .env.example
touch docker-compose.yml
```

### 1.2 Configurar package.json Principal

```json
{
  "name": "consulado-oran",
  "version": "1.0.0",
  "private": true,
  "description": "Plataforma web elite para el Consulado de España en Orán",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "test:coverage": "turbo run test:coverage",
    "test:e2e": "turbo run test:e2e",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "turbo run type-check",
    "db:migrate": "pnpm --filter database db:migrate",
    "db:seed": "pnpm --filter database db:seed",
    "db:studio": "pnpm --filter database db:studio",
    "clean": "turbo run clean && rm -rf node_modules",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "eslint": "^8.55.0",
    "husky": "^8.0.3",
    "prettier": "^3.1.0",
    "turbo": "^1.11.0",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.12.0"
}
```

### 1.3 Configurar pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 1.4 Configurar turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

### 1.5 Configurar .gitignore

```bash
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.lcov
.nyc_output

# Next.js
.next/
out/
build/
dist/

# Production
*.log
logs/
*.pid
*.seed
*.pid.lock

# Environment variables
.env
.env*.local
.env.production

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite

# Prisma
prisma/migrations/**/migration.sql

# Temp files
tmp/
temp/
*.tmp

# Certificates
*.pem
*.key
*.crt

# Secrets
secrets/
vault/

# Terraform
*.tfstate
*.tfstate.backup
.terraform/

# Docker
*.log
```

---

## 🏗️ PASO 2: SETUP DE CADA APLICACIÓN

### 2.1 Setup de Frontend (Next.js)

```bash
cd apps/web

# Crear proyecto Next.js con TypeScript
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Instalar dependencias adicionales
pnpm add next-intl @radix-ui/react-* class-variance-authority clsx tailwind-merge
pnpm add react-hook-form @hookform/resolvers zod
pnpm add zustand
pnpm add framer-motion
pnpm add @tanstack/react-query
pnpm add next-auth@beta
pnpm add date-fns

# Dev dependencies
pnpm add -D @types/node @types/react vitest @testing-library/react @testing-library/jest-dom
pnpm add -D playwright @playwright/test
pnpm add -D eslint-config-next prettier prettier-plugin-tailwindcss

# shadcn/ui
npx shadcn-ui@latest init
```

**Configurar next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  
  // i18n
  i18n: {
    locales: ['es', 'fr', 'ar', 'en'],
    defaultLocale: 'es',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  // Image optimization
  images: {
    domains: ['cdn.consulado-oran.es'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables públicas
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
```

### 2.2 Setup de Backend API (NestJS)

```bash
cd apps/api

# Instalar NestJS CLI globalmente (si no lo tienes)
pnpm add -g @nestjs/cli

# Crear proyecto NestJS
nest new . --package-manager pnpm

# Instalar dependencias de seguridad
pnpm add @nestjs/passport passport passport-local passport-jwt
pnpm add @nestjs/jwt
pnpm add @nestjs/throttler  # Rate limiting
pnpm add helmet  # Security headers
pnpm add argon2  # Password hashing
pnpm add class-validator class-transformer

# Base de datos y ORM
pnpm add @prisma/client
pnpm add -D prisma

# Redis y caché
pnpm add @nestjs/cache-manager cache-manager
pnpm add redis cache-manager-redis-store

# Utilidades
pnpm add @nestjs/config
pnpm add @nestjs/schedule  # Cron jobs
pnpm add date-fns
pnpm add uuid

# Logging y monitoring
pnpm add @nestjs/winston winston
pnpm add @sentry/node

# Testing
pnpm add -D @nestjs/testing jest supertest
pnpm add -D @types/jest @types/supertest

# Documentación API
pnpm add @nestjs/swagger swagger-ui-express
```

**Configurar main.ts con seguridad:**

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Security
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'https://consulado-oran.es',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Consulado de España - Orán API')
      .setDescription('API documentation for consular services')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentication endpoints')
      .addTag('appointments', 'Appointment management')
      .addTag('users', 'User management')
      .addTag('documents', 'Document management')
      .build();
      
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  const port = process.env.PORT || 3002;
  await app.listen(port);
  
  console.log(`🚀 API running on http://localhost:${port}`);
  console.log(`📚 API Docs: http://localhost:${port}/api-docs`);
}

bootstrap();
```

### 2.3 Setup de Base de Datos (Prisma)

```bash
cd packages/database

# Inicializar package.json
pnpm init

# Instalar Prisma
pnpm add @prisma/client
pnpm add -D prisma

# Inicializar Prisma
npx prisma init

# Crear schema.prisma (copiar desde ESTRUCTURA_TECNICA.md)
```

**Configurar package.json:**

```json
{
  "name": "@consulado/database",
  "version": "1.0.0",
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "ts-node prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:reset": "prisma migrate reset"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

---

## 🐳 PASO 3: DOCKER SETUP

### 3.1 docker-compose.yml para Desarrollo

```yaml
version: '3.8'

services:
  # PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: consulado-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: consulado
      POSTGRES_PASSWORD: consulado_dev_password
      POSTGRES_DB: consulado_oran
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U consulado']
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    container_name: consulado-redis
    restart: unless-stopped
    command: redis-server --requirepass redis_dev_password
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # Maildev (Email testing)
  maildev:
    image: maildev/maildev
    container_name: consulado-maildev
    restart: unless-stopped
    ports:
      - '1080:1080'  # Web UI
      - '1025:1025'  # SMTP

  # Redis Commander (Redis UI)
  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: consulado-redis-commander
    restart: unless-stopped
    environment:
      REDIS_HOSTS: local:redis:6379:0:redis_dev_password
    ports:
      - '8081:8081'
    depends_on:
      - redis

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio
    container_name: consulado-minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - '9000:9000'
      - '9001:9001'
    volumes:
      - minio_data:/data
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9000/minio/health/live']
      interval: 30s
      timeout: 20s
      retries: 3

  # ClamAV (Antivirus)
  clamav:
    image: clamav/clamav:latest
    container_name: consulado-clamav
    restart: unless-stopped
    ports:
      - '3310:3310'
    volumes:
      - clamav_data:/var/lib/clamav

volumes:
  postgres_data:
  redis_data:
  minio_data:
  clamav_data:
```

### 3.2 Comandos Docker Útiles

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO!)
docker-compose down -v

# Rebuild de servicios
docker-compose up -d --build

# Acceder a PostgreSQL
docker exec -it consulado-postgres psql -U consulado -d consulado_oran

# Acceder a Redis CLI
docker exec -it consulado-redis redis-cli -a redis_dev_password
```

---

## 🧪 PASO 4: TESTING SETUP

### 4.1 Configurar Vitest (Unit Tests)

```bash
cd apps/web

# Instalar Vitest
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

**vitest.config.ts:**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.ts',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 4.2 Configurar Playwright (E2E Tests)

```bash
cd apps/web

# Instalar Playwright
pnpm add -D @playwright/test

# Inicializar configuración
npx playwright install
```

**playwright.config.ts:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 🔐 PASO 5: SEGURIDAD INICIAL

### 5.1 Generar Secretos Seguros

```bash
# JWT Secret (64 caracteres)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Refresh Token Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Pepper
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Password Pepper
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (32 bytes para AES-256)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5.2 Configurar .env.local

```bash
cp .env.example .env.local

# Editar .env.local con los secretos generados
nano .env.local
```

### 5.3 Instalar Husky (Git Hooks)

```bash
# En la raíz del proyecto
pnpm add -D husky lint-staged

# Inicializar husky
npx husky install

# Pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Pre-push hook
npx husky add .husky/pre-push "pnpm test && pnpm lint"
```

**Configurar lint-staged en package.json:**

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 🚀 PASO 6: PRIMER DEPLOY

### 6.1 Inicializar Base de Datos

```bash
# Crear primera migración
cd packages/database
npx prisma migrate dev --name init

# Seed de datos iniciales
npx prisma db seed

# Verificar en Prisma Studio
npx prisma studio
```

### 6.2 Iniciar Aplicaciones

```bash
# Terminal 1: Servicios Docker
docker-compose up

# Terminal 2: Frontend
cd apps/web
pnpm dev

# Terminal 3: Backend API
cd apps/api
pnpm start:dev

# Terminal 4: Admin Panel
cd apps/admin
pnpm dev
```

### 6.3 Verificar Funcionamiento

```bash
# Frontend
open http://localhost:3000

# API
curl http://localhost:3002/health

# API Docs
open http://localhost:3002/api-docs

# Admin Panel
open http://localhost:3001

# Maildev (emails)
open http://localhost:1080

# Redis Commander
open http://localhost:8081

# MinIO Console
open http://localhost:9001

# Prisma Studio
open http://localhost:5555
```

---

## 📊 PASO 7: MONITOREO Y LOGS

### 7.1 Configurar Logging con Winston

```bash
cd apps/api

pnpm add winston winston-daily-rotate-file
```

**Configurar logger:**

```typescript
// apps/api/src/common/logger/logger.service.ts

import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: {
        service: 'consulado-api',
        environment: process.env.NODE_ENV,
      },
      transports: [
        // Console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        
        // Archivo de errores
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '30d',
        }),
        
        // Archivo de todos los logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '30d',
        }),
        
        // Archivo de auditoría
        new winston.transports.DailyRotateFile({
          filename: 'logs/audit-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          maxFiles: '1825d', // 5 años
        }),
      ],
    });
  }

  log(message: string, context?: string, metadata?: any) {
    this.logger.info(message, { context, ...metadata });
  }

  error(message: string, trace?: string, context?: string, metadata?: any) {
    this.logger.error(message, { context, trace, ...metadata });
  }

  warn(message: string, context?: string, metadata?: any) {
    this.logger.warn(message, { context, ...metadata });
  }

  debug(message: string, context?: string, metadata?: any) {
    this.logger.debug(message, { context, ...metadata });
  }

  audit(action: string, userId: string, details: any) {
    this.logger.info('AUDIT', {
      action,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
```

---

## 🔍 PASO 8: COMANDOS ÚTILES

### Desarrollo

```bash
# Instalar todas las dependencias
pnpm install

# Desarrollo (todos los apps)
pnpm dev

# Desarrollo (app específica)
pnpm --filter web dev
pnpm --filter api dev
pnpm --filter admin dev

# Build (producción)
pnpm build

# Linting
pnpm lint

# Formateo de código
pnpm format

# Type checking
pnpm type-check

# Tests
pnpm test
pnpm test:coverage
pnpm test:e2e

# Limpiar todo
pnpm clean
```

### Base de Datos

```bash
# Crear migración
pnpm db:migrate

# Deploy migraciones (producción)
cd packages/database && npx prisma migrate deploy

# Seed de datos
pnpm db:seed

# Abrir Prisma Studio
pnpm db:studio

# Reset de base de datos (¡CUIDADO!)
cd packages/database && npx prisma migrate reset
```

### Docker

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f [servicio]

# Detener servicios
docker-compose down

# Rebuild
docker-compose up -d --build

# Ver estado
docker-compose ps

# Ejecutar comando en contenedor
docker exec -it [container] [comando]
```

### Git

```bash
# Commit con conventional commits
git commit -m "feat: nueva funcionalidad"
git commit -m "fix: corrección de bug"
git commit -m "docs: actualizar documentación"
git commit -m "security: parche de seguridad"

# Push
git push origin main

# Crear rama de feature
git checkout -b feature/nombre-feature

# Crear PR
gh pr create --title "Feature: descripción" --body "Detalles..."
```

---

## 📝 CHECKLIST DE VERIFICACIÓN

Antes de continuar, verifica que todo esté funcionando:

- [ ] ✅ Docker Compose corriendo (PostgreSQL, Redis, MailDev)
- [ ] ✅ Base de datos creada y migrada
- [ ] ✅ Frontend (Next.js) corriendo en http://localhost:3000
- [ ] ✅ Backend API (NestJS) corriendo en http://localhost:3002
- [ ] ✅ Admin Panel corriendo en http://localhost:3001
- [ ] ✅ API Docs accesible en http://localhost:3002/api-docs
- [ ] ✅ Prisma Studio funcional
- [ ] ✅ Logs configurados y funcionando
- [ ] ✅ Tests unitarios pasando
- [ ] ✅ Linter sin errores
- [ ] ✅ Git hooks configurados (Husky)
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Documentación leída y comprendida

---

## 🎯 PRÓXIMOS PASOS

### Orden Recomendado de Desarrollo:

1. **Semana 1-2: Autenticación y Seguridad**
   - [ ] Implementar registro de usuarios
   - [ ] Implementar login con JWT
   - [ ] Implementar 2FA (TOTP)
   - [ ] Implementar recuperación de contraseña
   - [ ] Testing de seguridad

2. **Semana 3-4: Sistema de Reservas**
   - [ ] CRUD de tipos de citas
   - [ ] Calendario de disponibilidad
   - [ ] Booking de citas
   - [ ] Sistema de recordatorios
   - [ ] Testing del sistema de reservas

3. **Semana 5-6: Gestión de Usuarios y Dashboard**
   - [ ] Dashboard de usuario
   - [ ] Panel administrativo
   - [ ] Sistema de roles y permisos
   - [ ] Testing de permisos

4. **Semana 7-8: Gestión Documental**
   - [ ] Upload de documentos
   - [ ] Encriptación client-side
   - [ ] Escaneo antivirus
   - [ ] Storage en S3/MinIO
   - [ ] Testing de seguridad de documentos

5. **Semana 9-10: Notificaciones y Comunicación**
   - [ ] Sistema de emails
   - [ ] Sistema de SMS
   - [ ] Notificaciones push
   - [ ] Templates multiidioma
   - [ ] Testing de notificaciones

6. **Semana 11-12: Pagos**
   - [ ] Integración con Stripe
   - [ ] Cálculo de tasas
   - [ ] Recibos y facturas
   - [ ] Testing de pagos

7. **Semana 13-14: Analíticas y Reportes**
   - [ ] Dashboard de métricas
   - [ ] Generación de reportes
   - [ ] Exportación de datos
   - [ ] Testing de reportes

8. **Semana 15-16: Features Avanzadas**
   - [ ] Videoconferencia
   - [ ] Chatbot con IA
   - [ ] PWA completo
   - [ ] Testing completo

9. **Semana 17-20: Testing, Seguridad y Optimización**
   - [ ] Auditoría de seguridad completa
   - [ ] Penetration testing
   - [ ] Load testing
   - [ ] Performance optimization
   - [ ] Accessibility audit

10. **Semana 21-24: Deployment y Go-Live**
    - [ ] Setup de infraestructura en producción
    - [ ] CI/CD pipeline completo
    - [ ] Documentación final
    - [ ] Training del personal
    - [ ] Soft launch
    - [ ] Go-live

---

## 💡 TIPS Y MEJORES PRÁCTICAS

### Desarrollo

1. **Commits frecuentes**: Commit pequeños y frecuentes con mensajes claros
2. **Branches por feature**: Cada nueva funcionalidad en su propia rama
3. **Code review obligatorio**: Todo código debe ser revisado antes de merge
4. **Testing primero**: Escribir tests antes o junto con el código (TDD)
5. **Documentación continua**: Documentar mientras desarrollas, no al final

### Seguridad

1. **Nunca commitear secretos**: Triple check antes de cada commit
2. **Validar todo**: Nunca confiar en inputs del usuario
3. **Sanitizar outputs**: Prevenir XSS en todo momento
4. **Auditoría completa**: Loguear todo lo importante
5. **Updates regulares**: Mantener dependencias actualizadas

### Performance

1. **Lazy loading**: Cargar código solo cuando se necesita
2. **Image optimization**: Usar Next.js Image component
3. **Caching inteligente**: Redis para datos frecuentes
4. **Database indexing**: Índices en columnas de búsqueda frecuente
5. **CDN**: Assets estáticos servidos por CDN

### Testing

1. **Cobertura mínima 80%**: No bajar de este umbral
2. **Tests automatizados**: En CI/CD pipeline
3. **E2E para flujos críticos**: Especialmente autenticación y pagos
4. **Load testing regular**: Antes de cada release importante
5. **Security testing**: Escaneos automáticos y pentesting regular

---

## 🆘 TROUBLESHOOTING

### Problema: Docker no inicia

```bash
# Verificar Docker está corriendo
docker ps

# Ver logs de error
docker-compose logs

# Limpiar y reiniciar
docker-compose down -v
docker-compose up -d
```

### Problema: Base de datos no conecta

```bash
# Verificar PostgreSQL está corriendo
docker-compose ps postgres

# Ver logs de PostgreSQL
docker-compose logs postgres

# Verificar variables de entorno
echo $DATABASE_URL

# Probar conexión
docker exec -it consulado-postgres psql -U consulado -d consulado_oran
```

### Problema: Puertos ocupados

```bash
# Ver qué está usando el puerto
lsof -i :3000
lsof -i :3002
lsof -i :5432

# Matar proceso
kill -9 [PID]

# Cambiar puerto en .env
PORT=3003
```

### Problema: Dependencias no se instalan

```bash
# Limpiar caché de pnpm
pnpm store prune

# Limpiar node_modules
rm -rf node_modules
rm pnpm-lock.yaml

# Reinstalar
pnpm install
```

---

## 📚 RECURSOS ADICIONALES

### Documentación Oficial

- Next.js: https://nextjs.org/docs
- NestJS: https://docs.nestjs.com
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### Seguridad

- OWASP Top 10: https://owasp.org/www-project-top-ten
- RGPD: https://gdpr.eu
- ENS: https://ens.ccn.cni.es
- CCN-CERT: https://www.ccn-cert.cni.es

### Testing

- Vitest: https://vitest.dev
- Playwright: https://playwright.dev
- Jest: https://jestjs.io

### DevOps

- Docker: https://docs.docker.com
- Kubernetes: https://kubernetes.io/docs
- Terraform: https://www.terraform.io/docs

---

## ✅ CONCLUSIÓN

Con esta guía tienes todo lo necesario para comenzar el desarrollo de la plataforma del Consulado de España en Orán.

**Recuerda:**
- La seguridad es la prioridad #1
- Documentar todo el proceso
- Testing continuo
- Code review obligatorio
- Commits frecuentes y claros

**¡Buena suerte con el desarrollo! 🚀🇪🇸**

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
