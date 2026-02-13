# ESPECIFICACIONES TECNICAS DETALLADAS

## SARAF PRO - Sistema Elite de Gestion de Cambio de Divisas

---

**Version:** 1.0  
**Fecha:** 13 de febrero de 2026  
**Documento:** Anexo Tecnico de la Propuesta

---

## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Patron Arquitectonico

El sistema sigue una **arquitectura de microservicios ligeros** con un enfoque **offline-first**:

```
                    +-----------------------+
                    |    LOAD BALANCER      |
                    |    (Nginx Reverse     |
                    |     Proxy + SSL)      |
                    +-----------+-----------+
                                |
                    +-----------+-----------+
                    |     API GATEWAY       |
                    |   (Rate Limiting,     |
                    |    Auth, Logging)     |
                    +-----------+-----------+
                                |
              +-----------------+-----------------+
              |                 |                 |
    +---------+------+ +-------+--------+ +------+---------+
    | EXCHANGE       | | USER & CLIENT  | | REPORTING      |
    | SERVICE        | | SERVICE        | | SERVICE        |
    |                | |                | |                |
    | - Conversiones | | - Auth/Login   | | - Reportes     |
    | - Tasas        | | - Clientes CRM | | - Analitica    |
    | - Caja         | | - Permisos     | | - Exportacion  |
    | - Operaciones  | | - Perfiles     | | - Graficos     |
    +--------+-------+ +-------+--------+ +-------+--------+
             |                 |                   |
             +--------+--------+--------+----------+
                      |                 |
            +---------+-------+ +-------+---------+
            |   PostgreSQL    | |     Redis       |
            |   (Persistente) | |   (Cache +      |
            |                 | |    Sesiones)    |
            +-----------------+ +-----------------+
```

### 1.2 Flujo de Datos Offline-First

```
+-------------------+     +-------------------+     +-------------------+
|   APP MOVIL       |     |   SYNC ENGINE     |     |   SERVIDOR        |
|                   |     |                   |     |                   |
|  SQLite Local     |<--->|  Cola de Cambios  |<--->|  PostgreSQL       |
|  (WatermelonDB)   |     |  (Conflict Res.)  |     |  (Fuente verdad)  |
|                   |     |                   |     |                   |
|  Estado Local     |     |  Sync Protocol    |     |  API REST         |
|  (Zustand/Redux)  |     |  (WebSocket +     |     |  (NestJS)         |
|                   |     |   HTTP Fallback)  |     |                   |
+-------------------+     +-------------------+     +-------------------+
```

### 1.3 Capas de la Aplicacion Movil

```
+----------------------------------------------------------+
|                  CAPA DE PRESENTACION                     |
|  React Native + React Navigation + NativeWind (Tailwind) |
|                                                            |
|  Screens -> Components -> Hooks -> Context                |
+----------------------------------------------------------+
|                  CAPA DE LOGICA DE NEGOCIO                |
|  Services -> UseCases -> Validators -> Calculators        |
|                                                            |
|  ExchangeService | CashService | ClientService | etc.    |
+----------------------------------------------------------+
|                  CAPA DE DATOS                            |
|  Repositories -> Models -> Sync -> Storage                |
|                                                            |
|  WatermelonDB (SQLite) | AsyncStorage | SecureStore       |
+----------------------------------------------------------+
|                  CAPA DE INFRAESTRUCTURA                  |
|  API Client -> WebSocket -> Push Notifications -> I18n    |
|                                                            |
|  Axios | Socket.io-client | FCM | i18next                |
+----------------------------------------------------------+
```

---

## 2. MODELO DE BASE DE DATOS COMPLETO

### 2.1 Esquema Relacional (PostgreSQL)

