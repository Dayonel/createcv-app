import useColorStore from '@/store/useStore';
import styles from './Divider.module.scss';

interface DividerProps {
  dashed?: boolean;
  children?: any;
}

export default function Divider({ dashed, children }: DividerProps) {
  const { color } = useColorStore();

  return (
    <div className={`pr-[6px] w-full`}>
      <div
        className={`relative overflow-x-clip ${styles.divider} ${
          dashed ? 'after:border-dashed' : 'after:border-solid'
        }`}
        style={{ color }}
      >
        {children}
      </div>
    </div>
  );
}
