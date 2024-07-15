import { verificationTokens } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .orderBy(desc(verificationTokens.expires));

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.email, email),
    });

    return verificationToken;
  } catch {
    return null;
  }
};
