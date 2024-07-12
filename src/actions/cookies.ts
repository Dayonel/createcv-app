'use server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function setCookie(
  k: string,
  v: string,
  permanent: boolean = true
) {
  const now = new Date();
  const cookie: Partial<ResponseCookie> | undefined = permanent
    ? { expires: new Date(now.getTime() + 400 * 24 * 60 * 60 * 1000) } // 400 days (max)
    : undefined;

  await cookies().set(k, v, cookie);
}

export async function deleteCookie(k: string) {
  await cookies().delete(k);
}
