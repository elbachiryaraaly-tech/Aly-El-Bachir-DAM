// Configuración de Socket.IO
const socket = io();

// Variables globales
let deviceId = null;
let deviceName = null;
let trackingInterval = null;
let watchId = null;
let map = null;
let markers = new Map(); // deviceId -> marker
let currentMarker = null;

// Detectar tipo de dispositivo
function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// Generar nombre del dispositivo
function generateDeviceName() {
    const type = detectDeviceType();
    const platform = navigator.platform;
    return `${type === 'mobile' ? 'Móvil' : 'Ordenador'} - ${platform}`;
}

// Inicializar mapa
function initMap() {
    map = L.map('map').setView([40.4168, -3.7038], 6); // Madrid por defecto

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

// Actualizar marcador en el mapa
function updateMarker(deviceId, location, isCurrentDevice = false) {
    const latlng = [location.latitude, location.longitude];
    
    if (isCurrentDevice) {
        if (currentMarker) {
            currentMarker.setLatLng(latlng);
        } else {
            currentMarker = L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(map);
            currentMarker.bindPopup(`<b>Tu ubicación</b><br>Precisión: ${location.accuracy.toFixed(2)}m`);
        }
        map.setView(latlng, Math.max(map.getZoom(), 15));
    } else {
        if (markers.has(deviceId)) {
            markers.get(deviceId).setLatLng(latlng);
        } else {
            const marker = L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(map);
            marker.bindPopup(`<b>Dispositivo remoto</b><br>Precisión: ${location.accuracy.toFixed(2)}m`);
            markers.set(deviceId, marker);
        }
    }
}

// Obtener ubicación de alta precisión
function getHighAccuracyLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalización no soportada'));
            return;
        }

        const options = {
            enableHighAccuracy: true, // Máxima precisión
            timeout: 10000,
            maximumAge: 0 // No usar caché
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed
                });
            },
            (error) => {
                reject(error);
            },
            options
        );
    });
}

// Iniciar rastreo continuo
function startTracking() {
    if (watchId !== null) {
        return; // Ya está rastreando
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    watchId = navigator.geolocation.watchPosition(
        (position) => {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                heading: position.coords.heading,
                speed: position.coords.speed
            };

            // Actualizar UI
            updateLocationUI(location);
            updateMarker(deviceId, location, true);

            // Enviar al servidor
            socket.emit('update-location', location);
        },
        (error) => {
            console.error('Error de geolocalización:', error);
            updateStatus('error', `Error: ${error.message}`);
        },
        options
    );

    updateStatus('tracking', 'Rastreando...');
    document.getElementById('startTrackingBtn').disabled = true;
    document.getElementById('stopTrackingBtn').disabled = false;
    document.body.classList.add('tracking');
}

// Detener rastreo
function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }

    updateStatus('connected', 'Conectado');
    document.getElementById('startTrackingBtn').disabled = false;
    document.getElementById('stopTrackingBtn').disabled = true;
    document.body.classList.remove('tracking');
}

// Actualizar UI de ubicación
function updateLocationUI(location) {
    document.getElementById('latitude').textContent = location.latitude.toFixed(6);
    document.getElementById('longitude').textContent = location.longitude.toFixed(6);
    document.getElementById('altitude').textContent = location.altitude 
        ? `${location.altitude.toFixed(2)} m` 
        : 'No disponible';
    document.getElementById('speed').textContent = location.speed 
        ? `${(location.speed * 3.6).toFixed(2)} km/h` 
        : 'No disponible';
    document.getElementById('heading').textContent = location.heading 
        ? `${location.heading.toFixed(0)}°` 
        : 'No disponible';
    document.getElementById('accuracy').textContent = `${location.accuracy.toFixed(2)} m`;
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('es-ES');
}

// Actualizar estado
function updateStatus(status, message) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = 'status-value ' + status;
}

