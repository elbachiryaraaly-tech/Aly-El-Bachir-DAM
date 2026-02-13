# MODELO DE DATOS - SarafPro

## Sistema Elite de Cambio de Moneda

---

**Documento:** Modelo de Datos y Diseño de Base de Datos  
**Versión:** 1.0  
**Fecha:** Febrero 2026  

---

## 1. VISIÓN GENERAL

### 1.1 Estrategia de Almacenamiento

SarafPro utiliza un esquema de doble base de datos:

| Base de Datos | Tipo | Uso | Ubicación |
|--------------|------|-----|-----------|
| **SQLite (drift)** | Relacional | Datos transaccionales (operaciones, clientes, inventario) | Local (dispositivo) |
| **Hive** | NoSQL (Key-Value) | Cache, configuración, sesión, datos temporales | Local (dispositivo) |
| **PostgreSQL** | Relacional | Fuente de verdad cloud, backups, multi-dispositivo | Supabase (nube) |

### 1.2 Convenciones

- Todas las tablas usan `id` (UUID v4) como clave primaria
- Timestamps en formato ISO 8601 (UTC)
- Cantidades monetarias almacenadas como `DECIMAL(18,6)` para máxima precisión
- Soft delete (`deleted_at`) en lugar de borrado físico
- Campos de auditoría (`created_at`, `updated_at`, `created_by`) en todas las tablas

---

## 2. DIAGRAMA ENTIDAD-RELACIÓN

```
┌─────────────────┐       ┌──────────────────┐      ┌─────────────────┐
│     USUARIO      │       │     MONEDA       │      │     CLIENTE      │
│─────────────────│       │──────────────────│      │─────────────────│
│ id (PK)         │       │ id (PK)          │      │ id (PK)         │
│ nombre          │       │ codigo_iso       │      │ nombre          │
│ pin_hash        │       │ nombre           │      │ telefono        │
│ rol             │       │ simbolo          │      │ clasificacion   │
│ activo          │       │ decimales        │      │ notas           │
│ ...             │       │ activa           │      │ idioma_preferido│
└────────┬────────┘       │ ...              │      │ ...             │
         │                └────────┬─────────┘      └────────┬────────┘
         │                         │                          │
         │     ┌───────────────────┼──────────────────┐       │
         │     │                   │                   │       │
         │     ▼                   ▼                   ▼       │
         │  ┌──────────────────────────────────────┐   │       │
         │  │          TASA_DE_CAMBIO               │   │       │
         │  │──────────────────────────────────────│   │       │
         │  │ id (PK)                              │   │       │
         │  │ moneda_origen_id (FK → MONEDA)       │   │       │
         │  │ moneda_destino_id (FK → MONEDA)      │   │       │
         │  │ tasa_compra                          │   │       │
         │  │ tasa_venta                           │   │       │
         │  │ es_tasa_directa                      │   │       │
         │  │ actualizado_por (FK → USUARIO)       │   │       │
         │  │ ...                                  │   │       │
         │  └──────────────────────────────────────┘   │       │
         │                                              │       │
         ▼                                              │       │
┌──────────────────────────────────────────────────────┐│       │
│                    TRANSACCION                         ││       │
│──────────────────────────────────────────────────────││       │
│ id (PK)                                              ││       │
│ numero_referencia (UNIQUE)                           ││       │
│ tipo (compra/venta/cruce)                            ││       │
│ estado (completada/anulada/pendiente)                ││       │
│ moneda_origen_id (FK → MONEDA) ◄─────────────────────┘│       │
│ moneda_destino_id (FK → MONEDA)                       │       │
│ cantidad_origen                                       │       │
│ cantidad_destino                                      │       │
│ tasa_aplicada                                         │       │
│ beneficio_estimado                                    │       │
│ cliente_id (FK → CLIENTE) ◄───────────────────────────┘       │
│ operador_id (FK → USUARIO)                                    │
│ nota                                                          │
│ ...                                                           │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 │  (Cada transacción actualiza)
                 ▼
┌──────────────────────────────────────┐    ┌─────────────────────────┐
│          INVENTARIO                   │    │  MOVIMIENTO_CAJA        │
│──────────────────────────────────────│    │─────────────────────────│
│ id (PK)                              │    │ id (PK)                 │
│ moneda_id (FK → MONEDA)             │    │ moneda_id (FK → MONEDA) │
│ saldo_actual                         │    │ tipo (entrada/salida/   │
│ saldo_minimo                         │    │       ajuste)           │
│ saldo_maximo                         │    │ cantidad                │
│ ...                                  │    │ categoria               │
└──────────────────────────────────────┘    │ saldo_anterior          │
                                            │ saldo_posterior         │
                                            │ transaccion_id (FK?)    │
┌──────────────────────────────────────┐    │ ...                     │
│          CIERRE_CAJA                  │    └─────────────────────────┘
│──────────────────────────────────────│
│ id (PK)                              │    ┌─────────────────────────┐
│ fecha                                │    │  HISTORIAL_TASA         │
│ operador_id (FK → USUARIO)          │    │─────────────────────────│
│ aprobado_por (FK → USUARIO)         │    │ id (PK)                 │
│ estado                               │    │ moneda_origen_id (FK)   │
│ beneficio_total                      │    │ moneda_destino_id (FK)  │
│ ...                                  │    │ tasa_compra_anterior    │
└────────────────┬─────────────────────┘    │ tasa_compra_nueva       │
                 │                          │ tasa_venta_anterior     │
                 ▼                          │ tasa_venta_nueva        │
┌──────────────────────────────────────┐    │ modificado_por (FK)     │
│     DETALLE_CIERRE_CAJA              │    │ ...                     │
│──────────────────────────────────────│    └─────────────────────────┘
│ id (PK)                              │
│ cierre_id (FK → CIERRE_CAJA)       │    ┌─────────────────────────┐
│ moneda_id (FK → MONEDA)             │    │  LOG_AUDITORIA          │
│ saldo_teorico                        │    │─────────────────────────│
│ saldo_real                           │    │ id (PK)                 │
│ diferencia                           │    │ usuario_id (FK)         │
│ ...                                  │    │ accion                  │
└──────────────────────────────────────┘    │ tabla_afectada          │
                                            │ registro_id             │
┌──────────────────────────────────────┐    │ datos_anteriores (JSON) │
│     TASA_PREFERENCIAL_CLIENTE        │    │ datos_nuevos (JSON)     │
│──────────────────────────────────────│    │ ip / dispositivo        │
│ id (PK)                              │    │ ...                     │
│ cliente_id (FK → CLIENTE)           │    └─────────────────────────┘
│ moneda_origen_id (FK → MONEDA)      │
│ moneda_destino_id (FK → MONEDA)     │    ┌─────────────────────────┐
│ tasa_compra_especial                 │    │  NOTIFICACION           │
│ tasa_venta_especial                  │    │─────────────────────────│
│ vigente_desde                        │    │ id (PK)                 │
│ vigente_hasta                        │    │ tipo                    │
│ ...                                  │    │ canal (whatsapp/sms/    │
└──────────────────────────────────────┘    │        push)            │
                                            │ destinatario_id (FK)    │
                                            │ contenido               │
                                            │ estado                  │
                                            │ ...                     │
                                            └─────────────────────────┘
```