```sql
-- ============================================
-- TABLA: users (Operadores del sistema)
-- ============================================
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    full_name       VARCHAR(100) NOT NULL,
    phone           VARCHAR(20),
    pin_hash        VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(20) DEFAULT 'operator',  -- admin, operator, viewer
    language        VARCHAR(5) DEFAULT 'ar-DZ',
    is_active       BOOLEAN DEFAULT TRUE,
    last_login      TIMESTAMPTZ,
    config_json     JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: currencies (Divisas configuradas)
-- ============================================
CREATE TABLE currencies (
    code            VARCHAR(3) PRIMARY KEY,        -- EUR, DZD, MRU, XOF
    name_ar         VARCHAR(100) NOT NULL,
    name_fr         VARCHAR(100) NOT NULL,
    name_es         VARCHAR(100),
    symbol          VARCHAR(10) NOT NULL,
    decimal_places  SMALLINT DEFAULT 2,
    is_active       BOOLEAN DEFAULT TRUE,
    display_order   SMALLINT DEFAULT 0,
    country         VARCHAR(100),
    flag_emoji      VARCHAR(10),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: exchange_rates (Tasas de cambio actuales)
-- ============================================
CREATE TABLE exchange_rates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_currency   VARCHAR(3) REFERENCES currencies(code),
    quote_currency  VARCHAR(3) REFERENCES currencies(code),
    buy_rate        DECIMAL(18,6) NOT NULL,        -- Tasa de compra (operador compra)
    sell_rate       DECIMAL(18,6) NOT NULL,         -- Tasa de venta (operador vende)
    market_rate     DECIMAL(18,6),                  -- Tasa de referencia del mercado
    spread_pct      DECIMAL(8,4) GENERATED ALWAYS AS 
                    (((sell_rate - buy_rate) / buy_rate) * 100) STORED,
    is_active       BOOLEAN DEFAULT TRUE,
    source          VARCHAR(50) DEFAULT 'manual',   -- manual, api, contact
    updated_by      UUID REFERENCES users(id),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(base_currency, quote_currency)
);

-- ============================================
-- TABLA: rate_history (Historial de tasas)
-- ============================================
CREATE TABLE rate_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_currency   VARCHAR(3) REFERENCES currencies(code),
    quote_currency  VARCHAR(3) REFERENCES currencies(code),
    buy_rate        DECIMAL(18,6) NOT NULL,
    sell_rate       DECIMAL(18,6) NOT NULL,
    market_rate     DECIMAL(18,6),
    source          VARCHAR(50),
    recorded_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Indice para consultas rapidas de historial
CREATE INDEX idx_rate_history_pair_date 
    ON rate_history(base_currency, quote_currency, recorded_at DESC);

-- ============================================
-- TABLA: clients (Clientes del cambiador)
-- ============================================
CREATE TABLE clients (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(150) NOT NULL,
    phone           VARCHAR(20),
    whatsapp        VARCHAR(20),
    trust_level     SMALLINT DEFAULT 1 CHECK (trust_level BETWEEN 1 AND 5),
    credit_limit    DECIMAL(18,2) DEFAULT 0,
    credit_currency VARCHAR(3) DEFAULT 'EUR' REFERENCES currencies(code),
    preferred_currency VARCHAR(3) REFERENCES currencies(code),
    notes           TEXT,
    total_volume    DECIMAL(18,2) DEFAULT 0,       -- Volumen total en EUR equiv.
    transaction_count INTEGER DEFAULT 0,
    last_transaction TIMESTAMPTZ,
    is_active       BOOLEAN DEFAULT TRUE,
    tags            TEXT[],
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_name ON clients(full_name);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_clients_trust ON clients(trust_level);

-- ============================================
-- TABLA: cash_registers (Caja por divisa)
-- ============================================
CREATE TABLE cash_registers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    currency_code   VARCHAR(3) UNIQUE REFERENCES currencies(code),
    current_balance DECIMAL(18,2) NOT NULL DEFAULT 0,
    min_threshold   DECIMAL(18,2) DEFAULT 0,
    max_threshold   DECIMAL(18,2),
    last_updated    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: transactions (Operaciones de cambio)
-- ============================================
CREATE TABLE transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_type VARCHAR(20) NOT NULL,          -- exchange, deposit, withdrawal, adjustment
    
    -- Divisa que el operador COMPRA del cliente
    source_currency VARCHAR(3) REFERENCES currencies(code),
    source_amount   DECIMAL(18,2),
    
    -- Divisa que el operador VENDE al cliente
    target_currency VARCHAR(3) REFERENCES currencies(code),
    target_amount   DECIMAL(18,2),
    
    -- Tasa aplicada
    applied_rate    DECIMAL(18,6),
    market_rate_at_time DECIMAL(18,6),
    
    -- Ganancia
    profit_amount   DECIMAL(18,2),
    profit_currency VARCHAR(3) REFERENCES currencies(code),
    
    -- Referencias
    client_id       UUID REFERENCES clients(id),
    operator_id     UUID REFERENCES users(id) NOT NULL,
    
    -- Estado
    status          VARCHAR(20) DEFAULT 'completed', -- completed, pending, cancelled, reversed
    
    -- Metadatos
    notes           TEXT,
    receipt_url     VARCHAR(500),
    is_credit       BOOLEAN DEFAULT FALSE,
    credit_status   VARCHAR(20),                    -- null, pending, paid
    
    -- Sync
    local_id        VARCHAR(100),                   -- ID local para sync offline
    synced          BOOLEAN DEFAULT TRUE,
    
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_date ON transactions(created_at DESC);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_currencies ON transactions(source_currency, target_currency);
CREATE INDEX idx_transactions_operator ON transactions(operator_id, created_at DESC);

-- ============================================
-- TABLA: cash_movements (Movimientos de caja)
-- ============================================
CREATE TABLE cash_movements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cash_register_id UUID REFERENCES cash_registers(id),
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    movement_type   VARCHAR(20) NOT NULL,           -- credit, debit, adjustment
    amount          DECIMAL(18,2) NOT NULL,
    balance_before  DECIMAL(18,2) NOT NULL,
    balance_after   DECIMAL(18,2) NOT NULL,
    reason          VARCHAR(200),
    transaction_id  UUID REFERENCES transactions(id),
    operator_id     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cash_movements_register ON cash_movements(cash_register_id, created_at DESC);
CREATE INDEX idx_cash_movements_date ON cash_movements(created_at DESC);

-- ============================================
-- TABLA: daily_closings (Cierres de caja diarios)
-- ============================================
CREATE TABLE daily_closings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    closing_date    DATE NOT NULL UNIQUE,
    
    -- Resumen
    total_transactions  INTEGER DEFAULT 0,
    total_volume_eur    DECIMAL(18,2) DEFAULT 0,
    total_profit_dzd    DECIMAL(18,2) DEFAULT 0,
    total_profit_eur    DECIMAL(18,2) DEFAULT 0,
    
    -- Snapshot de cajas al cierre
    cash_snapshot   JSONB NOT NULL,
    /*  Formato:
        {
            "EUR": {"opening": 15000, "closing": 12450, "movements": "+3500/-6050"},
            "DZD": {"opening": 2000000, "closing": 2345600, "movements": "+1132350/-786750"},
            ...
        }
    */
    
    -- Detalles por par
    pair_details    JSONB,
    /*  Formato:
        {
            "EUR/DZD": {"count": 25, "volume": 8000, "profit": 6200},
            "EUR/MRU": {"count": 12, "volume": 4500, "profit": 3100},
            ...
        }
    */
    
    operator_id     UUID REFERENCES users(id),
    notes           TEXT,
    adjustments     JSONB,
    is_verified     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: pending_operations (Operaciones pendientes/reservas)
-- ============================================
CREATE TABLE pending_operations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id       UUID REFERENCES clients(id),
    operation_type  VARCHAR(30) NOT NULL,           -- rate_lock, deferred, promise
    source_currency VARCHAR(3) REFERENCES currencies(code),
    source_amount   DECIMAL(18,2),
    target_currency VARCHAR(3) REFERENCES currencies(code),
    locked_rate     DECIMAL(18,6),
    expires_at      TIMESTAMPTZ,
    status          VARCHAR(20) DEFAULT 'active',   -- active, completed, expired, cancelled
    notes           TEXT,
    transaction_id  UUID REFERENCES transactions(id), -- Se llena al completar
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: client_balances (Saldos pendientes con clientes)
-- ============================================
CREATE TABLE client_balances (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id       UUID REFERENCES clients(id),
    currency_code   VARCHAR(3) REFERENCES currencies(code),
    amount          DECIMAL(18,2) NOT NULL,         -- Positivo = cliente debe, Negativo = se le debe
    reason          TEXT,
    due_date        DATE,
    status          VARCHAR(20) DEFAULT 'pending',  -- pending, partial, paid, written_off
    transaction_id  UUID REFERENCES transactions(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_balances_client ON client_balances(client_id, status);

-- ============================================
-- TABLA: notifications (Notificaciones)
-- ============================================
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    type            VARCHAR(50) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    data_json       JSONB,
    is_read         BOOLEAN DEFAULT FALSE,
    channel         VARCHAR(20) DEFAULT 'app',      -- app, push, sms, whatsapp, email
    sent_at         TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- ============================================
-- TABLA: automation_rules (Reglas automaticas)
-- ============================================
CREATE TABLE automation_rules (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    trigger_type    VARCHAR(50) NOT NULL,            -- cash_threshold, rate_change, schedule, transaction
    trigger_config  JSONB NOT NULL,
    action_type     VARCHAR(50) NOT NULL,            -- notification, rate_adjust, block, report
    action_config   JSONB NOT NULL,
    is_active       BOOLEAN DEFAULT TRUE,
    last_triggered  TIMESTAMPTZ,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: audit_log (Registro de auditoria)
-- ============================================
CREATE TABLE audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    action          VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(50),
    entity_id       UUID,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_date ON audit_log(created_at DESC);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- ============================================
-- TABLA: settings (Configuracion del sistema)
-- ============================================
CREATE TABLE settings (
    key             VARCHAR(100) PRIMARY KEY,
    value           JSONB NOT NULL,
    category        VARCHAR(50),
    description     TEXT,
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Divisas principales
INSERT INTO currencies (code, name_ar, name_fr, name_es, symbol, decimal_places, display_order, country, flag_emoji) VALUES
('EUR', 'يورو', 'Euro', 'Euro', '€', 2, 1, 'Union Europea', '🇪🇺'),
('DZD', 'دينار جزائري', 'Dinar Algerien', 'Dinar Argelino', 'د.ج', 2, 2, 'Argelia', '🇩🇿'),
('MRU', 'أوقية موريتانية', 'Ouguiya Mauritanien', 'Uguiya Mauritana', 'UM', 2, 3, 'Mauritania', '🇲🇷'),
('XOF', 'فرنك غرب أفريقي', 'Franc CFA Ouest', 'Franco CFA Occidental', 'CFA', 0, 4, 'Africa Occidental', '🇸🇳');

-- Divisas secundarias
INSERT INTO currencies (code, name_ar, name_fr, name_es, symbol, decimal_places, display_order, country, flag_emoji, is_active) VALUES
('MAD', 'درهم مغربي', 'Dirham Marocain', 'Dirham Marroqui', 'MAD', 2, 5, 'Marruecos', '🇲🇦', FALSE),
('USD', 'دولار أمريكي', 'Dollar Americain', 'Dolar Estadounidense', '$', 2, 6, 'Estados Unidos', '🇺🇸', FALSE),
('GBP', 'جنيه إسترليني', 'Livre Sterling', 'Libra Esterlina', '£', 2, 7, 'Reino Unido', '🇬🇧', FALSE),
('TND', 'دينار تونسي', 'Dinar Tunisien', 'Dinar Tunecino', 'DT', 3, 8, 'Tunez', '🇹🇳', FALSE),
('LYD', 'دينار ليبي', 'Dinar Libyen', 'Dinar Libio', 'LD', 3, 9, 'Libia', '🇱🇾', FALSE);

-- Configuracion inicial
INSERT INTO settings (key, value, category, description) VALUES
('business_name', '"صراف تندوف"', 'general', 'Nombre del negocio'),
('default_language', '"ar-DZ"', 'general', 'Idioma por defecto'),
('auto_close_time', '"22:00"', 'cash', 'Hora de cierre automatico de caja'),
('max_idle_minutes', '5', 'security', 'Minutos de inactividad antes de bloquear'),
('backup_frequency', '"daily"', 'backup', 'Frecuencia de backup automatico'),
('receipt_enabled', 'true', 'operations', 'Generar recibos automaticamente'),
('whatsapp_receipts', 'false', 'operations', 'Enviar recibos por WhatsApp');
```

