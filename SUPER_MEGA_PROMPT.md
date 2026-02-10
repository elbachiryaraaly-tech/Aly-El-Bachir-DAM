# SUPER MEGA PROMPT — Monitor Elite de Citas Consulares 24/7

> **COPIA TODO LO QUE ESTÁ DEBAJO DE ESTA LÍNEA Y PÉGALO EN CURSOR EDITOR**

---

Eres un ingeniero de software senior especializado en web scraping, automatización y sistemas de monitorización en tiempo real. Tu misión es construir EL SISTEMA MÁS ROBUSTO, EFICIENTE E INFALIBLE que exista para monitorizar la disponibilidad de citas en esta web:

**URL OBJETIVO:** `https://www.citaconsular.es/es/hosteds/widgetdefault/2da8fb6f4ac7361929959598a1e5b1e45/#services`

---

## CONTEXTO CRÍTICO

Esta web es un widget de reserva de citas consulares (plataforma citaconsular.es). Las citas se liberan de forma aleatoria y se agotan en SEGUNDOS. Es prácticamente imposible conseguir una manualmente. Necesito un sistema automatizado que:

1. **Monitorice 24/7 sin parar** la disponibilidad de citas en esa URL exacta.
2. **En el INSTANTE** en que detecte una cita disponible, me envíe notificación por **TODOS estos canales simultáneamente**: SMS, Email, WhatsApp y Telegram.
3. **CERO fallos**. Si un componente falla, debe auto-recuperarse. Si la web cambia, debe adaptarse. Si lo bloquean, debe rotar estrategia.

---

## REQUISITOS TÉCNICOS OBLIGATORIOS

### 1. MOTOR DE SCRAPING MULTI-CAPA (3 estrategias en paralelo)

Implementa 3 métodos de detección que corran simultáneamente. Si uno falla, los otros siguen. Si los 3 detectan cita, solo notifica UNA vez:

**CAPA 1 — Selenium con Chrome headless:**
- Usa `selenium` + `webdriver-manager` para gestionar ChromeDriver automáticamente.
- Abre la URL, espera a que cargue el widget completamente (usa WebDriverWait con condiciones explícitas).
- Analiza el DOM buscando: botones habilitados de reserva, textos como "Seleccionar", "Disponible", "Reservar", ausencia de textos como "No hay citas disponibles", "Sin disponibilidad".
- Implementa anti-detección: user-agent aleatorio (usa `fake-useragent`), resolución de pantalla variable, delays humanizados aleatorios, deshabilitar webdriver flags (`navigator.webdriver`).
- Captura screenshots en cada escaneo para debug.

**CAPA 2 — Interceptación de API/XHR:**
- Antes de usar Selenium, intercepta las llamadas de red que hace el widget.
- Usa `selenium` con `desired_capabilities` para capturar Network logs, O usa `mitmproxy`/`browsermob-proxy`.
- Identifica los endpoints API que el widget consulta para obtener disponibilidad (normalmente son llamadas XHR/fetch a un JSON).
- Una vez identificado el endpoint, haz polling directo con `httpx` (async) o `requests` — esto es MÁS RÁPIDO que renderizar el navegador completo.
- Parsea la respuesta JSON buscando slots disponibles.

**CAPA 3 — Requests + BeautifulSoup (fallback ligero):**
- Petición HTTP directa con `requests` o `httpx` con sesión persistente.
- Usa `cloudscraper` si hay protección Cloudflare.
- Parsea HTML con `BeautifulSoup` + `lxml`.
- Busca patrones de disponibilidad en el HTML crudo.
- Esta capa es la más rápida pero puede no funcionar si el contenido se carga dinámicamente con JS (por eso es fallback).

### 2. SISTEMA DE NOTIFICACIONES NUCLEAR (todos los canales)

Cuando se detecta disponibilidad, dispara TODOS los canales a la vez usando `asyncio` o `threading`:

**SMS — Twilio:**
```python
# Usa la API de Twilio
# pip install twilio
from twilio.rest import Client
# Configurable: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_FROM
# Envía a múltiples números configurados
```

**WhatsApp — Twilio WhatsApp API:**
```python
# Usa Twilio WhatsApp Sandbox o Business API
# El número "from" es: whatsapp:+14155238886 (sandbox) o tu número business
# Envía mensaje con toda la info + link directo a la web
```

**Email — SMTP (Gmail u otro):**
```python
# Usa smtplib nativo de Python
# Configurable: SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
# Envía email HTML formateado con urgencia HIGH
# Headers: X-Priority: 1, Importance: high
# Asunto: 🚨 ¡¡¡CITA DISPONIBLE AHORA!!! — CORRE 🚨
```

**Telegram — Bot API:**
```python
# Usa requests directamente al API de Telegram
# POST https://api.telegram.org/bot{TOKEN}/sendMessage
# Configurable: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
# Envía mensaje con formato Markdown, link clicable
```

