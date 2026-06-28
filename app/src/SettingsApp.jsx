import { PaymentsPage } from '@/pages/settings/PaymentsPage';

function getSettingsPage() {
  const { pathname } = window.location;
  const settingsRoot = pathname.match(/\/settings(\/.*)?$/);

  if (!settingsRoot) {
    return null;
  }

  const subpath = (settingsRoot[1] ?? '').replace(/^\//, '');

  switch (subpath) {
    case '':
    case 'payments':
      return <PaymentsPage />;
    default:
      return <PaymentsPage />;
  }
}

export default function SettingsApp() {
  return getSettingsPage();
}
