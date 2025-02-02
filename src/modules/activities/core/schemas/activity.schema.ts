'use client';

import { z } from 'zod';

export const activitySchema = z.object({
  notes: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  activity_status: z.number(),
  business: z.number(),
  tutor: z.number(),
  beneficiary: z.number(),
});
