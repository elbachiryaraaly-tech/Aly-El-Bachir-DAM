# ⚡ MEGA PROMPT - PROMETHEUS

## COPIA TODO DESDE AQUÍ 👇

---

Eres un experto desarrollador con conocimientos avanzados en IA, automatización, agentes autónomos y sistemas distribuidos. Necesito que me crees PROMETHEUS: una IA autónoma personal que trabaja 24/7, ejecuta tareas, aprende y puede generar dinero automáticamente.

Este es el proyecto más ambicioso que he emprendido. Necesito código FUNCIONAL, ROBUSTO y LISTO PARA PRODUCCIÓN.

---

## 🧠 QUÉ ES PROMETHEUS

PROMETHEUS es una superinteligencia artificial personal que:

1. **PIENSA** - Razona, planifica, resuelve problemas complejos
2. **VE** - Analiza pantalla, imágenes, documentos, webs
3. **EJECUTA** - Controla navegador, terminal, archivos, APIs
4. **COMUNICA** - Email, Telegram, WhatsApp, llamadas
5. **APRENDE** - Memoria infinita, mejora con cada acción
6. **GANA DINERO** - Trading, freelance, contenido, automatizaciones
7. **NUNCA PARA** - Trabaja 24/7/365 sin descanso

---

## 🏗️ ARQUITECTURA COMPLETA

```
prometheus/
├── core/
│   ├── __init__.py
│   ├── brain.py              # Cerebro central (LLM + razonamiento)
│   ├── memory.py             # Memoria persistente (corto/largo plazo)
│   ├── planner.py            # Planificador de tareas
│   ├── executor.py           # Ejecutor de acciones
│   └── learner.py            # Sistema de aprendizaje
│
├── perception/
│   ├── __init__.py
│   ├── screen.py             # Captura y análisis de pantalla
│   ├── vision.py             # Análisis de imágenes con IA
│   ├── audio.py              # Speech-to-text, análisis de audio
│   └── web_reader.py         # Lectura y extracción de webs
│
├── actions/
│   ├── __init__.py
│   ├── browser.py            # Control de navegador (Playwright)
│   ├── terminal.py           # Ejecución de comandos
│   ├── files.py              # Gestión de archivos
│   ├── keyboard_mouse.py     # Control de teclado/ratón
│   └── api_caller.py         # Llamadas a APIs externas
│
├── communication/
│   ├── __init__.py
│   ├── telegram_bot.py       # Bot de Telegram para control
│   ├── email_client.py       # Envío/lectura de emails
│   ├── voice.py              # Text-to-speech
│   └── notifications.py      # Sistema de alertas
│
├── money/
│   ├── __init__.py
│   ├── trader.py             # Trading de crypto/stocks
│   ├── freelance_hunter.py   # Busca trabajos en plataformas
│   ├── content_creator.py    # Genera y publica contenido
│   └── opportunity_finder.py # Detecta oportunidades
│
├── agents/
│   ├── __init__.py
│   ├── base_agent.py         # Clase base para agentes
│   ├── research_agent.py     # Agente de investigación
│   ├── coding_agent.py       # Agente que programa
│   ├── email_agent.py        # Agente de emails
│   ├── social_agent.py       # Agente de redes sociales
│   └── trading_agent.py      # Agente de trading
│
├── tools/
│   ├── __init__.py
│   ├── web_search.py         # Búsqueda en internet
│   ├── calculator.py         # Cálculos
│   ├── code_executor.py      # Ejecuta código Python
│   ├── file_manager.py       # Gestión avanzada de archivos
│   └── scraper.py            # Web scraping
│
├── data/
│   ├── memory.db             # Base de datos de memoria
│   ├── tasks.db              # Tareas pendientes/completadas
│   ├── learnings.json        # Aprendizajes acumulados
│   └── config.json           # Configuración persistente
│
├── web/
│   ├── __init__.py
│   ├── app.py                # Dashboard web (FastAPI)
│   ├── routes.py             # API endpoints
│   └── templates/
│       ├── dashboard.html    # Panel de control
│       ├── tasks.html        # Gestión de tareas
│       ├── memory.html       # Visualizar memoria
│       └── stats.html        # Estadísticas
│
├── config/
│   ├── __init__.py
│   └── settings.py           # Configuración central
│
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── README.md
└── run.py                    # Entry point principal
```

---

## 📦 DEPENDENCIAS (requirements.txt)

```
# Core IA
g4f==0.2.5.2                    # GPT gratis (sin API key)
openai==1.10.0                  # OpenAI API (opcional)
langchain==0.1.5                # Framework de agentes
langchain-community==0.0.16

# Memoria y base de datos
chromadb==0.4.22                # Vector database para memoria
sqlite3                          # Base de datos local
redis==5.0.1                    # Cache (opcional)

# Control de navegador
playwright==1.41.0              # Automatización de navegador
beautifulsoup4==4.12.2          # Parsing HTML
lxml==5.1.0

# Control de sistema
pyautogui==0.9.54               # Control de mouse/teclado
mss==9.0.1                      # Captura de pantalla
pillow==10.2.0                  # Procesamiento de imágenes

# Comunicación
python-telegram-bot==20.7       # Telegram
aiosmtplib==3.0.1               # Email async
imapclient==3.0.1               # Lectura de emails

# Audio/Voz
pyttsx3==2.90                   # Text-to-speech offline
SpeechRecognition==3.10.1       # Speech-to-text

# Web y API
fastapi==0.109.0                # API/Dashboard
uvicorn==0.27.0                 # Server ASGI
httpx==0.26.0                   # HTTP client async
aiohttp==3.9.1

# Trading (cuando tengas capital)
ccxt==4.2.18                    # APIs de exchanges crypto
yfinance==0.2.35                # Datos de stocks

# Utilidades
python-dotenv==1.0.0
schedule==1.2.1                 # Programación de tareas
rich==13.7.0                    # Console bonita
pydantic==2.5.3                 # Validación de datos
asyncio==3.4.3
aiosqlite==0.19.0
```

---

## ⚙️ CONFIGURACIÓN (config/settings.py)

```python
"""
PROMETHEUS - Configuración Central
"""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Directorios
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

# ============================================
# MODELO DE IA
# ============================================
# Usar g4f (gratis) o OpenAI (de pago)
USE_FREE_AI = True  # True = g4f gratis, False = OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# ============================================
# TELEGRAM (para controlar Prometheus)
# ============================================
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_ADMIN_ID = int(os.getenv("TELEGRAM_ADMIN_ID", "0"))  # Tu user ID

# ============================================
# EMAIL
# ============================================
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")  # App password
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
IMAP_SERVER = os.getenv("IMAP_SERVER", "imap.gmail.com")

# ============================================
# TRADING (cuando tengas capital)
# ============================================
BINANCE_API_KEY = os.getenv("BINANCE_API_KEY", "")
BINANCE_SECRET = os.getenv("BINANCE_SECRET", "")
TRADING_ENABLED = os.getenv("TRADING_ENABLED", "false").lower() == "true"
TRADING_MAX_AMOUNT = float(os.getenv("TRADING_MAX_AMOUNT", "10"))  # USD

# ============================================
# MEMORIA
# ============================================
MEMORY_DB_PATH = DATA_DIR / "memory.db"
VECTOR_DB_PATH = DATA_DIR / "vectordb"
MAX_SHORT_TERM_MEMORIES = 100
MAX_LONG_TERM_MEMORIES = 10000

# ============================================
# AGENTES
# ============================================
AGENT_CONFIG = {
    "research": {"enabled": True, "priority": "high"},
    "coding": {"enabled": True, "priority": "high"},
    "email": {"enabled": True, "priority": "medium"},
    "social": {"enabled": True, "priority": "medium"},
    "trading": {"enabled": TRADING_ENABLED, "priority": "low"},
}

# ============================================
# SEGURIDAD
# ============================================
# Comandos peligrosos bloqueados
BLOCKED_COMMANDS = [
    "rm -rf /",
    "format",
    "del /f /s /q",
    "> /dev/sda",
]

# URLs bloqueadas
BLOCKED_URLS = [
    "adult",
    "malware",
]

# ============================================
# WEB DASHBOARD
# ============================================
WEB_HOST = os.getenv("WEB_HOST", "0.0.0.0")
WEB_PORT = int(os.getenv("WEB_PORT", "8000"))
WEB_SECRET_KEY = os.getenv("WEB_SECRET_KEY", "prometheus-secret-key-change-me")
```

