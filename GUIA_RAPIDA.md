# 🚀 Guía Rápida - Rastreo de Ubicación

## Instalación en 3 Pasos

### 1️⃣ Instalar Dependencias
```bash
npm install
```

### 2️⃣ Iniciar Servidor
```bash
npm start
```

### 3️⃣ Abrir en tus Dispositivos
Abre en tu navegador: `http://localhost:3000`

---

## 📱 Conectar Móvil y Ordenador

### En tu Ordenador:
1. Inicia el servidor: `npm start`
2. Anota la IP local de tu ordenador (ej: `192.168.1.100`)
3. Abre: `http://localhost:3000`

### En tu Móvil:
1. Conecta a la misma red WiFi que tu ordenador
2. Abre el navegador del móvil
3. Visita: `http://[IP-DEL-ORDENADOR]:3000`
   - Ejemplo: `http://192.168.1.100:3000`

---

## 💡 Consejos Rápidos

### ✅ Para Máxima Precisión:
- ✓ Activa el GPS en tu móvil
- ✓ Activa WiFi (ayuda a la triangulación)
- ✓ Sal al exterior si la precisión es baja
- ✓ Espera 10-15 segundos para estabilización

### ✅ Permisos:
- Acepta los permisos de ubicación cuando se soliciten
- En móvil: Configuración → Apps → Navegador → Permisos → Ubicación

### ✅ Si no funciona:
```bash
# Encuentra tu IP local:
# Linux/Mac:
ifconfig | grep inet

# Windows:
ipconfig
```

---

## 🎯 Acceso desde Internet (Opcional)

### Con ngrok (gratuito):

1. Instala ngrok: https://ngrok.com/download

2. Inicia el túnel:
```bash
ngrok http 3000
```

3. Usa la URL proporcionada en cualquier dispositivo

---

## 🔥 Uso Básico

1. **Primera vez**: Configura nombre y tipo de dispositivo
2. **Haz clic en "Iniciar Rastreo"**: Activa el rastreo GPS
3. **Repite en otro dispositivo**: Ambos se verán en el mapa
4. **¡Listo!** 🎉 Ya estás rastreando tus dispositivos

---

## 📊 Interfaz Rápida

- **Iniciar/Pausar**: Control de rastreo
- **Centrar en Mí**: Te lleva a tu ubicación
- **Ver en Mapa**: Centra en cualquier dispositivo
- **Marcadores**:
  - 🔵 Azul = Tu dispositivo
  - 🟢 Verde = Otros dispositivos

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| No se conecta | Verifica que ambos estén en la misma red WiFi |
| Baja precisión | Activa GPS y sal al exterior |
| No pide permisos | Recarga la página o limpia caché |
| Error de puerto | Cambia el puerto en `server/index.js` |

---

**¡Disfruta rastreando tus dispositivos!** 📍

Para más detalles, consulta el [README.md](README.md) completo.
