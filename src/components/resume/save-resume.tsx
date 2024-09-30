import { Save } from '@carbon/icons-react';
import Action from '../dndkit/components/action/action';
import { useEffect, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import useResumeStore from '@/store/resume-store';
import { useSession } from 'next-auth/react';
import { editResume } from '@/actions/new-resume';
import { InlineLoading, ToastNotification } from '@carbon/react';

interface SaveProps {
  onSave: (message: string) => void;
}

export default function SaveResume({ onSave }: SaveProps) {
  const [isPending, startTransition] = useTransition();
  const { slug } = useParams();
  const resumeStore = useResumeStore();
  const { data: session } = useSession();
  const [notification, setNotification] = useState<boolean>();

  const save = () => {
    startTransition(() => {
      if (!session?.user?.id) return;

      setNotification(false);

      editResume(
        { name: resumeStore.name },
        resumeStore.json,
        slug as string,
        session.user.id
      )
        .then(() => onSave('Resume saved.'))
        .catch(() => onSave('Failed to save, try again later.'));
    });
  };

  useEffect(() => {
    if (!resumeStore.json) return; // avoid save on initial load

    save();
  }, [resumeStore.json]);

  return (
    <>
      <Action
        className="action"
        title="Save"
        fill={`${isPending ? 'transparent' : 'var(--cds-text-primary)'}`}
        onClick={() => save()}
      >
        {isPending ? (
          <InlineLoading className="flex justify-center items-center" />
        ) : (
          <div className="flex items-center gap-2">
            <Save></Save>
            <span>Save</span>
          </div>
        )}

        <div className="flex items-center gap-2"></div>
      </Action>
    </>
  );
}
