import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes';

export const safeRedirect = (url: string | null) =>
  url && /^\/(?![\\/])/.test(url) ? url : DEFAULT_LOGIN_REDIRECT;
