// This path used to host the practice app; it now lives at /piano/.
// Clear the old offline cache, unregister, and reload open windows so the
// redirect in index.html can take over.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        await self.clients.claim();
        const windows = await self.clients.matchAll({ type: 'window' });
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        await self.registration.unregister();
        windows.forEach(w => w.navigate(w.url));
    })());
});
