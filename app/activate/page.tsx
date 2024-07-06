'use client';
import SignIn from '@/components/Auth/SignIn';
import styles from './page.module.scss';
import { Link } from '@carbon/react';
import { useSession } from 'next-auth/react';

export default function Activate() {
  const { data: session } = useSession();

  return (
    <div className="grid items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-full p-8 max-w-[900px] gap-8 md:gap-20">
        <div className="grid gap-4">
          <p className="text-3xl md:text-4xl text-center">
            Thank you for your payment.
          </p>
          <p className={`${styles.helper} text-xs text-center`}>
            Use any of the following options to activate your account.
          </p>
        </div>
        <div className="grid w-full gap-24 md:gap-36">
          <SignIn></SignIn>
          <span className="text-sm text-center">
            Need help? Contact us by{' '}
            <Link href="mailto:info@createcv.app">email</Link>.
          </span>
        </div>
      </div>
    </div>
  );
}
