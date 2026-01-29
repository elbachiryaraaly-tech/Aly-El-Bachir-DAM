#!/usr/bin/env python3
"""
Web Security Headers Scanner
============================
Analiza los headers de seguridad de un sitio web.
Herramienta educativa para aprender sobre seguridad web.

Uso:
    python web_header_scanner.py <url>
    
Ejemplo:
    python web_header_scanner.py https://example.com
"""

import sys
import ssl
import urllib.request
import urllib.error
from datetime import datetime


# Headers de seguridad importantes
SECURITY_HEADERS = {
    'Strict-Transport-Security': {
        'description': 'Fuerza conexiones HTTPS',
        'recommended': 'max-age=31536000; includeSubDomains',
        'severity': 'ALTO'
    },
    'Content-Security-Policy': {
        'description': 'Previene XSS y otras inyecciones',
        'recommended': "default-src 'self'",
        'severity': 'ALTO'
    },
    'X-Frame-Options': {
        'description': 'Previene clickjacking',
        'recommended': 'DENY o SAMEORIGIN',
        'severity': 'MEDIO'
    },
    'X-Content-Type-Options': {
        'description': 'Previene MIME type sniffing',
        'recommended': 'nosniff',
        'severity': 'MEDIO'
    },
    'X-XSS-Protection': {
        'description': 'Filtro XSS del navegador (deprecado)',
        'recommended': '1; mode=block',
        'severity': 'BAJO'
    },
    'Referrer-Policy': {
        'description': 'Controla información del referrer',
        'recommended': 'strict-origin-when-cross-origin',
        'severity': 'MEDIO'
    },
    'Permissions-Policy': {
        'description': 'Controla APIs del navegador',
        'recommended': 'geolocation=(), microphone=()',
        'severity': 'MEDIO'
    },
    'Cross-Origin-Opener-Policy': {
        'description': 'Aísla contexto de navegación',
        'recommended': 'same-origin',
        'severity': 'MEDIO'
    },
    'Cross-Origin-Resource-Policy': {
        'description': 'Previene carga de recursos cross-origin',
        'recommended': 'same-origin',
        'severity': 'MEDIO'
    },
    'Cross-Origin-Embedder-Policy': {
        'description': 'Requiere CORP para recursos embebidos',
        'recommended': 'require-corp',
        'severity': 'MEDIO'
    }
}

# Headers que revelan información sensible
INFORMATION_HEADERS = [
    'Server',
    'X-Powered-By',
    'X-AspNet-Version',
    'X-AspNetMvc-Version',
    'X-Generator'
]


def banner():
    print("""
    ╔═══════════════════════════════════════╗
    ║   WEB SECURITY HEADERS SCANNER        ║
    ║      Herramienta Educativa            ║
    ╚═══════════════════════════════════════╝
    """)


def get_headers(url):
    """Obtiene los headers HTTP de una URL"""
    try:
        # Crear contexto SSL que no verifica certificados (solo para pruebas)
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        request = urllib.request.Request(
            url,
            headers={'User-Agent': 'SecurityHeaderScanner/1.0'}
        )
        
        response = urllib.request.urlopen(request, timeout=10, context=ctx)
        return dict(response.headers), response.status
        
    except urllib.error.HTTPError as e:
        return dict(e.headers), e.code
    except urllib.error.URLError as e:
        print(f"[-] Error de conexión: {e.reason}")
        return None, None
    except Exception as e:
        print(f"[-] Error: {e}")
        return None, None


def analyze_headers(headers):
    """Analiza los headers de seguridad"""
    results = {
        'present': [],
        'missing': [],
        'info_disclosure': []
    }
    
    # Verificar headers de seguridad
    for header, info in SECURITY_HEADERS.items():
        header_lower = header.lower()
        found = False
        
        for h in headers:
            if h.lower() == header_lower:
                found = True
                results['present'].append({
                    'header': header,
                    'value': headers[h],
                    'info': info
                })
                break
        
        if not found:
            results['missing'].append({
                'header': header,
                'info': info
            })
    
    # Verificar información revelada
    for header in INFORMATION_HEADERS:
        header_lower = header.lower()
        for h in headers:
            if h.lower() == header_lower:
                results['info_disclosure'].append({
                    'header': header,
                    'value': headers[h]
                })
                break
    
    return results


