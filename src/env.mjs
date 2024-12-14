import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_URL: z.string().url().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    // BACKEND_URL_API: z.string().min(1),
  },
  client: {
    BACKEND_URL_API: z.string().min(1),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_URL_API: process.env.BACKEND_URL_API,
  },
});
