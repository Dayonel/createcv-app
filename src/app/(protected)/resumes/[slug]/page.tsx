'use client';

import { getResume } from '@/actions/resume';
import Template1 from '@/components/templates/template1/template1';
import useResumeStore from '@/store/resume-store';
import { InlineLoading } from '@carbon/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Not_Found from '@/components/not-found';

export default function Resumes({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const resumeStore = useResumeStore();
  const { data: session } = useSession();
  const [found, setFound] = useState<boolean>();

  useEffect(() => {
    setFound(false);

    if (!session?.user?.id) return;

    getResume(session.user.id, slug)
      .then((row) => {
        if (!row) {
          return;
        }

        resumeStore.setName(row.name);
        resumeStore.setJson(row.json);
        setFound(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="!min-h-[calc(100dvh-10rem)] flex items-center">
        <InlineLoading className="flex justify-center"></InlineLoading>
      </div>
    );
  }

  if (!found) {
    return <Not_Found></Not_Found>;
  }

  return (
    <div className="container">
      <div className="section w-full">
        <div className="mb-0 md:mb-11">
          <Template1></Template1>
        </div>
      </div>
    </div>
  );
}
