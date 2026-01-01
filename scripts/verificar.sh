#!/bin/bash

# Script de verificación del sistema de rastreo

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🔍 VERIFICACIÓN DEL SISTEMA DE RASTREO DE UBICACIÓN          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

# Función para mostrar éxito
success() {
    echo "  ✅ $1"
}

# Función para mostrar error
error() {
    echo "  ❌ $1"
    ERRORS=$((ERRORS + 1))
}

# Función para mostrar advertencia
warning() {
    echo "  ⚠️  $1"
    WARNINGS=$((WARNINGS + 1))
}

echo "📋 Verificando requisitos del sistema..."
echo ""

# Verificar Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js instalado: $NODE_VERSION"
    
    # Verificar versión mínima (v16)
    NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 16 ]; then
        success "Versión de Node.js compatible (>= v16)"
    else
        warning "Versión de Node.js antigua. Recomendado v16 o superior"
    fi
else
    error "Node.js no encontrado. Instálalo desde https://nodejs.org"
fi

# Verificar npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    success "npm instalado: v$NPM_VERSION"
else
    error "npm no encontrado"
fi

echo ""
echo "📁 Verificando estructura del proyecto..."
echo ""

# Verificar archivos principales
FILES=(
    "server/index.js"
    "public/index.html"
    "public/app.js"
    "public/styles.css"
    "package.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        success "Archivo encontrado: $file"
    else
        error "Archivo faltante: $file"
    fi
done

# Verificar directorios
DIRS=(
    "server"
    "public"
    "data"
    "scripts"
)

for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        success "Directorio encontrado: $dir"
    else
        error "Directorio faltante: $dir"
    fi
done

echo ""
echo "📦 Verificando dependencias..."
echo ""

# Verificar node_modules
if [ -d "node_modules" ]; then
    success "Directorio node_modules existe"
    
    # Verificar dependencias específicas
    DEPS=("express" "socket.io" "uuid" "cors")
    for dep in "${DEPS[@]}"; do
        if [ -d "node_modules/$dep" ]; then
            success "Dependencia instalada: $dep"
        else
            error "Dependencia faltante: $dep"
        fi
    done
else
    error "node_modules no encontrado. Ejecuta: npm install"
fi

echo ""
echo "🔧 Verificando configuración..."
echo ""

# Verificar puerto disponible
PORT=3000
if command -v lsof &> /dev/null; then
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        warning "Puerto $PORT ya en uso. El servidor podría no iniciar."
    else
        success "Puerto $PORT disponible"
    fi
else
    warning "No se pudo verificar disponibilidad del puerto (lsof no disponible)"
fi

# Verificar permisos de scripts
if [ -x "scripts/find-ip.sh" ]; then
    success "Scripts tienen permisos de ejecución"
else
    warning "Scripts no ejecutables. Ejecuta: chmod +x scripts/*.sh"
fi

echo ""
echo "📚 Verificando documentación..."
echo ""

DOCS=(
    "README.md"
    "GUIA_RAPIDA.md"
    "DOCUMENTACION_TECNICA.md"
    "INSTRUCCIONES_MOVIL.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        success "Documentación: $doc"
    else
        warning "Documentación faltante: $doc"
    fi
done

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  📊 RESUMEN DE VERIFICACIÓN                                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "  🎉 ¡TODO PERFECTO! El sistema está listo para usar."
    echo ""
    echo "  Para iniciar:"
    echo "    $ npm start"
    echo ""
elif [ $ERRORS -eq 0 ]; then
    echo "  ✅ Sistema funcional con $WARNINGS advertencia(s) menor(es)"
    echo ""
    echo "  Puedes iniciar el servidor:"
    echo "    $ npm start"
    echo ""
else
    echo "  ❌ Se encontraron $ERRORS error(es) y $WARNINGS advertencia(s)"
    echo ""
    echo "  Soluciones comunes:"
    echo "    - Instala dependencias: npm install"
    echo "    - Verifica Node.js: node -v (debe ser >= v16)"
    echo "    - Haz scripts ejecutables: chmod +x scripts/*.sh"
    echo ""
fi

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  💡 PRÓXIMOS PASOS                                            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "  1. Instalar dependencias (si no lo hiciste):"
echo "     $ npm install"
echo ""
echo "  2. Iniciar el servidor:"
echo "     $ npm start"
echo ""
echo "  3. Abrir en navegador:"
echo "     → Ordenador: http://localhost:3000"
echo "     → Móvil: http://[TU-IP]:3000"
echo ""
echo "  4. Encontrar tu IP local:"
echo "     $ ./scripts/find-ip.sh"
echo ""
echo "  5. Leer la guía rápida:"
echo "     $ cat GUIA_RAPIDA.md"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo ""
