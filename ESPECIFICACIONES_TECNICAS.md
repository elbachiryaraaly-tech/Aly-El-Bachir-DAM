# ESPECIFICACIONES TECNICAS

## SARAF ELITE - Sistema de Red de Cambio de Divisas

---

**Version:** 2.0  
**Fecha:** 13 de febrero de 2026  
**Documento:** Anexo Tecnico

---

## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Vision General

El sistema tiene dos actores principales con apps distintas pero conectadas:

```
+================================================================+
|                                                                  |
|                     SERVIDOR CENTRAL                             |
|               (VPS en la nube - siempre activo)                  |
|                                                                  |
|  +-----------------------------------------------------------+  |
|  |  API REST + WebSockets (NestJS / Node.js)                 |  |
|  |                                                            |  |
|  |  +--------+ +--------+ +--------+ +--------+ +--------+  |  |
|  |  | Auth   | |Exchange| | Cash   | | Rates  | |Reports |  |  |
|  |  | Module | | Engine | |Manager | |Manager | | Engine |  |  |
|  |  +--------+ +--------+ +--------+ +--------+ +--------+  |  |
|  |  +--------+ +--------+ +--------+ +--------+ +--------+  |  |
|  |  |Client  | |Employee| |Approval| | Sync   | | Notif  |  |  |
|  |  |Manager | |Manager | | System | | Engine | |Service |  |  |
|  |  +--------+ +--------+ +--------+ +--------+ +--------+  |  |
|  +-----------------------------------------------------------+  |
|  |  PostgreSQL  |  Redis  |  S3/Backblaze (backups)          |  |
|  +-----------------------------------------------------------+  |
|                                                                  |
+================================================================+
         |                    |                    |
    (Internet / 3G / 4G - cuando haya)
         |                    |                    |
+========+======+   +========+======+   +========+======+
| APP JEFE      |   | APP EMPLEADO  |   | APP EMPLEADO  |
| (Tu movil)    |   | (Ahmed-Aaioun)|   | (Omar-Tindouf)|
|               |   |               |   |               |
| SQLite local  |   | SQLite local  |   | SQLite local  |
| (funciona sin |   | (funciona sin |   | (funciona sin |
|  internet)    |   |  internet)    |   |  internet)    |
+===============+   +===============+   +===============+
```

### 1.2 Principio Offline-First

Cada app movil es **autonoma**. Tiene su propia base de datos local (SQLite) y puede operar al 100% sin internet. Cuando hay conexion, sincroniza automaticamente.

```
SIN INTERNET:                        CON INTERNET:
+------------------+                 +------------------+
| App Movil        |                 | App Movil        |
|                  |                 |                  |
| [SQLite Local]   |                 | [SQLite Local] <-+-> [Servidor]
|                  |                 |                  |
| Todo funciona:   |                 | Todo funciona +  |
| - Operaciones    |                 | - Sincroniza     |
| - Caja           |                 | - Nuevas tasas   |
| - Clientes       |                 | - Notificaciones |
| - Historial      |                 | - Backup         |
+------------------+                 +------------------+
```

### 1.3 Flujo de Datos en Tiempo Real

```
EMPLEADO hace operacion
    |
    v
[Guarda en SQLite local] -> [App actualiza caja local]
    |
    v (si hay internet)
[Envia al servidor via API/WebSocket]
    |
    v
[Servidor registra en PostgreSQL]
    |
    v
[Servidor envia push al Jefe via WebSocket/FCM]
    |
    v
[App del Jefe recibe y muestra notificacion]
[Dashboard del Jefe se actualiza en tiempo real]
```

---

## 2. MODELO DE BASE DE DATOS

### 2.1 Esquema Completo (PostgreSQL)

