#!/usr/bin/env python3
"""
Port Scanner Básico
===================
Un scanner de puertos simple para aprender los fundamentos.
Úsalo SOLO en sistemas que tengas autorización para probar.

Uso:
    python port_scanner.py <target> [puerto_inicio] [puerto_fin]
    
Ejemplo:
    python port_scanner.py 192.168.1.1 1 1000
"""

import socket
import sys
import threading
from datetime import datetime
from queue import Queue

# Configuración
TIMEOUT = 1
MAX_THREADS = 100

# Cola para los puertos
port_queue = Queue()
open_ports = []
lock = threading.Lock()


def banner():
    print("""
    ╔═══════════════════════════════════════╗
    ║       PORT SCANNER - EDUCATIVO        ║
    ║   Solo para uso autorizado y legal    ║
    ╚═══════════════════════════════════════╝
    """)


def scan_port(target, port):
    """Escanea un puerto individual"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(TIMEOUT)
        result = sock.connect_ex((target, port))
        sock.close()
        
        if result == 0:
            with lock:
                open_ports.append(port)
            try:
                service = socket.getservbyport(port)
            except:
                service = "desconocido"
            print(f"  [+] Puerto {port}/tcp ABIERTO - Servicio: {service}")
        return result == 0
    except socket.error:
        return False


def worker(target):
    """Worker thread para escanear puertos de la cola"""
    while True:
        port = port_queue.get()
        if port is None:
            break
        scan_port(target, port)
        port_queue.task_done()


def scan_range(target, start_port, end_port):
    """Escanea un rango de puertos usando múltiples threads"""
    
    print(f"\n[*] Objetivo: {target}")
    print(f"[*] Rango de puertos: {start_port}-{end_port}")
    print(f"[*] Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 50)
    
    # Resolver hostname
    try:
        target_ip = socket.gethostbyname(target)
        if target != target_ip:
            print(f"[*] IP resuelta: {target_ip}")
    except socket.gaierror:
        print(f"[-] Error: No se pudo resolver el hostname '{target}'")
        return
    
    # Crear threads
    threads = []
    num_threads = min(MAX_THREADS, end_port - start_port + 1)
    
    for _ in range(num_threads):
        t = threading.Thread(target=worker, args=(target,))
        t.daemon = True
        t.start()
        threads.append(t)
    
    # Agregar puertos a la cola
    for port in range(start_port, end_port + 1):
        port_queue.put(port)
    
    # Esperar a que termine
    port_queue.join()
    
    # Detener threads
    for _ in range(num_threads):
        port_queue.put(None)
    
    for t in threads:
        t.join()
    
    # Resumen
    print("-" * 50)
    print(f"[*] Fin: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"[*] Total puertos abiertos: {len(open_ports)}")
    
    if open_ports:
        print(f"[*] Puertos abiertos: {sorted(open_ports)}")


def scan_common_ports(target):
    """Escanea los puertos más comunes"""
    common_ports = [
        21,    # FTP
        22,    # SSH
        23,    # Telnet
        25,    # SMTP
        53,    # DNS
        80,    # HTTP
        110,   # POP3
        111,   # RPCbind
        135,   # MSRPC
        139,   # NetBIOS
        143,   # IMAP
        443,   # HTTPS
        445,   # SMB
        993,   # IMAPS
        995,   # POP3S
        1723,  # PPTP
        3306,  # MySQL
        3389,  # RDP
        5432,  # PostgreSQL
        5900,  # VNC
        8080,  # HTTP Proxy
        8443,  # HTTPS Alt
    ]
    
    print(f"\n[*] Objetivo: {target}")
    print(f"[*] Escaneando {len(common_ports)} puertos comunes")
    print(f"[*] Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 50)
    
    for port in common_ports:
        scan_port(target, port)
    
    print("-" * 50)
    print(f"[*] Total puertos abiertos: {len(open_ports)}")


def main():
    banner()
    
    if len(sys.argv) < 2:
        print("Uso: python port_scanner.py <target> [puerto_inicio] [puerto_fin]")
        print("     python port_scanner.py <target> --common")
        print("\nEjemplos:")
        print("  python port_scanner.py 192.168.1.1 1 1000")
        print("  python port_scanner.py scanme.nmap.org --common")
        sys.exit(1)
    
    target = sys.argv[1]
    
    if len(sys.argv) == 2 or (len(sys.argv) == 3 and sys.argv[2] == "--common"):
        scan_common_ports(target)
    elif len(sys.argv) >= 3:
        try:
            start_port = int(sys.argv[2])
            end_port = int(sys.argv[3]) if len(sys.argv) > 3 else start_port
            
            if start_port < 1 or end_port > 65535 or start_port > end_port:
                print("[-] Error: Rango de puertos inválido (1-65535)")
                sys.exit(1)
            
            scan_range(target, start_port, end_port)
        except ValueError:
            print("[-] Error: Los puertos deben ser números enteros")
            sys.exit(1)


if __name__ == "__main__":
    main()
