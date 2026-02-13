# PROPUESTA DE PROYECTO

## "SARAF PRO" - Sistema Elite de Gestion de Cambio de Divisas

### Para Operador de Cambio en Tindouf, Argelia

---

**Version:** 1.0  
**Fecha:** 13 de febrero de 2026  
**Tipo de documento:** Propuesta Comercial y Tecnica  
**Confidencialidad:** Documento confidencial - Solo para el destinatario

---

## INDICE

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Analisis de la Situacion Actual](#2-analisis-de-la-situacion-actual)
3. [Solucion Propuesta: SARAF PRO](#3-solucion-propuesta-saraf-pro)
4. [Modulos del Sistema](#4-modulos-del-sistema)
5. [Divisas Soportadas](#5-divisas-soportadas)
6. [Funcionalidades Clave](#6-funcionalidades-clave)
7. [Arquitectura Tecnica](#7-arquitectura-tecnica)
8. [Interfaz de Usuario](#8-interfaz-de-usuario)
9. [Seguridad y Cumplimiento](#9-seguridad-y-cumplimiento)
10. [Modo Offline y Conectividad](#10-modo-offline-y-conectividad)
11. [Automatizaciones Inteligentes](#11-automatizaciones-inteligentes)
12. [Integraciones Externas](#12-integraciones-externas)
13. [Plan de Implementacion](#13-plan-de-implementacion)
14. [Presupuesto y Opciones](#14-presupuesto-y-opciones)
15. [Soporte y Mantenimiento](#15-soporte-y-mantenimiento)
16. [Beneficios Esperados](#16-beneficios-esperados)
17. [Anexos](#17-anexos)

---

## 1. RESUMEN EJECUTIVO

### El Problema

Un operador de cambio de divisas reconocido en Tindouf, Argelia, gestiona diariamente un volumen significativo de transacciones involucrando multiples monedas: **Euro (EUR)**, **Dinar argelino (DZD)**, **Uguiya mauritana (MRU)**, **Franco CFA de Africa Occidental (XOF - Senegal)**, y otras divisas regionales. Actualmente, la gestion se realiza de forma manual o semi-manual, lo que conlleva:

- Riesgo de errores en calculos de conversion
- Dificultad para rastrear operaciones en tiempo real
- Falta de control preciso del inventario de divisas (caja)
- Perdida de tiempo en tareas repetitivas
- Imposibilidad de analizar tendencias y rentabilidad
- Riesgo de perdidas por variaciones de tipo de cambio no detectadas

### La Solucion

**SARAF PRO** es un sistema integral de gestion de cambio de divisas disenado especificamente para operadores independientes en regiones como Tindouf. El sistema ofrece:

- **Automatizacion total** de calculos, registros y reportes
- **Actualizacion de tasas** en tiempo real con modo offline inteligente
- **Gestion completa de caja** multi-divisa
- **Panel de control** con metricas de negocio en tiempo real
- **Aplicacion movil y web** adaptada al contexto local
- **Soporte multiidioma**: Arabe, Frances, Espanol
- **Funcionamiento offline** completo con sincronizacion automatica

### Propuesta de Valor

> Un sistema que convierte horas de trabajo manual en segundos de operacion automatizada, eliminando errores, maximizando ganancias y proporcionando control total del negocio desde cualquier dispositivo.

---

## 2. ANALISIS DE LA SITUACION ACTUAL

### 2.1 Contexto Geografico y Economico

**Tindouf** se encuentra en el suroeste de Argelia, en una posicion estrategica fronteriza con:
- **Marruecos** (al norte)
- **Mauritania** (al sur/suroeste)
- **Sahara Occidental** (al oeste)

Esta ubicacion convierte a Tindouf en un **nodo comercial** importante donde confluyen multiples monedas y flujos economicos:

| Flujo Comercial | Monedas Involucradas | Volumen Estimado |
|---|---|---|
| Comercio con Europa | EUR <-> DZD | Alto |
| Comercio con Mauritania | MRU <-> DZD | Alto |
| Comercio con Senegal/Africa Occidental | XOF <-> DZD | Medio-Alto |
| Remesas familiares | EUR -> DZD | Alto |
| Comercio fronterizo general | Multiple | Variable |
| Transferencias informales | EUR, DZD, MRU | Alto |

### 2.2 Problemas Identificados del Metodo Actual

| Problema | Impacto | Nivel de Riesgo |
|---|---|---|
| Calculos manuales de conversion | Errores frecuentes, perdida de dinero | CRITICO |
| Sin registro digital de operaciones | Imposibilidad de auditar, disputas con clientes | ALTO |
| Control de caja en papel/mental | Descuadres, dinero no contabilizado | CRITICO |
| Sin seguimiento de tasas de mercado | Tasas desactualizadas, perdida de competitividad | ALTO |
| Dependencia de la memoria | Olvido de operaciones pendientes, deudas | MEDIO |
| Sin reportes de ganancias reales | Desconocimiento de la rentabilidad real | ALTO |
| Comunicacion con clientes | Seguimiento manual, perdida de clientes | MEDIO |
| Gestion de clientes habituales | Sin historial, sin fidelizacion | MEDIO |

### 2.3 Necesidades Detectadas

1. **Velocidad extrema** en cada operacion (el cliente no puede esperar)
2. **Precision absoluta** en los calculos de conversion
3. **Control de caja** en tiempo real para cada divisa
4. **Historial completo** de todas las operaciones
5. **Funcionamiento sin internet** (conectividad limitada en la zona)
6. **Interfaz simple e intuitiva** (el sistema debe ser facil de usar)
7. **Soporte en arabe** (idioma principal del usuario)
8. **Seguridad de datos** (informacion financiera sensible)
9. **Gestion de clientes** con saldos pendientes y confianza
10. **Reportes automaticos** de ganancias, volumen y tendencias

---

## 3. SOLUCION PROPUESTA: SARAF PRO

### 3.1 Vision General

**SARAF PRO** (del arabe "صراف" = cambiador) es una plataforma integral disenada para transformar completamente la operacion de cambio de divisas, llevandola de un modelo manual a un **ecosistema digital automatizado de nivel profesional**.

### 3.2 Filosofia de Diseno

```
VELOCIDAD + PRECISION + SIMPLICIDAD + AUTOMATIZACION = SARAF PRO
```

- **Velocidad**: Cualquier operacion en menos de 5 segundos
- **Precision**: Cero errores en calculos, todo automatizado
- **Simplicidad**: Interfaz limpia, botones grandes, flujo intuitivo
- **Automatizacion**: El sistema hace el trabajo, el usuario solo confirma

### 3.3 Plataformas

| Plataforma | Tecnologia | Prioridad |
|---|---|---|
| **Aplicacion Movil** (Android) | React Native / Flutter | MAXIMA - Herramienta principal |
| **Aplicacion Web** (Panel de Control) | Next.js + React | ALTA - Gestion y reportes |
| **API Backend** | Node.js + Express / NestJS | MAXIMA - Motor del sistema |
| **Base de Datos** | PostgreSQL + SQLite (offline) | MAXIMA - Almacenamiento |

### 3.4 Requisitos de Infraestructura

| Componente | Especificacion | Coste Mensual Estimado |
|---|---|---|
| Servidor VPS | 2 vCPU, 4GB RAM, 80GB SSD | ~10-15 EUR/mes |
| Dominio | sarafpro.com o similar | ~10 EUR/ano |
| Certificado SSL | Let's Encrypt (gratuito) | 0 EUR |
| Almacenamiento backup | 50GB Cloud | ~3 EUR/mes |
| **Total infraestructura** | | **~15-20 EUR/mes** |

---

## 4. MODULOS DEL SISTEMA

### 4.1 MODULO 1: Motor de Cambio (Core)

El corazon del sistema. Gestiona todas las operaciones de conversion.

**Funcionalidades:**

- **Calculadora de cambio instantanea**: Introduce un monto en cualquier divisa y obtiene automaticamente el equivalente en todas las demas
- **Tasas personalizables**: El usuario define sus propias tasas de compra/venta
- **Spread automatico**: Calculo automatico del margen de ganancia
- **Tasas de referencia**: Conexion con fuentes de tasas de mercado para comparacion
- **Conversion encadenada**: Soporte para conversiones indirectas (ej: MRU -> DZD -> EUR)
- **Modo rapido**: Un solo toque para las operaciones mas frecuentes
- **Historial de tasas**: Registro completo de todas las tasas aplicadas

**Ejemplo de flujo de operacion:**

```
1. Cliente llega: "Quiero cambiar 500 EUR"
2. El operador abre SARAF PRO (ya esta abierto en el movil)
3. Toca "EUR" -> escribe "500"
4. El sistema muestra INSTANTANEAMENTE:
   - 500 EUR = 93,500 DZD (a tasa 187.00)
   - 500 EUR = 201,500 MRU (a tasa 403.00)
   - 500 EUR = 328,000 XOF (a tasa 656.00)
5. El operador toca "DZD" (el cliente quiere dinares)
6. Pantalla de confirmacion: "VENDER 500 EUR -> COMPRAR 93,500 DZD"
7. Un toque para confirmar
8. Operacion registrada. Caja actualizada automaticamente.
   
Tiempo total: < 10 segundos
```

### 4.2 MODULO 2: Gestion de Caja Multi-Divisa

Control total de todo el efectivo disponible.

**Funcionalidades:**

- **Saldo en tiempo real** de cada divisa
- **Alertas de nivel bajo**: Notificacion cuando una divisa baja del minimo configurado
- **Alertas de nivel alto**: Notificacion cuando hay exceso de una divisa
- **Movimientos de caja**: Entradas, salidas, ajustes con justificacion
- **Cierre de caja diario**: Resumen automatico al final del dia
- **Apertura de caja**: Verificacion de saldos al inicio del dia
- **Valoracion total**: Valor total de la caja expresado en cualquier divisa de referencia

**Panel de Caja (ejemplo visual):**

```
+--------------------------------------------------+
|          CAJA - 13 Febrero 2026                   |
+--------------------------------------------------+
|                                                    |
|  EUR    [======████████]     12,450.00 EUR        |
|  DZD    [████████████==]  2,345,600.00 DZD        |
|  MRU    [████======----]    456,780.00 MRU        |
|  XOF    [██████========]  1,234,500.00 XOF        |
|                                                    |
|  VALOR TOTAL (en EUR): 48,230.50 EUR              |
|                                                    |
|  [Hoy: +23 operaciones | +1,245 EUR ganancia]    |
+--------------------------------------------------+
```

### 4.3 MODULO 3: Gestion de Clientes (CRM)

Base de datos completa de clientes con historial y saldos.

**Funcionalidades:**

- **Ficha de cliente**: Nombre, telefono, notas, nivel de confianza
- **Historial de operaciones**: Todas las transacciones realizadas con cada cliente
- **Saldos pendientes**: Control de deudas (cliente debe / se le debe)
- **Clientes VIP**: Tasas preferenciales automaticas para clientes frecuentes
- **Estadisticas por cliente**: Volumen operado, frecuencia, divisas preferidas
- **Busqueda rapida**: Encontrar cliente por nombre o telefono en milisegundos
- **Contacto directo**: Llamar o enviar WhatsApp desde la ficha del cliente

**Sistema de Confianza:**

```
NIVEL 1 - Nuevo:        Operaciones solo al contado
NIVEL 2 - Conocido:     Credito hasta 500 EUR equivalente
NIVEL 3 - Confianza:    Credito hasta 2,000 EUR equivalente  
NIVEL 4 - VIP:          Credito hasta 5,000 EUR equivalente + tasas especiales
NIVEL 5 - Socio:        Sin limite + tasas preferenciales + prioridad
```

### 4.4 MODULO 4: Reportes y Analitica

Informacion clave del negocio en tiempo real.

**Reportes disponibles:**

| Reporte | Frecuencia | Contenido |
|---|---|---|
| **Resumen diario** | Automatico cada noche | Operaciones, ganancias, caja |
| **Informe semanal** | Cada lunes | Tendencias, mejores dias, volumen |
| **Informe mensual** | Dia 1 de cada mes | Rentabilidad completa, comparativas |
| **P&L por divisa** | Tiempo real | Ganancia/perdida por cada par de divisas |
| **Top clientes** | Bajo demanda | Ranking de clientes por volumen |
| **Flujo de caja** | Tiempo real | Entradas y salidas por divisa |
| **Analisis de spreads** | Diario | Comparacion de tus spreads vs mercado |
| **Prediccion de demanda** | Semanal | IA que predice que divisas se necesitaran |

**Dashboard principal (ejemplo visual):**

```
+------------------------------------------------------------------+
|  SARAF PRO - Dashboard                    13 Feb 2026 | 14:35    |
+------------------------------------------------------------------+
|                                                                    |
|  GANANCIA HOY          OPERACIONES HOY        VOLUMEN HOY         |
|  +2,345 DZD            47 operaciones         15,600 EUR eq.      |
|  (+12% vs ayer)        (+5 vs ayer)           (+8% vs ayer)       |
|                                                                    |
+------------------------------------------------------------------+
|  TASAS ACTUALES (mis tasas)                                        |
|  EUR/DZD  Compra: 185.00  Venta: 187.00  Spread: 2.00 (1.08%)   |
|  EUR/MRU  Compra: 400.00  Venta: 403.00  Spread: 3.00 (0.75%)   |
|  EUR/XOF  Compra: 652.00  Venta: 656.00  Spread: 4.00 (0.61%)   |
|  DZD/MRU  Compra: 2.15    Venta: 2.18    Spread: 0.03 (1.39%)   |
+------------------------------------------------------------------+
|  ULTIMAS OPERACIONES                                               |
|  14:32  Ahmed M.    500 EUR -> 93,500 DZD      +1,000 DZD        |
|  14:28  Fatima B.   200,000 DZD -> 1,069 EUR   +1,200 DZD        |
|  14:15  Mohamed S.  1000 EUR -> 403,000 MRU     +3,000 MRU       |
|  14:01  Ali K.      50,000 XOF -> 14,200 DZD    +200 DZD         |
+------------------------------------------------------------------+
```

### 4.5 MODULO 5: Gestion de Tasas

Control total sobre las tasas de cambio.

**Funcionalidades:**

- **Tasas manuales**: El operador define sus tasas de compra y venta
- **Tasas de referencia en tiempo real**: Conexion con APIs de mercado (cuando hay internet)
- **Alertas de variacion**: Notificacion cuando el mercado varia mas de X%
- **Historial de tasas**: Grafico de evolucion de cada par de divisas
- **Tasas por zona**: Comparacion con otros cambiadores de la region (si disponible)
- **Ajuste rapido**: Subir/bajar tasas con un solo deslizamiento
- **Tasas por volumen**: Tasas especiales para operaciones grandes
- **Programacion de tasas**: Configurar cambios de tasa automaticos por horario

**Fuentes de tasas de referencia:**

1. Banco de Argelia (tasa oficial)
2. Mercado paralelo (tasa real de la calle)
3. APIs internacionales (ExchangeRate-API, Open Exchange Rates)
4. Ingreso manual (tasas de contactos en la zona)

### 4.6 MODULO 6: Sistema de Notificaciones

Mantenerse informado sin esfuerzo.

**Tipos de notificaciones:**

- **Alerta de caja baja**: "Tu stock de EUR ha bajado a 500 EUR. Considera reabastecerte."
- **Resumen automatico**: "Hoy: 47 operaciones, ganancia neta +2,345 DZD"
- **Variacion de tasa**: "El EUR/DZD ha subido un 2% en el mercado. Tu tasa actual: 187, mercado: 190"
- **Deuda pendiente**: "Ahmed tiene un saldo pendiente de 1,000 EUR desde hace 7 dias"
- **Operacion grande**: "Mohamed quiere cambiar 5,000 EUR. Verificar disponibilidad de DZD"
- **Cierre de caja**: "Es hora de cerrar caja. Toca aqui para el resumen del dia"

**Canales de notificacion:**

| Canal | Uso |
|---|---|
| Notificacion push (movil) | Alertas urgentes y operaciones |
| SMS (opcional) | Backup cuando no hay datos |
| WhatsApp (API) | Resumen diario, comunicacion con clientes |
| Email | Reportes semanales/mensuales |
| Dentro de la app | Todas las notificaciones |

### 4.7 MODULO 7: Operaciones Pendientes y Reservas

Gestion de operaciones que no se completan inmediatamente.

**Funcionalidades:**

- **Reserva de tasa**: Cliente reserva una tasa por X horas
- **Operacion diferida**: Registrar operacion para completar mas tarde
- **Cola de espera**: Cuando hay mucha demanda, gestionar el orden
- **Promesas de pago**: Registrar compromisos de clientes
- **Seguimiento automatico**: Recordatorios de operaciones pendientes
- **Cancelacion controlada**: Historial de operaciones canceladas

### 4.8 MODULO 8: Multi-Sucursal / Multi-Operador

Para escalar el negocio.

**Funcionalidades:**

- **Multiples puntos de operacion**: Si tiene ayudantes o puntos secundarios
- **Permisos por rol**: Administrador, Operador, Solo consulta
- **Consolidacion de caja**: Ver la caja total de todos los puntos
- **Transferencias internas**: Mover divisas entre puntos
- **Auditoria por operador**: Saber quien hizo cada operacion

---

## 5. DIVISAS SOPORTADAS

### 5.1 Divisas Principales (Configuradas por defecto)

| Divisa | Codigo | Simbolo | Pais/Region | Prioridad |
|---|---|---|---|---|
| Euro | EUR | euro | Union Europea | MAXIMA |
| Dinar Argelino | DZD | DA / د.ج | Argelia | MAXIMA |
| Uguiya Mauritana | MRU | UM | Mauritania | ALTA |
| Franco CFA Occ. | XOF | CFA | Senegal, Mali, etc. | ALTA |

### 5.2 Divisas Secundarias (Activables)

| Divisa | Codigo | Simbolo | Pais/Region | Activacion |
|---|---|---|---|---|
| Dirham Marroqui | MAD | MAD | Marruecos | Manual |
| Dinar Tunecino | TND | DT | Tunez | Manual |
| Dinar Libio | LYD | LD | Libia | Manual |
| Dolar Estadounidense | USD | $ | Internacional | Manual |
| Libra Esterlina | GBP | lb | Reino Unido | Manual |
| Franco CFA Central | XAF | FCFA | Africa Central | Manual |
| Naira Nigeriana | NGN | naira | Nigeria | Manual |
| Cedi Ghanes | GHS | GHS | Ghana | Manual |
| Escudo Caboverdiano | CVE | $ | Cabo Verde | Manual |

### 5.3 Pares de Divisas Pre-configurados

Los pares mas operados por el cambiador estaran preconfigurados con tasas de referencia:

```
Pares principales:
  EUR/DZD  -  El mas operado (euros a dinares y viceversa)
  EUR/MRU  -  Euros a uguiyas mauritanas
  EUR/XOF  -  Euros a francos CFA
  DZD/MRU  -  Dinares a uguiyas  
  DZD/XOF  -  Dinares a francos CFA
  MRU/XOF  -  Uguiyas a francos CFA

Pares secundarios (activables):
  EUR/MAD  -  Euros a dirhams
  DZD/MAD  -  Dinares a dirhams
  USD/DZD  -  Dolares a dinares
  GBP/DZD  -  Libras a dinares
```

---

## 6. FUNCIONALIDADES CLAVE

### 6.1 Operacion de Cambio en 3 Toques

```
TOQUE 1: Seleccionar divisa de origen + monto
TOQUE 2: Seleccionar divisa de destino (o cliente)
TOQUE 3: Confirmar operacion

El sistema automaticamente:
  -> Calcula el monto convertido
  -> Aplica la tasa configurada
  -> Calcula la ganancia del spread
  -> Registra la operacion
  -> Actualiza la caja de ambas divisas
  -> Genera recibo (si esta configurado)
  -> Actualiza el historial del cliente (si se selecciono)
```

### 6.2 Calculadora Multi-Divisa Inteligente

- Escribir un monto y ver la conversion a TODAS las divisas simultaneamente
- Conversion inversa instantanea
- Muestra ganancia estimada en cada conversion
- Soporte para montos grandes con separadores de miles
- Teclado numerico grande y rapido

### 6.3 Cierre de Caja Automatico

Cada dia a la hora configurada (o manualmente):

```
CIERRE DE CAJA - 13 Febrero 2026
================================

OPERACIONES DEL DIA:
  Total operaciones:     47
  Volumen total:         15,600 EUR equivalente
  
GANANCIA NETA DEL DIA:
  En DZD:               +12,450 DZD
  En EUR equivalente:    +66.58 EUR
  
MOVIMIENTO POR DIVISA:
  EUR:  Inicio: 15,000  | Entradas: +3,500  | Salidas: -6,050  | Final: 12,450
  DZD:  Inicio: 2,000,000 | Entradas: +1,132,350 | Salidas: -786,750 | Final: 2,345,600
  MRU:  Inicio: 500,000 | Entradas: +56,780 | Salidas: -100,000 | Final: 456,780
  XOF:  Inicio: 1,000,000 | Entradas: +334,500 | Salidas: -100,000 | Final: 1,234,500
  
VALOR TOTAL DE CAJA:
  En EUR:  48,230.50 EUR
  En DZD:  9,019,143.50 DZD
  
COMPARACION CON AYER:
  Ganancia: +12% superior
  Volumen:  +8% superior
  Operaciones: +5 mas
```

### 6.4 Recibos Digitales

- Generacion automatica de recibos por cada operacion
- Envio por WhatsApp al cliente
- Formato profesional con logo y datos del negocio
- QR code para verificar autenticidad
- Impresion en mini-impresora termica Bluetooth (opcional)

### 6.5 Busqueda y Filtrado Avanzado

- Buscar operaciones por fecha, cliente, monto, divisa
- Filtros combinados: "Todas las operaciones EUR > 1000 del ultimo mes"
- Exportar resultados a Excel/CSV
- Busqueda por voz (en arabe)

### 6.6 Backup y Recuperacion

- **Backup automatico** diario en la nube
- **Backup local** en el dispositivo
- **Recuperacion total** desde cualquier punto de backup
- **Exportacion completa** de datos en formato estandar
- **Historial de cambios**: Registro de toda modificacion

---

## 7. ARQUITECTURA TECNICA

### 7.1 Diagrama de Arquitectura General

```
+------------------------------------------------------------------+
|                        CAPA DE PRESENTACION                       |
|                                                                    |
|  +------------------+    +------------------+                      |
|  |   App Movil      |    |   Panel Web      |                      |
|  |   (Android)      |    |   (Dashboard)    |                      |
|  |   React Native   |    |   Next.js        |                      |
|  +--------+---------+    +--------+---------+                      |
|           |                        |                               |
+-----------+------------------------+-------------------------------+
            |                        |
            v                        v
+------------------------------------------------------------------+
|                        CAPA DE API (Backend)                      |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |              API REST + WebSockets (NestJS)                 |   |
|  |                                                              |  |
|  |  +----------+ +----------+ +----------+ +----------+        |  |
|  |  | Auth &   | | Exchange | | Cash     | | Reports  |        |  |
|  |  | Users    | | Engine   | | Manager  | | Engine   |        |  |
|  |  +----------+ +----------+ +----------+ +----------+        |  |
|  |  +----------+ +----------+ +----------+ +----------+        |  |
|  |  | Client   | | Rate     | | Notif.   | | Backup   |        |  |
|  |  | Manager  | | Manager  | | Service  | | Service  |        |  |
|  |  +----------+ +----------+ +----------+ +----------+        |  |
|  +------------------------------------------------------------+   |
|                                                                    |
+------------------------------------------------------------------+
            |
            v
+------------------------------------------------------------------+
|                        CAPA DE DATOS                              |
|                                                                    |
|  +------------------+    +------------------+                      |
|  |   PostgreSQL     |    |   Redis          |                      |
|  |   (BD principal) |    |   (Cache/Sesion) |                      |
|  +------------------+    +------------------+                      |
|                                                                    |
|  +------------------+    +------------------+                      |
|  |   SQLite Local   |    |   Cloud Storage  |                      |
|  |   (Modo Offline) |    |   (Backups)      |                      |
|  +------------------+    +------------------+                      |
|                                                                    |
+------------------------------------------------------------------+
            |
            v
+------------------------------------------------------------------+
|                    SERVICIOS EXTERNOS                              |
|                                                                    |
|  +------------+ +------------+ +------------+ +------------+      |
|  | Exchange   | | WhatsApp   | | SMS        | | Push       |      |
|  | Rate APIs  | | Business   | | Gateway    | | Notif.     |      |
|  +------------+ +------------+ +------------+ +------------+      |
|                                                                    |
+------------------------------------------------------------------+
```

### 7.2 Stack Tecnologico Detallado

| Capa | Tecnologia | Justificacion |
|---|---|---|
| **App Movil** | React Native (Expo) | Multiplataforma, rendimiento nativo, gran comunidad |
| **Panel Web** | Next.js 14 + TailwindCSS | SSR, rendimiento, diseno moderno |
| **Backend API** | NestJS (Node.js + TypeScript) | Robusto, escalable, bien estructurado |
| **Base de Datos** | PostgreSQL 16 | Fiable, potente, gratuito |
| **Cache** | Redis | Velocidad extrema para tasas y sesiones |
| **BD Offline** | SQLite (WatermelonDB) | Sincronizacion offline robusta |
| **Autenticacion** | JWT + PIN + Biometrico | Seguridad multicapa |
| **Tiempo Real** | WebSockets (Socket.io) | Actualizaciones instantaneas |
| **Notificaciones** | Firebase Cloud Messaging | Fiable, gratuito |
| **Almacenamiento** | AWS S3 / Backblaze B2 | Backups economicos |
| **CI/CD** | GitHub Actions | Despliegue automatizado |
| **Servidor** | Docker + Nginx | Facil despliegue y mantenimiento |

### 7.3 Modelo de Datos (Entidades Principales)

```
USUARIO (users)
  - id, nombre, rol, pin_hash, telefono, idioma, config

OPERACION (transactions)
  - id, tipo, divisa_origen, divisa_destino, monto_origen, monto_destino
  - tasa_aplicada, spread, ganancia, cliente_id, operador_id
  - fecha, estado, notas, recibo_url

CAJA (cash_registers)
  - id, divisa, saldo_actual, saldo_minimo, saldo_maximo
  - ultima_actualizacion

MOVIMIENTO_CAJA (cash_movements)
  - id, caja_id, tipo (entrada/salida/ajuste), monto, motivo
  - operacion_id, fecha, operador_id

CLIENTE (clients)
  - id, nombre, telefono, whatsapp, nivel_confianza
  - notas, fecha_registro, ultima_operacion
  - saldo_pendiente, divisa_preferida

TASA (rates)
  - id, par_divisas, tasa_compra, tasa_venta, tasa_mercado
  - fecha_actualizacion, fuente, activa

HISTORIAL_TASA (rate_history)
  - id, par_divisas, tasa, fuente, fecha

CIERRE_CAJA (daily_closings)
  - id, fecha, operaciones_total, ganancia_total
  - snapshot_cajas, operador_id, notas

NOTIFICACION (notifications)
  - id, tipo, titulo, mensaje, leida, fecha, accion

CONFIGURACION (settings)
  - clave, valor, categoria, descripcion
```

---

## 8. INTERFAZ DE USUARIO

### 8.1 Principios de Diseno

1. **Minimalismo funcional**: Solo lo necesario, cero distracciones
2. **Botones grandes**: Pensado para uso con una mano, incluso con guantes
3. **Colores claros y alto contraste**: Visible bajo el sol del desierto
4. **Tipografia grande**: Legible a distancia
5. **RTL nativo**: Soporte completo de derecha a izquierda para arabe
6. **Modo oscuro**: Para uso nocturno
7. **Respuesta haptica**: Vibracion en confirmaciones
8. **Animaciones sutiles**: Feedback visual sin ralentizar

### 8.2 Pantallas Principales (App Movil)

```
PANTALLA PRINCIPAL (Home)
+----------------------------------+
|  SARAF PRO          14:35  [=]  |
+----------------------------------+
|                                   |
|  CAJA TOTAL: 48,230 EUR equiv.   |
|                                   |
|  +----+ +----+ +----+ +----+    |
|  |EUR | |DZD | |MRU | |XOF |    |
|  |12.4K| |2.3M| |456K| |1.2M|    |
|  +----+ +----+ +----+ +----+    |
|                                   |
|  +------------------------------+|
|  |                              ||
|  |     NUEVA OPERACION          ||
|  |     [BOTON GRANDE VERDE]     ||
|  |                              ||
|  +------------------------------+|
|                                   |
|  ULTIMAS OPERACIONES:            |
|  > Ahmed - 500 EUR -> DZD  14:32|
|  > Fatima - 200K DZD->EUR  14:28|
|  > Mohamed - 1K EUR->MRU   14:15|
|                                   |
|  [Caja] [Clientes] [Tasas] [+]  |
+----------------------------------+


PANTALLA NUEVA OPERACION
+----------------------------------+
|  <- NUEVA OPERACION              |
+----------------------------------+
|                                   |
|  VENDO:          COMPRO:         |
|  [EUR v]         [DZD v]        |
|                                   |
|  +------------------------------+|
|  |                              ||
|  |         500.00               ||
|  |                              ||
|  +------------------------------+|
|                                   |
|  TASA: 187.00  (Spread: 1.08%)  |
|                                   |
|  = 93,500.00 DZD                 |
|  GANANCIA: +1,000 DZD            |
|                                   |
|  Cliente: [Ahmed M.        v]    |
|                                   |
|  +------------------------------+|
|  |     CONFIRMAR OPERACION      ||
|  |     [BOTON GRANDE AZUL]     ||
|  +------------------------------+|
|                                   |
+----------------------------------+


PANTALLA CLIENTES
+----------------------------------+
|  <- CLIENTES           [Buscar] |
+----------------------------------+
|                                   |
|  [Buscar por nombre/telefono...] |
|                                   |
|  VIP:                            |
|  > Ahmed M.    Vol: 45,000 EUR   |
|  > Mohamed S.  Vol: 32,000 EUR   |
|                                   |
|  FRECUENTES:                     |
|  > Fatima B.   Vol: 12,000 EUR   |
|  > Ali K.      Vol: 8,500 EUR    |
|  > Hassan T.   Vol: 6,200 EUR    |
|                                   |
|  RECIENTES:                      |
|  > Youssef M.  Hoy 14:32        |
|  > Sara L.     Hoy 11:15        |
|                                   |
|  [+ Nuevo Cliente]               |
+----------------------------------+
```

### 8.3 Panel Web (Dashboard)

El panel web es la herramienta de gestion avanzada con:

- **Dashboard principal**: KPIs, graficos, actividad en tiempo real
- **Gestion de tasas**: Configuracion avanzada con graficos historicos
- **Reportes completos**: Descargables en PDF/Excel
- **Configuracion del sistema**: Todos los ajustes
- **Gestion de usuarios**: Si hay multiples operadores
- **Auditoria**: Registro detallado de toda actividad

### 8.4 Idiomas Soportados

| Idioma | Codigo | Direccion | Estado |
|---|---|---|---|
| Arabe (Argelia) | ar-DZ | RTL (derecha a izquierda) | Principal |
| Frances | fr-FR | LTR | Secundario |
| Espanol | es-ES | LTR | Opcioinal |
| Hassania (dialecto) | ar-MR | RTL | Futuro |

---

## 9. SEGURIDAD Y CUMPLIMIENTO

### 9.1 Seguridad de Acceso

| Capa | Metodo | Descripcion |
|---|---|---|
| 1 | PIN de 6 digitos | Acceso rapido al abrir la app |
| 2 | Huella dactilar / Face ID | Autenticacion biometrica |
| 3 | Contrasena maestra | Para operaciones sensibles (config, borrar datos) |
| 4 | 2FA (opcional) | Doble factor via SMS o app |
| 5 | Bloqueo automatico | Tras X minutos de inactividad |
| 6 | Bloqueo por intentos | Tras 5 intentos fallidos |

### 9.2 Seguridad de Datos

- **Cifrado en reposo**: AES-256 para todos los datos almacenados
- **Cifrado en transito**: TLS 1.3 para todas las comunicaciones
- **Cifrado de backups**: Los backups en la nube estan cifrados
- **Base de datos local cifrada**: SQLite con encryption (SQLCipher)
- **Logs de acceso**: Registro de todo acceso al sistema
- **Borrado remoto**: Posibilidad de borrar datos remotamente si el dispositivo se pierde

### 9.3 Privacidad

- **Datos locales**: Los datos criticos se almacenan principalmente en el dispositivo
- **Minimo en la nube**: Solo se sube a la nube lo estrictamente necesario para backup
- **Sin terceros**: No se comparten datos con terceros
- **Exportacion**: El usuario puede exportar todos sus datos en cualquier momento
- **Borrado**: El usuario puede borrar todos sus datos permanentemente

### 9.4 Consideraciones Legales

> **Nota importante**: El sistema es una herramienta de gestion. Es responsabilidad del usuario operar dentro del marco legal de Argelia. El sistema incluye:

- Registro de todas las operaciones para posibles auditorias
- Limites configurables de operacion
- Reportes que facilitan el cumplimiento normativo
- Sin almacenamiento de documentos de identidad (a menos que sea requerido)

---

## 10. MODO OFFLINE Y CONECTIVIDAD

### 10.1 Estrategia Offline-First

Dado que la conectividad en Tindouf puede ser intermitente, **SARAF PRO** esta disenado con un enfoque "offline-first":

```
ONLINE                          OFFLINE
  |                                |
  | Todas las funciones            | Todas las funciones
  | disponibles                    | disponibles
  |                                |
  | + Sincronizacion              | Datos guardados
  |   en tiempo real               | localmente
  |                                |
  | + Tasas de mercado            | Ultima tasa conocida
  |   actualizadas                 | (con indicador)
  |                                |
  | + Backup en la nube           | Backup local
  |                                |
  | + Notificaciones push         | Notificaciones locales
  |                                |
  | + WhatsApp integrado          | Cola de mensajes
  |   (recibos)                    | (se envian al conectar)
  |                                |
```

### 10.2 Sincronizacion Inteligente

```
1. OPERACION REALIZADA OFFLINE
   -> Se guarda en SQLite local con timestamp
   -> Se marca como "pendiente de sincronizar"
   -> Icono de reloj en la operacion

2. CONEXION DETECTADA
   -> Se inicia sincronizacion automatica
   -> Se suben operaciones pendientes
   -> Se descargan tasas actualizadas
   -> Se realiza backup incremental
   -> Se resuelven conflictos (si los hay)

3. CONFLICTO (raro pero posible)
   -> Se mantiene la version local como principal
   -> Se registra el conflicto para revision
   -> Se notifica al usuario
```

### 10.3 Requisitos de Conectividad

| Funcion | Requiere Internet | Sin Internet |
|---|---|---|
| Realizar operaciones | NO | Funciona completo |
| Calcular conversiones | NO | Funciona completo |
| Gestionar caja | NO | Funciona completo |
| Gestionar clientes | NO | Funciona completo |
| Ver reportes | NO | Datos locales |
| Actualizar tasas mercado | SI | Usa ultima tasa |
| Enviar recibos WhatsApp | SI | Cola de espera |
| Backup en nube | SI | Backup local |
| Sincronizar multiples dispositivos | SI | Sincroniza al conectar |

---

## 11. AUTOMATIZACIONES INTELIGENTES

### 11.1 Automatizaciones de Operacion

| Automatizacion | Descripcion | Beneficio |
|---|---|---|
| **Auto-calculo** | Conversion instantanea al escribir monto | Ahorra tiempo |
| **Auto-registro** | Cada operacion se registra automaticamente | Cero olvidos |
| **Auto-caja** | La caja se actualiza sola tras cada operacion | Precision total |
| **Auto-ganancia** | Calcula ganancia de cada operacion | Control de rentabilidad |
| **Auto-recibo** | Genera recibo al confirmar operacion | Profesionalismo |
| **Auto-cierre** | Cierre de caja a hora programada | Disciplina financiera |
| **Auto-backup** | Backup diario automatico | Seguridad de datos |
| **Auto-alerta** | Alertas de caja baja/alta | Prevencion |

### 11.2 Inteligencia del Sistema

| Funcion IA | Descripcion |
|---|---|
| **Prediccion de demanda** | Analiza patrones para predecir que divisas se necesitaran |
| **Sugerencia de tasas** | Sugiere ajustes de tasa basados en el mercado y la competencia |
| **Deteccion de anomalias** | Identifica operaciones inusuales para revision |
| **Clasificacion de clientes** | Sugiere nivel de confianza basado en historial |
| **Optimizacion de spread** | Sugiere spreads optimos para maximizar ganancia sin perder clientes |
| **Resumen inteligente** | Genera resumenes en lenguaje natural: "Hoy has ganado un 15% mas que ayer, principalmente gracias a operaciones EUR/DZD" |

### 11.3 Reglas Automaticas Configurables

El usuario puede crear reglas como:

```
REGLA 1: Si caja EUR < 1,000, enviar alerta por WhatsApp
REGLA 2: Si operacion > 5,000 EUR equivalente, pedir doble confirmacion
REGLA 3: Si cliente nuevo, limite maximo de 500 EUR
REGLA 4: A las 22:00, cerrar caja automaticamente
REGLA 5: Si tasa de mercado cambia > 2%, enviar notificacion
REGLA 6: Cada lunes a las 9:00, enviar informe semanal
REGLA 7: Si un cliente VIP llega, aplicar tasa preferencial automaticamente
```

---

## 12. INTEGRACIONES EXTERNAS

### 12.1 APIs de Tasas de Cambio

| Servicio | Divisas | Actualizacion | Coste |
|---|---|---|---|
| ExchangeRate-API | +160 | Cada hora | Gratis (1500 req/mes) |
| Open Exchange Rates | +170 | Cada hora | Gratis (1000 req/mes) |
| Fixer.io | +170 | Diaria | Gratis (100 req/mes) |
| CurrencyAPI | +150 | Cada 10min | Desde 10$/mes |
| **Ingreso manual** | Todas | Inmediato | Gratis |

### 12.2 WhatsApp Business API

- Envio automatico de recibos al cliente
- Resumen diario al operador
- Respuesta automatica a consultas de tasas
- Bot de WhatsApp: Clientes envian "EUR" y reciben la tasa actual

### 12.3 Impresion

- **Mini impresora termica Bluetooth**: Para recibos fisicos (opcional)
- Modelos compatibles: Epson TM-T20III, Star SM-L200, genricas 58mm/80mm
- Coste aproximado: 40-80 EUR

### 12.4 Exportacion de Datos

- **Excel/CSV**: Exportar operaciones, clientes, caja
- **PDF**: Reportes formateados profesionalmente
- **JSON**: Para integracion con otros sistemas
- **Google Sheets**: Sincronizacion automatica (opcional)

---

## 13. PLAN DE IMPLEMENTACION

### 13.1 Fases del Proyecto

```
FASE 1: FUNDACION (Semanas 1-3)
  ├── Configuracion del entorno de desarrollo
  ├── Diseno de base de datos
  ├── API Backend: Autenticacion, Usuarios
  ├── API Backend: Motor de cambio (core)
  ├── API Backend: Gestion de caja
  └── Tests unitarios del core

FASE 2: FUNCIONALIDADES PRINCIPALES (Semanas 4-6)
  ├── API Backend: Gestion de clientes
  ├── API Backend: Gestion de tasas
  ├── API Backend: Reportes basicos
  ├── App Movil: Pantallas principales
  ├── App Movil: Flujo de operacion completo
  └── App Movil: Gestion de caja

FASE 3: FUNCIONALIDADES AVANZADAS (Semanas 7-9)
  ├── App Movil: Gestion de clientes
  ├── App Movil: Modo offline completo
  ├── App Movil: Notificaciones
  ├── Panel Web: Dashboard principal
  ├── Panel Web: Reportes avanzados
  └── Integracion con APIs de tasas

FASE 4: REFINAMIENTO (Semanas 10-11)
  ├── Soporte multiidioma (AR, FR, ES)
  ├── Soporte RTL completo
  ├── Optimizacion de rendimiento
  ├── Tests de integracion
  ├── Integracion WhatsApp (recibos)
  └── Sistema de backup automatico

FASE 5: DESPLIEGUE Y FORMACION (Semana 12)
  ├── Despliegue en servidor de produccion
  ├── Publicacion en Google Play Store
  ├── Configuracion inicial con datos reales
  ├── Formacion al usuario (video + presencial/remoto)
  ├── Periodo de prueba supervisada
  └── Documentacion completa

TOTAL: 12 SEMANAS (3 meses)
```

### 13.2 Cronograma Visual

```
Semana  1  2  3  4  5  6  7  8  9  10 11 12
FASE 1  [===========]
FASE 2              [===========]
FASE 3                          [===========]
FASE 4                                   [======]
FASE 5                                         [===]
```

### 13.3 Entregables por Fase

| Fase | Entregable | Verificacion |
|---|---|---|
| Fase 1 | Backend core funcionando, API documentada | Tests automaticos pasan |
| Fase 2 | App movil con flujo principal, cambio completo | Demo en dispositivo real |
| Fase 3 | App completa + Panel web + Modo offline | Prueba sin internet |
| Fase 4 | Sistema en arabe, WhatsApp, backups | Prueba integral |
| Fase 5 | Sistema en produccion, usuario formado | Usuario opera solo |

---

## 14. PRESUPUESTO Y OPCIONES

### 14.1 Opcion A: Sistema Completo Premium

**Incluye todo lo descrito en este documento.**

| Concepto | Detalle | Precio |
|---|---|---|
| Desarrollo App Movil | Android, offline, multiidioma | 3,500 EUR |
| Desarrollo Backend API | Todos los modulos, seguridad | 2,800 EUR |
| Desarrollo Panel Web | Dashboard, reportes, config | 2,200 EUR |
| Diseno UI/UX | Todas las pantallas, branding | 1,200 EUR |
| Integraciones | WhatsApp, APIs tasas, impresora | 800 EUR |
| Testing y QA | Tests automaticos, pruebas manuales | 600 EUR |
| Despliegue y config | Servidor, dominio, SSL, Play Store | 400 EUR |
| Formacion | Video-tutoriales + sesion remota | 300 EUR |
| Documentacion | Manual de usuario + tecnica | 200 EUR |
| **TOTAL** | | **12,000 EUR** |

### 14.2 Opcion B: Sistema Esencial

**App movil + Backend. Sin panel web. Reportes basicos.**

| Concepto | Detalle | Precio |
|---|---|---|
| Desarrollo App Movil | Android, offline, arabe/frances | 3,500 EUR |
| Desarrollo Backend API | Core, caja, clientes, tasas | 2,200 EUR |
| Diseno UI/UX | Pantallas de app | 800 EUR |
| Integraciones basicas | API tasas | 300 EUR |
| Testing, despliegue, formacion | | 700 EUR |
| **TOTAL** | | **7,500 EUR** |

### 14.3 Opcion C: MVP (Producto Minimo Viable)

**Solo app movil con funcionalidades core. Ideal para empezar rapido.**

| Concepto | Detalle | Precio |
|---|---|---|
| App Movil (core) | Cambio, caja, clientes basico | 2,500 EUR |
| Backend basico | API minima, almacenamiento | 1,200 EUR |
| Diseno basico | UI funcional | 500 EUR |
| Despliegue y formacion | | 300 EUR |
| **TOTAL** | | **4,500 EUR** |

### 14.4 Costes Recurrentes (Mensuales)

| Concepto | Opcion A | Opcion B | Opcion C |
|---|---|---|---|
| Servidor VPS | 15 EUR | 10 EUR | 8 EUR |
| Dominio (anual / 12) | 1 EUR | 1 EUR | 1 EUR |
| APIs de tasas (plan gratis) | 0 EUR | 0 EUR | 0 EUR |
| WhatsApp API (opcional) | 10 EUR | - | - |
| Almacenamiento backup | 3 EUR | 2 EUR | 1 EUR |
| **Total mensual** | **29 EUR** | **13 EUR** | **10 EUR** |

### 14.5 Comparativa Rapida

```
                    OPCION A         OPCION B         OPCION C
                    Premium          Esencial         MVP
Precio              12,000 EUR       7,500 EUR        4,500 EUR
Coste mensual       29 EUR           13 EUR           10 EUR
Tiempo              12 semanas       8 semanas        5 semanas
App Movil           SI (completa)    SI (completa)    SI (basica)
Panel Web           SI               NO               NO
Modo Offline        SI               SI               SI (basico)
Multiidioma         AR, FR, ES       AR, FR           AR
WhatsApp            SI               NO               NO
Reportes            Avanzados        Basicos          Minimos
IA / Prediccion     SI               NO               NO
Multi-operador      SI               NO               NO
Clientes CRM        Avanzado         Basico           Basico
```

### 14.6 Forma de Pago Sugerida

```
Pago en 4 hitos:
  1. Inicio del proyecto:        30% del total
  2. Fin de Fase 2 (demo):       25% del total
  3. Fin de Fase 4 (pre-prod):   25% del total
  4. Entrega final (produccion):  20% del total

Metodos de pago aceptados:
  - Transferencia bancaria
  - Western Union / MoneyGram
  - CCP (Argelia)
  - Efectivo (si es posible presencialmente)
```

---

## 15. SOPORTE Y MANTENIMIENTO

### 15.1 Soporte Post-Lanzamiento (Incluido)

| Servicio | Duracion | Detalle |
|---|---|---|
| Correccion de bugs | 3 meses | Cualquier error se corrige gratis |
| Soporte tecnico | 3 meses | Asistencia por WhatsApp/llamada |
| Actualizaciones menores | 3 meses | Mejoras pequenas incluidas |
| Formacion adicional | 2 sesiones | Si el usuario necesita refrescar |

### 15.2 Plan de Mantenimiento (Opcional)

| Plan | Mensual | Incluye |
|---|---|---|
| **Basico** | 50 EUR/mes | Hosting + correccion bugs + 2h soporte |
| **Profesional** | 100 EUR/mes | Basico + actualizaciones + mejoras menores + 5h soporte |
| **Premium** | 200 EUR/mes | Profesional + nuevas funciones + soporte prioritario ilimitado |

### 15.3 Garantia

- **Garantia de funcionamiento**: 6 meses desde la entrega
- **Garantia de datos**: Los datos del usuario siempre le pertenecen
- **Codigo fuente**: Entregado al usuario (es suyo)
- **Sin dependencia**: El sistema puede funcionar sin nosotros

---

## 16. BENEFICIOS ESPERADOS

### 16.1 Beneficios Cuantificables

| Beneficio | Antes (manual) | Con SARAF PRO | Mejora |
|---|---|---|---|
| Tiempo por operacion | 2-5 minutos | < 10 segundos | 95% mas rapido |
| Errores de calculo | 3-5% de operaciones | 0% | 100% eliminados |
| Tiempo cierre de caja | 30-60 minutos | 2 minutos (automatico) | 95% menos |
| Operaciones perdidas/olvidadas | ~5% | 0% | 100% registradas |
| Tiempo buscar historial | 10-30 minutos | < 5 segundos | 99% mas rapido |
| Deudas no cobradas | ~10% se olvidan | 0% (alertas) | 100% controladas |

### 16.2 Beneficios No Cuantificables

- **Profesionalismo**: Imagen de negocio moderno y confiable
- **Tranquilidad**: Todo esta registrado y respaldado
- **Escalabilidad**: Listo para crecer (mas operadores, mas puntos)
- **Competitividad**: Tasas optimizadas, servicio mas rapido
- **Control total**: Saber exactamente cuanto se gana cada dia
- **Libertad**: Gestionar el negocio desde cualquier lugar

### 16.3 Retorno de Inversion (ROI)

```
Suponiendo (estimaciones conservadoras):
  - 40 operaciones diarias
  - Ganancia media de 50 DZD por operacion por errores evitados
  - 5% de operaciones con errores eliminados
  - 10% de deudas recuperadas gracias al seguimiento

Ahorro mensual estimado:
  - Errores evitados: 40 ops x 50 DZD x 30 dias = 60,000 DZD (~320 EUR)
  - Deudas recuperadas: ~200 EUR/mes
  - Tiempo ahorrado (valor): ~150 EUR/mes
  - Clientes adicionales (por rapidez): ~100 EUR/mes
  
  TOTAL AHORRO/GANANCIA ADICIONAL: ~770 EUR/mes

Retorno de inversion:
  - Opcion A (12,000 EUR): ROI en ~16 meses
  - Opcion B (7,500 EUR):  ROI en ~10 meses
  - Opcion C (4,500 EUR):  ROI en ~6 meses
```

---

## 17. ANEXOS

### Anexo A: Glosario

| Termino | Definicion |
|---|---|
| **Saraf (صراف)** | Cambiador de moneda en arabe |
| **Spread** | Diferencia entre precio de compra y venta de una divisa |
| **Par de divisas** | Dos monedas que se intercambian (ej: EUR/DZD) |
| **Tasa de cambio** | Precio de una divisa expresado en otra |
| **Caja** | Stock de efectivo disponible en cada divisa |
| **Offline-first** | Diseno que prioriza funcionar sin internet |
| **RTL** | Right-to-Left, escritura de derecha a izquierda (arabe) |
| **API** | Interfaz de programacion entre sistemas |
| **MVP** | Producto Minimo Viable |
| **CRM** | Gestion de relaciones con clientes |

### Anexo B: Requisitos Minimos del Dispositivo

| Componente | Requisito Minimo | Recomendado |
|---|---|---|
| Sistema Operativo | Android 8.0+ | Android 12+ |
| RAM | 2 GB | 4 GB+ |
| Almacenamiento | 200 MB libre | 1 GB libre |
| Pantalla | 5 pulgadas | 6+ pulgadas |
| Internet | No requerido (offline) | 3G/4G para sync |

### Anexo C: Competidores y Diferenciacion

| Solucion | Problema | SARAF PRO |
|---|---|---|
| Apps genericas de cambio | No gestionan caja, no offline, no local | Disenado para el contexto exacto |
| Excel/Google Sheets | Lento, errores, no movil, no automatico | Todo automatizado y movil |
| Cuaderno de papel | Sin calculo, sin busqueda, se pierde | Digital, respaldado, buscable |
| Software bancario | Caro, complejo, no adaptado | Economico, simple, adaptado |

### Anexo D: Casos de Uso Detallados

**Caso 1: Operacion rapida EUR -> DZD**
```
Actor: Operador
Precondicion: App abierta, tasas configuradas
1. Cliente pide cambiar 200 EUR a DZD
2. Operador toca "Nueva Operacion"
3. Selecciona EUR, escribe 200
4. Toca DZD como destino
5. Sistema muestra: 200 EUR = 37,400 DZD (tasa 187)
6. Operador toca "Confirmar"
7. Sistema registra, actualiza caja, genera recibo
Postcondicion: EUR +200, DZD -37,400, ganancia registrada
```

**Caso 2: Cliente con saldo pendiente**
```
Actor: Operador
1. Cliente habitual quiere cambiar 1,000 EUR pero solo trae 800
2. Operador hace operacion por 800 EUR
3. Registra 200 EUR como "pendiente" en ficha del cliente
4. Sistema muestra alerta de saldo pendiente
5. Cuando el cliente vuelve, el sistema recuerda la deuda
6. Se completa la operacion y se cierra el pendiente
```

**Caso 3: Cierre de caja al final del dia**
```
Actor: Operador
1. A las 22:00, el sistema envia notificacion: "Hora de cerrar caja"
2. Operador toca "Cerrar Caja"
3. Sistema muestra resumen completo del dia
4. Operador verifica contando efectivo fisico
5. Si hay diferencia, registra ajuste con motivo
6. Confirma cierre
7. Sistema genera reporte, envia copia por WhatsApp
8. Backup automatico realizado
```

**Caso 4: Actualizacion de tasas por la manana**
```
Actor: Operador
1. Operador abre la app por la manana
2. Sistema muestra tasas de ayer con indicador de "desactualizado"
3. Si hay internet: muestra tasa de mercado actual para referencia
4. Operador ajusta sus tasas de compra/venta deslizando
5. Confirma nuevas tasas
6. Todas las operaciones del dia usaran las nuevas tasas
7. Puede cambiar tasas en cualquier momento durante el dia
```

---

### Anexo E: Informacion de Contacto del Desarrollador

```
Para consultas sobre esta propuesta:
  
  Disponibilidad: Lunes a Viernes, 9:00 - 18:00 (CET)
  Idiomas: Espanol, Frances, Arabe
  
  Respuesta garantizada en menos de 24 horas
```

---

### Anexo F: Proximos Pasos

Para iniciar el proyecto, se necesita:

1. **Aprobacion de la propuesta** y seleccion de opcion (A, B o C)
2. **Reunion inicial** (presencial o videollamada) para:
   - Definir prioridades exactas
   - Configurar divisas y pares principales
   - Entender flujo de trabajo actual en detalle
   - Definir tasas iniciales y spreads
3. **Firma de acuerdo** con condiciones y plazos
4. **Primer pago** (30%) para iniciar el desarrollo
5. **Inicio del desarrollo** en la semana siguiente

---

> **SARAF PRO** - Porque tu tiempo vale mas que cualquier divisa.

---

*Documento preparado con la maxima atencion al detalle para ofrecer una solucion integral y profesional adaptada a las necesidades especificas del operador de cambio en Tindouf, Argelia.*

*Todos los precios son orientativos y pueden ajustarse segun los requisitos finales acordados.*
