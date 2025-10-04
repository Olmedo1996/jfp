'use client';

/* import { Locale } from 'date-fns';
import { enUS, es, pt } from 'date-fns/locale'; */

import { ComponentProps } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const availableLanguageTags = ['es', 'en', 'br'];

/* const LanguageLabel: Record<AvailableLanguageTag, Locale> = {
  en: 'English',
  es: 'Español',
  br: 'Português',
};

// Mapeo de locales de date-fns
const DateLocales: Record<AvailableLanguageTag, Locale> = {
  en: enUS,
  es: es,
  br: pt,
}; */

type LangSwitcherProps = {
  className?: ComponentProps<typeof Link>['className'];
};
export const LanguageSwitcher = ({ className }: LangSwitcherProps) => {
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguageTags.map((locale) => (
          <DropdownMenuItem key={locale}>
            <Link
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                className
              )}
              href={`/${locale}`}
            >
              {locale.toUpperCase()}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