---

## 3. DEFINICIÓN DETALLADA DE TABLAS

### 3.1 Tabla: `usuarios`

Almacena los operadores y administradores del sistema.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `nombre` | VARCHAR(100) | NO | Nombre completo |
| `nombre_usuario` | VARCHAR(50) | NO | Login (UNIQUE) |
| `pin_hash` | VARCHAR(256) | NO | Hash del PIN de acceso |
| `password_hash` | VARCHAR(256) | NO | Hash de la contraseña maestra |
| `rol` | ENUM('admin','operador','visor') | NO | Rol del usuario |
| `activo` | BOOLEAN | NO | Si el usuario está activo (default: true) |
| `biometria_habilitada` | BOOLEAN | NO | Si usa autenticación biométrica |
| `limite_operacion` | DECIMAL(18,2) | SÍ | Monto máximo por operación (moneda base) |
| `idioma` | VARCHAR(5) | NO | Idioma de interfaz (default: 'ar') |
| `ultimo_acceso` | TIMESTAMP | SÍ | Último inicio de sesión |
| `created_at` | TIMESTAMP | NO | Fecha de creación |
| `updated_at` | TIMESTAMP | NO | Última actualización |
| `deleted_at` | TIMESTAMP | SÍ | Soft delete |

**Índices:**
- `idx_usuarios_nombre_usuario` UNIQUE en `nombre_usuario`
- `idx_usuarios_activo` en `activo`

---

### 3.2 Tabla: `monedas`