```sql
-- ================================================================
-- ORGANIZACION: Puntos de operacion y empleados
-- ================================================================

-- Puntos de operacion (Tindouf, Aaioun, etc.)
CREATE TABLE branches (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,         -- "Tindouf", "Aaioun"
    location        VARCHAR(200),                  -- Descripcion ubicacion
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Usuarios (Jefe + Empleados)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    full_name       VARCHAR(100) NOT NULL,
    phone           VARCHAR(20),
    pin_hash        VARCHAR(255) NOT NULL,         -- PIN de 6 digitos (bcrypt)
    password_hash   VARCHAR(255),                  -- Solo para el jefe
    role            VARCHAR(20) NOT NULL,           -- 'boss' o 'employee'
    branch_id       UUID REFERENCES branches(id),  -- Punto asignado
    is_active       BOOLEAN DEFAULT TRUE,
    language        VARCHAR(5) DEFAULT 'ar',
    last_login      TIMESTAMPTZ,
    last_sync       TIMESTAMPTZ,
    fcm_token       VARCHAR(500),                  -- Token notificaciones push
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_branch ON users(branch_id);

-- ================================================================
-- DIVISAS Y TASAS
-- ================================================================

CREATE TABLE currencies (
    code            VARCHAR(3) PRIMARY KEY,
    name_ar         VARCHAR(100) NOT NULL,
    name_fr         VARCHAR(100) NOT NULL,
    symbol          VARCHAR(10) NOT NULL,
    decimal_places  SMALLINT DEFAULT 2,
    is_active       BOOLEAN DEFAULT TRUE,
    display_order   SMALLINT DEFAULT 0,
    flag_emoji      VARCHAR(10),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tasas de cambio (las que fija el JEFE)
CREATE TABLE exchange_rates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_currency   VARCHAR(3) REFERENCES currencies(code),
    quote_currency  VARCHAR(3) REFERENCES currencies(code),
    buy_rate        DECIMAL(18,6) NOT NULL,        -- Tasa de compra
    sell_rate       DECIMAL(18,6) NOT NULL,         -- Tasa de venta
    market_rate     DECIMAL(18,6),                  -- Referencia mercado
    is_active       BOOLEAN DEFAULT TRUE,
    updated_by      UUID REFERENCES users(id),     -- Siempre el jefe
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(base_currency, quote_currency)
);

-- Historial de cambios de tasa
CREATE TABLE rate_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_currency   VARCHAR(3) REFERENCES currencies(code),
    quote_currency  VARCHAR(3) REFERENCES currencies(code),
    buy_rate        DECIMAL(18,6) NOT NULL,
    sell_rate       DECIMAL(18,6) NOT NULL,
    changed_by      UUID REFERENCES users(id),
    recorded_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rate_history_pair ON rate_history(base_currency, quote_currency, recorded_at DESC);

-- ================================================================
-- CAJA POR EMPLEADO (cada empleado tiene su caja)
-- ================================================================

CREATE TABLE cash_registers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),     -- EMPLEADO dueno de esta caja
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    current_balance DECIMAL(18,2) NOT NULL DEFAULT 0,
    min_threshold   DECIMAL(18,2) DEFAULT 0,       -- Alerta si baja de aqui
    last_updated    TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, currency_code)
);

CREATE INDEX idx_cash_registers_user ON cash_registers(user_id);

-- Movimientos de caja
CREATE TABLE cash_movements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cash_register_id UUID REFERENCES cash_registers(id),
    user_id         UUID REFERENCES users(id),     -- Empleado
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    movement_type   VARCHAR(20) NOT NULL,           -- 'credit','debit','adjustment','transfer_in','transfer_out'
    amount          DECIMAL(18,2) NOT NULL,
    balance_before  DECIMAL(18,2) NOT NULL,
    balance_after   DECIMAL(18,2) NOT NULL,
    reason          VARCHAR(200),                   -- "Recibido del jefe", "Entregado al jefe", etc.
    related_transaction_id UUID,                    -- Si viene de una operacion
    related_transfer_id UUID,                       -- Si viene de una transferencia
    operator_id     UUID REFERENCES users(id),     -- Quien hizo el movimiento
    local_id        VARCHAR(100),                  -- Para sync offline
    synced          BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cash_movements_user ON cash_movements(user_id, created_at DESC);

-- ================================================================
-- OPERACIONES DE CAMBIO
-- ================================================================

CREATE TABLE transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Quien y donde
    employee_id     UUID REFERENCES users(id) NOT NULL,  -- Empleado que opero
    branch_id       UUID REFERENCES branches(id),         -- Punto de operacion
    
    -- Que se cambio
    source_currency VARCHAR(3) REFERENCES currencies(code),  -- Divisa que DA el cliente
    source_amount   DECIMAL(18,2) NOT NULL,
    target_currency VARCHAR(3) REFERENCES currencies(code),  -- Divisa que RECIBE el cliente
    target_amount   DECIMAL(18,2) NOT NULL,
    
    -- Tasa
    applied_rate    DECIMAL(18,6) NOT NULL,
    rate_direction  VARCHAR(20),                  -- 'buy' o 'sell' desde perspectiva del negocio
    
    -- Ganancia (solo visible para el jefe)
    profit_amount   DECIMAL(18,2) DEFAULT 0,
    profit_currency VARCHAR(3) REFERENCES currencies(code),
    
    -- Cliente (opcional)
    client_id       UUID REFERENCES clients(id),
    
    -- Estado
    status          VARCHAR(20) DEFAULT 'completed',  -- 'completed','pending_approval','approved','rejected','cancelled'
    
    -- Aprobacion (para operaciones grandes)
    requires_approval BOOLEAN DEFAULT FALSE,
    approved_by     UUID REFERENCES users(id),
    approved_at     TIMESTAMPTZ,
    rejection_reason VARCHAR(200),
    
    -- Credito/Deuda
    is_credit       BOOLEAN DEFAULT FALSE,
    
    -- Notas
    notes           TEXT,
    
    -- Sync offline
    local_id        VARCHAR(100) UNIQUE,           -- ID generado localmente
    synced          BOOLEAN DEFAULT TRUE,
    device_id       VARCHAR(100),
    
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_employee ON transactions(employee_id, created_at DESC);
CREATE INDEX idx_transactions_branch ON transactions(branch_id, created_at DESC);
CREATE INDEX idx_transactions_date ON transactions(created_at DESC);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_local ON transactions(local_id);

-- ================================================================
-- CLIENTES
-- ================================================================

CREATE TABLE clients (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(150) NOT NULL,
    phone           VARCHAR(20),
    trust_level     SMALLINT DEFAULT 1 CHECK (trust_level BETWEEN 1 AND 5),
    credit_limit    DECIMAL(18,2) DEFAULT 0,
    notes           TEXT,
    total_volume_eur DECIMAL(18,2) DEFAULT 0,
    transaction_count INTEGER DEFAULT 0,
    last_transaction_at TIMESTAMPTZ,
    registered_by   UUID REFERENCES users(id),     -- Empleado que lo registro
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_name ON clients USING gin(full_name gin_trgm_ops);
CREATE INDEX idx_clients_phone ON clients(phone);

-- Deudas de clientes
CREATE TABLE client_debts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id       UUID REFERENCES clients(id) NOT NULL,
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    original_amount DECIMAL(18,2) NOT NULL,
    remaining_amount DECIMAL(18,2) NOT NULL,
    direction       VARCHAR(10) NOT NULL,           -- 'owes_us' o 'we_owe'
    reason          TEXT,
    due_date        DATE,
    status          VARCHAR(20) DEFAULT 'pending',  -- 'pending','partial','paid','written_off'
    transaction_id  UUID REFERENCES transactions(id),
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_debts_client ON client_debts(client_id, status);

-- ================================================================
-- TRANSFERENCIAS ENTRE EMPLEADOS
-- ================================================================

CREATE TABLE transfers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id    UUID REFERENCES users(id),     -- Empleado que entrega
    to_user_id      UUID REFERENCES users(id),     -- Empleado que recibe
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    amount          DECIMAL(18,2) NOT NULL,
    reason          VARCHAR(200),
    ordered_by      UUID REFERENCES users(id),     -- El jefe
    status          VARCHAR(20) DEFAULT 'pending',  -- 'pending','confirmed_sender','confirmed_receiver','completed','cancelled'
    confirmed_by_sender_at   TIMESTAMPTZ,
    confirmed_by_receiver_at TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- APROBACIONES (operaciones grandes)
-- ================================================================

CREATE TABLE approval_requests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id  UUID REFERENCES transactions(id),
    employee_id     UUID REFERENCES users(id),
    branch_id       UUID REFERENCES branches(id),
    source_currency VARCHAR(3),
    source_amount   DECIMAL(18,2),
    target_currency VARCHAR(3),
    target_amount   DECIMAL(18,2),
    applied_rate    DECIMAL(18,6),
    client_id       UUID REFERENCES clients(id),
    status          VARCHAR(20) DEFAULT 'pending',  -- 'pending','approved','rejected','expired'
    responded_by    UUID REFERENCES users(id),
    responded_at    TIMESTAMPTZ,
    rejection_reason VARCHAR(200),
    expires_at      TIMESTAMPTZ,                   -- Expira si el jefe no responde
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_approvals_status ON approval_requests(status, created_at DESC);

-- ================================================================
-- CIERRES DE CAJA DIARIOS
-- ================================================================

CREATE TABLE daily_closings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    closing_date    DATE NOT NULL,
    
    -- Resumen general
    total_transactions  INTEGER DEFAULT 0,
    total_profit_dzd    DECIMAL(18,2) DEFAULT 0,
    
    -- Resumen por empleado (JSON)
    employee_summary    JSONB NOT NULL,
    /* Formato:
    {
      "ahmed-uuid": {
        "name": "Ahmed",
        "branch": "Aaioun",
        "transactions": 23,
        "profit_dzd": 5200,
        "cash": {"EUR": 2350, "DZD": 456000, "MRU": 12000}
      },
      "omar-uuid": { ... }
    }
    */
    
    -- Resumen por par de divisas (JSON)
    pair_summary        JSONB,
    
    -- Diferencias de caja (si las hay)
    discrepancies       JSONB,
    
    closed_by           UUID REFERENCES users(id),
    notes               TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(closing_date)
);

-- ================================================================
-- NOTIFICACIONES
-- ================================================================

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),     -- Destinatario
    type            VARCHAR(50) NOT NULL,           -- 'new_transaction','approval_request','rate_change','low_cash','daily_summary'
    title           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    data_json       JSONB,
    is_read         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- ================================================================
-- REGISTRO DE AUDITORIA
-- ================================================================

CREATE TABLE audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    action          VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(50),
    entity_id       UUID,
    details         JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_date ON audit_log(created_at DESC);

-- ================================================================
-- CONFIGURACION
-- ================================================================

CREATE TABLE settings (
    key             VARCHAR(100) PRIMARY KEY,
    value           JSONB NOT NULL,
    category        VARCHAR(50),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- DATOS INICIALES
-- ================================================================

-- Puntos de operacion
INSERT INTO branches (id, name, location) VALUES
('b1000000-0000-0000-0000-000000000001', 'Tindouf', 'Tindouf ciudad'),
('b2000000-0000-0000-0000-000000000002', 'Aaioun', 'Campamentos de Aaioun');

-- Divisas principales
INSERT INTO currencies (code, name_ar, name_fr, symbol, decimal_places, display_order, flag_emoji) VALUES
('EUR', 'يورو', 'Euro', '€', 2, 1, '🇪🇺'),
('DZD', 'دينار جزائري', 'Dinar Algerien', 'د.ج', 2, 2, '🇩🇿'),
('MRU', 'أوقية موريتانية', 'Ouguiya', 'UM', 2, 3, '🇲🇷'),
('XOF', 'فرنك غرب أفريقي', 'Franc CFA', 'CFA', 0, 4, '🇸🇳');

-- Divisas secundarias (desactivadas)
INSERT INTO currencies (code, name_ar, name_fr, symbol, decimal_places, display_order, flag_emoji, is_active) VALUES
('MAD', 'درهم مغربي', 'Dirham', 'MAD', 2, 5, '🇲🇦', FALSE),
('USD', 'دولار أمريكي', 'Dollar', '$', 2, 6, '🇺🇸', FALSE),
('GBP', 'جنيه إسترليني', 'Livre', '£', 2, 7, '🇬🇧', FALSE);

-- Configuracion inicial
INSERT INTO settings (key, value, category) VALUES
('approval_threshold_eur', '2000', 'operations'),
('auto_close_time', '"22:00"', 'cash'),
('daily_summary_whatsapp', 'true', 'notifications'),
('idle_lock_minutes', '5', 'security'),
('backup_frequency', '"daily"', 'backup');
```

