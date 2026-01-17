"""
ContentGPT Bot - Base de datos
Maneja usuarios, suscripciones y uso
"""
import aiosqlite
import os
from datetime import datetime, date
from pathlib import Path

DATABASE_PATH = os.getenv("DATABASE_PATH", "data/bot.db")

async def init_database():
    """Inicializa la base de datos"""
    Path("data").mkdir(exist_ok=True)
    
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Tabla de usuarios
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                first_name TEXT,
                plan TEXT DEFAULT 'free',
                stripe_customer_id TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Tabla de uso diario
        await db.execute("""
            CREATE TABLE IF NOT EXISTS daily_usage (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                date DATE,
                count INTEGER DEFAULT 0,
                UNIQUE(user_id, date)
            )
        """)
        
        # Tabla de generaciones (historial)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS generations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                content_type TEXT,
                prompt TEXT,
                result TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        await db.commit()
        print("✅ Base de datos inicializada")

async def get_or_create_user(user_id: int, username: str = None, first_name: str = None):
    """Obtiene o crea un usuario"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        cursor = await db.execute(
            "SELECT * FROM users WHERE user_id = ?", (user_id,)
        )
        user = await cursor.fetchone()
        
        if user:
            return dict(user)
        
        # Crear nuevo usuario
        await db.execute(
            "INSERT INTO users (user_id, username, first_name) VALUES (?, ?, ?)",
            (user_id, username, first_name)
        )
        await db.commit()
        
        return {
            "user_id": user_id,
            "username": username,
            "first_name": first_name,
            "plan": "free",
            "stripe_customer_id": None
        }

async def get_user_plan(user_id: int) -> str:
    """Obtiene el plan del usuario"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute(
            "SELECT plan FROM users WHERE user_id = ?", (user_id,)
        )
        result = await cursor.fetchone()
        return result[0] if result else "free"

async def update_user_plan(user_id: int, plan: str, stripe_customer_id: str = None):
    """Actualiza el plan del usuario"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        if stripe_customer_id:
            await db.execute(
                "UPDATE users SET plan = ?, stripe_customer_id = ?, updated_at = ? WHERE user_id = ?",
                (plan, stripe_customer_id, datetime.now(), user_id)
            )
        else:
            await db.execute(
                "UPDATE users SET plan = ?, updated_at = ? WHERE user_id = ?",
                (plan, datetime.now(), user_id)
            )
        await db.commit()

async def get_daily_usage(user_id: int) -> int:
    """Obtiene el uso diario del usuario"""
    today = date.today().isoformat()
    
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute(
            "SELECT count FROM daily_usage WHERE user_id = ? AND date = ?",
            (user_id, today)
        )
        result = await cursor.fetchone()
        return result[0] if result else 0

async def increment_usage(user_id: int):
    """Incrementa el contador de uso diario"""
    today = date.today().isoformat()
    
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            INSERT INTO daily_usage (user_id, date, count) VALUES (?, ?, 1)
            ON CONFLICT(user_id, date) DO UPDATE SET count = count + 1
        """, (user_id, today))
        await db.commit()

async def save_generation(user_id: int, content_type: str, prompt: str, result: str):
    """Guarda una generación en el historial"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute(
            "INSERT INTO generations (user_id, content_type, prompt, result) VALUES (?, ?, ?, ?)",
            (user_id, content_type, prompt, result)
        )
        await db.commit()

async def get_total_users() -> int:
    """Obtiene el total de usuarios"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM users")
        result = await cursor.fetchone()
        return result[0]

async def get_total_generations() -> int:
    """Obtiene el total de generaciones"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM generations")
        result = await cursor.fetchone()
        return result[0]

async def get_paying_users() -> int:
    """Obtiene usuarios de pago"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM users WHERE plan != 'free'")
        result = await cursor.fetchone()
        return result[0]
