# FUNCIONALIDADES DETALLADAS - SarafPro

## Sistema Elite de Cambio de Moneda

---

**Documento:** Especificación Funcional Completa  
**Versión:** 1.0  
**Fecha:** Febrero 2026  

---

## MÓDULO 1: MOTOR DE CAMBIO DE DIVISAS

### 1.1 Calculadora de Cambio Instantánea

**Descripción:** El corazón del sistema. Permite realizar cálculos de cambio entre cualquier par de monedas en milisegundos.

**Funcionalidades:**

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 1.1.1 | Cambio directo | Seleccionar moneda origen, moneda destino, introducir cantidad → resultado instantáneo | CRÍTICA |
| 1.1.2 | Cambio inverso | Introducir la cantidad deseada en moneda destino → calcula la cantidad de origen necesaria | CRÍTICA |
| 1.1.3 | Cambio cruzado | Cambio entre dos monedas que no tienen tasa directa (ej: MRU→XOF vía EUR) | ALTA |
| 1.1.4 | Vista previa de beneficio | Muestra en tiempo real el beneficio del operador en la operación | ALTA |
| 1.1.5 | Historial de la sesión | Últimas operaciones del día visibles sin navegar | MEDIA |
| 1.1.6 | Favoritos de cambio | Pares de monedas más usados como accesos directos | MEDIA |
| 1.1.7 | Modo multi-operación | Procesar varios cambios en una sola sesión (mismo cliente) | ALTA |
| 1.1.8 | Redondeo configurable | Redondeo automático según reglas por moneda (ej: DZD sin decimales) | ALTA |

**Reglas de negocio:**
- El sistema siempre usa la tasa de compra/venta establecida por el operador, NO la tasa del mercado
- Las tasas cruzadas se calculan automáticamente cuando no hay tasa directa definida
- El redondeo se configura por moneda (DZD: sin decimales, EUR: 2 decimales, MRU: 1 decimal)
- Toda operación se registra en el log con la tasa exacta usada en el momento

### 1.2 Gestión de Tasas de Cambio

**Descripción:** Pantalla dedicada para configurar y actualizar las tasas de compra/venta de cada moneda.

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 1.2.1 | Panel de tasas | Vista de todas las tasas activas en formato tabla/tarjeta | CRÍTICA |
| 1.2.2 | Edición rápida | Modificar tasa de compra/venta con un solo toque | CRÍTICA |
| 1.2.3 | Tasa de referencia | Ver la tasa del mercado internacional junto a la tasa del operador | ALTA |
| 1.2.4 | Diferencia porcentual | Mostrar la diferencia (%) entre tasa del operador y mercado | ALTA |
| 1.2.5 | Actualización masiva | Actualizar múltiples tasas aplicando un ajuste porcentual | MEDIA |
| 1.2.6 | Historial de tasas | Gráfico de evolución de cada tasa en el tiempo | MEDIA |
| 1.2.7 | Tasas programadas | Programar cambio de tasas para una hora específica | BAJA |
| 1.2.8 | Alerta de desfase | Aviso cuando la tasa del operador difiere >X% del mercado | ALTA |
| 1.2.9 | Moneda base configurable | Elegir la moneda base (EUR o DZD) para expresar todas las tasas | ALTA |
| 1.2.10 | Importación de tasas | Importar tasas desde otra fuente (archivo, API) | BAJA |

**Reglas de negocio:**
- Cada par de monedas tiene dos tasas: compra y venta
- El spread (diferencia compra-venta) debe ser siempre positivo
- Las tasas se expresan siempre respecto a la moneda base elegida
- Cada cambio de tasa se registra con timestamp y usuario que lo realizó

### 1.3 Tasas Cruzadas Automáticas

**Descripción:** Cuando no se define una tasa directa entre dos monedas, el sistema calcula automáticamente la tasa cruzada.

**Ejemplo:**
```
Si: 1 EUR = 237.50 DZD (compra)
Y:  1 EUR = 430 MRU (compra)

Entonces automáticamente:
1 MRU = 237.50 / 430 = 0.5523 DZD (compra)
1 DZD = 430 / 237.50 = 1.8105 MRU (compra)
```

