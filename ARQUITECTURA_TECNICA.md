# ARQUITECTURA TÉCNICA - SarafPro

## Sistema Elite de Cambio de Moneda

---

**Documento:** Arquitectura Técnica y Stack Tecnológico  
**Versión:** 1.0  
**Fecha:** Febrero 2026  

---

## 1. VISIÓN GENERAL DE LA ARQUITECTURA

### 1.1 Principios Arquitectónicos

SarafPro se diseña bajo los siguientes principios fundamentales:

1. **Offline-First:** El sistema debe funcionar completamente sin conexión a internet. La sincronización es un proceso complementario, no un requisito.
2. **Mobile-First:** La experiencia principal es en dispositivos móviles (smartphone/tablet Android).
3. **Velocidad extrema:** Cada interacción debe responder en menos de 100ms.
4. **Datos seguros:** Toda la información se encripta en reposo y en tránsito.
5. **Modularidad:** Cada módulo funcional es independiente y puede evolucionar por separado.
6. **Simplicidad:** La complejidad técnica se oculta tras una interfaz sencilla.

### 1.2 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                      │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  App Android  │  │  App iOS     │  │  Panel Web (Admin)    │  │
│  │  (Principal)  │  │  (Opcional)  │  │  (Dashboard/Reports)  │  │
│  │  Flutter/Dart │  │  Flutter     │  │  React + TypeScript   │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘  │
│         │                  │                       │              │
└─────────┼──────────────────┼───────────────────────┼──────────────┘
          │                  │                       │
┌─────────┼──────────────────┼───────────────────────┼──────────────┐
│         ▼                  ▼                       ▼              │
│                    CAPA DE LÓGICA DE NEGOCIO                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              Motor de Cambio de Divisas                     │  │
│  │  • Calculadora multidivisa    • Tasas cruzadas automáticas │  │
│  │  • Gestión de spreads         • Historial de tasas         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Gestor de       │  │  Gestor de   │  │  Motor de         │  │
│  │  Transacciones   │  │  Inventario  │  │  Analytics        │  │
│  └──────────────────┘  └──────────────┘  └───────────────────┘  │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Gestor CRM      │  │  Notifica-   │  │  Generador de     │  │
│  │  (Clientes)      │  │  ciones      │  │  Reportes         │  │
│  └──────────────────┘  └──────────────┘  └───────────────────┘  │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
┌───────────────────────────────┼───────────────────────────────────┐
│                               ▼                                    │
│                      CAPA DE DATOS                                 │
│                                                                    │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐  │
│  │  Base de Datos      │    │  Sincronización                  │  │
│  │  Local (SQLite)     │◄──►│  Bidireccional                  │  │
│  │  + Hive (NoSQL)     │    │  (Conflict Resolution)          │  │
│  └─────────────────────┘    └──────────────┬──────────────────┘  │
│                                             │                      │
│  ┌─────────────────────┐                    │                      │
│  │  Cache de Tasas     │                    │                      │
│  │  (In-Memory)        │                    │                      │
│  └─────────────────────┘                    │                      │
│                                             │                      │
└─────────────────────────────────────────────┼──────────────────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │   INTERNET (WiFi/  │
                                    │   3G/4G cuando     │
                                    │   disponible)      │
                                    └─────────┬─────────┘
                                              │
┌─────────────────────────────────────────────┼──────────────────────┐
│                                             ▼                      │
│                      BACKEND EN LA NUBE                            │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Supabase (BaaS)                            │ │
│  │                                                               │ │
│  │  ┌─────────────┐ ┌──────────────┐ ┌───────────────────────┐ │ │
│  │  │ PostgreSQL  │ │ Auth         │ │ Edge Functions         │ │ │
│  │  │ (DB Cloud)  │ │ (Autenticac.)│ │ (Lógica Servidor)     │ │ │
│  │  └─────────────┘ └──────────────┘ └───────────────────────┘ │ │
│  │                                                               │ │
│  │  ┌─────────────┐ ┌──────────────┐ ┌───────────────────────┐ │ │
│  │  │ Storage     │ │ Realtime     │ │ Backups Automáticos   │ │ │
│  │  │ (Archivos)  │ │ (Websockets) │ │ (Encriptados)         │ │ │
│  │  └─────────────┘ └──────────────┘ └───────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │               Servicios Externos                              │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │ │
│  │  │ WhatsApp     │ │ API de Tasas │ │ Firebase Cloud       │ │ │
│  │  │ Business API │ │ de Mercado   │ │ Messaging (Push)     │ │ │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 2. STACK TECNOLÓGICO