Catálogo de monedas soportadas.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `codigo_iso` | VARCHAR(3) | NO | Código ISO 4217 (UNIQUE) |
| `nombre` | VARCHAR(100) | NO | Nombre completo (ej: "Euro") |
| `nombre_arabe` | VARCHAR(100) | SÍ | Nombre en árabe |
| `simbolo` | VARCHAR(10) | NO | Símbolo (ej: "€", "د.ج") |
| `decimales` | INTEGER | NO | Decimales para redondeo (ej: EUR=2, DZD=0) |
| `subdivision` | VARCHAR(50) | SÍ | Nombre subdivisión (ej: "Céntimo") |
| `pais` | VARCHAR(100) | SÍ | País principal |
| `bandera_emoji` | VARCHAR(10) | SÍ | Emoji de bandera (ej: "🇪🇺") |
| `activa` | BOOLEAN | NO | Si está activa para operaciones |
| `es_moneda_base` | BOOLEAN | NO | Si es la moneda base del sistema |
| `orden` | INTEGER | NO | Orden de aparición en listas |
| `created_at` | TIMESTAMP | NO | Fecha de creación |
| `updated_at` | TIMESTAMP | NO | Última actualización |

**Datos iniciales:**
```sql
INSERT INTO monedas (codigo_iso, nombre, simbolo, decimales, pais, activa, orden) VALUES
('EUR', 'Euro', '€', 2, 'Zona Euro', true, 1),
('DZD', 'Dinar argelino', 'د.ج', 0, 'Argelia', true, 2),
('MRU', 'Uguiya mauritana', 'أ.م', 1, 'Mauritania', true, 3),
('XOF', 'Franco CFA Occidental', 'CFA', 0, 'Senegal', true, 4),
('MAD', 'Dirham marroquí', 'د.م', 2, 'Marruecos', true, 5),
('USD', 'Dólar estadounidense', '$', 2, 'Internacional', true, 6),
('GBP', 'Libra esterlina', '£', 2, 'Reino Unido', true, 7),
('TND', 'Dinar tunecino', 'د.ت', 3, 'Túnez', false, 8),
('LYD', 'Dinar libio', 'ل.د', 3, 'Libia', false, 9),
('XAF', 'Franco CFA Central', 'FCFA', 0, 'Camerún', false, 10);
```

---

### 3.3 Tabla: `tasas_cambio`

Tasas de cambio actuales del operador.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `moneda_origen_id` | UUID | NO | FK → monedas |
| `moneda_destino_id` | UUID | NO | FK → monedas |
| `tasa_compra` | DECIMAL(18,6) | NO | Tasa de compra (operador compra al cliente) |
| `tasa_venta` | DECIMAL(18,6) | NO | Tasa de venta (operador vende al cliente) |
| `es_tasa_directa` | BOOLEAN | NO | true=configurada manualmente, false=calculada |
| `moneda_puente_id` | UUID | SÍ | FK → monedas (si es tasa cruzada, moneda intermedia) |
| `activa` | BOOLEAN | NO | Si esta tasa está activa |
| `actualizado_por` | UUID | NO | FK → usuarios |
| `created_at` | TIMESTAMP | NO | Fecha de creación |
| `updated_at` | TIMESTAMP | NO | Última actualización |

**Índices:**
- `idx_tasas_par` UNIQUE en (`moneda_origen_id`, `moneda_destino_id`)
- `idx_tasas_activa` en `activa`

**Constraint:**
- `CHECK (tasa_compra > 0)`
- `CHECK (tasa_venta > 0)`
- `CHECK (moneda_origen_id != moneda_destino_id)`

---

### 3.4 Tabla: `historial_tasas`

Registro histórico de cada cambio de tasa.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `moneda_origen_id` | UUID | NO | FK → monedas |
| `moneda_destino_id` | UUID | NO | FK → monedas |
| `tasa_compra_anterior` | DECIMAL(18,6) | SÍ | Tasa de compra antes del cambio |
| `tasa_compra_nueva` | DECIMAL(18,6) | NO | Nueva tasa de compra |
| `tasa_venta_anterior` | DECIMAL(18,6) | SÍ | Tasa de venta antes del cambio |
| `tasa_venta_nueva` | DECIMAL(18,6) | NO | Nueva tasa de venta |
| `modificado_por` | UUID | NO | FK → usuarios |
| `motivo` | VARCHAR(200) | SÍ | Motivo del cambio |
| `created_at` | TIMESTAMP | NO | Momento del cambio |

