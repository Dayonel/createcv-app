import { setCookie } from '@/actions/cookies';
import { Asleep, Light } from '@carbon/icons-react';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { CookieThemeContext } from './CookieThemeProvider';
import Action from './DndKit/components/Action/Action';

export default function ThemeToggle() {
  const cookieTheme = useContext(CookieThemeContext);
  const [serverTheme, setServerTheme] = useState<string | undefined>(
    () => cookieTheme
  );
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      setCookie('theme', theme);
    }

    setServerTheme(theme);
  }, [theme]);

  return (
    <>
      {serverTheme === 'g90' ? (
        <Action
          fill="var(--cds-text-primary)"
          onClick={() => setTheme('g10')}
        >
          <div className="flex items-center gap-2">
            <Light size={20}></Light>
            <span>Light</span>
          </div>
        </Action>
      ) : (
        <Action
          fill="var(--cds-text-primary)"
          onClick={() => setTheme('g90')}
        >
          <div className="flex items-center gap-2">
            <Asleep size={20}></Asleep>
            <span>Dark</span>
          </div>
        </Action>
      )}
    </>
  );
}
