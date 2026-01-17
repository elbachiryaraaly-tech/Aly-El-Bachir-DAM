"""
ContentGPT Bot - Generador de contenido con IA
Usa g4f (GPT gratis, sin API key de pago)
"""
import g4f
import asyncio
from typing import Optional

# Plantillas de prompts para diferentes tipos de contenido
TEMPLATES = {
    "twitter": {
        "name": "🐦 Tweet/Hilo de Twitter",
        "prompt": """Genera un tweet viral sobre: {topic}

Requisitos:
- Máximo 280 caracteres
- Incluye 1-2 emojis relevantes
- Debe generar engagement (pregunta, controversia suave, o insight valioso)
- Tono: {tone}

Responde SOLO con el tweet, nada más."""
    },
    
    "instagram": {
        "name": "📸 Caption de Instagram",
        "prompt": """Genera un caption para Instagram sobre: {topic}

Requisitos:
- Gancho potente en la primera línea
- 3-5 párrafos cortos
- Incluye llamada a la acción
- 5-10 hashtags relevantes al final
- Tono: {tone}

Responde SOLO con el caption, nada más."""
    },
    
    "linkedin": {
        "name": "💼 Post de LinkedIn",
        "prompt": """Genera un post profesional de LinkedIn sobre: {topic}

Requisitos:
- Gancho en la primera línea (genera curiosidad)
- Historia personal o caso de estudio
- 3-5 puntos de valor
- Llamada a la acción al final
- Profesional pero humano
- Tono: {tone}

Responde SOLO con el post, nada más."""
    },
    
    "youtube": {
        "name": "🎥 Título y descripción YouTube",
        "prompt": """Genera título y descripción para un video de YouTube sobre: {topic}

Requisitos:
TÍTULO:
- Máximo 60 caracteres
- Incluye número o palabra poderosa
- Genera curiosidad

DESCRIPCIÓN:
- Resumen del video (2-3 líneas)
- Timestamps sugeridos
- Llamada a la acción (suscribirse, comentar)
- Tono: {tone}

Formato de respuesta:
TÍTULO: [título aquí]
DESCRIPCIÓN: [descripción aquí]"""
    },
    
    "email": {
        "name": "📧 Email marketing",
        "prompt": """Genera un email de marketing sobre: {topic}

Requisitos:
- Asunto que genere apertura (máx 50 caracteres)
- Saludo personalizado
- Cuerpo persuasivo (problema → solución → beneficio)
- Llamada a la acción clara
- Firma profesional
- Tono: {tone}

Formato:
ASUNTO: [asunto]
CUERPO:
[cuerpo del email]"""
    },
    
    "blog": {
        "name": "📝 Artículo de blog",
        "prompt": """Genera un artículo de blog sobre: {topic}

Requisitos:
- Título SEO optimizado
- Introducción con gancho
- 3-5 secciones con subtítulos
- Consejos prácticos
- Conclusión con llamada a la acción
- Aproximadamente 500 palabras
- Tono: {tone}

Responde con el artículo completo formateado."""
    },
    
    "tiktok": {
        "name": "🎵 Script TikTok/Reels",
        "prompt": """Genera un script para TikTok/Reels sobre: {topic}

Requisitos:
- Duración: 30-60 segundos
- Gancho en los primeros 3 segundos
- Formato de guión con [ACCIÓN] y TEXTO
- Viral y entretenido
- Llamada a la acción al final
- Tono: {tone}

Formato:
[GANCHO - 3 seg]: "..."
[DESARROLLO - 20 seg]: "..."
[CIERRE - 7 seg]: "..."
"""
    },
    
    "producto": {
        "name": "🛍️ Descripción de producto",
        "prompt": """Genera una descripción de producto para: {topic}

Requisitos:
- Título atractivo
- 3-5 beneficios principales (no características)
- Descripción persuasiva
- Incluye prueba social sugerida
- Llamada a la acción
- Tono: {tone}

Responde con la descripción completa."""
    },
    
    "ad": {
        "name": "📣 Copy publicitario",
        "prompt": """Genera copy para un anuncio sobre: {topic}

Requisitos:
- Headline principal (máx 30 caracteres)
- Headline secundario (máx 40 caracteres)  
- Texto del anuncio (máx 125 caracteres)
- 3 variaciones diferentes
- Tono: {tone}

Formato:
VARIACIÓN 1:
Headline: ...
Subheadline: ...
Texto: ...

[Repetir para variaciones 2 y 3]"""
    },
    
    "bio": {
        "name": "👤 Bio para redes",
        "prompt": """Genera una bio profesional para redes sociales.

Información: {topic}

Requisitos:
- Versión corta (160 caracteres para Twitter)
- Versión media (250 caracteres para Instagram)
- Versión larga (500 caracteres para LinkedIn)
- Incluye emojis relevantes
- Destaca valor único
- Tono: {tone}

Formato:
TWITTER: ...
INSTAGRAM: ...
LINKEDIN: ..."""
    }
}

TONES = {
    "profesional": "Profesional y serio",
    "casual": "Casual y amigable", 
    "humorístico": "Divertido con humor",
    "inspirador": "Motivacional e inspirador",
    "urgente": "Urgente y con escasez",
    "educativo": "Educativo y didáctico"
}

async def generate_content(
    content_type: str,
    topic: str,
    tone: str = "profesional"
) -> Optional[str]:
    """
    Genera contenido usando IA (g4f - gratis)
    """
    if content_type not in TEMPLATES:
        return None
    
    template = TEMPLATES[content_type]
    tone_description = TONES.get(tone, TONES["profesional"])
    
    prompt = template["prompt"].format(topic=topic, tone=tone_description)
    
    try:
        # Usar g4f (GPT gratis)
        response = await asyncio.to_thread(
            g4f.ChatCompletion.create,
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": prompt}],
            provider=g4f.Provider.You  # Proveedor gratuito
        )
        
        return response
        
    except Exception as e:
        print(f"Error con proveedor principal, intentando alternativo: {e}")
        
        try:
            # Proveedor alternativo
            response = await asyncio.to_thread(
                g4f.ChatCompletion.create,
                model=g4f.models.gpt_35_turbo,
                messages=[{"role": "user", "content": prompt}],
                provider=g4f.Provider.FreeGpt
            )
            return response
            
        except Exception as e2:
            print(f"Error con proveedores: {e2}")
            return None

async def generate_custom(prompt: str) -> Optional[str]:
    """
    Genera contenido con prompt personalizado
    """
    try:
        response = await asyncio.to_thread(
            g4f.ChatCompletion.create,
            model=g4f.models.gpt_4,
            messages=[{"role": "user", "content": prompt}],
        )
        return response
    except Exception as e:
        print(f"Error generando contenido: {e}")
        return None

def get_content_types() -> dict:
    """Retorna los tipos de contenido disponibles"""
    return {key: val["name"] for key, val in TEMPLATES.items()}

def get_tones() -> dict:
    """Retorna los tonos disponibles"""
    return TONES
