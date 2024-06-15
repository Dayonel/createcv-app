'use client';
import Login from './Login';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.scss';
import { logo } from './logo';

export default function Header() {
  return (
    <header
      className={`${styles.header} sticky top-0 z-10 p-2 flex justify-center w-full print:hidden`}
    >
      <nav className="flex justify-between items-center h-full w-full max-w-[984px] px-6">
        <a href="/" className="flex items-center gap-2" aria-label="Create CV">
          {logo}
          <span className={`hidden font-bold sm:block ${styles.logo}`}>
            Create CV
          </span>
        </a>
        <div className="flex gap-1 items-center">
          <ThemeToggle></ThemeToggle>
          <Login></Login>
        </div>
      </nav>
    </header>
  );
}
