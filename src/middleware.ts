import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
const PROTECTED_ROUTES: string[] = ['/resumes'];

export default auth((req): void | Response | Promise<void | Response> => {
  const { nextUrl } = req;
  const authenticated = !!req.auth;

  if (
    !authenticated &&
    PROTECTED_ROUTES.some((s) => nextUrl.pathname.startsWith(s))
  ) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
