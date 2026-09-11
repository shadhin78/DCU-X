/**
 * Security & Anti-DevTool Utility
 * Protects the web application by:
 * 1. Blocking mouse right-click context menu
 * 2. Blocking F12 and all developer tool keyboard shortcuts (Ctrl+Shift+I/J/C/K/E, Ctrl+U, Mac shortcuts)
 * 3. Detecting DevTools opening via browser menus and triggering console protection / debugger traps
 * 4. Providing an optional developer bypass (?debug=true or localStorage 'debug_mode'='true')
 */

let toastTimeout: number | null = null;

/**
 * Display a temporary on-screen toast notice when a restricted action is attempted.
 */
function showSecurityToast(message: string): void {
  // Check if toast already exists
  let toastEl = document.getElementById('security-toast-alert');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'security-toast-alert';
    toastEl.className = 'security-toast-hidden';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.className = 'security-toast-visible';

  if (toastTimeout) {
    window.clearTimeout(toastTimeout);
  }

  toastTimeout = window.setTimeout(() => {
    if (toastEl) {
      toastEl.className = 'security-toast-hidden';
    }
  }, 2200);
}

/**
 * Check if debug bypass mode is enabled (for developer debugging if explicitly desired).
 */
export function isDebugBypassActive(): boolean {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'true') {
      return true;
    }
    if (window.localStorage && window.localStorage.getItem('debug_mode') === 'true') {
      return true;
    }
  } catch {
    // Ignore storage errors in sandboxed environments
  }
  return false;
}

/**
 * Initialize all security protections against DevTools and right-clicking.
 */
export function initSecurityProtection(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // Allow developer bypass if ?debug=true is specified
  if (isDebugBypassActive()) {
    console.warn('[Security] Debug bypass active. DevTools and right-click protection disabled.');
    return () => {};
  }

  // 1. Block right click context menu
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showSecurityToast('Right-click is disabled on this page.');
    return false;
  };

  // 2. Block auxclick (middle or right mouse click)
  const handleAuxClick = (e: MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Right-click is disabled on this page.');
      return false;
    }
  };

  // 3. Block keyboard shortcuts for DevTools and source inspection
  const handleKeyDown = (e: KeyboardEvent) => {
    const key = (e.key || '').toUpperCase();
    const keyCode = e.keyCode || e.which;
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;

    // F12 key
    if (key === 'F12' || keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Developer tools (F12) are disabled.');
      return false;
    }

    // Ctrl + Shift + I (Inspect)
    // Ctrl + Shift + J (Console)
    // Ctrl + Shift + C (Inspect Element)
    // Ctrl + Shift + K (Firefox Console)
    // Ctrl + Shift + E (Firefox Network)
    if (isCtrlOrMeta && isShift) {
      if (
        key === 'I' ||
        key === 'J' ||
        key === 'C' ||
        key === 'K' ||
        key === 'E' ||
        keyCode === 73 || // I
        keyCode === 74 || // J
        keyCode === 67 || // C
        keyCode === 75 || // K
        keyCode === 69    // E
      ) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast('Developer tools shortcuts are disabled.');
        return false;
      }
    }

    // Mac shortcut equivalents: Cmd + Option + I / J / C
    if (isCtrlOrMeta && isAlt) {
      if (
        key === 'I' ||
        key === 'J' ||
        key === 'C' ||
        keyCode === 73 ||
        keyCode === 74 ||
        keyCode === 67
      ) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast('Developer tools shortcuts are disabled.');
        return false;
      }
    }

    // Ctrl + U (View Source) or Cmd + Option + U
    if (isCtrlOrMeta && (key === 'U' || keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('View Source is disabled.');
      return false;
    }

    // Ctrl + S (Save Page)
    if (isCtrlOrMeta && (key === 'S' || keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // 4. DevTools detection and console clearing
  let devtoolsInterval: number | null = null;
  const devtoolsDetection = () => {
    // Threshold detection (docked devtools)
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      // Clear console continuously if devtools is open
      try {
        console.clear();
      } catch {
        // Ignore
      }
    }
  };

  // 5. Anti-debugger trap (pauses debugger if DevTools is opened via browser menus)
  let debuggerInterval: number | null = null;
  const startDebuggerTrap = () => {
    debuggerInterval = window.setInterval(() => {
      const startTime = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const endTime = performance.now();
      // If devtools paused execution, elapsed time will be > 100ms
      if (endTime - startTime > 100) {
        try {
          console.clear();
        } catch {
          // Ignore
        }
      }
    }, 1000);
  };

  // Attach global event listeners with capture = true to intercept before anything else
  window.addEventListener('contextmenu', handleContextMenu, true);
  document.addEventListener('contextmenu', handleContextMenu, true);
  window.addEventListener('auxclick', handleAuxClick, true);
  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener('resize', devtoolsDetection);
  devtoolsInterval = window.setInterval(devtoolsDetection, 1500);
  startDebuggerTrap();

  // Return cleanup function
  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, true);
    document.removeEventListener('contextmenu', handleContextMenu, true);
    window.removeEventListener('auxclick', handleAuxClick, true);
    window.removeEventListener('keydown', handleKeyDown, true);
    window.removeEventListener('resize', devtoolsDetection);
    if (devtoolsInterval) window.clearInterval(devtoolsInterval);
    if (debuggerInterval) window.clearInterval(debuggerInterval);
  };
}
