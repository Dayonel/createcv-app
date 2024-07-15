import styles from './reset-password.module.scss';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetSchema } from '@/schemas/reset-schema';
import { useRef, useState, useTransition } from 'react';
import { Button, InlineLoading, Link, TextInput } from '@carbon/react';
import { logo } from '../../icons/logo';
import { ArrowRight, Checkmark, Email } from '@carbon/icons-react';
import FormError from '@/components/form-error/form-error';
import { reset } from '@/actions/reset-password';

interface ResetProps {
  onSent: () => void;
  onDone: () => void;
}

export default function Reset({ onSent, onDone }: ResetProps) {
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState<boolean>();
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement | null>(null);

  const { formState, handleSubmit, register, watch } = useForm<
    z.infer<typeof ResetSchema>
  >({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = watch('email');

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError('');

    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          setSent(true);
          onSent();
        })
        .catch(() => {
          setError('Something went wrong');
        });
    });
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)} action="/">
      <div className="flex flex-col items-center w-full px-4">
        <div className="flex flex-col items-center md:px-0 w-full max-w-md gap-8 md:gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center my-4">
              <div className={styles.logo}>{logo}</div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-3xl">
                  {sent ? 'Check your email' : 'Reset your password'}
                </span>
              </div>
            </div>
            <p
              style={{ color: 'var(--cds-text-helper)' }}
              className={'text-xs text-center leading-5 px-4'}
            >
              {sent ? (
                <span className="text-xs">
                  Please check the email address{' '}
                  <span className="text-xs font-bold">{email}</span> for
                  instructions to reset your password.
                </span>
              ) : (
                'Enter your email address and we will send you instructions to reset your password.'
              )}
            </p>
          </div>

          {sent ? (
            <>
              <Email style={{ fill: '#ff00ff' }} size={64}></Email>
              <Button
                kind="primary"
                className="items-center h-[50px]"
                renderIcon={Checkmark}
                type="button"
                onClick={onDone}
              >
                Done
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <p className="text-lg font-bold text-center">Enter your email</p>

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
                    Reset password
                  </span>
                </div>
              </Button>

              <FormError message={error}></FormError>
            </div>
          )}
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
