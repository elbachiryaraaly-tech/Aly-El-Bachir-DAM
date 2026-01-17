import time
import random

class NetworkManager:
    def __init__(self):
        self.available_networks = [
            {"id": "21407", "name": "Movistar", "country": "ES"},
            {"id": "21401", "name": "Vodafone ES", "country": "ES"},
            {"id": "21403", "name": "Orange ES", "country": "ES"},
            {"id": "60401", "name": "Maroc Telecom", "country": "MA"},
            {"id": "60400", "name": "Meditel", "country": "MA"},
        ]
        self.current_network = None

    def scan_networks(self):
        print("Escaneando redes disponibles...")
        time.sleep(1) # Simular tiempo de escaneo
        return self.available_networks

    def connect(self, sim_card, network_id):
        if sim_card.state != "READY":
            return False, "Error: La tarjeta SIM no está lista para conectarse (Bloqueada o falta PIN)."

        # Simulación de lógica de Roaming
        target_network = next((n for n in self.available_networks if n["id"] == network_id), None)
        
        if not target_network:
            return False, "Red no encontrada."

        print(f"Intentando conectar a {target_network['name']}...")
        time.sleep(1)

        # Simular éxito/fallo basado en acuerdos de roaming (aleatorio para demo)
        if random.random() > 0.2:
            self.current_network = target_network
            return True, f"Conectado exitosamente a {target_network['name']} ({target_network['country']})"
        else:
            return False, "Fallo de conexión: Acceso denegado a la red (posible falta de acuerdo de Roaming)."

    def flash_universal_config(self):
        """
        Simula una actualización de configuración 'flash' para habilitar roaming global.
        En la realidad, esto sería una actualización de perfil OTA o APN, no magia.
        """
        print("\n=== INICIANDO SISTEMA DE FLASHEO UNIVERSAL ===")
        print("[ADVERTENCIA] Este proceso modifica los archivos del sistema simulado.")
        print("[ADVERTENCIA] Recordatorio: Esto NO desbloqueará una tarjeta SIM bloqueada por PUK.\n")
        
        steps = [
            ("Verificando firma criptográfica del paquete...", 0.5),
            ("Montando partición /system en modo escritura...", 0.3),
            ("Haciendo backup de configuración EFS...", 0.8),
            ("Inyectando binarios de 'Universal Baseband'...", 1.2),
            ("Parcheando librerías RIL (Radio Interface Layer)...", 1.0),
            ("Sobrescribiendo lista de APNs globales...", 0.5),
            ("Actualizando perfil de operador a 'WORLD_UNLOCKED'...", 0.7),
            ("Limpiando caché de módem...", 0.4),
            ("Verificando integridad post-instalación...", 0.6)
        ]
        
        total_steps = len(steps)
        for i, (desc, duration) in enumerate(steps):
            print(f"[{i+1}/{total_steps}] {desc}")
            # Barra de progreso simulada
            for _ in range(10):
                print(".", end="", flush=True)
                time.sleep(duration / 10)
            print(" [OK]")
            
        print("\n=== FLASHEO COMPLETADO CON ÉXITO ===")
        print("El terminal ha sido actualizado con la configuración universal.")
        print("NOTA: Si su tarjeta SIM requiere PUK, el sistema operativo actualizado AÚN requerirá ese código.")
        
        return True, "Sistema flasheado correctamente. Reinicio virtual pendiente."
