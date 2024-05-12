import { Email } from '@carbon/icons-react';
import styles from './Link.module.scss';

export default function Link() {
  return (
    <span className={`text-xs flex gap-1 ${styles.link} `}>
      <Email></Email>
      dayonel@hotmail.es
    </span>
  );
}