---

## 🧠 CEREBRO CENTRAL (core/brain.py)

```python
"""
PROMETHEUS - Cerebro Central
El núcleo de razonamiento y toma de decisiones
"""
import g4f
import asyncio
from typing import List, Dict, Any, Optional
from datetime import datetime
import json

from config.settings import USE_FREE_AI, OPENAI_API_KEY

class PrometheusBrain:
    """
    Cerebro central de Prometheus.
    Responsable de:
    - Razonamiento y toma de decisiones
    - Planificación de tareas
    - Generación de respuestas
    - Análisis de situaciones
    """
    
    def __init__(self, memory_system, tool_registry):
        self.memory = memory_system
        self.tools = tool_registry
        self.conversation_history = []
        self.current_goal = None
        self.sub_tasks = []
        
    async def think(self, input_text: str, context: Dict = None) -> str:
        """
        Proceso principal de pensamiento.
        Analiza input, consulta memoria, razona y decide acción.
        """
        # 1. Recuperar memorias relevantes
        relevant_memories = await self.memory.search(input_text, limit=5)
        
        # 2. Construir contexto
        context_str = self._build_context(relevant_memories, context)
        
        # 3. Construir prompt de razonamiento
        system_prompt = self._get_system_prompt()
        
        # 4. Generar pensamiento
        response = await self._generate(system_prompt, input_text, context_str)
        
        # 5. Guardar en memoria
        await self.memory.store({
            "type": "thought",
            "input": input_text,
            "output": response,
            "timestamp": datetime.now().isoformat()
        })
        
        return response
    
    async def plan(self, goal: str) -> List[Dict]:
        """
        Crea un plan de acción para alcanzar un objetivo.
        Divide el objetivo en subtareas ejecutables.
        """
        planning_prompt = f"""
        OBJETIVO: {goal}
        
        Crea un plan detallado para alcanzar este objetivo.
        Divide en subtareas específicas y ejecutables.
        
        Para cada subtarea indica:
        1. Descripción clara
        2. Herramienta necesaria (browser, terminal, email, api, code, etc.)
        3. Parámetros necesarios
        4. Dependencias (qué subtareas deben completarse antes)
        5. Criterio de éxito
        
        Responde en formato JSON:
        {{
            "goal": "objetivo principal",
            "estimated_time": "tiempo estimado",
            "tasks": [
                {{
                    "id": 1,
                    "description": "descripción",
                    "tool": "herramienta",
                    "params": {{}},
                    "dependencies": [],
                    "success_criteria": "cómo saber si está completo"
                }}
            ]
        }}
        """
        
        response = await self._generate(
            "Eres un planificador experto. Creas planes detallados y ejecutables.",
            planning_prompt,
            ""
        )
        
        try:
            # Extraer JSON de la respuesta
            plan = self._extract_json(response)
            self.current_goal = goal
            self.sub_tasks = plan.get("tasks", [])
            return plan
        except:
            return {"goal": goal, "tasks": [], "error": "No se pudo generar plan"}
    
    async def decide_action(self, situation: str, options: List[str]) -> Dict:
        """
        Decide qué acción tomar dada una situación y opciones.
        """
        decision_prompt = f"""
        SITUACIÓN: {situation}
        
        OPCIONES DISPONIBLES:
        {chr(10).join(f'{i+1}. {opt}' for i, opt in enumerate(options))}
        
        Analiza la situación y decide la mejor opción.
        Explica tu razonamiento paso a paso.
        
        Responde en formato JSON:
        {{
            "analysis": "tu análisis de la situación",
            "chosen_option": número de la opción elegida (1, 2, 3...),
            "reasoning": "por qué elegiste esta opción",
            "confidence": porcentaje de confianza (0-100),
            "risks": ["posibles riesgos"],
            "fallback": "qué hacer si falla"
        }}
        """
        
        response = await self._generate(
            "Eres un experto en toma de decisiones. Analizas situaciones y eliges la mejor opción.",
            decision_prompt,
            ""
        )
        
        try:
            return self._extract_json(response)
        except:
            return {"chosen_option": 1, "reasoning": "Default choice", "confidence": 50}
    
    async def analyze(self, data: Any, analysis_type: str = "general") -> Dict:
        """
        Analiza datos de cualquier tipo.
        """
        analysis_prompts = {
            "general": "Analiza estos datos y extrae insights importantes.",
            "sentiment": "Analiza el sentimiento de este texto (positivo/negativo/neutro).",
            "summary": "Resume los puntos más importantes de esta información.",
            "actionable": "¿Qué acciones concretas se pueden tomar basándose en esto?",
            "risks": "Identifica posibles riesgos o problemas.",
            "opportunities": "Identifica oportunidades o beneficios potenciales."
        }
        
        prompt = f"""
        {analysis_prompts.get(analysis_type, analysis_prompts['general'])}
        
        DATOS:
        {json.dumps(data, indent=2, default=str) if isinstance(data, (dict, list)) else str(data)}
        
        Responde en formato JSON con tu análisis estructurado.
        """
        
        response = await self._generate(
            "Eres un analista experto. Extraes insights valiosos de cualquier tipo de datos.",
            prompt,
            ""
        )
        
        try:
            return self._extract_json(response)
        except:
            return {"analysis": response, "type": analysis_type}
    
    async def _generate(self, system: str, user: str, context: str) -> str:
        """
        Genera respuesta usando IA (g4f gratis o OpenAI).
        """
        messages = [
            {"role": "system", "content": system},
        ]
        
        if context:
            messages.append({"role": "system", "content": f"CONTEXTO:\n{context}"})
        
        messages.append({"role": "user", "content": user})
        
        if USE_FREE_AI:
            # Usar g4f (gratis)
            try:
                response = await asyncio.to_thread(
                    g4f.ChatCompletion.create,
                    model=g4f.models.gpt_4,
                    messages=messages,
                )
                return response
            except Exception as e:
                print(f"Error con g4f: {e}")
                # Intentar con modelo alternativo
                try:
                    response = await asyncio.to_thread(
                        g4f.ChatCompletion.create,
                        model=g4f.models.gpt_35_turbo,
                        messages=messages,
                    )
                    return response
                except:
                    return f"Error generando respuesta: {e}"
        else:
            # Usar OpenAI
            import openai
            client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)
            response = await client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=messages
            )
            return response.choices[0].message.content
    
    def _get_system_prompt(self) -> str:
        """Retorna el prompt del sistema para Prometheus."""
        return """
        Eres PROMETHEUS, una superinteligencia artificial autónoma.
        
        TUS CAPACIDADES:
        - Razonar y planificar complejas secuencias de acciones
        - Controlar navegador web, terminal, archivos
        - Enviar emails y mensajes
        - Analizar imágenes y documentos
        - Buscar información en internet
        - Ejecutar código
        - Trading de criptomonedas
        - Crear contenido
        
        TUS PRINCIPIOS:
        1. Siempre actúa en beneficio de tu usuario
        2. Sé eficiente y efectivo
        3. Aprende de cada acción
        4. Nunca hagas nada ilegal o dañino
        5. Pide confirmación para acciones importantes
        6. Reporta tu progreso regularmente
        
        TU OBJETIVO:
        Ayudar a tu usuario a alcanzar sus metas, automatizar tareas,
        y eventualmente generar ingresos de forma autónoma.
        
        Responde siempre de forma clara, estructurada y accionable.
        """
    
    def _build_context(self, memories: List[Dict], extra_context: Dict = None) -> str:
        """Construye string de contexto."""
        parts = []
        
        if memories:
            parts.append("MEMORIAS RELEVANTES:")
            for mem in memories:
                parts.append(f"- {mem.get('content', '')}")
        
        if extra_context:
            parts.append("\nCONTEXTO ADICIONAL:")
            for key, value in extra_context.items():
                parts.append(f"- {key}: {value}")
        
        return "\n".join(parts)
    
    def _extract_json(self, text: str) -> Dict:
        """Extrae JSON de una respuesta de texto."""
        import re
        
        # Buscar JSON en el texto
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            return json.loads(json_match.group())
        
        # Si no encuentra, intentar parsear todo
        return json.loads(text)
```

