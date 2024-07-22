import { z } from 'zod';

export const ResetSchema = z.object({
  email: z.coerce
    .string()
    .email()
    .min(5, { message: 'Email is required.' })
    .transform((e) => e.trim().toLowerCase()),
});
