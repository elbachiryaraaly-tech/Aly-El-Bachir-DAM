# PLANIFICACION DETALLADA Y PRESUPUESTO

## SARAF PRO - Sistema Elite de Gestion de Cambio de Divisas

---

**Version:** 1.0  
**Fecha:** 13 de febrero de 2026  
**Documento:** Anexo de Planificacion y Costes

---

## 1. CRONOGRAMA DETALLADO (Opcion A - Premium)

### FASE 1: FUNDACION (Semanas 1-3)

| Semana | Tarea | Responsable | Entregable |
|---|---|---|---|
| **S1** | Configuracion entorno dev (Docker, CI/CD, repos) | Backend Dev | Entorno listo |
| **S1** | Diseno de base de datos completa | Backend Dev | Schema SQL validado |
| **S1** | Prototipo UI/UX - Wireframes app movil | Disenador | Wireframes Figma |
| **S2** | Modulo Auth: Login, PIN, JWT, Permisos | Backend Dev | API Auth funcionando |
| **S2** | Modulo Exchange Core: Motor de conversion | Backend Dev | Calculadora precisa |
| **S2** | Diseno UI/UX - Pantallas finales app | Disenador | Mockups alta fidelidad |
| **S3** | Modulo Cash: CRUD caja, movimientos | Backend Dev | API Cash funcionando |
| **S3** | Modulo Rates: CRUD tasas, historial | Backend Dev | API Rates funcionando |
| **S3** | Tests unitarios de todo el core | Backend Dev | >80% cobertura core |

**Hito 1 (Fin S3):** API core funcionando con tests. Demo de calculadora via API.

---

### FASE 2: FUNCIONALIDADES PRINCIPALES (Semanas 4-6)

| Semana | Tarea | Responsable | Entregable |
|---|---|---|---|
| **S4** | Modulo Clients: CRUD, busqueda, saldos | Backend Dev | API Clients funcionando |
| **S4** | App Movil: Setup Expo + Navegacion + Tema | Mobile Dev | App base con navegacion |
| **S4** | App Movil: Pantalla Login/PIN | Mobile Dev | Login funcional |
| **S5** | App Movil: Home/Dashboard con datos reales | Mobile Dev | Dashboard en vivo |
| **S5** | App Movil: Flujo completo nueva operacion | Mobile Dev | Cambio EUR->DZD funcional |
| **S5** | Modulo Reports: Reportes basicos | Backend Dev | API Reports funcionando |
| **S6** | App Movil: Pantalla de caja multi-divisa | Mobile Dev | Caja en tiempo real |
| **S6** | App Movil: Lista de operaciones + detalle | Mobile Dev | Historial navegable |
| **S6** | Integracion App <-> API completa | Full Stack | App conectada al backend |

**Hito 2 (Fin S6):** App movil funcional con flujo principal de cambio. DEMO EN DISPOSITIVO REAL.

> **SEGUNDO PAGO (25%) al completar este hito.**

---

### FASE 3: FUNCIONALIDADES AVANZADAS (Semanas 7-9)

| Semana | Tarea | Responsable | Entregable |
|---|---|---|---|
| **S7** | App Movil: Gestion de clientes completa | Mobile Dev | CRM en la app |
| **S7** | App Movil: Gestion de tasas con slider | Mobile Dev | Ajuste de tasas facil |
| **S7** | Modo Offline: WatermelonDB + Sync engine | Mobile Dev | App funciona sin internet |
| **S8** | Panel Web: Setup Next.js + Dashboard | Web Dev | Dashboard web basico |
| **S8** | Panel Web: Reportes con graficos | Web Dev | Graficos interactivos |
| **S8** | App Movil: Notificaciones push (FCM) | Mobile Dev | Alertas funcionando |
| **S9** | Panel Web: Gestion de tasas + historial grafico | Web Dev | Gestion avanzada |
| **S9** | Panel Web: Exportacion PDF/Excel | Web Dev | Exportar reportes |
| **S9** | Integracion APIs de tasas de mercado | Backend Dev | Tasas automaticas |

**Hito 3 (Fin S9):** Sistema completo con modo offline y panel web.

---

### FASE 4: REFINAMIENTO (Semanas 10-11)

