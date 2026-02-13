# PLAN DE IMPLEMENTACIÓN Y PRESUPUESTO - SarafPro

## Sistema Elite de Cambio de Moneda

---

**Documento:** Plan de Implementación, Cronograma y Presupuesto  
**Versión:** 1.0  
**Fecha:** Febrero 2026  

---

## 1. METODOLOGÍA DE DESARROLLO

### 1.1 Enfoque: Agile con Sprints de 2 Semanas

Se utilizará una metodología ágil adaptada al contexto del proyecto:

```
┌─────────────────────────────────────────────────────┐
│                 CICLO DE DESARROLLO                   │
│                                                       │
│  Sprint (2 semanas)                                   │
│  ┌─────────────────────────────────────────────────┐ │
│  │ Planificación → Desarrollo → Testing → Review   │ │
│  │     (1 día)      (7 días)    (3 días)  (1 día) │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  Cada sprint incluye:                                 │
│  • Demo funcional al cliente                         │
│  • Feedback incorporado al siguiente sprint          │
│  • Versión usable al final del sprint                │
└─────────────────────────────────────────────────────┘
```

### 1.2 Fases del Proyecto

| Fase | Nombre | Duración | Descripción |
|------|--------|----------|-------------|
| 0 | Descubrimiento | 2 semanas | Análisis del negocio in-situ |
| 1A | MVP Core | 8 semanas | Funcionalidades críticas |
| 1B | Funcionalidades Avanzadas | 6 semanas | Funcionalidades de alta prioridad |
| 2 | Analytics y CRM | 4 semanas | Reportes y gestión de clientes |
| 3 | Integración WhatsApp | 3 semanas | Notificaciones y chatbot |
| 4 | Pulido y Lanzamiento | 3 semanas | QA final, optimización, despliegue |

**Duración total estimada: 26 semanas (6.5 meses)**

---

## 2. CRONOGRAMA DETALLADO

### FASE 0: DESCUBRIMIENTO (Semanas 1-2)

**Objetivo:** Entender en profundidad el flujo de trabajo real del cambiador.

| Semana | Actividades | Entregables |
|--------|-----------|-------------|
| 1 | • Observación del flujo de trabajo diario | • Documento de flujos actuales |
| | • Entrevistas con el propietario y operadores | • Mapa de procesos |
| | • Identificación de monedas y volúmenes | • Lista de requisitos validados |
| | • Análisis de competencia local | |
| 2 | • Definición de wireframes iniciales | • Wireframes aprobados |
| | • Validación de requisitos con el cliente | • Prioridades confirmadas |
| | • Configuración del entorno de desarrollo | • Entorno listo |
| | • Diseño de la base de datos inicial | • Modelo ER inicial |

---

### FASE 1A: MVP CORE (Semanas 3-10)

**Objetivo:** Sistema funcional con las operaciones básicas de cambio.

#### Sprint 1 (Semanas 3-4): Fundamentos

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Estructura del proyecto Flutter | Configuración, arquitectura clean, dependencias | 16 |
| Base de datos local (SQLite/drift) | Schema inicial, migraciones, DAOs | 20 |
| Sistema de autenticación local | PIN + biometría | 16 |
| Navegación y estructura de pantallas | GoRouter, scaffold principal | 12 |
| Tema y diseño base | Colores, tipografía, componentes base | 16 |
| **Total Sprint 1** | | **80h** |

**Entregable:** App base con autenticación y navegación.

#### Sprint 2 (Semanas 5-6): Motor de Cambio

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Motor de cálculo de cambio | Lógica de negocio pura, tasas directas y cruzadas | 24 |
| Pantalla de cambio rápido | UI principal, selección de monedas, teclado numérico | 24 |
| Gestión de tasas de cambio | CRUD de tasas, pantalla de edición | 20 |
| Tests unitarios del motor de cambio | Cobertura completa del motor | 12 |
| **Total Sprint 2** | | **80h** |

**Entregable:** Calculadora de cambio funcional.

#### Sprint 3 (Semanas 7-8): Transacciones e Inventario

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Registro de transacciones | Modelo, persistencia, confirmación | 20 |
| Historial de transacciones | Lista, filtros básicos, búsqueda | 16 |
| Dashboard de caja | Vista de stock por moneda, valor total | 16 |
| Movimientos de caja | Entradas, salidas, ajustes | 16 |
| Número de referencia automático | Generación secuencial única | 4 |
| Tests de integración | Flujo completo de operación | 8 |
| **Total Sprint 3** | | **80h** |

