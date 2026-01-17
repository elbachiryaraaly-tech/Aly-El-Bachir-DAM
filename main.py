from src.sim_card import SimCard
from src.network_manager import NetworkManager
import sys

def main():
    print("=== Sistema de Gestión de SIM Universal (Demo en Cursor) ===")
    print("NOTA: Este es un simulador de software. NO afecta a tarjetas SIM reales.")
    
    # Crear una SIM simulada (como la del usuario)
    my_sim = SimCard(icc_id="8934...", pin="5555", puk="99999999")
    network_mgr = NetworkManager()

    # Simular que el usuario ya gastó intentos
    my_sim.pin_attempts_left = 1
    
    while True:
        print("\n--- Menú Principal ---")
        status = my_sim.get_status()
        print(f"Estado SIM: {status['Estado']} | Intentos PIN: {status['Intentos PIN']} | Intentos PUK: {status['Intentos PUK']}")
        print(f"Red Actual: {network_mgr.current_network['name'] if network_mgr.current_network else 'Desconectado'}")
        
        print("\nOpciones:")
        print("1. Introducir PIN")
        print("2. Introducir PUK")
        print("3. Escanear y Conectar a Red")
        print("4. Ejecutar 'Flash' Universal (Simulación)")
        print("5. Salir")
        
        choice = input("Seleccione una opción: ")

        if choice == "1":
            pin = input("Ingrese PIN: ")
            success, msg = my_sim.verify_pin(pin)
            print(f"Resultado: {msg}")
        
        elif choice == "2":
            puk = input("Ingrese PUK: ")
            new_pin = input("Establezca nuevo PIN: ")
            success, msg = my_sim.verify_puk(puk, new_pin)
            print(f"Resultado: {msg}")

        elif choice == "3":
            networks = network_mgr.scan_networks()
            print("\nRedes encontradas:")
            for idx, net in enumerate(networks):
                print(f"{idx + 1}. {net['name']} ({net['country']})")
            
            try:
                sel = int(input("Seleccione número de red a conectar: ")) - 1
                if 0 <= sel < len(networks):
                    success, msg = network_mgr.connect(my_sim, networks[sel]["id"])
                    print(f"Resultado: {msg}")
                else:
                    print("Selección inválida.")
            except ValueError:
                print("Entrada inválida.")

        elif choice == "4":
            success, msg = network_mgr.flash_universal_config()
            print(f"Resultado: {msg}")

        elif choice == "5":
            print("Saliendo...")
            sys.exit()

if __name__ == "__main__":
    main()
