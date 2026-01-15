# Guía Rápida para Liberar Espacio en Windows

## Tu Situación Actual
- **Espacio disponible:** 109 MB de 475 GB
- **Estado:** CRÍTICO - Necesitas liberar espacio urgentemente

---

## Métodos Rápidos (Ordenados por Efectividad)

### 1. Liberador de Espacio en Disco (Más Rápido)

```
1. Presiona Windows + R
2. Escribe: cleanmgr
3. Selecciona el disco C:
4. Marca TODAS las casillas, especialmente:
   - Archivos temporales de Internet
   - Papelera de reciclaje
   - Archivos temporales
   - Instalaciones anteriores de Windows (puede liberar 10-30 GB)
5. Clic en "Limpiar archivos del sistema" para más opciones
```

### 2. Vaciar la Papelera de Reciclaje
```
Clic derecho en Papelera de reciclaje → Vaciar papelera
```
**Potencial:** Varios GB dependiendo del uso

### 3. Eliminar Archivos Temporales Manualmente

Presiona `Windows + R` y escribe cada ruta:

| Carpeta | Comando |
|---------|---------|
| Temp del usuario | `%temp%` |
| Temp del sistema | `temp` |
| Prefetch | `prefetch` |

**Selecciona todo (Ctrl+A) y elimina. Ignora archivos en uso.**

### 4. Desinstalar Programas No Usados
```
1. Windows + I (Configuración)
2. Aplicaciones → Aplicaciones instaladas
3. Ordenar por "Tamaño"
4. Desinstala lo que no uses
```

### 5. Limpiar Caché de Navegadores

**Chrome:**
```
Configuración → Privacidad → Borrar datos de navegación
Seleccionar "Desde siempre" → Imágenes y archivos en caché
```

**Edge:**
```
Configuración → Privacidad → Elegir qué borrar
```

**Firefox:**
```
Configuración → Privacidad → Cookies y datos → Limpiar datos
```

### 6. Carpeta de Descargas
```
1. Abre tu carpeta de Descargas
2. Ordena por tamaño o fecha
3. Elimina instaladores (.exe, .msi) ya usados
4. Mueve archivos importantes a disco externo/nube
```

**En tu caso veo:**
- `prey-windows-1.13.22-x64` (86.7 MB) - Si ya está instalado, puedes eliminarlo
- `tor-browser-windows-x86_64-portable-15.0.3` - Si no lo usas, elimínalo

### 7. Almacenamiento de Windows (Sensor de Almacenamiento)
```
1. Windows + I
2. Sistema → Almacenamiento
3. Activar "Sensor de almacenamiento"
4. Clic en "Ejecutar Sensor de almacenamiento ahora"
5. Revisar "Recomendaciones de limpieza"
```

---

## Métodos Avanzados (Más Espacio)

### 8. Reducir/Eliminar Hibernación
```powershell
# Ejecutar como Administrador en PowerShell:
powercfg -h off
```
**Libera:** ~3-8 GB (tamaño de tu RAM)

### 9. Reducir Tamaño de Memoria Virtual
```
1. Windows + R → sysdm.cpl
2. Pestaña "Opciones avanzadas"
3. Rendimiento → Configuración
4. Opciones avanzadas → Memoria virtual → Cambiar
5. Reducir tamaño si es muy grande
```

### 10. Limpiar Caché de Windows Update
```powershell
# Ejecutar como Administrador:
net stop wuauserv
rd /s /q C:\Windows\SoftwareDistribution\Download
net start wuauserv
```

### 11. Comprimir Archivos del Sistema
```powershell
# Ejecutar como Administrador:
compact /compactos:always
```
**Libera:** 2-4 GB (comprime archivos del sistema)

---

## Herramientas Recomendadas (Gratuitas)

| Herramienta | Descripción | Enlace |
|-------------|-------------|--------|
| **TreeSize Free** | Ver qué ocupa más espacio | [jam-software.com](https://www.jam-software.com/treesize_free) |
| **WinDirStat** | Visualización gráfica del disco | [windirstat.net](https://windirstat.net) |
| **BleachBit** | Limpieza profunda | [bleachbit.org](https://www.bleachbit.org) |

---

## Orden de Prioridad Recomendado

1. **URGENTE:** Vaciar papelera + Archivos temporales
2. **RÁPIDO:** Liberador de espacio en disco (cleanmgr)
3. **EFECTIVO:** Desinstalar programas grandes no usados
4. **MANTENIMIENTO:** Limpiar descargas y caché de navegadores

---

## Prevención Futura

- Activa el **Sensor de almacenamiento** para limpieza automática
- Guarda archivos grandes en la nube (OneDrive, Google Drive)
- Revisa tu espacio mensualmente
- Considera un disco externo para archivos grandes

---

**Autor:** Aly El Bachir  
**Fecha:** Enero 2026
