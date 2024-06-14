'use server';
import { cookies } from 'next/headers';

export async function setCookie(k: string, v: string) {
  await cookies().set(k, v);
}

export async function deleteCookie(k: string) {
  await cookies().delete(k);
}
