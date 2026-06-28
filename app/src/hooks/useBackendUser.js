import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuthUser } from '@/hooks/useAuthUser';

export function useBackendUser() {
  const { accessToken, isAuthenticated } = useAuthUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setUser(null);
      setError(null);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    apiFetch('/api/v1/me/', { token: accessToken })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setUser(payload.user ?? null);
        }
      })
      .catch((fetchError) => {
        if (!cancelled) {
          setUser(null);
          setError(fetchError);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, isAuthenticated]);

  return { user, error, loading };
}
