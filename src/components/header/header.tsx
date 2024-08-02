'use client';

import styles from './header.module.scss';
import { logo } from '../icons/logo';
import ResumeToolbar from '../resume-toolbar/resume-toolbar';
import Profile from '../auth/profile/profile';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../theme-toggle';
import useResumeStore from '@/store/resume-store';
import { useState } from 'react';
import Action from '../dndkit/components/action/action';
import EditResume from '../resume/edit-resume';

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
  const pathName = usePathname();
  const resumeStore = useResumeStore();
  const [edit, setEdit] = useState(false);

  return (
    <header
      className={`${styles.header} sticky top-0 z-10 p-2 flex justify-center w-full print:hidden`}
    >
      <nav
        className={`${styles.nav} flex justify-between items-center h-full w-full px-4 md:px-6`}
      >
        <a href="/" className="flex items-center gap-2" aria-label="Create CV">
          {logo}
          <span className={`hidden font-bold sm:block ${styles.logo}`}>
            Create CV
          </span>
        </a>

        {pathName.startsWith('/resumes/') && resumeStore.name && (
          <>
            <span className="pl-12 md:pl-0 truncate max-w-40 md:max-w-sm">
              <Action className="m-2 !p-2" onClick={() => setEdit(true)}>
                {resumeStore.name}
              </Action>
            </span>

            <EditResume
              open={edit}
              name={resumeStore.name}
              onClose={() => setEdit(false)}
            ></EditResume>
          </>
        )}

        <div className="flex gap-2 items-center">
          {pathName === '/' || pathName.startsWith('/resumes/') ? (
            <ResumeToolbar
              onEdit={onEdit}
              onReset={onReset}
              onUndo={onUndo}
              onRedo={onRedo}
            ></ResumeToolbar>
          ) : (
            <ThemeToggle></ThemeToggle>
          )}

          <Profile></Profile>
        </div>
      </nav>
    </header>
  );
}
