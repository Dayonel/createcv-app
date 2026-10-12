'use server';

import { signIn } from '@/auth';
import { users, verificationTokens } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { VerifySchema } from '@/schemas/verify-schema';
import { getUserByEmail } from '@/services/auth/user';
import { getVerificationTokenByToken } from '@/services/auth/verification-token';
import { eq } from 'drizzle-orm';
import { AuthError } from 'next-auth';
import { z } from 'zod';

// react-doctor-disable-next-line react-doctor/server-auth-actions
export const verify = async (values: z.infer<typeof VerifySchema>) => {
  const validatedFields = VerifySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { code, email, password } = validatedFields.data;

  const existingToken = await getVerificationTokenByToken(code);
  if (!existingToken) {
    return { error: 'Invalid code.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email does not exist.' };
  }

  if (!existingUser.emailVerified) {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        email: existingToken.email,
      })
      .where(eq(users.id, existingUser.id));

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  // log in
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) throw error; // Rethrow all other errors
  }
};