**Configuración:**
- El operador elige qué moneda usar como puente (generalmente EUR)
- Puede sobreescribir cualquier tasa cruzada con una tasa directa personalizada
- Las tasas cruzadas se recalculan automáticamente cuando cambia cualquier tasa base

---

## MÓDULO 2: GESTIÓN DE TRANSACCIONES

### 2.1 Registro de Operaciones

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 2.1.1 | Registro rápido | Confirmar operación con un solo botón tras el cálculo | CRÍTICA |
| 2.1.2 | Asignar cliente | Vincular operación a un cliente registrado (opcional) | ALTA |
| 2.1.3 | Nota de operación | Añadir nota libre a la operación | MEDIA |
| 2.1.4 | Número de referencia | Número único auto-generado para cada operación | CRÍTICA |
| 2.1.5 | Tipo de operación | Clasificar: compra, venta, cambio cruzado | CRÍTICA |
| 2.1.6 | Operación sin registrar | Modo rápido solo cálculo (sin afectar inventario) | MEDIA |

### 2.2 Recibos Digitales

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 2.2.1 | Generación automática | Recibo PDF generado al confirmar operación | ALTA |
| 2.2.2 | Envío por WhatsApp | Enviar recibo al cliente por WhatsApp con un toque | ALTA |
| 2.2.3 | Diseño profesional | Recibo con logo, marca de agua, información clara | ALTA |
| 2.2.4 | QR de verificación | Código QR único para verificar autenticidad del recibo | MEDIA |
| 2.2.5 | Personalización | Logo, nombre del negocio, información de contacto | MEDIA |
| 2.2.6 | Idioma del recibo | Generar en árabe, francés o español según preferencia | ALTA |

**Contenido del recibo:**
```
┌──────────────────────────────────────┐
│          [LOGO SARAFPRO]             │
│     Nombre del Negocio / الصراف      │
│     Tindouf, Argelia                 │
│──────────────────────────────────────│
│  Recibo de Cambio / وصل صرف          │
│──────────────────────────────────────│
│  Nº: SRP-2026-001547                │
│  Fecha: 13/02/2026 14:35            │
│  Operador: Ahmed                     │
│──────────────────────────────────────│
│  Operación: COMPRA                   │
│                                      │
│  Entregado:  500.00 EUR             │
│  Tasa:       1 EUR = 237.50 DZD    │
│  Recibido:   118,750 DZD           │
│──────────────────────────────────────│
│  Cliente: Mohamed Ben Ali           │
│──────────────────────────────────────│
│           [QR CODE]                  │
│  Verificar en: verify.sarafpro.com  │
└──────────────────────────────────────┘
```

### 2.3 Historial y Búsqueda

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 2.3.1 | Lista de transacciones | Vista cronológica con filtros | CRÍTICA |
| 2.3.2 | Búsqueda avanzada | Por fecha, moneda, cliente, monto, referencia | ALTA |
| 2.3.3 | Filtros rápidos | Hoy, esta semana, este mes, por moneda | ALTA |
| 2.3.4 | Exportación | Exportar a Excel/CSV/PDF | MEDIA |
| 2.3.5 | Resumen por período | Totales por moneda en período seleccionado | ALTA |
| 2.3.6 | Anulación | Anular operación con motivo obligatorio | ALTA |
| 2.3.7 | Corrección | Modificar operación errónea (genera nueva versión) | ALTA |

### 2.4 Operaciones Especiales

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 2.4.1 | Operación diferida | Registrar operación que se completará más tarde | MEDIA |
| 2.4.2 | Operación fraccionada | Dividir una operación grande en varias entregas | MEDIA |
| 2.4.3 | Operación reservada | Cliente reserva una tasa para operar más tarde (con expiración) | BAJA |
| 2.4.4 | Operación grupal | Cambio para varios clientes en una sesión | BAJA |

---

## MÓDULO 3: GESTIÓN DE CAJA E INVENTARIO

