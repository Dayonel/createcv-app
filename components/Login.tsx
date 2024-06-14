'use client';
import { UserAvatar } from '@carbon/icons-react';
import Action from './DndKit/components/Action/Action';

export default function Login() {
  return (
    <span className="menu-item">
      <Action fill="var(--cds-text-primary)">
        <UserAvatar size={24}></UserAvatar>
      </Action>
    </span>
  );
}