| Semana | Tarea | Responsable | Entregable |
|---|---|---|---|
| **S10** | Traducciones AR/FR/ES completas | Traductor + Dev | App trilingue |
| **S10** | Soporte RTL completo y pulido | Mobile Dev | Arabe perfecto |
| **S10** | Integracion WhatsApp Business API | Backend Dev | Recibos por WhatsApp |
| **S11** | Optimizacion rendimiento (app + API) | Full Stack | Tiempos < objetivos |
| **S11** | Testing integral (E2E, seguridad) | QA | Reporte de calidad |
| **S11** | Sistema de backup automatico | Backend Dev | Backups diarios |
| **S11** | Correccion de bugs encontrados | Full Stack | 0 bugs criticos |

**Hito 4 (Fin S11):** Sistema listo para produccion.

> **TERCER PAGO (25%) al completar este hito.**

---

### FASE 5: LANZAMIENTO (Semana 12)

| Dia | Tarea | Responsable | Entregable |
|---|---|---|---|
| **L** | Despliegue servidor produccion | DevOps | Server en vivo |
| **M** | Migracion datos iniciales (tasas, divisas) | Full Stack | Sistema configurado |
| **X** | Publicacion en Google Play Store | Mobile Dev | App disponible |
| **J** | Sesion de formacion al usuario (2h video) | PM | Video tutorial |
| **V** | Entrega documentacion + codigo fuente | PM | Paquete completo |

**Hito 5 (Fin S12):** LANZAMIENTO OFICIAL.

> **CUARTO PAGO (20%) al completar este hito.**

---

## 2. PRESUPUESTO DESGLOSADO

### 2.1 Opcion A: Sistema Completo Premium (12,000 EUR)

#### Desarrollo

| Modulo | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **Backend API (NestJS)** | | | |
| - Arquitectura y setup | 16h | 35 EUR | 560 EUR |
| - Modulo Auth | 20h | 35 EUR | 700 EUR |
| - Modulo Exchange Core | 30h | 35 EUR | 1,050 EUR |
| - Modulo Cash | 20h | 35 EUR | 700 EUR |
| - Modulo Rates | 16h | 35 EUR | 560 EUR |
| - Modulo Clients | 20h | 35 EUR | 700 EUR |
| - Modulo Reports | 16h | 35 EUR | 560 EUR |
| - Modulo Notifications | 12h | 35 EUR | 420 EUR |
| - Modulo Sync | 20h | 35 EUR | 700 EUR |
| - Modulo Automation | 10h | 35 EUR | 350 EUR |
| **Subtotal Backend** | **180h** | | **6,300 EUR** |

| Modulo | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **App Movil (React Native)** | | | |
| - Setup + Navegacion + Tema | 12h | 35 EUR | 420 EUR |
| - Pantalla Home/Dashboard | 16h | 35 EUR | 560 EUR |
| - Flujo Operacion de Cambio | 24h | 35 EUR | 840 EUR |
| - Gestion de Caja | 16h | 35 EUR | 560 EUR |
| - Gestion de Clientes | 16h | 35 EUR | 560 EUR |
| - Gestion de Tasas | 12h | 35 EUR | 420 EUR |
| - Modo Offline (WatermelonDB) | 24h | 35 EUR | 840 EUR |
| - Notificaciones Push | 8h | 35 EUR | 280 EUR |
| - Soporte RTL + i18n | 16h | 35 EUR | 560 EUR |
| - Reportes en app | 8h | 35 EUR | 280 EUR |
| **Subtotal App Movil** | **152h** | | **5,320 EUR** |

| Modulo | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **Panel Web (Next.js)** | | | |
| - Setup + Layout + Auth | 8h | 35 EUR | 280 EUR |
| - Dashboard con graficos | 16h | 35 EUR | 560 EUR |
| - Gestion de tasas | 8h | 35 EUR | 280 EUR |
| - Reportes + Exportacion | 16h | 35 EUR | 560 EUR |
| - Configuracion sistema | 8h | 35 EUR | 280 EUR |
| - Auditoria y logs | 6h | 35 EUR | 210 EUR |
| **Subtotal Panel Web** | **62h** | | **2,170 EUR** |

| Concepto | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **Diseno UI/UX** | | | |
| - Investigacion y wireframes | 8h | 30 EUR | 240 EUR |
| - Diseno pantallas app (Figma) | 20h | 30 EUR | 600 EUR |
| - Diseno panel web | 8h | 30 EUR | 240 EUR |
| - Iconografia y branding | 4h | 30 EUR | 120 EUR |
| **Subtotal Diseno** | **40h** | | **1,200 EUR** |

