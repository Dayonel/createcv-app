'use server';

import bcrypt from 'bcrypt-edge';
import * as z from 'zod';
import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas/new-password-schema';
import { getPasswordResetTokenByToken } from '@/services/auth/password-reset-token';
import { getUserByEmail } from '@/services/auth/user';
import { passwordResetTokens, users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// react-doctor-disable-next-line react-doctor/server-auth-actions
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, existingToken.id));

  try {
    await signIn('credentials', {
      email: existingUser.email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) throw error; // Rethrow all other errors
  }
};
