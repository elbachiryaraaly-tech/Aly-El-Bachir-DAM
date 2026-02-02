## Informe de implementacion de IA en una empresa mediana

### 1) Breve explicacion de la empresa
**Empresa:** MetalMeca S.L.  
**Sector:** Fabricacion de componentes metalicos para maquinaria industrial.  
**Tamanio:** ~320 trabajadores.  
**Descripcion general:** La empresa produce piezas mecanizadas (ejes, carcasas, engranajes) y ofrece servicios de mantenimiento a clientes del sector alimentario y automotriz. Cuenta con planta de produccion, oficina tecnica, area comercial y departamento de informatica.

---

### 2) Area o departamento de informatica (uso de IA)

**Uso 1: Asistente de desarrollo y revision de codigo**
- **Finalidad y funcionamiento:** El equipo de informatica (12 personas) usa una IA generativa para acelerar el desarrollo de aplicaciones internas (ERP, gestion de inventario y mantenimiento). La IA sugiere fragmentos de codigo, genera pruebas unitarias, revisa pull requests y ayuda a documentar APIs. Se integra con el repositorio Git y un chatbot interno.
- **Tipo:** IA generativa (LLM) con capacidades de analisis de codigo.
- **Beneficios:** Reduccion del tiempo de desarrollo en un 20%, menos errores en pruebas y documentacion mas consistente.
- **Entrenamiento:** Se utiliza un modelo comercial afinado con datos internos (no entrenado desde cero).

---

### 3) Otras areas o departamentos (tres usos de IA)

**Uso 2: Mantenimiento predictivo en produccion**
- **Finalidad y funcionamiento:** La IA analiza datos de sensores en tornos y fresadoras (vibracion, temperatura, consumo electrico). El sistema predice fallos con 7-10 dias de antelacion y genera alertas para el equipo de mantenimiento.
- **Tipo:** IA predictiva.
- **Beneficios:** Reduccion de paradas no planificadas en 30%, ahorro estimado de 120.000 EUR anuales.
- **Entrenamiento:** **Entrenada desde cero por la empresa.**  
  - **Tipo de entrenamiento:** aprendizaje supervisado por regresion.  
  - **Como funciona:** Se recopilan historicos de sensores y se etiqueta cada registro con el tiempo restante hasta un fallo. El modelo aprende a predecir el tiempo de vida util (RUL) y se reentrena cada trimestre con datos nuevos.

**Uso 3: Control de calidad con vision artificial**
- **Finalidad y funcionamiento:** En la linea de inspeccion, camaras de alta resolucion capturan imagenes de cada pieza. La IA detecta defectos superficiales (rayas, poros, rebabas) y clasifica la pieza como OK o no OK. El personal de calidad valida los casos dudosos.
- **Tipo:** IA de clasificacion (vision por computadora).
- **Beneficios:** Aumento del 15% en la deteccion temprana de defectos y reduccion de devoluciones de clientes en un 10%.
- **Entrenamiento:** Modelo preentrenado en vision artificial y ajustado con imagenes internas.

**Uso 4: Marketing y ventas con analisis de clientes**
- **Finalidad y funcionamiento:** La IA analiza historicos de compras y comportamiento de clientes B2B para segmentarlos y predecir oportunidades de venta cruzada. El equipo comercial recibe sugerencias de productos y tiempos recomendados de contacto.
- **Tipo:** IA de analisis y clustering (no supervisada) con un modulo de recomendacion.
- **Beneficios:** Incremento estimado del 8% en ventas recurrentes y mejor priorizacion del tiempo del equipo comercial.
- **Entrenamiento:** Modelo entrenado con datos anonimizados de CRM y pedidos.

---

### 4) Resumen de beneficios globales
- Mejora de la productividad en informatica y en produccion.
- Menor desperdicio y mejor control de calidad.
- Decisiones comerciales basadas en datos.
- Ahorros directos en mantenimiento y aumento de ventas.
