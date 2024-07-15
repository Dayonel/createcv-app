import { getVerificationTokenByEmail } from '@/services/auth/verification-token';
import { db } from '@/lib/db';
import { verificationTokens } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { generateSecureSixDigitCode } from '@/utils/email';

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