---

## 3. API REST - ENDPOINTS

### 3.1 Autenticacion

```
POST   /api/auth/login           Login con PIN (empleados) o password (jefe)
POST   /api/auth/refresh         Renovar token JWT
POST   /api/auth/logout          Cerrar sesion
PUT    /api/auth/change-pin      Cambiar PIN
```

### 3.2 Tasas de Cambio (Solo Jefe puede modificar)

```
GET    /api/rates                Obtener todas las tasas activas
PUT    /api/rates/:id            Modificar tasa (solo jefe)
POST   /api/rates/apply-all      Aplicar tasas a todos los empleados (solo jefe)
GET    /api/rates/history        Historial de cambios de tasas
GET    /api/rates/market         Tasas de referencia del mercado (APIs externas)
```

### 3.3 Operaciones de Cambio

```
POST   /api/transactions                  Nueva operacion
GET    /api/transactions                  Listar (filtros: empleado, fecha, divisa, estado)
GET    /api/transactions/:id              Detalle
POST   /api/transactions/:id/cancel       Cancelar (solo jefe)
POST   /api/transactions/calculate        Calcular sin registrar (preview)
GET    /api/transactions/summary/today     Resumen de hoy
GET    /api/transactions/summary/employee/:id  Resumen por empleado
```

### 3.4 Aprobaciones (Operaciones Grandes)

