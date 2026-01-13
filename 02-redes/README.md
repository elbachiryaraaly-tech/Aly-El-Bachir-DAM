# 🌐 Módulo 2: Redes y Comunicaciones

## 📖 Introducción

Entender las redes es **FUNDAMENTAL** para cualquier profesional de ciberseguridad. No puedes proteger lo que no entiendes.

---

## 🏗️ Modelo OSI (Open Systems Interconnection)

El modelo OSI divide la comunicación en 7 capas:

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 7: APLICACIÓN                                          │
│  • HTTP, HTTPS, FTP, SSH, DNS, SMTP                         │
│  • Donde el usuario interactúa                              │
├─────────────────────────────────────────────────────────────┤
│  CAPA 6: PRESENTACIÓN                                        │
│  • Formato de datos, encriptación, compresión               │
│  • SSL/TLS, JPEG, ASCII                                     │
├─────────────────────────────────────────────────────────────┤
│  CAPA 5: SESIÓN                                              │
│  • Establece, mantiene y termina conexiones                 │
│  • NetBIOS, RPC                                             │
├─────────────────────────────────────────────────────────────┤
│  CAPA 4: TRANSPORTE                                          │
│  • TCP (confiable) vs UDP (rápido)                          │
│  • Puertos, segmentación                                    │
├─────────────────────────────────────────────────────────────┤
│  CAPA 3: RED                                                 │
│  • Direccionamiento IP, enrutamiento                        │
│  • Routers, ICMP, ARP                                       │
├─────────────────────────────────────────────────────────────┤
│  CAPA 2: ENLACE DE DATOS                                     │
│  • Direcciones MAC, switches                                │
│  • Ethernet, Wi-Fi                                          │
├─────────────────────────────────────────────────────────────┤
│  CAPA 1: FÍSICA                                              │
│  • Cables, señales eléctricas, hubs                         │
│  • Bits en el medio físico                                  │
└─────────────────────────────────────────────────────────────┘
```

### Nemotécnico para recordar (de arriba a abajo):
> **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

---

## 🔢 Direcciones IP

### IPv4
- Formato: `XXX.XXX.XXX.XXX` (4 octetos)
- Ejemplo: `192.168.1.100`
- Total: ~4.3 mil millones de direcciones

### Clases de IP (IPv4)

| Clase | Rango | Uso |
|-------|-------|-----|
| A | 1.0.0.0 - 126.255.255.255 | Redes muy grandes |
| B | 128.0.0.0 - 191.255.255.255 | Redes medianas |
| C | 192.0.0.0 - 223.255.255.255 | Redes pequeñas |
| D | 224.0.0.0 - 239.255.255.255 | Multicast |
| E | 240.0.0.0 - 255.255.255.255 | Experimental |

### IPs Privadas (No ruteables en Internet)

```
10.0.0.0    - 10.255.255.255   (Clase A)
172.16.0.0  - 172.31.255.255   (Clase B)
192.168.0.0 - 192.168.255.255  (Clase C)
```

### IPs Especiales

| IP | Uso |
|----|-----|
| `127.0.0.1` | Localhost (tu propia máquina) |
| `0.0.0.0` | Todas las interfaces |
| `255.255.255.255` | Broadcast |

---

## 🚪 Puertos Importantes

Los puertos van del 0 al 65535:

### Puertos Bien Conocidos (0-1023)

| Puerto | Servicio | Descripción |
|--------|----------|-------------|
| 20, 21 | FTP | Transferencia de archivos |
| 22 | SSH | Shell seguro |
| 23 | Telnet | Shell sin encriptar ⚠️ |
| 25 | SMTP | Envío de correos |
| 53 | DNS | Resolución de nombres |
| 80 | HTTP | Web sin encriptar |
| 110 | POP3 | Recibir correos |
| 443 | HTTPS | Web encriptada |
| 445 | SMB | Compartir archivos Windows |
| 3306 | MySQL | Base de datos |
| 3389 | RDP | Escritorio remoto Windows |

---

## 📡 Protocolos Clave

### TCP vs UDP

```
┌────────────────────────────────────────────────────────────┐
│                        TCP                                  │
│  ✅ Confiable (confirma entrega)                           │
│  ✅ Ordenado (paquetes en secuencia)                       │
│  ❌ Más lento                                              │
│  📋 Usado en: HTTP, SSH, FTP, SMTP                         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                        UDP                                  │
│  ❌ No confiable (no confirma)                             │
│  ❌ Sin orden                                              │
│  ✅ Más rápido                                             │
│  📋 Usado en: DNS, Streaming, VoIP, Gaming                 │
└────────────────────────────────────────────────────────────┘
```

### TCP Three-Way Handshake

```
    CLIENTE                          SERVIDOR
       │                                │
       │─────── SYN ──────────────────►│
       │        (¿Puedo conectar?)      │
       │                                │
       │◄────── SYN-ACK ───────────────│
       │        (Sí, adelante)          │
       │                                │
       │─────── ACK ──────────────────►│
       │        (Perfecto, empezamos)   │
       │                                │
