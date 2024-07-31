'use client';
import {
  Button,
  IconButton,
  Modal,
  PaginationNav,
  Tag,
  TextInput,
} from '@carbon/react';
import styles from './page.module.scss';
import { AddLarge, ArrowRight } from '@carbon/icons-react';
import { cn } from '@/lib/utils';
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewResumeSchema } from '@/schemas/new-resume-schema';
import FormError from '@/components/form-error/form-error';
import { newResume } from '@/actions/new-resume';
import { v4 } from 'uuid';

export default function Resumes() {
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<
    'inactive' | 'error' | 'active' | 'finished' | undefined
  >('inactive');
  const [description, setDescription] = useState<string>('');
  const ref = useRef<HTMLFormElement | null>(null);
  const submit = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { formState, handleSubmit, register, getValues } = useForm<
    z.infer<typeof NewResumeSchema>
  >({
    resolver: zodResolver(NewResumeSchema),
    defaultValues: {
      id: v4(),
      name: 'Resume 1',
    },
  });

  const onSubmit = async (values: z.infer<typeof NewResumeSchema>) => {
    setError('');
    setIsPending(true);
    setStatus('active');
    setDescription('Creating...');

    newResume(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }

        setStatus('finished');
        setDescription('Created!');

        ref.current!.submit();
      })
      .catch(() => {
        setError('Something went wrong');
        setStatus('inactive');
      })
      .finally(() => {
        setIsPending(false);
        setModal(false);
      });
  };

  return (
    <div className="container">
      <div className="flex flex-col h-full justify-between">
        <div className="page">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-between">
            Resumes{' '}
            <div className="flex">
              <Button
                className="!hidden md:!block"
                kind="primary"
                renderIcon={AddLarge}
                onClick={() => setModal(true)}
              >
                New resume
              </Button>

              <IconButton
                label="New resume"
                className="!flex md:!hidden"
                kind="primary"
                align="left"
                onClick={() => setModal(true)}
              >
                <AddLarge></AddLarge>
              </IconButton>
            </div>
          </h1>

          <div className={cn('grid grid-cols-1 md:grid-cols-2', styles.tiles)}>
            <Link
              href="/resumes/1"
              className={cn(
                'cds--link cds--tile cds--tile--clickable',
                styles.tile
              )}
            >
              <span>Resume 1</span>
              <p className={cn('text-xs line-clamp-2', styles.summary)}>
                Highly motivated full-stack developer with +6 years of
                experience building and maintaining web applications. Proven
                ability to deliver high-quality work following best practices
                and continiously learning the latest advancements on the web.
              </p>

              <div className="flex items-end justify-between mt-auto">
                <Tag
                  id={useId()}
                  className="!w-fit pointer-events-none !m-0 !mt-auto"
                  type="green"
                >
                  Template 1
                </Tag>

                <ArrowRight></ArrowRight>
              </div>
            </Link>

            <Link
              href="/resumes/2"
              className={cn(
                'cds--link cds--tile cds--tile--clickable',
                styles.tile
              )}
            >
              <span>Resume 2</span>
              <p className={cn('text-xs line-clamp-2', styles.summary)}>
                Highly motivated full-stack developer with +6 years of
                experience building and maintaining web applications. Proven
                ability to deliver high-quality work following best practices
                and continiously learning the latest advancements on the web.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <Tag
                  id={useId()}
                  className="!w-fit pointer-events-none !m-0 !mt-auto"
                  type="green"
                >
                  Template 1
                </Tag>

                <ArrowRight></ArrowRight>
              </div>
            </Link>

            <Link
              href="/resumes/3"
              className={cn(
                'cds--link cds--tile cds--tile--clickable',
                styles.tile
              )}
            >
              <span>Resume 3</span>
              <p className={cn('text-xs line-clamp-2', styles.summary)}>
                Highly motivated full-stack developer with +6 years of
                experience building and maintaining web applications. Proven
                ability to deliver high-quality work following best practices
                and continiously learning the latest advancements on the web.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <Tag
                  id={useId()}
                  className="!w-fit pointer-events-none !m-0 !mt-auto"
                  type="green"
                >
                  Template 1
                </Tag>

                <ArrowRight></ArrowRight>
              </div>
            </Link>

            <Link
              href="/resumes/4"
              className={cn(
                'cds--link cds--tile cds--tile--clickable',
                styles.tile
              )}
            >
              <span>Resume 4</span>
              <p className={cn('text-xs line-clamp-2', styles.summary)}>
                Highly motivated full-stack developer with +6 years of
                experience building and maintaining web applications. Proven
                ability to deliver high-quality work following best practices
                and continiously learning the latest advancements on the web.
              </p>
              <div className="flex items-end justify-between mt-auto">
                <Tag
                  id={useId()}
                  className="!w-fit pointer-events-none !m-0 !mt-auto"
                  type="green"
                >
                  Template 1
                </Tag>

                <ArrowRight></ArrowRight>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.pagination}>
          <div className="flex justify-center w-full pt-4 pb-12">
            <PaginationNav itemsShown={5} totalItems={10}></PaginationNav>
          </div>
        </div>
      </div>
      {mounted && (
        <Modal
          open={modal}
          modalAriaLabel="New resume"
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onRequestClose={() => setModal(false)}
          onRequestSubmit={() => submit.current!.click()}
          size="xs"
          selectorPrimaryFocus="form"
          modalHeading="New resume"
          loadingStatus={status}
          loadingDescription={description}
          className={styles.modal}
        >
          <form
            ref={ref}
            onSubmit={handleSubmit(onSubmit)}
            action={`/resumes/${getValues('id')}`}
            className="py-4"
          >
            <TextInput
              type="text"
              id="name"
              required
              labelText="Name"
              helperText="The resume name helps you distinguish it from other versions."
              placeholder="Resume 1"
              size="lg"
              autoComplete="true"
              disabled={isPending}
              invalid={formState.errors.name !== undefined}
              invalidText={formState.errors.name?.message}
              {...register('name')}
            />

            <button type="submit" ref={submit} hidden></button>

            <FormError message={error}></FormError>
          </form>
        </Modal>
      )}
    </div>
  );
}