```
POST   /api/approvals                     Solicitar aprobacion (empleado)
GET    /api/approvals/pending              Aprobaciones pendientes (jefe)
PUT    /api/approvals/:id/approve          Aprobar (jefe)
PUT    /api/approvals/:id/reject           Rechazar (jefe)
```

### 3.5 Caja

```
GET    /api/cash                           Todas las cajas (jefe: todas, empleado: solo suya)
GET    /api/cash/employee/:id              Caja de un empleado (jefe)
GET    /api/cash/branch/:id                Caja total de un punto (jefe)
GET    /api/cash/total                     Caja total de la red (jefe)
POST   /api/cash/movement                  Registrar entrada/salida manual
GET    /api/cash/movements                 Historial de movimientos
POST   /api/cash/close-day                 Cerrar caja del dia (jefe)
POST   /api/cash/verify                    Empleado confirma conteo fisico
GET    /api/cash/closings                  Historial de cierres
```

### 3.6 Transferencias entre Empleados

```
POST   /api/transfers                      Crear transferencia (jefe)
GET    /api/transfers                      Listar transferencias
PUT    /api/transfers/:id/confirm-send     Emisor confirma que entrego
PUT    /api/transfers/:id/confirm-receive  Receptor confirma que recibio
PUT    /api/transfers/:id/cancel           Cancelar transferencia (jefe)
```

### 3.7 Empleados y Puntos (Solo Jefe)

```
GET    /api/employees                      Lista de empleados
POST   /api/employees                      Crear empleado
PUT    /api/employees/:id                  Modificar empleado
PUT    /api/employees/:id/deactivate       Desactivar empleado
GET    /api/employees/:id/activity         Actividad reciente del empleado
GET    /api/branches                       Lista de puntos
POST   /api/branches                       Crear punto
PUT    /api/branches/:id                   Modificar punto
```

