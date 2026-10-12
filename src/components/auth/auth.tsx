'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { logo } from '../icons/logo';
import classNames from 'classnames';
import styles from './auth.module.scss';
import { google } from '../icons/google';
import { Button, IconButton, InlineLoading, Link } from '@carbon/react';
import { twitter } from '../icons/twitter';
import { github } from '../icons/github';
import { providerMap } from '@/auth.config';
import Register from './register/register';
import Login from './login/login';
import Verify from './verify/verify';
import { ArrowLeft } from '@carbon/icons-react';
import Reset from './reset-password/reset-password';
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes';

export default function SignIn() {
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const [register, setRegister] = useState<boolean>(false);
  const [verify, setVerify] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const logIn = async (id: string) => {
    try {
      if (id === 'credentials') return;

      setLoggingIn(id);
      await signIn(id, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    } finally {
      setLoggingIn(null);
    }
  };

  if (reset) {
    return (
      <div className="flex flex-col">
        {!sent && (
          <div className="flex">
            <IconButton
              kind="ghost"
              label="Go back"
              align="right"
              onClick={() => setReset(false)}
            >
              <ArrowLeft></ArrowLeft>
            </IconButton>
          </div>
        )}
        <Reset
          onSent={() => setSent(true)}
          onDone={() => setReset(false)}
        ></Reset>
      </div>
    );
  }

  if (verify) {
    return (
      <>
        <IconButton
          kind="ghost"
          label="Go back"
          align="right"
          onClick={() => setVerify(false)}
        >
          <ArrowLeft></ArrowLeft>
        </IconButton>
        <Verify email={email} password={password}></Verify>
      </>
    );
  }

  return (
    <div className={styles.signIn}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-center items-center py-4">
          <div className={styles.logo}>{logo}</div>
          <div className="flex flex-col">
            <span className="font-bold text-3xl">
              {register ? 'Create an account' : 'Log in'}
            </span>
          </div>
        </div>

        {register ? (
          <Register
            onLogin={() => setRegister(false)}
            onVerify={(email, password) => {
              setVerify(true);
              setEmail(email);
              setPassword(password);
            }}
          ></Register>
        ) : (
          <Login
            onRegister={() => setRegister(true)}
            onVerify={(email, password) => {
              setVerify(true);
              setEmail(email);
              setPassword(password);
            }}
            onReset={() => setReset(true)}
          ></Login>
        )}
        <span className={classNames('text-xs', styles.or)}>Or</span>
        <div className="flex flex-col gap-4">
          {providerMap.map((m) => {
            return (
              <Button
                key={m}
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

        <div className="flex flex-col w-full">
          <span className="text-xs text-center">
            By signing in, you agree to our{' '}
            <Link className="!text-xs" href="mailto:info@createcv.app">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="!text-xs" href="mailto:info@createcv.app">
              Privacy policy
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
