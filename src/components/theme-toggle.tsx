import { setCookie } from '@/utils/cookies';
import { Asleep, Light } from '@carbon/icons-react';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import Action from './dndkit/components/action/action';
import { CookieThemeContext } from './providers/contexts';

interface ThemeToggleProps {
  small?: boolean;
}

export default function ThemeToggle({ small }: ThemeToggleProps) {
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
          name="Light Theme"
          fill="var(--cds-text-primary)"
          onClick={() => setTheme('light')}
        >
          <div className="flex items-center gap-2">
            <Light size={small ? 16 : 20}></Light>
            {small && <span>Light</span>}
          </div>
        </Action>
      ) : (
        <Action
          name="Dark Theme"
          fill="var(--cds-text-primary)"
          onClick={() => setTheme('dark')}
        >
          <div className="flex items-center gap-2">
            <Asleep size={small ? 16 : 20}></Asleep>
            {small && <span>Dark</span>}
          </div>
        </Action>
      )}
    </>
  );
}
