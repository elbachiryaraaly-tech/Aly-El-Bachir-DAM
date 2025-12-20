# 🏛️ SUPER MEGA PROMPT - CONSULADO DE ESPAÑA EN ORÁN
## Sistema Web Elite con Seguridad Nivel Gubernamental

---

## 📋 CONTEXTO Y OBJETIVO

Construir una plataforma web de nivel ELITE para el **Consulado General de España en Orán, Argelia** que incluya:
- Sistema de reservas de citas para TODOS los trámites consulares
- Seguridad de nivel militar/gubernamental
- Experiencia de usuario excepcional
- Cumplimiento con normativas internacionales de protección de datos (RGPD)
- Sistema multiidioma (Español, Francés, Árabe, Inglés)
- Integración con sistemas gubernamentales españoles

---

## 🏢 INFORMACIÓN DEL CONSULADO DE ESPAÑA EN ORÁN

### Datos Oficiales
- **Nombre:** Consulado General de España en Orán
- **Dirección:** 6, Rue d'Arzew, Orán, Argelia
- **Jurisdicción:** Wilayas de Orán, Mostaganem, Mascara, Saïda, Tiaret, Tissemsilt, Relizane, Sidi Bel Abbès, Tlemcen, Aïn Témouchent, Naâma, Béchar, Adrar, Tindouf y El Bayadh
- **Horario de atención:** Lunes a Viernes, 08:30 - 15:00
- **Horario de urgencias consulares:** 24/7 (número de emergencia)
- **Email:** cog.oran@maec.es
- **Teléfono:** +213 (0)41 39 21 18 / +213 (0)41 39 21 33
- **Dependencia:** Embajada de España en Argel

### Servicios Consulares Disponibles

#### 1. SERVICIOS DE DOCUMENTACIÓN
- **Pasaportes**
  - Expedición de pasaporte ordinario (primera vez)
  - Renovación de pasaporte
  - Pasaporte de emergencia
  - Pasaporte para menores
  - Duplicado por robo o extravío

- **DNI (Documento Nacional de Identidad)**
  - Expedición DNI primera vez
  - Renovación DNI
  - DNI para menores
  - Duplicado por robo o extravío

- **Certificaciones y Documentos**
  - Certificado de nacimiento
  - Certificado de defunción
  - Certificado de matrimonio
  - Certificado de últimas voluntades
  - Certificado de actos de última voluntad
  - Certificado de seguros de vida
  - Certificado de antecedentes penales
  - Certificado de inscripción consular
  - Certificado de residencia
  - Certificado de nacionalidad española
  - Certificado de concordancia de nombres
  - Copias compulsadas de documentos

#### 2. REGISTRO CIVIL
- Inscripción de nacimiento
- Inscripción de matrimonio celebrado en el extranjero
- Inscripción de defunción
- Libro de familia (expedición y actualizaciones)
- Cambio de nombre y apellidos
- Reconocimiento de hijos
- Expedientes de dominio para inscripción de hechos
- Anotaciones marginales
- Rectificación de actas

#### 3. SERVICIOS NOTARIALES
- Compulsas de documentos
- Legitimaciones de firmas
- Testimonios de documentos
- Declaraciones juradas (affidávit)
- Poderes notariales
- Actas de manifestaciones
- Fe de vida
- Certificados de costumbre legal

#### 4. ASISTENCIA A ESPAÑOLES
- Asistencia en caso de detención o prisión
- Asistencia en caso de fallecimiento
- Repatriaciones
- Asistencia en caso de accidente o enfermedad grave
- Expedición de documentos de viaje de emergencia
- Auxilio judicial internacional
- Localización de personas
- Comunicación de resoluciones judiciales

#### 5. SERVICIOS ELECTORALES
- Inscripción en el Censo Electoral de Residentes Ausentes (CERA)
- Voto por correo desde el extranjero
- Certificados electorales
- Actualización de datos censales

#### 6. NACIONALIDAD
- Solicitud de nacionalidad española por residencia
- Nacionalidad por opción
- Nacionalidad por carta de naturaleza
- Recuperación de nacionalidad española
- Nacionalidad para sefardíes
- Nacionalidad española de origen
- Renuncia a la nacionalidad

#### 7. VISADOS (Tramitados en Orán)
- Visado de corta duración (Schengen C)
- Visado de larga duración (D)
- Visado de tránsito aeroportuario
- Visado de estudiante
- Visado de trabajo
- Visado de reagrupación familiar
- Visado de residencia
- Visado para tratamiento médico

#### 8. LEGALIZACIONES
- Legalización de documentos españoles para uso en Argelia
- Legalización de documentos argelinos para uso en España
- Apostilla de La Haya (cuando aplique)
- Traducciones juradas reconocidas

#### 9. REGISTRO DE MATRÍCULA CONSULAR
- Inscripción de españoles residentes
- Actualización de datos
- Baja consular
- Cambio de domicilio
- Cambio de consulado

#### 10. SERVICIOS ESPECIALES
- Información sobre pensiones
- Información sobre prestaciones sociales
- Información sobre extranjería en España
- Asesoría legal básica
- Información turística y comercial
- Información sobre homologación de títulos
- Certificados COVID-19
- Certificados de vacunación

---

## 🎯 ARQUITECTURA TÉCNICA REQUERIDA

### Stack Tecnológico Recomendado

#### Frontend
```
- Framework: Next.js 14+ (App Router) con React 18+
- TypeScript estricto (strict mode)
- UI Framework: shadcn/ui + Tailwind CSS + Radix UI
- State Management: Zustand o Jotai
- Form Management: React Hook Form + Zod validation
- Animaciones: Framer Motion
- Mapas: Mapbox GL JS o Leaflet
- i18n: next-intl
- Testing: Vitest + React Testing Library + Playwright
```

