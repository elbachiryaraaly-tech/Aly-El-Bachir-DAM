# SUPER MEGA PROMPT - NAVEGADOR WEB DEFINITIVO

> Copia y pega este prompt completo en Cursor Editor para construir el mejor navegador web jamás creado.

---

## PROMPT PARA COPIAR Y PEGAR:

```
Quiero que construyas desde cero el navegador web más impresionante, potente y visualmente atractivo que jamás haya existido. Debe superar completamente a Opera, Opera GX, Arc, Vivaldi, Brave y Chrome en funcionalidad, rendimiento y diseño visual. El nombre del navegador será "NOVA BROWSER".

El proyecto debe usar Electron + React + TypeScript + Tailwind CSS + Framer Motion como stack tecnológico principal. Debe ser una aplicación de escritorio multiplataforma (Windows, macOS, Linux).

---

## ARQUITECTURA Y ESTRUCTURA DEL PROYECTO

Crea la siguiente estructura base:

nova-browser/
├── package.json
├── electron/
│   ├── main.ts                    # Proceso principal de Electron
│   ├── preload.ts                 # Script de preload seguro
│   ├── protocols.ts               # Protocolos personalizados
│   ├── windowManager.ts           # Gestión de ventanas
│   ├── downloadManager.ts         # Gestión de descargas
│   ├── adBlocker.ts               # Motor de bloqueo de anuncios
│   ├── extensionManager.ts        # Gestión de extensiones Chrome
│   └── updater.ts                 # Auto-actualización
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── browser/
│   │   │   ├── BrowserWindow.tsx          # Ventana principal del navegador
│   │   │   ├── TabBar.tsx                 # Barra de pestañas superior
│   │   │   ├── Tab.tsx                    # Componente de pestaña individual
│   │   │   ├── AddressBar.tsx             # Barra de direcciones inteligente
│   │   │   ├── NavigationControls.tsx     # Botones atrás/adelante/recargar
│   │   │   ├── WebViewContainer.tsx       # Contenedor del webview
│   │   │   ├── FindInPage.tsx             # Buscar en página
│   │   │   └── StatusBar.tsx              # Barra de estado inferior
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx                # Panel lateral principal
│   │   │   ├── SidebarBookmarks.tsx       # Marcadores en sidebar
│   │   │   ├── SidebarHistory.tsx         # Historial en sidebar
│   │   │   ├── SidebarDownloads.tsx       # Descargas en sidebar
│   │   │   ├── SidebarSpaces.tsx          # Espacios de trabajo
│   │   │   ├── SidebarNotes.tsx           # Notas rápidas
│   │   │   ├── SidebarAI.tsx              # Asistente IA integrado
│   │   │   └── SidebarMusic.tsx           # Reproductor de música
│   │   ├── panels/
│   │   │   ├── SplitView.tsx              # Vista dividida
│   │   │   ├── PictureInPicture.tsx       # Picture-in-Picture
│   │   │   ├── DevTools.tsx               # Herramientas de desarrollo
│   │   │   └── ReaderMode.tsx             # Modo lectura
│   │   ├── settings/
│   │   │   ├── SettingsPage.tsx           # Página de configuración
│   │   │   ├── AppearanceSettings.tsx     # Ajustes de apariencia
│   │   │   ├── PrivacySettings.tsx        # Ajustes de privacidad
│   │   │   ├── PerformanceSettings.tsx    # Ajustes de rendimiento
│   │   │   └── KeyboardShortcuts.tsx      # Atajos de teclado
│   │   ├── newtab/
│   │   │   ├── NewTabPage.tsx             # Página de nueva pestaña
│   │   │   ├── SpeedDial.tsx              # Speed dial con favoritos
│   │   │   ├── Widgets.tsx                # Widgets personalizables
│   │   │   ├── WeatherWidget.tsx          # Widget del clima
│   │   │   ├── NewsWidget.tsx             # Widget de noticias
│   │   │   ├── ClockWidget.tsx            # Reloj elegante
│   │   │   └── SearchBox.tsx              # Caja de búsqueda central
│   │   └── ui/
│   │       ├── ContextMenu.tsx            # Menú contextual personalizado
│   │       ├── Modal.tsx                  # Modal reutilizable
│   │       ├── Tooltip.tsx                # Tooltips animados
│   │       ├── Toast.tsx                  # Notificaciones toast
│   │       └── AnimatedBackground.tsx     # Fondos animados
│   ├── stores/
│   │   ├── tabStore.ts                    # Estado de pestañas (Zustand)
│   │   ├── bookmarkStore.ts              # Estado de marcadores
│   │   ├── historyStore.ts               # Estado del historial
│   │   ├── settingsStore.ts              # Estado de configuración
│   │   ├── downloadStore.ts              # Estado de descargas
│   │   └── themeStore.ts                 # Estado del tema
│   ├── hooks/
│   │   ├── useTab.ts
│   │   ├── useNavigation.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useTheme.ts
│   │   └── useSearch.ts
│   ├── utils/
│   │   ├── urlParser.ts
│   │   ├── faviconLoader.ts
│   │   ├── searchEngines.ts
│   │   └── animations.ts
│   └── themes/
│       ├── dark.ts
│       ├── light.ts
│       ├── midnight.ts
│       ├── aurora.ts
│       ├── cyberpunk.ts
│       ├── ocean.ts
│       └── sunset.ts

---

## 1. DISEÑO VISUAL Y UI/UX (PRIORIDAD MÁXIMA)

El diseño debe ser ABSOLUTAMENTE ESPECTACULAR. Sigue estas directrices estrictas:

### Estética General:
- Interfaz ultra moderna con glassmorphism (efecto vidrio esmerilado) en TODA la UI
- Bordes redondeados suaves (border-radius entre 12px-20px) en todos los elementos
- Sombras difusas con colores (colored shadows) que se adaptan al tema
- Gradientes sutiles y elegantes en botones y barras
- Transiciones y animaciones fluidas (200-400ms) en TODAS las interacciones
- Efecto de profundidad con capas (backdrop-blur de diferentes intensidades)
- Micro-animaciones en hover, click y focus en TODOS los elementos interactivos
- Iconos SVG personalizados con animaciones Lottie
- Tipografía Inter o Geist Sans para la interfaz

### Barra de Pestañas (TabBar):
- Pestañas con estilo de "tarjetas flotantes" con bordes redondeados
- Efecto glassmorphism (backdrop-blur: 20px) con fondo semi-transparente
- La pestaña activa tiene un brillo/glow sutil del color de acento
- Al hacer hover sobre una pestaña: efecto de elevación suave con sombra
- Previsualización en miniatura (thumbnail) al hacer hover prolongado sobre una pestaña
- Animación de "slide-in" fluida al abrir nueva pestaña
- Animación de "collapse" suave al cerrar pestaña
- Las pestañas se redimensionan con spring animation (efecto resorte)
- Indicador de audio con icono animado para pestañas reproduciendo sonido
- Indicador de carga con gradiente animado en la parte inferior de la pestaña
- Agrupación de pestañas con colores personalizables y etiquetas
- Pestañas fijadas (pinned) con icono compacto y animación al fijar
- Botón "+" para nueva pestaña con efecto ripple al clickear
- Scroll horizontal suave cuando hay muchas pestañas
- Drag & drop para reordenar con efecto de "levitación" al arrastrar
- Opción de pestañas verticales en el sidebar (como Edge/Arc)

### Barra de Direcciones (AddressBar):
- Campo de texto con bordes redondeados (16px) y fondo glass
- Al hacer focus: expansión animada con glow del color de acento
- Autocompletado inteligente con sugerencias en dropdown glassmorphic
- Las sugerencias muestran: favicon + título + URL + categoría (historial/marcador/búsqueda)
- Indicador de seguridad (candado) con colores: verde (seguro), rojo (inseguro), gris (neutral)
- Indicador de progreso de carga integrado en la barra (gradiente animado)
- Botón de compartir con animación de despliegue
- Botón de marcador (estrella) con animación de "pop" al guardar
- Chip de búsqueda que muestra el motor activo con su icono
- Soporte para comandos rápidos con "/" (como Spotlight/Alfred)

### Sidebar (Panel Lateral):
- Panel lateral colapsable con animación spring
- Ancho configurable con drag-resize suave
- Iconos con tooltip animado al estar colapsado
- Secciones:
  * Espacios de Trabajo (como Arc): ambientes separados con pestañas propias
  * Marcadores con carpetas expandibles con animación
  * Historial con búsqueda instantánea y agrupado por fecha
  * Descargas con progreso visual tipo barra de neón
  * Notas rápidas con editor markdown integrado
  * Reproductor de música flotante integrado (Spotify/YouTube Music)
  * Asistente IA con interfaz tipo chat
- Cada sección tiene un icono con micro-animación al seleccionar
- Efecto de highlight animado al cambiar de sección

### Página de Nueva Pestaña (NewTabPage):
- Fondo dinámico: wallpapers 4K que cambian diariamente con transición fade
- Opción de fondos animados: partículas flotantes, gradientes en movimiento, ondas
- Reloj digital grande y elegante con fuente thin/ultralight
- Saludo personalizado ("Buenos días, [nombre]") con la hora del día
- Barra de búsqueda central grande con efecto glass y sombra colored
- Speed Dial: grid de sitios favoritos con thumbnails y efecto hover 3D (perspective transform)
- Widgets arrastrables y redimensionables:
  * Clima con iconos animados
  * Noticias con carrusel
  * Calendario mini
  * Lista de tareas (To-do)
  * Monitor de uso de CPU/RAM del navegador
  * Cotizaciones de criptomonedas/bolsa
- Accesos directos a espacios de trabajo con avatares personalizables
- Todo el layout es personalizable con drag & drop

---

## 2. SISTEMA DE TEMAS (THEMING)

- Mínimo 7 temas predefinidos:
  1. **Midnight Dark**: Negro profundo (#0a0a0f) con acentos azul eléctrico (#3b82f6) y púrpura (#8b5cf6)
  2. **Pure Light**: Blanco cristalino con acentos azul cielo y sombras suaves
  3. **Aurora Borealis**: Verdes y púrpuras sobre negro con efecto aurora animado
  4. **Cyberpunk**: Magenta (#ff0080) y cyan (#00ffff) sobre negro con efecto neón
  5. **Ocean Deep**: Azules profundos con gradientes oceánicos
  6. **Sunset Warm**: Naranjas, rosas y púrpuras cálidos
  7. **Forest**: Verdes naturales con tonos tierra

- Editor de temas personalizado completo:
  * Selector de color de acento primario y secundario
  * Selector de color de fondo
  * Opacidad del glassmorphism configurable
  * Intensidad del blur configurable
  * Radio de bordes configurable
  * Preview en vivo de los cambios
  * Exportar/importar temas como JSON
  * Galería comunitaria de temas

- Soporte para temas automáticos por hora del día
- Transición suave entre temas (crossfade de 500ms)
- El tema afecta toda la UI: pestañas, sidebar, nueva pestaña, configuración, menús

---

## 3. FUNCIONALIDADES CORE DEL NAVEGADOR

### Motor de Renderizado:
- Usar Chromium (a través de Electron webview/BrowserView)
- Implementar correctamente la navegación web completa
- Soporte de múltiples pestañas con webviews independientes
- Gestión eficiente de memoria (suspender pestañas inactivas)
- Restauración de sesión al reiniciar

### Navegación:
- Botones atrás/adelante con historial desplegable en long-press
- Botón de recarga con opción de "hard reload" (Ctrl+Shift+R)
- Botón de inicio personalizable
- Gesto de deslizar para atrás/adelante (touchpad)
- Zoom por pestaña (Ctrl+/Ctrl-)
- Modo pantalla completa (F11)

### Gestión de Pestañas Avanzada:
- Abrir pestaña, cerrar, duplicar, fijar, silenciar
- Reabrir última pestaña cerrada (Ctrl+Shift+T)
- Mover pestaña a nueva ventana con drag
- Grupos de pestañas con colores y nombres
- Suspensión automática de pestañas (tab hibernation) después de X minutos
- Vista de "todas las pestañas" en grid con thumbnails
- Búsqueda de pestañas abiertas (Ctrl+Shift+A)
- Límite configurable de pestañas con aviso
- Pestañas "fantasma" que solo guardan la URL hasta que se clickean

### Marcadores:
- Barra de marcadores debajo de la barra de direcciones (togglable)
- Carpetas y subcarpetas
- Etiquetas/tags para organización
- Importar/exportar marcadores (HTML, JSON)
- Sincronización futura
- Vista de marcadores como speed dial, lista o árbol
- Favicon automático
- Búsqueda instantánea de marcadores

### Historial:
- Historial completo con búsqueda full-text
- Agrupado por día, semana, mes
- Filtrar por dominio
- Eliminar entradas individuales o por rango de fechas
- Modo privado que no guarda historial
- Vista de "más visitados" con estadísticas

### Descargas:
- Gestor de descargas integrado en el sidebar
- Barra de progreso visual con porcentaje y velocidad
- Pausa/reanuda descargas
- Seleccionar carpeta de destino
- Detección de tipo de archivo con icono correspondiente
- Historial de descargas
- Notificación toast cuando una descarga se completa

---

## 4. FUNCIONALIDADES AVANZADAS Y DIFERENCIADORAS

### Bloqueador de Anuncios Integrado:
- Bloqueador de anuncios nativo usando listas como EasyList
- Contador de anuncios/rastreadores bloqueados por pestaña y total
- Posibilidad de desactivar por sitio (whitelist)
- Bloqueo de scripts de tracking
- Indicador visual en la barra de direcciones

### Vista Dividida (Split View):
- Dividir la pantalla en 2, 3 o 4 paneles
- Cada panel es un webview independiente
- Resize con drag entre paneles
- Layouts predefinidos: 50/50, 70/30, 33/33/33, grid 2x2
- Guardar configuraciones de split view como "layouts"

### Picture-in-Picture Mejorado:
- Ventana PiP para videos que flota sobre todo
- Controles de reproducción en la ventana PiP
- Resize y drag libre
- Opacidad configurable
- Botón de PiP en todos los videos detectados

### Modo Lectura:
- Elimina toda la basura visual de artículos
- Tipografía serif/sans-serif seleccionable
- Tamaño de fuente ajustable
- Fondo claro/sepia/oscuro
- Estimación de tiempo de lectura
- Texto a voz (TTS) integrado

### Espacios de Trabajo (Workspaces/Spaces):
- Múltiples "espacios" como escritorios virtuales
- Cada espacio tiene sus propias pestañas, historial y configuración
- Cambiar entre espacios con atajos de teclado o sidebar
- Iconos y colores personalizables por espacio
- Ejemplos: "Personal", "Trabajo", "Estudios", "Gaming"
- Animación de transición al cambiar de espacio

### Asistente IA Integrado:
- Panel de chat IA en el sidebar
- Puede resumir la página actual
- Puede responder preguntas sobre el contenido de la página
- Puede traducir el contenido
- Puede explicar código en páginas de programación
- Búsqueda inteligente: reformula tu búsqueda para mejores resultados
- Interfaz tipo ChatGPT con burbujas de mensaje

### Reproductor de Música:
- Mini reproductor integrado en el sidebar
- Detecta y controla audio de cualquier pestaña
- Controles de play/pause/siguiente/anterior
- Visualización de carátula del álbum
- Ecualización básica
- Scrobbling a Last.fm (opcional)

### Notas Rápidas:
- Editor de notas en el sidebar con markdown
- Asociar notas a páginas web específicas
- Notas flotantes sobre la página (como sticky notes)
- Resaltar texto en páginas y guardar como nota
- Exportar notas

### Screenshots y Grabación:
- Captura de pantalla de la página completa (scroll capture)
- Captura de área seleccionada
- Editor básico de capturas (recortar, anotar, difuminar)
- Grabación de pantalla/pestaña
- Guardar como PNG, JPG o copiar al portapapeles

### Seguridad y Privacidad:
- Modo incógnito con UI diferenciada (tema oscuro con acento violeta)
- Borrar datos de navegación con granularidad
- Gestor de contraseñas integrado con cifrado AES-256
- Bloqueo de cookies de terceros por defecto
- Protección contra fingerprinting
- DNS sobre HTTPS (DoH)
- Indicador de trackers bloqueados
- VPN básica integrada (proxy configurable)
- Autenticación biométrica/PIN para acceder al navegador

### Herramientas de Desarrollador:
- DevTools integrados (heredados de Chromium)
- Inspector de elementos mejorado
- Consola con autocompletado
- Monitor de red con visualización mejorada
- Lighthouse integrado para auditorías
- Vista responsive con dispositivos predefinidos

---

## 5. RENDIMIENTO Y OPTIMIZACIÓN

- Tab hibernation: suspender pestañas no visitadas en X minutos para liberar RAM
- Lazy loading de pestañas al restaurar sesión
- Precarga inteligente de links al hacer hover (prefetch)
- Caché agresivo pero inteligente
- Compresión de datos opcional para conexiones lentas
- Monitor de rendimiento integrado: muestra uso de CPU, RAM y red por pestaña
- Proceso por pestaña con límite de memoria configurable
- Inicio rápido: < 2 segundos en abrir la primera ventana

---

## 6. ATAJOS DE TECLADO

Implementa TODOS estos atajos:

| Atajo | Acción |
|---|---|
| Ctrl+T | Nueva pestaña |
| Ctrl+W | Cerrar pestaña actual |
| Ctrl+Shift+T | Reabrir última pestaña cerrada |
| Ctrl+Tab | Siguiente pestaña |
| Ctrl+Shift+Tab | Pestaña anterior |
| Ctrl+L | Enfocar barra de direcciones |
| Ctrl+D | Añadir marcador |
| Ctrl+H | Abrir historial |
| Ctrl+J | Abrir descargas |
| Ctrl+Shift+B | Toggle barra de marcadores |
| Ctrl+Shift+N | Ventana incógnita |
| Ctrl+F | Buscar en página |
| Ctrl+Shift+F | Búsqueda global |
| Ctrl+G | Ir a pestaña (búsqueda de pestañas) |
| Ctrl++ | Zoom in |
| Ctrl+- | Zoom out |
| Ctrl+0 | Resetear zoom |
| F5 | Recargar |
| Ctrl+Shift+R | Hard reload |
| F11 | Pantalla completa |
| Ctrl+Shift+I | DevTools |
| Ctrl+E | Toggle sidebar |
| Ctrl+1-9 | Ir a pestaña N |
| Alt+Izquierda | Atrás |
| Alt+Derecha | Adelante |
| Ctrl+Shift+A | Buscar pestañas abiertas |
| Ctrl+Shift+S | Captura de pantalla |
| Ctrl+Shift+Space | Cambiar espacio de trabajo |
| Ctrl+/ | Abrir comandos rápidos (command palette) |

---

## 7. ANIMACIONES Y TRANSICIONES

Usa Framer Motion para TODAS las animaciones. Cada interacción debe sentirse premium:

- **Abrir pestaña**: spring animation con overshoot ligero (stiffness: 300, damping: 25)
- **Cerrar pestaña**: fade out + scale down + collapse del espacio
- **Hover en botones**: scale(1.05) + shadow increase con transición 200ms
- **Click en botones**: scale(0.95) momentáneo (efecto "press")
- **Abrir sidebar**: slide desde la izquierda con spring
- **Cambiar de espacio**: crossfade con slide horizontal
- **Modal/Dialog**: fade in del overlay + scale up del contenido desde 0.9 a 1
- **Toast notifications**: slide in desde arriba + auto dismiss con fade out
- **Dropdown/menús**: fade in + translateY desde -10px a 0
- **Loading**: shimmer gradient animado en lugar de spinners aburridos
- **Drag & drop**: elemento se eleva (shadow + scale 1.02) al empezar a arrastrar
- **Cambio de tema**: crossfade de 500ms en todos los colores
- **Scroll**: momentum scrolling natural
- **Page transitions**: fade between pages con 300ms

---

## 8. RESPONSIVE Y MULTI-VENTANA

- La interfaz debe adaptarse a ventanas desde 800x600 hasta 4K
- Soporte para múltiples ventanas independientes
- Arrastrar pestañas entre ventanas
- Recordar posición y tamaño de ventana
- Soporte para múltiples monitores
- Snap layouts de Windows 11

---

## 9. ESPECIFICACIONES TÉCNICAS

### Dependencias principales:
```json
{
  "electron": "latest",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "zustand": "^4",
  "@electron/remote": "latest",
  "electron-store": "latest",
  "lucide-react": "latest",
  "date-fns": "latest",
  "dompurify": "latest",
  "marked": "latest"
}
```

### Herramientas de desarrollo:
```json
{
  "vite": "latest",
  "electron-builder": "latest",
  "electron-vite": "latest",
  "@types/react": "latest",
  "eslint": "latest",
  "prettier": "latest"
}
```

---

## 10. INSTRUCCIONES DE IMPLEMENTACIÓN

1. **EMPIEZA** configurando el proyecto Electron + Vite + React + TypeScript + Tailwind
2. **IMPLEMENTA** primero la estructura básica: ventana principal, barra de pestañas, barra de direcciones, webview
3. **ASEGÚRATE** de que la navegación web funciona perfectamente antes de añadir features
4. **AÑADE** el sidebar con todas sus secciones
5. **IMPLEMENTA** el sistema de temas con los 7 temas predefinidos
6. **CREA** la página de nueva pestaña espectacular
7. **AÑADE** las funcionalidades avanzadas una por una
8. **IMPLEMENTA** todos los atajos de teclado
9. **OPTIMIZA** el rendimiento
10. **PULE** todas las animaciones hasta que se sientan premium

RECUERDA: La CALIDAD VISUAL es la prioridad #1. Cada pixel cuenta. Cada animación debe ser suave como la seda. El usuario debe sentir que está usando algo del FUTURO. No escatimes en detalles visuales. Hazlo ESPECTACULAR.

Empieza implementando TODO el código necesario. No me des explicaciones largas, SOLO CÓDIGO FUNCIONAL Y COMPLETO.
```

