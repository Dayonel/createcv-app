'use client';
import { Asleep, Light } from '@carbon/icons-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('');

  // system preference
  useEffect(() => {
    // system preference
    const userPreference = localStorage.getItem('theme');
    if (!userPreference) {
      console.log('system preference');
      const dark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (dark) {
        setTheme('g90');
      }
    } else {
      setTheme(userPreference);
    }
  }, []);

  // update theme
  useEffect(() => {
    if (!theme) return;

    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  // local storage
  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme!);
  }, [theme]);

  return (
    <span className="menu-item">
      {theme === 'g90' ? (
        <button aria-label="theme toggle" onClick={() => setTheme('g10')}>
          <Light size={24}></Light>
        </button>
      ) : (
        <button aria-label="theme toggle" onClick={() => setTheme('g90')}>
          <Asleep size={24}></Asleep>
        </button>
      )}
    </span>
  );
}
