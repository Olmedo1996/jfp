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

export const beneficiarySchema = z.object({
  first_name: z
    .string()
    .min(1, { message: messageRequired })
    .max(100, { message: 'El nombre no debe exceder los 100 caracteres.' }),

  last_name: z
    .string()
    .min(1, { message: messageRequired })
    .max(100, { message: 'El apellido no debe exceder los 100 caracteres.' }),

  phone: z.string().min(1, { message: messageRequired }).max(20, {
    message: 'El número de teléfono no debe exceder los 20 caracteres.',
  }),

  address: z
    .string()
    .min(1, { message: messageRequired })
    .max(255, { message: 'La dirección no debe exceder los 255 caracteres.' }),

  email: z.string().email({ message: 'El correo electrónico no es válido.' }),

  birth_date: z.string().min(1, { message: messageRequired }),

  children_count: z.number().default(0).optional(),

  notes: z
    .string()
    .min(1, { message: messageRequired })
    .max(100, { message: 'Las notas no deben exceder los 100 caracteres.' }),

  // Validación de gender y education_level
  gender: selectOptionSchema,

  education_level: selectOptionSchema.refine(
    (value) => value && value.value !== null && value.value !== undefined,
    {
      message: messageRequired,
    }
  ),
});
