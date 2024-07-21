'use client';

import {
  Button,
  InlineLoading,
  PasswordInput,
  Stack,
  TextInput,
} from '@carbon/react';
import styles from './login.module.scss';
import { ArrowRight } from '@carbon/icons-react';
import { useRef, useState, useTransition } from 'react';
import { LoginSchema } from '@/schemas/login-schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/actions/login';
import { cn } from '@/lib/utils';
import FormError from '@/components/form-error/form-error';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes';

interface LoginProps {
  onRegister: () => void;
  onVerify: (email: string, password: string) => void;
  onReset: () => void;
}

export default function Credentials({
  onRegister,
  onVerify,
  onReset,
}: LoginProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const ref = useRef<HTMLFormElement | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { formState, handleSubmit, register } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('');

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          if (data?.verify) {
            onVerify(data.email, data.password);
            return;
          }

          ref.current!.submit();
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <>
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.credentials}
        action={callbackUrl || DEFAULT_LOGIN_REDIRECT}
      >
        <Stack gap={4}>
          <TextInput
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
            {...register('email')}
          />

          <PasswordInput
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
            {...register('password')}
          />

          <FormError message={error}></FormError>

          <button
            className={cn(styles.link, 'text-xs place-self-start')}
            type="button"
            onClick={() => onReset()}
          >
            Forgot password?
          </button>

          <Button
            className="!w-full items-center  h-[50px]"
            style={{ maxInlineSize: '100%' }}
            kind="primary"
            renderIcon={ArrowRight}
            type="submit"
            disabled={isPending}
          >
            <div className="flex items-center gap-2">
              {isPending && <InlineLoading></InlineLoading>}
              <span className="text-sm whitespace-nowrap">Continue</span>
            </div>
          </Button>

          <span className="flex justify-center gap-1">
            <span className={cn(styles.dontHaveAccount, 'text-xs')}>
              {"Don't"} have an account?
            </span>
            <button
              className={cn(styles.link, 'text-xs')}
              type="button"
              onClick={onRegister}
            >
              Create an account
            </button>
          </span>
        </Stack>
      </form>
    </>
  );
}
