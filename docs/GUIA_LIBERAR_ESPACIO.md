# Guía Rápida para Liberar Espacio en Windows 11

Tu disco C: está casi lleno (según la captura, solo tienes 109 MB libres). Aquí tienes pasos rápidos para solucionar esto:

## 1. Liberador de Espacio en Disco (Rápido y Seguro)
1. Presiona la tecla `Windows` + `R`.
2. Escribe `cleanmgr` y presiona Enter.
3. Selecciona la unidad C: y haz clic en Aceptar.
4. Haz clic en el botón **"Limpiar archivos de sistema"**.
5. Marca todas las casillas que ocupen mucho espacio (especialmente "Actualizaciones de Windows", "Archivos temporales", "Papelera de reciclaje").
6. Haz clic en Aceptar y luego en "Eliminar archivos".

## 2. Eliminar Archivos Temporales Manualmente
1. Presiona `Windows` + `R`.
2. Escribe `%temp%` y presiona Enter.
3. Selecciona todos los archivos (`Ctrl` + `E`) y bórralos (`Supr`).
   - *Nota: Si algún archivo está en uso, selecciona "Hacer esto para todos" y dale a "Omitir".*
4. Repite el paso escribiendo `temp` (sin los porcentajes) en el cuadro de ejecutar.

## 3. Desinstalar Programas que no usas
1. Ve a **Configuración** > **Aplicaciones** > **Aplicaciones instaladas**.
2. Ordena la lista por **Tamaño** (de mayor a menor).
3. Desinstala juegos o programas grandes que ya no necesites.

## 4. Usar Storage Sense (Sensor de Almacenamiento)
1. Ve a **Configuración** > **Sistema** > **Almacenamiento**.
2. Activa **Sensor de almacenamiento**.
3. Haz clic en él y ejecútalo ahora para una limpieza automática.

## 5. Mover Archivos Grandes
Revisa tus carpetas de "Descargas", "Vídeos" y "Documentos". Mueve archivos grandes a un disco externo o súbelos a la nube (OneDrive, Google Drive, etc.) y bórralos del PC.

## Script de Limpieza Automática
Hemos incluido un script en `scripts/limpiador.py` que puedes ejecutar para eliminar archivos temporales automáticamente.
