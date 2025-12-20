# PROMPT MEGA COMPLETO: PÁGINA WEB ÉLITE CONSULADO DE ESPAÑA EN ORÁN

## CONTEXTO Y OBJETIVO

Construir una página web de nivel gubernamental/élite para el Consulado de España en Orán (Argelia) con un sistema de reservas completo, seguridad de nivel militar, y diseño profesional de clase mundial.

---

## INFORMACIÓN DEL CONSULADO DE ESPAÑA EN ORÁN

### Datos del Consulado:
- **Nombre**: Consulado General de España en Orán
- **Ubicación**: Orán, Argelia
- **Dirección**: [A investigar y completar]
- **Teléfono**: [A investigar y completar]
- **Email**: [A investigar y completar]
- **Horario de atención**: Lunes a Viernes, 9:00 - 14:00 (horario local)
- **Zona de competencia**: Oeste de Argelia (Orán, Mostaganem, Tlemcen, Sidi Bel Abbès, etc.)

### Trámites y Servicios Consulares Disponibles:

#### 1. PASAPORTES ESPAÑOLES
- Expedición de pasaporte ordinario
- Renovación de pasaporte
- Duplicado de pasaporte (extraviado/robado)
- Pasaporte de emergencia
- Requisitos: DNI español, fotografía reciente, formulario cumplimentado, tasa consular

#### 2. VISADOS
- Visado de tránsito
- Visado de corta estancia (turismo/negocios)
- Visado de larga estancia
- Visado de trabajo
- Visado de estudios
- Visado de reagrupación familiar
- Requisitos: Formulario, pasaporte válido, fotografías, seguro médico, justificante económico, etc.

#### 3. REGISTRO CIVIL
- Inscripción de nacimiento
- Inscripción de matrimonio
- Inscripción de defunción
- Certificado de nacimiento
- Certificado de matrimonio
- Certificado de defunción
- Certificado de soltería
- Requisitos: Documentación original, traducción jurada si aplica, formularios oficiales

#### 4. LEGALIZACIONES
- Legalización de documentos públicos españoles
- Legalización de documentos argelinos para uso en España
- Apostilla de La Haya (si aplica)
- Requisitos: Documento original, copia, formulario de solicitud

#### 5. CERTIFICADOS Y DOCUMENTOS
- Certificado de residencia consular
- Certificado de antecedentes penales
- Certificado de nacionalidad española
- Certificado de empadronamiento consular
- Requisitos: DNI/NIE, formulario, tasa consular

#### 6. PODERES NOTARIALES
- Poder general
- Poder especial
- Revocación de poderes
- Requisitos: DNI, documento a otorgar, testigos si aplica

#### 7. ASISTENCIA CONSULAR
- Asistencia a españoles en situación de emergencia
- Registro de Matrícula Consular
- Actualización de datos consulares
- Asistencia en caso de detención
- Asistencia en caso de accidente/enfermedad
- Requisitos: DNI español, formulario de registro

#### 8. NACIONALIDAD ESPAÑOLA
- Solicitud de nacionalidad por opción
- Solicitud de nacionalidad por residencia
- Recuperación de nacionalidad
- Requisitos: Documentación específica según caso, formularios oficiales

#### 9. DOCUMENTOS DE IDENTIDAD
- Expedición de DNI (si aplica)
- Certificado de identidad
- Requisitos: Documentación de identidad, fotografías

#### 10. MATRÍCULA CONSULAR
- Alta en Registro de Matrícula Consular
- Modificación de datos
- Baja del registro
- Requisitos: DNI español, comprobante de residencia, formulario

---

## ESPECIFICACIONES TÉCNICAS Y DE SEGURIDAD

### ARQUITECTURA DE SEGURIDAD DE NIVEL GUbernamental/MILITAR

