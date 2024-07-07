import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { providerMap } from '@/auth';
import { logo } from '../../icons/logo';
import classNames from 'classnames';
import styles from './SignIn.module.scss';
import { google } from '../../icons/google';
import { Button, InlineLoading } from '@carbon/react';
import { twitter } from '../../icons/twitter';
import { github } from '../../icons/github';
import Credentials from '../Credentials/Credentials';

export default function SignIn() {
  const [loggingIn, setLoggingIn] = useState<string | null>(null);

  const logIn = async (id: string) => {
    try {
      setLoggingIn(id);
      await signIn(id);
    } finally {
      setLoggingIn(null);
    }
  };

  return (
    <div className={styles.signIn}>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex gap-2 justify-center items-center p-4">
          <div className={styles.logo}>{logo}</div>
          <div className="flex flex-col">
            <span className="font-bold text-3xl">Log in</span>
          </div>
        </div>

        <Credentials></Credentials>

        <span className={classNames('text-xs', styles.or)}>Or</span>
        <div className="flex flex-col gap-4">
          {providerMap.map((m, i) => {
            return (
              <Button
                key={i}
                kind="secondary"
                className={styles.button}
                onClick={() => logIn(m.id)}
                disabled={loggingIn === m.id}
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {loggingIn === m.id && <InlineLoading></InlineLoading>}
                    <span className="text-sm whitespace-nowrap">
                      Log in with {m.name}
                    </span>
                  </div>
                  {m.id === 'google' && google}
                  {m.id === 'twitter' && twitter}
                  {m.id === 'github' && github}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
