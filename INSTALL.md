# 📦 Guía de Instalación Completa - CarDiag Pro Ultra

## Contenido
1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Instalación Paso a Paso](#instalación-paso-a-paso)
3. [Configuración](#configuración)
4. [Solución de Problemas](#solución-de-problemas)
5. [Uso con Adaptador OBD-II Real](#uso-con-adaptador-obd-ii-real)

---

## Requisitos del Sistema

### Software Necesario
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio
- **Navegador Web Moderno**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Hardware Recomendado
- **CPU**: Procesador de doble núcleo o superior
- **RAM**: Mínimo 4GB (8GB recomendado)
- **Espacio en Disco**: 500MB libres
- **Resolución de Pantalla**: 1280x720 o superior

### Para Uso Real con Vehículo
- **Adaptador OBD-II**: Bluetooth, WiFi o USB
  - Recomendados: ELM327, OBDLink MX+, Veepeak
- **Puerto OBD-II**: En tu vehículo (generalmente debajo del tablero)

---

## Instalación Paso a Paso

### 1. Instalar Node.js

#### Windows
1. Descarga el instalador desde [nodejs.org](https://nodejs.org)
2. Ejecuta el instalador y sigue las instrucciones
3. Verifica la instalación:
```bash
node --version
npm --version
```

#### macOS
```bash
# Usando Homebrew
brew install node

# O descarga el instalador desde nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/cardiag-pro-ultra.git

# Navegar al directorio
cd cardiag-pro-ultra
```

### 3. Instalación de Dependencias

#### Opción A: Instalación Automática (Recomendada)
```bash
npm run install:all
```

#### Opción B: Instalación Manual
```bash
# Instalar dependencias del servidor
cd server
npm install

# Instalar dependencias del cliente
cd ../client
npm install

# Volver al directorio raíz
cd ..
```

### 4. Iniciar la Aplicación

#### Modo Desarrollo (Recomendado para pruebas)
```bash
# Opción A: Iniciar todo desde la raíz
npm run dev

# Opción B: Iniciar por separado
# Terminal 1 - Servidor
cd server
npm run dev

# Terminal 2 - Cliente
cd client
npm run dev
```

#### Modo Producción
```bash
# Compilar ambos proyectos
npm run build

# Iniciar servidor en producción
npm start
```

### 5. Acceder a la Aplicación

Una vez iniciado, abre tu navegador en:
- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:5000
- **WebSocket**: ws://localhost:5000/ws

---

## Configuración

### Variables de Entorno

#### Server (.env)
```bash
# Copiar archivo de ejemplo
cd server
cp .env.example .env

# Editar configuración
PORT=5000
NODE_ENV=development
```

### Configuración de la Base de Datos

La base de datos SQLite se crea automáticamente en `server/data/cardiag.db` al iniciar el servidor por primera vez. No se requiere configuración adicional.

### Puertos Personalizados

#### Cambiar Puerto del Servidor
Edita `server/.env`:
```env
PORT=8080
```

#### Cambiar Puerto del Cliente
Edita `client/vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001, // Cambia aquí
    // ...
  }
})
```

---

## Solución de Problemas

### Error: "Puerto ya en uso"

**Problema**: El puerto 3000 o 5000 está siendo usado por otra aplicación.

**Solución**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

O cambia los puertos en la configuración.

### Error: "Cannot find module"

**Problema**: Dependencias no instaladas correctamente.

**Solución**:
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules server/node_modules client/node_modules
npm run install:all
```

### Error: "EACCES permission denied"

**Problema**: Permisos insuficientes (Linux/macOS).

**Solución**:
```bash
sudo chown -R $(whoami) ~/.npm
npm run install:all
```

### WebSocket no conecta

**Problema**: Firewall o proxy bloqueando WebSocket.

**Solución**:
1. Verifica que el servidor esté corriendo
2. Desactiva temporalmente el firewall
3. Si usas proxy, configura excepciones para localhost

### Base de Datos Corrupta

**Problema**: Error al iniciar el servidor relacionado con SQLite.

**Solución**:
```bash
# Eliminar base de datos y dejar que se recree
rm server/data/cardiag.db
npm run dev:server
```

### Errores de Compilación TypeScript

**Problema**: Errores de tipos al compilar.

**Solución**:
```bash
# Reinstalar dependencias de tipos
cd server
npm install --save-dev @types/node @types/express

cd ../client
npm install --save-dev @types/react @types/react-dom
```

---

## Uso con Adaptador OBD-II Real

### Preparación del Adaptador

#### Adaptador Bluetooth
1. **Emparejar el Dispositivo**:
   - Windows: Settings > Bluetooth > Add device
   - macOS: System Preferences > Bluetooth
   - Linux: `bluetoothctl` para emparejar

2. **Encontrar Puerto COM/Dispositivo**:
   - Windows: Device Manager > Ports (COM & LPT)
   - macOS/Linux: `/dev/tty.OBDII*` o `/dev/rfcomm0`

#### Adaptador WiFi
1. Conecta tu computadora a la red WiFi del adaptador
2. Generalmente la IP es `192.168.0.10` o `192.168.0.11`
3. Puerto típico: `35000`

#### Adaptador USB
1. Conecta el cable USB
2. Instala drivers si es necesario
3. Identifica el puerto COM asignado

### Configurar Conexión Real

Edita `server/src/index.ts` para usar adaptador real en lugar del simulador:

```typescript
// Reemplazar OBDSimulator con implementación real
import { RealOBDConnection } from './services/realOBD';

// Configurar según tu adaptador
const obdConnection = new RealOBDConnection({
  type: 'bluetooth', // 'bluetooth', 'wifi', o 'usb'
  port: '/dev/tty.OBDII-Port', // o 'COM3' en Windows
  baudRate: 38400
});
```

### Probar Conexión

```bash
# Instalar herramienta de diagnóstico
npm install -g obd-parser

# Probar conexión
obd-parser connect /dev/tty.OBDII-Port
```

### Protocolos OBD-II Soportados

- ISO 15765-4 (CAN, 11 bit, 500 kbaud)
- ISO 15765-4 (CAN, 29 bit, 500 kbaud)
- ISO 14230-4 (KWP, 5 baud init)
- ISO 14230-4 (KWP, fast init)
- ISO 9141-2
- SAE J1850 PWM
- SAE J1850 VPW

---

## Verificación de Instalación

Ejecuta el siguiente checklist para verificar que todo funciona:

```bash
# 1. Verificar Node.js y npm
node --version  # Debe mostrar v18.0.0 o superior
npm --version   # Debe mostrar v9.0.0 o superior

# 2. Verificar instalación de dependencias
ls node_modules  # Debe existir
ls server/node_modules  # Debe existir
ls client/node_modules  # Debe existir

# 3. Verificar que el servidor inicia
cd server && npm run dev
# Debe mostrar: "CarDiag Pro Ultra Server corriendo en puerto 5000"

# 4. Verificar que el cliente inicia
cd client && npm run dev
# Debe abrir navegador en localhost:3000

# 5. Verificar WebSocket
# Abre la consola del navegador, debe mostrar:
# "WebSocket conectado"
```

---

## Desinstalación

Para desinstalar completamente CarDiag Pro Ultra:

```bash
# 1. Detener todos los procesos
# Ctrl+C en todas las terminales activas

# 2. Eliminar dependencias
cd cardiag-pro-ultra
rm -rf node_modules server/node_modules client/node_modules

# 3. Eliminar base de datos (opcional)
rm -rf server/data

# 4. Eliminar el proyecto completo
cd ..
rm -rf cardiag-pro-ultra
```

---

## Actualización

Para actualizar a la última versión:

```bash
# 1. Guardar cambios locales (si los hay)
git stash

# 2. Obtener última versión
git pull origin main

# 3. Reinstalar dependencias
npm run install:all

# 4. Reconstruir
npm run build

# 5. Reiniciar
npm run dev
```

---

## Soporte

Si encuentras problemas durante la instalación:

1. **Revisa los logs**: Los errores detallados aparecen en la consola
2. **Consulta la documentación**: [docs.cardiagpro.com](https://docs.cardiagpro.com)
3. **Issues de GitHub**: [github.com/tu-usuario/cardiag-pro-ultra/issues](https://github.com/tu-usuario/cardiag-pro-ultra/issues)
4. **Discord**: [discord.gg/cardiagpro](https://discord.gg/cardiagpro)
5. **Email**: support@cardiagpro.com

---

¡Disfruta de CarDiag Pro Ultra! 🚗💨
