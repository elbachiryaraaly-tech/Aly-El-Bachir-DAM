import pandas as pd
import numpy as np
import random

# Configuración de la semilla para reproducibilidad
np.random.seed(42)

# Número de registros
n = 100

# Generación de datos
# Duración: Distribución normal centrada en 10 min, desviación 3, mínimo 1.
duracion = np.maximum(1, np.random.normal(10, 5, n)).round(2)

# Tiempo de edición: Correlacionado con duración + factor aleatorio
# Supongamos que por cada minuto de video hay 0.5 a 2 horas de edición base, más complejidad aleatoria
tiempo_edicion = (duracion * np.random.uniform(0.5, 1.5, n) + np.random.exponential(2, n)).round(2)

# Visitas: Dependen un poco del tiempo de edición (calidad) y aleatoriedad (viralidad)
# Base logarítmica para simular que pocos videos tienen muchísimas visitas
base_visitas = (tiempo_edicion * 100) + np.random.normal(0, 500, n)
visitas = np.abs(base_visitas * np.random.lognormal(0, 1, n)).astype(int)

# Likes: Altamente correlacionado con visitas (aprox 1-5% de visitas)
ratio_likes = np.random.uniform(0.01, 0.05, n)
likes = (visitas * ratio_likes).astype(int)

# Crear DataFrame
df = pd.DataFrame({
    'Duracion_minutos': duracion,
    'Tiempo_edicion_horas': tiempo_edicion,
    'Numero_visitas': visitas,
    'Numero_likes': likes
})

# Guardar a CSV
output_path = 'youtube_metrics.csv'
df.to_csv(output_path, index=False)

print(f"Archivo generado: {output_path}")
print(df.head())
print(df.describe())
