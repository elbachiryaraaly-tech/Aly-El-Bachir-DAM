# 🎮 Módulo 6: Prácticas y Laboratorios

## 📖 Introducción

La teoría sin práctica no sirve de nada. Este módulo te guía sobre **dónde y cómo** practicar hacking de forma **LEGAL**.

---

## ⚠️ Recordatorio Legal IMPORTANTE

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                     ║
║   🚨 NUNCA hackees sistemas sin autorización EXPLÍCITA 🚨          ║
║                                                                     ║
║   ✅ USA las plataformas listadas aquí                             ║
║   ✅ Crea TU PROPIO laboratorio                                    ║
║   ✅ Participa en Bug Bounties autorizados                         ║
║                                                                     ║
║   ❌ NO escanees IPs aleatorias                                    ║
║   ❌ NO ataques sistemas de empresas                               ║
║   ❌ NO uses técnicas ilegales "para aprender"                     ║
║                                                                     ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 🏆 Plataformas de Práctica

### 1. HackTheBox (HTB) ⭐⭐⭐⭐⭐

**Web:** https://www.hackthebox.com

```
Nivel: Principiante a Avanzado
Costo: Gratis (limitado) / VIP ($14/mes)

Características:
├── Máquinas virtuales realistas
├── Challenges por categorías
├── Academia con cursos estructurados
├── Certificaciones (HTB CPTS, HTB CBBH)
└── Comunidad activa

Cómo empezar:
1. Crea cuenta (necesitas hackear el invite code)
2. Descarga el archivo .ovpn
3. Conecta: sudo openvpn archivo.ovpn
4. Empieza con máquinas "Easy"
```

### 2. TryHackMe (THM) ⭐⭐⭐⭐⭐

**Web:** https://tryhackme.com

```
Nivel: Principiante a Intermedio
Costo: Gratis / Premium ($10/mes)

Características:
├── Ideal para PRINCIPIANTES
├── Rutas de aprendizaje guiadas
├── Explicaciones paso a paso
├── Rooms temáticas
└── AttackBox en el navegador

Rutas recomendadas:
1. "Pre Security" - Fundamentos
2. "Complete Beginner" - Inicio en hacking
3. "Jr Penetration Tester" - Pentesting básico
4. "Offensive Pentesting" - Intermedio
```

### 3. PortSwigger Web Security Academy ⭐⭐⭐⭐⭐

**Web:** https://portswigger.net/web-security

```
Nivel: Principiante a Avanzado
Costo: GRATIS

Características:
├── Enfocado 100% en web hacking
├── Creado por los desarrolladores de Burp Suite
├── Labs interactivos por vulnerabilidad
├── Explicaciones detalladas
└── Certificación oficial

Temas:
├── SQL Injection
├── XSS
├── CSRF
├── SSRF
├── XXE
├── Authentication
├── Access Control
└── Y muchos más...
```

### 4. PentesterLab ⭐⭐⭐⭐

**Web:** https://pentesterlab.com

```
Nivel: Principiante a Avanzado
Costo: Gratis (limitado) / Pro ($20/mes)

Características:
├── Ejercicios muy bien estructurados
├── Badges por completar
├── Enfoque en web security
└── Explicaciones claras
```

### 5. VulnHub ⭐⭐⭐⭐

**Web:** https://vulnhub.com

```
Nivel: Principiante a Avanzado
Costo: GRATIS

Características:
├── Máquinas virtuales descargables
├── Practicar offline
├── Gran variedad
└── Writeups de la comunidad

Cómo usar:
1. Descarga la VM (.ova)
2. Importa en VirtualBox/VMware
3. Configura red NAT o Host-Only
4. ¡Hackea!
```

### 6. Otras Plataformas

| Plataforma | Enfoque | Link |
|------------|---------|------|
| **PicoCTF** | CTF para principiantes | https://picoctf.org |
| **OverTheWire** | Wargames Linux | https://overthewire.org |
| **Root-Me** | Challenges variados | https://root-me.org |
| **CryptoHack** | Criptografía | https://cryptohack.org |
| **Pwnable.kr** | Binary exploitation | https://pwnable.kr |
| **HackerOne CTF** | CTF + Bug Bounty | https://ctf.hacker101.com |

