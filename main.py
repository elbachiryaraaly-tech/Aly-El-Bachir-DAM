import cv2
import numpy as np
from ultralytics import YOLO
import math

class CameraHunter:
    def __init__(self, model_path='yolov8n.pt'):
        print("Cargando modelo neuronal...")
        # Usamos YOLOv8 nano para velocidad. Descargará el modelo automáticamente.
        self.model = YOLO(model_path)
        # Clases que nos interesan (según COCO dataset): 67: cell phone, 0: person
        self.target_classes = [0, 67] 
        
    def detect_threats(self, frame):
        """
        Detección basada en IA: Busca personas sosteniendo teléfonos en posición de foto.
        """
        results = self.model(frame, stream=True, verbose=False)
        threats = []
        
        # Listas temporales para correlación
        phones = []
        persons = []

        for r in results:
            boxes = r.boxes
            for box in boxes:
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                xyxy = list(map(int, box.xyxy[0]))
                
                if conf > 0.4:
                    if cls == 67: # Cell phone
                        phones.append({'bbox': xyxy, 'conf': conf})
                    elif cls == 0: # Person
                        persons.append({'bbox': xyxy, 'conf': conf})

        # Análisis de Amenaza Avanzado
        for phone in phones:
            px1, py1, px2, py2 = phone['bbox']
            
            is_threat = False
            threat_level = "POSSIBLE"
            
            # Heurística: ¿Hay una persona detrás?
            has_owner = False
            for person in persons:
                ox1, oy1, ox2, oy2 = person['bbox']
                
                # Chequear superposición simple
                if px1 > ox1 and px2 < ox2 and py1 > oy1 and py2 < oy2:
                    has_owner = True
                    
                    # Heurística de altura: Si el teléfono está en la mitad superior de la persona (cerca de la cara)
                    person_h = oy2 - oy1
                    relative_pos = (py1 - oy1) / person_h
                    
                    if relative_pos < 0.45: # Está alto (cerca de ojos/cabeza)
                        is_threat = True
                        threat_level = "HIGH"

            # Si se detecta un móvil con alta confianza y tiene "dueño", o si está en posición de amenaza
            if is_threat or (has_owner and phone['conf'] > 0.6):
                threats.append({
                    "type": "camera/phone",
                    "bbox": (px1, py1, px2, py2),
                    "conf": phone['conf'],
                    "level": threat_level
                })
                    
        return threats

    def detect_glint(self, frame, threshold=240):
        """
        Detecta reflejos brillantes (retro-reflexión de lentes).
        Requiere iluminación IR activa montada coaxialmente con la cámara.
        """
        # Convertir a escala de grises
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Buscar áreas extremadamente brillantes
        _, mask = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
        
        # Encontrar contornos
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        glint_threats = []
        for cnt in contours:
            area = cv2.contourArea(cnt)
            # Filtrar por tamaño (ni ruido muy pequeño, ni ventanas grandes)
            if 10 < area < 500: 
                x, y, w, h = cv2.boundingRect(cnt)
                
                # Circularidad: las lentes suelen ser redondas
                perimeter = cv2.arcLength(cnt, True)
                if perimeter == 0: continue
                circularity = 4 * math.pi * (area / (perimeter * perimeter))
                
                if circularity > 0.7: # Es bastante circular
                    glint_threats.append({
                        "type": "optic_glint",
                        "bbox": (x, y, x+w, y+h),
                        "conf": 1.0, 
                        "level": "CRITICAL" # Un reflejo de lente es una señal muy fuerte
                    })
        
        return glint_threats

    def draw_hud(self, frame, threats):
        # Efecto visual "Bestial" (HUD futurista)
        overlay = frame.copy()
        
        if not threats:
            status_color = (0, 255, 0) # Verde
            status_text = "SEGURO - ESCANEANDO"
        else:
            # Determinar nivel máximo de amenaza
            max_level = "POSSIBLE"
            for t in threats:
                if t['level'] == "CRITICAL": max_level = "CRITICAL"
                elif t['level'] == "HIGH" and max_level != "CRITICAL": max_level = "HIGH"

            if max_level == "CRITICAL":
                status_color = (0, 0, 255) # Rojo puro
                status_text = "¡ALERTA CRITICA! OPTICA DETECTADA"
            elif max_level == "HIGH":
                status_color = (0, 165, 255) # Naranja
                status_text = "¡ALERTA! POSIBLE FOTOGRAFIA"
            else:
                status_color = (0, 255, 255) # Amarillo
                status_text = "PRECAUCION - DISPOSITIVO VISIBLE"
            
            # Dibujar cajas de amenaza
            for threat in threats:
                x1, y1, x2, y2 = threat['bbox']
                color = status_color
                
                # Caja dinámica
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 3)
                
                # Lineas de mira hacia el centro (efecto target)
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                cv2.line(frame, (cx-10, cy), (cx+10, cy), color, 2)
                cv2.line(frame, (cx, cy-10), (cx, cy+10), color, 2)
                
                label = f"{threat['type']} [{threat['level']}]"
                cv2.putText(frame, label, (x1, y1-10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        # Barra de estado superior
        cv2.rectangle(overlay, (0, 0), (frame.shape[1], 50), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        cv2.putText(frame, status_text, (20, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.8, status_color, 2)
        
        return frame

def main():
    print("Iniciando Sistema de Contra-Vigilancia...")
    
    # Iniciar cámara (0 suele ser la webcam integrada)
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: No se detecta cámara local.")
        return

    hunter = CameraHunter()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 1. Detección por IA (Visión)
        ai_threats = hunter.detect_threats(frame)
        
        # 2. Detección Óptica (Simulada si no hay HW IR, pero funcional en código)
        glint_threats = hunter.detect_glint(frame)
        
        # Combinar amenazas
        all_threats = ai_threats + glint_threats
        
        # 3. Visualización
        frame = hunter.draw_hud(frame, all_threats)
        
        # Mostrar resultado
        cv2.imshow('Counter-Surveillance System', frame)

        # Salir con 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
