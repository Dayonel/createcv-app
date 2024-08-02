'use client';

import { getResume } from '@/actions/resume';
import Template1 from '@/components/templates/template1/template1';
import useResumeStore from '@/store/resume-store';
import { InlineLoading } from '@carbon/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Resumes({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const resumeStore = useResumeStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    getResume(session.user.id, slug)
      .then((r) => {
        resumeStore.setName(r.name);
        resumeStore.setJson(r.json);
      })
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="section w-full">
        {isLoading ? (
          <div className="!min-h-[calc(100dvh-10rem)] flex items-center">
            <InlineLoading className="flex justify-center"></InlineLoading>
          </div>
        ) : (
          <div className="mb-0 md:mb-11">
            <Template1></Template1>
          </div>
        )}
      </div>
    </div>
  );
}
