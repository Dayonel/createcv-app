'use client';

import { deleteResume } from '@/actions/new-resume';
import useResumeStore from '@/store/resume-store';
import { Modal } from '@carbon/react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import FormError from '../form-error/form-error';
import styles from './delete-resume.module.scss';

interface DeleteResumeProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteResume({ open, onClose }: DeleteResumeProps) {
  const [status, setStatus] = useState<
    'inactive' | 'error' | 'active' | 'finished' | undefined
  >('inactive');
  const resumeStore = useResumeStore();
  const { data: session } = useSession();
  const [error, setError] = useState<string>();
  const { slug } = useParams();
  const router = useRouter();

  const remove = () => {
    setError('');

    if (!session?.user?.id) return;

    deleteResume(slug as string)
      .then(() => {
        setStatus('finished');
        onClose();
        router.push('/resumes');
      })
      .catch(() => {
        setError('Something went wrong');
        setStatus('inactive');
      });
  };

  return (
    <Modal
      open={open}
      modalAriaLabel="Delete"
      modalHeading="Delete"
      primaryButtonText="Delete"
      secondaryButtonText="Cancel"
      onRequestClose={onClose}
      onRequestSubmit={() => remove()}
      loadingStatus={status}
      loadingDescription="Delete"
      size="xs"
      className={styles.modal}
      danger
    >
      <span>
        Deleting{' '}
        <span className="font-bold whitespace-nowrap">{resumeStore.name}</span>{' '}
        is permanent and cannot be undone, are you sure?
      </span>

      <FormError message={error}></FormError>
    </Modal>
  );
}
