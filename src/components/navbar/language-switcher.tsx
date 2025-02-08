'use client';

import { useEffect } from 'react';
import { Locale, setDefaultOptions } from 'date-fns';
import { enUS, es, pt } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/lib/i18n';
import {
  AvailableLanguageTag,
  availableLanguageTags,
  languageTag,
} from '@/paraglide/runtime';

const LanguageLabel: Record<AvailableLanguageTag, string> = {
  en: 'English',
  es: 'Español',
  br: 'Português',
};

// Mapeo de locales de date-fns
const DateLocales: Record<AvailableLanguageTag, Locale> = {
  en: enUS,
  es: es,
  br: pt,
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = languageTag();

  // Efecto para actualizar el locale de date-fns cuando cambia el idioma
  useEffect(() => {
    setDefaultOptions({ locale: DateLocales[currentLanguage] });
  }, [currentLanguage]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          {currentLanguage.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguageTags.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => {
              router.push(pathname, { locale });
            }}
          >
            {LanguageLabel[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