### 2.1 Aplicación Móvil (Frontend Principal)

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| **Framework** | Flutter 3.x | Multiplataforma (Android/iOS), rendimiento nativo, UI rica |
| **Lenguaje** | Dart | Tipado fuerte, excelente rendimiento, async nativo |
| **State Management** | Riverpod 2.x | Robusto, testeable, excelente para apps complejas |
| **Base de datos local** | SQLite (drift) + Hive | Relacional para transacciones + NoSQL para cache/config |
| **Navegación** | GoRouter | Declarativa, deep linking, guards de autenticación |
| **UI Components** | Material Design 3 | Adaptado con tema personalizado SarafPro |
| **Gráficos** | fl_chart | Charts nativos Flutter, alto rendimiento |
| **PDF Generation** | pdf (dart package) | Generación de recibos y reportes offline |
| **Internacionalización** | flutter_localizations + intl | Soporte RTL nativo, múltiples idiomas |
| **Encriptación local** | flutter_secure_storage + encrypt | AES-256 para datos sensibles |

### 2.2 Panel Web (Dashboard Administrativo)

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| **Framework** | Next.js 14 (React) | SSR, rendimiento, excelente DX |
| **Lenguaje** | TypeScript | Seguridad de tipos, mantenibilidad |
| **UI Library** | Tailwind CSS + shadcn/ui | Diseño moderno, altamente personalizable |
| **Charts** | Recharts | Gráficos interactivos para analytics |
| **Tablas** | TanStack Table | Tablas avanzadas con filtros y export |
| **Estado** | Zustand | Ligero, simple, performante |
| **Formularios** | React Hook Form + Zod | Validación robusta |

### 2.3 Backend y Servicios Cloud

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| **BaaS Principal** | Supabase | PostgreSQL, Auth, Storage, Realtime, Edge Functions |
| **Base de datos cloud** | PostgreSQL 15 (vía Supabase) | Robusto, maduro, excelente para datos financieros |
| **Autenticación** | Supabase Auth | JWT, MFA, múltiples proveedores |
| **Funciones serverless** | Supabase Edge Functions (Deno) | Lógica de servidor sin infraestructura |
| **Almacenamiento** | Supabase Storage | Recibos, backups, documentos |
| **Mensajería Push** | Firebase Cloud Messaging | Notificaciones push confiables |
| **WhatsApp API** | WhatsApp Business Cloud API (Meta) | Comunicación directa con clientes |
| **Tasas de mercado** | ExchangeRate-API + Open Exchange Rates | Tasas de referencia actualizadas |
| **SMS Fallback** | Twilio | Para clientes sin WhatsApp |

### 2.4 DevOps e Infraestructura

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| **CI/CD** | GitHub Actions | Automatización de builds y despliegues |
| **Distribución App** | Google Play + distribución directa (APK) | Cobertura máxima en Argelia |
| **Monitoreo** | Sentry + Firebase Crashlytics | Detección proactiva de errores |
| **Analytics de uso** | Firebase Analytics | Entender patrones de uso |
| **Hosting Web** | Vercel | Despliegue automático del panel web |

---

## 3. ARQUITECTURA OFFLINE-FIRST

### 3.1 Estrategia de Datos Offline

Dado que la conectividad en Tindouf puede ser intermitente, el sistema implementa una arquitectura **offline-first** robusta:

```
┌─────────────────────────────────────────────────┐
│              DISPOSITIVO MÓVIL                    │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           CAPA DE APLICACIÓN                 │ │
│  │  La app siempre lee/escribe datos locales    │ │
│  └──────────────────────┬──────────────────────┘ │
│                          │                        │
│  ┌──────────────────────▼──────────────────────┐ │
│  │         BASE DE DATOS LOCAL                  │ │
│  │                                              │ │
│  │  SQLite (drift)          Hive (NoSQL)        │ │
│  │  ├─ Transacciones        ├─ Configuración    │ │
│  │  ├─ Clientes             ├─ Cache de tasas   │ │
│  │  ├─ Tasas (historial)    ├─ Preferencias     │ │
│  │  ├─ Inventario           ├─ Sesión usuario   │ │
│  │  └─ Logs auditoría       └─ Datos temporales │ │
│  └──────────────────────┬──────────────────────┘ │
│                          │                        │
│  ┌──────────────────────▼──────────────────────┐ │
│  │         MOTOR DE SINCRONIZACIÓN              │ │
│  │                                              │ │
│  │  • Cola de operaciones pendientes            │ │
│  │  • Detección de conectividad automática      │ │
│  │  • Resolución de conflictos (last-write-wins │ │
│  │    + merge inteligente para transacciones)   │ │
│  │  • Compresión de datos para sync eficiente   │ │
│  │  • Reintentos automáticos con backoff        │ │
│  └──────────────────────┬──────────────────────┘ │
│                          │                        │
└──────────────────────────┼────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  INTERNET   │
                    │  (cuando    │
                    │  disponible)│
                    └──────┬──────┘
                           │
                    ┌──────▼──────────────┐
                    │  SUPABASE CLOUD     │
                    │  (Fuente de verdad  │
                    │   para backups y    │
                    │   multi-dispositivo)│
                    └─────────────────────┘
```

