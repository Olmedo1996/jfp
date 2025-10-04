import { env } from '@/env.mjs';

export const siteConfig = {
  title: () => 'JFP - Jóvenes en Formación Profesional',
  description: () =>
    'Plataforma para la gestión y desarrollo de programas de formación profesional y empleo juvenil.',
  keywords: () => [
    'JFP',
    'Jóvenes en formación profesional',
    'Formación profesional',
    'Empleo juvenil',
    'Desarrollo de habilidades',
    'Capacitación laboral',
    'Oportunidades laborales',
  ],
  url: () => env.APP_URL,
};
