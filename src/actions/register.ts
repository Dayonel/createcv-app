'use server';

import * as z from 'zod';

import { db } from '@/lib/db';
import { sendRegisterEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas/register-schema';
import { getUserByEmail } from '@/services/auth/user';
import bcrypt from 'bcrypt-edge';
import { users } from '@/drizzle/schema';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use.' };
  }

  await db.insert(users).values({
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  sendRegisterEmail(verificationToken.email, verificationToken.token);

  // send email verification
  return { verify: true, email: email, password: password };
};