**Entregable:** Sistema completo de transacciones e inventario básico.

#### Sprint 4 (Semanas 9-10): Cierre de Caja y Pulido MVP

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Asistente de cierre de caja | Flujo guiado, conteo, diferencias | 24 |
| Generación de recibos PDF | Diseño, generación, almacenamiento | 20 |
| Dashboard principal | KPIs del día, resumen visual | 16 |
| Soporte multilingüe (árabe + francés) | i18n, traducciones, RTL | 12 |
| Bug fixing y optimización | Correcciones del MVP | 8 |
| **Total Sprint 4** | | **80h** |

**Entregable:** MVP completo y funcional, listo para pruebas piloto.

---

### FASE 1B: FUNCIONALIDADES AVANZADAS (Semanas 11-16)

#### Sprint 5 (Semanas 11-12): CRM Básico

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Modelo de datos de clientes | Entidad, relaciones, persistencia | 12 |
| Ficha de cliente | UI de detalle, edición, historial | 20 |
| Directorio de clientes | Lista, búsqueda, filtros, clasificación | 16 |
| Vinculación operación-cliente | Selección de cliente en cambio rápido | 12 |
| Tasas preferenciales por cliente | Lógica y UI de tasas especiales | 12 |
| Importación de contactos | Desde agenda del teléfono | 8 |
| **Total Sprint 5** | | **80h** |

#### Sprint 6 (Semanas 13-14): Búsqueda y Operaciones Avanzadas

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Búsqueda avanzada de transacciones | Filtros múltiples, rangos de fecha y monto | 20 |
| Anulación y corrección de operaciones | Flujo con aprobación, historial de versiones | 16 |
| Operaciones especiales | Diferidas, fraccionadas | 16 |
| Exportación de datos | Excel, CSV, PDF | 16 |
| Tasas de referencia del mercado | Integración API, comparación visual | 12 |
| **Total Sprint 6** | | **80h** |

#### Sprint 7 (Semanas 15-16): Backend Cloud y Sincronización

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Setup de Supabase | DB, Auth, Storage, configuración | 16 |
| Motor de sincronización | Cola de operaciones, resolución de conflictos | 32 |
| Backup automático encriptado | Programación, encriptación, restauración | 16 |
| Autenticación cloud | Login, JWT, gestión de sesión | 8 |
| Tests de sincronización | Escenarios de conflicto, offline/online | 8 |
| **Total Sprint 7** | | **80h** |

---

### FASE 2: ANALYTICS Y REPORTING (Semanas 17-20)

#### Sprint 8 (Semanas 17-18): Informes de Rentabilidad

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Motor de analytics | Cálculos de P&L, agregaciones, tendencias | 24 |
| Dashboard de analytics | Gráficos, KPIs avanzados | 24 |
| Informes PDF automatizados | Generación de informes diario/semanal/mensual | 20 |
| Exportación de informes | PDF, Excel con gráficos | 12 |
| **Total Sprint 8** | | **80h** |

#### Sprint 9 (Semanas 19-20): Analytics Avanzados

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Análisis de volumen y tendencias | Gráficos temporales, distribución horaria | 20 |
| Informes de inventario | Rotación, días de stock, predicción | 20 |
| Ranking de clientes y monedas | Top clientes, monedas más rentables | 16 |
| Alertas inteligentes | Motor de reglas, notificaciones push | 16 |
| Dashboard de captura (imagen) | Para compartir por WhatsApp | 8 |
| **Total Sprint 9** | | **80h** |

---

### FASE 3: INTEGRACIÓN WHATSAPP (Semanas 21-23)

#### Sprint 10 (Semanas 21-22): WhatsApp Business API

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Setup WhatsApp Business API | Cuenta, verificación, configuración | 16 |
| Edge Functions para mensajería | Funciones serverless de envío | 20 |
| Difusión de tasas | Selección de clientes, plantillas, envío | 20 |
| Envío de recibos | Integración post-operación | 12 |
| Plantillas multilíngües | Árabe, francés, español | 12 |
| **Total Sprint 10** | | **80h** |

