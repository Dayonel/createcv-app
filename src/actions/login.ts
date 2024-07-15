'use server';

import { signIn } from '@/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas/login-schema';
import { getUserByEmail } from '@/services/user';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt-edge';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  const passwordsMatch = user
    ? bcrypt.compareSync(password, user.password!)
    : false;

  if (!user || !passwordsMatch) {
    return { error: 'Wrong email or password' };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // send email verification
    return { verify: true, email: email, password: password };
  }

  try {
    await signIn('credentials', {
      email: email,
      password: password,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof AuthError) throw error; // Rethrow all other errors
  }
};
