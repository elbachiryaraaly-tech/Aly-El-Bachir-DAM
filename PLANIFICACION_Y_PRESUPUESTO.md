# PLANIFICACION Y PRESUPUESTO DETALLADO

## SARAF ELITE - Sistema de Red de Cambio de Divisas

---

**Version:** 2.0  
**Fecha:** 13 de febrero de 2026

---

## 1. CRONOGRAMA SEMANA A SEMANA

### FASE 1: CIMIENTOS (Semanas 1-3)

**Objetivo**: Tener el motor del sistema funcionando y la base de datos lista.

| Semana | Tarea | Detalle |
|---|---|---|
| **S1** | Entorno + Base de datos | Docker, CI/CD, PostgreSQL, Redis, schema completo, datos iniciales (divisas, puntos) |
| **S1** | Autenticacion | Login con PIN (empleados) y password (jefe), JWT, roles, permisos boss/employee |
| **S2** | Motor de cambio | API de conversion, calculadora de tasas, registro de operaciones |
| **S2** | Gestion de tasas | CRUD tasas, propagacion a empleados, historial |
| **S2** | Gestion de caja por empleado | Caja individual por empleado/divisa, movimientos, saldos |
| **S3** | Sistema de aprobacion | Solicitudes, notificaciones push, aprobacion/rechazo |
| **S3** | Sincronizacion offline | Motor de sync push/pull, resolucion de conflictos |
| **S3** | Tests del core | Tests unitarios y de integracion del motor principal |

**Entregable S3**: API completa funcionando. Se puede probar desde Postman/terminal.

---

### FASE 2: APP DEL EMPLEADO (Semanas 4-6)

**Objetivo**: Los empleados pueden operar con la app. Funciona offline.

| Semana | Tarea | Detalle |
|---|---|---|
| **S4** | Setup app + Login | Expo/React Native, navegacion, pantalla de PIN, tema visual |
| **S4** | Home del empleado | Vista de "Mi caja" + botones grandes de divisa |
| **S5** | Flujo de operacion completo | 3 toques: seleccionar divisa -> monto -> confirmar. Teclado numerico grande. |
| **S5** | Botones rapidos + resultado | Montos rapidos (100, 200, 500...), pantalla de confirmacion clara |
| **S5** | Caja del empleado | Ver mi caja, registrar entrada/salida, historial de movimientos |
| **S6** | Modo offline completo | WatermelonDB, sync engine, funcionar sin internet al 100% |
| **S6** | Clientes basico | Buscar, registrar, seleccionar en operacion |
| **S6** | Solicitud de aprobacion | Flujo completo: pedir permiso al jefe para operacion grande |

**Entregable S6**: App del empleado instalable en Android. DEMO en dispositivo real.

> **SEGUNDO PAGO al completar este hito.**

---

### FASE 3: APP DEL JEFE (Semanas 7-9)

**Objetivo**: El jefe controla todo desde su movil.

| Semana | Tarea | Detalle |
|---|---|---|
| **S7** | Dashboard del jefe | Ganancia de hoy, caja total de la red, todos los empleados con sus cajas |
| **S7** | Gestion de empleados | Ver empleados, su caja, su actividad, indicador online/offline |
| **S7** | Monitor en tiempo real | Feed en vivo de todas las operaciones |
| **S8** | Gestion de tasas | Pantalla con +/- por par, boton "APLICAR A TODOS" |
| **S8** | Sistema de aprobacion (jefe) | Notificacion + pantalla de APROBAR/RECHAZAR |
| **S8** | Transferencias entre empleados | Ordenar transferencia, confirmacion del emisor/receptor |
| **S9** | Reportes | Diario, semanal, mensual, por empleado, por punto, exportar PDF |
| **S9** | Cierre de caja | Cierre automatico/manual, verificacion de conteo, resumen |
| **S9** | Clientes avanzado + deudas | Deudas pendientes, alertas, historial completo |

