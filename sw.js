var staticCacheName = 'restaurant-static-v1';

// Creating Cache and adding resource to it
self.addEventListener('install', function(event) {
    var ulrsToCache = [
        './',
        'index.html',
        'restaurant.html',
        'offline.html',
        'data/restaurants.json',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'css/responsive.css',
        'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg',
      ];
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(ulrsToCache);
        })
    );
});

// Activate Sevice Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        // keep dynamic caches, only remove old static caches
        return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('restaurant-') &&
                    cacheName != staticCacheName;
            }).map(function(cacheName) {
              return cache.delete(cacheName);
            })
          );
        })
    );
});

// Fetch Service Worker - Cache Response
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});