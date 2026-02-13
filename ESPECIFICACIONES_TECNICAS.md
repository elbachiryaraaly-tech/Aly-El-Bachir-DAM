# ESPECIFICACIONES TÉCNICAS DETALLADAS
## Sistema Elite de Cambio de Moneda

---

## 📋 TABLA DE CONTENIDOS

1. [Arquitectura del Sistema](#arquitectura)
2. [Stack Tecnológico](#stack)
3. [Base de Datos](#database)
4. [APIs y Servicios Externos](#apis)
5. [Seguridad](#security)
6. [Interfaces de Usuario](#ui)
7. [Funcionalidades Detalladas](#features)
8. [Requisitos de Hardware](#hardware)
9. [Despliegue e Infraestructura](#deployment)
10. [Testing y Calidad](#testing)

---

## 1. ARQUITECTURA DEL SISTEMA {#arquitectura}

### 1.1 Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE PRESENTACIÓN                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  Aplicación  │  │   Panel Web  │  │  App Móvil      │   │
│  │   Desktop    │  │   (Next.js)  │  │  (React Native) │   │
│  │  (Electron)  │  │              │  │                 │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘   │
│         │                  │                   │             │
│         └──────────────────┴───────────────────┘             │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    REST API / WebSocket
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                  CAPA DE APLICACIÓN (Backend)                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Gateway (Express/FastAPI)           │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌─────────────┬────────┴────────┬─────────────────────┐   │
│  │             │                 │                      │   │
│  │  Módulo de  │  Módulo de     │  Módulo de          │   │
│  │  Tasas de   │  Transacciones │  Inventario         │   │
│  │  Cambio     │                 │                      │   │
│  └─────────────┘                 └──────────────────────┘   │
│                                                              │
│  ┌─────────────┬─────────────────┬─────────────────────┐   │
│  │  Módulo de  │  Módulo de      │  Módulo de         │   │
│  │  Clientes   │  Reportes       │  Notificaciones    │   │
│  └─────────────┘                 └─────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Capa de Servicios Compartidos               │   │
│  │  • Autenticación/Autorización                       │   │
│  │  • Logging y Auditoría                              │   │
│  │  • Cache Manager (Redis)                            │   │
│  │  • File Storage                                     │   │
│  │  • Email/SMS Service                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└────────────────────────────────┬─────────────────────────────┘
                                 │
┌────────────────────────────────┼─────────────────────────────┐
│                      CAPA DE DATOS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │  File Storage    │  │
│  │   (Primary)  │  │   (Cache)    │  │  (Documents)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Patrones de Diseño

- **Arquitectura:** Layered (N-Tier)
- **API:** RESTful + WebSocket para tiempo real
- **Base de Datos:** Repository Pattern
- **Seguridad:** JWT + OAuth2
- **Cache:** Cache-Aside Pattern
- **Mensajería:** Pub/Sub para notificaciones

---

## 2. STACK TECNOLÓGICO {#stack}

### 2.1 Aplicación Desktop (Principal)

#### Frontend
```javascript
// Tecnologías
{
  "framework": "Electron 28+",
  "ui-library": "React 18+",
  "ui-components": "Material-UI v5 / Ant Design",
  "language": "TypeScript 5+",
  "state-management": "Redux Toolkit / Zustand",
  "forms": "React Hook Form + Zod validation",
  "charts": "Chart.js / Recharts",
  "date-handling": "date-fns",
  "http-client": "Axios",
  "printing": "node-thermal-printer",
  "pdf-generation": "jsPDF",
  "qr-code": "qrcode.react",
  "i18n": "react-i18next"
}
```

#### Estructura de Carpetas
```
/desktop-app
├── /src
│   ├── /main              # Electron main process
│   ├── /renderer          # React application
│   │   ├── /components    # Componentes reutilizables
│   │   ├── /pages         # Páginas principales
│   │   ├── /features      # Módulos por funcionalidad
│   │   │   ├── /exchange  # Cambio de moneda
│   │   │   ├── /inventory # Gestión de inventario
│   │   │   ├── /clients   # Gestión de clientes
│   │   │   ├── /reports   # Reportes
│   │   │   └── /settings  # Configuración
│   │   ├── /store         # Redux store
│   │   ├── /services      # API services
│   │   ├── /utils         # Utilidades
│   │   ├── /hooks         # Custom React hooks
│   │   └── /types         # TypeScript types
│   └── /shared            # Código compartido main/renderer
├── /assets                # Imágenes, iconos, fuentes
├── /locales               # Traducciones (es, fr, ar)
└── /public                # Archivos públicos
```

### 2.2 Backend (Servidor)

#### Opción A: Node.js Stack
```javascript
{
  "runtime": "Node.js 20 LTS",
  "framework": "Express.js 4+",
  "language": "TypeScript 5+",
  "database-orm": "Prisma 5+",
  "validation": "Zod / Joi",
  "authentication": "Passport.js + JWT",
  "encryption": "bcrypt + crypto",
  "websocket": "Socket.io",
  "logging": "Winston + Morgan",
  "testing": "Jest + Supertest",
  "documentation": "Swagger/OpenAPI 3.0"
}
```

#### Opción B: Python Stack
```python
{
  "runtime": "Python 3.11+",
  "framework": "FastAPI 0.100+",
  "database-orm": "SQLAlchemy 2.0+",
  "validation": "Pydantic",
  "authentication": "python-jose + passlib",
  "async": "asyncio + uvicorn",
  "websocket": "FastAPI WebSocket",
  "logging": "loguru",
  "testing": "pytest + httpx",
  "documentation": "FastAPI auto-docs"
}
```

#### Estructura de Carpetas (Node.js)
```
/backend
├── /src
│   ├── /controllers       # Controladores de rutas
│   ├── /services          # Lógica de negocio
│   ├── /models            # Modelos de datos (Prisma)
│   ├── /middleware        # Middleware Express
│   ├── /routes            # Definición de rutas
│   ├── /utils             # Utilidades
│   ├── /validators        # Validaciones
│   ├── /config            # Configuración
│   └── /types             # TypeScript types
├── /prisma
│   ├── schema.prisma      # Schema de base de datos
│   └── /migrations        # Migraciones
├── /tests                 # Tests unitarios e integración
└── /docs                  # Documentación API
```

### 2.3 Panel Web (Administración Remota)

```javascript
{
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript",
  "ui-library": "Tailwind CSS + shadcn/ui",
  "charts": "Recharts",
  "forms": "React Hook Form",
  "authentication": "NextAuth.js",
  "state": "React Query / SWR",
  "deployment": "Vercel / AWS Amplify"
}
```

### 2.4 App Móvil (Opcional)

```javascript
{
  "framework": "React Native 0.73+",
  "language": "TypeScript",
  "ui-library": "React Native Paper",
  "navigation": "React Navigation 6+",
  "state": "Redux Toolkit",
  "notifications": "React Native Push Notification",
  "charts": "react-native-chart-kit",
  "platforms": ["iOS", "Android"]
}
```

---

## 3. BASE DE DATOS {#database}

### 3.1 Sistema de Base de Datos

**PostgreSQL 15+**
- RDBMS robusto y probado
- Soporte completo de transacciones ACID
- Excelente rendimiento con índices
- JSON/JSONB para datos flexibles
- Extensiones útiles: pgcrypto, uuid-ossp

### 3.2 Esquema de Base de Datos

#### Tabla: users (Usuarios)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'operator', 'viewer')),
    is_active BOOLEAN DEFAULT true,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(32),
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

#### Tabla: currencies (Monedas)
```sql
CREATE TABLE currencies (
    code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(5) NOT NULL,
    country VARCHAR(50),
    flag_emoji VARCHAR(10),
    decimal_places SMALLINT DEFAULT 2,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales
INSERT INTO currencies (code, name, symbol, country, flag_emoji) VALUES
('EUR', 'Euro', '€', 'Eurozone', '🇪🇺'),
('DZD', 'Dinar Argelino', 'DA', 'Algeria', '🇩🇿'),
('MRU', 'Ouguiya Mauritano', 'UM', 'Mauritania', '🇲🇷'),
('XOF', 'Franco CFA', 'CFA', 'West Africa', '🌍'),
('MAD', 'Dirham Marroquí', 'DH', 'Morocco', '🇲🇦'),
('USD', 'Dólar USA', '$', 'United States', '🇺🇸');
```

#### Tabla: exchange_rates (Tasas de Cambio)
```sql
CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    base_currency VARCHAR(3) REFERENCES currencies(code),
    target_currency VARCHAR(3) REFERENCES currencies(code),
    rate DECIMAL(18, 8) NOT NULL,
    buy_rate DECIMAL(18, 8),
    sell_rate DECIMAL(18, 8),
    margin_percentage DECIMAL(5, 2) DEFAULT 2.00,
    source VARCHAR(50), -- 'manual', 'api_exchangerate', 'api_fixer', etc.
    is_manual BOOLEAN DEFAULT false,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(base_currency, target_currency, valid_from)
);

CREATE INDEX idx_rates_base_target ON exchange_rates(base_currency, target_currency);
CREATE INDEX idx_rates_valid_from ON exchange_rates(valid_from DESC);
```

#### Tabla: transactions (Transacciones)
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_number VARCHAR(50) UNIQUE NOT NULL, -- 2026-0213-00001
    from_currency VARCHAR(3) REFERENCES currencies(code),
    to_currency VARCHAR(3) REFERENCES currencies(code),
    from_amount DECIMAL(18, 2) NOT NULL,
    to_amount DECIMAL(18, 2) NOT NULL,
    exchange_rate DECIMAL(18, 8) NOT NULL,
    commission_amount DECIMAL(18, 2) DEFAULT 0,
    commission_percentage DECIMAL(5, 2) DEFAULT 0,
    client_id UUID REFERENCES clients(id),
    user_id UUID REFERENCES users(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled', 'reversed')),
    payment_method VARCHAR(20) DEFAULT 'cash',
    notes TEXT,
    ticket_printed BOOLEAN DEFAULT false,
    ticket_data JSONB, -- Datos del ticket para reimpresión
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP
);

CREATE INDEX idx_trans_number ON transactions(transaction_number);
CREATE INDEX idx_trans_date ON transactions(created_at DESC);
CREATE INDEX idx_trans_client ON transactions(client_id);
CREATE INDEX idx_trans_user ON transactions(user_id);
CREATE INDEX idx_trans_status ON transactions(status);
```

#### Tabla: clients (Clientes)
```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    id_type VARCHAR(20), -- 'passport', 'national_id', 'other'
    id_number VARCHAR(50),
    id_expiry DATE,
    date_of_birth DATE,
    nationality VARCHAR(50),
    address TEXT,
    tier VARCHAR(20) DEFAULT 'regular' CHECK (tier IN ('new', 'regular', 'vip', 'premium')),
    preferred_currencies VARCHAR(20)[], -- Array de códigos
    total_transactions INTEGER DEFAULT 0,
    total_volume DECIMAL(18, 2) DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    preferred_margin DECIMAL(5, 2), -- Margen especial si es VIP
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    kyc_verified BOOLEAN DEFAULT false,
    kyc_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_transaction_at TIMESTAMP
);

CREATE INDEX idx_clients_name ON clients(full_name);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_clients_tier ON clients(tier);
CREATE INDEX idx_clients_active ON clients(is_active);
```

#### Tabla: inventory (Inventario de Efectivo)
```sql
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    currency VARCHAR(3) REFERENCES currencies(code),
    amount DECIMAL(18, 2) NOT NULL DEFAULT 0,
    minimum_amount DECIMAL(18, 2) DEFAULT 1000,
    optimal_amount DECIMAL(18, 2) DEFAULT 5000,
    location VARCHAR(50) DEFAULT 'main',
    last_count_physical DECIMAL(18, 2),
    last_count_at TIMESTAMP,
    last_count_by UUID REFERENCES users(id),
    discrepancy DECIMAL(18, 2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(currency, location)
);

CREATE INDEX idx_inventory_currency ON inventory(currency);
```

#### Tabla: inventory_movements (Movimientos de Inventario)
```sql
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    currency VARCHAR(3) REFERENCES currencies(code),
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment', 'transfer', 'count')),
    amount DECIMAL(18, 2) NOT NULL,
    balance_after DECIMAL(18, 2) NOT NULL,
    reference_type VARCHAR(30), -- 'transaction', 'manual', 'bank_deposit', etc.
    reference_id UUID, -- ID de transacción o movimiento relacionado
    user_id UUID REFERENCES users(id) NOT NULL,
    location VARCHAR(50) DEFAULT 'main',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invmov_currency ON inventory_movements(currency);
CREATE INDEX idx_invmov_date ON inventory_movements(created_at DESC);
CREATE INDEX idx_invmov_type ON inventory_movements(movement_type);
```

#### Tabla: alerts (Alertas)
```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type VARCHAR(30) NOT NULL,
    severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    related_entity VARCHAR(50), -- 'inventory', 'exchange_rate', 'transaction', etc.
    related_id UUID,
    is_read BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    resolved_at TIMESTAMP,
    resolved_by UUID REFERENCES users(id)
);

CREATE INDEX idx_alerts_unread ON alerts(is_read, created_at DESC);
CREATE INDEX idx_alerts_type ON alerts(alert_type);
```

#### Tabla: reports (Reportes Generados)
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    format VARCHAR(10) CHECK (format IN ('pdf', 'excel', 'csv', 'json')),
    parameters JSONB, -- Parámetros usados para generar
    file_path VARCHAR(255),
    file_size INTEGER,
    generated_by UUID REFERENCES users(id),
    date_from DATE,
    date_to DATE,
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_type ON reports(report_type);
CREATE INDEX idx_reports_date ON reports(created_at DESC);
```

#### Tabla: audit_log (Registro de Auditoría)
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_date ON audit_log(created_at DESC);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
```

#### Tabla: settings (Configuración del Sistema)
```sql
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    category VARCHAR(50),
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configuraciones iniciales
INSERT INTO settings (key, value, category, description) VALUES
('default_commission', '{"percentage": 2.0}', 'rates', 'Comisión por defecto'),
('auto_update_rates', '{"enabled": true, "interval": 900}', 'rates', 'Actualización automática cada 15 min'),
('low_inventory_threshold', '{"enabled": true, "percentage": 20}', 'inventory', 'Alerta cuando inventario < 20%'),
('backup_schedule', '{"enabled": true, "frequency": "hourly"}', 'system', 'Backup automático cada hora');
```

### 3.3 Índices y Optimizaciones

```sql
-- Índices compuestos para consultas comunes
CREATE INDEX idx_trans_date_status ON transactions(created_at DESC, status);
CREATE INDEX idx_trans_client_date ON transactions(client_id, created_at DESC);

-- Índices parciales para mejorar rendimiento
CREATE INDEX idx_trans_pending ON transactions(created_at DESC) WHERE status = 'pending';
CREATE INDEX idx_alerts_unresolved ON alerts(created_at DESC) WHERE is_resolved = false;

-- Full-text search para clientes
CREATE INDEX idx_clients_fulltext ON clients USING gin(to_tsvector('simple', full_name || ' ' || COALESCE(phone, '') || ' ' || COALESCE(email, '')));
```

### 3.4 Vistas Útiles

```sql
-- Vista de estado actual de tasas
CREATE VIEW current_exchange_rates AS
SELECT DISTINCT ON (base_currency, target_currency)
    base_currency,
    target_currency,
    buy_rate,
    sell_rate,
    margin_percentage,
    source,
    updated_at
FROM exchange_rates
WHERE valid_until IS NULL OR valid_until > CURRENT_TIMESTAMP
ORDER BY base_currency, target_currency, valid_from DESC;

-- Vista de estadísticas diarias
CREATE VIEW daily_stats AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as transaction_count,
    SUM(commission_amount) as total_commission,
    COUNT(DISTINCT client_id) as unique_clients,
    AVG(to_amount) as avg_transaction_value
FROM transactions
WHERE status = 'completed'
GROUP BY DATE(created_at);
```

### 3.5 Redis (Cache)

**Estructura de Cache:**
```
Key Pattern                          | TTL    | Descripción
-------------------------------------|--------|---------------------------
rates:{base}:{target}                | 900s   | Tasas de cambio actuales
inventory:{currency}                 | 60s    | Inventario actual
stats:today                          | 300s   | Estadísticas del día
client:{id}:transactions             | 600s   | Últimas trans de cliente
session:{token}                      | 3600s  | Sesiones de usuario
api:ratelimit:{ip}:{endpoint}        | 60s    | Rate limiting de API
```

---

## 4. APIs Y SERVICIOS EXTERNOS {#apis}

### 4.1 APIs de Tasas de Cambio

#### ExchangeRate-API
```javascript
// Configuración
const EXCHANGERATE_API = {
  baseUrl: 'https://v6.exchangerate-api.com/v6',
  apiKey: process.env.EXCHANGERATE_API_KEY,
  endpoint: '/latest/{base_currency}',
  rateLimit: '1500 requests/month (free)',
  updateFrequency: 'Daily (free) / Hourly (paid)'
};

// Ejemplo de implementación
async function fetchRatesFromExchangeRate(baseCurrency) {
  const response = await axios.get(
    `${EXCHANGERATE_API.baseUrl}/${EXCHANGERATE_API.apiKey}/latest/${baseCurrency}`
  );
  return response.data.conversion_rates;
}
```

#### Fixer.io
```javascript
const FIXER_API = {
  baseUrl: 'https://api.fixer.io',
  apiKey: process.env.FIXER_API_KEY,
  endpoint: '/latest',
  params: {
    base: 'EUR',
    symbols: 'DZD,MRU,XOF,MAD,USD'
  }
};
```

### 4.2 Servicio de Notificaciones

#### SMS (Twilio)
```javascript
const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to, message) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
  });
}
```

#### Email (SendGrid/Nodemailer)
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  await sgMail.send({
    to: to,
    from: 'noreply@exchange.com',
    subject: subject,
    html: html
  });
}
```

### 4.3 Servicio de Backup (AWS S3 / DigitalOcean Spaces)

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

async function backupDatabase() {
  const timestamp = new Date().toISOString();
  const filename = `backup-${timestamp}.sql`;
  
  // Dump de PostgreSQL
  const dump = await execShellCommand(
    `pg_dump -h localhost -U ${DB_USER} ${DB_NAME} > /tmp/${filename}`
  );
  
  // Upload a S3
  const fileContent = fs.readFileSync(`/tmp/${filename}`);
  await s3.putObject({
    Bucket: 'exchange-backups',
    Key: filename,
    Body: fileContent
  }).promise();
}
```

---

## 5. SEGURIDAD {#security}

### 5.1 Autenticación

**JWT (JSON Web Tokens)**
```javascript
// Generación de token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
      issuer: 'exchange-system'
    }
  );
}

// Verificación
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// Refresh token
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}
```

**2FA (Autenticación de Dos Factores)**
```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generar secret para 2FA
function generate2FASecret(username) {
  const secret = speakeasy.generateSecret({
    name: `Exchange System (${username})`
  });
  return {
    secret: secret.base32,
    qrCode: await QRCode.toDataURL(secret.otpauth_url)
  };
}

