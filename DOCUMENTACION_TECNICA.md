# 📚 Documentación Técnica

## Arquitectura del Sistema

### Visión General

El sistema está compuesto por tres capas principales:

```
┌─────────────────────────────────────────┐
│         Capa de Presentación           │
│    (HTML5 + CSS3 + JavaScript)         │
│  - Interfaz responsive                 │
│  - Geolocation API                     │
│  - Leaflet Maps                        │
└─────────────────────────────────────────┘
                   ↕
┌─────────────────────────────────────────┐
│      Capa de Comunicación              │
│         (WebSocket/Socket.io)          │
│  - Tiempo real bidireccional           │
│  - Sincronización automática           │
└─────────────────────────────────────────┘
                   ↕
┌─────────────────────────────────────────┐
│         Capa de Servidor               │
│      (Node.js + Express)               │
│  - API REST                            │
│  - Gestión de dispositivos             │
│  - Persistencia de datos               │
└─────────────────────────────────────────┘
```

---

## 🔧 Componentes del Backend

### Server (server/index.js)

#### Responsabilidades:
- Servir archivos estáticos
- Gestionar conexiones WebSocket
- Almacenar y sincronizar ubicaciones
- Persistir datos en archivo JSON

#### Endpoints REST:

##### GET /api/devices
Obtiene lista de todos los dispositivos registrados.

**Respuesta:**
```json
{
  "devices": [
    {
      "id": "uuid",
      "name": "Mi Móvil",
      "type": "mobile",
      "location": {...},
      "lastSeen": "2026-01-01T12:00:00.000Z"
    }
  ]
}
```

##### POST /api/device/register
Registra un nuevo dispositivo.

**Body:**
```json
{
  "deviceName": "Mi Móvil",
  "deviceType": "mobile"
}
```

**Respuesta:**
```json
{
  "success": true,
  "device": {
    "id": "uuid",
    "name": "Mi Móvil",
    "type": "mobile",
    "registeredAt": "2026-01-01T12:00:00.000Z"
  }
}
```

##### POST /api/location/update
Actualiza la ubicación de un dispositivo.

**Body:**
```json
{
  "deviceId": "uuid",
  "location": {
    "latitude": 40.416775,
    "longitude": -3.703790,
    "accuracy": 15.5,
    "altitude": 650,
    "speed": 0,
    "timestamp": "2026-01-01T12:00:00.000Z"
  }
}
```

#### Eventos WebSocket:

##### Cliente → Servidor

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `register-device` | `{deviceName, deviceType, deviceId?}` | Registra nuevo dispositivo |
| `update-location` | `{deviceId, location}` | Actualiza ubicación |
| `request-location` | `{targetDeviceId}` | Solicita ubicación a otro dispositivo |

##### Servidor → Cliente

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `device-registered` | `{device}` | Confirmación de registro |
| `devices-list` | `{devices[]}` | Lista inicial de dispositivos |
| `location-update` | `{deviceId, device}` | Nueva ubicación disponible |
| `new-device` | `{device}` | Nuevo dispositivo conectado |
| `location-requested` | `{}` | Otro dispositivo solicita tu ubicación |

---

## 🎨 Componentes del Frontend

### Estructura de Módulos (app.js)

#### 1. AppState
Estado global de la aplicación.

```javascript
{
  socket: Socket,              // Conexión Socket.io
  map: L.Map,                  // Instancia de Leaflet
  markers: Map<id, {marker, circle}>,  // Marcadores en mapa
  currentDevice: Object,       // Dispositivo actual
  isTracking: Boolean,         // Estado de rastreo
  watchId: Number,            // ID del watchPosition
  devices: Map<id, Device>    // Todos los dispositivos
}
```

#### 2. LocationManager
Gestión de geolocalización.

**Métodos principales:**
- `requestPermission()`: Solicita permisos
- `getCurrentLocation()`: Obtiene ubicación única
- `startTracking(callback)`: Inicia rastreo continuo
- `stopTracking()`: Detiene rastreo
- `processPosition(position)`: Normaliza datos de posición

