'use client';
import { createContext } from 'react';

export const CookieThemeContext = createContext(undefined);

export const CookieThemeProvider = ({ cookieTheme, children }: any) => {
  return (
    <CookieThemeContext.Provider value={cookieTheme}>
      {children}
    </CookieThemeContext.Provider>
  );
};
