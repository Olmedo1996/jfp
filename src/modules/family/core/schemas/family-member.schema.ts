import { z } from 'zod';

export const familyMemberSchema = z.object({
  first_name: z.string().min(1, 'Nombre es requerido'),
  last_name: z.string().min(1, 'Apellido es requerido'),
  birth_date: z.string().min(1, 'Fecha de nacimiento es requerida'),
  phone: z.string().min(1, 'Teléfono es requerido'),
  address: z.string().min(1, 'Dirección es requerida'),
  beneficiary: z.number(),
  is_active: z.boolean().default(true),
});

export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
