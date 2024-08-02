import { useEffect, useRef, useState } from 'react';
import FormError from '../form-error/form-error';
import { Modal, TextInput } from '@carbon/react';
import styles from './edit-resume.module.scss';
import { z } from 'zod';
import { EditResumeSchema } from '@/schemas/edit-resume-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createResume, editResume } from '@/actions/new-resume';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import useResumeStore from '@/store/resume-store';

export interface ResumeModalProps {
  open: boolean;
  name: string;
  create?: boolean;
  onClose: () => void;
}

export default function EditResume({
  open,
  name,
  create,
  onClose,
}: ResumeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<
    'inactive' | 'error' | 'active' | 'finished' | undefined
  >('inactive');
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const { data: session } = useSession();
  const submit = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const { slug } = useParams();
  const resumeStore = useResumeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setModal(open);
    if (open) {
      setStatus('inactive');
    }
  }, [open]);

  useEffect(() => {
    setValue('name', name);
  }, [name]);

  useEffect(() => {
    if (!modal) {
      onClose();
    }
  }, [modal]);

  const { formState, handleSubmit, register, getValues, setValue } = useForm<
    z.infer<typeof EditResumeSchema>
  >({
    resolver: zodResolver(EditResumeSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof EditResumeSchema>) => {
    if (!session?.user?.id) return;

    setError('');
    setIsSubmitting(true);
    setStatus('active');

    if (create) {
      createResume(values, session.user.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          setStatus('finished');

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
    } else {
      editResume(values, resumeStore.json, slug as string, session.user.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            return;
          }

          resumeStore.setName(getValues('name'));

          setStatus('finished');

          setIsSubmitting(false);
          setModal(false);
        })
        .catch(() => {
          setError('Something went wrong');
          setStatus('inactive');
        });
    }
  };

  return (
    <>
      {mounted && (
        <Modal
          open={modal}
          modalAriaLabel={create ? 'New resume' : 'Edit resume'}
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onRequestClose={() => setModal(false)}
          onRequestSubmit={() => submit.current!.click()}
          size="xs"
          selectorPrimaryFocus="form"
          modalHeading={create ? 'New resume' : 'Edit resume'}
          loadingStatus={status}
          loadingDescription="Confirm"
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
    </>
  );
}
