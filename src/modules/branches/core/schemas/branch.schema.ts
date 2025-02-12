'use client';

import { z } from 'zod';

const selectOptionSchema = z
  .object({
    label: z.string(),
    value: z.number(),
  })
  .refine((data) => data.value !== null && data.value !== undefined, {
    message: 'Este campo es obligatorio.',
  });

export const branchSchema = z.object({
  name: z.string().min(2).max(50),
  code: z.string().min(2).max(10),
  phone: z.string().min(1).max(15),
  address: z.string().min(1).max(250),
  is_active: z.boolean(),
  business_selector: selectOptionSchema,
});