**Índices:**
- `idx_historial_par_fecha` en (`moneda_origen_id`, `moneda_destino_id`, `created_at`)

---

### 3.5 Tabla: `clientes`

Directorio de clientes del negocio.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `nombre` | VARCHAR(150) | NO | Nombre completo del cliente |
| `telefono` | VARCHAR(20) | SÍ | Número de teléfono (UNIQUE si no null) |
| `telefono_whatsapp` | VARCHAR(20) | SÍ | Número de WhatsApp (puede diferir) |
| `clasificacion` | ENUM('vip','frecuente','normal','nuevo') | NO | Tipo de cliente (default: 'nuevo') |
| `notas` | TEXT | SÍ | Notas libres sobre el cliente |
| `foto_path` | VARCHAR(300) | SÍ | Ruta a foto de perfil |
| `idioma_preferido` | VARCHAR(5) | NO | Idioma para comunicaciones (default: 'ar') |
| `recibir_tasas` | BOOLEAN | NO | Si quiere recibir difusión de tasas (default: false) |
| `monedas_preferidas` | JSON | SÍ | Array de IDs de monedas que opera habitualmente |
| `volumen_total` | DECIMAL(18,2) | NO | Volumen total operado (moneda base, default: 0) |
| `numero_operaciones` | INTEGER | NO | Total de operaciones realizadas (default: 0) |
| `ultima_operacion_at` | TIMESTAMP | SÍ | Fecha de última operación |
| `created_at` | TIMESTAMP | NO | Fecha de registro |
| `updated_at` | TIMESTAMP | NO | Última actualización |
| `deleted_at` | TIMESTAMP | SÍ | Soft delete |

**Índices:**
- `idx_clientes_telefono` UNIQUE en `telefono` WHERE `telefono IS NOT NULL`
- `idx_clientes_nombre` en `nombre`
- `idx_clientes_clasificacion` en `clasificacion`

---

### 3.6 Tabla: `transacciones`

Tabla principal de operaciones de cambio.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `numero_referencia` | VARCHAR(20) | NO | Número legible único (ej: SRP-2026-001547) |
| `tipo` | ENUM('compra','venta','cruce') | NO | Tipo de operación |
| `estado` | ENUM('completada','anulada','pendiente','corregida') | NO | Estado actual |
| `moneda_origen_id` | UUID | NO | FK → monedas (moneda que entrega el cliente) |
| `moneda_destino_id` | UUID | NO | FK → monedas (moneda que recibe el cliente) |
| `cantidad_origen` | DECIMAL(18,6) | NO | Cantidad de moneda origen |
| `cantidad_destino` | DECIMAL(18,6) | NO | Cantidad de moneda destino |
| `tasa_aplicada` | DECIMAL(18,6) | NO | Tasa exacta usada en la operación |
| `tasa_referencia_mercado` | DECIMAL(18,6) | SÍ | Tasa del mercado en ese momento (referencia) |
| `beneficio_estimado` | DECIMAL(18,6) | NO | Beneficio estimado en moneda base |
| `moneda_beneficio_id` | UUID | NO | FK → monedas (moneda del beneficio, la base) |
| `cliente_id` | UUID | SÍ | FK → clientes (puede ser null = cliente anónimo) |
| `operador_id` | UUID | NO | FK → usuarios |
| `nota` | TEXT | SÍ | Nota libre |
| `motivo_anulacion` | TEXT | SÍ | Motivo si estado = 'anulada' |
| `transaccion_original_id` | UUID | SÍ | FK → transacciones (si es corrección) |
| `recibo_generado` | BOOLEAN | NO | Si se generó recibo (default: false) |
| `recibo_path` | VARCHAR(300) | SÍ | Ruta al archivo de recibo |
| `recibo_enviado` | BOOLEAN | NO | Si se envió al cliente (default: false) |
| `synced` | BOOLEAN | NO | Si se sincronizó con la nube (default: false) |
| `created_at` | TIMESTAMP | NO | Momento de la operación |
| `updated_at` | TIMESTAMP | NO | Última actualización |
| `deleted_at` | TIMESTAMP | SÍ | Soft delete |

**Índices:**
- `idx_transacciones_referencia` UNIQUE en `numero_referencia`
- `idx_transacciones_fecha` en `created_at`
- `idx_transacciones_cliente` en `cliente_id`
- `idx_transacciones_operador` en `operador_id`
- `idx_transacciones_monedas` en (`moneda_origen_id`, `moneda_destino_id`)
- `idx_transacciones_estado` en `estado`
- `idx_transacciones_synced` en `synced` WHERE `synced = false`

