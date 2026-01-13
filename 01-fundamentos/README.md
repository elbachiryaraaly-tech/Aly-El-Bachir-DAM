# 🔰 Módulo 1: Fundamentos de Ciberseguridad

## 📖 ¿Qué es la Ciberseguridad?

La **ciberseguridad** es el conjunto de prácticas, tecnologías y procesos diseñados para proteger sistemas, redes, programas y datos de ataques digitales, daños o accesos no autorizados.

---

## 🎭 Tipos de Hackers

### Por su Ética

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **White Hat** 🎩 | Hackers éticos, trabajan legalmente | Pentesters, investigadores |
| **Black Hat** 🖤 | Hackers maliciosos, actividades ilegales | Cibercriminales |
| **Grey Hat** 🩶 | Entre ambos, sin autorización pero sin malas intenciones | Pueden reportar vulnerabilidades |

### Por su Especialización

- **Script Kiddie**: Usa herramientas sin entender cómo funcionan
- **Pentester**: Profesional de pruebas de penetración
- **Red Teamer**: Simula ataques completos a organizaciones
- **Bug Hunter**: Busca vulnerabilidades por recompensas
- **Security Researcher**: Investiga nuevas vulnerabilidades

---

## 🔒 La Tríada CIA

Los tres pilares fundamentales de la seguridad de la información:

```
         ╔═══════════════════╗
         ║  CONFIDENCIALIDAD ║
         ║   (Privacidad)    ║
         ╚═══════════════════╝
                 ▲
                / \
               /   \
              /     \
             /       \
            /         \
╔══════════════╗   ╔══════════════╗
║ INTEGRIDAD   ║   ║ DISPONIBILIDAD║
║ (Exactitud)  ║   ║ (Accesible)   ║
╚══════════════╝   ╚══════════════╝
```

### Confidencialidad
- Solo personas autorizadas acceden a la información
- Ejemplos: Encriptación, control de acceso

### Integridad
- Los datos no han sido alterados
- Ejemplos: Hashes, firmas digitales

### Disponibilidad
- Los sistemas están accesibles cuando se necesitan
- Ejemplos: Redundancia, backups

---

## 🎯 Tipos de Ataques Comunes

### 1. Ingeniería Social
```
📧 Phishing - Emails falsos que simulan ser legítimos
📱 Vishing - Phishing por voz/teléfono
💬 Smishing - Phishing por SMS
🎭 Pretexting - Crear escenarios falsos
```

### 2. Ataques de Red
```
🔍 Sniffing - Capturar tráfico de red
👤 Man-in-the-Middle (MitM) - Interceptar comunicaciones
💥 DoS/DDoS - Denegación de servicio
🔄 ARP Spoofing - Envenenamiento de tablas ARP
```

### 3. Ataques Web
```
💉 SQL Injection - Inyectar código SQL malicioso
📝 XSS (Cross-Site Scripting) - Inyectar scripts en webs
🔗 CSRF - Falsificación de peticiones
📂 Directory Traversal - Acceder a archivos no autorizados
```

### 4. Malware
```
🦠 Virus - Se replica adjuntándose a programas
🐛 Worm - Se propaga automáticamente por la red
🐴 Troyano - Se disfraza de software legítimo
🔐 Ransomware - Cifra archivos y pide rescate
👁️ Spyware - Espía actividad del usuario
```

---

## 🛡️ Metodología de Pentesting

### Fases de un Test de Penetración

```
1. RECONOCIMIENTO (Recon)
   └─► Recopilar información del objetivo
       ├─ Pasivo: Sin interactuar directamente
       └─ Activo: Interactuando con el sistema

2. ESCANEO
   └─► Identificar servicios y vulnerabilidades
       ├─ Escaneo de puertos
       ├─ Enumeración de servicios
       └─ Detección de vulnerabilidades

3. EXPLOTACIÓN
   └─► Aprovechar las vulnerabilidades encontradas
       ├─ Ganar acceso inicial
       └─ Escalar privilegios

4. POST-EXPLOTACIÓN
   └─► Mantener acceso y extraer información
       ├─ Persistencia
       ├─ Movimiento lateral
       └─ Exfiltración de datos

5. REPORTE
   └─► Documentar hallazgos y recomendaciones
       ├─ Resumen ejecutivo
       ├─ Detalles técnicos
       └─ Recomendaciones de remediación
```

---

## 📚 Conceptos Esenciales

### Vulnerabilidad vs Exploit vs Payload

| Concepto | Definición | Ejemplo |
|----------|------------|---------|
| **Vulnerabilidad** | Debilidad en un sistema | Buffer overflow en servicio |
| **Exploit** | Código que aprovecha la vulnerabilidad | Script que explota el buffer |
| **Payload** | Código que se ejecuta tras explotar | Shell reversa, keylogger |

### CVE (Common Vulnerabilities and Exposures)

Sistema de identificación único para vulnerabilidades conocidas:
- Formato: `CVE-AÑO-NÚMERO`
- Ejemplo: `CVE-2021-44228` (Log4Shell)

### CVSS (Common Vulnerability Scoring System)

Puntuación de gravedad de vulnerabilidades:
- **0.0**: Ninguna
- **0.1-3.9**: Baja 🟢
- **4.0-6.9**: Media 🟡
- **7.0-8.9**: Alta 🟠
- **9.0-10.0**: Crítica 🔴

---

## 🏋️ Ejercicios Prácticos

### Ejercicio 1: Investigación
1. Busca 3 CVEs recientes y documenta:
   - ¿Qué sistema afectan?
   - ¿Cuál es su puntuación CVSS?
   - ¿Existe parche disponible?

### Ejercicio 2: Análisis de Caso
1. Investiga el ataque a **SolarWinds (2020)**
2. Identifica:
   - Vector de ataque
   - Técnicas utilizadas
   - Impacto
   - Lecciones aprendidas

### Ejercicio 3: Quiz
1. ¿Cuál es la diferencia entre un pentest y un Red Team engagement?
2. ¿Por qué es importante la confidencialidad en un hospital?
3. ¿Qué tipo de hacker reporta vulnerabilidades sin autorización previa?

---

## 📖 Lecturas Recomendadas

1. **"The Web Application Hacker's Handbook"** - Stuttard & Pinto
2. **"Penetration Testing"** - Georgia Weidman
3. **"Hacking: The Art of Exploitation"** - Jon Erickson

---

## ➡️ Siguiente Módulo

[Continúa con Redes y Comunicaciones →](../02-redes/README.md)
