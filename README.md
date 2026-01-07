# Sistema Bestial de Contra-Vigilancia

Este proyecto es un sistema de detección activa diseñado para identificar dispositivos que intentan capturar imágenes del usuario sin permiso. Combina **Inteligencia Artificial (Visión por Computadora)** y principios de **Óptica Física**.

## 🚀 Instalación de Software

1.  Asegúrate de tener Python 3.8+ instalado.
2.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```
3.  Ejecuta el sistema:
    ```bash
    python main.py
    ```

## 🛠 Guía de Hardware "Bestial" (Opcional pero Recomendado)

Para que el sistema sea realmente efectivo (especialmente la detección de lentes ocultas), necesitas construir el hardware físico. El software ya está preparado para ello.

### Componentes Necesarios:
1.  **Cámara:** Una cámara de alta resolución (Webcam USB o Módulo de Cámara Raspberry Pi).
    *   *Pro Tip:* Si puedes, quítale el filtro IR (filtro de bloqueo infrarrojo) para que pueda ver la luz IR.
2.  **Iluminación Infrarroja (IR):**
    *   Un anillo de LEDs IR de alta potencia (850nm o 940nm).
    *   Debe montarse **alrededor** de la lente de tu cámara (coaxial). Esto es crucial para el efecto "Ojo de Gato" (retro-reflexión).
3.  **Procesador:**
    *   Raspberry Pi 5 (recomendado por potencia) o NVIDIA Jetson Nano (ideal para IA rápida).

### ¿Cómo funciona la Detección de Reflejo (Glint)?
Cuando la luz IR golpea la lente de una cámara espía o un teléfono, se refleja directamente hacia la fuente (tu cámara). El software busca estos puntos brillantes inusuales (`detect_glint` en el código).

## 🛡️ Modos de Detección

1.  **Modo IA (Neural Sentry):**
    *   Utiliza YOLOv8 para detectar personas y teléfonos móviles.
    *   Analiza si el teléfono está elevado a la altura de la cara (posición de fotografía).
    *   Alerta: "POSSIBLE" o "HIGH".

2.  **Modo Óptico (Lens Hunter):**
    *   Busca brillos circulares intensos que indican la presencia de una lente física apuntándote.
    *   Alerta: "CRITICAL".

## ⚠️ Nota Legal y de Seguridad
Este sistema es para fines defensivos y educativos. No construyas láseres de alta potencia para dañar cámaras o personas, ya que es ilegal y peligroso.
