import os
import shutil
import platform
import ctypes

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def get_size(path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # saltar si es enlace simbólico
            if not os.path.islink(fp):
                try:
                    total_size += os.path.getsize(fp)
                except OSError:
                    continue
    return total_size

def clean_directory(folder_path):
    if not os.path.exists(folder_path):
        return 0
    
    deleted_size = 0
    print(f"Limpiando: {folder_path}...")
    
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        try:
            if os.path.isfile(item_path) or os.path.islink(item_path):
                size = os.path.getsize(item_path)
                os.unlink(item_path)
                deleted_size += size
                print(f"  Borrado: {item}")
            elif os.path.isdir(item_path):
                size = get_size(item_path)
                shutil.rmtree(item_path)
                deleted_size += size
                print(f"  Borrado carpeta: {item}")
        except Exception as e:
            # Archivos en uso o sin permisos
            print(f"  No se pudo borrar {item}: {e}")
            
    return deleted_size

def main():
    if platform.system() != "Windows":
        print("Este script está diseñado principalmente para Windows.")
    
    # Directorios comunes de temporales en Windows
    temp_dirs = [
        os.environ.get('TEMP'), # Usuario Temp
        os.environ.get('TMP'),
        r'C:\Windows\Temp',      # Sistema Temp
        r'C:\Windows\Prefetch'
    ]
    
    # Eliminar duplicados y Nones
    temp_dirs = list(set([d for d in temp_dirs if d]))
    
    total_freed = 0
    
    print("Iniciando limpieza de espacio rápida...")
    if not is_admin():
        print("ADVERTENCIA: No se está ejecutando como administrador. Algunos archivos de sistema no podrán borrarse.")
    
    for folder in temp_dirs:
        total_freed += clean_directory(folder)
        
    mb_freed = total_freed / (1024 * 1024)
    print(f"\nLimpieza completada.")
    print(f"Espacio liberado estimado: {mb_freed:.2f} MB")
    print("Recuerda vaciar la Papelera de Reciclaje manualmente para liberar más espacio.")

if __name__ == "__main__":
    main()