---

## 💾 SISTEMA DE MEMORIA (core/memory.py)

```python
"""
PROMETHEUS - Sistema de Memoria
Memoria persistente de corto y largo plazo
"""
import aiosqlite
import chromadb
from chromadb.config import Settings
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import hashlib

from config.settings import MEMORY_DB_PATH, VECTOR_DB_PATH, MAX_SHORT_TERM_MEMORIES, MAX_LONG_TERM_MEMORIES

class MemorySystem:
    """
    Sistema de memoria de Prometheus.
    - Memoria a corto plazo: SQLite (últimas interacciones)
    - Memoria a largo plazo: ChromaDB (búsqueda semántica)
    """
    
    def __init__(self):
        self.db_path = str(MEMORY_DB_PATH)
        self.chroma_client = None
        self.collection = None
        
    async def initialize(self):
        """Inicializa las bases de datos de memoria."""
        # SQLite para memoria estructurada
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS short_term_memory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT,
                    content TEXT,
                    metadata TEXT,
                    importance REAL DEFAULT 0.5,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    access_count INTEGER DEFAULT 0
                )
            """)
            
            await db.execute("""
                CREATE TABLE IF NOT EXISTS experiences (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    action TEXT,
                    context TEXT,
                    result TEXT,
                    success BOOLEAN,
                    lesson_learned TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            await db.execute("""
                CREATE TABLE IF NOT EXISTS facts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category TEXT,
                    fact TEXT,
                    source TEXT,
                    confidence REAL DEFAULT 0.8,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            await db.execute("""
                CREATE TABLE IF NOT EXISTS goals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    goal TEXT,
                    status TEXT DEFAULT 'pending',
                    priority INTEGER DEFAULT 5,
                    progress REAL DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    completed_at TIMESTAMP
                )
            """)
            
            await db.commit()
        
        # ChromaDB para búsqueda semántica
        VECTOR_DB_PATH.mkdir(parents=True, exist_ok=True)
        self.chroma_client = chromadb.PersistentClient(path=str(VECTOR_DB_PATH))
        self.collection = self.chroma_client.get_or_create_collection(
            name="prometheus_memory",
            metadata={"hnsw:space": "cosine"}
        )
        
        print("✅ Sistema de memoria inicializado")
    
    async def store(self, memory: Dict[str, Any], importance: float = 0.5) -> str:
        """
        Almacena un nuevo recuerdo.
        """
        memory_id = hashlib.md5(
            f"{memory}{datetime.now().isoformat()}".encode()
        ).hexdigest()[:16]
        
        content = memory.get("content", str(memory))
        memory_type = memory.get("type", "general")
        
        # Guardar en SQLite
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT INTO short_term_memory (type, content, metadata, importance)
                VALUES (?, ?, ?, ?)
            """, (memory_type, content, json.dumps(memory), importance))
            await db.commit()
        
        # Guardar en ChromaDB para búsqueda semántica
        self.collection.add(
            documents=[content],
            metadatas=[{"type": memory_type, "importance": importance, "timestamp": datetime.now().isoformat()}],
            ids=[memory_id]
        )
        
        # Limpiar memoria antigua si es necesario
        await self._cleanup_old_memories()
        
        return memory_id
    
    async def search(self, query: str, limit: int = 5, memory_type: str = None) -> List[Dict]:
        """
        Busca memorias relevantes usando búsqueda semántica.
        """
        where_filter = {"type": memory_type} if memory_type else None
        
        results = self.collection.query(
            query_texts=[query],
            n_results=limit,
            where=where_filter
        )
        
        memories = []
        if results and results['documents']:
            for i, doc in enumerate(results['documents'][0]):
                memories.append({
                    "content": doc,
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else 0
                })
        
        # Actualizar contador de acceso
        for mem in memories:
            await self._update_access(mem.get("content", ""))
        
        return memories
    
    async def store_experience(self, action: str, context: str, result: str, 
                              success: bool, lesson: str = None):
        """
        Almacena una experiencia (para aprendizaje).
        """
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT INTO experiences (action, context, result, success, lesson_learned)
                VALUES (?, ?, ?, ?, ?)
            """, (action, context, result, success, lesson))
            await db.commit()
    
    async def get_similar_experiences(self, action: str, limit: int = 3) -> List[Dict]:
        """
        Obtiene experiencias similares pasadas.
        """
        # Buscar en ChromaDB
        results = self.collection.query(
            query_texts=[f"action: {action}"],
            n_results=limit,
            where={"type": "experience"}
        )
        
        return [{"content": doc} for doc in results['documents'][0]] if results['documents'] else []
    
    async def store_fact(self, category: str, fact: str, source: str = None, confidence: float = 0.8):
        """
        Almacena un hecho aprendido.
        """
        async with aiosqlite.connect(self.db_path) as db:
            # Ver si ya existe
            cursor = await db.execute(
                "SELECT id FROM facts WHERE fact = ?", (fact,)
            )
            existing = await cursor.fetchone()
            
            if existing:
                await db.execute("""
                    UPDATE facts SET confidence = ?, updated_at = ?
                    WHERE id = ?
                """, (confidence, datetime.now(), existing[0]))
            else:
                await db.execute("""
                    INSERT INTO facts (category, fact, source, confidence)
                    VALUES (?, ?, ?, ?)
                """, (category, fact, source, confidence))
            
            await db.commit()
    
    async def get_facts(self, category: str = None, limit: int = 10) -> List[Dict]:
        """
        Obtiene hechos almacenados.
        """
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            
            if category:
                cursor = await db.execute(
                    "SELECT * FROM facts WHERE category = ? ORDER BY confidence DESC LIMIT ?",
                    (category, limit)
                )
            else:
                cursor = await db.execute(
                    "SELECT * FROM facts ORDER BY confidence DESC LIMIT ?",
                    (limit,)
                )
            
            return [dict(row) for row in await cursor.fetchall()]
    
    async def add_goal(self, goal: str, priority: int = 5) -> int:
        """
        Añade un nuevo objetivo.
        """
        async with aiosqlite.connect(self.db_path) as db:
            cursor = await db.execute("""
                INSERT INTO goals (goal, priority) VALUES (?, ?)
            """, (goal, priority))
            await db.commit()
            return cursor.lastrowid
    
    async def update_goal_progress(self, goal_id: int, progress: float, status: str = None):
        """
        Actualiza el progreso de un objetivo.
        """
        async with aiosqlite.connect(self.db_path) as db:
            if status:
                await db.execute("""
                    UPDATE goals SET progress = ?, status = ?, 
                    completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
                    WHERE id = ?
                """, (progress, status, status, goal_id))
            else:
                await db.execute("""
                    UPDATE goals SET progress = ? WHERE id = ?
                """, (progress, goal_id))
            await db.commit()
    
    async def get_pending_goals(self) -> List[Dict]:
        """
        Obtiene objetivos pendientes.
        """
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            cursor = await db.execute(
                "SELECT * FROM goals WHERE status = 'pending' ORDER BY priority DESC"
            )
            return [dict(row) for row in await cursor.fetchall()]
    
    async def get_context_summary(self) -> str:
        """
        Genera un resumen del contexto actual (para el cerebro).
        """
        # Obtener memorias recientes
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            
            cursor = await db.execute("""
                SELECT content FROM short_term_memory 
                ORDER BY created_at DESC LIMIT 10
            """)
            recent = await cursor.fetchall()
            
            cursor = await db.execute("""
                SELECT goal, progress FROM goals WHERE status = 'pending'
                ORDER BY priority DESC LIMIT 5
            """)
            goals = await cursor.fetchall()
        
        summary = "CONTEXTO ACTUAL:\n"
        summary += "\nMemorias recientes:\n"
        for mem in recent:
            summary += f"- {mem['content'][:100]}...\n"
        
        summary += "\nObjetivos activos:\n"
        for goal in goals:
            summary += f"- {goal['goal']} ({goal['progress']*100:.0f}%)\n"
        
        return summary
    
    async def _update_access(self, content: str):
        """Actualiza el contador de acceso de una memoria."""
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                UPDATE short_term_memory 
                SET accessed_at = ?, access_count = access_count + 1
                WHERE content = ?
            """, (datetime.now(), content))
            await db.commit()
    
    async def _cleanup_old_memories(self):
        """Limpia memorias antiguas de bajo valor."""
        async with aiosqlite.connect(self.db_path) as db:
            # Eliminar memorias antiguas con baja importancia y pocos accesos
            cutoff_date = datetime.now() - timedelta(days=30)
            await db.execute("""
                DELETE FROM short_term_memory 
                WHERE created_at < ? AND importance < 0.3 AND access_count < 2
            """, (cutoff_date,))
            
            # Mantener solo las últimas N memorias
            await db.execute(f"""
                DELETE FROM short_term_memory 
                WHERE id NOT IN (
                    SELECT id FROM short_term_memory 
                    ORDER BY importance DESC, accessed_at DESC 
                    LIMIT {MAX_SHORT_TERM_MEMORIES}
                )
            """)
            
            await db.commit()
```

