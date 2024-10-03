import { Checkmark, Error } from '@carbon/icons-react';
import { useEffect, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import useResumeStore from '@/store/resume-store';
import { useSession } from 'next-auth/react';
import { editResume } from '@/actions/new-resume';
import { InlineLoading } from '@carbon/react';

export default function SaveResume() {
  const [isPending, startTransition] = useTransition();
  const { slug } = useParams();
  const resumeStore = useResumeStore();
  const { data: session } = useSession();
  const [error, setError] = useState<string>();

  const save = () => {
    startTransition(() => {
      if (!session?.user?.id) return;

      editResume(
        { name: resumeStore.name },
        resumeStore.json,
        slug as string,
        session.user.id
      ).catch(() => setError('Failed to save, try again later.'));
    });
  };

  useEffect(() => {
    if (!resumeStore.json) return; // avoid save on initial load

    save();
  }, [resumeStore.json]);

  if (!resumeStore.name) return null;

  return (
    <>
      {isPending ? (
        <span className="flex items-center gap-2">
          <span>Saving...</span>
          <InlineLoading style={{ minBlockSize: 'auto' }} />
        </span>
      ) : (
        <>
          {error ? (
            <span className="flex items-center gap-2">
              <span
                style={{ color: 'var(--cds-text-error)' }}
                className="text-xs truncate max-w-40 md:max-w-sm"
              >
                {error}
              </span>
              <Error fill="var(--cds-text-error) !important" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span
                className="truncate max-w-40 md:max-w-sm"
                style={{ color: 'var(--cds-text-success)' }}
              >
                {resumeStore.name}
              </span>
              <Checkmark
                className="!m-0"
                fill="var(--cds-support-success) !important"
              />
            </span>
          )}
        </>
      )}
    </>
  );
}
