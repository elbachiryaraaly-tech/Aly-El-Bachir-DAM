# Ruta de Aprendizaje en Ciberseguridad

¡Bienvenido! Si quieres convertirte en un experto en ciberseguridad ("el más potente"), necesitas una base sólida y mucha práctica. Este roadmap te guiará paso a paso.

⚠️ **IMPORTANTE: ÉTICA Y LEGALIDAD** ⚠️
El conocimiento es poder, y un gran poder conlleva una gran responsabilidad.
*   **White Hat (Hacker Ético):** Usa sus habilidades para proteger sistemas, siempre con permiso.
*   **Black Hat:** Usa sus habilidades para fines maliciosos o ilegales. **NO HAGAS ESTO.**
*   **Gray Hat:** En medio, a veces actúa sin permiso pero sin mala intención.
**Regla de oro:** Nunca ataques un sistema que no sea tuyo o para el cual no tengas permiso explícito por escrito.

## Fase 1: Fundamentos (La Base)

Antes de "hackear", necesitas entender cómo funcionan las cosas.

### 1. Sistemas Operativos
*   **Linux:** Es el SO principal en ciberseguridad. Aprende a usar la terminal (bash).
    *   *Distribuciones recomendadas:* Kali Linux, Parrot OS, Ubuntu.
    *   *Comandos clave:* `ls`, `cd`, `grep`, `cat`, `chmod`, `chown`, `ps`, `top`.
*   **Windows:** Entender el registro, servicios, PowerShell y Active Directory.

### 2. Redes (Networking)
*   **Modelo OSI y TCP/IP:** Entiende cómo viajan los datos.
*   **Protocolos:** IP, TCP, UDP, DNS, HTTP, HTTPS, SSH, FTP, DHCP.
*   **Direccionamiento:** IPv4, IPv6, Subnetting, MAC Address.
*   **Herramientas:** Wireshark (análisis de paquetes), Nmap (escaneo de puertos).

### 3. Programación y Scripting
*   **Python:** El lenguaje más versátil para automatizar tareas y crear herramientas.
*   **Bash:** Para scripting en Linux.
*   **Powershell:** Para entornos Windows.
*   **C/C++:** Para entender cómo funciona la memoria (buffer overflows) y exploits de bajo nivel.
*   **Javascript/HTML/SQL:** Esencial para hacking web.

## Fase 2: Hacking Ético y Pentesting

Una vez tengas la base, empieza a aprender técnicas ofensivas (Red Team) y defensivas (Blue Team).

### 1. Reconocimiento (Information Gathering)
*   **OSINT (Open Source Intelligence):** Recopilar información pública.
*   **Google Dorking.**
*   **Herramientas:** theHarvester, Maltego, Shodan.

### 2. Escaneo y Enumeración
*   Descubrir puertos abiertos y servicios corriendo.
*   **Nmap:** La herramienta rey.
*   **Nikto:** Escáner de vulnerabilidades web básico.

### 3. Análisis de Vulnerabilidades
*   Identificar fallos de seguridad conocidos.
*   **Nessus, OpenVAS.**

### 4. Explotación
*   Aprovechar las vulnerabilidades para ganar acceso.
*   **Metasploit Framework:** La navaja suiza para exploits.
*   **SQL Injection, XSS (Cross-Site Scripting).**
*   **Fuerza Bruta (Hydra, John the Ripper).**

### 5. Post-Explotación
*   Mantener el acceso, escalar privilegios, borrar huellas.

## Fase 3: Especialización

*   **Seguridad Web:** OWASP Top 10, Burp Suite.
*   **Seguridad Móvil:** Android/iOS pentesting.
*   **Ingeniería Inversa y Malware Analysis:** Ghidra, IDA Pro.
*   **Criptografía.**
*   **Forense Digital.**
*   **Cloud Security (AWS, Azure).**

## Recursos Recomendados

*   **Plataformas de Práctica (CTFs y Laboratorios):**
    *   [TryHackMe](https://tryhackme.com/) (Ideal para principiantes)
    *   [Hack The Box](https://www.hackthebox.com/) (Más avanzado)
    *   [OverTheWire](https://overthewire.org/wargames/) (Para aprender Linux y seguridad básica)
    *   [PortSwigger Web Security Academy](https://portswigger.net/web-security) (Lo mejor para web)
*   **Certificaciones (Metas a futuro):**
    *   eJPT (Junior Penetration Tester)
    *   CompTIA Security+
    *   OSCP (Offensive Security Certified Professional - El estándar de oro práctico)

## Plan de Acción Inmediato

1.  Instala una máquina virtual con Linux (Ubuntu o Kali).
2.  Empieza el curso gratuito "Pre-Security" en TryHackMe.
3.  Aprende comandos básicos de Linux.
