# Laboratorio de Hacking con Docker

## Introducción

Docker te permite crear rápidamente entornos vulnerables para practicar hacking de forma segura y legal.

---

## Requisitos

### Instalar Docker
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# Verificar instalación
docker --version
docker-compose --version
```

---

## Aplicaciones Web Vulnerables

### 1. DVWA (Damn Vulnerable Web Application)

**Descripción:** Aplicación PHP/MySQL con múltiples vulnerabilidades para practicar.

```bash
# Opción 1: Imagen simple
docker run -d -p 80:80 vulnerables/web-dvwa

# Opción 2: Con docker-compose
cat > docker-compose-dvwa.yml << 'EOF'
version: '3'
services:
  dvwa:
    image: vulnerables/web-dvwa
    ports:
      - "80:80"
    restart: always
EOF

docker-compose -f docker-compose-dvwa.yml up -d
```

**Acceso:** http://localhost
**Credenciales:** admin / password

**Vulnerabilidades disponibles:**
- SQL Injection
- XSS (Reflected y Stored)
- Command Injection
- File Inclusion
- File Upload
- CSRF
- Brute Force

---

### 2. OWASP WebGoat

**Descripción:** Aplicación educativa de OWASP para aprender vulnerabilidades web.

```bash
docker run -d -p 8080:8080 -p 9090:9090 webgoat/webgoat
```

**Acceso:** http://localhost:8080/WebGoat
**Registro:** Crear cuenta nueva

**Lecciones incluidas:**
- Injection
- Authentication
- Session Management
- Sensitive Data Exposure
- XXE
- Access Control
- Security Misconfiguration
- XSS
- Insecure Deserialization
- Vulnerable Components
- Request Forgery

---

### 3. OWASP Juice Shop

**Descripción:** Aplicación moderna (Node.js/Angular) con vulnerabilidades del OWASP Top 10.

```bash
docker run -d -p 3000:3000 bkimminich/juice-shop
```

**Acceso:** http://localhost:3000

**Características:**
- Interfaz moderna y realista
- Más de 100 desafíos
- Scoreboard integrado
- Progresión de dificultad

---

### 4. bWAPP (Buggy Web Application)

**Descripción:** Otra aplicación vulnerable con más de 100 bugs.

```bash
docker run -d -p 80:80 raesene/bwapp
```

**Acceso:** http://localhost/install.php (instalar primero)
**Credenciales:** bee / bug

---

### 5. Mutillidae II

**Descripción:** Aplicación OWASP con múltiples vulnerabilidades.

```bash
docker run -d -p 80:80 -p 3306:3306 citizenstig/nowasp
```

**Acceso:** http://localhost/mutillidae

---

### 6. Hackazon

**Descripción:** Tienda online vulnerable realista.

```bash
docker run -d -p 80:80 ianwijaya/hackazon
```

**Acceso:** http://localhost

---

## Entornos de Red y Sistemas

### 7. Metasploitable 3 (Windows)

**Descripción:** Máquina Windows vulnerable.

```bash
# Clonar repositorio
git clone https://github.com/rapid7/metasploitable3.git
cd metasploitable3

# Construir con Vagrant/VirtualBox
# (Requiere Vagrant y VirtualBox instalados)
vagrant up
```

---

### 8. VulnHub en Docker

**Descripción:** Algunas máquinas de VulnHub están disponibles en Docker.

```bash
# Kioptrix
docker run -d -p 80:80 -p 22:22 tleemcjr/metasploitable2

# Más en Docker Hub
docker search vulnhub
```

---

## API Vulnerables

### 9. OWASP crAPI (Completely Ridiculous API)

**Descripción:** API REST vulnerable para practicar API hacking.

```bash
git clone https://github.com/OWASP/crAPI.git
cd crAPI
docker-compose up -d
```

**Acceso:** http://localhost:8888

---

### 10. VAmPI (Vulnerable API)

**Descripción:** API vulnerable basada en OpenAPI.

```bash
docker run -d -p 5000:5000 erev0s/vampi
```

**Acceso:** http://localhost:5000

---

### 11. DVGA (Damn Vulnerable GraphQL Application)

**Descripción:** Aplicación GraphQL vulnerable.

```bash
docker run -d -p 5013:5013 dolevf/dvga
```

**Acceso:** http://localhost:5013

---

## Laboratorio Completo

### docker-compose para Laboratorio Completo

```yaml
# laboratorio-hacking.yml
version: '3.8'