---

## 3. API REST - ENDPOINTS

### 3.1 Autenticacion

```
POST   /api/auth/login              Iniciar sesion (PIN o password)
POST   /api/auth/refresh            Renovar token JWT
POST   /api/auth/logout             Cerrar sesion
POST   /api/auth/change-pin         Cambiar PIN de acceso
```

### 3.2 Operaciones de Cambio (Core)

```
POST   /api/transactions            Crear nueva operacion de cambio
GET    /api/transactions            Listar operaciones (con filtros)
GET    /api/transactions/:id        Detalle de una operacion
PUT    /api/transactions/:id        Actualizar operacion (solo notas/estado)
POST   /api/transactions/:id/cancel Cancelar/revertir operacion
GET    /api/transactions/summary    Resumen de operaciones (hoy/semana/mes)
POST   /api/transactions/calculate  Calcular conversion (sin registrar)
```

### 3.3 Tasas de Cambio

```
GET    /api/rates                   Listar todas las tasas activas
PUT    /api/rates/:id               Actualizar tasa de un par
POST   /api/rates/bulk-update       Actualizar multiples tasas
GET    /api/rates/history           Historial de tasas
GET    /api/rates/market            Obtener tasas de mercado (APIs externas)
POST   /api/rates/sync-market       Sincronizar con tasas de mercado
```