| Concepto | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **Testing y QA** | | | |
| - Tests unitarios | 16h | 30 EUR | 480 EUR |
| - Tests integracion | 12h | 30 EUR | 360 EUR |
| - Tests E2E | 8h | 30 EUR | 240 EUR |
| - QA manual y reportes | 8h | 30 EUR | 240 EUR |
| **Subtotal Testing** | **44h** | | **1,320 EUR** |

| Concepto | Horas Est. | Tarifa/h | Subtotal |
|---|---|---|---|
| **Otros** | | | |
| - Integraciones (WhatsApp, APIs tasas) | 16h | 35 EUR | 560 EUR |
| - DevOps, despliegue, CI/CD | 12h | 35 EUR | 420 EUR |
| - Formacion y documentacion | 10h | 25 EUR | 250 EUR |
| - Gestion de proyecto | 12h | 25 EUR | 300 EUR |
| **Subtotal Otros** | **50h** | | **1,530 EUR** |

#### Resumen Opcion A

| Categoria | Horas | Coste |
|---|---|---|
| Backend API | 180h | 6,300 EUR |
| App Movil | 152h | 5,320 EUR |
| Panel Web | 62h | 2,170 EUR |
| Diseno UI/UX | 40h | 1,200 EUR |
| Testing y QA | 44h | 1,320 EUR |
| Otros | 50h | 1,530 EUR |
| **TOTAL BRUTO** | **528h** | **17,840 EUR** |
| **DESCUENTO PROYECTO COMPLETO** | | **-5,840 EUR (-33%)** |
| **TOTAL FINAL** | **528h** | **12,000 EUR** |

> El descuento del 33% se aplica por ser un proyecto integral donde muchos componentes se reutilizan y el esfuerzo se optimiza.

---

### 2.2 Opcion B: Sistema Esencial (7,500 EUR)

| Categoria | Incluido | Horas | Coste |
|---|---|---|---|
| Backend API | Core + Cash + Rates + Clients + Reports basicos | 120h | 4,200 EUR |
| App Movil | Completa (sin IA, sin multi-operador) | 130h | 4,550 EUR |
| Panel Web | NO INCLUIDO | 0h | 0 EUR |
| Diseno UI/UX | Solo app movil | 24h | 720 EUR |
| Testing | Basico | 20h | 600 EUR |
| Otros | Despliegue + formacion | 16h | 530 EUR |
| **TOTAL BRUTO** | | **310h** | **10,600 EUR** |
| **DESCUENTO** | | | **-3,100 EUR (-29%)** |
| **TOTAL FINAL** | | **310h** | **7,500 EUR** |

---

### 2.3 Opcion C: MVP (4,500 EUR)

| Categoria | Incluido | Horas | Coste |
|---|---|---|---|
| Backend API | Solo core: Auth + Exchange + Cash + Rates | 60h | 2,100 EUR |
| App Movil | Funciones basicas, offline simplificado | 80h | 2,800 EUR |
| Panel Web | NO INCLUIDO | 0h | 0 EUR |
| Diseno | Basico funcional | 12h | 360 EUR |
| Testing | Minimo | 10h | 300 EUR |
| Otros | Despliegue basico | 8h | 240 EUR |
| **TOTAL BRUTO** | | **170h** | **5,800 EUR** |
| **DESCUENTO** | | | **-1,300 EUR (-22%)** |
| **TOTAL FINAL** | | **170h** | **4,500 EUR** |

---

## 3. COSTES RECURRENTES DETALLADOS

### 3.1 Infraestructura Mensual

