import { z } from 'zod';
import { passwordError } from '.';

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: passwordError,
    }),
    confirmPassword: z.string().min(6, {
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
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
