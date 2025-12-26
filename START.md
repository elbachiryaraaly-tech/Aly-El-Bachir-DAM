# 🚀 Guía de Inicio Rápido - CarDiag Pro Ultra

## ⚡ Inicio en 3 Pasos

### Paso 1: Instalar Dependencias
```bash
npm run install:all
```
⏱️ Esto tomará 2-3 minutos

### Paso 2: Iniciar la Aplicación
```bash
npm run dev
```
⏱️ La aplicación se abrirá automáticamente

### Paso 3: ¡Explorar!
1. Haz clic en **"Conectar OBD"** en la barra lateral
2. Explora el **Dashboard en Tiempo Real**
3. Navega por todas las secciones

---

## 🎯 Primeros Pasos

### 1. Dashboard
- Observa los medidores de RPM, velocidad y temperatura
- Los gráficos se actualizan en tiempo real
- Todos los datos son simulados (modo demo)

### 2. Diagnósticos
- Ve a "Diagnósticos" en el menú
- Haz clic en "Leer Códigos"
- Busca cualquier código DTC en la barra de búsqueda
- Prueba: **P0300**, **P0171**, **P0420**

### 3. Rendimiento
- Ve a "Rendimiento"
- Selecciona "0-100 km/h"
- Haz clic en "Iniciar Prueba"
- Espera 5 segundos para ver resultados

### 4. Mantenimiento
- Ve a "Mantenimiento"
- Visualiza el cronograma automático
- Observa las predicciones de IA

### 5. Análisis
- Ve a "Análisis"
- Explora las estadísticas
- Descarga un reporte PDF de ejemplo

### 6. Configuración
- Ve a "Configuración"
- Personaliza la aplicación
- Cambia el idioma o unidades

---

## 🔧 Usar con Adaptador OBD-II Real

### Requisitos
- Adaptador OBD-II (Bluetooth, WiFi o USB)
- Vehículo compatible (1996+)
- Motor del vehículo encendido

### Pasos
1. **Conecta el adaptador** al puerto OBD-II de tu vehículo
   - Usualmente debajo del tablero, lado del conductor
2. **Empareja el dispositivo** con tu computadora
   - Bluetooth: Settings > Bluetooth
   - WiFi: Conecta a la red del adaptador
3. **Configura la conexión** en Settings
4. **Haz clic en "Conectar OBD"**

---

## 📱 URLs de la Aplicación

Una vez iniciado, accede a:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **API Docs**: Ver [FEATURES.md](FEATURES.md)

---

## ⚠️ Solución Rápida de Problemas

### Error: "Puerto en uso"
```bash
# Detén el proceso que usa el puerto
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Error: "Module not found"
```bash
# Reinstala las dependencias
rm -rf node_modules server/node_modules client/node_modules
npm run install:all
```

### WebSocket no conecta
1. Verifica que el servidor esté corriendo
2. Refresca la página (F5)
3. Revisa la consola del navegador (F12)

---

## 🎓 Tutorial Interactivo

### Modo Demo
Por defecto, la aplicación usa un **simulador OBD-II avanzado** que:
- ✅ Simula comportamiento realista del vehículo
- ✅ Genera datos en tiempo real
- ✅ Permite probar todas las funcionalidades
- ✅ No requiere vehículo ni adaptador

### Simular Problemas
Para probar el sistema de diagnóstico:
1. Abre la consola del navegador (F12)
2. Ejecuta:
```javascript
fetch('http://localhost:5000/api/obd/simulate-problem', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({code: 'P0300'})
})
```
3. Ve a "Diagnósticos" y lee códigos

Códigos disponibles para simular:
- `P0300`: Fallas de encendido
- `P0171`: Sistema pobre
- `P0420`: Catalizador

---

## 📚 Recursos Adicionales

### Documentación
- [README.md](README.md) - Información general
- [FEATURES.md](FEATURES.md) - Características detalladas
- [INSTALL.md](INSTALL.md) - Guía de instalación completa
- [CONTRIBUTING.md](CONTRIBUTING.md) - Cómo contribuir

### Soporte
- 💬 Discord: [discord.gg/cardiagpro](https://discord.gg/cardiagpro)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/cardiag-pro-ultra/issues)
- 📧 Email: support@cardiagpro.com

---

## 🎉 ¡Listo para Empezar!

```bash
# Comando único para iniciar todo
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en http://localhost:3000

---

**¡Disfruta de CarDiag Pro Ultra!** 🚗💨

_La plataforma de diagnóstico automotriz más avanzada del mundo_