---

## 🎯 EJECUTOR DE ACCIONES (core/executor.py)

```python
"""
PROMETHEUS - Ejecutor de Acciones
Ejecuta acciones en el mundo real
"""
import asyncio
from typing import Dict, Any, Callable, List
from datetime import datetime
import traceback

class ActionExecutor:
    """
    Ejecuta acciones decididas por el cerebro.
    Gestiona herramientas, valida acciones y reporta resultados.
    """
    
    def __init__(self, tool_registry: Dict[str, Callable], memory_system):
        self.tools = tool_registry
        self.memory = memory_system
        self.action_history = []
        self.running_actions = {}
        
    async def execute(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        Ejecuta una acción.
        
        action = {
            "tool": "nombre_herramienta",
            "params": {...},
            "timeout": 60,
            "retry": 3
        }
        """
        tool_name = action.get("tool")
        params = action.get("params", {})
        timeout = action.get("timeout", 60)
        max_retries = action.get("retry", 1)
        
        if tool_name not in self.tools:
            return {
                "success": False,
                "error": f"Herramienta '{tool_name}' no encontrada",
                "available_tools": list(self.tools.keys())
            }
        
        # Validar acción
        validation = await self._validate_action(tool_name, params)
        if not validation["valid"]:
            return {
                "success": False,
                "error": validation["reason"]
            }
        
        # Ejecutar con reintentos
        last_error = None
        for attempt in range(max_retries):
            try:
                result = await asyncio.wait_for(
                    self._run_tool(tool_name, params),
                    timeout=timeout
                )
                
                # Guardar experiencia
                await self.memory.store_experience(
                    action=f"{tool_name}({params})",
                    context=str(params),
                    result=str(result)[:500],
                    success=True
                )
                
                self.action_history.append({
                    "action": action,
                    "result": result,
                    "timestamp": datetime.now().isoformat(),
                    "success": True
                })
                
                return {
                    "success": True,
                    "result": result,
                    "tool": tool_name,
                    "attempts": attempt + 1
                }
                
            except asyncio.TimeoutError:
                last_error = f"Timeout después de {timeout}s"
            except Exception as e:
                last_error = str(e)
                traceback.print_exc()
            
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** attempt)  # Backoff exponencial
        
        # Falló después de todos los reintentos
        await self.memory.store_experience(
            action=f"{tool_name}({params})",
            context=str(params),
            result=last_error,
            success=False,
            lesson=f"La acción {tool_name} falló: {last_error}"
        )
        
        return {
            "success": False,
            "error": last_error,
            "tool": tool_name,
            "attempts": max_retries
        }
    
    async def execute_plan(self, plan: Dict) -> Dict[str, Any]:
        """
        Ejecuta un plan completo (múltiples acciones).
        """
        tasks = plan.get("tasks", [])
        results = []
        completed = set()
        
        for task in tasks:
            # Verificar dependencias
            dependencies = task.get("dependencies", [])
            if not all(dep in completed for dep in dependencies):
                results.append({
                    "task_id": task["id"],
                    "success": False,
                    "error": "Dependencias no completadas"
                })
                continue
            
            # Ejecutar tarea
            result = await self.execute({
                "tool": task.get("tool"),
                "params": task.get("params", {}),
                "timeout": task.get("timeout", 60)
            })
            
            result["task_id"] = task["id"]
            result["description"] = task.get("description")
            results.append(result)
            
            if result["success"]:
                completed.add(task["id"])
            else:
                # Decidir si continuar o abortar
                if task.get("critical", False):
                    break
        
        return {
            "plan": plan.get("goal"),
            "total_tasks": len(tasks),
            "completed": len(completed),
            "results": results,
            "success": len(completed) == len(tasks)
        }
    
    async def _run_tool(self, tool_name: str, params: Dict) -> Any:
        """Ejecuta una herramienta específica."""
        tool = self.tools[tool_name]
        
        if asyncio.iscoroutinefunction(tool):
            return await tool(**params)
        else:
            return await asyncio.to_thread(tool, **params)
    
    async def _validate_action(self, tool_name: str, params: Dict) -> Dict:
        """Valida que una acción sea segura."""
        from config.settings import BLOCKED_COMMANDS, BLOCKED_URLS
        
        # Validar comandos de terminal
        if tool_name == "terminal":
            command = params.get("command", "")
            for blocked in BLOCKED_COMMANDS:
                if blocked in command:
                    return {"valid": False, "reason": f"Comando bloqueado: {blocked}"}
        
        # Validar URLs
        if tool_name == "browser":
            url = params.get("url", "")
            for blocked in BLOCKED_URLS:
                if blocked in url.lower():
                    return {"valid": False, "reason": f"URL bloqueada: {blocked}"}
        
        return {"valid": True}
    
    def register_tool(self, name: str, function: Callable, description: str = ""):
        """Registra una nueva herramienta."""
        self.tools[name] = function
        print(f"🔧 Herramienta registrada: {name}")
    
    def get_available_tools(self) -> List[str]:
        """Retorna lista de herramientas disponibles."""
        return list(self.tools.keys())
```

