/**
 * Script para generar iconos PNG a partir del SVG
 * Requiere: npm install sharp
 * 
 * Uso: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Intentar usar sharp si está disponible
async function generateIcons() {
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    const iconsDir = path.join(__dirname, 'public', 'icons');
    const svgPath = path.join(iconsDir, 'icon.svg');
    
    // Verificar que existe el SVG
    if (!fs.existsSync(svgPath)) {
        console.error('Error: No se encontró el archivo SVG en', svgPath);
        process.exit(1);
    }
    
    try {
        // Intentar cargar sharp
        const sharp = require('sharp');
        
        console.log('Generando iconos PNG...\n');
        
        for (const size of sizes) {
            const outputPath = path.join(iconsDir, `icon-${size}.png`);
            
            await sharp(svgPath)
                .resize(size, size)
                .png()
                .toFile(outputPath);
            
            console.log(`✓ Generado: icon-${size}.png`);
        }
        
        console.log('\n¡Iconos generados correctamente!');
        
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.log('Sharp no está instalado. Instalando...\n');
            
            const { execSync } = require('child_process');
            try {
                execSync('npm install sharp', { stdio: 'inherit' });
                console.log('\nSharp instalado. Ejecuta este script de nuevo.\n');
            } catch (installError) {
                console.error('Error al instalar sharp:', installError.message);
                console.log('\nPuedes generar los iconos manualmente usando un editor de imágenes');
                console.log('o una herramienta online como https://realfavicongenerator.net/');
            }
        } else {
            console.error('Error:', error.message);
        }
    }
}

generateIcons();