### 3.2 Estrategia de Sincronización

| Tipo de Dato | Estrategia de Sync | Conflicto |
|-------------|-------------------|-----------|
| Transacciones | Push al servidor cuando hay conexión | Append-only (nunca conflicto) |
| Tasas de cambio | Pull del servidor + edición local | Server wins (referencia) / Local wins (personalizada) |
| Inventario | Bidireccional con timestamp | Last-write-wins con log de conflicto |
| Clientes | Bidireccional | Merge inteligente por campo |
| Configuración | Bidireccional | Master device wins |

### 3.3 Datos que Funcionan 100% Offline

- Cálculos de cambio de moneda (con últimas tasas conocidas)
- Registro de transacciones
- Gestión de inventario
- Consulta de historial
- Generación de recibos (PDF)
- Cuadre de caja
- Búsqueda de clientes
- Consulta de reportes con datos locales

### 3.4 Datos que Requieren Conexión

- Actualización de tasas de mercado internacionales
- Envío de notificaciones WhatsApp/SMS
- Backup a la nube
- Sincronización multi-dispositivo
- Actualizaciones de la aplicación

---

## 4. ARQUITECTURA DE SEGURIDAD

### 4.1 Capas de Seguridad

```
┌──────────────────────────────────────────────┐
│  CAPA 1: AUTENTICACIÓN                        │
│  • PIN de 6 dígitos (acceso rápido)           │
│  • Huella dactilar / Face ID                  │
│  • Contraseña maestra (recuperación)          │
│  • Bloqueo automático por inactividad (2 min) │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│  CAPA 2: AUTORIZACIÓN                         │
│  • Control de acceso basado en roles (RBAC)   │
│  • Permisos granulares por módulo             │
│  • Límites de operación por rol               │
│  • Aprobación dual para operaciones grandes   │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│  CAPA 3: ENCRIPTACIÓN                         │
│  • AES-256 para datos en reposo              │
│  • TLS 1.3 para datos en tránsito            │
│  • Encriptación de base de datos local       │
│  • Claves derivadas del PIN del usuario      │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│  CAPA 4: AUDITORÍA                            │
│  • Log inmutable de todas las operaciones     │
│  • Registro de accesos y modificaciones       │
│  • Detección de patrones anómalos            │
│  • Exportable para auditoría externa         │
└──────────────────────────────────────────────┘
```

### 4.2 Gestión de Backups

```
Backup Automático:
├── Cada 6 horas → Backup incremental local
├── Cada 24 horas → Backup completo a la nube (encriptado)
├── Cada semana → Backup completo local + nube
└── Bajo demanda → Backup manual instantáneo

Restauración:
├── Desde backup local → Instantánea (< 30 segundos)
├── Desde backup nube → 2-5 minutos (según conexión)
└── Desde backup externo → Importación manual
```

---

## 5. ARQUITECTURA DE LA INTERFAZ DE USUARIO

### 5.1 Estructura de Navegación

```
┌─────────────────────────────────────────┐
│              SarafPro App                │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │      PANTALLA DE BLOQUEO        │   │
│  │      (PIN / Biométrico)         │   │
│  └──────────────┬───────────────────┘   │
│                  │                       │
│  ┌──────────────▼───────────────────┐   │
│  │      DASHBOARD PRINCIPAL         │   │
│  │  • Resumen de caja              │   │
│  │  • Tasas actuales               │   │
│  │  • Últimas operaciones          │   │
│  │  • Accesos rápidos              │   │
│  └──────────────┬───────────────────┘   │
│                  │                       │
│  ┌──────────────▼───────────────────┐   │
│  │      BARRA DE NAVEGACIÓN         │   │
│  │                                   │   │
│  │  [Cambio] [Caja] [Clientes]      │   │
│  │  [Tasas]  [Más]                   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Pantallas principales:                  │
│  ├── Cambio Rápido (pantalla estrella)  │
│  ├── Gestión de Caja                    │
│  ├── Directorio de Clientes            │
│  ├── Panel de Tasas                     │
│  ├── Historial de Operaciones           │
│  ├── Reportes y Analytics               │
│  ├── Notificaciones                     │
│  └── Configuración                      │
└─────────────────────────────────────────┘
```

