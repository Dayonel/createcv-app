'use client';
import {
  Button,
  IconButton,
  InlineLoading,
  Modal,
  PaginationNav,
  Tag,
  TextInput,
} from '@carbon/react';
import styles from './page.module.scss';
import { AddLarge, ArrowRight } from '@carbon/icons-react';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewResumeSchema } from '@/schemas/new-resume-schema';
import FormError from '@/components/form-error/form-error';
import { newResume } from '@/actions/new-resume';
import { getResumes } from '@/actions/resume';
import { useSession } from 'next-auth/react';
import { Resume } from '@/drizzle/types';
import { Template1 } from '@/components/templates/template1/types/template1';
import { getParagraphText } from '@/utils/rich-text-utils';
import { useRouter } from 'next/navigation';

export default function Resumes() {
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<
    'inactive' | 'error' | 'active' | 'finished' | undefined
  >('inactive');
  const [description, setDescription] = useState<string>('');
  const submit = useRef<HTMLButtonElement | null>(null);
  const [resumes, setResumes] = useState<Resume[]>();
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const templates = useMemo(() => new Map<string, any>(), []);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchResumes();
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [page]);

  const fetchResumes = () => {
    if (!session?.user?.id) return;

    setIsPending(true);

    getResumes(session.user.id, page + 1)
      .then(({ items, count }) => {
        setResumes(items);
        setCount(count);
        if (count > 0) {
          setValue('name', `Resume ${count + 1}`);
        }
        items.map((f) => {
          if (!templates.has(f.id)) {
            templates.set(f.id, JSON.parse(f.json) as Template1);
          }
        });
      })
      .then(() => setIsPending(false));
  };

  const { formState, handleSubmit, register, setValue } = useForm<
    z.infer<typeof NewResumeSchema>
  >({
    resolver: zodResolver(NewResumeSchema),
    defaultValues: {
      name: 'Resume 1',
    },
  });

  const onSubmit = async (values: z.infer<typeof NewResumeSchema>) => {
    if (!session?.user?.id) return;

    setError('');
    setIsSubmitting(true);
    setStatus('active');
    setDescription('Creating...');

    newResume(values, session.user.id)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          return;
        }

        setStatus('finished');
        setDescription('Created!');

        if (data.id) {
          router.push(`/resumes/${data.id}`);
        }
      })
      .catch(() => {
        setError('Something went wrong');
        setStatus('inactive');
      })
      .finally(() => {
        setIsSubmitting(false);
        setModal(false);
      });
  };

  return (
    <div className="container pb-20 md:pb-40">
      <div className="page relative">
        <div className="flex flex-col">
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

          {isPending ? (
            <InlineLoading
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ inlineSize: 'auto' }}
            ></InlineLoading>
          ) : (
            <div
              className={cn('grid grid-cols-1 md:grid-cols-2', styles.tiles)}
            >
              {resumes?.map((m) => {
                const template = templates.get(m.id);
                return (
                  <Link
                    key={m.id}
                    href={`/resumes/${m.id}`}
                    className={cn(
                      'cds--link cds--tile cds--tile--clickable',
                      styles.tile
                    )}
                  >
                    <span>{m.name}</span>

                    {template.summary && (
                      <p className={cn('text-xs line-clamp-2', styles.summary)}>
                        {getParagraphText(template.summary)}
                      </p>
                    )}

                    <div className="flex items-end justify-between mt-auto">
                      <Tag
                        className="!w-fit pointer-events-none !m-0 !mt-auto"
                        type="green"
                      >
                        Template 1
                      </Tag>

                      <ArrowRight></ArrowRight>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {!isPending && count >= 10 && (
        <div className={styles.pagination}>
          <div className="flex justify-center pt-4">
            <PaginationNav
              itemsShown={5}
              totalItems={Math.ceil(count / 10)}
              onChange={(p) => setPage(p)}
              page={page}
            ></PaginationNav>
          </div>
        </div>
      )}

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
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <TextInput
              type="text"
              id="name"
              required
              labelText="Name"
              helperText="The resume name helps you distinguish it from other versions."
              placeholder="Resume 1"
              size="lg"
              autoComplete="true"
              disabled={isSubmitting}
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
