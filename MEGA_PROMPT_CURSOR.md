# 🚀 MEGA PROMPT - CONTENTGPT BOT

## COPIA TODO DESDE AQUÍ 👇

---

Eres un experto desarrollador full stack. Necesito que me crees un proyecto COMPLETO y FUNCIONAL de un Bot de Telegram que genera contenido con IA. Este bot será mi negocio y necesito que esté listo para producción y monetización.

## 📋 RESUMEN DEL PROYECTO

**Nombre:** ContentGPT Bot
**Qué hace:** Bot de Telegram que genera contenido para redes sociales, emails, artículos, etc. usando IA gratuita (g4f)
**Monetización:** Suscripciones mensuales (5€, 10€, 15€)
**Marketing:** Sistema de referidos viral integrado

## 🏗️ ARQUITECTURA COMPLETA

```
content-gpt-bot/
├── bot/
│   ├── __init__.py
│   ├── main.py              # Entry point del bot
│   ├── handlers.py          # Manejadores de comandos
│   ├── keyboards.py         # Teclados inline
│   ├── ai_generator.py      # Generación de contenido con IA
│   ├── database.py          # SQLite async
│   └── referrals.py         # Sistema de referidos
├── web/
│   ├── __init__.py
│   ├── app.py               # FastAPI server
│   ├── routes.py            # Rutas API + webhooks
│   └── templates/
│       ├── landing.html     # Landing page
│       ├── success.html     # Pago exitoso
│       └── cancel.html      # Pago cancelado
├── config/
│   ├── __init__.py
│   └── settings.py          # Configuración
├── data/                    # Base de datos SQLite
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── README.md
└── run.py                   # Script para ejecutar todo
```

## 📦 DEPENDENCIAS (requirements.txt)

```
python-telegram-bot==20.7
python-telegram-bot[job-queue]==20.7
g4f==0.2.5.2
aiosqlite==0.19.0
fastapi==0.109.0
uvicorn==0.27.0
stripe==7.10.0
python-dotenv==1.0.0
jinja2==3.1.3
aiohttp==3.9.1
```

## ⚙️ CONFIGURACIÓN (config/settings.py)

Necesito estas variables configurables:
- TELEGRAM_BOT_TOKEN (de @BotFather)
- STRIPE_SECRET_KEY (de stripe.com)
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_BASIC (5€/mes)
- STRIPE_PRICE_PRO (10€/mes)
- STRIPE_PRICE_UNLIMITED (15€/mes)
- DATABASE_PATH (data/bot.db)
- WEB_URL (para webhooks de Stripe)

Planes:
- FREE: 5 generaciones/día, gratis
- BASIC: 50 generaciones/día, 5€/mes
- PRO: 200 generaciones/día, 10€/mes
- UNLIMITED: ilimitado, 15€/mes

## 🤖 BOT DE TELEGRAM - COMANDOS

### /start
- Si viene con referido (?start=ref_CODIGO): registrar referido y dar bonus
- Mensaje de bienvenida con explicación del bot
- Mostrar menú principal con botones inline

### /generate o botón "Generar Contenido"
1. Mostrar tipos de contenido disponibles (botones inline):
   - 🐦 Tweet/Hilo Twitter
   - 📸 Caption Instagram
   - 💼 Post LinkedIn
   - 🎥 Título+Descripción YouTube
   - 📧 Email marketing
   - 📝 Artículo blog
   - 🎵 Script TikTok/Reels
   - 🛍️ Descripción producto
   - 📣 Copy publicitario
   - 👤 Bio para redes
   - ✨ Personalizado

2. Después de elegir tipo, preguntar: "¿Sobre qué tema?"
3. Esperar respuesta del usuario
4. Preguntar tono (botones):
   - Profesional
   - Casual
   - Humorístico
   - Inspirador
   - Urgente
   - Educativo

5. Generar contenido con IA (g4f)
6. Enviar resultado con botones:
   - 🔄 Regenerar
   - ✏️ Modificar
   - 📤 Compartir (genera link con marca de agua)
   - 🏠 Menú principal

### /plan o botón "Mi Plan"
- Mostrar plan actual
- Uso de hoy / límite diario
- Bonus de referidos disponibles
- Botones para upgrade

### /upgrade o botón "Mejorar Plan"
- Mostrar planes disponibles con precios
- Al seleccionar plan: generar link de pago Stripe
- Enviar link al usuario

