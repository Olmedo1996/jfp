'use client';

import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().min(2).max(50),
  ruc_ci: z.string().min(1).max(12),
  phone: z.string().min(1).max(15),
  address: z.string().min(1).max(250),
  description: z.string().min(1).max(100),
  is_active: z.boolean(),
});
