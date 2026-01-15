import os
import subprocess
import platform
import webbrowser
import time

def main():
    if platform.system() != "Windows":
        print("Este script solo funciona en Windows.")
        return

    print("Generando reporte de batería de Windows...")
    
    # Nombre del archivo de reporte
    report_file = "battery_report.html"
    output_path = os.path.abspath(report_file)
    
    # Comando powercfg
    cmd = f"powercfg /batteryreport /output \"{output_path}\""
    
    try:
        # Ejecutar comando
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"Reporte generado exitosamente en: {output_path}")
            print("Abriendo reporte en el navegador...")
            time.sleep(1)
            webbrowser.open(f"file://{output_path}")
            
            print("\n--- CÓMO LEER EL REPORTE ---")
            print("1. Busca la sección 'Installed batteries'.")
            print("2. Compara 'DESIGN CAPACITY' (Original) con 'FULL CHARGE CAPACITY' (Actual).")
            print("3. Si la capacidad actual es mucho menor (ej. 50%), tu batería está degradada.")
        else:
            print("Error al generar el reporte.")
            print("Intenta ejecutar este script como Administrador.")
            print(f"Detalles: {result.stderr}")
            
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")

if __name__ == "__main__":
    main()
