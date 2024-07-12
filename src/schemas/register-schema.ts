import { z } from 'zod';

const passwordError =
  'Your password must be at least 6 characters including one uppercase, one lowercase, and one number.';

export const RegisterSchema = z
  .object({
    email: z.coerce.string().email().min(5, { message: 'Email is required.' }),
    password: z.string().min(6, {
      message: passwordError,
    }),
  })
  .refine(
    (data) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      return regex.test(data.password);
    },
    {
      message: passwordError,
      path: ['password'],
    }
  );
