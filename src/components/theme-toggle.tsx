import { setCookie } from '@/actions/cookies';
import { Asleep, Light } from '@carbon/icons-react';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import Action from './dndkit/components/action/action';
import { CookieThemeContext } from './providers/cookie-theme-provider';

export default function ThemeToggle() {
  const cookieTheme = useContext(CookieThemeContext);
  const [serverTheme, setServerTheme] = useState<string | undefined>(
    () => cookieTheme
  );
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme) {
      setCookie('theme', resolvedTheme);
    }

    setServerTheme(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <>
      {serverTheme === 'dark' ? (
        <Action
          fill="var(--cds-text-primary)"
          onClick={() => setTheme('light')}
        >
          <div className="flex items-center gap-2">
            <Light></Light>
            <span>Light</span>
          </div>
        </Action>
      ) : (
        <Action fill="var(--cds-text-primary)" onClick={() => setTheme('dark')}>
          <div className="flex items-center gap-2">
            <Asleep></Asleep>
            <span>Dark</span>
          </div>
        </Action>
      )}
    </>
  );
}