#### Sprint 11 (Semana 23): Chatbot y Automatización

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Chatbot de consulta de tasas | Recepción y respuesta automática | 20 |
| Difusión programada | Envío automático diario | 12 |
| Tests de integración WhatsApp | Escenarios de envío/recepción | 8 |
| **Total Sprint 11** | | **40h** |

---

### FASE 4: PULIDO Y LANZAMIENTO (Semanas 24-26)

#### Sprint 12 (Semanas 24-25): QA y Optimización

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Testing exhaustivo | Pruebas funcionales completas | 24 |
| Optimización de rendimiento | Profiling, optimización de queries y UI | 16 |
| Corrección de bugs | Bugs detectados en QA | 20 |
| Traducción final y revisión | Revisión de todas las traducciones | 8 |
| Documentación de usuario | Guía rápida en árabe y francés | 12 |
| **Total Sprint 12** | | **80h** |

#### Sprint 13 (Semana 26): Despliegue y Formación

| Tarea | Detalle | Horas |
|-------|---------|-------|
| Preparación del APK de producción | Build, firma, optimización | 8 |
| Despliegue del backend | Configuración de producción en Supabase | 8 |
| Instalación en dispositivos del cliente | Setup, configuración inicial | 4 |
| Formación al propietario | Sesión intensiva de 4 horas | 4 |
| Formación a operadores | Sesión de 2 horas | 2 |
| Migración de datos existentes | Si hay datos en cuadernos/Excel | 8 |
| Período de acompañamiento | Soporte cercano primera semana | 6 |
| **Total Sprint 13** | | **40h** |

---

## 3. RESUMEN DEL CRONOGRAMA

```
                 MES 1      MES 2      MES 3      MES 4      MES 5      MES 6    MES 7
             ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬─────┐
 FASE 0      │██████████│          │          │          │          │          │     │
 Descubrim.  │  2 sem   │          │          │          │          │          │     │
             ├──────────┼──────────┼──────────┼──────────┤          │          │     │
 FASE 1A     │          │██████████│██████████│██████████│          │          │     │
 MVP Core    │          │  Sprint 1│  Sprint 2│  Sprint 3│Sprint 4  │          │     │
             │          │          │          │          ├──────────┼──────────┤     │
 FASE 1B     │          │          │          │          │██████████│██████████│     │
 Avanzado    │          │          │          │          │Sprint5-6 │ Sprint 7 │     │
             │          │          │          │          │          ├──────────┼─────┤
 FASE 2      │          │          │          │          │          │██████████│█████│
 Analytics   │          │          │          │          │          │Sprint8-9 │     │
             │          │          │          │          │          │          ├─────┤
 FASE 3      │          │          │          │          │          │          │█████│
 WhatsApp    │          │          │          │          │          │          │Sp10 │
             │          │          │          │          │          │          ├─────┤
 FASE 4      │          │          │          │          │          │          │█████│
 Lanzamiento │          │          │          │          │          │          │Sp12 │
             └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴─────┘

 ██ = Período activo de desarrollo
```

### Hitos Clave

| Hito | Semana | Fecha Estimada | Entregable |
|------|--------|---------------|------------|
| H1: Kick-off | S1 | Marzo 2026 | Inicio formal |
| H2: Requisitos validados | S2 | Marzo 2026 | Documento de requisitos aprobado |
| H3: MVP funcional | S10 | Mayo 2026 | App con cambio + caja + recibos |
| H4: Beta completa | S16 | Julio 2026 | App con CRM + sync + cloud |
| H5: Analytics listos | S20 | Agosto 2026 | Reportes y analytics completos |
| H6: WhatsApp integrado | S23 | Septiembre 2026 | Notificaciones y chatbot |
| H7: Lanzamiento | S26 | Septiembre 2026 | Sistema en producción |

---

## 4. EQUIPO DEL PROYECTO

### 4.1 Equipo Necesario

