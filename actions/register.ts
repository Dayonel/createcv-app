'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas/register-schema';
import { getUserByEmail } from '@/services/user';
import bcrypt from 'bcrypt-edge';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