### 3.4 Caja

```
GET    /api/cash                    Estado actual de todas las cajas
GET    /api/cash/:currency          Estado de una caja especifica
POST   /api/cash/movement           Registrar movimiento manual
GET    /api/cash/movements          Historial de movimientos
POST   /api/cash/close              Cerrar caja del dia
GET    /api/cash/closings           Historial de cierres
GET    /api/cash/closings/:date     Detalle de cierre de un dia
GET    /api/cash/total              Valor total en divisa de referencia
```

### 3.5 Clientes

```
GET    /api/clients                 Listar clientes (con busqueda/filtros)
POST   /api/clients                 Crear nuevo cliente
GET    /api/clients/:id             Detalle de cliente
PUT    /api/clients/:id             Actualizar cliente
GET    /api/clients/:id/transactions Operaciones del cliente
GET    /api/clients/:id/balances    Saldos pendientes del cliente
POST   /api/clients/:id/balances    Crear saldo pendiente
PUT    /api/clients/balances/:id    Actualizar saldo (pagar/ajustar)
GET    /api/clients/top             Top clientes por volumen
```

### 3.6 Reportes

```
GET    /api/reports/daily/:date     Reporte diario
GET    /api/reports/weekly          Reporte semanal
GET    /api/reports/monthly/:month  Reporte mensual
GET    /api/reports/profit          Reporte de ganancias
GET    /api/reports/volume          Reporte de volumen
GET    /api/reports/export          Exportar datos (CSV/Excel/PDF)
GET    /api/reports/dashboard       Datos del dashboard
```

