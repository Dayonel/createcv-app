import NextAuth from 'next-auth';
import Apple from 'next-auth/providers/apple';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const providers = [Google, Apple, GitHub];
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
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
