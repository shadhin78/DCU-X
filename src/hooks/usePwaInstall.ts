import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    deferredInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => {
    if (typeof window !== 'undefined' && window.deferredInstallPrompt) {
      return window.deferredInstallPrompt;
    }
    return null;
  });

  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://')
    );
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [installStatusMessage, setInstallStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // If window already captured prompt before React mounted
    if (typeof window !== 'undefined' && window.deferredInstallPrompt) {
      setDeferredPrompt(window.deferredInstallPrompt);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.deferredInstallPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handlePromptReady = (e: CustomEvent<BeforeInstallPromptEvent>) => {
      const promptEvent = e.detail || window.deferredInstallPrompt;
      if (promptEvent) {
        setDeferredPrompt(promptEvent);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.deferredInstallPrompt = null;
      setIsModalOpen(false);
      setInstallStatusMessage('DCU-X was installed successfully!');
      setTimeout(() => setInstallStatusMessage(null), 4000);
    };

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-ready', handlePromptReady as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-ready', handlePromptReady as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  const triggerInstall = async () => {
    if (isInstalled) {
      setInstallStatusMessage('DCU-X is already installed on this device.');
      setTimeout(() => setInstallStatusMessage(null), 3000);
      return;
    }

    const promptToUse = deferredPrompt || window.deferredInstallPrompt;

    if (promptToUse) {
      try {
        await promptToUse.prompt();
        const choice = await promptToUse.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          window.deferredInstallPrompt = null;
        }
      } catch (err) {
        console.warn('[PWA] Prompt execution failed:', err);
      }
    } else {
      // Direct message telling user where to click if prompt is not directly interceptable
      const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.userAgent);
      const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (isIOS) {
        setInstallStatusMessage('Tap the Share button below and choose "Add to Home Screen" to install.');
      } else {
        setInstallStatusMessage('Click the Install icon (💻) in your browser address bar to install.');
      }
      setTimeout(() => setInstallStatusMessage(null), 6000);
    }
  };

  return {
    isInstalled,
    canPromptDirectly: !!(deferredPrompt || (typeof window !== 'undefined' && window.deferredInstallPrompt)),
    isModalOpen,
    installStatusMessage,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    triggerInstall,
  };
}