**Constraints:**
- `CHECK (cantidad_origen > 0)`
- `CHECK (cantidad_destino > 0)`
- `CHECK (tasa_aplicada > 0)`

---

### 3.7 Tabla: `inventario`

Saldo actual de cada moneda en caja.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `moneda_id` | UUID | NO | FK → monedas (UNIQUE) |
| `saldo_actual` | DECIMAL(18,6) | NO | Saldo actual de esta moneda |
| `saldo_minimo` | DECIMAL(18,6) | SÍ | Umbral de alerta de nivel bajo |
| `saldo_maximo` | DECIMAL(18,6) | SÍ | Umbral de alerta de nivel alto |
| `valor_equivalente` | DECIMAL(18,2) | NO | Valor en moneda base (para totales) |
| `ultima_actualizacion_at` | TIMESTAMP | NO | Último movimiento |
| `created_at` | TIMESTAMP | NO | Fecha de creación |
| `updated_at` | TIMESTAMP | NO | Última actualización |

**Índices:**
- `idx_inventario_moneda` UNIQUE en `moneda_id`

---

### 3.8 Tabla: `movimientos_caja`

Log de todos los movimientos de cada moneda.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `moneda_id` | UUID | NO | FK → monedas |
| `tipo` | ENUM('entrada','salida','ajuste','cambio_entrada','cambio_salida') | NO | Tipo de movimiento |
| `cantidad` | DECIMAL(18,6) | NO | Cantidad del movimiento |
| `saldo_anterior` | DECIMAL(18,6) | NO | Saldo antes del movimiento |
| `saldo_posterior` | DECIMAL(18,6) | NO | Saldo después del movimiento |
| `categoria` | VARCHAR(50) | SÍ | Categoría (reposición, gasto, retiro, préstamo...) |
| `transaccion_id` | UUID | SÍ | FK → transacciones (si viene de un cambio) |
| `cierre_id` | UUID | SÍ | FK → cierres_caja (si es ajuste de cierre) |
| `descripcion` | VARCHAR(300) | SÍ | Descripción del movimiento |
| `operador_id` | UUID | NO | FK → usuarios |
| `synced` | BOOLEAN | NO | Si se sincronizó con la nube |
| `created_at` | TIMESTAMP | NO | Momento del movimiento |

**Índices:**
- `idx_movimientos_moneda_fecha` en (`moneda_id`, `created_at`)
- `idx_movimientos_transaccion` en `transaccion_id`
- `idx_movimientos_tipo` en `tipo`

---

### 3.9 Tabla: `cierres_caja`

Registro de cierres de caja diarios.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `fecha` | DATE | NO | Fecha del cierre |
| `operador_id` | UUID | NO | FK → usuarios (quien realizó el cierre) |
| `aprobado_por` | UUID | SÍ | FK → usuarios (quien aprobó, si aplica) |
| `estado` | ENUM('borrador','pendiente_aprobacion','aprobado','rechazado') | NO | Estado del cierre |
| `total_operaciones` | INTEGER | NO | Número de operaciones del día |
| `volumen_total` | DECIMAL(18,2) | NO | Volumen total operado (moneda base) |
| `beneficio_total` | DECIMAL(18,2) | NO | Beneficio total del día (moneda base) |
| `hay_diferencias` | BOOLEAN | NO | Si se detectaron diferencias |
| `notas` | TEXT | SÍ | Notas del cierre |
| `informe_path` | VARCHAR(300) | SÍ | Ruta al PDF del informe |
| `created_at` | TIMESTAMP | NO | Momento del cierre |
| `updated_at` | TIMESTAMP | NO | Última actualización |

**Índices:**
- `idx_cierres_fecha` UNIQUE en `fecha`

---

### 3.10 Tabla: `detalles_cierre_caja`

