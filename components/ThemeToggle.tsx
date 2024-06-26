import { setCookie } from '@/actions/cookies';
import { Asleep, Light } from '@carbon/icons-react';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import Action from './DndKit/components/Action/Action';
import { CookieThemeContext } from './Providers/CookieThemeProvider';

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
            <Light size={20}></Light>
            <span>Light</span>
          </div>
        </Action>
      ) : (
        <Action fill="var(--cds-text-primary)" onClick={() => setTheme('dark')}>
          <div className="flex items-center gap-2">
            <Asleep size={20}></Asleep>
            <span>Dark</span>
          </div>
        </Action>
      )}
    </>
  );
}