### 3.8 Clientes

```
GET    /api/clients                        Buscar/listar clientes
POST   /api/clients                        Registrar cliente
PUT    /api/clients/:id                    Modificar cliente
GET    /api/clients/:id/transactions       Operaciones del cliente
GET    /api/clients/:id/debts              Deudas del cliente
POST   /api/clients/:id/debts              Crear deuda
PUT    /api/clients/debts/:id              Actualizar deuda (pagar/ajustar)
GET    /api/clients/debts/pending          Todas las deudas pendientes (jefe)
```

### 3.9 Reportes (Solo Jefe)

```
GET    /api/reports/daily/:date            Reporte de un dia
GET    /api/reports/weekly                 Reporte semanal
GET    /api/reports/monthly/:month         Reporte mensual
GET    /api/reports/employee/:id           Rendimiento de un empleado
GET    /api/reports/branch/:id             Rendimiento de un punto
GET    /api/reports/profit                 Ganancias
GET    /api/reports/dashboard              Datos del dashboard del jefe
GET    /api/reports/export                 Exportar (CSV/PDF)
```

### 3.10 Sincronizacion Offline

```
POST   /api/sync/push                     Subir cambios locales al servidor
GET    /api/sync/pull                     Descargar cambios desde servidor
GET    /api/sync/status                   Estado de sincronizacion
POST   /api/sync/resolve                  Resolver conflicto
```

### 3.11 Notificaciones

```
GET    /api/notifications                  Mis notificaciones
PUT    /api/notifications/:id/read         Marcar como leida
PUT    /api/notifications/read-all         Marcar todas como leidas
POST   /api/notifications/register-device  Registrar token FCM
```

---

## 4. ESTRUCTURA DE PROYECTO

### 4.1 Backend (NestJS)

```
saraf-elite-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── app.config.ts
│   ├── common/
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts          # Jefe vs Empleado
│   │   │   └── boss-only.guard.ts      # Solo jefe
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── interceptors/
│   │   │   └── audit.interceptor.ts    # Log de auditoria automatico
│   │   └── utils/
│   │       ├── currency-calculator.ts  # Motor de conversion
│   │       └── formatters.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── dto/
│   │   ├── exchange/
│   │   │   ├── exchange.module.ts
│   │   │   ├── exchange.controller.ts
│   │   │   ├── exchange.service.ts      # Logica de operaciones
│   │   │   ├── calculator.service.ts    # Motor de calculo
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── rates/
│   │   │   ├── rates.module.ts
│   │   │   ├── rates.controller.ts
│   │   │   ├── rates.service.ts
│   │   │   ├── market-rates.service.ts  # APIs externas
│   │   │   └── dto/
│   │   ├── cash/
│   │   │   ├── cash.module.ts
│   │   │   ├── cash.controller.ts
│   │   │   ├── cash.service.ts
│   │   │   ├── closing.service.ts       # Cierre diario
│   │   │   └── dto/
│   │   ├── approval/
│   │   │   ├── approval.module.ts
│   │   │   ├── approval.controller.ts
│   │   │   ├── approval.service.ts      # Sistema de aprobacion
│   │   │   └── dto/
│   │   ├── employees/
│   │   │   ├── employees.module.ts
│   │   │   ├── employees.controller.ts
│   │   │   ├── employees.service.ts
│   │   │   └── dto/
│   │   ├── transfers/
│   │   │   ├── transfers.module.ts
│   │   │   ├── transfers.controller.ts
│   │   │   ├── transfers.service.ts     # Transferencias entre empleados
│   │   │   └── dto/
│   │   ├── clients/
│   │   │   ├── clients.module.ts
│   │   │   ├── clients.controller.ts
│   │   │   ├── clients.service.ts
│   │   │   ├── debts.service.ts
│   │   │   └── dto/
│   │   ├── reports/
│   │   │   ├── reports.module.ts
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── export.service.ts        # PDF/Excel
│   │   │   └── whatsapp-summary.service.ts
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── push.service.ts          # Firebase FCM
│   │   │   └── whatsapp.service.ts      # WhatsApp Business API
│   │   └── sync/
│   │       ├── sync.module.ts
│   │       ├── sync.controller.ts
│   │       ├── sync.service.ts
│   │       ├── sync.gateway.ts          # WebSocket
│   │       └── conflict-resolver.ts
│   └── database/
│       ├── migrations/
│       └── seeds/
├── docker-compose.yml
├── Dockerfile
├── package.json
└── .env.example
```

### 4.2 App Movil (React Native / Expo)

La app es una sola, pero muestra pantallas diferentes segun el rol (jefe o empleado):

