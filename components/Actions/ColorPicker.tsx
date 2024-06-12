import { useOutsideClick } from '@/hooks/useOutsideClick';
import useColorStore from '@/store/useStore';
import { TextColor } from '@carbon/icons-react';
import { IconButton } from '@carbon/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPicker() {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState<string>();
  const ref = useOutsideClick(() => setShow(false));
  const { color, setColor, overriden } = useColorStore();

  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-carbon-theme') {
          const theme =
            (document.documentElement as HTMLElement).dataset.carbonTheme || '';
          setTheme(theme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (overriden) return;
    setColor(theme === 'g10' ? '#0f62fe' : '#78a9ff');
  }, [theme]);

  return (
    <div ref={ref} className="relative">
      <IconButton
        label="Color"
        kind="ghost"
        align="bottom"
        isSelected={show}
        onClick={() => setShow(!show)}
      >
        <TextColor size={24}></TextColor>
      </IconButton>

      <div className="absolute z-10 left-12 sm:left-2/4 translate-y-3 -translate-x-full sm:-translate-x-2/4">
        {show && (
          <>
            <HexColorPicker color={color} onChange={(c) => setColor(c, true)} />
          </>
        )}
      </div>
    </div>
  );
}