```

---

## 🔍 DNS (Domain Name System)

Traduce nombres de dominio a direcciones IP:

```
google.com  ──────►  142.250.80.46
```

### Tipos de Registros DNS

| Registro | Descripción | Ejemplo |
|----------|-------------|---------|
| A | IPv4 del dominio | google.com → 142.250.80.46 |
| AAAA | IPv6 del dominio | google.com → 2607:f8b0:4004:800::200e |
| MX | Servidor de correo | google.com → mail.google.com |
| CNAME | Alias de dominio | www.google.com → google.com |
| NS | Servidores DNS autoritativos | ns1.google.com |
| TXT | Texto arbitrario | Verificaciones, SPF |

### Comando útil para DNS
```bash
# Consultar registros DNS
nslookup google.com
dig google.com ANY

# Consultar registro específico
dig google.com MX
```

---

## 🔐 ARP (Address Resolution Protocol)

Traduce direcciones IP a direcciones MAC en la red local.

```
IP: 192.168.1.100  ────►  MAC: AA:BB:CC:DD:EE:FF
```

### ARP Spoofing/Poisoning ⚠️
Un atacante puede enviar respuestas ARP falsas para interceptar tráfico (Man-in-the-Middle).

```bash
# Ver tabla ARP
arp -a

# En Linux
ip neigh show
```

---

## 🛠️ Herramientas de Red Esenciales

### 1. Nmap (Network Mapper)
```bash
# Escaneo básico
nmap 192.168.1.1

# Escaneo de puertos comunes
nmap -sV 192.168.1.1

# Escaneo agresivo (detecta OS, versiones, scripts)
nmap -A 192.168.1.1

# Escaneo de toda una subred
nmap 192.168.1.0/24

# Escaneo sigiloso (SYN scan)
nmap -sS 192.168.1.1
```

### 2. Wireshark
- Captura y analiza tráfico de red
- Filtros útiles:
```
http                    # Solo tráfico HTTP
ip.addr == 192.168.1.1  # IP específica
tcp.port == 80          # Puerto específico
dns                     # Solo DNS
```

### 3. Netcat (nc) - "La navaja suiza"
```bash
# Escuchar en un puerto
nc -lvnp 4444

# Conectar a un puerto
nc 192.168.1.1 80

# Transferir archivos
nc -lvnp 4444 > archivo.txt  # Receptor
nc 192.168.1.1 4444 < archivo.txt  # Emisor
```

### 4. Comandos básicos de red
```bash
# Ver configuración de red
ifconfig        # Linux
ip addr         # Linux moderno
ipconfig        # Windows

# Probar conectividad
ping google.com

# Trazar ruta
traceroute google.com  # Linux
tracert google.com     # Windows

# Ver conexiones activas
netstat -tulpn  # Linux
netstat -an     # Windows
ss -tulpn       # Linux moderno
```

---

## 🏋️ Ejercicios Prácticos

### Ejercicio 1: Reconocimiento de Red
```bash
# En tu red local (con permiso):
1. Identifica tu IP: ip addr
2. Escanea tu subred: nmap -sn 192.168.1.0/24
3. Documenta los dispositivos encontrados
```

### Ejercicio 2: Captura de Tráfico
1. Instala Wireshark
2. Captura tráfico mientras navegas
3. Filtra solo el tráfico HTTP
4. Identifica qué información viaja sin encriptar

### Ejercicio 3: DNS Investigation
```bash
# Investiga estos dominios:
dig hackthebox.com ANY
nslookup -type=MX tryhackme.com
# ¿Qué servidores de correo usan?
# ¿Cuántos registros A tienen?
```

---

## 📚 Conceptos Adicionales

### Subnetting Básico

```
IP: 192.168.1.0/24

/24 = 255.255.255.0 = 256 hosts (254 usables)
/25 = 255.255.255.128 = 128 hosts (126 usables)
/26 = 255.255.255.192 = 64 hosts (62 usables)
```

### NAT (Network Address Translation)
Permite que múltiples dispositivos compartan una IP pública.

### Firewall
Filtra tráfico basado en reglas:
- **Whitelist**: Solo permite lo especificado
- **Blacklist**: Bloquea lo especificado

---

## ➡️ Siguiente Módulo

[Continúa con Dominio de Linux →](../03-linux/README.md)
