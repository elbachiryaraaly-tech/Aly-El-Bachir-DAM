# GUÍA PASO A PASO: Tu Primer Día como Futuro Hacker

## Introducción

Esta guía te dice EXACTAMENTE qué hacer, en qué orden, y cómo hacerlo. Síguela paso a paso.

---

# FASE 0: PREPARACIÓN (Día 1-3)

## Paso 1: Prepara tu Equipo

### Lo que necesitas:
```
MÍNIMO:
- Computadora con 8GB RAM (16GB recomendado)
- 100GB de espacio libre en disco
- Conexión a internet estable

OPCIONAL PERO RECOMENDADO:
- Monitor extra
- Cuaderno para notas
```

### Verifica tu hardware:
```
Windows: Click derecho en "Este equipo" > Propiedades
Mac: Menú Apple > Acerca de este Mac
Linux: En terminal: free -h && df -h
```

---

## Paso 2: Instala el Software Base

### 2.1 Instalar VirtualBox (Para máquinas virtuales)

**¿Por qué?** Te permite ejecutar Kali Linux sin modificar tu sistema.

**Instrucciones:**
1. Ve a: https://www.virtualbox.org/wiki/Downloads
2. Descarga la versión para tu sistema operativo
3. Ejecuta el instalador
4. Siguiente > Siguiente > Instalar
5. Reinicia si te lo pide

**Verificar instalación:**
- Busca "VirtualBox" en tu menú de inicio
- Debe abrirse sin errores

---

### 2.2 Descargar Kali Linux

**¿Qué es?** El sistema operativo de los hackers con todas las herramientas preinstaladas.

**Instrucciones:**
1. Ve a: https://www.kali.org/get-kali/#kali-virtual-machines
2. Busca "VirtualBox" en la lista
3. Descarga el archivo (aproximadamente 3-4 GB)
4. Espera a que termine la descarga

**Archivo descargado:** `kali-linux-XXXX-virtualbox-amd64.7z`

---

### 2.3 Instalar 7-Zip (Para extraer Kali)

**Windows:**
1. Ve a: https://www.7-zip.org/
2. Descarga e instala

**Mac:**
1. Ve a: https://www.keka.io/
2. Descarga e instala

**Linux:**
```bash
sudo apt install p7zip-full
```

---

### 2.4 Extraer e Importar Kali Linux

**Extraer:**
1. Click derecho en el archivo `.7z` descargado
2. Extraer aquí (o Extract Here)
3. Espera (puede tomar varios minutos)

**Importar en VirtualBox:**
1. Abre VirtualBox
2. Click en "Añadir" (botón verde)
3. Navega hasta la carpeta extraída
4. Selecciona el archivo `.vbox`
5. Click en "Abrir"

**Configurar la VM:**
1. Selecciona "Kali Linux" en la lista
2. Click en "Configuración" (engranaje naranja)
3. Ve a "Sistema" > "Procesador"
4. Asigna 2-4 CPUs (la mitad de los que tengas)
5. Ve a "Sistema" > "Placa base"
6. Asigna 4096 MB de RAM (o más si tienes)
7. Click en "Aceptar"

---

### 2.5 Iniciar Kali Linux por Primera Vez

**Iniciar:**
1. Selecciona "Kali Linux" en VirtualBox
2. Click en "Iniciar" (flecha verde)
3. Espera a que cargue (1-2 minutos)

**Credenciales por defecto:**
```
Usuario: kali
Contraseña: kali
```

**Primer inicio - Hacer esto INMEDIATAMENTE:**
```bash
# Abre una terminal (icono negro en la barra superior)

# Actualizar el sistema (IMPORTANTE)
sudo apt update && sudo apt upgrade -y

# Esto tomará 10-30 minutos. Déjalo correr.
```

---

## Paso 3: Instalar Cursor Editor

### En tu sistema principal (Windows/Mac/Linux):
1. Ve a: https://cursor.sh
2. Click en "Download"
3. Instala el programa
4. Ábrelo y crea una cuenta (gratis)