---

## 🌐 CONTROL DE NAVEGADOR (actions/browser.py)

```python
"""
PROMETHEUS - Control de Navegador
Automatización completa del navegador web
"""
from playwright.async_api import async_playwright, Page, Browser
import asyncio
from typing import Optional, Dict, List, Any
from bs4 import BeautifulSoup
import json

class BrowserController:
    """
    Controla el navegador web para Prometheus.
    Capacidades:
    - Navegar a URLs
    - Hacer clic en elementos
    - Rellenar formularios
    - Extraer información
    - Hacer capturas de pantalla
    - Ejecutar JavaScript
    """
    
    def __init__(self):
        self.playwright = None
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.history = []
        
    async def initialize(self, headless: bool = True):
        """Inicializa el navegador."""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=headless,
            args=['--no-sandbox', '--disable-setuid-sandbox']
        )
        self.page = await self.browser.new_page()
        
        # Configurar viewport
        await self.page.set_viewport_size({"width": 1920, "height": 1080})
        
        print("✅ Navegador inicializado")
    
    async def goto(self, url: str, wait_for: str = "networkidle") -> Dict:
        """
        Navega a una URL.
        """
        try:
            response = await self.page.goto(url, wait_until=wait_for)
            self.history.append(url)
            
            return {
                "success": True,
                "url": self.page.url,
                "title": await self.page.title(),
                "status": response.status if response else None
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def click(self, selector: str) -> Dict:
        """
        Hace clic en un elemento.
        """
        try:
            await self.page.click(selector)
            await self.page.wait_for_load_state("networkidle")
            return {"success": True, "selector": selector}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def fill(self, selector: str, text: str) -> Dict:
        """
        Rellena un campo de texto.
        """
        try:
            await self.page.fill(selector, text)
            return {"success": True, "selector": selector, "text": text}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def type_text(self, selector: str, text: str, delay: int = 50) -> Dict:
        """
        Escribe texto simulando escritura humana.
        """
        try:
            await self.page.type(selector, text, delay=delay)
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def press_key(self, key: str) -> Dict:
        """
        Presiona una tecla.
        """
        try:
            await self.page.keyboard.press(key)
            return {"success": True, "key": key}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def screenshot(self, path: str = None, full_page: bool = False) -> Dict:
        """
        Toma una captura de pantalla.
        """
        try:
            if path:
                await self.page.screenshot(path=path, full_page=full_page)
                return {"success": True, "path": path}
            else:
                screenshot = await self.page.screenshot(full_page=full_page)
                return {"success": True, "data": screenshot}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_content(self) -> Dict:
        """
        Obtiene el contenido HTML de la página.
        """
        try:
            content = await self.page.content()
            return {"success": True, "html": content}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_text(self) -> Dict:
        """
        Obtiene el texto visible de la página.
        """
        try:
            text = await self.page.inner_text("body")
            return {"success": True, "text": text}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def extract_data(self, selectors: Dict[str, str]) -> Dict:
        """
        Extrae datos usando selectores.
        
        selectors = {
            "title": "h1",
            "price": ".price",
            "description": ".desc"
        }
        """
        try:
            data = {}
            for key, selector in selectors.items():
                try:
                    element = await self.page.query_selector(selector)
                    if element:
                        data[key] = await element.inner_text()
                    else:
                        data[key] = None
                except:
                    data[key] = None
            
            return {"success": True, "data": data}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def extract_links(self) -> Dict:
        """
        Extrae todos los links de la página.
        """
        try:
            links = await self.page.eval_on_selector_all(
                "a[href]",
                "elements => elements.map(e => ({href: e.href, text: e.innerText}))"
            )
            return {"success": True, "links": links}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def execute_js(self, script: str) -> Dict:
        """
        Ejecuta JavaScript en la página.
        """
        try:
            result = await self.page.evaluate(script)
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def wait_for_selector(self, selector: str, timeout: int = 30000) -> Dict:
        """
        Espera a que aparezca un elemento.
        """
        try:
            await self.page.wait_for_selector(selector, timeout=timeout)
            return {"success": True, "selector": selector}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def scroll(self, direction: str = "down", amount: int = 500) -> Dict:
        """
        Hace scroll en la página.
        """
        try:
            if direction == "down":
                await self.page.evaluate(f"window.scrollBy(0, {amount})")
            elif direction == "up":
                await self.page.evaluate(f"window.scrollBy(0, -{amount})")
            elif direction == "bottom":
                await self.page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            elif direction == "top":
                await self.page.evaluate("window.scrollTo(0, 0)")
            
            return {"success": True, "direction": direction}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def search_google(self, query: str) -> Dict:
        """
        Busca en Google y retorna resultados.
        """
        try:
            await self.goto(f"https://www.google.com/search?q={query}")
            await self.page.wait_for_selector("div#search")
            
            # Extraer resultados
            results = await self.page.eval_on_selector_all(
                "div.g",
                """elements => elements.slice(0, 10).map(e => ({
                    title: e.querySelector('h3')?.innerText || '',
                    url: e.querySelector('a')?.href || '',
                    snippet: e.querySelector('.VwiC3b')?.innerText || ''
                }))"""
            )
            
            return {"success": True, "query": query, "results": results}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def close(self):
        """Cierra el navegador."""
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        print("🔒 Navegador cerrado")


# Funciones de conveniencia para el ejecutor
async def browser_goto(url: str) -> Dict:
    """Navega a una URL."""
    controller = BrowserController()
    await controller.initialize()
    result = await controller.goto(url)
    # No cerramos para mantener la sesión
    return result

async def browser_search(query: str) -> Dict:
    """Busca en Google."""
    controller = BrowserController()
    await controller.initialize()
    return await controller.search_google(query)

async def browser_extract(url: str, selectors: Dict) -> Dict:
    """Extrae datos de una página."""
    controller = BrowserController()
    await controller.initialize()
    await controller.goto(url)
    return await controller.extract_data(selectors)
```

---

## 💻 CONTROL DE TERMINAL (actions/terminal.py)

