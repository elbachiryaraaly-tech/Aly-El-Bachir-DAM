#!/bin/bash
#
# Script de Reconocimiento Básico
# ===============================
# Herramienta educativa para automatizar la fase de reconocimiento.
# Úsalo SOLO en dominios que tengas autorización para probar.
#
# Uso:
#   ./recon.sh <dominio>
#
# Ejemplo:
#   ./recon.sh example.com
#

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════╗"
    echo "║     SCRIPT DE RECONOCIMIENTO          ║"
    echo "║        Herramienta Educativa          ║"
    echo "╚═══════════════════════════════════════╝"
    echo -e "${NC}"
}

# Verificar argumentos
if [ -z "$1" ]; then
    banner
    echo -e "${RED}Error: Debes especificar un dominio${NC}"
    echo ""
    echo "Uso: ./recon.sh <dominio>"
    echo "Ejemplo: ./recon.sh example.com"
    exit 1
fi

TARGET=$1
OUTPUT_DIR="recon_${TARGET}_$(date +%Y%m%d_%H%M%S)"

banner

echo -e "${YELLOW}[*] Objetivo: ${TARGET}${NC}"
echo -e "${YELLOW}[*] Directorio de salida: ${OUTPUT_DIR}${NC}"
echo -e "${YELLOW}[*] Fecha: $(date)${NC}"
echo ""

# Crear directorio de salida
mkdir -p "$OUTPUT_DIR"

# Función para verificar si un comando existe
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}[-] $1 no está instalado${NC}"
        return 1
    fi
    return 0
}