### Configuración inicial:
1. Al abrir, te preguntará por el tema: Elige el que prefieras
2. Te preguntará si quieres importar extensiones de VS Code: Sí si las tienes
3. Listo para usar

---

# FASE 1: FUNDAMENTOS DE LINUX (Semana 1-2)

## Día 1-2: Navegación Básica

### Abre la terminal en Kali y practica estos comandos:

```bash
# ═══════════════════════════════════════
# COMANDO 1: pwd (Print Working Directory)
# Muestra dónde estás
# ═══════════════════════════════════════
pwd

# Resultado esperado: /home/kali
# Significa que estás en tu carpeta personal


# ═══════════════════════════════════════
# COMANDO 2: ls (List)
# Lista archivos y carpetas
# ═══════════════════════════════════════
ls

# Verás carpetas como: Desktop, Documents, Downloads...

# Con más detalles:
ls -la

# Verás permisos, propietario, tamaño, fecha


# ═══════════════════════════════════════
# COMANDO 3: cd (Change Directory)
# Cambiar de carpeta
# ═══════════════════════════════════════

# Ir a Desktop
cd Desktop

# Verificar que cambiaste
pwd
# Resultado: /home/kali/Desktop

# Volver atrás
cd ..

# Verificar
pwd
# Resultado: /home/kali

# Ir a tu carpeta personal desde cualquier lugar
cd ~

# Ir a la raíz del sistema
cd /

# Ver qué hay en la raíz
ls
# Verás: bin, boot, etc, home, root, usr, var...

# Volver a tu carpeta
cd ~
```

### EJERCICIO PRÁCTICO 1:
```bash
# Navega a estas ubicaciones y usa 'ls' en cada una:
cd /etc
ls
# Aquí están los archivos de configuración del sistema

cd /var/log
ls
# Aquí están los logs del sistema

cd /usr/bin
ls
# Aquí están los programas instalados

# Vuelve a casa
cd ~
```

---

## Día 3-4: Manipulación de Archivos

```bash
# ═══════════════════════════════════════
# COMANDO 4: mkdir (Make Directory)
# Crear carpetas
# ═══════════════════════════════════════

# Crear carpeta para practicar
mkdir hacking_practice
cd hacking_practice
pwd
# Resultado: /home/kali/hacking_practice


# ═══════════════════════════════════════
# COMANDO 5: touch
# Crear archivos vacíos
# ═══════════════════════════════════════

touch mi_primer_archivo.txt
ls
# Verás: mi_primer_archivo.txt


# ═══════════════════════════════════════
# COMANDO 6: echo
# Escribir texto (y guardarlo en archivos)
# ═══════════════════════════════════════

# Mostrar texto en pantalla
echo "Hola, soy un hacker en entrenamiento"

# Guardar texto en un archivo (sobrescribe)
echo "Esta es la primera línea" > mi_primer_archivo.txt

# Añadir texto al final (no sobrescribe)
echo "Esta es la segunda línea" >> mi_primer_archivo.txt


# ═══════════════════════════════════════
# COMANDO 7: cat (Concatenate)
# Ver contenido de archivos
# ═══════════════════════════════════════

cat mi_primer_archivo.txt
# Verás:
# Esta es la primera línea
# Esta es la segunda línea


# ═══════════════════════════════════════
# COMANDO 8: cp (Copy)
# Copiar archivos
# ═══════════════════════════════════════

cp mi_primer_archivo.txt copia_archivo.txt
ls
# Verás ambos archivos


# ═══════════════════════════════════════
# COMANDO 9: mv (Move)
# Mover o renombrar archivos
# ═══════════════════════════════════════

# Renombrar
mv copia_archivo.txt archivo_renombrado.txt
ls

# Mover a otra carpeta
mkdir subcarpeta
mv archivo_renombrado.txt subcarpeta/
ls subcarpeta/


# ═══════════════════════════════════════
# COMANDO 10: rm (Remove)
# Eliminar archivos (¡CUIDADO!)
# ═══════════════════════════════════════

# Eliminar archivo
rm mi_primer_archivo.txt
ls
# Ya no está

# Eliminar carpeta vacía
rmdir subcarpeta
# Error: no está vacía

# Eliminar carpeta con contenido
rm -r subcarpeta
ls
# Ya no está
```

