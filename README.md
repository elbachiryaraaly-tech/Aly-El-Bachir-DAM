# 🚗 Plataforma Avanzada de Diagnóstico Automotriz

## La Mejor Plataforma de Diagnóstico OBD - 100% Gratuita

Esta plataforma supera a todas las aplicaciones existentes (EOBD Facile, Torque, MotorData OBD, SmartOED, OBDocker, OBD Android, OBDclick, Car Scanner, MotorScan, Infocar) con características avanzadas y una interfaz moderna.

## ✨ Características Principales

### 🔌 Conexión OBD-II
- Soporte para múltiples protocolos (ISO 9141-2, ISO 14230-4, ISO 15765-4)
- Conexión Bluetooth, WiFi y USB
- Detección automática de protocolo
- Conexión rápida y estable

### 📊 Monitoreo en Tiempo Real
- Visualización de más de 12 sensores simultáneamente
- Gráficos en tiempo real con Recharts
- Alertas inteligentes cuando los valores están fuera de rango
- Historial de datos para análisis posterior

### 🔍 Códigos DTC Avanzados
- Base de datos completa de códigos DTC
- Información detallada de cada código:
  - Descripción completa
  - Severidad (Alta, Media, Baja)
  - Causas posibles
  - Soluciones recomendadas
  - Freeze frame data
- Búsqueda inteligente
- Limpieza de códigos DTC

### 📈 Dashboard Completo
- Información del vehículo (VIN, marca, modelo, año)
- Escaneo completo del sistema
- Estado de todos los módulos ECU
- Estadísticas en tiempo real

### 📝 Historial y Reportes
- Historial completo de diagnósticos
- Estadísticas detalladas
- Exportación de reportes en JSON
- Comparación de diagnósticos

### 🎨 Interfaz Moderna
- Diseño oscuro moderno
- Responsive (móvil, tablet, desktop)
- Animaciones suaves
- Navegación intuitiva

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ y npm
- Adaptador OBD-II (Bluetooth, WiFi o USB)

### Pasos de Instalación

1. **Instalar dependencias:**
```bash
npm run install:all
```

2. **Configurar variables de entorno (opcional):**
```bash
cd server
cp .env.example .env
# Editar .env si es necesario
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

Esto iniciará:
- Backend en `http://localhost:5000`
- Frontend en `http://localhost:3000`

## 📖 Uso

1. **Conectar al vehículo:**
   - Abre la aplicación en tu navegador
   - Selecciona el método de conexión (Bluetooth, WiFi, USB o Auto)
   - Presiona "Conectar"

2. **Dashboard:**
   - Ver información del vehículo
   - Realizar escaneo completo del sistema
   - Ver estado de todos los módulos

3. **Códigos DTC:**
   - Leer códigos de error
   - Buscar información detallada
   - Limpiar códigos DTC

4. **Monitoreo de Sensores:**
   - Seleccionar sensores a monitorear
   - Ver valores en tiempo real
   - Analizar gráficos históricos

5. **Historial:**
   - Ver historial de diagnósticos
   - Exportar reportes
   - Ver estadísticas

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js + Express
- Socket.IO para datos en tiempo real
- SQLite para almacenamiento
- OBD Parser para comunicación OBD

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts para gráficos
- Socket.IO Client

## 📱 Compatibilidad

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Android (a través del navegador)
- ✅ iOS (a través del navegador)

## 🔒 Seguridad

- Todas las conexiones son locales
- No se envían datos a servidores externos
- 100% privado y seguro

## 📄 Licencia

MIT License - Uso completamente gratuito

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## ⚠️ Notas Importantes

- Esta plataforma requiere un adaptador OBD-II compatible
- Algunas funciones pueden variar según el vehículo y protocolo OBD
- Siempre consulta con un mecánico profesional para problemas serios

## 🎯 Ventajas sobre otras aplicaciones

1. **Completamente Gratuita** - Sin anuncios, sin compras in-app
2. **Interfaz Moderna** - Diseño profesional y fácil de usar
3. **Base de Datos Completa** - Más códigos DTC que cualquier otra app
4. **Tiempo Real Avanzado** - Gráficos y monitoreo superior
5. **Multiplataforma** - Funciona en cualquier dispositivo con navegador
6. **Código Abierto** - Totalmente transparente y modificable
7. **Sin Limitaciones** - Todas las funciones disponibles desde el inicio

---

**Desarrollado con ❤️ para la comunidad automotriz**