---

## 🏠 Monta Tu Propio Laboratorio

### Requisitos Mínimos
```
💻 PC con 16GB RAM (mínimo 8GB)
💾 100GB espacio libre
🖥️ VirtualBox o VMware
```

### Arquitectura Recomendada

```
┌─────────────────────────────────────────────────────────────┐
│                    TU PC HOST                                │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Kali Linux  │  │  Metasploitable│  │   Windows    │      │
│  │  (Atacante)  │  │  (Víctima Linux)│  │   (Víctima) │      │
│  │              │  │                │  │              │       │
│  │ 192.168.56.10│  │ 192.168.56.20 │  │192.168.56.30 │      │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                    Red Host-Only                             │
│                   192.168.56.0/24                            │
└─────────────────────────────────────────────────────────────┘
```

### VMs Vulnerables para Descargar

```
1. Metasploitable 2/3
   └── https://sourceforge.net/projects/metasploitable/

2. DVWA (Damn Vulnerable Web Application)
   └── https://github.com/digininja/DVWA

3. OWASP WebGoat
   └── https://owasp.org/www-project-webgoat/

4. Vulnhub VMs
   └── https://vulnhub.com

5. Windows vulnerable
   └── Usa versiones antiguas sin parches (solo en lab)
```

### Configuración de Red

```bash
# VirtualBox - Crear red Host-Only
1. File > Host Network Manager
2. Create
3. Configurar DHCP o IPs estáticas

# Configuración de cada VM:
Settings > Network > Adapter 1 > Host-only Adapter
```

---

## 🚩 CTF (Capture The Flag)

### ¿Qué es un CTF?
Competiciones donde resuelves desafíos de seguridad para obtener "flags" (texto secreto).

### Tipos de CTF

```
JEOPARDY
├── Categorías: Web, Pwn, Crypto, Forensics, Rev, Misc
├── Puntos por dificultad
└── El más común

ATTACK-DEFENSE
├── Cada equipo tiene servicios vulnerables
├── Atacar otros equipos + Defender los tuyos
└── Más realista pero complejo

KING OF THE HILL
├── Mantener control de un sistema
├── Competir contra otros equipos
└── Similar a HackTheBox
```

### Categorías Comunes

| Categoría | Descripción | Herramientas |
|-----------|-------------|--------------|
| **Web** | Vulnerabilidades web | Burp, SQLMap, Scripts |
| **Pwn** | Binary exploitation | GDB, pwntools, ROPgadget |
| **Crypto** | Criptografía | Python, CyberChef |
| **Forensics** | Análisis forense | Autopsy, Volatility, binwalk |
| **Reverse** | Ingeniería inversa | Ghidra, IDA, radare2 |
| **Stego** | Esteganografía | steghide, zsteg |
| **OSINT** | Inteligencia abierta | Google, Shodan, theHarvester |

### Plataformas de CTF

```
CTFtime - Calendario de CTFs
https://ctftime.org

PicoCTF - Ideal para empezar
https://picoctf.org

CTFlearn - Práctica permanente
https://ctflearn.com
```

---

## 💰 Bug Bounty

### ¿Qué es Bug Bounty?
Programas donde empresas pagan por encontrar vulnerabilidades en sus sistemas.

### Plataformas Principales

```
1. HackerOne
   https://hackerone.com
   ├── Miles de programas
   └── Bounties desde $50 hasta $100,000+

2. Bugcrowd
   https://bugcrowd.com
   ├── Muchos programas privados
   └── VRT (Vulnerability Rating Taxonomy)

3. Intigriti
   https://intigriti.com
   ├── Popular en Europa
   └── Buenos programas

4. YesWeHack
   https://yeswehack.com
   └── Plataforma europea
```

### Cómo Empezar