### EJERCICIO PRÁCTICO 2:
```bash
# Crea esta estructura de carpetas:
# hacking_practice/
# ├── notas/
# │   ├── dia1.txt (con texto "Aprendí comandos básicos")
# │   └── dia2.txt (con texto "Aprendí a manipular archivos")
# └── scripts/
#     └── readme.txt (con texto "Aquí guardaré mis scripts")

# SOLUCIÓN:
cd ~/hacking_practice
mkdir notas scripts
echo "Aprendí comandos básicos" > notas/dia1.txt
echo "Aprendí a manipular archivos" > notas/dia2.txt
echo "Aquí guardaré mis scripts" > scripts/readme.txt

# Verificar
ls -R
# Verás toda la estructura
```

---

## Día 5-7: Comandos de Sistema y Red

```bash
# ═══════════════════════════════════════
# COMANDOS DE SISTEMA
# ═══════════════════════════════════════

# Ver información del sistema
uname -a

# Ver uso de disco
df -h

# Ver uso de memoria
free -h

# Ver procesos activos
ps aux

# Ver procesos en tiempo real
top
# Presiona 'q' para salir

# Ver tu usuario
whoami

# Ver ID de usuario
id


# ═══════════════════════════════════════
# COMANDOS DE RED (MUY IMPORTANTES)
# ═══════════════════════════════════════

# Ver tu configuración de red
ip a
# o
ifconfig

# Busca tu IP. Ejemplo: 192.168.1.100

# Probar conexión a internet
ping -c 4 google.com
# Envía 4 paquetes a Google

# Ver puertos abiertos en tu máquina
netstat -tulpn
# o
ss -tulpn

# Ver ruta de red hacia un destino
traceroute google.com

# Consulta DNS
nslookup google.com

# Más información DNS
dig google.com
```

### EJERCICIO PRÁCTICO 3:
```bash
# Responde estas preguntas usando comandos:

# 1. ¿Cuál es tu dirección IP?
ip a | grep inet

# 2. ¿Cuánta RAM tienes disponible?
free -h

# 3. ¿Puedes conectarte a hackthebox.com?
ping -c 3 hackthebox.com

# 4. ¿Qué servidor DNS usa hackthebox.com?
nslookup hackthebox.com
```

---

# FASE 2: TU PRIMERA HERRAMIENTA DE HACKING (Semana 2-3)

## Nmap - El Scanner de Redes

### ¿Qué es Nmap?
Nmap es LA herramienta para descubrir qué hay en una red y qué puertos están abiertos.

### Configurar un objetivo de práctica LEGAL

**IMPORTANTE:** Solo escanea máquinas que te pertenezcan o tengas permiso.

**Opción 1: Escanea tu propia máquina**
```bash
# Obtén tu IP
ip a
# Busca algo como 192.168.1.X o 10.0.2.X

# Escanea tu propia máquina
nmap 127.0.0.1
```

**Opción 2: Usa el servidor de prueba de Nmap**
```bash
# Este servidor está diseñado para ser escaneado
nmap scanme.nmap.org
```

---

### Lección 1: Escaneo Básico

```bash
# ═══════════════════════════════════════
# ESCANEO BÁSICO
# ═══════════════════════════════════════

nmap scanme.nmap.org

# Resultado típico:
# PORT     STATE SERVICE
# 22/tcp   open  ssh
# 80/tcp   open  http
# 9929/tcp open  nping-echo

# ¿Qué significa?
# - Puerto 22: SSH (acceso remoto) está abierto
# - Puerto 80: HTTP (web) está abierto
# - Puerto 9929: Servicio nping está abierto
```

