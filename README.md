# 📍 Sistema de Rastreo de Ubicación en Tiempo Real

Sistema completo de rastreo de ubicación de **máxima precisión** que permite sincronizar y visualizar la ubicación entre múltiples dispositivos (móviles y ordenadores) en tiempo real.

---

## 🎯 ¿Qué hace este proyecto?

Permite que tu **móvil** y tu **ordenador** se rastreen mutuamente en tiempo real con:
- ✅ **GPS de alta precisión** (5-20 metros en exterior)
- ✅ **Sincronización instantánea** mediante WebSockets
- ✅ **Mapa interactivo** para ver todos tus dispositivos
- ✅ **Sin aplicaciones** - solo necesitas un navegador web

**Perfecto para**: saber dónde dejaste tu teléfono, compartir ubicación con familia, rastrear tus dispositivos, coordinación de grupos, etc.

## ✨ Características

- 🎯 **Geolocalización de Alta Precisión**: Utiliza la API de Geolocation con configuración de máxima precisión
- 🔄 **Sincronización en Tiempo Real**: Comunicación bidireccional mediante WebSockets (Socket.io)
- 📱 **Multi-dispositivo**: Funciona en móviles, tablets, ordenadores y portátiles
- 🗺️ **Visualización en Mapa**: Interfaz con mapas interactivos (Leaflet + OpenStreetMap)
- 💾 **Persistencia de Datos**: Almacenamiento local y en servidor
- 🎨 **Diseño Responsive**: Interfaz moderna y adaptable a cualquier pantalla
- 📊 **Estadísticas en Tiempo Real**: Precisión, última actualización y dispositivos activos
- 🔔 **Notificaciones**: Sistema de alertas para eventos importantes
- 🌐 **PWA Ready**: Instalable como aplicación nativa en dispositivos móviles

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- Navegador web moderno con soporte de geolocalización

### Instalación

1. **Clonar o descargar el repositorio**

```bash
git clone <url-del-repositorio>
cd device-location-tracker
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor**

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

### Modo Desarrollo

Para desarrollo con recarga automática:

```bash
npm run dev
```

## 📖 Guía de Uso

### Configuración Inicial

1. **Abrir en tu primer dispositivo**
   - Abre `http://localhost:3000` (o la IP de tu servidor) en tu navegador
   - Ingresa un nombre descriptivo (ej: "iPhone de Juan")
   - Selecciona el tipo de dispositivo
   - Haz clic en "Comenzar Rastreo"
   - Acepta los permisos de ubicación cuando se soliciten

2. **Abrir en tu segundo dispositivo**
   - Repite el proceso anterior en otro dispositivo
   - Usa la misma URL para conectar al mismo servidor
   - Ambos dispositivos comenzarán a verse mutuamente

### Uso de la Aplicación

#### Panel de Control
- **Dispositivos**: Número total de dispositivos conectados
- **Precisión**: Precisión actual de tu ubicación (en metros)
- **Última Actualización**: Tiempo desde la última actualización de ubicación

#### Botones de Acción
- **▶️ Iniciar/⏸️ Pausar Rastreo**: Activa o pausa el rastreo de tu ubicación
- **🎯 Centrar en Mí**: Centra el mapa en tu ubicación actual
- **🔄 Actualizar**: Fuerza una actualización inmediata de ubicación

#### Mapa Interactivo
- **Marcadores**: 
  - 🔵 Azul: Tu dispositivo
  - 🟢 Verde: Otros dispositivos
- **Círculos**: Representan el área de precisión de cada ubicación
- **Popup**: Haz clic en un marcador para ver detalles

#### Lista de Dispositivos
- Muestra todos los dispositivos rastreados
- Información de precisión y última actualización
- Botón "Ver en Mapa" para centrar en cada dispositivo

## 🌐 Acceso Remoto

### Opción 1: Red Local (LAN)

1. Encuentra la IP local de tu servidor:
```bash
# En Linux/Mac
ifconfig | grep inet

# En Windows
ipconfig
```

2. Abre en otros dispositivos: `http://[IP-LOCAL]:3000`
   - Ejemplo: `http://192.168.1.100:3000`

### Opción 2: Túnel con ngrok (Internet)

Para acceso desde cualquier lugar:

1. Instala ngrok: https://ngrok.com/download

2. Inicia el túnel:
```bash
ngrok http 3000
```

3. Usa la URL proporcionada (ej: `https://abc123.ngrok.io`)

### Opción 3: Desplegar en Servidor

Puedes desplegar en servicios como:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **DigitalOcean**: https://digitalocean.com

