const socket = io();

// Inicializar el mapa centrado en coordenadas 0,0 por defecto
const map = L.map('map').setView([0, 0], 2);

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Guardar marcadores de otros dispositivos
const markers = {};
// Mi propio marcador
let myMarker = null;
let firstLocationReceived = false;

const statusDiv = document.getElementById('status');

// Opciones para máxima precisión
const geoOptions = {
    enableHighAccuracy: true, // CLAVE: Usa GPS si está disponible
    timeout: 10000,           // Tiempo máximo de espera
    maximumAge: 0             // No usar caché, queremos posición real
};

// Función para enviar ubicación al servidor
function sendLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;
    
    // Actualizar estado en pantalla
    statusDiv.textContent = `Precisión: ${Math.round(accuracy)} metros`;

    // Enviar al servidor
    socket.emit('sendLocation', { latitude, longitude, accuracy });

    // Actualizar mi propio mapa
    if (!myMarker) {
        myMarker = L.marker([latitude, longitude]).addTo(map);
        myMarker.bindPopup("<b>Yo</b>").openPopup();
        // Si es la primera vez, centrar mapa en mí
        if (!firstLocationReceived) {
            map.setView([latitude, longitude], 16);
            firstLocationReceived = true;
        }
    } else {
        myMarker.setLatLng([latitude, longitude]);
    }
}

function handleError(error) {
    console.error('Error de geolocalización:', error);
    statusDiv.textContent = `Error: ${error.message}`;
}

// Iniciar rastreo
if ("geolocation" in navigator) {
    // watchPosition se ejecuta cada vez que cambia la ubicación
    navigator.geolocation.watchPosition(sendLocation, handleError, geoOptions);
} else {
    statusDiv.textContent = "Geolocalización no soportada por tu navegador";
}

// Escuchar actualizaciones de OTROS dispositivos
socket.on('receiveLocation', (data) => {
    // data tiene: id, latitude, longitude, accuracy
    if (markers[data.id]) {
        // Actualizar marcador existente
        markers[data.id].setLatLng([data.latitude, data.longitude]);
    } else {
        // Crear nuevo marcador para este dispositivo
        const newMarker = L.marker([data.latitude, data.longitude]).addTo(map);
        newMarker.bindPopup(`Dispositivo: ${data.id.substr(0,4)}`);
        markers[data.id] = newMarker;
    }
});

// Eliminar marcador si un usuario se desconecta
socket.on('userDisconnected', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
