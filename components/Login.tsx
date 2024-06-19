'use client';
import { UserAvatar } from '@carbon/icons-react';
import Action from './DndKit/components/Action/Action';

export default function Login() {
  return (
    <Action className="menu-item" fill="var(--cds-text-primary)">
      <UserAvatar size={20}></UserAvatar>
    </Action>
  );
}