### Lección 2: Escaneo de Todos los Puertos

```bash
# ═══════════════════════════════════════
# ESCANEO COMPLETO (todos los puertos)
# ═══════════════════════════════════════

# Escaneo rápido de todos los puertos
nmap -p- --min-rate=1000 scanme.nmap.org

# -p- = todos los puertos (1-65535)
# --min-rate=1000 = envía al menos 1000 paquetes/segundo

# Esto toma más tiempo pero encuentra más cosas
```

### Lección 3: Detección de Servicios

```bash
# ═══════════════════════════════════════
# DETECTAR VERSIONES DE SERVICIOS
# ═══════════════════════════════════════

nmap -sV scanme.nmap.org

# Resultado típico:
# PORT     STATE SERVICE    VERSION
# 22/tcp   open  ssh        OpenSSH 6.6.1p1
# 80/tcp   open  http       Apache httpd 2.4.7

# Ahora sabemos las versiones exactas
# Esto es útil para buscar vulnerabilidades
```

### Lección 4: Detección de Sistema Operativo

```bash
# ═══════════════════════════════════════
# DETECTAR SISTEMA OPERATIVO
# ═══════════════════════════════════════

sudo nmap -O scanme.nmap.org

# Requiere sudo porque usa técnicas especiales
# Te dirá si es Linux, Windows, etc.
```

### Lección 5: Escaneo Agresivo (Completo)

```bash
# ═══════════════════════════════════════
# ESCANEO AGRESIVO
# ═══════════════════════════════════════

nmap -A scanme.nmap.org

# -A activa:
# - Detección de versiones (-sV)
# - Detección de SO (-O)
# - Scripts básicos (-sC)
# - Traceroute

# Es el escaneo más completo
```

### Lección 6: Guardar Resultados

```bash
# ═══════════════════════════════════════
# GUARDAR EN DIFERENTES FORMATOS
# ═══════════════════════════════════════

# Guardar en texto normal
nmap -oN resultado.txt scanme.nmap.org

# Guardar en XML (para herramientas)
nmap -oX resultado.xml scanme.nmap.org

# Guardar en todos los formatos
nmap -oA resultado_completo scanme.nmap.org
# Crea: resultado_completo.nmap, .xml, .gnmap
```

### EJERCICIO PRÁCTICO CON NMAP:
```bash
# Crea una carpeta para guardar tus escaneos
mkdir ~/hacking_practice/escaneos
cd ~/hacking_practice/escaneos

# Realiza estos escaneos y guarda los resultados:

# 1. Escaneo básico
nmap -oN basico.txt scanme.nmap.org

# 2. Escaneo de versiones
nmap -sV -oN versiones.txt scanme.nmap.org

# 3. Escaneo completo
nmap -A -oN completo.txt scanme.nmap.org

# 4. Lee los resultados
cat basico.txt
cat versiones.txt
cat completo.txt
```

---

# FASE 3: PLATAFORMAS DE PRÁCTICA (Semana 3-4)

## Opción 1: TryHackMe (RECOMENDADO PARA EMPEZAR)

### Paso 1: Crear Cuenta
1. Ve a: https://tryhackme.com
2. Click en "Join For Free"
3. Crea tu cuenta con email

### Paso 2: Tu Primera Room
1. Una vez dentro, ve a "Learn"
2. Busca "Complete Beginner"
3. Empieza con "Starting Out In Cyber Sec"

### Paso 3: Conectar tu Kali a TryHackMe
```bash
# 1. En TryHackMe, ve a "Access" en el menú
# 2. Descarga tu archivo de conexión VPN
# 3. En Kali, abre terminal donde descargaste el archivo

# Conectar VPN
sudo openvpn tu-archivo.ovpn

# Deja esta terminal abierta
# Abre otra terminal para trabajar

# Verificar conexión
ip a
# Deberías ver una interfaz "tun0" con IP 10.x.x.x
```

