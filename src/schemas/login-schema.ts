import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.coerce
    .string()
    .email()
    .min(5, { message: 'Email is required.' })
    .transform((e) => e.trim().toLowerCase()),
  password: z.string().min(1, { message: 'Password is required.' }),
});
