# 🔒 CHECKLIST DE SEGURIDAD - NIVEL GUBERNAMENTAL
## Consulado de España en Orán - Verificación Pre-Producción

> Este checklist DEBE ser completado al 100% antes del deployment a producción.
> Cada ítem debe ser verificado, documentado y auditado.

---

## 📋 ÍNDICE
1. [Autenticación y Autorización](#1-autenticación-y-autorización)
2. [Encriptación y Criptografía](#2-encriptación-y-criptografía)
3. [Seguridad de Red](#3-seguridad-de-red)
4. [Seguridad de Aplicación](#4-seguridad-de-aplicación)
5. [Base de Datos](#5-base-de-datos)
6. [Gestión de Secretos](#6-gestión-de-secretos)
7. [Logging y Auditoría](#7-logging-y-auditoría)
8. [Backup y Recuperación](#8-backup-y-recuperación)
9. [Compliance y Normativas](#9-compliance-y-normativas)
10. [Testing de Seguridad](#10-testing-de-seguridad)

---

## 1. AUTENTICACIÓN Y AUTORIZACIÓN

### 1.1 Autenticación de Usuarios
- [ ] Política de contraseñas robustas implementada (mínimo 12 caracteres, complejidad alta)
- [ ] Contraseñas hasheadas con Argon2id (no bcrypt, no SHA-256)
- [ ] 2FA/MFA obligatorio para todos los usuarios
- [ ] TOTP implementado (Google Authenticator compatible)
- [ ] SMS como segundo factor de respaldo configurado
- [ ] WebAuthn/FIDO2 para biometría implementado
- [ ] Integración con Cl@ve (sistema español) configurada
- [ ] Bloqueo de cuenta tras 3 intentos fallidos
- [ ] Desbloqueo solo por administrador o proceso seguro
- [ ] Delays progresivos en intentos fallidos (1s, 2s, 4s, 8s...)
- [ ] Magic links seguros para recuperación de contraseña
- [ ] Tokens de recuperación con expiración corta (15 min)
- [ ] Detección de ubicación anómala en login
- [ ] Detección de dispositivo no reconocido
- [ ] Notificación de login desde nueva ubicación/dispositivo
- [ ] Captcha en formulario de login (hCaptcha o reCAPTCHA Enterprise)
- [ ] Session timeout configurado (30 min de inactividad)
- [ ] Logout automático en cierre de navegador
- [ ] Invalidación de sesión en cambio de contraseña
- [ ] Historial de últimos 10 logins visibles al usuario

### 1.2 Gestión de Sesiones
- [ ] JWT con algoritmo RS256 o ES256 (no HS256)
- [ ] Access tokens de corta duración (15 min)
- [ ] Refresh tokens de larga duración (7 días)
- [ ] Rotación automática de refresh tokens
- [ ] Token blacklist implementada en Redis
- [ ] Cookies con flags: Secure, HttpOnly, SameSite=Strict
- [ ] CSRF tokens en todos los formularios
- [ ] Validación de CSRF en backend
- [ ] Session storage solo en memoria/Redis (no localStorage)
- [ ] Invalidación de todas las sesiones al cambiar contraseña
- [ ] Límite de sesiones concurrentes por usuario (máximo 3)
- [ ] Revocación remota de sesiones (kill session)
- [ ] Session fixation prevention
- [ ] Session hijacking prevention

### 1.3 Autorización y Control de Acceso
- [ ] RBAC (Role-Based Access Control) implementado
- [ ] Roles definidos: SUPER_ADMIN, ADMIN_CONSULAR, OFICIAL_CONSULAR, RECEPCIONISTA, CIUDADANO, AUDITOR
- [ ] Principio de mínimo privilegio aplicado
- [ ] Permisos granulares por recurso
- [ ] Validación de autorización en backend (NUNCA solo frontend)
- [ ] Middleware de autorización en todas las rutas protegidas
- [ ] Verificación de propiedad de recursos (user solo ve sus datos)
- [ ] Segregación de funciones (SoD)
- [ ] Auditoría de cambios en permisos
- [ ] Revisión trimestral de permisos de usuarios
- [ ] Eliminación automática de cuentas inactivas (> 180 días)
- [ ] Proceso de on-boarding/off-boarding documentado

---

## 2. ENCRIPTACIÓN Y CRIPTOGRAFÍA

### 2.1 Encriptación en Tránsito
- [ ] TLS 1.3 configurado (TLS 1.2 mínimo, 1.0/1.1 deshabilitados)
- [ ] Certificado SSL EV (Extended Validation) instalado
- [ ] Certificado emitido por CA reconocida
- [ ] Wildcard certificates evitados (específicos por dominio)
- [ ] Certificate pinning implementado en app móvil
- [ ] HSTS header configurado (max-age=31536000; includeSubDomains; preload)
- [ ] HSTS preload list submission completada
- [ ] Perfect Forward Secrecy (PFS) habilitado
- [ ] Cipher suites débiles deshabilitados (RC4, DES, 3DES)
- [ ] Cipher suites recomendados: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256
- [ ] SSL Labs test: A+ rating
- [ ] OCSP stapling habilitado
- [ ] Renovación automática de certificados (Let's Encrypt con auto-renewal)
- [ ] Monitoreo de expiración de certificados (alertas 30 días antes)

### 2.2 Encriptación en Reposo
- [ ] Datos personales encriptados con AES-256-GCM
- [ ] Documentos subidos encriptados client-side antes de upload
- [ ] Base de datos con Transparent Data Encryption (TDE)
- [ ] Backups encriptados con AES-256
- [ ] Claves de encriptación rotadas mensualmente
- [ ] Key Management System (KMS) implementado
- [ ] Integración con HashiCorp Vault o AWS KMS
- [ ] Master keys protegidas con HSM (Hardware Security Module)
- [ ] Envelope encryption para datos grandes
- [ ] Separación de data encryption keys (DEK) y key encryption keys (KEK)
- [ ] Procedimiento de re-encriptación documentado
- [ ] Pruebas de recuperación de claves documentadas

### 2.3 Hashing y Firmas Digitales
- [ ] Contraseñas con Argon2id (parámetros: memory 64MB, iterations 3, parallelism 2)
- [ ] Salt único por contraseña (128 bits mínimo)
- [ ] Pepper global adicional
- [ ] Firma digital de documentos con certificados cualificados
- [ ] Validación de firmas digitales
- [ ] Timestamp en firmas (RFC 3161)
- [ ] Integridad de archivos con SHA-256 mínimo (SHA-3 preferido)
- [ ] HMAC para verificación de integridad de mensajes

---

## 3. SEGURIDAD DE RED

### 3.1 Firewall y Segmentación
- [ ] Web Application Firewall (WAF) configurado
- [ ] WAF con rulesets actualizados (OWASP Core Rule Set)
- [ ] Cloudflare Enterprise o AWS WAF implementado
- [ ] Rate limiting por IP: 100 req/min (usuarios anónimos)
- [ ] Rate limiting por usuario autenticado: 300 req/min
- [ ] Geoblocking de países de alto riesgo (configurable)
- [ ] Whitelist de IPs para panel administrativo
- [ ] VPN obligatoria para acceso administrativo remoto
- [ ] Segmentación de red (DMZ, aplicación, base de datos)
- [ ] Firewall de red (iptables/nftables) configurado
- [ ] Puertos innecesarios cerrados (solo 80, 443, 22)
- [ ] SSH solo con key-based authentication (password auth deshabilitado)
- [ ] SSH en puerto no estándar (no 22)
- [ ] fail2ban configurado para SSH
- [ ] IDS/IPS implementado (Snort, Suricata, o OSSEC)

### 3.2 Protección DDoS
- [ ] Cloudflare con protección DDoS habilitada
- [ ] Challenge page para tráfico sospechoso
- [ ] Rate limiting agresivo en endpoints sensibles
- [ ] SYN flood protection
- [ ] UDP flood protection
- [ ] HTTP flood protection
- [ ] Slowloris protection
- [ ] Plan de respuesta a DDoS documentado
- [ ] Contacto con ISP para mitigación Level 3/4

### 3.3 DNS y CDN
- [ ] DNSSEC habilitado
- [ ] DNS sobre HTTPS (DoH) configurado
- [ ] CAA records configurados en DNS
- [ ] SPF, DKIM, DMARC configurados para emails
- [ ] CDN con edge caching configurado
- [ ] Purge de caché automatizado
- [ ] CDN con protección anti-bot

---

## 4. SEGURIDAD DE APLICACIÓN

### 4.1 Prevención de Vulnerabilidades OWASP Top 10

#### A01:2021 – Broken Access Control
- [ ] Validación de autorización en cada endpoint
- [ ] Ningún endpoint sin autenticación (excepto públicos explícitos)
- [ ] CORS configurado estrictamente (no '*')
- [ ] Insecure Direct Object Reference (IDOR) prevenido

#### A02:2021 – Cryptographic Failures
- [ ] Datos sensibles nunca en logs
- [ ] Datos sensibles nunca en URLs
- [ ] Algoritmos criptográficos obsoletos deshabilitados

#### A03:2021 – Injection
- [ ] SQL Injection prevenido con prepared statements / ORM
- [ ] NoSQL Injection prevenido
- [ ] Command Injection prevenido (no uso de exec(), eval())
- [ ] LDAP Injection prevenido
- [ ] XPath Injection prevenido
- [ ] Validación y sanitización de todos los inputs

#### A04:2021 – Insecure Design
- [ ] Threat modeling realizado
- [ ] Secure by design principles aplicados
- [ ] Segregación de funciones implementada

#### A05:2021 – Security Misconfiguration
- [ ] Headers de seguridad configurados (Helmet.js)
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection: 1; mode=block (legacy pero útil)
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy configurado
- [ ] Content-Security-Policy estricto implementado
- [ ] Mensajes de error genéricos (no revelan stack traces)
- [ ] Directorio listings deshabilitados
- [ ] Archivos de configuración fuera de webroot
- [ ] .env no commiteado (en .gitignore)
- [ ] Dependencias actualizadas (Dependabot habilitado)

#### A06:2021 – Vulnerable and Outdated Components
- [ ] npm audit ejecutado regularmente
- [ ] Snyk scan configurado en CI/CD
- [ ] Renovate bot o similar para PRs automáticos de updates
- [ ] Política de actualización de dependencias documentada

#### A07:2021 – Identification and Authentication Failures
- [ ] Ver sección 1 completa ✓

#### A08:2021 – Software and Data Integrity Failures
- [ ] Subresource Integrity (SRI) en CDN resources
- [ ] Code signing de binarios
- [ ] Verificación de integridad de paquetes npm
- [ ] CI/CD pipeline seguro (no secretos en logs)

#### A09:2021 – Security Logging and Monitoring Failures
- [ ] Ver sección 7 completa ✓

#### A10:2021 – Server-Side Request Forgery (SSRF)
- [ ] Validación de URLs externas
- [ ] Whitelist de dominios permitidos
- [ ] No resolución de IPs privadas
- [ ] Timeout en requests externos (5 segundos máximo)

### 4.2 Validación de Inputs
- [ ] Validación de todos los inputs en backend (nunca confiar en frontend)
- [ ] Zod schemas para validación de tipos
- [ ] Whitelist validation (no blacklist)
- [ ] Longitud máxima de campos definida
- [ ] Validación de formato (email, teléfono, DNI, etc.)
- [ ] Sanitización de HTML con DOMPurify
- [ ] Validación de uploads (tipo MIME, extensión, contenido)
- [ ] Tamaño máximo de upload: 10MB por archivo
- [ ] Escaneo antivirus de archivos subidos (ClamAV)
- [ ] Quarantine de archivos sospechosos
- [ ] Conversión de imágenes (re-encoding) para eliminar metadata

### 4.3 Protección contra XSS
- [ ] Content Security Policy (CSP) estricto
- [ ] CSP con nonce o hash para inline scripts
- [ ] Sanitización de outputs con escape de caracteres
- [ ] Uso de templating engines con auto-escape (React por defecto escapa)
- [ ] DOMPurify para HTML user-generated
- [ ] X-XSS-Protection header
- [ ] Validación de URLs en href y src
- [ ] No uso de dangerouslySetInnerHTML (o con extrema precaución)

### 4.4 Protección CSRF
- [ ] CSRF tokens en todos los formularios
- [ ] SameSite=Strict en cookies
- [ ] Validación de Origin/Referer headers
- [ ] Double Submit Cookie pattern
- [ ] CORS configurado correctamente

### 4.5 Clickjacking Protection
- [ ] X-Frame-Options: DENY
- [ ] CSP frame-ancestors 'none'

---

## 5. BASE DE DATOS

### 5.1 Seguridad de PostgreSQL
- [ ] Acceso solo desde red interna (no expuesta a internet)
- [ ] Autenticación con contraseñas fuertes
- [ ] Roles con mínimo privilegio
- [ ] Separación de usuarios: admin, app, readonly
- [ ] SSL/TLS obligatorio para conexiones
- [ ] pg_hba.conf configurado correctamente
- [ ] Auditoría de queries activada (pgAudit)
- [ ] Backups automáticos configurados
- [ ] Point-in-Time Recovery (PITR) habilitado
- [ ] Encriptación en reposo (TDE)
- [ ] Logs de errores monitoreados
- [ ] Queries lentas logueadas
- [ ] Connection pooling configurado (PgBouncer)
- [ ] Max connections configurado apropiadamente

### 5.2 ORM y Queries
- [ ] Prisma ORM utilizado (previene SQL injection)
- [ ] Prepared statements siempre
- [ ] Nunca concatenación de strings en queries
- [ ] Validación de inputs antes de queries
- [ ] Índices optimizados
- [ ] Query performance monitoring
- [ ] N+1 queries prevenidas
- [ ] Soft delete implementado (no borrado físico de datos sensibles)

### 5.3 Redis
- [ ] Redis protegido con contraseña (requirepass)
- [ ] Redis no expuesto a internet
- [ ] TLS habilitado para conexiones Redis
- [ ] Comandos peligrosos renombrados o deshabilitados (FLUSHALL, FLUSHDB, CONFIG, EVAL)
- [ ] ACLs configuradas (Redis 6+)
- [ ] Persistencia configurada (RDB + AOF)

---

## 6. GESTIÓN DE SECRETOS

### 6.1 Almacenamiento de Secretos
- [ ] HashiCorp Vault implementado o AWS Secrets Manager
- [ ] Secretos nunca en código fuente
- [ ] Secretos nunca en .env commiteado
- [ ] .env en .gitignore
- [ ] .env.example sin valores reales
- [ ] Variables de entorno en producción vía Vault/AWS
- [ ] Rotación automática de secretos
- [ ] API keys con expiración
- [ ] Auditoría de acceso a secretos
- [ ] Secrets encriptados en CI/CD (GitHub Secrets, GitLab CI Variables)

### 6.2 Claves y Certificados
- [ ] Claves privadas con permisos 600 (chmod)
- [ ] Claves privadas nunca en Git
- [ ] Claves SSH únicas por servidor/servicio
- [ ] Certificados con expiración monitoreada
- [ ] Proceso de renovación automático
- [ ] Backup encriptado de claves

---

## 7. LOGGING Y AUDITORÍA

### 7.1 Logging Completo
- [ ] Winston o Pino logger configurado
- [ ] Logs estructurados (JSON format)
- [ ] Niveles de log: error, warn, info, debug
- [ ] Logs nunca contienen información sensible (contraseñas, tokens, PII)
- [ ] Logs con timestamp UTC
- [ ] Logs con request ID para tracing
- [ ] Logs con user ID (si autenticado)
- [ ] Logs con IP address
- [ ] Logs con User-Agent
- [ ] Logs centralizados (ELK Stack o similar)
- [ ] Logs con retención de 5 años (requisito legal)
- [ ] Logs inmutables (append-only)
- [ ] Logs con firma digital para integridad

### 7.2 Auditoría de Eventos
- [ ] Todos los logins logueados (exitosos y fallidos)
- [ ] Todos los cambios en datos sensibles logueados
- [ ] Todas las acciones administrativas logueadas
- [ ] Acceso a documentos logueado
- [ ] Exportación de datos logueada
- [ ] Cambios en permisos logueados
- [ ] Eliminación de datos logueada
- [ ] Cambios en configuración del sistema logueados
- [ ] Audit trail completo por usuario
- [ ] Audit trail no modificable por usuarios

### 7.3 Monitoring y Alerting
- [ ] Sentry configurado para errores
- [ ] New Relic o Datadog para APM
- [ ] Prometheus + Grafana para métricas
- [ ] Alertas en tiempo real para eventos críticos:
  - [ ] Múltiples logins fallidos
  - [ ] Acceso desde ubicación anómala
  - [ ] Cambio de permisos administrativos
  - [ ] Eliminación masiva de datos
  - [ ] Errores 500 en producción
  - [ ] Alto uso de CPU/RAM
  - [ ] Disco > 80% utilizado
  - [ ] Base de datos inaccesible
  - [ ] Certificado SSL próximo a expirar
  - [ ] Backup fallido
- [ ] Dashboards con métricas clave
- [ ] Uptime monitoring (Pingdom, UptimeRobot)
- [ ] SLA de 99.9% uptime

---

## 8. BACKUP Y RECUPERACIÓN

### 8.1 Backup Strategy
- [ ] Backup automático diario de base de datos (full backup)
- [ ] Backup incremental cada 6 horas
- [ ] Backup de archivos subidos (continuo a S3)
- [ ] Backup encriptado con AES-256
- [ ] Backup en múltiples regiones geográficas
- [ ] Backup offsite (diferentes provider)
- [ ] Retención de backups:
  - [ ] Diarios: 30 días
  - [ ] Semanales: 12 semanas
  - [ ] Mensuales: 7 años
- [ ] Verificación automática de integridad de backups
- [ ] Testing mensual de restauración
- [ ] Documentación de procedimiento de restore

### 8.2 Disaster Recovery
- [ ] Disaster Recovery Plan (DRP) documentado
- [ ] Recovery Time Objective (RTO): < 4 horas
- [ ] Recovery Point Objective (RPO): < 1 hora
- [ ] Infraestructura de failover configurada
- [ ] Database replication configurada (streaming replication)
- [ ] Hot standby o warm standby disponible
- [ ] Procedimiento de failover documentado y probado
- [ ] Drill de disaster recovery semestral
- [ ] Post-mortem después de cada incidente

---

## 9. COMPLIANCE Y NORMATIVAS

### 9.1 RGPD (Reglamento General de Protección de Datos)
- [ ] Data Protection Officer (DPO) designado
- [ ] Registro de Actividades de Tratamiento completado
- [ ] Base legal para tratamiento de datos definida
- [ ] Consentimiento explícito obtenido
- [ ] Información clara sobre tratamiento de datos
- [ ] Política de Privacidad publicada y accesible
- [ ] Política de Cookies implementada
- [ ] Cookie consent banner implementado
- [ ] Derecho de acceso implementado
- [ ] Derecho de rectificación implementado
- [ ] Derecho de supresión (olvido) implementado
- [ ] Derecho de portabilidad implementado
- [ ] Derecho de oposición implementado
- [ ] Derecho de limitación del tratamiento implementado
- [ ] Evaluación de Impacto de Protección de Datos (DPIA) realizada
- [ ] Procedimiento de notificación de brechas < 72 horas
- [ ] Contratos con procesadores de datos firmados (DPA)
- [ ] Transferencias internacionales de datos legitimadas
- [ ] Privacy by Design y by Default aplicado

### 9.2 ENS (Esquema Nacional de Seguridad) - Categoría Alta
- [ ] Análisis de riesgos completo
- [ ] Declaración de aplicabilidad de medidas ENS
- [ ] Categorización del sistema: ALTO
- [ ] Política de seguridad documentada
- [ ] Procedimientos de seguridad documentados
- [ ] Normativa de seguridad aprobada por dirección
- [ ] Formación en seguridad para todo el personal
- [ ] Auditoría ENS bienal planificada
- [ ] Conformidad con CCN-STIC verificada
- [ ] Informe del Estado de Seguridad (IES) anual

### 9.3 ISO 27001/27017/27018
- [ ] Sistema de Gestión de Seguridad de la Información (SGSI) implementado
- [ ] Políticas ISO documentadas
- [ ] Controles ISO implementados
- [ ] Auditoría interna realizada
- [ ] Certificación ISO obtenida o en proceso
- [ ] Revisión anual del SGSI

### 9.4 LOPD-GDD
- [ ] Cumplimiento con Ley Orgánica 3/2018
- [ ] Adaptación a normativa española
- [ ] Inscripción RGPD notificada a AEPD

### 9.5 eIDAS
- [ ] Integración con Cl@ve preparada
- [ ] Firma electrónica cualificada soportada
- [ ] Certificados electrónicos reconocidos
- [ ] Timestamp cualificado en firmas

### 9.6 PCI-DSS (si aplicable)
- [ ] SAQ (Self-Assessment Questionnaire) completado
- [ ] Cumplimiento nivel 4 (si < 1M transacciones/año)
- [ ] Datos de tarjetas nunca almacenados
- [ ] Tokenización de pagos implementada
- [ ] PCI-DSS compliant payment gateway (Stripe, PayPal)

---

## 10. TESTING DE SEGURIDAD

### 10.1 Security Testing Automatizado
- [ ] SAST (Static Application Security Testing) en CI/CD
- [ ] SonarQube configurado con security rules
- [ ] npm audit en pre-commit hook
- [ ] Snyk scan en CI/CD
- [ ] OWASP Dependency Check configurado
- [ ] Secrets scanning (git-secrets, trufflehog)
- [ ] License compliance check

### 10.2 Penetration Testing
- [ ] Penetration test anual por empresa externa certificada
- [ ] Informe de pentesting con vulnerabilidades documentadas
- [ ] Todas las vulnerabilidades CRÍTICAS corregidas
- [ ] Todas las vulnerabilidades ALTAS corregidas
- [ ] Plan de remediación para vulnerabilidades medias/bajas
- [ ] Re-test después de correcciones

### 10.3 Vulnerability Scanning
- [ ] Vulnerability scanner ejecutado mensualmente (Nessus, OpenVAS)
- [ ] Web vulnerability scanner configurado (OWASP ZAP, Burp Suite)
- [ ] Escaneo de puertos regular
- [ ] SSL/TLS scan (SSLyze, testssl.sh)
- [ ] Resultados de scans revisados y documentados

### 10.4 Bug Bounty (Opcional)
- [ ] Programa de Bug Bounty considerado
- [ ] Responsible Disclosure Policy publicada
- [ ] security.txt configurado (RFC 9116)

---

## ✅ VALIDACIÓN FINAL

### Pre-Production Checklist
- [ ] Todos los ítems CRÍTICOS completados al 100%
- [ ] Auditoría de seguridad externa realizada
- [ ] Pentesting completado con informe aprobado
- [ ] Code review de seguridad realizado
- [ ] Load testing exitoso (> 10,000 usuarios concurrentes)
- [ ] Disaster recovery drill exitoso
- [ ] Backup/restore testing exitoso
- [ ] Documentación de seguridad completa
- [ ] Formación del personal completada
- [ ] Plan de respuesta a incidentes aprobado
- [ ] Contactos de emergencia actualizados
- [ ] Seguro de ciberseguridad contratado (recomendado)

### Aprobaciones Requeridas
- [ ] ✅ DPO (Data Protection Officer)
- [ ] ✅ CISO (Chief Information Security Officer)
- [ ] ✅ Director del Consulado
- [ ] ✅ Responsable Técnico
- [ ] ✅ Auditor Externo de Seguridad
- [ ] ✅ CCN-CERT (Centro Criptológico Nacional) - si aplica

---

## 📊 MÉTRICAS DE SEGURIDAD

### KPIs de Seguridad (Monitoreo Continuo)
```
📈 Tiempo promedio de detección de incidentes: < 5 minutos
📈 Tiempo promedio de respuesta a incidentes: < 1 hora
📈 Tiempo promedio de resolución de incidentes críticos: < 4 horas
📈 Número de vulnerabilidades críticas: 0
📈 Número de brechas de seguridad: 0
📈 Uptime del sistema: > 99.9%
📈 Tasa de éxito en simulacros de DR: 100%
📈 Porcentaje de personal capacitado en seguridad: 100%
📈 Tiempo de renovación de certificados: automático (< 1 hora)
📈 Cobertura de tests de seguridad: > 80%
```

---

## 🚨 INCIDENTES DE SEGURIDAD

### Clasificación de Incidentes
```
🔴 CRÍTICO: Brecha de datos, ransomware, acceso no autorizado a datos sensibles
    Respuesta: Inmediata (< 15 minutos)
    Notificación: DPO + CISO + Director + AEPD (si aplica RGPD)

🟠 ALTO: Vulnerabilidad crítica descubierta, DDoS efectivo, sistema caído
    Respuesta: < 1 hora
    Notificación: CISO + Responsable Técnico

🟡 MEDIO: Intento de intrusión bloqueado, vulnerabilidad no crítica
    Respuesta: < 4 horas
    Notificación: Equipo de Seguridad

🟢 BAJO: Eventos anómalos menores, falsos positivos
    Respuesta: < 24 horas
    Notificación: Registro en sistema de tickets
```

### Procedimiento de Respuesta a Incidentes
1. **DETECCIÓN**: Sistema de monitoring detecta anomalía
2. **ANÁLISIS**: Equipo determina severidad y alcance
3. **CONTENCIÓN**: Aislar el sistema afectado
4. **ERRADICACIÓN**: Eliminar la amenaza
5. **RECUPERACIÓN**: Restaurar servicios
6. **POST-MORTEM**: Análisis de causa raíz
7. **DOCUMENTACIÓN**: Informe completo del incidente
8. **MEJORAS**: Implementar medidas preventivas

---

## 📝 DOCUMENTACIÓN REQUERIDA

- [ ] Política de Seguridad de la Información
- [ ] Política de Gestión de Contraseñas
- [ ] Política de Control de Acceso
- [ ] Política de Clasificación de la Información
- [ ] Política de Backup y Recuperación
- [ ] Plan de Respuesta a Incidentes
- [ ] Plan de Continuidad de Negocio (BCP)
- [ ] Plan de Recuperación ante Desastres (DRP)
- [ ] Registro de Actividades de Tratamiento (RGPD)
- [ ] Evaluación de Impacto de Protección de Datos (DPIA)
- [ ] Política de Privacidad
- [ ] Términos y Condiciones
- [ ] Procedimiento de Gestión de Vulnerabilidades
- [ ] Procedimiento de Gestión de Cambios
- [ ] Matriz de Roles y Responsabilidades
- [ ] Inventario de Activos de Información
- [ ] Análisis de Riesgos
- [ ] Declaración de Aplicabilidad (ISO 27001)
- [ ] Manual de Usuario (Seguridad)
- [ ] Manual de Administrador (Seguridad)

---

## 🎓 FORMACIÓN Y CONCIENCIACIÓN

### Programas de Capacitación Obligatorios
- [ ] Formación en RGPD (4 horas) - Anual
- [ ] Formación en Seguridad de la Información (6 horas) - Anual
- [ ] Formación en Phishing y Social Engineering (2 horas) - Semestral
- [ ] Simulacros de Phishing - Trimestral
- [ ] Formación en Uso Seguro de Contraseñas (1 hora) - Anual
- [ ] Formación en Respuesta a Incidentes (3 horas) - Anual
- [ ] Drill de Disaster Recovery (1 día) - Semestral

### Evaluación de Concienciación
- [ ] Test de conocimientos post-formación (mínimo 80% aprobado)
- [ ] Tasa de clicks en simulacros de phishing < 5%
- [ ] 100% del personal con certificado de formación actualizado

---

## 🏆 CERTIFICADO DE APROBACIÓN

```
Este sistema ha sido revisado y cumple con todos los requisitos de seguridad
de nivel GUBERNAMENTAL para el Consulado de España en Orán.

Fecha de Aprobación: ___________________
Válido hasta: ___________________

Firmas:

__________________________________
DPO (Data Protection Officer)

__________________________________
CISO (Chief Information Security Officer)

__________________________________
Director del Consulado

__________________________________
Auditor Externo de Seguridad

Sello Oficial del Consulado de España en Orán
```

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
**Próxima revisión:** Junio 2026

---

**🇪🇸 Consulado General de España en Orán, Argelia**
*Seguridad es nuestra prioridad #1*
