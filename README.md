# ⚡ NovaBrowser

**El navegador más atractivo y potente jamás creado.** Superior a Opera en diseño, velocidad y funcionalidades.

![NovaBrowser](https://img.shields.io/badge/NovaBrowser-v1.0-8B5CF6?style=for-the-badge&logo=electron)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)
![Electron](https://img.shields.io/badge/Electron-28-47848F?style=for-the-badge&logo=electron)

---

## ✨ Características Principales

### 🎨 Diseño Espectacular
- **6 temas visuales**: Oscuro, Claro, Aurora, Atardecer, Océano, Cyberpunk
- Efectos de **glassmorphism** y transparencia
- **Gradientes animados** ambientales
- Animaciones fluidas con transiciones suaves
- Tipografía Inter premium

### 🚀 Rendimiento Superior
- Basado en **Chromium** (vía Electron)
- Bloqueador de anuncios **integrado** de serie
- Carga ultra-rápida de pestañas
- Gestión eficiente de memoria

### 📑 Gestión de Pestañas Avanzada
- Pestañas con favicons dinámicos
- Pestañas fijables (pinned tabs)
- Cierre con click medio del ratón
- Barra de pestañas con scroll horizontal

### 🗂️ Espacios de Trabajo (Workspaces)
- Organiza pestañas por contexto: Personal, Trabajo, Entretenimiento
- Colores e iconos personalizados
- Cambio rápido entre espacios

### 📌 Sidebar Inteligente
- **Marcadores** con gestión completa
- **Historial** con limpieza rápida
- **Descargas** centralizadas
- **Ajustes** de tema en tiempo real
- Sidebar colapsable con iconos

### 🏠 Speed Dial Espectacular
- Reloj en tiempo real con saludo personalizado
- 8 accesos directos predefinidos con iconos coloridos
- Barra de búsqueda con autocompletado
- Estadísticas rápidas (marcadores, historial, anuncios bloqueados)
- Branding Nova con logo animado

### 🛡️ Seguridad
- Indicador HTTPS en la barra de dirección
- Sandbox para contenido web
- Bloqueo de rastreadores y anuncios

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| **Electron 28** | Shell del navegador |
| **React 18** | Interfaz de usuario |
| **TypeScript 5** | Tipado estático |
| **Vite 5** | Build tool ultra-rápido |
| **Zustand** | Estado global |
| **Lucide React** | Iconografía |
| **Framer Motion** | Animaciones |
| **CSS Custom Properties** | Sistema de temas |

---

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- npm 9+

### Desarrollo Web (Preview UI)
```bash
npm install
npm run dev
```

### Desarrollo Electron (Navegador completo)
```bash
npm install
npm run electron:dev
```

### Build de Producción
```bash
npm run electron:build
```

---

## 🎨 Temas Disponibles

| Tema | Descripción |
|---|---|
| 🌑 **Oscuro** | Tema principal con tonos violeta profundo |
| ☀️ **Claro** | Interfaz luminosa y elegante |
| 🌌 **Aurora** | Tonos cian y azul boreal |
| 🌅 **Atardecer** | Naranja y rojo cálido |
| 🌊 **Océano** | Azul profundo marino |
| 🤖 **Cyberpunk** | Magenta y neón futurista |

---

## 🏗️ Arquitectura

```
nova-browser/
├── electron/           # Proceso principal Electron
│   ├── main.ts         # Entry point + ad blocker
│   └── preload.ts      # Bridge IPC seguro
├── src/
│   ├── components/     # Componentes React
│   │   ├── TitleBar    # Barra de título custom
│   │   ├── TabBar      # Gestión de pestañas
│   │   ├── NavBar      # Navegación + barra de dirección
│   │   ├── Sidebar     # Panel lateral multifunción
│   │   ├── WebContent  # Contenedor del contenido web
│   │   └── StatusBar   # Barra de estado inferior
│   ├── pages/
│   │   └── NewTabPage  # Speed Dial espectacular
│   ├── store/
│   │   └── browserStore # Estado global con Zustand
│   └── styles/
│       └── globals.css  # Sistema de diseño completo
└── public/
    └── nova-icon.svg    # Icono del navegador
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|---|---|
| `Ctrl/Cmd + T` | Nueva pestaña |
| `Ctrl/Cmd + L` | Enfocar barra de dirección |
| `Click medio` | Cerrar pestaña |

---

## 📋 Roadmap

- [ ] Extensiones (WebExtensions API)
- [ ] Sincronización en la nube
- [ ] VPN integrado
- [ ] Modo lector
- [ ] Traductor integrado
- [ ] Captura de pantalla
- [ ] Picture-in-Picture
- [ ] Gestor de contraseñas

---

## 📄 Licencia

MIT License - NovaBrowser Team

---

> *"NovaBrowser - Navegar nunca fue tan hermoso."* ⚡
