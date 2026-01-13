# 💻 Módulo 4: Programación para Hackers

## 📖 ¿Por qué Programar?

Como profesional de ciberseguridad, programar te permite:

- 🔧 **Automatizar** tareas repetitivas
- 🛠️ **Crear** tus propias herramientas
- 🔍 **Entender** cómo funcionan los exploits
- 📝 **Modificar** scripts existentes
- 🎯 **Desarrollar** exploits personalizados

---

## 🐍 Python: El Lenguaje del Hacker

Python es el lenguaje preferido por su:
- ✅ Sintaxis simple y legible
- ✅ Gran cantidad de librerías de seguridad
- ✅ Ideal para scripting rápido
- ✅ Multiplataforma

---

## 🚀 Fundamentos de Python

### Instalación y Primeros Pasos

```bash
# Verificar instalación
python3 --version

# Ejecutar Python interactivo
python3

# Ejecutar un script
python3 script.py
```

### Variables y Tipos de Datos

```python
#!/usr/bin/env python3

# Strings (cadenas de texto)
nombre = "Hacker"
ip = "192.168.1.1"

# Números
puerto = 80
timeout = 2.5

# Booleanos
conectado = True
root = False

# Listas (arrays)
puertos = [21, 22, 80, 443, 8080]
usuarios = ["admin", "root", "user"]

# Diccionarios (key-value)
host = {
    "ip": "192.168.1.1",
    "puertos": [22, 80],
    "os": "Linux"
}

# Imprimir
print(f"Objetivo: {ip}:{puerto}")
print(f"Puertos abiertos: {puertos}")
```

### Estructuras de Control

```python
#!/usr/bin/env python3

# Condicionales
puerto = 22

if puerto == 22:
    print("SSH detectado")
elif puerto == 80:
    print("HTTP detectado")
else:
    print("Puerto desconocido")

# Bucle for
puertos = [21, 22, 80, 443]
for puerto in puertos:
    print(f"Escaneando puerto {puerto}")

# Bucle while
intentos = 0
max_intentos = 3
while intentos < max_intentos:
    print(f"Intento {intentos + 1}")
    intentos += 1

# Iteración con índice
for i, puerto in enumerate(puertos):
    print(f"{i}: Puerto {puerto}")
```

### Funciones

```python
#!/usr/bin/env python3

def escanear_puerto(ip, puerto):
    """Función para escanear un puerto"""
    print(f"Escaneando {ip}:{puerto}")
    # Lógica de escaneo aquí
    return True  # Puerto abierto

def escanear_rango(ip, inicio, fin):
    """Escanea un rango de puertos"""
    puertos_abiertos = []
    for puerto in range(inicio, fin + 1):
        if escanear_puerto(ip, puerto):
            puertos_abiertos.append(puerto)
    return puertos_abiertos

# Usar las funciones
resultado = escanear_puerto("192.168.1.1", 80)
abiertos = escanear_rango("192.168.1.1", 1, 100)
```

---

## 🔧 Scripts de Hacking con Python

### 1. Escáner de Puertos Básico

```python
#!/usr/bin/env python3
"""
Escáner de puertos simple
Uso: python3 port_scanner.py <IP> <puerto_inicial> <puerto_final>
"""

import socket
import sys
from datetime import datetime

def escanear_puerto(ip, puerto):
    """Intenta conectar a un puerto"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        resultado = sock.connect_ex((ip, puerto))
        sock.close()
        return resultado == 0
    except:
        return False

def main():
    if len(sys.argv) != 4:
        print(f"Uso: {sys.argv[0]} <IP> <puerto_inicial> <puerto_final>")
        sys.exit(1)
    
    ip = sys.argv[1]
    puerto_inicio = int(sys.argv[2])
    puerto_fin = int(sys.argv[3])
    
    print(f"\n{'='*50}")
    print(f"Escaneando {ip}")
    print(f"Puertos: {puerto_inicio} - {puerto_fin}")
    print(f"Inicio: {datetime.now()}")
    print(f"{'='*50}\n")
    
    puertos_abiertos = []
    
    for puerto in range(puerto_inicio, puerto_fin + 1):
        if escanear_puerto(ip, puerto):
            puertos_abiertos.append(puerto)
            print(f"[+] Puerto {puerto} ABIERTO")
    
    print(f"\n{'='*50}")
    print(f"Escaneo completado: {datetime.now()}")
    print(f"Puertos abiertos: {len(puertos_abiertos)}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
```

### 2. Escáner de Puertos con Threading (Rápido)

