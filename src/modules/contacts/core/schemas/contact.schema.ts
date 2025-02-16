'use client';

import { z } from 'zod';

const messageRequired = 'Este campo es obligatorio.';

const selectOptionSchema = z
  .object({
    label: z.string(),
    value: z.number(),
  })
  .refine((data) => data.value !== null && data.value !== undefined, {
    message: 'Este campo es obligatorio.',
  });

export const contactSchema = z.object({
  first_name: z.string().min(2, { message: messageRequired }).max(50),
  last_name: z.string().min(2, { message: messageRequired }).max(50),
  phone: z.string().min(1, { message: messageRequired }).max(15),
  job_title: z.string().min(1, { message: messageRequired }).max(100),
  is_primary_contact: z.boolean(),
  email: z.string().min(1, { message: messageRequired }).email(),
  branch_selector: selectOptionSchema,
  business_selector: selectOptionSchema,
});
