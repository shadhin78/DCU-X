/**
 * Service Worker Registration and Update Manager for DCU-X PWA
 */

export interface PwaUpdateEventDetail {
  registration: ServiceWorkerRegistration;
  applyUpdate: () => void;
}

declare global {
  interface WindowEventMap {
    'pwa-update-available': CustomEvent<PwaUpdateEventDetail>;
  }
}

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Prevent infinite reload loops on controllerchange
  let isRefreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (isRefreshing) return;
    isRefreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      const notifyUpdate = (reg: ServiceWorkerRegistration) => {
        const detail: PwaUpdateEventDetail = {
          registration: reg,
          applyUpdate: () => {
            if (reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          },
        };
        window.dispatchEvent(
          new CustomEvent<PwaUpdateEventDetail>('pwa-update-available', { detail })
        );
      };

      // Case 1: An updated worker is already waiting to activate
      if (registration.waiting) {
        notifyUpdate(registration);
      }

      // Case 2: An update is found and currently installing
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available and waiting
            notifyUpdate(registration);
          }
        });
      });

      // Periodically check for service worker updates (e.g. every 60 minutes)
      setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 60 * 1000);
    } catch (error) {
      console.warn('[PWA] Service Worker registration failed:', error);
    }
  });
}
