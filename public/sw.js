/**
 * DCU-X Progressive Web App Service Worker
 * Production-ready caching, offline app shell, and lifecycle management.
 */

const CACHE_VERSION = 'dcux-v1.0.0';
const CORE_CACHE = `dcux-core-${CACHE_VERSION}`;
const ASSETS_CACHE = `dcux-assets-${CACHE_VERSION}`;
const IMAGES_CACHE = `dcux-images-${CACHE_VERSION}`;
const FONTS_CACHE = `dcux-fonts-${CACHE_VERSION}`;

const MAX_IMAGE_ENTRIES = 40;

// Core app shell assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  '/dculogo.jpg',
  '/logo.png',
];

// Helper to keep dynamic caches bounded
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      await cache.delete(keys[0]);
      await trimCache(cacheName, maxItems);
    }
  } catch {
    // Ignore cache trim errors gracefully
  }
}

// Service Worker Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE).then(async (cache) => {
      // Precache assets with error resilience (don't fail install if a non-essential image fails)
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response && response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn(`[SW] Precache failed for ${url}:`, err);
          }
        })
      );
    })
  );
});

// Service Worker Activate - Purge Old Caches
self.addEventListener('activate', (event) => {
  const activeCaches = [CORE_CACHE, ASSETS_CACHE, IMAGES_CACHE, FONTS_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key.startsWith('dcux-') && !activeCaches.includes(key)) {
              console.log(`[SW] Removing outdated cache: ${key}`);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Safe Update Trigger
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Interception
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) return;

  const url = new URL(request.url);

  // 0. Bypass Vite development server requests, HMR, and virtual modules
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.includes('vite') ||
    url.search.includes('t=') ||
    url.search.includes('import')
  ) {
    return;
  }

  // 1. Never cache analytics, tag managers, or tracking requests
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.pathname.includes('/gtag/')
  ) {
    return;
  }

  // 2. Never cache Firebase authentication, Firestore, or external backend APIs
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    (url.hostname.includes('googleapis.com') && !url.hostname.includes('fonts.googleapis.com')) ||
    url.pathname.startsWith('/api/')
  ) {
    return;
  }

  // 3. Navigation Requests (HTML Page) -> Network-First with Offline App-Shell Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CORE_CACHE).then((cache) => {
              cache.put('/index.html', responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback: Serve cached index.html or root
          const cachedPage =
            (await caches.match('/index.html')) || (await caches.match('/'));
          if (cachedPage) {
            return cachedPage;
          }
          return new Response(
            `<!DOCTYPE html><html><head><meta charset="utf-8"><title>DCU-X Offline</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:system-ui;text-align:center;padding:40px 20px;color:#334155;"><h1>DCU-X Offline</h1><p>You appear to be offline. Please connect to the internet once to cache the full application.</p></body></html>`,
            {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
              status: 200,
            }
          );
        })
    );
    return;
  }

  // 4. Vite Hashed Static Assets (/assets/*) -> Cache-First
  if (url.origin === self.location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(ASSETS_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 5. Google Fonts (fonts.googleapis.com, fonts.gstatic.com) -> Stale-While-Revalidate
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(FONTS_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 6. Template & App Images (/templates/*, /icons/*, etc.) -> Stale-While-Revalidate with size bounding
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/templates/') ||
      url.pathname.startsWith('/icons/') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.webp'))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(IMAGES_CACHE).then((cache) => {
                cache.put(request, responseClone);
                trimCache(IMAGES_CACHE, MAX_IMAGE_ENTRIES);
              });
            }
            return networkResponse;
          })
          .catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 7. General Origin Static Files (manifest, favicons, etc.) -> Cache-First
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CORE_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
