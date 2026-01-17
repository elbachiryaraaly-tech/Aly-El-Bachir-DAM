"""
ContentGPT Bot - Configuración
"""
import os
from dotenv import load_dotenv

load_dotenv()

# ============================================
# TELEGRAM (GRATIS - crea tu bot en @BotFather)
# ============================================
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "TU_TOKEN_AQUI")

# ============================================
# STRIPE (GRATIS crear cuenta - stripe.com)
# ============================================
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")

# Precios (créalos en Stripe Dashboard)
STRIPE_PRICES = {
    "basic": os.getenv("STRIPE_PRICE_BASIC", ""),      # 5€/mes
    "pro": os.getenv("STRIPE_PRICE_PRO", ""),          # 10€/mes
    "unlimited": os.getenv("STRIPE_PRICE_UNLIMITED", ""), # 15€/mes
}

# ============================================
# PLANES Y LÍMITES
# ============================================
PLANS = {
    "free": {
        "name": "Gratis",
        "price": 0,
        "daily_limit": 5,
        "features": ["5 generaciones/día", "Contenido básico"]
    },
    "basic": {
        "name": "Basic",
        "price": 5,
        "daily_limit": 50,
        "features": ["50 generaciones/día", "Todos los tipos de contenido"]
    },
    "pro": {
        "name": "Pro", 
        "price": 10,
        "daily_limit": 200,
        "features": ["200 generaciones/día", "Prioridad", "Estilos personalizados"]
    },
    "unlimited": {
        "name": "Unlimited",
        "price": 15,
        "daily_limit": 999999,
        "features": ["Ilimitado", "API access", "Soporte prioritario"]
    }
}

# ============================================
# BASE DE DATOS
# ============================================
DATABASE_PATH = os.getenv("DATABASE_PATH", "data/bot.db")

# ============================================
# WEB
# ============================================
WEB_URL = os.getenv("WEB_URL", "http://localhost:8000")
