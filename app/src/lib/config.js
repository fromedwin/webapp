/** Normalize loopback host to IPv4 (avoids macOS localhost → ::1 connection resets in Tauri/Safari). */
function normalizeBackendBaseUrl(url) {
  const trimmed = (url ?? '').replace(/\/$/, '');
  if (!trimmed) {
    return '';
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname === 'localhost' || parsed.hostname === '::1') {
      parsed.hostname = '127.0.0.1';
    }
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return trimmed;
  }
}

/** FromEdwin backend base URL (no trailing slash). Set via VITE_BACKEND_URL. */
export const BACKEND_BASE_URL = normalizeBackendBaseUrl(import.meta.env.VITE_BACKEND_URL);
