import { Save } from '@carbon/icons-react';
import Action from '../dndkit/components/action/action';
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import useResumeStore from '@/store/resume-store';
import { useSession } from 'next-auth/react';
import { editResume } from '@/actions/new-resume';
import { InlineLoading, ToastNotification } from '@carbon/react';

export default function SaveResume() {
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
      ).then(() => {
        setNotification(true);
      });
    });
  };

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

      {notification && (
        <ToastNotification
          title="Saved"
          className="fixed bottom-4 right-4 pb-4 z-50"
          timeout={2000}
          hideCloseButton
          kind="success"
        >
          <span className="whitespace-nowrap">Resume saved.</span>
        </ToastNotification>
      )}
    </>
  );
}
