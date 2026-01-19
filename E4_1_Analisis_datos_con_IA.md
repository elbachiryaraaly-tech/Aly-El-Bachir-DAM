# E4.1 – Análisis de datos con IA (Unidad 4)

Alumno/a: ____________________________  
Curso/Grupo: _________________________  
Fecha: _______________________________

Archivos del trabajo:
- Dataset (CSV): `datos_youtube.csv`
- Este informe: `E4_1_Analisis_datos_con_IA.md` (exportar a PDF para entregar)

---

## Primera parte: generación del conjunto de datos (CSV)

### IA utilizada (IA 1)
Nombre/servicio (ej.: ChatGPT / Copilot / Perplexity / etc.): ____________________________

### Prompt usado para generar el CSV (pegar aquí)
(Ejemplo de prompt válido; puedes adaptarlo)

> “Genera un conjunto de datos en formato CSV con **100 filas** (más cabecera) que simule métricas realistas de un canal de YouTube. Columnas:  
> 1) `duracion_min` (minutos),  
> 2) `edicion_horas` (horas),  
> 3) `visitas` (entero),  
> 4) `likes` (entero).  
> Los datos deben ser realistas, con variación y coherencia (por ejemplo, más visitas suelen implicar más likes, y vídeos más largos suelen requerir más edición, aunque con excepciones). No incluyas texto adicional: solo CSV.”

### Dataset guardado
He guardado el CSV en el archivo: `datos_youtube.csv`.

---

## Segunda parte: conclusiones con un prompt malo (IA 2)

### IA utilizada (IA 2)
Nombre/servicio (distinta de IA 1; ej.: Gemini / Claude / etc.): ________________________

### Datos entregados a la IA
- Formato: CSV pegado como texto / archivo (según permita la herramienta)  
- Fuente: `datos_youtube.csv`

### Prompt malo (poco detallado, sin contexto)
Copiar/pegar tal cual (o similar):

> “Analiza estos datos y dime conclusiones.”

### Respuesta de la IA 2 (pegar o insertar captura)
- Captura/pega aquí la respuesta completa:

____________________________________________  
____________________________________________  
____________________________________________  

### Observaciones personales sobre la respuesta con prompt malo
- **Qué información aporta**:  
  ____________________________________________________________________________
- **Qué falta / qué es ambiguo**:  
  ____________________________________________________________________________
- **Si comete suposiciones** (y cuáles):  
  ____________________________________________________________________________

---

## Tercera parte: conclusiones con un buen prompt (IA 3)

### IA utilizada (IA 3)
Nombre/servicio (distinta de IA 1 y IA 2): ___________________________________________

### Prompt bueno (detallado, con contexto y peticiones específicas)
Copiar/pegar tal cual (o similar). Sustituye lo que necesites:

> “Estoy estudiando **análisis de datos con IA** en un contexto empresarial. Te voy a pasar un CSV con métricas simuladas de vídeos de YouTube (`duracion_min`, `edicion_horas`, `visitas`, `likes`).  
>  
> Quiero un análisis **cuantitativo y explicativo**. Por favor:
> 1) Describe el dataset (número de filas, rango aproximado de cada variable, medias/medianas si puedes).  
> 2) Detecta posibles **outliers** y explica por qué podrían ser atípicos.  
> 3) Calcula/estima la **correlación** entre variables (especialmente `visitas` con `likes`, `duracion_min` con `edicion_horas`, y `edicion_horas` con `visitas`). Si no puedes calcular exactamente, justifica lo que observas.  
> 4) Interpreta qué relaciones parecen fuertes/débiles y por qué.  
> 5) Da **3 recomendaciones** accionables para un canal (por ejemplo, sobre duración, edición o expectativas de engagement).  
>  
> Devuélvelo en español y con apartados claros.”

### Respuesta de la IA 3 (pegar o insertar captura)
- Captura/pega aquí la respuesta completa:

____________________________________________  
____________________________________________  
____________________________________________  

### Comparación rápida: prompt malo vs prompt bueno (tu conclusión)
Redacta tu conclusión (mínimo 8–12 líneas). Enfócate en:
- **Calidad** (claridad, estructura, profundidad)
- **Riesgo de alucinación/suposiciones**
- **Uso de métricas** (correlación, outliers, rangos, etc.)
- **Utilidad para tomar decisiones**

Conclusión:

______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  

---

## Cuarta parte: cómo funcionan las IAs y qué lenguajes usan

### Pregunta a las 3 IAs
En cada IA (1, 2 y 3), pega esta pregunta y captura la respuesta:

> “1) ¿Qué lenguajes de programación se utilizan habitualmente para desarrollar/entrenar y desplegar un modelo de IA de generación de texto como tú?  
> 2) Explica de forma sencilla cómo funciona una IA de generación de texto (LLM): qué aprende, cómo predice la siguiente palabra/token y por qué puede cometer errores.”

### Respuestas (pegar o capturas)
#### IA 1
____________________________________________  
____________________________________________  

#### IA 2
____________________________________________  
____________________________________________  

#### IA 3
____________________________________________  
____________________________________________  

### Cuadro comparativo (lenguajes mencionados)
Completa la tabla según lo que te diga cada IA (marca con ✓ o escribe notas).

| Lenguaje / uso típico | IA 1 | IA 2 | IA 3 | Notas |
|---|---:|---:|---:|---|
| Python (entrenamiento/ML) |  |  |  |  |
| C++ (rendimiento/inferencia) |  |  |  |  |
| CUDA (GPU) |  |  |  |  |
| Rust / Go (servicios) |  |  |  |  |
| Java / C# (integración) |  |  |  |  |
| JavaScript/TypeScript (apps) |  |  |  |  |
| Otros |  |  |  |  |

### Resumen propio: cómo funciona la generación de texto en un LLM (100–200 palabras)
Redacta con tus palabras, basándote en las 3 respuestas.

______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  
______________________________________________________________________________  

---

## Anexo (opcional): cálculo rápido de correlaciones con Python
Si quieres verificar correlaciones tú mismo/a (no es obligatorio), puedes usar este ejemplo:

```python
import pandas as pd

df = pd.read_csv("datos_youtube.csv")
print(df.describe(numeric_only=True))
print("\nCorrelaciones (Pearson):")
print(df.corr(numeric_only=True))

df["ratio_likes"] = df["likes"] / df["visitas"]
print("\nRatio likes/visitas:")
print(df["ratio_likes"].describe())
```

