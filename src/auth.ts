import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas/login-schema';
import { getUserByEmail } from './services/user';
import { authConfig } from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcrypt-edge';
import { db } from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = bcrypt.compareSync(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
});
