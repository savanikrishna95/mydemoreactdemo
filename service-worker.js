// public/service-worker.js

const cacheName = 'my-app-cache-v1';
const cacheFiles = ['/', '/index.html', '/static/css/main.css', '/static/js/main.js'];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(cacheName).then(cache => {
//       return cache.addAll(cacheFiles);
//     })
//   );
// });


self.addEventListener("install", (event) => {
    console.log("Service Worker : Installed!")

    event.waitUntil(
        
        (async() => {
            try {
                cache_obj = await caches.open(cache)
                cache_obj.addAll(caching_files)
            }
            catch{
                console.log("error occured while caching...")
            }
        })()
    )
} )

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
          return null;
        }).catch(error => {
            console.error(`Caching failed for ${url}:`, error);
          })
      );
    })
  );

  // Claim clients to make sure that the active service worker takes control of the page immediately
  self.clients.claim();

  // Reload the page after activating the service worker
  if (self.clients && self.clients.matchAll) {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        if (client instanceof WindowClient) {
          client.navigate(client.url);
          client.focus();
        }
      });
    });
  }

  // Alternatively, you can use the following to reload the page
  // self.clients.matchAll().then(clients => clients.forEach(client => client.postMessage('reload')));
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
