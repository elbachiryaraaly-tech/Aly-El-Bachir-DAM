# 📱 Guía Específica para Móvil

## Cómo conectar tu móvil al sistema de rastreo

### ✅ Requisitos Previos

1. **Servidor ejecutándose** en tu ordenador
   - Abre terminal en el ordenador
   - Ejecuta: `npm start`
   - Anota el mensaje que indica el puerto

2. **Misma red WiFi**
   - Tu móvil y ordenador deben estar conectados a la misma red WiFi
   - Verifica en Ajustes → WiFi

3. **Permisos de ubicación**
   - El navegador solicitará permiso para acceder a tu ubicación
   - Debes aceptar para que funcione

---

## 📍 Paso a Paso en Android

### 1. Encontrar la IP del ordenador

En el ordenador, ejecuta:
```bash
# Linux/Mac
ifconfig | grep inet

# Windows
ipconfig
```

Busca algo como: `192.168.1.100` o `10.0.0.5`

### 2. Abrir en el móvil

1. Abre **Chrome** o **Firefox** en tu Android
2. En la barra de direcciones escribe:
   ```
   http://192.168.1.100:3000
   ```
   (Reemplaza `192.168.1.100` con tu IP)

3. Presiona Enter

### 3. Configurar dispositivo

1. Te aparecerá una pantalla de configuración
2. Ingresa un nombre: **"Mi Móvil Android"**
3. Selecciona tipo: **"📱 Móvil"**
4. Toca **"Comenzar Rastreo"**

### 4. Aceptar permisos

1. El navegador pedirá permiso para acceder a tu ubicación
2. Toca **"Permitir"** o **"Allow"**
3. Si no aparece, ve a:
   - Ajustes → Aplicaciones → Chrome → Permisos → Ubicación → Permitir

### 5. Activar GPS

Para máxima precisión:
1. Ve a Ajustes rápidos (desliza desde arriba)
2. Activa **GPS/Ubicación**
3. Activa **WiFi** (mejora la precisión)
4. Opcional: Activa **Alta precisión** en Ajustes → Ubicación

---

## 📱 Paso a Paso en iPhone (iOS)

### 1. Encontrar la IP del ordenador

(Igual que en Android, ver arriba)

### 2. Abrir en Safari

1. Abre **Safari** en tu iPhone
2. En la barra de direcciones escribe:
   ```
   http://192.168.1.100:3000
   ```
3. Toca Ir

### 3. Configurar dispositivo

1. Ingresa un nombre: **"Mi iPhone"**
2. Selecciona tipo: **"📱 Móvil"**
3. Toca **"Comenzar Rastreo"**

### 4. Aceptar permisos

1. Safari pedirá permiso para acceder a tu ubicación
2. Toca **"Permitir"**
3. Si no aparece, ve a:
   - Ajustes → Safari → Ubicación → Permitir

### 5. Activar Servicios de Ubicación

1. Ve a **Ajustes** → **Privacidad y Seguridad**
2. Toca **Servicios de Ubicación**
3. Asegúrate de que esté **activado**
4. Busca **Safari** en la lista
5. Selecciona **"Mientras se usa la app"**

---

## 🎯 Consejos para Máxima Precisión en Móvil

### ✅ HACER:

- ✓ **Sal al exterior** si es posible
- ✓ **Mantén el cielo despejado** por encima tuyo
- ✓ **Activa WiFi** aunque no estés conectado (ayuda a GPS)
- ✓ **Espera 10-15 segundos** tras iniciar el rastreo
- ✓ **Mantén la app abierta** en el navegador
- ✓ **Desactiva modo de ahorro de energía**

### ❌ EVITAR:

- ✗ Estar en edificios altos (bloquean GPS)
- ✗ Estar en túneles o sótanos
- ✗ Cerrar el navegador (detiene el rastreo)
- ✗ Bloquear la pantalla por mucho tiempo
- ✗ Usar VPN (puede afectar precisión)

---

## 🔋 Optimizar Batería

El rastreo GPS consume batería. Para optimizar:

### Android:
1. Baja el brillo de pantalla
2. Desactiva servicios innecesarios
3. Activa modo de ahorro de batería (pero puede reducir precisión)
4. Considera usar un cargador portátil