#### Backend
```
- Runtime: Node.js 20+ LTS
- Framework: NestJS o tRPC + Express
- Autenticación: NextAuth.js v5 (Auth.js)
- Base de datos: PostgreSQL 16+ con Prisma ORM
- Cache: Redis 7+
- Queue System: Bull MQ
- File Storage: AWS S3 o MinIO (self-hosted)
- Email: Nodemailer con template engine
- SMS/2FA: Twilio o servicio similar
```

#### Seguridad (NIVEL GUBERNAMENTAL)
```
- SSL/TLS: Certificados EV (Extended Validation)
- WAF: Cloudflare Enterprise o AWS WAF
- DDoS Protection: Cloudflare o AWS Shield
- Rate Limiting: redis-rate-limiter
- Helmet.js para headers de seguridad
- CORS configurado estrictamente
- CSP (Content Security Policy) estricto
- Sanitización de inputs: DOMPurify + validator.js
- Encriptación en reposo: AES-256-GCM
- Encriptación en tránsito: TLS 1.3+
- Hashing de contraseñas: Argon2id
- 2FA/MFA obligatorio: TOTP (Google Authenticator) + SMS backup
- Biometría: WebAuthn/FIDO2
- Auditoría completa: Winston logger + Elasticsearch
- Firewalls: iptables + fail2ban
- Intrusion Detection: OSSEC o Wazuh
- Backup encriptado: diario, semanal, mensual
- Disaster Recovery Plan (DRP)
```

#### Infraestructura
```
- Cloud Provider: AWS GovCloud / Azure Government / OVH (Europa)
- Container: Docker + Kubernetes (K8s)
- CI/CD: GitHub Actions / GitLab CI
- Monitoring: Prometheus + Grafana + AlertManager
- APM: New Relic o Datadog
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- Secrets Management: HashiCorp Vault
- VPN: WireGuard para acceso administrativo
```

#### Cumplimiento Normativo
```
- RGPD (Reglamento General de Protección de Datos)
- ENS (Esquema Nacional de Seguridad) - Nivel Alto
- CCN-CERT (Centro Criptológico Nacional)
- ISO 27001, ISO 27017, ISO 27018
- eIDAS (Identificación electrónica)
- PCI-DSS (si hay pagos con tarjeta)
- Ley Orgánica de Protección de Datos (LOPD)
```

---

## 🔒 REQUISITOS DE SEGURIDAD DETALLADOS

### 1. Autenticación Multinivel
```typescript
// Sistema de autenticación robusto
- Login con email + contraseña (mínimo 12 caracteres, complejidad alta)
- 2FA obligatorio (TOTP + SMS de respaldo)
- Biometría WebAuthn (huella digital, Face ID)
- OAuth2 con Cl@ve (sistema español de identificación)
- Magic links para recuperación segura
- Bloqueo automático tras 3 intentos fallidos
- Sesiones con JWT + Refresh Tokens
- Rotación automática de tokens
- Detección de anomalías en login (ubicación, dispositivo, hora)
- Captcha inteligente (hCaptcha o reCAPTCHA Enterprise)
```

### 2. Autorización por Roles (RBAC)
```typescript
Roles del sistema:
1. SUPER_ADMIN: Control total del sistema
2. ADMIN_CONSULAR: Gestión de citas y trámites
3. OFICIAL_CONSULAR: Visualización y procesamiento de trámites
4. RECEPCIONISTA: Gestión básica de citas
5. CIUDADANO_REGISTRADO: Usuario final con cita
6. CIUDADANO_INVITADO: Consultas básicas sin registro
7. AUDITOR: Solo lectura para auditorías
8. TECNICO_SOPORTE: Mantenimiento técnico
```

### 3. Encriptación End-to-End
```typescript
- Datos personales: AES-256-GCM
- Documentos subidos: Encriptación en cliente antes de upload
- Comunicaciones: TLS 1.3 con Perfect Forward Secrecy
- Base de datos: Transparent Data Encryption (TDE)
- Backups: Encriptación con claves rotadas mensualmente
- Keys storage: HashiCorp Vault con HSM
```

### 4. Prevención de Ataques
```typescript
Protecciones implementadas:
- SQL Injection: Prepared statements + ORM
- XSS: Sanitización de inputs + CSP headers
- CSRF: Tokens únicos por sesión
- Clickjacking: X-Frame-Options + CSP frame-ancestors
- DDoS: Rate limiting + WAF + CDN
- Brute Force: Account lockout + progressive delays
- Session Hijacking: Secure cookies + HttpOnly + SameSite
- Man-in-the-Middle: HSTS + Certificate Pinning
- File Upload Attacks: Validación de tipo MIME + escaneo antivirus
- API Abuse: API keys + OAuth2 + rate limiting por IP
```

### 5. Auditoría y Logs
```typescript
Logging completo de:
- Todos los accesos al sistema (timestamp, IP, user-agent)
- Todas las acciones CRUD en datos sensibles
- Intentos fallidos de autenticación
- Cambios en configuración del sistema
- Acceso a documentos
- Exportación de datos
- Cambios en permisos
- Logs inmutables con firma digital
- Retención de logs: mínimo 5 años
- Alertas en tiempo real para eventos críticos
```

