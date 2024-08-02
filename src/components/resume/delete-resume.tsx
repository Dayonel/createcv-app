'use client';

import { deleteResume } from '@/actions/new-resume';
import useResumeStore from '@/store/resume-store';
import { Modal } from '@carbon/react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormError from '../form-error/form-error';
import styles from './delete-resume.module.scss';

interface DeleteResumeProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteResume({ open, onClose }: DeleteResumeProps) {
  const [show, setShow] = useState<boolean>();
  const [status, setStatus] = useState<
    'inactive' | 'error' | 'active' | 'finished' | undefined
  >('inactive');
  const resumeStore = useResumeStore();
  const { data: session } = useSession();
  const [error, setError] = useState<string>();
  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show]);

  const remove = () => {
    setError('');

    if (!session?.user?.id) return;

    deleteResume(slug as string, session.user.id)
      .then(() => {
        setStatus('finished');
        setShow(false);
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
      onRequestClose={() => setShow(false)}
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
