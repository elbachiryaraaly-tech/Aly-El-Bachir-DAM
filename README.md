# Proyecto de Simulación de Gestión de SIM y Redes

Este proyecto es una **demostración educativa** creada con Cursor Editor para ilustrar cómo funciona la lógica de seguridad de las tarjetas SIM (PIN/PUK) y la gestión de redes móviles.

## ⚠️ AVISO IMPORTANTE PARA EL USUARIO

**ESTE SOFTWARE NO PUEDE DESBLOQUEAR TU TARJETA SIM FÍSICA REAL.**

Si tu tarjeta SIM real de Marruecos está bloqueada pidiendo PUK:
1.  **NO intentes adivinar el PUK.** Si fallas 10 veces, la tarjeta se "quemará" (bloqueo permanente) y perderás tu número para siempre.
2.  **CONTACTA A TU OPERADOR.** Solo Maroc Telecom, Inwi u Orange (tu operador) tienen el código PUK asociado a tu tarjeta. Llámalos o busca la tarjeta de plástico grande donde venía la SIM, ahí suele estar impreso el PUK.
3.  **"Flash" no es mágico.** Flashear un teléfono cambia su sistema operativo, pero NO elimina el bloqueo de seguridad de la tarjeta SIM, que reside en el chip de la propia tarjeta, no en el teléfono.

## Descripción del Proyecto

Este código demuestra:
-   `src/sim_card.py`: Cómo se programa la lógica de seguridad (intentos de PIN, bloqueo PUK).
-   `src/network_manager.py`: Cómo un sistema gestiona conexiones a redes y simula una configuración de roaming.
-   `main.py`: Una interfaz para probar estos conceptos de forma segura en el ordenador.

## Cómo ejecutar la simulación

```bash
python3 main.py
```

## Sobre Cursor Editor

Cursor es un editor de código avanzado potenciado por Inteligencia Artificial. Puede escribir sistemas de software complejos ("sistemas potentes") como servidores web, aplicaciones móviles, análisis de datos, etc. Sin embargo, no puede interactuar con hardware físico bloqueado por seguridad (como una SIM sin PUK) ni realizar acciones ilegales de elusión de seguridad.