### 5.2 Diseño de la Pantalla de Cambio Rápido

Esta es la pantalla más importante del sistema. Diseñada para máxima velocidad:

```
┌─────────────────────────────────┐
│  ←  Cambio Rápido     [Cliente]│
│─────────────────────────────────│
│                                 │
│  ┌─────────────────────────────┐│
│  │  VENDO  [EUR ▼]             ││
│  │  ┌─────────────────────┐    ││
│  │  │      500.00         │    ││
│  │  └─────────────────────┘    ││
│  │  Tasa: 1 EUR = 237.50 DZD  ││
│  └─────────────────────────────┘│
│              ⇅                  │
│  ┌─────────────────────────────┐│
│  │  RECIBO  [DZD ▼]           ││
│  │  ┌─────────────────────┐    ││
│  │  │    118,750.00       │    ││
│  │  └─────────────────────┘    ││
│  │  Comisión: 0.00 DZD        ││
│  └─────────────────────────────┘│
│                                 │
│  Beneficio estimado: 1,250 DZD  │
│                                 │
│  ┌─────────────────────────────┐│
│  │     ✓ CONFIRMAR CAMBIO      ││
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  [Último: 200 EUR → 47,500 DZD]│
└─────────────────────────────────┘
```

### 5.3 Temas y Personalización

