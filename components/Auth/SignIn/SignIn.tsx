import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { logo } from '../../icons/logo';
import classNames from 'classnames';
import styles from './SignIn.module.scss';
import { google } from '../../icons/google';
import { Button, InlineLoading } from '@carbon/react';
import { twitter } from '../../icons/twitter';
import { github } from '../../icons/github';
import Credentials from '../Credentials/Credentials';
import { providerMap } from '@/auth.config';
import Register from '../register-form/register-form';

interface SignInProps {
  isRegister: boolean;
  onRegister: () => void;
}

export default function SignIn({ isRegister, onRegister }: SignInProps) {
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const [register, setRegister] = useState(isRegister);

  useEffect(() => {
    setRegister(isRegister);
  }, [isRegister]);

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
        <div className="flex gap-2 justify-center items-center py-4">
          <div className={styles.logo}>{logo}</div>
          <div className="flex flex-col">
            <span className="font-bold text-3xl">
              {register ? 'Create an account' : 'Log in'}
            </span>
          </div>
        </div>

        {register ? (
          <Register onLogin={() => setRegister(false)}></Register>
        ) : (
          <Credentials
            onRegister={() => {
              setRegister(true);
              onRegister();
            }}
          ></Credentials>
        )}
        <span className={classNames('text-xs', styles.or)}>Or</span>
        <div className="flex flex-col gap-4">
          {providerMap.map((m, i) => {
            return (
              <Button
                key={i}
                kind="secondary"
                className={styles.button}
                onClick={() => logIn(m)}
                disabled={loggingIn === m}
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {loggingIn === m && <InlineLoading></InlineLoading>}
                    <span className="text-sm whitespace-nowrap capitalize">
                      Log in with {m}
                    </span>
                  </div>
                  {m === 'google' && google}
                  {m === 'twitter' && twitter}
                  {m === 'github' && github}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
