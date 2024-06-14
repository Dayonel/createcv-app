import { useOutsideClick } from '@/hooks/useOutsideClick';
import useColorStore from '@/store/colorStore';
import { TextColor } from '@carbon/icons-react';
import { IconButton, useTheme } from '@carbon/react';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPicker() {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const ref = useOutsideClick(() => setShow(false));
  const { color, setColor, overriden } = useColorStore();

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

      <div className="absolute z-10 left-12 md:left-2/4 translate-y-3 -translate-x-full md:-translate-x-2/4">
        {show && (
          <>
            <HexColorPicker color={color} onChange={(c) => setColor(c, true)} />
          </>
        )}
      </div>
    </div>
  );
}