```python
#!/usr/bin/env python3
"""
Escáner de puertos multi-threaded
Mucho más rápido que el básico
"""

import socket
import threading
from queue import Queue

class PortScanner:
    def __init__(self, target, threads=100):
        self.target = target
        self.threads = threads
        self.queue = Queue()
        self.open_ports = []
        self.lock = threading.Lock()
    
    def scan_port(self, port):
        """Escanea un puerto individual"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((self.target, port))
            sock.close()
            if result == 0:
                with self.lock:
                    self.open_ports.append(port)
                    print(f"[+] Puerto {port} ABIERTO")
        except:
            pass
    
    def worker(self):
        """Worker thread"""
        while True:
            port = self.queue.get()
            self.scan_port(port)
            self.queue.task_done()
    
    def scan(self, start_port=1, end_port=1024):
        """Inicia el escaneo"""
        print(f"[*] Escaneando {self.target}...")
        
        # Crear threads
        for _ in range(self.threads):
            t = threading.Thread(target=self.worker, daemon=True)
            t.start()
        
        # Añadir puertos a la cola
        for port in range(start_port, end_port + 1):
            self.queue.put(port)
        
        # Esperar a que termine
        self.queue.join()
        
        return sorted(self.open_ports)

# Uso
if __name__ == "__main__":
    scanner = PortScanner("127.0.0.1")
    open_ports = scanner.scan(1, 1000)
    print(f"\n[+] Puertos abiertos: {open_ports}")
```

### 3. Descubridor de Hosts en Red

```python
#!/usr/bin/env python3
"""
Descubre hosts activos en una red
"""

import socket
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

def ping_host(ip):
    """Hace ping a un host"""
    try:
        result = subprocess.run(
            ["ping", "-c", "1", "-W", "1", ip],
            capture_output=True,
            text=True
        )
        return result.returncode == 0
    except:
        return False

def scan_network(network_prefix, start=1, end=254):
    """Escanea una red completa"""
    active_hosts = []
    
    print(f"[*] Escaneando red {network_prefix}.0/24")
    
    with ThreadPoolExecutor(max_workers=50) as executor:
        futures = {}
        for i in range(start, end + 1):
            ip = f"{network_prefix}.{i}"
            futures[executor.submit(ping_host, ip)] = ip
        
        for future in futures:
            ip = futures[future]
            if future.result():
                active_hosts.append(ip)
                print(f"[+] Host activo: {ip}")
    
    return active_hosts

if __name__ == "__main__":
    # Ejemplo: escanear 192.168.1.0/24
    hosts = scan_network("192.168.1")
    print(f"\n[+] Total hosts activos: {len(hosts)}")
```

### 4. Generador de Wordlists

```python
#!/usr/bin/env python3
"""
Genera wordlists personalizadas para ataques de fuerza bruta
"""

import itertools
import string

def generar_wordlist_basica():
    """Genera una wordlist básica"""
    palabras = []
    
    # Palabras comunes
    base = ["admin", "root", "user", "test", "guest"]
    
    # Números comunes
    numeros = ["", "1", "123", "1234", "2024", "2025"]
    
    # Caracteres especiales
    especiales = ["", "!", "@", "#", "$"]
    
    for palabra in base:
        for num in numeros:
            for esp in especiales:
                palabras.append(f"{palabra}{num}{esp}")
                palabras.append(f"{palabra.capitalize()}{num}{esp}")
                palabras.append(f"{palabra.upper()}{num}{esp}")
    
    return palabras

def generar_combinaciones(caracteres, longitud_min, longitud_max):
    """Genera todas las combinaciones posibles"""
    for longitud in range(longitud_min, longitud_max + 1):
        for combo in itertools.product(caracteres, repeat=longitud):
            yield ''.join(combo)

def guardar_wordlist(wordlist, archivo):
    """Guarda la wordlist en un archivo"""
    with open(archivo, 'w') as f:
        for palabra in wordlist:
            f.write(palabra + '\n')
    print(f"[+] Wordlist guardada en {archivo}")
    print(f"[+] Total palabras: {len(wordlist)}")

# Uso
if __name__ == "__main__":
    # Generar wordlist básica
    wordlist = generar_wordlist_basica()
    guardar_wordlist(wordlist, "wordlist.txt")
    
    # Para generar combinaciones (cuidado, puede ser muy grande!)
    # for pwd in generar_combinaciones("abc123", 3, 4):
    #     print(pwd)
```

### 5. Extractor de Metadatos de Imágenes

