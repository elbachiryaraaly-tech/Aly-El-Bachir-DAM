// Configuración global
const CONFIG = {
    SERVER_URL: window.location.origin,
    LOCATION_UPDATE_INTERVAL: 5000, // 5 segundos
    HIGH_ACCURACY: true,
    ENABLE_HIGH_ACCURACY: true,
    MAXIMUM_AGE: 0,
    TIMEOUT: 10000
};

// Estado de la aplicación
const AppState = {
    socket: null,
    map: null,
    markers: new Map(),
    currentDevice: null,
    isTracking: false,
    watchId: null,
    devices: new Map()
};

// Utilidades
const Utils = {
    // Guardar en localStorage
    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    },
    
    // Cargar desde localStorage
    loadFromStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error cargando desde localStorage:', error);
            return null;
        }
    },
    
    // Detectar tipo de dispositivo automáticamente
    detectDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    },
    
    // Formatear fecha
    formatDate(date) {
        if (!date) return '--';
        const d = new Date(date);
        return d.toLocaleTimeString('es-ES');
    },
    
    // Formatear precisión
    formatAccuracy(meters) {
        if (!meters) return '--';
        if (meters < 1000) {
            return `${Math.round(meters)}m`;
        }
        return `${(meters / 1000).toFixed(2)}km`;
    },
    
    // Calcular tiempo transcurrido
    timeAgo(date) {
        if (!date) return 'Nunca';
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'Ahora';
        if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`;
        return `Hace ${Math.floor(seconds / 86400)}d`;
    },
    
    // Obtener emoji para tipo de dispositivo
    getDeviceEmoji(type) {
        const emojis = {
            mobile: '📱',
            tablet: '📱',
            desktop: '💻',
            laptop: '💻'
        };
        return emojis[type] || '📱';
    }
};

// Sistema de notificaciones
const Toast = {
    show(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div>${message}</div>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Gestión de geolocalización
const LocationManager = {
    // Solicitar permisos de ubicación
    async requestPermission() {
        if (!navigator.geolocation) {
            Toast.show('Tu navegador no soporta geolocalización', 'error');
            return false;
        }
        
        try {
            const result = await navigator.permissions.query({ name: 'geolocation' });
            if (result.state === 'denied') {
                Toast.show('Permiso de ubicación denegado. Actívalo en configuración.', 'error');
                return false;
            }
            return true;
        } catch (error) {
            // Si no se puede consultar el permiso, intentar obtener la ubicación directamente
            return true;
        }
    },
    
    // Obtener ubicación actual con máxima precisión
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            const options = {
                enableHighAccuracy: CONFIG.ENABLE_HIGH_ACCURACY,
                timeout: CONFIG.TIMEOUT,
                maximumAge: CONFIG.MAXIMUM_AGE
            };
            
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(this.processPosition(position)),
                (error) => reject(this.handleError(error)),
                options
            );
        });
    },
    
    // Procesar posición recibida
    processPosition(position) {
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: new Date(position.timestamp).toISOString()
        };
    },
    
    // Manejar errores de geolocalización
    handleError(error) {
        const errors = {
            1: 'Permiso de ubicación denegado',
            2: 'Ubicación no disponible',
            3: 'Tiempo de espera excedido'
        };
        return new Error(errors[error.code] || 'Error desconocido');
    },
    
    // Iniciar rastreo continuo
    startTracking(callback) {
        const options = {
            enableHighAccuracy: CONFIG.ENABLE_HIGH_ACCURACY,
            timeout: CONFIG.TIMEOUT,
            maximumAge: CONFIG.MAXIMUM_AGE
        };
        
        AppState.watchId = navigator.geolocation.watchPosition(
            (position) => callback(this.processPosition(position)),
            (error) => {
                console.error('Error en rastreo:', error);
                Toast.show('Error actualizando ubicación', 'warning');
            },
            options
        );
    },
    
    // Detener rastreo
    stopTracking() {
        if (AppState.watchId) {
            navigator.geolocation.clearWatch(AppState.watchId);
            AppState.watchId = null;
        }
    }
};

// Gestión del mapa
const MapManager = {
    // Inicializar mapa
    init() {
        AppState.map = L.map('map').setView([40.416775, -3.703790], 13); // Madrid por defecto
        
        // Añadir capa de tiles (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(AppState.map);
        
        // Añadir control de escala
        L.control.scale().addTo(AppState.map);
    },
    
    // Añadir o actualizar marcador
    updateMarker(deviceId, device) {
        if (!device.location) return;
        
        const { latitude, longitude, accuracy } = device.location;
        const isCurrentDevice = deviceId === AppState.currentDevice?.id;
        
        // Eliminar marcador anterior si existe
        if (AppState.markers.has(deviceId)) {
            AppState.map.removeLayer(AppState.markers.get(deviceId).marker);
            if (AppState.markers.get(deviceId).circle) {
                AppState.map.removeLayer(AppState.markers.get(deviceId).circle);
            }
        }
        
        // Crear icono personalizado
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: ${isCurrentDevice ? '#2563eb' : '#10b981'};
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    border: 3px solid white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                ">
                    ${Utils.getDeviceEmoji(device.type)}
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
        
        // Crear marcador
        const marker = L.marker([latitude, longitude], { icon })
            .addTo(AppState.map)
            .bindPopup(`
                <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0;">${device.name}</h3>
                    <p style="margin: 5px 0;"><strong>Precisión:</strong> ${Utils.formatAccuracy(accuracy)}</p>
                    <p style="margin: 5px 0;"><strong>Última actualización:</strong><br>${Utils.timeAgo(device.location.timestamp)}</p>
                    ${isCurrentDevice ? '<p style="color: #2563eb; font-weight: bold; margin: 10px 0 0 0;">📍 Este eres tú</p>' : ''}
                </div>
            `);
        
        // Crear círculo de precisión
        const circle = L.circle([latitude, longitude], {
            radius: accuracy,
            color: isCurrentDevice ? '#2563eb' : '#10b981',
            fillColor: isCurrentDevice ? '#2563eb' : '#10b981',
            fillOpacity: 0.1,
            weight: 2
        }).addTo(AppState.map);
        
        AppState.markers.set(deviceId, { marker, circle });
    },
    
    // Centrar mapa en un dispositivo
    centerOnDevice(deviceId) {
        const markerData = AppState.markers.get(deviceId);
        if (markerData) {
            const latlng = markerData.marker.getLatLng();
            AppState.map.setView(latlng, 15, { animate: true });
            markerData.marker.openPopup();
        }
    },
    
    // Ajustar vista para mostrar todos los marcadores
    fitAllMarkers() {
        if (AppState.markers.size > 0) {
            const bounds = L.latLngBounds();
            AppState.markers.forEach(({ marker }) => {
                bounds.extend(marker.getLatLng());
            });
            AppState.map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
};

// Gestión de Socket.IO
const SocketManager = {
    // Conectar al servidor
    connect() {
        AppState.socket = io(CONFIG.SERVER_URL);
        
        AppState.socket.on('connect', () => {
            console.log('Conectado al servidor');
            this.updateConnectionStatus(true);
            Toast.show('Conectado al servidor', 'success');
            
            // Re-registrar dispositivo si ya existe
            if (AppState.currentDevice) {
                this.registerDevice(AppState.currentDevice);
            }
        });
        
        AppState.socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
            this.updateConnectionStatus(false);
            Toast.show('Desconectado del servidor', 'warning');
        });
        
        AppState.socket.on('device-registered', (data) => {
            console.log('Dispositivo registrado:', data.device);
        });
        
        AppState.socket.on('devices-list', (data) => {
            console.log('Lista de dispositivos recibida:', data.devices);
            data.devices.forEach(device => {
                AppState.devices.set(device.id, device);
                if (device.location) {
                    MapManager.updateMarker(device.id, device);
                }
            });
            UI.updateDevicesList();
            UI.updateStats();
        });
        
        AppState.socket.on('location-update', (data) => {
            console.log('Actualización de ubicación:', data);
            AppState.devices.set(data.deviceId, data.device);
            MapManager.updateMarker(data.deviceId, data.device);
            UI.updateDevicesList();
            UI.updateStats();
        });
        
        AppState.socket.on('new-device', (data) => {
            console.log('Nuevo dispositivo:', data.device);
            AppState.devices.set(data.device.id, data.device);
            UI.updateDevicesList();
            UI.updateStats();
            Toast.show(`Nuevo dispositivo: ${data.device.name}`, 'success');
        });
        
        AppState.socket.on('location-requested', async () => {
            console.log('Ubicación solicitada por otro dispositivo');
            if (AppState.isTracking) {
                try {
                    const location = await LocationManager.getCurrentLocation();
                    this.updateLocation(AppState.currentDevice.id, location);
                } catch (error) {
                    console.error('Error obteniendo ubicación solicitada:', error);
                }
            }
        });
    },
    
    // Registrar dispositivo
    registerDevice(device) {
        AppState.socket.emit('register-device', device);
    },
    
    // Actualizar ubicación
    updateLocation(deviceId, location) {
        AppState.socket.emit('update-location', { deviceId, location });
    },
    
    // Actualizar estado de conexión en UI
    updateConnectionStatus(connected) {
        const statusEl = document.getElementById('connection-status');
        if (connected) {
            statusEl.classList.remove('disconnected');
        } else {
            statusEl.classList.add('disconnected');
        }
    }
};

// Gestión de UI
const UI = {
    // Inicializar UI
    init() {
        // Verificar si ya hay un dispositivo registrado
        const savedDevice = Utils.loadFromStorage('currentDevice');
        if (savedDevice) {
            AppState.currentDevice = savedDevice;
            this.showMainScreen();
        } else {
            this.showSetupScreen();
        }
    },
    
    // Mostrar pantalla de configuración
    showSetupScreen() {
        document.getElementById('setup-screen').style.display = 'flex';
        document.getElementById('main-screen').style.display = 'none';
        
        // Detectar tipo de dispositivo automáticamente
        const deviceType = Utils.detectDeviceType();
        document.getElementById('device-type').value = deviceType;
        
        // Sugerir nombre basado en el tipo
        const deviceNames = {
            mobile: 'Mi Móvil',
            tablet: 'Mi Tablet',
            desktop: 'Mi Ordenador',
            laptop: 'Mi Portátil'
        };
        document.getElementById('device-name').value = deviceNames[deviceType] || 'Mi Dispositivo';
    },
    
    // Mostrar pantalla principal
    showMainScreen() {
        document.getElementById('setup-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'flex';
        
        // Actualizar nombre del dispositivo en header
        document.getElementById('current-device-name').textContent = AppState.currentDevice.name;
        
        // Inicializar mapa
        setTimeout(() => {
            MapManager.init();
            MapManager.fitAllMarkers();
        }, 100);
    },
    
    // Actualizar lista de dispositivos
    updateDevicesList() {
        const container = document.getElementById('devices-list');
        container.innerHTML = '';
        
        if (AppState.devices.size === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay dispositivos rastreados</p>';
            return;
        }
        
        AppState.devices.forEach((device, deviceId) => {
            const isCurrentDevice = deviceId === AppState.currentDevice?.id;
            const card = document.createElement('div');
            card.className = `device-card ${isCurrentDevice ? 'current' : ''}`;
            
            const locationInfo = device.location 
                ? `<p>📍 Precisión: ${Utils.formatAccuracy(device.location.accuracy)} | ${Utils.timeAgo(device.location.timestamp)}</p>`
                : '<p>📍 Sin ubicación</p>';
            
            card.innerHTML = `
                <div class="device-info-card">
                    <div class="device-icon">${Utils.getDeviceEmoji(device.type)}</div>
                    <div class="device-details">
                        <h4>${device.name} ${isCurrentDevice ? '(Tú)' : ''}</h4>
                        ${locationInfo}
                    </div>
                </div>
                <div class="device-actions">
                    ${device.location ? `<button class="btn btn-primary btn-small" onclick="App.centerOnDevice('${deviceId}')">Ver en Mapa</button>` : ''}
                </div>
            `;
            
            container.appendChild(card);
        });
    },
    
    // Actualizar estadísticas
    updateStats() {
        document.getElementById('devices-count').textContent = AppState.devices.size;
        
        if (AppState.currentDevice && AppState.currentDevice.location) {
            document.getElementById('location-accuracy').textContent = 
                Utils.formatAccuracy(AppState.currentDevice.location.accuracy);
            document.getElementById('last-update').textContent = 
                Utils.timeAgo(AppState.currentDevice.location.timestamp);
        }
    },
    
    // Actualizar información de ubicación actual
    updateCurrentLocationInfo(location) {
        const container = document.getElementById('current-location-info');
        container.innerHTML = `
            <p><span class="label">Latitud:</span> <span class="value">${location.latitude.toFixed(6)}°</span></p>
            <p><span class="label">Longitud:</span> <span class="value">${location.longitude.toFixed(6)}°</span></p>
            <p><span class="label">Precisión:</span> <span class="value">${Utils.formatAccuracy(location.accuracy)}</span></p>
            ${location.altitude ? `<p><span class="label">Altitud:</span> <span class="value">${Math.round(location.altitude)}m</span></p>` : ''}
            ${location.speed ? `<p><span class="label">Velocidad:</span> <span class="value">${(location.speed * 3.6).toFixed(1)} km/h</span></p>` : ''}
            <p><span class="label">Actualizado:</span> <span class="value">${Utils.formatDate(location.timestamp)}</span></p>
        `;
    }
};

// Aplicación principal
const App = {
    // Inicializar aplicación
    async init() {
        console.log('Inicializando aplicación...');
        
        // Inicializar UI
        UI.init();
        
        // Conectar a servidor
        SocketManager.connect();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Si hay dispositivo guardado, iniciar rastreo automáticamente
        if (AppState.currentDevice) {
            // Registrar en servidor
            SocketManager.registerDevice(AppState.currentDevice);
        }
    },
    
    // Configurar event listeners
    setupEventListeners() {
        // Botón de registro
        document.getElementById('register-btn')?.addEventListener('click', async () => {
            await this.registerDevice();
        });
        
        // Botón de toggle rastreo
        document.getElementById('toggle-tracking-btn')?.addEventListener('click', () => {
            this.toggleTracking();
        });
        
        // Botón de centrar mapa
        document.getElementById('center-map-btn')?.addEventListener('click', () => {
            if (AppState.currentDevice) {
                MapManager.centerOnDevice(AppState.currentDevice.id);
            }
        });
        
        // Botón de refrescar
        document.getElementById('refresh-btn')?.addEventListener('click', async () => {
            await this.refreshLocation();
        });
        
        // Botón de pantalla completa
        document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    },
    
    // Registrar dispositivo
    async registerDevice() {
        const name = document.getElementById('device-name').value.trim();
        const type = document.getElementById('device-type').value;
        
        if (!name) {
            Toast.show('Por favor, ingresa un nombre para el dispositivo', 'warning');
            return;
        }
        
        // Solicitar permiso de ubicación
        const hasPermission = await LocationManager.requestPermission();
        if (!hasPermission) return;
        
        // Crear dispositivo
        AppState.currentDevice = {
            id: Utils.loadFromStorage('deviceId') || crypto.randomUUID(),
            name,
            type,
            registeredAt: new Date().toISOString()
        };
        
        // Guardar en localStorage
        Utils.saveToStorage('currentDevice', AppState.currentDevice);
        Utils.saveToStorage('deviceId', AppState.currentDevice.id);
        
        // Registrar en servidor
        SocketManager.registerDevice(AppState.currentDevice);
        
        // Mostrar pantalla principal
        UI.showMainScreen();
        
        Toast.show('Dispositivo registrado exitosamente', 'success');
        
        // Iniciar rastreo automáticamente
        setTimeout(() => this.toggleTracking(), 1000);
    },
    
    // Toggle rastreo
    async toggleTracking() {
        const btn = document.getElementById('toggle-tracking-btn');
        
        if (!AppState.isTracking) {
            // Iniciar rastreo
            try {
                Toast.show('Iniciando rastreo de ubicación...', 'success');
                
                // Obtener ubicación inicial
                const location = await LocationManager.getCurrentLocation();
                await this.processLocation(location);
                
                // Iniciar rastreo continuo
                LocationManager.startTracking(async (location) => {
                    await this.processLocation(location);
                });
                
                AppState.isTracking = true;
                btn.textContent = '⏸️ Pausar Rastreo';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-danger');
                
            } catch (error) {
                console.error('Error iniciando rastreo:', error);
                Toast.show(error.message, 'error');
            }
        } else {
            // Detener rastreo
            LocationManager.stopTracking();
            AppState.isTracking = false;
            btn.textContent = '▶️ Iniciar Rastreo';
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-success');
            Toast.show('Rastreo pausado', 'warning');
        }
    },
    
    // Procesar ubicación
    async processLocation(location) {
        console.log('Nueva ubicación:', location);
        
        // Actualizar dispositivo actual
        AppState.currentDevice.location = location;
        AppState.currentDevice.lastSeen = new Date().toISOString();
        
        // Actualizar en dispositivos
        AppState.devices.set(AppState.currentDevice.id, AppState.currentDevice);
        
        // Actualizar marcador en mapa
        MapManager.updateMarker(AppState.currentDevice.id, AppState.currentDevice);
        
        // Actualizar UI
        UI.updateCurrentLocationInfo(location);
        UI.updateDevicesList();
        UI.updateStats();
        
        // Enviar al servidor
        SocketManager.updateLocation(AppState.currentDevice.id, location);
        
        // Guardar en localStorage
        Utils.saveToStorage('currentDevice', AppState.currentDevice);
    },
    
    // Refrescar ubicación
    async refreshLocation() {
        if (!AppState.isTracking) {
            Toast.show('Inicia el rastreo primero', 'warning');
            return;
        }
        
        try {
            Toast.show('Actualizando ubicación...', 'success');
            const location = await LocationManager.getCurrentLocation();
            await this.processLocation(location);
        } catch (error) {
            console.error('Error refrescando ubicación:', error);
            Toast.show(error.message, 'error');
        }
    },
    
    // Centrar en dispositivo
    centerOnDevice(deviceId) {
        MapManager.centerOnDevice(deviceId);
    },
    
    // Toggle pantalla completa
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
};

// Iniciar aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Exponer App globalmente para acceso desde HTML
window.App = App;
