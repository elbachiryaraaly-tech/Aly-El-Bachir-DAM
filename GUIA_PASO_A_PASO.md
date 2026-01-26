# Guía Paso a Paso - Actividad IA Generativa

## IAs Recomendadas (Gratuitas)

| Tipo | IA Recomendada | Enlace | Notas |
|------|----------------|--------|-------|
| **Imagen 1 (mal prompt)** | Bing Image Creator (DALL-E 3) | https://www.bing.com/create | Gratuito con cuenta Microsoft |
| **Imagen 2 (buen prompt)** | Leonardo.ai | https://leonardo.ai | Gratuito, 150 créditos/día |
| **Audio** | ElevenLabs | https://elevenlabs.io | Gratuito hasta 10.000 caracteres/mes |

---

## PASO 1: Crear Cuenta en las IAs

### 1.1 Bing Image Creator (para imagen 1)
1. Ve a https://www.bing.com/create
2. Inicia sesión con tu cuenta de Microsoft (Hotmail, Outlook, etc.)
3. Si no tienes cuenta, créala gratis

### 1.2 Leonardo.ai (para imagen 2)
1. Ve a https://leonardo.ai
2. Haz clic en "Sign Up"
3. Puedes registrarte con Google, Apple o email

### 1.3 ElevenLabs (para audio)
1. Ve a https://elevenlabs.io
2. Haz clic en "Sign Up"
3. Regístrate con Google o email

---

## PASO 2: Generar Primera Imagen (MAL PROMPT)

### En Bing Image Creator:

1. Accede a https://www.bing.com/create
2. En el cuadro de texto, escribe EXACTAMENTE este prompt malo:

```
programador del futuro
```

3. Haz clic en "Crear" o "Create"
4. **IMPORTANTE**: Quédate con la PRIMERA imagen que genere (no regeneres)
5. Haz clic derecho en la imagen → "Guardar imagen como..."
6. Guárdala como `imagen1_mal_prompt.png`

### Haz captura de pantalla que muestre:
- El prompt que usaste
- La imagen generada

---

## PASO 3: Generar Segunda Imagen (BUEN PROMPT)

### En Leonardo.ai:

1. Accede a https://leonardo.ai y entra a tu cuenta
2. Haz clic en "AI Image Generation" o "Create"
3. En el cuadro de texto, copia y pega este prompt detallado:

```
Futuristic programmer workstation in year 2045, AI-dominated world. Multiple floating holographic transparent screens displaying code and data visualizations. AI assistant represented as holographic avatar collaborating with programmer. Augmented reality smart glasses interface. Minimalist environment with blue and purple LED lighting. Bioluminescent plants. Ergonomic desk with touch surfaces. Programmer using hand gestures to manipulate code in the air. Window view of futuristic city with flying vehicles. Photorealistic style, high resolution, cinematic lighting, wide angle perspective.
```

4. Selecciona un modelo (recomendado: "Leonardo Diffusion XL" o "PhotoReal")
5. Haz clic en "Generate"
6. Si no te gusta el resultado, puedes regenerar (en este caso SÍ puedes intentarlo varias veces)
7. Cuando tengas una imagen que te guste, descárgala como `imagen2_buen_prompt.png`

### Haz captura de pantalla que muestre:
- El prompt que usaste
- La imagen final generada

---

## PASO 4: Preguntar a las IAs sobre su Funcionamiento

### 4.1 Preguntar a Bing/Copilot:

1. Ve a https://www.bing.com/chat (Copilot)
2. Escribe esta pregunta:

```
¿Qué lenguajes de programación se utilizan para crear DALL-E 3 y cómo funciona la generación de imágenes a partir de texto? Explícamelo de forma detallada.
```

3. **Haz captura de pantalla de la respuesta completa**

### 4.2 Preguntar a Leonardo.ai:

Nota: Leonardo.ai no tiene chat, así que usa ChatGPT o el propio Copilot preguntando específicamente sobre Leonardo.ai:

1. Ve a https://chat.openai.com o https://www.bing.com/chat
2. Escribe:

```
¿Qué lenguajes de programación utiliza Leonardo.ai para generar imágenes y cómo funciona su sistema de generación de imágenes mediante modelos de difusión?
```

3. **Haz captura de pantalla de la respuesta completa**

---

## PASO 5: Generar el Audio

### En ElevenLabs:

