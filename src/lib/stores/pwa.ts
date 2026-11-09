import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type InstallWindow = Window & { __mlInstallPrompt?: InstallPromptEvent | null };

export const canInstall = writable(false);
export const installed = writable(false);
export const isIOS = writable(false);

let deferred: InstallPromptEvent | null = null;
let initialized = false;

export function initPWA() {
  if (!browser || initialized) return;
  initialized = true;

  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  installed.set(standalone);

  isIOS.set(
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );

  const early = (window as InstallWindow).__mlInstallPrompt;
  if (early) {
    deferred = early;
    canInstall.set(true);
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferred = event as InstallPromptEvent;
    canInstall.set(true);
  });

  window.addEventListener('appinstalled', () => {
    deferred = null;
    canInstall.set(false);
    installed.set(true);
  });

  const display = window.matchMedia('(display-mode: standalone)');
  display.addEventListener?.('change', (event) => {
    if (event.matches) {
      installed.set(true);
      canInstall.set(false);
    }
  });

  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {
      // Sin service worker el sitio sigue funcionando; solo se pierde el modo offline.
    });
  }
}

export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;

  const event = deferred;
  deferred = null;

  try {
    await event.prompt();
    const choice = await event.userChoice;
    canInstall.set(false);

    if (choice.outcome === 'accepted') {
      installed.set(true);
      return true;
    }

    return false;
  } catch {
    canInstall.set(false);
    return false;
  }
}
