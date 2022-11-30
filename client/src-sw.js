const { warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// cache any page requests
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// cache all image files
const imageCache = new CacheFirst({
  cacheName: 'my-image-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }),
  ],
});

// cache all css and javascript files
const staticResourcesCache = new StaleWhileRevalidate({
  cacheName: 'static-resources',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// use IndexedDB to implement a backup caching strategy for any page requests
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);
registerRoute(({ request }) => request.destination === 'image', imageCache);
registerRoute(({ request }) => request.destination === 'style' || request.destination === 'script', staticResourcesCache);


