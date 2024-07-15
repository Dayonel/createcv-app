import { getVerificationTokenByEmail } from '@/services/auth/verification-token';
import { db } from '@/lib/db';
import { passwordResetTokens, verificationTokens } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { generateSecureSixDigitCode } from '@/utils/email';
import { getPasswordResetTokenByEmail } from '@/services/auth/password-reset-token';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = generateSecureSixDigitCode();
  const expires = new Date(new Date().getTime() + 600 * 1000); // 10 min

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  const [verficationToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 600 * 1000); // 10 min

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id));
  }

  const [passwordResetToken] = await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return passwordResetToken;
};
