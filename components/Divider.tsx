import styles from './Divider.module.scss';
import RichText from './RichText/RichText';

interface DividerProps {
  props: string;
  onChange: (e: string) => void;
  onRemove: () => void;
  className?: string;
}

export default function Divider({ props, onChange, onRemove, className }: DividerProps) {
  return (
    <div className="pr-[6px]">
      <div className={`relative overflow-x-clip w-full ${styles.divider}`}>
        <RichText
          props={props}
          onChange={onChange}
          className={`max-w-xs md:max-w-lg text-sm uppercase font-bold inline-block ${className}`}
          input
          onRemove={onRemove}
        ></RichText>
      </div>
    </div>
  );
}
