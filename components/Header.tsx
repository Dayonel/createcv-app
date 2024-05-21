'use client';
import { DocumentPdf } from '@carbon/icons-react';
import Login from './Login';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header
      className={`${styles.header} w-full sticky top-0 z-10 p-2 max-w-[984px]`}
    >
      <nav className="flex justify-between items-center h-full">
        <span className="menu-item">
          <DocumentPdf size={24}></DocumentPdf>
        </span>
        <div className="flex items-center">
          <ThemeToggle></ThemeToggle>
          <Login></Login>
        </div>
      </nav>
    </header>
  );
}