**Sonido local (bonus):**
- Si el script corre en una máquina con audio, reproduce una alarma sonora fuerte.
- Usa `playsound` o `winsound` (Windows) o `os.system("aplay alarm.wav")` (Linux).

### 3. LÓGICA DE ESCANEO INTELIGENTE

```
MODO NORMAL (fuera de horario pico):
  → Escaneo cada 20-45 segundos (aleatorio para evitar patrones)

MODO AGRESIVO (horario pico 8:00-17:00 hora España):
  → Escaneo cada 8-15 segundos

MODO BESTIA (si se detectó actividad reciente o cambio en la web):
  → Escaneo cada 3-5 segundos durante 10 minutos

ANTI-DUPLICADOS:
  → Si ya notificó una cita, no volver a notificar la misma
  → Cooldown de notificación: 2 minutos mínimo entre alertas
  → Pero si aparece una NUEVA cita diferente, notifica inmediatamente
```

### 4. ANTI-BLOQUEO Y EVASIÓN

- **Rotación de User-Agent** en cada petición (usa `fake-useragent`).
- **Rotación de proxies** (configurable, lista de proxies en `.env`).
- **Delays aleatorios humanizados** (no intervalos fijos, usa `random.uniform()`).
- **Rotación de fingerprint del navegador** (resolución, idioma, timezone).
- **Manejo de Cloudflare/captchas**: usa `cloudscraper`. Si hay captcha, loguea y alerta.
- **Reinicio automático de sesión** cada 50-100 peticiones.
- **Cambio de IP** si se usan proxies rotativos.

### 5. RESILIENCIA Y AUTO-RECUPERACIÓN

- **Try/except en TODAS las operaciones** con logging detallado.
- **Retry automático con backoff exponencial** (usa la librería `tenacity`):
  ```python
  @retry(
      stop=stop_after_attempt(10),
      wait=wait_exponential(multiplier=1, min=2, max=60),
      retry=retry_if_exception_type(Exception)
  )
  ```
- **Watchdog**: un hilo separado que monitoriza que el scanner principal sigue vivo. Si se cuelga, lo reinicia.
- **Heartbeat**: cada 30 minutos envía un mensaje de "sistema activo" por Telegram para confirmar que sigue funcionando.
- **Auto-reinicio del navegador**: si Selenium crashea, cierra todo y reabre.
- **Manejo de memoria**: cierra y reabre el navegador cada 1 hora para evitar memory leaks.
- **Persistencia en disco**: guarda el estado en SQLite para que si se reinicia el sistema, no pierda historial.

### 6. LOGGING Y OBSERVABILIDAD

- Usa `loguru` para logging avanzado con rotación de archivos.
- Log a archivo (`logs/monitor.log`) + consola con colores (usa `rich`).
- Cada escaneo loguea: timestamp, método usado, resultado, tiempo de respuesta.
- Dashboard web simple con Flask + SocketIO que muestra en tiempo real:
  - Estado del monitor (activo/inactivo)
  - Último escaneo y resultado
  - Historial de detecciones
  - Historial de notificaciones enviadas
  - Gráfico de tiempos de respuesta
  - Botón de test de notificaciones

### 7. BASE DE DATOS (SQLite)

Tablas:
- `scans`: id, timestamp, method (selenium/api/requests), result (available/unavailable/error), response_time_ms, screenshot_path, raw_data
- `notifications`: id, timestamp, channel (sms/whatsapp/email/telegram), recipient, status (sent/failed), error_message
- `appointments_detected`: id, timestamp, details, notified (bool), screenshot_path
- `system_health`: id, timestamp, event (start/stop/error/restart), details

### 8. ESTRUCTURA DEL PROYECTO

```
cita-monitor/
├── .env                        # Variables de entorno (NUNCA commitear)
├── .env.example                # Plantilla de variables
├── .gitignore
├── requirements.txt            # Todas las dependencias con versiones
├── docker-compose.yml          # Para correr 24/7 en servidor
├── Dockerfile
├── config.py                   # Configuración centralizada con pydantic-settings
├── main.py                     # Punto de entrada principal
├── monitor/
│   ├── __init__.py
│   ├── engine.py               # Motor principal de orquestación
│   ├── scanner_selenium.py     # Capa 1: Selenium
│   ├── scanner_api.py          # Capa 2: Interceptación API
│   ├── scanner_requests.py     # Capa 3: Requests directo
│   └── detector.py             # Lógica de detección de disponibilidad
├── notifications/
│   ├── __init__.py
│   ├── manager.py              # Orquestador de notificaciones
│   ├── sms.py                  # Twilio SMS
│   ├── whatsapp.py             # Twilio WhatsApp
│   ├── email_sender.py         # SMTP Email
│   ├── telegram.py             # Telegram Bot
│   └── sound.py                # Alarma sonora local
├── anti_detection/
│   ├── __init__.py
│   ├── fingerprint.py          # Rotación de fingerprints
│   ├── proxy_manager.py        # Gestión de proxies
│   └── stealth.py              # Configuración stealth del navegador
├── database/
│   ├── __init__.py
│   ├── models.py               # Modelos SQLAlchemy
│   └── db.py                   # Conexión y operaciones DB
├── dashboard/
│   ├── __init__.py
│   ├── app.py                  # Flask app
│   ├── templates/
│   │   └── index.html          # Dashboard HTML
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── dashboard.js
├── logs/                       # Directorio de logs (auto-creado)
├── screenshots/                # Capturas de pantalla (auto-creado)
└── tests/
    ├── test_scanner.py
    ├── test_notifications.py
    └── test_detector.py
```

