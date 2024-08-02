'use client';
import {
  Button,
  IconButton,
  InlineLoading,
  PaginationNav,
  Tag,
} from '@carbon/react';
import styles from './page.module.scss';
import { AddLarge, ArrowRight } from '@carbon/icons-react';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getResumes } from '@/actions/resume';
import { useSession } from 'next-auth/react';
import { Resume } from '@/drizzle/types';
import { Template1 } from '@/components/templates/template1/types/template1';
import { getParagraphText } from '@/utils/rich-text-utils';
import useResumeStore from '@/store/resume-store';
import EditResume from '@/components/resume/edit-resume';

export default function Resumes() {
  const [resumes, setResumes] = useState<Resume[]>();
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const templates = useMemo(() => new Map<string, any>(), []);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { data: session } = useSession();
  const resumeStore = useResumeStore();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('Resume 1');

  useEffect(() => {
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
          setName(`Resume ${count + 1}`);
        }
        items.map((f) => {
          if (!templates.has(f.id)) {
            templates.set(f.id, JSON.parse(f.json) as Template1);
          }
        });
      })
      .then(() => setIsPending(false));
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
                onClick={() => setOpen(true)}
              >
                New resume
              </Button>

              <IconButton
                label="New resume"
                className="!flex md:!hidden"
                kind="primary"
                align="left"
                onClick={() => setOpen(true)}
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
                    onClick={() => resumeStore.clear()}
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

      <EditResume
        open={open}
        name={name}
        onClose={() => setOpen(false)}
        create
      ></EditResume>
    </div>
  );
}
