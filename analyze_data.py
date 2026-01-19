import pandas as pd

df = pd.read_csv('youtube_metrics.csv')

print("--- ESTADÍSTICAS GENERALES ---")
print(df.describe())

print("\n--- CORRELACIONES ---")
print(df.corr())

print("\n--- INSIGHTS ADICIONALES ---")
print(f"Ratio Promedio Likes/Visitas: {(df['Numero_likes'] / df['Numero_visitas']).mean() * 100:.2f}%")
print(f"Videos más exitosos (Top 5 Visitas):")
print(df.nlargest(5, 'Numero_visitas'))
print(f"Videos menos exitosos (Bottom 5 Visitas):")
print(df.nsmallest(5, 'Numero_visitas'))
