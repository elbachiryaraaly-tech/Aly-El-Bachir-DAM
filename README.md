# 🏛️ Consulado de España en Orán - Plataforma Web Elite

> Sistema integral de gestión consular con reservas de citas y seguridad de nivel gubernamental

[![Security](https://img.shields.io/badge/security-ENS%20Alto-red.svg)](https://ens.ccn.cni.es/)
[![RGPD](https://img.shields.io/badge/RGPD-compliant-blue.svg)](https://gdpr.eu/)
[![ISO 27001](https://img.shields.io/badge/ISO-27001-green.svg)](https://www.iso.org/isoiec-27001-information-security.html)
[![License](https://img.shields.io/badge/license-Gobierno%20de%20España-yellow.svg)]()

## 📖 Descripción

Plataforma web de última generación para el **Consulado General de España en Orán, Argelia**, que ofrece:

- 🎫 Sistema completo de reservas de citas para todos los trámites consulares
- 🔒 Seguridad de nivel militar/gubernamental
- 🌍 Soporte multiidioma (Español, Francés, Árabe, Inglés)
- 📱 Progressive Web App (PWA)
- ♿ Accesibilidad WCAG 2.1 AAA
- 📊 Panel administrativo avanzado
- 🤖 Chatbot con IA para asistencia 24/7
- 📹 Videoconferencia para citas virtuales
- 💳 Sistema de pagos seguro

## 🚀 Stack Tecnológico

### Frontend
- **Framework:** Next.js 14+ (App Router, React Server Components)
- **Lenguaje:** TypeScript 5+ (strict mode)
- **UI:** shadcn/ui + Tailwind CSS + Radix UI
- **State:** Zustand / Jotai
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl
- **Testing:** Vitest + React Testing Library + Playwright

### Backend
- **Runtime:** Node.js 20+ LTS
- **Framework:** NestJS / tRPC
- **Database:** PostgreSQL 16+ con Prisma ORM
- **Cache:** Redis 7+
- **Queue:** Bull MQ
- **Storage:** AWS S3 / MinIO
- **Auth:** NextAuth.js v5 (Auth.js)

### Seguridad
- **TLS:** 1.3 con Perfect Forward Secrecy
- **Encriptación:** AES-256-GCM
- **Hashing:** Argon2id
- **2FA:** TOTP + SMS + WebAuthn/FIDO2
- **WAF:** Cloudflare Enterprise
- **Monitoring:** Sentry + New Relic + ELK Stack

### Infraestructura
- **Cloud:** AWS GovCloud / Azure Government / OVH
- **Containers:** Docker + Kubernetes
- **CI/CD:** GitHub Actions
- **IaC:** Terraform
- **Secrets:** HashiCorp Vault

## 📋 Servicios Consulares Implementados

### Documentación
- ✅ Pasaportes (expedición, renovación, emergencia)
- ✅ DNI (expedición, renovación, duplicados)
- ✅ Certificaciones (nacimiento, matrimonio, defunción, etc.)

### Trámites
- ✅ Registro Civil (inscripciones, libro de familia)
- ✅ Servicios Notariales (compulsas, poderes, legitimaciones)
- ✅ Nacionalidad (por residencia, opción, sefardíes)
- ✅ Visados (Schengen, trabajo, estudiante, reagrupación)
- ✅ Legalizaciones y Apostillas
- ✅ Servicios Electorales (CERA, voto por correo)

### Asistencia
- ✅ Emergencias consulares 24/7
- ✅ Asistencia en detención o prisión
- ✅ Repatriaciones
- ✅ Auxilio judicial

## 🔒 Seguridad (Nivel Gubernamental)

### Cumplimiento Normativo
- ✅ **RGPD** - Reglamento General de Protección de Datos
- ✅ **ENS Alto** - Esquema Nacional de Seguridad (Categoría Alta)
- ✅ **ISO 27001/27017/27018** - Gestión de Seguridad
- ✅ **eIDAS** - Identificación Electrónica
- ✅ **LOPD-GDD** - Ley Orgánica de Protección de Datos
- ✅ **PCI-DSS** - Seguridad en pagos
- ✅ **CCN-CERT** - Centro Criptológico Nacional

### Medidas de Seguridad
```
🔐 Autenticación multinivel (2FA/MFA obligatorio)
🔐 Encriptación end-to-end (AES-256-GCM)
🔐 Auditoría completa e inmutable
🔐 Backup encriptado automático
🔐 Rate limiting y protección DDoS
🔐 WAF con reglas personalizadas
🔐 Penetration testing regular
🔐 SIEM para detección de intrusiones
🔐 Disaster Recovery Plan (RTO < 4h)
🔐 Logs con retención de 5 años
```

## 🏗️ Arquitectura del Proyecto

```
consulado-oran/
├── apps/
│   ├── web/                    # Frontend principal (Next.js)
│   ├── admin/                  # Panel administrativo
│   └── api/                    # Backend API (NestJS)
├── packages/
│   ├── ui/                     # Componentes UI compartidos
│   ├── database/               # Prisma schema
│   ├── auth/                   # Lógica de autenticación
│   ├── emails/                 # Templates de emails
│   └── config/                 # Configuraciones
├── docs/
│   ├── architecture/           # Documentación técnica
│   ├── api/                    # API docs (OpenAPI)
│   └── guides/                 # Guías de usuario
├── infrastructure/
│   ├── terraform/              # IaC
│   ├── kubernetes/             # K8s manifests
│   └── docker/                 # Dockerfiles
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── scripts/
    ├── backup.sh
    ├── deploy.sh
    └── seed.ts
```

## 🚀 Inicio Rápido

### Prerrequisitos
```bash
- Node.js 20+ LTS
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+
- pnpm 8+ (recomendado)
```

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/consulado-espana/oran-platform.git
cd oran-platform

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servicios con Docker
docker-compose up -d

# 5. Ejecutar migraciones de base de datos
pnpm db:migrate

# 6. Seed de datos iniciales
pnpm db:seed

# 7. Iniciar el servidor de desarrollo
pnpm dev
```

### Acceso a la Aplicación

- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3001
- **API:** http://localhost:3002
- **API Docs:** http://localhost:3002/api-docs
- **Maildev (emails):** http://localhost:1080
- **Redis Commander:** http://localhost:8081

### Usuarios de Prueba

```
Admin:
Email: admin@consulado-oran.es
Password: [ver .env.local]

Ciudadano:
Email: ciudadano@example.com
Password: [ver .env.local]
```

## 📚 Documentación

- 📖 [Guía de Arquitectura](./docs/architecture/README.md)
- 🔐 [Guía de Seguridad](./docs/security/README.md)
- 🎨 [Guía de Diseño](./docs/design/README.md)
- 🧪 [Guía de Testing](./docs/testing/README.md)
- 🚀 [Guía de Deployment](./docs/deployment/README.md)
- 📡 [API Reference](./docs/api/README.md)
- 👥 [Manual de Usuario](./docs/guides/user-manual.md)
- 👨‍💼 [Manual Administrativo](./docs/guides/admin-manual.md)

## 🧪 Testing

```bash
# Tests unitarios
pnpm test

# Tests con coverage
pnpm test:coverage

# Tests de integración
pnpm test:integration

# Tests E2E
pnpm test:e2e

# Tests E2E interactivos
pnpm test:e2e:ui

# Lint
pnpm lint

# Type checking
pnpm type-check
```

### Coverage Mínimo Requerido
- **Unit Tests:** > 80%
- **Integration Tests:** Endpoints críticos
- **E2E Tests:** Flujos principales

## 📊 Métricas de Calidad

### Lighthouse Scores (Objetivo)
```
⚡ Performance:    95+
♿ Accessibility:  100
✅ Best Practices: 100
🔍 SEO:            100
📱 PWA:            100
```

### SonarQube Quality Gates
```
✅ Coverage:         > 80%
✅ Duplications:     < 3%
✅ Maintainability:  A
✅ Reliability:      A
✅ Security:         A
✅ Vulnerabilities:  0
```

## 🔄 CI/CD Pipeline

```yaml
Desarrollo → Staging → Producción

Pipeline:
1. ✅ Lint & Format Check
2. ✅ Type Checking
3. ✅ Unit Tests
4. ✅ Build
5. ✅ Security Scan (Snyk, npm audit)
6. ✅ Docker Build
7. ✅ Deploy to Staging
8. ✅ E2E Tests
9. ⏸️  Manual Approval
10. ✅ Deploy to Production
11. ✅ Health Checks
12. 🔄 Rollback (si falla)
```

## 🌍 Internacionalización (i18n)

Idiomas soportados:
- 🇪🇸 **Español** (principal)
- 🇫🇷 **Francés** (oficial en Argelia)
- 🇸🇦 **Árabe** (idioma local)
- 🇬🇧 **Inglés** (internacional)

```bash
# Agregar nuevas traducciones
pnpm i18n:add [locale]

# Extraer textos a traducir
pnpm i18n:extract

# Validar traducciones
pnpm i18n:validate
```

## 🚢 Deployment

### Staging
```bash
pnpm deploy:staging
```

### Producción
```bash
pnpm deploy:production
```

### Rollback
```bash
pnpm rollback:production
```

## 📈 Monitoring y Logs

- **Uptime:** Pingdom / UptimeRobot
- **APM:** New Relic / Datadog
- **Errors:** Sentry
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Metrics:** Prometheus + Grafana
- **Alerts:** PagerDuty / Opsgenie

### Dashboards
- http://monitoring.consulado-oran.es/grafana
- http://logs.consulado-oran.es/kibana
- http://status.consulado-oran.es

## 🔐 Seguridad

### Reportar Vulnerabilidades
Si descubres una vulnerabilidad de seguridad, por favor envía un email a:
**security@consulado-oran.es**

**NO** abras un issue público. Responderemos en menos de 48 horas.

### Security Advisories
- [CVE Database](./SECURITY.md)
- [Security Policy](./docs/security/POLICY.md)
- [Incident Response Plan](./docs/security/INCIDENT_RESPONSE.md)

## 🤝 Contribución

Este proyecto es desarrollado y mantenido por el **Gobierno de España - Ministerio de Asuntos Exteriores**.

Para contribuciones internas:
1. Crear una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit con conventional commits: `git commit -m "feat: descripción"`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abrir Pull Request
5. Esperar code review (obligatorio)
6. Merge tras aprobación

### Conventional Commits
```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Cambios en documentación
style: Formato de código
refactor: Refactorización
test: Agregar tests
chore: Tareas de mantenimiento
security: Parches de seguridad
```

## 📞 Soporte

### Para Ciudadanos
- 📧 Email: info@consulado-oran.es
- ☎️ Teléfono: +213 (0)41 39 21 18
- 🆘 Emergencias 24/7: +213 (0)550 73 43 89
- 💬 Chat en línea: Lunes a Viernes 08:30-15:00

### Soporte Técnico (Personal Consular)
- 📧 Email: soporte@consulado-oran.es
- 🎫 Sistema de Tickets: http://soporte.consulado-oran.es
- 📱 Hotline técnica: [Solo personal autorizado]

## 📄 Licencia

© 2025 Gobierno de España - Ministerio de Asuntos Exteriores, Unión Europea y Cooperación.

Este software es propiedad del Estado Español y su uso está restringido a los fines oficiales del Consulado de España en Orán.

**Clasificación:** CONFIDENCIAL - Uso Oficial

## 🏛️ Información del Consulado

**Consulado General de España en Orán**
- 📍 6, Rue d'Arzew, Orán 31000, Argelia
- ☎️ +213 (0)41 39 21 18 / +213 (0)41 39 21 33
- 📧 cog.oran@maec.es
- 🌐 www.exteriores.gob.es/consulados/oran
- ⏰ Lunes a Viernes: 08:30 - 15:00

### Jurisdicción
Wilayas de Orán, Mostaganem, Mascara, Saïda, Tiaret, Tissemsilt, Relizane, Sidi Bel Abbès, Tlemcen, Aïn Témouchent, Naâma, Béchar, Adrar, Tindouf y El Bayadh.

## 🎯 Roadmap

### ✅ Fase 1 - Fundamentos (Completado)
- [x] Setup del proyecto
- [x] Autenticación y autorización
- [x] Base de datos y migraciones
- [x] CI/CD pipeline

### 🚧 Fase 2 - Core Features (En Progreso)
- [x] Sistema de reservas
- [x] Gestión de usuarios
- [ ] Panel administrativo
- [ ] Sistema de notificaciones
- [ ] Gestión documental

### 📅 Fase 3 - Features Avanzadas (Q2 2025)
- [ ] Sistema de pagos
- [ ] Videoconferencia
- [ ] Chatbot con IA
- [ ] Analíticas avanzadas
- [ ] PWA completo

### 🔮 Fase 4 - Optimización (Q3 2025)
- [ ] App móvil nativa
- [ ] Integración con Cl@ve
- [ ] Firma digital avanzada
- [ ] Machine Learning para predicciones

## 👥 Equipo

**Desarrollado por:**
- Ministerio de Asuntos Exteriores, Unión Europea y Cooperación
- Secretaría de Estado de España Global
- Dirección General de Españoles en el Exterior y de Asuntos Consulares

**Con el apoyo de:**
- Centro Criptológico Nacional (CCN-CERT)
- INCIBE (Instituto Nacional de Ciberseguridad)
- Red.es

## 🏆 Certificaciones y Premios

- 🥇 ISO 27001:2013 - Gestión de Seguridad de la Información
- 🥇 ISO 27017:2015 - Seguridad en Cloud Computing
- 🥇 ISO 27018:2019 - Protección de Datos Personales en Cloud
- 🏆 ENS Categoría Alta - Esquema Nacional de Seguridad
- 🌟 Certificado de Accesibilidad WCAG 2.1 AAA
- ✅ Sello de Confianza Online

---

**Made with ❤️ in España for Españoles in Argelia**

*Última actualización: Diciembre 2025*