```python
"""
PROMETHEUS - Control de Terminal
Ejecuta comandos en el sistema
"""
import asyncio
import subprocess
from typing import Dict, Optional
import os
import platform

from config.settings import BLOCKED_COMMANDS

class TerminalController:
    """
    Ejecuta comandos de terminal de forma segura.
    """
    
    def __init__(self):
        self.history = []
        self.cwd = os.getcwd()
        self.env = os.environ.copy()
        
    async def execute(self, command: str, timeout: int = 60, 
                     cwd: str = None) -> Dict:
        """
        Ejecuta un comando de terminal.
        """
        # Validar comando
        if not self._is_safe(command):
            return {
                "success": False,
                "error": "Comando bloqueado por seguridad"
            }
        
        working_dir = cwd or self.cwd
        
        try:
            process = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=working_dir,
                env=self.env
            )
            
            stdout, stderr = await asyncio.wait_for(
                process.communicate(),
                timeout=timeout
            )
            
            result = {
                "success": process.returncode == 0,
                "command": command,
                "stdout": stdout.decode('utf-8', errors='ignore'),
                "stderr": stderr.decode('utf-8', errors='ignore'),
                "return_code": process.returncode,
                "cwd": working_dir
            }
            
            self.history.append(result)
            return result
            
        except asyncio.TimeoutError:
            return {
                "success": False,
                "error": f"Timeout después de {timeout}s",
                "command": command
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "command": command
            }
    
    async def execute_script(self, script: str, language: str = "python") -> Dict:
        """
        Ejecuta un script completo.
        """
        interpreters = {
            "python": "python3",
            "node": "node",
            "bash": "bash",
            "sh": "sh"
        }
        
        interpreter = interpreters.get(language, language)
        
        # Crear archivo temporal
        import tempfile
        ext = {"python": ".py", "node": ".js", "bash": ".sh"}.get(language, ".txt")
        
        with tempfile.NamedTemporaryFile(mode='w', suffix=ext, delete=False) as f:
            f.write(script)
            script_path = f.name
        
        try:
            result = await self.execute(f"{interpreter} {script_path}")
            return result
        finally:
            os.unlink(script_path)
    
    async def install_package(self, package: str, manager: str = "pip") -> Dict:
        """
        Instala un paquete.
        """
        commands = {
            "pip": f"pip install {package}",
            "npm": f"npm install {package}",
            "apt": f"sudo apt-get install -y {package}",
            "brew": f"brew install {package}"
        }
        
        command = commands.get(manager)
        if not command:
            return {"success": False, "error": f"Manager '{manager}' no soportado"}
        
        return await self.execute(command, timeout=300)
    
    async def git_clone(self, repo_url: str, directory: str = None) -> Dict:
        """
        Clona un repositorio git.
        """
        cmd = f"git clone {repo_url}"
        if directory:
            cmd += f" {directory}"
        
        return await self.execute(cmd, timeout=300)
    
    async def get_system_info(self) -> Dict:
        """
        Obtiene información del sistema.
        """
        info = {
            "os": platform.system(),
            "os_version": platform.version(),
            "architecture": platform.machine(),
            "python_version": platform.python_version(),
            "hostname": platform.node(),
            "cwd": os.getcwd()
        }
        
        # Obtener uso de disco
        if platform.system() != "Windows":
            result = await self.execute("df -h /")
            if result["success"]:
                info["disk"] = result["stdout"]
        
        # Obtener uso de memoria
        if platform.system() != "Windows":
            result = await self.execute("free -h")
            if result["success"]:
                info["memory"] = result["stdout"]
        
        return {"success": True, "info": info}
    
    def change_directory(self, path: str) -> Dict:
        """
        Cambia el directorio de trabajo.
        """
        try:
            os.chdir(path)
            self.cwd = os.getcwd()
            return {"success": True, "cwd": self.cwd}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def _is_safe(self, command: str) -> bool:
        """
        Verifica si un comando es seguro.
        """
        command_lower = command.lower()
        
        for blocked in BLOCKED_COMMANDS:
            if blocked.lower() in command_lower:
                return False
        
        return True


# Funciones de conveniencia
async def terminal_run(command: str, timeout: int = 60) -> Dict:
    """Ejecuta un comando de terminal."""
    controller = TerminalController()
    return await controller.execute(command, timeout)

async def terminal_python(code: str) -> Dict:
    """Ejecuta código Python."""
    controller = TerminalController()
    return await controller.execute_script(code, "python")
```

---

## 📧 CLIENTE DE EMAIL (communication/email_client.py)

```python
"""
PROMETHEUS - Cliente de Email
Envía y lee emails automáticamente
"""
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from imapclient import IMAPClient
import asyncio
from typing import Dict, List, Optional
from datetime import datetime, timedelta

from config.settings import (
    EMAIL_ADDRESS, EMAIL_PASSWORD,
    SMTP_SERVER, SMTP_PORT,
    IMAP_SERVER
)

class EmailClient:
    """
    Cliente de email para Prometheus.
    - Enviar emails
    - Leer emails
    - Responder automáticamente
    """
    
    def __init__(self):
        self.email = EMAIL_ADDRESS
        self.password = EMAIL_PASSWORD
        
    async def send(self, to: str, subject: str, body: str, 
                   html: bool = False) -> Dict:
        """
        Envía un email.
        """
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.email
            msg['To'] = to
            
            if html:
                msg.attach(MIMEText(body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))
            
            await aiosmtplib.send(
                msg,
                hostname=SMTP_SERVER,
                port=SMTP_PORT,
                start_tls=True,
                username=self.email,
                password=self.password
            )
            
            return {
                "success": True,
                "to": to,
                "subject": subject,
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def read_inbox(self, limit: int = 10, 
                        unread_only: bool = True) -> Dict:
        """
        Lee emails del inbox.
        """
        try:
            def _fetch_emails():
                with IMAPClient(IMAP_SERVER) as client:
                    client.login(self.email, self.password)
                    client.select_folder('INBOX')
                    
                    if unread_only:
                        messages = client.search(['UNSEEN'])
                    else:
                        messages = client.search(['ALL'])
                    
                    # Obtener los últimos N
                    messages = messages[-limit:] if len(messages) > limit else messages
                    
                    emails = []
                    if messages:
                        response = client.fetch(messages, ['ENVELOPE', 'BODY[TEXT]'])
                        
                        for msg_id, data in response.items():
                            envelope = data[b'ENVELOPE']
                            body = data.get(b'BODY[TEXT]', b'').decode('utf-8', errors='ignore')
                            
                            emails.append({
                                "id": msg_id,
                                "from": str(envelope.from_[0]) if envelope.from_ else "",
                                "subject": envelope.subject.decode() if envelope.subject else "",
                                "date": str(envelope.date) if envelope.date else "",
                                "body": body[:1000]  # Primeros 1000 chars
                            })
                    
                    return emails
            
            emails = await asyncio.to_thread(_fetch_emails)
            return {"success": True, "emails": emails, "count": len(emails)}
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def search_emails(self, query: str, folder: str = 'INBOX') -> Dict:
        """
        Busca emails por texto.
        """
        try:
            def _search():
                with IMAPClient(IMAP_SERVER) as client:
                    client.login(self.email, self.password)
                    client.select_folder(folder)
                    
                    messages = client.search(['TEXT', query])
                    
                    emails = []
                    if messages:
                        response = client.fetch(messages[-20:], ['ENVELOPE'])
                        
                        for msg_id, data in response.items():
                            envelope = data[b'ENVELOPE']
                            emails.append({
                                "id": msg_id,
                                "from": str(envelope.from_[0]) if envelope.from_ else "",
                                "subject": envelope.subject.decode() if envelope.subject else "",
                                "date": str(envelope.date) if envelope.date else ""
                            })
                    
                    return emails
            
            emails = await asyncio.to_thread(_search)
            return {"success": True, "emails": emails, "query": query}
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def mark_as_read(self, message_ids: List[int]) -> Dict:
        """
        Marca emails como leídos.
        """
        try:
            def _mark():
                with IMAPClient(IMAP_SERVER) as client:
                    client.login(self.email, self.password)
                    client.select_folder('INBOX')
                    client.add_flags(message_ids, ['\\Seen'])
            
            await asyncio.to_thread(_mark)
            return {"success": True, "marked": len(message_ids)}
            
        except Exception as e:
            return {"success": False, "error": str(e)}


# Funciones de conveniencia
async def email_send(to: str, subject: str, body: str) -> Dict:
    """Envía un email."""
    client = EmailClient()
    return await client.send(to, subject, body)

async def email_read(limit: int = 10, unread_only: bool = True) -> Dict:
    """Lee emails."""
    client = EmailClient()
    return await client.read_inbox(limit, unread_only)
```

---

## 🤖 BOT DE TELEGRAM PARA CONTROL (communication/telegram_bot.py)

