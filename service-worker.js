// Service Worker for Daily Overwhelm
// This is a minimal service worker that enables PWA installation
// We're keeping caching simple so updates appear quickly during development

const CACHE_NAME = 'daily-overwhelm-v1';

// When the service worker is installed
self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    // Skip waiting means the new service worker activates immediately
    self.skipWaiting();
});

// When the service worker activates
self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    // Claim all clients so the service worker takes control immediately
    event.waitUntil(clients.claim());
});

// When the app requests a file (network-first strategy for easy updates)
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try network first
        fetch(event.request)
            .catch(function() {
                // If network fails, try cache
                return caches.match(event.request);
            })
    );
});