```
saraf-elite-mobile/
├── app/                              # Expo Router
│   ├── (auth)/
│   │   └── login.tsx                 # Login con PIN
│   ├── (boss)/                       # PANTALLAS SOLO JEFE
│   │   ├── _layout.tsx
│   │   ├── index.tsx                 # Dashboard del jefe
│   │   ├── employees.tsx             # Ver empleados y sus cajas
│   │   ├── employee/[id].tsx         # Detalle de un empleado
│   │   ├── rates.tsx                 # Gestionar tasas
│   │   ├── approvals.tsx             # Aprobaciones pendientes
│   │   ├── transfers.tsx             # Transferencias entre empleados
│   │   ├── reports.tsx               # Reportes
│   │   ├── reports/daily.tsx
│   │   ├── reports/employee.tsx
│   │   ├── clients.tsx               # Todos los clientes
│   │   ├── clients/debts.tsx         # Deudas pendientes
│   │   ├── live.tsx                  # Monitor en tiempo real
│   │   └── settings.tsx              # Configuracion
│   ├── (employee)/                   # PANTALLAS EMPLEADO
│   │   ├── _layout.tsx
│   │   ├── index.tsx                 # Home del empleado (caja + botones)
│   │   ├── exchange.tsx              # NUEVA OPERACION (flujo 3 toques)
│   │   ├── exchange/confirm.tsx      # Confirmar operacion
│   │   ├── exchange/approval.tsx     # Esperando aprobacion
│   │   ├── history.tsx               # Mis operaciones de hoy
│   │   ├── cash.tsx                  # Mi caja
│   │   ├── cash/movement.tsx         # Registrar entrada/salida
│   │   ├── clients.tsx               # Buscar/registrar cliente
│   │   └── client/[id].tsx           # Detalle cliente
│   └── _layout.tsx                   # Router raiz (redirige segun rol)
├── src/
│   ├── components/
│   │   ├── ui/                       # Botones grandes, inputs, cards
│   │   │   ├── BigButton.tsx         # Boton ENORME para empleados
│   │   │   ├── NumericPad.tsx        # Teclado numerico grande
│   │   │   ├── CurrencyPicker.tsx    # Selector de divisa
│   │   │   ├── AmountDisplay.tsx     # Mostrar montos grande
│   │   │   ├── ConfirmModal.tsx      # Modal de confirmacion
│   │   │   └── StatusBadge.tsx
│   │   ├── boss/                     # Componentes del jefe
│   │   │   ├── EmployeeCard.tsx      # Tarjeta de empleado con caja
│   │   │   ├── ApprovalCard.tsx      # Tarjeta de aprobacion
│   │   │   ├── RateEditor.tsx        # Editor de tasa (+/-)
│   │   │   ├── LiveFeed.tsx          # Feed en tiempo real
│   │   │   ├── DailySummary.tsx
│   │   │   └── TransferForm.tsx
│   │   └── employee/                 # Componentes del empleado
│   │       ├── CashOverview.tsx      # Vista de mi caja
│   │       ├── QuickExchange.tsx     # Botones rapidos de divisa
│   │       ├── ExchangeResult.tsx    # Resultado de conversion
│   │       └── OperationCard.tsx     # Tarjeta de operacion
│   ├── services/
│   │   ├── api.ts                    # Cliente HTTP (Axios)
│   │   ├── exchange.service.ts
│   │   ├── rates.service.ts
│   │   ├── cash.service.ts
│   │   ├── employees.service.ts
│   │   ├── approvals.service.ts
│   │   ├── transfers.service.ts
│   │   ├── clients.service.ts
│   │   ├── reports.service.ts
│   │   ├── sync.service.ts
│   │   └── notifications.service.ts
│   ├── stores/                       # Zustand (estado global)
│   │   ├── auth.store.ts
│   │   ├── rates.store.ts
│   │   ├── cash.store.ts
│   │   ├── exchange.store.ts
│   │   └── notifications.store.ts
│   ├── database/                     # WatermelonDB (offline)
│   │   ├── schema.ts
│   │   ├── models/
│   │   └── sync/
│   ├── hooks/
│   │   ├── useExchange.ts            # Logica de operacion
│   │   ├── useCash.ts
│   │   ├── useSync.ts
│   │   └── useRole.ts                # Detectar si es jefe o empleado
│   ├── utils/
│   │   ├── calculator.ts             # Motor de conversion local
│   │   ├── formatter.ts              # Formateo montos
│   │   └── constants.ts
│   ├── i18n/
│   │   ├── ar.json                   # Arabe
│   │   ├── fr.json                   # Frances
│   │   └── es.json                   # Espanol
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts             # Fuentes grandes, legibles
│       └── boss-theme.ts             # Tema visual del jefe (diferente)
├── app.json
├── package.json
└── tailwind.config.js
```

---

## 5. ALGORITMOS CLAVE

### 5.1 Motor de Conversion (Local - Funciona Offline)

