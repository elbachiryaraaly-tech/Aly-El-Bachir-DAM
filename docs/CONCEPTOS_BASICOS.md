# Conceptos Básicos de Ciberseguridad

Para ser "potente" en ciberseguridad, no puedes saltarte los fundamentos. Aquí tienes una introducción a los pilares esenciales.

## 1. La CIA Triad (La Tríada CIA)
Es el modelo fundamental de la seguridad de la información.
*   **Confidencialidad:** Solo las personas autorizadas pueden ver la información. (Ej. Encriptación, contraseñas).
*   **Integridad:** La información no ha sido modificada por terceros no autorizados. (Ej. Hashing, firmas digitales).
*   **Disponibilidad (Availability):** La información está accesible cuando se necesita. (Ej. Protección contra ataques DDoS, copias de seguridad).

## 2. Ética y Legalidad (White Hat vs Black Hat)
*   **White Hat:** Hackers éticos. Tienen permiso para probar la seguridad. Ayudan a mejorarla.
*   **Black Hat:** Cibercriminales. Actúan sin permiso, roban datos, dañan sistemas.
*   **Gray Hat:** Zona gris. A veces violan leyes pero no necesariamente con fines maliciosos.

**Concepto Clave:** *Autorización*. Sin autorización escrita, cualquier test de intrusión es ilegal.

## 3. Redes (Networking) 101
Internet es una red de redes. Entender cómo se hablan los ordenadores es vital.

*   **Dirección IP:** El "DNI" o dirección de un dispositivo en la red (ej. 192.168.1.1).
*   **Puerto:** Puertas numeradas en una IP por donde entran/salen servicios específicos.
    *   Puerto 80: HTTP (Web normal)
    *   Puerto 443: HTTPS (Web segura)
    *   Puerto 22: SSH (Control remoto seguro)
    *   Puerto 53: DNS (Resolución de nombres)
*   **Ping:** Comando para comprobar si un host está vivo.
*   **DNS (Domain Name System):** La "guía telefónica" de internet. Traduce `google.com` a una IP `142.250.184.78`.

## 4. Linux: El Sistema Operativo del Hacker
Linux es preferido por su flexibilidad, código abierto y poderosas herramientas de terminal.

### Comandos de Supervivencia en Terminal
| Comando | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `pwd` | Muestra dónde estás (directorio actual) | `pwd` |
| `ls` | Lista archivos y carpetas | `ls -la` (muestra todo, incluidos ocultos) |
| `cd` | Cambia de directorio | `cd Documentos` |
| `mkdir` | Crea una carpeta nueva | `mkdir Hacking` |
| `cat` | Muestra el contenido de un archivo | `cat notas.txt` |
| `grep` | Busca texto dentro de archivos | `grep "password" config.txt` |
| `chmod` | Cambia permisos de archivos | `chmod +x script.sh` (hace ejecutable) |
| `sudo` | Ejecuta como superusuario (admin) | `sudo apt update` |
| `man` | Muestra el manual de un comando | `man ls` |

## 5. Terminología Común
*   **Vulnerabilidad:** Un fallo o debilidad en un sistema.
*   **Exploit:** Código o técnica que aprovecha una vulnerabilidad.
*   **Payload:** La acción que se ejecuta una vez el exploit tiene éxito (ej. darte una shell remota).
*   **Malware:** Software malicioso (virus, troyanos, ransomware).
*   **Phishing:** Engañar a usuarios para que revelen contraseñas mediante correos falsos.
*   **Firewall:** Barrera que controla el tráfico de red entrante y saliente.

## Próximos Pasos
Lee el archivo `roadmap/ROADMAP.md` para ver tu camino de aprendizaje estructurado.
