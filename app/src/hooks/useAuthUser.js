import { useMemo } from 'react';
import { decodeJwtPayload, getJwtUserMetadata, normalizeJwtUserGroups } from '@/lib/jwt';
import { useShellUI } from '@/providers/ShellUIProvider';

function getDisplayInitial(name, email) {
  const source = name?.trim() || email?.trim() || '?';
  return source.charAt(0).toUpperCase();
}

export function useAuthUser() {
  const { settings } = useShellUI();

  return useMemo(() => {
    const user = settings?.user ?? null;
    const accessToken = settings?.accessToken ?? null;
    const jwtPayload = accessToken ? decodeJwtPayload(accessToken) : null;
    const userMetadata = getJwtUserMetadata(accessToken);
    const groupsFromJwt = userMetadata ? normalizeJwtUserGroups(userMetadata.groups) : [];
    const groupsFromSettings = Array.isArray(user?.groups)
      ? normalizeJwtUserGroups(user.groups)
      : [];
    const groups = groupsFromSettings.length ? groupsFromSettings : groupsFromJwt;
    const isStaff = userMetadata?.is_staff === true;
    const isCompanyOwner = userMetadata?.is_company_owner === true;
    const displayName = user?.name?.trim() || user?.email?.trim() || '';
    const isAuthenticated = Boolean(user?.id || user?.email || accessToken);

    return {
      user,
      accessToken,
      jwtPayload,
      groups,
      isStaff,
      isCompanyOwner,
      canAccessAdmin: isStaff || isCompanyOwner,
      isAuthenticated,
      displayName,
      displayInitial: getDisplayInitial(user?.name, user?.email),
      profilePicture: user?.profilePicture ?? null,
      email: user?.email ?? null,
    };
  }, [settings]);
}