### Rooms Recomendadas para Empezar (EN ORDEN):
```
1. "Tutorial" - Cómo funciona la plataforma
2. "Starting Out In Cyber Sec" - Introducción
3. "Intro to Researching" - Cómo investigar
4. "Linux Fundamentals Part 1" - Linux básico
5. "Linux Fundamentals Part 2" - Linux intermedio
6. "Linux Fundamentals Part 3" - Linux avanzado
7. "Nmap" - Profundizar en Nmap
8. "Network Services" - Servicios de red
9. "OWASP Top 10" - Vulnerabilidades web
```

---

## Opción 2: Laboratorio Local con Docker

### Instalar Docker en Kali
```bash
# Actualizar
sudo apt update

# Instalar Docker
sudo apt install docker.io docker-compose -y

# Iniciar Docker
sudo systemctl enable docker
sudo systemctl start docker

# Añadir tu usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión (cierra y abre terminal)
# O reinicia Kali

# Verificar
docker --version
```

### Iniciar DVWA (Aplicación Web Vulnerable)
```bash
# Descargar e iniciar DVWA
docker run -d -p 80:80 vulnerables/web-dvwa

# Espera 30 segundos y abre en navegador:
# http://localhost

# Credenciales:
# Usuario: admin
# Contraseña: password

# Después del login, ve a "Setup / Reset DB"
# Click en "Create / Reset Database"
```

### Tu Primera Práctica en DVWA

**1. Configurar nivel de seguridad:**
- Ve a "DVWA Security"
- Cambia a "Low"
- Click en "Submit"

**2. Practicar SQL Injection:**
- Ve a "SQL Injection"
- En el campo User ID, escribe: `1`
- Click en "Submit"
- Verás información del usuario 1

**3. Ahora prueba la inyección:**
```
En el campo User ID, escribe:
1' OR '1'='1

Click en Submit
```
- ¡Verás TODOS los usuarios!
- Esto es SQL Injection básico

**4. Entender qué pasó:**
```sql
-- Consulta normal:
SELECT * FROM users WHERE user_id = '1'

-- Con inyección:
SELECT * FROM users WHERE user_id = '1' OR '1'='1'

-- '1'='1' siempre es verdadero
-- Por eso devuelve todos los usuarios
```

---

# FASE 4: PROGRAMACIÓN BÁSICA - PYTHON (Semana 4-6)

## Instalar Python (ya viene en Kali)

```bash
# Verificar Python
python3 --version

# Debería mostrar: Python 3.x.x
```

## Crear tu Primer Script

```bash
# Crear carpeta para scripts
mkdir -p ~/hacking_practice/python
cd ~/hacking_practice/python

# Crear script con nano
nano hola_mundo.py
```

**Escribe esto en nano:**
```python
#!/usr/bin/env python3
# Mi primer script de Python

print("¡Hola! Soy un hacker en entrenamiento")
print("Hoy es un gran día para aprender")

nombre = input("¿Cómo te llamas? ")
print(f"¡Bienvenido {nombre} al mundo del hacking!")
```

**Guardar en nano:**
- Ctrl+O (guardar)
- Enter (confirmar nombre)
- Ctrl+X (salir)

**Ejecutar:**
```bash
python3 hola_mundo.py
```

---

## Script 2: Variables y Tipos de Datos

```bash
nano variables.py
```