| Rol | Cantidad | Dedicación | Responsabilidades |
|-----|----------|-----------|-------------------|
| **Project Manager / Product Owner** | 1 | 50% | Gestión del proyecto, comunicación con cliente |
| **Desarrollador Flutter Senior** | 1 | 100% | App móvil, lógica de negocio, offline-first |
| **Desarrollador Backend** | 1 | 60% | Supabase, Edge Functions, APIs |
| **Diseñador UI/UX** | 1 | 40% | Interfaz, experiencia de usuario, assets |
| **QA Tester** | 1 | 30% | Testing funcional y de rendimiento |

### 4.2 Colaboradores Externos

| Rol | Aportación |
|-----|-----------|
| Traductor árabe/hassanía | Traducción y revisión de textos |
| Asesor de negocio de cambio | Validación de flujos y reglas de negocio |
| Asesor legal (Argelia) | Cumplimiento regulatorio local |

---

## 5. PRESUPUESTO DETALLADO

### 5.1 Costes de Desarrollo

| Concepto | Cantidad | Coste Unitario | Total |
|----------|----------|---------------|-------|
| **Fase 0: Descubrimiento** | | | |
| PM/PO (2 semanas, 50%) | 40h | 50€/h | 2,000€ |
| Diseñador UI/UX (2 semanas, 100%) | 80h | 40€/h | 3,200€ |
| Viaje a Tindouf (si necesario) | 1 viaje | 1,500€ | 1,500€ |
| **Subtotal Fase 0** | | | **6,700€** |
| | | | |
| **Fase 1A: MVP Core** | | | |
| Desarrollador Flutter Senior (8 sem) | 320h | 55€/h | 17,600€ |
| PM/PO (8 semanas, 50%) | 160h | 50€/h | 8,000€ |
| Diseñador UI/UX (8 semanas, 40%) | 128h | 40€/h | 5,120€ |
| QA Tester (últimas 2 semanas) | 40h | 35€/h | 1,400€ |
| **Subtotal Fase 1A** | | | **32,120€** |
| | | | |
| **Fase 1B: Funcionalidades Avanzadas** | | | |
| Desarrollador Flutter Senior (6 sem) | 240h | 55€/h | 13,200€ |
| Desarrollador Backend (6 sem, 60%) | 144h | 50€/h | 7,200€ |
| PM/PO (6 semanas, 50%) | 120h | 50€/h | 6,000€ |
| Diseñador UI/UX (6 semanas, 30%) | 72h | 40€/h | 2,880€ |
| QA Tester (6 semanas, 30%) | 72h | 35€/h | 2,520€ |
| **Subtotal Fase 1B** | | | **31,800€** |
| | | | |
| **Fase 2: Analytics** | | | |
| Desarrollador Flutter Senior (4 sem) | 160h | 55€/h | 8,800€ |
| Desarrollador Backend (4 sem, 40%) | 64h | 50€/h | 3,200€ |
| PM/PO (4 semanas, 40%) | 64h | 50€/h | 3,200€ |
| QA Tester (4 semanas, 30%) | 48h | 35€/h | 1,680€ |
| **Subtotal Fase 2** | | | **16,880€** |
| | | | |
| **Fase 3: WhatsApp** | | | |
| Desarrollador Backend (3 sem, 100%) | 120h | 50€/h | 6,000€ |
| Desarrollador Flutter (3 sem, 50%) | 60h | 55€/h | 3,300€ |
| PM/PO (3 semanas, 30%) | 36h | 50€/h | 1,800€ |
| QA Tester (3 semanas, 30%) | 36h | 35€/h | 1,260€ |
| **Subtotal Fase 3** | | | **12,360€** |
| | | | |
| **Fase 4: Lanzamiento** | | | |
| Desarrollador Flutter Senior (3 sem) | 120h | 55€/h | 6,600€ |
| Desarrollador Backend (3 sem, 50%) | 60h | 50€/h | 3,000€ |
| PM/PO (3 semanas, 60%) | 72h | 50€/h | 3,600€ |
| QA Tester (3 semanas, 80%) | 96h | 35€/h | 3,360€ |
| Formación y acompañamiento | 20h | 60€/h | 1,200€ |
| **Subtotal Fase 4** | | | **17,760€** |

### 5.2 Resumen de Costes de Desarrollo

| Fase | Coste |
|------|-------|
| Fase 0: Descubrimiento | 6,700€ |
| Fase 1A: MVP Core | 32,120€ |
| Fase 1B: Funcionalidades Avanzadas | 31,800€ |
| Fase 2: Analytics | 16,880€ |
| Fase 3: WhatsApp | 12,360€ |
| Fase 4: Lanzamiento | 17,760€ |
| **TOTAL DESARROLLO** | **117,620€** |

