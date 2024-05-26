import styles from './Divider.module.scss';
import RichText from './RichText/RichText';

interface DividerProps {
  props: string;
  onChange: (e: string) => void;
  className?: string;
}

export default function Divider({ props, onChange, className }: DividerProps) {
  return (
    <div className="pr-[6px]">
      <div className={`relative overflow-hidden w-full ${styles.divider}`}>
        <RichText
          props={props}
          onChange={onChange}
          className={`max-w-xs md:max-w-lg text-sm uppercase font-bold inline-block ${className}`}
          input
        ></RichText>
      </div>
    </div>
  );
}
