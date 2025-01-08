'use client';

import { z } from 'zod';

export const tutorSchema = z.object({
  first_name: z.string().min(2).max(150),
  last_name: z.string().min(2).max(150),
  email: z.string().email(),
  username: z.string().min(2).max(150),
  dni: z.string().min(1).max(8),
  phone: z.string().min(1).max(15),
  address: z.string().min(1).max(250),
  specialization: z.string().min(1).max(100),
  birth_date: z.string().date(),
  is_active: z.boolean(),
  password: z.string(),
  password_confirmation: z.string(),
});
