# Sistema de Rastreo de Ubicación de Alta Precisión

Sistema completo para rastrear la ubicación de máxima precisión entre dispositivos móviles y ordenadores en tiempo real.

## Características

- ✅ **Rastreo de alta precisión**: Utiliza GPS y servicios de ubicación de máxima precisión
- ✅ **Tiempo real**: Sincronización instantánea entre dispositivos mediante WebSocket
- ✅ **Multiplataforma**: Funciona en móviles (Android/iOS) y ordenadores (Windows/Mac/Linux)
- ✅ **Interfaz moderna**: Diseño responsive y fácil de usar
- ✅ **Mapas interactivos**: Visualización en tiempo real con Leaflet.js
- ✅ **Información detallada**: Muestra latitud, longitud, altitud, velocidad, dirección y precisión

## Requisitos

- Node.js 14 o superior
- Navegador web moderno con soporte para Geolocation API
- Permisos de ubicación en el dispositivo

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor:
```bash
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

## Uso

1. **Abrir en ambos dispositivos**: 
   - En tu ordenador: Abre `http://localhost:3000` en el navegador
   - En tu móvil: Abre `http://[IP-DEL-SERVIDOR]:3000` en el navegador móvil
   - **Nota**: Asegúrate de que ambos dispositivos estén en la misma red o configura el firewall adecuadamente

2. **Permitir acceso a la ubicación**: 
   - Ambos dispositivos solicitarán permisos de ubicación
   - Acepta los permisos para habilitar el rastreo de alta precisión

3. **Iniciar rastreo**:
   - Haz clic en "Iniciar Rastreo" en ambos dispositivos
   - Verás tu ubicación y la del otro dispositivo en el mapa en tiempo real

4. **Compartir ID del dispositivo**:
   - Cada dispositivo tiene un ID único
   - Puedes copiar el ID para identificarlo fácilmente

## Configuración de Red

### Para usar en la misma red local:

1. Encuentra la IP de tu ordenador:
   - **Windows**: `ipconfig` en CMD
   - **Mac/Linux**: `ifconfig` o `ip addr`

2. En tu móvil, abre: `http://[TU-IP]:3000`

### Para usar desde internet (producción):

1. Configura un túnel (ngrok, localtunnel) o despliega en un servidor
2. Asegúrate de que el puerto 3000 esté abierto en el firewall

## Estructura del Proyecto

```
.
├── server.js          # Servidor Node.js con Express y Socket.IO
├── package.json       # Dependencias del proyecto
├── public/            # Archivos estáticos
│   ├── index.html     # Interfaz principal
│   ├── styles.css     # Estilos
│   └── app.js         # Lógica del cliente
└── README.md          # Este archivo
```

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapas**: Leaflet.js
- **Geolocalización**: Geolocation API con `enableHighAccuracy: true`

## Precisión

El sistema utiliza `enableHighAccuracy: true` para obtener la máxima precisión posible:
- **Móviles**: GPS con precisión de 3-10 metros
- **Ordenadores**: Ubicación basada en IP/WiFi con menor precisión (puede requerir GPS externo para mayor precisión)

## Solución de Problemas

### La ubicación no se actualiza
- Verifica que los permisos de ubicación estén habilitados
- Asegúrate de que el GPS esté activado en dispositivos móviles
- Comprueba la conexión a internet

### Los dispositivos no se ven entre sí
- Verifica que ambos estén conectados al mismo servidor
- Comprueba la conexión de red
- Revisa la consola del navegador para errores

### Baja precisión en ordenador
- Los ordenadores sin GPS dependen de WiFi/IP
- Considera usar un receptor GPS USB para mayor precisión
- En móviles, asegúrate de estar al aire libre para mejor señal GPS

## Licencia

MIT
