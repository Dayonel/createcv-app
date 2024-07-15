import { Logout } from '@carbon/icons-react';
import Action from '../DndKit/components/Action/Action';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <Action
      onClick={() => signOut()}
      className="menu-item"
      fill="var(--cds-text-primary)"
    >
      <div className="menu-item">
        <Logout size={20}></Logout>
        <span>Log Out</span>
      </div>
    </Action>
  );
}
