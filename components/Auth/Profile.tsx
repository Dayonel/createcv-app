'use client';
import Action from '../DndKit/components/Action/Action';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSession } from 'next-auth/react';
import { UserAvatar } from '@carbon/icons-react';
import SignOut from './SignOut';
import SignIn from './SignIn';
import Image from 'next/image';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));
  const { data: session } = useSession();

  return (
    <div ref={ref}>
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
          onClick={() => setModal(true)}
          className="menu-item"
          fill="var(--cds-text-primary)"
        >
          <UserAvatar size={20}></UserAvatar>
        </Action>
      )}

      <SignIn open={modal} onClose={() => setModal(false)}></SignIn>
    </div>
  );
}
