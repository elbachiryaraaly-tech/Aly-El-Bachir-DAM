#!/bin/bash
#
# Script de Configuración Inicial de Kali Linux
# =============================================
# Ejecuta este script para configurar tu Kali Linux
# con todas las herramientas necesarias para empezar.
#
# Uso:
#   chmod +x configurar_kali.sh
#   sudo ./configurar_kali.sh
#

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Banner
clear
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════╗"
echo "║   CONFIGURACIÓN INICIAL DE KALI LINUX             ║"
echo "║   Para Aprendizaje de Hacking Ético               ║"
echo "╚═══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar si es root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[!] Este script debe ejecutarse como root${NC}"
    echo "    Usa: sudo ./configurar_kali.sh"
    exit 1
fi

echo -e "${YELLOW}[*] Este script instalará y configurará herramientas esenciales${NC}"
echo ""
read -p "¿Deseas continuar? (s/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Instalación cancelada."
    exit 0
fi

# ═══════════════════════════════════════════════════════════
# PASO 1: Actualizar el sistema
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[1/7] Actualizando el sistema...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

apt update && apt upgrade -y
apt autoremove -y

# ═══════════════════════════════════════════════════════════
# PASO 2: Instalar herramientas esenciales
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[2/7] Instalando herramientas esenciales...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

apt install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    tmux \
    htop \
    tree \
    net-tools \
    dnsutils \
    whois \
    traceroute \
    tcpdump

echo -e "${GREEN}[+] Herramientas básicas instaladas${NC}"

# ═══════════════════════════════════════════════════════════
# PASO 3: Instalar herramientas de hacking
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[3/7] Instalando herramientas de hacking...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

apt install -y \
    nmap \
    nikto \
    dirb \
    gobuster \
    sqlmap \
    hydra \
    john \
    hashcat \
    wireshark \
    burpsuite \
    metasploit-framework \
    exploitdb \
    seclists \
    wordlists

echo -e "${GREEN}[+] Herramientas de hacking instaladas${NC}"

# ═══════════════════════════════════════════════════════════
# PASO 4: Instalar Python y librerías
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[4/7] Configurando Python...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

apt install -y \
    python3 \
    python3-pip \
    python3-venv

# Instalar librerías de Python para hacking
pip3 install --break-system-packages \
    requests \
    beautifulsoup4 \
    scapy \
    pwntools \
    impacket \
    paramiko \
    python-nmap \
    colorama

echo -e "${GREEN}[+] Python configurado${NC}"

# ═══════════════════════════════════════════════════════════
# PASO 5: Instalar Docker
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[5/7] Instalando Docker...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

apt install -y docker.io docker-compose
systemctl enable docker
systemctl start docker

# Añadir usuario kali al grupo docker
usermod -aG docker kali

echo -e "${GREEN}[+] Docker instalado${NC}"

# ═══════════════════════════════════════════════════════════
# PASO 6: Configurar estructura de carpetas
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[6/7] Creando estructura de carpetas...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

# Crear carpetas para el usuario kali
sudo -u kali mkdir -p /home/kali/hacking/{reconocimiento,explotacion,post-explotacion,reportes,scripts,notas,ctf,laboratorios}

# Crear archivos README en cada carpeta
sudo -u kali bash -c 'echo "# Reconocimiento
Guarda aquí resultados de nmap, whois, etc." > /home/kali/hacking/reconocimiento/README.md'

sudo -u kali bash -c 'echo "# Explotación
Guarda aquí exploits y payloads" > /home/kali/hacking/explotacion/README.md'

sudo -u kali bash -c 'echo "# Post-Explotación
Guarda aquí evidencia de acceso, screenshots, etc." > /home/kali/hacking/post-explotacion/README.md'

sudo -u kali bash -c 'echo "# Reportes
Guarda aquí tus reportes de pentesting" > /home/kali/hacking/reportes/README.md'

sudo -u kali bash -c 'echo "# Scripts
Guarda aquí tus scripts personalizados" > /home/kali/hacking/scripts/README.md'

sudo -u kali bash -c 'echo "# Notas
Guarda aquí tus notas de aprendizaje" > /home/kali/hacking/notas/README.md'

sudo -u kali bash -c 'echo "# CTF
Guarda aquí writeups de CTFs" > /home/kali/hacking/ctf/README.md'

sudo -u kali bash -c 'echo "# Laboratorios
Guarda aquí configuraciones de labs" > /home/kali/hacking/laboratorios/README.md'

echo -e "${GREEN}[+] Estructura de carpetas creada${NC}"

# ═══════════════════════════════════════════════════════════
# PASO 7: Descargar wordlists adicionales
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[7/7] Configurando wordlists...${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

# Descomprimir rockyou si está comprimido
if [ -f /usr/share/wordlists/rockyou.txt.gz ]; then
    gunzip /usr/share/wordlists/rockyou.txt.gz
    echo -e "${GREEN}[+] rockyou.txt descomprimido${NC}"
fi

# Crear enlace simbólico para fácil acceso
ln -sf /usr/share/wordlists /home/kali/wordlists 2>/dev/null

echo -e "${GREEN}[+] Wordlists configuradas${NC}"

# ═══════════════════════════════════════════════════════════
# RESUMEN FINAL
# ═══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${BLUE}             INSTALACIÓN COMPLETADA                 ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✓ Sistema actualizado${NC}"
echo -e "${GREEN}✓ Herramientas esenciales instaladas${NC}"
echo -e "${GREEN}✓ Herramientas de hacking instaladas${NC}"
echo -e "${GREEN}✓ Python y librerías configuradas${NC}"
echo -e "${GREEN}✓ Docker instalado${NC}"
echo -e "${GREEN}✓ Estructura de carpetas creada${NC}"
echo -e "${GREEN}✓ Wordlists configuradas${NC}"
echo ""
echo -e "${YELLOW}Estructura de carpetas creada en /home/kali/hacking/:${NC}"
echo "├── reconocimiento/"
echo "├── explotacion/"
echo "├── post-explotacion/"
echo "├── reportes/"
echo "├── scripts/"
echo "├── notas/"
echo "├── ctf/"
echo "└── laboratorios/"
echo ""
echo -e "${YELLOW}Próximos pasos:${NC}"
echo "1. Reinicia el sistema: sudo reboot"
echo "2. Abre terminal y ve a: cd ~/hacking"
echo "3. Empieza a practicar con: nmap scanme.nmap.org"
echo ""
echo -e "${BLUE}¡Feliz hacking ético!${NC}"
echo ""