#### 1. SEGURIDAD DE INFRAESTRUCTURA
- **HTTPS obligatorio** con certificados SSL/TLS de nivel empresarial (Let's Encrypt o similar)
- **HSTS (HTTP Strict Transport Security)** habilitado
- **CSP (Content Security Policy)** estricto
- **XSS Protection** habilitado
- **CSRF Protection** en todos los formularios
- **Rate Limiting** por IP y usuario
- **DDoS Protection** con Cloudflare o similar
- **Firewall de aplicación web (WAF)**
- **Backups automáticos** diarios con cifrado
- **Logging y auditoría** completo de todas las acciones

#### 2. AUTENTICACIÓN Y AUTORIZACIÓN
- **Autenticación de dos factores (2FA)** obligatoria para usuarios registrados
- **Autenticación biométrica** (opcional, para usuarios premium)
- **Sesiones seguras** con tokens JWT firmados y con expiración corta
- **Contraseñas**: Mínimo 12 caracteres, mayúsculas, minúsculas, números, símbolos especiales
- **Hashing de contraseñas**: bcrypt con salt (cost factor 12+)
- **Bloqueo de cuenta** tras 5 intentos fallidos
- **Verificación de email** obligatoria
- **ReCAPTCHA v3** en formularios críticos
- **Roles y permisos** granulares (ciudadano, administrador, consulado, superadmin)

#### 3. PROTECCIÓN DE DATOS PERSONALES (RGPD/LOPD)
- **Cifrado end-to-end** de datos sensibles
- **Cifrado en reposo** de la base de datos (AES-256)
- **Cifrado en tránsito** (TLS 1.3)
- **Minimización de datos**: Solo recopilar datos necesarios
- **Consentimiento explícito** para tratamiento de datos
- **Derecho al olvido** implementado
- **Portabilidad de datos** disponible
- **Notificación de brechas** de seguridad en 72 horas
- **Política de privacidad** clara y accesible
- **Cookies**: Consentimiento explícito, categorización

#### 4. SEGURIDAD DE BASE DE DATOS
- **Prepared Statements** obligatorios (prevención SQL Injection)
- **Principio de menor privilegio** en acceso a BD
- **Backups cifrados** automáticos
- **Encriptación de campos sensibles** (DNI, pasaportes, emails)
- **Logging de consultas** sensibles
- **Conexiones seguras** a la base de datos
- **Separación de entornos** (desarrollo, staging, producción)

#### 5. SEGURIDAD DE APLICACIÓN
- **Validación estricta** de entrada (server-side y client-side)
- **Sanitización** de todos los inputs
- **Protección contra inyección** (SQL, NoSQL, Command, LDAP)
- **Validación de archivos** subidos (tipo, tamaño, contenido)
- **Escaneo de malware** en archivos subidos
- **Headers de seguridad** HTTP:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: geolocation=(), microphone=(), camera=()

#### 6. MONITOREO Y DETECCIÓN DE AMENAZAS
- **SIEM (Security Information and Event Management)**
- **Detección de intrusiones** (IDS/IPS)
- **Análisis de comportamiento** de usuarios
- **Alertas en tiempo real** de actividades sospechosas
- **Logs centralizados** y análisis de seguridad
- **Penetration testing** periódico
- **Vulnerability scanning** automático

---

## STACK TECNOLÓGICO RECOMENDADO

### Frontend:
- **Framework**: Next.js 14+ (React) con TypeScript
- **Estilos**: Tailwind CSS + CSS Modules
- **Componentes**: shadcn/ui o Material-UI
- **Estado**: Zustand o Redux Toolkit
- **Formularios**: React Hook Form + Zod (validación)
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React o Heroicons
- **Internacionalización**: next-i18next (ES/FR/AR)

### Backend:
- **Framework**: Next.js API Routes o Node.js con Express/Fastify
- **Base de datos**: PostgreSQL 15+ (con cifrado)
- **ORM**: Prisma o TypeORM
- **Autenticación**: NextAuth.js o Auth0
- **Validación**: Zod
- **Email**: SendGrid o AWS SES
- **Almacenamiento**: AWS S3 o similar (cifrado)

### Infraestructura:
- **Hosting**: Vercel, AWS, o Azure (con certificaciones de seguridad)
- **CDN**: Cloudflare (con WAF)
- **Monitoreo**: Sentry, LogRocket
- **CI/CD**: GitHub Actions con seguridad integrada

---

## FUNCIONALIDADES DEL SISTEMA DE RESERVAS

### 1. GESTIÓN DE CITAS

#### Características:
- **Calendario interactivo** con disponibilidad en tiempo real
- **Múltiples tipos de citas** por trámite
- **Duración variable** según tipo de trámite
- **Horarios configurables** por día de la semana
- **Festivos y días no laborables** configurables
- **Zonas horarias** correctas (GMT+1 para Orán)
- **Notificaciones** por email y SMS
- **Recordatorios automáticos** (24h y 2h antes)
- **Cancelación y modificación** de citas
- **Lista de espera** para citas canceladas
- **Historial completo** de citas del usuario

#### Flujo de Reserva:
1. Usuario selecciona tipo de trámite
2. Sistema muestra requisitos y documentación necesaria
3. Usuario selecciona fecha y hora disponible
4. Usuario completa formulario con datos personales
5. Usuario sube documentación requerida (pre-validación)
6. Confirmación de cita con código único
7. Email de confirmación con detalles
8. Recordatorios automáticos

### 2. GESTIÓN DE TRÁMITES

#### Por cada trámite:
- **Información detallada** del trámite
- **Requisitos específicos** listados
- **Documentación necesaria** con ejemplos
- **Tasas consulares** actualizadas
- **Tiempo estimado** de resolución
- **Estado del trámite** en tiempo real
- **Seguimiento** del progreso
- **Notificaciones** de cambios de estado
- **Descarga de documentos** una vez completados

### 3. PANEL DE USUARIO

#### Funcionalidades:
- **Dashboard personalizado**
- **Mis citas** (próximas, pasadas, canceladas)
- **Mis trámites** (en curso, completados, rechazados)
- **Documentos** subidos y generados
- **Perfil** con datos personales
- **Configuración** de notificaciones
- **Historial completo** de actividad
- **Facturas y pagos**

### 4. PANEL DE ADMINISTRACIÓN

#### Funcionalidades:
- **Gestión de citas** (ver, editar, cancelar)
- **Gestión de usuarios** y permisos
- **Gestión de trámites** y requisitos
- **Configuración de horarios** y disponibilidad
- **Gestión de documentos** y plantillas
- **Reportes y estadísticas**
- **Logs de seguridad** y auditoría
- **Gestión de notificaciones**
- **Backup y restauración**

---

## DISEÑO Y UX

### Principios de Diseño:
- **Diseño limpio y profesional** estilo gubernamental
- **Colores oficiales** de España (rojo #AA151B, amarillo #F1BF00)
- **Accesibilidad WCAG 2.1 AA** mínimo
- **Responsive design** (mobile-first)
- **Carga rápida** (< 3 segundos)
- **Navegación intuitiva**
- **Feedback visual** claro en todas las acciones
- **Mensajes de error** claros y útiles
- **Multilingüe**: Español, Francés, Árabe

### Componentes de UI:
- **Header** con logo, navegación, idioma, login
- **Hero section** con información destacada
- **Sección de servicios** con cards interactivas
- **Formularios** claros y validados
- **Calendario** de citas visual e intuitivo
- **Tablas** de datos con paginación y filtros
- **Modales** para confirmaciones y detalles
- **Notificaciones** toast para feedback
- **Footer** con información de contacto y enlaces

---

## ESTRUCTURA DE ARCHIVOS PROPUESTA

```
consulado-oran/
├── .env.local                    # Variables de entorno (NO commitear)
├── .env.example                  # Ejemplo de variables
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── prisma/
│   ├── schema.prisma            # Esquema de base de datos
│   └── migrations/              # Migraciones
├── public/
│   ├── images/
│   ├── documents/
│   └── favicon.ico
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Homepage
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── citas/
│   │   │   ├── tramites/
│   │   │   └── perfil/
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/
│   │   │   ├── citas/
│   │   │   ├── tramites/
│   │   │   ├── usuarios/
│   │   │   └── documentos/
│   │   └── tramites/            # Páginas de trámites
│   ├── components/
│   │   ├── ui/                  # Componentes base (shadcn)
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── citas/
│   │   └── tramites/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── security.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   ├── store/                   # Estado global
│   └── styles/
│       └── globals.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
    ├── API.md
    ├── SECURITY.md
    └── DEPLOYMENT.md
```

---

## MODELO DE DATOS (ESQUEMA PRISMA)

```prisma
// Usuarios
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  dni           String?  @unique
  nombre        String
  apellidos     String
  telefono      String?
  fechaNacimiento DateTime?
  nacionalidad  String?
  direccion     String?
  ciudad        String?
  codigoPostal  String?
  pais          String   @default("Argelia")
  
  // Seguridad
  emailVerified  DateTime?
  twoFactorEnabled Boolean @default(false)
  twoFactorSecret String?
  failedLoginAttempts Int @default(0)
  lockedUntil   DateTime?
  
  // Relaciones
  citas         Cita[]
  tramites      Tramite[]
  documentos    Documento[]
  notificaciones Notificacion[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Tipos de Trámites
model TipoTramite {
  id            String   @id @default(cuid())
  codigo        String   @unique
  nombre        String
  nombreAr      String?
  nombreFr      String?
  descripcion   String
  requisitos    Json     // Array de requisitos
  documentacion Json     // Array de documentos necesarios
  tasa          Float
  duracionMinutos Int    // Duración de la cita
  activo        Boolean  @default(true)
  
  citas         Cita[]
  tramites      Tramite[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Citas
model Cita {
  id            String   @id @default(cuid())
  codigo        String   @unique // Código único de confirmación
  userId        String
  tipoTramiteId String
  
  fecha         DateTime
  hora          String
  estado        CitaEstado @default(PENDIENTE)
  
  // Datos adicionales
  observaciones String?
  motivoCancelacion String?
  
  // Relaciones
  user          User     @relation(fields: [userId], references: [id])
  tipoTramite   TipoTramite @relation(fields: [tipoTramiteId], references: [id])
  tramite       Tramite?
  
  // Notificaciones
  notificacionEnviada24h Boolean @default(false)
  notificacionEnviada2h  Boolean @default(false)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([fecha, hora])
  @@index([userId])
  @@index([estado])
}

enum CitaEstado {
  PENDIENTE
  CONFIRMADA
  COMPLETADA
  CANCELADA
  NO_PRESENTADO
}

// Trámites
model Tramite {
  id            String   @id @default(cuid())
  codigo        String   @unique
  userId        String
  tipoTramiteId String
  citaId        String?  @unique
  
  estado        TramiteEstado @default(EN_TRAMITE)
  fechaInicio   DateTime @default(now())
  fechaFin      DateTime?
  
  // Documentación
  documentosSubidos Json // Array de documentos
  observaciones     String?
  resultado         String?
  
  // Relaciones
  user          User     @relation(fields: [userId], references: [id])
  tipoTramite   TipoTramite @relation(fields: [tipoTramiteId], references: [id])
  cita          Cita?    @relation(fields: [citaId], references: [id])
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([userId])
  @@index([estado])
}

enum TramiteEstado {
  EN_TRAMITE
  PENDIENTE_DOCUMENTACION
  COMPLETADO
  RECHAZADO
  CANCELADO
}

// Documentos
model Documento {
  id            String   @id @default(cuid())
  userId        String
  tramiteId     String?
  
  nombre        String
  tipo          String   // tipo de documento
  ruta          String   // ruta en almacenamiento
  tamaño        Int
  mimeType      String
  hash          String   // Hash SHA-256 para integridad
  
  validado      Boolean  @default(false)
  fechaValidacion DateTime?
  
  user          User     @relation(fields: [userId], references: [id])
  
  createdAt     DateTime @default(now())
  
  @@index([userId])
  @@index([tramiteId])
}

// Notificaciones
model Notificacion {
  id            String   @id @default(cuid())
  userId        String
  
  tipo          TipoNotificacion
  titulo        String
  mensaje       String
  leida         Boolean  @default(false)
  enlace        String?
  
  user          User     @relation(fields: [userId], references: [id])
  
  createdAt     DateTime @default(now())
  
  @@index([userId, leida])
}

enum TipoNotificacion {
  CITA_CONFIRMADA
  CITA_RECORDATORIO
  CITA_CANCELADA
  TRAMITE_ACTUALIZADO
  DOCUMENTO_RECIBIDO
  DOCUMENTO_VALIDADO
  TRAMITE_COMPLETADO
  TRAMITE_RECHAZADO
  SISTEMA
}

// Configuración de Horarios
model HorarioConsulado {
  id            String   @id @default(cuid())
  diaSemana     Int      // 0=Domingo, 1=Lunes, ..., 6=Sábado
  horaInicio    String   // "09:00"
  horaFin       String   // "14:00"
  activo        Boolean  @default(true)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@unique([diaSemana])
}

// Festivos
model Festivo {
  id            String   @id @default(cuid())
  fecha         DateTime @unique
  nombre        String
  nombreAr      String?
  nombreFr      String?
  tipo          TipoFestivo @default(NACIONAL)
  
  createdAt     DateTime @default(now())
}

enum TipoFestivo {
  NACIONAL_ESPAÑA
  NACIONAL_ARGELIA
  LOCAL
  RELIGIOSO
}

// Logs de Seguridad
model SecurityLog {
  id            String   @id @default(cuid())
  userId        String?
  tipo          TipoLogSeguridad
  ip            String?
  userAgent     String?
  detalles      Json?
  severidad     SeveridadLog @default(INFO)
  
  createdAt     DateTime @default(now())
  
  @@index([userId])
  @@index([tipo])
  @@index([createdAt])
}

enum TipoLogSeguridad {
  LOGIN_EXITOSO
  LOGIN_FALLIDO
  LOGOUT
  CAMBIO_PASSWORD
  CAMBIO_EMAIL
  ACCESO_DENEGADO
  ACTIVIDAD_SOSPECHOSA
  CAMBIO_PERMISOS
  ELIMINACION_DATOS
}

enum SeveridadLog {
  INFO
  WARNING
  ERROR
  CRITICAL
}
```

---

## ENDPOINTS API PRINCIPALES

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/verify-email` - Verificación de email
- `POST /api/auth/forgot-password` - Recuperación de contraseña
- `POST /api/auth/reset-password` - Reset de contraseña
- `POST /api/auth/2fa/enable` - Habilitar 2FA
- `POST /api/auth/2fa/verify` - Verificar código 2FA

### Citas
- `GET /api/citas/disponibilidad` - Obtener disponibilidad
- `POST /api/citas` - Crear cita
- `GET /api/citas` - Listar citas del usuario
- `GET /api/citas/:id` - Obtener cita específica
- `PUT /api/citas/:id` - Modificar cita
- `DELETE /api/citas/:id` - Cancelar cita
- `GET /api/citas/:id/confirmar` - Confirmar asistencia

### Trámites
- `GET /api/tramites/tipos` - Listar tipos de trámites
- `GET /api/tramites/tipos/:id` - Obtener detalles de tipo de trámite
- `GET /api/tramites` - Listar trámites del usuario
- `POST /api/tramites` - Iniciar trámite
- `GET /api/tramites/:id` - Obtener trámite específico
- `PUT /api/tramites/:id` - Actualizar trámite
- `GET /api/tramites/:id/estado` - Obtener estado del trámite

### Documentos
- `POST /api/documentos` - Subir documento
- `GET /api/documentos` - Listar documentos del usuario
- `GET /api/documentos/:id` - Descargar documento
- `DELETE /api/documentos/:id` - Eliminar documento
- `POST /api/documentos/:id/validar` - Validar documento (admin)

### Usuario
- `GET /api/usuario/perfil` - Obtener perfil
- `PUT /api/usuario/perfil` - Actualizar perfil
- `PUT /api/usuario/password` - Cambiar contraseña
- `GET /api/usuario/notificaciones` - Obtener notificaciones
- `PUT /api/usuario/notificaciones/:id/leer` - Marcar como leída

### Admin
- `GET /api/admin/citas` - Listar todas las citas
- `PUT /api/admin/citas/:id` - Gestionar cita
- `GET /api/admin/tramites` - Listar todos los trámites
- `PUT /api/admin/tramites/:id` - Gestionar trámite
- `GET /api/admin/usuarios` - Listar usuarios
- `PUT /api/admin/usuarios/:id` - Gestionar usuario
- `GET /api/admin/estadisticas` - Obtener estadísticas
- `GET /api/admin/logs` - Obtener logs de seguridad
- `PUT /api/admin/horarios` - Configurar horarios
- `POST /api/admin/festivos` - Añadir festivo

---

## VALIDACIONES Y REGLAS DE NEGOCIO

### Validaciones de Citas:
- No se pueden crear citas en el pasado
- No se pueden crear citas fuera del horario de atención
- No se pueden crear citas en festivos
- Máximo 1 cita activa por usuario por tipo de trámite
- Cancelación mínima 24h antes (excepto emergencias)
- Bloqueo de usuario tras 3 cancelaciones consecutivas

### Validaciones de Documentos:
- Tipos de archivo permitidos: PDF, JPG, PNG, DOC, DOCX
- Tamaño máximo: 10MB por archivo
- Escaneo de malware antes de almacenar
- Validación de contenido (no solo extensión)
- Hash SHA-256 para integridad

### Validaciones de Usuario:
- Email único y válido
- DNI/NIE formato español válido
- Teléfono formato internacional
- Edad mínima 18 años (o con tutor legal)

---

## TESTING Y CALIDAD

### Tests Requeridos:
- **Unit Tests**: Componentes, utilidades, validaciones
- **Integration Tests**: Flujos completos de usuario
- **E2E Tests**: Cypress o Playwright
- **Security Tests**: OWASP Top 10, penetration testing
- **Performance Tests**: Carga, estrés, latencia
- **Accessibility Tests**: WCAG compliance

### Cobertura Mínima:
- Código: 80%+
- Funcionalidades críticas: 100%

---

## DESPLIEGUE Y OPERACIONES

### Pre-despliegue:
- [ ] Revisión de seguridad completa
- [ ] Penetration testing
- [ ] Pruebas de carga
- [ ] Backup de base de datos
- [ ] Documentación actualizada
- [ ] Plan de rollback preparado

### Post-despliegue:
- [ ] Monitoreo activo 24/7
- [ ] Alertas configuradas
- [ ] Logs centralizados
- [ ] Backups automáticos verificados
- [ ] Documentación de incidentes

---

## DOCUMENTACIÓN ADICIONAL REQUERIDA

1. **Manual de Usuario** (ES/FR/AR)
2. **Manual de Administrador**
3. **Política de Privacidad** (RGPD compliant)
4. **Términos y Condiciones**
5. **Política de Cookies**
6. **Guía de Seguridad**
7. **API Documentation** (OpenAPI/Swagger)

---

## CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Setup y Infraestructura
- [ ] Configurar proyecto Next.js con TypeScript
- [ ] Configurar base de datos PostgreSQL
- [ ] Configurar Prisma ORM
- [ ] Configurar autenticación (NextAuth.js)
- [ ] Configurar Tailwind CSS
- [ ] Configurar variables de entorno
- [ ] Configurar CI/CD

### Fase 2: Seguridad Base
- [ ] Implementar HTTPS/TLS
- [ ] Implementar CSP headers
- [ ] Implementar CSRF protection
- [ ] Implementar rate limiting
- [ ] Implementar validación de inputs
- [ ] Implementar sanitización
- [ ] Configurar WAF

### Fase 3: Autenticación y Autorización
- [ ] Sistema de registro
- [ ] Sistema de login
- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] 2FA
- [ ] Gestión de sesiones
- [ ] Roles y permisos

### Fase 4: Sistema de Reservas
- [ ] Modelo de datos de citas
- [ ] Calendario de disponibilidad
- [ ] Creación de citas
- [ ] Modificación de citas
- [ ] Cancelación de citas
- [ ] Notificaciones de citas
- [ ] Lista de espera

### Fase 5: Gestión de Trámites
- [ ] Catálogo de trámites
- [ ] Información de cada trámite
- [ ] Inicio de trámite
- [ ] Seguimiento de trámite
- [ ] Gestión de documentos
- [ ] Estados de trámite

### Fase 6: Panel de Usuario
- [ ] Dashboard
- [ ] Mis citas
- [ ] Mis trámites
- [ ] Mis documentos
- [ ] Perfil
- [ ] Notificaciones

### Fase 7: Panel de Administración
- [ ] Gestión de citas
- [ ] Gestión de trámites
- [ ] Gestión de usuarios
- [ ] Configuración de horarios
- [ ] Reportes y estadísticas
- [ ] Logs de seguridad

### Fase 8: Diseño y UX
- [ ] Diseño responsive
- [ ] Componentes UI
- [ ] Internacionalización
- [ ] Accesibilidad
- [ ] Optimización de rendimiento

### Fase 9: Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Security tests
- [ ] Performance tests

### Fase 10: Despliegue
- [ ] Configurar producción
- [ ] SSL/TLS
- [ ] Monitoreo
- [ ] Backups
- [ ] Documentación

---

## NOTAS FINALES

Este prompt es un documento vivo que debe actualizarse con:
- Información real del Consulado de España en Orán
- Requisitos específicos adicionales
- Cambios en normativas legales
- Mejoras de seguridad descubiertas
- Feedback de usuarios

**IMPORTANTE**: Antes de implementar, verificar:
1. Información oficial del consulado
2. Requisitos legales específicos de España y Argelia
3. Normativas de protección de datos (RGPD, LOPD)
4. Certificaciones de seguridad requeridas
5. Integraciones con sistemas gubernamentales existentes

---

## RECURSOS ADICIONALES

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [RGPD](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Prisma Security](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**FIN DEL PROMPT**
