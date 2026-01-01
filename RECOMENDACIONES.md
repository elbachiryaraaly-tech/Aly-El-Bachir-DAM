# Recomendaciones de Rastreo de Ubicación Multiplataforma

Para rastrear la ubicación con alta precisión entre un móvil y un ordenador, estas son las mejores opciones clasificadas por tipo de uso:

## 1. Soluciones "Listas para usar" (Comerciales)

### **Prey Project** (Recomendada)
Es una de las pocas plataformas verdaderamente multiplataforma y robusta.
- **Dispositivos**: Windows, macOS, Linux, Android, iOS.
- **Funcionalidad**: Permite ver todos tus dispositivos en un mapa centralizado. Utiliza GPS en móviles y triangulación Wi-Fi en ordenadores para alta precisión.
- **Ideal para**: Usuarios que quieren instalar y olvidar.

### **Google Maps (Compartir ubicación)**
- **Funcionalidad**: Puedes compartir tu ubicación en tiempo real desde el móvil y verla en la web de Google Maps en el ordenador.
- **Limitación**: El ordenador no suele compartir su ubicación de vuelta con la misma facilidad/precisión hacia el móvil, es más unidireccional (Móvil -> PC).

## 2. Soluciones para Desarrolladores / Open Source (Autohospedadas)

### **Traccar**
La plataforma de rastreo GPS de código abierto más popular.
- **Cómo funciona**: Instalas el servidor (o usas uno de demostración) y las apps cliente en tus dispositivos.
- **Precisión**: Muy alta. Soporta miles de protocolos.
- **Para el Ordenador**: Puedes ejecutar un cliente simple o scripts que reporten la ubicación.
- **Privacidad**: Total, si lo alojas tú mismo.

### **OwnTracks**
Enfocado en la privacidad ("Tu ubicación es tuya").
- **Cómo funciona**: Usa el protocolo MQTT o HTTP para enviar la ubicación a tu propio servidor.
- **Integración**: Se integra muy bien con sistemas de domótica como Home Assistant.

## Resumen
- Si buscas **facilidad**: Usa **Prey**.
- Si buscas **control total y código**: Usa **Traccar**.

---

### ¿Quieres construir tu propio rastreador?
Como asistente de programación, puedo ayudarte a crear un script simple en Python para tu ordenador que:
1. Obtenga la ubicación actual (usando redes Wi-Fi o IP).
2. Envíe las coordenadas a un servidor o base de datos compartida.