### 9. DOCKER (para ejecución 24/7 en servidor)

```dockerfile
# Dockerfile con Chrome + ChromeDriver + Python
# Basado en python:3.12-slim
# Instala chromium, chromium-driver, dependencias del sistema
# Corre main.py como proceso principal
# Healthcheck integrado
```

```yaml
# docker-compose.yml
# Servicio monitor: build desde Dockerfile, restart: always, volumes para logs y DB
# Servicio redis: para cola de tareas (opcional)
# Servicio dashboard: expone puerto 5000
# restart: unless-stopped para que NUNCA pare
```

### 10. main.py — PUNTO DE ENTRADA

```python
# 1. Carga configuración desde .env
# 2. Inicializa base de datos
# 3. Inicia los 3 scanners en hilos/procesos separados
# 4. Inicia el watchdog en hilo separado
# 5. Inicia el heartbeat en hilo separado
# 6. Inicia el dashboard web en hilo separado
# 7. Loop principal que coordina todo
# 8. Maneja señales (SIGINT, SIGTERM) para shutdown limpio
# 9. Al arrancar, envía notificación de "Sistema iniciado" por Telegram
```

---

## INSTRUCCIONES DE IMPLEMENTACIÓN

1. **Primero**: Analiza la URL objetivo. Abre la web con Selenium, inspecciona el DOM, captura las llamadas de red, entiende cómo funciona el widget. Documenta qué elementos HTML indican disponibilidad vs no disponibilidad.

2. **Segundo**: Implementa toda la estructura de archivos listada arriba.

3. **Tercero**: Implementa cada módulo en orden: config → database → anti_detection → scanners → notifications → engine → dashboard → main.

4. **Cuarto**: Haz que TODO sea configurable via `.env`. Ningún valor hardcodeado.

5. **Quinto**: Implementa tests unitarios para cada componente.

6. **Sexto**: Crea el Dockerfile y docker-compose.yml funcionales.

7. **Séptimo**: Crea un README.md épico con:
   - Descripción del sistema
   - Requisitos previos
   - Guía paso a paso de instalación
   - Cómo configurar cada servicio de notificación (Twilio, Gmail, Telegram)
   - Cómo ejecutar en local
   - Cómo desplegar en servidor con Docker
   - Troubleshooting
   - FAQ

---

## REGLAS INQUEBRANTABLES

1. **PYTHON 3.11+** obligatorio.
2. **Type hints** en TODAS las funciones.
3. **Docstrings** en TODAS las clases y funciones.
4. **Async donde sea posible** para máximo rendimiento.
5. **NUNCA** hardcodear credenciales — todo en `.env`.
6. **Logging EXHAUSTIVO** — quiero poder hacer debug de cualquier problema leyendo los logs.
7. **El sistema NO PUEDE MORIR**. Si algo falla, se recupera solo, loguea el error y sigue.
8. **Código limpio**, modular, siguiendo principios SOLID.
9. **Sin dependencias innecesarias** — cada paquete debe justificarse.
10. **Screenshots automáticos** cuando se detecta disponibilidad (prueba visual).

---

## MENSAJE DE NOTIFICACIÓN (formato)

Cuando se detecta una cita disponible, el mensaje debe ser:

```
🚨🚨🚨 ¡¡¡CITA DISPONIBLE!!! 🚨🚨🚨

📅 Detectado: {fecha y hora exacta}
🔍 Método de detección: {selenium/api/requests}
⏱️ Tiempo de respuesta: {X ms}

👉 ENTRA AHORA: https://www.citaconsular.es/es/hosteds/widgetdefault/2da8fb6f4ac7361929959598a1e5b1e45/#services

⚡ Detalles: {cualquier info adicional sobre la cita detectada}

🤖 Sistema Monitor Elite v1.0
```

---

## PRIORIDAD ABSOLUTA

El factor más importante es la **VELOCIDAD DE DETECCIÓN**. Desde que la cita aparece en la web hasta que yo recibo la notificación, debe pasar el **MENOR TIEMPO POSIBLE** (objetivo: menos de 10 segundos). Cada segundo cuenta. Cada milisegundo cuenta. Optimiza todo para velocidad.

---

EMPIEZA AHORA. Implementa TODO el sistema completo, funcional y listo para producción. No me preguntes nada, simplemente hazlo. Cada archivo debe estar completo y funcional, no uses placeholders ni "TODO". CÓDIGO REAL Y COMPLETO.
