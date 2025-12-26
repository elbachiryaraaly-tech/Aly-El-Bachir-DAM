# Guía de Instalación Detallada

## Instalación Rápida

```bash
# 1. Instalar todas las dependencias
npm run install:all

# 2. Iniciar en modo desarrollo
npm run dev
```

## Instalación Paso a Paso

### 1. Instalar Node.js
Asegúrate de tener Node.js 18 o superior instalado:
```bash
node --version
npm --version
```

### 2. Instalar Dependencias del Proyecto Principal
```bash
npm install
```

### 3. Instalar Dependencias del Servidor
```bash
cd server
npm install
cd ..
```

### 4. Instalar Dependencias del Cliente
```bash
cd client
npm install
cd ..
```

### 5. Configurar Variables de Entorno (Opcional)
```bash
cd server
cp .env.example .env
# Editar .env si necesitas cambiar el puerto (por defecto 5000)
cd ..
```

### 6. Iniciar la Aplicación

**Opción A: Modo Desarrollo (Recomendado)**
```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:5000
- Frontend en http://localhost:3000

**Opción B: Iniciar por Separado**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

## Construcción para Producción

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## Solución de Problemas

### Error: Puerto ya en uso
Si el puerto 5000 o 3000 está en uso, puedes cambiarlos:

**Backend:** Editar `server/.env`:
```
PORT=5001
```

**Frontend:** Editar `client/next.config.js` y actualizar la URL de la API.

### Error: Módulos no encontrados
Ejecuta:
```bash
npm run install:all
```

### Error: Socket.IO no conecta
Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

## Requisitos del Sistema

- **Node.js:** 18.0.0 o superior
- **npm:** 9.0.0 o superior
- **RAM:** Mínimo 2GB recomendado
- **Espacio:** ~500MB para node_modules

## Adaptador OBD-II

Para usar con un vehículo real, necesitarás:
- Adaptador OBD-II compatible (Bluetooth, WiFi o USB)
- Vehículo con puerto OBD-II (1996+ en USA, 2001+ en Europa)

## Notas

- La aplicación funciona en modo simulación sin adaptador OBD-II
- Para conexión real, asegúrate de que tu adaptador esté emparejado/conectado
- Algunas funciones pueden variar según el protocolo OBD de tu vehículo
