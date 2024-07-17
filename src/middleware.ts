import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
const AUTH_ROUTE = '/api/auth';
const PUBLIC_ROUTES: string[] = [
  '/',
  '/login',
  '/reset-password',
  '/activate',
  '/error',
];

export default auth((req): void | Response | Promise<void | Response> => {
  const { nextUrl } = req;
  const apiRoute = nextUrl.pathname.startsWith(AUTH_ROUTE);
  const publicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const authenticated = !!req.auth;

  if (apiRoute || publicRoute || authenticated) return;

  let callbackUrl = nextUrl.pathname;
  if (nextUrl.search) callbackUrl += nextUrl.search;
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  return Response.redirect(
    new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  );
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
