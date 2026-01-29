#!/usr/bin/env python3
"""
Directory Buster Básico
=======================
Herramienta educativa para descubrir directorios y archivos ocultos.
Úsala SOLO en sistemas donde tengas autorización.

Uso:
    python dir_buster.py <url_base> [wordlist]
    
Ejemplo:
    python dir_buster.py http://localhost
    python dir_buster.py http://localhost /usr/share/wordlists/dirb/common.txt
"""

import requests
import sys
import threading
from queue import Queue
from urllib.parse import urljoin
import urllib3
from datetime import datetime

# Desactivar warnings de SSL
urllib3.disable_warnings()


def banner():
    print("""
    ╔═══════════════════════════════════════════════════╗
    ║           DIRECTORY BUSTER                        ║
    ║          Herramienta Educativa                    ║
    ╚═══════════════════════════════════════════════════╝
    """)


# Wordlist básica integrada
DEFAULT_WORDLIST = [
    # Directorios comunes
    "admin", "administrator", "login", "wp-admin", "wp-login",
    "dashboard", "panel", "cpanel", "webmail", "mail",
    "api", "v1", "v2", "graphql", "rest",
    "backup", "backups", "bak", "old", "temp", "tmp",
    "test", "testing", "dev", "development", "staging",
    "uploads", "upload", "files", "images", "img", "assets",
    "static", "css", "js", "javascript", "fonts",
    "includes", "include", "inc", "lib", "libs", "vendor",
    "src", "source", "app", "application", "core",
    "config", "conf", "configuration", "settings",
    "data", "database", "db", "sql", "mysql",
    "logs", "log", "debug", "error", "errors",
    "private", "public", "secret", "secrets", "hidden",
    "cgi-bin", "cgi", "bin", "scripts", "script",
    "phpmyadmin", "pma", "myadmin", "mysql", "adminer",
    ".git", ".svn", ".htaccess", ".htpasswd", ".env",
    "robots.txt", "sitemap.xml", "crossdomain.xml",
    "readme", "readme.txt", "readme.md", "readme.html",
    "license", "license.txt", "changelog", "changelog.txt",
    "install", "setup", "installer", "installation",
    "user", "users", "account", "accounts", "profile",
    "register", "signup", "signin", "logout", "logoff",
    "download", "downloads", "export", "import",
    "report", "reports", "stats", "statistics", "analytics",
    "search", "find", "query", "filter",
    "help", "faq", "support", "contact", "about",
    "news", "blog", "posts", "articles", "content",
    "shop", "store", "cart", "checkout", "payment",
    "order", "orders", "invoice", "invoices",
    
    # Archivos comunes
    "index.php", "index.html", "index.htm", "default.php",
    "home.php", "main.php", "login.php", "admin.php",
    "config.php", "configuration.php", "settings.php",
    "wp-config.php", "wp-config.php.bak", "wp-config.php.old",
    "database.php", "db.php", "connect.php", "connection.php",
    ".env", ".env.local", ".env.production", ".env.backup",
    "info.php", "phpinfo.php", "test.php", "debug.php",
    "shell.php", "cmd.php", "c99.php", "r57.php",
    "backup.sql", "database.sql", "dump.sql", "db.sql",
    "backup.zip", "backup.tar.gz", "site.zip", "www.zip",
    "error_log", "error.log", "debug.log", "access.log",
    "composer.json", "package.json", "Gemfile", "requirements.txt",
    ".gitignore", ".dockerignore", "Dockerfile", "docker-compose.yml",
    "server-status", "server-info",
]

# Extensiones para probar
EXTENSIONS = ["", ".php", ".html", ".txt", ".bak", ".old", ".zip", ".tar.gz"]


