import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas/login-schema';
import { getUserByEmail } from './services/user';
import { authConfig } from './auth.config';
import db from '@/lib/db';
import bcrypt from 'bcrypt-edge';

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

          const passwordsMatch = await bcrypt.compareSync(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
});
