## Informe: Implementación de Inteligencia Artificial en una empresa industrial (ejemplo)

### 1) Breve explicación de la empresa
**Empresa ficticia**: *NovaFerro Components S.L.*

- **Sector y actividad**: empresa industrial de tamaño medio dedicada a la fabricación de componentes metálicos de precisión (piezas para maquinaria agrícola y automoción) con procesos de corte, mecanizado CNC, tratamiento térmico y control de calidad.
- **Tamaño**: ~420 trabajadores.
- **Estructura general (resumen)**:
  - Producción (plantas y turnos), Mantenimiento, Calidad, Logística y Compras
  - Ingeniería de proceso y Diseño
  - Comercial/Marketing
  - Recursos Humanos y Administración/Finanzas
  - **Informática (TI)**: da soporte a ERP/MES, redes, ciberseguridad, datos y desarrollo interno

### 2) Área/departamento de informática (TI): IA a implementar
El departamento de TI (12 personas: 5 desarrollo/ERP, 3 sistemas/soporte, 2 ciberseguridad, 2 datos/BI) implementaría una IA centrada en acelerar el ciclo de desarrollo y mejorar la resolución de incidencias.

#### IA #1 (TI): Asistente de desarrollo y soporte con RAG (base de conocimiento interna)
- **Finalidad y funcionamiento**:
  - **Para qué**: ayudar a programar (ERP/MES, integraciones, scripts), revisar código, generar pruebas, redactar documentación técnica y asistir en el diagnóstico de incidencias (tickets).
  - **Quién la usa**: equipo de desarrollo, soporte y datos.
  - **Cómo funciona (alto nivel)**: un modelo de lenguaje (LLM) se conecta a una **base de conocimiento** (procedimientos, runbooks, manuales del ERP, incidencias resueltas, esquema de BD, APIs internas) mediante **RAG** (Retrieval-Augmented Generation). El sistema recupera fragmentos relevantes y el LLM genera respuestas citando esas fuentes internas. Se añaden guardarraíles: control de permisos por rol, registro de prompts/respuestas, filtro de datos sensibles y bloqueo de acciones destructivas por defecto.
- **Tipo**: **IA generativa** (LLM) + **búsqueda semántica** (RAG).
- **Beneficios (estimados)**:
  - Reducción del tiempo de resolución de incidencias (MTTR) **25–35%**.
  - Aumento de productividad de desarrollo **15–25%** (menos tiempo en tareas repetitivas y documentación).
  - Menos dependencia de “personas clave” al centralizar conocimiento y estandarizar respuestas.
- **Entrenamiento**:
  - No se entrena desde cero; se usa un LLM existente y se aplica **RAG** (y, si se desea, un **fine-tuning ligero** con ejemplos internos no sensibles). El foco es gobernanza, permisos y calidad del contenido indexado.

### 3) Otras áreas o departamentos: IA a implementar

#### IA #2 (Producción/Mantenimiento): Mantenimiento predictivo (entrenada desde cero por la empresa)
- **Finalidad y funcionamiento**:
  - **Para qué**: predecir fallos o degradación en equipos críticos (CNC, hornos de tratamiento térmico, compresores) para planificar paradas y evitar averías.
  - **Quién la usa**: mantenimiento, jefatura de planta y planificación.
  - **Cómo funciona (alto nivel)**: sensores (vibración, temperatura, consumo, presión), señales del PLC, y eventos del CMMS/ERP (órdenes de trabajo, averías) se consolidan en un “data mart” de mantenimiento. El modelo produce una **probabilidad de fallo** (p. ej., “fallo en 7 días”) y/o un **tiempo estimado hasta fallo**; el sistema genera alertas y recomendaciones (inspección, lubricación, sustitución).
- **Tipo**: **IA predictiva** (predicción de fallo/tiempo a fallo).
- **Beneficios (estimados)**:
  - Reducción de paradas no planificadas **30%**.
  - Ahorro de costes de reparación urgente **10–18%**.
  - Reducción de inventario de repuestos por compras más inteligentes **10–15%**.