**Configuración:**
```javascript
{
  enableHighAccuracy: true,  // Máxima precisión (usa GPS)
  timeout: 10000,           // 10 segundos máximo
  maximumAge: 0             // Sin caché
}
```

#### 3. MapManager
Gestión del mapa interactivo.

**Métodos principales:**
- `init()`: Inicializa mapa Leaflet
- `updateMarker(deviceId, device)`: Actualiza/crea marcador
- `centerOnDevice(deviceId)`: Centra en dispositivo
- `fitAllMarkers()`: Ajusta vista para ver todos

**Características:**
- Marcadores personalizados con emojis
- Círculos de precisión
- Popups informativos
- Colores diferenciados (azul=tú, verde=otros)

#### 4. SocketManager
Gestión de comunicación en tiempo real.

**Métodos principales:**
- `connect()`: Establece conexión WebSocket
- `registerDevice(device)`: Registra dispositivo
- `updateLocation(deviceId, location)`: Envía ubicación
- `updateConnectionStatus(connected)`: Actualiza UI

#### 5. UI
Gestión de la interfaz de usuario.

**Métodos principales:**
- `init()`: Inicializa interfaz
- `showSetupScreen()`: Pantalla de configuración
- `showMainScreen()`: Pantalla principal
- `updateDevicesList()`: Actualiza lista de dispositivos
- `updateStats()`: Actualiza estadísticas
- `updateCurrentLocationInfo(location)`: Info de ubicación actual

#### 6. Utils
Utilidades generales.

**Funciones:**
- `saveToStorage(key, value)`: Guarda en localStorage
- `loadFromStorage(key)`: Carga de localStorage
- `detectDeviceType()`: Detecta tipo de dispositivo
- `formatDate(date)`: Formatea fecha
- `formatAccuracy(meters)`: Formatea precisión
- `timeAgo(date)`: Calcula tiempo transcurrido
- `getDeviceEmoji(type)`: Emoji según tipo

---

## 🔐 Seguridad

### Consideraciones

#### 1. HTTPS
- **Requerido en producción**: Los navegadores modernos requieren HTTPS para geolocalización
- **Excepción**: localhost funciona sin HTTPS

#### 2. Permisos
- Los usuarios deben otorgar permisos explícitamente
- Los permisos pueden revocarse en cualquier momento
- Se debe manejar la denegación de permisos

#### 3. Privacidad
- Las ubicaciones se transmiten en texto plano (considera cifrado)
- No hay autenticación (considera implementar autenticación)
- Los datos se almacenan temporalmente

#### 4. CORS
- Configurado para aceptar todas las conexiones (desarrollo)
- En producción, especifica dominios permitidos

```javascript
cors: {
  origin: "https://tu-dominio.com",
  methods: ["GET", "POST"]
}
```

---

## 📊 Flujo de Datos

### Flujo de Registro

```
1. Usuario abre aplicación
2. Detecta dispositivo (tipo, navegador)
3. Solicita nombre de dispositivo
4. Solicita permisos de ubicación
5. Genera UUID único
6. Guarda en localStorage
7. Envía registro al servidor vía WebSocket
8. Servidor asigna socket.id
9. Servidor responde con confirmación
10. Servidor notifica a otros dispositivos
11. Cliente muestra pantalla principal
```

### Flujo de Actualización de Ubicación

```
1. watchPosition() detecta cambio
2. LocationManager.processPosition()
3. Valida y normaliza datos
4. Actualiza estado local (AppState)
5. Actualiza marcador en mapa
6. Actualiza UI (info, stats)
7. Envía al servidor vía WebSocket
8. Servidor recibe y valida
9. Servidor actualiza memoria y archivo
10. Servidor emite a todos los clientes
11. Otros clientes actualizan sus mapas
```

---

## 🎯 Precisión de Geolocalización

### Factores que Afectan la Precisión

#### GPS (5-20m)
- ✅ **Mejor**: Exterior, cielo despejado
- ❌ **Peor**: Interior, edificios altos, mal clima