# ─────────────────────────────────────────────────────────────
# 1. INFORMACIÓN BÁSICA
# ─────────────────────────────────────────────────────────────
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 1: Información Básica${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

# Ping
echo -e "${BLUE}[*] Probando conectividad...${NC}"
if ping -c 3 "$TARGET" > "$OUTPUT_DIR/ping.txt" 2>&1; then
    echo -e "${GREEN}[+] Host activo${NC}"
else
    echo -e "${YELLOW}[!] Ping bloqueado o host inactivo${NC}"
fi

# Host
echo -e "${BLUE}[*] Resolución DNS...${NC}"
if check_command host; then
    host "$TARGET" > "$OUTPUT_DIR/host.txt" 2>&1
    cat "$OUTPUT_DIR/host.txt"
fi

# ─────────────────────────────────────────────────────────────
# 2. WHOIS
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 2: WHOIS${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

if check_command whois; then
    echo -e "${BLUE}[*] Consultando WHOIS...${NC}"
    whois "$TARGET" > "$OUTPUT_DIR/whois.txt" 2>&1
    
    # Extraer información relevante
    echo -e "${YELLOW}Registrant:${NC}"
    grep -i "registrant" "$OUTPUT_DIR/whois.txt" | head -5
    
    echo -e "${YELLOW}Name Servers:${NC}"
    grep -i "name server" "$OUTPUT_DIR/whois.txt" | head -5
    
    echo -e "${GREEN}[+] Resultado completo guardado en whois.txt${NC}"
fi

# ─────────────────────────────────────────────────────────────
# 3. DNS RECORDS
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 3: Registros DNS${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

if check_command dig; then
    echo -e "${BLUE}[*] Consultando registros DNS...${NC}"
    
    {
        echo "=== Registros A ==="
        dig +short "$TARGET" A
        
        echo ""
        echo "=== Registros AAAA (IPv6) ==="
        dig +short "$TARGET" AAAA
        
        echo ""
        echo "=== Registros MX (Correo) ==="
        dig +short "$TARGET" MX
        
        echo ""
        echo "=== Registros NS (Name Servers) ==="
        dig +short "$TARGET" NS
        
        echo ""
        echo "=== Registros TXT ==="
        dig +short "$TARGET" TXT
        
        echo ""
        echo "=== Registros SOA ==="
        dig +short "$TARGET" SOA
        
    } > "$OUTPUT_DIR/dns_records.txt" 2>&1
    
    cat "$OUTPUT_DIR/dns_records.txt"
    echo -e "${GREEN}[+] Registros DNS guardados${NC}"
fi

# ─────────────────────────────────────────────────────────────
# 4. SUBDOMINIOS BÁSICOS
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 4: Subdominios Comunes${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

echo -e "${BLUE}[*] Buscando subdominios comunes...${NC}"

# Lista de subdominios comunes
SUBDOMAINS=(
    "www"
    "mail"
    "ftp"
    "admin"
    "webmail"
    "smtp"
    "pop"
    "ns1"
    "ns2"
    "dns"
    "api"
    "dev"
    "staging"
    "test"
    "portal"
    "vpn"
    "secure"
    "cdn"
    "img"
    "static"
    "blog"
    "shop"
    "store"
    "app"
    "m"
    "mobile"
)

> "$OUTPUT_DIR/subdomains.txt"

for sub in "${SUBDOMAINS[@]}"; do
    SUBDOMAIN="${sub}.${TARGET}"
    if host "$SUBDOMAIN" 2>/dev/null | grep -q "has address"; then
        IP=$(host "$SUBDOMAIN" 2>/dev/null | grep "has address" | head -1 | awk '{print $NF}')
        echo -e "${GREEN}[+] ${SUBDOMAIN} -> ${IP}${NC}"
        echo "${SUBDOMAIN} -> ${IP}" >> "$OUTPUT_DIR/subdomains.txt"
    fi
done

FOUND=$(wc -l < "$OUTPUT_DIR/subdomains.txt")
echo -e "${YELLOW}[*] Subdominios encontrados: ${FOUND}${NC}"

# ─────────────────────────────────────────────────────────────
# 5. HEADERS HTTP
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 5: Headers HTTP${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

if check_command curl; then
    echo -e "${BLUE}[*] Obteniendo headers HTTP...${NC}"
    
    # HTTP
    echo "=== HTTP (puerto 80) ===" > "$OUTPUT_DIR/headers.txt"
    curl -sI -m 10 "http://${TARGET}" >> "$OUTPUT_DIR/headers.txt" 2>&1
    
    echo "" >> "$OUTPUT_DIR/headers.txt"
    echo "=== HTTPS (puerto 443) ===" >> "$OUTPUT_DIR/headers.txt"
    curl -sI -m 10 "https://${TARGET}" >> "$OUTPUT_DIR/headers.txt" 2>&1
    
    cat "$OUTPUT_DIR/headers.txt"
    
    # Verificar headers de seguridad
    echo ""
    echo -e "${YELLOW}[*] Verificando headers de seguridad:${NC}"
    
    HEADERS_TO_CHECK=(
        "Strict-Transport-Security"
        "Content-Security-Policy"
        "X-Frame-Options"
        "X-Content-Type-Options"
        "X-XSS-Protection"
    )
    
    for header in "${HEADERS_TO_CHECK[@]}"; do
        if grep -qi "$header" "$OUTPUT_DIR/headers.txt"; then
            echo -e "${GREEN}    [✓] $header presente${NC}"
        else
            echo -e "${RED}    [✗] $header faltante${NC}"
        fi
    done
fi

# ─────────────────────────────────────────────────────────────
# 6. TECNOLOGÍAS WEB
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] FASE 6: Detección de Tecnologías${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

if check_command curl; then
    echo -e "${BLUE}[*] Analizando tecnologías...${NC}"
    
    # Obtener página principal
    curl -s -m 10 "https://${TARGET}" > "$OUTPUT_DIR/index.html" 2>/dev/null || \
    curl -s -m 10 "http://${TARGET}" > "$OUTPUT_DIR/index.html" 2>/dev/null
    
    if [ -s "$OUTPUT_DIR/index.html" ]; then
        echo -e "${YELLOW}[*] Buscando indicadores de tecnología:${NC}"
        
        # WordPress
        if grep -qi "wp-content\|wordpress" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] WordPress detectado${NC}"
        fi
        
        # Drupal
        if grep -qi "drupal" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] Drupal detectado${NC}"
        fi
        
        # Joomla
        if grep -qi "joomla" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] Joomla detectado${NC}"
        fi
        
        # React
        if grep -qi "react\|_react" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] React.js detectado${NC}"
        fi
        
        # Vue
        if grep -qi "vue\|__vue" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] Vue.js detectado${NC}"
        fi
        
        # Angular
        if grep -qi "ng-\|angular" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] Angular detectado${NC}"
        fi
        
        # jQuery
        if grep -qi "jquery" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] jQuery detectado${NC}"
        fi
        
        # Bootstrap
        if grep -qi "bootstrap" "$OUTPUT_DIR/index.html"; then
            echo -e "${GREEN}    [+] Bootstrap detectado${NC}"
        fi
    fi
fi

# ─────────────────────────────────────────────────────────────
# 7. RESUMEN
# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] RESUMEN${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

echo -e "${YELLOW}Objetivo:${NC} ${TARGET}"
echo -e "${YELLOW}Directorio de resultados:${NC} ${OUTPUT_DIR}"
echo ""
echo -e "${YELLOW}Archivos generados:${NC}"
ls -la "$OUTPUT_DIR"

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}[+] Reconocimiento completado${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"

# Crear archivo de resumen
{
    echo "RESUMEN DE RECONOCIMIENTO"
    echo "========================="
    echo "Objetivo: ${TARGET}"
    echo "Fecha: $(date)"
    echo ""
    echo "Archivos generados:"
    ls -la "$OUTPUT_DIR"
} > "$OUTPUT_DIR/RESUMEN.txt"

echo ""
echo -e "${BLUE}[*] Para un escaneo más completo, considera usar:${NC}"
echo "    - nmap -sV -sC ${TARGET}"
echo "    - nikto -h ${TARGET}"
echo "    - gobuster dir -u https://${TARGET} -w /usr/share/wordlists/common.txt"
echo ""