**Entregable S9**: App del jefe con control completo. DEMO del sistema entero (jefe + empleados).

> **TERCER PAGO al completar este hito.**

---

### FASE 4: PULIR Y LANZAR (Semana 10)

| Dia | Tarea | Detalle |
|---|---|---|
| **Lun-Mar** | Arabe (RTL) + Frances | Traducciones completas, ajuste RTL, revisiones |
| **Mar-Mie** | WhatsApp automatico | Resumen diario enviado al jefe por WhatsApp |
| **Mie** | Testing final | Pruebas de todo: offline, sync, operaciones, aprobaciones |
| **Jue** | Despliegue produccion | Servidor, dominio, SSL, Firebase, Play Store |
| **Jue** | Instalacion | App en movil del jefe + moviles de empleados |
| **Vie** | Configuracion + Formacion | Tasas iniciales, empleados, puntos. Formacion 1h jefe + 30min empleados |
| **Vie** | Primer dia supervisado | El sistema se usa en real con supervision |

**Entregable Final**: Sistema en produccion, todo el mundo formado.

> **CUARTO PAGO al completar este hito.**

---

### Cronograma Visual

```
Semana  1    2    3    4    5    6    7    8    9    10
       [== CIMIENTOS ==]
                       [== APP EMPLEADO ==]
                                          [== APP JEFE ===]
                                                         [LANZAR]
                  ^              ^                   ^         ^
                  |              |                   |         |
              API lista    Demo empleado       Demo jefe   PRODUCCION
                          (2do pago)          (3er pago)  (4to pago)
```

---

## 2. PRESUPUESTO DESGLOSADO (Opcion A - SARAF ELITE)

### 2.1 Desarrollo Backend

| Modulo | Horas | Descripcion |
|---|---|---|
| Arquitectura + setup | 12h | Docker, CI/CD, estructura, config |
| Auth (PIN + password + roles) | 16h | Login diferenciado jefe/empleado, JWT, permisos |
| Motor de cambio | 24h | Calculadora, operaciones, registro |
| Gestion de tasas + propagacion | 14h | CRUD, historial, push a empleados |
| Caja por empleado | 18h | Caja individual, movimientos, saldos |
| Sistema de aprobacion | 14h | Solicitar, notificar, aprobar/rechazar |
| Transferencias entre empleados | 10h | Crear, confirmar emisor, confirmar receptor |
| Clientes + deudas | 14h | CRUD, deudas, historial |
| Reportes + exportacion | 16h | Diario, semanal, mensual, por empleado, PDF |
| Notificaciones (push + WhatsApp) | 12h | FCM, WhatsApp Business API |
| Motor de sincronizacion offline | 20h | Push/pull, conflictos, cola |
| Cierre de caja | 10h | Automatico/manual, verificacion, resumen |
| Tests | 16h | Unitarios + integracion |
| **TOTAL BACKEND** | **196h** | |

### 2.2 App Movil (Jefe + Empleado)

