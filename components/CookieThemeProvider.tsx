'use client';
import React, { createContext } from 'react';

export const CookieThemeContext = createContext('g10');

export const CookieThemeProvider = ({ cookieTheme, children }: any) => {
  return (
    <CookieThemeContext.Provider value={cookieTheme}>
      {children}
    </CookieThemeContext.Provider>
  );
};
