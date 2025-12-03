'use client';

import { Link as CarbonLink } from '@carbon/react';
import Link from 'next/link';
import { logoFull } from '../icons/logo-full';
import styles from './footer.module.scss';
import { LogoGithub, LogoLinkedin, LogoX } from '@carbon/icons-react';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="container">
        <footer className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full pt-12 pb-16 md:py-20 px-8 gap-8 md:gap-20 print:hidden">
          {logoFull}

          <div className="flex flex-col gap-12 md:gap-8">
            <div className="flex justify-center gap-6">
              <Link
                target="_blank"
                href="https://x.com/nestordotgg"
                aria-label="Nestor Plysyuk on X (opens in a new tab)"
              >
                <LogoX size={32}></LogoX>
              </Link>
              <Link
                target="_blank"
                href="https://github.com/Dayonel"
                aria-label="Nestor Plysyuk on GitHub (opens in a new tab)"
              >
                <LogoGithub size={32}></LogoGithub>
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/nestor-plysyuk/"
                aria-label="Nestor Plysyuk on LinkedIn (opens in a new tab)"
              >
                <LogoLinkedin size={32}></LogoLinkedin>
              </Link>
            </div>
            <nav className="flex gap-6">
              <CarbonLink href="mailto:info@createcv.app">
                info@createcv.app
              </CarbonLink>
              <CarbonLink href="#">Privacy</CarbonLink>
              <CarbonLink href="#">Cookies</CarbonLink>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