---

## NOTAS DE USO

1. **Copia todo el bloque de código** de arriba (desde "Quiero que construyas..." hasta "...CÓDIGO FUNCIONAL Y COMPLETO.")
2. **Pega en Cursor Editor** como un mensaje nuevo en el chat
3. **Cursor generará** todo el proyecto paso a paso
4. **Si el resultado es parcial**, pide que continúe con: "Continúa implementando desde donde te quedaste. No repitas código ya escrito."
5. **Para partes específicas**, pide: "Ahora implementa el [componente/feature] con el máximo nivel de detalle visual."

## PROMPTS DE SEGUIMIENTO ÚTILES

Después de la generación inicial, usa estos prompts para mejorar partes específicas:

- "Mejora las animaciones de las pestañas. Quiero que al abrir, cerrar y reordenar pestañas se sienta ultra fluido con spring animations."
- "Hazme la página de nueva pestaña más espectacular. Añade fondos animados con partículas, un reloj enorme y widgets arrastrables."
- "Implementa el sistema completo de temas con los 7 temas predefinidos y el editor de temas personalizado."
- "Implementa el bloqueador de anuncios completo con listas EasyList y contador visual."
- "Implementa los espacios de trabajo (workspaces) con toda la funcionalidad descrita."
- "Implementa la vista dividida (split view) con todos los layouts."
- "Mejora el sidebar: hazlo más atractivo con glassmorphism y micro-animaciones."
- "Implementa el gestor de descargas completo con barra de progreso visual tipo neón."
- "Implementa el modo lectura con todas las opciones de personalización."
- "Implementa el sistema de capturas de pantalla con editor básico."