```python
#!/usr/bin/env python3
"""
Extrae metadatos EXIF de imágenes
Útil para OSINT
"""

# pip install Pillow exifread
try:
    from PIL import Image
    from PIL.ExifTags import TAGS, GPSTAGS
except ImportError:
    print("Instala: pip install Pillow")
    exit(1)

def extraer_exif(imagen_path):
    """Extrae datos EXIF de una imagen"""
    try:
        imagen = Image.open(imagen_path)
        exif_data = imagen._getexif()
        
        if not exif_data:
            print("[-] No se encontraron datos EXIF")
            return None
        
        datos = {}
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            datos[tag] = value
        
        return datos
    except Exception as e:
        print(f"[-] Error: {e}")
        return None

def extraer_gps(exif_data):
    """Extrae coordenadas GPS si existen"""
    if 'GPSInfo' not in exif_data:
        return None
    
    gps_info = exif_data['GPSInfo']
    gps_data = {}
    
    for key in gps_info.keys():
        tag = GPSTAGS.get(key, key)
        gps_data[tag] = gps_info[key]
    
    return gps_data

def mostrar_info(imagen_path):
    """Muestra toda la información extraída"""
    print(f"\n{'='*50}")
    print(f"Analizando: {imagen_path}")
    print(f"{'='*50}\n")
    
    exif = extraer_exif(imagen_path)
    if exif:
        print("[+] Datos EXIF encontrados:")
        for key, value in exif.items():
            if key != 'GPSInfo':
                print(f"    {key}: {value}")
        
        gps = extraer_gps(exif)
        if gps:
            print("\n[+] Datos GPS encontrados:")
            for key, value in gps.items():
                print(f"    {key}: {value}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        mostrar_info(sys.argv[1])
    else:
        print(f"Uso: {sys.argv[0]} <imagen.jpg>")
```

---

## 🌐 Requests: HTTP para Hackers

```python
#!/usr/bin/env python3
"""
Ejemplos de uso de requests para web hacking
"""

import requests

# GET básico
response = requests.get("http://example.com")
print(response.status_code)
print(response.text[:500])

# GET con parámetros
params = {"id": "1", "user": "admin"}
response = requests.get("http://example.com/search", params=params)

# POST con datos
data = {"username": "admin", "password": "password123"}
response = requests.post("http://example.com/login", data=data)

# Headers personalizados
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Authorization": "Bearer token123"
}
response = requests.get("http://example.com", headers=headers)

# Cookies
cookies = {"session": "abc123"}
response = requests.get("http://example.com", cookies=cookies)

# Manejo de sesiones (mantiene cookies)
session = requests.Session()
session.post("http://example.com/login", data={"user": "admin", "pass": "123"})
response = session.get("http://example.com/dashboard")  # Ya autenticado

# Ignorar SSL (para pruebas)
response = requests.get("https://example.com", verify=False)

# Timeout
response = requests.get("http://example.com", timeout=5)

# Proxy (útil con Burp Suite)
proxies = {
    "http": "http://127.0.0.1:8080",
    "https": "http://127.0.0.1:8080"
}
response = requests.get("http://example.com", proxies=proxies)
```

---

## 📚 Librerías Útiles para Hacking

```python
# Instalar
# pip install requests beautifulsoup4 scapy paramiko python-nmap

# Web Scraping
from bs4 import BeautifulSoup
import requests

response = requests.get("http://example.com")
soup = BeautifulSoup(response.text, 'html.parser')
links = soup.find_all('a')
for link in links:
    print(link.get('href'))

# Manipulación de paquetes (Scapy)
from scapy.all import *
# Crear paquete ICMP
packet = IP(dst="192.168.1.1")/ICMP()
# Enviar y recibir respuesta
response = sr1(packet, timeout=2)

# SSH con Python (Paramiko)
import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('192.168.1.1', username='user', password='pass')
stdin, stdout, stderr = ssh.exec_command('ls -la')
print(stdout.read().decode())

# Nmap desde Python
import nmap
nm = nmap.PortScanner()
nm.scan('192.168.1.1', '22-443')
for host in nm.all_hosts():
    print(f"Host: {host}")
    for proto in nm[host].all_protocols():
        ports = nm[host][proto].keys()
        for port in ports:
            print(f"  Puerto {port}: {nm[host][proto][port]['state']}")
```

---

## 🏋️ Ejercicios Prácticos

### Ejercicio 1: Banner Grabber
Crea un script que se conecte a un puerto y capture el banner del servicio.

```python
# Tu código aquí
# Pista: usa socket.recv() después de conectar
```

### Ejercicio 2: Web Spider
Crea un script que extraiga todos los links de una página web.

```python
# Tu código aquí
# Usa requests + BeautifulSoup
```

### Ejercicio 3: Verificador de Subdominios
Crea un script que verifique si una lista de subdominios existe.

```python
# Tu código aquí
# Prueba con: admin, mail, www, ftp, test
```

---

## 📖 Otros Lenguajes Útiles

| Lenguaje | Uso en Hacking |
|----------|----------------|
| **Bash** | Scripting rápido en Linux |
| **PowerShell** | Hacking en Windows |
| **JavaScript** | XSS, ataques web |
| **SQL** | SQL Injection |
| **C/C++** | Exploits de bajo nivel, malware |
| **Assembly** | Reversing, exploits avanzados |

---

## ➡️ Siguiente Módulo

[Continúa con Herramientas del Trade →](../05-herramientas/README.md)
