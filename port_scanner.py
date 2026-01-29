import socket
import sys
from datetime import datetime

# Definir el objetivo
if len(sys.argv) == 2:
    target = socket.gethostbyname(sys.argv[1]) # Traducir hostname a IPv4
else:
    print("Cantidad invalida de argumentos.")
    print("Sintaxis: python3 port_scanner.py <ip>")
    sys.exit()

# Banner bonito
print("-" * 50)
print(f"Escaneando objetivo: {target}")
print(f"Hora de inicio: {str(datetime.now())}")
print("-" * 50)

try:
    # Escanear puertos del 1 al 1024 (puertos comunes)
    # Puedes cambiar el rango segun necesites (ej. 1, 65535)
    for port in range(1, 1025):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1) # Timeout de 1 segundo
        
        # Devuelve 0 si la conexion es exitosa (puerto abierto)
        result = s.connect_ex((target, port)) 
        if result == 0:
            print(f"Puerto {port} esta ABIERTO")
        s.close()

except KeyboardInterrupt:
    print("\nSaliendo del programa.")
    sys.exit()

except socket.gaierror:
    print("No se pudo resolver el hostname.")
    sys.exit()

except socket.error:
    print("No se pudo conectar al servidor.")
    sys.exit()

print("-" * 50)
print("Escaneo finalizado.")
