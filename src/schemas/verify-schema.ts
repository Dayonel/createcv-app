import { z } from 'zod';

export const VerifySchema = z.object({
  code: z
    .string()
    .min(1, { message: 'Code is required.' })
    .min(6, 'Code must be 6 characters'),
  email: z.coerce.string().email().min(5, { message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});
