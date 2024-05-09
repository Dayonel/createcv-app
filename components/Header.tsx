import { DocumentPdf } from '@carbon/icons-react';
import Login from './Login';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <DocumentPdf size={24}></DocumentPdf>
        <Login></Login>
      </nav>
    </header>
  );
}