1. Ve a https://elevenlabs.io
2. Inicia sesión en tu cuenta
3. Haz clic en "Text to Speech" o "Speech Synthesis"
4. Copia y pega el siguiente texto:

```
La Inteligencia Artificial Generativa es capaz de crear contenido desde cero simplemente introduciendo instrucciones o prompts. En esta actividad hemos explorado la generación de imágenes utilizando diferentes IAs y analizado cómo la calidad del prompt afecta al resultado final.

En la primera parte, utilizamos Bing Image Creator con un prompt malo y poco detallado: simplemente "programador del futuro". Este prompt es extremadamente vago y no proporciona contexto temporal ni detalles específicos.

En la segunda parte, utilizamos Leonardo punto ai con un prompt mucho más elaborado, describiendo una estación de trabajo futurista del año 2045, con pantallas holográficas, un asistente de IA, interfaces de realidad aumentada, y un ambiente minimalista con iluminación cinematográfica.

La diferencia entre ambas imágenes demuestra la importancia de la ingeniería de prompts. Las imágenes generadas nos muestran un futuro donde el programador no desaparece, sino que evoluciona hacia un rol de director de orquesta tecnológico, coordinando herramientas avanzadas y colaborando con sistemas inteligentes.

Tanto Bing Image Creator como Leonardo punto ai utilizan Python como lenguaje principal de desarrollo, junto con frameworks de deep learning como PyTorch. Ambos sistemas se basan en modelos de difusión, donde el proceso comienza con ruido aleatorio y, mediante pasos iterativos, se va formando la imagen guiada por el texto del prompt.
```

5. Selecciona una voz en español:
   - Haz clic en el selector de voz
   - Busca voces en español o "Spanish"
   - Recomendadas: "Antoni" o "Rachel" (o cualquier voz que te guste)

6. Haz clic en "Generate"
7. Escucha el audio generado
8. Haz clic en el botón de descarga para guardar el archivo MP3

---

## PASO 6: Crear el Documento Final

### Estructura del documento (Word o Google Docs):

```
ACTIVIDAD: IA GENERATIVA DE CONTENIDO

1. PRIMERA PARTE - Imagen con Mal Prompt
   - IA utilizada: Bing Image Creator (DALL-E 3)
   - Prompt: "programador del futuro"
   - [Insertar imagen1_mal_prompt.png]

2. SEGUNDA PARTE - Imagen con Buen Prompt
   - IA utilizada: Leonardo.ai
   - Prompt: [Copiar el prompt largo]
   - [Insertar imagen2_buen_prompt.png]

3. COMPARACIÓN DE IMÁGENES
   [Escribir tu análisis comparando ambas imágenes]

4. CONCLUSIÓN (150-250 palabras)
   [Escribir tu reflexión sobre el futuro del programador]

5. TERCERA PARTE - Información Técnica
   - Captura de pantalla respuesta Copilot
   - Captura de pantalla respuesta sobre Leonardo.ai
   - Cuadro comparativo de lenguajes
   - Resumen de funcionamiento (100-200 palabras)

6. CUARTA PARTE - Audio
   - IA utilizada: ElevenLabs
   - [Adjuntar archivo de audio o indicar nombre del archivo]
```

---

## Resumen de IAs a Usar

| Parte | Tarea | IA | Enlace |
|-------|-------|-----|--------|
| 1 | Imagen mal prompt | **Bing Image Creator** | bing.com/create |
| 2 | Imagen buen prompt | **Leonardo.ai** | leonardo.ai |
| 3 | Preguntas técnicas | **Copilot/ChatGPT** | bing.com/chat |
| 4 | Generar audio | **ElevenLabs** | elevenlabs.io |

---

## Alternativas (si alguna IA no funciona)

### Para imágenes:
- **Ideogram** (ideogram.ai) - Gratuito, buena calidad
- **Playground AI** (playground.com) - Gratuito, 500 imágenes/día
- **Craiyon** (craiyon.com) - Totalmente gratuito, menor calidad

### Para audio:
- **Murf.ai** (murf.ai) - 10 minutos gratis
- **Play.ht** (play.ht) - Prueba gratuita
- **TTSMaker** (ttsmaker.com) - Gratuito, sin registro

---

## Tiempo Estimado Total: 30-45 minutos

1. Crear cuentas: 5-10 min
2. Generar imagen 1: 2-3 min
3. Generar imagen 2: 5-10 min
4. Preguntas técnicas: 5-10 min
5. Generar audio: 5 min
6. Crear documento: 10-15 min
