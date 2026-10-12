const MAX_AGE = 400 * 24 * 60 * 60;

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
};

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=; path=/; max-age=0`;
};