def calculate_score(results):
    """Calcula una puntuación de seguridad"""
    total = len(SECURITY_HEADERS)
    present = len(results['present'])
    info_penalty = len(results['info_disclosure']) * 5
    
    score = (present / total) * 100 - info_penalty
    return max(0, min(100, score))


def print_results(url, headers, status, results):
    """Imprime los resultados del análisis"""
    score = calculate_score(results)
    
    print(f"\n{'='*60}")
    print(f"URL: {url}")
    print(f"Estado HTTP: {status}")
    print(f"Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")
    
    # Puntuación
    print(f"\n📊 PUNTUACIÓN DE SEGURIDAD: {score:.0f}/100")
    if score >= 80:
        print("   Estado: ✅ BUENO")
    elif score >= 50:
        print("   Estado: ⚠️  MEJORABLE")
    else:
        print("   Estado: ❌ INSUFICIENTE")
    
    # Headers presentes
    print(f"\n{'─'*60}")
    print("✅ HEADERS DE SEGURIDAD PRESENTES")
    print(f"{'─'*60}")
    
    if results['present']:
        for item in results['present']:
            print(f"\n  [{item['info']['severity']}] {item['header']}")
            print(f"      Valor: {item['value'][:70]}...")
            print(f"      Descripción: {item['info']['description']}")
    else:
        print("  ¡Ninguno encontrado!")
    
    # Headers faltantes
    print(f"\n{'─'*60}")
    print("❌ HEADERS DE SEGURIDAD FALTANTES")
    print(f"{'─'*60}")
    
    if results['missing']:
        for item in results['missing']:
            print(f"\n  [{item['info']['severity']}] {item['header']}")
            print(f"      Descripción: {item['info']['description']}")
            print(f"      Recomendado: {item['info']['recommended']}")
    else:
        print("  ¡Todos los headers están presentes!")
    
    # Divulgación de información
    if results['info_disclosure']:
        print(f"\n{'─'*60}")
        print("⚠️  DIVULGACIÓN DE INFORMACIÓN")
        print(f"{'─'*60}")
        
        for item in results['info_disclosure']:
            print(f"\n  {item['header']}: {item['value']}")
            print("      Recomendación: Ocultar este header")
    
    # Todos los headers
    print(f"\n{'─'*60}")
    print("📋 TODOS LOS HEADERS RECIBIDOS")
    print(f"{'─'*60}")
    
    for header, value in sorted(headers.items()):
        print(f"  {header}: {value[:60]}{'...' if len(value) > 60 else ''}")
    
    # Recomendaciones
    print(f"\n{'='*60}")
    print("💡 RECOMENDACIONES")
    print(f"{'='*60}")
    
    high_missing = [m for m in results['missing'] if m['info']['severity'] == 'ALTO']
    if high_missing:
        print("\n  PRIORIDAD ALTA:")
        for item in high_missing:
            print(f"    • Implementar {item['header']}")
    
    if results['info_disclosure']:
        print("\n  PRIORIDAD MEDIA:")
        for item in results['info_disclosure']:
            print(f"    • Ocultar header '{item['header']}'")
    
    print("\n")


def main():
    banner()
    
    if len(sys.argv) != 2:
        print("Uso: python web_header_scanner.py <url>")
        print("\nEjemplo:")
        print("  python web_header_scanner.py https://example.com")
        sys.exit(1)
    
    url = sys.argv[1]
    
    # Asegurar que tenga esquema
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    print(f"[*] Analizando: {url}")
    print("[*] Obteniendo headers...")
    
    headers, status = get_headers(url)
    
    if headers is None:
        print("[-] No se pudo obtener los headers")
        sys.exit(1)
    
    print("[*] Analizando headers de seguridad...")
    results = analyze_headers(headers)
    
    print_results(url, headers, status, results)


if __name__ == "__main__":
    main()