### iOS:
1. Activa "Modo de Bajo Consumo" (Ajustes → Batería)
2. Baja brillo de pantalla
3. Desactiva actualización en segundo plano de otras apps

---

## 📊 Verificar que Funciona

### Deberías ver:

1. ✅ **Indicador verde** junto a tu nombre en el header
2. ✅ **Tu marcador azul** en el mapa
3. ✅ **Precisión** mostrando un número (ej: "15m")
4. ✅ **Última actualización** mostrando "Ahora"
5. ✅ **Otros dispositivos** en la lista (si hay más conectados)

### Si algo falla:

- **"Error de ubicación"** → Revisa permisos
- **No aparece en el mapa** → Espera 15 segundos
- **Baja precisión (>100m)** → Sal al exterior
- **No conecta** → Verifica que estés en la misma WiFi

---

## 🌐 Usar sin estar en la misma red

Si quieres acceder desde cualquier lugar (no solo tu casa):

### Opción 1: ngrok (Recomendado)

1. En el ordenador, instala ngrok: https://ngrok.com
2. Ejecuta:
   ```bash
   ngrok http 3000
   ```
3. Te dará una URL como: `https://abc123.ngrok.io`
4. Usa esa URL en tu móvil desde cualquier lugar

### Opción 2: Servidor en la nube

Despliega la aplicación en servicios como:
- Railway.app (gratis)
- Render.com (gratis)
- Heroku (gratis con límites)

---

## 🎨 Instalar como App

### Android:

1. Con la página abierta en Chrome
2. Toca el menú (⋮) arriba derecha
3. Selecciona **"Añadir a pantalla de inicio"** o **"Instalar app"**
4. Confirma
5. ¡Ahora tendrás un icono en tu pantalla de inicio!

### iPhone:

1. Con la página abierta en Safari
2. Toca el botón de compartir (□↑) abajo
3. Selecciona **"Añadir a pantalla de inicio"**
4. Toca **"Añadir"**
5. ¡Listo! Aparecerá como una app

---

## 🔔 Mantener Activo en Segundo Plano

### Android:

1. Ve a Ajustes → Aplicaciones → Chrome
2. Selecciona **Batería**
3. Elige **"Sin restricciones"**
4. Esto permitirá que Chrome siga ejecutándose

### iPhone:

Safari puede pausar la app al cambiar de app. Para mejor resultado:
- Mantén Safari en primer plano
- Usa la función de "Pantalla dividida" si es posible

---

## 🆘 Solución de Problemas Específicos

### "No puedo encontrar la IP del ordenador"

1. Asegúrate de que el ordenador esté en la misma WiFi
2. En el ordenador, usa el script:
   ```bash
   ./scripts/find-ip.sh
   ```
3. Anota la IP que aparece

### "Chrome dice que no puede conectar"

1. Verifica que escribiste bien la IP
2. Verifica que incluiste `:3000` al final
3. Verifica que el servidor esté ejecutándose en el ordenador
4. Verifica que el firewall no esté bloqueando el puerto 3000

### "Safari dice que no puede encontrar el servidor"

1. Intenta con `http://` al inicio (no `https://`)
2. Verifica que estés en la misma red WiFi
3. Prueba desactivando el firewall temporalmente

### "La precisión es muy mala (>500m)"

Esto es normal si:
- Estás en interior
- No tienes GPS activado
- Tu móvil tiene un GPS de baja calidad
- Hay mal clima

Solución:
- Sal al exterior
- Espera 1-2 minutos
- Reinicia el rastreo

---

## 📱 Compatibilidad

### ✅ Totalmente Compatible:

- Android 8.0+ con Chrome/Firefox
- iOS 13+ con Safari
- Cualquier navegador moderno con soporte GPS

### ⚠️ Limitaciones:

- Navegadores antiguos pueden no funcionar
- Modo privado/incógnito puede tener restricciones
- Algunos navegadores de terceros pueden fallar

---

## 💡 Tips Extras

1. **Añade un marcador/favorito** para acceder rápido
2. **Nombra claramente tus dispositivos** (ej: "iPhone de Juan")
3. **Comprueba la batería** antes de salir a rastrear
4. **Usa un soporte de móvil** si vas a usarlo mientras conduces
5. **No uses mientras manejas** - es peligroso

---

**¿Necesitas más ayuda?** Consulta README.md para documentación completa.
