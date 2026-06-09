import { useEffect, useRef, useState } from 'react';
import { LogOutIcon, SettingsIcon, ShieldIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUser } from '@/hooks/useAuthUser';
import {
  openShellAdmin,
  openShellSettingsModal,
  requestShellLogout,
} from '@/lib/shellui-actions';
import { useShellUI } from '@/providers/ShellUIProvider';

export function UserNavBar() {
  const { t } = useTranslation();
  const { ready, isEmbedded } = useShellUI();
  const {
    isAuthenticated,
    displayName,
    displayInitial,
    profilePicture,
    email,
    canAccessAdmin,
    isStaff,
  } = useAuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (triggerRef.current?.contains(target)) {
        return;
      }
      if (contentRef.current?.contains(target)) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isMenuOpen]);

  const handleSettings = () => {
    setIsMenuOpen(false);
    if (!isEmbedded) {
      return;
    }
    openShellSettingsModal();
  };

  const handleAdmin = () => {
    setIsMenuOpen(false);
    if (!isEmbedded || !canAccessAdmin) {
      return;
    }
    openShellAdmin();
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (!isEmbedded) {
      return;
    }
    requestShellLogout();
  };

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 overflow-visible px-6 md:px-10">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">FromEdwin</p>
        </div>

        {ready ? (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                ref={triggerRef}
                type="button"
                className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={t('nav.openAccountMenu', {
                  name: displayName || t('nav.account'),
                })}
                title={displayName || t('nav.account')}
              >
                <Avatar className="size-9">
                  {profilePicture ? (
                    <AvatarImage
                      src={profilePicture}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
                  <AvatarFallback>{displayInitial}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              ref={contentRef}
              align="end"
              side="bottom"
              className="w-56"
              container={null}
              onCloseAutoFocus={(event) => event.preventDefault()}
              onPointerDownOutside={(event) => event.preventDefault()}
              onInteractOutside={(event) => event.preventDefault()}
            >
              <DropdownMenuLabel className="space-y-1 font-normal">
                <p className="truncate text-sm font-semibold">
                  {displayName || t('nav.account')}
                </p>
                {email ? (
                  <p className="truncate text-xs text-muted-foreground">{email}</p>
                ) : !isAuthenticated ? (
                  <p className="text-xs text-muted-foreground">{t('nav.accountLoading')}</p>
                ) : null}
                {isStaff ? (
                  <p className="text-xs text-muted-foreground">{t('nav.staffBadge')}</p>
                ) : null}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSettings} disabled={!isEmbedded}>
                <SettingsIcon />
                <span>{t('nav.settings')}</span>
              </DropdownMenuItem>
              {canAccessAdmin ? (
                <DropdownMenuItem onSelect={handleAdmin} disabled={!isEmbedded}>
                  <ShieldIcon />
                  <span>{t('nav.admin')}</span>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={handleLogout}
                disabled={!isEmbedded || !isAuthenticated}
                className="text-destructive focus:text-destructive"
              >
                <LogOutIcon />
                <span>{t('nav.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}
