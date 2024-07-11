import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.coerce.string().email().min(5, { message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});
