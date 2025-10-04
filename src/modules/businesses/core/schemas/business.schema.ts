'use client';

import { z } from 'zod';

export const businessSchema = z.object({
  is_active: z.boolean().default(true),
  name: z.string().min(2).max(50),
  ruc_ci: z.string().min(1).max(12),
  description: z.string().min(1).max(100).optional(),
});