### 6. Privacidad y RGPD
```typescript
Implementaciones obligatorias:
- Consentimiento explícito para procesamiento de datos
- Derecho al olvido (eliminación completa de datos)
- Portabilidad de datos (exportación en formato estándar)
- Rectificación de datos personales
- Limitación del tratamiento
- Oposición al tratamiento
- Política de privacidad clara y accesible
- Cookie consent banner (obligatorio)
- DPO (Data Protection Officer) designado
- Evaluación de impacto (DPIA)
- Registro de actividades de tratamiento
- Notificación de brechas < 72 horas
```

---

## 🎨 DISEÑO Y EXPERIENCIA DE USUARIO

### Principios de Diseño
```
1. **Accesibilidad (WCAG 2.1 Nivel AAA)**
   - Contraste de color suficiente
   - Navegación por teclado completa
   - Screen reader friendly
   - Textos alternativos en todas las imágenes
   - Formularios con labels claros
   - Transcripciones de videos
   - Tamaños de texto ajustables

2. **Diseño Responsive**
   - Mobile-first approach
   - Soporte para tablets y escritorio
   - Touch-friendly (mínimo 44x44px botones)
   - Orientación portrait y landscape

3. **Identidad Visual**
   - Colores oficiales de España (rojo #C60B1E, amarillo #FFC400)
   - Escudo de España correctamente utilizado
   - Tipografía profesional (Inter, Open Sans, Roboto)
   - Diseño moderno pero institucional
   - Iconografía clara y consistente

4. **Experiencia de Usuario (UX)**
   - Flujos intuitivos y guiados paso a paso
   - Breadcrumbs en navegación
   - Progress indicators en formularios largos
   - Validación en tiempo real de formularios
   - Mensajes de error claros y constructivos
   - Confirmaciones antes de acciones críticas
   - Tooltips informativos
   - FAQ contextual
   - Búsqueda inteligente
   - Tiempos de carga < 2 segundos
```

### Estructura de Páginas

#### 1. Homepage
```
- Hero section con acción principal (Reservar Cita)
- Información de contacto destacada
- Horarios de atención
- Avisos importantes (banner)
- Servicios principales (grid de cards)
- Noticias y actualizaciones
- Mapa de ubicación
- Enlaces rápidos
- Footer completo con enlaces legales
```

#### 2. Sistema de Reservas
```
Flujo paso a paso:
1. Selección de servicio (categorizado y con buscador)
2. Verificación de documentación necesaria (checklist)
3. Selección de fecha y hora (calendario interactivo)
4. Registro o login de usuario
5. Formulario de datos del trámite
6. Subida de documentación (drag & drop)
7. Revisión de información
8. Confirmación y pago (si aplica)
9. Envío de confirmación por email y SMS
10. Panel de seguimiento de cita
```

#### 3. Panel de Usuario (Ciudadano)
```
- Dashboard con citas próximas y pasadas
- Estado de trámites en curso
- Documentos subidos (repositorio seguro)
- Notificaciones
- Mensajería con el consulado
- Descarga de comprobantes
- Gestión de perfil
- Configuración de 2FA
- Historial de accesos
```

#### 4. Panel Administrativo (Personal Consular)
```
- Dashboard con métricas en tiempo real
- Gestión de citas (calendario, reasignación, cancelación)
- Gestión de usuarios
- Procesamiento de trámites
- Sistema de tickets/mensajería
- Generación de documentos
- Reportes y estadísticas
- Configuración del sistema
- Logs de auditoría
- Gestión de contenido (CMS)
```

#### 5. Secciones Informativas
```
- Información sobre cada servicio (detallada)
- Requisitos y documentación necesaria
- Tasas y formas de pago
- Preguntas frecuentes (FAQ)
- Guías paso a paso
- Formularios descargables
- Legislación aplicable
- Avisos y novedades
- Contacto y ubicación
- Horarios especiales y festivos
```

---

## 💻 FUNCIONALIDADES ESPECÍFICAS DEL SISTEMA

### 1. Sistema de Reservas de Citas

#### Features:
```typescript
✅ Calendario inteligente con disponibilidad en tiempo real
✅ Bloqueo de horarios (vacaciones, festivos, eventos especiales)
✅ Capacidad configurable por hora y tipo de trámite
✅ Cola de espera automática
✅ Reprogramación de citas (hasta X horas antes)
✅ Cancelación con aviso previo
✅ Recordatorios automáticos:
   - Email a 7 días, 3 días, 1 día y 2 horas antes
   - SMS a 24 horas y 2 horas antes
   - Notificación push (si app móvil)
✅ Lista de espera para cancelaciones
✅ Check-in virtual (QR code)
✅ Videoconferencia integrada (para algunos trámites)
✅ Sistema de turnos en sala de espera
✅ Integración con Google Calendar / Outlook
```

#### Restricciones:
```typescript
- Máximo 1 cita activa por persona por tipo de trámite
- Tiempo mínimo de anticipación: 48 horas
- Ventana de reserva: hasta 90 días adelante
- Penalización por no presentarse (3 faltas = suspensión temporal)
- Validación de documentación antes de confirmación
```

### 2. Sistema de Gestión Documental

#### Features:
```typescript
✅ Upload de documentos con validaciones:
   - Formatos permitidos: PDF, JPG, PNG (configurable)
   - Tamaño máximo: 10MB por archivo
   - Escaneo antivirus automático
   - Detección de calidad de imagen
   - OCR para extracción de datos
✅ Versionado de documentos
✅ Firma digital de documentos
✅ Encriptación client-side antes de upload
✅ Almacenamiento redundante
✅ Marcas de agua automáticas
✅ Compresión inteligente
✅ Previsualización segura
✅ Descarga con watermark
✅ Trazabilidad completa (quién accedió, cuándo)
```

