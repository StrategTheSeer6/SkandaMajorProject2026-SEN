const CACHE_NAME = 'my-pwa-v1';
const FILES_TO_CACHE = [
'/',
'/index.html',
'/app.js',
'/manifest.json',
'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js'
'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm'
];

// Install: Save files to cache
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
console.log('Caching files');
return cache.addAll(FILES_TO_CACHE);
})
);
});

// Fetch: Use cached files when offline

self.addEventListener('fetch', (event) =>; {
event.respondWith(
caches.match(event.request).then((response) =>; {
return response || fetch(event.request);
})
);
});