- **Entrenamiento (desde cero, explicado)**:
  - **Tipo de Machine Learning**: **aprendizaje supervisado**:
    - **Clasificación**: etiqueta \(y\) = 1 si hubo fallo en los próximos N días; \(y\) = 0 en caso contrario.
    - (Opcional) **Regresión**: predecir horas/días hasta fallo.
  - **Cómo funciona, en breve**:
    - Se construye un dataset histórico con **features** (estadísticos de vibración, tendencias de temperatura, ciclos, cargas) y **etiquetas** obtenidas de averías reales.
    - Se separan datos en entrenamiento/validación/test por tiempo (evitando “fugas”).
    - Se entrena un modelo (por ejemplo, Gradient Boosting/XGBoost o redes recurrentes si hay series densas), se evalúa con métricas (AUC/Recall para clasificación; MAE/RMSE para regresión) y se calibra para priorizar fallos críticos.
    - Se despliega con monitorización de deriva (drift) y reentrenos periódicos (mensual/trimestral).

#### IA #3 (Calidad): Inspección visual automática de defectos
- **Finalidad y funcionamiento**:
  - **Para qué**: detectar defectos superficiales o dimensionales (rebabas, grietas, marcas, deformaciones) en línea, antes de embalaje.
  - **Quién la usa**: técnicos de calidad y operarios de línea.
  - **Cómo funciona (alto nivel)**: cámaras industriales capturan imágenes por referencia de pieza; un modelo de visión (clasificación y/o segmentación) marca defectos y asigna un nivel de severidad. Las detecciones dudosas se envían a revisión humana para mantener precisión y reducir falsos positivos.
- **Tipo**: **IA de clasificación/análisis** (visión por computador).
- **Beneficios (estimados)**:
  - Reducción de scrap **20–30%**.
  - Reducción de retrabajos **15–25%**.
  - Mayor consistencia del control y trazabilidad (evidencias por lote y turno).
- **Entrenamiento**:
  - Se parte de modelos de visión preentrenados y se ajustan con imágenes internas etiquetadas (no necesariamente desde cero). La empresa mantiene un ciclo de mejora continua con nuevas etiquetas de casos raros.

#### IA #4 (Logística/Compras): Predicción de demanda y optimización de inventario
- **Finalidad y funcionamiento**:
  - **Para qué**: anticipar demanda por referencia y cliente, planificar compras de materia prima y reducir roturas de stock y sobreinventario.
  - **Quién la usa**: planificación, logística y compras.
  - **Cómo funciona (alto nivel)**: modelos de series temporales combinan histórico de pedidos, estacionalidad, calendarios, lead times de proveedores, promociones, y capacidad productiva. El sistema sugiere puntos de pedido (ROP), stocks de seguridad y priorización de compras según criticidad.
- **Tipo**: **IA predictiva** + **toma de decisiones** (recomendación basada en restricciones).
- **Beneficios (estimados)**:
  - Reducción de stock medio **8–15%** sin empeorar el nivel de servicio.
  - Reducción de roturas de stock **20–35%**.
  - Menos compras urgentes y penalizaciones por retrasos.
- **Entrenamiento**:
  - Modelos entrenados con datos históricos (internos) y reentrenos regulares; se validan por ventana temporal y se comparan con baseline (media móvil/ARIMA) antes de pasar a producción.

### 4) Plan de implementación (cómo lo implantaria en la empresa)
- **Gobernanza y seguridad (desde el día 1)**:
  - Catálogo de datos, clasificación de información (p. ej., confidencial/PII), control de acceso por rol y auditoría.
  - Política de uso de IA: qué se puede introducir en prompts, cómo revisar resultados, y trazabilidad.
- **Fases**:
  - **Diagnóstico (2–4 semanas)**: inventario de datos (ERP/MES/CMMS), procesos candidatos, riesgos, y KPIs por caso de uso.
  - **Pilotos (6–10 semanas)**: implementar 2 pilotos de alto impacto (p. ej., IA #1 y IA #2) con usuarios reales y métricas.
  - **Industrialización (8–12 semanas)**: MLOps (versionado de datos/modelos, CI/CD, monitorización), integración con herramientas (ticketing, ERP/MES), y formación.
  - **Escalado**: añadir IA #3 e IA #4 y extender a más líneas/referencias.
- **KPIs recomendados**:
  - TI: MTTR, tiempo de desarrollo por tarea, tasa de incidencias repetidas.
  - Mantenimiento: horas de parada no planificada, coste por avería, precisión/recall de alertas.
  - Calidad: % scrap, % retrabajo, ppm de defectos a cliente.
  - Logística: nivel de servicio, stock medio, compras urgentes.