### 3.1 Dashboard de Caja

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 3.1.1 | Stock por moneda | Vista en tiempo real del saldo de cada moneda | CRÍTICA |
| 3.1.2 | Valor total equivalente | Total de caja expresado en moneda base (EUR/DZD) | ALTA |
| 3.1.3 | Indicadores visuales | Colores: verde (bien), amarillo (bajo), rojo (crítico) | ALTA |
| 3.1.4 | Gráfico de distribución | Pie chart de distribución de caja por moneda | MEDIA |
| 3.1.5 | Tendencia diaria | Mini gráfico de evolución del stock por moneda | MEDIA |

### 3.2 Movimientos de Caja

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 3.2.1 | Entrada de efectivo | Registrar ingreso de efectivo (reposición de stock) | CRÍTICA |
| 3.2.2 | Salida de efectivo | Registrar retiro de efectivo | CRÍTICA |
| 3.2.3 | Ajuste de caja | Corregir discrepancia detectada en conteo | ALTA |
| 3.2.4 | Transferencia entre monedas | Mover stock conceptual entre monedas | MEDIA |
| 3.2.5 | Categorías de movimiento | Clasificar: reposición, gasto, retiro personal, préstamo | ALTA |
| 3.2.6 | Historial de movimientos | Log completo de todos los movimientos no-cambio | ALTA |

### 3.3 Alertas de Inventario

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 3.3.1 | Nivel mínimo configurable | Establecer mínimo por moneda | ALTA |
| 3.3.2 | Nivel máximo configurable | Establecer máximo por moneda (exceso de riesgo) | MEDIA |
| 3.3.3 | Alerta de nivel bajo | Notificación cuando stock baja del mínimo | ALTA |
| 3.3.4 | Alerta de nivel alto | Notificación cuando stock supera el máximo | MEDIA |
| 3.3.5 | Predicción de stock | Estimación de cuándo se agotará una moneda según tendencia | BAJA |

### 3.4 Cuadre de Caja

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 3.4.1 | Asistente de cierre | Guía paso a paso para el cierre diario | CRÍTICA |
| 3.4.2 | Conteo por moneda | Pantalla dedicada para introducir conteo real | CRÍTICA |
| 3.4.3 | Detección de diferencias | Comparación automática: teórico vs real | CRÍTICA |
| 3.4.4 | Informe de cierre | PDF con resumen completo del día | ALTA |
| 3.4.5 | Historial de cierres | Consultar cierres anteriores | ALTA |
| 3.4.6 | Aprobación del propietario | Cierre requiere confirmación del propietario | ALTA |

---

## MÓDULO 4: GESTIÓN DE CLIENTES (CRM)

### 4.1 Ficha de Cliente

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 4.1.1 | Datos básicos | Nombre, teléfono, notas | ALTA |
| 4.1.2 | Foto de perfil | Foto del cliente para reconocimiento rápido | MEDIA |
| 4.1.3 | Clasificación | VIP, Frecuente, Normal, Nuevo | ALTA |
| 4.1.4 | Monedas preferidas | Monedas que opera habitualmente | MEDIA |
| 4.1.5 | Tasa preferencial | Tasas especiales asignadas a clientes VIP | ALTA |
| 4.1.6 | Historial de operaciones | Todas las operaciones del cliente | ALTA |
| 4.1.7 | Volumen total operado | Suma total de cambios realizados | MEDIA |
| 4.1.8 | Última operación | Fecha y detalle de la última operación | MEDIA |
| 4.1.9 | Canal de contacto | WhatsApp, teléfono, otro | ALTA |
| 4.1.10 | Idioma preferido | Para comunicaciones y recibos | MEDIA |

### 4.2 Directorio de Clientes

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 4.2.1 | Lista de clientes | Vista ordenable y filtrable | ALTA |
| 4.2.2 | Búsqueda rápida | Buscar por nombre o teléfono | ALTA |
| 4.2.3 | Filtros | Por clasificación, moneda preferida, actividad | MEDIA |
| 4.2.4 | Ranking de clientes | Top clientes por volumen operado | MEDIA |
| 4.2.5 | Clientes inactivos | Identificar clientes que no operan hace tiempo | BAJA |
| 4.2.6 | Importación | Importar contactos del teléfono | MEDIA |

