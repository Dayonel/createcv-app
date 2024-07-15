'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { newVerification } from '@/actions/new-verification';
import {
  Button,
  InlineLoading,
  Link,
  PasswordInput,
  TextInput,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { logo } from '../../icons/logo';
import styles from './new-verification-form.module.scss';
import FormError from '@/components/form-error/form-error';
import { z } from 'zod';
import { VerifySchema } from '@/schemas/verify-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface NewVerificationProps {
  email: string;
  password: string;
}

export default function NewVerificationForm({
  email,
  password,
}: NewVerificationProps) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement | null>(null);

  const {
    formState,
    handleSubmit,
    register: reg,
    watch,
  } = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      code: '',
      email,
      password,
    },
  });

  const code = watch('code');

  useEffect(() => {
    if (code.length === 6 && ref.current) {
      ref.current.requestSubmit();
    }
  }, [code]);

  const onSubmit = async (values: z.infer<typeof VerifySchema>) => {
    setError('');

    startTransition(() => {
      newVerification(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          ref.current!.submit();
        })
        .catch(() => {
          setError('Something went wrong');
        });
    });
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center w-full px-4">
        <div className="flex flex-col items-center md:px-0 w-full max-w-md gap-8 md:gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center my-4">
              <div className={styles.logo}>{logo}</div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-3xl">
                  Account confirmation
                </span>
              </div>
            </div>
            <p
              style={{ color: 'var(--cds-text-helper)' }}
              className={'text-xs text-center leading-5'}
            >
              To confirm your account, please enter the 6-digit code we sent to{' '}
              <span className="text-xs font-bold">{email}</span>.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="text-lg font-bold text-center">
              Enter your verification code
            </p>

            <TextInput
              type="text"
              id="code"
              required
              labelText=""
              placeholder="123456"
              size="lg"
              autoComplete="true"
              disabled={isPending}
              invalid={formState.errors.code !== undefined}
              invalidText={formState.errors.code?.message}
              {...reg('code')}
            />

            <div className="hidden">
              <TextInput
                hidden
                type="text"
                id="email"
                required
                labelText=""
                placeholder="username@example.com"
                size="lg"
                autoComplete="true"
                disabled={isPending}
                invalid={formState.errors.email !== undefined}
                invalidText={formState.errors.email?.message}
                {...reg('email')}
              />

              <PasswordInput
                hidden
                type="password"
                id="password"
                labelText=""
                placeholder="password"
                required
                size="lg"
                autoComplete="true"
                disabled={isPending}
                invalid={formState.errors.password !== undefined}
                invalidText={formState.errors.password?.message}
                {...reg('password')}
              />
            </div>

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
                <span className="text-sm whitespace-nowrap">
                  Confirm account
                </span>
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
