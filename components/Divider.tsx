import styles from './Divider.module.scss';

interface DividerProps {
  props: string;
}

export default function Divider({ props }: DividerProps) {
  return (
    <div className={`relative pl-[6px] w-full mb-2 overflow-hidden`}>
      <span className={`text-sm uppercase font-bold ${styles.divider}`}>
        {props}
      </span>
    </div>
  );
}