### 4.3 Comunicación con Clientes

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 4.3.1 | Difusión de tasas | Enviar tasas actuales a todos/selección de clientes | ALTA |
| 4.3.2 | Mensaje personalizado | Enviar mensaje individual a un cliente | MEDIA |
| 4.3.3 | Plantillas de mensaje | Mensajes predefinidos en múltiples idiomas | ALTA |
| 4.3.4 | Chatbot de tasas | Respuesta automática a consultas de tasas por WhatsApp | ALTA |
| 4.3.5 | Programar difusión | Enviar tasas automáticamente cada mañana a las 9:00 | MEDIA |
| 4.3.6 | Historial de mensajes | Log de mensajes enviados a cada cliente | MEDIA |

**Plantilla de difusión de tasas (ejemplo):**

```
🏦 SarafPro - Tasas de Hoy
📅 13/02/2026 - 09:00

💶 EUR/DZD
   Compra: 237.50 | Venta: 235.00

💶 EUR/MRU  
   Compra: 430.00 | Venta: 425.00

🇸🇳 EUR/XOF
   Compra: 658.00 | Venta: 655.00

🇲🇦 EUR/MAD
   Compra: 10.85 | Venta: 10.75

📞 Para operar: +213 XXX XXX XXX
📍 Tindouf

Responde "TASAS" para recibir tasas actualizadas
```

---

## MÓDULO 5: ANALYTICS Y REPORTING

### 5.1 Dashboard Principal

| # | Widget/KPI | Descripción | Prioridad |
|---|-----------|-------------|-----------|
| 5.1.1 | Operaciones hoy | Número de operaciones del día | CRÍTICA |
| 5.1.2 | Volumen hoy | Volumen total operado (en moneda base) | CRÍTICA |
| 5.1.3 | Beneficio hoy | Beneficio neto estimado del día | CRÍTICA |
| 5.1.4 | Operación más grande | Mayor operación del día | ALTA |
| 5.1.5 | Moneda más operada | Moneda con mayor volumen hoy | ALTA |
| 5.1.6 | Comparación con ayer | Variación porcentual de KPIs vs ayer | ALTA |
| 5.1.7 | Stock de caja | Resumen visual del inventario | CRÍTICA |
| 5.1.8 | Tendencia semanal | Mini gráfico de tendencia de la semana | MEDIA |

### 5.2 Informes de Rentabilidad

| # | Informe | Descripción | Prioridad |
|---|---------|-------------|-----------|
| 5.2.1 | P&L diario | Beneficio y pérdida del día, desglosado por moneda | CRÍTICA |
| 5.2.2 | P&L semanal | Resumen semanal con comparativa | ALTA |
| 5.2.3 | P&L mensual | Informe mensual completo | ALTA |
| 5.2.4 | P&L anual | Resumen anual con gráficos de tendencia | MEDIA |
| 5.2.5 | Rentabilidad por moneda | Qué monedas generan más beneficio | ALTA |
| 5.2.6 | Rentabilidad por cliente | Clientes más rentables | MEDIA |
| 5.2.7 | Análisis de spreads | Evolución de spreads y su impacto en el beneficio | MEDIA |

### 5.3 Informes de Volumen

| # | Informe | Descripción | Prioridad |
|---|---------|-------------|-----------|
| 5.3.1 | Volumen por moneda | Gráfico de barras de volumen por moneda | ALTA |
| 5.3.2 | Volumen por período | Evolución temporal del volumen de operaciones | ALTA |
| 5.3.3 | Distribución horaria | ¿A qué horas hay más operaciones? | MEDIA |
| 5.3.4 | Distribución por día | ¿Qué días de la semana son los más activos? | MEDIA |
| 5.3.5 | Top operaciones | Las mayores operaciones del período | MEDIA |
| 5.3.6 | Frecuencia de clientes | Distribución de operaciones por cliente | MEDIA |

### 5.4 Informes de Inventario

| # | Informe | Descripción | Prioridad |
|---|---------|-------------|-----------|
| 5.4.1 | Evolución de stock | Gráfico de líneas de stock por moneda en el tiempo | ALTA |
| 5.4.2 | Rotación de monedas | Velocidad a la que rota cada moneda | MEDIA |
| 5.4.3 | Días de stock | Estimación de días restantes por moneda | ALTA |
| 5.4.4 | Diferencias de caja | Historial de diferencias en cierres | ALTA |
| 5.4.5 | Valor total de caja | Evolución del valor total del inventario | MEDIA |

