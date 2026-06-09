export function decodeJwtPayload(token) {
  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) {
      return null;
    }
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function normalizeJwtUserGroups(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }

  const names = raw
    .filter((item) => typeof item === 'string' && item.trim().length > 0)
    .map((name) => name.trim());

  return [...new Set(names)].sort((a, b) => a.localeCompare(b));
}

export function getJwtUserMetadata(accessToken) {
  const payload = accessToken ? decodeJwtPayload(accessToken) : null;
  if (!payload?.user_metadata || typeof payload.user_metadata !== 'object') {
    return null;
  }

  return payload.user_metadata;
}
