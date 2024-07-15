import { passwordResetTokens } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    });

    return resetToken;
  } catch {
    return null;
  }
};
