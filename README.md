# Herramientas de Mantenimiento PC

Este repositorio contiene herramientas y guías para optimizar tu PC Windows, liberar espacio y diagnosticar problemas de batería.

## Contenido

### 1. [Guía de Liberación de Espacio](docs/GUIA_LIBERAR_ESPACIO.md)
Una guía paso a paso en español con métodos seguros y efectivos para recuperar espacio en Windows 11/10.
- Uso del Liberador de espacio en disco.
- Limpieza de temporales.
- Gestión de aplicaciones.

### 2. [Guía de Optimización de Batería](docs/GUIA_OPTIMIZAR_BATERIA.md)
Consejos específicos para portátiles (especialmente HP EliteBook) para diagnosticar la salud de la batería y mejorar su duración.

## Scripts Automatizados

### Limpiador de Espacio
Elimina archivos temporales automáticamente.
```bash
python scripts/limpiador.py
```
*Nota: Ejecutar como Administrador para mayor efectividad.*

### Diagnóstico de Batería
Genera y abre un reporte oficial de Windows sobre la salud de tu batería.
```bash
python scripts/diagnostico_bateria.py
```
Este script te mostrará la capacidad real de tu batería frente a la original de fábrica.
