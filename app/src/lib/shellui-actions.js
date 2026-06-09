import { shellui } from '@/lib/shellui-init';
import { SHELLUI_URLS } from '@/lib/shellui-urls';

/** Opens ShellUI settings in the parent shell modal overlay. */
export function openShellSettingsModal(subpath = '') {
  const base = SHELLUI_URLS.settings.replace(/\/$/, '');
  const url = subpath ? `${base}/${subpath.replace(/^\//, '')}` : base;
  shellui.openModal(url);
}

/** Navigates the parent shell to the embedded admin panel. */
export function openShellAdmin() {
  shellui.navigate(SHELLUI_URLS.admin);
}

/** Requests logout via the parent shell (iframe-safe). */
export function requestShellLogout() {
  shellui.navigate('/');
  shellui.sendMessageToParent({
    type: 'SHELLUI_LOGOUT',
    payload: {},
  });
}
