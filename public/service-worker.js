// public/service-worker.js


// public/service-worker.js./index.html
// public/service-worker.js../build/static/css/main.f855e6bc.css

const cacheName = 'my-app-cache-v1';
const cacheFiles = ['/', './index.html', '../build/static/css/main.f855e6bc.css', '../build/static/js/main.66c5ac00.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return Promise.all(
        cacheFiles.map(url => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch: ${url}`);
              }
              return cache.put(url, response);
            })
            .catch(error => {
              console.error(`Caching failed for ${url}:`, error);
              // Optionally, you can choose to skip this error and continue with other resources
              // return Promise.resolve();
            });
        })
      );
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

self.addEventListener('activate', event => {
    console.log("Activate")
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

  self.clients.claim();
});



// Listen for a 'reload' message from the client and reload the page
self.addEventListener('message', event => {
  if (event.data === 'reload') {
    console.log("Activatessss")
    self.skipWaiting();
    self.clients.claim();
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage('reload'));
    });
  }
});
