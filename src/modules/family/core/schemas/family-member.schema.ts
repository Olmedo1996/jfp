import { z } from 'zod';

export const familyMemberSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  birth_date: z.string().min(1, 'Birth date is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  beneficiary: z.number(),
  is_active: z.boolean().default(true),
});

export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
