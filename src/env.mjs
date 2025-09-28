import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_URL: z.string().url().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    BACKEND_URL: z.string().url().min(1),
    BACKEND_API_VERSION: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BACKEND_URL_API: z.string().min(1),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_API_VERSION: process.env.BACKEND_API_VERSION,
    NEXT_PUBLIC_BACKEND_URL_API: process.env.NEXT_PUBLIC_BACKEND_URL_API,
  },
});