### 5.5 Exportación de Informes

| Formato | Contenido | Uso |
|---------|----------|-----|
| PDF | Informes formateados con gráficos | Archivo, presentación |
| Excel (.xlsx) | Datos tabulares detallados | Análisis externo |
| CSV | Datos crudos | Integración con otros sistemas |
| Imagen (PNG) | Dashboard capturado | Compartir por WhatsApp |

---

## MÓDULO 6: SISTEMA DE NOTIFICACIONES

### 6.1 Notificaciones al Operador

| # | Notificación | Canal | Trigger | Prioridad |
|---|-------------|-------|---------|-----------|
| 6.1.1 | Stock bajo | Push + In-app | Stock < mínimo | ALTA |
| 6.1.2 | Stock alto | Push + In-app | Stock > máximo | MEDIA |
| 6.1.3 | Operación grande | Push | Monto > umbral | ALTA |
| 6.1.4 | Variación de tasa del mercado | Push | Cambio > 2% | ALTA |
| 6.1.5 | Recordatorio de cierre | Push | 30 min antes del horario de cierre | ALTA |
| 6.1.6 | Resumen matutino | Push | Cada mañana a hora configurable | MEDIA |
| 6.1.7 | Resumen del día | Push | Al finalizar horario laboral | ALTA |
| 6.1.8 | Backup completado | In-app | Post-backup | BAJA |

### 6.2 Notificaciones a Clientes

| # | Notificación | Canal | Trigger | Prioridad |
|---|-------------|-------|---------|-----------|
| 6.2.1 | Tasas del día | WhatsApp | Manual o programado | ALTA |
| 6.2.2 | Recibo de operación | WhatsApp | Post-operación | ALTA |
| 6.2.3 | Cambio significativo de tasas | WhatsApp | Variación > X% | MEDIA |
| 6.2.4 | Mensaje personalizado | WhatsApp | Manual | MEDIA |
| 6.2.5 | Respuesta automática | WhatsApp | Cliente envía "TASAS" | ALTA |

---

## MÓDULO 7: ADMINISTRACIÓN Y CONFIGURACIÓN

### 7.1 Gestión de Usuarios

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 7.1.1 | Crear usuario | Crear nuevos operadores con rol asignado | ALTA |
| 7.1.2 | Roles predefinidos | Admin, Operador, Visor | ALTA |
| 7.1.3 | Permisos personalizados | Ajustar permisos por usuario individual | MEDIA |
| 7.1.4 | Límites por usuario | Monto máximo de operación por operador | ALTA |
| 7.1.5 | Historial de actividad | Ver actividad de cada usuario | ALTA |
| 7.1.6 | Desactivar usuario | Suspender acceso sin borrar datos | ALTA |

### 7.2 Configuración General

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 7.2.1 | Datos del negocio | Nombre, dirección, logo, contacto | ALTA |
| 7.2.2 | Moneda base | Seleccionar moneda base (EUR/DZD) | ALTA |
| 7.2.3 | Monedas activas | Activar/desactivar monedas | ALTA |
| 7.2.4 | Formato de números | Separadores de miles y decimales | MEDIA |
| 7.2.5 | Idioma de la interfaz | Cambiar idioma (árabe, francés, español) | ALTA |
| 7.2.6 | Horario de negocio | Definir horas de operación | MEDIA |
| 7.2.7 | Reglas de redondeo | Configurar redondeo por moneda | ALTA |
| 7.2.8 | Umbrales de alerta | Configurar niveles de stock y operaciones | ALTA |
| 7.2.9 | Frecuencia de backup | Configurar backup automático | MEDIA |
| 7.2.10 | Tema visual | Modo oscuro/claro, colores | BAJA |