| Modulo | Horas | Descripcion |
|---|---|---|
| Setup + navegacion + tema | 10h | Expo, router, tema visual, RTL base |
| Login con PIN + biometrico | 8h | Pantalla de PIN, huella, bloqueo |
| **APP EMPLEADO:** | | |
| Home del empleado | 10h | Mi caja, botones de divisa, tasas |
| Flujo de operacion (3 toques) | 20h | Teclado numerico, preview, confirmacion |
| Botones rapidos + resultado | 6h | Montos predefinidos, pantalla OK |
| Gestion de caja (empleado) | 10h | Ver caja, entradas/salidas |
| Historial de operaciones | 8h | Lista de hoy, detalle |
| Solicitud de aprobacion | 8h | Pedir, esperar, recibir respuesta |
| Clientes (buscar/registrar) | 8h | Basico, seleccionar en operacion |
| **APP JEFE:** | | |
| Dashboard | 16h | KPIs, caja total, empleados en vivo |
| Gestion de empleados | 10h | Lista, detalle, caja, actividad |
| Gestion de tasas | 12h | Editor +/-, aplicar a todos |
| Aprobaciones (jefe) | 8h | Notificacion, aprobar/rechazar |
| Transferencias | 8h | Ordenar, seguimiento |
| Reportes | 12h | Diario, semanal, empleado, punto, exportar |
| Cierre de caja | 8h | Resumen, verificacion, cerrar |
| Clientes + deudas (jefe) | 8h | Vista completa, deudas pendientes |
| Monitor en tiempo real | 8h | Feed en vivo de operaciones |
| **COMUN:** | | |
| Modo offline (WatermelonDB) | 20h | Schema local, sync engine, cola |
| Notificaciones push | 6h | Recibir, mostrar, acciones |
| Soporte arabe (RTL) + frances | 14h | Traducciones, ajustes UI |
| Optimizacion + pulido | 10h | Performance, UX, animaciones |
| **TOTAL APP MOVIL** | **228h** | |

### 2.3 Otros

| Concepto | Horas | Descripcion |
|---|---|---|
| Diseno UI/UX | 30h | Wireframes, mockups Figma, iconos |
| DevOps + despliegue | 10h | Servidor, dominio, Play Store, CI/CD |
| Formacion + documentacion | 8h | Video-tutorial, manual, sesion en vivo |
| Gestion de proyecto | 10h | Comunicacion, hitos, revision |
| WhatsApp Business API | 8h | Integracion resumen automatico |
| **TOTAL OTROS** | **66h** | |

### 2.4 Resumen de Horas

| Categoria | Horas |
|---|---|
| Backend API | 196h |
| App Movil (Jefe + Empleado) | 228h |
| Otros (diseno, devops, formacion) | 66h |
| **TOTAL** | **490h** |

### 2.5 Presupuesto por Opcion

#### Opcion A: SARAF ELITE Completo - 12,000 EUR

| Concepto | Coste |
|---|---|
| Backend completo (196h) | 4,900 EUR |
| App movil completa jefe+empleado (228h) | 5,200 EUR |
| Diseno, devops, formacion, WhatsApp (66h) | 1,900 EUR |
| **TOTAL** | **12,000 EUR** |

#### Opcion B: SARAF ELITE sin Panel Web - 9,000 EUR

| Concepto | Incluido |
|---|---|
| Backend completo | SI |
| App Jefe completa | SI |
| App Empleado completa | SI |
| Modo offline | SI |
| WhatsApp automatico | SI |
| Panel web | NO |
| **TOTAL** | **9,000 EUR** |

#### Opcion C: SARAF BASICO (MVP) - 5,500 EUR

| Concepto | Incluido | No incluido |
|---|---|---|
| App empleado (flujo de cambio) | SI | |
| App jefe (dashboard basico) | SI | |
| Tasas centralizadas | SI | |
| Caja por empleado | SI | |
| Modo offline | SI | |
| Arabe + Frances | SI | |
| Aprobacion operaciones | | NO |
| Transferencias entre empleados | | NO |
| Clientes y deudas avanzado | | NO |
| Reportes avanzados | | NO |
| WhatsApp automatico | | NO |
| Cierre automatico | | NO |
| **TOTAL** | **5,500 EUR** | |

---

## 3. COSTES MENSUALES (Despues del Desarrollo)

