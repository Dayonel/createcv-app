import styles from './Divider.module.scss';

export default function Divider({ props }: any) {
  return (
    <div className={`relative pl-[6px] max-w-dvw mt-3 mb-2 overflow-hidden`}>
      <span className={`text-sm uppercase font-bold ${styles.divider}`}>
        {props}
      </span>
    </div>
  );
}
