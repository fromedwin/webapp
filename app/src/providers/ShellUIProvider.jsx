import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '@/i18n';
import { applyShellAppearance } from '@/lib/theme';
import { ensureShellUIInitialized, shellui } from '@/lib/shellui-init';

const ShellUIContext = createContext({
  ready: false,
  settings: null,
  isEmbedded: false,
  shellui,
});

export function useShellUI() {
  return useContext(ShellUIContext);
}

function applySettings(settings) {
  if (!settings) {
    return;
  }

  if (settings.appearance) {
    applyShellAppearance(settings.appearance);
  }

  const language = settings.language?.code;
  if (language && i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  if (language && typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
}

export function ShellUIProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState(null);
  const isEmbedded = typeof window !== 'undefined' && window.parent !== window;

  useEffect(() => {
    let cancelled = false;
    let cleanupSettings;
    let cleanupUpdated;

    ensureShellUIInitialized().then(() => {
      if (cancelled) {
        return;
      }

      const initial = shellui.initialSettings;
      if (initial) {
        setSettings(initial);
        applySettings(initial);
      }

      cleanupSettings = shellui.addMessageListener('SHELLUI_SETTINGS', (data) => {
        const nextSettings = data.payload?.settings;
        if (nextSettings) {
          setSettings(nextSettings);
          applySettings(nextSettings);
        }
      });

      cleanupUpdated = shellui.addMessageListener('SHELLUI_SETTINGS_UPDATED', (data) => {
        const nextSettings = data.payload?.settings;
        if (nextSettings) {
          setSettings(nextSettings);
          applySettings(nextSettings);
        }
      });

      setReady(true);
    });

    return () => {
      cancelled = true;
      cleanupSettings?.();
      cleanupUpdated?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      ready,
      settings,
      isEmbedded,
      shellui,
    }),
    [ready, settings, isEmbedded],
  );

  return <ShellUIContext.Provider value={value}>{children}</ShellUIContext.Provider>;
}
