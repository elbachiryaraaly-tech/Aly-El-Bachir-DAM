# NEXUS OBD: AI Core

**La próxima generación de diagnóstico automotriz.**

Nexus OBD está diseñado para superar a las aplicaciones tradicionales mediante el uso de inteligencia artificial predictiva, visualización de datos en tiempo real de alta fidelidad y una arquitectura modular.

## Características "Años Luz"

- **Motor de IA Predictiva:** No solo lee códigos de error; analiza patrones de voltaje, temperatura y carga para predecir fallos antes de que ocurran.
- **Interfaz Glassmorphism:** Una UI diseñada para pantallas modernas, con modo oscuro nativo y visualizaciones fluidas.
- **Simulación en Tiempo Real:** Incluye un motor de simulación de ECU para demostración y desarrollo sin necesidad de conectar un vehículo físico inmediatamente.
- **Arquitectura Web:** Funciona en cualquier dispositivo con navegador moderno.

## Cómo Iniciar

1.  Instalar dependencias:
    ```bash
    npm install
    ```

2.  Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

3.  Abrir en el navegador (usualmente `http://localhost:5173`).

## Estructura del Proyecto

- `src/components/AIDiagnostics.tsx`: El cerebro del sistema.
- `src/hooks/useOBDData.ts`: Capa de abstracción de hardware (simulada).
- `src/index.css`: Sistema de diseño basado en Tailwind v4.

---
*Desarrollado para demostración técnica.*
