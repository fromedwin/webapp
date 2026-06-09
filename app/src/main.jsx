import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from '@/App.jsx';
import i18n from '@/i18n';
import { ensureShellUIInitialized } from '@/lib/shellui-init';
import { ShellUIProvider } from '@/providers/ShellUIProvider';
import '@/index.css';

async function bootstrap() {
  await ensureShellUIInitialized();

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <ShellUIProvider>
          <App />
        </ShellUIProvider>
      </I18nextProvider>
    </StrictMode>,
  );
}

bootstrap();
