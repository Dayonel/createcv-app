import { UserAvatar } from '@carbon/icons-react';
import Action from '../DndKit/components/Action/Action';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <Action
      onClick={() => signIn('github')}
      className="menu-item"
      fill="var(--cds-text-primary)"
    >
      <UserAvatar size={20}></UserAvatar>
    </Action>
  );
}