### 3.7 Configuracion y Sistema

```
GET    /api/settings                Obtener configuracion
PUT    /api/settings                Actualizar configuracion
GET    /api/currencies              Listar divisas
PUT    /api/currencies/:code        Activar/desactivar divisa
POST   /api/backup                  Crear backup manual
GET    /api/backup/list             Listar backups disponibles
POST   /api/backup/restore          Restaurar desde backup
GET    /api/audit                   Consultar log de auditoria
```

### 3.8 Sincronizacion (Offline)

```
POST   /api/sync/push               Enviar cambios locales al servidor
GET    /api/sync/pull               Descargar cambios del servidor
GET    /api/sync/status             Estado de sincronizacion
POST   /api/sync/resolve-conflict    Resolver conflicto de sincronizacion
```

### 3.9 Notificaciones

```
GET    /api/notifications            Listar notificaciones
PUT    /api/notifications/:id/read   Marcar como leida
PUT    /api/notifications/read-all   Marcar todas como leidas
POST   /api/notifications/register   Registrar token push del dispositivo
```

---

## 4. ESTRUCTURA DE PROYECTO

### 4.1 Backend (NestJS)

```
saraf-pro-api/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── exchange/
│   │   │   ├── exchange.module.ts
│   │   │   ├── exchange.controller.ts
│   │   │   ├── exchange.service.ts
│   │   │   ├── exchange-calculator.service.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── cash/
│   │   │   ├── cash.module.ts
│   │   │   ├── cash.controller.ts
│   │   │   ├── cash.service.ts
│   │   │   ├── cash-closing.service.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── rates/
│   │   │   ├── rates.module.ts
│   │   │   ├── rates.controller.ts
│   │   │   ├── rates.service.ts
│   │   │   ├── market-rates.service.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── clients/
│   │   │   ├── clients.module.ts
│   │   │   ├── clients.controller.ts
│   │   │   ├── clients.service.ts
│   │   │   ├── client-balance.service.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── reports/
│   │   │   ├── reports.module.ts
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── export.service.ts
│   │   │   └── dto/
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── channels/
│   │   │   │   ├── push.channel.ts
│   │   │   │   ├── sms.channel.ts
│   │   │   │   └── whatsapp.channel.ts
│   │   │   └── dto/
│   │   ├── sync/
│   │   │   ├── sync.module.ts
│   │   │   ├── sync.controller.ts
│   │   │   ├── sync.service.ts
│   │   │   ├── sync.gateway.ts (WebSocket)
│   │   │   └── conflict-resolver.service.ts
│   │   ├── automation/
│   │   │   ├── automation.module.ts
│   │   │   ├── automation.service.ts
│   │   │   ├── rule-engine.service.ts
│   │   │   └── entities/
│   │   └── settings/
│   │       ├── settings.module.ts
│   │       ├── settings.controller.ts
│   │       └── settings.service.ts
│   └── database/
│       ├── migrations/
│       └── seeds/
├── test/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env.example
```

### 4.2 App Movil (React Native / Expo)