Detalle por moneda de cada cierre.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `cierre_id` | UUID | NO | FK → cierres_caja |
| `moneda_id` | UUID | NO | FK → monedas |
| `saldo_teorico` | DECIMAL(18,6) | NO | Saldo calculado por el sistema |
| `saldo_real` | DECIMAL(18,6) | NO | Saldo contado físicamente |
| `diferencia` | DECIMAL(18,6) | NO | diferencia = saldo_real - saldo_teorico |
| `operaciones_compra` | INTEGER | NO | Nº de operaciones de compra del día |
| `operaciones_venta` | INTEGER | NO | Nº de operaciones de venta del día |
| `volumen_compra` | DECIMAL(18,6) | NO | Volumen de compras |
| `volumen_venta` | DECIMAL(18,6) | NO | Volumen de ventas |
| `notas` | TEXT | SÍ | Notas sobre esta moneda |

**Índices:**
- `idx_detalle_cierre_moneda` UNIQUE en (`cierre_id`, `moneda_id`)

---

### 3.11 Tabla: `tasas_preferenciales_clientes`

Tasas especiales para clientes VIP.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `cliente_id` | UUID | NO | FK → clientes |
| `moneda_origen_id` | UUID | NO | FK → monedas |
| `moneda_destino_id` | UUID | NO | FK → monedas |
| `tasa_compra_especial` | DECIMAL(18,6) | SÍ | Tasa de compra especial (null = usar estándar) |
| `tasa_venta_especial` | DECIMAL(18,6) | SÍ | Tasa de venta especial (null = usar estándar) |
| `descuento_porcentaje` | DECIMAL(5,2) | SÍ | O descuento % sobre spread |
| `vigente_desde` | TIMESTAMP | NO | Inicio de vigencia |
| `vigente_hasta` | TIMESTAMP | SÍ | Fin de vigencia (null = indefinida) |
| `activa` | BOOLEAN | NO | Si está activa |
| `created_by` | UUID | NO | FK → usuarios |
| `created_at` | TIMESTAMP | NO | Fecha de creación |
| `updated_at` | TIMESTAMP | NO | Última actualización |

---

### 3.12 Tabla: `notificaciones`

Log de todas las notificaciones enviadas.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `tipo` | ENUM('difusion_tasas','recibo','alerta','mensaje_personal','chatbot') | NO | Tipo de notificación |
| `canal` | ENUM('whatsapp','sms','push','email') | NO | Canal de envío |
| `destinatario_id` | UUID | SÍ | FK → clientes (null si es al operador) |
| `destinatario_telefono` | VARCHAR(20) | SÍ | Número de destino |
| `contenido` | TEXT | NO | Contenido del mensaje |
| `plantilla_id` | VARCHAR(100) | SÍ | ID de plantilla WhatsApp |
| `estado` | ENUM('pendiente','enviada','entregada','leida','fallida') | NO | Estado de la notificación |
| `error_mensaje` | TEXT | SÍ | Mensaje de error si falló |
| `whatsapp_message_id` | VARCHAR(100) | SÍ | ID del mensaje en WhatsApp API |
| `enviado_por` | UUID | SÍ | FK → usuarios (null si automático) |
| `created_at` | TIMESTAMP | NO | Momento de creación |
| `enviado_at` | TIMESTAMP | SÍ | Momento de envío efectivo |

**Índices:**
- `idx_notificaciones_tipo_fecha` en (`tipo`, `created_at`)
- `idx_notificaciones_destinatario` en `destinatario_id`
- `idx_notificaciones_estado` en `estado`

---

### 3.13 Tabla: `logs_auditoria`

Registro inmutable de todas las acciones del sistema.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `usuario_id` | UUID | NO | FK → usuarios |
| `accion` | VARCHAR(50) | NO | Tipo de acción (crear, editar, eliminar, login, etc.) |
| `modulo` | VARCHAR(50) | NO | Módulo afectado (cambio, caja, clientes, etc.) |
| `tabla_afectada` | VARCHAR(100) | SÍ | Tabla de la DB afectada |
| `registro_id` | UUID | SÍ | ID del registro afectado |
| `datos_anteriores` | JSON | SÍ | Snapshot de datos antes del cambio |
| `datos_nuevos` | JSON | SÍ | Snapshot de datos después del cambio |
| `descripcion` | VARCHAR(500) | SÍ | Descripción legible de la acción |
| `ip_address` | VARCHAR(45) | SÍ | Dirección IP (si online) |
| `dispositivo` | VARCHAR(200) | SÍ | Información del dispositivo |
| `created_at` | TIMESTAMP | NO | Momento de la acción |

**Índices:**
- `idx_logs_usuario_fecha` en (`usuario_id`, `created_at`)
- `idx_logs_modulo` en `modulo`
- `idx_logs_accion` en `accion`
- `idx_logs_fecha` en `created_at`