services:
  # Web Vulnerables
  dvwa:
    image: vulnerables/web-dvwa
    ports:
      - "8001:80"
    restart: unless-stopped
    networks:
      - hacklab

  webgoat:
    image: webgoat/webgoat
    ports:
      - "8002:8080"
      - "9002:9090"
    restart: unless-stopped
    networks:
      - hacklab

  juiceshop:
    image: bkimminich/juice-shop
    ports:
      - "8003:3000"
    restart: unless-stopped
    networks:
      - hacklab

  bwapp:
    image: raesene/bwapp
    ports:
      - "8004:80"
    restart: unless-stopped
    networks:
      - hacklab

  # API Vulnerables
  vampi:
    image: erev0s/vampi
    ports:
      - "8005:5000"
    restart: unless-stopped
    networks:
      - hacklab

  dvga:
    image: dolevf/dvga
    ports:
      - "8006:5013"
    restart: unless-stopped
    networks:
      - hacklab

  # Base de datos para prácticas
  mysql-vuln:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: toor
      MYSQL_DATABASE: testdb
    ports:
      - "3306:3306"
    networks:
      - hacklab

networks:
  hacklab:
    driver: bridge
```

### Usar el Laboratorio Completo

```bash
# Guardar como laboratorio-hacking.yml

# Iniciar todo
docker-compose -f laboratorio-hacking.yml up -d

# Ver estado
docker-compose -f laboratorio-hacking.yml ps

# Detener todo
docker-compose -f laboratorio-hacking.yml down

# Ver logs
docker-compose -f laboratorio-hacking.yml logs -f
```

### Puertos del Laboratorio

| Servicio | Puerto | URL |
|----------|--------|-----|
| DVWA | 8001 | http://localhost:8001 |
| WebGoat | 8002 | http://localhost:8002/WebGoat |
| Juice Shop | 8003 | http://localhost:8003 |
| bWAPP | 8004 | http://localhost:8004 |
| VAmPI | 8005 | http://localhost:8005 |
| DVGA | 8006 | http://localhost:8006 |
| MySQL | 3306 | localhost:3306 |

---

## Scripts de Gestión

### Script para iniciar laboratorio

```bash
#!/bin/bash
# start_lab.sh

echo "🔬 Iniciando Laboratorio de Hacking..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

# Iniciar contenedores
docker-compose -f laboratorio-hacking.yml up -d

echo ""
echo "✅ Laboratorio iniciado!"
echo ""
echo "📋 Servicios disponibles:"
echo "   - DVWA:       http://localhost:8001"
echo "   - WebGoat:    http://localhost:8002/WebGoat"
echo "   - Juice Shop: http://localhost:8003"
echo "   - bWAPP:      http://localhost:8004"
echo "   - VAmPI:      http://localhost:8005"
echo "   - DVGA:       http://localhost:8006"
echo ""
echo "🛑 Para detener: ./stop_lab.sh"
```

### Script para detener laboratorio

```bash
#!/bin/bash
# stop_lab.sh

echo "🛑 Deteniendo Laboratorio..."

docker-compose -f laboratorio-hacking.yml down

echo "✅ Laboratorio detenido"
```

---

## Consejos de Uso

### 1. Aislamiento de Red
```bash
# Crear red aislada
docker network create --internal hacklab-isolated

# Usar en compose
networks:
  hacklab-isolated:
    internal: true
```

### 2. Persistencia de Datos
```bash
# Añadir volúmenes para guardar progreso
volumes:
  - dvwa_data:/var/www/html
```

### 3. Limitar Recursos
```yaml
# En docker-compose
services:
  dvwa:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### 4. Logging
```bash
# Ver logs de un servicio
docker logs -f container_name

# Todos los logs
docker-compose logs -f
```

---

## Ejercicios Sugeridos

### Nivel Principiante (DVWA)
1. Configurar nivel de seguridad a "Low"
2. Practicar SQL Injection básico
3. Practicar XSS reflejado
4. File Upload básico

### Nivel Intermedio (Juice Shop)
1. Resolver primeros 10 desafíos
2. Encontrar panel de administración
3. XSS almacenado
4. Bypass de autenticación

### Nivel Avanzado (WebGoat)
1. Completar lecciones de Injection
2. XXE Injection
3. JWT vulnerabilities
4. Insecure Deserialization

---

## Recursos Adicionales

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)

---

**⚠️ IMPORTANTE:** Usa estos entornos SOLO para aprendizaje. Nunca ataques sistemas sin autorización.