// Verificar código 2FA
function verify2FACode(secret, token) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2
  });
}
```

### 5.2 Cifrado de Datos

```javascript
const crypto = require('crypto');

// Cifrado AES-256
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    iv
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    iv
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Hash de contraseñas
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### 5.3 Middleware de Seguridad

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: 'Demasiadas solicitudes, intente más tarde'
});

// CORS
const cors = require('cors');
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));

// Helmet (Security headers)
const helmet = require('helmet');
app.use(helmet());

// Input sanitization
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

---

## 6. INTERFACES DE USUARIO {#ui}

### 6.1 Diseño de Interfaz

**Principios de Diseño:**
- Material Design 3 / Fluent Design
- Responsive (adaptable a diferentes tamaños)
- Accesibilidad (WCAG 2.1 AA)
- Темная y clara (dark/light mode)
- RTL support para árabe

**Colores del Sistema:**
```css
:root {
  /* Primarios */
  --primary: #1976d2;
  --primary-dark: #115293;
  --primary-light: #4791db;
  
  /* Secundarios */
  --secondary: #dc004e;
  --secondary-dark: #9a0036;
  --secondary-light: #e33371;
  
  /* Estados */
  --success: #4caf50;
  --warning: #ff9800;
  --error: #f44336;
  --info: #2196f3;
  
  /* Neutros */
  --background: #fafafa;
  --surface: #ffffff;
  --text-primary: #212121;
  --text-secondary: #757575;
}
```

