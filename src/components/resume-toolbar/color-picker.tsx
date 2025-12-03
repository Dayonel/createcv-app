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
    <div ref={ref} className="relative w-full">
      <Action
        name="Color Picker"
        className="action"
        title="Color"
        fill="var(--cds-text-primary)"
        onClick={() => setShow(!show)}
      >
        <div className="flex items-center gap-2">
          <TextColor></TextColor>
          <span>Color</span>
        </div>
      </Action>

      <div className="absolute z-10 -top-6 -left-3 translate-y-1/2 -translate-x-1/2">
        {show && (
          <HexColorPicker color={color} onChange={(c) => setColor(c, true)} />
        )}
      </div>
    </div>
  );
}
