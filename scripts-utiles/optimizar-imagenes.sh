#!/bin/bash

###############################################################################
# SCRIPT DE OPTIMIZACIÓN DE IMÁGENES PARA LOWGIM24.COM
# 
# Este script automatiza la conversión y optimización de imágenes
# Requisitos: ImageMagick, cwebp, jpegoptim, optipng
###############################################################################

echo "🖼️  OPTIMIZADOR DE IMÁGENES PARA LOWGIM24.COM"
echo "=============================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar dependencias
check_dependencies() {
    echo "🔍 Verificando dependencias..."
    
    local missing_deps=0
    
    if ! command -v convert &> /dev/null; then
        echo -e "${RED}❌ ImageMagick no está instalado${NC}"
        echo "   Instalar: sudo apt install imagemagick"
        missing_deps=1
    fi
    
    if ! command -v cwebp &> /dev/null; then
        echo -e "${YELLOW}⚠️  cwebp no está instalado (conversión a WebP)${NC}"
        echo "   Instalar: sudo apt install webp"
        missing_deps=1
    fi
    
    if ! command -v jpegoptim &> /dev/null; then
        echo -e "${YELLOW}⚠️  jpegoptim no está instalado${NC}"
        echo "   Instalar: sudo apt install jpegoptim"
    fi
    
    if ! command -v optipng &> /dev/null; then
        echo -e "${YELLOW}⚠️  optipng no está instalado${NC}"
        echo "   Instalar: sudo apt install optipng"
    fi
    
    if [ $missing_deps -eq 1 ]; then
        echo ""
        echo -e "${RED}❌ Faltan dependencias críticas. Por favor, instálalas primero.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Todas las dependencias están instaladas${NC}"
    echo ""
}

# Función para optimizar JPG
optimize_jpg() {
    local file="$1"
    local filename=$(basename "$file")
    
    echo "📸 Optimizando JPG: $filename"
    
    # Backup
    cp "$file" "${file}.backup"
    
    # Optimizar con jpegoptim
    if command -v jpegoptim &> /dev/null; then
        jpegoptim --max=85 --strip-all "$file"
    else
        # Alternativa con ImageMagick
        convert "$file" -quality 85 -strip "$file"
    fi
    
    # Calcular ahorro
    local original_size=$(stat -f%z "${file}.backup" 2>/dev/null || stat -c%s "${file}.backup")
    local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local saved=$((original_size - new_size))
    local percent=$((saved * 100 / original_size))
    
    echo -e "   ${GREEN}✓ Ahorrado: $(numfmt --to=iec $saved) ($percent%)${NC}"
}

# Función para optimizar PNG
optimize_png() {
    local file="$1"
    local filename=$(basename "$file")
    
    echo "🎨 Optimizando PNG: $filename"
    
    # Backup
    cp "$file" "${file}.backup"
    
    # Optimizar con optipng
    if command -v optipng &> /dev/null; then
        optipng -o7 -strip all "$file" > /dev/null 2>&1
    else
        # Alternativa con ImageMagick
        convert "$file" -strip "$file"
    fi
    
    # Calcular ahorro
    local original_size=$(stat -f%z "${file}.backup" 2>/dev/null || stat -c%s "${file}.backup")
    local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local saved=$((original_size - new_size))
    local percent=$((saved * 100 / original_size))
    
    echo -e "   ${GREEN}✓ Ahorrado: $(numfmt --to=iec $saved) ($percent%)${NC}"
}

# Función para convertir a WebP
convert_to_webp() {
    local file="$1"
    local filename=$(basename "$file")
    local dirname=$(dirname "$file")
    local basename="${filename%.*}"
    local webp_file="${dirname}/${basename}.webp"
    
    echo "🌐 Convirtiendo a WebP: $filename"
    
    if command -v cwebp &> /dev/null; then
        cwebp -q 85 "$file" -o "$webp_file" > /dev/null 2>&1
        
        # Calcular ahorro
        local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file")
        local saved=$((original_size - webp_size))
        local percent=$((saved * 100 / original_size))
        
        echo -e "   ${GREEN}✓ WebP creado: $(numfmt --to=iec $webp_size) (ahorro: $percent%)${NC}"
    else
        echo -e "   ${RED}✗ cwebp no disponible${NC}"
    fi
}