```
saraf-pro-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── pin.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home / Dashboard
│   │   ├── exchange.tsx          # Nueva operacion
│   │   ├── cash.tsx              # Estado de caja
│   │   ├── clients.tsx           # Lista de clientes
│   │   └── more.tsx              # Menu adicional
│   ├── transaction/
│   │   ├── [id].tsx              # Detalle de operacion
│   │   └── new.tsx               # Flujo nueva operacion
│   ├── client/
│   │   ├── [id].tsx              # Detalle de cliente
│   │   └── new.tsx               # Nuevo cliente
│   ├── rates/
│   │   └── index.tsx             # Gestion de tasas
│   ├── reports/
│   │   ├── index.tsx
│   │   ├── daily.tsx
│   │   └── profit.tsx
│   ├── settings/
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   │   ├── currencies.tsx
│   │   ├── rules.tsx
│   │   └── backup.tsx
│   └── _layout.tsx
├── src/
│   ├── components/
│   │   ├── ui/                   # Componentes base reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ...
│   │   ├── exchange/
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── AmountInput.tsx
│   │   │   ├── ConversionResult.tsx
│   │   │   ├── QuickExchange.tsx
│   │   │   └── TransactionCard.tsx
│   │   ├── cash/
│   │   │   ├── CashOverview.tsx
│   │   │   ├── CurrencyBalance.tsx
│   │   │   └── CashMovementItem.tsx
│   │   ├── clients/
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientSearch.tsx
│   │   │   └── BalanceIndicator.tsx
│   │   ├── rates/
│   │   │   ├── RateCard.tsx
│   │   │   ├── RateSlider.tsx
│   │   │   └── RateChart.tsx
│   │   └── dashboard/
│   │       ├── StatsCard.tsx
│   │       ├── RecentTransactions.tsx
│   │       └── ProfitChart.tsx
│   ├── services/
│   │   ├── api.ts                # Axios instance configurado
│   │   ├── exchange.service.ts
│   │   ├── cash.service.ts
│   │   ├── clients.service.ts
│   │   ├── rates.service.ts
│   │   ├── reports.service.ts
│   │   ├── sync.service.ts
│   │   └── notification.service.ts
│   ├── stores/                   # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── exchange.store.ts
│   │   ├── cash.store.ts
│   │   ├── rates.store.ts
│   │   ├── clients.store.ts
│   │   └── settings.store.ts
│   ├── database/                 # WatermelonDB (offline)
│   │   ├── schema.ts
│   │   ├── models/
│   │   │   ├── Transaction.ts
│   │   │   ├── Client.ts
│   │   │   ├── CashRegister.ts
│   │   │   ├── Rate.ts
│   │   │   └── ...
│   │   └── sync/
│   │       ├── syncAdapter.ts
│   │       └── conflictResolver.ts
│   ├── hooks/
│   │   ├── useExchange.ts
│   │   ├── useCash.ts
│   │   ├── useClients.ts
│   │   ├── useRates.ts
│   │   ├── useOffline.ts
│   │   └── useNotifications.ts
│   ├── utils/
│   │   ├── calculator.ts         # Motor de calculo de divisas
│   │   ├── formatter.ts          # Formateo de numeros/monedas
│   │   ├── validators.ts
│   │   ├── dateUtils.ts
│   │   └── constants.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── ar.json               # Traducciones arabe
│   │   ├── fr.json               # Traducciones frances
│   │   └── es.json               # Traducciones espanol
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
├── assets/
├── app.json
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── babel.config.js
```

### 4.3 Panel Web (Next.js)

```
saraf-pro-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/
│   │   ├── transactions/
│   │   ├── cash/
│   │   ├── clients/
│   │   ├── rates/
│   │   ├── reports/
│   │   └── settings/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── styles/
├── public/
├── package.json
└── next.config.js
```

---

## 5. ALGORITMOS CLAVE

### 5.1 Motor de Conversion