### 7.3 Auditoría y Seguridad

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 7.3.1 | Log de auditoría | Registro inmutable de todas las acciones | ALTA |
| 7.3.2 | Log de accesos | Registro de inicios/cierres de sesión | ALTA |
| 7.3.3 | Log de modificaciones | Quién cambió qué y cuándo | ALTA |
| 7.3.4 | Exportación de logs | Exportar logs para auditoría | MEDIA |
| 7.3.5 | Alertas de seguridad | Intentos de acceso fallidos, etc. | ALTA |
| 7.3.6 | Gestión de backups | Ver, restaurar, eliminar backups | ALTA |
| 7.3.7 | Borrado de datos | Borrado seguro con confirmación dual | ALTA |

---

## MÓDULO 8: FUNCIONALIDADES TRANSVERSALES

### 8.1 Multilingüe

| Idioma | Código | Interfaz | Recibos | Notificaciones |
|--------|--------|----------|---------|----------------|
| Árabe (Argelino) | ar-DZ | Sí (principal) | Sí | Sí |
| Francés | fr | Sí | Sí | Sí |
| Español | es | Sí | Sí | Sí |
| Hassanía | ha | Sí (fase 2) | Sí | Sí |

### 8.2 Accesibilidad y UX

| # | Funcionalidad | Descripción | Prioridad |
|---|--------------|-------------|-----------|
| 8.2.1 | Texto grande | Opción de aumentar tamaño de texto | ALTA |
| 8.2.2 | Alto contraste | Modo de alto contraste para uso en exteriores | MEDIA |
| 8.2.3 | Retroalimentación háptica | Vibración al confirmar operaciones | MEDIA |
| 8.2.4 | Sonidos | Sonido de confirmación/error configurable | BAJA |
| 8.2.5 | Gestos rápidos | Deslizar para acciones comunes | MEDIA |
| 8.2.6 | Atajos de teclado | Para uso con teclado externo en tablet | BAJA |

### 8.3 Funcionalidades Offline

| Funcionalidad | Offline | Requiere Sync |
|--------------|---------|---------------|
| Cálculo de cambio | Completo | No |
| Registro de operaciones | Completo | Sí (para backup) |
| Gestión de caja | Completo | Sí (para backup) |
| Consulta de historial | Datos locales | No |
| Generación de recibos | Completo (PDF) | No |
| Cuadre de caja | Completo | Sí (para backup) |
| Gestión de clientes | Completo | Sí (para backup) |
| Analytics | Datos locales | No |
| Envío WhatsApp | No | Sí |
| Actualización de tasas de mercado | No | Sí |

---

## RESUMEN DE FUNCIONALIDADES POR PRIORIDAD

### Prioridad CRÍTICA (Must Have - Fase 1A)
Total: 15 funcionalidades
- Calculadora de cambio directo e inverso
- Panel de tasas y edición rápida
- Registro rápido de operaciones
- Número de referencia automático
- Tipo de operación
- Stock por moneda en tiempo real
- Entrada/salida de efectivo
- Asistente de cierre de caja
- Conteo por moneda
- Detección de diferencias
- Dashboard de KPIs principales

### Prioridad ALTA (Should Have - Fase 1B)
Total: 42 funcionalidades
- Cambio cruzado, vista previa de beneficio
- Tasas de referencia, alertas de desfase
- Gestión completa de clientes
- Recibos digitales
- Notificaciones WhatsApp
- Informes de rentabilidad
- Alertas de inventario
- Seguridad y auditoría

### Prioridad MEDIA (Could Have - Fase 2)
Total: 35 funcionalidades
- Analytics avanzados
- Predicciones
- Personalización visual
- Funcionalidades CRM avanzadas

### Prioridad BAJA (Won't Have This Time - Futuro)
Total: 10 funcionalidades
- Tasas programadas
- Operaciones reservadas
- Atajos de teclado

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro.*

---

**Documentos relacionados:**
- [Propuesta del Proyecto](PROPUESTA_PROYECTO.md)
- [Arquitectura Técnica](ARQUITECTURA_TECNICA.md)
- [Modelo de Datos](MODELO_DATOS.md)
- [Plan de Implementación y Presupuesto](PLAN_IMPLEMENTACION.md)
- [Seguridad y Cumplimiento](SEGURIDAD_CUMPLIMIENTO.md)
