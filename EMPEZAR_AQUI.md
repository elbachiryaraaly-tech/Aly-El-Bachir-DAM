# 🚀 ¡EMPIEZA AQUÍ!

## Bienvenido al Sistema de Rastreo de Ubicación

Este proyecto te permite rastrear la ubicación de tu móvil y ordenador con **máxima precisión GPS** y verlos en un mapa en tiempo real.

---

## ⚡ Instalación Ultra Rápida (2 Minutos)

### Paso 1: Instalar Dependencias
```bash
npm install
```
*Tiempo estimado: 30 segundos*

### Paso 2: Iniciar el Servidor
```bash
npm start
```
*El servidor se iniciará en el puerto 3000*

### Paso 3: Abrir en tu Ordenador
Abre tu navegador y ve a:
```
http://localhost:3000
```

### Paso 4: Conectar tu Móvil

#### 4.1 Encuentra tu IP Local
```bash
./scripts/find-ip.sh
```

#### 4.2 Abre en tu Móvil
En el navegador de tu móvil, visita:
```
http://[TU-IP]:3000
```
Por ejemplo: `http://192.168.1.100:3000`

**Importante**: Tu móvil y ordenador deben estar en la **misma red WiFi**.

---

## 📱 Primera Vez - Configuración

### En tu Ordenador:
1. Ingresa un nombre: `"Mi Laptop"`
2. Selecciona tipo: `💻 Portátil` o `💻 Ordenador`
3. Haz clic en `"Comenzar Rastreo"`
4. **Acepta** los permisos de ubicación

### En tu Móvil:
1. Ingresa un nombre: `"Mi iPhone"` o `"Mi Android"`
2. Selecciona tipo: `📱 Móvil`
3. Toca `"Comenzar Rastreo"`
4. **Acepta** los permisos de ubicación
5. **Activa GPS** en ajustes si no está activado

---

## 🎯 Uso Básico

Una vez configurados ambos dispositivos:

### 1. Iniciar Rastreo
- Haz clic en el botón **"▶️ Iniciar Rastreo"**
- Espera 10-15 segundos para que el GPS se estabilice
- Verás tu ubicación aparecer en el mapa

### 2. Ver Otros Dispositivos
- Los otros dispositivos aparecerán automáticamente
- **Azul** = Tu dispositivo
- **Verde** = Otros dispositivos
- El círculo alrededor muestra la precisión

### 3. Navegar el Mapa
- **Arrastra** para mover el mapa
- **Zoom** con la rueda del ratón o pellizca en móvil
- **Clic en marcador** para ver detalles
- Botón **"🎯 Centrar en Mí"** para volver a tu ubicación

### 4. Ver Detalles
En la parte inferior verás:
- Lista de todos los dispositivos
- Precisión de cada ubicación
- Última actualización
- Botones para centrar en cada dispositivo

---

## 💡 Consejos para Máxima Precisión

### ✅ HACER:
1. **Sal al exterior** - El GPS funciona mejor con visibilidad del cielo
2. **Activa WiFi** - Ayuda a triangulación incluso sin conectarse
3. **Espera** - Dale 10-15 segundos para estabilizarse
4. **Mantén la app abierta** - El navegador necesita estar activo

### ❌ EVITAR:
1. Estar en interiores profundos o sótanos
2. Edificios muy altos que bloqueen el cielo
3. Cerrar el navegador o la pestaña
4. Denegar permisos de ubicación

---

## 🔧 Solución de Problemas Rápida

### ❌ "No se conecta mi móvil"
**Solución:**
```bash
# Verifica que ambos estén en la misma WiFi
# Encuentra tu IP:
./scripts/find-ip.sh
# Usa esa IP en tu móvil
```

### ❌ "Baja precisión (>100 metros)"
**Solución:**
- Sal al exterior
- Activa GPS en ajustes del móvil
- Espera 30-60 segundos
- Reinicia el rastreo

### ❌ "No pide permisos de ubicación"
**Solución:**
- Recarga la página (F5 o Cmd+R)
- Ve a ajustes del navegador → Permisos → Ubicación
- Activa manualmente para el sitio

### ❌ "Error: Puerto 3000 en uso"
**Solución:**
```bash
# Cambia el puerto en server/index.js
# O detén el proceso que usa el puerto:
killall node
```

---

## 📚 Documentación Completa

