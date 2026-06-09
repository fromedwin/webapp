import { shellui } from '@shellui/sdk';

/** Shared init promise so StrictMode and multiple callers only initialize once. */
let initPromise = null;

export function ensureShellUIInitialized() {
  if (!initPromise) {
    initPromise = shellui.init().catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

export { shellui };