# Función para crear versiones responsive
create_responsive_versions() {
    local file="$1"
    local filename=$(basename "$file")
    local dirname=$(dirname "$file")
    local basename="${filename%.*}"
    local extension="${filename##*.}"
    
    echo "📱 Creando versiones responsive: $filename"
    
    # Tamaños responsive
    local sizes=(320 640 768 1024 1280 1920)
    
    for size in "${sizes[@]}"; do
        local output="${dirname}/${basename}-${size}w.${extension}"
        convert "$file" -resize "${size}>" -strip "$output"
        echo "   ✓ Creado: ${basename}-${size}w.${extension}"
    done
}

# Función principal
main() {
    check_dependencies
    
    # Directorio a procesar (por defecto: directorio actual)
    local dir="${1:-.}"
    
    if [ ! -d "$dir" ]; then
        echo -e "${RED}❌ El directorio '$dir' no existe${NC}"
        exit 1
    fi
    
    echo "📂 Procesando directorio: $dir"
    echo ""
    
    # Preguntar qué hacer
    echo "¿Qué deseas hacer?"
    echo "1) Optimizar imágenes existentes"
    echo "2) Convertir a WebP"
    echo "3) Crear versiones responsive"
    echo "4) TODO (optimizar + WebP + responsive)"
    echo ""
    read -p "Selecciona una opción (1-4): " option
    
    echo ""
    
    # Contadores
    local jpg_count=0
    local png_count=0
    local webp_count=0
    
    # Procesar JPG
    for file in "$dir"/*.{jpg,jpeg,JPG,JPEG} 2>/dev/null; do
        [ -f "$file" ] || continue
        
        if [[ "$option" == "1" ]] || [[ "$option" == "4" ]]; then
            optimize_jpg "$file"
            ((jpg_count++))
        fi
        
        if [[ "$option" == "2" ]] || [[ "$option" == "4" ]]; then
            convert_to_webp "$file"
            ((webp_count++))
        fi
        
        if [[ "$option" == "3" ]] || [[ "$option" == "4" ]]; then
            create_responsive_versions "$file"
        fi
        
        echo ""
    done
    
    # Procesar PNG
    for file in "$dir"/*.{png,PNG} 2>/dev/null; do
        [ -f "$file" ] || continue
        
        if [[ "$option" == "1" ]] || [[ "$option" == "4" ]]; then
            optimize_png "$file"
            ((png_count++))
        fi
        
        if [[ "$option" == "2" ]] || [[ "$option" == "4" ]]; then
            convert_to_webp "$file"
            ((webp_count++))
        fi
        
        if [[ "$option" == "3" ]] || [[ "$option" == "4" ]]; then
            create_responsive_versions "$file"
        fi
        
        echo ""
    done
    
    # Resumen
    echo "=============================================="
    echo -e "${GREEN}✅ OPTIMIZACIÓN COMPLETADA${NC}"
    echo ""
    echo "📊 Resumen:"
    echo "   - JPG optimizados: $jpg_count"
    echo "   - PNG optimizados: $png_count"
    echo "   - WebP creados: $webp_count"
    echo ""
    echo "💡 Recuerda:"
    echo "   - Los archivos originales tienen extensión .backup"
    echo "   - Prueba las imágenes antes de eliminar los backups"
    echo "   - Usa <picture> en HTML para servir WebP con fallback"
    echo ""
    echo "Ejemplo de uso en HTML:"
    echo '<picture>'
    echo '  <source srcset="imagen.webp" type="image/webp">'
    echo '  <source srcset="imagen.jpg" type="image/jpeg">'
    echo '  <img src="imagen.jpg" alt="Descripción" loading="lazy">'
    echo '</picture>'
}

# Ejecutar script
main "$@"