### 6.2 Componentes Principales

#### Dashboard Principal
```typescript
interface DashboardProps {
  todayStats: {
    transactionCount: number;
    totalVolume: number;
    totalCommission: number;
    uniqueClients: number;
  };
  currentInventory: InventoryItem[];
  recentTransactions: Transaction[];
  alerts: Alert[];
  exchangeRates: ExchangeRate[];
}
```

#### Formulario de Transacción
```typescript
interface TransactionFormData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  clientId?: string;
  notes?: string;
}

// Validación con Zod
const transactionSchema = z.object({
  fromCurrency: z.string().length(3),
  toCurrency: z.string().length(3),
  fromAmount: z.number().positive(),
  toAmount: z.number().positive(),
  clientId: z.string().uuid().optional(),
  notes: z.string().max(500).optional()
});
```

---

*Continúa en siguientes secciones...*

## 7. DESPLIEGUE {#deployment}

### 7.1 Docker Configuration

```dockerfile
# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: exchange_db
      POSTGRES_USER: exchange_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://exchange_user:${DB_PASSWORD}@postgres:5432/exchange_db
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

volumes:
  postgres-data:
  redis-data:
```

---

**FIN DE ESPECIFICACIONES TÉCNICAS**

*Para más información, consultar la propuesta principal.*