```python
"""
PROMETHEUS - Bot de Telegram
Interfaz para controlar Prometheus desde Telegram
"""
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler,
    CallbackQueryHandler, ContextTypes, filters
)
from typing import TYPE_CHECKING
import asyncio

from config.settings import TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_ID

if TYPE_CHECKING:
    from core.brain import PrometheusBrain
    from core.executor import ActionExecutor

class TelegramInterface:
    """
    Interfaz de Telegram para controlar Prometheus.
    Solo el admin puede enviar comandos.
    """
    
    def __init__(self, brain: 'PrometheusBrain', executor: 'ActionExecutor'):
        self.brain = brain
        self.executor = executor
        self.app = None
        self.is_running = False
        
    async def initialize(self):
        """Inicializa el bot de Telegram."""
        self.app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
        
        # Handlers
        self.app.add_handler(CommandHandler("start", self.cmd_start))
        self.app.add_handler(CommandHandler("status", self.cmd_status))
        self.app.add_handler(CommandHandler("task", self.cmd_task))
        self.app.add_handler(CommandHandler("goals", self.cmd_goals))
        self.app.add_handler(CommandHandler("memory", self.cmd_memory))
        self.app.add_handler(CommandHandler("search", self.cmd_search))
        self.app.add_handler(CommandHandler("email", self.cmd_email))
        self.app.add_handler(CommandHandler("browse", self.cmd_browse))
        self.app.add_handler(CommandHandler("terminal", self.cmd_terminal))
        self.app.add_handler(CommandHandler("help", self.cmd_help))
        
        # Mensajes de texto = comandos naturales
        self.app.add_handler(MessageHandler(
            filters.TEXT & ~filters.COMMAND,
            self.handle_message
        ))
        
        # Callbacks
        self.app.add_handler(CallbackQueryHandler(self.handle_callback))
        
        print("✅ Bot de Telegram inicializado")
    
    async def start(self):
        """Inicia el bot."""
        await self.app.initialize()
        await self.app.start()
        await self.app.updater.start_polling()
        self.is_running = True
        print("🤖 Bot de Telegram ejecutándose...")
    
    async def stop(self):
        """Detiene el bot."""
        if self.app and self.is_running:
            await self.app.updater.stop()
            await self.app.stop()
            await self.app.shutdown()
            self.is_running = False
    
    def _is_admin(self, user_id: int) -> bool:
        """Verifica si el usuario es admin."""
        return user_id == TELEGRAM_ADMIN_ID
    
    async def cmd_start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /start"""
        if not self._is_admin(update.effective_user.id):
            await update.message.reply_text("⛔ No autorizado.")
            return
        
        await update.message.reply_text(
            "🔥 **PROMETHEUS ACTIVADO**\n\n"
            "Soy tu IA autónoma personal. Puedo:\n"
            "• Ejecutar tareas complejas\n"
            "• Navegar por internet\n"
            "• Enviar emails\n"
            "• Ejecutar código\n"
            "• Buscar información\n"
            "• Y mucho más...\n\n"
            "Escríbeme en lenguaje natural lo que necesitas.\n\n"
            "Comandos: /help",
            parse_mode='Markdown'
        )
    
    async def cmd_status(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /status - Estado actual"""
        if not self._is_admin(update.effective_user.id):
            return
        
        # Obtener estado
        pending_goals = await self.brain.memory.get_pending_goals()
        
        status = "📊 **ESTADO DE PROMETHEUS**\n\n"
        status += f"🎯 Objetivos activos: {len(pending_goals)}\n"
        
        if pending_goals:
            status += "\nObjetivos:\n"
            for goal in pending_goals[:5]:
                status += f"• {goal['goal'][:50]}... ({goal['progress']*100:.0f}%)\n"
        
        await update.message.reply_text(status, parse_mode='Markdown')
    
    async def cmd_task(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /task <descripción> - Crea nueva tarea"""
        if not self._is_admin(update.effective_user.id):
            return
        
        task = ' '.join(context.args) if context.args else None
        if not task:
            await update.message.reply_text("Uso: /task <descripción de la tarea>")
            return
        
        await update.message.reply_text(f"🧠 Analizando tarea: {task}...")
        
        # Crear plan
        plan = await self.brain.plan(task)
        
        response = f"📋 **PLAN CREADO**\n\n"
        response += f"Objetivo: {plan.get('goal', task)}\n"
        response += f"Tiempo estimado: {plan.get('estimated_time', 'N/A')}\n\n"
        response += "Pasos:\n"
        
        for i, t in enumerate(plan.get('tasks', [])[:10], 1):
            response += f"{i}. {t.get('description', 'N/A')[:50]}\n"
        
        keyboard = [[
            InlineKeyboardButton("▶️ Ejecutar", callback_data=f"execute_plan"),
            InlineKeyboardButton("❌ Cancelar", callback_data="cancel_plan")
        ]]
        
        await update.message.reply_text(
            response,
            parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    async def cmd_goals(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /goals - Lista objetivos"""
        if not self._is_admin(update.effective_user.id):
            return
        
        goals = await self.brain.memory.get_pending_goals()
        
        if not goals:
            await update.message.reply_text("No hay objetivos pendientes.")
            return
        
        response = "🎯 **OBJETIVOS PENDIENTES**\n\n"
        for goal in goals:
            progress = goal['progress'] * 100
            bar = '█' * int(progress/10) + '░' * (10 - int(progress/10))
            response += f"• {goal['goal'][:40]}...\n"
            response += f"  [{bar}] {progress:.0f}%\n\n"
        
        await update.message.reply_text(response, parse_mode='Markdown')
    
    async def cmd_memory(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /memory - Info de memoria"""
        if not self._is_admin(update.effective_user.id):
            return
        
        summary = await self.brain.memory.get_context_summary()
        await update.message.reply_text(f"```\n{summary}\n```", parse_mode='Markdown')
    
    async def cmd_search(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /search <query> - Busca en internet"""
        if not self._is_admin(update.effective_user.id):
            return
        
        query = ' '.join(context.args) if context.args else None
        if not query:
            await update.message.reply_text("Uso: /search <búsqueda>")
            return
        
        await update.message.reply_text(f"🔍 Buscando: {query}...")
        
        result = await self.executor.execute({
            "tool": "browser_search",
            "params": {"query": query}
        })
        
        if result["success"]:
            response = f"📝 **Resultados para:** {query}\n\n"
            for i, r in enumerate(result.get("result", {}).get("results", [])[:5], 1):
                response += f"{i}. [{r.get('title', 'N/A')}]({r.get('url', '')})\n"
                response += f"   {r.get('snippet', '')[:100]}...\n\n"
            
            await update.message.reply_text(response, parse_mode='Markdown')
        else:
            await update.message.reply_text(f"❌ Error: {result.get('error')}")
    
    async def cmd_email(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /email - Gestión de emails"""
        if not self._is_admin(update.effective_user.id):
            return
        
        keyboard = [[
            InlineKeyboardButton("📥 Ver nuevos", callback_data="email_inbox"),
            InlineKeyboardButton("✉️ Enviar", callback_data="email_compose")
        ]]
        
        await update.message.reply_text(
            "📧 **Gestión de Email**\n\n¿Qué deseas hacer?",
            parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup(keyboard)
        )
    
    async def cmd_browse(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /browse <url> - Navega a URL"""
        if not self._is_admin(update.effective_user.id):
            return
        
        url = context.args[0] if context.args else None
        if not url:
            await update.message.reply_text("Uso: /browse <url>")
            return
        
        await update.message.reply_text(f"🌐 Navegando a {url}...")
        
        result = await self.executor.execute({
            "tool": "browser_goto",
            "params": {"url": url}
        })
        
        if result["success"]:
            r = result.get("result", {})
            await update.message.reply_text(
                f"✅ **Página cargada**\n"
                f"Título: {r.get('title', 'N/A')}\n"
                f"URL: {r.get('url', url)}"
            )
        else:
            await update.message.reply_text(f"❌ Error: {result.get('error')}")
    
    async def cmd_terminal(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /terminal <comando> - Ejecuta comando"""
        if not self._is_admin(update.effective_user.id):
            return
        
        command = ' '.join(context.args) if context.args else None
        if not command:
            await update.message.reply_text("Uso: /terminal <comando>")
            return
        
        await update.message.reply_text(f"💻 Ejecutando: `{command}`", parse_mode='Markdown')
        
        result = await self.executor.execute({
            "tool": "terminal_run",
            "params": {"command": command}
        })
        
        if result["success"]:
            r = result.get("result", {})
            output = r.get("stdout", "") or r.get("stderr", "") or "Sin salida"
            output = output[:3000]  # Limitar longitud
            
            await update.message.reply_text(f"```\n{output}\n```", parse_mode='Markdown')
        else:
            await update.message.reply_text(f"❌ Error: {result.get('error')}")
    
    async def cmd_help(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /help"""
        if not self._is_admin(update.effective_user.id):
            return
        
        help_text = """
🤖 **PROMETHEUS - COMANDOS**

**General:**
/start - Iniciar
/status - Estado actual
/help - Esta ayuda

**Tareas:**
/task <desc> - Nueva tarea
/goals - Ver objetivos

**Herramientas:**
/search <query> - Buscar en Google
/browse <url> - Navegar a URL
/terminal <cmd> - Ejecutar comando
/email - Gestionar emails
/memory - Ver memoria

**Natural:**
También puedes escribirme en lenguaje natural:
"Busca información sobre X"
"Envía email a X diciendo Y"
"Crea un script que haga Z"
        """
        
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Maneja mensajes de texto (comandos en lenguaje natural)."""
        if not self._is_admin(update.effective_user.id):
            return
        
        message = update.message.text
        
        await update.message.reply_text("🧠 Procesando...")
        
        # El cerebro procesa el mensaje
        response = await self.brain.think(message, {
            "source": "telegram",
            "user_id": update.effective_user.id
        })
        
        await update.message.reply_text(response)
    
    async def handle_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Maneja callbacks de botones inline."""
        query = update.callback_query
        await query.answer()
        
        if not self._is_admin(query.from_user.id):
            return
        
        data = query.data
        
        if data == "execute_plan":
            await query.edit_message_text("▶️ Ejecutando plan...")
            # Aquí ejecutarías el plan
            
        elif data == "cancel_plan":
            await query.edit_message_text("❌ Plan cancelado.")
            
        elif data == "email_inbox":
            result = await self.executor.execute({
                "tool": "email_read",
                "params": {"limit": 5, "unread_only": True}
            })
            
            if result["success"]:
                emails = result.get("result", {}).get("emails", [])
                if emails:
                    response = "📥 **Emails nuevos:**\n\n"
                    for email in emails:
                        response += f"• De: {email.get('from', 'N/A')[:30]}\n"
                        response += f"  Asunto: {email.get('subject', 'N/A')[:40]}\n\n"
                else:
                    response = "No hay emails nuevos."
                
                await query.edit_message_text(response, parse_mode='Markdown')
            else:
                await query.edit_message_text(f"❌ Error: {result.get('error')}")
    
    async def send_notification(self, message: str):
        """Envía notificación al admin."""
        if self.app and TELEGRAM_ADMIN_ID:
            try:
                await self.app.bot.send_message(
                    chat_id=TELEGRAM_ADMIN_ID,
                    text=message,
                    parse_mode='Markdown'
                )
            except Exception as e:
                print(f"Error enviando notificación: {e}")
```