#### WiFi (20-50m)
- ✅ **Mejor**: Zonas urbanas, múltiples redes
- ❌ **Peor**: Zonas rurales, redes desconocidas

#### Torres Celulares (100-1000m)
- ✅ **Mejor**: Zonas con muchas torres
- ❌ **Peor**: Zonas rurales

#### IP Geolocation (1-10km)
- ❌ Siempre impreciso
- Solo como último recurso

### Optimización de Precisión

```javascript
// Configuración óptima
{
  enableHighAccuracy: true,  // Fuerza uso de GPS
  timeout: 10000,           // Suficiente tiempo
  maximumAge: 0             // Sin usar caché
}

// Mejorar estabilidad
- Esperar 10-15 segundos después de iniciar
- Promediar múltiples lecturas
- Filtrar valores anómalos (accuracy > 100m)
```

---

## 🚀 Optimizaciones

### Performance

1. **Debouncing de Ubicación**
   - No actualizar más de 1 vez por segundo
   - Evita sobrecarga del servidor

2. **Actualización Selectiva de Marcadores**
   - Solo actualizar marcadores que cambiaron
   - No recrear todo el mapa

3. **Compresión de Datos**
   - Redondear coordenadas a 6 decimales
   - Omitir campos nulos/undefined

4. **Caché de Tiles del Mapa**
   - Leaflet maneja caché automáticamente
   - Reduce peticiones a servidor de mapas

### Escalabilidad

1. **Base de Datos**
   - Para producción, usar MongoDB/PostgreSQL
   - Indexar por deviceId y timestamp

2. **Redis**
   - Caché de ubicaciones recientes
   - Pub/Sub para escalado horizontal

3. **Load Balancer**
   - Distribuir conexiones WebSocket
   - Sticky sessions requeridas

4. **CDN**
   - Servir archivos estáticos
   - Reducir latencia global

---

## 🧪 Testing

### Casos de Prueba

#### Funcionales
- [ ] Registro de dispositivo exitoso
- [ ] Actualización de ubicación correcta
- [ ] Sincronización entre múltiples dispositivos
- [ ] Reconexión automática tras desconexión
- [ ] Persistencia de datos tras reinicio

#### No Funcionales
- [ ] Precisión de ubicación < 50m en exterior
- [ ] Actualización < 5 segundos
- [ ] Soporte 100+ dispositivos simultáneos
- [ ] Responsive en móvil/tablet/desktop
- [ ] Funciona offline (sin sincronización)

### Herramientas Recomendadas
- **Jest**: Testing unitario
- **Cypress**: Testing E2E
- **Lighthouse**: Performance y PWA
- **Artillery**: Load testing WebSocket

---

## 📦 Despliegue

### Variables de Entorno Requeridas

```bash
PORT=3000
NODE_ENV=production
```

### Servicios Recomendados

#### Railway.app
```bash
railway login
railway init
railway up
```

#### Heroku
```bash
heroku create mi-app-tracking
git push heroku main
```

#### DigitalOcean
- Usar App Platform o Droplet
- Configurar Nginx como reverse proxy
- Habilitar SSL con Let's Encrypt

### Nginx Config
```nginx
server {
    listen 80;
    server_name tudominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔍 Debugging

### Logs del Servidor
```javascript
// Habilitar logs detallados
DEBUG=* node server/index.js
```

### Logs del Cliente
```javascript
// En consola del navegador
localStorage.debug = '*';
```

### Herramientas
- **Chrome DevTools**: Network, Console, Application
- **Wireshark**: Analizar tráfico WebSocket
- **Postman**: Probar endpoints REST

---

## 📚 Referencias

### APIs y Librerías
- [Geolocation API](https://developer.mozilla.org/es/docs/Web/API/Geolocation_API)
- [Socket.io](https://socket.io/docs/)
- [Leaflet](https://leafletjs.com/reference.html)
- [Express](https://expressjs.com/es/)

### Estándares
- [W3C Geolocation API Specification](https://www.w3.org/TR/geolocation/)
- [WebSocket Protocol RFC 6455](https://tools.ietf.org/html/rfc6455)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

---

**Última actualización: 2026-01-01**
