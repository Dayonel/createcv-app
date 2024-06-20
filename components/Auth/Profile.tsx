'use client';
import Action from '../DndKit/components/Action/Action';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSession } from 'next-auth/react';
import { UserAvatar } from '@carbon/icons-react';
import SignOut from './SignOut';
import SignIn from './SignIn';

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
            <UserAvatar size={20}></UserAvatar>
          </Action>
          <>
            {open && (
              <ul className="menu">
                <li>
                  <SignOut></SignOut>
                </li>
              </ul>
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
