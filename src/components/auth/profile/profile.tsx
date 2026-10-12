'use client';
import { useMounted } from '@/hooks/use-mounted';
import Action from '../../dndkit/components/action/action';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { useSession } from 'next-auth/react';
import { UserAvatar, UserFilled } from '@carbon/icons-react';
import Auth from '../auth';
import Image from 'next/image';
import { Modal } from '@carbon/react';
import styles from './profile.module.scss';
import Menu from '../menu/menu';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const mounted = useMounted();


  const ref = useOutsideClick(() => setOpen(false));
  const { data: session } = useSession();

  return (
    <div className={styles.profile}>
      {session ? (
        <>
          <Action
            name="Profile"
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
              <UserFilled size={20}></UserFilled>
            )}
          </Action>
          <>{open && <Menu onClick={() => setOpen(false)} ref={ref}></Menu>}</>
        </>
      ) : (
        <Action
          name="Log In"
          onClick={() => setModal(true)}
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
          <div className="px-4">
            <Auth></Auth>
          </div>
        </Modal>
      )}
    </div>
  );
}