### 3. Sistema de Pagos

#### Features:
```typescript
✅ Pasarelas de pago seguras:
   - Tarjeta de crédito/débito (Stripe, PayPal)
   - Transferencia bancaria
   - Pago en el consulado (reserva con pago pendiente)
✅ Cálculo automático de tasas
✅ Conversión de divisas en tiempo real
✅ Recibos y facturas electrónicas
✅ Reembolsos gestionados
✅ Historial de transacciones
✅ Conciliación bancaria automática
✅ Cumplimiento PCI-DSS nivel 1
```

### 4. Sistema de Notificaciones

#### Canales:
```typescript
✅ Email (plantillas HTML responsive)
✅ SMS (proveedor internacional)
✅ Notificaciones push (PWA)
✅ Notificaciones en app
✅ WhatsApp Business API (opcional)
```

#### Tipos de notificaciones:
```typescript
- Confirmación de registro
- Confirmación de cita
- Recordatorios de cita
- Cambios en el estado del trámite
- Documentación pendiente
- Trámite completado
- Alertas de seguridad
- Avisos generales del consulado
```

### 5. Sistema de Videoconferencia (Citas Virtuales)

#### Features:
```typescript
✅ Integración con Jitsi Meet (open source) o Zoom
✅ Sala de espera virtual
✅ Grabación de sesiones (consentimiento obligatorio)
✅ Compartir pantalla
✅ Chat durante la videollamada
✅ Verificación de identidad previa
✅ Encriptación end-to-end
✅ Acceso por enlace temporal
✅ Compatible con móviles
```

### 6. Sistema de Gestión de Contenidos (CMS)

#### Features:
```typescript
✅ Editor WYSIWYG para contenido
✅ Multiidioma con traducciones
✅ Gestión de media library
✅ Versionado de contenido
✅ Workflow de aprobación
✅ Programación de publicaciones
✅ SEO optimization integrado
✅ Análisis de contenido
```

### 7. Panel de Analíticas y Reportes

#### Métricas:
```typescript
📊 Citas por tipo de trámite
📊 Tasa de ocupación del consulado
📊 Tiempo promedio por trámite
📊 Satisfacción del usuario (NPS)
📊 Documentos procesados
📊 Ingresos por tasas
📊 Usuarios registrados
📊 Conversión de visitas a citas
📊 Horarios de mayor demanda
📊 Trámites más solicitados
📊 Tiempos de espera promedio
📊 Tasa de cancelaciones
📊 Eventos de seguridad
📊 Performance del sistema
```

#### Exportación:
```typescript
✅ PDF, Excel, CSV
✅ Reportes programados automáticos
✅ Dashboards en tiempo real
✅ Comparativas históricas
```

### 8. Sistema de Tickets/Soporte

#### Features:
```typescript
✅ Sistema de tickets clasificados por prioridad
✅ Asignación automática o manual
✅ Chat en vivo (horario de atención)
✅ Chatbot con IA para preguntas frecuentes
✅ Base de conocimiento (Knowledge Base)
✅ Satisfacción post-resolución
✅ SLA (Service Level Agreement) definidos
✅ Escalamiento automático
```

---

## 🌍 MULTIIDIOMA (i18n)

### Idiomas Requeridos:
```
1. 🇪🇸 Español (principal)
2. 🇫🇷 Francés (oficial en Argelia)
3. 🇸🇦 Árabe (idioma local)
4. 🇬🇧 Inglés (internacional)
```

### Implementación:
```typescript
- Selector de idioma visible en header
- Detección automática por navegador
- Persistencia de preferencia
- Traducciones profesionales (no automáticas)
- Formateo de fechas, números y monedas según locale
- RTL support para árabe
- Traducciones de emails y SMS
- Traducciones de documentos PDF generados
```

---

## 📱 PROGRESSIVE WEB APP (PWA)

### Features:
```typescript
✅ Instalable en dispositivos móviles
✅ Funcionalidad offline básica
✅ Service Workers para cache
✅ Notificaciones push
✅ Icono y splash screen
✅ Manifest.json configurado
✅ Add to home screen prompt
✅ Actualización automática de contenido
```

---

## 🧪 TESTING Y CALIDAD

### Cobertura de Tests:
```typescript
- Unit Tests: > 80% cobertura (Vitest/Jest)
- Integration Tests: endpoints críticos
- E2E Tests: flujos principales (Playwright)
- Security Tests: penetration testing regular
- Load Testing: Apache JMeter / Artillery
- Accessibility Testing: axe-core
- Performance Testing: Lighthouse CI (score > 90)
```

### Code Quality:
```typescript
- ESLint + Prettier configurados
- Husky para pre-commit hooks
- SonarQube para análisis estático
- Dependabot para actualizaciones de seguridad
- Code reviews obligatorios
- Conventional Commits
```

---

## 🚀 DEPLOYMENT Y DEVOPS

### Entornos:
```
1. Development (local)
2. Staging (pre-producción)
3. Production (producción)
```

### CI/CD Pipeline:
```yaml
1. Lint y format check
2. Unit tests
3. Build del proyecto
4. Security scan (Snyk, npm audit)
5. Docker image build
6. Push to registry
7. Deploy to staging
8. E2E tests en staging
9. Aprobación manual
10. Deploy to production
11. Health checks
12. Rollback automático si falla
```

### Monitoring:
```typescript
- Uptime monitoring (99.9% SLA)
- Error tracking (Sentry)
- Performance monitoring (New Relic/Datadog)
- Log aggregation (ELK)
- Alerting (PagerDuty/Opsgenie)
```

