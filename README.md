# 📍 Device Location Tracker

Aplicación web para rastrear la ubicación de tus dispositivos en tiempo real con máxima precisión GPS. Sincroniza tu móvil y ordenador para ver la ubicación de ambos desde cualquier dispositivo.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)

## ✨ Características

- 🎯 **Alta precisión GPS** - Utiliza la API de Geolocalización del navegador con máxima precisión
- ⚡ **Tiempo real** - Sincronización instantánea entre dispositivos mediante WebSockets
- 🗺️ **Mapa interactivo** - Visualiza la ubicación de todos tus dispositivos en un mapa
- 📱 **PWA** - Instálala como aplicación nativa en tu móvil
- 🔒 **Privado** - Solo los dispositivos con el mismo código de sincronización pueden verse entre sí
- 🌙 **Modo oscuro** - Interfaz moderna con tema oscuro
- 📊 **Indicador de precisión** - Muestra la precisión actual del GPS en metros

## 🚀 Instalación

### Requisitos previos

- Node.js 16.0.0 o superior
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio** (si no lo has hecho):
   ```bash
   cd /workspace
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor**:
   ```bash
   npm start
   ```

4. **Abre la aplicación** en tu navegador:
   ```
   http://localhost:3000
   ```

## 📱 Uso

### Configuración inicial

1. **Abre la aplicación** en cada dispositivo que quieras rastrear
2. **Nombra tu dispositivo** (ej: "Mi iPhone", "Portátil trabajo")
3. **Selecciona el tipo** de dispositivo (móvil, tablet, ordenador)
4. **Genera un código** de sincronización o usa uno existente
5. **¡Importante!** Usa el **mismo código** en todos los dispositivos que quieras sincronizar
6. Pulsa **"Comenzar rastreo"**

### Funciones principales

| Botón | Función |
|-------|---------|
| 🎯 | Centrar el mapa en tu ubicación actual |
| 👥 | Ver todos los dispositivos en el mapa |
| 🔄 | Forzar actualización de ubicación |
| ⚙️ | Abrir configuración |

### Configuración avanzada

- **Alta precisión GPS**: Activa el GPS para mayor precisión (consume más batería)
- **Intervalo de actualización**: Frecuencia de envío de ubicación (1-30 segundos)
- **Círculo de precisión**: Muestra el radio de error del GPS
- **Mantener pantalla**: Evita que la pantalla se apague (útil para navegación)

## 🌐 Acceso desde otros dispositivos

### En la misma red local (WiFi)

1. Encuentra tu IP local:
   ```bash
   # En Linux/Mac
   ifconfig | grep "inet "
   
   # En Windows
   ipconfig
   ```

2. Accede desde otros dispositivos usando tu IP:
   ```
   http://192.168.x.x:3000
   ```

### Acceso desde Internet (opcional)

Para acceder desde cualquier lugar, puedes usar:

- **ngrok**: Crea un túnel temporal
  ```bash
  ngrok http 3000
  ```

- **Servidor VPS**: Despliega la aplicación en un servidor público

> ⚠️ **Nota de seguridad**: La geolocalización requiere HTTPS en producción. Para uso local, los navegadores permiten HTTP en `localhost`.

## 🔧 API del servidor

### WebSocket Events

| Evento | Dirección | Descripción |
|--------|-----------|-------------|
| `register-device` | Cliente → Servidor | Registrar nuevo dispositivo |
| `update-location` | Cliente → Servidor | Enviar actualización de ubicación |
| `location-update` | Servidor → Cliente | Recibir ubicación de otro dispositivo |
| `device-joined` | Servidor → Cliente | Nuevo dispositivo conectado |
| `device-left` | Servidor → Cliente | Dispositivo desconectado |
| `devices-list` | Servidor → Cliente | Lista de dispositivos activos |

### REST API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/status` | GET | Estado del servidor |

## 📁 Estructura del proyecto

```
/workspace
├── server.js           # Servidor Express + Socket.io
├── package.json        # Dependencias
├── README.md           # Este archivo
└── public/
    ├── index.html      # Página principal
    ├── styles.css      # Estilos
    ├── app.js          # Lógica de la aplicación
    ├── sw.js           # Service Worker para PWA
    ├── manifest.json   # Manifest de PWA
    └── icons/
        └── icon.svg    # Icono de la aplicación
```

## 🔒 Seguridad y Privacidad

- Las ubicaciones **no se almacenan** de forma permanente
- Solo los dispositivos con el **mismo código** pueden verse
- La comunicación se realiza mediante **WebSockets seguros**
- Los datos de ubicación se **eliminan** al desconectarse

## 🛠️ Solución de problemas

### "Permisos de ubicación denegados"

1. Abre la configuración del navegador
2. Busca la sección de permisos del sitio
3. Permite el acceso a la ubicación

### "No se puede obtener la ubicación"

- Verifica que el GPS esté activado (en móviles)
- Asegúrate de estar cerca de una ventana para mejor señal GPS
- En ordenadores, la precisión puede ser menor (usa WiFi)

### "Desconectado del servidor"

- Verifica tu conexión a Internet
- Comprueba que el servidor esté ejecutándose
- Revisa que la URL sea correcta

## 📄 Licencia

MIT License - Consulta el archivo LICENSE para más detalles.

---

Desarrollado con ❤️ para mantener tus dispositivos siempre localizados.
