# PROPUESTA DE PROYECTO: SISTEMA ELITE DE CAMBIO DE MONEDA

## "SarafPro" - Sistema Integral de Gestión de Cambio de Divisas

---

**Documento:** Propuesta Ejecutiva de Proyecto  
**Versión:** 1.0  
**Fecha:** Febrero 2026  
**Ubicación del cliente:** Tindouf, Argelia  
**Clasificación:** Confidencial  

---

## 1. RESUMEN EJECUTIVO

### 1.1 Contexto

Tindouf, situada en el suroeste de Argelia, es un enclave estratégico de actividad económica transfronteriza que conecta el Magreb con el África Occidental. Los operadores de cambio de moneda de esta región desempeñan un papel fundamental en la facilitación del comercio y las transferencias financieras entre múltiples países y monedas.

El cliente es un cambiador de moneda de reconocido prestigio en la zona de Tindouf, con amplia experiencia en operaciones de cambio multidivisa. Su actividad principal involucra el manejo diario de las siguientes divisas:

| Moneda | Código ISO | País/Zona |
|--------|-----------|-----------|
| Euro | EUR | Zona Euro |
| Dinar argelino | DZD | Argelia |
| Uguiya mauritana | MRU | Mauritania |
| Franco CFA de África Occidental | XOF | Senegal, Malí, etc. |
| Dirham marroquí | MAD | Marruecos |
| Dólar estadounidense | USD | Internacional |
| Libra esterlina | GBP | Reino Unido |

### 1.2 Problemática Actual

Los cambiadores de moneda en la región enfrentan desafíos operativos significativos:

- **Gestión manual de tasas:** Las tasas de cambio se actualizan verbalmente o en cuadernos, lo que genera errores y pérdida de tiempo.
- **Cálculos complejos:** Operaciones cruzadas entre múltiples monedas requieren cálculos mentales rápidos con riesgo de error.
- **Falta de trazabilidad:** Sin registro digital de operaciones, es imposible generar informes, detectar tendencias o auditar.
- **Gestión de caja deficiente:** Control de stocks de cada moneda de forma manual, sin alertas de niveles bajos.
- **Comunicación con clientes:** Los clientes habituales llaman repetidamente para consultar tasas; no hay canal automatizado.
- **Análisis de rentabilidad:** No hay visibilidad clara sobre márgenes de beneficio por moneda ni por período.
- **Riesgo operativo:** La dependencia del conocimiento mental del operador crea vulnerabilidad al negocio.

### 1.3 Solución Propuesta

**SarafPro** (del árabe "صراف" - Cambista) es un sistema integral de gestión de cambio de divisas diseñado específicamente para operadores de cambio en mercados informales y semi-formales del Norte y Oeste de África. 

El sistema proporcionará:

- Automatización completa de cálculos de cambio con tasas personalizables
- Gestión de inventario multidivisa en tiempo real
- Registro automático de todas las transacciones
- Panel de control con analytics avanzados
- Sistema de notificación a clientes por WhatsApp/SMS
- Funcionamiento offline con sincronización automática
- Interfaz multilingüe (árabe, francés, español, hassanía)
- Acceso desde móvil y tablet con diseño responsive

### 1.4 Propuesta de Valor

| Aspecto | Situación Actual | Con SarafPro |
|---------|-----------------|--------------|
| Tiempo por operación | 2-5 minutos | 10-15 segundos |
| Errores de cálculo | Frecuentes | Eliminados |
| Consulta de tasas | Llamada telefónica | Automático (WhatsApp/Web) |
| Control de caja | Manual (cuaderno) | Tiempo real, automatizado |
| Informes de rentabilidad | Inexistentes | Automáticos (diario/semanal/mensual) |
| Historial de operaciones | Limitado | Completo e ilimitado |
| Atención a clientes | Individual | Masiva y personalizada |

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1 Objetivo General

Diseñar, desarrollar e implementar un sistema digital de elite para la gestión integral de operaciones de cambio de moneda, optimizado para el contexto operativo de Tindouf y la región del Sahel.

### 2.2 Objetivos Específicos

