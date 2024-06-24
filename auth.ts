import { D1Adapter } from '@auth/d1-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';

const providers = [Google, Twitter, GitHub];
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  adapter: D1Adapter(process.env.DB),
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    // @ts-ignore
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    // @ts-ignore
    return { id: provider.id, name: provider.name };
  }
});