### 5.3 Costes de Infraestructura y Servicios (Anuales)

| Servicio | Plan | Coste Mensual | Coste Anual |
|----------|------|--------------|-------------|
| **Supabase** | Pro | 25€/mes | 300€ |
| **WhatsApp Business API** | Pay per use | ~30€/mes | 360€ |
| **ExchangeRate-API** | Business | 15€/mes | 180€ |
| **Firebase** | Spark/Blaze | ~5€/mes | 60€ |
| **Vercel** (Panel web) | Pro | 20€/mes | 240€ |
| **Google Play** | Desarrollador | - | 25€ (único) |
| **Sentry** | Developer | 0€ | 0€ |
| **Dominio web** | .com | - | 15€ |
| **TOTAL INFRAESTRUCTURA** | | **~95€/mes** | **~1,180€/año** |

### 5.4 Costes de Mantenimiento Post-Lanzamiento

| Concepto | Horas/Mes | Coste Mensual |
|----------|----------|--------------|
| Mantenimiento correctivo (bugs) | 8h | 440€ |
| Actualizaciones menores | 4h | 220€ |
| Soporte técnico al cliente | 4h | 200€ |
| Monitoreo y backups | 2h | 100€ |
| **TOTAL MANTENIMIENTO** | **18h/mes** | **960€/mes** |

### 5.5 Resumen General de Presupuesto

