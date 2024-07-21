import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';

const providers = [Google, Twitter, GitHub];

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/error',
  },
  providers,
} satisfies NextAuthConfig;

export const providerMap = providers.map((m) =>
  // @ts-ignore
  typeof m === 'function' ? m().id : m.id
);