```
1. APRENDE primero
   └── No te lances sin conocimientos sólidos

2. Lee las reglas
   └── Cada programa tiene su "scope" y reglas

3. Empieza con programas de bajo tráfico
   └── Menos competencia

4. Documenta BIEN
   └── Un buen reporte aumenta tus bounties

5. Sé ético y profesional
   └── No exfiltres datos, no causes daño
```

### Vulnerabilidades Más Buscadas

```
💰💰💰💰💰 RCE (Remote Code Execution)
💰💰💰💰   SQL Injection
💰💰💰💰   SSRF
💰💰💰     Authentication Bypass
💰💰💰     IDOR
💰💰       XSS
💰💰       CSRF
💰         Information Disclosure
```

---

## 📋 Plan de Práctica Recomendado

### Mes 1-2: Fundamentos
```
Semana 1-2: TryHackMe "Pre Security" path
Semana 3-4: TryHackMe "Complete Beginner" path
Semana 5-6: OverTheWire Bandit (todos los niveles)
Semana 7-8: PicoCTF challenges básicos
```

### Mes 3-4: Web Hacking
```
Semana 1-4: PortSwigger Academy (SQL Injection, XSS)
Semana 5-6: DVWA (todas las vulnerabilidades)
Semana 7-8: TryHackMe "Web Fundamentals" path
```

### Mes 5-6: Pentesting
```
Semana 1-2: HackTheBox Easy machines (con writeups)
Semana 3-4: HackTheBox Easy machines (sin writeups)
Semana 5-6: TryHackMe "Jr Penetration Tester" path
Semana 7-8: VulnHub VMs
```

### Mes 7+: Especialización
```
├── Web: PortSwigger avanzado + Bug Bounty
├── Red Team: HackTheBox Pro Labs
├── CTF: Participar en CTFs de CTFtime
└── Certificaciones: eJPT, OSCP
```

---

## 🏋️ Ejercicios Prácticos AHORA

### Ejercicio 1: Tu Primera Máquina
```
1. Crea cuenta en TryHackMe
2. Completa la room "Tutorial"
3. Completa "Starting Out in Cyber Sec"
4. Completa "Intro to Offensive Security"
```

### Ejercicio 2: Web Security Básico
```
1. Ve a PortSwigger Web Security Academy
2. Completa el lab de SQL Injection básico
3. Completa el lab de XSS reflejado básico
4. Documenta lo aprendido
```

### Ejercicio 3: Monta Tu Lab
```
1. Instala VirtualBox
2. Descarga e instala Kali Linux
3. Descarga DVWA o Metasploitable 2
4. Configura red Host-Only
5. Verifica conectividad entre máquinas
```

---

## 📚 Recursos de Apoyo

### Writeups y Tutoriales
```
IppSec (YouTube) - Writeups de HTB
https://www.youtube.com/c/ippsec

0xdf - Blog con writeups
https://0xdf.gitlab.io

John Hammond - CTF y hacking
https://www.youtube.com/c/JohnHammond010
```

### Documentación
```
HackTricks - Wiki de técnicas
https://book.hacktricks.xyz

PayloadsAllTheThings - Payloads
https://github.com/swisskyrepo/PayloadsAllTheThings

GTFOBins - Escape de restricciones Linux
https://gtfobins.github.io
```

---

## 🎯 ¡Tu Turno!

```
╔════════════════════════════════════════════════════════════════╗
║                                                                 ║
║   1. Elige UNA plataforma (TryHackMe recomendado)              ║
║   2. Completa el path de principiante                          ║
║   3. Practica TODOS LOS DÍAS aunque sea 30 minutos             ║
║   4. Documenta lo que aprendes                                 ║
║   5. Únete a comunidades (Discord de HTB/THM)                  ║
║   6. ¡No te rindas!                                            ║
║                                                                 ║
║           El camino es largo pero VALE LA PENA 🚀              ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## ➡️ Recursos Adicionales

[Ver Lista Completa de Recursos →](../recursos/README.md)
