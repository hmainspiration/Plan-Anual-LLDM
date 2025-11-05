// Define un nombre y versión para el caché
const CACHE_NAME = 'annual-plan-cache-v1';
// Lista de archivos fundamentales para que la app funcione offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg'
];

// Evento 'install': se dispara cuando el Service Worker se instala.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, añadiendo archivos principales.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la app hace una petición de red.
// Estrategia: "Network falling back to cache". Intenta ir a la red, si falla, usa el caché.
// Además, guarda en caché las nuevas peticiones exitosas para uso futuro.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Si la respuesta está en el caché, la devolvemos.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no, vamos a internet a buscarla.
        return fetch(event.request).then(
          networkResponse => {
            // Si la respuesta de la red es válida, la guardamos en el caché y la devolvemos.
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  // No cacheamos peticiones de extensiones de Chrome
                  if (!event.request.url.startsWith('chrome-extension://')) {
                    cache.put(event.request, responseToCache);
                  }
                });
            }
            return networkResponse;
          }
        ).catch(error => {
            // Si fetch falla (ej. no hay red), no hacemos nada.
            // La app mostrará el error si el recurso no estaba en caché.
            console.log('Fetch falló; es probable que no haya conexión a internet.', error);
        });
      })
  );
});


// Evento 'activate': se dispara cuando el Service Worker se activa.
// Sirve para limpiar cachés viejos si actualizamos la app.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});