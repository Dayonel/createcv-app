import { useOutsideClick } from '@/hooks/use-outside-click';
import useColorStore from '@/store/color-store';
import { TextColor } from '@carbon/icons-react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Action from '../dndkit/components/action/action';

export default function ColorPicker() {
  const [show, setShow] = useState(false);
  const ref = useOutsideClick(() => setShow(false));
  const { color, setColor } = useColorStore();

  return (
    <div ref={ref} className="relative">
      <Action
        className="action"
        title="Color"
        fill="var(--cds-text-primary)"
        onClick={() => setShow(!show)}
      >
        <TextColor size={20}></TextColor>
      </Action>

      <div className="absolute z-10 left-1/2 translate-y-3 -translate-x-1/2">
        {show && (
          <>
            <HexColorPicker color={color} onChange={(c) => setColor(c, true)} />
          </>
        )}
      </div>
    </div>
  );
}
