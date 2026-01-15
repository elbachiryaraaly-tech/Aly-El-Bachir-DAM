# Guía para Optimizar la Batería - HP EliteBook 840 G5

## Tu Equipo
- **Modelo:** HP EliteBook 840 G5 14"
- **Procesador:** Core i5 1.7 GHz
- **RAM:** 8 GB
- **Almacenamiento:** SSD 128 GB

---

## Diagnóstico: ¿Por qué se descarga rápido?

### Causas Comunes:
1. **Batería degradada** (más de 2-3 años de uso)
2. **Procesos en segundo plano** consumiendo recursos
3. **Brillo de pantalla alto**
4. **WiFi/Bluetooth siempre activos**
5. **Drivers desactualizados**
6. **Plan de energía incorrecto**

---

## Soluciones Rápidas (Inmediatas)

### 1. Verificar Salud de la Batería

Abre **CMD como administrador** y ejecuta:
```cmd
powercfg /batteryreport /output "C:\battery-report.html"
```
Luego abre `C:\battery-report.html` en tu navegador.

**Busca:**
- **Design Capacity:** Capacidad original
- **Full Charge Capacity:** Capacidad actual

**Si Full Charge es menor al 50% de Design Capacity = Batería degradada, considera reemplazarla.**

### 2. Activar Plan de Ahorro de Energía

```
1. Clic en el icono de batería (barra de tareas)
2. Mover el slider hacia "Mejor duración de batería"
```

O configuración avanzada:
```
1. Windows + R → powercfg.cpl
2. Seleccionar "Economizador" o crear plan personalizado
```

### 3. Reducir Brillo de Pantalla
- Presiona `Fn + F5/F6` (teclas de brillo en HP)
- O: `Windows + A` → Ajustar brillo al 40-50%

**El brillo es el MAYOR consumidor de batería en portátiles.**

### 4. Desactivar WiFi/Bluetooth Cuando No Se Usen
```
Windows + A → Desactivar WiFi y Bluetooth si no los necesitas
```

O usa el **Modo Avión** para desconectar todo:
```
Windows + A → Modo avión
```

---

## Optimizaciones del Sistema

### 5. Desactivar Aplicaciones en Segundo Plano
```
1. Windows + I (Configuración)
2. Privacidad → Aplicaciones en segundo plano
3. Desactiva las que no necesites
```

**Especialmente desactiva:**
- Cortana (si no la usas)
- Xbox Game Bar
- Mapas
- Groove Music
- Películas y TV

### 6. Administrar Programas de Inicio
```
1. Ctrl + Shift + Esc (Administrador de tareas)
2. Pestaña "Inicio"
3. Deshabilita programas innecesarios
```

**Candidatos a desactivar:**
- Adobe Creative Cloud
- Spotify
- Discord
- OneDrive (si no lo usas)
- Programas de actualización automática

### 7. Identificar Procesos que Consumen Batería
```
1. Windows + I
2. Sistema → Batería
3. Ver "Uso de batería por aplicación"
```

**Cierra o desinstala las aplicaciones que más consumen.**

### 8. Actualizar Drivers HP

Descarga **HP Support Assistant** o visita:
```
https://support.hp.com/drivers
```

**Drivers importantes para batería:**
- Chipset Intel
- Intel Management Engine
- BIOS actualizado
- Driver de batería ACPI

### 9. Actualizar BIOS (Importante para HP)
```
1. Abre HP Support Assistant
2. Buscar actualizaciones
3. Instalar actualización de BIOS si está disponible
```

**HP frecuentemente lanza actualizaciones de BIOS que mejoran la gestión de energía.**

---

## Configuración Avanzada de Energía

### 10. Configurar Plan de Energía Personalizado

```
1. Windows + R → powercfg.cpl
2. Cambiar configuración del plan
3. Cambiar configuración avanzada de energía
```

**Ajustes recomendados:**

| Configuración | Con batería |
|---------------|-------------|
| Apagar pantalla | 2 minutos |
| Suspender equipo | 5 minutos |
| Brillo pantalla | 40% |
| Brillo pantalla atenuado | 20% |
| Procesador máximo | 50-70% |
| WiFi ahorro energía | Ahorro máximo |

### 11. Limitar Velocidad del Procesador (Mayor Ahorro)
```
1. powercfg.cpl → Configuración avanzada
2. Administración de energía del procesador
3. Estado máximo del procesador → Con batería: 50-70%
```

**Esto reduce rendimiento pero aumenta MUCHO la duración.**

### 12. Desactivar Indexación de Búsqueda
```
1. Windows + R → services.msc
2. Buscar "Windows Search"
3. Doble clic → Tipo de inicio: Deshabilitado
4. Detener el servicio
```

---

## Configuración Específica HP EliteBook

### 13. HP Power Manager (si está instalado)
```
1. Busca "HP Power Manager" en el menú inicio
2. Configura perfil de ahorro de batería
3. Activa "HP Battery Health Manager"
```

### 14. Configurar en BIOS HP
```
1. Reinicia el portátil
2. Presiona F10 repetidamente al encender
3. Busca "Power Management" o "Battery"
4. Activa "Battery Health Manager" → Maximizar duración de batería
```

---

## Verificar Hardware

### 15. Comprobar si la Batería Necesita Reemplazo

**Señales de batería dañada:**
- Se descarga en menos de 1 hora con uso ligero
- Se hincha o deforma
- Porcentaje salta (ej: de 50% a 20% de repente)
- No carga al 100%

**Batería de reemplazo HP EliteBook 840 G5:**
- Modelo: CS03XL o TA03XL
- Precio aproximado: 40-80€
- Puedes reemplazarla tú mismo (tiene acceso fácil)

### 16. Calibrar la Batería
```
1. Carga al 100%
2. Desconecta y usa hasta que se apague
3. Déjalo apagado 5 horas
4. Carga al 100% sin interrumpir
```

**Hacer esto cada 2-3 meses mejora la precisión del indicador.**

---

## Resumen: Pasos por Orden de Prioridad

| Prioridad | Acción | Impacto |
|-----------|--------|---------|
| 1 | Verificar salud batería (powercfg /batteryreport) | Diagnóstico |
| 2 | Reducir brillo al 40-50% | Alto |
| 3 | Plan de energía "Economizador" | Alto |
| 4 | Desactivar apps en segundo plano | Medio-Alto |
| 5 | Limitar procesador al 70% | Alto |
| 6 | Actualizar BIOS y drivers HP | Medio |
| 7 | Desactivar WiFi/Bluetooth cuando no se usen | Medio |
| 8 | Considerar reemplazo de batería si está degradada | Solución definitiva |

---

## Duración Esperada HP EliteBook 840 G5

| Uso | Duración esperada (batería nueva) |
|-----|-----------------------------------|
| Ofimática ligera | 8-10 horas |
| Navegación web | 6-8 horas |
| Video streaming | 5-6 horas |
| Uso intensivo | 3-4 horas |

**Si tu batería dura mucho menos, probablemente esté degradada.**

---

**Autor:** Aly El Bachir  
**Fecha:** Enero 2026
