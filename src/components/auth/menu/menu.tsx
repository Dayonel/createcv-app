import Action from '@/components/dndkit/components/action/action';
import { DocumentPdf, Logout } from '@carbon/icons-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter();

  return (
    <div className="absolute md:!static right-2">
      <ul className="menu !sticky md:!absolute">
        <li>
          <Action
            onClick={() => router.push('/resumes')}
            className="menu-item"
            fill="var(--cds-text-primary)"
          >
            <div className="menu-item">
              <DocumentPdf></DocumentPdf>
              <span>Resumes</span>
            </div>
          </Action>
        </li>

        <li>
          <Action
            onClick={() => signOut()}
            className="menu-item"
            fill="var(--cds-text-primary)"
          >
            <div className="menu-item">
              <Logout></Logout>
              <span>Log Out</span>
            </div>
          </Action>
        </li>
      </ul>
    </div>
  );
}
