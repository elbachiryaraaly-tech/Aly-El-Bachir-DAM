"""
ContentGPT Bot - Sistema de Referidos
Marketing viral automático
"""
import aiosqlite
import os
from datetime import datetime
import hashlib

DATABASE_PATH = os.getenv("DATABASE_PATH", "data/bot.db")

async def init_referral_tables():
    """Inicializa las tablas de referidos"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS referrals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                referrer_id INTEGER,
                referred_id INTEGER,
                bonus_given BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(referred_id)
            )
        """)
        
        await db.execute("""
            CREATE TABLE IF NOT EXISTS referral_bonuses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                bonus_generations INTEGER DEFAULT 0,
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        await db.commit()

def generate_referral_code(user_id: int) -> str:
    """Genera un código de referido único"""
    hash_input = f"contentgpt_{user_id}_secret"
    return hashlib.md5(hash_input.encode()).hexdigest()[:8]

def get_referral_link(user_id: int, bot_username: str) -> str:
    """Genera el link de referido"""
    code = generate_referral_code(user_id)
    return f"https://t.me/{bot_username}?start=ref_{code}"

async def get_user_id_from_code(code: str) -> int:
    """Obtiene el user_id desde un código de referido"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT user_id FROM users")
        users = await cursor.fetchall()
        
        for (user_id,) in users:
            if generate_referral_code(user_id) == code:
                return user_id
        return None

async def register_referral(referrer_id: int, referred_id: int) -> bool:
    """Registra un referido y da bonus a ambos"""
    if referrer_id == referred_id:
        return False
    
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Verificar si ya existe
        cursor = await db.execute(
            "SELECT id FROM referrals WHERE referred_id = ?",
            (referred_id,)
        )
        if await cursor.fetchone():
            return False
        
        # Registrar referido
        await db.execute(
            "INSERT INTO referrals (referrer_id, referred_id) VALUES (?, ?)",
            (referrer_id, referred_id)
        )
        
        # Dar bonus al que refiere: 10 generaciones extra
        await db.execute("""
            INSERT INTO referral_bonuses (user_id, bonus_generations, expires_at)
            VALUES (?, 10, datetime('now', '+30 days'))
        """, (referrer_id,))
        
        # Dar bonus al referido: 5 generaciones extra
        await db.execute("""
            INSERT INTO referral_bonuses (user_id, bonus_generations, expires_at)
            VALUES (?, 5, datetime('now', '+7 days'))
        """, (referred_id,))
        
        await db.commit()
        return True

async def get_bonus_generations(user_id: int) -> int:
    """Obtiene las generaciones bonus disponibles"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            SELECT SUM(bonus_generations) FROM referral_bonuses
            WHERE user_id = ? AND expires_at > datetime('now') AND bonus_generations > 0
        """, (user_id,))
        result = await cursor.fetchone()
        return result[0] if result[0] else 0

async def use_bonus_generation(user_id: int) -> bool:
    """Usa una generación bonus"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Encontrar el primer bonus con generaciones disponibles
        cursor = await db.execute("""
            SELECT id, bonus_generations FROM referral_bonuses
            WHERE user_id = ? AND expires_at > datetime('now') AND bonus_generations > 0
            ORDER BY expires_at ASC
            LIMIT 1
        """, (user_id,))
        bonus = await cursor.fetchone()
        
        if not bonus:
            return False
        
        # Decrementar
        await db.execute("""
            UPDATE referral_bonuses SET bonus_generations = bonus_generations - 1
            WHERE id = ?
        """, (bonus[0],))
        await db.commit()
        return True

async def get_referral_stats(user_id: int) -> dict:
    """Obtiene estadísticas de referidos de un usuario"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Total referidos
        cursor = await db.execute(
            "SELECT COUNT(*) FROM referrals WHERE referrer_id = ?",
            (user_id,)
        )
        total_referrals = (await cursor.fetchone())[0]
        
        # Bonus disponible
        bonus = await get_bonus_generations(user_id)
        
        return {
            "total_referrals": total_referrals,
            "bonus_generations": bonus,
            "earnings_per_referral": 10  # generaciones que gana por cada referido
        }