---

## 📚 DOCUMENTACIÓN REQUERIDA

### Documentación Técnica:
```
1. README completo con setup instructions
2. API documentation (OpenAPI/Swagger)
3. Architecture Decision Records (ADRs)
4. Database schema documentation
5. Deployment guide
6. Security policies document
7. Disaster recovery plan
8. Backup and restore procedures
9. Monitoring and alerting setup
10. Troubleshooting guide
```

### Documentación de Usuario:
```
1. Manual de usuario (ciudadanos)
2. Manual de administración (personal consular)
3. Guías paso a paso con screenshots
4. Videos tutoriales
5. FAQ completo
6. Términos y condiciones
7. Política de privacidad
8. Política de cookies
```

---

## ⚡ OPTIMIZACIONES DE RENDIMIENTO

```typescript
✅ Server-Side Rendering (SSR) con Next.js
✅ Incremental Static Regeneration (ISR)
✅ Image optimization (WebP, lazy loading, responsive)
✅ Code splitting y lazy loading de componentes
✅ CDN para assets estáticos (Cloudflare/CloudFront)
✅ Compresión Brotli/Gzip
✅ HTTP/2 o HTTP/3
✅ Database indexing optimizado
✅ Query optimization y caching
✅ Redis para session storage y caching
✅ Asset minification
✅ Tree shaking
✅ Bundle size analysis
✅ Prefetching de recursos críticos
✅ Service Worker caching strategy
```

---

## 🔐 COMPLIANCE Y CERTIFICACIONES

### Normativas a Cumplir:
```
✅ RGPD (Reglamento General de Protección de Datos)
✅ ENS (Esquema Nacional de Seguridad) - Categoría Alta
✅ LOPD-GDD (Ley Orgánica de Protección de Datos)
✅ eIDAS (Identificación Electrónica y Servicios de Confianza)
✅ ISO/IEC 27001 (Gestión de Seguridad de la Información)
✅ ISO/IEC 27017 (Seguridad en Cloud)
✅ ISO/IEC 27018 (Protección de Datos en Cloud)
✅ PCI-DSS (si hay procesamiento de tarjetas)
✅ WCAG 2.1 Level AA (Accesibilidad Web)
✅ Directiva NIS (Seguridad de Redes y Sistemas de Información)
```

---

## 📋 ROADMAP DE DESARROLLO SUGERIDO

### Fase 1: Fundamentos (Semanas 1-4)
```
✅ Setup del proyecto y arquitectura
✅ Configuración de base de datos
✅ Sistema de autenticación y autorización
✅ Diseño UI/UX completo
✅ Implementación de seguridad base
✅ Setup de CI/CD
```

### Fase 2: Core Features (Semanas 5-10)
```
✅ Sistema de reservas de citas
✅ Gestión de usuarios y roles
✅ Panel administrativo básico
✅ Sistema de notificaciones
✅ Gestión documental
✅ Multiidioma (i18n)
```

### Fase 3: Features Avanzadas (Semanas 11-16)
```
✅ Sistema de pagos
✅ Videoconferencia
✅ Sistema de tickets/soporte
✅ Analíticas y reportes
✅ CMS para contenido
✅ PWA implementation
```

### Fase 4: Testing y Seguridad (Semanas 17-20)
```
✅ Tests completos (unit, integration, e2e)
✅ Penetration testing
✅ Auditoría de seguridad completa
✅ Load testing
✅ Accessibility audit
✅ Performance optimization
```

### Fase 5: Deployment y Go-Live (Semanas 21-24)
```
✅ Setup de infraestructura producción
✅ Migración de datos (si aplica)
✅ Training del personal consular
✅ Soft launch (beta testing)
✅ Documentación final
✅ Go-live oficial
✅ Post-launch monitoring
```

---

## 🎯 CRITERIOS DE ÉXITO

### KPIs (Key Performance Indicators):
```
📈 Reducción del 70% en tiempo de gestión de citas
📈 95% de satisfacción de usuarios
📈 99.9% de uptime del sistema
📈 < 2 segundos de tiempo de carga
📈 100% de cumplimiento RGPD
📈 0 brechas de seguridad
📈 50% de reducción en llamadas telefónicas al consulado
📈 80% de trámites completados online
📈 Lighthouse score > 90 en todas las métricas
📈 100% de accesibilidad WCAG 2.1 AA
```

---

## 🛡️ CONSIDERACIONES DE SEGURIDAD ADICIONALES

### Protección DDoS:
```typescript
- Cloudflare Enterprise con reglas personalizadas
- Rate limiting por IP: 100 req/min para usuarios anónimos
- Rate limiting por usuario autenticado: 300 req/min
- Análisis de comportamiento con ML
- Geo-blocking de países de alto riesgo (configurable)
- Challenge page para tráfico sospechoso
```

### Gestión de Secretos:
```typescript
- Uso de HashiCorp Vault
- Rotación automática de secretos
- Nunca hardcodear credenciales
- Variables de entorno para configuración
- Secrets encriptados en CI/CD
- Acceso con audit trail
```

### Backup y Disaster Recovery:
```typescript
- Backup automático diario de base de datos
- Backup incremental cada 6 horas
- Backup de archivos subidos (continuo)
- Retención: 30 días diarios, 12 semanas semanales, 7 años mensuales
- Backup en múltiples regiones geográficas
- Testing mensual de recuperación
- RTO (Recovery Time Objective): < 4 horas
- RPO (Recovery Point Objective): < 1 hora
```

