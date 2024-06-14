import useColorStore from '@/store/colorStore';
import styles from './Divider.module.scss';
import { useContext } from 'react';
import { ColorContext } from './ColorProvider';

interface DividerProps {
  dashed?: boolean;
  children?: any;
}

export default function Divider({ dashed, children }: DividerProps) {
  const serverColor = useContext(ColorContext);
  const { color } = useColorStore();

  return (
    <div className={`pr-[6px] w-full`}>
      <div
        className={`relative overflow-x-clip ${styles.divider} ${
          dashed ? 'after:border-dashed' : 'after:border-solid'
        }`}
        style={{ color: serverColor || color }}
      >
        {children}
      </div>
    </div>
  );
}