1. **Automatización total de operaciones de cambio:** Reducir el tiempo de cada transacción a menos de 15 segundos con cálculos automáticos y precisos.

2. **Gestión de inventario multidivisa:** Controlar en tiempo real el stock de cada moneda con alertas inteligentes y predicción de necesidades.

3. **Trazabilidad completa:** Registrar cada operación con marca temporal, monedas involucradas, tasa aplicada, cliente y operador.

4. **Análisis de negocio:** Proveer dashboards analíticos que muestren rentabilidad por moneda, volumen de operaciones, tendencias y proyecciones.

5. **Gestión de clientes:** Mantener una base de datos de clientes frecuentes con historial, preferencias y canal de comunicación directo.

6. **Resiliencia operativa:** Garantizar funcionamiento continuo incluso sin conexión a internet, con sincronización automática al recuperar conectividad.

7. **Escalabilidad:** Diseñar el sistema para soportar crecimiento futuro (múltiples puntos de cambio, nuevos operadores, más monedas).

---

## 3. ALCANCE DEL PROYECTO

### 3.1 Incluido en el Alcance

#### Módulo 1: Motor de Cambio de Divisas
- Calculadora de cambio multidivisa instantánea
- Gestión de tasas de compra/venta con spreads configurables
- Tasas cruzadas automáticas (ej: MRU a EUR pasando por DZD)
- Historial completo de tasas
- Importación automática de tasas de referencia del mercado

#### Módulo 2: Gestión de Transacciones
- Registro rápido de operaciones (compra/venta)
- Operaciones múltiples en una sola sesión
- Anulación y corrección de operaciones
- Recibos digitales (PDF/imagen) generados automáticamente
- Búsqueda y filtrado avanzado de transacciones

#### Módulo 3: Gestión de Caja e Inventario
- Dashboard de stock por moneda en tiempo real
- Alertas de nivel bajo/alto por moneda
- Registro de entradas/salidas no relacionadas con cambio
- Cuadre de caja diario automatizado
- Proyección de necesidades de stock

#### Módulo 4: Gestión de Clientes (CRM)
- Ficha de cliente con datos esenciales
- Historial completo de operaciones por cliente
- Clasificación de clientes (VIP, frecuente, nuevo)
- Tasas preferenciales por cliente
- Canal de comunicación integrado (WhatsApp Business API / SMS)

#### Módulo 5: Analytics y Reporting
- Dashboard principal con KPIs en tiempo real
- Informes de rentabilidad (diario, semanal, mensual, anual)
- Análisis de volumen por moneda y por período
- Gráficos de tendencias de tasas
- Exportación de informes (PDF, Excel)
- Alertas inteligentes basadas en patrones

#### Módulo 6: Sistema de Notificaciones
- Difusión de tasas actuales a clientes por WhatsApp
- Alertas de stock bajo al operador
- Notificaciones de operaciones grandes
- Resumen diario automático
- Alertas de variación significativa de tasas del mercado

#### Módulo 7: Administración y Seguridad
- Gestión de usuarios y roles
- Autenticación biométrica (huella dactilar) y PIN
- Logs de auditoría completos
- Backup automático encriptado
- Configuración del sistema

### 3.2 Fuera del Alcance (Fase 1)
- Integración con bancos o sistemas financieros formales
- Transferencias internacionales de dinero
- Gestión tributaria o fiscal
- Operaciones con criptomonedas
- Trading algorítmico

---

## 4. PÚBLICO OBJETIVO Y USUARIOS

### 4.1 Usuarios Primarios

| Rol | Descripción | Nivel de Acceso |
|-----|------------|-----------------|
| **Propietario** | El cambiador principal, control total | Administrador |
| **Operador** | Empleados que realizan operaciones | Operador |
| **Gestor** | Encargado de reportes y análisis | Lectura + Reportes |

### 4.2 Usuarios Externos

| Rol | Descripción | Canal |
|-----|------------|-------|
| **Cliente frecuente** | Consulta tasas y recibe notificaciones | WhatsApp / Web |
| **Cliente ocasional** | Recibe recibo digital | WhatsApp |

