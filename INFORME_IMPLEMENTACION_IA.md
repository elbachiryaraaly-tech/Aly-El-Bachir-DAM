# Informe de Implementación de Inteligencia Artificial

## TechMetal Industries S.A.

**Empresa del Sector Industrial de Fabricación de Componentes Metálicos de Precisión**

---

## Índice

1. [Descripción de la Empresa](#1-descripción-de-la-empresa)
2. [Implementación de IA en el Departamento de Informática](#2-implementación-de-ia-en-el-departamento-de-informática)
3. [Implementación de IA en Otros Departamentos](#3-implementación-de-ia-en-otros-departamentos)
   - 3.1 [Departamento de Producción y Control de Calidad](#31-departamento-de-producción-y-control-de-calidad)
   - 3.2 [Departamento de Recursos Humanos](#32-departamento-de-recursos-humanos)
   - 3.3 [Departamento de Marketing y Ventas](#33-departamento-de-marketing-y-ventas)
4. [Conclusiones](#4-conclusiones)
5. [Anexo: Resumen de Implementaciones](#5-anexo-resumen-de-implementaciones)

---

## 1. Descripción de la Empresa

### TechMetal Industries S.A.

**TechMetal Industries S.A.** es una empresa española del sector industrial especializada en la **fabricación de componentes metálicos de alta precisión** para los sectores automotriz, aeroespacial y de maquinaria industrial. Fundada en 1998 y con sede central en el polígono industrial de Villaverde (Madrid), la empresa se ha consolidado como uno de los referentes nacionales en mecanizado CNC y fabricación de piezas a medida.

### Datos Generales

| Aspecto | Descripción |
|---------|-------------|
| **Sector** | Industrial - Fabricación de componentes metálicos |
| **Año de fundación** | 1998 |
| **Sede central** | Madrid, España |
| **Número de empleados** | Aproximadamente **320 trabajadores** |
| **Facturación anual** | 45 millones de euros (2024) |
| **Instalaciones** | 3 plantas de producción (Madrid, Barcelona, Valencia) |
| **Clientes principales** | Fabricantes de automóviles, empresas aeroespaciales, fabricantes de maquinaria |

### Estructura Organizativa

La empresa cuenta con los siguientes departamentos principales:

- **Dirección General** (5 personas)
- **Departamento de Informática/IT** (18 personas)
- **Departamento de Producción** (180 personas)
- **Departamento de Control de Calidad** (25 personas)
- **Departamento de Diseño e Ingeniería** (30 personas)
- **Departamento de Recursos Humanos** (12 personas)
- **Departamento de Marketing y Ventas** (20 personas)
- **Departamento de Logística y Almacén** (25 personas)
- **Departamento de Administración y Finanzas** (15 personas)

### Departamento de Informática

El **Departamento de Informática** de TechMetal Industries está compuesto por **18 profesionales** que se encargan de:

- Desarrollo y mantenimiento del software interno (ERP, CRM, sistemas de gestión de producción)
- Administración de bases de datos y servidores
- Desarrollo web (portal corporativo, intranet, portal de clientes)
- Ciberseguridad y protección de datos
- Soporte técnico a todos los departamentos
- Integración de sistemas industriales (IoT, PLCs, sistemas SCADA)

---

## 2. Implementación de IA en el Departamento de Informática

### 2.1 Asistente de Programación con IA Generativa (GitHub Copilot Enterprise)

#### Finalidad y Funcionamiento

**Finalidad:** Acelerar el desarrollo de software interno, reducir errores en el código y mejorar la productividad del equipo de desarrollo.

**Usuarios:** Los 8 desarrolladores de software del departamento de informática (4 desarrolladores backend, 2 desarrolladores frontend, 1 desarrollador de integración de sistemas y 1 DevOps).

**Funcionamiento:**
Se implementará **GitHub Copilot Enterprise** como asistente de programación integrado en los entornos de desarrollo (Visual Studio Code, JetBrains IDEs). El sistema funciona de la siguiente manera:

1. **Autocompletado inteligente:** El desarrollador escribe código o comentarios describiendo lo que necesita, y la IA sugiere líneas de código completas, funciones o incluso módulos enteros.

2. **Generación de código a partir de descripciones:** Los desarrolladores pueden describir en lenguaje natural lo que necesitan ("Crear una función que valide el formato del número de serie de una pieza") y la IA genera el código correspondiente.

3. **Documentación automática:** La IA genera automáticamente documentación para funciones y clases existentes.

4. **Detección de errores y vulnerabilidades:** Analiza el código en tiempo real para detectar posibles bugs, malas prácticas y vulnerabilidades de seguridad.

5. **Conversión entre lenguajes:** Facilita la migración de código legacy (por ejemplo, de VB.NET a C#) mediante traducción automática.

#### Tipo de IA

| Característica | Descripción |
|----------------|-------------|
| **Tipo principal** | IA Generativa |
| **Modelo base** | Large Language Model (LLM) - GPT-4 |
| **Técnica** | Generación de texto/código mediante transformers |
| **Modalidad** | Generación autoregresiva basada en contexto |

Esta IA es de tipo **generativa** porque su función principal es **crear contenido nuevo** (código fuente) basándose en patrones aprendidos durante su entrenamiento con millones de repositorios de código público.

#### Beneficios

| Beneficio | Impacto Estimado |
|-----------|------------------|
| **Aumento de productividad** | +40% en velocidad de desarrollo |
| **Reducción de bugs** | -30% de errores en código nuevo |
| **Ahorro en tiempo de documentación** | -60% del tiempo dedicado a documentar |
| **Reducción de tiempo en revisión de código** | -25% en code reviews |
| **Ahorro económico anual** | Aproximadamente 85.000€ en horas de desarrollo |
| **Mejora en la calidad del código** | Código más consistente y siguiendo mejores prácticas |
| **Onboarding más rápido** | Nuevos desarrolladores productivos en 50% menos tiempo |

**Cálculo del ahorro:**
- 8 desarrolladores × 1.800 horas/año × 40% mejora productividad = 5.760 horas ahorradas
- 5.760 horas × 35€/hora (coste empresa) = 201.600€ valor generado
- Coste licencias: 8 × 39$/mes × 12 = ~3.744$/año ≈ 3.500€
- **Beneficio neto: ~198.000€/año**

---

## 3. Implementación de IA en Otros Departamentos

### 3.1 Departamento de Producción y Control de Calidad

#### Sistema de Visión Artificial para Control de Calidad (IA Entrenada Internamente)

##### Finalidad y Funcionamiento

**Finalidad:** Detectar automáticamente defectos en las piezas fabricadas durante el proceso de producción, eliminando la inspección manual y reduciendo el porcentaje de piezas defectuosas que llegan al cliente.

**Usuarios:** 
- 15 técnicos de control de calidad (supervisión del sistema)
- 180 operarios de producción (información en tiempo real)
- 5 ingenieros de calidad (análisis de datos y mejora continua)

**Funcionamiento:**

El sistema consta de:

1. **Hardware de captura:**
   - 12 cámaras industriales de alta resolución (5MP) instaladas en puntos estratégicos de las líneas de producción
   - Iluminación LED controlada para garantizar condiciones de imagen consistentes
   - Sensores de proximidad para activar la captura en el momento preciso

2. **Software de análisis:**
   - Modelo de deep learning basado en redes neuronales convolucionales (CNN)
   - Procesamiento en tiempo real con GPU NVIDIA RTX 4090
   - Integración con el sistema MES (Manufacturing Execution System)

3. **Proceso de inspección:**
   - Cada pieza es fotografiada automáticamente desde múltiples ángulos
   - Las imágenes se procesan en menos de 200ms
   - El sistema clasifica la pieza como: "OK", "Defecto menor" (reprocesable) o "Defecto mayor" (rechazo)
   - Las piezas defectuosas son desviadas automáticamente mediante un sistema de rechazo neumático

4. **Dashboard de control:**
   - Visualización en tiempo real del porcentaje de defectos
   - Alertas automáticas cuando el ratio de defectos supera umbrales configurados
   - Informes diarios y semanales para análisis de tendencias

##### Tipo de IA

| Característica | Descripción |
|----------------|-------------|
| **Tipo principal** | IA de Clasificación |
| **Arquitectura** | Red Neuronal Convolucional (CNN) - ResNet-50 modificada |
| **Técnica** | Deep Learning / Computer Vision |
| **Tarea** | Clasificación multiclase de imágenes |

Esta IA es de tipo **clasificación** porque su función es **categorizar** cada pieza inspeccionada en una de las clases predefinidas (OK, defecto menor, defecto mayor) basándose en las características visuales extraídas de las imágenes.

##### Beneficios

| Beneficio | Impacto Estimado |
|-----------|------------------|
| **Reducción de defectos enviados a clientes** | -85% de reclamaciones por calidad |
| **Velocidad de inspección** | 10x más rápido que inspección manual |
| **Consistencia** | 99.7% de repetibilidad (vs 92% humana) |
| **Reducción de costes de no calidad** | Ahorro de 180.000€/año |
| **Trazabilidad completa** | 100% de las piezas documentadas con imagen |
| **Reducción de personal dedicado a inspección** | Reasignación de 8 técnicos a tareas de mayor valor |

**Cálculo del ahorro:**
- Coste actual de no calidad: 250.000€/año
- Reducción del 85%: 212.500€ ahorrados
- Coste de implementación (año 1): 120.000€ (hardware + desarrollo)
- Coste de mantenimiento anual: 15.000€
- **ROI primer año: 77.500€** | **ROI años siguientes: 197.500€/año**

##### Entrenamiento del Modelo (Machine Learning Supervisado por Clasificación)

**Esta IA será entrenada internamente por TechMetal Industries desde cero**, ya que requiere reconocer los tipos específicos de defectos propios de nuestros productos y procesos de fabricación.

###### Tipo de Entrenamiento: Aprendizaje Supervisado por Clasificación

**Definición:**
El aprendizaje supervisado es un tipo de Machine Learning donde el modelo aprende a partir de **datos etiquetados**, es decir, ejemplos donde ya conocemos la respuesta correcta. En la clasificación, el objetivo es que el modelo aprenda a asignar una **categoría o clase** a cada nueva entrada.

**Funcionamiento del proceso de entrenamiento:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PROCESO DE ENTRENAMIENTO                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. RECOPILACIÓN DE DATOS                                          │
│     ┌──────────┐    ┌──────────┐    ┌──────────┐                   │
│     │ Imágenes │    │ Imágenes │    │ Imágenes │                   │
│     │   "OK"   │    │ Defecto  │    │ Defecto  │                   │
│     │          │    │  Menor   │    │  Mayor   │                   │
│     │  15.000  │    │  5.000   │    │  3.000   │                   │
│     └──────────┘    └──────────┘    └──────────┘                   │
│                                                                     │
│  2. ETIQUETADO (por técnicos de calidad expertos)                  │
│     Cada imagen se asocia con su clase correcta                    │
│     [Imagen_001.jpg] → "OK"                                        │
│     [Imagen_002.jpg] → "Defecto_Mayor_Grieta"                      │
│     [Imagen_003.jpg] → "Defecto_Menor_Rayado"                      │
│                                                                     │
│  3. DIVISIÓN DEL DATASET                                           │
│     ├── 70% Entrenamiento (16.100 imágenes)                        │
│     ├── 15% Validación (3.450 imágenes)                            │
│     └── 15% Test (3.450 imágenes)                                  │
│                                                                     │
│  4. ENTRENAMIENTO DEL MODELO                                       │
│     ┌─────────────────────────────────────────┐                    │
│     │        RED NEURONAL (CNN)               │                    │
│     │  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐ │                    │
│     │  │Conv │→ │Conv │→ │Pool │→ │Dense│  │                    │
│     │  │Layer│   │Layer│   │Layer│   │Layer│  │                    │
│     │  └─────┘   └─────┘   └─────┘   └─────┘ │                    │
│     └─────────────────────────────────────────┘                    │
│                          ↓                                         │
│     El modelo ajusta sus PESOS internos para minimizar             │
│     el ERROR entre su predicción y la etiqueta real                │
│                          ↓                                         │
│     Función de pérdida: Cross-Entropy Loss                         │
│     Optimizador: Adam (learning rate = 0.001)                      │
│                                                                     │
│  5. VALIDACIÓN Y AJUSTE                                            │
│     - Se evalúa el modelo con datos de validación                  │
│     - Se ajustan hiperparámetros si es necesario                   │
│     - Se repite hasta alcanzar precisión objetivo (>98%)           │
│                                                                     │
│  6. EVALUACIÓN FINAL                                               │
│     - Test con datos nunca vistos por el modelo                    │
│     - Métricas: Accuracy, Precision, Recall, F1-Score              │
│     - Matriz de confusión para análisis detallado                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detalle técnico del aprendizaje supervisado por clasificación:**

1. **Entrada (Input):** Imagen de una pieza metálica (matriz de píxeles 224×224×3)

2. **Salida esperada (Label):** Categoría de la pieza (OK, Defecto_Menor, Defecto_Mayor)

3. **Proceso de aprendizaje:**
   - El modelo recibe una imagen y produce una **predicción** (probabilidades para cada clase)
   - Se compara la predicción con la **etiqueta real** (ground truth)
   - Se calcula el **error** (función de pérdida)
   - Mediante **backpropagation**, se ajustan los pesos de la red para reducir el error
   - Este proceso se repite miles de veces (epochs) hasta que el modelo converge

4. **Por qué clasificación y no regresión:**
   - **Clasificación:** La salida es una **categoría discreta** (OK, Defecto_Menor, Defecto_Mayor)
   - **Regresión:** La salida sería un **valor numérico continuo** (ejemplo: porcentaje de defecto 0-100%)
   - Para nuestro caso, necesitamos decisiones categóricas claras para el sistema de rechazo automático

**Recursos necesarios para el entrenamiento:**

| Recurso | Descripción |
|---------|-------------|
| **Dataset** | 23.000 imágenes etiquetadas (3 meses de recopilación) |
| **Hardware** | Servidor con 2x NVIDIA A100 (80GB VRAM) |
| **Tiempo de entrenamiento** | Aproximadamente 48 horas |
| **Personal** | 2 ingenieros de datos + 5 técnicos de calidad (etiquetado) |
| **Framework** | PyTorch + torchvision |
| **Coste estimado de desarrollo** | 45.000€ (incluye recopilación, etiquetado y entrenamiento) |

---

### 3.2 Departamento de Recursos Humanos

#### Sistema de Análisis Predictivo para Retención de Talento

##### Finalidad y Funcionamiento

**Finalidad:** Predecir qué empleados tienen mayor riesgo de abandonar la empresa en los próximos 6-12 meses, permitiendo al departamento de RRHH tomar acciones preventivas para retener el talento clave.

**Usuarios:**
- 3 técnicos de RRHH (análisis y seguimiento)
- 2 responsables de RRHH (toma de decisiones)
- Directores de departamento (información sobre sus equipos)

**Funcionamiento:**

1. **Recopilación de datos:**
   El sistema integra información de múltiples fuentes:
   - Sistema de nóminas (salario, antigüedad, incrementos)
   - Portal del empleado (solicitudes de vacaciones, bajas, formación)
   - Evaluaciones de desempeño
   - Encuestas de clima laboral
   - Registro de fichajes (horas extra, absentismo)
   - Datos demográficos (edad, ubicación, nivel de estudios)

2. **Procesamiento y análisis:**
   - El modelo analiza patrones históricos de empleados que dejaron la empresa
   - Identifica las variables más predictivas (cambios de salario, promociones, carga de trabajo)
   - Calcula un "índice de riesgo de fuga" para cada empleado (0-100%)

3. **Alertas y recomendaciones:**
   - Genera alertas automáticas cuando un empleado supera el umbral de riesgo (>70%)
   - Proporciona recomendaciones personalizadas (revisar salario, ofrecer formación, cambio de proyecto)
   - Dashboard mensual con métricas agregadas por departamento

4. **Privacidad y ética:**
   - Los datos se anonimizan para análisis agregados
   - Solo RRHH tiene acceso a datos individuales
   - Se cumple con RGPD y la normativa de protección de datos
   - El sistema es una herramienta de apoyo, no de decisión automática

##### Tipo de IA

| Característica | Descripción |
|----------------|-------------|
| **Tipo principal** | IA Predictiva |
| **Algoritmos** | Random Forest + Gradient Boosting (XGBoost) |
| **Técnica** | Machine Learning supervisado (clasificación binaria) |
| **Tarea** | Predicción de probabilidad de abandono |

Esta IA es de tipo **predictiva** porque su objetivo principal es **anticipar eventos futuros** (la marcha de un empleado) basándose en datos históricos y patrones de comportamiento.

##### Beneficios

| Beneficio | Impacto Estimado |
|-----------|------------------|
| **Reducción de rotación voluntaria** | -35% de bajas voluntarias |
| **Ahorro en costes de reemplazo** | 120.000€/año (coste de contratar y formar = ~15.000€/empleado) |
| **Mejora del clima laboral** | +15 puntos en encuestas de satisfacción |
| **Retención de talento clave** | 90% de empleados de alto rendimiento retenidos |
| **Tiempo de reacción** | Alertas 4-6 meses antes del posible abandono |
| **Productividad** | Evita caídas de productividad por rotación |

**Caso de ejemplo:**
- TechMetal tiene una rotación anual del 12% (38 empleados/año)
- Coste medio de reemplazo: 15.000€/empleado
- Coste actual de rotación: 570.000€/año
- Con reducción del 35%: ahorro de 200.000€/año
- Coste de implementación: 35.000€ (software + integración)
- Coste anual de licencia: 12.000€
- **ROI primer año: 153.000€** | **ROI años siguientes: 188.000€/año**

---

### 3.3 Departamento de Marketing y Ventas

#### Sistema de IA para Análisis de Sentimiento y Monitorización de Marca

##### Finalidad y Funcionamiento

**Finalidad:** Monitorizar en tiempo real lo que se dice sobre TechMetal Industries en internet (redes sociales, foros industriales, noticias, reseñas), analizando el sentimiento (positivo, negativo, neutro) y detectando tendencias del mercado.

**Usuarios:**
- 5 profesionales de marketing (monitorización diaria)
- 3 comerciales senior (información sobre clientes)
- 2 responsables de comunicación (gestión de crisis)
- Dirección comercial (informes estratégicos)

**Funcionamiento:**

1. **Fuentes de datos monitorizadas:**
   - LinkedIn (publicaciones, comentarios, menciones)
   - Twitter/X (menciones de marca, hashtags del sector)
   - Foros especializados (Industria 4.0, fabricación, automoción)
   - Portales de noticias industriales
   - Reseñas en Google Business y directorios B2B
   - Webs de competidores (análisis comparativo)

2. **Procesamiento de lenguaje natural (NLP):**
   - **Extracción de menciones:** Identifica todas las referencias a TechMetal, productos y directivos
   - **Análisis de sentimiento:** Clasifica cada mención como positiva, negativa o neutra
   - **Detección de temas:** Agrupa las menciones por temática (calidad, precio, servicio, innovación)
   - **Identificación de influencers:** Detecta usuarios con alta influencia en el sector

3. **Dashboard y alertas:**
   - Panel en tiempo real con mapa de calor de menciones
   - Alertas inmediatas ante menciones negativas de alto impacto
   - Informes semanales de evolución del sentimiento
   - Comparativa con competidores principales

4. **Integración con ventas:**
   - Detección de oportunidades de negocio (empresas buscando proveedores)
   - Alertas sobre clientes insatisfechos antes de que escalen
   - Información sobre movimientos de la competencia

##### Tipo de IA

| Característica | Descripción |
|----------------|-------------|
| **Tipo principal** | IA de Análisis (NLP) |
| **Modelo** | Transformers (BERT/RoBERTa fine-tuned para español) |
| **Técnica** | Procesamiento de Lenguaje Natural + Clasificación de sentimiento |
| **Tareas** | Análisis de sentimiento, extracción de entidades, clasificación de temas |

Esta IA es de tipo **análisis** porque su función principal es **procesar y extraer información relevante** de grandes volúmenes de texto no estructurado, identificando patrones, sentimientos y tendencias.

##### Beneficios

| Beneficio | Impacto Estimado |
|-----------|------------------|
| **Tiempo de respuesta ante crisis** | De 48h a 2h |
| **Detección de oportunidades comerciales** | +15 leads cualificados/mes |
| **Mejora de reputación online** | +20% en índice de sentimiento positivo |
| **Ahorro en investigación de mercado** | 30.000€/año (estudios externos) |
| **Nuevos contratos atribuibles** | ~500.000€/año en nuevos negocios |
| **Retención de clientes** | -25% de pérdida de clientes por insatisfacción no detectada |

**Métricas clave:**
- Volumen de menciones monitorizadas: ~5.000/mes
- Precisión del análisis de sentimiento: 89%
- Tiempo medio de detección de crisis: 45 minutos
- Leads generados por detección de oportunidades: 180/año
- Tasa de conversión de leads detectados: 8%

---

## 4. Conclusiones

### Resumen de la Estrategia de Implementación de IA

La implementación de Inteligencia Artificial en TechMetal Industries representa una **transformación digital integral** que abarca desde el núcleo de la producción hasta las áreas de soporte. Los cuatro sistemas de IA propuestos están diseñados para trabajar de forma complementaria, creando un ecosistema tecnológico que potencia la competitividad de la empresa.

### Inversión Total y Retorno Esperado

| Concepto | Año 1 | Años Siguientes |
|----------|-------|-----------------|
| **Inversión total** | 198.500€ | 30.500€ (mantenimiento) |
| **Ahorro/Beneficio total** | 731.100€ | 783.500€ |
| **ROI neto** | 532.600€ | 753.000€ |
| **Payback** | 4 meses | - |

### Hoja de Ruta de Implementación

```
2025 Q1: GitHub Copilot (Informática) - Implementación inmediata
2025 Q2: Sistema de Análisis de Sentimiento (Marketing) - 6 semanas
2025 Q3: Sistema Predictivo RRHH - 8 semanas
2025 Q4: Visión Artificial Control Calidad - 16 semanas (incluye entrenamiento)
```

### Factores Clave de Éxito

1. **Gestión del cambio:** Formación continua y comunicación clara con todos los empleados
2. **Calidad de los datos:** Inversión en limpieza y estructuración de datos históricos
3. **Gobernanza de IA:** Políticas claras de uso ético y cumplimiento normativo
4. **Mejora continua:** Monitorización constante del rendimiento y reentrenamiento periódico
5. **Colaboración interdepartamental:** Equipos mixtos IT-Negocio para cada proyecto

### Conclusión Final

La Inteligencia Artificial no es el futuro de la industria manufacturera: **es el presente**. Las empresas que no adopten estas tecnologías quedarán rezagadas frente a competidores más eficientes y ágiles. TechMetal Industries, mediante la implementación estratégica de estas cuatro soluciones de IA, se posiciona para:

- **Reducir costes operativos** en más de 700.000€ anuales
- **Mejorar la calidad** de sus productos con inspección 100% automatizada
- **Retener el talento** clave en un mercado laboral competitivo
- **Aumentar su visibilidad** y reputación en el mercado
- **Acelerar la innovación** en sus desarrollos de software

---

## 5. Anexo: Resumen de Implementaciones

| # | Área | Solución de IA | Tipo de IA | Entrenamiento | Inversión | ROI Anual |
|---|------|----------------|------------|---------------|-----------|-----------|
| 1 | Informática | GitHub Copilot Enterprise | Generativa | Pre-entrenado (OpenAI) | 3.500€/año | 198.000€ |
| 2 | Producción/Calidad | Visión Artificial | Clasificación | **Interno (Supervisado)** | 120.000€ + 15.000€/año | 197.500€ |
| 3 | Recursos Humanos | Análisis Predictivo | Predictiva | Pre-entrenado + fine-tuning | 35.000€ + 12.000€/año | 188.000€ |
| 4 | Marketing/Ventas | Análisis de Sentimiento | Análisis (NLP) | Pre-entrenado + fine-tuning | 40.000€ + 3.000€/año | 200.000€ |

---

**Documento elaborado por:** Departamento de Innovación Digital  
**Fecha:** Febrero 2026  
**Versión:** 1.0  
**Clasificación:** Uso interno

---

*Este informe forma parte del Plan de Transformación Digital 2025-2027 de TechMetal Industries S.A.*
