'use client';
import { useEffect } from 'react';
import { GlobalTheme } from '@carbon/react';

export default function ThemeProvider({ children }: any) {
  const theme: 'g10' | 'g100' | 'white' | 'g90' = 'g10';

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return <GlobalTheme theme={theme}>{children}</GlobalTheme>;
}
