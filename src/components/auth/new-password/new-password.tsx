'use client';

import { useSearchParams } from 'next/navigation';
import styles from './new-password.module.scss';
import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NewPasswordSchema } from '@/schemas/new-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPassword } from '@/actions/new-password';
import {
  Button,
  InlineLoading,
  Link,
  PasswordInput,
  Stack,
} from '@carbon/react';
import FormError from '@/components/form-error/form-error';
import { ArrowRight } from '@carbon/icons-react';
import { logo } from '../../icons/logo';
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes';

export default function NewPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement | null>(null);

  const { formState, handleSubmit, register } = useForm<
    z.infer<typeof NewPasswordSchema>
  >({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }

        ref.current!.submit();
      });
    });
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)} action={callbackUrl || DEFAULT_LOGIN_REDIRECT}>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center md:px-0 w-full max-w-md gap-8 md:gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center my-4">
              <div className={styles.logo}>{logo}</div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-3xl">
                  Set new password
                </span>
              </div>
            </div>
            <p
              style={{ color: 'var(--cds-text-helper)' }}
              className={'text-xs text-center leading-5'}
            >
              Enter a new password below to change your password.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="text-lg font-bold text-center">Enter new password</p>

            <PasswordInput
              type="password"
              id="password"
              labelText=""
              placeholder="New password"
              required
              size="lg"
              autoComplete="true"
              disabled={isPending}
              invalid={formState.errors.password !== undefined}
              invalidText={formState.errors.password?.message}
              {...register('password')}
            />

            <PasswordInput
              type="password"
              id="confirmPassword"
              labelText=""
              placeholder="Confirm your new password"
              required
              size="lg"
              autoComplete="true"
              disabled={isPending}
              invalid={formState.errors.confirmPassword !== undefined}
              invalidText={formState.errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              kind="primary"
              className="!w-full items-center h-[50px]"
              style={{ maxInlineSize: '100%' }}
              renderIcon={ArrowRight}
              type="submit"
              disabled={isPending}
            >
              <div className="flex items-center gap-2">
                {isPending && <InlineLoading></InlineLoading>}
                <span className="text-sm whitespace-nowrap">Reset password</span>
              </div>
            </Button>

            <FormError message={error}></FormError>
          </div>

          <div className="flex flex-col w-full">
            <span className="text-sm text-center">
              Need help? Contact us by{' '}
              <Link href="mailto:info@createcv.app">email</Link>.
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
