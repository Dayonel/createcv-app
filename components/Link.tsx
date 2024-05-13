import styles from './Link.module.scss';
import Input from './Input';

export default function Link({ props, onChange, children }: any) {
  return (
    <span className={`pl-[6px] flex items-center h-[24px] ${styles.link}`}>
      {children}
      <Input
        props={props}
        className="max-w-xs md:max-w-lg text-xs outline-none text-center md:text-start highlight"
        onChange={onChange}
      ></Input>
    </span>
  );
}
