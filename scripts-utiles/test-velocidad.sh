#!/bin/bash

###############################################################################
# SCRIPT DE TEST DE VELOCIDAD PARA LOWGIM24.COM
# 
# Este script realiza tests de rendimiento usando Lighthouse
# Requisitos: Node.js, npm
###############################################################################

echo "⚡ TEST DE VELOCIDAD - LOWGIM24.COM"
echo "===================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# URL a testear
URL="${1:-https://lowgim24.com}"

echo "🌐 URL a testear: $URL"
echo ""

# Verificar si lighthouse está instalado
if ! command -v lighthouse &> /dev/null; then
    echo -e "${YELLOW}⚠️  Lighthouse no está instalado${NC}"
    echo ""
    read -p "¿Deseas instalarlo ahora? (s/n): " install_choice
    
    if [[ "$install_choice" == "s" ]] || [[ "$install_choice" == "S" ]]; then
        echo "📦 Instalando Lighthouse..."
        npm install -g lighthouse
        echo ""
    else
        echo -e "${RED}❌ No se puede continuar sin Lighthouse${NC}"
        exit 1
    fi
fi

# Crear directorio de reportes
REPORT_DIR="./lighthouse-reports"
mkdir -p "$REPORT_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$REPORT_DIR/lowgim24_$TIMESTAMP"

echo "🚀 Ejecutando auditoría de Lighthouse..."
echo "   (Esto puede tardar 1-2 minutos)"
echo ""

# Ejecutar Lighthouse
lighthouse "$URL" \
    --output=html \
    --output=json \
    --output-path="$REPORT_FILE" \
    --chrome-flags="--headless" \
    --quiet

echo ""
echo -e "${GREEN}✅ Auditoría completada${NC}"
echo ""

# Leer resultados del JSON
JSON_FILE="${REPORT_FILE}.report.json"