```typescript
interface ConversionResult {
  sourceAmount: number;
  sourceCurrency: string;
  targetAmount: number;
  targetCurrency: string;
  appliedRate: number;
  spreadPct: number;
  profitAmount: number;
  profitCurrency: string;
}

function calculateExchange(
  sourceAmount: number,
  sourceCurrency: string,
  targetCurrency: string,
  direction: 'buy' | 'sell',  // Desde perspectiva del operador
  rates: Map<string, ExchangeRate>
): ConversionResult {
  
  const pairKey = `${sourceCurrency}/${targetCurrency}`;
  const inversePairKey = `${targetCurrency}/${sourceCurrency}`;
  
  let rate: number;
  let marketRate: number;
  
  // Buscar tasa directa o inversa
  if (rates.has(pairKey)) {
    const pair = rates.get(pairKey);
    rate = direction === 'buy' ? pair.buyRate : pair.sellRate;
    marketRate = pair.marketRate;
  } else if (rates.has(inversePairKey)) {
    const pair = rates.get(inversePairKey);
    rate = direction === 'buy' ? (1 / pair.sellRate) : (1 / pair.buyRate);
    marketRate = pair.marketRate ? (1 / pair.marketRate) : null;
  } else {
    // Conversion encadenada via EUR (divisa puente)
    const toEur = calculateExchange(sourceAmount, sourceCurrency, 'EUR', direction, rates);
    return calculateExchange(toEur.targetAmount, 'EUR', targetCurrency, direction, rates);
  }
  
  const targetAmount = round(sourceAmount * rate, getCurrencyDecimals(targetCurrency));
  
  // Calcular ganancia (diferencia entre tasa aplicada y tasa de mercado)
  const profitAmount = marketRate 
    ? round(Math.abs(sourceAmount * (rate - marketRate)), 2) 
    : 0;
  
  return {
    sourceAmount,
    sourceCurrency,
    targetAmount,
    targetCurrency,
    appliedRate: rate,
    spreadPct: marketRate ? ((rate - marketRate) / marketRate * 100) : 0,
    profitAmount,
    profitCurrency: targetCurrency
  };
}
```

### 5.2 Sistema de Cierre de Caja Automatico

```typescript
async function performDailyClosing(date: Date, operatorId: string): Promise<DailyClosing> {
  const startOfDay = setHours(date, 0, 0, 0);
  const endOfDay = setHours(date, 23, 59, 59);
  
  // 1. Obtener todas las transacciones del dia
  const transactions = await getTransactions(startOfDay, endOfDay);
  
  // 2. Calcular resumen
  const summary = {
    totalTransactions: transactions.length,
    totalVolumeEur: 0,
    totalProfitDzd: 0,
    totalProfitEur: 0,
    byPair: {},
    byCurrency: {}
  };
  
  for (const tx of transactions) {
    // Acumular volumen en EUR equivalente
    summary.totalVolumeEur += convertToEur(tx.sourceAmount, tx.sourceCurrency);
    
    // Acumular ganancia
    if (tx.profitCurrency === 'DZD') {
      summary.totalProfitDzd += tx.profitAmount;
    }
    summary.totalProfitEur += convertToEur(tx.profitAmount, tx.profitCurrency);
    
    // Agrupar por par
    const pair = `${tx.sourceCurrency}/${tx.targetCurrency}`;
    if (!summary.byPair[pair]) {
      summary.byPair[pair] = { count: 0, volume: 0, profit: 0 };
    }
    summary.byPair[pair].count++;
    summary.byPair[pair].volume += tx.sourceAmount;
    summary.byPair[pair].profit += tx.profitAmount;
  }
  
  // 3. Snapshot de cajas
  const cashRegisters = await getAllCashRegisters();
  const cashSnapshot = {};
  for (const cr of cashRegisters) {
    const movements = await getCashMovements(cr.currencyCode, startOfDay, endOfDay);
    cashSnapshot[cr.currencyCode] = {
      opening: movements[0]?.balanceBefore ?? cr.currentBalance,
      closing: cr.currentBalance,
      totalIn: movements.filter(m => m.type === 'credit').reduce((s, m) => s + m.amount, 0),
      totalOut: movements.filter(m => m.type === 'debit').reduce((s, m) => s + m.amount, 0)
    };
  }
  
  // 4. Guardar cierre
  return await saveDailyClosing({
    closingDate: date,
    ...summary,
    cashSnapshot,
    operatorId
  });
}
```

### 5.3 Sincronizacion Offline

