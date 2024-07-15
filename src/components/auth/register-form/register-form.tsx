'use client';

import {
  Button,
  InlineLoading,
  PasswordInput,
  Stack,
  TextInput,
} from '@carbon/react';
import styles from './register-form.module.scss';
import { ArrowRight } from '@carbon/icons-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import FormError from '@/components/form-error/form-error';
import { register } from '@/actions/register';
import { RegisterSchema } from '@/schemas/register-schema';

interface RegisterProps {
  onLogin: () => void;
  onVerify: (email: string, password: string) => void;
}

export default function Register({ onLogin, onVerify }: RegisterProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');

  const {
    formState,
    handleSubmit,
    register: reg,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError('');

    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          if (data?.verify) {
            onVerify(data.email, data.password);
            return;
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.credentials}>
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
            {...reg('email')}
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
            {...reg('password')}
          />

          <FormError message={error}></FormError>

          <div className="mt-4">
            <Button
              className="!w-full items-center h-[50px]"
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
          </div>

          <span className="flex justify-center gap-1">
            <span className={cn(styles.alreadyAccount, 'text-xs')}>
              Already have an account?
            </span>
            <button
              className={cn(styles.link, 'text-xs')}
              type="button"
              onClick={onLogin}
            >
              Login
            </button>
          </span>
        </Stack>
      </form>
    </>
  );
}