### Incident Response Plan:
```typescript
1. Detección (alerting automático)
2. Contención (aislar el problema)
3. Erradicación (eliminar la amenaza)
4. Recuperación (restaurar servicios)
5. Post-incident review
6. Documentación del incidente
7. Notificación a autoridades (si aplica RGPD breach)
```

---

## 📞 INTEGRACIONES EXTERNAS RECOMENDADAS

### APIs Gubernamentales:
```typescript
- ✅ Sede Electrónica del MAEC (Ministerio de Asuntos Exteriores)
- ✅ Sistema Cl@ve (identificación electrónica)
- ✅ DNIe (DNI electrónico)
- ✅ Registro Civil Central
- ✅ Dirección General de Policía (pasaportes)
- ✅ Ministerio de Justicia (antecedentes penales)
- ✅ Seguridad Social
- ✅ Agencia Tributaria
```

### Servicios de Terceros:
```typescript
- ✅ Stripe / PayPal (pagos)
- ✅ Twilio (SMS)
- ✅ SendGrid / Mailgun (email)
- ✅ Cloudinary (gestión de imágenes)
- ✅ Google Maps / Mapbox (mapas)
- ✅ Zoom / Jitsi Meet (videoconferencia)
- ✅ DocuSign (firmas electrónicas)
- ✅ AWS S3 / MinIO (almacenamiento)
```

---

## 📝 ESTRUCTURA DEL PROYECTO SUGERIDA

```
consulado-oran/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── apps/
│   ├── web/               # Next.js frontend
│   ├── admin/             # Panel administrativo
│   └── api/               # Backend API (NestJS)
├── packages/
│   ├── ui/                # Shared UI components
│   ├── database/          # Prisma schema y migraciones
│   ├── auth/              # Auth logic compartida
│   ├── emails/            # Email templates
│   └── config/            # Configuraciones compartidas
├── docs/
│   ├── architecture/      # Diagramas y ADRs
│   ├── api/              # API documentation
│   └── guides/           # User guides
├── infrastructure/
│   ├── terraform/        # Infrastructure as Code
│   ├── kubernetes/       # K8s manifests
│   └── docker/           # Dockerfiles
├── scripts/
│   ├── backup.sh
│   ├── deploy.sh
│   └── seed.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── docker-compose.yml
├── package.json
├── turbo.json            # Turborepo config
└── README.md
```

---

## 🎨 PALETA DE COLORES OFICIAL

```css
/* Colores principales - España */
--spain-red: #C60B1E;
--spain-yellow: #FFC400;
--spain-gold: #FFD700;

/* Colores institucionales */
--primary: #003876;        /* Azul institucional */
--secondary: #C60B1E;      /* Rojo España */
--accent: #FFC400;         /* Amarillo España */

/* Colores neutros */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Colores semánticos */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-dark: #111827;
```

---

## 🚨 ALERTAS Y NOTIFICACIONES DE SEGURIDAD

### Eventos que Generan Alertas Inmediatas:
```typescript
🚨 Múltiples intentos de login fallidos
🚨 Acceso desde ubicación no reconocida
🚨 Cambio de contraseña o email
🚨 Acceso a datos sensibles
🚨 Modificación de permisos de usuario
🚨 Eliminación de datos
🚨 Fallos en el sistema de backup
🚨 Intento de SQL injection
🚨 Upload de archivo con virus
🚨 Rate limit excedido significativamente
🚨 Certificado SSL próximo a vencer
🚨 Disco duro > 80% utilizado
🚨 CPU/RAM > 90% por más de 5 minutos
🚨 Base de datos no accesible
🚨 Errores 500 en producción
```

---

## 📊 MÉTRICAS DE CALIDAD DEL CÓDIGO

### Lighthouse Scores (Objetivo):
```
🎯 Performance: 95+
🎯 Accessibility: 100
🎯 Best Practices: 100
🎯 SEO: 100
🎯 PWA: 100
```

### SonarQube Gates:
```
✅ Cobertura de código: > 80%
✅ Duplicación de código: < 3%
✅ Complejidad ciclomática: < 15
✅ Deuda técnica: < 5 días
✅ Vulnerabilidades: 0 (bloqueante)
✅ Code Smells críticos: 0
✅ Bugs: 0
```

---

## 🌐 SEO Y MARKETING DIGITAL

### Optimizaciones SEO:
```typescript
✅ Meta tags optimizados
✅ Open Graph tags
✅ Twitter Cards
✅ Schema.org markup (GovernmentOrganization)
✅ Sitemap.xml generado dinámicamente
✅ Robots.txt configurado
✅ Canonical URLs
✅ Hreflang tags para multiidioma
✅ Structured data
✅ Alt texts en todas las imágenes
✅ URLs amigables (slugs)
✅ Breadcrumbs markup
```

### Google Services:
```typescript
✅ Google Analytics 4
✅ Google Search Console
✅ Google My Business (perfil del consulado)
✅ Google Tag Manager
```

---

## 💬 CHATBOT CON IA

### Features del Chatbot:
```typescript
✅ Respuestas a preguntas frecuentes
✅ Guía para reservar cita
✅ Información sobre trámites
✅ Verificación de estado de trámite
✅ Transferencia a agente humano (horario laboral)
✅ Multiidioma (ES, FR, AR, EN)
✅ Aprendizaje continuo (ML)
✅ Integración con base de conocimiento
✅ Sentimiento analysis
✅ Escalamiento automático para casos complejos
```

### Tecnología Sugerida:
```
- OpenAI GPT-4 API (con fine-tuning)
- Rasa (open source alternative)
- Dialogflow (Google)
- Azure Bot Service
```

---

## 📱 APP MÓVIL NATIVA (Opcional - Fase Futura)