```typescript
interface SyncPacket {
  lastSyncTimestamp: string;
  pendingChanges: ChangeRecord[];
}

interface ChangeRecord {
  table: string;
  id: string;
  action: 'create' | 'update' | 'delete';
  data: any;
  localTimestamp: string;
}

async function syncWithServer(localDb: WatermelonDB, apiClient: ApiClient) {
  // 1. Recoger cambios locales pendientes
  const pendingChanges = await localDb.getPendingChanges();
  
  if (pendingChanges.length === 0 && !needsPull()) {
    return { status: 'up_to_date' };
  }
  
  // 2. Enviar cambios al servidor (PUSH)
  const pushResult = await apiClient.post('/sync/push', {
    lastSyncTimestamp: getLastSyncTimestamp(),
    pendingChanges
  });
  
  // 3. Manejar conflictos
  for (const conflict of pushResult.conflicts) {
    const resolution = resolveConflict(conflict);
    await apiClient.post('/sync/resolve-conflict', resolution);
  }
  
  // 4. Descargar cambios del servidor (PULL)
  const pullResult = await apiClient.get('/sync/pull', {
    since: getLastSyncTimestamp()
  });
  
  // 5. Aplicar cambios del servidor localmente
  await localDb.applyChanges(pullResult.changes);
  
  // 6. Actualizar timestamp de sincronizacion
  setLastSyncTimestamp(pullResult.serverTimestamp);
  
  // 7. Marcar cambios locales como sincronizados
  await localDb.markSynced(pendingChanges.map(c => c.id));
  
  return {
    status: 'synced',
    pushed: pendingChanges.length,
    pulled: pullResult.changes.length,
    conflicts: pushResult.conflicts.length
  };
}

function resolveConflict(conflict: SyncConflict): Resolution {
  // Estrategia: El cambio local siempre gana (el operador tiene razon)
  // Excepto para tasas de mercado (el servidor tiene la verdad)
  if (conflict.table === 'rate_history' && conflict.source === 'market') {
    return { winner: 'server', record: conflict.serverVersion };
  }
  return { winner: 'local', record: conflict.localVersion };
}
```

---

## 6. SEGURIDAD - DETALLES TECNICOS

### 6.1 Autenticacion y Autorizacion

```
Flujo de autenticacion:

1. APERTURA APP
   └─> PIN de 6 digitos O huella dactilar
       └─> Token JWT emitido (expira en 24h)
           └─> Acceso a funciones de operador

2. OPERACIONES SENSIBLES (borrar datos, config, exportar)
   └─> Contrasena maestra requerida
       └─> Token temporal de 5 minutos

3. PANEL WEB
   └─> Email/usuario + contrasena
       └─> 2FA opcional (TOTP)
           └─> Token JWT (expira en 8h)
```

### 6.2 Cifrado

```
DATOS EN REPOSO:
  - SQLite local: SQLCipher (AES-256-CBC)
  - PostgreSQL: pgcrypto para campos sensibles
  - Backups: AES-256-GCM antes de subir a la nube

DATOS EN TRANSITO:
  - TLS 1.3 para todas las conexiones HTTPS
  - WebSocket sobre WSS (TLS)
  - Certificate pinning en la app movil

CLAVES:
  - PIN: bcrypt con salt (12 rounds)
  - Password: Argon2id
  - Clave de cifrado local: derivada del PIN + device ID
```

---

## 7. RENDIMIENTO ESPERADO

| Metrica | Objetivo | Medicion |
|---|---|---|
| Tiempo de apertura app | < 2 segundos | Splash -> Home |
| Tiempo de calculo conversion | < 100ms | Instantaneo al escribir |
| Tiempo de registro operacion | < 500ms | Confirmar -> Registrado |
| Tiempo de busqueda cliente | < 200ms | Escribir -> Resultados |
| Tiempo de carga dashboard | < 1 segundo | Tap -> Dashboard completo |
| Sincronizacion (100 ops) | < 5 segundos | Push + Pull completado |
| Generacion reporte diario | < 3 segundos | Solicitar -> PDF listo |
| Uso de memoria (app) | < 150MB | En uso normal |
| Tamano de la app | < 50MB | Instalacion |
| Almacenamiento local 1 ano | < 500MB | ~15,000 operaciones/ano |

---

## 8. TESTING

### 8.1 Estrategia de Testing

| Tipo | Cobertura | Herramientas |
|---|---|---|
| Unit Tests | > 80% del core | Jest, Testing Library |
| Integration Tests | APIs completas | Supertest, TestContainers |
| E2E Tests (movil) | Flujos principales | Detox |
| E2E Tests (web) | Flujos principales | Playwright |
| Performance Tests | Endpoints criticos | k6 |
| Security Tests | OWASP Top 10 | OWASP ZAP |

### 8.2 Escenarios de Test Criticos

1. Conversion exacta para todos los pares de divisas
2. Actualizacion correcta de caja tras operacion
3. Cierre de caja con operaciones multiples
4. Sincronizacion offline -> online sin perdida de datos
5. Conflicto de sincronizacion resuelto correctamente
6. Acceso con PIN correcto/incorrecto
7. Bloqueo tras 5 intentos fallidos
8. Generacion de reportes con datos grandes
9. Rendimiento con 10,000+ operaciones en base de datos

---

*Este documento complementa la Propuesta Principal (PROPUESTA_SISTEMA_CAMBIO_TINDOUF.md) con los detalles tecnicos necesarios para la implementacion del sistema SARAF PRO.*
