'use client';
import SignIn from '@/components/Auth/SignIn/SignIn';
import styles from './page.module.scss';
import { Link } from '@carbon/react';
import { useSession } from 'next-auth/react';

export default function Activate() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-full p-8 md:px-0 py-8 w-full max-w-md gap-8 md:gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-3xl md:text-4xl text-center">
            Thank you for your payment
          </p>
          <p className={`${styles.helper} text-xs text-center`}>
            Use any of the following options to activate your account
          </p>
        </div>
        <div className="flex flex-col w-full gap-24">
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
