'use client';
import styles from './Header.module.scss';
import { logo } from '../icons/logo';
import Actions from '../Actions/Actions';
import Profile from '../Auth/Profile';

interface HeaderProps {
  onReset: () => void;
  onEdit: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function Header({
  onReset,
  onEdit,
  onUndo,
  onRedo,
}: HeaderProps) {
  return (
    <header
      className={`${styles.header} sticky top-0 z-10 p-2 flex justify-center w-full print:hidden`}
    >
      <nav className="flex justify-between items-center h-full w-full max-w-[900px] px-4 md:px-6">
        <a href="/" className="flex items-center gap-2" aria-label="Create CV">
          {logo}
          <span className={`hidden font-bold sm:block ${styles.logo}`}>
            Create CV
          </span>
        </a>

        <div className="flex gap-2 items-center">
          <Actions
            onEdit={onEdit}
            onReset={onReset}
            onUndo={onUndo}
            onRedo={onRedo}
          ></Actions>
          <Profile></Profile>
        </div>
      </nav>
    </header>
  );
}