### Plataformas:
```
- iOS (Swift/SwiftUI)
- Android (Kotlin/Jetpack Compose)
- React Native (cross-platform alternative)
```

### Features adicionales en app móvil:
```typescript
✅ Notificaciones push nativas
✅ Biometría (Face ID, Touch ID, huella digital)
✅ Escaneo de documentos con cámara
✅ Firma digital con stylus
✅ Almacenamiento seguro local (Keychain/KeyStore)
✅ Modo offline avanzado
✅ Widget de próximas citas
✅ App Clips / Instant Apps para acceso rápido
```

---

## 🔗 INTEGRACIONES CON SISTEMAS INTERNOS

### Sistemas del Consulado:
```typescript
- ✅ Sistema de gestión consular (SIC)
- ✅ Base de datos de ciudadanos registrados
- ✅ Sistema de archivo digital
- ✅ Sistema de facturación
- ✅ Sistema de inventario (sellos, pasaportes, etc.)
- ✅ Sistema de control de acceso físico
- ✅ CCTV y seguridad física
- ✅ Telefonía (para notificaciones por llamada)
```

---

## 📄 LEGAL Y TÉRMINOS

### Documentos Legales Requeridos:
```
1. Términos y Condiciones de Uso
2. Política de Privacidad (RGPD compliant)
3. Política de Cookies
4. Aviso Legal
5. Política de Seguridad
6. Procedimiento de Ejercicio de Derechos RGPD
7. Política de Reembolsos
8. Acuerdo de Nivel de Servicio (SLA)
9. Código de Conducta
10. Disclaimer legal
```

---

## 🎓 CAPACITACIÓN DEL PERSONAL

### Programas de Training:
```
1. Uso del panel administrativo (4 horas)
2. Gestión de citas y trámites (6 horas)
3. Seguridad y protección de datos (3 horas)
4. Atención al ciudadano digital (2 horas)
5. Resolución de problemas técnicos básicos (2 horas)
6. Generación de reportes (2 horas)
7. Procedimientos de emergencia (2 horas)
```

### Documentación de Capacitación:
```
✅ Manual de usuario en español
✅ Videos tutoriales
✅ Sesiones prácticas hands-on
✅ Certificación de finalización
✅ Material de referencia rápida
✅ FAQ para staff
```

---

## 🔄 MANTENIMIENTO Y SOPORTE POST-LANZAMIENTO

### Soporte Técnico:
```
- Nivel 1 (Usuario final): Chatbot + FAQ
- Nivel 2 (Staff consular): Email/Tickets (soporte@consulado-oran.es)
- Nivel 3 (Técnico): Equipo de desarrollo
- Nivel 4 (Crítico): Escalamiento inmediato 24/7
```

### Mantenimiento:
```
✅ Actualizaciones de seguridad mensuales
✅ Actualizaciones de features trimestrales
✅ Backup diario verificado
✅ Monitoring 24/7
✅ Parches de emergencia en < 24h
✅ Auditorías de seguridad semestrales
✅ Penetration testing anual
✅ Revisión de performance trimestral
✅ Actualización de dependencias semanal (automatizado)
```

---

## 💰 ESTIMACIÓN DE COSTOS (Referencia)

### Costos de Desarrollo (Inicial):
```
👨‍💻 Equipo de desarrollo (6-8 meses): 80,000 - 150,000 EUR
🎨 Diseño UI/UX: 10,000 - 20,000 EUR
🔒 Auditoría de seguridad: 5,000 - 15,000 EUR
📝 Documentación y capacitación: 5,000 - 10,000 EUR
🧪 Testing y QA: 8,000 - 15,000 EUR
---
TOTAL INICIAL: 108,000 - 210,000 EUR
```

### Costos Operacionales (Anuales):
```
☁️ Cloud hosting (AWS/Azure): 6,000 - 18,000 EUR/año
🔐 Certificados SSL EV: 500 - 1,000 EUR/año
📧 Servicios de email/SMS: 1,200 - 3,600 EUR/año
💳 Pasarela de pagos: 2-3% por transacción
📊 Monitoring y APM: 2,400 - 6,000 EUR/año
🛡️ WAF y seguridad: 3,000 - 12,000 EUR/año
👨‍💻 Mantenimiento y soporte: 20,000 - 40,000 EUR/año
🔄 Actualizaciones y mejoras: 15,000 - 30,000 EUR/año
---
TOTAL ANUAL: ~50,000 - 110,000 EUR/año
```

---

## 🎯 PROMPT FINAL PARA CURSOR EDITOR

