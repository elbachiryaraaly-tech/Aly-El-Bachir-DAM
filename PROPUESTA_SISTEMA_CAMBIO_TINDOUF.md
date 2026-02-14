# PROPUESTA DE PROYECTO

## "SARAF ELITE" - Sistema de Gestion de Red de Cambio de Divisas

### Para Operador Principal de Cambio en Tindouf, Argelia

---

**Version:** 2.0  
**Fecha:** 13 de febrero de 2026  
**Tipo de documento:** Propuesta Comercial y Tecnica  
**Confidencialidad:** Documento confidencial - Solo para el destinatario

---

## INDICE

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Asi Trabajas Hoy (El Problema)](#2-asi-trabajas-hoy-el-problema)
3. [Asi Vas a Trabajar con SARAF ELITE (La Solucion)](#3-asi-vas-a-trabajar-con-saraf-elite-la-solucion)
4. [Estructura del Negocio en el Sistema](#4-estructura-del-negocio-en-el-sistema)
5. [App del Jefe - Control Total](#5-app-del-jefe---control-total)
6. [App del Empleado - Simplicidad Absoluta](#6-app-del-empleado---simplicidad-absoluta)
7. [Flujos de Trabajo Reales](#7-flujos-de-trabajo-reales)
8. [Funcionalidades Completas](#8-funcionalidades-completas)
9. [Divisas Soportadas](#9-divisas-soportadas)
10. [Modo Offline y Conectividad](#10-modo-offline-y-conectividad)
11. [Seguridad](#11-seguridad)
12. [Tecnologia](#12-tecnologia)
13. [Plan de Implementacion](#13-plan-de-implementacion)
14. [Presupuesto y Opciones](#14-presupuesto-y-opciones)
15. [Soporte y Garantia](#15-soporte-y-garantia)

---

## 1. RESUMEN EJECUTIVO

### Quien eres

Eres un cambiador de moneda muy conocido y respetado en la zona de Tindouf. Llevas anos en el negocio. Trabajas con euros, dinares argelinos, uguiyas mauritanas, francos CFA y mas. Tienes una **red de empleados** repartidos entre **Tindouf ciudad** y los **campamentos de Aaioun**, que son los que reciben a los clientes cara a cara, manejan el efectivo en DZD y ejecutan los cambios.

### Como trabajas hoy

Todo se gestiona con **papel, boli y mensajes de WhatsApp**. Tus empleados te escriben por WhatsApp para cada operacion: "Jefe, un cliente quiere cambiar 500 euros". Tu respondes con la tasa, ellos hacen el cambio, y luego te confirman. Al final del dia, intentas cuadrar todo desde los mensajes. Muchas veces los mensajes se pierden entre otras conversaciones. Muchas veces hay errores. Muchas veces no sabes exactamente cuanto dinero tiene cada empleado en cada momento.

### Lo que necesitas

Un sistema que **reemplace completamente** el papel, el boli y el caos de WhatsApp. Un sistema donde:

- **Tu controlas todo desde tu movil** sin moverte
- **Tus empleados operan con un solo toque** sin pensar
- **Cada dinar, cada euro, cada uguiya queda registrado** automaticamente
- **Sabes en tiempo real** cuanto dinero tiene cada empleado, en cada punto, en cada divisa
- **Cero errores, cero olvidos, cero mensajes perdidos**

### La solucion: SARAF ELITE

Dos aplicaciones conectadas:

```
+==========================================+
|                                          |
|    APP DEL JEFE (Tu movil)               |
|    - Ves TODO en tiempo real             |
|    - Fijas las tasas                     |
|    - Apruebas operaciones grandes        |
|    - Ves la caja de cada empleado        |
|    - Reportes automaticos                |
|    - Control TOTAL sin moverte           |
|                                          |
+==========================================+
          |              |
    (conexion en tiempo real)
          |              |
+==========+    +==========+    +==========+
| EMPLEADO |    | EMPLEADO |    | EMPLEADO |
| Tindouf  |    | Aaioun 1 |    | Aaioun 2 |
|          |    |          |    |          |
| - Recibe |    | - Recibe |    | - Recibe |
|   cliente|    |   cliente|    |   cliente|
| - 1 toque|    | - 1 toque|    | - 1 toque|
|   para   |    |   para   |    |   para   |
|   operar |    |   operar |    |   operar |
| - Cero   |    | - Cero   |    | - Cero   |
|   calculo|    |   calculo|    |   calculo|
+==========+    +==========+    +==========+
```

> **En resumen**: Tu sigues siendo el jefe que controla todo, pero en vez de WhatsApp y papel, lo haces desde una app que te da superpoderes. Tus empleados, en vez de escribirte mensajes, tocan un boton y todo queda registrado. Tu lo ves al instante.

---

## 2. ASI TRABAJAS HOY (EL PROBLEMA)

### 2.1 El Flujo Actual (Papel y WhatsApp)

```
COMO FUNCIONA HOY (un ejemplo real):

09:15 - Empleado Ahmed en Aaioun escribe por WhatsApp:
        "Jefe, un cliente quiere cambiar 500 euros"

09:17 - Tu lees el mensaje (si lo ves, si no esta entre otros 50 mensajes)

09:18 - Tu respondes: "187"

09:19 - Ahmed busca el mensaje, calcula 500 x 187 = 93,500 DZD
        (si no se equivoca con la calculadora)

09:20 - Ahmed hace el cambio, le da 93,500 DZD al cliente

09:21 - Ahmed te escribe: "Hecho, 500 euros a 187 = 93,500"

09:22 - Tu lo apuntas en un papel (si te acuerdas, si no se te pasa)

--- MIENTRAS TANTO ---

09:18 - Empleado Omar en Tindouf te escribe: "Jefe, cliente con 200,000 DZD quiere euros"
09:19 - Tu estas respondiendo a Ahmed, no ves el mensaje de Omar
09:25 - Omar: "Jefe???"
09:26 - Tu ves el mensaje de Omar, respondes "186"
09:27 - Omar calcula 200,000 / 186 = 1,075.27 euros
        (redondea a 1,075? 1,076? no sabe)

--- Y ASI TODO EL DIA ---

22:00 - Intentas cuadrar las cuentas del dia
        - Buscas mensajes de WhatsApp entre 200 conversaciones
        - Intentas sumar todo lo del papel
        - No cuadra. Faltan 15,000 DZD en algun sitio
        - Llamas a Ahmed: "cuantos euros tienes?"
        - Ahmed cuenta... "creo que 2,300... no, espera, 2,350"
        - No sabes si Ahmed se equivoca o falta algo
        
23:30 - Sigues intentando cuadrar...
```

### 2.2 Los Problemas Reales

| Problema | Que pasa | Cuanto te cuesta |
|---|---|---|
| **Mensajes perdidos** | Un empleado te escribe, no lo ves entre otros mensajes. El cliente se va o el empleado opera sin tu tasa. | Pierdes clientes o pierdes dinero |
| **Errores de calculo** | El empleado calcula mal. 500 x 187 y pone 92,500 en vez de 93,500. Ni tu ni el se dan cuenta. | Miles de DZD al mes |
| **No sabes la caja** | No sabes en ningun momento cuanto tiene cada empleado en cada divisa. Solo lo sabes cuando les preguntas (y puede que no sea exacto). | Imposible controlar |
| **Cuadrar cuentas** | Al final del dia, intentas reconstruir todo desde WhatsApp y papeles. Siempre falta algo. | 1-2 horas CADA DIA |
| **Tasas desactualizadas** | Cambias la tasa pero un empleado no ve el mensaje y sigue con la tasa vieja. | Perdida directa |
| **Empleado deshonesto** | Si un empleado hace una operacion sin registrarla, no tienes forma de saberlo. | Perdida invisible |
| **Deudas olvidadas** | Un cliente debe 300 EUR. Lo apuntaste en un papel. El papel se pierde o se te olvida. | Dinero que nunca cobras |
| **Sin historial** | Un cliente dice "la semana pasada cambie a 185". No tienes forma de verificar. | Disputas, mala imagen |
| **Multiples ubicaciones** | Tindouf y Aaioun estan separados. No puedes estar en los dos sitios. | Control limitado |
| **Dependencia de ti** | Si tu movil se queda sin bateria o no tienes cobertura, todo se para. Los empleados no pueden operar. | Negocio parado |

### 2.3 Lo que Gastas Hoy sin Darte Cuenta

```
PERDIDAS ESTIMADAS MENSUALES (conservador):

Errores de calculo de empleados:         ~30,000 DZD/mes  (~160 EUR)
Operaciones no registradas/olvidadas:    ~50,000 DZD/mes  (~270 EUR)
Clientes que se van por lentitud:        ~20,000 DZD/mes  (~110 EUR)
Deudas no cobradas:                      ~40,000 DZD/mes  (~215 EUR)
Tu tiempo cuadrando cuentas (60h/mes):   Incalculable
Estres:                                  Incalculable

TOTAL PERDIDAS ESTIMADAS:               ~140,000 DZD/mes  (~750 EUR/mes)
                                         ~9,000 EUR/ano
```

---

## 3. ASI VAS A TRABAJAR CON SARAF ELITE (LA SOLUCION)

### 3.1 El Mismo Ejemplo, Pero con SARAF ELITE

```
COMO VA A FUNCIONAR:

09:15 - Cliente llega donde Ahmed (Aaioun)
        Ahmed abre la app, toca "Nueva Operacion"
        Toca "EUR", escribe "500"
        La app AUTOMATICAMENTE muestra:
          "500 EUR = 93,500 DZD (tasa: 187.00)"
          (la tasa la puso el jefe esta manana, no hay que preguntar)
        Ahmed toca "CONFIRMAR"

        LISTO. 3 segundos. Sin llamar al jefe. Sin WhatsApp. Sin calculadora.

        EN TU MOVIL APARECE AL INSTANTE:
        [NOTIFICACION] "Ahmed (Aaioun) - COMPRA 500 EUR por 93,500 DZD"

--- AL MISMO TIEMPO ---

09:15 - Cliente llega donde Omar (Tindouf)
        Omar abre la app, toca "Nueva Operacion"
        Toca "DZD", escribe "200,000"
        La app muestra: "200,000 DZD = 1,075 EUR (tasa: 186.00)"
        Omar toca "CONFIRMAR"

        EN TU MOVIL:
        [NOTIFICACION] "Omar (Tindouf) - VENTA 1,075 EUR por 200,000 DZD"

--- TU, MIENTRAS TANTO ---

09:16 - Abres tu app y ves EN TIEMPO REAL:

        +------------------------------------------+
        |  SARAF ELITE - Jefe                      |
        +------------------------------------------+
        |  HOY: 2 operaciones | +2,500 DZD gan.    |
        +------------------------------------------+
        |                                           |
        |  AHMED (Aaioun)                           |
        |    EUR: 2,850   DZD: 406,500              |
        |    Ultima op: hace 1 min                  |
        |                                           |
        |  OMAR (Tindouf)                           |
        |    EUR: 1,425   DZD: 800,000              |
        |    Ultima op: hace 1 min                  |
        |                                           |
        |  KARIM (Aaioun)                           |
        |    EUR: 1,000   DZD: 350,000              |
        |    Ultima op: hace 23 min                 |
        |                                           |
        +------------------------------------------+

        Ves exactamente cuanto tiene cada uno.
        Sin preguntar. Sin WhatsApp. En tiempo real.

--- FINAL DEL DIA ---

22:00 - Abres la app. Toca "Cierre del dia"

        RESUMEN AUTOMATICO:
        - 47 operaciones totales
        - Ahmed: 23 ops, +1,200 DZD ganancia
        - Omar: 15 ops, +800 DZD ganancia
        - Karim: 9 ops, +500 DZD ganancia
        - Ganancia total: +2,500 DZD
        - Todo cuadra. Cero errores.
        
        Tiempo: 5 SEGUNDOS en vez de 2 HORAS.
```

### 3.2 La Diferencia

| Aspecto | ANTES (WhatsApp + Papel) | DESPUES (SARAF ELITE) |
|---|---|---|
| Empleado recibe cliente | Escribe WhatsApp al jefe, espera respuesta | Abre app, la tasa ya esta, opera solo |
| Tiempo por operacion | 5-15 minutos (esperando respuesta) | **5 segundos** |
| Calculo | Manual con calculadora (errores) | **Automatico, cero errores** |
| Jefe sabe la caja | Pregunta por WhatsApp | **Ve en tiempo real sin preguntar** |
| Cuadrar cuentas | 1-2 horas buscando en WhatsApp | **Automatico, 5 segundos** |
| Cambiar tasa | Envia mensaje a cada empleado (pueden no verlo) | **Un toque, llega a todos al instante** |
| Operacion grande | Empleado espera aprobacion por WhatsApp | **Pide aprobacion en la app, jefe aprueba con 1 toque** |
| Historial | Papel que se pierde | **Todo guardado para siempre, buscable** |
| Control de empleados | Confianza ciega | **Cada operacion registrada, verificable** |
| Si no hay internet | Todo se para | **App funciona offline, sincroniza despues** |

---

## 4. ESTRUCTURA DEL NEGOCIO EN EL SISTEMA

### 4.1 Jerarquia de Usuarios

```
+========================================+
|            JEFE (TU)                    |
|  - Control total                       |
|  - Fija las tasas                      |
|  - Aprueba operaciones grandes         |
|  - Ve todo en tiempo real              |
|  - Unico que puede modificar config    |
|  - Unico que ve las ganancias          |
+========================================+
          |
     +----+----+
     |         |
+====+====+ +==+======+
| PUNTO 1 | | PUNTO 2 |    (Se pueden anadir mas puntos)
| TINDOUF | | AAIOUN  |
+=========+ +=========+
     |           |
  +--+--+     +--+--+--+
  |     |     |     |   |
 Omar  Ali  Ahmed Karim Fatima   (Se pueden anadir mas empleados)
```

### 4.2 Roles y Permisos

| Permiso | JEFE | EMPLEADO |
|---|---|---|
| Ver su propia caja | SI | SI |
| Ver caja de TODOS | **SI** | NO |
| Realizar operaciones de cambio | SI | SI (con limites) |
| Fijar y cambiar tasas | **SI** | NO |
| Aprobar operaciones grandes | **SI** | NO (debe pedir permiso) |
| Ver ganancias y spreads | **SI** | NO |
| Ver reportes completos | **SI** | NO |
| Anadir/eliminar empleados | **SI** | NO |
| Registrar entradas/salidas de caja | SI | SI (solo las suyas) |
| Ver historial de todos | **SI** | NO (solo el suyo) |
| Exportar datos | **SI** | NO |
| Configurar el sistema | **SI** | NO |
| Registrar clientes | SI | SI |
| Ver clientes con deudas | **SI** | SI (solo sus clientes) |

### 4.3 Puntos de Operacion (Sucursales)

| Punto | Ubicacion | Empleados | Divisas Principales |
|---|---|---|---|
| **TINDOUF** | Tindouf ciudad | Configurable | EUR, DZD, MRU, XOF |
| **AAIOUN** | Campamentos Aaioun | Configurable | EUR, DZD, MRU |
| *(Ampliable)* | Donde sea | Configurable | Todas |

Cada punto tiene:
- Su propia caja separada por divisa
- Sus propios empleados asignados
- Las mismas tasas del jefe (o tasas especificas si el jefe lo decide)
- Su propio historial de operaciones

### 4.4 Gestion de Caja por Empleado

Cada empleado tiene **su propia caja individual**:

```
AHMED (Aaioun):
  EUR:    2,350.00   [barra visual ████████░░]
  DZD:  456,000.00   [barra visual ██████████]
  MRU:   12,000.00   [barra visual ███░░░░░░░]

OMAR (Tindouf):
  EUR:    1,425.00   [barra visual █████░░░░░]
  DZD:  800,000.00   [barra visual ██████████]
  MRU:   45,000.00   [barra visual ██████░░░░]
  XOF:  350,000.00   [barra visual ████░░░░░░]
```

El jefe ve TODAS las cajas. El empleado solo ve la suya.

---

## 5. APP DEL JEFE - CONTROL TOTAL

### 5.1 Pantalla Principal del Jefe

```
+--------------------------------------------+
|  SARAF ELITE          Jue 13 Feb    14:35  |
+--------------------------------------------+
|                                              |
|  GANANCIA HOY              OPERACIONES       |
|  +12,450 DZD  (+8%)       47  (+5 vs ayer)  |
|                                              |
+--------------------------------------------+
|  CAJA TOTAL DE LA RED                        |
|                                              |
|  EUR    ████████████   15,775.00             |
|  DZD    ██████████  3,456,000.00             |
|  MRU    ██████        257,000.00             |
|  XOF    ████          350,000.00             |
|                                              |
+--------------------------------------------+
|  EMPLEADOS AHORA                             |
|                                              |
|  [Circulo verde] Ahmed - Aaioun             |
|     EUR: 2,350  DZD: 456,000                |
|     Ultima op: hace 3 min                    |
|                                              |
|  [Circulo verde] Omar - Tindouf             |
|     EUR: 1,425  DZD: 800,000                |
|     Ultima op: hace 8 min                    |
|                                              |
|  [Circulo gris] Karim - Aaioun              |
|     EUR: 1,000  DZD: 350,000                |
|     Sin actividad hace 2 horas               |
|                                              |
+--------------------------------------------+
|  ULTIMAS OPERACIONES                         |
|                                              |
|  14:32  Ahmed  500 EUR->DZD    +1,000 DZD   |
|  14:28  Omar   200K DZD->EUR   +1,200 DZD   |
|  14:15  Ahmed  1K EUR->MRU     +3,000 MRU   |
|  14:01  Karim  50K XOF->DZD    +200 DZD     |
|                                              |
+--------------------------------------------+
|  [Tasas] [Empleados] [Reportes] [Config]    |
+--------------------------------------------+
```

### 5.2 Funciones Exclusivas del Jefe

#### A) Fijar Tasas - Un Solo Toque para Todos

```
PANTALLA: GESTIONAR TASAS

+--------------------------------------------+
|  <- TASAS DE HOY                             |
+--------------------------------------------+
|                                              |
|  EUR / DZD                                   |
|  Compra:  [- ] 185.00 [ +]                  |
|  Venta:   [- ] 187.00 [ +]                  |
|  Spread:  2.00 (1.08%)                       |
|  Mercado: 186.50                             |
|                                              |
|  EUR / MRU                                   |
|  Compra:  [- ] 400.00 [ +]                  |
|  Venta:   [- ] 403.00 [ +]                  |
|  Spread:  3.00 (0.75%)                       |
|                                              |
|  EUR / XOF                                   |
|  Compra:  [- ] 652.00 [ +]                  |
|  Venta:   [- ] 656.00 [ +]                  |
|  Spread:  4.00 (0.61%)                       |
|                                              |
|  DZD / MRU                                   |
|  Compra:  [- ] 2.15   [ +]                  |
|  Venta:   [- ] 2.18   [ +]                  |
|                                              |
|  +--------------------------------------+    |
|  |  APLICAR A TODOS LOS EMPLEADOS       |    |
|  |  [BOTON GRANDE VERDE]                |    |
|  +--------------------------------------+    |
|                                              |
+--------------------------------------------+

Al tocar "APLICAR":
  -> Todos los empleados reciben la nueva tasa INMEDIATAMENTE
  -> Les aparece una notificacion en su app:
     "Nuevas tasas: EUR/DZD Compra 185 Venta 187"
  -> Todas las operaciones futuras usan las nuevas tasas
  -> NO hace falta enviar WhatsApp a cada uno
  -> NO puede ser que un empleado use tasa vieja
```

#### B) Aprobar Operaciones Grandes

El jefe configura un limite (ejemplo: 2,000 EUR). Si un empleado quiere hacer una operacion mayor, necesita aprobacion:

```
[NOTIFICACION EN MOVIL DEL JEFE]

"Ahmed (Aaioun) pide aprobacion:
 COMPRAR 5,000 EUR por 935,000 DZD
 Cliente: Mohamed Ali
 
 [APROBAR]  [RECHAZAR]  [LLAMAR]"

El jefe toca APROBAR y Ahmed puede completar la operacion.
Si el jefe toca RECHAZAR, Ahmed ve "Operacion rechazada por el jefe".
Tiempo total: 3 segundos.
```

#### C) Transferencias entre Empleados

Cuando un empleado se queda sin una divisa, el jefe ordena transferencia:

```
PANTALLA: TRANSFERIR ENTRE EMPLEADOS

De: [Omar - Tindouf    v]     EUR disponible: 3,425
A:  [Ahmed - Aaioun    v]     EUR disponible: 350

Divisa: [EUR v]
Monto:  [1,000          ]

Omar entrega 1,000 EUR a Ahmed (o se envia por otro medio)

[CONFIRMAR TRANSFERENCIA]

-> La caja de Omar baja 1,000 EUR
-> La caja de Ahmed sube 1,000 EUR
-> Queda registrado con fecha, hora y motivo
```

#### D) Ver Todo en Tiempo Real

```
PANTALLA: MONITOR EN VIVO

+--------------------------------------------+
|  ACTIVIDAD EN TIEMPO REAL                    |
+--------------------------------------------+
|                                              |
|  [AHORA] Ahmed esta haciendo una operacion   |
|          300 EUR -> DZD ... esperando        |
|                                              |
|  [hace 2m] Omar completo: 500 EUR -> DZD    |
|            Ganancia: +1,000 DZD              |
|                                              |
|  [hace 5m] Karim completo: 100K DZD -> EUR  |
|            Ganancia: +600 DZD                |
|                                              |
|  [hace 12m] Ahmed completo: 200 EUR -> MRU  |
|             Ganancia: +600 MRU               |
|                                              |
+--------------------------------------------+
```

#### E) Reportes Automaticos

Cada dia a las 22:00 (o cuando quieras), recibes un resumen automatico:

```
RESUMEN DIARIO - 13 Febrero 2026
=================================

TOTAL OPERACIONES: 47
GANANCIA TOTAL: +12,450 DZD (+66.58 EUR)

POR EMPLEADO:
  Ahmed (Aaioun):  23 ops  |  +5,200 DZD ganancia
  Omar (Tindouf):  15 ops  |  +4,800 DZD ganancia
  Karim (Aaioun):   9 ops  |  +2,450 DZD ganancia

POR DIVISA:
  EUR/DZD: 30 ops | Vol: 12,000 EUR | +8,400 DZD
  EUR/MRU:  8 ops | Vol: 2,800 EUR  | +2,100 DZD equiv.
  DZD/MRU:  5 ops | Vol: 450K DZD   | +1,200 DZD
  EUR/XOF:  4 ops | Vol: 800 EUR    | +750 DZD equiv.

CAJA FINAL:
  Ahmed:  EUR 2,350 | DZD 456,000 | MRU 12,000
  Omar:   EUR 1,425 | DZD 800,000 | MRU 45,000 | XOF 350,000
  Karim:  EUR 1,000 | DZD 350,000

COMPARACION CON AYER:
  Ops: +5 mas | Ganancia: +8% mas | Volumen: +12% mas

Este resumen se puede recibir tambien por WhatsApp
(generado automaticamente, no hay que escribir nada).
```

---

## 6. APP DEL EMPLEADO - SIMPLICIDAD ABSOLUTA

### 6.1 Filosofia: El Empleado NO Piensa

La app del empleado esta disenada para que sea **imposible equivocarse**:

- **No tiene que calcular nada** (la app calcula todo)
- **No tiene que saber la tasa** (la app ya tiene la tasa del jefe)
- **No tiene que llamar al jefe** (salvo operaciones grandes)
- **No tiene que apuntar nada** (todo se registra solo)
- **Botones enormes**, texto grande, colores claros
- **Maximo 3 toques** para cualquier operacion

### 6.2 Pantalla Principal del Empleado

```
+--------------------------------------------+
|  SARAF                Ahmed - Aaioun        |
+--------------------------------------------+
|                                              |
|  MI CAJA:                                    |
|  EUR: 2,350     DZD: 456,000               |
|  MRU: 12,000                                |
|                                              |
+--------------------------------------------+
|                                              |
|  +--------------------------------------+    |
|  |                                      |    |
|  |    +---+   CLIENTE DA EUROS          |    |
|  |    |EUR|   Quiere DZD, MRU u otro    |    |
|  |    +---+                             |    |
|  |                                      |    |
|  +--------------------------------------+    |
|                                              |
|  +--------------------------------------+    |
|  |                                      |    |
|  |    +---+   CLIENTE DA DINARES        |    |
|  |    |DZD|   Quiere EUR, MRU u otro    |    |
|  |    +---+                             |    |
|  |                                      |    |
|  +--------------------------------------+    |
|                                              |
|  +--------------------------------------+    |
|  |                                      |    |
|  |    +---+   CLIENTE DA UGUIYAS        |    |
|  |    |MRU|   Quiere EUR, DZD u otro    |    |
|  |    +---+                             |    |
|  |                                      |    |
|  +--------------------------------------+    |
|                                              |
|  +--------------------------------------+    |
|  |    +---+   OTRA DIVISA               |    |
|  |    |...|   XOF, MAD, USD, etc.       |    |
|  |    +---+                             |    |
|  +--------------------------------------+    |
|                                              |
|  Tasas de hoy:                               |
|  EUR/DZD: 185/187  EUR/MRU: 400/403         |
|                                              |
+--------------------------------------------+
```

### 6.3 Flujo de Operacion del Empleado (3 Toques)

```
PASO 1 - TOCA "CLIENTE DA EUROS"

+--------------------------------------------+
|  <- CLIENTE DA EUROS                         |
+--------------------------------------------+
|                                              |
|  Cuantos euros da el cliente?                |
|                                              |
|  +--------------------------------------+    |
|  |                                      |    |
|  |            500                       |    |
|  |                                      |    |
|  +--------------------------------------+    |
|                                              |
|  +----+ +----+ +----+                        |
|  |100 | |200 | |500 |  <- Botones rapidos    |
|  +----+ +----+ +----+                        |
|  +----+ +----+ +----+                        |
|  |1000| |2000| |5000|                        |
|  +----+ +----+ +----+                        |
|                                              |
|  [7] [8] [9]                                 |
|  [4] [5] [6]    <- Teclado numerico grande   |
|  [1] [2] [3]                                 |
|  [0] [00] [<-]                               |
|                                              |
|  [         SIGUIENTE ->          ]           |
|                                              |
+--------------------------------------------+


PASO 2 - SELECCIONA QUE QUIERE EL CLIENTE

+--------------------------------------------+
|  <- 500 EUR -> ???                           |
+--------------------------------------------+
|                                              |
|  El cliente quiere:                          |
|                                              |
|  +--------------------------------------+    |
|  |  DZD - Dinares                       |    |
|  |  500 EUR = 93,500 DZD               |    |
|  |  Tasa: 187.00                         |    |
|  +--------------------------------------+    |
|                                              |
|  +--------------------------------------+    |
|  |  MRU - Uguiyas                       |    |
|  |  500 EUR = 201,500 MRU              |    |
|  |  Tasa: 403.00                         |    |
|  +--------------------------------------+    |
|                                              |
|  +--------------------------------------+    |
|  |  XOF - Francos CFA                   |    |
|  |  500 EUR = 328,000 XOF              |    |
|  |  Tasa: 656.00                         |    |
|  +--------------------------------------+    |
|                                              |
|  (el empleado toca DZD)                      |
|                                              |
+--------------------------------------------+


PASO 3 - CONFIRMAR

+--------------------------------------------+
|  <- CONFIRMAR OPERACION                      |
+--------------------------------------------+
|                                              |
|  RECIBES del cliente:                        |
|  +------------------+                        |
|  |   500.00 EUR     |                        |
|  +------------------+                        |
|                                              |
|  ENTREGAS al cliente:                        |
|  +------------------+                        |
|  |  93,500.00 DZD   |                        |
|  +------------------+                        |
|                                              |
|  Tasa aplicada: 187.00                       |
|                                              |
|  Cliente: [Seleccionar o dejar vacio]        |
|                                              |
|                                              |
|  +--------------------------------------+    |
|  |                                      |    |
|  |         CONFIRMAR                    |    |
|  |       [BOTON ENORME VERDE]           |    |
|  |                                      |    |
|  +--------------------------------------+    |
|                                              |
|  [Cancelar]                                  |
|                                              |
+--------------------------------------------+


DESPUES DE CONFIRMAR:

+--------------------------------------------+
|                                              |
|              OPERACION OK                    |
|                                              |
|    Comprado: 500.00 EUR                      |
|    Pagado:   93,500.00 DZD                   |
|                                              |
|    Tu caja ahora:                            |
|    EUR: 2,850.00 (+500)                      |
|    DZD: 362,500.00 (-93,500)                 |
|                                              |
|    [NUEVA OPERACION]  [INICIO]               |
|                                              |
+--------------------------------------------+

TIEMPO TOTAL: 5-8 SEGUNDOS
EL EMPLEADO NO HA CALCULADO NADA
EL EMPLEADO NO HA LLAMADO AL JEFE
EL JEFE YA LO HA VISTO EN SU MOVIL
```

### 6.4 Que Puede Hacer el Empleado

| Funcion | Descripcion |
|---|---|
| **Hacer operaciones de cambio** | Con las tasas del jefe, automatico |
| **Ver su caja** | Cuanto tiene en cada divisa |
| **Ver sus operaciones del dia** | Lista de lo que ha hecho |
| **Registrar entrada de caja** | "El jefe me dio 5,000 EUR" |
| **Registrar salida de caja** | "Entregue 2,000 EUR al jefe" |
| **Buscar cliente** | Si es un cliente habitual |
| **Pedir aprobacion** | Para operaciones grandes |
| **Ver tasas actuales** | Las que puso el jefe |

### 6.5 Que NO Puede Hacer el Empleado

| Restriccion | Razon |
|---|---|
| No puede cambiar tasas | Solo el jefe cambia tasas |
| No puede ver ganancias | Informacion solo del jefe |
| No puede ver cajas de otros | Cada uno ve solo lo suyo |
| No puede borrar operaciones | Todo queda registrado |
| No puede operar sin limite | Operaciones grandes necesitan aprobacion |
| No puede exportar datos | Solo el jefe exporta |
| No puede modificar configuracion | Solo el jefe configura |

---

## 7. FLUJOS DE TRABAJO REALES

### 7.1 Flujo: Inicio del Dia

```
JEFE (por la manana):
  1. Abre la app
  2. Revisa tasas de mercado (la app le muestra referencia)
  3. Ajusta sus tasas de compra/venta con los botones +/-
  4. Toca "APLICAR A TODOS"
  -> Todos los empleados tienen las nuevas tasas al instante

EMPLEADO (al empezar a trabajar):
  1. Abre la app
  2. Ve las tasas de hoy (ya actualizadas por el jefe)
  3. Ve su caja (lo que tenia ayer al cerrar)
  4. Si recibio dinero del jefe, toca "Entrada de caja" y lo registra
  5. Listo para operar
```

### 7.2 Flujo: Operacion Normal (< 2,000 EUR)

```
EMPLEADO:
  1. Cliente llega
  2. Abre app -> "Cliente da EUR" -> escribe 500 -> toca DZD -> CONFIRMAR
  3. Entrega 93,500 DZD al cliente, recibe 500 EUR
  4. Siguiente cliente

JEFE (automatico):
  - Recibe notificacion silenciosa en su movil
  - La caja de ese empleado se actualiza en tiempo real
  - No tiene que hacer NADA
```

### 7.3 Flujo: Operacion Grande (> Limite)

```
EMPLEADO:
  1. Cliente quiere cambiar 5,000 EUR
  2. Abre app, escribe 5,000 EUR -> DZD
  3. La app detecta que supera el limite (2,000 EUR)
  4. Pantalla: "Esta operacion necesita aprobacion del jefe"
  5. Toca "PEDIR APROBACION"
  6. Espera (normalmente 10-30 segundos)

JEFE:
  1. Recibe notificacion con vibracion:
     "Ahmed pide aprobar: 5,000 EUR -> 935,000 DZD"
  2. Toca [APROBAR] o [RECHAZAR]

EMPLEADO:
  7. Ve "APROBADO" en su pantalla
  8. Toca CONFIRMAR
  9. Operacion registrada
```

### 7.4 Flujo: Cliente con Deuda

```
EMPLEADO:
  1. Cliente habitual llega (Mohamed)
  2. Empleado selecciona el cliente en la app
  3. La app muestra: "Mohamed - Debe 300 EUR (desde hace 5 dias)"
  4. El empleado puede:
     a) Cobrar la deuda: Mohamed paga los 300 EUR
     b) Hacer nueva operacion (la deuda sigue abierta)
     c) Crear nueva deuda si el cliente pide credito

JEFE:
  - Ve todas las deudas pendientes de todos los clientes
  - Recibe alerta si una deuda lleva mas de X dias
  - Puede marcar deudas como cobradas desde su app
```

### 7.5 Flujo: El Jefe Cambia la Tasa a Mitad de Dia

```
JEFE:
  1. Ve que el mercado ha cambiado
  2. Abre "Tasas" en su app
  3. Sube EUR/DZD de 187 a 189
  4. Toca "APLICAR A TODOS"

TODOS LOS EMPLEADOS AL INSTANTE:
  - Reciben notificacion: "Nueva tasa EUR/DZD: Compra 187 / Venta 189"
  - La app cambia automaticamente
  - Todas las operaciones futuras usan la nueva tasa
  - IMPOSIBLE que un empleado use la tasa vieja por error
```

### 7.6 Flujo: Transferencia de Dinero entre Empleados

```
SITUACION: Ahmed en Aaioun se quedo sin DZD, Omar en Tindouf tiene de sobra

JEFE (desde su app):
  1. Abre "Transferencias"
  2. De: Omar (Tindouf) -> A: Ahmed (Aaioun)
  3. Divisa: DZD, Monto: 500,000
  4. Toca CONFIRMAR

  -> Omar recibe notificacion: "Entrega 500,000 DZD a Ahmed. Orden del jefe."
  -> Omar confirma cuando entrega el dinero (fisicamente o por envio)
  -> Ahmed confirma cuando recibe
  -> Las cajas se actualizan
  -> Todo registrado
```

### 7.7 Flujo: Final del Dia (Cierre)

```
JEFE (22:00):
  1. Recibe notificacion automatica: "Hora de cerrar el dia"
  2. Abre "Cierre del dia"
  3. Ve resumen completo automatico (operaciones, ganancias, cajas)
  4. Puede pedir a cada empleado que confirme su caja contando efectivo
  5. Si hay diferencia, se registra como ajuste con motivo
  6. Toca "CERRAR DIA"
  7. Se genera reporte. Se hace backup automatico.

EMPLEADO:
  1. Recibe notificacion: "El jefe ha cerrado el dia"
  2. Si el jefe pide confirmacion de caja:
     - "Cuenta tu efectivo y confirma:"
     - EUR: [2,350] <- el empleado escribe lo que cuenta
     - DZD: [456,000]
     - Si coincide con la app: OK
     - Si NO coincide: se marca como diferencia para revision
```

---

## 8. FUNCIONALIDADES COMPLETAS

### 8.1 Motor de Cambio

| Funcion | Descripcion |
|---|---|
| Conversion instantanea | Calculo automatico al escribir el monto |
| Tasas centralizadas | El jefe fija, empleados ejecutan |
| Multi-divisa | EUR, DZD, MRU, XOF y mas |
| Conversion directa e inversa | "Tengo 500 EUR" o "Necesito 100,000 DZD" |
| Botones rapidos | 100, 200, 500, 1000, 2000, 5000 |
| Confirmacion clara | Pantalla grande con resumen antes de confirmar |
| Operacion en 3 toques | Divisa -> Monto -> Confirmar |
| Limite de operacion | Operaciones grandes necesitan aprobacion del jefe |

### 8.2 Gestion de Caja

| Funcion | Descripcion |
|---|---|
| Caja por empleado | Cada empleado tiene su caja independiente |
| Caja por punto | Totales por Tindouf, Aaioun, etc. |
| Caja total de la red | El jefe ve el total de todo |
| Actualizacion automatica | Se actualiza sola con cada operacion |
| Entradas manuales | "Recibi 5,000 EUR del jefe" |
| Salidas manuales | "Entregue 3,000 EUR al jefe" |
| Alertas de nivel bajo | "Ahmed solo tiene 200 EUR, necesita mas" |
| Transferencias entre empleados | Con autorizacion del jefe |
| Cierre diario | Resumen automatico cada noche |
| Verificacion de conteo | El empleado cuenta fisico y confirma |

### 8.3 Gestion de Tasas

| Funcion | Descripcion |
|---|---|
| Tasas de compra/venta | El jefe configura ambas por cada par |
| Propagacion instantanea | Un toque y todos los empleados tienen la nueva tasa |
| Tasas de referencia | Conexion con APIs de mercado (cuando hay internet) |
| Historial de tasas | Ver como han cambiado las tasas en el tiempo |
| Ajuste rapido | Botones +/- para subir o bajar con precision |
| Spread visible | Ver margen de ganancia de cada par |
| Notificacion de cambio | Empleados reciben alerta cuando la tasa cambia |

### 8.4 Gestion de Clientes

| Funcion | Descripcion |
|---|---|
| Registro rapido | Nombre + telefono, en 5 segundos |
| Historial por cliente | Todas sus operaciones |
| Saldos pendientes (deudas) | Lo que debe o se le debe |
| Alertas de deuda | Recordatorio si una deuda lleva mucho tiempo |
| Busqueda rapida | Por nombre o telefono |
| Nivel de confianza | Del 1 al 5, configurable |
| Limite de credito | Cuanto se le puede fiar segun su nivel |
| Clientes compartidos | Todos los empleados ven los mismos clientes |
| Notas | Apuntes sobre el cliente ("viene siempre los jueves") |

### 8.5 Reportes y Analitica (Solo Jefe)

| Reporte | Contenido | Frecuencia |
|---|---|---|
| **Resumen diario** | Operaciones, ganancias, cajas, por empleado | Automatico cada noche |
| **Resumen semanal** | Tendencias, mejor dia, peor dia, por empleado | Cada lunes |
| **Resumen mensual** | Rentabilidad completa, comparativa con mes anterior | Dia 1 |
| **Rendimiento por empleado** | Volumen, operaciones, actividad de cada empleado | Bajo demanda |
| **Rendimiento por punto** | Tindouf vs Aaioun, que punto rinde mas | Bajo demanda |
| **Deudas pendientes** | Todos los clientes que deben | Bajo demanda |
| **Flujo de caja** | Entrada y salida de cada divisa | Tiempo real |
| **Historico de tasas** | Evolucion de las tasas en el tiempo | Bajo demanda |

Todos los reportes pueden:
- Verse en la app
- Recibirse como resumen por WhatsApp (automatico)
- Exportarse a PDF o Excel

### 8.6 Sistema de Notificaciones

| Notificacion | Quien recibe | Cuando |
|---|---|---|
| Nueva operacion realizada | JEFE | Cada operacion de cualquier empleado |
| Solicitud de aprobacion | JEFE | Operacion grande de un empleado |
| Nueva tasa aplicada | EMPLEADOS | El jefe cambia tasas |
| Caja baja | JEFE | Un empleado tiene poca divisa |
| Deuda pendiente antigua | JEFE | Deuda > X dias |
| Resumen del dia | JEFE | Cada noche automatico |
| Cierre de caja solicitado | EMPLEADOS | El jefe pide cierre |
| Transferencia ordenada | EMPLEADOS | El jefe ordena transferencia |
| Operacion aprobada/rechazada | EMPLEADO | Respuesta a su solicitud |
| Empleado inactivo | JEFE | Empleado sin operar > X horas |

### 8.7 Automatizaciones

| Automatizacion | Descripcion |
|---|---|
| Auto-calculo | Todo calculo es automatico, cero error humano |
| Auto-registro | Cada operacion se registra sola |
| Auto-caja | La caja se actualiza sola |
| Auto-tasa | Las tasas llegan solas a los empleados |
| Auto-cierre | Cierre de caja automatico a las 22:00 |
| Auto-backup | Backup cada noche a la nube |
| Auto-alerta | Alertas de caja baja, deudas antiguas, inactividad |
| Auto-reporte | Resumen diario/semanal/mensual generado solo |
| Auto-resumen WhatsApp | El jefe recibe resumen por WhatsApp sin hacer nada |

---

## 9. DIVISAS SOPORTADAS

### 9.1 Divisas Principales (Activas por defecto)

| Divisa | Codigo | Pais/Region | Uso en el Negocio |
|---|---|---|---|
| Euro | EUR | Europa | Principal - Recibidos de emigrantes, comercio |
| Dinar Argelino | DZD | Argelia | Principal - Moneda local, la que tienen los empleados |
| Uguiya Mauritana | MRU | Mauritania | Alta frecuencia - Comercio fronterizo |
| Franco CFA Occidental | XOF | Senegal, Mali, etc. | Frecuente - Comercio Africa Occidental |

### 9.2 Divisas Secundarias (Activables por el Jefe)

| Divisa | Codigo | Pais |
|---|---|---|
| Dirham Marroqui | MAD | Marruecos |
| Dolar Americano | USD | Internacional |
| Libra Esterlina | GBP | Reino Unido |
| Dinar Tunecino | TND | Tunez |
| Dinar Libio | LYD | Libia |
| Franco CFA Central | XAF | Africa Central |

### 9.3 Pares Pre-configurados

```
PARES PRINCIPALES (los mas usados):
  EUR <-> DZD    (el mas comun)
  EUR <-> MRU
  EUR <-> XOF
  DZD <-> MRU
  DZD <-> XOF
  MRU <-> XOF

El jefe puede activar mas pares en cualquier momento.
```

---

## 10. MODO OFFLINE Y CONECTIVIDAD

### 10.1 Realidad de la Conectividad en la Zona

La conectividad en Tindouf y especialmente en los campamentos de Aaioun es **limitada e intermitente**. El sistema TIENE que funcionar sin internet.

### 10.2 Que Funciona SIN Internet (TODO lo Importante)

| Funcion | Sin Internet | Con Internet |
|---|---|---|
| Hacer operaciones de cambio | SI | SI |
| Calcular conversiones | SI | SI |
| Ver y gestionar caja | SI | SI |
| Buscar clientes | SI | SI |
| Registrar movimientos de caja | SI | SI |
| Ver historial de operaciones | SI | SI |
| Ver tasas actuales | SI (ultima recibida) | SI (actualizada) |

### 10.3 Que Necesita Internet (Se Hace Cuando Hay)

| Funcion | Sin Internet | Con Internet |
|---|---|---|
| Jefe recibe notificacion en tiempo real | Acumuladas, llegan al conectar | SI, al instante |
| Jefe cambia tasas y llegan a empleados | Se aplican al conectar | SI, al instante |
| Sincronizar operaciones entre todos | Se acumulan localmente | SI, automatico |
| Backup en la nube | Pendiente | SI, automatico |
| Tasas de referencia del mercado | Ultima conocida | SI, actualizadas |
| Resumen por WhatsApp | Pendiente | SI |

### 10.4 Como Funciona la Sincronizacion

```
ESCENARIO: Ahmed opera todo el dia sin internet en Aaioun

  09:00 - Ahmed abre app. Tasas de ayer (las tiene guardadas).
  09:15 - Hace operacion: 500 EUR -> DZD. Se guarda LOCAL.
  10:30 - Hace operacion: 200 EUR -> MRU. Se guarda LOCAL.
  11:00 - Hace 3 operaciones mas. Se guardan LOCAL.
  
  (Ahmed tiene 5 operaciones guardadas localmente)
  
  12:00 - Ahmed sale a una zona con cobertura 3G
  
  AUTOMATICAMENTE (sin que Ahmed haga nada):
    -> Se suben las 5 operaciones al servidor
    -> Se descargan las nuevas tasas que el jefe puso por la manana
    -> Se descarga cualquier transferencia ordenada
    -> Se hace backup
    -> Las futuras operaciones usan las tasas nuevas
  
  El jefe ve las 5 operaciones de Ahmed aparecer de golpe.
  Todo cuadra. Nada se pierde.
```

---

## 11. SEGURIDAD

### 11.1 Acceso a la App

| Medida | Jefe | Empleado |
|---|---|---|
| PIN de 6 digitos | SI | SI |
| Huella dactilar (si el movil lo tiene) | SI | SI |
| Bloqueo tras 5 intentos fallidos | SI | SI |
| Bloqueo automatico tras 5 min inactivo | SI | SI |

### 11.2 Proteccion de Datos

- **Todo cifrado** en el movil (nadie puede leer los datos sin el PIN)
- **Conexion cifrada** (TLS/SSL) entre la app y el servidor
- **Backups cifrados** en la nube
- **El jefe puede desactivar** a un empleado a distancia si pierde el movil
- **El jefe puede borrar datos** de un dispositivo a distancia

### 11.3 Auditoria

- **Cada operacion** queda registrada: quien, cuando, cuanto, a que tasa
- **Cada cambio de tasa** queda registrado
- **Cada movimiento de caja** queda registrado
- **Imposible borrar** registros (ni el empleado ni el jefe)
- **Exportable** para cualquier revision

---

## 12. TECNOLOGIA

### 12.1 Stack Tecnico

| Componente | Tecnologia | Por que |
|---|---|---|
| **App Movil** (Jefe y Empleados) | React Native (Android) | Funciona en moviles baratos, rapida |
| **Servidor** | Node.js + NestJS | Robusto, eficiente |
| **Base de Datos** (servidor) | PostgreSQL | Fiable, potente, gratuita |
| **Base de Datos** (movil) | SQLite + WatermelonDB | Funciona offline perfectamente |
| **Tiempo Real** | WebSockets | Notificaciones instantaneas |
| **Notificaciones** | Firebase Cloud Messaging | Gratuito, fiable |
| **WhatsApp** | API de WhatsApp Business | Resumenes automaticos |
| **Cache** | Redis | Velocidad extrema |
| **Hosting** | VPS (Hetzner/DigitalOcean) | Economico, fiable |

### 12.2 Infraestructura Necesaria

| Componente | Coste Mensual |
|---|---|
| Servidor VPS (2 CPU, 4GB RAM) | ~12 EUR/mes |
| Dominio (.com) | ~1 EUR/mes (12 EUR/ano) |
| SSL (Let's Encrypt) | GRATIS |
| Backup en la nube (50GB) | ~3 EUR/mes |
| Firebase (notificaciones) | GRATIS |
| API Tasas de mercado | GRATIS (plan basico) |
| WhatsApp Business API | ~10 EUR/mes (opcional) |
| **TOTAL** | **~26 EUR/mes** |

### 12.3 Requisitos de Dispositivos

| | Minimo | Recomendado |
|---|---|---|
| Sistema | Android 8.0+ | Android 12+ |
| RAM | 2 GB | 4 GB |
| Almacenamiento libre | 200 MB | 1 GB |
| Pantalla | 5 pulgadas | 6 pulgadas |
| Internet | NO obligatorio | 3G/4G para sincronizar |

> Los moviles mas baratos del mercado sirven perfectamente.

### 12.4 Idiomas

| Idioma | Soporte | Para |
|---|---|---|
| Arabe (ar) | Completo (RTL) | Idioma principal |
| Frances (fr) | Completo | Alternativo |
| Espanol (es) | Disponible | Opcional |

---

## 13. PLAN DE IMPLEMENTACION

### 13.1 Resumen: 10 Semanas

```
Semana  1  2  3  4  5  6  7  8  9  10
FASE 1  [========]                         Base del sistema
FASE 2           [===========]             App del Empleado
FASE 3                       [========]   App del Jefe
FASE 4                               [====] Pulir y lanzar
```

### 13.2 Fase 1: Cimientos (Semanas 1-3)

**Resultado**: El motor del sistema funcionando.

| Semana | Que se hace |
|---|---|
| S1 | Base de datos, servidor, arquitectura, autenticacion |
| S2 | Motor de cambio (conversion, tasas), gestion de caja |
| S3 | Gestion de empleados/puntos, sincronizacion offline |

### 13.3 Fase 2: App del Empleado (Semanas 4-6)

**Resultado**: Los empleados pueden operar desde la app.

| Semana | Que se hace |
|---|---|
| S4 | Pantallas del empleado: login, home, nueva operacion |
| S5 | Flujo completo de cambio (3 toques), gestion de caja |
| S6 | Modo offline completo, clientes, sincronizacion |

**PRIMERA DEMO** al final de la semana 6: se puede probar la app del empleado.

### 13.4 Fase 3: App del Jefe (Semanas 7-9)

**Resultado**: El jefe tiene control total.

| Semana | Que se hace |
|---|---|
| S7 | Dashboard del jefe, vision de todos los empleados/cajas |
| S8 | Gestion de tasas centralizada, aprobacion de operaciones |
| S9 | Reportes, cierre de caja, transferencias, alertas |

**SEGUNDA DEMO** al final de la semana 9: sistema completo funcionando.

### 13.5 Fase 4: Lanzamiento (Semana 10)

| Dia | Que se hace |
|---|---|
| Lun | Despliegue en servidor de produccion |
| Mar | Instalacion en moviles (jefe + empleados) |
| Mie | Configuracion inicial: tasas, divisas, empleados, puntos |
| Jue | Formacion al jefe (1 hora) + Formacion a empleados (30 min) |
| Vie | Primer dia de uso real supervisado |

### 13.6 Entregables

| Fase | Entregable |
|---|---|
| Fase 1 | API funcionando, base de datos lista |
| Fase 2 | App del empleado instalable y funcional |
| Fase 3 | App del jefe con todo el control |
| Fase 4 | Sistema en produccion, todo el mundo formado |

---

## 14. PRESUPUESTO Y OPCIONES

### 14.1 Opcion A: SARAF ELITE - Sistema Completo

**Todo lo descrito en este documento. Sin recortes.**

| Concepto | Precio |
|---|---|
| App del Jefe (Android) con todas las funciones | Incluido |
| App del Empleado (Android) ultra-simplificada | Incluido |
| Backend completo (servidor, API, base de datos) | Incluido |
| Modo offline total con sincronizacion | Incluido |
| Gestion de tasas centralizada con propagacion | Incluido |
| Gestion de caja por empleado en tiempo real | Incluido |
| Sistema de aprobacion de operaciones grandes | Incluido |
| Gestion de clientes y deudas | Incluido |
| Reportes automaticos (diario/semanal/mensual) | Incluido |
| Transferencias entre empleados | Incluido |
| Notificaciones push | Incluido |
| Resumen diario por WhatsApp | Incluido |
| Soporte arabe (RTL) + frances | Incluido |
| Cierre de caja automatico | Incluido |
| Panel web (dashboard avanzado) | Incluido |
| 3 meses de soporte post-lanzamiento | Incluido |
| Formacion (jefe + empleados) | Incluido |
| Codigo fuente entregado | Incluido |
| **PRECIO TOTAL** | **12,000 EUR** |

### 14.2 Opcion B: SARAF ELITE - Sin Panel Web

**Todo igual pero sin el panel web (solo apps moviles).**

| Concepto | Precio |
|---|---|
| Todo lo de la Opcion A | Incluido |
| Panel web | NO incluido |
| **PRECIO TOTAL** | **9,000 EUR** |

### 14.3 Opcion C: SARAF BASICO - MVP para Empezar

**Lo esencial para digitalizar el negocio. Se puede ampliar despues.**

| Incluido | NO Incluido (se anade despues) |
|---|---|
| App Jefe (basica) | Panel web |
| App Empleado (flujo de cambio) | Reportes avanzados |
| Tasas centralizadas | Resumen por WhatsApp |
| Caja por empleado | Sistema de aprobacion |
| Operaciones de cambio | Gestion de clientes avanzada |
| Modo offline | Transferencias entre empleados |
| Sincronizacion | Automatizaciones |
| Arabe + frances | Cierre de caja automatico |
| **PRECIO TOTAL** | **5,500 EUR** |

### 14.4 Comparativa Visual

```
                         OPCION A       OPCION B       OPCION C
                         ELITE          ELITE SIN WEB  BASICO
                         
Precio                   12,000 EUR     9,000 EUR      5,500 EUR
Plazo                    10 semanas     9 semanas      6 semanas

App Jefe completa        SI             SI             BASICA
App Empleado             SI             SI             SI
Panel Web                SI             NO             NO
Modo Offline             SI             SI             SI
Tasas centralizadas      SI             SI             SI
Caja por empleado        SI             SI             SI
Aprobacion operaciones   SI             SI             NO
Clientes y deudas        AVANZADO       AVANZADO       BASICO
Reportes                 AVANZADOS      AVANZADOS      BASICOS
WhatsApp automatico      SI             SI             NO
Transferencias           SI             SI             NO
Cierre automatico        SI             SI             NO
Arabe + Frances          SI             SI             SI
Panel web reportes       SI             NO             NO

RECOMENDACION:           IDEAL          MUY BUENA      PARA EMPEZAR
```

### 14.5 Costes Mensuales (Despues del Desarrollo)

| Concepto | Coste |
|---|---|
| Servidor + infraestructura | ~26 EUR/mes |
| Mantenimiento (opcional) | 50-150 EUR/mes |
| **Total minimo** | **~26 EUR/mes** |

> **26 EUR/mes** es lo que cuesta mantener el sistema funcionando. Menos de lo que gastas en credito de telefono.

### 14.6 Forma de Pago

```
OPCION A (12,000 EUR) - 4 pagos:
  1. Inicio:           3,600 EUR (30%)
  2. Demo empleado:    3,000 EUR (25%)  <- Semana 6
  3. Demo jefe:        3,000 EUR (25%)  <- Semana 9
  4. Lanzamiento:      2,400 EUR (20%)  <- Semana 10

OPCION B (9,000 EUR) - 3 pagos:
  1. Inicio:           2,700 EUR (30%)
  2. Demo:             3,150 EUR (35%)  <- Semana 6
  3. Lanzamiento:      3,150 EUR (35%)  <- Semana 9

OPCION C (5,500 EUR) - 2 pagos:
  1. Inicio:           2,200 EUR (40%)
  2. Lanzamiento:      3,300 EUR (60%)  <- Semana 6

Metodos de pago:
  - Transferencia bancaria
  - Western Union / MoneyGram
  - CCP (Argelia)
  - Efectivo
```

### 14.7 Retorno de Inversion

```
PERDIDAS ACTUALES ESTIMADAS:     ~750 EUR/mes (errores, olvidos, tiempo)
COSTE DEL SISTEMA (Opcion A):    12,000 EUR
COSTE MENSUAL:                   26 EUR/mes

RECUPERACION DE LA INVERSION:    12,000 / (750 - 26) = 16.6 meses

A PARTIR DEL MES 17:  Todo es ganancia neta.

EN 3 ANOS:
  Ahorro total:  750 x 36 = 27,000 EUR
  Coste total:   12,000 + (26 x 36) = 12,936 EUR
  BENEFICIO NETO: +14,064 EUR
```

---

## 15. SOPORTE Y GARANTIA

### 15.1 Incluido en el Precio

| Servicio | Duracion |
|---|---|
| Correccion de cualquier error/bug | 6 meses |
| Soporte tecnico (WhatsApp/llamada) | 3 meses |
| Actualizaciones menores | 3 meses |
| Formacion al jefe (1 sesion de 1 hora) | Incluida |
| Formacion a empleados (1 sesion de 30 min) | Incluida |
| Codigo fuente completo | Entregado al 100% |
| Manual de uso | Incluido |
| Video-tutorial | Incluido |

### 15.2 Mantenimiento Opcional (Despues de los 3 Meses)

| Plan | Mensual | Incluye |
|---|---|---|
| Basico | 50 EUR/mes | Hosting + bugs + 2h soporte |
| Pro | 100 EUR/mes | Basico + mejoras menores + 5h soporte |
| Premium | 150 EUR/mes | Pro + nuevas funciones + soporte ilimitado |

### 15.3 Garantias

- **El codigo es tuyo**: Te lo entrego completo. Es de tu propiedad.
- **Sin dependencia**: El sistema puede funcionar sin mi.
- **Garantia de bugs**: 6 meses de correccion gratuita.
- **Garantia de satisfaccion**: Si al ver la primera demo (Semana 6) no te convence, se reembolsa el 50% de lo pagado.
- **Confidencialidad total**: Tus datos, tu negocio, tu informacion. Nadie mas tiene acceso.

---

## PROXIMOS PASOS

```
1. Eliges la opcion que prefieres (A, B o C)

2. Nos reunimos (llamada/video/presencial) para:
   - Confirmar las divisas y pares exactos
   - Definir los puntos (Tindouf, Aaioun, otros?)
   - Definir cuantos empleados
   - Definir limites de operacion
   - Definir tasas iniciales
   - Resolver cualquier duda

3. Firmamos el acuerdo

4. Primer pago

5. Empezamos a construir tu sistema

TIEMPO HASTA TENER EL SISTEMA FUNCIONANDO: 10 SEMANAS
```

---

> **SARAF ELITE** - Tu controlas. Tus empleados operan. El sistema hace el resto.

---

*Propuesta preparada exclusivamente para el operador de cambio en Tindouf, Argelia.*  
*Todos los precios son negociables. Lo importante es construir la mejor herramienta para tu negocio.*  
*Febrero 2026*
