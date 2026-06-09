import {
  ActivityIcon,
  BellRingIcon,
  BookOpenIcon,
  GaugeIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useShellUI } from '@/providers/ShellUIProvider';

const FEATURES = [
  {
    key: 'availability',
    icon: ActivityIcon,
  },
  {
    key: 'performance',
    icon: GaugeIcon,
  },
  {
    key: 'alerting',
    icon: BellRingIcon,
  },
  {
    key: 'api',
    icon: BookOpenIcon,
  },
];

const backendBase = (import.meta.env.VITE_BACKEND_URL ?? '').replace(/\/$/, '');

export default function App() {
  const { t } = useTranslation();
  const { ready, settings, isEmbedded } = useShellUI();
  const user = settings?.user;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 p-6 md:p-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">FromEdwin</Badge>
          {settings?.appearance?.displayName ? (
            <Badge variant="outline">{settings.appearance.displayName}</Badge>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('welcome.title')}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{t('welcome.subtitle')}</p>
        </div>
        {user?.name || user?.email ? (
          <p className="text-sm text-muted-foreground">
            {t('welcome.signedInAs', { name: user.name ?? user.email })}
          </p>
        ) : null}
        {!ready ? (
          <p className="text-sm text-muted-foreground">{t('status.loading')}</p>
        ) : !isEmbedded ? (
          <p className="text-sm text-muted-foreground">{t('status.standalone')}</p>
        ) : null}
      </header>

      <Separator />

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ key, icon: Icon }) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="size-5 text-primary" />
                <CardTitle>{t(`features.${key}.title`)}</CardTitle>
              </div>
              <CardDescription>{t(`features.${key}.description`)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('actions.viewDashboard')}</CardTitle>
          <CardDescription>
            {t('features.api.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={`${backendBase}/api/v1/docs/`} target="_blank" rel="noopener noreferrer">
              <BookOpenIcon />
              {t('actions.openDocs')}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`${backendBase}/dashboard/`} target="_blank" rel="noopener noreferrer">
              <LayoutDashboardIcon />
              {t('actions.viewDashboard')}
            </a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