### /referrals o botón "Invitar Amigos"
- Mostrar link de referido único del usuario
- Estadísticas: cuántos ha invitado, bonus ganados
- Explicar: "Invita amigos, gana 10 generaciones gratis por cada uno"

### /stats (solo admin)
- Total usuarios
- Usuarios de pago
- Total generaciones
- Ingresos estimados

### /help
- Explicación de cómo usar el bot
- Lista de comandos
- Link a soporte

## 🧠 GENERADOR DE IA (bot/ai_generator.py)

Usar g4f (GPT gratis sin API key):

```python
import g4f
import asyncio

async def generate_content(content_type: str, topic: str, tone: str) -> str:
    prompt = construir_prompt(content_type, topic, tone)
    
    response = await asyncio.to_thread(
        g4f.ChatCompletion.create,
        model=g4f.models.gpt_4,
        messages=[{"role": "user", "content": prompt}]
    )
    return response
```

### Prompts por tipo de contenido:

**Twitter:**
"Genera un tweet viral sobre: {topic}. Máximo 280 caracteres. Incluye 1-2 emojis. Tono: {tone}. Responde SOLO con el tweet."

**Instagram:**
"Genera caption de Instagram sobre: {topic}. Gancho potente, 3-5 párrafos, llamada a la acción, 5-10 hashtags. Tono: {tone}."

**LinkedIn:**
"Genera post de LinkedIn sobre: {topic}. Gancho en primera línea, historia o caso, 3-5 puntos de valor, llamada a la acción. Tono: {tone}."

**YouTube:**
"Genera título (máx 60 chars) y descripción para video de YouTube sobre: {topic}. Tono: {tone}."

**Email:**
"Genera email marketing sobre: {topic}. Asunto (máx 50 chars), saludo, cuerpo persuasivo, llamada a la acción. Tono: {tone}."

**Blog:**
"Genera artículo de blog sobre: {topic}. Título SEO, introducción, 3-5 secciones, conclusión. ~500 palabras. Tono: {tone}."

**TikTok:**
"Genera script para TikTok/Reels sobre: {topic}. 30-60 segundos. Gancho en 3 segundos. Formato: [ACCIÓN] + TEXTO. Tono: {tone}."

**Producto:**
"Genera descripción de producto para: {topic}. Título, 3-5 beneficios, descripción persuasiva, llamada a la acción. Tono: {tone}."

**Ad Copy:**
"Genera copy publicitario sobre: {topic}. Headline (30 chars), subheadline (40 chars), texto (125 chars). 3 variaciones. Tono: {tone}."

**Bio:**
"Genera bio para: {topic}. Versión corta (160 chars Twitter), media (250 chars Instagram), larga (500 chars LinkedIn). Tono: {tone}."

## 💾 BASE DE DATOS (bot/database.py)

SQLite con aiosqlite. Tablas:

```sql
-- Usuarios
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    plan TEXT DEFAULT 'free',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Uso diario
CREATE TABLE daily_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date DATE,
    count INTEGER DEFAULT 0,
    UNIQUE(user_id, date)
);

-- Historial de generaciones
CREATE TABLE generations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content_type TEXT,
    prompt TEXT,
    result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referidos
CREATE TABLE referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referrer_id INTEGER,
    referred_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(referred_id)
);

-- Bonus de referidos
CREATE TABLE referral_bonuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    bonus_generations INTEGER DEFAULT 0,
    expires_at TIMESTAMP
);
```

Funciones necesarias:
- get_or_create_user(user_id, username, first_name)
- get_user_plan(user_id) -> str
- update_user_plan(user_id, plan, stripe_customer_id)
- get_daily_usage(user_id) -> int
- increment_usage(user_id)
- can_generate(user_id) -> bool (chequea límite + bonus)
- save_generation(user_id, type, prompt, result)
- register_referral(referrer_id, referred_id)
- get_bonus_generations(user_id) -> int
- use_bonus_generation(user_id)
- get_referral_stats(user_id) -> dict
- get_referral_link(user_id, bot_username) -> str

## 💳 PAGOS CON STRIPE (web/routes.py)

### Crear sesión de checkout:
```python
@app.post("/create-checkout/{user_id}/{plan}")
async def create_checkout(user_id: int, plan: str):
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price': STRIPE_PRICES[plan],
            'quantity': 1,
        }],
        mode='subscription',
        success_url=f'{WEB_URL}/success?user_id={user_id}',
        cancel_url=f'{WEB_URL}/cancel',
        metadata={'user_id': str(user_id), 'plan': plan}
    )
    return {"url": session.url}
```