---

## 5. REQUISITOS NO FUNCIONALES

### 5.1 Rendimiento
- Tiempo de respuesta de cálculo de cambio: < 100ms
- Carga del dashboard: < 2 segundos
- Soporte para 1000+ transacciones diarias
- Funcionamiento fluido en dispositivos de gama media

### 5.2 Disponibilidad
- Funcionamiento offline completo para operaciones core
- Sincronización automática al recuperar conectividad
- Disponibilidad del sistema: 99.5%

### 5.3 Seguridad
- Encriptación de datos en reposo y en tránsito (AES-256 / TLS 1.3)
- Autenticación multifactor
- Respaldo automático cada 6 horas
- Cumplimiento con mejores prácticas de protección de datos

### 5.4 Usabilidad
- Interfaz intuitiva operable sin formación técnica
- Soporte multilingüe: Árabe (principal), Francés, Español, Hassanía
- Diseño RTL (derecha a izquierda) nativo para árabe
- Tamaño de fuente y botones optimizados para uso rápido
- Modo oscuro/claro

### 5.5 Compatibilidad
- Android 8.0+ (aplicación nativa)
- iOS 14+ (aplicación nativa)
- Navegadores web modernos (Chrome, Firefox, Safari)
- Tablets y smartphones de 5" a 12"

---

## 6. MONEDAS SOPORTADAS

### 6.1 Monedas Principales (Prioridad 1)

| # | Moneda | Código | Símbolo | Subdivisión | País Principal |
|---|--------|--------|---------|-------------|----------------|
| 1 | Euro | EUR | € | Céntimo (1/100) | Zona Euro |
| 2 | Dinar argelino | DZD | د.ج | Céntimo (1/100) | Argelia |
| 3 | Uguiya mauritana | MRU | أ.م | Khoum (1/5) | Mauritania |
| 4 | Franco CFA Occidental | XOF | CFA | Céntimo (1/100) | Senegal, Malí |
| 5 | Dirham marroquí | MAD | د.م | Céntimo (1/100) | Marruecos |

### 6.2 Monedas Secundarias (Prioridad 2)

| # | Moneda | Código | País Principal |
|---|--------|--------|----------------|
| 6 | Dólar estadounidense | USD | Internacional |
| 7 | Libra esterlina | GBP | Reino Unido |
| 8 | Dinar tunecino | TND | Túnez |
| 9 | Dinar libio | LYD | Libia |
| 10 | Franco CFA Central | XAF | Camerún, Chad |

### 6.3 Configuración de Monedas
- El sistema permitirá añadir monedas adicionales sin desarrollo nuevo
- Cada moneda tendrá tasa de compra, tasa de venta y spread configurable
- Soporte para tasas cruzadas automáticas a través de una moneda base (EUR o DZD)

---

## 7. FLUJOS DE TRABAJO PRINCIPALES

### 7.1 Flujo: Operación de Cambio Rápida

```
[Cliente solicita cambio]
        ↓
[Operador abre SarafPro]
        ↓
[Selecciona moneda origen → moneda destino]
        ↓
[Introduce cantidad]
        ↓
[Sistema calcula automáticamente con tasa vigente]
        ↓
[Operador confirma (1 toque)]
        ↓
[Sistema registra operación + actualiza inventario]
        ↓
[Genera recibo digital → envía por WhatsApp]
        ↓
[Operación completada en < 15 segundos]
```

### 7.2 Flujo: Actualización de Tasas

```
[Propietario accede a panel de tasas]
        ↓
[Visualiza tasas actuales + tasas de referencia del mercado]
        ↓
[Modifica tasas (individual o masiva)]
        ↓
[Sistema recalcula todas las tasas cruzadas automáticamente]
        ↓
[Opción: difundir nuevas tasas a clientes por WhatsApp]
```

### 7.3 Flujo: Cierre de Caja Diario

```
[Fin del día → Operador inicia cierre]
        ↓
[Sistema muestra resumen automático:
 - Operaciones del día
 - Stock teórico por moneda
 - Beneficio estimado]
        ↓
[Operador confirma conteo físico por moneda]
        ↓
[Sistema detecta y reporta diferencias]
        ↓
[Se genera informe diario (PDF)]
        ↓
[Backup automático del día]
```

