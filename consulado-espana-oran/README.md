# 🇪🇸 Consulado General de España en Orán - Sistema de Citas

<div align="center">

![Consulado de España](https://img.shields.io/badge/Consulado-España-red?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGQzQwMCIgZD0iTTEyIDJMMiAyMmgyMEwxMiAyeiIvPjwvc3ZnPg==)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Security](https://img.shields.io/badge/Seguridad-Gubernamental-green?style=for-the-badge&logo=shield)

**Sistema de reservas de élite con seguridad de nivel gubernamental para el Consulado General de España en Orán, Argelia**

[Demo](#) • [Documentación](#documentación) • [Instalación](#instalación) • [Seguridad](#seguridad)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura de Seguridad](#-arquitectura-de-seguridad)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Servicios Consulares](#-servicios-consulares)
- [API Reference](#-api-reference)
- [Super Mega Prompt para Cursor](#-super-mega-prompt-para-cursor)

---

## ✨ Características

### 🎫 Sistema de Reservas Completo
- ✅ Reserva de citas para **20+ servicios consulares**
- ✅ Calendario interactivo con disponibilidad en tiempo real
- ✅ Confirmación automática por email
- ✅ Recordatorios 24h antes de la cita
- ✅ Gestión de reprogramaciones y cancelaciones
- ✅ Generación de número de referencia único

### 🔐 Seguridad de Nivel Gubernamental
- ✅ Autenticación de dos factores (2FA) con TOTP
- ✅ Encriptación AES-256-GCM para datos sensibles
- ✅ JWT con HS512 y rotación de tokens
- ✅ Rate limiting por IP y usuario
- ✅ Protección CSRF con tokens
- ✅ Headers de seguridad HTTP completos
- ✅ Auditoría completa de acciones
- ✅ Bloqueo de cuentas por intentos fallidos

### 🌐 Multiidioma y Accesibilidad
- ✅ Español, Árabe y Francés
- ✅ Diseño responsive para móvil, tablet y desktop
- ✅ Cumplimiento WCAG 2.1 AA
- ✅ Soporte RTL para árabe

### 📊 Panel de Administración
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión de citas y usuarios
- ✅ Reportes exportables
- ✅ Logs de auditoría
- ✅ Configuración del sistema

---

## 🛠 Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript 5 |
| **Estilos** | Tailwind CSS 4, Framer Motion |
| **UI Components** | Radix UI, Lucide Icons |
| **Base de Datos** | PostgreSQL, Prisma ORM |
| **Autenticación** | NextAuth.js, JWT, TOTP |
| **Seguridad** | bcrypt, crypto, speakeasy |
| **Validación** | Zod |
| **Email** | Nodemailer |

---

## 🛡 Arquitectura de Seguridad

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Next.js    │  │   React      │  │  Tailwind    │          │
│  │   Frontend   │  │   Components │  │     CSS      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE SEGURIDAD                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Middleware  │  │    Rate      │  │    CSRF      │          │
│  │   Headers    │  │   Limiting   │  │  Protection  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │     JWT      │  │     2FA      │  │   Audit      │          │
│  │   Tokens     │  │    TOTP      │  │    Logs      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Prisma     │  │  PostgreSQL  │  │  Encryption  │          │
│  │     ORM      │  │   Database   │  │  AES-256     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Medidas de Seguridad Implementadas

| Medida | Descripción |
|--------|-------------|
| **Encriptación en reposo** | AES-256-GCM para datos sensibles |
| **Encriptación en tránsito** | HTTPS obligatorio, HSTS |
| **Autenticación** | bcrypt con 14 rounds, JWT HS512 |
| **2FA** | TOTP con códigos de respaldo |
| **Rate Limiting** | Por IP y usuario, diferentes límites por endpoint |
| **CSRF** | Token-based, Double Submit Cookie |
| **XSS** | CSP headers, sanitización de inputs |
| **SQL Injection** | Prisma ORM con queries parametrizadas |
| **Auditoría** | Log completo de acciones con IP y timestamp |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL 14+
- npm o pnpm

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/consulado-espana-oran/website.git
cd consulado-espana-oran

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Generar cliente Prisma
npx prisma generate

# 5. Ejecutar migraciones
npx prisma migrate dev

# 6. Cargar datos iniciales
npx prisma db seed

# 7. Iniciar en desarrollo
npm run dev
```

### Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar producción
npm run lint         # Linter
npm run type-check   # Verificar tipos
npm run test         # Tests
npm run db:seed      # Cargar datos iniciales
npm run db:studio    # Prisma Studio
```

---

## ⚙️ Configuración

### Variables de Entorno Críticas

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Seguridad JWT (IMPORTANTE: usar claves de 64+ caracteres)
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."

# Encriptación (IMPORTANTE: usar clave de 32 bytes)
ENCRYPTION_KEY="..."

# 2FA habilitado
ENABLE_2FA="true"
```

---

## 📝 Servicios Consulares

El sistema soporta **20+ servicios** organizados en categorías:

### Pasaportes
- Expedición de pasaporte nuevo
- Renovación de pasaporte

### Visados
- Visado Schengen (corta duración)
- Visado Nacional (tipo D)
- Visado de reagrupación familiar

### Registro Civil
- Inscripción de nacimiento
- Inscripción de matrimonio
- Inscripción de defunción

### Nacionalidad
- Nacionalidad por origen
- Nacionalidad por residencia

### Notaría
- Poderes notariales
- Fe de vida
- Actas de notoriedad

### Legalizaciones
- Legalización de documentos
- Compulsa de documentos

### Censo Electoral
- Empadronamiento consular
- Alta en CERA

### Protección Consular
- Asistencia a detenidos
- Emergencia consular

---

## 📚 API Reference

### Autenticación

```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/verify-2fa
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Citas

```http
GET    /api/appointments          # Listar citas del usuario
POST   /api/appointments          # Crear nueva cita
GET    /api/appointments/:id      # Obtener cita
PUT    /api/appointments/:id      # Actualizar cita
DELETE /api/appointments/:id      # Cancelar cita
```

### Servicios

```http
GET /api/services                 # Listar servicios
GET /api/services/:id             # Obtener servicio
GET /api/services/:id/availability # Disponibilidad
```

---

## 🎯 Super Mega Prompt para Cursor

Copia y pega este prompt en Cursor Editor para continuar el desarrollo:

```
# SUPER MEGA PROMPT - CONSULADO DE ESPAÑA EN ORÁN

## CONTEXTO DEL PROYECTO

Estás trabajando en el sistema de citas y portal web del Consulado General de España en Orán, Argelia. Este es un proyecto GUBERNAMENTAL que requiere el MÁXIMO NIVEL DE SEGURIDAD.

### Información del Consulado:
- **Nombre**: Consulado General de España en Orán
- **Dirección**: Bd Colonel Lotfi n° 4, 31000 Orán, Argelia
- **Teléfono**: +213 41 40 88 46
- **Email**: cog.oran@maec.es
- **Horario**: Lunes a Jueves, 08:30 - 14:30
- **Emergencias 24h**: +213 770 95 42 46
- **Jurisdicción**: Orán, Mascara, Mostaganem, Relizane, Sidi Bel Abbes, Ain Temouchent, Tlemcen, Tiaret, Tissemsilt, Saida, El Bayadh, Naama

### Stack Tecnológico:
- Next.js 15 con App Router
- TypeScript 5 estricto
- Tailwind CSS 4
- Prisma ORM con PostgreSQL
- NextAuth.js para autenticación
- Zod para validación
- Framer Motion para animaciones

### Requisitos de Seguridad (NIVEL GUBERNAMENTAL):

1. **Autenticación**:
   - bcrypt con 14 rounds
   - JWT HS512 con rotación
   - 2FA obligatorio con TOTP
   - Códigos de respaldo cifrados
   - Bloqueo tras 5 intentos fallidos

2. **Encriptación**:
   - AES-256-GCM para datos sensibles
   - Claves derivadas con PBKDF2 (100k iteraciones)
   - SHA-512 para checksums

3. **Rate Limiting**:
   - Login: 5 intentos / 15 min
   - API: 100 req / min
   - 2FA: 3 intentos / 5 min

4. **Headers HTTP**:
   - Content-Security-Policy estricto
   - X-Frame-Options: DENY
   - Strict-Transport-Security
   - X-Content-Type-Options: nosniff

5. **Auditoría**:
   - Log de TODAS las acciones
   - IP, User-Agent, Timestamp
   - Eventos de seguridad críticos

### Servicios a Implementar:
- Pasaportes (nuevo, renovación)
- Visados (Schengen, Nacional, Reagrupación)
- Registro Civil (nacimiento, matrimonio, defunción)
- Nacionalidad (origen, residencia)
- Notaría (poderes, fe de vida)
- Legalizaciones y compulsas
- Censo electoral (CERA, empadronamiento)
- Protección consular (emergencias)
- Antecedentes penales

### Estilo Visual:
- Colores España: #C60B1E (rojo), #FFC400 (amarillo)
- Diseño institucional, profesional y accesible
- Responsive mobile-first
- Soporte multiidioma (ES, AR, FR)
- Cumplimiento WCAG 2.1 AA

### Estructura de Archivos:
```
src/
├── app/                    # App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── (main)/            # Rutas principales
│   ├── admin/             # Panel de administración
│   └── api/               # API Routes
├── components/
│   ├── ui/                # Componentes base
│   ├── layout/            # Header, Footer
│   ├── forms/             # Formularios
│   └── booking/           # Sistema de citas
├── lib/
│   ├── security/          # Módulos de seguridad
│   ├── db/                # Prisma client
│   └── utils/             # Utilidades
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── config/                # Configuración
```

### REGLAS ESTRICTAS:

1. NUNCA almacenar contraseñas en texto plano
2. NUNCA exponer tokens o secretos en el cliente
3. SIEMPRE validar inputs con Zod
4. SIEMPRE usar Prisma para queries (prevenir SQL injection)
5. SIEMPRE sanitizar outputs (prevenir XSS)
6. SIEMPRE verificar autenticación en rutas protegidas
7. SIEMPRE usar HTTPS en producción
8. SIEMPRE registrar eventos de seguridad
9. NUNCA confiar en datos del cliente
10. SIEMPRE aplicar principio de mínimo privilegio

### Cuando te pida código:
- Usa TypeScript estricto
- Incluye validación de errores
- Implementa manejo de excepciones
- Añade comentarios en español
- Sigue las convenciones del proyecto
- Prioriza seguridad sobre velocidad

¿Qué necesitas implementar a continuación?
```

---

## 📄 Licencia

Este proyecto es propiedad del Ministerio de Asuntos Exteriores, Unión Europea y Cooperación del Gobierno de España.

---

## 🤝 Contacto

**Consulado General de España en Orán**

- 📍 Bd Colonel Lotfi n° 4, 31000 Orán, Argelia
- 📞 +213 41 40 88 46
- 📧 cog.oran@maec.es
- 🌐 https://www.exteriores.gob.es/Consulados/oran

---

<div align="center">

**🇪🇸 Gobierno de España**

*Ministerio de Asuntos Exteriores, Unión Europea y Cooperación*

</div>