| Aspecto | Especificación |
|---------|---------------|
| Colores primarios | Dorado (#D4AF37) + Negro (#1A1A1A) — Transmite elite y profesionalismo |
| Colores secundarios | Verde éxito (#2ECC71), Rojo alerta (#E74C3C) |
| Tipografía | Cairo (Google Fonts) — Optimizada para árabe y latín |
| Modo oscuro | Activado por defecto (reduce fatiga visual, ahorra batería OLED) |
| Animaciones | Mínimas, funcionales (transiciones de 200ms) |
| Iconografía | Outlined, limpia, fácil reconocimiento |

---

## 6. INTEGRACIONES EXTERNAS

### 6.1 WhatsApp Business API

```
Funcionalidades:
├── Difusión de tasas a lista de clientes
├── Chatbot automático de consulta de tasas
├── Envío de recibos digitales
├── Notificaciones personalizadas
└── Confirmación de operaciones grandes

Flujo técnico:
App → Supabase Edge Function → WhatsApp Cloud API → Cliente

Limitaciones:
• Requiere cuenta WhatsApp Business verificada
• Mensajes de plantilla requieren aprobación de Meta
• Costes por mensaje (ver presupuesto)
```

### 6.2 APIs de Tasas de Cambio

```
Proveedores (con fallback):
1. ExchangeRate-API (primario) — Tasas para DZD, MRU, XOF
2. Open Exchange Rates (secundario) — Cobertura amplia
3. CurrencyBeacon (terciario) — Backup

Frecuencia de actualización:
• Cada 30 minutos cuando hay conexión
• Las tasas son REFERENCIALES — el operador siempre establece sus propias tasas
• Alerta cuando la tasa del operador difiere >5% de la referencia del mercado
```

### 6.3 Firebase Cloud Messaging

```
Notificaciones push:
├── Alertas de stock bajo
├── Operaciones pendientes de aprobación
├── Recordatorios de cierre de caja
├── Actualizaciones de la app
└── Alertas de seguridad
```

---

## 7. CONSIDERACIONES TÉCNICAS ESPECÍFICAS

### 7.1 Adaptación al Contexto de Tindouf

| Desafío | Solución Técnica |
|---------|-----------------|
| Internet 3G/4G inestable | Arquitectura offline-first, sync oportunista |
| Cortes eléctricos | Optimización de batería, auto-guardado cada operación |
| Dispositivos gama media | Optimización de rendimiento, assets comprimidos |
| Calor extremo (>45°C) | UI de alto contraste, modo ultra-bajo consumo |
| Polvo/arena | Botones grandes, gestos simples, no requiere precisión |
| Alfabeto árabe/RTL | Soporte RTL nativo en Flutter, fuentes optimizadas |

### 7.2 Optimización de Rendimiento

- **Lazy loading** de datos históricos
- **Paginación** en listas largas
- **Cache en memoria** de tasas activas
- **Compresión** de backups (gzip)
- **Imágenes WebP** para logos de monedas
- **Tree shaking** agresivo en build de producción
- **APK Split** por arquitectura (arm64, arm32)

### 7.3 Tamaño de la Aplicación

| Componente | Tamaño Estimado |
|-----------|----------------|
| APK base (Flutter) | ~15 MB |
| Assets (iconos, fuentes, imágenes) | ~5 MB |
| Base de datos inicial | ~1 MB |
| **Total instalación** | **~21 MB** |
| Datos después de 1 año de uso | ~50-100 MB |

---

## 8. ENTORNO DE DESARROLLO

### 8.1 Herramientas

| Herramienta | Propósito |
|------------|----------|
| VS Code / Android Studio | IDE principal |
| Flutter SDK 3.x | Framework de desarrollo |
| Git + GitHub | Control de versiones |
| GitHub Actions | CI/CD |
| Figma | Diseño de UI/UX |
| Supabase CLI | Gestión del backend |
| Firebase CLI | Push notifications |

### 8.2 Estructura del Proyecto

```
sarafpro/
├── apps/
│   ├── mobile/                    # App Flutter (Android/iOS)
│   │   ├── lib/
│   │   │   ├── core/             # Utilidades, constantes, temas
│   │   │   ├── data/             # Repositorios, data sources, modelos
│   │   │   ├── domain/           # Entidades, casos de uso
│   │   │   ├── presentation/     # Pantallas, widgets, controladores
│   │   │   │   ├── exchange/     # Módulo de cambio
│   │   │   │   ├── cash/         # Módulo de caja
│   │   │   │   ├── clients/      # Módulo de clientes
│   │   │   │   ├── rates/        # Módulo de tasas
│   │   │   │   ├── reports/      # Módulo de reportes
│   │   │   │   └── settings/     # Módulo de configuración
│   │   │   └── main.dart
│   │   ├── assets/
│   │   ├── test/
│   │   └── pubspec.yaml
│   │
│   └── web/                       # Panel Web (Next.js)
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── lib/
│       │   └── styles/
│       ├── package.json
│       └── next.config.js
│
├── packages/
│   ├── shared/                    # Código compartido (modelos, utils)
│   └── api-client/               # Cliente API compartido
│
├── supabase/
│   ├── migrations/               # Migraciones de base de datos
│   ├── functions/                # Edge Functions
│   └── seed.sql                  # Datos iniciales
│
├── docs/                          # Documentación
├── .github/workflows/            # CI/CD
└── README.md
```

---

## 9. ESTRATEGIA DE TESTING

| Tipo de Test | Cobertura Objetivo | Herramienta |
|-------------|-------------------|-------------|
| Unitarios | > 80% lógica de negocio | Flutter test + Mockito |
| Widget Tests | > 70% componentes UI | Flutter widget test |
| Integración | Flujos críticos completos | Integration test |
| E2E | Flujos principales | Patrol (Flutter) |
| Performance | Tiempos de respuesta | Flutter DevTools |
| Seguridad | OWASP Mobile Top 10 | Manual + MobSF |

---

## 10. ESTRATEGIA DE DESPLIEGUE

### 10.1 Distribución de la App Móvil

```
Canal Principal:
└── Distribución directa de APK
    • Descarga desde web dedicada
    • Compartir por WhatsApp/Bluetooth
    • Actualización automática in-app

Canal Secundario:
└── Google Play Store
    • Visibilidad y confianza
    • Actualizaciones automáticas
    • Requiere cuenta de desarrollador ($25)

Canal Terciario (futuro):
└── Apple App Store
    • Para usuarios iOS
    • Requiere cuenta de desarrollador ($99/año)
```

### 10.2 Actualizaciones

- **Actualizaciones críticas:** Forzadas, descarga automática
- **Actualizaciones menores:** Notificación + descarga opcional
- **Hot fixes:** Shorebird (code push) para correcciones sin redescargar

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro.*

---

**Documentos relacionados:**
- [Propuesta del Proyecto](PROPUESTA_PROYECTO.md)
- [Funcionalidades Detalladas](FUNCIONALIDADES.md)
- [Modelo de Datos](MODELO_DATOS.md)
- [Plan de Implementación y Presupuesto](PLAN_IMPLEMENTACION.md)
- [Seguridad y Cumplimiento](SEGURIDAD_CUMPLIMIENTO.md)
