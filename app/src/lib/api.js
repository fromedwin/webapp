import { BACKEND_BASE_URL } from '@/lib/config';

/**
 * Fetch the FromEdwin backend API with ShellUI JWT authentication.
 * @param {string} path - API path (e.g. `/api/v1/me/`)
 * @param {{ token?: string } & RequestInit} options
 */
export async function apiFetch(path, { token, ...init } = {}) {
  if (!BACKEND_BASE_URL) {
    throw new Error('VITE_BACKEND_URL is not configured');
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = new Headers(init.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  return fetch(`${BACKEND_BASE_URL}${normalizedPath}`, { ...init, headers });
}
