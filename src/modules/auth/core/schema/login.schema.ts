import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(1, 'Password must be at least 1 characters'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
