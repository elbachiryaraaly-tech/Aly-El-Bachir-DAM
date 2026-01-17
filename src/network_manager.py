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
        print("Iniciando actualización de configuración universal (Flash)...")
        time.sleep(2)
        print("Actualizando lista de PLMN preferidos...")
        print("Descargando perfiles de Roaming global...")
        return True, "Configuración actualizada. Reinicie el dispositivo para aplicar cambios."
