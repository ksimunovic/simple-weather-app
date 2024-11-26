self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // Always fetch from network
      .catch(() => {
        // Optionally handle offline behavior or fallback
        return caches.match(event.request);
      })
  );
});