```
Eres un arquitecto de software senior especializado en sistemas gubernamentales de alto nivel de seguridad. 

Tu tarea es construir una plataforma web de ELITE para el Consulado General de España en Orán (Argelia), que incluya un sistema completo de reservas de citas para TODOS los trámites consulares.

REQUERIMIENTOS TÉCNICOS OBLIGATORIOS:
- Next.js 14+ con App Router y React Server Components
- TypeScript en modo strict
- PostgreSQL 16+ con Prisma ORM
- Sistema de autenticación multinivel (2FA obligatorio, WebAuthn, Cl@ve)
- Seguridad de nivel gubernamental (ENS Alto, RGPD, ISO 27001)
- Encriptación AES-256-GCM para datos sensibles
- TLS 1.3 con Perfect Forward Secrecy
- WAF y protección DDoS (Cloudflare Enterprise)
- Sistema de auditoría completo e inmutable
- Multiidioma: Español, Francés, Árabe, Inglés
- Diseño responsive y accesible (WCAG 2.1 AAA)
- PWA con notificaciones push
- Sistema de pagos seguro (PCI-DSS compliant)
- Tests completos (unit, integration, e2e) > 80% coverage
- Lighthouse score > 90 en todas las métricas
- Deployment con CI/CD completo

SERVICIOS CONSULARES A IMPLEMENTAR EN EL SISTEMA DE RESERVAS:
1. Pasaportes (expedición, renovación, emergencia, menores, duplicados)
2. DNI (expedición, renovación, menores, duplicados)
3. Certificaciones (nacimiento, defunción, matrimonio, antecedentes, residencia, etc.)
4. Registro Civil (inscripciones, libro de familia, rectificaciones)
5. Servicios Notariales (compulsas, legitimaciones, poderes, fe de vida)
6. Asistencia a españoles (detención, fallecimiento, repatriación)
7. Servicios Electorales (CERA, voto por correo)
8. Nacionalidad (por residencia, opción, carta de naturaleza, sefardíes)
9. Visados (Schengen C, larga duración D, estudiante, trabajo, reagrupación)
10. Legalizaciones y Apostillas
11. Registro de Matrícula Consular
12. Servicios especiales (pensiones, prestaciones, homologaciones)

FUNCIONALIDADES CLAVE:
✅ Sistema de reservas con calendario inteligente y disponibilidad en tiempo real
✅ Gestión documental con encriptación client-side y OCR
✅ Videoconferencia para citas virtuales (Jitsi/Zoom)
✅ Sistema de notificaciones (Email, SMS, Push)
✅ Panel administrativo completo para personal consular
✅ Sistema de tickets/soporte con chatbot IA
✅ Analíticas y reportes avanzados
✅ CMS multiidioma para contenido
✅ Sistema de pagos integrado
✅ Recordatorios automáticos de citas
✅ Check-in virtual con QR
✅ Lista de espera para cancelaciones

SEGURIDAD (NIVEL MILITAR):
🔒 Rate limiting estricto
🔒 SQL injection prevention (prepared statements)
🔒 XSS prevention (sanitización + CSP)
🔒 CSRF tokens
🔒 Helmet.js para headers de seguridad
🔒 Logging completo con retención de 5 años
🔒 Backup encriptado diario automático
🔒 Disaster recovery plan
🔒 Penetration testing integrado
🔒 SIEM para detección de intrusiones
🔒 Cumplimiento RGPD total (derecho al olvido, portabilidad, etc.)

DISEÑO:
- Colores oficiales de España (#C60B1E rojo, #FFC400 amarillo)
- Escudo de España correctamente utilizado
- Diseño moderno pero institucional
- UX excepcional con flujos guiados paso a paso
- Animaciones sutiles con Framer Motion
- shadcn/ui + Tailwind CSS para componentes

PRIORIDADES:
1. Seguridad > Todo lo demás
2. Accesibilidad y usabilidad
3. Performance y escalabilidad
4. Cumplimiento normativo (RGPD, ENS)
5. Documentación exhaustiva

ESTRUCTURA:
- Monorepo con Turborepo
- Separación frontend/backend/admin
- Infrastructure as Code (Terraform)
- Docker + Kubernetes para deployment
- GitHub Actions para CI/CD

Genera una arquitectura completa, código production-ready, con todas las best practices de seguridad gubernamental, siguiendo los estándares de código más altos, y con documentación exhaustiva.

Comienza creando la estructura del proyecto, configurando el stack tecnológico, e implementando el sistema de autenticación y seguridad como primera prioridad.
```

---

## 📞 INFORMACIÓN DE CONTACTO DEL CONSULADO (Para integrar)

```
🏛️ Consulado General de España en Orán
📍 6, Rue d'Arzew, Orán 31000, Argelia
☎️ +213 (0)41 39 21 18 / +213 (0)41 39 21 33
📠 Fax: +213 (0)41 39 21 19
📧 cog.oran@maec.es
🌐 www.exteriores.gob.es/consulados/oran
🆘 Emergencias 24/7: +213 (0)550 73 43 89

Horario de atención al público:
Lunes a Viernes: 08:30 - 15:00
Sábados, Domingos y Festivos: Cerrado

Festivos España + Argelia (lista actualizable)
```

---

## 🎉 MENSAJE FINAL

Este prompt contiene TODA la información necesaria para construir una plataforma web de ELITE, con seguridad de nivel gubernamental, para el Consulado de España en Orán.

La implementación completa incluye:
- ✅ Todos los trámites consulares españoles
- ✅ Sistema de reservas completo e inteligente
- ✅ Seguridad militar/gubernamental (ENS Alto, RGPD, ISO 27001)
- ✅ Stack tecnológico moderno y probado
- ✅ Cumplimiento normativo total
- ✅ Experiencia de usuario excepcional
- ✅ Multiidioma (ES, FR, AR, EN)
- ✅ Documentación exhaustiva
- ✅ Plan de mantenimiento y soporte

Este es un proyecto de nivel ENTERPRISE, diseñado para manejar información sensible de ciudadanos españoles en el extranjero con el más alto nivel de seguridad, disponibilidad y confiabilidad.

**Tiempo estimado de desarrollo:** 6-8 meses con un equipo de 6-8 desarrolladores senior.

**Presupuesto estimado:** 108,000 - 210,000 EUR (desarrollo inicial) + 50,000 - 110,000 EUR/año (operación y mantenimiento).

---

**¡BUENA SUERTE CON EL DESARROLLO! 🚀🇪🇸**

---

*Documento creado: Diciembre 2025*
*Versión: 1.0.0*
*Última actualización: 2025-12-20*
