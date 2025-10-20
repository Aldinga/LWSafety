const CACHE_NAME = 'lone-worker-safety-cache-v2';
const urlsToCache = [
'./',
'./index.html',
'./manifest.json',
'https://www.google.com/search?q=https://cdn.prod.website-files.com/62041b52ed8a57c9953613f0/6384072a15bbb66d5697dfbf_nelson-anglicans_crest-white-23.svg'
];
self.addEventListener('install', event => {
self.skipWaiting();
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Opened cache and caching assets');
return cache.addAll(urlsToCache);
})
);
});
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (response) {
return response;
}
return fetch(event.request);
}
)
);
});
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
console.log('Deleting old cache:', cacheName);
return caches.delete(cacheName);
}
})
);
})
);
});