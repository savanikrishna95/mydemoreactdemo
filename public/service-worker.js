// public/service-worker.js


// public/service-worker.js

const cacheName = 'my-app-cache-v1';
const cacheFiles = ['/', '/index.html', '/static/css/main.css', '/static/js/main.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', event => {
    console.log("fetch")
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
    console.log("activate")
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
          return null;
        })
      );
    })
  );

  // Ensure that the new service worker takes control of the page immediately
  self.clients.claim();
});




// Listen for a 'reload' message from the client and reload the page
self.addEventListener('message', event => {
  if (event.data === 'reload') {
    self.skipWaiting();
    self.clients.claim();
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage('reload'));
    });
  }
});