## 🔧 Configuración Avanzada

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=production
```

### Configuración de Geolocalización

En `public/app.js`, puedes ajustar los parámetros:

```javascript
const CONFIG = {
    LOCATION_UPDATE_INTERVAL: 5000,  // Intervalo de actualización (ms)
    ENABLE_HIGH_ACCURACY: true,       // Máxima precisión
    TIMEOUT: 10000,                   // Tiempo de espera (ms)
    MAXIMUM_AGE: 0                    // Edad máxima de caché (ms)
};
```

### Puerto del Servidor

Modifica el puerto en `server/index.js`:

```javascript
const PORT = process.env.PORT || 3000;
```

## 📱 Instalar como PWA

### En Android (Chrome/Edge):

1. Abre la aplicación en el navegador
2. Toca el menú (⋮) → "Instalar aplicación" o "Añadir a pantalla de inicio"
3. Confirma la instalación

### En iOS (Safari):

1. Abre la aplicación en Safari
2. Toca el botón de compartir (□↑)
3. Selecciona "Añadir a pantalla de inicio"
4. Confirma

### En PC (Chrome/Edge):

1. Busca el icono de instalación (+) en la barra de direcciones
2. Haz clic en "Instalar"

## 🔒 Consideraciones de Seguridad

- **HTTPS Recomendado**: Para producción, usa HTTPS para garantizar permisos de geolocalización
- **Privacidad**: Las ubicaciones se almacenan temporalmente en el servidor
- **Permisos**: Los usuarios deben otorgar permisos de ubicación explícitamente
- **Datos Sensibles**: No compartas las URLs públicas con desconocidos

## 🐛 Solución de Problemas

### La ubicación no se actualiza

- Verifica que los permisos de ubicación estén habilitados
- Comprueba que estés usando HTTPS (requerido en algunos navegadores)
- Revisa la consola del navegador para errores
- Asegúrate de que el GPS esté activado en dispositivos móviles

### No se conecta al servidor

- Verifica que el servidor esté ejecutándose
- Comprueba que uses la URL correcta (IP y puerto)
- Revisa el firewall (puerto 3000 debe estar abierto)
- Verifica la conexión a Internet

### Baja precisión

- Muévete a un lugar con mejor visibilidad del cielo (GPS)
- Activa el WiFi para mejorar la triangulación
- En interiores, la precisión puede ser menor (normal)
- Espera unos segundos para que el GPS se estabilice

### Error "Permiso denegado"

- Ve a configuración del navegador → Permisos → Ubicación
- Habilita el permiso para el sitio
- Recarga la página

## 📊 Estructura del Proyecto

```
device-location-tracker/
├── server/
│   └── index.js           # Servidor Node.js + Socket.io
├── public/
│   ├── index.html         # Interfaz web principal
│   ├── styles.css         # Estilos responsive
│   ├── app.js            # Lógica de la aplicación
│   └── manifest.json      # Configuración PWA
├── data/
│   └── locations.json     # Almacenamiento de ubicaciones
├── package.json           # Dependencias y scripts
└── README.md             # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **Socket.io**: Comunicación en tiempo real WebSocket
- **UUID**: Generación de IDs únicos

### Frontend
- **HTML5 Geolocation API**: Acceso a ubicación del dispositivo
- **Leaflet.js**: Librería de mapas interactivos
- **OpenStreetMap**: Tiles de mapas gratuitos
- **Socket.io Client**: Cliente WebSocket
- **Vanilla JavaScript**: Sin frameworks pesados

## 📈 Características Técnicas

### Precisión de Ubicación

- **GPS**: 5-20 metros (exterior, cielo despejado)
- **WiFi**: 20-50 metros (zonas urbanas)
- **Red móvil**: 100-1000 metros (depende de torres)
- **IP**: 1-10 km (menos preciso)

El sistema utiliza **enableHighAccuracy: true** para obtener la mejor precisión disponible.

### Actualización en Tiempo Real

- Actualización automática cada 5 segundos (configurable)
- Sincronización inmediata mediante WebSockets
- Notificaciones en tiempo real de cambios

### Persistencia

- **LocalStorage**: Configuración del dispositivo en el navegador
- **Archivo JSON**: Historial de ubicaciones en el servidor
- **Memoria**: Dispositivos activos en RAM para rendimiento

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 💡 Ideas Futuras

- [ ] Historial de rutas y reproducción
- [ ] Geocercas (geofencing) con alertas
- [ ] Compartir ubicación temporal con link
- [ ] Modo offline con sincronización posterior
- [ ] Estadísticas de movimiento (distancia, velocidad)
- [ ] Exportar datos a GPX/KML
- [ ] Modo privado/visible
- [ ] Grupos de dispositivos
- [ ] Notificaciones push
- [ ] Aplicación nativa (React Native/Flutter)

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de Solución de Problemas
2. Abre un Issue en GitHub
3. Consulta la documentación de las APIs utilizadas

## ⚡ Optimizaciones de Rendimiento

- Actualización eficiente de marcadores (no recrea todo el mapa)
- Debouncing de eventos de ubicación
- Lazy loading de componentes
- Compresión de datos en WebSocket
- Caché de tiles del mapa

---

**Desarrollado con ❤️ para rastreo de ubicación de alta precisión**

¡Disfruta rastreando tus dispositivos! 📍🗺️
