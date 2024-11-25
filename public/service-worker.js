self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('weather-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/static/js/bundle.js', // Update this with your build file path
          '/static/css/main.css',  // Update this with your stylesheet path
          'icon-192x192.png',
          'icon-512x512.png',
        ]);
      })
    );
  });
 
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
 
                  