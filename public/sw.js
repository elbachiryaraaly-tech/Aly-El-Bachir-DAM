const CACHE_NAME = 'location-tracker-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cacheando archivos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Instalación completada');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Error en instalación:', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando Service Worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Eliminando caché antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activación completada');
                return self.clients.claim();
            })
    );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // No cachear WebSocket ni peticiones de API
    if (url.pathname.startsWith('/socket.io') || 
        url.pathname.startsWith('/api') ||
        request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Devolver de caché si existe
                if (cachedResponse) {
                    // Actualizar en background (stale-while-revalidate)
                    event.waitUntil(
                        fetch(request)
                            .then((networkResponse) => {
                                if (networkResponse && networkResponse.status === 200) {
                                    caches.open(CACHE_NAME)
                                        .then((cache) => cache.put(request, networkResponse));
                                }
                            })
                            .catch(() => {})
                    );
                    
                    return cachedResponse;
                }
                
                // Si no está en caché, obtener de red
                return fetch(request)
                    .then((networkResponse) => {
                        // Cachear la respuesta para futuras peticiones
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => cache.put(request, responseClone));
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[SW] Error de red:', error);
                        
                        // Respuesta offline para HTML
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background Sync para ubicaciones pendientes
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-location') {
        console.log('[SW] Sincronizando ubicaciones pendientes...');
        event.waitUntil(syncPendingLocations());
    }
});

async function syncPendingLocations() {
    try {
        // Aquí se podrían sincronizar ubicaciones almacenadas en IndexedDB
        // cuando la conexión se restaure
        console.log('[SW] Ubicaciones sincronizadas');
    } catch (error) {
        console.error('[SW] Error al sincronizar:', error);
    }
}

// Notificaciones push (para futuras funcionalidades)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Actualización de ubicación',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'open', title: 'Abrir app' },
            { action: 'close', title: 'Cerrar' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Location Tracker', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