---

## 8. DIFERENCIADORES CLAVE DE SARAFPRO

### 8.1 Diseñado para el Contexto Real

A diferencia de software genérico de cambio de moneda, SarafPro está diseñado específicamente para:

- **Mercados informales del Sahel:** Entiende la dinámica de tasas paralelas y mercado negro
- **Conectividad limitada:** Funciona al 100% sin internet
- **Multilingüe real:** Árabe dialectal, Hassanía, Francés como lenguas de interfaz
- **Operación con una mano:** Interfaz diseñada para operar con el teléfono en una mano mientras la otra cuenta billetes
- **Velocidad extrema:** Cada operación optimizada para mínimos toques de pantalla

### 8.2 Inteligencia de Negocio

- **Predicción de demanda:** El sistema aprende patrones de demanda por moneda y día de la semana
- **Alertas de mercado:** Monitoriza tasas internacionales y alerta sobre movimientos significativos
- **Análisis de rentabilidad:** Muestra en tiempo real cuánto se gana por cada moneda y operación
- **Detección de anomalías:** Identifica operaciones inusuales para prevenir errores o fraude

### 8.3 Comunicación con Clientes

- **Difusión masiva de tasas:** Un solo botón para enviar tasas actualizadas a todos los clientes frecuentes por WhatsApp
- **Consulta automática:** Los clientes pueden enviar un mensaje al WhatsApp Business y recibir tasas actualizadas automáticamente (chatbot)
- **Recibos profesionales:** Cada operación genera un recibo con marca de agua, número único y QR de verificación

---

## 9. INDICADORES DE ÉXITO (KPIs)

| Indicador | Valor Objetivo | Medición |
|-----------|---------------|----------|
| Tiempo medio por operación | < 15 segundos | Automático |
| Errores de cálculo | 0% | Automático |
| Adopción del sistema | 100% operaciones registradas en 30 días | Manual |
| Satisfacción del operador | > 9/10 | Encuesta |
| Disponibilidad del sistema | > 99.5% | Automático |
| Clientes en canal WhatsApp | +50 en primer mes | Automático |
| Reducción de diferencias de caja | > 90% | Comparativo |

---

## 10. RIESGOS Y MITIGACIÓN

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | Resistencia al cambio del operador | Media | Alto | Formación personalizada, período de uso paralelo |
| 2 | Cortes de electricidad frecuentes | Alta | Medio | App móvil con batería, modo ultra-bajo consumo |
| 3 | Conectividad a internet limitada | Alta | Medio | Modo offline completo con sync inteligente |
| 4 | Pérdida de dispositivo | Media | Alto | Backup en nube + restauración rápida |
| 5 | Cambios regulatorios | Baja | Alto | Arquitectura flexible, actualizaciones remotas |
| 6 | Crecimiento rápido del negocio | Media | Bajo | Arquitectura escalable desde el diseño |

---

## 11. PRÓXIMOS PASOS

1. **Revisión de la propuesta** con el cliente para validar requisitos
2. **Aprobación del presupuesto** y firma del acuerdo
3. **Fase de descubrimiento** (2 semanas): Observación en sitio del flujo de trabajo real
4. **Inicio del desarrollo** según plan de implementación
5. **Pruebas piloto** con operaciones reales (controladas)
6. **Despliegue completo** y formación

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro. Consulte los documentos adjuntos para detalles sobre arquitectura técnica, funcionalidades, modelo de datos, plan de implementación y seguridad.*

---

**Documentos complementarios:**
- [Arquitectura Técnica](ARQUITECTURA_TECNICA.md)
- [Funcionalidades Detalladas](FUNCIONALIDADES.md)
- [Modelo de Datos](MODELO_DATOS.md)
- [Plan de Implementación y Presupuesto](PLAN_IMPLEMENTACION.md)
- [Seguridad y Cumplimiento](SEGURIDAD_CUMPLIMIENTO.md)