```
┌─────────────────────────────────────────────────────────┐
│              PRESUPUESTO TOTAL DEL PROYECTO               │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │  DESARROLLO (una vez)           117,620€          │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │  INFRAESTRUCTURA (Año 1)          1,180€          │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │  MANTENIMIENTO (Año 1, 6 meses)   5,760€          │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ═══════════════════════════════════════════════════════  │
│                                                           │
│  INVERSIÓN TOTAL AÑO 1:            124,560€              │
│  COSTE ANUAL RECURRENTE (Año 2+):   12,700€              │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 6. OPCIONES DE PRESUPUESTO ALTERNATIVAS

Entendemos que el presupuesto completo puede ser elevado. Ofrecemos las siguientes alternativas:

### Opción A: Sistema Completo (Recomendada)
- **Alcance:** Todas las fases (0-4)
- **Duración:** 26 semanas
- **Inversión:** 124,560€
- **Incluye:** Todas las funcionalidades, WhatsApp, analytics, formación

### Opción B: Sistema Avanzado
- **Alcance:** Fases 0, 1A, 1B y 4
- **Duración:** 19 semanas
- **Inversión:** ~88,380€
- **Incluye:** Cambio, caja, CRM, sync cloud. Sin analytics avanzados ni WhatsApp.
- **WhatsApp y Analytics:** Se pueden añadir más adelante

### Opción C: MVP Funcional
- **Alcance:** Fases 0, 1A y 4 (simplificado)
- **Duración:** 13 semanas
- **Inversión:** ~56,580€
- **Incluye:** Motor de cambio, transacciones, caja, recibos, cierre de caja
- **Ideal para:** Empezar a ver resultados rápido y decidir si ampliar

### Opción D: MVP Mínimo (Solo App)
- **Alcance:** Fase 1A simplificada (sin cloud)
- **Duración:** 8 semanas
- **Inversión:** ~28,000€
- **Incluye:** Calculadora de cambio, registro de operaciones, caja básica
- **Limitaciones:** Sin cloud, sin WhatsApp, sin CRM, sin analytics avanzados
- **Ideal para:** Presupuesto muy limitado, validar concepto

---

## 7. RETORNO DE LA INVERSIÓN (ROI)

### 7.1 Análisis de Beneficios

Suponiendo un cambiador con un volumen medio-alto en Tindouf:

| Métrica | Estimación Conservadora |
|---------|------------------------|
| Operaciones diarias | 50-100 |
| Volumen diario medio | 50,000-200,000 DZD equivalente |
| Spread medio por operación | 1-3% |
| Beneficio bruto diario estimado | 2,000-6,000 DZD |
| Días operativos al mes | 26 |

### 7.2 Ahorro y Mejoras Cuantificables

| Beneficio | Valor Estimado (mensual) |
|-----------|-------------------------|
| Eliminación de errores de cálculo (estimado 2-5% de pérdida) | 1,500-3,000 DZD |
| Reducción de diferencias de caja | 2,000-5,000 DZD |
| Tiempo ahorrado (30 min/día × 26 días) | 13 horas/mes |
| Más clientes por mejor servicio (+10-20%) | Variable |
| Mejor gestión de spreads con datos reales | Variable |
| Profesionalización del negocio | Intangible (alto valor) |

### 7.3 Período de Retorno

Con la Opción C (MVP Funcional):
- Inversión: ~56,580€
- Ahorro mensual estimado (conservador): 500-800€ equivalente
- Mejora de ingresos por profesionalización: difícil de cuantificar pero significativa
- **ROI estimado:** El sistema se paga por sí mismo al reducir errores y mejorar eficiencia

---

## 8. GARANTÍA Y SOPORTE POST-LANZAMIENTO

### 8.1 Garantía Incluida

| Aspecto | Cobertura |
|---------|----------|
| Período de garantía | 3 meses post-lanzamiento |
| Corrección de bugs | Incluida sin coste |
| Soporte técnico | Email + WhatsApp, respuesta < 24h |
| Ajustes menores | Hasta 20 horas incluidas |
| Actualizaciones de seguridad | Incluidas |

### 8.2 Plan de Soporte Extendido (Opcional)

| Plan | Coste Mensual | Incluye |
|------|--------------|---------|
| Básico | 500€/mes | Mantenimiento correctivo + actualizaciones |
| Standard | 960€/mes | Básico + soporte prioritario + mejoras menores |
| Premium | 1,500€/mes | Standard + funcionalidades nuevas + soporte 24/7 |

---

## 9. CONDICIONES COMERCIALES

### 9.1 Forma de Pago Propuesta

| Hito | % del Total | Importe (Opción A) | Momento |
|------|------------|--------------------|---------| 
| Firma del contrato | 20% | 23,524€ | Al inicio |
| Entrega MVP (Fase 1A) | 25% | 29,405€ | Semana 10 |
| Entrega Beta (Fase 1B) | 20% | 23,524€ | Semana 16 |
| Entrega Analytics + WhatsApp | 20% | 23,524€ | Semana 23 |
| Lanzamiento final | 15% | 17,643€ | Semana 26 |

*Nota: Los montos exactos se negociarán según la opción elegida.*

### 9.2 Propiedad Intelectual

- El código fuente desarrollado será propiedad del cliente tras el pago completo
- Las librerías open-source utilizadas mantienen sus licencias originales
- El nombre "SarafPro" y su branding serán propiedad del cliente

### 9.3 Confidencialidad

- Se firmará un NDA (Acuerdo de No Divulgación)
- Los datos del negocio y sus clientes se tratarán con máxima confidencialidad
- Cumplimiento con las mejores prácticas de protección de datos

---

## 10. FACTORES CRÍTICOS DE ÉXITO

| # | Factor | Descripción | Responsable |
|---|--------|-------------|-------------|
| 1 | Compromiso del cliente | Participación activa en feedback y validación | Cliente |
| 2 | Acceso a información del negocio | Datos reales de operaciones para diseño | Cliente |
| 3 | Disponibilidad para formación | Tiempo para aprender el sistema | Cliente + Equipo |
| 4 | Dispositivos adecuados | Smartphone Android reciente, buena batería | Cliente |
| 5 | Cuenta WhatsApp Business | Necesaria para módulo de notificaciones | Cliente |
| 6 | Conectividad mínima | Al menos conexión 3G ocasional para sync | Cliente |
| 7 | Feedback continuo | Reviews al final de cada sprint | Cliente |

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro.*

---

**Documentos relacionados:**
- [Propuesta del Proyecto](PROPUESTA_PROYECTO.md)
- [Arquitectura Técnica](ARQUITECTURA_TECNICA.md)
- [Funcionalidades Detalladas](FUNCIONALIDADES.md)
- [Modelo de Datos](MODELO_DATOS.md)
- [Seguridad y Cumplimiento](SEGURIDAD_CUMPLIMIENTO.md)
