import styles from './Divider.module.scss';
import RichText from './RichText/RichText';

interface DividerProps {
  props: string;
  onChange: (e: string) => void;
}

export default function Divider({ props, onChange }: DividerProps) {
  return (
    <div className={`relative pr-[6px] overflow-hidden w-full ${styles.divider}`}>
      <RichText
        props={props}
        onChange={onChange}
        className="max-w-xs md:max-w-lg text-sm uppercase font-bold inline-block"
        input
      ></RichText>
    </div>
  );
}
