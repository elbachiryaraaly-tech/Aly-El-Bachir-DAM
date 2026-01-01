#!/bin/bash

# Script para encontrar la IP local del sistema
# Útil para conectar dispositivos en la misma red

echo "═══════════════════════════════════════════════════"
echo "  🌐 Buscando tu IP local para conectar dispositivos"
echo "═══════════════════════════════════════════════════"
echo ""

# Detectar sistema operativo
OS="$(uname -s)"

case "$OS" in
    Linux*)
        echo "Sistema: Linux"
        echo ""
        echo "📍 IPs disponibles:"
        echo ""
        ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | while read ip; do
            echo "   → http://$ip:3000"
        done
        ;;
    Darwin*)
        echo "Sistema: macOS"
        echo ""
        echo "📍 IPs disponibles:"
        echo ""
        ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | while read ip; do
            echo "   → http://$ip:3000"
        done
        ;;
    *)
        echo "Sistema: $OS"
        echo ""
        echo "Usa este comando para encontrar tu IP:"
        echo "  Linux: ip addr show"
        echo "  Mac: ifconfig"
        echo "  Windows: ipconfig"
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════"
echo "  📱 Abre esas URLs en tus dispositivos móviles"
echo "  💡 Asegúrate de estar en la misma red WiFi"
echo "═══════════════════════════════════════════════════"