```python
#!/usr/bin/env python3
# Aprendiendo variables

# Strings (texto)
nombre = "Kali Linux"
version = "2024.1"

# Números enteros
puertos_escaneados = 65535
puertos_abiertos = 3

# Números decimales
porcentaje = 0.004

# Booleanos (verdadero/falso)
es_vulnerable = True
tiene_firewall = False

# Listas (colecciones)
puertos_comunes = [21, 22, 23, 25, 80, 443, 445, 3389]

# Diccionarios (clave: valor)
servicio = {
    "puerto": 22,
    "nombre": "SSH",
    "version": "OpenSSH 8.4"
}

# Imprimir todo
print(f"Sistema: {nombre} {version}")
print(f"Puertos escaneados: {puertos_escaneados}")
print(f"Puertos abiertos: {puertos_abiertos}")
print(f"Porcentaje abiertos: {porcentaje * 100}%")
print(f"¿Es vulnerable?: {es_vulnerable}")
print(f"Puertos comunes: {puertos_comunes}")
print(f"Servicio encontrado: {servicio}")
```

**Ejecutar:**
```bash
python3 variables.py
```

---

## Script 3: Condicionales

```bash
nano condicionales.py
```

```python
#!/usr/bin/env python3
# Condicionales - tomar decisiones

puerto = int(input("Ingresa un número de puerto: "))

# Verificar qué servicio podría ser
if puerto == 22:
    print("Este es probablemente SSH")
    print("Podrías intentar conexión con: ssh usuario@ip")
elif puerto == 80:
    print("Este es probablemente HTTP (web)")
    print("Abre un navegador y visita: http://ip")
elif puerto == 443:
    print("Este es probablemente HTTPS (web seguro)")
    print("Abre un navegador y visita: https://ip")
elif puerto == 21:
    print("Este es probablemente FTP")
    print("Podrías conectarte con: ftp ip")
elif puerto == 3389:
    print("Este es probablemente RDP (Escritorio Remoto)")
    print("Es un sistema Windows")
elif puerto < 1 or puerto > 65535:
    print("Puerto inválido. Debe ser entre 1 y 65535")
else:
    print(f"Puerto {puerto} - servicio desconocido")
    print("Investiga más con: nmap -sV -p {puerto} ip")
```

---

## Script 4: Bucles

```bash
nano bucles.py
```

```python
#!/usr/bin/env python3
# Bucles - repetir acciones

# Lista de puertos a verificar
puertos = [21, 22, 23, 80, 443, 445, 3389]

# Diccionario de servicios conocidos
servicios = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    80: "HTTP",
    443: "HTTPS",
    445: "SMB",
    3389: "RDP"
}

print("=== ANÁLISIS DE PUERTOS ===\n")

# Bucle FOR - recorrer lista
for puerto in puertos:
    servicio = servicios.get(puerto, "Desconocido")
    print(f"Puerto {puerto}: {servicio}")

print("\n=== CONTANDO ===\n")

# Bucle WHILE - repetir mientras condición sea verdadera
contador = 1
while contador <= 5:
    print(f"Escaneo número {contador}")
    contador += 1  # contador = contador + 1

print("\n=== BUCLE CON RANGO ===\n")

# Bucle con range
for i in range(1, 6):
    print(f"Iteración {i}")
```

---

## Script 5: Tu Primer Scanner de Puertos

```bash
nano mi_scanner.py
```

```python
#!/usr/bin/env python3
"""
Mi Primer Port Scanner
Un scanner simple para aprender
"""

import socket

def escanear_puerto(ip, puerto):
    """
    Intenta conectar a un puerto.
    Retorna True si está abierto, False si está cerrado.
    """
    try:
        # Crear socket TCP
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Timeout de 1 segundo
        sock.settimeout(1)
        
        # Intentar conectar
        resultado = sock.connect_ex((ip, puerto))
        
        # Cerrar socket
        sock.close()
        
        # Si resultado es 0, el puerto está abierto
        return resultado == 0
    
    except Exception as e:
        return False


def main():
    print("""
    ╔════════════════════════════════╗
    ║   MI PRIMER PORT SCANNER       ║
    ╚════════════════════════════════╝
    """)
    
    # Pedir IP al usuario
    ip = input("Ingresa la IP a escanear: ")
    
    # Puertos comunes a escanear
    puertos = [21, 22, 23, 25, 80, 443, 445, 3306, 3389, 8080]
    
    print(f"\nEscaneando {ip}...")
    print("-" * 40)
    
    puertos_abiertos = []
    
    for puerto in puertos:
        if escanear_puerto(ip, puerto):
            print(f"[+] Puerto {puerto} está ABIERTO")
            puertos_abiertos.append(puerto)
        else:
            print(f"[-] Puerto {puerto} está cerrado")
    
    print("-" * 40)
    print(f"\nResumen: {len(puertos_abiertos)} puertos abiertos")
    
    if puertos_abiertos:
        print(f"Puertos abiertos: {puertos_abiertos}")


# Ejecutar programa
if __name__ == "__main__":
    main()
```

