// public/service-worker.js


// public/service-worker.js./index.html
// public/service-worker.js../build/static/css/main.f855e6bc.css

const cacheName = 'my-app-cache-v1';

// Example: Replace '[contenthash]' with the actual content hash of your main.css file
const mainCssContentHash = '[contenthash]'; 

const cacheFiles = ['/', './index.html', `/mydemoreactdemo/blob/gh-pages/static/css/main.${mainCssContentHash}.css`, `/mydemoreactdemo/blob/gh-pages/static/js/main.${mainCssContentHash}.js`];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return Promise.all(
        cacheFiles.map(url => {
          // If the URL contains [contenthash], replace it with the actual content hash
          const actualUrl = url.replace(/\[contenthash\]/, mainCssContentHash);

          return fetch(actualUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch: ${actualUrl}`);
              }
              return cache.put(url, response);
            })
            .catch(error => {
              console.error(`Caching failed for ${actualUrl}:`, error);
              // Optionally, you can choose to skip this error and continue with other resources
              // return Promise.resolve();
            });
        })
      );
    })
  );
});

// ... rest of the code remains unchanged

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