```typescript
/**
 * Calcula la conversion entre dos divisas.
 * Las tasas estan pre-cargadas localmente.
 * No necesita internet.
 */
function calculateExchange(
  amount: number,
  fromCurrency: string,    // Divisa que DA el cliente
  toCurrency: string,      // Divisa que QUIERE el cliente
  rates: LocalRateStore
): ExchangeResult {
  
  // Buscar par directo: ej EUR/DZD
  const directPair = rates.find(fromCurrency, toCurrency);
  
  if (directPair) {
    // Cliente da EUR, quiere DZD => nosotros COMPRAMOS EUR => usamos buy_rate
    const rate = directPair.sell_rate; // sell_rate = lo que damos por cada unidad
    const targetAmount = round(amount * rate, getDecimals(toCurrency));
    
    return {
      sourceAmount: amount,
      sourceCurrency: fromCurrency,
      targetAmount,
      targetCurrency: toCurrency,
      appliedRate: rate,
      // Ganancia = diferencia entre lo que compramos y lo que vale en mercado
      profit: directPair.market_rate 
        ? round(amount * Math.abs(rate - directPair.market_rate), 2)
        : 0
    };
  }
  
  // Buscar par inverso: ej si buscamos DZD/EUR pero tenemos EUR/DZD
  const inversePair = rates.find(toCurrency, fromCurrency);
  
  if (inversePair) {
    const rate = 1 / inversePair.buy_rate;
    const targetAmount = round(amount * rate, getDecimals(toCurrency));
    
    return {
      sourceAmount: amount,
      sourceCurrency: fromCurrency,
      targetAmount,
      targetCurrency: toCurrency,
      appliedRate: rate,
      profit: 0 // Se calcula en el servidor
    };
  }
  
  // Conversion encadenada via EUR (puente)
  const toEur = calculateExchange(amount, fromCurrency, 'EUR', rates);
  const fromEur = calculateExchange(toEur.targetAmount, 'EUR', toCurrency, rates);
  
  return {
    ...fromEur,
    sourceAmount: amount,
    sourceCurrency: fromCurrency,
    appliedRate: fromEur.targetAmount / amount
  };
}
```

### 5.2 Sistema de Aprobacion (Tiempo Real)

```typescript
/**
 * Flujo cuando un empleado quiere hacer una operacion que supera el limite.
 */

// EMPLEADO: Solicita aprobacion
async function requestApproval(transaction: PendingTransaction) {
  // 1. Guardar operacion como 'pending_approval' localmente
  await localDb.saveTransaction({
    ...transaction,
    status: 'pending_approval'
  });
  
  // 2. Si hay internet, enviar solicitud al servidor
  if (isOnline()) {
    const response = await api.post('/approvals', {
      ...transaction,
      employee_id: currentUser.id,
      branch_id: currentUser.branch_id
    });
    
    // 3. Esperar respuesta via WebSocket
    return waitForApprovalResponse(response.data.id);
  } else {
    // Sin internet: mostrar mensaje de que necesita internet para esto
    throw new Error('Se necesita conexion para operaciones grandes');
  }
}

// JEFE: Recibe y responde
async function handleApprovalRequest(request: ApprovalRequest) {
  // El jefe recibe notificacion push
  // En la app ve los detalles y decide
  
  // Si aprueba:
  await api.put(`/approvals/${request.id}/approve`);
  // -> El servidor envia push al empleado: "APROBADO"
  // -> El empleado puede confirmar la operacion
  
  // Si rechaza:
  await api.put(`/approvals/${request.id}/reject`, {
    reason: 'Monto muy alto para hoy'
  });
  // -> El servidor envia push al empleado: "RECHAZADO: Monto muy alto para hoy"
}
```

### 5.3 Sincronizacion Offline

```typescript
/**
 * Sincronizacion automatica cuando se detecta internet.
 * Prioridad: las operaciones del empleado SIEMPRE se suben primero.
 */
async function autoSync() {
  // 1. PUSH: Subir operaciones locales no sincronizadas
  const pendingOps = await localDb.getUnsyncedTransactions();
  const pendingMovements = await localDb.getUnsyncedCashMovements();
  
  if (pendingOps.length > 0 || pendingMovements.length > 0) {
    const pushResult = await api.post('/sync/push', {
      transactions: pendingOps,
      cashMovements: pendingMovements,
      lastSyncTimestamp: getLastSync()
    });
    
    // Marcar como sincronizadas
    for (const op of pushResult.synced) {
      await localDb.markSynced(op.local_id);
    }
  }
  
  // 2. PULL: Descargar cambios del servidor
  const pullResult = await api.get('/sync/pull', {
    params: { since: getLastSync() }
  });
  
  // Aplicar nuevas tasas (lo mas importante para empleados)
  if (pullResult.newRates.length > 0) {
    await localDb.updateRates(pullResult.newRates);
    showNotification('Tasas actualizadas por el jefe');
  }
  
  // Aplicar transferencias pendientes
  for (const transfer of pullResult.pendingTransfers) {
    await localDb.saveTransfer(transfer);
    showNotification(`Transferencia: ${transfer.description}`);
  }
  
  // Actualizar timestamp
  setLastSync(pullResult.serverTimestamp);
}

// Se ejecuta automaticamente cada vez que hay internet
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    autoSync();
  }
});
```

