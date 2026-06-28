import { useTranslation } from 'react-i18next';

export function PaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col px-4">
      <p className="text-sm text-muted-foreground">
        {t('settings.payments.placeholder')}
      </p>
    </div>
  );
}