| Servicio | Proveedor Sugerido | Opcion A | Opcion B | Opcion C |
|---|---|---|---|---|
| VPS (servidor) | Hetzner / DigitalOcean | 15 EUR | 10 EUR | 8 EUR |
| Dominio (.com) | Namecheap | ~1 EUR (12 EUR/ano) | ~1 EUR | ~1 EUR |
| SSL | Let's Encrypt | GRATIS | GRATIS | GRATIS |
| Backup cloud | Backblaze B2 | 3 EUR | 2 EUR | 1 EUR |
| APIs de tasas | ExchangeRate-API (free) | GRATIS | GRATIS | GRATIS |
| WhatsApp API | Meta Business | 10 EUR | - | - |
| Firebase (push) | Google | GRATIS | GRATIS | GRATIS |
| Google Play Store | Google (unico) | ~2 EUR (25$/una vez) | ~2 EUR | ~2 EUR |
| **TOTAL MENSUAL** | | **~29 EUR** | **~13 EUR** | **~10 EUR** |
| **TOTAL ANUAL** | | **~348 EUR** | **~156 EUR** | **~120 EUR** |

### 3.2 Coste Total Primer Ano (Desarrollo + Infraestructura)

| Concepto | Opcion A | Opcion B | Opcion C |
|---|---|---|---|
| Desarrollo | 12,000 EUR | 7,500 EUR | 4,500 EUR |
| Infraestructura (9 meses post-dev) | 261 EUR | 117 EUR | 90 EUR |
| **TOTAL AÑO 1** | **12,261 EUR** | **7,617 EUR** | **4,590 EUR** |

### 3.3 Coste Total del Segundo Ano en Adelante

| Concepto | Opcion A | Opcion B | Opcion C |
|---|---|---|---|
| Infraestructura anual | 348 EUR | 156 EUR | 120 EUR |
| Mantenimiento (opcional) | 600-2,400 EUR | 600-1,200 EUR | 600 EUR |
| **TOTAL ANUAL (sin mant.)** | **348 EUR** | **156 EUR** | **120 EUR** |
| **TOTAL ANUAL (con mant.)** | **948 - 2,748 EUR** | **756 - 1,356 EUR** | **720 EUR** |

---

## 4. CALENDARIO DE PAGOS

### Opcion A: 12,000 EUR

| Hito | Momento | Porcentaje | Monto | Acumulado |
|---|---|---|---|---|
| 1 | Firma de contrato e inicio | 30% | 3,600 EUR | 3,600 EUR |
| 2 | Demo app funcional (Fin S6) | 25% | 3,000 EUR | 6,600 EUR |
| 3 | Sistema pre-produccion (Fin S11) | 25% | 3,000 EUR | 9,600 EUR |
| 4 | Entrega final (Fin S12) | 20% | 2,400 EUR | 12,000 EUR |

### Opcion B: 7,500 EUR

| Hito | Momento | Porcentaje | Monto | Acumulado |
|---|---|---|---|---|
| 1 | Firma de contrato e inicio | 30% | 2,250 EUR | 2,250 EUR |
| 2 | Demo app funcional (Fin S4) | 30% | 2,250 EUR | 4,500 EUR |
| 3 | Entrega final (Fin S8) | 40% | 3,000 EUR | 7,500 EUR |

### Opcion C: 4,500 EUR

| Hito | Momento | Porcentaje | Monto | Acumulado |
|---|---|---|---|---|
| 1 | Firma de contrato e inicio | 40% | 1,800 EUR | 1,800 EUR |
| 2 | Entrega final (Fin S5) | 60% | 2,700 EUR | 4,500 EUR |

---

## 5. ANALISIS DE RETORNO DE INVERSION (ROI) DETALLADO

### 5.1 Supuestos Base

| Parametro | Valor Estimado | Nota |
|---|---|---|
| Operaciones diarias | 40 | Conservador |
| Dias de operacion/mes | 26 | Sin viernes |
| Volumen medio por operacion | 300 EUR equiv. | Mixto grandes/pequenas |
| Spread medio | 1.0% | Entre compra y venta |
| Tasa de error actual (manual) | 3% | Sobre operaciones |
| Coste medio de error | 30 EUR equiv. | Perdida por error |
| Deudas olvidadas/mes | 200 EUR equiv. | Que no se cobran |
| Clientes adicionales (por rapidez) | +5/semana | Nuevos recurrentes |
| Valor medio cliente nuevo/mes | 20 EUR | En spreads generados |

### 5.2 Ahorro y Ganancia Mensual Adicional