### 5.4 Propagacion de Tasas (Jefe -> Empleados)

```typescript
/**
 * Cuando el jefe cambia las tasas, llegan a todos los empleados.
 */

// SERVIDOR: Al recibir nuevas tasas del jefe
async function propagateRates(newRates: RateUpdate[], bossId: string) {
  // 1. Guardar en base de datos
  for (const rate of newRates) {
    await db.exchangeRates.update(rate);
    await db.rateHistory.insert({ ...rate, changed_by: bossId });
  }
  
  // 2. Enviar a todos los empleados conectados via WebSocket
  websocketServer.broadcast('rate_update', {
    rates: newRates,
    timestamp: new Date()
  });
  
  // 3. Enviar push notification a empleados offline
  const employees = await db.users.findAll({ role: 'employee', is_active: true });
  
  for (const emp of employees) {
    await pushService.send(emp.fcm_token, {
      title: 'تحديث الأسعار',  // "Actualizacion de tasas" en arabe
      body: formatRateSummary(newRates),
      data: { type: 'rate_update', rates: JSON.stringify(newRates) }
    });
  }
}
```

---

## 6. SEGURIDAD TECNICA

### 6.1 Autenticacion

```
EMPLEADO:
  - PIN de 6 digitos (bcrypt, 12 rounds)
  - Opcion de huella dactilar
  - JWT token (expira en 7 dias, se renueva automaticamente)
  - Bloqueo tras 5 intentos fallidos (30 minutos)

JEFE:
  - PIN de 6 digitos + contrasena para operaciones sensibles
  - JWT token (expira en 24h)
  - Puede desactivar cualquier empleado remotamente
```

### 6.2 Cifrado

```
Local (movil):
  - SQLite cifrado con SQLCipher (AES-256)
  - Clave derivada del PIN + ID del dispositivo
  - SecureStore para tokens y credenciales

Transito:
  - TLS 1.3 para todas las conexiones
  - WebSocket sobre WSS
  - Certificate pinning

Servidor:
  - PostgreSQL con campos sensibles cifrados (pgcrypto)
  - Backups cifrados antes de subir a la nube (AES-256-GCM)
```

### 6.3 Control de Acceso

```
Middleware de roles:
  /api/rates/* (PUT/POST)     -> Solo 'boss'
  /api/employees/*            -> Solo 'boss'
  /api/reports/*              -> Solo 'boss'
  /api/transfers/*            -> Solo 'boss'
  /api/approvals/*/approve    -> Solo 'boss'
  /api/approvals/*/reject     -> Solo 'boss'
  /api/cash/close-day         -> Solo 'boss'
  /api/settings/*             -> Solo 'boss'
  
  /api/transactions (POST)    -> 'boss' o 'employee'
  /api/cash/movement          -> 'boss' o 'employee' (solo su caja)
  /api/clients (POST)         -> 'boss' o 'employee'
  /api/approvals (POST)       -> Solo 'employee' (solicitar)

Filtro de datos:
  Empleado solo ve:
    - Sus propias operaciones
    - Su propia caja
    - Clientes compartidos (sin ver volumen total)
  
  Jefe ve todo.
```

---

## 7. RENDIMIENTO

| Metrica | Objetivo |
|---|---|
| Apertura de la app | < 1.5 segundos |
| Calculo de conversion | Instantaneo (< 50ms) |
| Registrar operacion | < 300ms (local) |
| Sincronizar 50 operaciones | < 3 segundos |
| Notificacion push al jefe | < 2 segundos |
| Cargar dashboard del jefe | < 1 segundo |
| Buscar cliente | < 200ms |
| Tamano de la app instalada | < 40 MB |
| Consumo de bateria | Minimo (sin GPS, sin polling agresivo) |

---

## 8. WHATSAPP: RESUMEN AUTOMATICO

El sistema puede enviar automaticamente un resumen al WhatsApp del jefe:

```
RESUMEN DIARIO - SARAF ELITE
13 Febrero 2026

47 operaciones | +12,450 DZD ganancia

AHMED (Aaioun): 23 ops | +5,200 DZD
OMAR (Tindouf): 15 ops | +4,800 DZD  
KARIM (Aaioun): 9 ops | +2,450 DZD

Caja total: EUR 15,775 | DZD 3,456,000 | MRU 257,000

Todo cuadra. Buen dia!
```

Este mensaje se genera y envia **automaticamente** cada noche. El jefe no tiene que hacer nada.

---

*Este documento complementa la Propuesta Principal (PROPUESTA_SISTEMA_CAMBIO_TINDOUF.md) con los detalles tecnicos necesarios para la implementacion de SARAF ELITE.*