// Actualizar lista de dispositivos
function updateDevicesList(devices) {
    const listEl = document.getElementById('devicesList');
    listEl.innerHTML = '';

    devices.forEach(device => {
        const card = document.createElement('div');
        card.className = 'device-card';
        if (device.id === deviceId) {
            card.classList.add('active');
        }

        const name = document.createElement('h3');
        name.textContent = device.name || `Dispositivo ${device.id.substring(0, 8)}`;

        const type = document.createElement('div');
        type.className = 'device-meta';
        type.textContent = `Tipo: ${device.type === 'mobile' ? 'Móvil' : 'Ordenador'}`;

        const location = document.createElement('div');
        location.className = 'device-location';
        if (device.location) {
            location.textContent = `Lat: ${device.location.latitude.toFixed(4)}, Lng: ${device.location.longitude.toFixed(4)}`;
        } else {
            location.textContent = 'Ubicación no disponible';
        }

        card.appendChild(name);
        card.appendChild(type);
        card.appendChild(location);
        listEl.appendChild(card);
    });
}

// Event Listeners
document.getElementById('startTrackingBtn').addEventListener('click', startTracking);
document.getElementById('stopTrackingBtn').addEventListener('click', stopTracking);

document.getElementById('copyIdBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(deviceId).then(() => {
        const btn = document.getElementById('copyIdBtn');
        const originalText = btn.textContent;
        btn.textContent = '¡Copiado!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

// Socket.IO Events
socket.on('connect', () => {
    console.log('Conectado al servidor');
    updateStatus('connected', 'Conectado');

    // Registrar dispositivo
    deviceName = generateDeviceName();
    const deviceType = detectDeviceType();
    
    socket.emit('register-device', {
        name: deviceName,
        type: deviceType
    });
});

socket.on('device-registered', (data) => {
    deviceId = data.deviceId;
    document.getElementById('deviceId').textContent = deviceId;
    document.getElementById('deviceType').textContent = `Tipo: ${detectDeviceType() === 'mobile' ? 'Móvil' : 'Ordenador'}`;
    console.log('Dispositivo registrado:', deviceId);
});

socket.on('devices-updated', (devices) => {
    updateDevicesList(devices);
    
    // Actualizar marcadores en el mapa
    devices.forEach(device => {
        if (device.location && device.id !== deviceId) {
            updateMarker(device.id, device.location, false);
        }
    });
});

socket.on('location-updated', (data) => {
    if (data.deviceId !== deviceId && data.location) {
        updateMarker(data.deviceId, data.location, false);
        
        // Actualizar lista de dispositivos
        socket.emit('request-devices');
    }
});

socket.on('device-added', (data) => {
    console.log('Nuevo dispositivo conectado:', data.name);
});

socket.on('device-removed', (data) => {
    console.log('Dispositivo desconectado:', data.deviceId);
    if (markers.has(data.deviceId)) {
        map.removeLayer(markers.get(data.deviceId));
        markers.delete(data.deviceId);
    }
});

socket.on('disconnect', () => {
    updateStatus('disconnected', 'Desconectado');
    stopTracking();
});

socket.on('error', (error) => {
    console.error('Error del servidor:', error);
    updateStatus('error', error.message || 'Error desconocido');
});

// Solicitar permisos de ubicación al cargar
window.addEventListener('load', () => {
    initMap();
    
    // Solicitar ubicación inicial
    getHighAccuracyLocation()
        .then(location => {
            updateLocationUI(location);
            map.setView([location.latitude, location.longitude], 15);
        })
        .catch(error => {
            console.error('Error al obtener ubicación inicial:', error);
            updateStatus('error', 'Permite el acceso a la ubicación para usar la aplicación');
        });
});

// Manejar errores de geolocalización
window.addEventListener('error', (event) => {
    if (event.message.includes('geolocation')) {
        updateStatus('error', 'Error de geolocalización. Verifica los permisos.');
    }
});