### Webhook de Stripe:
```python
@app.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get('stripe-signature')
    event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_id = int(session['metadata']['user_id'])
        plan = session['metadata']['plan']
        customer_id = session['customer']
        subscription_id = session['subscription']
        
        await update_user_plan(user_id, plan, customer_id, subscription_id)
        
        # Notificar al usuario por Telegram
        await bot.send_message(user_id, f"✅ ¡Pago exitoso! Tu plan {plan} está activo.")
    
    if event['type'] == 'customer.subscription.deleted':
        # Suscripción cancelada, volver a plan free
        subscription = event['data']['object']
        customer_id = subscription['customer']
        await downgrade_user_by_customer(customer_id, 'free')
    
    return {"status": "ok"}
```

## 🌐 LANDING PAGE (web/templates/landing.html)

Landing page atractiva con:
- Hero section: "Genera contenido viral con IA en segundos"
- Botón grande: "Probar GRATIS en Telegram"
- Sección de tipos de contenido que genera
- Tabla de precios (Free, Basic, Pro, Unlimited)
- Testimonios (puedes inventar 3)
- FAQ
- Footer con links

Diseño: Moderno, colores vibrantes (gradiente azul-morado), responsive.

## 🐳 DOCKER

### Dockerfile:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "run.py"]
```

### docker-compose.yml:
```yaml
version: '3.8'
services:
  bot:
    build: .
    env_file: .env
    volumes:
      - ./data:/app/data
    ports:
      - "8000:8000"
    restart: unless-stopped
```

## 📝 README.md

Incluir:
1. Qué es el proyecto
2. Características
3. Requisitos previos
4. Instalación paso a paso
5. Configuración (.env)
6. Cómo crear bot en Telegram (@BotFather)
7. Cómo configurar Stripe
8. Cómo ejecutar (local y Docker)
9. Cómo desplegar (Railway, Render, VPS)
10. Estructura del proyecto
11. Cómo conseguir primeros clientes (marketing)

## 🎯 SISTEMA DE REFERIDOS

- Cada usuario tiene código único: hash(user_id + salt)[:8]
- Link: t.me/BOT_USERNAME?start=ref_CODIGO
- Al registrarse con referido:
  - Referidor gana: 10 generaciones bonus
  - Referido gana: 5 generaciones bonus
- Bonus expira en 30 días
- Mostrar en /referrals:
  - Tu link de referido
  - Cuántos has invitado
  - Bonus disponible
  - "¡Comparte y gana generaciones gratis!"

## 🔔 MENSAJE DE MARKETING EN CADA GENERACIÓN

Al final de cada contenido generado, añadir sutilmente:
```
─────────────────
✨ Creado con @ContentGPTBot
🚀 Genera contenido viral gratis
```

Esto es marketing automático - cada usuario hace publicidad cuando comparte.

## ✅ CHECKLIST FINAL

El proyecto debe incluir:
- [ ] Bot de Telegram 100% funcional
- [ ] Todos los comandos implementados
- [ ] 10+ tipos de contenido
- [ ] 6 tonos diferentes
- [ ] Base de datos SQLite
- [ ] Sistema de planes y límites
- [ ] Integración Stripe completa
- [ ] Webhooks funcionando
- [ ] Sistema de referidos viral
- [ ] Landing page atractiva
- [ ] Docker configurado
- [ ] README completo
- [ ] .env.example con todas las variables
- [ ] Código limpio y documentado
- [ ] Manejo de errores
- [ ] Logs útiles

## 🚀 EJECUCIÓN

run.py debe:
1. Inicializar base de datos
2. Inicializar tablas de referidos
3. Arrancar bot de Telegram (polling o webhook)
4. Arrancar servidor FastAPI
5. Todo en paralelo con asyncio

---

## IMPORTANTE

1. Todo el código debe ser FUNCIONAL y LISTO PARA PRODUCCIÓN
2. Usa async/await en todo
3. Maneja todos los errores posibles
4. El bot debe ser robusto y no crashear
5. Incluye comentarios en español
6. Crea TODOS los archivos necesarios

## EMPIEZA AHORA

Crea el proyecto completo, archivo por archivo, sin saltarte nada. Cuando termines cada archivo, confirma y continúa con el siguiente hasta completar todo.

¡EMPIEZA!
