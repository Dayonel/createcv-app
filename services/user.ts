import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  } catch {
    return null;
  }
};