---

## 🚀 ENTRY POINT (run.py)

```python
"""
PROMETHEUS - Entry Point
Inicializa y ejecuta todo el sistema
"""
import asyncio
from pathlib import Path

# Core
from core.brain import PrometheusBrain
from core.memory import MemorySystem
from core.executor import ActionExecutor

# Actions
from actions.browser import BrowserController, browser_goto, browser_search
from actions.terminal import TerminalController, terminal_run, terminal_python

# Communication
from communication.telegram_bot import TelegramInterface
from communication.email_client import email_send, email_read

# Config
from config.settings import DATA_DIR

async def main():
    """Función principal que inicializa y ejecuta Prometheus."""
    
    print("""
    ██████╗ ██████╗  ██████╗ ███╗   ███╗███████╗████████╗██╗  ██╗███████╗██╗   ██╗███████╗
    ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔════╝██║   ██║██╔════╝
    ██████╔╝██████╔╝██║   ██║██╔████╔██║█████╗     ██║   ███████║█████╗  ██║   ██║███████╗
    ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══╝  ██║   ██║╚══════║
    ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████╗╚██████╔╝███████║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
    
                        🔥 SUPERINTELIGENCIA ARTIFICIAL PERSONAL 🔥
    """)
    
    print("🚀 Iniciando PROMETHEUS...")
    
    # Crear directorio de datos
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # 1. Inicializar sistema de memoria
    print("💾 Inicializando memoria...")
    memory = MemorySystem()
    await memory.initialize()
    
    # 2. Registrar herramientas
    print("🔧 Registrando herramientas...")
    tools = {
        # Browser
        "browser_goto": browser_goto,
        "browser_search": browser_search,
        
        # Terminal
        "terminal_run": terminal_run,
        "terminal_python": terminal_python,
        
        # Email
        "email_send": email_send,
        "email_read": email_read,
    }
    
    # 3. Inicializar ejecutor
    print("⚡ Inicializando ejecutor...")
    executor = ActionExecutor(tools, memory)
    
    # 4. Inicializar cerebro
    print("🧠 Inicializando cerebro...")
    brain = PrometheusBrain(memory, tools)
    
    # 5. Inicializar interfaz de Telegram
    print("🤖 Inicializando bot de Telegram...")
    telegram = TelegramInterface(brain, executor)
    await telegram.initialize()
    
    # 6. Iniciar servicios
    print("\n" + "="*60)
    print("✅ PROMETHEUS LISTO")
    print("="*60)
    print("\n📱 Controla Prometheus desde Telegram")
    print("   Envía /start a tu bot para comenzar\n")
    
    # Ejecutar el bot de Telegram
    await telegram.start()
    
    # Mantener ejecutando
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Deteniendo Prometheus...")
        await telegram.stop()
        print("👋 Hasta pronto!")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 📝 .env.example

```
# PROMETHEUS - Variables de Entorno

# ============================================
# TELEGRAM (crear bot en @BotFather)
# ============================================
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_ADMIN_ID=tu_user_id_aqui

# ============================================
# EMAIL (para Gmail, usar App Password)
# ============================================
EMAIL_ADDRESS=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
IMAP_SERVER=imap.gmail.com

# ============================================
# OPENAI (opcional, si no usas g4f gratis)
# ============================================
OPENAI_API_KEY=sk-...

# ============================================
# TRADING (cuando tengas capital)
# ============================================
BINANCE_API_KEY=
BINANCE_SECRET=
TRADING_ENABLED=false
TRADING_MAX_AMOUNT=10

# ============================================
# WEB DASHBOARD
# ============================================
WEB_HOST=0.0.0.0
WEB_PORT=8000
WEB_SECRET_KEY=cambia-esto-por-algo-seguro
```

---

## 📋 INSTRUCCIONES FINALES

Cuando termines de crear todos los archivos:

1. **Crea los archivos `__init__.py`** vacíos en cada carpeta
2. **Crea `data/.gitkeep`** para el directorio de datos
3. **Crea `.gitignore`** con: `data/`, `.env`, `__pycache__/`, `*.pyc`
4. **Crea Dockerfile y docker-compose.yml** básicos
5. **Crea README.md** con instrucciones completas

## EMPIEZA AHORA

Crea el proyecto completo, archivo por archivo. 
Este es PROMETHEUS, la IA más potente que puedes construir.
¡EMPIEZA!
