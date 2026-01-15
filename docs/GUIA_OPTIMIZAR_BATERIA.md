# Guía para Mejorar la Duración de la Batería (HP EliteBook 840 G5)

Tu HP EliteBook 840 G5 es un excelente equipo empresarial, pero con el tiempo las baterías se degradan. Aquí tienes pasos para diagnosticar y mejorar la autonomía.

## 1. Diagnóstico: ¿Está dañada la batería?
Antes de intentar optimizar, averigua la salud real de tu batería.

### Generar Reporte de Batería (Windows)
1. Abre el menú Inicio, escribe `cmd`.
2. Haz clic derecho en "Símbolo del sistema" y elige **Ejecutar como administrador**.
3. Escribe el comando: `powercfg /batteryreport` y pulsa Enter.
4. Abre el archivo HTML que se ha generado (la ruta aparecerá en la pantalla).

**Qué buscar en el reporte:**
- Busca la sección **"Installed batteries"**.
- Compara **Design Capacity** (Capacidad original) con **Full Charge Capacity** (Capacidad actual máxima).
- Si la "Full Charge Capacity" es menos del 50-60% de la "Design Capacity", es probable que necesites reemplazar la batería físicamente.

*Nota: Hemos incluido un script en `scripts/diagnostico_bateria.py` que hace esto automáticamente.*

## 2. Ajustes de Windows para Ahorrar Energía
1. **Modo de Batería:** Haz clic en el icono de batería en la barra de tareas y desliza el control hacia la izquierda (**Mejor batería** o **Ahorro de batería**).
2. **Brillo de Pantalla:** Redúcelo al nivel mínimo cómodo. La pantalla es lo que más consume.
3. **Retroiluminación del Teclado:** Si tu teclado se ilumina, apágalo (`Fn` + tecla correspondiente, suele ser F5, F9 o F11 en HP) cuando no sea necesario.

## 3. Identificar Aplicaciones que Consumen Batería
1. Ve a **Configuración** > **Sistema** > **Energía y batería** (o Batería).
2. Revisa la sección "Uso de batería por aplicación".
3. Cierra o desinstala las aplicaciones que consuman mucho en segundo plano (ej. navegadores con muchas pestañas abiertas, Chrome).

## 4. Actualizaciones (Drivers y BIOS)
En los HP EliteBook, una BIOS desactualizada puede gestionar mal la energía.
1. Usa **HP Support Assistant** (debería venir instalado) para buscar actualizaciones.
2. O ve a la web de soporte de HP y busca drivers para "HP EliteBook 840 G5".

## 5. Hardware (SSD y RAM)
Mencionas que tienes un SSD de 128GB. Si el disco está muy lleno (como vimos antes), el sistema trabaja más moviendo archivos temporales, lo que consume más CPU y batería.
- Sigue la [Guía de Liberar Espacio](GUIA_LIBERAR_ESPACIO.md) para mantener el disco limpio.