class DirBuster:
    def __init__(self, target, wordlist, threads=10, extensions=None):
        self.target = target.rstrip('/')
        self.wordlist = wordlist
        self.threads = threads
        self.extensions = extensions or [""]
        self.queue = Queue()
        self.found = []
        self.lock = threading.Lock()
        self.total_requests = 0
        self.completed = 0
        
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0'
        }
    
    def load_wordlist(self):
        """Carga la wordlist"""
        words = []
        
        if isinstance(self.wordlist, list):
            words = self.wordlist
        else:
            try:
                with open(self.wordlist, 'r', encoding='utf-8', errors='ignore') as f:
                    words = [line.strip() for line in f if line.strip()]
            except FileNotFoundError:
                print(f"[-] Wordlist no encontrada: {self.wordlist}")
                print("[*] Usando wordlist por defecto")
                words = DEFAULT_WORDLIST
        
        # Añadir extensiones
        final_words = []
        for word in words:
            for ext in self.extensions:
                if ext and not word.endswith(ext):
                    final_words.append(word + ext)
                elif not ext:
                    final_words.append(word)
        
        return list(set(final_words))  # Eliminar duplicados
    
    def check_url(self, path):
        """Verifica si una URL existe"""
        url = urljoin(self.target + '/', path)
        
        try:
            response = requests.get(
                url,
                headers=self.headers,
                timeout=5,
                verify=False,
                allow_redirects=False
            )
            
            return response.status_code, len(response.content), url
        except Exception:
            return None, 0, url
    
    def worker(self):
        """Worker thread para probar URLs"""
        while True:
            path = self.queue.get()
            if path is None:
                break
            
            status, size, url = self.check_url(path)
            
            with self.lock:
                self.completed += 1
                progress = (self.completed / self.total_requests) * 100
                
                # Mostrar progreso
                sys.stdout.write(f"\r[*] Progreso: {self.completed}/{self.total_requests} ({progress:.1f}%) ")
                sys.stdout.flush()
                
                # Guardar resultados interesantes
                if status and status not in [404]:
                    result = {
                        'url': url,
                        'status': status,
                        'size': size,
                        'path': path
                    }
                    self.found.append(result)
                    
                    # Colorear según status
                    if status == 200:
                        color = '\033[92m'  # Verde
                    elif status in [301, 302, 303, 307, 308]:
                        color = '\033[93m'  # Amarillo
                    elif status == 403:
                        color = '\033[91m'  # Rojo
                    else:
                        color = '\033[0m'   # Normal
                    
                    print(f"\n{color}[+] {status} - {url} ({size} bytes)\033[0m")
            
            self.queue.task_done()
    
    def run(self):
        """Ejecuta el escaneo"""
        print(f"[*] Objetivo: {self.target}")
        print(f"[*] Threads: {self.threads}")
        print(f"[*] Cargando wordlist...")
        
        words = self.load_wordlist()
        self.total_requests = len(words)
        
        print(f"[*] Palabras a probar: {self.total_requests}")
        print(f"[*] Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 60)
        
        # Verificar que el objetivo responde
        try:
            response = requests.get(self.target, headers=self.headers, timeout=10, verify=False)
            print(f"[*] Objetivo responde: {response.status_code}")
        except Exception as e:
            print(f"[-] Error conectando al objetivo: {e}")
            return
        
        print("-" * 60)
        print("[*] Iniciando escaneo...\n")
        
        # Crear threads
        threads = []
        for _ in range(self.threads):
            t = threading.Thread(target=self.worker)
            t.daemon = True
            t.start()
            threads.append(t)
        
        # Añadir palabras a la cola
        for word in words:
            self.queue.put(word)
        
        # Esperar a que termine
        self.queue.join()
        
        # Detener threads
        for _ in range(self.threads):
            self.queue.put(None)
        
        for t in threads:
            t.join()
        
        # Resumen
        self.print_summary()
    
    def print_summary(self):
        """Imprime resumen de resultados"""
        print("\n")
        print("=" * 60)
        print("RESUMEN DE RESULTADOS")
        print("=" * 60)
        
        if not self.found:
            print("\n[-] No se encontraron recursos")
            return
        
        # Agrupar por status
        by_status = {}
        for item in self.found:
            status = item['status']
            if status not in by_status:
                by_status[status] = []
            by_status[status].append(item)
        
        print(f"\n[+] Total encontrados: {len(self.found)}")
        
        # Mostrar por categoría
        status_names = {
            200: "OK (Accesibles)",
            301: "Redirección Permanente",
            302: "Redirección Temporal",
            403: "Forbidden (Protegidos)",
            401: "Requiere Autenticación",
            500: "Error del Servidor"
        }
        
        for status in sorted(by_status.keys()):
            items = by_status[status]
            name = status_names.get(status, f"Status {status}")
            
            print(f"\n{'─' * 50}")
            print(f"[{status}] {name} ({len(items)} encontrados)")
            print(f"{'─' * 50}")
            
            for item in items:
                print(f"    {item['url']} ({item['size']} bytes)")
        
        # Destacar hallazgos importantes
        important = [f for f in self.found if any(
            x in f['path'].lower() for x in 
            ['admin', 'config', 'backup', '.env', '.git', 'phpmyadmin', 'login', 'upload']
        )]
        
        if important:
            print(f"\n{'=' * 50}")
            print("[!] HALLAZGOS POTENCIALMENTE IMPORTANTES")
            print(f"{'=' * 50}")
            for item in important:
                print(f"    [{item['status']}] {item['url']}")
        
        print("\n")


def main():
    banner()
    
    if len(sys.argv) < 2:
        print("Uso: python dir_buster.py <url_base> [wordlist]")
        print("\nEjemplos:")
        print("  python dir_buster.py http://localhost")
        print("  python dir_buster.py http://localhost /usr/share/wordlists/dirb/common.txt")
        print("  python dir_buster.py https://ejemplo.com")
        sys.exit(1)
    
    target = sys.argv[1]
    
    # Asegurar que tiene esquema
    if not target.startswith(('http://', 'https://')):
        target = 'http://' + target
    
    # Wordlist
    if len(sys.argv) > 2:
        wordlist = sys.argv[2]
    else:
        wordlist = DEFAULT_WORDLIST
        print("[*] Usando wordlist por defecto integrada")
    
    # Crear y ejecutar el buster
    buster = DirBuster(
        target=target,
        wordlist=wordlist,
        threads=10,
        extensions=["", ".php", ".html", ".txt", ".bak"]
    )
    
    buster.run()


if __name__ == "__main__":
    main()