**NOTA:** Esta tabla es append-only. No se permite UPDATE ni DELETE.

---

### 3.14 Tabla: `configuracion`

Configuración general del sistema.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `clave` | VARCHAR(100) | NO | Clave de configuración (UNIQUE) |
| `valor` | JSON | NO | Valor de la configuración |
| `tipo` | VARCHAR(20) | NO | Tipo de dato (string, number, boolean, json) |
| `descripcion` | VARCHAR(300) | SÍ | Descripción de la configuración |
| `modificable` | BOOLEAN | NO | Si puede ser modificada por el usuario |
| `updated_at` | TIMESTAMP | NO | Última actualización |
| `updated_by` | UUID | SÍ | FK → usuarios |

**Datos iniciales:**
```sql
INSERT INTO configuracion (clave, valor, tipo, descripcion) VALUES
('negocio.nombre', '"SarafPro"', 'string', 'Nombre del negocio'),
('negocio.direccion', '"Tindouf, Argelia"', 'string', 'Dirección del negocio'),
('negocio.telefono', '""', 'string', 'Teléfono de contacto'),
('negocio.logo_path', 'null', 'string', 'Ruta al logo'),
('sistema.moneda_base', '"EUR"', 'string', 'Moneda base del sistema'),
('sistema.idioma_default', '"ar"', 'string', 'Idioma por defecto'),
('sistema.tema', '"dark"', 'string', 'Tema visual (dark/light)'),
('sistema.formato_numero', '{"miles":".","decimal":","}', 'json', 'Formato numérico'),
('seguridad.timeout_inactividad', '120', 'number', 'Segundos hasta bloqueo automático'),
('seguridad.intentos_max_pin', '5', 'number', 'Intentos máx de PIN antes de bloqueo'),
('backup.frecuencia_horas', '6', 'number', 'Horas entre backups automáticos'),
('alertas.stock_bajo_porcent', '20', 'number', '% del máximo para alerta de stock bajo'),
('alertas.operacion_grande', '100000', 'number', 'Monto (moneda base) para alerta'),
('tasas.actualizacion_auto_min', '30', 'number', 'Minutos entre actualizaciones de mercado'),
('tasas.alerta_desfase_porcent', '5', 'number', '% de desfase para alertar'),
('whatsapp.difusion_auto', 'false', 'boolean', 'Difusión automática de tasas'),
('whatsapp.hora_difusion', '"09:00"', 'string', 'Hora de difusión automática'),
('horario.apertura', '"08:00"', 'string', 'Hora de apertura'),
('horario.cierre', '"20:00"', 'string', 'Hora de cierre');
```

---

### 3.15 Tabla: `cola_sincronizacion`

Cola de operaciones pendientes de sincronizar con la nube.

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | NO | Identificador único (PK) |
| `tabla` | VARCHAR(100) | NO | Tabla afectada |
| `registro_id` | UUID | NO | ID del registro a sincronizar |
| `operacion` | ENUM('insert','update','delete') | NO | Tipo de operación |
| `datos` | JSON | NO | Datos completos del registro |
| `intentos` | INTEGER | NO | Número de intentos de sync (default: 0) |
| `ultimo_error` | TEXT | SÍ | Último error de sincronización |
| `estado` | ENUM('pendiente','sincronizando','completado','error') | NO | Estado |
| `prioridad` | INTEGER | NO | Prioridad (1=alta, 5=baja) |
| `created_at` | TIMESTAMP | NO | Momento de creación |
| `synced_at` | TIMESTAMP | SÍ | Momento de sincronización exitosa |

**Índices:**
- `idx_cola_estado_prioridad` en (`estado`, `prioridad`, `created_at`)

---

## 4. HIVE (NoSQL) - ESTRUCTURA DE BOXES

Para datos de acceso rápido y cache:

### 4.1 Box: `session`
```dart
class SessionBox {
  String? currentUserId;
  String? currentUserName;
  String? currentUserRole;
  DateTime? loginAt;
  String? deviceId;
  bool isOffline;
}
```

### 4.2 Box: `rates_cache`
```dart
class RatesCacheBox {
  Map<String, double> currentRates;  // "EUR_DZD_buy": 237.50
  DateTime lastUpdated;
  DateTime lastMarketUpdate;
  Map<String, double> marketRates;   // Tasas de referencia
}
```

