#!/bin/bash

# Script para iniciar el servidor y mostrar IPs disponibles

echo ""
echo "🚀 Iniciando servidor de rastreo de ubicación..."
echo ""

# Encontrar y mostrar IPs
./scripts/find-ip.sh

echo ""
echo "⏳ Iniciando servidor en 3 segundos..."
sleep 3

# Iniciar servidor
npm start
