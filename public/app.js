/**
 * Device Location Tracker
 * Aplicación de rastreo de ubicación en tiempo real con máxima precisión
 */

class LocationTracker {
    constructor() {
        // Estado de la aplicación
        this.socket = null;
        this.map = null;
        this.myMarker = null;
        this.myAccuracyCircle = null;
        this.deviceMarkers = new Map();
        this.deviceAccuracyCircles = new Map();
        this.watchId = null;
        this.isTracking = false;
        
        // Configuración
        this.config = {
            deviceName: '',
            deviceType: 'mobile',
            syncCode: '',
            highAccuracy: true,
            updateInterval: 3000,
            showAccuracyCircle: true,
            keepScreenOn: false
        };
        
        // Mi ubicación actual
        this.myLocation = null;
        
        // Inicializar
        this.init();
    }
    
    init() {
        this.loadConfig();
        this.setupEventListeners();
        this.detectDeviceType();
    }
    
    // ===== Configuración y Almacenamiento =====
    loadConfig() {
        const saved = localStorage.getItem('locationTrackerConfig');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.config = { ...this.config, ...parsed };
                
                // Restaurar valores en el formulario
                document.getElementById('device-name').value = this.config.deviceName;
                document.getElementById('sync-code').value = this.config.syncCode;
                
                // Seleccionar tipo de dispositivo
                const typeBtn = document.querySelector(`[data-type="${this.config.deviceType}"]`);
                if (typeBtn) typeBtn.classList.add('selected');
            } catch (e) {
                console.error('Error loading config:', e);
            }
        }
    }
    
    saveConfig() {
        localStorage.setItem('locationTrackerConfig', JSON.stringify(this.config));
    }
    
    // ===== Detectar tipo de dispositivo =====
    detectDeviceType() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
        
        let detectedType = 'desktop';
        if (isTablet) detectedType = 'tablet';
        else if (isMobile) detectedType = 'mobile';
        
        // Auto-seleccionar si no hay selección previa
        if (!this.config.deviceType || !document.querySelector('.type-btn.selected')) {
            this.config.deviceType = detectedType;
            const typeBtn = document.querySelector(`[data-type="${detectedType}"]`);
            if (typeBtn) typeBtn.classList.add('selected');
        }
        
        // Sugerir nombre de dispositivo
        if (!this.config.deviceName) {
            const deviceNames = {
                mobile: 'Mi Móvil',
                tablet: 'Mi Tablet',
                desktop: 'Mi Ordenador'
            };
            document.getElementById('device-name').placeholder = deviceNames[detectedType];
        }
    }
    
    // ===== Event Listeners =====
    setupEventListeners() {
        // Selector de tipo de dispositivo
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.config.deviceType = btn.dataset.type;
                this.validateForm();
            });
        });
        
        // Generar código de sincronización
        document.getElementById('generate-code').addEventListener('click', () => {
            const code = this.generateSyncCode();
            document.getElementById('sync-code').value = code;
            this.validateForm();
            this.showToast('📋 Código generado: ' + code, 'success');
        });
        
        // Validar formulario en tiempo real
        document.getElementById('device-name').addEventListener('input', () => this.validateForm());
        document.getElementById('sync-code').addEventListener('input', () => this.validateForm());
        
        // Comenzar rastreo
        document.getElementById('start-tracking').addEventListener('click', () => this.startTracking());
        
        // Controles del mapa
        document.getElementById('center-map').addEventListener('click', () => this.centerOnMyLocation());
        document.getElementById('fit-all').addEventListener('click', () => this.fitAllDevices());
        document.getElementById('refresh-location').addEventListener('click', () => this.forceLocationUpdate());
        
        // Panel de dispositivos
        document.getElementById('toggle-panel').addEventListener('click', () => {
            document.getElementById('devices-panel').classList.toggle('collapsed');
        });
        
        // Modal de configuración
        document.getElementById('settings-btn').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.add('active');
        });
        
        document.getElementById('close-settings').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.remove('active');
        });
        
        // Configuración
        document.getElementById('high-accuracy').addEventListener('change', (e) => {
            this.config.highAccuracy = e.target.checked;
            this.saveConfig();
            if (this.isTracking) this.restartLocationWatch();
        });
        
        document.getElementById('update-interval').addEventListener('change', (e) => {
            this.config.updateInterval = parseInt(e.target.value);
            this.saveConfig();
            if (this.isTracking) this.restartLocationWatch();
        });
        
        document.getElementById('show-accuracy-circle').addEventListener('change', (e) => {
            this.config.showAccuracyCircle = e.target.checked;
            this.saveConfig();
            this.toggleAccuracyCircles(e.target.checked);
        });
        
        document.getElementById('keep-screen-on').addEventListener('change', (e) => {
            this.config.keepScreenOn = e.target.checked;
            this.saveConfig();
            this.toggleWakeLock(e.target.checked);
        });
        
        // Desconectar
        document.getElementById('disconnect-btn').addEventListener('click', () => {
            this.disconnect();
        });
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') {
                document.getElementById('settings-modal').classList.remove('active');
            }
        });
        
        // Manejar visibilidad de la página
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.isTracking) {
                this.forceLocationUpdate();
            }
        });
    }
    
    validateForm() {
        const name = document.getElementById('device-name').value.trim();
        const code = document.getElementById('sync-code').value.trim();
        const hasType = document.querySelector('.type-btn.selected');
        
        const isValid = code.length >= 4 && hasType;
        document.getElementById('start-tracking').disabled = !isValid;
        
        return isValid;
    }
    
    generateSyncCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    // ===== Inicio del Tracking =====
    async startTracking() {
        // Verificar permisos de geolocalización
        if (!navigator.geolocation) {
            this.showToast('❌ Tu navegador no soporta geolocalización', 'error');
            return;
        }
        
        // Obtener valores del formulario
        this.config.deviceName = document.getElementById('device-name').value.trim() || 
            (this.config.deviceType === 'mobile' ? 'Mi Móvil' : 
             this.config.deviceType === 'tablet' ? 'Mi Tablet' : 'Mi Ordenador');
        this.config.syncCode = document.getElementById('sync-code').value.trim().toUpperCase();
        
        this.saveConfig();
        
        // Mostrar pantalla de tracking
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('tracking-screen').classList.add('active');
        
        // Actualizar UI
        document.getElementById('current-sync-code').textContent = this.config.syncCode;
        document.getElementById('my-device-name').textContent = this.config.deviceName;
        
        // Inicializar mapa
        this.initMap();
        
        // Conectar al servidor
        this.connectToServer();
        
        // Iniciar geolocalización
        this.startLocationWatch();
        
        this.isTracking = true;
    }
    
    // ===== Mapa =====
    initMap() {
        // Crear mapa centrado en España por defecto
        this.map = L.map('map', {
            center: [40.4168, -3.7038],
            zoom: 6,
            zoomControl: false
        });
        
        // Añadir capa de mapa (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);
        
        // Controles de zoom en la esquina superior izquierda
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
        
        // Manejar redimensionamiento
        setTimeout(() => this.map.invalidateSize(), 100);
        window.addEventListener('resize', () => this.map.invalidateSize());
    }
    
    createMarker(location, isMyDevice = false, deviceInfo = null) {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-inner ${isMyDevice ? 'my-marker' : ''}">
                    <div class="marker-pulse"></div>
                    <div class="marker-icon">${this.getDeviceIcon(deviceInfo?.type || this.config.deviceType, isMyDevice)}</div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        const marker = L.marker([location.latitude, location.longitude], { icon });
        
        // Popup con información
        const name = isMyDevice ? this.config.deviceName : deviceInfo?.name;
        marker.bindPopup(`
            <div style="text-align: center; min-width: 150px;">
                <strong>${name}</strong><br>
                <small style="color: #666;">
                    Lat: ${location.latitude.toFixed(6)}<br>
                    Lng: ${location.longitude.toFixed(6)}
                </small>
            </div>
        `);
        
        marker.addTo(this.map);
        return marker;
    }
    
    createAccuracyCircle(location, accuracy) {
        return L.circle([location.latitude, location.longitude], {
            radius: accuracy,
            color: '#667eea',
            fillColor: '#667eea',
            fillOpacity: 0.1,
            weight: 1
        }).addTo(this.map);
    }
    
    getDeviceIcon(type, isMyDevice = false) {
        if (isMyDevice) return '📍';
        
        const icons = {
            mobile: '📱',
            tablet: '📲',
            desktop: '💻'
        };
        return icons[type] || '📍';
    }
    
    updateMyMarker(location, accuracy) {
        if (!this.map) return;
        
        if (!this.myMarker) {
            this.myMarker = this.createMarker(location, true);
            this.map.setView([location.latitude, location.longitude], 16);
        } else {
            this.myMarker.setLatLng([location.latitude, location.longitude]);
        }
        
        // Actualizar círculo de precisión
        if (this.config.showAccuracyCircle) {
            if (!this.myAccuracyCircle) {
                this.myAccuracyCircle = this.createAccuracyCircle(location, accuracy);
            } else {
                this.myAccuracyCircle.setLatLng([location.latitude, location.longitude]);
                this.myAccuracyCircle.setRadius(accuracy);
            }
        }
    }
    
    updateDeviceMarker(deviceId, data) {
        if (!this.map || !data.location) return;
        
        const location = data.location;
        
        if (this.deviceMarkers.has(deviceId)) {
            // Actualizar marcador existente
            const marker = this.deviceMarkers.get(deviceId);
            marker.setLatLng([location.latitude, location.longitude]);
            
            if (this.deviceAccuracyCircles.has(deviceId)) {
                const circle = this.deviceAccuracyCircles.get(deviceId);
                circle.setLatLng([location.latitude, location.longitude]);
                circle.setRadius(data.accuracy || 100);
            }
        } else {
            // Crear nuevo marcador
            const marker = this.createMarker(location, false, data);
            this.deviceMarkers.set(deviceId, marker);
            
            if (this.config.showAccuracyCircle && data.accuracy) {
                const circle = this.createAccuracyCircle(location, data.accuracy);
                circle.setStyle({ color: '#764ba2', fillColor: '#764ba2' });
                this.deviceAccuracyCircles.set(deviceId, circle);
            }
        }
    }
    
    removeDeviceMarker(deviceId) {
        if (this.deviceMarkers.has(deviceId)) {
            this.map.removeLayer(this.deviceMarkers.get(deviceId));
            this.deviceMarkers.delete(deviceId);
        }
        
        if (this.deviceAccuracyCircles.has(deviceId)) {
            this.map.removeLayer(this.deviceAccuracyCircles.get(deviceId));
            this.deviceAccuracyCircles.delete(deviceId);
        }
    }
    
    centerOnMyLocation() {
        if (this.myLocation && this.map) {
            this.map.setView([this.myLocation.latitude, this.myLocation.longitude], 17);
        }
    }
    
    fitAllDevices() {
        if (!this.map) return;
        
        const bounds = [];
        
        if (this.myLocation) {
            bounds.push([this.myLocation.latitude, this.myLocation.longitude]);
        }
        
        this.deviceMarkers.forEach(marker => {
            bounds.push(marker.getLatLng());
        });
        
        if (bounds.length > 0) {
            this.map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
    
    toggleAccuracyCircles(show) {
        if (show) {
            if (this.myLocation && !this.myAccuracyCircle) {
                this.myAccuracyCircle = this.createAccuracyCircle(this.myLocation, 100);
            }
        } else {
            if (this.myAccuracyCircle) {
                this.map.removeLayer(this.myAccuracyCircle);
                this.myAccuracyCircle = null;
            }
            this.deviceAccuracyCircles.forEach(circle => {
                this.map.removeLayer(circle);
            });
            this.deviceAccuracyCircles.clear();
        }
    }
    
    // ===== WebSocket Connection =====
    connectToServer() {
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('Conectado al servidor');
            document.getElementById('connection-status').classList.add('connected');
            document.getElementById('connection-status').classList.remove('disconnected');
            
            // Registrar dispositivo
            this.socket.emit('register-device', {
                name: this.config.deviceName,
                type: this.config.deviceType,
                syncCode: this.config.syncCode
            });
            
            this.showToast('✅ Conectado al servidor', 'success');
        });
        
        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
            document.getElementById('connection-status').classList.remove('connected');
            document.getElementById('connection-status').classList.add('disconnected');
            this.showToast('⚠️ Desconectado del servidor', 'warning');
        });
        
        this.socket.on('devices-list', (devices) => {
            console.log('Dispositivos en el grupo:', devices);
            devices.forEach(device => {
                this.addDeviceToList(device);
                if (device.location) {
                    this.updateDeviceMarker(device.id, device);
                }
            });
        });
        
        this.socket.on('device-joined', (device) => {
            console.log('Nuevo dispositivo unido:', device);
            this.addDeviceToList(device);
            this.showToast(`📱 ${device.name} se ha conectado`, 'success');
        });
        
        this.socket.on('device-left', (device) => {
            console.log('Dispositivo desconectado:', device);
            this.removeDeviceFromList(device.id);
            this.removeDeviceMarker(device.id);
            this.showToast(`📴 ${device.name} se ha desconectado`, 'warning');
        });
        
        this.socket.on('location-update', (data) => {
            console.log('Actualización de ubicación:', data);
            this.updateDeviceInList(data);
            this.updateDeviceMarker(data.id, data);
        });
        
        this.socket.on('location-requested', (data) => {
            // Alguien solicitó nuestra ubicación, enviarla inmediatamente
            this.forceLocationUpdate();
        });
    }
    
    // ===== Geolocalización =====
    startLocationWatch() {
        const options = {
            enableHighAccuracy: this.config.highAccuracy,
            maximumAge: 0,
            timeout: 10000
        };
        
        // Obtener ubicación inicial
        navigator.geolocation.getCurrentPosition(
            (position) => this.handleLocationUpdate(position),
            (error) => this.handleLocationError(error),
            options
        );
        
        // Configurar watch para actualizaciones continuas
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handleLocationUpdate(position),
            (error) => this.handleLocationError(error),
            options
        );
    }
    
    handleLocationUpdate(position) {
        const { latitude, longitude, accuracy, altitude, speed, heading } = position.coords;
        
        this.myLocation = {
            latitude,
            longitude,
            altitude
        };
        
        // Actualizar mapa
        this.updateMyMarker(this.myLocation, accuracy);
        
        // Actualizar UI
        this.updateMyLocationUI(latitude, longitude, accuracy);
        this.updateAccuracyBadge(accuracy);
        
        // Enviar al servidor
        if (this.socket && this.socket.connected) {
            this.socket.emit('update-location', {
                latitude,
                longitude,
                altitude,
                accuracy,
                speed,
                heading
            });
        }
    }
    
    handleLocationError(error) {
        console.error('Error de geolocalización:', error);
        
        let message = '';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = '❌ Permisos de ubicación denegados. Por favor, activa los permisos en tu navegador.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = '❌ No se puede obtener la ubicación. Verifica que el GPS esté activado.';
                break;
            case error.TIMEOUT:
                message = '⏱️ Tiempo de espera agotado al obtener ubicación.';
                break;
            default:
                message = '❌ Error desconocido al obtener ubicación.';
        }
        
        this.showToast(message, 'error');
    }
    
    forceLocationUpdate() {
        if (!navigator.geolocation) return;
        
        const options = {
            enableHighAccuracy: this.config.highAccuracy,
            maximumAge: 0,
            timeout: 10000
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.handleLocationUpdate(position);
                this.showToast('📍 Ubicación actualizada', 'success');
            },
            (error) => this.handleLocationError(error),
            options
        );
    }
    
    restartLocationWatch() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
        }
        this.startLocationWatch();
    }
    
    updateMyLocationUI(lat, lng, accuracy) {
        document.getElementById('my-lat').textContent = lat.toFixed(6);
        document.getElementById('my-lng').textContent = lng.toFixed(6);
        document.getElementById('my-accuracy').textContent = accuracy.toFixed(0) + 'm';
        document.getElementById('my-update-time').textContent = new Date().toLocaleTimeString();
    }
    
    updateAccuracyBadge(accuracy) {
        const badge = document.getElementById('accuracy-badge');
        const value = document.getElementById('accuracy-value');
        
        value.textContent = `±${accuracy.toFixed(0)}m`;
        
        // Clasificar precisión
        badge.classList.remove('excellent', 'good', 'fair', 'poor');
        
        if (accuracy <= 5) {
            badge.classList.add('excellent');
        } else if (accuracy <= 15) {
            badge.classList.add('good');
        } else if (accuracy <= 50) {
            badge.classList.add('fair');
        } else {
            badge.classList.add('poor');
        }
    }
    
    // ===== Lista de Dispositivos =====
    addDeviceToList(device) {
        const list = document.getElementById('devices-list');
        
        // Verificar si ya existe
        if (document.getElementById(`device-${device.id}`)) {
            return this.updateDeviceInList(device);
        }
        
        const card = document.createElement('div');
        card.className = 'device-card';
        card.id = `device-${device.id}`;
        
        card.innerHTML = `
            <div class="device-header">
                <span class="device-icon">${this.getDeviceIcon(device.type)}</span>
                <div class="device-info">
                    <div class="device-name">${device.name}</div>
                    <div class="device-status" data-status>Conectado</div>
                </div>
            </div>
            <div class="device-coords">
                <span data-lat>Lat: ${device.location ? device.location.latitude.toFixed(6) : '--'}</span>
                <span data-lng>Lng: ${device.location ? device.location.longitude.toFixed(6) : '--'}</span>
            </div>
        `;
        
        card.addEventListener('click', () => {
            if (device.location) {
                this.map.setView([device.location.latitude, device.location.longitude], 17);
            }
        });
        
        list.appendChild(card);
    }
    
    updateDeviceInList(device) {
        const card = document.getElementById(`device-${device.id}`);
        if (!card) return this.addDeviceToList(device);
        
        if (device.location) {
            card.querySelector('[data-lat]').textContent = `Lat: ${device.location.latitude.toFixed(6)}`;
            card.querySelector('[data-lng]').textContent = `Lng: ${device.location.longitude.toFixed(6)}`;
        }
        
        const status = card.querySelector('[data-status]');
        if (device.lastUpdate) {
            const time = new Date(device.lastUpdate);
            status.textContent = `Actualizado: ${time.toLocaleTimeString()}`;
        }
    }
    
    removeDeviceFromList(deviceId) {
        const card = document.getElementById(`device-${deviceId}`);
        if (card) {
            card.remove();
        }
    }
    
    // ===== Wake Lock (mantener pantalla encendida) =====
    async toggleWakeLock(enable) {
        if (!('wakeLock' in navigator)) {
            this.showToast('⚠️ Tu navegador no soporta Wake Lock', 'warning');
            return;
        }
        
        try {
            if (enable) {
                this.wakeLock = await navigator.wakeLock.request('screen');
                this.showToast('🔆 Pantalla mantenida encendida', 'success');
            } else if (this.wakeLock) {
                await this.wakeLock.release();
                this.wakeLock = null;
            }
        } catch (err) {
            console.error('Error con Wake Lock:', err);
        }
    }
    
    // ===== Desconexión =====
    disconnect() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        
        if (this.wakeLock) {
            this.wakeLock.release();
            this.wakeLock = null;
        }
        
        this.isTracking = false;
        
        // Volver a la pantalla de configuración
        document.getElementById('settings-modal').classList.remove('active');
        document.getElementById('tracking-screen').classList.remove('active');
        document.getElementById('setup-screen').classList.add('active');
        
        // Limpiar
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.myMarker = null;
        this.myAccuracyCircle = null;
        this.deviceMarkers.clear();
        this.deviceAccuracyCircles.clear();
        document.getElementById('devices-list').innerHTML = '';
    }
    
    // ===== Toast Notifications =====
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    });
}

// ===== Inicializar Aplicación =====
document.addEventListener('DOMContentLoaded', () => {
    window.tracker = new LocationTracker();
});
