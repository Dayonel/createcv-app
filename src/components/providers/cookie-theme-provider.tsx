'use client';
import { CookieThemeContext } from './contexts';

export const CookieThemeProvider = ({
  cookieTheme,
  children,
}: {
  cookieTheme?: string;
  children: React.ReactNode;
}) => (
  <CookieThemeContext.Provider value={cookieTheme}>
    {children}
  </CookieThemeContext.Provider>
);
