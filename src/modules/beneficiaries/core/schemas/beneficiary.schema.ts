'use client';

import { z } from 'zod';

export const beneficiarySchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  phone: z.string().min(1).max(20),
  address: z.string().min(1).max(255),
  email: z.string(),
  birth_date: z.string(),
  children_count: z.number().default(0),
  notes: z.string().min(1).max(100),
  education_level: z.number(),
  gender: z.number(),
});
