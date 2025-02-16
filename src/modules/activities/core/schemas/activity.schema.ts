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

export const activitySchema = z.object({
  notes: z.string().min(200, { message: messageRequired }),
  start_date: z.string(),
  end_date: z.string(),
  activity_status: z.number(),
  business: z.number(),
  branches: z.number(),
  branch_selector: selectOptionSchema,
  business_selector: selectOptionSchema,
  tutor_selector: selectOptionSchema,
  activity_status_selector: selectOptionSchema,
  beneficiary_selector: selectOptionSchema,
  tutor: z.number(),
  beneficiary: z.number(),
});