### 4.3 Box: `preferences`
```dart
class PreferencesBox {
  String locale;           // "ar", "fr", "es"
  String theme;            // "dark", "light"
  bool hapticFeedback;
  bool soundEnabled;
  int fontSize;            // 0=normal, 1=grande, 2=extra grande
  List<String> favoritePairs;  // ["EUR_DZD", "EUR_MRU"]
  bool biometricEnabled;
}
```

### 4.4 Box: `offline_queue`
```dart
class OfflineQueueBox {
  List<PendingOperation> queue;  // Operaciones pendientes de sync
  DateTime lastSyncAttempt;
  int failedAttempts;
}
```

---

## 5. VISTAS Y CONSULTAS FRECUENTES

### 5.1 Vista: Resumen Diario

```sql
CREATE VIEW v_resumen_diario AS
SELECT 
    DATE(t.created_at) as fecha,
    COUNT(*) as total_operaciones,
    SUM(t.beneficio_estimado) as beneficio_total,
    COUNT(DISTINCT t.cliente_id) as clientes_atendidos,
    t.moneda_origen_id,
    m.codigo_iso as moneda_codigo,
    SUM(t.cantidad_origen) as volumen_total
FROM transacciones t
JOIN monedas m ON t.moneda_origen_id = m.id
WHERE t.estado = 'completada'
GROUP BY DATE(t.created_at), t.moneda_origen_id, m.codigo_iso;
```

### 5.2 Vista: Top Clientes

```sql
CREATE VIEW v_top_clientes AS
SELECT 
    c.id,
    c.nombre,
    c.clasificacion,
    c.numero_operaciones,
    c.volumen_total,
    c.ultima_operacion_at,
    COUNT(t.id) as ops_ultimo_mes
FROM clientes c
LEFT JOIN transacciones t ON c.id = t.cliente_id 
    AND t.created_at > NOW() - INTERVAL '30 days'
    AND t.estado = 'completada'
GROUP BY c.id, c.nombre, c.clasificacion, 
         c.numero_operaciones, c.volumen_total, c.ultima_operacion_at
ORDER BY c.volumen_total DESC;
```

### 5.3 Vista: Estado del Inventario

```sql
CREATE VIEW v_estado_inventario AS
SELECT 
    i.id,
    m.codigo_iso,
    m.nombre,
    m.simbolo,
    i.saldo_actual,
    i.saldo_minimo,
    i.saldo_maximo,
    i.valor_equivalente,
    CASE 
        WHEN i.saldo_minimo IS NOT NULL AND i.saldo_actual < i.saldo_minimo THEN 'BAJO'
        WHEN i.saldo_maximo IS NOT NULL AND i.saldo_actual > i.saldo_maximo THEN 'ALTO'
        ELSE 'NORMAL'
    END as estado_stock,
    i.ultima_actualizacion_at
FROM inventario i
JOIN monedas m ON i.moneda_id = m.id
WHERE m.activa = true
ORDER BY m.orden;
```

---

## 6. POLÍTICA DE RETENCIÓN DE DATOS

| Tipo de Dato | Retención | Política |
|-------------|-----------|---------|
| Transacciones | Indefinida | Nunca se borran (soft delete) |
| Logs de auditoría | 5 años | Append-only, archivado anual |
| Historial de tasas | 2 años | Archivado trimestral |
| Notificaciones | 1 año | Purgado automático |
| Cola de sincronización | 30 días (completados) | Purgado automático |
| Backups locales | 30 días | Rotación automática |
| Backups cloud | 1 año | Rotación automática |

---

## 7. MIGRACIONES

El sistema utiliza migraciones versionadas para la base de datos local:

```
migrations/
├── 001_initial_schema.sql           # Schema inicial completo
├── 002_seed_monedas.sql             # Datos iniciales de monedas
├── 003_seed_configuracion.sql       # Configuración por defecto
├── 004_create_views.sql             # Vistas de consulta
└── ... (incrementales con cada release)
```

Cada migración se ejecuta automáticamente al abrir la app si la versión de la DB es anterior.

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro.*

---

**Documentos relacionados:**
- [Propuesta del Proyecto](PROPUESTA_PROYECTO.md)
- [Arquitectura Técnica](ARQUITECTURA_TECNICA.md)
- [Funcionalidades Detalladas](FUNCIONALIDADES.md)
- [Plan de Implementación y Presupuesto](PLAN_IMPLEMENTACION.md)
- [Seguridad y Cumplimiento](SEGURIDAD_CUMPLIMIENTO.md)
