import { defineRouting } from 'next-intl/routing';

export type AvailableLanguageTag = 'en' | 'es' | 'br';

export const routing = defineRouting({
  locales: ['en', 'es', 'br'],

  defaultLocale: 'es',
});
