'use client';
import Action from '../../DndKit/components/Action/Action';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSession } from 'next-auth/react';
import { UserAvatar } from '@carbon/icons-react';
import SignOut from '../SignOut';
import SignIn from '../SignIn/SignIn';
import Image from 'next/image';
import { Modal } from '@carbon/react';
import styles from './Profile.module.scss';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [modal, setModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useOutsideClick(() => setOpen(false));
  const { data: session } = useSession();

  return (
    <div className={styles.profile} ref={ref}>
      {session ? (
        <>
          <Action
            className="menu-item"
            fill="var(--cds-text-primary)"
            onClick={() => setOpen(!open)}
          >
            {session.user?.image ? (
              <Image
                style={{ borderRadius: '50%' }}
                src={session.user.image}
                alt="Profile picture"
                width={24}
                height={24}
              ></Image>
            ) : (
              <UserAvatar size={20}></UserAvatar>
            )}
          </Action>
          <>
            {open && (
              <div className="absolute md:!static right-2">
                <ul className="menu !sticky md:!absolute">
                  <li>
                    <SignOut></SignOut>
                  </li>
                </ul>
              </div>
            )}
          </>
        </>
      ) : (
        <Action
          onClick={() => {
            setIsRegister(false);
            setModal(true);
          }}
          className="menu-item"
          fill="var(--cds-text-primary)"
        >
          <UserAvatar size={20}></UserAvatar>
        </Action>
      )}

      {mounted && (
        <Modal
          open={modal}
          passiveModal
          onRequestClose={() => setModal(false)}
          size="xs"
          selectorPrimaryFocus=".flex"
        >
          <SignIn
            isRegister={isRegister}
            onRegister={() => setIsRegister(true)}
          ></SignIn>
        </Modal>
      )}
    </div>
  );
}
