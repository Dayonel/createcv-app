import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { providerMap } from '@/auth';
import { logo } from '../icons/logo';
import classNames from 'classnames';
import styles from './SignIn.module.scss';
import { google } from '../icons/google';
import { Button, InlineLoading, Modal } from '@carbon/react';
import { twitter } from '../icons/twitter';
import { github } from '../icons/github';

interface SignInProps {
  open: boolean;
  onClose: () => void;
}
export default function SignIn({ open, onClose }: SignInProps) {
  const [mounted, setMounted] = useState(false);
  const [loggingIn, setLoggingIn] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logIn = async (id: string) => {
    try {
      setLoggingIn(id);
      await signIn(id);
    } finally {
      setLoggingIn(null);
    }
  };

  return (
    <>
      {mounted && (
        <Modal
          open={open}
          className={styles.signIn}
          passiveModal
          onRequestClose={onClose}
          size="xs"
          selectorPrimaryFocus=".flex"
          tabIndex={-1}
        >
          <div className="flex flex-col gap-4">
            <div
              className={classNames(
                styles.header,
                'flex gap-2 justify-center items-center p-4'
              )}
            >
              {logo}
              <span className="font-bold text-xl">Log in</span>
            </div>
            <span className={classNames('text-xs', styles.loginOptions)}>
              Log in options
            </span>
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
        </Modal>
      )}
    </>
  );
}