Si necesitas más información:

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Documentación completa del proyecto |
| `GUIA_RAPIDA.md` | Guía de referencia rápida |
| `INSTRUCCIONES_MOVIL.md` | Guía específica para móviles |
| `DOCUMENTACION_TECNICA.md` | Detalles técnicos y arquitectura |
| `RESUMEN_PROYECTO.md` | Resumen ejecutivo del proyecto |

---

## 🌐 Acceso Desde Internet (Avanzado)

Si quieres acceder desde cualquier lugar (no solo tu casa):

### Opción 1: ngrok (Más Fácil)
```bash
# 1. Instala ngrok: https://ngrok.com/download
# 2. Ejecuta:
ngrok http 3000
# 3. Usa la URL que te da (ej: https://abc123.ngrok.io)
```

### Opción 2: Desplegar en Cloud
Servicios gratuitos recomendados:
- **Railway.app** - Fácil, gratis hasta 500 horas/mes
- **Render.com** - Gratis con algunas limitaciones
- **Fly.io** - Gratis para proyectos pequeños

---

## ✅ Verificar que Todo Funciona

Ejecuta el script de verificación:
```bash
./scripts/verificar.sh
```

Esto verificará:
- ✅ Node.js instalado correctamente
- ✅ Dependencias instaladas
- ✅ Archivos del proyecto presentes
- ✅ Puerto disponible
- ✅ Documentación completa

---

## 🎬 Flujo Completo de Uso

```
1. Instalación
   ↓
   npm install

2. Inicio del Servidor
   ↓
   npm start

3. Configuración de Dispositivos
   ↓
   Ordenador: http://localhost:3000
   Móvil: http://[IP]:3000
   ↓
   Ingresa nombres y acepta permisos

4. Rastreo Activo
   ↓
   Haz clic en "Iniciar Rastreo" en ambos
   ↓
   Espera 10-15 segundos

5. Visualización
   ↓
   Ambos dispositivos aparecen en el mapa
   ↓
   Actualización automática cada 5 segundos

6. ¡Listo!
   ↓
   Puedes ver la ubicación de todos tus dispositivos
```

---

## 🎯 Casos de Uso Comunes

### 1. Encontrar tu Móvil
- Deja el rastreo activo en tu móvil
- Abre el mapa en tu ordenador
- Verás dónde está tu móvil en tiempo real

### 2. Compartir Ubicación con Familia
- Cada miembro configura su dispositivo
- Todos ven las ubicaciones de todos
- Útil para coordinarse en lugares grandes

### 3. Rastrear tu Ordenador Portátil
- Activa rastreo antes de salir
- Puedes ver su ubicación desde tu móvil
- Útil si te lo roban o lo olvidas

### 4. Coordinar un Grupo
- Evento, excursión, etc.
- Todos se conectan al mismo servidor
- Ven dónde está cada uno en tiempo real

---

## 🔐 Nota de Privacidad

**Importante:**
- Las ubicaciones se transmiten al servidor
- No hay cifrado adicional por defecto
- No compartas la URL con desconocidos
- Solo rastrear dispositivos propios o con consentimiento

Para uso privado en tu red local, es seguro. Para uso público, considera:
- Usar HTTPS
- Implementar autenticación
- Limitar acceso

---

## 🆘 ¿Necesitas Ayuda?

### Recursos:
1. **Verificación**: `./scripts/verificar.sh`
2. **Encontrar IP**: `./scripts/find-ip.sh`
3. **Documentación**: Ver archivos `.md` en el proyecto
4. **Prueba básica**: Abre `http://localhost:3000`

### Comandos Útiles:
```bash
# Ver logs del servidor
npm start

# Encontrar tu IP
./scripts/find-ip.sh

# Verificar instalación
./scripts/verificar.sh

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 🎉 ¡Ya Está!

Eso es todo. Ahora tienes un sistema completo de rastreo de ubicación funcionando.

**Próximos pasos:**
1. Ejecuta `npm start`
2. Abre en tu ordenador
3. Abre en tu móvil
4. ¡Disfruta del rastreo!

---

**¿Dudas?** Lee el `README.md` completo o consulta `GUIA_RAPIDA.md`

**¿Móvil específico?** Lee `INSTRUCCIONES_MOVIL.md`

**¿Detalles técnicos?** Lee `DOCUMENTACION_TECNICA.md`

---

**¡Feliz rastreo!** 📍🗺️