if [ -f "$JSON_FILE" ]; then
    # Extraer puntuaciones usando grep y sed (fallback si no hay jq)
    if command -v jq &> /dev/null; then
        # Usar jq si está disponible
        PERFORMANCE=$(jq -r '.categories.performance.score * 100' "$JSON_FILE" | cut -d. -f1)
        ACCESSIBILITY=$(jq -r '.categories.accessibility.score * 100' "$JSON_FILE" | cut -d. -f1)
        BEST_PRACTICES=$(jq -r '.categories["best-practices"].score * 100' "$JSON_FILE" | cut -d. -f1)
        SEO=$(jq -r '.categories.seo.score * 100' "$JSON_FILE" | cut -d. -f1)
        
        FCP=$(jq -r '.audits["first-contentful-paint"].displayValue' "$JSON_FILE")
        LCP=$(jq -r '.audits["largest-contentful-paint"].displayValue' "$JSON_FILE")
        TBT=$(jq -r '.audits["total-blocking-time"].displayValue' "$JSON_FILE")
        CLS=$(jq -r '.audits["cumulative-layout-shift"].displayValue' "$JSON_FILE")
        SI=$(jq -r '.audits["speed-index"].displayValue' "$JSON_FILE")
    else
        echo -e "${YELLOW}⚠️  jq no está instalado. Instala con: sudo apt install jq${NC}"
        echo "   Para ver resultados detallados, abre el reporte HTML"
        PERFORMANCE="N/A"
        ACCESSIBILITY="N/A"
        BEST_PRACTICES="N/A"
        SEO="N/A"
    fi
    
    # Función para colorear puntuaciones
    colorize_score() {
        local score=$1
        if [[ "$score" == "N/A" ]]; then
            echo -e "${YELLOW}N/A${NC}"
        elif [ "$score" -ge 90 ]; then
            echo -e "${GREEN}$score${NC}"
        elif [ "$score" -ge 50 ]; then
            echo -e "${YELLOW}$score${NC}"
        else
            echo -e "${RED}$score${NC}"
        fi
    }
    
    echo "📊 RESULTADOS DE LA AUDITORÍA"
    echo "=============================="
    echo ""
    echo "Puntuaciones (0-100):"
    echo -e "   ⚡ Rendimiento:        $(colorize_score $PERFORMANCE)"
    echo -e "   ♿ Accesibilidad:      $(colorize_score $ACCESSIBILITY)"
    echo -e "   ✅ Mejores Prácticas: $(colorize_score $BEST_PRACTICES)"
    echo -e "   🔍 SEO:               $(colorize_score $SEO)"
    
    if [[ "$PERFORMANCE" != "N/A" ]]; then
        echo ""
        echo "Core Web Vitals:"
        echo "   🎨 First Contentful Paint (FCP):  $FCP"
        echo "   🖼️  Largest Contentful Paint (LCP): $LCP"
        echo "   ⏱️  Total Blocking Time (TBT):     $TBT"
        echo "   📐 Cumulative Layout Shift (CLS): $CLS"
        echo "   ⚡ Speed Index (SI):               $SI"
    fi
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Recomendaciones basadas en puntuaciones
    if [ "$PERFORMANCE" != "N/A" ] && [ "$PERFORMANCE" -lt 90 ]; then
        echo -e "${YELLOW}⚠️  RECOMENDACIONES DE RENDIMIENTO:${NC}"
        echo "   1. Optimizar imágenes (usar WebP)"
        echo "   2. Minimizar CSS/JS"
        echo "   3. Eliminar recursos bloqueantes"
        echo "   4. Implementar caché del navegador"
        echo "   5. Usar CDN para assets estáticos"
        echo ""
    fi
    
    if [ "$ACCESSIBILITY" != "N/A" ] && [ "$ACCESSIBILITY" -lt 90 ]; then
        echo -e "${YELLOW}⚠️  RECOMENDACIONES DE ACCESIBILIDAD:${NC}"
        echo "   1. Añadir texto alternativo a imágenes"
        echo "   2. Mejorar contraste de colores"
        echo "   3. Añadir labels ARIA"
        echo "   4. Asegurar navegación por teclado"
        echo ""
    fi
    
    if [ "$SEO" != "N/A" ] && [ "$SEO" -lt 90 ]; then
        echo -e "${YELLOW}⚠️  RECOMENDACIONES DE SEO:${NC}"
        echo "   1. Añadir meta description"
        echo "   2. Optimizar títulos de página"
        echo "   3. Implementar Schema.org markup"
        echo "   4. Mejorar estructura de enlaces internos"
        echo ""
    fi
fi

# Abrir reporte HTML
HTML_FILE="${REPORT_FILE}.report.html"
if [ -f "$HTML_FILE" ]; then
    echo "📄 Reporte guardado en: $HTML_FILE"
    echo ""
    read -p "¿Deseas abrir el reporte HTML? (s/n): " open_choice
    
    if [[ "$open_choice" == "s" ]] || [[ "$open_choice" == "S" ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "$HTML_FILE"
        elif command -v open &> /dev/null; then
            open "$HTML_FILE"
        else
            echo "No se pudo abrir automáticamente. Abre manualmente: $HTML_FILE"
        fi
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}💡 CONSEJO:${NC} Ejecuta este test regularmente para monitorear mejoras"
echo ""

# Comparar con test anterior si existe
PREVIOUS_REPORTS=$(ls -t "$REPORT_DIR"/*.report.json 2>/dev/null | tail -n +2 | head -n 1)

if [ -n "$PREVIOUS_REPORTS" ] && command -v jq &> /dev/null; then
    echo "📊 Comparación con test anterior:"
    
    PREV_PERF=$(jq -r '.categories.performance.score * 100' "$PREVIOUS_REPORTS" | cut -d. -f1)
    DIFF=$((PERFORMANCE - PREV_PERF))
    
    if [ "$DIFF" -gt 0 ]; then
        echo -e "   Rendimiento: ${GREEN}+$DIFF puntos${NC} 📈"
    elif [ "$DIFF" -lt 0 ]; then
        echo -e "   Rendimiento: ${RED}$DIFF puntos${NC} 📉"
    else
        echo "   Rendimiento: Sin cambios"
    fi
    echo ""
fi

echo -e "${GREEN}✅ Test completado exitosamente${NC}"