| Concepto | Coste | Nota |
|---|---|---|
| Servidor VPS (Hetzner CX21) | 12 EUR/mes | 2 vCPU, 4GB RAM, 40GB SSD |
| Dominio .com | 1 EUR/mes | ~12 EUR/ano |
| SSL (Let's Encrypt) | 0 EUR | Gratuito |
| Backup en nube (Backblaze B2) | 3 EUR/mes | 50GB |
| Firebase (notificaciones push) | 0 EUR | Gratuito para este volumen |
| API tasas de mercado | 0 EUR | Plan gratuito suficiente |
| WhatsApp Business API | 10 EUR/mes | Opcional, para resumen automatico |
| Google Play Store | 0 EUR | 25$ pago unico |
| **TOTAL MENSUAL** | **~26 EUR/mes** | |
| **TOTAL ANUAL** | **~312 EUR/ano** | |

---

## 4. CALENDARIO DE PAGOS

### Opcion A: 12,000 EUR en 4 pagos

```
PAGO 1 - INICIO (30%)
  Cuando: Al firmar el acuerdo
  Monto:  3,600 EUR
  Que recibes: Comienza el desarrollo

PAGO 2 - DEMO EMPLEADO (25%)
  Cuando: Semana 6 - App del empleado funcionando
  Monto:  3,000 EUR
  Que recibes: App instalable, puedes probar el flujo de cambio

PAGO 3 - DEMO JEFE (25%)
  Cuando: Semana 9 - Sistema completo
  Monto:  3,000 EUR
  Que recibes: App del jefe con control total, todo conectado

PAGO 4 - LANZAMIENTO (20%)
  Cuando: Semana 10 - En produccion
  Monto:  2,400 EUR
  Que recibes: Sistema funcionando en real, formacion hecha
```

### Opcion B: 9,000 EUR en 3 pagos

```
PAGO 1: 2,700 EUR (30%) - Inicio
PAGO 2: 3,150 EUR (35%) - Demo semana 6
PAGO 3: 3,150 EUR (35%) - Lanzamiento semana 9
```

### Opcion C: 5,500 EUR en 2 pagos

```
PAGO 1: 2,200 EUR (40%) - Inicio
PAGO 2: 3,300 EUR (60%) - Lanzamiento semana 6
```

### Metodos de Pago

- Transferencia bancaria (Europa)
- Western Union / MoneyGram
- CCP (Argelia)
- Efectivo (si es posible)
- Crypto (si se prefiere)

---

## 5. RETORNO DE INVERSION

### 5.1 Cuanto Pierdes Hoy (Estimaciones Conservadoras)

| Perdida | Mensual | Anual |
|---|---|---|
| Errores de calculo de empleados | 160 EUR | 1,920 EUR |
| Operaciones no registradas/olvidadas | 270 EUR | 3,240 EUR |
| Clientes perdidos por lentitud | 110 EUR | 1,320 EUR |
| Deudas no cobradas | 215 EUR | 2,580 EUR |
| **TOTAL PERDIDAS** | **755 EUR/mes** | **9,060 EUR/ano** |

### 5.2 Cuanto Ganas con el Sistema

| Ganancia | Mensual |
|---|---|
| Errores eliminados (100%) | +160 EUR |
| Operaciones siempre registradas | +270 EUR |
| Clientes mas contentos (servicio rapido) | +110 EUR |
| Deudas siempre cobradas | +215 EUR |
| Tu tiempo libre (ya no cuadras 2h/dia) | Incalculable |
| Tranquilidad (controlas todo) | Incalculable |
| **TOTAL AHORRO** | **+755 EUR/mes** |

### 5.3 Cuando Recuperas la Inversion

```
OPCION A (12,000 EUR):
  Ahorro mensual:        755 EUR
  Coste mensual sistema: 26 EUR
  Ahorro neto:           729 EUR/mes
  
  RECUPERACION: 12,000 / 729 = 16.5 meses
  
  BALANCE A 3 ANOS:
    Ahorro total:   729 EUR x 36 meses = 26,244 EUR
    Beneficio neto: 26,244 - 12,000 = +14,244 EUR

OPCION B (9,000 EUR):
  RECUPERACION: 9,000 / 729 = 12.3 meses
  BENEFICIO A 3 ANOS: +17,244 EUR

OPCION C (5,500 EUR):
  RECUPERACION: 5,500 / 729 = 7.5 meses
  BENEFICIO A 3 ANOS: +20,744 EUR
```

### 5.4 Lo Que No Se Mide en Dinero

```
ANTES:
  - Estres constante: "habra hecho Ahmed esa operacion bien?"
  - Noches cuadrando cuentas
  - Dependencia total de WhatsApp
  - Miedo a perder un papel con operaciones
  - No poder desconectar nunca

DESPUES:
  - Todo bajo control desde tu movil
  - Cierres de caja en 5 segundos
  - Tranquilidad total: todo esta registrado
  - Datos seguros y respaldados
  - Puedes delegar con confianza
```

---

## 6. RIESGOS Y COMO LOS EVITAMOS

| Riesgo | Probabilidad | Como lo evitamos |
|---|---|---|
| **No hay internet** en campamentos | MUY ALTA | El sistema funciona 100% offline. Es lo primero que se disena. |
| **Empleados no saben usar apps** | MEDIA | La app es ULTRA simple: 3 botones grandes, cero texto tecnico. Formacion de 30 min. |
| **El jefe no quiere cambiar de metodo** | BAJA | El sistema es MAS FACIL que WhatsApp. Se ve el beneficio desde el primer dia. |
| **Movil perdido o robado** | MEDIA | PIN + cifrado + borrado remoto. El jefe desactiva al empleado con un toque. |
| **Servidor se cae** | BAJA | La app funciona sin servidor (offline). Backups diarios. El servidor se levanta en minutos. |
| **Un empleado intenta hacer trampa** | MEDIA | TODA operacion queda registrada. Imposible borrar. El jefe ve todo. |
| **Las tasas cambian y no llegan** | BAJA | Push notification + la app sincroniza automaticamente cuando hay internet. |

---

## 7. GARANTIAS

| Garantia | Detalle |
|---|---|
| **El codigo es tuyo** | Se entrega el 100% del codigo fuente. Tu propiedad. |
| **Sin dependencia** | El sistema funciona aunque desaparezca el desarrollador. |
| **Bugs gratis 6 meses** | Cualquier error se corrige sin coste durante 6 meses. |
| **Soporte 3 meses** | Ayuda por WhatsApp/llamada incluida 3 meses. |
| **Formacion incluida** | 1 hora para el jefe + 30 min para empleados. |
| **Video-tutorial** | Video grabado para que cualquier empleado nuevo aprenda solo. |
| **Garantia de satisfaccion** | Si la demo de la Semana 6 no te convence: reembolso del 50%. |
| **Confidencialidad** | NDA. Tus datos son tuyos. Nadie mas accede. |

---

## 8. MANTENIMIENTO OPCIONAL (Despues de los 3 Meses)

| Plan | Mensual | Incluye |
|---|---|---|
| **Basico** | 50 EUR/mes | Hosting + correccion bugs + 2h soporte/mes |
| **Pro** | 100 EUR/mes | Basico + mejoras menores + 5h soporte/mes |
| **Premium** | 150 EUR/mes | Pro + nuevas funciones + soporte ilimitado |

---

## 9. PROXIMOS PASOS

```
PASO 1: Elige tu opcion (A, B o C)

PASO 2: Reunion (llamada, video o en persona) para:
  - Confirmar las divisas y los pares
  - Confirmar los puntos (Tindouf, Aaioun, otros?)
  - Confirmar cuantos empleados
  - Definir limite de operacion para aprobacion
  - Resolver dudas

PASO 3: Firmamos acuerdo

PASO 4: Primer pago

PASO 5: En 10 semanas tienes tu sistema funcionando

CONTACTO:
  Disponibilidad: Lunes a Viernes
  Idiomas: Espanol, Frances, Arabe
  Respuesta en menos de 24 horas
```

---

*Este documento complementa la Propuesta Principal y las Especificaciones Tecnicas.*  
*Febrero 2026*