| Beneficio | Calculo | Valor Mensual |
|---|---|---|
| Errores eliminados | 40 ops x 3% x 30 EUR x 26 dias | **936 EUR** |
| Deudas recuperadas | 200 EUR/mes | **200 EUR** |
| Clientes adicionales | 5/sem x 4 sem x 20 EUR | **400 EUR** |
| Tiempo ahorrado (valor) | 2h/dia x 26 dias x 5 EUR/h | **260 EUR** |
| Spread optimizado (IA) | +0.1% x 40 ops x 300 EUR x 26 dias | **312 EUR** |
| **TOTAL BENEFICIO MENSUAL** | | **2,108 EUR** |

### 5.3 Calculo de ROI por Opcion

**Opcion A (12,000 EUR):**
```
Inversion total ano 1:    12,261 EUR
Beneficio mensual:         2,108 EUR
Meses para recuperar:      12,261 / 2,108 = 5.8 meses
ROI al ano 1:              (2,108 x 9 - 261) / 12,000 = 155%
ROI al ano 2:              (2,108 x 12 - 348) / 12,000 = 208%
```

**Opcion B (7,500 EUR):**
```
Inversion total ano 1:    7,617 EUR
Beneficio mensual:         1,800 EUR (sin IA ni algunas mejoras)
Meses para recuperar:      7,617 / 1,800 = 4.2 meses
ROI al ano 1:              (1,800 x 10 - 117) / 7,500 = 238%
```

**Opcion C (4,500 EUR):**
```
Inversion total ano 1:    4,590 EUR
Beneficio mensual:         1,400 EUR (funciones basicas)
Meses para recuperar:      4,590 / 1,400 = 3.3 meses
ROI al ano 1:              (1,400 x 10 - 90) / 4,500 = 309%
```

### 5.4 Proyeccion a 3 Anos

| Ano | Inversion Acum. | Beneficio Acum. | Balance Neto |
|---|---|---|---|
| Ano 1 (Opcion A) | 12,261 EUR | 18,972 EUR (9 meses) | **+6,711 EUR** |
| Ano 2 | 12,609 EUR | 44,268 EUR | **+31,659 EUR** |
| Ano 3 | 12,957 EUR | 69,564 EUR | **+56,607 EUR** |

> En 3 anos, la inversion de 12,000 EUR genera un beneficio neto estimado de **+56,607 EUR**.

---

## 6. RIESGOS Y MITIGACION

| Riesgo | Probabilidad | Impacto | Mitigacion |
|---|---|---|---|
| Conectividad limitada | Alta | Medio | Modo offline-first completo |
| Cambios regulatorios | Baja | Alto | Arquitectura flexible, parametrizable |
| Resistencia al cambio | Media | Alto | Formacion intensiva, UI super simple |
| Dispositivo perdido/robado | Media | Alto | Cifrado + borrado remoto + backup nube |
| Fallo de servidor | Baja | Alto | Backups diarios + app funciona offline |
| Alcance cambiante | Media | Medio | Fases claras, hitos definidos |
| Tasas API no disponibles | Baja | Bajo | Multiples fuentes + ingreso manual |

---

## 7. GARANTIAS DEL PROYECTO

| Garantia | Detalle |
|---|---|
| **Codigo fuente** | Entregado al 100%. Es propiedad del cliente. |
| **Garantia de bugs** | 6 meses de correccion gratuita de errores |
| **Soporte inicial** | 3 meses de soporte incluido (WhatsApp/email) |
| **Formacion** | 2 sesiones de formacion incluidas (video + en vivo) |
| **Documentacion** | Manual de usuario + documentacion tecnica |
| **Sin dependencia** | El sistema puede funcionar sin el desarrollador |
| **Confidencialidad** | NDA firmado, datos del cliente protegidos |
| **Satisfaccion** | Si el Hito 2 no satisface, reembolso del 50% de lo pagado |

---

## 8. CONDICIONES GENERALES

1. Los precios incluyen todos los impuestos aplicables
2. Los plazos asumen disponibilidad del cliente para feedback en 48h
3. Cambios de alcance despues de la Fase 2 pueden ajustar plazos y costes
4. El cliente proporciona contenido en arabe (textos especificos de su negocio)
5. Los costes de infraestructura (servidor, dominio) corren por cuenta del cliente
6. La publicacion en Google Play requiere una cuenta de desarrollador (25$ unico pago)
7. El mantenimiento post-garantia es opcional pero recomendado

---

*Este documento complementa la Propuesta Principal y las Especificaciones Tecnicas para proporcionar una vision completa del proyecto SARAF PRO.*