**Ejecutar:**
```bash
python3 mi_scanner.py

# Prueba con:
# - 127.0.0.1 (tu máquina)
# - scanme.nmap.org (servidor de prueba)
```

---

# FASE 5: SIGUIENTES PASOS (Semana 6+)

## Ruta de Aprendizaje Continuo

### Mes 2: Web Hacking
```
1. Completar OWASP Top 10 en TryHackMe
2. Practicar en DVWA (subir dificultad a Medium)
3. Aprender Burp Suite
4. SQL Injection avanzado
5. XSS (Cross-Site Scripting)
```

### Mes 3: Explotación
```
1. Aprender Metasploit en TryHackMe
2. Practicar máquinas Easy en HackTheBox
3. Escribir scripts Python más avanzados
4. Aprender sobre shells reversas
```

### Mes 4-6: Especialización
```
1. Elegir área (Web, Red, Wireless, etc.)
2. Máquinas Medium en HackTheBox
3. Participar en CTFs
4. Preparar certificación (eJPT o Security+)
```

---

## Checklist de Progreso

### Semana 1-2: Linux
- [ ] Puedo navegar por el sistema de archivos
- [ ] Puedo crear, copiar, mover y eliminar archivos
- [ ] Entiendo los permisos básicos
- [ ] Conozco comandos de red (ip, ping, netstat)

### Semana 2-3: Nmap
- [ ] Puedo hacer escaneos básicos
- [ ] Puedo detectar versiones de servicios
- [ ] Puedo guardar resultados en archivos
- [ ] Entiendo qué significan los puertos abiertos

### Semana 3-4: Plataformas
- [ ] Tengo cuenta en TryHackMe
- [ ] Completé al menos 5 rooms
- [ ] Tengo DVWA funcionando
- [ ] Practiqué SQL Injection básico

### Semana 4-6: Python
- [ ] Puedo crear scripts básicos
- [ ] Entiendo variables, condicionales y bucles
- [ ] Creé mi propio port scanner
- [ ] Puedo modificar scripts existentes

---

## Recursos Diarios

### Rutina Diaria Recomendada (1-2 horas)
```
15 min - Revisar notas del día anterior
30 min - Aprender algo nuevo (TryHackMe, videos, lectura)
30 min - Practicar lo aprendido
15 min - Documentar lo que aprendiste
```

### Canales de YouTube para Ver
```
- NetworkChuck (principiante, muy didáctico)
- John Hammond (CTFs explicados)
- The Cyber Mentor (cursos completos)
- David Bombal (redes y hacking)
- IppSec (HackTheBox walkthroughs)
```

### Comunidades
```
- Reddit: r/hacking, r/netsec, r/HowToHack
- Discord: TryHackMe, HackTheBox
- Twitter: Sigue a investigadores de seguridad
```

---

## Palabras Finales

1. **Sé paciente** - Esto toma tiempo
2. **Practica todos los días** - Aunque sea 30 minutos
3. **Documenta todo** - Crea tu propia wiki de notas
4. **No te rindas** - Los conceptos se conectan con el tiempo
5. **Mantente legal** - Solo practica en entornos autorizados
6. **Pregunta a Cursor** - La IA te puede explicar cualquier cosa

**¡Éxito en tu camino como hacker ético!**

---

*Creado para tu aprendizaje - Actualizado Enero 2026*
