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
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// public/service-worker.js

self.addEventListener('activate', event => {
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
  });
  
