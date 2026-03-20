const CACHE = 'autolane-timer-v2';
const ASSETS = [
  '/autolane-timer/',
  '/autolane-timer/index.html',
  '/autolane-timer/manifest.json',
  '/autolane-timer/icon-192.png',
  '/autolane-timer/icon-512.png',
  'https://cdn.prod.website-files.com/6744cfc4e508ac28c650507d/67960a3e9f33ccbf2391ddb1_font.woff'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
