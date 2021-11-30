const preCacheName = "pre_cache_v1";
const dynamicCacheName = "dynamic_cache_v1";
const cacheRessourcen = [
    'offline.html',
    '/',
    '/index.html',
    '/js/app.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/logo.png',  
    '/img/rezept.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v114/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',    
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(preCacheName).then(function(cache) {
            return cache.addAll(cacheRessourcen);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== preCacheName && cacheName !== dynamicCacheName
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (fetchResponse) {
                return caches.open(dynamicCacheName).then(function (cache) {
                    cache.put(event.request.url, fetchResponse.clone());
                    return fetchResponse;
                })
            });
        }).catch(function(){
            if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
            }
        })
    );
});